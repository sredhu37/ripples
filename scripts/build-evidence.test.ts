import { describe, expect, it } from "vitest";
import { COMMENT_LIMIT, MARKER, commentBody } from "../web/e2e/build-evidence.mjs";

// GitHub rejects issue comments longer than this.
const GITHUB_MAX = 65_536;

function runs(names: string[], steps: number) {
  return names.map((name) => ({
    name,
    dir: "",
    video: "",
    steps: Array.from({ length: steps }, (_, k) => `step-${k + 1}.png`),
  }));
}

function body(r: ReturnType<typeof runs>) {
  return commentBody({
    runs: r,
    hasVideo: true,
    pr: "381",
    repo: "sredhu37/ripples",
    sha: "84be63caf50db7194f183866fc78de0a0737c7c2",
    artifactUrl: "https://example.test/artifact",
    runUrl: "https://example.test/run",
    outcome: "success",
    seconds: "1200",
  });
}

// PR #381: 22 lessons in 3 languages plus the other screens gave 86 runs and 1422 screenshots.
const LESSONS = Array.from({ length: 22 }, (_, i) => `lesson${i}`);
const BIG = runs(
  [
    "map",
    ...LESSONS.flatMap((id) => ["en", "de", "pl"].map((l) => `lesson-${id}-${l}`)),
    ...Array.from({ length: 19 }, (_, i) => `parents-${i}`),
  ],
  17,
);

describe("evidence comment", () => {
  it("shows every screenshot inline for a small PR", () => {
    const text = body(runs(["map", "lesson-money-en"], 5));
    expect(text.startsWith(MARKER)).toBe(true);
    expect(text.match(/<img /g)).toHaveLength(10);
    expect(text).not.toContain("more runs");
  });

  it("stays under the GitHub limit for a PR touching 22 lessons", () => {
    const text = body(BIG);
    expect(BIG.length).toBe(86);
    expect(text.length).toBeLessThanOrEqual(COMMENT_LIMIT);
    expect(COMMENT_LIMIT + 40).toBeLessThan(GITHUB_MAX);
  });

  it("names every run once, inline first and then as a link, in screen order", () => {
    const text = body(BIG);
    const inline = [...text.matchAll(/<summary>([\w-]+): \d+ steps<\/summary>/g)].map((m) => m[1]);
    const linked = [
      ...text.matchAll(
        /^- \[([\w-]+)\]\(https:\/\/github\.com\/[^)]+\/tree\/evidence\/pr-381\/\1\)/gm,
      ),
    ].map((m) => m[1]);
    expect(inline.length).toBeGreaterThan(0);
    expect(linked.length).toBeGreaterThan(0);
    expect([...inline, ...linked]).toEqual(BIG.map((r) => r.name));
    expect(text).toContain(`${linked.length} more runs: screenshots on the evidence branch`);
  });

  it("stays under the limit even with thousands of runs", () => {
    const text = body(
      runs(
        Array.from({ length: 3000 }, (_, i) => `lesson-x${i}-en`),
        20,
      ),
    );
    expect(text.length).toBeLessThanOrEqual(COMMENT_LIMIT);
    expect(text).toContain("https://github.com/sredhu37/ripples/tree/evidence/pr-381)");
  });
});
