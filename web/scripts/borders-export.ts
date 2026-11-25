// Step 2 of `npm run borders` (scripts/borders/borders.sh): writes the list of map years the border
// files must cover, and the pins, so the build script and the tests agree on what is needed. A
// Vitest file because the timeline modules import TSX, which only Vite can load. Runs with its own
// config (vitest.borders.config.ts), never in `npm test`.
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "vitest";
import { PINS, TIMELINE_STOPS } from "../src/timeline/pins";

// Vitest runs with web/ as the working directory (npm run borders:export).
const web = process.cwd();

test("export the map years and pins", () => {
  const years = [...new Set([...PINS.map((p) => p.mapYear), ...TIMELINE_STOPS.map((s) => s.year)])];
  years.sort((a, b) => a - b);
  const pins = PINS.map((p) => ({
    id: p.id,
    mapYear: p.mapYear,
    country: p.country,
    lon: p.lon,
    lat: p.lat,
    title: p.title.en,
  }));
  const out = resolve(web, "../scripts/borders/.cache");
  mkdirSync(out, { recursive: true });
  writeFileSync(
    resolve(out, "years.json"),
    JSON.stringify({ years, stops: TIMELINE_STOPS.map((s) => s.year), pins }, null, 2) + "\n",
  );
});
