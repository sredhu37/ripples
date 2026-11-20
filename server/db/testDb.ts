import { fileURLToPath } from "node:url";
import { runner } from "node-pg-migrate";
import pg from "pg";

const migrationsDir = fileURLToPath(new URL("./migrations", import.meta.url));

/** Tests create and drop databases, so they only run against a Postgres on this machine. */
export function assertLocalDatabaseUrl(databaseUrl: string): void {
  const host = new URL(databaseUrl).hostname;
  if (host !== "localhost" && host !== "127.0.0.1") {
    throw new Error(`Refusing to run tests against the database host "${host}". Use localhost.`);
  }
}

export function migrateUp(databaseUrl: string, count?: number) {
  return runner({
    databaseUrl,
    dir: migrationsDir,
    direction: "up",
    count,
    migrationsTable: "pgmigrations",
    log: () => {},
  });
}

export interface TestDatabase {
  url: string;
  /** Applies all migrations, or only the first `count`. */
  migrate(count?: number): Promise<unknown>;
  /** Opens a pool on the throwaway database. It is closed by `drop`. */
  pool(): pg.Pool;
  drop(): Promise<void>;
}

/** Creates an empty throwaway database next to `adminUrl`'s database. Call `drop` when done. */
export async function createTestDatabase(adminUrl: string): Promise<TestDatabase> {
  assertLocalDatabaseUrl(adminUrl);
  const name = `ripples_test_${process.pid}_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
  const admin = new pg.Client({ connectionString: adminUrl });
  await admin.connect();
  await admin.query(`CREATE DATABASE ${name}`);
  const url = new URL(adminUrl);
  url.pathname = `/${name}`;
  const pools: pg.Pool[] = [];
  return {
    url: url.toString(),
    migrate: (count) => migrateUp(url.toString(), count),
    pool() {
      const pool = new pg.Pool({ connectionString: url.toString(), max: 5 });
      pools.push(pool);
      return pool;
    },
    async drop() {
      // pool.end() resolves before the sockets close, so the FORCE drop below can kill an idle
      // connection first. The pool then emits "error" (57P01). With no listener that is an
      // unhandled error and fails the Vitest run. The database is going away, so ignore it.
      for (const pool of pools) pool.on("error", () => {});
      await Promise.all(pools.map((pool) => pool.end()));
      await admin.query(`DROP DATABASE IF EXISTS ${name} WITH (FORCE)`);
      await admin.end();
    },
  };
}
