#!/usr/bin/env bash
# Give an issue exactly one factory: label. Adds <label>, then removes every other factory:* label.
# Spec: docs/factory.md, section Labels and board.
#
# Usage: label-set.sh <issue> <label>      e.g. label-set.sh 139 factory:in-progress
# Env:   GH_TOKEN  token with issues: write (GITHUB_TOKEN in workflows, so no new runs start)
#        REPO      owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
set -euo pipefail

issue=${1:?usage: label-set.sh <issue> <label>}
label=${2:?usage: label-set.sh <issue> <label>}

case "$label" in
  factory:triage | factory:ready | factory:in-progress | factory:in-review | factory:human | factory:done) ;;
  *)
    echo "label-set: unknown factory label '$label'" >&2
    exit 2
    ;;
esac

repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi

old_labels=$(gh api "repos/$repo/issues/$issue/labels" --jq '.[].name | select(startswith("factory:"))')

gh api -X POST "repos/$repo/issues/$issue/labels" -f "labels[]=$label" > /dev/null

# A second run can remove the same old label between the read above and here (factory-build and
# factory-pr-link both set in-review when a PR opens). A 404 means the label is already gone: fine.
for old in $old_labels; do
  if [ "$old" != "$label" ]; then
    if ! err=$(gh api -X DELETE "repos/$repo/issues/$issue/labels/$old" 2>&1 > /dev/null); then
      case "$err" in
        *"HTTP 404"*) echo "label-set: $old was already removed from #$issue" ;;
        *)
          echo "$err" >&2
          exit 1
          ;;
      esac
    fi
  fi
done

echo "label-set: #$issue now has $label"
