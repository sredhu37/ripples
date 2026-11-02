import { describe, expect, it } from "vitest";
import { calcSales } from "./sales.toy";

describe("sales calculation", () => {
  it("calculates zero sales when no customers are served", () => {
    expect(calcSales(0, 3)).toBe(0);
  });

  it("calculates total sales correctly for given customer count and price", () => {
    expect(calcSales(4, 3)).toBe(12);
    expect(calcSales(10, 3)).toBe(30);
  });
});
