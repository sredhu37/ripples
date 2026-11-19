/** The tax pot holds 10 coins every year. The toy lasts 3 years. */
export const POT = 10;
export const YEARS = 3;
/** The widest bar in the toy: the cost of everything the town wants. */
export const MAX_UNITS = 12;

export type ItemId = "school" | "road" | "park" | "wall";

/** What Mayor Moss can build, and what it costs in coins. Together: 12 coins. */
export const ITEMS: { id: ItemId; cost: number }[] = [
  { id: "school", cost: 3 },
  { id: "road", cost: 3 },
  { id: "park", cost: 2 },
  { id: "wall", cost: 4 },
];

export function costOf(picked: ItemId[]): number {
  return ITEMS.filter((i) => picked.includes(i.id)).reduce((sum, i) => sum + i.cost, 0);
}

/** Interest takes a quarter of the debt, rounded up, so any debt costs at least 1 coin. */
export function interestOn(debt: number): number {
  return debt <= 0 ? 0 : Math.ceil(debt / 4);
}

export interface Year {
  /** Coins the pot loses to interest this year. */
  interest: number;
  /** Coins left in the pot to spend. */
  available: number;
  /** Spending paid from the pot. */
  covered: number;
  /** Spending above the pot: the deficit. It is borrowed. */
  gap: number;
  /** The debt at the end of the year. */
  debtAfter: number;
  /** True when spending is not above the pot after interest. */
  balanced: boolean;
}

/** One budget year: the debt carried in, and the coins the child chose to spend. */
export function budgetYear(debt: number, spend: number): Year {
  const interest = Math.min(POT, interestOn(debt));
  const available = POT - interest;
  const gap = Math.max(0, spend - available);
  return {
    interest,
    available,
    covered: spend - gap,
    gap,
    debtAfter: debt + gap,
    balanced: gap === 0,
  };
}
