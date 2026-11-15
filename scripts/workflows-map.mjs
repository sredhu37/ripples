// Builds docs/WORKFLOWS.md from .github/workflows/*.yml.
//
//   node scripts/workflows-map.mjs          write docs/WORKFLOWS.md
//   node scripts/workflows-map.mjs --check  exit 1 when the file differs, or when
//                                           docs/factory-flow.svg names a workflow file that is missing
//
// Triggers come from the `on:` block. "Starts next" comes from `gh workflow run <file>` in steps,
// from other workflows whose `workflow_run` lists this one, and from header comments in the YAML:
//   # map-does: <one line>   what the workflow does
//   # map-next: <text>       a link the script cannot infer (repeatable)
// No YAML dependency: the `on:` block of these files is simple enough to read by indentation.

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const workflowsDir = join(root, ".github", "workflows");
const outFile = join(root, "docs", "WORKFLOWS.md");
const svgFile = join(root, "docs", "factory-flow.svg");

const indentOf = (line) => line.length - line.trimStart().length;
const isBlank = (line) => line.trim() === "" || line.trim().startsWith("#");
const stripQuotes = (s) => s.trim().replace(/^["']|["']$/g, "");
const list = (s) =>
  s
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map(stripQuotes)
    .filter(Boolean);

// Returns [{ event, attrs: { key: string }, inputs: [], schedules: [{ cron, timezone }] }].
export function parseOn(text) {
  const lines = text.split("\n");
  const start = lines.findIndex((l) => /^on:\s*$/.test(l));
  if (start === -1) return [];
  const body = [];
  for (const line of lines.slice(start + 1)) {
    if (!isBlank(line) && indentOf(line) === 0) break;
    if (!isBlank(line)) body.push(line);
  }
  const events = [];
  let current = null;
  let section = null;
  for (const line of body) {
    const indent = indentOf(line);
    const trimmed = line.trim();
    if (indent === 2) {
      const event = trimmed.replace(/:.*$/, "");
      current = { event, attrs: {}, inputs: [], schedules: [] };
      events.push(current);
      section = null;
    } else if (current && current.event === "schedule" && indent >= 4) {
      const cron = trimmed.match(/^- cron:\s*(.*)$/);
      if (cron) current.schedules.push({ cron: stripQuotes(cron[1]), timezone: "" });
      const tz = trimmed.match(/^timezone:\s*(.*)$/);
      if (tz && current.schedules.length > 0)
        current.schedules.at(-1).timezone = stripQuotes(tz[1]);
    } else if (current && indent === 4) {
      const m = trimmed.match(/^([a-z_-]+):\s*(.*)$/);
      if (!m) continue;
      section = m[1];
      if (m[2]) current.attrs[m[1]] = m[2];
    } else if (current && indent === 6 && section === "inputs") {
      current.inputs.push(trimmed.replace(/:.*$/, ""));
    }
  }
  return events;
}

function describeEvent(e) {
  if (e.event === "schedule") {
    return e.schedules.map(
      (s) => `schedule \`${s.cron}\`${s.timezone ? ` (${s.timezone})` : " (UTC)"}`,
    );
  }
  let text = `\`${e.event}\``;
  const types = e.attrs.types ? list(e.attrs.types).join(", ") : "";
  const branches = e.attrs.branches ? list(e.attrs.branches).join(", ") : "";
  const detail = [];
  if (types) detail.push(types);
  if (branches) detail.push(`branches ${branches}`);
  if (e.attrs.workflows) detail.push(`after ${list(e.attrs.workflows).join(", ")}`);
  if (e.inputs.length > 0) detail.push(`inputs ${e.inputs.join(", ")}`);
  if (detail.length > 0) text += `: ${detail.join("; ")}`;
  return [text];
}

export function readWorkflows(dir = workflowsDir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".yml") || f.endsWith(".yaml"))
    .sort()
    .map((file) => {
      const text = readFileSync(join(dir, file), "utf8");
      const name = text.match(/^name:\s*(.*)$/m)?.[1]?.trim() ?? file;
      const does = text.match(/^# map-does:\s*(.*)$/m)?.[1]?.trim() ?? "";
      const notes = [...text.matchAll(/^# map-next:\s*(.*)$/gm)].map((m) => m[1].trim());
      const dispatches = [...text.matchAll(/gh workflow run ([\w.-]+\.ya?ml)/g)].map((m) => m[1]);
      const events = parseOn(text);
      const runOf = events.find((e) => e.event === "workflow_run");
      const after = runOf?.attrs.workflows ? list(runOf.attrs.workflows) : [];
      return { file, name, does, notes, dispatches, events, after };
    });
}

export function buildMarkdown(workflows) {
  const rows = workflows.map((w) => {
    const trigger = w.events.flatMap(describeEvent).join("<br>");
    const next = new Set(w.dispatches.map((f) => `\`${f}\``));
    for (const other of workflows) {
      if (other.after.includes(w.name)) next.add(`\`${other.file}\``);
    }
    for (const note of w.notes) next.add(note);
    return `| \`${w.file}\` | ${trigger} | ${w.does || "(add a `# map-does:` header comment)"} | ${[...next].join("<br>") || "nothing"} |`;
  });
  return [
    "# Workflows",
    "",
    "One row per file in `.github/workflows/`. Generated by `npm run workflows:map` from the YAML; do not edit by hand.",
    "CI fails when this file differs from the generated one. The flow diagram is [factory-flow.svg](factory-flow.svg). Spec: [factory.md](factory.md).",
    "",
    "| File | Trigger | What it does | Starts next |",
    "| --- | --- | --- | --- |",
    ...rows,
    "",
  ].join("\n");
}

// Workflow files named in the SVG that do not exist.
export function missingInSvg(svg, files) {
  const named = new Set([...svg.matchAll(/[\w-]+\.ya?ml/g)].map((m) => m[0]));
  return [...named].filter((f) => !files.includes(f)).sort();
}

function main() {
  const workflows = readWorkflows();
  const markdown = buildMarkdown(workflows);
  if (!process.argv.includes("--check")) {
    writeFileSync(outFile, markdown);
    console.log(`Wrote docs/WORKFLOWS.md (${workflows.length} workflows)`);
    return;
  }
  let failed = false;
  const current = existsSync(outFile) ? readFileSync(outFile, "utf8") : "";
  if (current !== markdown) {
    console.error("docs/WORKFLOWS.md is out of date. Run: npm run workflows:map");
    failed = true;
  }
  if (existsSync(svgFile)) {
    const missing = missingInSvg(
      readFileSync(svgFile, "utf8"),
      workflows.map((w) => w.file),
    );
    if (missing.length > 0) {
      console.error(
        `docs/factory-flow.svg names workflow files that do not exist: ${missing.join(", ")}`,
      );
      failed = true;
    }
  }
  if (failed) process.exit(1);
  console.log("docs/WORKFLOWS.md is up to date");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
