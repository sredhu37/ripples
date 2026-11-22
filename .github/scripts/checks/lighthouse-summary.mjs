// Median Lighthouse numbers and failing accessibility audits, printed and added to the job summary.
//
//   node ../.github/scripts/checks/lighthouse-summary.mjs     (in web/, after checks/lighthouse.sh)

import fs from "node:fs";

const dir = ".lighthouseci";
const lhrs = fs
  .readdirSync(dir)
  .filter((f) => /^lhr-.*\.json$/.test(f))
  .map((f) => JSON.parse(fs.readFileSync(`${dir}/${f}`, "utf8")));
const median = (xs) => xs.sort((a, b) => a - b)[Math.floor((xs.length - 1) / 2)];
const m = (id) => median(lhrs.map((r) => r.audits[id].numericValue));
const failing = [
  ...new Set(
    lhrs.flatMap((r) =>
      r.categories.accessibility.auditRefs
        .map((a) => r.audits[a.id])
        .filter((a) => a.score !== null && a.score < 1)
        .map((a) => a.id),
    ),
  ),
];
const lines = [
  `Lighthouse median of ${lhrs.length} runs`,
  "",
  `| Metric | Median | Limit |`,
  `|---|---|---|`,
  `| LCP | ${Math.round(m("largest-contentful-paint"))} ms | 2500 ms |`,
  `| CLS | ${m("cumulative-layout-shift").toFixed(3)} | 0.1 |`,
  `| TBT | ${Math.round(m("total-blocking-time"))} ms | 200 ms |`,
  "",
  `Failing accessibility audits: ${failing.length ? failing.join(", ") : "none"}`,
];
console.log(lines.join("\n"));
fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY ?? "/dev/null", lines.join("\n") + "\n");
