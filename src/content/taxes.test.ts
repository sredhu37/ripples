import { describe, expect, it } from "vitest";
import { budget } from "./taxes";

describe("taxes toy", () => {
  it("funds things in order as the tax grows", () => {
    expect(budget(0).funded).toEqual([]);
    expect(budget(1).funded).toEqual(["road"]);
    expect(budget(2).funded).toEqual(["road"]);
    expect(budget(3).funded).toEqual(["road", "school"]);
    expect(budget(4).funded).toEqual(["road", "school", "fire"]);
    expect(budget(5).funded).toEqual(["road", "school", "fire", "park"]);
  });

  it("has exactly one answer for 'road and school, keep at least 7'", () => {
    const ok = [0, 1, 2, 3, 4, 5, 6].filter((t) => {
      const b = budget(t);
      return b.funded.includes("road") && b.funded.includes("school") && b.keep >= 7;
    });
    expect(ok).toEqual([3]);
  });

  it("cannot have everything and still live: the park needs a tax that leaves too little", () => {
    expect(budget(5).enough).toBe(false);
    expect(budget(4).enough).toBe(true);
  });
});
