import { describe, expect, it } from "vitest";
import { group6Lessons, GROUP_6_SENIOR_LESSONS } from "./group6";

describe("Senior Group 6 Lessons (Technology & AI)", () => {
  const expectedIds = [
    "tools",
    "massproduction",
    "computers",
    "internet",
    "automation",
    "ai",
    "jobs",
    "humanedge",
  ];

  it("exports all 8 lessons with expected ids", () => {
    expect(group6Lessons).toHaveLength(8);
    const ids = group6Lessons.map((l) => l.id);
    expect(ids).toEqual(expectedIds);
    for (const id of expectedIds) {
      expect(GROUP_6_SENIOR_LESSONS[id]).toBeDefined();
      expect(GROUP_6_SENIOR_LESSONS[id].id).toBe(id);
    }
  });

  it.each(expectedIds)("lesson %s satisfies all structural requirements", (id) => {
    const lesson = GROUP_6_SENIOR_LESSONS[id];
    expect(lesson).toBeDefined();

    // 5 beats
    expect(lesson.story).toHaveLength(5);
    for (const beat of lesson.story) {
      expect(beat.lines).toBeDefined();
      expect(beat.lines!).toHaveLength(3);
      for (const line of beat.lines!) {
        expect(line.en.length).toBeGreaterThan(0);
        expect(line.de.length).toBeGreaterThan(0);
        expect(line.pl.length).toBeGreaterThan(0);
        expect(line.en).not.toMatch(/[—–]/);
        expect(line.de).not.toMatch(/[—–]/);
        expect(line.pl).not.toMatch(/[—–]/);
      }
      expect(beat.Diagram).toBeDefined();
    }

    // Toy
    expect(lesson.Toy).toBeDefined();
    expect(lesson.toyIntro.en.length).toBeGreaterThan(0);
    expect(lesson.toyIntro.de.length).toBeGreaterThan(0);
    expect(lesson.toyIntro.pl.length).toBeGreaterThan(0);
    expect(lesson.toyIntro.en).not.toMatch(/[—–]/);
    expect(lesson.toyIntro.de).not.toMatch(/[—–]/);
    expect(lesson.toyIntro.pl).not.toMatch(/[—–]/);

    // Questions: exactly 3 (2 choice, 1 widget)
    expect(lesson.questions).toHaveLength(3);
    const choiceQs = lesson.questions.filter((q) => q.kind === "choice");
    const widgetQs = lesson.questions.filter((q) => q.kind === "widget");
    expect(choiceQs).toHaveLength(2);
    expect(widgetQs).toHaveLength(1);

    for (const q of lesson.questions) {
      expect(q.prompt.en.length).toBeGreaterThan(0);
      expect(q.prompt.de.length).toBeGreaterThan(0);
      expect(q.prompt.pl.length).toBeGreaterThan(0);
      expect(q.prompt.en).not.toMatch(/[—–]/);
      expect(q.prompt.de).not.toMatch(/[—–]/);
      expect(q.prompt.pl).not.toMatch(/[—–]/);
      expect(q.hint.en.length).toBeGreaterThan(0);
      expect(q.hint.de.length).toBeGreaterThan(0);
      expect(q.hint.pl.length).toBeGreaterThan(0);

      if (q.kind === "choice") {
        expect(q.options.length).toBeGreaterThanOrEqual(3);
        const correct = q.options.filter((o) => o.correct);
        expect(correct).toHaveLength(1);
      } else if (q.kind === "widget") {
        expect(q.Widget).toBeDefined();
      }
    }

    // askDad
    expect(lesson.askDad.en.length).toBeGreaterThan(0);
    expect(lesson.askDad.de.length).toBeGreaterThan(0);
    expect(lesson.askDad.pl.length).toBeGreaterThan(0);
    expect(lesson.askDad.en).not.toMatch(/[—–]/);
    expect(lesson.askDad.de).not.toMatch(/[—–]/);
    expect(lesson.askDad.pl).not.toMatch(/[—–]/);

    // realLife
    expect(lesson.realLife.title.en.length).toBeGreaterThan(0);
    expect(lesson.realLife.title.de.length).toBeGreaterThan(0);
    expect(lesson.realLife.title.pl.length).toBeGreaterThan(0);
    expect(lesson.realLife.body.en.length).toBeGreaterThan(0);
    expect(lesson.realLife.body.de.length).toBeGreaterThan(0);
    expect(lesson.realLife.body.pl.length).toBeGreaterThan(0);
    expect(lesson.realLife.body.en).not.toMatch(/[—–]/);
    expect(lesson.realLife.body.de).not.toMatch(/[—–]/);
    expect(lesson.realLife.body.pl).not.toMatch(/[—–]/);

    // factCard
    expect(lesson.factCard.claims).toHaveLength(5);
    for (const c of lesson.factCard.claims) {
      expect(c.text.en.length).toBeGreaterThan(0);
      expect(c.text.de.length).toBeGreaterThan(0);
      expect(c.text.pl.length).toBeGreaterThan(0);
      expect(c.text.en).not.toMatch(/[—–]/);
      expect(c.text.de).not.toMatch(/[—–]/);
      expect(c.text.pl).not.toMatch(/[—–]/);
      expect(c.source).toMatch(/^https?:\/\//);
    }
  });
});
