import { describe, expect, it } from "vitest";
import { bankIsBalanced, coinsAsked } from "./banks.toy";

describe("banks toy rules", () => {
  it("asks for about one fifth on a normal day and half on a bank run", () => {
    expect(coinsAsked(10, false)).toBe(2);
    expect(coinsAsked(10, true)).toBe(5);
    expect(coinsAsked(0, true)).toBe(0);
  });

  it("is balanced only when Bea gets 4 coins and a bank run is still covered", () => {
    expect(bankIsBalanced({ saved: 10, lent: 4, rush: false })).toBe(true);
    expect(bankIsBalanced({ saved: 10, lent: 3, rush: false })).toBe(false);
    expect(bankIsBalanced({ saved: 10, lent: 8, rush: false })).toBe(false);
    expect(bankIsBalanced({ saved: 6, lent: 4, rush: false })).toBe(false);
  });
});
