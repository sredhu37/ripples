import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { loadConfig, type Config } from "./config.js";
import { createPool } from "./db/pool.js";

let config: Config;
try {
  config = loadConfig(process.env);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}

const pool = createPool(config.databaseUrl);
const app = createApp({ db: pool, distDir: config.distDir });

const server = serve({ fetch: app.fetch, port: config.port }, (info) => {
  const mode = config.distDir ? `serving the app from ${config.distDir}` : "API only";
  console.log(`Ripples API listening on port ${info.port}, ${mode}`);
});

function shutdown(): void {
  server.close(() => {
    void pool.end().then(() => process.exit(0));
  });
}
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
