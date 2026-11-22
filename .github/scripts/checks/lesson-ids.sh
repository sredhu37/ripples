#!/usr/bin/env bash
# Lesson ids from changed web/src/content/<id>.* files, for the demo specs (none: the spec uses money).
#
# Usage: checks/lesson-ids.sh
# Env:   BASE_REF  the PR's base branch
# Output (GITHUB_OUTPUT): ids (comma-separated)
set -e # as in a default workflow step: no pipefail

ids=$(git diff --name-only "origin/${BASE_REF}...HEAD" -- web/src/content \
  | grep -v '^web/src/content/senior/' \
  | sed -nE 's#^web/src/content/([a-z0-9_]+)\..*$#\1#p' \
  | sort -u \
  | while read -r id; do
      if [ -f "web/src/content/$id.tsx" ] && grep -q "id: \"$id\"" web/src/lessons.ts; then echo "$id"; fi
    done \
  | paste -sd, -)
echo "ids=$ids" >> "$GITHUB_OUTPUT"
echo "Lesson ids: ${ids:-none changed, the spec uses money}"
