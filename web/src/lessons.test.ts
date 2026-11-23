import { describe, expect, it } from "vitest";
import { CURRICULUM_ORDER, LESSONS } from "./lessons";

describe("CURRICULUM_ORDER", () => {
  it("contains every lesson id exactly once", () => {
    expect(new Set(CURRICULUM_ORDER).size).toBe(CURRICULUM_ORDER.length);
    expect([...CURRICULUM_ORDER].sort()).toEqual(LESSONS.map((l) => l.id).sort());
  });
});
