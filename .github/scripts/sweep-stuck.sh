#!/usr/bin/env bash
# Hourly sweep: print the factory:in-progress issues whose build died, one per line:
# "<issue> <minutes since the label>". No output means none is stuck.
# Spec: docs/factory.md, section Build (any other error sets factory:human).
#
# Stuck means all of:
#   - the latest factory:in-progress label was set by the factory (FACTORY_BOT), not by hand;
#   - it was set more than STUCK_MINUTES ago (the build job times out after 30 minutes);
#   - no factory-build run is active that was created before the label was set. Only such a
#     run can be building the issue: a later run started for a different issue.
# Read only. Reasons go to stderr.
#
# Usage: sweep-stuck.sh
# Env:   GH_TOKEN       token with issues: read and actions: read
#        REPO           owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
#        STUCK_MINUTES  defaults to 45
#        FACTORY_BOT    login that sets labels in factory workflows, defaults to github-actions[bot]
set -euo pipefail

here=$(cd "$(dirname "$0")" && pwd)
limit=${STUCK_MINUTES:-45}
bot=${FACTORY_BOT:-github-actions[bot]}

repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi
export REPO="$repo"

issues=$(gh api --paginate "repos/$repo/issues?state=open&labels=factory:in-progress&per_page=100" \
  --jq '.[] | select(.pull_request == null) | .number' | sort -n)
if [ -z "$issues" ]; then
  echo "sweep-stuck: no open factory:in-progress issue" >&2
  exit 0
fi

# Run creation times, oldest first ("2026-11-12T13:42:52Z" sorts as text).
active_created=$("$here/build-runs-active.sh" | awk '{ print $2 }' | sort)

for n in $issues; do
  # Timeline is oldest first, so the last match is the latest label event.
  event=$(gh api --paginate "repos/$repo/issues/$n/timeline?per_page=100" \
    --jq '.[] | select(.event == "labeled" and .label.name == "factory:in-progress")
          | "\(.created_at) \(.actor.login) \(((now - (.created_at | fromdateiso8601)) / 60) | floor)"' |
    tail -n 1)
  if [ -z "$event" ]; then
    echo "sweep-stuck: #$n has no factory:in-progress label event, skipped" >&2
    continue
  fi
  read -r labelled_at actor minutes <<< "$event"
  if [ "$actor" != "$bot" ]; then
    echo "sweep-stuck: #$n was set in progress by $actor, not the factory, skipped" >&2
    continue
  fi
  if [ "$minutes" -le "$limit" ]; then
    echo "sweep-stuck: #$n in progress for $minutes min, under $limit" >&2
    continue
  fi
  oldest_active=$(echo "$active_created" | head -n 1)
  if [ -n "$oldest_active" ] && [[ ! "$oldest_active" > "$labelled_at" ]]; then
    echo "sweep-stuck: #$n in progress for $minutes min, a build run from $oldest_active is still active" >&2
    continue
  fi
  echo "sweep-stuck: #$n in progress for $minutes min with no build run" >&2
  echo "$n $minutes"
done
