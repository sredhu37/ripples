/** Feature flags from the API's `FEATURES` setting. Public: a flag hides things, never protects them. */
export type Features = Record<string, boolean>;

const SHOW_PREFIX = "show-";

/** The default: no Paused lessons. */
export const NO_LESSONS: ReadonlySet<string> = new Set();

/** Reads `/api/features` once. Any failure (no API, bad answer) means no flags: every lesson shows. */
export async function fetchFeatures(): Promise<Features> {
  try {
    const res = await fetch("/api/features");
    if (!res.ok) return {};
    const data: unknown = await res.json();
    if (typeof data !== "object" || data === null || Array.isArray(data)) return {};
    const features: Features = {};
    for (const [name, value] of Object.entries(data)) {
      if (typeof value === "boolean") features[name] = value;
    }
    return features;
  } catch {
    return {};
  }
}

/** A feature switch that code checks by name. A missing switch is off. */
export function isFeatureOn(features: Features, name: string): boolean {
  return features[name] === true;
}

/**
 * Ids of Paused lessons: `show-<lessonId>: false` for a known lesson.
 * A `show-` flag with an unknown id is ignored with one console warning.
 */
export function pausedLessons(features: Features, lessonIds: string[]): Set<string> {
  const paused = new Set<string>();
  for (const [name, value] of Object.entries(features)) {
    if (!name.startsWith(SHOW_PREFIX)) continue;
    const id = name.slice(SHOW_PREFIX.length);
    if (!lessonIds.includes(id)) {
      console.warn(`FEATURES: "${name}" does not match a lesson id, ignored`);
      continue;
    }
    if (value === false) paused.add(id);
  }
  return paused;
}
