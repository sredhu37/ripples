import { describe, expect, it } from "vitest";
import { allRight, priceAfter, START_PRICE } from "./centralbanks.toy";

describe("centralbanks toy", () => {
  it("keeps the bread price when the child never prints", () => {
    expect(priceAfter(0)).toBe(START_PRICE);
  });

  it("raises the bread price for every printed batch", () => {
    expect(priceAfter(2)).toBeGreaterThan(priceAfter(1));
  });

  it("is right only when sound banks get coins and the drawing gets none", () => {
    expect(allRight({ bea: "lend", sam: "lend", pim: "refuse" })).toBe(true);
    expect(allRight({ bea: "lend", sam: "lend", pim: "lend" })).toBe(false);
    expect(allRight({ bea: "refuse", sam: "lend", pim: "refuse" })).toBe(false);
    expect(allRight({ bea: "lend", sam: "lend" })).toBe(false);
  });
});
