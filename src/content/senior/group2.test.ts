import { describe, expect, it } from "vitest";
import { getLesson } from "../index";
import { GROUP_2_SENIOR_LESSONS } from "./group2";
import type { Lesson, Text } from "../../lesson/types";

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

describe("Group 2 Senior Lessons", () => {
  it("registers all 6 senior lessons in Group 2", () => {
    expect(GROUP_2_SENIOR_LESSONS).toHaveLength(6);
    for (const l of GROUP_2_SENIOR_LESSONS) {
      const resolved = getLesson(l.id, "senior");
      expect(resolved).toBeDefined();
      expect(resolved).toBe(l);
      // For lessons that also exist in junior (profit, sales, competition), junior is different
      const junior = getLesson(l.id, "junior");
      if (junior) {
        expect(junior).not.toBe(resolved);
      }
    }
  });

  describe.each(GROUP_2_SENIOR_LESSONS)("senior lesson $id", (lesson) => {
    it("has 5 to 8 story beats", () => {
      expect(lesson.story.length).toBeGreaterThanOrEqual(5);
      expect(lesson.story.length).toBeLessThanOrEqual(8);
    });

    it("has exactly 3 questions, at least one in the toy/widget", () => {
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
    });

    it("cites real primary sources (no Wikipedia/generic blog)", () => {
      for (const c of lesson.factCard.claims) {
        expect(c.source).not.toMatch(/wikipedia\.org/);
        expect(c.source).not.toMatch(/investopedia\.com\/$/);
      }
    });

    it("provides simplified summaries for complex real world items", () => {
      expect(lesson.factCard.simplified.length).toBeGreaterThanOrEqual(1);
      for (const s of lesson.factCard.simplified) {
        expect(s.en.trim()).not.toBe("");
        expect(s.de.trim()).not.toBe("");
        expect(s.pl.trim()).not.toBe("");
      }
    });

    it("has askDad and realLife blocks", () => {
      expect(lesson.askDad.en.trim()).not.toBe("");
      expect(lesson.realLife.title.en.trim()).not.toBe("");
      expect(lesson.realLife.body.en.trim()).not.toBe("");
    });
  });
});
