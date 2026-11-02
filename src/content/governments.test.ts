import { describe, it, expect } from "vitest";

describe("Group 4 Governments Mechanics", () => {
  describe("Lesson 27: Why Government", () => {
    function getTownState(rulesLevel: number) {
      if (rulesLevel < 20) {
        return { state: "colliding", checkpoints: 0 };
      } else if (rulesLevel > 80) {
        return { state: "blocked", checkpoints: 5 };
      } else {
        return { state: "smooth", checkpoints: 2 };
      }
    }

    it("identifies chaos without rules", () => {
      expect(getTownState(10).state).toBe("colliding");
    });

    it("identifies gridlock with excessive checkpoints", () => {
      expect(getTownState(90).state).toBe("blocked");
    });

    it("identifies smooth coordination in balanced rule zone", () => {
      expect(getTownState(50).state).toBe("smooth");
    });
  });

  describe("Lesson 28: Elections", () => {
    it("counts majority winner accurately", () => {
      const votes: Record<string, "pier" | "pavilion"> = {
        Finn: "pier",
        Bea: "pavilion",
        Luca: "pier",
        Maya: "pier",
        Sam: "pavilion",
      };
      const pierCount = Object.values(votes).filter((v) => v === "pier").length;
      const pavilionCount = Object.values(votes).filter((v) => v === "pavilion").length;
      expect(pierCount).toBe(3);
      expect(pavilionCount).toBe(2);
      expect(pierCount > pavilionCount).toBe(true);
    });
  });

  describe("Lesson 29: Democracy Compromise", () => {
    function isCompromiseValid(tokens: { lighthouse: number; grain: number; park: number }) {
      const total = tokens.lighthouse + tokens.grain + tokens.park;
      return total === 10 && tokens.lighthouse >= 2 && tokens.grain >= 2 && tokens.park >= 2;
    }

    it("approves fair multi-group compromise", () => {
      expect(isCompromiseValid({ lighthouse: 4, grain: 3, park: 3 })).toBe(true);
      expect(isCompromiseValid({ lighthouse: 3, grain: 4, park: 3 })).toBe(true);
    });

    it("rejects starving a group below minimum fairness threshold", () => {
      expect(isCompromiseValid({ lighthouse: 8, grain: 1, park: 1 })).toBe(false);
      expect(isCompromiseValid({ lighthouse: 5, grain: 5, park: 0 })).toBe(false);
    });
  });

  describe("Lesson 33: Communism Local Knowledge Problem", () => {
    it("reveals shortage when central quota ignores local climate demand", () => {
      const centralQuotaPerDistrict = 33;
      const mountainNeeds = 60;
      const shortage = mountainNeeds - centralQuotaPerDistrict;
      expect(shortage).toBe(27);
    });
  });

  describe("Lesson 34: Power Triangle Equilibrium", () => {
    function evaluateTriangle(citizens: number, business: number, government: number) {
      if (government >= 90 && business <= 20 && citizens <= 20) {
        return "authoritarian";
      }
      if (business >= 90 && government <= 20 && citizens <= 20) {
        return "monopoly";
      }
      if (citizens >= 90 && government <= 20 && business <= 20) {
        return "breakdown";
      }
      const avg = (citizens + business + government) / 3;
      const spread = Math.max(
        Math.abs(citizens - avg),
        Math.abs(business - avg),
        Math.abs(government - avg)
      );
      if (spread <= 25 && citizens >= 30 && business >= 30 && government >= 30) {
        return "equilibrium";
      }
      return "imbalanced";
    }

    it("identifies extreme government domination as authoritarian", () => {
      expect(evaluateTriangle(10, 10, 95)).toBe("authoritarian");
    });

    it("identifies extreme corporate domination as monopoly", () => {
      expect(evaluateTriangle(10, 95, 10)).toBe("monopoly");
    });

    it("identifies healthy equilibrium when power is shared", () => {
      expect(evaluateTriangle(50, 50, 50)).toBe("equilibrium");
      expect(evaluateTriangle(45, 55, 50)).toBe("equilibrium");
    });
  });
});
