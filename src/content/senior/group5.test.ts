import { describe, expect, it } from "vitest";
import { group5Lessons } from "./group5";

describe("Senior Group 5: History", () => {
  const expectedLessons = [
    "mughals",
    "spicetrade",
    "britishinindia",
    "independence",
    "ww1",
    "ww2",
    "rebuilding",
    "whyhistory",
  ];

  it("exports all 8 expected lessons matching Issue #85", () => {
    expect(Object.keys(group5Lessons).sort()).toEqual(expectedLessons.sort());
  });

  for (const id of expectedLessons) {
    describe(`Lesson: ${id}`, () => {
      const lesson = group5Lessons[id];

      it("has exactly 5 animated story beats with 3 lines each", () => {
        expect(lesson).toBeDefined();
        expect(lesson.story).toHaveLength(5);
        for (const beat of lesson.story) {
          expect(beat.lines).toBeDefined();
          expect(beat.lines!).toHaveLength(3);
          expect(beat.Diagram).toBeDefined();
          for (const line of beat.lines!) {
            expect(line.en).toBeTruthy();
            expect(line.de).toBeTruthy();
            expect(line.pl).toBeTruthy();
          }
        }
      });

      it("has a valid interactive toy, intro, and completion trigger", () => {
        expect(lesson.toyIntro.en).toBeTruthy();
        expect(lesson.toyIntro.de).toBeTruthy();
        expect(lesson.toyIntro.pl).toBeTruthy();
        expect(lesson.Toy).toBeDefined();
      });

      it("has exactly 3 questions including at least one widget and one choice", () => {
        expect(lesson.questions).toHaveLength(3);
        const kinds = lesson.questions.map((q) => q.kind);
        expect(kinds).toContain("choice");
        expect(kinds).toContain("widget");
        for (const q of lesson.questions) {
          expect(q.prompt.en).toBeTruthy();
          expect(q.prompt.de).toBeTruthy();
          expect(q.prompt.pl).toBeTruthy();
          expect(q.hint.en).toBeTruthy();
          expect(q.hint.de).toBeTruthy();
          expect(q.hint.pl).toBeTruthy();
          if (q.kind === "choice") {
            expect(q.options.length).toBeGreaterThanOrEqual(2);
            expect(q.options.filter((o) => o.correct)).toHaveLength(1);
          }
        }
      });

      it("has askDad prompt and realLife case study with 5 primary-sourced citations", () => {
        expect(lesson.askDad.en).toBeTruthy();
        expect(lesson.askDad.de).toBeTruthy();
        expect(lesson.askDad.pl).toBeTruthy();
        expect(lesson.realLife.title.en).toBeTruthy();
        expect(lesson.realLife.body.en).toBeTruthy();
        expect(lesson.factCard.claims).toHaveLength(5);
        for (const claim of lesson.factCard.claims) {
          expect(claim.text.en).toBeTruthy();
          expect(claim.text.de).toBeTruthy();
          expect(claim.text.pl).toBeTruthy();
          expect(claim.source.startsWith("http")).toBe(true);
        }
        expect(lesson.factCard.simplified.length).toBeGreaterThanOrEqual(1);
      });
    });
  }
});
