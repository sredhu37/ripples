import { describe, expect, it } from "vitest";
import { LESSONS } from "../lessons";
import { TIMELINE_ERAS, TIMELINE_EVENTS, TIMELINE_REGIONS, eventsFor } from "./data";
import type { Text } from "../lesson/types";

function allTexts(): { where: string; text: Text }[] {
  const out: { where: string; text: Text }[] = [];
  for (const e of TIMELINE_ERAS) {
    out.push(
      { where: `${e.id} label`, text: e.label },
      { where: `${e.id} range`, text: e.dateRange },
      { where: `${e.id} desc`, text: e.description },
    );
  }
  for (const e of TIMELINE_EVENTS) {
    out.push(
      { where: `${e.id} title`, text: e.title },
      { where: `${e.id} junior`, text: e.summary.junior },
      { where: `${e.id} senior`, text: e.summary.senior },
      { where: `${e.id} year`, text: e.year },
    );
  }
  return out;
}

describe("world timeline data", () => {
  it("has 7 eras, each with at least 4 events", () => {
    expect(TIMELINE_ERAS).toHaveLength(7);
    for (const era of TIMELINE_ERAS)
      expect(eventsFor(era.id, "all").length, era.id).toBeGreaterThanOrEqual(4);
  });

  it("has unique event ids and valid eras", () => {
    const ids = TIMELINE_EVENTS.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    const eraIds = TIMELINE_ERAS.map((e) => e.id);
    for (const e of TIMELINE_EVENTS) expect(eraIds).toContain(e.era);
  });

  it("covers every regional track and science", () => {
    for (const r of TIMELINE_REGIONS)
      expect(
        TIMELINE_EVENTS.some((e) => e.region === r),
        r,
      ).toBe(true);
  });

  it("includes the named scientific discoveries", () => {
    const ids = TIMELINE_EVENTS.filter((e) => e.region === "science").map((e) => e.id);
    for (const id of ["galileo", "newton", "edison", "wright", "atom", "penicillin"])
      expect(ids).toContain(id);
  });

  it("links only to real lessons", () => {
    const lessonIds = LESSONS.map((l) => l.id);
    for (const e of TIMELINE_EVENTS) if (e.lessonId) expect(lessonIds, e.id).toContain(e.lessonId);
  });

  it("has non-empty English, German and Polish text, with titles and summaries differing", () => {
    for (const { where, text } of allTexts()) {
      for (const l of ["en", "de", "pl"] as const)
        expect(text[l].trim(), `${where} ${l}`).not.toBe("");
    }
    for (const e of TIMELINE_EVENTS) {
      for (const text of [e.title, e.summary.junior, e.summary.senior]) {
        expect(text.de, e.id).not.toBe(text.en);
        expect(text.pl, e.id).not.toBe(text.en);
      }
      expect(e.summary.senior.en, e.id).not.toBe(e.summary.junior.en);
    }
  });

  it("uses no em or en dashes", () => {
    expect(JSON.stringify(allTexts())).not.toMatch(/[\u2013\u2014]/);
  });
});
