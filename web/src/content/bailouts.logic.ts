/** The row has 3 bank dominoes, then 5 shop dominoes. */
export const BANK_DOMINOES = 3;
export const SHOP_DOMINOES = 5;
export const DOMINO_COUNT = BANK_DOMINOES + SHOP_DOMINOES;
export const MAX_BUFFER = 4;

/** How many dominoes fall when the first one is pushed. Each buffer step saves 2 dominoes. */
export function fallenCount(buffer: number): number {
  const b = Math.min(MAX_BUFFER, Math.max(0, Math.round(buffer)));
  return Math.max(1, DOMINO_COUNT - 2 * b);
}

/** True when the fall stops before it reaches the shops. */
export function shopsAreSafe(buffer: number): boolean {
  return fallenCount(buffer) <= BANK_DOMINOES;
}
