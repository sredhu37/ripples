import { describe, expect, it } from "vitest";
import { CURRICULUM_GROUPS, CURRICULUM_ORDER } from "./lessons";
import { emptyProgress } from "./progress";
import { LOCKED_SHOWN, buildTrail } from "./trailView";

describe("buildTrail", () => {
  it("renders at most 2 locked stops in full and counts the rest", () => {
    const sections = buildTrail(emptyProgress(), CURRICULUM_ORDER);
    expect(sections.map((s) => s.group.id)).toEqual(CURRICULUM_GROUPS.map((g) => g.id));
    const stops = sections.flatMap((s) => s.stops);
    expect(stops.filter((s) => s.state === "locked").length).toBe(LOCKED_SHOWN);
    expect(stops.filter((s) => s.state === "next").length).toBe(1);
    const first = sections[0];
    expect(first.stops.length).toBe(3);
    expect(first.moreLocked).toBe(first.total - 3);
    // Later groups are all locked: heading and count only.
    for (const s of sections.slice(1)) {
      expect(s.muted).toBe(true);
      expect(s.stops).toEqual([]);
      expect(s.moreLocked).toBe(s.total);
    }
  });

  it("numbers lessons continuously across groups", () => {
    const group1 = CURRICULUM_GROUPS[0].lessonIds;
    const sections = buildTrail({ ...emptyProgress(), badges: [...group1] }, CURRICULUM_ORDER);
    expect(sections[0].stops.at(-1)?.number).toBe(group1.length);
    expect(sections[1].stops[0].number).toBe(group1.length + 1);
    expect(sections[1].stops[0].state).toBe("next");
    expect(sections[1].muted).toBe(false);
  });

  it("drops a group whose lessons are all disabled", () => {
    const progress = { ...emptyProgress(), disabledLessons: [...CURRICULUM_GROUPS[2].lessonIds] };
    const ids = buildTrail(progress, CURRICULUM_ORDER).map((s) => s.group.id);
    expect(ids).not.toContain(CURRICULUM_GROUPS[2].id);
    expect(ids.length).toBe(CURRICULUM_GROUPS.length - 1);
  });
});
