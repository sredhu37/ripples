import { extname } from "node:path";
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import type { HealthResponse } from "./apiTypes.js";
import { checkDatabase, type Queryable } from "./db.js";

export interface AppOptions {
  db: Queryable;
  /** Folder with the built app. When set, the API serves it at `/`. */
  distDir?: string;
  healthTimeoutMs?: number;
}

export function createApp({ db, distDir, healthTimeoutMs = 2_000 }: AppOptions): Hono {
  const app = new Hono();

  app.get("/api/health", async (c) => {
    const ok = await checkDatabase(db, healthTimeoutMs);
    return c.json<HealthResponse>({ status: ok ? "ok" : "error" }, ok ? 200 : 503);
  });

  // An unknown API path is a JSON 404, never the app's index.html.
  app.all("/api/*", (c) => c.json({ error: "not_found" }, 404));

  if (distDir) {
    app.use("*", serveStatic({ root: distDir }));
    // A missing file (has an extension) is a 404. Any other path is a screen of the app.
    app.get("*", (c, next) => (extname(c.req.path) ? c.notFound() : next()));
    app.get("*", serveStatic({ root: distDir, path: "index.html" }));
  }

  return app;
}
