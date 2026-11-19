/** Prices in Ripple Town, in coins. Same as the money lesson. */
export const FISH_PRICE = 2;
export const BREAD_PRICE = 2;
export const MAX_ITEMS = 10;
/** The most the toy can add up: all fish and all bread sold. */
export const MAX_GDP = MAX_ITEMS * (FISH_PRICE + BREAD_PRICE);

export interface TownYear {
  fish: number;
  bread: number;
  /** true: Bea sells her bread. false: she gives it away. */
  breadSold: boolean;
}

/** Value of what Finn's fish and Bea's bread add to the town's GDP. Only sold goods count. */
export function townGdp({ fish, bread, breadSold }: TownYear): number {
  return fish * FISH_PRICE + (breadSold ? bread * BREAD_PRICE : 0);
}
