// CI rule "Flow diagram current" (docs/factory.md, CI tools): a pull request that
// changes .github/workflows/** or .github/scripts/** must also change
// docs/factory-flow.svg, unless the PR body has a line
// "Diagram: unchanged, <reason>".
//
// Usage: PR_BODY="..." node scripts/check-flow-changed.mjs <base-ref>
// Compares <base-ref>...HEAD, for example origin/main...HEAD.

import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const FACTORY_FILE = /^\.github\/(workflows|scripts)\//;
const DIAGRAM = "docs/factory-flow.svg";
const UNCHANGED_LINE = /^Diagram: unchanged, \S.*$/m;

/**
 * Decides whether a set of changed files and a PR body pass the rule.
 * @param {string[]} files changed paths, relative to the repo root
 * @param {string} body the pull request description
 * @returns {{ ok: boolean, message: string }}
 */
export function checkFlowChanged(files, body = "") {
  const factory = files.filter((f) => FACTORY_FILE.test(f));
  if (factory.length === 0) {
    return {
      ok: true,
      message: "No change under .github/workflows or .github/scripts: no diagram change needed.",
    };
  }
  if (files.includes(DIAGRAM)) {
    return { ok: true, message: `Factory files changed and ${DIAGRAM} changed too.` };
  }
  if (UNCHANGED_LINE.test(body)) {
    return {
      ok: true,
      message: `Factory files changed, ${DIAGRAM} not; the PR body says why (Diagram: unchanged, ...).`,
    };
  }
  return {
    ok: false,
    message: [
      `This change touches factory files but not ${DIAGRAM}:`,
      ...factory.map((f) => `  ${f}`),
      "Update the diagram, or add a line to the PR description: Diagram: unchanged, <reason>",
      "See docs/factory.md, section CI tools.",
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
    console.error('Usage: PR_BODY="..." node scripts/check-flow-changed.mjs <base-ref>');
    process.exit(2);
  }
  const { ok, message } = checkFlowChanged(changedFiles(base), process.env.PR_BODY ?? "");
  console.log(message);
  if (!ok) process.exit(1);
}
