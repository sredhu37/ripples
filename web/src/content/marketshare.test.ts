import { describe, expect, it } from "vitest";
import { calcMarketShare } from "./marketshare.toy";

describe("marketshare calculations", () => {
  it("calculates percentages for equal split", () => {
    const stats = calcMarketShare(5, 10);
    expect(stats.finnPercent).toBe(50);
    expect(stats.claraPercent).toBe(50);
  });

  it("calculates percentages for 7-3 split", () => {
    const stats = calcMarketShare(7, 10);
    expect(stats.finnPercent).toBe(70);
    expect(stats.claraPercent).toBe(30);
  });

  it("calculates 100-0 monopoly or zero shares", () => {
    const stats = calcMarketShare(10, 10);
    expect(stats.finnPercent).toBe(100);
    expect(stats.claraPercent).toBe(0);
  });
});
