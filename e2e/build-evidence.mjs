// Collects the evidence of one Playwright run for the pull request comment.
//
// Reads test-results/<name>/step-<k>.png and video.txt written by evidence.ts,
// then writes into <out>:
//   pr-<n>/<name>/step-<k>.png   screenshots, one folder per spec run
//   pr-<n>/demo.mp4              the spec videos joined (H.264), made with ffmpeg
//   comment.md                   the evidence comment body
//
// Usage: node build-evidence.mjs <out>
// Env: PR_NUMBER, REPO (owner/name), HEAD_SHA, ARTIFACT_URL, RUN_URL,
// SPECS_OUTCOME, SPECS_SECONDS.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const MARKER = "<!-- evidence -->";
const RESULTS = path.join(import.meta.dirname, "test-results");
// Order of the screens in the video and the comment.
const ORDER = ["map", "lesson", "facts", "parents", "timeline"];

function rank(name) {
  const i = ORDER.findIndex((s) => name === s || name.startsWith(`${s}-`));
  return i === -1 ? ORDER.length : i;
}

function stepNumber(file) {
  return Number(file.match(/step-(\d+)\.png$/)[1]);
}

/** Spec runs that saved steps, in screen order, each with its sorted step files. */
export function collectRuns(results = RESULTS) {
  if (!fs.existsSync(results)) return [];
  return fs
    .readdirSync(results, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(results, d.name, "video.txt")))
    .map((d) => {
      const dir = path.join(results, d.name);
      const steps = fs
        .readdirSync(dir)
        .filter((f) => /^step-\d+\.png$/.test(f))
        .sort((a, b) => stepNumber(a) - stepNumber(b));
      const video = fs.readFileSync(path.join(dir, "video.txt"), "utf8").trim();
      return { name: d.name, dir, steps, video };
    })
    .sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name));
}

/**
 * The walkthrough video shows one run per screen (for the lesson: the first id in English).
 * The specs pause after every action and Playwright draws the pointer and the clicked element.
 */
export function videoRuns(runs) {
  const seen = new Set();
  return runs.filter((r) => {
    if (!fs.existsSync(r.video)) return false;
    const screen = ORDER[rank(r.name)] ?? r.name;
    if (screen === "lesson" && !r.name.endsWith("-en")) return false;
    if (seen.has(screen)) return false;
    seen.add(screen);
    return true;
  });
}

// H.264 MP4 plays in every browser's own player (pause, rewind, speed); a GIF cannot pause.
function makeVideo(videos, file) {
  const inputs = videos.flatMap((v) => ["-i", v]);
  const joined = videos.map((_, i) => `[${i}:v]`).join("");
  const filter = `${joined}concat=n=${videos.length}:v=1:a=0,scale=trunc(iw/2)*2:trunc(ih/2)*2`;
  const encode = ["-c:v", "libx264", "-crf", "28", "-preset", "veryfast", "-pix_fmt", "yuv420p"];
  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-loglevel",
      "error",
      ...inputs,
      "-filter_complex",
      filter,
      ...encode,
      "-movflags",
      "+faststart",
      file,
    ],
    { stdio: "inherit" },
  );
}

/** Replaced in demo.yml with the evidence branch commit, once it is pushed. */
export const EVIDENCE_SHA = "__EVIDENCE_SHA__";

export function commentBody({
  runs,
  hasVideo,
  pr,
  repo,
  sha,
  artifactUrl,
  runUrl,
  outcome,
  seconds,
}) {
  const raw = (p) => `https://raw.githubusercontent.com/${repo}/evidence/pr-${pr}/${p}?sha=${sha}`;
  const lines = [
    MARKER,
    "## Evidence",
    "",
    `Commit \`${sha.slice(0, 7)}\`. Specs: **${outcome}** in ${seconds}s. [Run](${runUrl}).`,
    "",
  ];
  // GitHub strips <video> and serves raw .mp4 as a download; jsDelivr serves it as video/mp4.
  // Pinned to the evidence commit, so an update never shows a cached older video.
  const cdn = (p) => `https://cdn.jsdelivr.net/gh/${repo}@${EVIDENCE_SHA}/pr-${pr}/${p}`;
  if (hasVideo) {
    lines.push(`▶ [Watch the walkthrough](${cdn("demo.mp4")}) (pause, rewind, speed)`, "");
  }
  lines.push(
    artifactUrl
      ? `Full videos: [demo-video artifact](${artifactUrl}) (kept 90 days).`
      : "No video artifact was uploaded.",
    "",
  );
  for (const r of runs) {
    lines.push(`<details><summary>${r.name}: ${r.steps.length} steps</summary>`, "");
    for (const s of r.steps) {
      lines.push(`<img src="${raw(`${r.name}/${s}`)}" width="400" alt="${r.name} ${s}">`);
    }
    lines.push("", "</details>", "");
  }
  return lines.join("\n");
}

function main() {
  const out = process.argv[2];
  const pr = process.env.PR_NUMBER;
  if (!out || !pr) {
    console.error("Usage: PR_NUMBER=<n> node build-evidence.mjs <out>");
    process.exit(2);
  }
  const target = path.join(out, `pr-${pr}`);
  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(target, { recursive: true });

  const runs = collectRuns();
  for (const r of runs) {
    fs.mkdirSync(path.join(target, r.name), { recursive: true });
    for (const s of r.steps) fs.copyFileSync(path.join(r.dir, s), path.join(target, r.name, s));
  }

  const videos = videoRuns(runs).map((r) => r.video);
  let hasVideo = false;
  if (videos.length > 0) {
    makeVideo(videos, path.join(target, "demo.mp4"));
    hasVideo = true;
  }

  const body = commentBody({
    runs,
    hasVideo,
    pr,
    repo: process.env.REPO ?? "",
    sha: process.env.HEAD_SHA ?? "",
    artifactUrl: process.env.ARTIFACT_URL ?? "",
    runUrl: process.env.RUN_URL ?? "",
    outcome: process.env.SPECS_OUTCOME ?? "unknown",
    seconds: process.env.SPECS_SECONDS ?? "?",
  });
  fs.writeFileSync(path.join(out, "comment.md"), body);
  const shots = runs.reduce((n, r) => n + r.steps.length, 0);
  console.log(
    `${runs.length} spec runs, ${shots} screenshots, walkthrough from ${videos.length} videos.`,
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
