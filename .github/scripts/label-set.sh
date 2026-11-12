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

for old in $old_labels; do
  if [ "$old" != "$label" ]; then
    gh api -X DELETE "repos/$repo/issues/$issue/labels/$old" > /dev/null
  fi
done

echo "label-set: #$issue now has $label"
