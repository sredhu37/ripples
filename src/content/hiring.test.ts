import { describe, expect, it } from "vitest";
import { calcHiringDay } from "./hiring.toy";

describe("hiring calculations", () => {
  it("calculates solo baker metrics", () => {
    const sunnySolo = calcHiringDay(false, "sunny");
    expect(sunnySolo.loavesSold).toBe(4);
    expect(sunnySolo.wage).toBe(0);
    expect(sunnySolo.profit).toBe(8);

    const stormySolo = calcHiringDay(false, "stormy");
    expect(stormySolo.loavesSold).toBe(2);
    expect(stormySolo.wage).toBe(0);
    expect(stormySolo.profit).toBe(4);
  });

  it("calculates hired metrics on sunny day with high capacity", () => {
    const sunnyHired = calcHiringDay(true, "sunny");
    expect(sunnyHired.loavesSold).toBe(8);
    expect(sunnyHired.wage).toBe(5);
    expect(sunnyHired.profit).toBe(11);
  });

  it("calculates hired metrics on stormy day showing fixed wage risk", () => {
    const stormyHired = calcHiringDay(true, "stormy");
    expect(stormyHired.loavesSold).toBe(2);
    expect(stormyHired.wage).toBe(5);
    expect(stormyHired.profit).toBe(-1); // 1 coin loss paid from reserves
  });
});
