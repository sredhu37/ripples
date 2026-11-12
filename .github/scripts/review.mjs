#!/usr/bin/env node
// Factory review helpers. Spec: docs/factory.md, sections Review and Build (fix rounds).
//
//   node review.mjs parse <agent> <execution-file> <out.json> [<usage-limit-evidence>]
//     Takes the agent's final json block from the claude-code-action execution file,
//     {"result":"PASS"|"FAIL","findings":[{level,problem,where,fix,rule}]}, and writes
//     {agent, ok, error, result, findings, notes}. A missing or invalid block is ok: false
//     (an error for Sunny), never a PASS.
//
//   node review.mjs summary <results-dir> <out-dir>
//     Env: ROUND, MAX_ROUNDS (default 5), SHA, PR, RUN_URL,
//          PLANT_FAIL ("true" adds a planted FAIL, for the loop tests)
//     Reads <results-dir>/<agent>.json for the 4 agents. Writes <out-dir>/comment.md (the
//     review-summary comment, or the error comment) and <out-dir>/suggestions.md (deduplicated,
//     empty when there are none). Prints outcome=, fails=, suggestions=, errors= lines.
//
// Agent text is untrusted: it is fenced, cut to a length, and cannot fake a round marker.

import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const AGENTS = ["ux-ui", "security", "content", "code-quality"];
export const TOOLS = "Read, Grep, Glob, WebFetch, WebSearch";
const FIELD_MAX = 1500;

/** The agent's final answer text from the execution file messages, or an error. */
export function finalText(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return { error: "the execution file is empty or not a message list" };
  }
  const result = messages.findLast((m) => m && m.type === "result");
  if (result) {
    if (result.subtype === "error_max_turns") {
      return { error: "the agent hit its turn cap before answering (error_max_turns)" };
    }
    if (result.subtype !== "success" || result.is_error) {
      const why = (result.errors ?? []).join(", ") || String(result.result ?? "").split("\n")[0];
      return { error: `the agent run failed (${result.subtype}${why ? `: ${why}` : ""})` };
    }
    if (typeof result.result === "string" && result.result.trim()) {
      return { text: result.result };
    }
  }
  const assistant = messages.findLast(
    (m) => m && m.type === "assistant" && Array.isArray(m.message?.content),
  );
  const text = assistant?.message.content
    .filter((c) => c.type === "text")
    .map((c) => c.text)
    .join("\n");
  if (text && text.trim()) return { text };
  return { error: "the agent gave no final answer" };
}

/** The last fenced json block in the text (or the last fenced block, or the bare text). */
export function extractJson(text) {
  const fence = /```([A-Za-z]*)[^\n]*\n([\s\S]*?)\n[ \t]*```/g;
  const blocks = [...text.matchAll(fence)].map((m) => ({ lang: m[1].toLowerCase(), body: m[2] }));
  const json = blocks.filter((b) => b.lang === "json");
  const candidates = [];
  if (json.length) candidates.push(json.at(-1).body);
  else if (blocks.length) candidates.push(blocks.at(-1).body);
  const bare = text.trim();
  if (bare.startsWith("{") && bare.endsWith("}")) candidates.push(bare);
  if (candidates.length === 0) return { error: "no json block in the final answer" };
  for (const body of candidates) {
    try {
      return { value: JSON.parse(body) };
    } catch {
      // try the next candidate
    }
  }
  return { error: "the final json block is not valid JSON" };
}

const str = (v) => (typeof v === "string" ? v.trim() : "");

/** Checks the json shape. Returns {result, findings, notes} or {error}. */
export function validate(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { error: "the json is not an object" };
  }
  const result = str(value.result).toUpperCase();
  if (result !== "PASS" && result !== "FAIL") {
    return { error: `"result" is ${JSON.stringify(value.result)}, not "PASS" or "FAIL"` };
  }
  if (!Array.isArray(value.findings)) return { error: '"findings" is not a list' };
  const notes = [];
  const findings = [];
  for (const [i, f] of value.findings.entries()) {
    if (!f || typeof f !== "object") return { error: `finding ${i + 1} is not an object` };
    let level = str(f.level).toUpperCase();
    if (level !== "FAIL" && level !== "SUGGESTION") {
      return { error: `finding ${i + 1} has level ${JSON.stringify(f.level)}` };
    }
    const finding = { level, problem: str(f.problem), where: str(f.where), fix: str(f.fix) };
    finding.rule = str(f.rule);
    if (!finding.problem) return { error: `finding ${i + 1} has no problem` };
    if (level === "FAIL" && !finding.rule) {
      // FAIL only when the finding breaks a rule the agent can link to (docs/factory.md, Review).
      level = "SUGGESTION";
      finding.level = level;
      notes.push(`finding ${i + 1} was a FAIL without a rule, counted as a SUGGESTION`);
    }
    findings.push(finding);
  }
  const fails = findings.filter((f) => f.level === "FAIL").length;
  if (result === "FAIL" && fails === 0) {
    return { error: 'result is "FAIL" but no finding is a FAIL with a rule, so nothing to fix' };
  }
  if (result === "PASS" && fails > 0) notes.push('result said "PASS" but a finding is a FAIL');
  return { result: fails > 0 ? "FAIL" : "PASS", findings, notes };
}

/** One agent's record from its execution file messages (null when the file is missing). */
export function parseAgent(agent, messages, limitEvidence = "") {
  const base = { agent, ok: false, result: null, findings: [], notes: [] };
  if (limitEvidence) return { ...base, error: `Claude usage limit (${limitEvidence})` };
  if (messages == null) return { ...base, error: "no execution file (the agent did not run)" };
  const text = finalText(messages);
  if (text.error) return { ...base, error: text.error };
  const json = extractJson(text.text);
  if (json.error) return { ...base, error: json.error };
  const checked = validate(json.value);
  if (checked.error) return { ...base, error: checked.error };
  return { ...base, ok: true, error: null, ...checked };
}

/** The test FAIL that PLANT_FAIL adds. Its fix forces a new commit, so the next round runs. */
export function plantedResult(round) {
  return {
    agent: "planted-test",
    ok: true,
    error: null,
    result: "FAIL",
    notes: ["planted by PLANT_FAIL (workflow_dispatch input or FACTORY_REVIEW_PLANT_FAIL)"],
    findings: [
      {
        level: "FAIL",
        problem: `Planted test FAIL for review round ${round}; it checks that a FAIL goes back to build.`,
        where: "FACTORY_TEST.md",
        fix: `Add the line "fixed round ${round}" at the end of FACTORY_TEST.md in the repo root (create the file if missing), commit and push.`,
        rule: "Factory fix rounds (https://github.com/sredhu37/ripples/blob/main/docs/factory.md#build)",
      },
    ],
  };
}

/** Lowercase, punctuation to spaces (dots and dashes inside paths stay), one space between words. */
export function normalise(s) {
  return String(s ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9./_-]+/g, " ")
    .replace(/(^|\s)[./_-]+|[./_-]+(?=\s|$)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** All SUGGESTIONs from ok agents, deduplicated on normalised where + problem, agents merged. */
export function dedupeSuggestions(results) {
  const byKey = new Map();
  for (const r of results) {
    if (!r.ok) continue;
    for (const f of r.findings) {
      if (f.level !== "SUGGESTION") continue;
      const key = `${normalise(f.where)}|${normalise(f.problem)}`;
      const seen = byKey.get(key);
      if (seen) {
        if (!seen.agents.includes(r.agent)) seen.agents.push(r.agent);
      } else {
        byKey.set(key, { ...f, agents: [r.agent] });
      }
    }
  }
  return [...byKey.values()];
}

/** Agent text made safe for a comment: no HTML comment can open or close (fake markers), length cut. */
export function clean(s) {
  let out = String(s ?? "")
    .replace(/\r/g, "")
    .replace(/<!/g, "< !")
    .replace(/--!?>/g, "-- >");
  if (out.length > FIELD_MAX) out = `${out.slice(0, FIELD_MAX)} [cut]`;
  return out;
}

/** One finding in the spec format, in a fence longer than any backtick run inside. */
export function formatFinding(f) {
  const lines = [
    f.level,
    `Problem: ${clean(f.problem)}`,
    `Where:   ${clean(f.where) || "-"}`,
    `Fix:     ${clean(f.fix) || "-"}`,
    `Rule:    ${clean(f.rule) || "-"}`,
  ].join("\n");
  const longest = Math.max(2, ...[...lines.matchAll(/`+/g)].map((m) => m[0].length));
  const fence = "`".repeat(longest + 1);
  return `${fence}\n${lines}\n${fence}`;
}

export function summaryMarker(round, sha) {
  return `<!-- factory-review round=${round} sha=${sha} -->`;
}

/** The round comment (PASS or FAIL) or the error comment, and the suggestions issue body. */
export function summarize({ results, round, maxRounds = 5, sha, pr, runUrl = "" }) {
  const errors = results.filter((r) => !r.ok);
  const fails = results.flatMap((r) => (r.ok ? r.findings.filter((f) => f.level === "FAIL") : []));
  const suggestions = dedupeSuggestions(results);
  const outcome = errors.length ? "ERROR" : fails.length ? "FAIL" : "PASS";
  const short = String(sha).slice(0, 7);
  const out = [];

  if (outcome === "ERROR") {
    out.push(`<!-- factory-review-error sha=${sha} -->`);
    out.push(`## Review error at \`${short}\`: Needs human`, "");
    out.push(
      `${errors.length} of ${results.length} review agents gave no valid result, so no round was used (this would have been round ${round} of ${maxRounds}). Rerun with workflow_dispatch (pr ${pr}) once the cause is fixed.`,
      "",
    );
    for (const r of errors) out.push(`- **${r.agent}**: ${clean(r.error)}`);
    out.push("");
  } else {
    out.push(summaryMarker(round, sha));
    out.push(`## Review round ${round} of ${maxRounds}: ${outcome}`, "");
    const counts = `Head \`${short}\`. ${fails.length} FAIL, ${suggestions.length} suggestions.`;
    if (outcome === "PASS") {
      out.push(
        `${counts} Review passed. Suggestions go to one suggestions issue; the gate is next.`,
      );
    } else if (round < maxRounds) {
      out.push(
        `${counts} Back to the build agent: it fixes every FAIL below, then review round ${round + 1} of ${maxRounds} runs.`,
      );
    } else {
      out.push(`${counts} ${maxRounds} review rounds failed. Needs human: Sunny decides.`);
    }
    out.push("");
  }

  for (const r of results) {
    if (!r.ok) continue;
    out.push(`### ${r.agent}: ${r.result}`, "");
    const ordered = [
      ...r.findings.filter((f) => f.level === "FAIL"),
      ...r.findings.filter((f) => f.level === "SUGGESTION"),
    ];
    if (ordered.length === 0) out.push("No findings.", "");
    for (const f of ordered) out.push(formatFinding(f), "");
    for (const n of r.notes ?? []) out.push(`Note: ${clean(n)}`, "");
  }

  out.push(
    `Review agents ran with ${TOOLS} only: no Bash, no Edit, no Write, no push.${runUrl ? ` Run: ${runUrl}` : ""}`,
  );
  let comment = out.join("\n");
  if (comment.length > 60000) comment = `${comment.slice(0, 60000)}\n\n[cut: see the run]`;

  let issue = "";
  if (suggestions.length) {
    const body = [
      `<!-- factory-suggestions pr=${pr} -->`,
      `Suggestions from the factory review of #${pr} (round ${round}, head \`${short}\`). None of them blocked the PR. Sort them with /triage.`,
      "",
    ];
    suggestions.forEach((s, i) => {
      body.push(`### ${i + 1}. From ${s.agents.join(", ")}`, "", formatFinding(s), "");
    });
    issue = body.join("\n");
    if (issue.length > 60000) issue = `${issue.slice(0, 60000)}\n\n[cut]`;
  }

  return { outcome, comment, issue, fails: fails.length, suggestions: suggestions.length, errors };
}

function readJson(path) {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return undefined;
  }
}

function cli(argv) {
  const [cmd, ...args] = argv;
  if (cmd === "parse") {
    const [agent, file, outFile, limit = ""] = args;
    if (!agent || !file || !outFile)
      throw new Error("usage: review.mjs parse <agent> <file> <out>");
    const messages = readJson(file);
    const record =
      messages === undefined
        ? {
            agent,
            ok: false,
            result: null,
            findings: [],
            notes: [],
            error: "the execution file is not JSON",
          }
        : parseAgent(agent, messages, limit);
    writeFileSync(outFile, JSON.stringify(record, null, 2));
    console.log(
      record.ok
        ? `${agent}: ${record.result}, ${record.findings.length} findings`
        : `${agent}: error: ${record.error}`,
    );
    return;
  }
  if (cmd === "summary") {
    const [dir, outDir] = args;
    if (!dir || !outDir) throw new Error("usage: review.mjs summary <results-dir> <out-dir>");
    const env = process.env;
    const round = Number(env.ROUND);
    if (!Number.isInteger(round) || round < 1)
      throw new Error(`ROUND '${env.ROUND}' is not a round`);
    const results = AGENTS.map((agent) => {
      const r = readJson(join(dir, `${agent}.json`));
      return r && r.agent === agent
        ? r
        : {
            agent,
            ok: false,
            result: null,
            findings: [],
            notes: [],
            error: "no result file (the review job did not finish)",
          };
    });
    if (env.PLANT_FAIL === "true") results.push(plantedResult(round));
    const s = summarize({
      results,
      round,
      maxRounds: Number(env.MAX_ROUNDS || 5),
      sha: env.SHA,
      pr: env.PR,
      runUrl: env.RUN_URL,
    });
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "comment.md"), s.comment);
    writeFileSync(join(outDir, "suggestions.md"), s.issue);
    console.log(`outcome=${s.outcome}`);
    console.log(`fails=${s.fails}`);
    console.log(`suggestions=${s.suggestions}`);
    console.log(
      `errors=${s.errors.map((e) => `${e.agent}: ${e.error}`.replace(/\n/g, " ")).join("; ")}`,
    );
    return;
  }
  throw new Error("usage: review.mjs parse|summary ...");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  try {
    cli(process.argv.slice(2));
  } catch (error) {
    console.error(`review.mjs: ${error.message}`);
    process.exit(2);
  }
}
