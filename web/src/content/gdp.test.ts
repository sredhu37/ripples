import { describe, expect, it } from "vitest";
import { BREAD_PRICE, FISH_PRICE, MAX_GDP, townGdp } from "./gdp.logic";

describe("town GDP", () => {
  it("counts a sold item at its price", () => {
    expect(townGdp({ fish: 3, bread: 0, breadSold: true })).toBe(3 * FISH_PRICE);
    expect(townGdp({ fish: 0, bread: 4, breadSold: true })).toBe(4 * BREAD_PRICE);
  });

  it("adds nothing for an item that is given away", () => {
    expect(townGdp({ fish: 0, bread: 6, breadSold: false })).toBe(0);
  });

  it("adds only the sold items when both are present", () => {
    expect(townGdp({ fish: 4, bread: 5, breadSold: false })).toBe(8);
    expect(townGdp({ fish: 4, bread: 5, breadSold: true })).toBe(18);
  });

  it("has a largest possible total", () => {
    expect(townGdp({ fish: 10, bread: 10, breadSold: true })).toBe(MAX_GDP);
  });
});
