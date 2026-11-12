// CI rule "Specs present" (docs/factory.md, CI tools): a pull request that
// changes a *.tsx or *.css file must also change at least one e2e/*.spec.ts.
// Lesson content (src/content/**) is exempt: the lesson spec runs changed
// lessons by id. Unit tests (*.test.tsx) are not UI and are exempt too.
//
// Usage: node scripts/check-spec-changed.mjs <base-ref>
// Compares <base-ref>...HEAD, for example origin/main...HEAD.

import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const UI_FILE = /\.(tsx|css)$/;
const EXEMPT = [/^src\/content\//, /\.test\.tsx$/];
const SPEC_FILE = /^e2e\/[^/]+\.spec\.ts$/;

/**
 * Decides whether a set of changed files passes the rule.
 * @param {string[]} files changed paths, relative to the repo root
 * @returns {{ ok: boolean, message: string }}
 */
export function checkSpecChanged(files) {
  const ui = files.filter((f) => UI_FILE.test(f) && !EXEMPT.some((re) => re.test(f)));
  if (ui.length === 0) {
    return { ok: true, message: "No *.tsx or *.css change outside src/content/: no spec needed." };
  }
  const specs = files.filter((f) => SPEC_FILE.test(f));
  if (specs.length > 0) {
    return { ok: true, message: `UI changed and a spec changed too: ${specs.join(", ")}.` };
  }
  return {
    ok: false,
    message: [
      "This change touches UI files but no e2e/*.spec.ts:",
      ...ui.map((f) => `  ${f}`),
      "Update or add the spec for each changed screen (map, lesson, facts, parents, timeline).",
      "See docs/factory.md, sections Evidence and CI tools.",
    ].join("\n"),
  };
}

function changedFiles(base) {
  const out = execFileSync("git", ["diff", "--name-only", `${base}...HEAD`], { encoding: "utf8" });
  return out.split("\n").filter(Boolean);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const base = process.argv[2];
  if (!base) {
    console.error("Usage: node scripts/check-spec-changed.mjs <base-ref>");
    process.exit(2);
  }
  const { ok, message } = checkSpecChanged(changedFiles(base));
  console.log(message);
  if (!ok) process.exit(1);
}
