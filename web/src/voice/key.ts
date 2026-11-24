/**
 * cyrb53: a small, fast 53-bit string hash, as 14 hex digits. Not for security.
 * The app, the tests and `npm run voices` all name voice files with it, so the
 * result must never change for the same input.
 */
export function hash53(text: string, seed = 0): string {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < text.length; i++) {
    const ch = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(14, "0");
}

/** The manifest key of a line: a hash of the text on screen, stars already removed. */
export function lineKey(screenText: string): string {
  return hash53(screenText);
}

/** Removes the kid's name from a greeting template: "Hi {name}! Pick..." becomes "Hi! Pick...". */
export function withoutName(template: string): string {
  return template.replace(/,?\s*\{name\}/g, "");
}
