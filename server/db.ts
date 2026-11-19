import pg from "pg";

/** Neon suspends compute after 5 minutes idle. Closing idle connections well before that lets it scale to zero. */
export const IDLE_TIMEOUT_MS = 30_000;

export interface Queryable {
  query(text: string): Promise<unknown>;
}

/** The pool opens connections on demand, so the API starts even when the database is down. */
export function createPool(
  databaseUrl: string,
  log: (message: string) => void = console.error,
): pg.Pool {
  const pool = new pg.Pool({
    connectionString: databaseUrl,
    max: 5,
    idleTimeoutMillis: IDLE_TIMEOUT_MS,
    connectionTimeoutMillis: 5_000,
  });
  // An idle connection that the server drops (Neon suspend, restart) emits "error".
  // Without a listener Node would crash the process.
  pool.on("error", (error) => log(`Idle database connection failed: ${error.message}`));
  return pool;
}

/** True when the database answers a trivial query within `timeoutMs`. */
export async function checkDatabase(db: Queryable, timeoutMs: number): Promise<boolean> {
  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<false>((resolve) => {
    timer = setTimeout(() => resolve(false), timeoutMs);
  });
  const query = db.query("SELECT 1").then(
    () => true,
    () => false,
  );
  try {
    return await Promise.race([query, timeout]);
  } finally {
    clearTimeout(timer);
  }
}
