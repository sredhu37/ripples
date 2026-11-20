// @vitest-environment node
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createApp } from "./app.js";
import { createPool } from "./db/pool.js";

describe("GET /api/health", () => {
  it("returns 503 when the database is unreachable", async () => {
    // Port 1 has no listener: the same as a stopped Postgres.
    const pool = createPool("postgres://ripples:ripples@127.0.0.1:1/ripples");
    const res = await createApp({ db: pool }).request("/api/health");
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ status: "error" });
    await pool.end();
  });

  it("returns 200 when the query succeeds", async () => {
    const res = await createApp({ db: { query: async () => ({}) } }).request("/api/health");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "ok" });
  });

  it("returns 503 when the query hangs", async () => {
    const app = createApp({ db: { query: () => new Promise(() => {}) }, healthTimeoutMs: 20 });
    expect((await app.request("/api/health")).status).toBe(503);
  });
});

// Needs a running Postgres: `docker compose up -d`, then
// DATABASE_URL=postgres://ripples:ripples@localhost:5432/ripples npm test
describe.skipIf(!process.env.DATABASE_URL)("GET /api/health with a real Postgres", () => {
  it("returns 200", async () => {
    const pool = createPool(process.env.DATABASE_URL!);
    const res = await createApp({ db: pool }).request("/api/health");
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "ok" });
    await pool.end();
  });
});

describe("production mode, serving the built app", () => {
  let distDir: string;
  const db = { query: async () => ({}) };

  beforeAll(() => {
    distDir = mkdtempSync(join(tmpdir(), "ripples-dist-"));
    writeFileSync(join(distDir, "index.html"), "<html>app</html>");
    mkdirSync(join(distDir, "assets"));
    writeFileSync(join(distDir, "assets", "app.js"), "console.log(1)");
  });
  afterAll(() => rmSync(distDir, { recursive: true, force: true }));

  it("serves index.html at /", async () => {
    const res = await createApp({ db, distDir }).request("/");
    expect(res.status).toBe(200);
    expect(await res.text()).toContain("app");
  });

  it("serves built files", async () => {
    const res = await createApp({ db, distDir }).request("/assets/app.js");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("console.log(1)");
  });

  it("falls back to index.html for a path without a file extension", async () => {
    const res = await createApp({ db, distDir }).request("/lessons/inflation");
    expect(res.status).toBe(200);
    expect(await res.text()).toContain("app");
  });

  it("returns 404 for a missing file", async () => {
    expect((await createApp({ db, distDir }).request("/assets/missing.js")).status).toBe(404);
  });

  it("returns a JSON 404 for an unknown API path", async () => {
    const res = await createApp({ db, distDir }).request("/api/nope");
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "not_found" });
  });
});

describe("dev mode", () => {
  it("serves no app files, only the API", async () => {
    const res = await createApp({ db: { query: async () => ({}) } }).request("/");
    expect(res.status).toBe(404);
  });
});
