import { spawnSync } from "node:child_process";
import {
  chmodSync,
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

// review/suggestions.sh files the review's suggestions issue into the Agent suggestions column, not
// Backlog (#412). It runs from a temp repo root with fake gh, label-set.sh and move.sh that log their
// arguments to $LOG. $EXISTING is the number of an existing suggestions issue for the PR, if any.

const repoRoot = join(import.meta.dirname, "..");
const script = ".github/scripts/review/suggestions.sh";

const fakeGh = `#!/usr/bin/env bash
echo "gh $*" >> "$LOG"
case "$*" in
  "api --paginate"*) printf '%s' "$EXISTING"; exit 0 ;;
  *pulls/*) echo "A PR title"; exit 0 ;;
  "issue create"*) echo "https://github.com/o/r/issues/77"; exit 0 ;;
esac
echo "fake gh: unexpected call: $*" >&2
exit 1
`;

let dir: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "suggestions-"));
  mkdirSync(join(dir, ".github/scripts/review"), { recursive: true });
  mkdirSync(join(dir, ".github/scripts/shared"), { recursive: true });
  mkdirSync(join(dir, "bin"));
  mkdirSync(join(dir, "summary"));
  copyFileSync(join(repoRoot, script), join(dir, script));
  writeFileSync(join(dir, "bin/gh"), fakeGh);
  for (const name of ["label-set.sh", "move.sh"])
    writeFileSync(
      join(dir, ".github/scripts/shared", name),
      `#!/usr/bin/env bash\necho "${name} $*" >> "$LOG"\n`,
    );
  for (const f of [
    script,
    "bin/gh",
    ".github/scripts/shared/label-set.sh",
    ".github/scripts/shared/move.sh",
  ])
    chmodSync(join(dir, f), 0o755);
  writeFileSync(join(dir, "summary/suggestions.md"), "<!-- factory-suggestions pr=9 -->\n");
  writeFileSync(join(dir, "log"), "");
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

function run(count: string, existing = "") {
  const result = spawnSync("bash", [script], {
    cwd: dir,
    env: {
      ...process.env,
      PATH: `${join(dir, "bin")}:${process.env.PATH}`,
      GITHUB_REPOSITORY: "o/r",
      RUNNER_TEMP: dir,
      LOG: join(dir, "log"),
      ISSUE: "5",
      PR: "9",
      COUNT: count,
      EXISTING: existing,
    },
    encoding: "utf8",
  });
  return { ...result, log: readFileSync(join(dir, "log"), "utf8").trim().split("\n") };
}

describe("suggestions.sh", () => {
  it("files the issue with factory:suggestion and moves it to Agent suggestions, not Backlog", () => {
    const { status, log } = run("3");
    expect(status).toBe(0);
    const create = log.find((l) => l.startsWith("gh issue create"));
    expect(create).toContain("--label factory:suggestion");
    expect(create).not.toContain("factory:triage");
    expect(log).toContain("move.sh 77 factory:suggestion");
  });

  it("files nothing when there are no suggestions", () => {
    const { status, log } = run("0");
    expect(status).toBe(0);
    expect(log).toEqual(["label-set.sh 5 factory:in-review"]);
  });

  it("files nothing when the PR already has a suggestions issue", () => {
    const { status, log } = run("3", "70");
    expect(status).toBe(0);
    expect(log.some((l) => l.startsWith("gh issue create"))).toBe(false);
  });
});

// The label-to-column map lives in three scripts; they must agree, or a card bounces between columns.
describe("label-to-column maps", () => {
  const maps = {
    "shared/move.sh": /^\s*(factory:[a-z-]+)\) column=("?)([^";]+)\2 ;;/gm,
    "sync/card.sh": /^\s*(factory:[a-z-]+)\) column=("?)([^";]+)\2 ;;/gm,
    "sweep/board-reconcile.sh": /^\s*(factory:[a-z-]+)\) echo ("?)([^";]+)\2 ;;/gm,
  };
  const read = (file: string, re: RegExp) =>
    Object.fromEntries(
      [...readFileSync(join(repoRoot, ".github/scripts", file), "utf8").matchAll(re)].map((m) => [
        m[1],
        m[3],
      ]),
    );

  it.each(Object.entries(maps))("%s maps factory:suggestion to Agent suggestions", (file, re) => {
    expect(read(file, re)["factory:suggestion"]).toBe("Agent suggestions");
  });

  it("all three maps are the same", () => {
    const [first, ...rest] = Object.entries(maps).map(([f, re]) => read(f, re));
    expect(Object.keys(first)).toHaveLength(7);
    for (const m of rest) expect(m).toEqual(first);
  });
});
