import { describe, expect, it } from "vitest";
import { calcOutcome } from "./profit.toy";

describe("profit calculation", () => {
  it("calculates positive profit when price exceeds cost", () => {
    const outcome = calcOutcome(4, 2);
    expect(outcome.profit).toBe(2);
    expect(outcome.loss).toBe(0);
  });

  it("calculates loss when cost exceeds price", () => {
    const outcome = calcOutcome(1, 2);
    expect(outcome.profit).toBe(0);
    expect(outcome.loss).toBe(1);
  });

  it("calculates zero profit and zero loss when break even", () => {
    const outcome = calcOutcome(2, 2);
    expect(outcome.profit).toBe(0);
    expect(outcome.loss).toBe(0);
  });
});
