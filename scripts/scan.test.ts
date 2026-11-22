import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { localActive, plan, slotsUsed, station } from "../.github/scripts/sweep/scan.mjs";

const script = join(import.meta.dirname, "../.github/scripts/sweep/scan.mjs");
const now = "2026-11-22T12:00:00Z";

type Pr = {
  number: number;
  checks: string;
  checksDetail?: string;
  summaryForHead: boolean;
  reviewStatus: string;
  rounds: number;
  gateForHead: boolean;
  checksDoneAt?: string;
  updateForHead?: boolean;
  conflict?: boolean;
};

function pr(over: Partial<Pr> = {}): Pr {
  return {
    number: 100,
    checks: "green",
    summaryForHead: false,
    reviewStatus: "none",
    rounds: 0,
    gateForHead: false,
    checksDoneAt: "2026-11-22T11:00:00Z",
    ...over,
  };
}

function ticket(number: number, column: string, over: Record<string, unknown> = {}) {
  return {
    number,
    column,
    local: false,
    active: false,
    updatedAt: now,
    blockers: 0,
    continues: 0,
    pr: null as Pr | null,
    ...over,
  };
}

const run = (tickets: unknown[], max = 5, only: number | null = null) =>
  plan({ now, max, only, tickets });

describe("station (In review)", () => {
  it.each([
    [{ checks: "pending" }, "wait"],
    [{ checks: "red", checksDetail: "not green: lint (failure)" }, "fix"],
    [{}, "review"],
    [{ summaryForHead: true, reviewStatus: "none" }, "review"],
    [{ summaryForHead: true, reviewStatus: "failure", rounds: 2 }, "fix"],
    [{ summaryForHead: true, reviewStatus: "failure", rounds: 5 }, "none"],
    [{ summaryForHead: true, reviewStatus: "error", rounds: 1 }, "none"],
    [{ summaryForHead: true, reviewStatus: "success", rounds: 1 }, "gate"],
    [{ summaryForHead: true, reviewStatus: "success", rounds: 1, gateForHead: true }, "merge"],
    [
      {
        summaryForHead: true,
        reviewStatus: "success",
        rounds: 1,
        gateForHead: true,
        conflict: true,
      },
      "fix",
    ],
    [{ updateForHead: true }, "merge"],
    [{ updateForHead: true, checks: "pending" }, "wait"],
    [{ updateForHead: true, checks: "red" }, "fix"],
  ])("%j -> %s", (facts, action) => {
    expect(station(ticket(1, "review", { pr: pr(facts) }), now).action).toBe(action);
  });

  it("leaves a missing review alone for 10 minutes after the checks finished", () => {
    const fresh = pr({ checksDoneAt: "2026-11-22T11:52:00Z" });
    expect(station(ticket(1, "review", { pr: fresh }), now)).toMatchObject({
      action: "wait",
      reason: expect.stringContaining("checks green 8 min ago"),
    });
    const quiet = pr({ checksDoneAt: "2026-11-22T11:50:00Z" });
    expect(station(ticket(1, "review", { pr: quiet }), now).action).toBe("review");
  });

  it("uses no slot while a fresh green PR waits for its review", () => {
    const result = run(
      [
        ticket(1, "review", { pr: pr({ checksDoneAt: "2026-11-22T11:59:00Z" }) }),
        ticket(2, "ready"),
      ],
      1,
    );
    expect(result.actions.map((a) => a.issue)).toEqual([2]);
  });

  it("rebuilds an In review ticket without an open factory PR", () => {
    expect(station(ticket(1, "review"), now).action).toBe("build");
  });
});

describe("slots", () => {
  it("counts active tickets in any column and local tickets touched in the last 2 hours", () => {
    const tickets = [
      ticket(1, "review", { active: true }),
      ticket(2, "other", { active: true }),
      ticket(3, "progress", { local: true, updatedAt: "2026-11-22T10:30:00Z" }),
      ticket(4, "progress", { local: true, updatedAt: "2026-11-22T09:30:00Z" }),
      ticket(5, "ready"),
    ];
    expect(slotsUsed(tickets, now)).toBe(3);
  });

  it("treats a local ticket as quiet after 2 hours", () => {
    expect(localActive({ updatedAt: "2026-11-22T10:00:00Z" }, now)).toBe(true);
    expect(localActive({ updatedAt: "2026-11-22T09:59:00Z" }, now)).toBe(false);
  });
});

describe("plan", () => {
  it("fills In review, then In progress, then Ready, oldest issue first", () => {
    const result = run([
      ticket(30, "ready"),
      ticket(10, "ready"),
      ticket(20, "progress"),
      ticket(40, "review", { pr: pr({ number: 41 }) }),
    ]);
    expect(result.actions.map((a) => [a.issue, a.kind, a.workflow])).toEqual([
      [40, "continue", "factory-review.yml"],
      [20, "continue", "factory-build.yml"],
      [10, "start", "factory-build.yml"],
      [30, "start", "factory-build.yml"],
    ]);
  });

  it("starts no more than the free slots", () => {
    const result = run(
      [
        ticket(1, "other", { active: true }),
        ticket(2, "ready"),
        ticket(3, "ready"),
        ticket(4, "ready"),
      ],
      3,
    );
    expect(result.used).toBe(1);
    expect(result.actions.map((a) => a.issue)).toEqual([2, 3]);
    expect(result.skipped).toEqual([{ issue: 4, reason: expect.stringContaining("no free slot") }]);
    expect(result.free).toBe(0);
  });

  it("dispatches the station the In review ticket misses", () => {
    const result = run([
      ticket(1, "review", { pr: pr({ number: 11, checks: "red" }) }),
      ticket(2, "review", {
        pr: pr({ number: 12, summaryForHead: true, reviewStatus: "success", rounds: 1 }),
      }),
    ]);
    expect(result.actions.map((a) => [a.workflow, a.inputs])).toEqual([
      ["factory-build.yml", { issue: "1", pr: "11" }],
      ["factory-gate.yml", { pr: "12", mode: "gate" }],
    ]);
  });

  it("hands an updated head to the gate's merge mode", () => {
    const result = run([ticket(1, "review", { pr: pr({ number: 11, updateForHead: true }) })]);
    expect(result.actions[0]).toMatchObject({
      workflow: "factory-gate.yml",
      inputs: { pr: "11", mode: "merge" },
    });
  });

  it("uses no slot for a ticket waiting for CI", () => {
    const result = run(
      [ticket(1, "review", { pr: pr({ checks: "pending" }) }), ticket(2, "ready")],
      1,
    );
    expect(result.actions.map((a) => a.issue)).toEqual([2]);
    expect(result.skipped[0]).toEqual({ issue: 1, reason: expect.stringContaining("still run") });
  });

  it("skips active tickets, local tickets and blocked Ready tickets", () => {
    const result = run([
      ticket(1, "progress", { active: true }),
      ticket(2, "progress", { local: true }),
      ticket(3, "ready", { blockers: 2 }),
    ]);
    expect(result.actions).toEqual([]);
    expect(result.skipped.map((s) => s.issue)).toEqual([1, 2, 3]);
  });

  it("hands a ticket continued 3 times to Sunny, without using a slot", () => {
    const result = run([ticket(1, "progress", { continues: 3 }), ticket(2, "ready")], 1);
    expect(result.actions.map((a) => [a.issue, a.kind])).toEqual([
      [1, "human"],
      [2, "start"],
    ]);
  });

  it("continues a ticket with fewer than 3 continues", () => {
    expect(run([ticket(1, "progress", { continues: 2 })]).actions[0].kind).toBe("continue");
  });

  it("never starts a Ready ticket's continue count", () => {
    expect(run([ticket(1, "ready", { continues: 5 })]).actions[0].kind).toBe("start");
  });

  it("considers only one issue when asked, within the slots", () => {
    const tickets = [ticket(1, "ready"), ticket(2, "ready")];
    expect(run(tickets, 5, 2).actions.map((a) => a.issue)).toEqual([2]);
    expect(run([ticket(9, "other", { active: true }), ...tickets], 1, 2).actions).toEqual([]);
  });
});

describe("scan.mjs plan", () => {
  it("prints the plan for a state file", () => {
    const dir = mkdtempSync(join(tmpdir(), "scan-"));
    const file = join(dir, "state.json");
    writeFileSync(file, JSON.stringify({ now, max: 5, only: null, tickets: [ticket(7, "ready")] }));
    const out = JSON.parse(execFileSync("node", [script, "plan", file], { encoding: "utf8" }));
    expect(out.actions[0]).toMatchObject({ issue: 7, kind: "start", inputs: { issue: "7" } });
  });
});
