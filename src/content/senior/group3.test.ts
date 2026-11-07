import { describe, expect, it } from "vitest";
import { GROUP_3_SENIOR_LESSONS } from "./group3";
import { SENIOR_LESSONS } from "./index";

describe("Senior Curriculum: Group 3 Markets", () => {
  const expectedGroup3Ids = [
    "supplydemand",
    "commodities",
    "gold",
    "stocks",
    "bonds",
    "stocksvsbonds",
    "derivatives",
    "philanthropy",
    "supply_demand",
    "scarcity_prices",
  ];

  it("exports all 10 Group 3 senior lessons", () => {
    expect(GROUP_3_SENIOR_LESSONS).toHaveLength(10);
    const ids = GROUP_3_SENIOR_LESSONS.map((l) => l.id);
    for (const expectedId of expectedGroup3Ids) {
      expect(ids).toContain(expectedId);
    }
  });

  it("registers every Group 3 lesson in the global SENIOR_LESSONS map", () => {
    for (const id of expectedGroup3Ids) {
      const lesson = SENIOR_LESSONS[id];
      expect(lesson).toBeDefined();
      expect(lesson.id).toBe(id);
    }
  });

  for (const lesson of GROUP_3_SENIOR_LESSONS) {
    describe(`Lesson ${lesson.id}`, () => {
      it("has exactly 5 story beats", () => {
        expect(lesson.story).toHaveLength(5);
      });

      it("has a valid interactive Toy and ToyIntro", () => {
        expect(typeof lesson.Toy).toBe("function");
        expect(lesson.toyIntro.en.length).toBeGreaterThan(15);
        expect(lesson.toyIntro.de.length).toBeGreaterThan(15);
        expect(lesson.toyIntro.pl.length).toBeGreaterThan(15);
      });

      it("has exactly 3 comprehension quiz questions with choice or widget", () => {
        expect(lesson.questions).toHaveLength(3);
        const widgetQuestion = lesson.questions.find((q) => q.kind === "widget");
        expect(widgetQuestion).toBeDefined();
        if (widgetQuestion && widgetQuestion.kind === "widget") {
          expect(typeof widgetQuestion.Widget).toBe("function");
        }
      });

      it("has trilingual prompt, hint, and options for all questions", () => {
        for (const q of lesson.questions) {
          expect(q.prompt.en.length).toBeGreaterThan(10);
          expect(q.prompt.de.length).toBeGreaterThan(10);
          expect(q.prompt.pl.length).toBeGreaterThan(10);

          expect(q.hint.en.length).toBeGreaterThan(10);
          expect(q.hint.de.length).toBeGreaterThan(10);
          expect(q.hint.pl.length).toBeGreaterThan(10);

          if (q.kind === "choice") {
            expect(q.options.length).toBeGreaterThanOrEqual(3);
            const correct = q.options.filter((o) => o.correct);
            expect(correct).toHaveLength(1);
          }
        }
      });

      it("has trilingual askDad discussion prompts", () => {
        expect(lesson.askDad.en.length).toBeGreaterThan(20);
        expect(lesson.askDad.de.length).toBeGreaterThan(20);
        expect(lesson.askDad.pl.length).toBeGreaterThan(20);
      });

      it("has realLife case studies with citations", () => {
        expect(lesson.realLife.title.en.length).toBeGreaterThan(5);
        expect(lesson.realLife.body.en.length).toBeGreaterThan(50);
        expect(lesson.factCard.claims.length).toBe(5);
        for (const claim of lesson.factCard.claims) {
          expect(claim.source.startsWith("https://") || claim.source.startsWith("http://")).toBe(true);
        }
      });

      it("contains zero forbidden characters: no em dashes and no forbidden Polish name 'Bartek'", () => {
        const textDump = JSON.stringify(lesson);
        expect(textDump).not.toMatch(/[—–]/);
        expect(textDump).not.toContain("Bartek");
      });
    });
  }
});
