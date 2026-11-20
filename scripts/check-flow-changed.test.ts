import { describe, expect, it } from "vitest";
import { checkFlowChanged } from "./check-flow-changed.mjs";

describe("checkFlowChanged", () => {
  it("fails when a workflow changes without the diagram", () => {
    const result = checkFlowChanged([".github/workflows/pr-checks.yml", "README.md"]);
    expect(result.ok).toBe(false);
    expect(result.message).toContain(".github/workflows/pr-checks.yml");
  });

  it("fails when only a script changes", () => {
    expect(checkFlowChanged([".github/scripts/gate.mjs"]).ok).toBe(false);
  });

  it("passes when the diagram changes too", () => {
    const files = [".github/workflows/pr-checks.yml", "docs/factory-flow.svg"];
    expect(checkFlowChanged(files).ok).toBe(true);
  });

  it("passes with a Diagram: unchanged line and a reason", () => {
    const body = "## Decisions\n\nDiagram: unchanged, only a timeout changed\n";
    expect(checkFlowChanged([".github/workflows/pr-checks.yml"], body).ok).toBe(true);
  });

  it("fails when the unchanged line has no reason", () => {
    expect(checkFlowChanged([".github/workflows/pr-checks.yml"], "Diagram: unchanged,").ok).toBe(
      false,
    );
    expect(checkFlowChanged([".github/workflows/pr-checks.yml"], "Diagram: unchanged, ").ok).toBe(
      false,
    );
  });

  it("passes when no factory file changes", () => {
    expect(checkFlowChanged(["src/App.tsx", "docs/factory.md"]).ok).toBe(true);
  });
});
