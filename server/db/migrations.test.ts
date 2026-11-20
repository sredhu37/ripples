// @vitest-environment node
import pg from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ensureFamily } from "./family.js";
import { assertLocalDatabaseUrl, createTestDatabase, type TestDatabase } from "./testDb.js";

const adminUrl = process.env.DATABASE_URL;

describe("the test database helper", () => {
  it("refuses a host that is not local", () => {
    expect(() => assertLocalDatabaseUrl("postgres://u:p@db.example.com:5432/x")).toThrow(
      "db.example.com",
    );
    expect(() =>
      assertLocalDatabaseUrl("postgres://u:p@ep-1.neon.tech/x?sslmode=require"),
    ).toThrow();
    assertLocalDatabaseUrl("postgres://u:p@localhost:5432/x");
    assertLocalDatabaseUrl("postgres://u:p@127.0.0.1:5432/x");
  });

  it("refuses before it connects", async () => {
    await expect(createTestDatabase("postgres://u:p@db.example.com:5432/x")).rejects.toThrow(
      "Refusing",
    );
  });
});

// Needs a running Postgres whose user may create databases (see README).
// Each run migrates a throwaway database, so it never touches your dev data.
describe.skipIf(!adminUrl)("migrations on a real Postgres", () => {
  let testDb: TestDatabase;
  let db: pg.Client;

  beforeAll(async () => {
    testDb = await createTestDatabase(adminUrl!);
  });

  afterAll(async () => {
    await db?.end();
    await testDb.drop();
  });

  it("applies on an empty database and does nothing on a second run", async () => {
    const first = (await testDb.migrate()) as unknown[];
    expect(first.length).toBeGreaterThan(0);
    expect(await testDb.migrate()).toEqual([]);
    db = new pg.Client({ connectionString: testDb.url });
    await db.connect();
  });

  it("adds avatar to kid_profile, with a default for new rows", async () => {
    const { rows: fam } = await db.query(
      "INSERT INTO family (free_month_ends_at) VALUES (now()) RETURNING id",
    );
    const { rows } = await db.query(
      "INSERT INTO kid_profile (family_id, nickname) VALUES ($1, 'Mia') RETURNING avatar",
      [fam[0].id],
    );
    expect(rows[0].avatar).toBe("Finn");
    await expect(
      db.query("INSERT INTO kid_profile (family_id, nickname, avatar) VALUES ($1, 'A', '')", [
        fam[0].id,
      ]),
    ).rejects.toThrow();
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

describe.skipIf(!adminUrl)("the avatar migration on a database that holds data", () => {
  it("gives an existing profile an avatar the app can draw, and a second run does nothing", async () => {
    const testDb = await createTestDatabase(adminUrl!);
    try {
      await testDb.migrate(2);
      const db = new pg.Client({ connectionString: testDb.url });
      await db.connect();
      const { rows: fam } = await db.query(
        "INSERT INTO family (free_month_ends_at) VALUES (now()) RETURNING id",
      );
      await db.query("INSERT INTO kid_profile (family_id, nickname) VALUES ($1, 'Old')", [
        fam[0].id,
      ]);
      expect(((await testDb.migrate()) as unknown[]).length).toBe(1);
      expect(await testDb.migrate()).toEqual([]);
      const { rows } = await db.query("SELECT avatar FROM kid_profile WHERE nickname = 'Old'");
      expect(rows[0].avatar).toBe("Finn");
      await db.end();
    } finally {
      await testDb.drop();
    }
  });
});
