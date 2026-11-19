import { describe, expect, it } from "vitest";
import { DOMINO_COUNT, fallenCount, shopsAreSafe } from "./bailouts.logic";

describe("bailouts domino logic", () => {
  it("topples the whole row with no buffer", () => {
    expect(fallenCount(0)).toBe(DOMINO_COUNT);
    expect(shopsAreSafe(0)).toBe(false);
  });

  it("saves 2 dominoes per buffer step and never fewer than 1 falls", () => {
    expect(fallenCount(1)).toBe(6);
    expect(fallenCount(2)).toBe(4);
    expect(fallenCount(4)).toBe(1);
    expect(fallenCount(99)).toBe(1);
    expect(fallenCount(-5)).toBe(DOMINO_COUNT);
  });

  it("protects the shops from buffer 3 up", () => {
    expect(shopsAreSafe(2)).toBe(false);
    expect(shopsAreSafe(3)).toBe(true);
    expect(shopsAreSafe(4)).toBe(true);
  });
});
