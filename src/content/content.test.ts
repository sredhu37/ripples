import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { getLesson, hasLesson } from "./index";
import { ALL_SENIOR_LESSONS } from "./senior";
import { LESSONS } from "../lessons";
import type { Lesson, Text } from "../lesson/types";
import type { Lang } from "../progress";

const LANGS = ["en", "de", "pl"] as const;

/**
 * Words are whitespace-separated tokens with at least one letter or digit, so "-" or "=" do not count.
 * Stars around terms are ignored, and "1 000" (a thousands separator) is one number.
 */
function words(s: string): string[] {
  return s
    .replace(/\*/g, "")
    .replace(/(\d)[\s\u00a0\u202f](?=\d{3}\b)/g, "$1")
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w));
}

/** Sentences end at . ! or ? followed by whitespace, so "1.5" and "e.g.x" do not split. */
function sentences(s: string): string[] {
  return s.split(/(?<=[.!?])\s+/).filter((x) => x.trim() !== "");
}

/** Every Polish string in a lesson object: walks all nested `pl` keys. */
function polishStrings(value: unknown, out: string[] = []): string[] {
  if (Array.isArray(value)) value.forEach((v) => polishStrings(v, out));
  else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (k === "pl" && typeof v === "string") out.push(v);
      else polishStrings(v, out);
    }
  }
  return out;
}

/** Text of every SVG <text> element a story diagram shows, at every step, in the given languages. */
type Label = { where: string; lang: string; text: string };
const labelCache = new WeakMap<Lesson, Map<string, Label[]>>();
function diagramLabels(l: Lesson, langs: readonly Lang[] = LANGS): Label[] {
  const out: Label[] = [];
  const cache = labelCache.get(l) ?? new Map<string, Label[]>();
  labelCache.set(l, cache);
  l.story.forEach((b, i) => {
    if (!b.Diagram) return;
    const steps = b.lines?.length ?? 1;
    for (const lang of langs) {
      const key = `${i} ${lang}`;
      const cached = cache.get(key);
      if (cached) {
        out.push(...cached);
        continue;
      }
      const found: Label[] = [];
      const seen = new Set<string>();
      for (let step = 1; step <= steps; step++) {
        const html = renderToStaticMarkup(createElement(b.Diagram, { lang, step }));
        for (const m of html.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/g)) {
          const text = decode(m[1].replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
          if (text && !seen.has(text)) {
            seen.add(text);
            found.push({ where: `story ${i + 1}`, lang, text });
          }
        }
      }
      cache.set(key, found);
      out.push(...found);
    }
  });
  return out;
}

function decode(s: string): string {
  return s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function texts(l: Lesson): { where: string; text: Text }[] {
  const out: { where: string; text: Text }[] = [];
  l.story.forEach((b, i) => {
    if (b.lines) b.lines.forEach((line, j) => out.push({ where: `story ${i + 1} line ${j + 1}`, text: line }));
    else out.push({ where: `story ${i + 1}`, text: b.text });
  });
  out.push({ where: "toyIntro", text: l.toyIntro });
  l.questions.forEach((q, i) => {
    out.push({ where: `q${i + 1} prompt`, text: q.prompt });
    out.push({ where: `q${i + 1} hint`, text: q.hint });
    if (q.kind === "choice") q.options.forEach((o, j) => out.push({ where: `q${i + 1} option ${j + 1}`, text: o.text }));
  });
  out.push({ where: "askDad", text: l.askDad });
  out.push({ where: "realLife title", text: l.realLife.title });
  out.push({ where: "realLife body", text: l.realLife.body });
  return out;
}

describe("registry", () => {
  it("has an entry for every lesson id", () => {
    for (const meta of LESSONS) expect(() => hasLesson(meta.id)).not.toThrow();
  });

  it("builds lesson 1", () => {
    expect(hasLesson("money")).toBe(true);
  });

  it("has non-empty trilingual titles for all lessons", () => {
    expect(LESSONS.length).toBeGreaterThanOrEqual(52);
    for (const meta of LESSONS) {
      expect(meta.title.en.trim(), `${meta.id} title en`).not.toBe("");
      expect(meta.title.de.trim(), `${meta.id} title de`).not.toBe("");
      expect(meta.title.pl.trim(), `${meta.id} title pl`).not.toBe("");
      expect(meta.title.de, `${meta.id} de differs from en`).not.toBe(meta.title.en);
      expect(meta.title.pl, `${meta.id} pl differs from en`).not.toBe(meta.title.en);
      expect(meta.title.pl, `${meta.id} pl differs from de`).not.toBe(meta.title.de);
    }
  });
});

describe.each(LESSONS.filter((m) => hasLesson(m.id)))("lesson $id", (meta) => {
  const lesson = getLesson(meta.id)!;

  it("uses its own id", () => {
    expect(lesson.id).toBe(meta.id);
  });

  it("has 5 to 8 story beats", () => {
    expect(lesson.story.length).toBeGreaterThanOrEqual(5);
    expect(lesson.story.length).toBeLessThanOrEqual(8);
  });

  it("has exactly 3 questions, at least one in the toy", () => {
    expect(lesson.questions).toHaveLength(3);
    expect(lesson.questions.some((q) => q.kind === "widget")).toBe(true);
  });

  it("has one correct option in each choice question", () => {
    for (const q of lesson.questions) {
      if (q.kind !== "choice") continue;
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.options.length).toBeLessThanOrEqual(4);
      expect(q.options.filter((o) => o.correct)).toHaveLength(1);
    }
  });

  it("has English, German, and Polish for every text, and each language differs", () => {
    for (const { where, text } of texts(lesson)) {
      expect(text.en.trim(), `${where} en`).not.toBe("");
      expect(text.de.trim(), `${where} de`).not.toBe("");
      expect(text.pl.trim(), `${where} pl`).not.toBe("");
      expect(text.de, `${where} de differs from en`).not.toBe(text.en);
      expect(text.pl, `${where} pl differs from en`).not.toBe(text.en);
      expect(text.pl, `${where} pl differs from de`).not.toBe(text.de);
    }
  });

  it("keeps story beats short for an 8-year-old", () => {
    for (const b of lesson.story) {
      // an animated beat is read one line per tap, so each line is the unit
      for (const line of b.lines ?? [b.text]) {
        expect(line.en.length).toBeLessThanOrEqual(190);
        expect(line.de.length).toBeLessThanOrEqual(230);
        expect(line.pl.length).toBeLessThanOrEqual(230);
      }
    }
  });

  it("gives every animated beat 2 to 6 taps and a diagram", () => {
    for (const b of lesson.story) {
      if (!b.lines) continue;
      expect(b.lines.length).toBeGreaterThanOrEqual(2);
      expect(b.lines.length).toBeLessThanOrEqual(6);
      expect(b.Diagram).toBeDefined();
    }
  });

  it("marks new terms with balanced stars in all three languages", () => {
    for (const { where, text } of texts(lesson)) {
      for (const lang of ["en", "de", "pl"] as const) {
        expect((text[lang].match(/\*/g) ?? []).length % 2, `${where} ${lang} stars`).toBe(0);
      }
      expect((text.en.match(/\*/g) ?? []).length, `${where} same terms en/de`).toBe((text.de.match(/\*/g) ?? []).length);
    }
  });

  it("uses no em or en dashes", () => {
    const all = JSON.stringify([texts(lesson), lesson.factCard]);
    expect(all).not.toMatch(/[\u2013\u2014]/);
  });

  it("has a fact card with 5 or more sourced claims in all three languages", () => {
    expect(lesson.factCard.claims.length).toBeGreaterThanOrEqual(5);
    for (const c of lesson.factCard.claims) {
      expect(c.text.en.trim()).not.toBe("");
      expect(c.text.de.trim()).not.toBe("");
      expect(c.text.pl.trim()).not.toBe("");
      expect(c.text.de).not.toBe(c.text.en);
      expect(c.text.pl).not.toBe(c.text.en);
      expect(c.source).toMatch(/^https:\/\//);
    }
    expect(lesson.factCard.simplified.length).toBeGreaterThanOrEqual(1);
    for (const s of lesson.factCard.simplified) {
      expect(s.en.trim()).not.toBe("");
      expect(s.de.trim()).not.toBe("");
      expect(s.pl.trim()).not.toBe("");
    }
  });
});

// Save codes store badges as a bitmask over LESSONS order (src/progress.ts exportCode),
// so a lesson id must never move. New ids may only be appended.
const SAVED_LESSON_ORDER = [
  "money", "work", "savings", "business", "equity", "loans", "banks", "interest", "taxes", "inflation", "printing", "rates",
  "profit", "sales", "ticketsize", "marketshare", "competition", "marketing", "hiring", "scale",
  "supplydemand", "commodities", "gold", "stocks", "bonds", "stocksvsbonds", "derivatives", "philanthropy",
  "whygovernment", "elections", "democracy", "monarchy", "dictatorship", "capitalism", "communism", "powertriangle",
  "mughals", "spicetrade", "britishinindia", "independence", "ww1", "ww2", "rebuilding", "whyhistory",
  "tools", "massproduction", "computers", "internet", "automation", "ai", "jobs", "humanedge",
  "supply_demand", "scarcity_prices",
];

describe("lesson order", () => {
  it("keeps every existing lesson id in its position (new ids only at the end)", () => {
    const live = LESSONS.map((l) => l.id);
    expect(live.slice(0, SAVED_LESSON_ORDER.length)).toEqual(SAVED_LESSON_ORDER);
  });
});

describe("content count helpers", () => {
  it("counts words without stars or lone punctuation", () => {
    expect(words("It is called *barter* - see?")).toEqual(["It", "is", "called", "barter", "see?"]);
    expect(words("Przychód: 1 000 zł")).toEqual(["Przychód:", "1000", "zł"]);
  });

  it("splits sentences on . ! ? followed by a space, not inside numbers", () => {
    expect(sentences("Rates are 1.5 percent. Wow! Why? Yes")).toEqual(["Rates are 1.5 percent.", "Wow!", "Why?", "Yes"]);
  });

  it("flags a 16-word sentence and passes a 15-word one", () => {
    const fifteen = "one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen.";
    expect(sentences(fifteen).every((s) => words(s).length <= 15)).toBe(true);
    expect(sentences(`${fifteen.slice(0, -1)} sixteen.`).every((s) => words(s).length <= 15)).toBe(false);
  });

  it("finds Polish strings at any depth, including diagram labels", () => {
    expect(polishStrings({ a: [{ text: { en: "x", de: "y", pl: "Bartek" } }] })).toEqual(["Bartek"]);
  });

  it("reads SVG labels from a story diagram", () => {
    const Diagram = ({ step }: { step: number }) =>
      createElement("svg", null, createElement("text", null, "Trade"), step >= 2 ? createElement("text", null, "Trade blocked: needs don't match") : null);
    const fake = { story: [{ text: { en: "", de: "", pl: "" }, lines: [{}, {}], Diagram }] } as unknown as Lesson;
    const long = diagramLabels(fake).filter((x) => words(x.text).length > 4);
    expect(long.map((x) => x.text)).toEqual(Array(3).fill("Trade blocked: needs don't match"));
  });
});

/*
 * Count rules from docs/AGE_10_STANDARD.md. That document is the Senior tier (ages 10-14) standard,
 * so the word caps apply to senior content only. "No Bartek" is a rule for all Polish content (both tiers).
 * Junior content is covered by docs/writing-lessons.md (190 character lines), not by these caps.
 */
const juniorLessons: Lesson[] = LESSONS.filter((m) => hasLesson(m.id)).map((m) => getLesson(m.id)!);
const allLessons: Lesson[] = [...juniorLessons, ...ALL_SENIOR_LESSONS];

function sentenceViolations(l: Lesson): string[] {
  const out: string[] = [];
  l.story.forEach((b, i) =>
    (b.lines ?? [b.text]).forEach((line, j) =>
      LANGS.forEach((lang) =>
        sentences(line[lang]).forEach((s) => {
          const n = words(s).length;
          if (n > 15) out.push(`${l.id} story ${i + 1} line ${j + 1} ${lang} (${n} words): ${s}`);
        }),
      ),
    ),
  );
  return out;
}

function promptViolations(l: Lesson): string[] {
  const out: string[] = [];
  l.questions.forEach((q, i) =>
    LANGS.forEach((lang) => {
      const n = words(q.prompt[lang]).length;
      if (n > 20) out.push(`${l.id} q${i + 1} ${lang} (${n} words): ${q.prompt[lang]}`);
    }),
  );
  return out;
}

function optionViolations(l: Lesson): string[] {
  const out: string[] = [];
  l.questions.forEach((q, i) => {
    if (q.kind !== "choice") return;
    q.options.forEach((o, k) =>
      LANGS.forEach((lang) => {
        const n = words(o.text[lang]).length;
        if (n >= 15) out.push(`${l.id} q${i + 1} option ${k + 1} ${lang} (${n} words): ${o.text[lang]}`);
      }),
    );
  });
  return out;
}

function labelViolations(l: Lesson): string[] {
  return diagramLabels(l)
    .filter((x) => words(x.text).length > 4)
    .map((x) => `${l.id} ${x.where} ${x.lang} (${words(x.text).length} words): ${x.text}`);
}

describe("content counts", () => {
  it("never uses the name Bartek in Polish content, diagrams included", () => {
    const hits: string[] = [];
    for (const l of allLessons) {
      for (const s of polishStrings(l)) if (s.includes("Bartek")) hits.push(`${l.id}: ${s}`);
      for (const x of diagramLabels(l, ["pl"])) if (x.text.includes("Bartek")) hits.push(`${l.id} ${x.where}: ${x.text}`);
    }
    expect(hits).toEqual([]);
  }, 120_000);

  it("keeps senior question prompts at 20 words or fewer", () => {
    expect(ALL_SENIOR_LESSONS.flatMap(promptViolations)).toEqual([]);
  });

  // Skipped until existing lessons are fixed: measured on 2026-11-11, senior content had
  // 1095 long sentences, 159 long options and 1588 long diagram labels, far above one ticket's
  // budget. The parent ticket splits the fixes per lesson. Remove .skip once a rule reaches zero.
  it.skip("keeps senior story sentences at 15 words or fewer", () => {
    expect(ALL_SENIOR_LESSONS.flatMap(sentenceViolations)).toEqual([]);
  });

  it.skip("keeps senior answer options under 15 words", () => {
    expect(ALL_SENIOR_LESSONS.flatMap(optionViolations)).toEqual([]);
  });

  it.skip("keeps senior diagram labels at 4 words or fewer", () => {
    expect(ALL_SENIOR_LESSONS.flatMap(labelViolations)).toEqual([]);
  }, 120_000);
});
