import { describe, expect, it } from "vitest";
import { ITEMS, POT, budgetYear, costOf, interestOn } from "./deficit.logic";

describe("deficit budget logic", () => {
  it("wants 12 coins against a pot of 10", () => {
    expect(POT).toBe(10);
    expect(costOf(ITEMS.map((i) => i.id))).toBe(12);
    expect(costOf([])).toBe(0);
  });

  it("makes a deficit when spending is above the pot", () => {
    const y = budgetYear(0, 12);
    expect(y.gap).toBe(2);
    expect(y.covered).toBe(10);
    expect(y.balanced).toBe(false);
  });

  it("adds each gap to the debt", () => {
    const first = budgetYear(0, 12);
    expect(first.debtAfter).toBe(2);
    const second = budgetYear(first.debtAfter, 12);
    expect(second.gap).toBe(3);
    expect(second.debtAfter).toBe(5);
  });

  it("takes an interest slice from the pot, at least 1 coin for any debt", () => {
    expect(interestOn(0)).toBe(0);
    expect(interestOn(1)).toBe(1);
    expect(interestOn(4)).toBe(1);
    expect(interestOn(5)).toBe(2);
    expect(interestOn(8)).toBe(2);
    const y = budgetYear(4, 5);
    expect(y.interest).toBe(1);
    expect(y.available).toBe(9);
  });

  it("balances when spending is not above the pot after interest", () => {
    expect(budgetYear(0, 10).balanced).toBe(true);
    expect(budgetYear(8, 8).balanced).toBe(true);
    expect(budgetYear(8, 8).debtAfter).toBe(8);
    expect(budgetYear(8, 9).balanced).toBe(false);
    expect(budgetYear(8, 9).gap).toBe(1);
  });
});
