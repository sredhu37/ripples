import { spawnSync } from "node:child_process";
import { chmodSync, existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// gate/merge.sh: never merges a head behind its base (#314). A fake gh answers each API call from
// env vars and logs the calls that change something to $LOG.

const script = join(import.meta.dirname, "../.github/scripts/gate/merge.sh");
const sha = "a".repeat(40);
const newSha = "b".repeat(40);

const fakeGh = `#!/usr/bin/env bash
args="$*"
case "$args" in
  *"-X PUT repos/o/r/pulls/7/update-branch"*) echo "update-branch $args" >> "$LOG" ;;
  *"-X PUT repos/o/r/pulls/7/merge"*) echo "merge $args" >> "$LOG"; echo "${"c".repeat(40)}" ;;
  *"repos/o/r/pulls/7 --jq [.state, .head.sha] | @tsv"*) printf 'open\\t%s\\n' "$SHA" ;;
  *"repos/o/r/pulls/7 --jq .base.ref"*) echo main ;;
  *"repos/o/r/compare/main..."*) echo "$BEHIND" ;;
  *"repos/o/r/pulls/7 --jq [(.mergeable"*) echo "read" >> "$READS"; printf '%s\\t%s\\n' "$MERGEABLE" "$MSTATE" ;;
  *"repos/o/r/pulls/7 --jq .head.sha"*) echo "$NEW_SHA" ;;
  *"api user"*) echo sredhu37-bot ;;
  *"/check-runs"*) printf 'ci\\tcompleted\\tsuccess\\n' ;;
  *) echo "unexpected gh $args" >&2; exit 9 ;;
esac
`;

function run(env: Record<string, string>) {
  const dir = mkdtempSync(join(tmpdir(), "merge-"));
  writeFileSync(join(dir, "gh"), fakeGh);
  chmodSync(join(dir, "gh"), 0o755);
  writeFileSync(join(dir, "log"), "");
  const result = spawnSync("bash", [script, "7", sha], {
    env: {
      ...process.env,
      PATH: `${dir}:${process.env.PATH}`,
      REPO: "o/r",
      GITHUB_OUTPUT: "",
      LOG: join(dir, "log"),
      REQUIRED_CHECKS: "ci",
      SHA: sha,
      NEW_SHA: newSha,
      BEHIND: "0",
      MERGEABLE: "true",
      MSTATE: "clean",
      MERGEABLE_SLEEP: "0",
      READS: join(dir, "reads"),
      ...env,
    },
    encoding: "utf8",
  });
  const reads = existsSync(join(dir, "reads"))
    ? readFileSync(join(dir, "reads"), "utf8").trim().split("\n").length
    : 0;
  return { ...result, reads, log: readFileSync(join(dir, "log"), "utf8").trim() };
}

describe("gate/merge.sh", () => {
  it("merges an up-to-date green head", () => {
    const { status, stdout, log } = run({});
    expect(status).toBe(0);
    expect(stdout).toContain("merged=true");
    expect(log).toMatch(/^merge .*sha=a{40}/);
  });

  it("brings a head behind main up to date and does not merge it", () => {
    const { status, stdout, log } = run({ BEHIND: "3" });
    expect(status).toBe(0);
    expect(stdout).toContain("merged=false");
    expect(stdout).toContain("update=updated");
    expect(stdout).toContain(`new_sha=${newSha}`);
    expect(log).toMatch(/^update-branch .*expected_head_sha=a{40} --silent$/);
    expect(log).not.toContain("merge -X");
  });

  it("reports a conflict and changes nothing", () => {
    const { status, stdout, log } = run({ BEHIND: "2", MERGEABLE: "false" });
    expect(status).toBe(0);
    expect(stdout).toContain("update=conflict");
    expect(log).toBe("");
  });

  it("treats mergeable_state dirty as a conflict while mergeable is still null", () => {
    const { status, stdout, log } = run({ BEHIND: "2", MERGEABLE: "null", MSTATE: "dirty" });
    expect(status).toBe(0);
    expect(stdout).toContain("update=conflict");
    expect(log).toBe("");
  });

  it("asks 5 times, then refuses when GitHub has not computed mergeable (#366)", () => {
    const { status, stdout, stderr, log, reads } = run({
      BEHIND: "1",
      MERGEABLE: "null",
      MSTATE: "unknown",
    });
    expect(status).toBe(1);
    expect(reads).toBe(5);
    expect(stdout).toContain("merged=false");
    expect(stdout).toContain(
      "GitHub did not say whether the PR conflicts with main: no answer after 5 reads",
    );
    expect(stderr).toContain("read 5 of 5: mergeable=null mergeable_state=unknown");
    expect(log).toBe("");
  });

  it("honours MERGEABLE_TRIES", () => {
    const { status, reads } = run({ BEHIND: "1", MERGEABLE: "null", MERGEABLE_TRIES: "2" });
    expect(status).toBe(1);
    expect(reads).toBe(2);
  });

  it("dry run neither updates nor merges", () => {
    const behind = run({ BEHIND: "1", DRY_RUN: "1" });
    expect(behind.stdout).toContain("dry run: would bring PR #7 up to date");
    expect(behind.log).toBe("");
    const current = run({ DRY_RUN: "1" });
    expect(current.stdout).toContain("dry run: would squash-merge");
    expect(current.log).toBe("");
  });
});
