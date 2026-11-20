// @vitest-environment node
import { fileURLToPath } from "node:url";
import { runner } from "node-pg-migrate";
import pg from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ensureFamily } from "./family.js";

const adminUrl = process.env.DATABASE_URL;
const migrationsDir = fileURLToPath(new URL("./migrations", import.meta.url));

function migrate(databaseUrl: string) {
  return runner({
    databaseUrl,
    dir: migrationsDir,
    direction: "up",
    migrationsTable: "pgmigrations",
    log: () => {},
  });
}

// Needs a running Postgres whose user may create databases (see README).
// Each run migrates a throwaway database, so it never touches your dev data.
describe.skipIf(!adminUrl)("migrations on a real Postgres", () => {
  const dbName = `ripples_test_${process.pid}_${Date.now()}`;
  let testUrl = "";
  let admin: pg.Client;
  let db: pg.Client;

  beforeAll(async () => {
    admin = new pg.Client({ connectionString: adminUrl });
    await admin.connect();
    await admin.query(`CREATE DATABASE ${dbName}`);
    const url = new URL(adminUrl!);
    url.pathname = `/${dbName}`;
    testUrl = url.toString();
  });

  afterAll(async () => {
    await db?.end();
    await admin.query(`DROP DATABASE IF EXISTS ${dbName} WITH (FORCE)`);
    await admin.end();
  });

  it("applies on an empty database and does nothing on a second run", async () => {
    const first = await migrate(testUrl);
    expect(first.length).toBeGreaterThan(0);
    expect(await migrate(testUrl)).toEqual([]);
    db = new pg.Client({ connectionString: testUrl });
    await db.connect();
  });

  it("creates the family, kid_profile and subscription tables", async () => {
    const { rows } = await db.query(
      `SELECT table_name FROM information_schema.tables
       WHERE table_schema = 'public' AND table_name IN ('family', 'kid_profile', 'subscription')`,
    );
    expect(rows.map((r) => r.table_name).sort()).toEqual(["family", "kid_profile", "subscription"]);
  });

  it("gives a kid profile the defaults of an empty Progress", async () => {
    const { rows: fam } = await db.query(
      "INSERT INTO family (free_month_ends_at) VALUES (now() + interval '30 days') RETURNING id",
    );
    const { rows } = await db.query(
      "INSERT INTO kid_profile (family_id, nickname) VALUES ($1, 'Mia') RETURNING *",
      [fam[0].id],
    );
    expect(rows[0]).toMatchObject({ lang: "en", muted: false, badges: [], disabled_lessons: [] });
  });

  it("rejects a nickname over 20 characters and an unknown language", async () => {
    const { rows: fam } = await db.query(
      "INSERT INTO family (free_month_ends_at) VALUES (now()) RETURNING id",
    );
    const insert = (nickname: string, lang: string) =>
      db.query("INSERT INTO kid_profile (family_id, nickname, lang) VALUES ($1, $2, $3)", [
        fam[0].id,
        nickname,
        lang,
      ]);
    await expect(insert("x".repeat(21), "en")).rejects.toThrow();
    await expect(insert("Mia", "fr")).rejects.toThrow();
    await insert("x".repeat(20), "pl");
  });

  it("allows one parent account per family", async () => {
    await db.query(
      `INSERT INTO "user" (id, name, email, "emailVerified") VALUES ('user-1', '', 'a@example.com', true)`,
    );
    const add = () =>
      db.query("INSERT INTO family (free_month_ends_at, parent_user_id) VALUES (now(), 'user-1')");
    await add();
    await expect(add()).rejects.toThrow();
  });

  it("deletes profiles and the subscription with the family", async () => {
    const { rows: fam } = await db.query(
      "INSERT INTO family (free_month_ends_at) VALUES (now()) RETURNING id",
    );
    const id = fam[0].id;
    await db.query("INSERT INTO kid_profile (family_id, nickname) VALUES ($1, 'Ola')", [id]);
    await db.query(
      `INSERT INTO subscription
         (family_id, provider, provider_customer_id, provider_subscription_id, status, current_period_end)
       VALUES ($1, 'stripe', 'cus_1', 'sub_1', 'active', now())`,
      [id],
    );
    await db.query("DELETE FROM family WHERE id = $1", [id]);
    for (const table of ["kid_profile", "subscription"]) {
      const { rows } = await db.query(`SELECT 1 FROM ${table} WHERE family_id = $1`, [id]);
      expect(rows).toEqual([]);
    }
  });

  it("creates the family on the first login only, and deletes it with the user", async () => {
    await db.query(
      `INSERT INTO "user" (id, name, email, "emailVerified") VALUES ('user-2', '', 'b@example.com', true)`,
    );
    await ensureFamily(db, "user-2");
    await ensureFamily(db, "user-2");
    const { rows } = await db.query(
      `SELECT free_month_ends_at - created_at AS free_for FROM family WHERE parent_user_id = 'user-2'`,
    );
    expect(rows).toHaveLength(1);
    expect(rows[0].free_for.days).toBe(30);
    await db.query(`DELETE FROM "user" WHERE id = 'user-2'`);
    const after = await db.query(`SELECT 1 FROM family WHERE parent_user_id = 'user-2'`);
    expect(after.rows).toEqual([]);
  });
});
