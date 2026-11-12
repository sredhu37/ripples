import { execFileSync } from "node:child_process";
import { chmodSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

// review-gate.sh (factory-review) and checks-green.sh (factory-gate) must count a skipped
// required check as green: a markdown-only PR skips ci, demo, spec-rule and lighthouse.

const scripts = join(import.meta.dirname, "../.github/scripts");
const sha = "a".repeat(40);

// A fake gh: a factory PR with no labels and no review summaries, and the check runs from
// $CHECKS (name, status, conclusion per line), as the real calls print them after --jq.
const fakeGh = `#!/usr/bin/env bash
for arg in "$@"; do
  case "$arg" in
    repos/*/pulls/*) printf 'open\\tfactory/issue-7\\t%s\\to/r\\tclaude[bot]\\n' "$SHA"; exit 0 ;;
    repos/*/labels | repos/*/comments) exit 0 ;;
    repos/*/check-runs*) printf '%b' "$CHECKS"; exit 0 ;;
  esac
done
echo "fake gh: unexpected call: $*" >&2
exit 1
`;

let bin: string;

beforeEach(() => {
  bin = mkdtempSync(join(tmpdir(), "fake-gh-"));
  writeFileSync(join(bin, "gh"), fakeGh);
  chmodSync(join(bin, "gh"), 0o755);
});

afterEach(() => {
  rmSync(bin, { recursive: true, force: true });
});

function checks(conclusions: Record<string, string>) {
  return Object.entries(conclusions)
    .map(([name, conclusion]) => `${name}\\tcompleted\\t${conclusion}\\n`)
    .join("");
}

const mdOnlyPr = {
  ci: "skipped",
  lint: "success",
  audit: "success",
  lighthouse: "skipped",
  demo: "skipped",
  "spec-rule": "skipped",
  CodeQL: "success",
};

function run(script: string, args: string[], conclusions: Record<string, string>) {
  const { GITHUB_OUTPUT: _ignored, ...env } = process.env;
  return execFileSync("bash", [join(scripts, script), ...args], {
    env: {
      ...env,
      PATH: `${bin}:${env.PATH}`,
      REPO: "o/r",
      SHA: sha,
      CHECKS: checks(conclusions),
      EVENT: "workflow_run",
    },
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
}

describe("checks-green.sh", () => {
  it("is green when the markdown-only PR's slow checks are skipped", () => {
    expect(run("checks-green.sh", [sha], mdOnlyPr)).toContain("state=green");
  });

  it("is red when a check failed", () => {
    expect(run("checks-green.sh", [sha], { ...mdOnlyPr, ci: "failure" })).toContain(
      "detail=not green: ci (failure)",
    );
  });

  it("is red when a check was cancelled", () => {
    expect(run("checks-green.sh", [sha], { ...mdOnlyPr, demo: "cancelled" })).toContain(
      "state=red",
    );
  });
});

describe("review-gate.sh", () => {
  it("starts the review when the markdown-only PR's slow checks are skipped", () => {
    const out = run("review-gate.sh", ["12", sha], mdOnlyPr);
    expect(out).toContain("go=true");
    expect(out).toContain("round=1");
  });

  it("does not review when a check failed", () => {
    const out = run("review-gate.sh", ["12", sha], { ...mdOnlyPr, lighthouse: "failure" });
    expect(out).toContain("go=false");
    expect(out).toContain("reason=check lighthouse is failure");
  });
});
