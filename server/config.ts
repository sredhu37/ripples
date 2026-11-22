import { resolve } from "node:path";

/** Matches the user, password and database in compose.yaml. Used in dev only. */
export const DEV_DATABASE_URL = "postgres://ripples:ripples@localhost:5432/ripples";

/** Impressum details. Read from the environment at deploy time, never written into the repo (public). */
export interface LegalDetails {
  name: string | null;
  /** Lines of the postal address. */
  address: string[];
  email: string | null;
  phone: string | null;
  vatId: string | null;
}

export interface Config {
  port: number;
  databaseUrl: string;
  production: boolean;
  /** Folder with the built app. When set, the API serves it at `/`. Unset: API only. */
  distDir: string | undefined;
  /** Signs session cookies. Required in production. */
  authSecret: string;
  /** Public address of the API (`BETTER_AUTH_URL`). */
  baseUrl?: string;
  /** Set: login codes go out by Resend. Unset: Self-host mode, codes go to the log. */
  resendApiKey?: string;
  /** Sender of the login email, e.g. `Ripples <login@example.com>`. Required with `resendApiKey`. */
  emailFrom?: string;
  legal: LegalDetails;
  /** Feature flags from `FEATURES`. `{}` when unset. Public: a flag hides things, never protects them. */
  features: Record<string, boolean>;
}

/** Dev only. Never used in production: `loadConfig` demands a real secret there. */
export const DEV_AUTH_SECRET = "dev-only-secret-do-not-use-in-production";

/** Address lines are separated by a real newline, a literal backslash-n, or `;`. */
function loadLegal(env: NodeJS.ProcessEnv): LegalDetails {
  const one = (v: string | undefined) => v?.trim() || null;
  return {
    name: one(env.LEGAL_NAME),
    address: (env.LEGAL_ADDRESS ?? "")
      .split(/\r?\n|\\n|;/)
      .map((line) => line.trim())
      .filter(Boolean),
    email: one(env.LEGAL_EMAIL),
    phone: one(env.LEGAL_PHONE),
    vatId: one(env.LEGAL_VAT_ID),
  };
}

/** `FEATURES` is a JSON object of named booleans. Anything else stops the server from starting. */
function loadFeatures(raw: string | undefined): Record<string, boolean> {
  if (raw === undefined || raw.trim() === "") return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('FEATURES must be valid JSON, for example {"show-loans": false}');
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("FEATURES must be a JSON object of true/false values");
  }
  const features: Record<string, boolean> = {};
  for (const [key, value] of Object.entries(parsed)) {
    if (typeof value !== "boolean") {
      throw new Error(`FEATURES: the value of "${key}" must be true or false`);
    }
    features[key] = value;
  }
  return features;
}

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
    distDir: env.DIST_DIR ? resolve(env.DIST_DIR) : undefined,
    authSecret,
    baseUrl: env.BETTER_AUTH_URL || undefined,
    resendApiKey,
    emailFrom,
    legal: loadLegal(env),
    features: loadFeatures(env.FEATURES),
  };
}
