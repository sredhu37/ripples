import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

const root = join(import.meta.dirname, "..");
const script = join(root, ".github/scripts/md-only.sh");
const workflow = (name: string) => readFileSync(join(root, ".github/workflows", name), "utf8");

// A throwaway repo with a base commit; each test commits a change on top and runs the script.
let repo: string;

// No global or system git config: signing or hooks on the machine must not change the test.
const gitEnv = { ...process.env, GIT_CONFIG_GLOBAL: "/dev/null", GIT_CONFIG_NOSYSTEM: "1" };

function git(...args: string[]) {
  return execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@t", ...args], {
    cwd: repo,
    env: gitEnv,
    encoding: "utf8",
  });
}

function write(path: string, text = "x\n") {
  mkdirSync(dirname(join(repo, path)), { recursive: true });
  writeFileSync(join(repo, path), text);
}

function commit() {
  git("add", "-A");
  git("commit", "-q", "--allow-empty", "-m", "change");
}

function mdOnly(env: Record<string, string> = {}) {
  const { GITHUB_OUTPUT: _ignored, ...rest } = gitEnv;
  return execFileSync("bash", [script, "HEAD^1", "HEAD"], {
    cwd: repo,
    env: { ...rest, ...env },
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

beforeEach(() => {
  repo = mkdtempSync(join(tmpdir(), "md-only-"));
  git("init", "-q", "-b", "main");
  write("README.md");
  write("docs/guide.md");
  write("src/app.ts");
  write(".claude/agents/build.md");
  commit();
});

afterEach(() => {
  rmSync(repo, { recursive: true, force: true });
});

describe("md-only.sh", () => {
  it("is true for markdown outside .claude/", () => {
    write("README.md", "new\n");
    write("docs/guide.md", "new\n");
    write("docs/deep/new.md");
    commit();
    expect(mdOnly()).toBe("md_only=true");
  });

  it("is true when a markdown file is deleted", () => {
    git("rm", "-q", "docs/guide.md");
    commit();
    expect(mdOnly()).toBe("md_only=true");
  });

  it("is false for a .claude/agents markdown file (src/factory.test.ts reads it)", () => {
    write(".claude/agents/build.md", "new\n");
    commit();
    expect(mdOnly()).toBe("md_only=false");
  });

  it("is false for one .md and one .ts file", () => {
    write("docs/guide.md", "new\n");
    write("src/app.ts", "new\n");
    commit();
    expect(mdOnly()).toBe("md_only=false");
  });

  it("is false for a deleted .ts file", () => {
    git("rm", "-q", "src/app.ts");
    commit();
    expect(mdOnly()).toBe("md_only=false");
  });

  it("checks the old name of a rename", () => {
    git("mv", "src/app.ts", "docs/app.md");
    commit();
    expect(mdOnly()).toBe("md_only=false");
  });

  it("is false for names that only look like markdown", () => {
    write("docs/guide.md.bak");
    write("NOTES.MD");
    commit();
    expect(mdOnly()).toBe("md_only=false");
  });

  it("is false when nothing changed, so every check runs", () => {
    commit();
    expect(mdOnly()).toBe("md_only=false");
  });

  it("appends the result to GITHUB_OUTPUT", () => {
    write("docs/guide.md", "new\n");
    commit();
    const out = join(repo, ".git", "github-output.txt");
    expect(mdOnly({ GITHUB_OUTPUT: out })).toBe("md_only=true");
    expect(readFileSync(out, "utf8")).toBe("md_only=true\n");
  });

  it("fails when git cannot diff", () => {
    expect(() =>
      execFileSync("bash", [script, "nope", "HEAD"], { cwd: repo, env: gitEnv, stdio: "ignore" }),
    ).toThrow();
  });
});

describe("workflows using the markdown-only rule", () => {
  // A path filter on a required check leaves it "Expected" and blocks the merge.
  it.each(["ci.yml", "lint.yml", "demo.yml", "lighthouse.yml"])(
    "%s (required checks) has no path filter",
    (name) => {
      expect(workflow(name)).not.toMatch(/^\s*paths(-ignore)?:/m);
    },
  );

  it.each([
    ["ci.yml", ["ci"]],
    ["demo.yml", ["spec-rule", "demo"]],
    ["lighthouse.yml", ["lighthouse"]],
  ])("%s skips its slow jobs on markdown-only changes", (name, jobs) => {
    const text = workflow(name);
    expect(text).toContain("uses: ./.github/workflows/md-only.yml");
    for (const job of jobs) {
      const block = text.split(new RegExp(`^  ${job}:$`, "m"))[1]?.split(/^ {2}\S/m)[0] ?? "";
      expect(block, job).toContain("needs: changes");
      // !cancelled(): a failed changes job leaves md_only empty, so the job runs (fails open).
      expect(block, job).toContain(
        "if: ${{ !cancelled() && needs.changes.outputs.md_only != 'true' }}",
      );
    }
  });

  it("pages.yml skips the deploy for the same files", () => {
    expect(workflow("pages.yml")).toMatch(
      /paths:\n\s+- "\*\*"\n\s+- "!\*\*\.md"\n\s+- "\.claude\/\*\*"\n/,
    );
  });
});
