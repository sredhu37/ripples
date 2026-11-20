/** Days of free use for a new family (ADR 0012, decision 10). */
export const FREE_MONTH_DAYS = 30;

export interface ParamQueryable {
  query(text: string, values?: unknown[]): Promise<unknown>;
}

/**
 * Creates the family of a Parent account. Safe to call on every login: a second call
 * does nothing, so a failed first attempt is repaired by the next login.
 */
export async function ensureFamily(db: ParamQueryable, parentUserId: string): Promise<void> {
  await db.query(
    `INSERT INTO family (free_month_ends_at, parent_user_id)
     VALUES (now() + make_interval(days => $2), $1)
     ON CONFLICT (parent_user_id) DO NOTHING`,
    [parentUserId, FREE_MONTH_DAYS],
  );
}
