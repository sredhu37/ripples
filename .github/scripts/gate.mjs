#!/usr/bin/env node
// Factory gate helpers. Spec: docs/factory.md, section Gate.
//
//   node gate.mjs match <gate-paths-file> <changed-files-file>
//     Prints "<file><TAB><pattern>" for every changed file on the risky list. Patterns are
//     relative to the repo root: "*" matches inside one folder, "**" any depth, anything
//     else is an exact path. Lines starting with "#" and blank lines are ignored.
//
//   node gate.mjs parse <execution-file> <out.json> [<usage-limit-evidence>]
//     Takes the gate agent's final answer from the claude-code-action execution file and
//     writes {ok, decision, reason, analysis, error}. A missing or invalid json block is
//     decision HUMAN (unsure means Sunny), never MERGE.
//
//   node gate.mjs comment <out.md>
//     Env: SHA, PR, RUN_URL, RISKY_FILE (output of match, may be empty), RESULT_FILE (output
//     of parse, may be missing). Writes the one gate comment, marker
//     <!-- factory-gate sha=<sha> --> on line 1, and prints decision= and reason= lines.
//
// Agent text is untrusted: it is cut to a length and cannot fake a gate or review marker.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { extractJson, finalText } from "./review.mjs";

export const TOOLS = "Read, Grep, Glob";
const ANALYSIS_MAX = 20000;
const REASON_MAX = 1000;

/** The patterns of a gate-paths.txt text, comments and blank lines dropped. */
export function parsePatterns(text) {
  return String(text ?? "")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.replace(/^\.?\//, ""));
}

/** A pattern as an anchored RegExp. "dir/" means "dir/**". */
export function globToRegExp(pattern) {
  let p = pattern.endsWith("/") ? `${pattern}**` : pattern;
  p = p.replace(/^\.?\//, "");
  let out = "";
  for (let i = 0; i < p.length; i++) {
    const c = p[i];
    if (c === "*" && p[i + 1] === "*") {
      const slashBefore = i === 0 || p[i - 1] === "/";
      const slashAfter = p[i + 2] === "/";
      if (slashBefore && slashAfter) {
        // "**/": zero or more folders
        out += "(?:[^/]+/)*";
        i += 2;
      } else {
        out += ".*";
        i += 1;
      }
    } else if (c === "*") {
      out += "[^/]*";
    } else if (c === "?") {
      out += "[^/]";
    } else {
      out += c.replace(/[.+^${}()|[\]\\]/g, "\\$&");
    }
  }
  return new RegExp(`^${out}$`);
}

/** Changed files on the risky list, each with the first pattern it matches. */
export function matchRisky(patterns, files) {
  const compiled = patterns.map((p) => ({ pattern: p, re: globToRegExp(p) }));
  const hits = [];
  const seen = new Set();
  for (const raw of files) {
    const file = String(raw ?? "")
      .trim()
      .replace(/^\.?\//, "");
    if (!file || seen.has(file)) continue;
    seen.add(file);
    const hit = compiled.find((c) => c.re.test(file));
    if (hit) hits.push({ file, pattern: hit.pattern });
  }
  return hits;
}

/** Agent text made safe for a comment: no HTML comment can open or close (fake markers), length cut. */
export function clean(s, max = ANALYSIS_MAX) {
  let out = String(s ?? "")
    .replace(/\r/g, "")
    .replace(/<!/g, "< !")
    .replace(/--!?>/g, "-- >")
    .trim();
  if (out.length > max) out = `${out.slice(0, max)} [cut]`;
  return out;
}

/** The final answer without its last fenced json block: the risk analysis. */
export function analysisText(text) {
  const fence = /```json[^\n]*\n[\s\S]*?\n[ \t]*```/gi;
  const blocks = [...String(text).matchAll(fence)];
  if (blocks.length === 0) return String(text).trim();
  const last = blocks.at(-1);
  return (text.slice(0, last.index) + text.slice(last.index + last[0].length)).trim();
}

/** The gate agent's record from its execution file messages (null when the file is missing). */
export function parseGate(messages, limitEvidence = "") {
  const human = (error, analysis = "") => ({
    ok: false,
    decision: "HUMAN",
    reason: `the gate agent gave no valid answer: ${error}`,
    analysis,
    error,
  });
  if (limitEvidence) return human(`Claude usage limit (${limitEvidence})`);
  if (messages == null) return human("no execution file (the agent did not run)");
  const text = finalText(messages);
  if (text.error) return human(text.error);
  const analysis = analysisText(text.text);
  const json = extractJson(text.text);
  if (json.error) return human(json.error, analysis);
  const v = json.value;
  if (!v || typeof v !== "object" || Array.isArray(v))
    return human("the json is not an object", analysis);
  const decision = typeof v.decision === "string" ? v.decision.trim().toUpperCase() : "";
  if (decision !== "MERGE" && decision !== "HUMAN") {
    return human(`"decision" is ${JSON.stringify(v.decision)}, not "MERGE" or "HUMAN"`, analysis);
  }
  const reason = typeof v.reason === "string" ? v.reason.trim() : "";
  if (!reason) return human('"reason" is missing or empty', analysis);
  return { ok: true, decision, reason, analysis, error: null };
}

export function gateMarker(sha) {
  return `<!-- factory-gate sha=${sha} -->`;
}

/**
 * The gate decision and the comment. Risky files win over the agent (the agent does not run
 * then); a missing agent result is HUMAN.
 * @param {{ sha: string, pr: string, risky?: { file: string, pattern: string }[],
 *   result?: { ok: boolean, decision: string, reason: string, analysis: string, error: string | null } | null,
 *   runUrl?: string }} input
 */
export function gateComment({ sha, pr, risky = [], result = null, runUrl = "" }) {
  const short = String(sha).slice(0, 7);
  let decision;
  let reason;
  const out = [gateMarker(sha)];
  if (risky.length) {
    decision = "HUMAN";
    const names = risky.map((r) => r.file);
    const shown =
      names.slice(0, 5).join(", ") + (names.length > 5 ? ` and ${names.length - 5} more` : "");
    reason = `the PR changes ${names.length} file${names.length === 1 ? "" : "s"} on the risky list (${shown})`;
    out.push(`## Gate at \`${short}\`: HUMAN`, "");
    out.push("### Risks", "");
    out.push(
      "Files on the risky list (`.github/gate-paths.txt` from main). A PR that changes any of them always goes to Sunny, so the gate agent did not run.",
      "",
    );
    for (const r of risky.slice(0, 100))
      out.push(`- \`${clean(r.file, 300)}\` (pattern \`${clean(r.pattern, 200)}\`)`);
    if (risky.length > 100) out.push(`- and ${risky.length - 100} more`);
    out.push("");
  } else {
    const r = result ?? parseGate(null);
    decision = r.decision;
    reason = r.reason;
    out.push(`## Gate at \`${short}\`: ${decision}`, "");
    out.push("### Risks", "");
    out.push("No changed file is on the risky list. The gate agent's risk analysis:", "");
    out.push(r.analysis ? quote(clean(r.analysis)) : "> (no analysis)", "");
    if (!r.ok) out.push(`Gate agent error: ${clean(r.error, 500)}. Unsure means Sunny.`, "");
  }
  out.push("### Decision", "", `**${decision}**`, "");
  out.push("### Reason", "", clean(reason, REASON_MAX), "");
  out.push(
    decision === "MERGE"
      ? "Next: `sredhu37-bot` merges this PR once the head is unchanged and every required check is green."
      : `Next: Needs human. Sunny approves the PR to merge it (an approving review on \`${short}\`, sredhu37-bot merges), or comments to start a fix round.`,
    "",
  );
  const agentNote = risky.length
    ? ""
    : `The gate agent ran with ${TOOLS} only: no Bash, no Edit, no Write, no push. `;
  out.push(`${agentNote}PR #${pr}.${runUrl ? ` Run: ${runUrl}` : ""}`);
  return {
    decision,
    reason: clean(reason, REASON_MAX).replace(/\s+/g, " "),
    comment: out.join("\n"),
  };
}

function quote(text) {
  return text
    .split("\n")
    .map((l) => (l ? `> ${l}` : ">"))
    .join("\n");
}

function readJson(path) {
  if (!path || !existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return undefined;
  }
}

function readRisky(path) {
  if (!path || !existsSync(path)) return [];
  return readFileSync(path, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => {
      const [file, pattern = ""] = l.split("\t");
      return { file, pattern };
    });
}

function cli(argv) {
  const [cmd, ...args] = argv;
  if (cmd === "match") {
    const [pathsFile, filesFile] = args;
    if (!pathsFile || !filesFile) throw new Error("usage: gate.mjs match <gate-paths> <files>");
    const patterns = parsePatterns(readFileSync(pathsFile, "utf8"));
    if (patterns.length === 0) throw new Error(`${pathsFile} has no patterns`);
    const files = readFileSync(filesFile, "utf8").split("\n");
    for (const h of matchRisky(patterns, files)) console.log(`${h.file}\t${h.pattern}`);
    return;
  }
  if (cmd === "parse") {
    const [file, outFile, limit = ""] = args;
    if (!file || !outFile) throw new Error("usage: gate.mjs parse <execution-file> <out>");
    const messages = readJson(file);
    const record =
      messages === undefined
        ? {
            ok: false,
            decision: "HUMAN",
            reason: "the gate agent gave no valid answer: the execution file is not JSON",
            analysis: "",
            error: "the execution file is not JSON",
          }
        : parseGate(messages, limit);
    writeFileSync(outFile, JSON.stringify(record, null, 2));
    console.log(
      record.ok ? `gate: ${record.decision}: ${record.reason}` : `gate: error: ${record.error}`,
    );
    return;
  }
  if (cmd === "comment") {
    const [outFile] = args;
    if (!outFile) throw new Error("usage: gate.mjs comment <out.md>");
    const env = process.env;
    if (!/^[0-9a-f]{40}$/.test(env.SHA ?? ""))
      throw new Error(`SHA '${env.SHA}' is not a commit sha`);
    const result = readJson(env.RESULT_FILE);
    const g = gateComment({
      sha: env.SHA,
      pr: env.PR,
      risky: readRisky(env.RISKY_FILE),
      result: result && typeof result.decision === "string" ? result : null,
      runUrl: env.RUN_URL,
    });
    writeFileSync(outFile, g.comment);
    console.log(`decision=${g.decision}`);
    console.log(`reason=${g.reason}`);
    return;
  }
  throw new Error("usage: gate.mjs match|parse|comment ...");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    cli(process.argv.slice(2));
  } catch (error) {
    console.error(`gate.mjs: ${error.message}`);
    process.exit(2);
  }
}
