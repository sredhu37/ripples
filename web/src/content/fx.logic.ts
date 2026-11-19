import type { Lang } from "../progress";

/** An exchange rate: `home` home coins swap for `away` away coins. */
export interface Rate {
  home: number;
  away: number;
}

/** One shopping trip: the coins the child brings, the toy's price in away coins, and the rate on each day. */
export interface Trip {
  homeCoins: number;
  price: number;
  /** Day 1 affords the toy, day 2 comes up short, day 3 affords it with coins left over. */
  rates: [Rate, Rate, Rate];
}

/** Whole away coins you get for `homeCoins` at `rate`. The desk gives no part coins. */
export function swapCoins(homeCoins: number, rate: Rate): number {
  return Math.floor((homeCoins * rate.away) / rate.home);
}

/** True when swapping `homeCoins` at `rate` gives at least `price` away coins. */
export function canAfford(homeCoins: number, rate: Rate, price: number): boolean {
  return swapCoins(homeCoins, rate) >= price;
}

/**
 * Made-up round numbers, close in size to real ones. EN: India to Germany (rupees to euros).
 * DE: Germany to India (euros to rupees). PL: Poland to India (zloty to rupees).
 */
export const TRIPS: Record<Lang, Trip> = {
  en: {
    homeCoins: 600,
    price: 6,
    rates: [
      { home: 100, away: 1 },
      { home: 120, away: 1 },
      { home: 80, away: 1 },
    ],
  },
  de: {
    homeCoins: 6,
    price: 600,
    rates: [
      { home: 1, away: 100 },
      { home: 1, away: 80 },
      { home: 1, away: 120 },
    ],
  },
  pl: {
    homeCoins: 30,
    price: 600,
    rates: [
      { home: 1, away: 20 },
      { home: 1, away: 16 },
      { home: 1, away: 24 },
    ],
  },
};
