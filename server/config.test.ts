// @vitest-environment node
import { describe, expect, it } from "vitest";
import { DEV_DATABASE_URL, loadConfig } from "./config.js";

describe("loadConfig", () => {
  it("uses the local compose database and port 8080 in dev", () => {
    const config = loadConfig({});
    expect(config).toMatchObject({ port: 8080, databaseUrl: DEV_DATABASE_URL, production: false });
  });

  it("refuses to start in production without DATABASE_URL", () => {
    expect(() => loadConfig({ NODE_ENV: "production" })).toThrow("DATABASE_URL is required");
  });

  it("passes DATABASE_URL through unchanged, including TLS parameters", () => {
    const url = "postgres://user:pw@ep-x.eu-central-1.aws.neon.tech/db?sslmode=require";
    expect(loadConfig({ NODE_ENV: "production", DATABASE_URL: url }).databaseUrl).toBe(url);
  });

  it("reads PORT and rejects a bad one", () => {
    expect(loadConfig({ PORT: "3000" }).port).toBe(3000);
    expect(() => loadConfig({ PORT: "abc" })).toThrow("PORT");
    expect(() => loadConfig({ PORT: "70000" })).toThrow("PORT");
  });
});
