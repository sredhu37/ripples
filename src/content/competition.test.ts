import { describe, expect, it } from "vitest";
import { calcCompetitionOutcome } from "./competition.toy";

describe("competition calculations", () => {
  it("gives equal split when price and quality are equal", () => {
    const outcome = calcCompetitionOutcome(
      { price: 3, hasHoneyOrSesame: false },
      { price: 3, hasHoneyOrSesame: false },
    );
    expect(outcome.beaCustomers).toBe(5);
    expect(outcome.lucaCustomers).toBe(5);
  });

  it("favors shop with higher quality recipe at same price", () => {
    const outcome = calcCompetitionOutcome(
      { price: 3, hasHoneyOrSesame: true },
      { price: 3, hasHoneyOrSesame: false },
    );
    expect(outcome.beaCustomers).toBeGreaterThan(outcome.lucaCustomers);
  });

  it("favors shop with lower price at same quality", () => {
    const outcome = calcCompetitionOutcome(
      { price: 2, hasHoneyOrSesame: false },
      { price: 3, hasHoneyOrSesame: false },
    );
    expect(outcome.beaCustomers).toBeGreaterThan(outcome.lucaCustomers);
  });
});
