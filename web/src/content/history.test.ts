import { describe, it, expect } from "vitest";
import { calcImperialHarmony } from "./mughals.toy";
import { calcSpiceVoyage } from "./spicetrade.toy";
import { calcColonialTrade } from "./britishinindia.toy";
import { calcSatyagrahaSpool } from "./independence.toy";
import { calcAllianceCascade } from "./ww1.toy";
import { calcHumanRightsDefense } from "./ww2.toy";
import { calcRebuildingProgress } from "./rebuilding.toy";
import { calcHistoryInsights } from "./whyhistory.toy";

describe("Group 5 History Mechanics", () => {
  describe("Lesson 35: The Mughals (calcImperialHarmony)", () => {
    it("calculates growing harmony as scholars join the table", () => {
      const state1 = calcImperialHarmony(1, true);
      expect(state1.harmony).toBe(25);
      expect(state1.status).toBe("growing");

      const state2 = calcImperialHarmony(2, true);
      expect(state2.harmony).toBe(50);
      expect(state2.status).toBe("growing");
    });

    it("reaches full harmony when all four scholars participate in dialogue", () => {
      const full = calcImperialHarmony(4, true);
      expect(full.harmony).toBe(100);
      expect(full.prosperity).toBe(100);
      expect(full.arts).toBe(100);
      expect(full.status).toBe("harmony");
    });

    it("drops into conflict when a ruler commands without listening", () => {
      const conflict = calcImperialHarmony(4, false);
      expect(conflict.harmony).toBe(20);
      expect(conflict.status).toBe("conflict");
    });
  });

  describe("Lesson 36: The Spice Trade (calcSpiceVoyage)", () => {
    it("reflects slow travel and high road tolls for overland caravan trek", () => {
      const land = calcSpiceVoyage("land", "summer");
      expect(land.months).toBe(12);
      expect(land.capacity).toBe(10);
      expect(land.tolls).toBe(40);
      expect(land.status).toBe("slow");
    });

    it("captures favorable monsoon wind for swift maritime transport", () => {
      const seaSummer = calcSpiceVoyage("ocean", "summer");
      expect(seaSummer.months).toBe(3);
      expect(seaSummer.capacity).toBe(50);
      expect(seaSummer.tolls).toBe(0);
      expect(seaSummer.profit).toBe(150);
      expect(seaSummer.status).toBe("favorable");
    });

    it("identifies winter headwind slowing down maritime voyage", () => {
      const seaWinter = calcSpiceVoyage("ocean", "winter");
      expect(seaWinter.months).toBe(8);
      expect(seaWinter.status).toBe("headwind");
    });
  });

  describe("Lesson 37: British in India (calcColonialTrade)", () => {
    it("calculates unfair colonial policy with high artisan tariffs", () => {
      const colonial = calcColonialTrade("colonial");
      expect(colonial.artisanTariff).toBe(30);
      expect(colonial.artisanIncome).toBe(1);
      expect(colonial.artisanStatus).toBe("struggling");
    });

    it("calculates fair trade policy with thriving handloom weavers", () => {
      const fair = calcColonialTrade("fair");
      expect(fair.artisanTariff).toBe(0);
      expect(fair.artisanIncome).toBe(8);
      expect(fair.artisanStatus).toBe("thriving");
    });
  });

  describe("Lesson 38: Independence (calcSatyagrahaSpool)", () => {
    it("calculates initial spool progress", () => {
      const state0 = calcSatyagrahaSpool(0);
      expect(state0.solidarity).toBe(0);
      expect(state0.isFree).toBe(false);
    });

    it("achieves freedom and full solidarity when 3 spools are spun", () => {
      const state3 = calcSatyagrahaSpool(3);
      expect(state3.solidarity).toBe(100);
      expect(state3.isFree).toBe(true);
    });
  });

  describe("Lesson 39: World War 1 (calcAllianceCascade)", () => {
    it("remains calm when no incident has been triggered", () => {
      const calm = calcAllianceCascade(false, false);
      expect(calm.conflict).toBe(0);
      expect(calm.status).toBe("calm");
    });

    it("triggers alliance domino cascade without mediation", () => {
      const cascade = calcAllianceCascade(false, true);
      expect(cascade.conflict).toBe(100);
      expect(cascade.fallenDominoes).toBe(6);
      expect(cascade.status).toBe("cascade");
    });

    it("defuses the crisis when mediation table is present", () => {
      const defused = calcAllianceCascade(true, true);
      expect(defused.conflict).toBe(0);
      expect(defused.fallenDominoes).toBe(0);
      expect(defused.status).toBe("defused");
    });
  });

  describe("Lesson 40: World War 2 (calcHumanRightsDefense)", () => {
    it("calculates defense score based on active pillars", () => {
      const res1 = calcHumanRightsDefense(false, false, false);
      expect(res1.libertyScore).toBe(0);
      expect(res1.isFullyDefended).toBe(false);

      const res2 = calcHumanRightsDefense(true, false, false);
      expect(res2.libertyScore).toBe(33);
      expect(res2.isFullyDefended).toBe(false);

      const res3 = calcHumanRightsDefense(true, true, true);
      expect(res3.libertyScore).toBe(100);
      expect(res3.isFullyDefended).toBe(true);
    });
  });

  describe("Lesson 41: Rebuilding (calcRebuildingProgress)", () => {
    it("returns rivalry when not pooling coal and steel", () => {
      const res = calcRebuildingProgress(false, 3);
      expect(res.peaceScore).toBe(15);
      expect(res.bridgeComplete).toBe(false);
      expect(res.status).toBe("rivalry");
    });

    it("builds bridge beams under EGKS", () => {
      const res1 = calcRebuildingProgress(true, 2);
      expect(res1.peaceScore).toBe(60);
      expect(res1.bridgeComplete).toBe(false);
      expect(res1.status).toBe("building");

      const res2 = calcRebuildingProgress(true, 4);
      expect(res2.peaceScore).toBe(100);
      expect(res2.bridgeComplete).toBe(true);
      expect(res2.status).toBe("united");
    });
  });

  describe("Lesson 42: Why History (calcHistoryInsights)", () => {
    it("evaluates matched artifacts correctly", () => {
      const empty = calcHistoryInsights({});
      expect(empty.correctCount).toBe(0);
      expect(empty.insightsScore).toBe(0);
      expect(empty.isFullyDecoded).toBe(false);

      const partial = calcHistoryInsights({
        astrolabe: "dialogue",
        yarn: "wrong",
      });
      expect(partial.correctCount).toBe(1);
      expect(partial.insightsScore).toBe(25);
      expect(partial.isFullyDecoded).toBe(false);

      const complete = calcHistoryInsights({
        astrolabe: "dialogue",
        yarn: "selfreliance",
        treaty: "diplomacy",
        steel: "reconciliation",
      });
      expect(complete.correctCount).toBe(4);
      expect(complete.insightsScore).toBe(100);
      expect(complete.isFullyDecoded).toBe(true);
    });
  });
});
