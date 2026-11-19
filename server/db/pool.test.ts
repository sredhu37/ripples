// @vitest-environment node
import { describe, expect, it } from "vitest";
import { checkDatabase, createPool, IDLE_TIMEOUT_MS } from "./pool.js";

describe("createPool", () => {
  it("closes idle connections within 60 seconds so Neon can scale to zero", () => {
    expect(IDLE_TIMEOUT_MS).toBeLessThanOrEqual(60_000);
    const pool = createPool("postgres://ripples:ripples@127.0.0.1:1/ripples");
    expect(pool.options.idleTimeoutMillis).toBe(IDLE_TIMEOUT_MS);
    void pool.end();
  });

  it("logs an idle connection error instead of crashing", () => {
    const logged: string[] = [];
    const pool = createPool("postgres://ripples:ripples@127.0.0.1:1/ripples", (m) =>
      logged.push(m),
    );
    expect(() => pool.emit("error", new Error("terminated"))).not.toThrow();
    expect(logged[0]).toContain("terminated");
    void pool.end();
  });
});

describe("checkDatabase", () => {
  it("is true when the query succeeds", async () => {
    expect(await checkDatabase({ query: async () => ({}) }, 100)).toBe(true);
  });

  it("is false when the query fails", async () => {
    expect(await checkDatabase({ query: () => Promise.reject(new Error("down")) }, 100)).toBe(
      false,
    );
  });

  it("is false when the query hangs past the timeout", async () => {
    expect(await checkDatabase({ query: () => new Promise(() => {}) }, 20)).toBe(false);
  });
});
