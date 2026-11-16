import { describe, expect, it } from "vitest";
import { VAULT_STEPS, isFinished, nextStep } from "./currencies.logic";

describe("currencies vault swap", () => {
  it("walks swap, buy, stop, check in order", () => {
    expect(VAULT_STEPS).toEqual(["swap", "buy", "stop", "check"]);
    expect(nextStep(0)).toBe("swap");
    expect(nextStep(3)).toBe("check");
  });

  it("is finished only after the last step", () => {
    expect(isFinished(3)).toBe(false);
    expect(isFinished(4)).toBe(true);
    expect(nextStep(4)).toBeNull();
  });
});
