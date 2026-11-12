#!/usr/bin/env bash
# Are all required checks of a commit green? Waits while some still run.
# Spec: docs/factory.md, section Gate (merge only with every required check green).
#
# Usage: checks-green.sh <sha> [<wait-seconds>]
#        <wait-seconds>  how long to wait for running or missing checks (default 0: look once)
# Env:   GH_TOKEN         token with checks: read (GITHUB_TOKEN or FACTORY_TOKEN)
#        REPO             owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
#        REQUIRED_CHECKS  default "ci lint audit lighthouse demo spec-rule CodeQL" (the main ruleset)
#        POLL_SECONDS     seconds between looks (default 30)
# Green: conclusion success, or skipped (a markdown-only PR skips ci, demo, spec-rule and lighthouse
#        with a job-level if; GitHub counts a skipped required check as passed).
# Output: state=green|red|pending and detail=<text> on stdout. Exit 0 for every state;
#         non-zero only on API errors. A red check ends the wait at once.
set -euo pipefail

sha=${1:?usage: checks-green.sh <sha> [<wait-seconds>]}
wait_for=${2:-0}
poll=${POLL_SECONDS:-30}
required=${REQUIRED_CHECKS:-ci lint audit lighthouse demo spec-rule CodeQL}

if ! [[ "$sha" =~ ^[0-9a-f]{40}$ ]]; then
  echo "checks-green: '$sha' is not a commit sha" >&2
  exit 2
fi

repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi

waited=0
while :; do
  # Latest check run per name for the commit (the API's default filter=latest).
  states=$(gh api --paginate "repos/$repo/commits/$sha/check-runs?per_page=100" \
    --jq '.check_runs[] | [.name, .status, (.conclusion // "none")] | @tsv')
  pending=""
  red=""
  for name in $required; do
    line=$(printf '%s\n' "$states" | awk -F'\t' -v n="$name" '$1 == n { print; exit }')
    if [ -z "$line" ]; then
      pending="$pending $name"
      continue
    fi
    IFS=$'\t' read -r _ status conclusion <<< "$line"
    if [ "$status" != "completed" ]; then
      pending="$pending $name"
    elif [ "$conclusion" != "success" ] && [ "$conclusion" != "skipped" ]; then
      red="$red $name ($conclusion)"
    fi
  done
  if [ -n "$red" ]; then
    echo "state=red"
    echo "detail=not green:$red"
    exit 0
  fi
  if [ -z "$pending" ]; then
    echo "state=green"
    echo "detail=every required check is green for ${sha:0:7}"
    exit 0
  fi
  if [ "$waited" -ge "$wait_for" ]; then
    echo "state=pending"
    echo "detail=still running or missing after ${waited}s:$pending"
    exit 0
  fi
  echo "checks-green: waiting for$pending (${waited}s of ${wait_for}s)" >&2
  sleep "$poll"
  waited=$((waited + poll))
done
