import { describe, it, expect } from "vitest";
import { calcSupplyDemand } from "./supplydemand.toy";
import { calcCommodityPrice } from "./commodities.toy";
import { calcGoldPrice } from "./gold.toy";
import { calcStockDividends } from "./stocks.toy";
import { calcBondPrice } from "./bonds.toy";
import { calcVoyagePayouts } from "./stocksvsbonds.toy";
import { calcDerivativeOutcome } from "./derivatives.toy";
import { calcEndowmentDistribution } from "./philanthropy.toy";

describe("Group 3: Markets Mechanics", () => {
  describe("Lesson 19: Supply & Demand", () => {
    it("identifies shortage when price is too low", () => {
      const res = calcSupplyDemand(1, 6);
      expect(res.status).toBe("shortage");
      expect(res.demandCount).toBeGreaterThan(6);
    });

    it("identifies surplus when price is too high", () => {
      const res = calcSupplyDemand(8, 6);
      expect(res.status).toBe("surplus");
      expect(res.demandCount).toBeLessThan(6);
    });

    it("clears market at equilibrium price of 4 coins", () => {
      const res = calcSupplyDemand(4, 6);
      expect(res.status).toBe("equilibrium");
      expect(res.demandCount).toBe(6);
      expect(res.supplyCount).toBe(6);
    });
  });

  describe("Lesson 20: Commodities", () => {
    it("models drought scarcity and price spike", () => {
      const res = calcCommodityPrice("drought");
      expect(res.sacks).toBe(20);
      expect(res.price).toBe(8);
      expect(res.status).toBe("scarce");
    });

    it("models normal weather balance", () => {
      const res = calcCommodityPrice("normal");
      expect(res.sacks).toBe(50);
      expect(res.price).toBe(4);
      expect(res.status).toBe("balanced");
    });

    it("models bumper crop abundance and price drop", () => {
      const res = calcCommodityPrice("bumper");
      expect(res.sacks).toBe(90);
      expect(res.price).toBe(2);
      expect(res.status).toBe("plentiful");
    });
  });

  describe("Lesson 21: Gold & Safe Harbors", () => {
    it("reflects productive business profits during calm climate", () => {
      const res = calcGoldPrice("calm", 0);
      expect(res.businessProfit).toBe(4);
      expect(res.price).toBe(10);
    });

    it("reflects business losses and gold safe harbor demand during crisis", () => {
      const res = calcGoldPrice("storm", 3);
      expect(res.businessProfit).toBe(-2);
      expect(res.price).toBe(17);
    });
  });

  describe("Lesson 22: Stocks", () => {
    it("handles zero dividends during frost", () => {
      const res = calcStockDividends("frost");
      expect(res.totalProfit).toBe(0);
      expect(res.dividendPerShare).toBe(0);
      expect(res.sharePrice).toBe(6);
    });

    it("distributes dividends and lifts share price during bumper harvest", () => {
      const res = calcStockDividends("bumper");
      expect(res.totalProfit).toBe(50);
      expect(res.dividendPerShare).toBe(5);
      expect(res.sharePrice).toBe(16);
    });
  });

  describe("Lesson 23: Bonds & Die Zins-Wippe", () => {
    it("prices bond at par (100) when bank rate equals coupon rate (5%)", () => {
      const res = calcBondPrice(5);
      expect(res.price).toBe(100);
    });

    it("tilts bond price down when bank rate rises to 8%", () => {
      const res = calcBondPrice(8);
      expect(res.price).toBe(85);
      expect(res.price).toBeLessThan(100);
    });

    it("tilts bond price up when bank rate drops to 2%", () => {
      const res = calcBondPrice(2);
      expect(res.price).toBe(115);
      expect(res.price).toBeGreaterThan(100);
    });
  });

  describe("Lesson 24: Stocks vs Bonds", () => {
    it("gives unlimited upside to equity holders in treasure voyage", () => {
      const res = calcVoyagePayouts("treasure");
      expect(res.bondPayout).toBe(5);
      expect(res.stockPayout).toBe(95);
    });

    it("enforces creditor priority in shipwreck salvage", () => {
      const res = calcVoyagePayouts("shipwreck");
      expect(res.bondPayout).toBe(4);
      expect(res.stockPayout).toBe(0);
    });
  });

  describe("Lesson 25: Derivatives & Risk Hedging", () => {
    it("exposes unhedged businesses to weather extremes", () => {
      const drought = calcDerivativeOutcome("drought", false);
      expect(drought.openMarketPrice).toBe(8);
      expect(drought.beaStatus).toBe("danger");

      const flood = calcDerivativeOutcome("flood", false);
      expect(flood.openMarketPrice).toBe(1);
      expect(flood.mayaProfitPerSack).toBe(-2);
      expect(flood.mayaStatus).toBe("danger");
    });

    it("locks in price and protects both parties when shield is active", () => {
      const droughtShielded = calcDerivativeOutcome("drought", true);
      expect(droughtShielded.effectivePrice).toBe(4);
      expect(droughtShielded.mayaStatus).toBe("safe");
      expect(droughtShielded.beaStatus).toBe("safe");

      const floodShielded = calcDerivativeOutcome("flood", true);
      expect(floodShielded.effectivePrice).toBe(4);
      expect(floodShielded.mayaStatus).toBe("safe");
      expect(floodShielded.beaStatus).toBe("safe");
    });
  });

  describe("Lesson 26: Philanthropy & Foundations", () => {
    it("validates sustainable endowment harvest distribution", () => {
      const res = calcEndowmentDistribution(20, 20, 0);
      expect(res.totalAllocated).toBe(40);
      expect(res.isSustainable).toBe(true);
    });

    it("flags unsustainable distribution if exceeding annual return", () => {
      const res = calcEndowmentDistribution(20, 20, 10);
      expect(res.totalAllocated).toBe(50);
      expect(res.isSustainable).toBe(false);
    });
  });
});
