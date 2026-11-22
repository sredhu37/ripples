#!/usr/bin/env bash
# One factory: label per issue: the label just added stays, every other factory: label goes.
#
# Usage: sync/one-label.sh
# Env:   GH_TOKEN, ISSUE, ADDED (the label just added)
set -euo pipefail

# Read the labels now: if the added label is already gone (the build swapped it), do nothing.
# Only labels seen now are removed, so a label another run adds meanwhile survives.
labels=$(gh api "repos/$GITHUB_REPOSITORY/issues/$ISSUE/labels" --jq '.[].name | select(startswith("factory:"))')
if ! printf '%s\n' "$labels" | grep -qxF "$ADDED"; then
  echo "$ADDED is no longer on #$ISSUE; nothing to remove"
  exit 0
fi
for old in $labels; do
  [ "$old" = "$ADDED" ] && continue
  gh api -X DELETE "repos/$GITHUB_REPOSITORY/issues/$ISSUE/labels/$old" --silent || true
  echo "Removed $old from #$ISSUE (kept $ADDED)"
done
