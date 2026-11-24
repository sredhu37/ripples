// Step 1 of `npm run voices` (scripts/voices/voices.sh): writes the manifest the app reads and the
// job list render.py works through. A Vitest file because lesson modules import CSS and TSX, which
// only Vite can load. Runs with its own config (vitest.voices.config.ts), never in `npm test`.
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "vitest";
import { LANGS, voiceJobs, type VoiceJob } from "../src/voice/lines";
import voices from "../src/voice/voices.json";

const json = (value: unknown) => JSON.stringify(value, null, 2) + "\n";
// Vitest runs with web/ as the working directory (npm run voices:export).
const web = process.cwd();

test("export voice jobs and manifests", () => {
  const jobs: Record<string, { voice: unknown; files: Omit<VoiceJob, "key">[] }> = {};
  for (const lang of LANGS) {
    const list = voiceJobs(lang);
    const manifest = Object.fromEntries(
      list.map((j) => [j.key, j.id]).sort(([a], [b]) => (a < b ? -1 : 1)),
    );
    writeFileSync(resolve(web, `src/voice/manifest.${lang}.json`), json(manifest));
    const unique = new Map(list.map((j) => [j.id, { id: j.id, text: j.text }]));
    jobs[lang] = { voice: voices[lang], files: [...unique.values()] };
  }
  const out = resolve(web, "../scripts/voices/.cache");
  mkdirSync(out, { recursive: true });
  writeFileSync(resolve(out, "jobs.json"), json({ format: voices.format, ...jobs }));
});
