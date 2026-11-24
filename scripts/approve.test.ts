import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// #366: the gate's approve mode for a factory PR checks the loop guard and does not wait for checks
// (the PR goes back to In review); checks-green.sh treats a CodeQL "neutral" as still running.

const root = join(import.meta.dirname, "../.github/scripts/gate");
const sha = "a".repeat(40);

function fakeGh(dir: string, body: string) {
  writeFileSync(
    join(dir, "gh"),
    `#!/usr/bin/env bash\nargs="$*"\ncase "$args" in\n${body}\n  *) echo "unexpected gh $args" >&2; exit 9 ;;\nesac\n`,
  );
  chmodSync(join(dir, "gh"), 0o755);
}

function runScript(script: string, args: string[], body: string, env: Record<string, string>) {
  const dir = mkdtempSync(join(tmpdir(), "approve-"));
  fakeGh(dir, body);
  return spawnSync("bash", [join(root, script), ...args], {
    env: {
      ...process.env,
      PATH: `${dir}:${process.env.PATH}`,
      REPO: "o/r",
      GITHUB_OUTPUT: "",
      ...env,
    },
    encoding: "utf8",
  });
}

const approveGh = `
  *"repos/o/r/pulls/7 --jq [.state, .head.ref"*) printf 'open\\t%s\\t%s\\to/r\\t%s\\n' "$REF" "$SHA" "$AUTHOR" ;;
  *"repos/o/r/pulls/7 --jq .title"*) echo "A title" ;;
  *"repos/o/r/issues/3/labels"*) echo "$LABEL" ;;
  *"repos/o/r/pulls/7/reviews?per_page=100"*) printf '55\\tAPPROVED\\t%s\\n' "$SHA" ;;
  *"repos/o/r/pulls/7/reviews/55 --jq .submitted_at"*) echo "$SUBMITTED" ;;
  *"repos/o/r/issues/3/timeline"*) printf '%s\\n' $SINCE ;;
  *"/check-runs"*) echo "check-runs" >&2; printf 'ci\\tin_progress\\tnone\\n' ;;`;

function approve(env: Record<string, string>) {
  return runScript("check.sh", ["approve", "7"], approveGh, {
    SHA: sha,
    REF: "factory/issue-3",
    AUTHOR: "claude[bot]",
    LABEL: "factory:human",
    SUBMITTED: "2026-11-24T08:05:00Z",
    SINCE: "2026-11-23T20:00:00Z 2026-11-24T08:00:00Z",
    REQUIRED_CHECKS: "ci",
    CHECK_WAIT: "0",
    ...env,
  });
}

describe("gate/check.sh approve, factory PR", () => {
  it("goes without waiting for checks when the approval came after the move to Needs human", () => {
    const { status, stdout, stderr } = approve({});
    expect(status).toBe(0);
    expect(stdout).toContain("go=true");
    expect(stdout).toContain("review=55");
    expect(stdout).toContain("reason=sredhu37 approved aaaaaaa: back to In review");
    expect(stderr).not.toContain("check-runs");
  });

  it("loop guard: an approval older than the latest move to Needs human does not count", () => {
    const { stdout } = approve({ SUBMITTED: "2026-11-24T07:59:00Z" });
    expect(stdout).toContain("go=false");
    expect(stdout).toContain("tell=true");
    expect(stdout).toContain("is older than the latest move to Needs human (2026-11-24T08:00:00Z)");
  });

  it("a revert PR still waits for green checks", () => {
    const { stdout, stderr } = approve({ REF: `revert-${"b".repeat(40)}`, AUTHOR: "sredhu37-bot" });
    expect(stderr).toContain("check-runs");
    expect(stdout).toContain("go=false");
    expect(stdout).toContain("reason=checks still running or missing");
  });
});

describe("gate/checks-green.sh, neutral CodeQL", () => {
  const body = `
  *"/check-runs"*) printf 'ci\\tcompleted\\tsuccess\\nCodeQL\\tcompleted\\t%s\\nlint\\tcompleted\\t%s\\n' "$CODEQL" "$LINT" ;;`;
  const green = (wait: string, env: Record<string, string>) =>
    runScript("checks-green.sh", [sha, wait], body, {
      REQUIRED_CHECKS: "ci CodeQL lint",
      POLL_SECONDS: "1",
      CODEQL: "success",
      LINT: "success",
      ...env,
    }).stdout;

  it("is pending, not red, on a single look", () => {
    expect(green("0", { CODEQL: "neutral" })).toContain("state=pending");
  });

  it("is red once a real wait ran out with CodeQL still neutral", () => {
    const out = green("1", { CODEQL: "neutral" });
    expect(out).toContain("state=red");
    expect(out).toContain("CodeQL (neutral)");
  });

  it("a neutral check outside NEUTRAL_WAITS is red at once", () => {
    expect(green("0", { LINT: "neutral" })).toContain("state=red");
  });

  it("is green when CodeQL succeeds", () => {
    expect(green("0", {})).toContain("state=green");
  });
});
