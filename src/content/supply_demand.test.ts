import { describe, expect, it } from "vitest";
import { getLesson, hasLesson } from "./index";
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

describe("Lesson 3.9: supply_demand", () => {
  it("is registered and resolvable for junior and senior", () => {
    expect(hasLesson("supply_demand")).toBe(true);
    const junior = getLesson("supply_demand", "junior");
    const senior = getLesson("supply_demand", "senior");
    expect(junior).toBeDefined();
    expect(senior).toBeDefined();
    expect(junior).not.toBe(senior);
  });

  const tiers: [string, Lesson][] = [
    ["junior", getLesson("supply_demand", "junior")!],
    ["senior", getLesson("supply_demand", "senior")!],
  ];

  describe.each(tiers)("%s tier", (_tier, lesson) => {
    it("has 5 to 8 story beats", () => {
      expect(lesson.story.length).toBeGreaterThanOrEqual(5);
      expect(lesson.story.length).toBeLessThanOrEqual(8);
    });

    it("has exactly 3 questions with at least one widget", () => {
      expect(lesson.questions).toHaveLength(3);
      expect(lesson.questions.some((q) => q.kind === "widget")).toBe(true);
    });

    it("has trilingual text where each language differs and is not empty", () => {
      for (const { where, text } of texts(lesson)) {
        expect(text.en.trim(), `${where} en`).not.toBe("");
        expect(text.de.trim(), `${where} de`).not.toBe("");
        expect(text.pl.trim(), `${where} pl`).not.toBe("");
        expect(text.de, `${where} de differs from en`).not.toBe(text.en);
        expect(text.pl, `${where} pl differs from en`).not.toBe(text.en);
        expect(text.pl, `${where} pl differs from de`).not.toBe(text.de);
      }
    });

    it("contains no em or en dashes", () => {
      const all = JSON.stringify([texts(lesson), lesson.factCard]);
      expect(all).not.toMatch(/[\u2013\u2014]/);
    });

    it("has balanced stars in all three languages", () => {
      for (const { where, text } of texts(lesson)) {
        for (const lang of ["en", "de", "pl"] as const) {
          expect((text[lang].match(/\*/g) ?? []).length % 2, `${where} ${lang} stars`).toBe(0);
        }
        expect((text.en.match(/\*/g) ?? []).length, `${where} same terms en/de`).toBe((text.de.match(/\*/g) ?? []).length);
      }
    });

    it("has a fact card with 5+ verified claims with https sources", () => {
      expect(lesson.factCard.claims.length).toBeGreaterThanOrEqual(5);
      for (const c of lesson.factCard.claims) {
        expect(c.text.en.trim()).not.toBe("");
        expect(c.text.de.trim()).not.toBe("");
        expect(c.text.pl.trim()).not.toBe("");
        expect(c.source).toMatch(/^https:\/\//);
      }
      expect(lesson.factCard.simplified.length).toBeGreaterThanOrEqual(1);
    });
  });
});
