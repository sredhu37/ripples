#!/usr/bin/env bash
# Review inputs in $INPUTS: the PR diff and changed files, and for ux-ui the evidence screenshots.
# The PR's own .claude/ is renamed so it never loads; nothing from the PR head is run.
#
# Usage: review/inputs.sh      (in the main checkout, with the PR head in ./pr-head)
# Env:   GH_TOKEN, AGENT, PR, INPUTS
set -euo pipefail

mkdir -p "$INPUTS"
# The PR's own .claude/ (settings, skills, agents) must never load; its diff still shows it.
if [ -d pr-head/.claude ]; then mv pr-head/.claude pr-head/.claude-from-pr; fi
git -C pr-head diff origin/main...HEAD > "$INPUTS/diff.patch"
git -C pr-head diff --stat=200 origin/main...HEAD > "$INPUTS/files.txt"
echo "Diff: $(wc -l < "$INPUTS/diff.patch") lines; $(tail -n 1 "$INPUTS/files.txt")"
if [ "$AGENT" = "ux-ui" ]; then
  if git clone -q --depth 1 --branch evidence --no-checkout \
    "$GITHUB_SERVER_URL/$GITHUB_REPOSITORY.git" "$RUNNER_TEMP/evidence"; then
    git -C "$RUNNER_TEMP/evidence" sparse-checkout set "pr-$PR"
    git -C "$RUNNER_TEMP/evidence" checkout -q
  fi
  if [ -d "$RUNNER_TEMP/evidence/pr-$PR" ]; then
    cp -R "$RUNNER_TEMP/evidence/pr-$PR" "$INPUTS/evidence"
    rm -f "$INPUTS/evidence/demo.gif"
    (cd "$INPUTS" && find evidence -name '*.png' | sort -V) > "$INPUTS/evidence.txt"
  else
    echo "No evidence for PR #$PR on the evidence branch" > "$INPUTS/evidence.txt"
  fi
  # The evidence comment names the commit its screenshots come from.
  gh api --paginate "repos/$GITHUB_REPOSITORY/issues/$PR/comments" \
    --jq '.[] | select(.user.login == "github-actions[bot]" and (.body | startswith("<!-- evidence -->"))) | .body' |
    grep -m 1 -oE 'Commit .[0-9a-f]{7,40}.' > "$INPUTS/evidence-commit.txt" || true
  echo "Evidence: $(grep -c '\.png$' "$INPUTS/evidence.txt" || true) screenshots, $(cat "$INPUTS/evidence-commit.txt")"
fi
