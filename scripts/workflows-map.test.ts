import { describe, expect, it } from "vitest";
import { buildMarkdown, missingInSvg, parseOn } from "./workflows-map.mjs";

const sweep = `name: x
on:
  schedule:
    - cron: "7 * * * *"
    - cron: "0 9 * * 1"
      timezone: Europe/Berlin
  workflow_dispatch:
    inputs:
      task:
        description: a
  issues:
    types: [labeled, closed]
permissions: {}
`;

describe("parseOn", () => {
  it("reads schedules with timezone, inputs and types", () => {
    const events = parseOn(sweep);
    expect(events.map((e) => e.event)).toEqual(["schedule", "workflow_dispatch", "issues"]);
    expect(events[0].schedules).toEqual([
      { cron: "7 * * * *", timezone: "" },
      { cron: "0 9 * * 1", timezone: "Europe/Berlin" },
    ]);
    expect(events[1].inputs).toEqual(["task"]);
    expect(events[2].attrs.types).toBe("[labeled, closed]");
  });

  it("returns nothing without an on block", () => {
    expect(parseOn("name: x\n")).toEqual([]);
  });
});

describe("buildMarkdown", () => {
  it("links workflow_run sources and dispatches to the next workflow", () => {
    const md = buildMarkdown([
      {
        file: "a.yml",
        name: "a",
        does: "does a",
        notes: [],
        dispatches: [],
        events: [],
        after: [],
      },
      {
        file: "b.yml",
        name: "b",
        does: "",
        notes: ["note"],
        dispatches: ["a.yml"],
        events: [],
        after: ["a"],
      },
    ]);
    expect(md).toContain("| `a.yml` |  | does a | `b.yml` |");
    expect(md).toContain("`a.yml`<br>note");
  });

  it("omits self-dispatches from starts next", () => {
    const md = buildMarkdown([
      {
        file: "a.yml",
        name: "a",
        does: "does a",
        notes: [],
        dispatches: ["a.yml"],
        events: [],
        after: [],
      },
    ]);
    expect(md).toContain("| `a.yml` |  | does a | nothing |");
  });

  it("overrides a bare dispatch with an annotated note", () => {
    const md = buildMarkdown([
      {
        file: "a.yml",
        name: "a",
        does: "does a",
        notes: ["`b.yml` (special condition)"],
        dispatches: ["b.yml"],
        events: [],
        after: [],
      },
    ]);
    expect(md).toContain("| `a.yml` |  | does a | `b.yml` (special condition) |");
    expect(md).not.toContain("`b.yml`<br>`b.yml`");
  });
});

describe("missingInSvg", () => {
  it("lists workflow files the SVG names that do not exist", () => {
    const svg = "<text>factory-gate.yml</text><text>gone.yml</text>";
    expect(missingInSvg(svg, ["factory-gate.yml"])).toEqual(["gone.yml"]);
  });
});
