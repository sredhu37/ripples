import { resolve } from "node:path";

/** Matches the user, password and database in compose.yaml. Used in dev only. */
export const DEV_DATABASE_URL = "postgres://ripples:ripples@localhost:5432/ripples";

export interface Config {
  port: number;
  databaseUrl: string;
  production: boolean;
  /** Folder with the built app (`npm run build`). */
  distDir: string;
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

  return { port, databaseUrl, production, distDir: resolve(env.DIST_DIR || "dist") };
}
