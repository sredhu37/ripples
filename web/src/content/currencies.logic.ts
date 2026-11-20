/** Steps of the "Vault swap" toy, in order. The toy is done after the last one. */
export const VAULT_STEPS = ["swap", "buy", "stop", "check"] as const;
export type VaultStep = (typeof VAULT_STEPS)[number];

/** True when every step has been done. */
export function isFinished(done: number): boolean {
  return done >= VAULT_STEPS.length;
}

/** The step to show next, or null when all four are done. */
export function nextStep(done: number): VaultStep | null {
  return isFinished(done) ? null : VAULT_STEPS[done];
}
