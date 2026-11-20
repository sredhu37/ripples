// @vitest-environment node
import { describe, expect, it } from "vitest";
import { createTestDatabase } from "./testDb.js";

const adminUrl = process.env.DATABASE_URL;

// pool.end() resolves before the sockets close, so DROP DATABASE ... WITH (FORCE) can kill an idle
// connection first. The pool then emits an unhandled "error" (57P01) and Vitest fails the run.
// The race is intermittent, so drop many databases to make a regression show up reliably.
describe.skipIf(!adminUrl)("createTestDatabase drop", () => {
  it("drops databases with open idle connections without unhandled errors", async () => {
    for (let i = 0; i < 25; i++) {
      const testDb = await createTestDatabase(adminUrl!);
      const pool = testDb.pool();
      await Promise.all([pool.query("select 1"), pool.query("select 1"), pool.query("select 1")]);
      await testDb.drop();
    }
    // Let any late socket error surface before the test ends.
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(true).toBe(true);
  });
});
