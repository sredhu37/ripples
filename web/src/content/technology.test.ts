import { describe, it, expect } from "vitest";
import { calcSteamPower } from "./tools.toy";
import { calcAssemblyThroughput } from "./massproduction.toy";
import { calcBinaryLogic } from "./computers.toy";
import { calcPacketRouting } from "./internet.toy";
import { calcAutomationSafety } from "./automation.toy";
import { calcPatternRecognition } from "./ai.toy";
import { calcWorkforceShift } from "./jobs.toy";
import { calcHumanMachineHarmony } from "./humanedge.toy";

describe("Group 6 Technology Mechanics (Lessons 43-50)", () => {
  describe("Lesson 43: Tools to Steam (calcSteamPower)", () => {
    it("reports muscle power when using human or animal muscle", () => {
      const muscle = calcSteamPower("muscle", false, false);
      expect(muscle.power).toBe(10);
      expect(muscle.isContinuous).toBe(false);
      expect(muscle.status).toBe("muscle");
    });

    it("reports weather-dependent power for waterwheel", () => {
      const water = calcSteamPower("waterwheel", false, false);
      expect(water.power).toBe(30);
      expect(water.isContinuous).toBe(false);
      expect(water.status).toBe("weather");
    });

    it("reports empty status when steam engine lacks fuel or water", () => {
      const empty = calcSteamPower("steam", true, false);
      expect(empty.power).toBe(0);
      expect(empty.isContinuous).toBe(false);
      expect(empty.status).toBe("empty");
    });

    it("reaches full continuous steam power when supplied with coal and water", () => {
      const steam = calcSteamPower("steam", true, true);
      expect(steam.power).toBe(100);
      expect(steam.isContinuous).toBe(true);
      expect(steam.status).toBe("full_steam");
    });
  });

  describe("Lesson 44: Mass Production (calcAssemblyThroughput)", () => {
    it("calculates high unit cost and low output for hand artisan craft", () => {
      const artisan = calcAssemblyThroughput("craft", 0);
      expect(artisan.bikesProduced).toBe(1);
      expect(artisan.costPerBike).toBe(500);
      expect(artisan.isAffordable).toBe(false);
      expect(artisan.status).toBe("craft");
    });

    it("shows intermediate stages on the assembly line", () => {
      const stage1 = calcAssemblyThroughput("assembly", 1);
      expect(stage1.bikesProduced).toBe(4);
      expect(stage1.costPerBike).toBe(50);
      expect(stage1.isAffordable).toBe(false);
    });

    it("achieves full throughput and affordability when all 3 stations are staffed", () => {
      const full = calcAssemblyThroughput("assembly", 3);
      expect(full.bikesProduced).toBe(10);
      expect(full.costPerBike).toBe(50);
      expect(full.isAffordable).toBe(true);
      expect(full.status).toBe("assembly");
    });
  });

  describe("Lesson 45: Computers (calcBinaryLogic)", () => {
    it("calculates decimal 0 when all 4 bits are off", () => {
      const res = calcBinaryLogic(false, false, false, false, 11);
      expect(res.decimal).toBe(0);
      expect(res.isMatch).toBe(false);
    });

    it("accurately sums binary bit place values (8 + 2 + 1 = 11)", () => {
      const res = calcBinaryLogic(true, false, true, true, 11);
      expect(res.decimal).toBe(11);
      expect(res.isMatch).toBe(true);
    });

    it("calculates maximum 4-bit value of 15 (8 + 4 + 2 + 1)", () => {
      const res = calcBinaryLogic(true, true, true, true, 15);
      expect(res.decimal).toBe(15);
      expect(res.isMatch).toBe(true);
    });
  });

  describe("Lesson 46: The Internet (calcPacketRouting)", () => {
    it("reports incomplete packet arrival when no cables are active", () => {
      const res = calcPacketRouting(false, false, false);
      expect(res.deliveredCount).toBe(0);
      expect(res.isComplete).toBe(false);
      expect(res.assembledMessage).toBe("...");
    });

    it("shows partial message as lines are connected", () => {
      const res = calcPacketRouting(true, true, false);
      expect(res.deliveredCount).toBe(2);
      expect(res.isComplete).toBe(false);
      expect(res.assembledMessage).toBe("HEL... RIP...");
    });

    it("reassembles complete message when all 3 packets arrive over different routes", () => {
      const res = calcPacketRouting(true, true, true);
      expect(res.deliveredCount).toBe(3);
      expect(res.isComplete).toBe(true);
      expect(res.assembledMessage).toBe("HELLO RIPPLES!");
      expect(res.status).toBe("delivered");
    });
  });

  describe("Lesson 47: Robots and Automation (calcAutomationSafety)", () => {
    it("flags hazard when running high speed without safety curtain", () => {
      const hazard = calcAutomationSafety(3, true, false);
      expect(hazard.throughput).toBe(90);
      expect(hazard.safetyScore).toBe(30);
      expect(hazard.isSafe).toBe(false);
      expect(hazard.status).toBe("hazard");
    });

    it("achieves 100% safety and high output with sensors and light curtain armed", () => {
      const optimal = calcAutomationSafety(3, true, true);
      expect(optimal.throughput).toBe(90);
      expect(optimal.safetyScore).toBe(100);
      expect(optimal.isSafe).toBe(true);
      expect(optimal.isOptimal).toBe(true);
      expect(optimal.status).toBe("optimal");
    });
  });

  describe("Lesson 48: Artificial Intelligence (calcPatternRecognition)", () => {
    it("yields low accuracy when trained on noisy or mislabeled data", () => {
      const noisy = calcPatternRecognition(10, false);
      expect(noisy.accuracy).toBe(35);
      expect(noisy.isTrained).toBe(false);
      expect(noisy.status).toBe("untrained");
    });

    it("yields moderate accuracy with small sample size", () => {
      const small = calcPatternRecognition(5, true);
      expect(small.accuracy).toBe(80);
      expect(small.isTrained).toBe(false);
    });

    it("achieves 98% accuracy when trained with 10 clean verified examples", () => {
      const clean = calcPatternRecognition(10, true);
      expect(clean.accuracy).toBe(98);
      expect(clean.isTrained).toBe(true);
      expect(clean.status).toBe("trained");
    });
  });

  describe("Lesson 49: Changing Jobs (calcWorkforceShift)", () => {
    it("reports vulnerable economy when clinging exclusively to routine manual roles", () => {
      const routine = calcWorkforceShift("routine");
      expect(routine.routineJobs).toBe(80);
      expect(routine.readinessScore).toBe(25);
      expect(routine.isFutureReady).toBe(false);
      expect(routine.status).toBe("vulnerable");
    });

    it("prepares 85% of workers for rewarding future roles under upskilling policy", () => {
      const upskilled = calcWorkforceShift("upskilling");
      expect(upskilled.modernJobs).toBe(85);
      expect(upskilled.readinessScore).toBe(95);
      expect(upskilled.isFutureReady).toBe(true);
      expect(upskilled.status).toBe("future_ready");
    });
  });

  describe("Lesson 50: The Human Edge (calcHumanMachineHarmony)", () => {
    it("warns of imbalance when high computing power operates without human empathy", () => {
      const cold = calcHumanMachineHarmony(3, 1);
      expect(cold.isHarmonious).toBe(false);
      expect(cold.status).toBe("imbalanced");
    });

    it("achieves 96% societal flourishing when guided by deep empathy and ethics", () => {
      const flourishing = calcHumanMachineHarmony(3, 3);
      expect(flourishing.flourishingScore).toBe(96);
      expect(flourishing.isHarmonious).toBe(true);
      expect(flourishing.status).toBe("flourishing");
    });
  });
});
