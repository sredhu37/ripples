// @vitest-environment node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { betterAuth } from "better-auth";
import { getAuthTables } from "better-auth/db";
import { memoryAdapter } from "better-auth/adapters/memory";
import { emailOTP } from "better-auth/plugins";
import { expect, it } from "vitest";

const sql = readFileSync(
  fileURLToPath(
    new URL("./db/migrations/20261120083116000_create-auth-tables.sql", import.meta.url),
  ),
  "utf8",
);

// The login library's tables are written by hand in the migration. This fails when a library
// upgrade adds or renames a column, so the mismatch shows up here and not at the first login.
it("the auth migration has every table and column the login library expects", () => {
  const auth = betterAuth({
    database: memoryAdapter({}),
    baseURL: "http://localhost:8080",
    plugins: [emailOTP({ sendVerificationOTP: async () => {} })],
  });
  for (const table of Object.values(getAuthTables(auth.options))) {
    const name = table.modelName === "user" ? '"user"' : table.modelName;
    const start = sql.indexOf(`CREATE TABLE ${name} (`);
    expect(start, `table ${table.modelName}`).toBeGreaterThan(-1);
    const block = sql.slice(start, sql.indexOf(");", start));
    for (const [key, field] of Object.entries(table.fields)) {
      const column = field.fieldName ?? key;
      expect(block, `${table.modelName}.${column}`).toMatch(new RegExp(`(^|\\s)"?${column}"?\\s`));
    }
  }
});
