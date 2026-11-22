import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render } from "../.github/scripts/shared/render.mjs";

// render.mjs fills .github/prompts/ templates: ${NAME} from the env var NAME or the file NAME_FILE.

const script = join(import.meta.dirname, "../.github/scripts/shared/render.mjs");

let dir: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "render-"));
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

function run(template: string, env: Record<string, string>) {
  writeFileSync(join(dir, "t.md"), template);
  return spawnSync("node", [script, join(dir, "t.md")], {
    env: { PATH: process.env.PATH, ...env },
    encoding: "utf8",
  });
}

describe("render", () => {
  it("fills every placeholder", () => {
    expect(render("#${ISSUE} on ${BRANCH}", { ISSUE: "7", BRANCH: "factory/issue-7" })).toBe(
      "#7 on factory/issue-7",
    );
  });

  it("never scans inserted text again", () => {
    expect(render("<issue>${BODY}</issue>", { BODY: "uses ${SECRET} and $HOME" })).toBe(
      "<issue>uses ${SECRET} and $HOME</issue>",
    );
  });

  it("leaves plain $NAME and lower-case ${name} alone", () => {
    expect(render("$ISSUE ${issue}", {})).toBe("$ISSUE ${issue}");
  });

  it("throws on a name without a value", () => {
    expect(() => render("${TYPO}", {})).toThrow("no value for ${TYPO}");
  });
});

describe("render.mjs", () => {
  it("reads NAME_FILE and drops its trailing newlines", () => {
    writeFileSync(join(dir, "body.md"), "line 1\nline 2\n\n");
    const { status, stdout } = run("<b>\n${BODY}\n</b>\n", { BODY_FILE: join(dir, "body.md") });
    expect(status).toBe(0);
    expect(stdout).toBe("<b>\nline 1\nline 2\n</b>\n");
  });

  it("prefers NAME over NAME_FILE and keeps an empty value", () => {
    const { stdout } = run("[${A}]", { A: "", A_FILE: "/nonexistent" });
    expect(stdout).toBe("[]\n");
  });

  it("fails and names the template on a missing value", () => {
    const { status, stderr } = run("${MISSING}", {});
    expect(status).toBe(1);
    expect(stderr).toContain("no value for ${MISSING}");
  });
});
