import { describe, expect, it } from "vitest";
import { t } from "../i18n";
import { voiceFile } from "../speech";
import type { Lang } from "../progress";
import { hash53, lineKey, withoutName } from "./key";
import { fileId, LANGS, needsSpoken, ottoLines, SPOKEN, voiceJobs } from "./lines";
import manifestDe from "./manifest.de.json";
import manifestEn from "./manifest.en.json";
import manifestPl from "./manifest.pl.json";

// Voice files are made by `npm run voices`. These tests only compare names, so CI needs no voice
// software: they fail when a line Otto says has no file, or a number line has no spoken version.

const MANIFEST: Record<Lang, Record<string, string>> = {
  en: manifestEn,
  de: manifestDe,
  pl: manifestPl,
};

/** File names on disk, per language, without .m4a. */
const FILES: Record<Lang, Set<string>> = { en: new Set(), de: new Set(), pl: new Set() };
for (const path of Object.keys(import.meta.glob("/public/audio/*/*.m4a"))) {
  const [, , , lang, name] = path.split("/");
  FILES[lang as Lang]?.add(name.replace(/\.m4a$/, ""));
}

const RUN = "run `npm run voices`";

describe("voice keys", () => {
  it("gives the same hash for the same text, and a different one for a different text", () => {
    expect(hash53("Hi! I'm Otto.")).toBe(hash53("Hi! I'm Otto."));
    expect(hash53("Hi! I'm Otto.")).not.toBe(hash53("Hi! I'm Otto"));
    expect(hash53("Otto", 1)).not.toBe(hash53("Otto", 2));
    expect(hash53("Otto")).toMatch(/^[0-9a-f]{14}$/);
  });

  it("says greetings without the kid's name", () => {
    expect(withoutName(t("en", "welcome", { name: "{name}" }))).toBe(
      "Hi! Pick a place on the trail.",
    );
    expect(withoutName(t("en", "welcomeBack", { name: "{name}" }))).toBe("Welcome back!");
    expect(withoutName(t("de", "welcomeBack", { name: "{name}" }))).toBe("Willkommen zurück!");
    expect(withoutName(t("pl", "welcome", { name: "{name}" }))).toBe(
      "Cześć! Wybierz miejsce na ścieżce.",
    );
  });

  it("changes the file name when the voice text changes", () => {
    expect(fileId("en", "Hello.")).not.toBe(fileId("en", "Hello!"));
    expect(fileId("en", "Hello.")).not.toBe(fileId("de", "Hello."));
  });
});

describe.each(LANGS)("voice files (%s)", (lang) => {
  const lines = ottoLines(lang);
  const jobs = voiceJobs(lang);
  const manifest = MANIFEST[lang];

  it("lists Otto's lines, including the bubble texts outside lessons", () => {
    expect(lines.length).toBeGreaterThan(1500);
    expect(lines).toContain(t(lang, "askName"));
    expect(lines).toContain(t(lang, "rightLine"));
    expect(lines.some((l) => l.includes("*") || l.includes("{"))).toBe(false);
  });

  it("gives every line its own key", () => {
    expect(new Set(jobs.map((j) => j.key)).size).toBe(lines.length);
  });

  it(`has a manifest entry for every line, current with its text (${RUN})`, () => {
    const stale = jobs.filter((j) => manifest[j.key] !== j.id).map((j) => j.text);
    expect(stale).toEqual([]);
    expect(Object.keys(manifest).length).toBe(lines.length);
  });

  it(`has a voice file for every line, and no unused files (${RUN})`, () => {
    const wanted = new Set(Object.values(manifest));
    const missing = jobs.filter((j) => !FILES[lang].has(j.id)).map((j) => j.text);
    expect(missing).toEqual([]);
    expect([...FILES[lang]].filter((f) => !wanted.has(f))).toEqual([]);
  });

  it("has a spoken version for every line with a number (docs/writing-lessons.md)", () => {
    const missing = lines.filter((l) => needsSpoken(l) && !(l in SPOKEN[lang]));
    expect(missing).toEqual([]);
  });

  it("keeps spoken versions free of digits, and only for lines Otto still says", () => {
    const current = new Set(lines);
    const spoken = Object.entries(SPOKEN[lang]);
    expect(spoken.filter(([, v]) => needsSpoken(v))).toEqual([]);
    expect(spoken.filter(([k]) => !current.has(k)).map(([k]) => k)).toEqual([]);
  });

  it("finds a file from the screen line alone", async () => {
    const line = t(lang, "askName");
    const id = fileId(lang, SPOKEN[lang][line] ?? line);
    expect(manifest[lineKey(line)]).toBe(id);
    expect(await voiceFile(line, lang)).toBe(`/audio/${lang}/${id}.m4a`);
    expect(await voiceFile("A line Otto never says.", lang)).toBeNull();
  });
});
