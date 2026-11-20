import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { loadConfig, type Config } from "./config.js";
import { createAuth } from "./auth.js";
import { ensureFamily } from "./db/family.js";
import { createPool } from "./db/pool.js";
import { createLogMailer, createResendMailer, SELF_HOST_WARNING } from "./mailer.js";

let config: Config;
try {
  config = loadConfig(process.env);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

const pool = createPool(config.databaseUrl);

if (!config.resendApiKey) console.warn(SELF_HOST_WARNING);
const mailer =
  config.resendApiKey && config.emailFrom
    ? createResendMailer({ apiKey: config.resendApiKey, from: config.emailFrom })
    : createLogMailer();

const auth = createAuth({
  database: pool,
  mailer,
  secret: config.authSecret,
  baseUrl: config.baseUrl,
  // In dev the app runs on the Vite server and calls the API through its proxy.
  trustedOrigins: config.production ? undefined : ["http://localhost:5173"],
  production: config.production,
  onLogin: (userId) => ensureFamily(pool, userId),
});

const app = createApp({
  db: pool,
  auth,
  distDir: config.production ? config.distDir : undefined,
});

const server = serve({ fetch: app.fetch, port: config.port }, (info) => {
  const mode = config.production ? `serving the app from ${config.distDir}` : "API only (dev)";
  console.log(`Ripples API listening on port ${info.port}, ${mode}`);
});

function shutdown(): void {
  server.close(() => {
    void pool.end().then(() => process.exit(0));
  });
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
