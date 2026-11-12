#!/usr/bin/env bash
# Should the factory review run for this PR now, and which round is it?
# Spec: docs/factory.md, sections Review and Build (fix rounds, max 5).
#
# Usage: review-gate.sh <pr> [<event-sha>]
#        <event-sha>  head sha of the CI run that triggered the review; a newer push makes it stale
# Env:   GH_TOKEN         token with pull-requests, issues and checks read (GITHUB_TOKEN in workflows)
#        REPO             owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
#        EVENT            workflow_run (default) or workflow_dispatch. A manual run re-reviews a head
#                         that already has a summary, and runs even when the issue has factory:human.
#        MAX_ROUNDS       default 5
#        CODEQL_WAIT      seconds to wait for CodeQL once every other check is green (default 600);
#                         CodeQL is a dynamic workflow, so no workflow_run fires when it finishes
#        REQUIRED_CHECKS  default "ci lint audit lighthouse demo spec-rule CodeQL" (the main ruleset)
# Output: key=value lines on stdout: go, reason, pr, sha, issue, round. Also appended to
#         GITHUB_OUTPUT when it is set. Exit 0 for every decision; non-zero only on API errors.
#
# A factory PR is open, from this repo, on branch factory/issue-<n>, opened by claude[bot].
# Rounds are counted from review-summary comments by github-actions[bot] whose first line is
# <!-- factory-review round=<k> sha=<sha> -->. Round = that count + 1; round 6 never runs.
set -euo pipefail

pr=${1:?usage: review-gate.sh <pr> [<event-sha>]}
event_sha=${2:-}
event=${EVENT:-workflow_run}
max_rounds=${MAX_ROUNDS:-5}
codeql_wait=${CODEQL_WAIT:-600}
required=${REQUIRED_CHECKS:-ci lint audit lighthouse demo spec-rule CodeQL}

repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi

emit() {
  echo "$1=$2"
  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "$1=$2" >> "$GITHUB_OUTPUT"
  fi
}

skip() {
  echo "review-gate: PR #$pr skipped: $1" >&2
  emit go false
  emit reason "$1"
  exit 0
}

if ! [[ "$pr" =~ ^[0-9]+$ ]]; then
  skip "'$pr' is not a PR number"
fi

pull=$(gh api "repos/$repo/pulls/$pr" \
  --jq '[.state, .head.ref, .head.sha, .head.repo.full_name, .user.login] | @tsv')
IFS=$'\t' read -r state ref sha head_repo author <<< "$pull"

[ "$state" = "open" ] || skip "the PR is $state"
[ "$head_repo" = "$repo" ] || skip "the head is in $head_repo, not $repo"
[[ "$ref" =~ ^factory/issue-([0-9]+)$ ]] || skip "branch $ref is not factory/issue-<n>"
issue=${BASH_REMATCH[1]}
[ "$author" = "claude[bot]" ] || skip "opened by $author, not claude[bot]"
if [ -n "$event_sha" ] && [ "$event_sha" != "$sha" ]; then
  skip "CI ran for ${event_sha:0:7}, the head is now ${sha:0:7}"
fi

emit pr "$pr"
emit sha "$sha"
emit issue "$issue"

if [ "$event" != "workflow_dispatch" ]; then
  if gh api "repos/$repo/issues/$issue/labels" --jq '.[].name' | grep -qx 'factory:human'; then
    skip "#$issue has factory:human (Sunny's turn; a manual run overrides)"
  fi
fi

summaries=$(gh api --paginate "repos/$repo/issues/$pr/comments" --jq '
  .[] | select(.user.login == "github-actions[bot]")
  | .body | split("\n")[0]
  | capture("^<!-- factory-review round=(?<round>[0-9]+) sha=(?<sha>[0-9a-f]{40}) -->$")
  | .sha')
count=$(printf '%s' "$summaries" | grep -c . || true)
round=$((count + 1))
emit round "$round"

if [ "$event" != "workflow_dispatch" ] && printf '%s\n' "$summaries" | grep -qx "$sha"; then
  skip "head ${sha:0:7} already has a review summary"
fi
if [ "$round" -gt "$max_rounds" ]; then
  skip "$count review rounds used, the limit is $max_rounds"
fi

# Latest check run per name for the head (the API's default filter=latest).
check_states() {
  gh api "repos/$repo/commits/$sha/check-runs?per_page=100" \
    --jq '.check_runs[] | [.name, .status, (.conclusion // "none")] | @tsv'
}

waited=0
while :; do
  states=$(check_states)
  pending=""
  for name in $required; do
    line=$(printf '%s\n' "$states" | awk -F'\t' -v n="$name" '$1 == n { print; exit }')
    if [ -z "$line" ]; then
      pending="$pending $name"
      continue
    fi
    IFS=$'\t' read -r _ status conclusion <<< "$line"
    if [ "$status" != "completed" ]; then
      pending="$pending $name"
    elif [ "$conclusion" != "success" ]; then
      skip "check $name is $conclusion; a red CI is not reviewed and uses no round"
    fi
  done
  pending=${pending# }
  if [ -z "$pending" ]; then
    break
  fi
  if [ "$pending" != "CodeQL" ]; then
    skip "waiting for $pending; the last CI workflow to finish starts the review"
  fi
  if [ "$waited" -ge "$codeql_wait" ]; then
    skip "CodeQL did not finish within ${codeql_wait}s"
  fi
  echo "review-gate: only CodeQL is pending, checking again in 20s" >&2
  sleep 20
  waited=$((waited + 20))
done

emit go true
emit reason "every required check is green for ${sha:0:7}; review round $round of $max_rounds"
