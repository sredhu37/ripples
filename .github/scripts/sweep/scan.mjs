// The hourly scan's plan: which tickets to start or continue, given the board and the runs.
// Spec: docs/factory.md, section Scan (#313).
//
//   node .github/scripts/sweep/scan.mjs plan <state.json>     prints the plan as json
//
// Pure: sweep/scan.sh collects the state with gh and carries the plan out.
//
// State: { now, max, only, tickets: [ticket] }
//   ticket: { number, column: "review" | "progress" | "ready", local, active, updatedAt,
//             blockers, continues, pr }
//     local      the ticket is driven from Sunny's Claude Code (label set by a person, or an In
//                review PR that is not on factory/issue-<n>)
//     active     a factory-build, factory-review or factory-gate run for it has not finished
//     continues  scan continues since the ticket last entered Ready by hand
//     pr         null, or { number, checks: "green" | "red" | "pending", checksDetail,
//                summaryForHead, reviewStatus: "success" | "failure" | "error" | "none",
//                rounds, gateForHead }
//   Tickets in other columns (Needs human, for example) come in with only number and active, so
//   their runs still use a slot.
//
// Plan: { used, free, actions: [{ issue, kind, workflow, inputs, reason }], skipped: [{ issue, reason }] }
//   kind "start" (Ready), "continue" (In progress or In review), "human" (continue cap reached)

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const MAX_CONTINUES = 3;
export const MAX_ROUNDS = 5;
export const LOCAL_ACTIVE_HOURS = 2;
const ORDER = { review: 0, progress: 1, ready: 2 };

/** Is a local ticket still being worked on: issue or PR touched in the last 2 hours? */
export function localActive(ticket, now) {
  if (!ticket.updatedAt) return false;
  const hours = (Date.parse(now) - Date.parse(ticket.updatedAt)) / 3_600_000;
  return hours <= LOCAL_ACTIVE_HOURS;
}

/** Slots in use: every ticket with an active run, plus local In progress or In review tickets still worked on. */
export function slotsUsed(tickets, now) {
  return tickets.filter(
    (t) =>
      t.active ||
      (t.local && (t.column === "progress" || t.column === "review") && localActive(t, now)),
  ).length;
}

/**
 * The missing station of a factory ticket in In review.
 * Returns { action: "build" | "fix" | "review" | "gate" | "wait" | "none", reason }.
 * "wait" and "none" use no slot.
 */
export function station(ticket) {
  const pr = ticket.pr;
  if (!pr) return { action: "build", reason: "In review without an open factory PR" };
  if (pr.checks === "pending")
    return { action: "wait", reason: `PR #${pr.number}: required checks still run` };
  if (pr.checks === "red")
    return {
      action: "fix",
      reason: `PR #${pr.number}: ${pr.checksDetail || "a required check is red"}`,
    };
  if (!pr.summaryForHead || pr.reviewStatus === "none")
    return { action: "review", reason: `PR #${pr.number}: checks green, no review for this head` };
  if (pr.reviewStatus === "failure") {
    if (pr.rounds < MAX_ROUNDS)
      return {
        action: "fix",
        reason: `PR #${pr.number}: review round ${pr.rounds} failed, no fix round ran`,
      };
    return {
      action: "none",
      reason: `PR #${pr.number}: ${pr.rounds} review rounds failed; review hands it to Sunny`,
    };
  }
  if (pr.reviewStatus === "error")
    return { action: "none", reason: `PR #${pr.number}: review error; review hands it to Sunny` };
  if (!pr.gateForHead)
    return {
      action: "gate",
      reason: `PR #${pr.number}: review passed, no gate decision for this head`,
    };
  return { action: "none", reason: `PR #${pr.number}: the gate decided this head` };
}

/** The dispatch for a station: workflow file and inputs. */
export function dispatchFor(ticket, action) {
  switch (action) {
    case "build":
      return { workflow: "factory-build.yml", inputs: { issue: String(ticket.number) } };
    case "fix":
      return {
        workflow: "factory-build.yml",
        inputs: { issue: String(ticket.number), pr: String(ticket.pr.number) },
      };
    case "review":
      return { workflow: "factory-review.yml", inputs: { pr: String(ticket.pr.number) } };
    case "gate":
      return {
        workflow: "factory-gate.yml",
        inputs: { pr: String(ticket.pr.number), mode: "gate" },
      };
    default:
      throw new Error(`no dispatch for ${action}`);
  }
}

/** The plan for one scan. */
export function plan(state) {
  const { now, max, only } = state;
  const tickets = state.tickets ?? [];
  const used = slotsUsed(tickets, now);
  let free = Math.max(0, max - used);
  const actions = [];
  const skipped = [];

  const candidates = tickets
    .filter((t) => t.column in ORDER)
    .filter((t) => !only || t.number === Number(only))
    .sort((a, b) => ORDER[a.column] - ORDER[b.column] || a.number - b.number);

  for (const t of candidates) {
    const skip = (reason) => skipped.push({ issue: t.number, reason });
    if (t.active) {
      skip("a factory run is active");
      continue;
    }
    if (t.local) {
      skip(localActive(t, now) ? "local run, active" : "local run, quiet for over 2 hours");
      continue;
    }

    let step;
    if (t.column === "ready") {
      if (t.blockers > 0) {
        skip(`waits for ${t.blockers} open blocker(s)`);
        continue;
      }
      step = { kind: "start", action: "build", reason: "Ready" };
    } else {
      const s =
        t.column === "progress" ? { action: "build", reason: "the build stopped" } : station(t);
      if (s.action === "wait" || s.action === "none") {
        skip(s.reason);
        continue;
      }
      if (t.continues >= MAX_CONTINUES) {
        actions.push({
          issue: t.number,
          kind: "human",
          reason: `continued ${t.continues} times and it still stopped (${s.reason})`,
        });
        continue;
      }
      step = { kind: "continue", action: s.action, reason: s.reason };
    }

    if (free === 0) {
      skip(`no free slot (${max} in use): ${step.reason}`);
      continue;
    }
    free -= 1;
    actions.push({
      issue: t.number,
      kind: step.kind,
      ...dispatchFor(t, step.action),
      reason: step.reason,
    });
  }
  return { used, free, actions, skipped };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [cmd, file] = process.argv.slice(2);
  if (cmd !== "plan" || !file) {
    console.error("usage: sweep/scan.mjs plan <state.json>");
    process.exit(2);
  }
  process.stdout.write(
    JSON.stringify(plan(JSON.parse(readFileSync(file, "utf8"))), null, 2) + "\n",
  );
}
