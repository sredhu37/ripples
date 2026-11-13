import { execFileSync } from "node:child_process";
import { chmodSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

// pr-in-review.sh: a PR that closes an issue puts the issue in review. gh and the two helper
// scripts are fakes; the helpers append their arguments (and the token they got) to $LOG.

const script = join(import.meta.dirname, "../.github/scripts/pr-in-review.sh");

// $PR is "state<TAB>draft<TAB>head repo<TAB>base repo", $CLOSES is one "repo<TAB>number" per line,
// $ISSUES maps number to "state<TAB>labels" as "n=state<TAB>labels" lines.
const fakeGh = `#!/usr/bin/env bash
case "$*" in
  *pulls/*) printf '%b\\n' "$PR"; exit 0 ;;
  "pr view"*) printf '%b' "$CLOSES"; exit 0 ;;
  *issues/*)
    all="$*"; n=\${all##*issues/}; n=\${n%% *}
    printf '%b\\n' "$ISSUES" | sed -n "s/^$n=//p"
    exit 0 ;;
esac
echo "fake gh: unexpected call: $*" >&2
exit 1
`;

let dir: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "pr-in-review-"));
  writeFileSync(join(dir, "gh"), fakeGh);
  writeFileSync(join(dir, "label-set.sh"), '#!/usr/bin/env bash\necho "label $*" >> "$LOG"\n');
  writeFileSync(
    join(dir, "board-move.sh"),
    '#!/usr/bin/env bash\necho "board $* token=$GH_TOKEN" >> "$LOG"\n',
  );
  for (const f of ["gh", "label-set.sh", "board-move.sh"]) chmodSync(join(dir, f), 0o755);
  writeFileSync(join(dir, "log"), "");
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

const sameRepo = "open\\tfalse\\to/r\\to/r";

function run(pr: string, closes: string, issues: string) {
  const output = execFileSync("bash", [script, "7"], {
    env: {
      ...process.env,
      PATH: `${dir}:${process.env.PATH}`,
      FACTORY_SCRIPTS: dir,
      REPO: "o/r",
      GH_TOKEN: "label-token",
      BOARD_TOKEN: "board-token",
      LOG: join(dir, "log"),
      PR: pr,
      CLOSES: closes,
      ISSUES: issues,
    },
    encoding: "utf8",
  });
  return { output, log: readFileSync(join(dir, "log"), "utf8").trim() };
}

describe("pr-in-review.sh", () => {
  it.each(["factory:triage", "factory:ready", "factory:in-progress"])(
    "moves an open issue in %s to In review, the card with the board token",
    (label) => {
      const { log } = run(sameRepo, "o/r\\t5\\n", `5=open\\t${label}`);
      expect(log).toBe("label 5 factory:in-review\nboard 5 In review token=board-token");
    },
  );

  it("moves every issue the PR closes", () => {
    const { log } = run(
      sameRepo,
      "o/r\\t5\\no/r\\t6\\n",
      "5=open\\tfactory:in-progress\\n6=open\\tfactory:ready",
    );
    expect(log.split("\n").filter((l) => l.startsWith("label"))).toEqual([
      "label 5 factory:in-review",
      "label 6 factory:in-review",
    ]);
  });

  it("does nothing for a draft PR", () => {
    const { log, output } = run("open\\ttrue\\to/r\\to/r", "o/r\\t5\\n", "5=open\\tfactory:ready");
    expect(log).toBe("");
    expect(output).toContain("draft");
  });

  it("does nothing for a PR from a fork", () => {
    const { log } = run("open\\tfalse\\tfork/r\\to/r", "o/r\\t5\\n", "5=open\\tfactory:ready");
    expect(log).toBe("");
  });

  it("does nothing for a PR whose fork was deleted", () => {
    const { log } = run("open\\tfalse\\tnone\\to/r", "o/r\\t5\\n", "5=open\\tfactory:ready");
    expect(log).toBe("");
  });

  it("does nothing for a closed PR", () => {
    const { log } = run("closed\\tfalse\\to/r\\to/r", "o/r\\t5\\n", "5=open\\tfactory:ready");
    expect(log).toBe("");
  });

  it.each(["factory:human", "factory:in-review", "factory:done", ""])(
    "leaves an issue with '%s' alone",
    (label) => {
      const { log } = run(sameRepo, "o/r\\t5\\n", `5=open\\t${label}`);
      expect(log).toBe("");
    },
  );

  it("leaves a closed issue alone", () => {
    const { log } = run(sameRepo, "o/r\\t5\\n", "5=closed\\tfactory:done");
    expect(log).toBe("");
  });

  it("leaves an issue of another repo alone", () => {
    const { log } = run(sameRepo, "x/y\\t5\\n", "5=open\\tfactory:ready");
    expect(log).toBe("");
  });

  it("does nothing when the PR closes no issue", () => {
    const { log, output } = run(sameRepo, "", "");
    expect(log).toBe("");
    expect(output).toContain("0 issue(s)");
  });
});
