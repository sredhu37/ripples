import { spawnSync } from "node:child_process";
import { chmodSync, copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

// move.sh: one call sets the factory: label and moves the card. It runs from a temp folder next to
// fake label-set.sh and board-move.sh, which log their arguments (and the token they got) to $LOG.
// $LABEL_FAIL or $BOARD_FAIL make a fake fail.

const moveScript = join(import.meta.dirname, "../.github/scripts/shared/move.sh");

let dir: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "move-"));
  copyFileSync(moveScript, join(dir, "move.sh"));
  writeFileSync(
    join(dir, "label-set.sh"),
    '#!/usr/bin/env bash\n[ -z "$LABEL_FAIL" ] || exit 1\necho "label $* token=$GH_TOKEN" >> "$LOG"\n',
  );
  writeFileSync(
    join(dir, "board-move.sh"),
    '#!/usr/bin/env bash\n[ -z "$BOARD_FAIL" ] || exit 1\necho "board $* token=$GH_TOKEN" >> "$LOG"\n',
  );
  for (const f of ["move.sh", "label-set.sh", "board-move.sh"]) chmodSync(join(dir, f), 0o755);
  writeFileSync(join(dir, "log"), "");
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

function run(label: string, env: Record<string, string> = {}) {
  const result = spawnSync("bash", [join(dir, "move.sh"), "5", label], {
    env: {
      ...process.env,
      GH_TOKEN: "label-token",
      BOARD_TOKEN: "board-token",
      LOG: join(dir, "log"),
      LABEL_FAIL: "",
      BOARD_FAIL: "",
      ...env,
    },
    encoding: "utf8",
  });
  return { ...result, log: readFileSync(join(dir, "log"), "utf8").trim() };
}

describe("move.sh", () => {
  it.each([
    ["factory:triage", "Backlog"],
    ["factory:suggestion", "Agent suggestions"],
    ["factory:ready", "Ready"],
    ["factory:in-progress", "In progress"],
    ["factory:in-review", "In review"],
    ["factory:human", "Needs human"],
    ["factory:done", "Done"],
  ])("%s: label with the label token, card to %s with the board token", (label, column) => {
    const { status, log } = run(label);
    expect(status).toBe(0);
    expect(log).toBe(`label 5 ${label} token=label-token\nboard 5 ${column} token=board-token`);
  });

  it("uses GH_TOKEN for the card when no BOARD_TOKEN is set", () => {
    const { log } = run("factory:ready", { BOARD_TOKEN: "" });
    expect(log).toContain("board 5 Ready token=label-token");
  });

  it("only warns when the card move fails: the label is the truth", () => {
    const { status, stdout, log } = run("factory:human", { BOARD_FAIL: "1" });
    expect(status).toBe(0);
    expect(log).toBe("label 5 factory:human token=label-token");
    expect(stdout).toContain("::warning::");
  });

  it("fails and leaves the card when the label change fails", () => {
    const { status, log } = run("factory:human", { LABEL_FAIL: "1" });
    expect(status).not.toBe(0);
    expect(log).toBe("");
  });

  it("refuses an unknown label", () => {
    const { status, log } = run("bug");
    expect(status).toBe(2);
    expect(log).toBe("");
  });
});
