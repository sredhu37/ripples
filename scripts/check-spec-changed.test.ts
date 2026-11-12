import { describe, expect, it } from "vitest";
import { checkSpecChanged } from "./check-spec-changed.mjs";

describe("checkSpecChanged", () => {
  it("fails when a .tsx changes without a spec", () => {
    const result = checkSpecChanged(["src/components/MapScreen.tsx", "README.md"]);
    expect(result.ok).toBe(false);
    expect(result.message).toContain("src/components/MapScreen.tsx");
  });

  it("fails when only a .css changes", () => {
    expect(checkSpecChanged(["src/styles.css"]).ok).toBe(false);
  });

  it("passes when a .tsx and a spec both change", () => {
    const result = checkSpecChanged(["src/components/MapScreen.tsx", "e2e/map.spec.ts"]);
    expect(result.ok).toBe(true);
    expect(result.message).toContain("e2e/map.spec.ts");
  });

  it("passes when no UI file changes", () => {
    expect(checkSpecChanged(["src/progress.ts", "docs/factory.md"]).ok).toBe(true);
  });

  it("passes for lesson content and unit tests only", () => {
    const files = [
      "src/content/money.tsx",
      "src/content/money.css",
      "src/components/ParentPanel.test.tsx",
    ];
    expect(checkSpecChanged(files).ok).toBe(true);
  });

  it("does not count files that only look like specs", () => {
    expect(checkSpecChanged(["src/App.tsx", "e2e/helpers.ts", "src/map.spec.ts"]).ok).toBe(false);
  });
});
