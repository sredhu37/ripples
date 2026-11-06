export type Lang = "en" | "de" | "pl";

export interface Progress {
  name: string;
  lang: Lang;
  muted: boolean;
  /** ids of lessons whose badge is earned */
  badges: string[];
  /** ids of lessons disabled by parents */
  disabledLessons?: string[];
}

export type LessonState = "done" | "next" | "locked";

const KEY = "ripples.progress.v1";
const PREFIX = "RIP1";
const MAX_NAME = 20;

export function emptyProgress(): Progress {
  return { name: "", lang: "en", muted: false, badges: [], disabledLessons: [] };
}

export function cleanName(raw: string): string {
  return raw.trim().replace(/\s+/g, " ").slice(0, MAX_NAME);
}

function sanitize(d: unknown): Progress {
  const base = emptyProgress();
  if (typeof d !== "object" || d === null) return base;
  const o = d as Record<string, unknown>;
  const rawLang = o.lang;
  const lang: Lang = rawLang === "de" ? "de" : rawLang === "pl" ? "pl" : "en";
  return {
    name: typeof o.name === "string" ? cleanName(o.name) : base.name,
    lang,
    muted: o.muted === true,
    badges: Array.isArray(o.badges)
      ? [...new Set(o.badges.filter((b): b is string => typeof b === "string"))]
      : [],
    disabledLessons: Array.isArray(o.disabledLessons)
      ? [...new Set(o.disabledLessons.filter((b): b is string => typeof b === "string"))]
      : [],
  };
}

export function loadProgress(storage: Pick<Storage, "getItem">): Progress {
  try {
    const raw = storage.getItem(KEY);
    return raw ? sanitize(JSON.parse(raw)) : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(storage: Pick<Storage, "setItem">, p: Progress): void {
  try {
    storage.setItem(KEY, JSON.stringify(p));
  } catch {
    // storage full or blocked: the app still works for this session
  }
}

export function earnBadge(p: Progress, lessonId: string): Progress {
  return p.badges.includes(lessonId) ? p : { ...p, badges: [...p.badges, lessonId] };
}

export function toggleLesson(p: Progress, lessonId: string, enabled: boolean): Progress {
  const current = p.disabledLessons ?? [];
  if (enabled) {
    return { ...p, disabledLessons: current.filter((id) => id !== lessonId) };
  } else {
    return current.includes(lessonId) ? p : { ...p, disabledLessons: [...current, lessonId] };
  }
}

/** First lesson in order without a badge that is not disabled, or null when all are done. */
export function nextLessonId(p: Progress, order: string[]): string | null {
  const activeOrder = order.filter((id) => !p.disabledLessons?.includes(id));
  return activeOrder.find((id) => !p.badges.includes(id)) ?? null;
}

export function lessonState(p: Progress, order: string[], id: string): LessonState {
  if (p.disabledLessons?.includes(id)) return "locked";
  if (p.badges.includes(id)) return "done";
  return nextLessonId(p, order) === id ? "next" : "locked";
}

// Save/restore code for parents. Format: RIP1.<base64url json>.<checksum>

function toB64Url(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64Url(s: string): string {
  const pad = "=".repeat((4 - (s.length % 4)) % 4);
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

function checksum(s: string): string {
  let h = 5381;
  for (const ch of s) h = ((h * 33) ^ (ch.codePointAt(0) ?? 0)) >>> 0;
  return h.toString(36).padStart(4, "0").slice(0, 4);
}

export function exportCode(p: Progress, order: string[]): string {
  const mask = order.reduce((m, id, i) => (p.badges.includes(id) ? m + Math.pow(2, i) : m), 0);
  const payload: { n: string; l: Lang; b: number; d?: string[] } = {
    n: p.name,
    l: p.lang,
    b: mask,
  };
  if (p.disabledLessons && p.disabledLessons.length > 0) {
    payload.d = p.disabledLessons;
  }
  const body = toB64Url(JSON.stringify(payload));
  return `${PREFIX}.${body}.${checksum(body)}`;
}

export function importCode(code: string, order: string[]): Progress | null {
  try {
    const [prefix, body, sum, extra] = code.trim().split(".");
    if (prefix !== PREFIX || !body || !sum || extra !== undefined) return null;
    if (checksum(body) !== sum) return null;
    const d = JSON.parse(fromB64Url(body)) as {
      n?: unknown;
      l?: unknown;
      b?: unknown;
      d?: unknown;
    };
    if (typeof d.n !== "string" || typeof d.b !== "number") return null;
    const rawLang = d.l;
    const lang: Lang = rawLang === "de" ? "de" : rawLang === "pl" ? "pl" : "en";
    const disabledLessons = Array.isArray(d.d)
      ? [...new Set(d.d.filter((id): id is string => typeof id === "string"))]
      : [];
    return {
      name: cleanName(d.n),
      lang,
      muted: false,
      badges: order.filter((_, i) => Math.floor((d.b as number) / Math.pow(2, i)) % 2 === 1),
      disabledLessons,
    };
  } catch {
    return null;
  }
}
