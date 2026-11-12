#!/usr/bin/env bash
# Does a change touch only markdown? Then ci, demo, spec-rule and lighthouse skip.
# Spec: docs/factory.md, section CI tools (markdown-only PRs).
#
# Usage: md-only.sh <base> <head>
#        Compares the trees of two commits. In a pull_request run HEAD is the merge commit and
#        HEAD^1 the base branch, so .github/workflows/md-only.yml runs: md-only.sh HEAD^1 HEAD
# Output: md_only=true|false on stdout, also appended to GITHUB_OUTPUT when it is set.
#         true only when at least one file changed, every changed path ends in .md and none is
#         under .claude/ (src/factory.test.ts reads .claude/agents/*.md). A rename counts as a
#         delete plus an add, so both names are checked. Exit non-zero only when git fails.
#         pages.yml has the same rule as a path filter; change both together.
set -euo pipefail

base=${1:?usage: md-only.sh <base> <head>}
head=${2:?usage: md-only.sh <base> <head>}

files=$(git -c core.quotePath=false diff --name-only --no-renames "$base" "$head")

count=0
first_other=""
while IFS= read -r path; do
  [ -n "$path" ] || continue
  count=$((count + 1))
  case "$path" in
    .claude/*) ;;
    *.md) continue ;;
  esac
  if [ -z "$first_other" ]; then
    first_other=$path
  fi
done <<< "$files"

if [ "$count" -eq 0 ]; then
  md_only=false
  echo "md-only: no changed files, every check runs" >&2
elif [ -n "$first_other" ]; then
  md_only=false
  echo "md-only: $count changed files, not markdown-only (first: $first_other)" >&2
else
  md_only=true
  echo "md-only: $count changed files, all markdown outside .claude/: the slow checks skip" >&2
fi

echo "md_only=$md_only"
if [ -n "${GITHUB_OUTPUT:-}" ]; then
  echo "md_only=$md_only" >> "$GITHUB_OUTPUT"
fi
