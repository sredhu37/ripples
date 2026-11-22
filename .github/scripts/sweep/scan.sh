#!/usr/bin/env bash
# The hourly scan: fill free slots with factory tickets, In review first, then In progress, then Ready.
# Collects the board and the runs with gh, asks sweep/scan.mjs for the plan, and carries it out.
# Spec: docs/factory.md, section Scan.
#
# Usage: sweep/scan.sh
# Env:   GH_TOKEN          token with issues: write, pull-requests: read, checks: read, statuses: read,
#                          actions: write (GITHUB_TOKEN in workflows)
#        BOARD_TOKEN       project scope, for the move to Needs human (FACTORY_TOKEN); see shared/move.sh
#        TELEGRAM_TOKEN, TELEGRAM_CHAT_ID   for the continue cap message; skipped when unset
#        REPO              owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
#        MAX_PARALLEL      slots, default 5
#        ONLY_ISSUE        optional: consider only this issue ("Run now" for one ticket)
#        DRY_RUN           1: print the state and the plan, change nothing
#        FACTORY_BOT       login that sets labels in factory workflows, default github-actions[bot]
#        STATE_OUT         optional: also write the collected state json here
set -euo pipefail

here=$(cd "$(dirname "$0")" && pwd)
shared="$here/../shared"
bot=${FACTORY_BOT:-github-actions[bot]}
max=${MAX_PARALLEL:-5}
only=${ONLY_ISSUE:-}
repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi
export REPO="$repo"
if [ -n "$only" ] && ! [[ "$only" =~ ^[0-9]+$ ]]; then
  echo "::error::issue '$only' is not a number"
  exit 1
fi
tmp=$(mktemp -d "${RUNNER_TEMP:-${TMPDIR:-/tmp}}/scan.XXXXXX")
started=$(date -u +%Y-%m-%dT%H:%M:%SZ)
run_url="${GITHUB_SERVER_URL:-https://github.com}/$repo/actions/runs/${GITHUB_RUN_ID:-local}"

# Open PRs of this repo: factory PRs (factory/issue-<n>) and the issues each PR closes.
gh pr list --repo "$repo" --state open --limit 200 \
  --json number,headRefName,headRefOid,updatedAt,isCrossRepository,closingIssuesReferences \
  > "$tmp/prs.json"

# Tickets with a factory run that has not finished. Run names carry the ticket:
# "issue #<n>" (build), "factory/issue-<n>" (review after CI), "PR #<m>" (review or gate dispatch).
for wf in factory-build.yml factory-review.yml factory-gate.yml; do
  for status in requested queued pending waiting in_progress; do
    gh api --paginate "repos/$repo/actions/workflows/$wf/runs?status=$status&per_page=100" \
      --jq '.workflow_runs[].display_title'
  done
done > "$tmp/runs.txt"
# Run names -> ticket numbers (json array) for the run titles in file $1.
tickets_of_runs() {
  jq -n --rawfile runs "$1" --slurpfile prs "$tmp/prs.json" '
  ($prs[0] | map(select(.isCrossRepository | not)
    | select(.headRefName | test("^factory/issue-[0-9]+$"))
    | {key: (.number | tostring), value: (.headRefName | ltrimstr("factory/issue-") | tonumber)})
    | from_entries) as $issue_of_pr
  | [$runs | split("\n")[] | select(length > 0)
     | (capture("issue #(?<n>[0-9]+)") // capture("factory/issue-(?<n>[0-9]+)") | .n | tonumber)
       // (capture("PR #(?<m>[0-9]+)") | $issue_of_pr[.m])
     | select(. != null)] | unique'
}
tickets_of_runs "$tmp/runs.txt" > "$tmp/active.json"

issues_with() {
  gh api --paginate "repos/$repo/issues?state=open&labels=$1&per_page=100" \
    --jq '.[] | select(.pull_request == null) | "\(.number) \(.updated_at)"'
}

# Latest factory:in-progress label actor, and the scan continues since the latest Ready set by hand.
timeline_facts() {
  gh api --paginate "repos/$repo/issues/$1/timeline?per_page=100" | jq -s --arg bot "$bot" '
    (add // []) as $t
    | ([$t | to_entries[] | select(.value.event == "labeled" and .value.label.name == "factory:ready"
        and .value.actor.login != $bot) | .key] | last // -1) as $reset
    | {
        progressActor: ([$t[] | select(.event == "labeled" and .label.name == "factory:in-progress")
          | .actor.login] | last // ""),
        continues: ([$t | to_entries[] | select(.key > $reset) | .value
          | select(.event == "commented" and (.actor.login // .user.login) == $bot
            and ((.body // "") | startswith("<!-- factory-continue")))] | length)
      }'
}

pr_facts() {
  local pr=$1 sha=$2 checks
  checks=$("$here/../gate/checks-green.sh" "$sha" 0)
  gh api --paginate "repos/$repo/issues/$pr/comments?per_page=100" > "$tmp/c-$pr.json"
  gh api "repos/$repo/commits/$sha/status" > "$tmp/s-$pr.json"
  gh api "repos/$repo/pulls/$pr" > "$tmp/p-$pr.json"
  # When the head's checks last finished: the scan leaves a missing review alone for 10 minutes,
  # while the workflow_run review normally starts by itself.
  done_at=$(gh api --paginate "repos/$repo/commits/$sha/check-runs?per_page=100" \
    --jq '.check_runs[].completed_at // empty' | sort | tail -n 1)
  jq -n --argjson pr "$pr" --arg sha "$sha" --arg bot "$bot" \
    --arg checks "$(sed -n 's/^state=//p' <<< "$checks")" \
    --arg detail "$(sed -n 's/^detail=//p' <<< "$checks")" --arg doneAt "$done_at" \
    --slurpfile c "$tmp/c-$pr.json" --slurpfile s "$tmp/s-$pr.json" --slurpfile p "$tmp/p-$pr.json" '
    ($c | add // [] | map(select(.user.login == $bot) | (.body // "") | split("\n")[0])) as $first
    | {
        number: $pr, checks: $checks, checksDetail: $detail, checksDoneAt: $doneAt,
        rounds: ([$first[] | select(test("^<!-- factory-review round=[0-9]+ sha=[0-9a-f]{40} -->$"))] | length),
        summaryForHead: any($first[]; test("^<!-- factory-review round=[0-9]+ sha=" + $sha + " -->$")),
        gateForHead: any($first[]; . == "<!-- factory-gate sha=" + $sha + " -->"),
        updateForHead: any($first[]; startswith("<!-- factory-update sha=" + $sha + " ")),
        conflict: ($p[0].mergeable == false),
        reviewStatus: ([$s[0].statuses[] | select(.context == "factory-review") | .state] | first // "none")
      }'
}

: > "$tmp/tickets.jsonl"
add_ticket() { echo "$1" >> "$tmp/tickets.jsonl"; }

while read -r n updated; do
  [ -n "$n" ] || continue
  blockers=$("$shared/open-blockers.sh" "$n" | grep -c . || true)
  add_ticket "$(jq -nc --argjson n "$n" --arg u "$updated" --argjson b "$blockers" \
    '{number: $n, column: "ready", local: false, updatedAt: $u, blockers: $b, continues: 0, pr: null}')"
done < <(issues_with factory:ready)

for column in progress review; do
  label=factory:in-progress
  [ "$column" = review ] && label=factory:in-review
  while read -r n updated; do
    [ -n "$n" ] || continue
    facts=$(timeline_facts "$n")
    fpr=$(jq -c --argjson n "$n" '[.[] | select((.isCrossRepository | not) and .headRefName == "factory/issue-\($n)")][0] // null' "$tmp/prs.json")
    # Other open PRs that close the issue: a local run or a PR built by hand.
    lpr_updated=$(jq -r --argjson n "$n" '[.[] | select(.headRefName != "factory/issue-\($n)")
      | select(.headRefName == "local/issue-\($n)" or any(.closingIssuesReferences[]; .number == $n))
      | .updatedAt] | max // ""' "$tmp/prs.json")
    pr=null
    if [ "$column" = progress ]; then
      local_run=$(jq -r --arg bot "$bot" '.progressActor != "" and .progressActor != $bot' <<< "$facts")
    elif [ "$fpr" != null ]; then
      local_run=false
      pr=$(pr_facts "$(jq -r .number <<< "$fpr")" "$(jq -r .headRefOid <<< "$fpr")")
    elif [ -n "$lpr_updated" ]; then
      local_run=true
    else
      local_run=false
    fi
    add_ticket "$(jq -nc --argjson n "$n" --arg col "$column" --argjson local "$local_run" \
      --arg u "$updated" --arg lu "$lpr_updated" --argjson f "$facts" --argjson pr "$pr" \
      '{number: $n, column: $col, local: $local, updatedAt: ([$u, $lu] | max), blockers: 0,
        continues: $f.continues, pr: $pr}')"
  done < <(issues_with "$label")
done

jq -s --slurpfile active "$tmp/active.json" --arg now "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  --argjson max "$max" --arg only "$only" '
  (map(.number)) as $known
  | {now: $now, max: $max, only: (if $only == "" then null else ($only | tonumber) end),
     tickets: (map(. + {active: (.number as $n | $active[0] | index($n) != null)})
       + [$active[0][] | select(. as $n | $known | index($n) | not) | {number: ., column: "other", active: true}])}' \
  "$tmp/tickets.jsonl" > "$tmp/state.json"
if [ -n "${STATE_OUT:-}" ]; then cp "$tmp/state.json" "$STATE_OUT"; fi

node "$here/scan.mjs" plan "$tmp/state.json" > "$tmp/plan.json"
jq -r '"scan: \(.used) of \($max) slots in use, \(.free) free after this scan"' --argjson max "$max" "$tmp/plan.json"
jq -r '.skipped[] | "scan: #\(.issue) skipped: \(.reason)"' "$tmp/plan.json"

if [ "${DRY_RUN:-}" = "1" ]; then
  jq -r '.actions[] | "scan: dry run, would \(.kind) #\(.issue): \(.reason)\(if .workflow then " (\(.workflow) \(.inputs | to_entries | map("\(.key)=\(.value)") | join(" ")))" else "" end)"' "$tmp/plan.json"
  exit 0
fi

jq -c '.actions[]' "$tmp/plan.json" | while read -r action; do
  issue=$(jq -r .issue <<< "$action")
  kind=$(jq -r .kind <<< "$action")
  reason=$(jq -r .reason <<< "$action")
  if [ "$kind" = human ]; then
    "$shared/move.sh" "$issue" factory:human
    # The build's latest stop comment holds the agent's last words.
    words=$(gh api --paginate "repos/$repo/issues/$issue/comments?per_page=100" | jq -rs --arg bot "$bot" '
      [add // [] | .[] | select(.user.login == $bot and ((.body // "") | startswith("<!-- factory-stopped")))]
      | last | .body // "" | split("\n") | map(select(startswith("> "))) | join("\n")' | head -c 800)
    gh issue comment "$issue" --repo "$repo" --body "Needs human: $reason.

The hourly scan continues a stopped ticket at most 3 times. Set factory:ready to give it 3 more. Run: $run_url"
    echo "::warning::#$issue to Needs human: $reason"
    if [ -n "${TELEGRAM_TOKEN:-}" ] && [ -n "${TELEGRAM_CHAT_ID:-}" ]; then
      title=$(gh api "repos/$repo/issues/$issue" --jq .title)
      "$shared/telegram.sh" "Needs human: #$issue $reason
\"$title\"
${words:+last words:
$words
}https://github.com/$repo/issues/$issue"
    fi
    continue
  fi
  workflow=$(jq -r .workflow <<< "$action")
  fields=()
  args=()
  while read -r f; do
    fields+=("$f")
    args+=(-f "$f")
  done < <(jq -r '.inputs | to_entries[] | "\(.key)=\(.value)"' <<< "$action")
  if [ "$kind" = continue ]; then
    count=$(( $(jq -r --argjson n "$issue" '.tickets[] | select(.number == $n) | .continues' "$tmp/state.json") + 1 ))
    gh issue comment "$issue" --repo "$repo" --body "<!-- factory-continue -->
Continue $count of 3: $reason. The scan starts $workflow ${fields[*]}. Run: $run_url" > /dev/null
  fi
  gh workflow run "$workflow" --repo "$repo" --ref main "${args[@]}"
  echo "$issue" >> "$tmp/dispatched.txt"
  echo "::notice::#$issue $kind: $reason ($workflow ${fields[*]})"
done

# Wait until every run this scan started shows up in the Actions API (up to 60 s), so the next scan,
# which only starts after this one, counts them as active and never starts the same ticket twice.
if [ -s "$tmp/dispatched.txt" ]; then
  want=$(sort -un "$tmp/dispatched.txt" | jq -s -c .)
  for _ in $(seq 1 12); do
    for wf in factory-build.yml factory-review.yml factory-gate.yml; do
      gh api "repos/$repo/actions/workflows/$wf/runs?event=workflow_dispatch&created=%3E%3D$started&per_page=100" \
        --jq '.workflow_runs[].display_title'
    done > "$tmp/new-runs.txt"
    missing=$(jq -n -c --argjson want "$want" --argjson seen "$(tickets_of_runs "$tmp/new-runs.txt")" '$want - $seen')
    if [ "$missing" = "[]" ]; then
      echo "scan: every dispatched run is visible"
      exit 0
    fi
    sleep 5
  done
  echo "::warning::scan: runs for $missing not visible after 60 s; the next scan may start them again"
fi
