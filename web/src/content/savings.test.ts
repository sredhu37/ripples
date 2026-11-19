import { describe, expect, it } from "vitest";
import { plan } from "./savings";

describe("savings planner", () => {
  it("buys the bike after 4 weeks when saving 3 coins a week", () => {
    const p = plan(3, false, false);
    expect(p.bikeWeek).toBe(4);
    expect(p.treats).toBe(1);
  });

  it("takes 6 weeks with 2 coins and 3 weeks with 4 coins", () => {
    expect(plan(2, false, false).bikeWeek).toBe(6);
    expect(plan(4, false, false).bikeWeek).toBe(3);
    expect(plan(4, false, false).treats).toBe(0);
  });

  it("never buys the bike when saving nothing", () => {
    expect(plan(0, false, false).bikeWeek).toBeNull();
  });

  it("rain without a rainy-day jar takes coins from the bike jar", () => {
    const p = plan(3, false, true);
    expect(p.rainPaidBy).toBe("bike");
    expect(p.weeks[3].bike).toBe(9);
    expect(p.bikeWeek).toBe(5);
  });

  it("rain with a rainy-day jar leaves the bike jar alone", () => {
    const p = plan(3, true, true);
    expect(p.rainPaidBy).toBe("rainy");
    expect(p.weeks[3].rainy).toBe(1);
    expect(p.bikeWeek).toBe(4);
    expect(p.treats).toBe(0);
  });

  it("is short if the bike was bought and no rainy-day jar exists", () => {
    expect(plan(4, false, true).rainPaidBy).toBe("short");
  });

  it("limits saving to 3 coins when the rainy-day jar takes 1", () => {
    expect(plan(4, true, false).saved).toBe(3);
  });
});
