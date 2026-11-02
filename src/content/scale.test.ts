import { describe, expect, it } from "vitest";
import { calcLeatherUnitCost, calcTotalMaterialCost } from "./scale.toy";

describe("scale calculations", () => {
  it("charges 2 coins per sheet for small orders under 20", () => {
    expect(calcLeatherUnitCost(1)).toBe(2);
    expect(calcLeatherUnitCost(19)).toBe(2);

    const cost1 = calcTotalMaterialCost(5);
    expect(cost1.unitCost).toBe(2);
    expect(cost1.totalCost).toBe(10);
    expect(cost1.discountActive).toBe(false);
  });

  it("applies scale discount (1 coin per sheet) for orders of 20 or more", () => {
    expect(calcLeatherUnitCost(20)).toBe(1);
    expect(calcLeatherUnitCost(50)).toBe(1);

    const cost20 = calcTotalMaterialCost(20);
    expect(cost20.unitCost).toBe(1);
    expect(cost20.totalCost).toBe(20);
    expect(cost20.discountActive).toBe(true);
  });
});
