import { describe, expect, it } from "vitest";
import gatePaths from "../.github/gate-paths.txt?raw";

// The risky list from docs/factory.md, section Gate.
const SPEC_RISKY_LIST = [
  "src/progress.ts",
  "public/sw.js",
  "public/manifest.webmanifest",
  "package.json",
  "package-lock.json",
  "vite.config.ts",
  ".github/**",
  "AGENTS.md",
  "CLAUDE.md",
  ".claude/**",
  "ARCHITECTURE.md",
  "docs/**",
  "LICENSE",
  "LICENSE-CONTENT.txt",
  "LICENSING.md",
];

const AGENTS = ["build", "ux-ui", "security", "content", "code-quality", "gate"];

const agentFiles = import.meta.glob<string>("../.claude/agents/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function patterns(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "" && !line.startsWith("#"));
}

function frontmatter(text: string): Record<string, string> {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!match) return {};
  const fields: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon > 0) fields[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  return fields;
}

describe("gate-paths.txt", () => {
  const list = patterns(gatePaths);

  it("contains every entry of the spec risky list", () => {
    for (const entry of SPEC_RISKY_LIST) expect(list).toContain(entry);
  });

  it("contains itself", () => {
    expect(list).toContain(".github/gate-paths.txt");
  });

  it("has no duplicate patterns", () => {
    expect(new Set(list).size).toBe(list.length);
  });
});

describe(".claude/agents", () => {
  it("has the six factory agents", () => {
    const names = Object.keys(agentFiles).map((path) =>
      path.split("/").pop()?.replace(/\.md$/, ""),
    );
    for (const agent of AGENTS) expect(names).toContain(agent);
  });

  for (const [path, text] of Object.entries(agentFiles)) {
    it(`${path} has name, description, model and tools`, () => {
      const fields = frontmatter(text);
      for (const key of ["name", "description", "model", "tools"]) {
        expect(fields[key], key).toBeTruthy();
      }
      expect(path.endsWith(`/${fields.name}.md`)).toBe(true);
    });
  }
});
