import { describe, expect, it } from "vitest";
import { getLesson } from "../content";
import { LESSONS, CURRICULUM_GROUPS } from "../lessons";
import { EVENT_SOURCES, MEANWHILE, getMeanwhile, meanwhileEvents, snapshotAt } from "./meanwhile";

const GROUP5 = CURRICULUM_GROUPS.find((g) => g.id === "group5")!.lessonIds;

describe("meanwhile around the world", () => {
  it("covers every Group 5 history lesson", () => {
    expect(GROUP5).toHaveLength(8);
    for (const id of GROUP5) expect(getMeanwhile(id), id).toBeDefined();
    expect(Object.keys(MEANWHILE).sort()).toEqual([...GROUP5].sort());
    for (const id of Object.keys(MEANWHILE)) expect(LESSONS.some((l) => l.id === id)).toBe(true);
  });

  it("has trilingual junior and senior text that differs per language", () => {
    for (const [id, m] of Object.entries(MEANWHILE)) {
      for (const text of [m.junior, m.senior]) {
        for (const l of ["en", "de", "pl"] as const) expect(text[l].trim(), `${id} ${l}`).not.toBe("");
        expect(text.de).not.toBe(text.en);
        expect(text.pl).not.toBe(text.en);
        expect(JSON.stringify(text)).not.toMatch(/[\u2013\u2014]/);
      }
      expect(m.from).toBeLessThan(m.to);
    }
  });

  it("shows at least 4 events in every window and every one has a source", () => {
    for (const [id, m] of Object.entries(MEANWHILE)) {
      const events = meanwhileEvents(m);
      expect(events.length, id).toBeGreaterThanOrEqual(4);
      for (const e of events) expect(EVENT_SOURCES[e.id], `${id} ${e.id}`).toMatch(/^https:\/\//);
    }
  });

  it("snapshot shows the latest event per track up to the chosen year", () => {
    const m = MEANWHILE.ww2;
    expect(snapshotAt(m, 1935)).toHaveLength(0);
    const at1943 = snapshotAt(m, 1943).map((e) => e.id);
    expect(at1943).toContain("bengal1943");
    expect(at1943).not.toContain("india1947");
    const at1950 = snapshotAt(m, 1950).map((e) => e.id);
    expect(at1950).toContain("india1947");
    expect(at1950).toContain("prc");
  });

  it("ww2 contrasts Europe with India's Quit India Movement and the Bengal famine", () => {
    const ids = meanwhileEvents(MEANWHILE.ww2).map((e) => e.id);
    for (const id of ["ww2", "holocaust", "quitindia", "bengal1943"]) expect(ids).toContain(id);
  });

  it("adds a sourced fact card claim for each concurrent event", () => {
    for (const [id, m] of Object.entries(MEANWHILE)) {
      const claims = getLesson(id)!.factCard.claims;
      for (const e of meanwhileEvents(m)) {
        expect(claims.some((c) => c.source === EVENT_SOURCES[e.id] && c.text.en.includes(e.title.en)), `${id} ${e.id}`).toBe(true);
      }
    }
  });
});
