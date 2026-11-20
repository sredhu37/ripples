import { describe, expect, it } from "vitest";
import { grow, reachesTarget } from "./interest";

describe("interest garden maths", () => {
  it("compounds yearly: 100 at 5% is 105 then 110.25", () => {
    const v = grow(100, 5, 2);
    expect(v[0]).toBe(100);
    expect(v[1]).toBeCloseTo(105, 6);
    expect(v[2]).toBeCloseTo(110.25, 6);
  });

  it("zero interest never grows", () => {
    expect(grow(100, 0, 5).every((x) => x === 100)).toBe(true);
  });

  it("widget target: 150 to 170 coins from 100", () => {
    expect(reachesTarget(2, 3)).toBe(false); // 106
    expect(reachesTarget(5, 10)).toBe(true); // 163
    expect(reachesTarget(10, 10)).toBe(false); // 259
    expect(reachesTarget(0, 10)).toBe(false);
  });
});
