import { describe, expect, it } from "vitest";
import { getLesson, hasLesson } from "./index";
import { LESSONS } from "../lessons";
import type { Lesson, Text } from "../lesson/types";

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

  it("has English and German for every text, and German is not a copy", () => {
    for (const { where, text } of texts(lesson)) {
      expect(text.en.trim(), `${where} en`).not.toBe("");
      expect(text.de.trim(), `${where} de`).not.toBe("");
      expect(text.de, `${where} de differs`).not.toBe(text.en);
    }
  });

  it("keeps story beats short for an 8-year-old", () => {
    for (const b of lesson.story) {
      // an animated beat is read one line per tap, so each line is the unit
      for (const line of b.lines ?? [b.text]) {
        expect(line.en.length).toBeLessThanOrEqual(190);
        expect(line.de.length).toBeLessThanOrEqual(230);
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

  it("marks new terms with balanced stars in both languages", () => {
    for (const { where, text } of texts(lesson)) {
      for (const lang of ["en", "de"] as const) {
        expect((text[lang].match(/\*/g) ?? []).length % 2, `${where} ${lang} stars`).toBe(0);
      }
      expect((text.en.match(/\*/g) ?? []).length, `${where} same terms`).toBe((text.de.match(/\*/g) ?? []).length);
    }
  });

  it("uses no em or en dashes", () => {
    const all = JSON.stringify([texts(lesson), lesson.factCard]);
    expect(all).not.toMatch(/[\u2013\u2014]/);
  });

  it("has a fact card with 5 or more sourced claims", () => {
    expect(lesson.factCard.claims.length).toBeGreaterThanOrEqual(5);
    for (const c of lesson.factCard.claims) {
      expect(c.text.trim()).not.toBe("");
      expect(c.source).toMatch(/^https:\/\//);
    }
    expect(lesson.factCard.simplified.length).toBeGreaterThanOrEqual(1);
  });
});
