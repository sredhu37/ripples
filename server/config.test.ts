// @vitest-environment node
import { describe, expect, it } from "vitest";
import { DEV_DATABASE_URL, loadConfig } from "./config.js";

const SECRET = "x".repeat(32);

describe("loadConfig", () => {
  it("uses the local compose database and port 8080 in dev", () => {
    const config = loadConfig({});
    expect(config).toMatchObject({ port: 8080, databaseUrl: DEV_DATABASE_URL, production: false });
  });

  it("reads the Impressum details from LEGAL_* and splits the address into lines", () => {
    const legal = loadConfig({
      LEGAL_NAME: " Test Person ",
      LEGAL_ADDRESS: "Test Street 1;00000 Testtown",
      LEGAL_EMAIL: "legal@example.com",
    }).legal;
    expect(legal).toEqual({
      name: "Test Person",
      address: ["Test Street 1", "00000 Testtown"],
      email: "legal@example.com",
      phone: null,
      vatId: null,
    });
    expect(loadConfig({ LEGAL_ADDRESS: "A\nB" }).legal.address).toEqual(["A", "B"]);
    expect(loadConfig({}).legal.address).toEqual([]);
  });

  it("reads FEATURES as a JSON object of booleans, and {} when unset or empty", () => {
    expect(loadConfig({}).features).toEqual({});
    expect(loadConfig({ FEATURES: "" }).features).toEqual({});
    expect(loadConfig({ FEATURES: '{"show-loans": false, "x": true}' }).features).toEqual({
      "show-loans": false,
      x: true,
    });
  });

  it("refuses to start on invalid FEATURES and names it", () => {
    expect(() => loadConfig({ FEATURES: "{nope" })).toThrow("FEATURES");
    expect(() => loadConfig({ FEATURES: "[]" })).toThrow("FEATURES");
    expect(() => loadConfig({ FEATURES: '{"show-loans": "no"}' })).toThrow(/FEATURES.*show-loans/);
    expect(() => loadConfig({ FEATURES: '{"show-loans": 0}' })).toThrow(/FEATURES.*show-loans/);
  });

  it("refuses to start in production without DATABASE_URL", () => {
    expect(() => loadConfig({ NODE_ENV: "production" })).toThrow("DATABASE_URL is required");
  });

  it("passes DATABASE_URL through unchanged, including TLS parameters", () => {
    const url = "postgres://user:pw@ep-x.eu-central-1.aws.neon.tech/db?sslmode=require";
    const env = { NODE_ENV: "production", DATABASE_URL: url, BETTER_AUTH_SECRET: SECRET };
    expect(loadConfig(env).databaseUrl).toBe(url);
  });

  it("refuses to start in production without a long BETTER_AUTH_SECRET", () => {
    const env = { NODE_ENV: "production", DATABASE_URL: "postgres://x/y" };
    expect(() => loadConfig(env)).toThrow("BETTER_AUTH_SECRET is required");
    expect(() => loadConfig({ ...env, BETTER_AUTH_SECRET: "short" })).toThrow("32 characters");
  });

  it("is in Self-host mode without RESEND_API_KEY and needs EMAIL_FROM with it", () => {
    expect(loadConfig({}).resendApiKey).toBeUndefined();
    expect(() => loadConfig({ RESEND_API_KEY: "re_x" })).toThrow("EMAIL_FROM");
    const config = loadConfig({ RESEND_API_KEY: "re_x", EMAIL_FROM: "Ripples <a@b.c>" });
    expect(config).toMatchObject({ resendApiKey: "re_x", emailFrom: "Ripples <a@b.c>" });
  });

  it("serves the app only when DIST_DIR is set", () => {
    expect(loadConfig({}).distDir).toBeUndefined();
    expect(loadConfig({ DIST_DIR: "../web/dist" }).distDir).toMatch(/web[\\/]dist$/);
  });

  it("reads PORT and rejects a bad one", () => {
    expect(loadConfig({ PORT: "3000" }).port).toBe(3000);
    expect(() => loadConfig({ PORT: "abc" })).toThrow("PORT");
    expect(() => loadConfig({ PORT: "70000" })).toThrow("PORT");
  });
});
