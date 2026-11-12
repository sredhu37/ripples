#!/usr/bin/env bash
# Hourly sweep: print the one factory:ready issue to restart now, or nothing.
# Spec: docs/factory.md, section Build (a usage limit puts the issue back to factory:ready;
# the hourly check restarts it) and Engine (factory-sweep.yml).
#
# Picks the oldest (lowest number) open factory:ready issue with no open blockers, and only
# when no factory-build run is active: the build queue runs one build at a time, and a run
# for a dispatched issue does not show which issue it is for, so any active run means "wait".
# Read only. Reasons go to stderr.
#
# Usage: sweep-restart.sh
# Env:   GH_TOKEN  token with issues: read and actions: read
#        REPO      owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
set -euo pipefail

here=$(cd "$(dirname "$0")" && pwd)

repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi
export REPO="$repo"

active=$("$here/build-runs-active.sh")
if [ -n "$active" ]; then
  echo "sweep-restart: factory-build is busy, no restart this hour:" >&2
  while read -r run; do echo "  run $run" >&2; done <<< "$active"
  exit 0
fi

ready=$(gh api --paginate "repos/$repo/issues?state=open&labels=factory:ready&per_page=100" \
  --jq '.[] | select(.pull_request == null) | .number' | sort -n)
if [ -z "$ready" ]; then
  echo "sweep-restart: no open factory:ready issue" >&2
  exit 0
fi

for n in $ready; do
  blockers=$("$here/open-blockers.sh" "$n" | sed 's/^/#/' | paste -sd' ' -)
  if [ -n "$blockers" ]; then
    echo "sweep-restart: #$n waits for open blockers: $blockers" >&2
    continue
  fi
  echo "sweep-restart: #$n is ready, unblocked and not building" >&2
  echo "$n"
  exit 0
done

echo "sweep-restart: every factory:ready issue waits for a blocker" >&2
