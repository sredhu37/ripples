export type Lang = "en" | "de";

export interface Progress {
  name: string;
  lang: Lang;
  muted: boolean;
  /** ids of lessons whose badge is earned */
  badges: string[];
}

export type LessonState = "done" | "next" | "locked";

const KEY = "ripples.progress.v1";
const PREFIX = "RIP1";
const MAX_NAME = 20;

export function emptyProgress(): Progress {
  return { name: "", lang: "en", muted: false, badges: [] };
}

export function cleanName(raw: string): string {
  return raw.trim().replace(/\s+/g, " ").slice(0, MAX_NAME);
}

function sanitize(d: unknown): Progress {
  const base = emptyProgress();
  if (typeof d !== "object" || d === null) return base;
  const o = d as Record<string, unknown>;
  return {
    name: typeof o.name === "string" ? cleanName(o.name) : base.name,
    lang: o.lang === "de" ? "de" : "en",
    muted: o.muted === true,
    badges: Array.isArray(o.badges)
      ? [...new Set(o.badges.filter((b): b is string => typeof b === "string"))]
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

/** First lesson in order without a badge, or null when all are done. */
export function nextLessonId(p: Progress, order: string[]): string | null {
  return order.find((id) => !p.badges.includes(id)) ?? null;
}

export function lessonState(p: Progress, order: string[], id: string): LessonState {
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
  const mask = order.reduce((m, id, i) => (p.badges.includes(id) ? m | (1 << i) : m), 0);
  const body = toB64Url(JSON.stringify({ n: p.name, l: p.lang, b: mask }));
  return `${PREFIX}.${body}.${checksum(body)}`;
}

export function importCode(code: string, order: string[]): Progress | null {
  try {
    const [prefix, body, sum, extra] = code.trim().split(".");
    if (prefix !== PREFIX || !body || !sum || extra !== undefined) return null;
    if (checksum(body) !== sum) return null;
    const d = JSON.parse(fromB64Url(body)) as { n?: unknown; l?: unknown; b?: unknown };
    if (typeof d.n !== "string" || typeof d.b !== "number") return null;
    return {
      name: cleanName(d.n),
      lang: d.l === "de" ? "de" : "en",
      muted: false,
      badges: order.filter((_, i) => (d.b as number) & (1 << i)),
    };
  } catch {
    return null;
  }
}
