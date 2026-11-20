import { resolve } from "node:path";

/** Matches the user, password and database in compose.yaml. Used in dev only. */
export const DEV_DATABASE_URL = "postgres://ripples:ripples@localhost:5432/ripples";

export interface Config {
  port: number;
  databaseUrl: string;
  production: boolean;
  /** Folder with the built app (`npm run build`). */
  distDir: string;
  /** Signs session cookies. Required in production. */
  authSecret: string;
  /** Public address of the API (`BETTER_AUTH_URL`). */
  baseUrl?: string;
  /** Set: login codes go out by Resend. Unset: Self-host mode, codes go to the log. */
  resendApiKey?: string;
  /** Sender of the login email, e.g. `Ripples <login@example.com>`. Required with `resendApiKey`. */
  emailFrom?: string;
}

/** Dev only. Never used in production: `loadConfig` demands a real secret there. */
export const DEV_AUTH_SECRET = "dev-only-secret-do-not-use-in-production";

export function loadConfig(env: NodeJS.ProcessEnv): Config {
  const production = env.NODE_ENV === "production";

  const port = env.PORT === undefined || env.PORT === "" ? 8080 : Number(env.PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`PORT must be a whole number from 1 to 65535, got "${env.PORT}"`);
  }

  let databaseUrl = env.DATABASE_URL;
  if (!databaseUrl) {
    if (production) throw new Error("DATABASE_URL is required in production");
    databaseUrl = DEV_DATABASE_URL;
  }

  let authSecret = env.BETTER_AUTH_SECRET;
  if (!authSecret) {
    if (production) throw new Error("BETTER_AUTH_SECRET is required in production");
    authSecret = DEV_AUTH_SECRET;
  }
  if (production && authSecret.length < 32) {
    throw new Error("BETTER_AUTH_SECRET must be at least 32 characters");
  }

  const resendApiKey = env.RESEND_API_KEY || undefined;
  const emailFrom = env.EMAIL_FROM || undefined;
  if (resendApiKey && !emailFrom) {
    throw new Error("EMAIL_FROM is required when RESEND_API_KEY is set");
  }

  return {
    port,
    databaseUrl,
    production,
    distDir: resolve(env.DIST_DIR || "dist"),
    authSecret,
    baseUrl: env.BETTER_AUTH_URL || undefined,
    resendApiKey,
    emailFrom,
  };
}
