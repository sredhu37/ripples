import { execFileSync } from "node:child_process";
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

// build/outcome.sh: what a build run led to. gh is a fake: $PR_URL is the open factory PR (empty for
// none), $HEAD its head sha now.

const script = join(import.meta.dirname, "../.github/scripts/build/outcome.sh");

const fakeGh = `#!/usr/bin/env bash
case "$*" in
  "pr list"*) printf '%s\\n' "$PR_URL"; exit 0 ;;
  "pr view"*) printf '%s\\n' "$HEAD"; exit 0 ;;
  *pulls/*) printf '%s\\n' "$HEAD"; exit 0 ;;
esac
echo "fake gh: unexpected call: $*" >&2
exit 1
`;

let dir: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "outcome-"));
  writeFileSync(join(dir, "gh"), fakeGh);
  chmodSync(join(dir, "gh"), 0o755);
  writeFileSync(join(dir, "out"), "");
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

const url = "https://github.com/o/r/pull/9";

function run(env: Record<string, string>) {
  execFileSync("bash", [script], {
    env: {
      ...process.env,
      PATH: `${dir}:${process.env.PATH}`,
      GITHUB_REPOSITORY: "o/r",
      GITHUB_REPOSITORY_OWNER: "o",
      GITHUB_OUTPUT: join(dir, "out"),
      ISSUE: "7",
      BUILD_RESULT: "success",
      PUSH_RESULT: "skipped",
      LIMIT: "false",
      START_SHA: "",
      HUMAN: "",
      FIX_PR: "",
      PR_URL: "",
      HEAD: "",
      ...env,
    },
    encoding: "utf8",
  });
  const out = readFileSync(join(dir, "out"), "utf8");
  return {
    outcome: /^outcome=(.*)$/m.exec(out)?.[1],
    reason: /^reason=(.*)$/m.exec(out)?.[1],
  };
}

describe("outcome.sh", () => {
  it("a finished build with a PR goes to review", () => {
    expect(run({ PR_URL: url, HEAD: "bbb" })).toEqual({
      outcome: "review",
      reason: `PR open: ${url}`,
    });
  });

  it("a failed job that opened the PR in this run goes to review", () => {
    const r = run({ BUILD_RESULT: "failure", PR_URL: url, HEAD: "bbb" });
    expect(r.outcome).toBe("review");
    expect(r.reason).toBe(`PR open: ${url} (the build job ended with failure after the push)`);
  });

  it("a failed fix round that pushed a new head goes to review", () => {
    const r = run({
      BUILD_RESULT: "failure",
      PR_URL: url,
      START_SHA: "aaa",
      HEAD: "bbb",
      FIX_PR: "9",
    });
    expect(r.outcome).toBe("review");
  });

  it("a failed fix round that pushed nothing is stopped", () => {
    const r = run({
      BUILD_RESULT: "failure",
      PR_URL: url,
      START_SHA: "aaa",
      HEAD: "aaa",
      FIX_PR: "9",
    });
    expect(r.outcome).toBe("stopped");
  });

  it("a failed job without a PR is stopped", () => {
    expect(run({ BUILD_RESULT: "failure" }).outcome).toBe("stopped");
  });

  it("a usage limit without a push is paused", () => {
    expect(run({ BUILD_RESULT: "failure", LIMIT: "true" }).outcome).toBe("paused");
  });

  it("a finished build without a PR needs a human", () => {
    expect(run({}).outcome).toBe("human");
  });

  it("a failed workflow push needs a human even with a PR", () => {
    expect(run({ PUSH_RESULT: "failure", PR_URL: url, HEAD: "bbb" }).outcome).toBe("human");
  });
});
