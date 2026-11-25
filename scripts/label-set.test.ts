import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

// label-set.sh: gives an issue exactly one factory: label. gh is a fake that logs every call to
// $LOG, lists $OLD as the issue's factory labels, and fails a DELETE with $DELETE_ERR when set.

const script = join(import.meta.dirname, "../.github/scripts/shared/label-set.sh");

const fakeGh = `#!/usr/bin/env bash
echo "$*" >> "$LOG"
case "$*" in
  *"-X DELETE"*)
    if [ -n "$DELETE_ERR" ]; then echo "$DELETE_ERR" >&2; exit 1; fi
    exit 0 ;;
  *"-X POST"*) exit 0 ;;
  *issues/*/labels*) printf '%b' "$OLD"; exit 0 ;;
esac
echo "fake gh: unexpected call: $*" >&2
exit 1
`;

let dir: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "label-set-"));
  writeFileSync(join(dir, "gh"), fakeGh);
  chmodSync(join(dir, "gh"), 0o755);
  writeFileSync(join(dir, "log"), "");
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

function run(label: string, old: string, deleteErr = "") {
  const result = spawnSync("bash", [script, "7", label], {
    env: {
      ...process.env,
      PATH: `${dir}:${process.env.PATH}`,
      REPO: "o/r",
      LOG: join(dir, "log"),
      OLD: old,
      DELETE_ERR: deleteErr,
    },
    encoding: "utf8",
  });
  return { ...result, log: readFileSync(join(dir, "log"), "utf8").trim() };
}

describe("label-set.sh", () => {
  it("adds the label, then removes the other factory labels", () => {
    const r = run("factory:in-review", "factory:in-progress\\n");
    expect(r.status).toBe(0);
    expect(r.log).toContain("-X POST repos/o/r/issues/7/labels");
    expect(r.log).toContain("-X DELETE repos/o/r/issues/7/labels/factory:in-progress");
  });

  it("does not remove the label it sets", () => {
    const r = run("factory:in-review", "factory:in-review\\n");
    expect(r.status).toBe(0);
    expect(r.log).not.toContain("DELETE");
  });

  it("accepts a 404 on the removal: a parallel run already removed that label", () => {
    const r = run(
      "factory:in-review",
      "factory:in-progress\\n",
      "gh: Label does not exist (HTTP 404)",
    );
    expect(r.status).toBe(0);
    expect(r.stdout).toContain("already removed");
  });

  it("still fails on any other removal error", () => {
    const r = run("factory:in-review", "factory:in-progress\\n", "gh: Forbidden (HTTP 403)");
    expect(r.status).toBe(1);
    expect(r.stderr).toContain("HTTP 403");
  });

  it("accepts factory:suggestion, the Agent suggestions column (#412)", () => {
    const r = run("factory:suggestion", "factory:triage\\n");
    expect(r.status).toBe(0);
    expect(r.log).toContain("-X DELETE repos/o/r/issues/7/labels/factory:triage");
  });

  it("rejects an unknown label", () => {
    expect(run("bug", "").status).toBe(2);
  });
});
