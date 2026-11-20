import { describe, expect, it } from "vitest";
import { TRIPS, canAfford, swapCoins } from "./fx.logic";

describe("fx swap and afford check", () => {
  it("swaps whole coins only", () => {
    expect(swapCoins(600, { home: 100, away: 1 })).toBe(6);
    expect(swapCoins(600, { home: 80, away: 1 })).toBe(7);
    expect(swapCoins(6, { home: 1, away: 100 })).toBe(600);
  });

  it("same home coins and price: affordable on one rate, short on another", () => {
    const { homeCoins, price } = TRIPS.en;
    expect(canAfford(homeCoins, { home: 100, away: 1 }, price)).toBe(true);
    expect(canAfford(homeCoins, { home: 120, away: 1 }, price)).toBe(false);
  });

  it("every trip: day 1 and day 3 afford the toy, day 2 does not", () => {
    for (const trip of Object.values(TRIPS)) {
      const results = trip.rates.map((r) => canAfford(trip.homeCoins, r, trip.price));
      expect(results).toEqual([true, false, true]);
    }
  });
});
