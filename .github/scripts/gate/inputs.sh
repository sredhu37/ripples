#!/usr/bin/env bash
# Gate inputs in $INPUTS: the PR head as a file export, the diff, the changed files, the review
# summary for the head and the evidence screenshots. Nothing from the PR head is run.
#
# Usage: gate/inputs.sh       (in the main checkout)
# Env:   GH_TOKEN, PR, SHA, INPUTS
set -euo pipefail

mkdir -p "$INPUTS/head"
# PR head for context only: a file export (git archive), nothing from it is run.
git fetch -q --no-tags origin "$SHA"
git archive "$SHA" | tar -x -C "$INPUTS/head"
# The PR's own .claude/ and CLAUDE.md must never load; the diff still shows them.
if [ -d "$INPUTS/head/.claude" ]; then mv "$INPUTS/head/.claude" "$INPUTS/head/.claude-from-pr"; fi
if [ -f "$INPUTS/head/CLAUDE.md" ]; then mv "$INPUTS/head/CLAUDE.md" "$INPUTS/head/CLAUDE.md.from-pr"; fi
git diff "origin/main...$SHA" > "$INPUTS/diff.patch"
git diff --stat=200 "origin/main...$SHA" > "$INPUTS/files.txt"
echo "Diff: $(wc -l < "$INPUTS/diff.patch") lines; $(tail -n 1 "$INPUTS/files.txt")"
# The review summary for this head (by github-actions[bot], marker on line 1).
gh api --paginate "repos/$GITHUB_REPOSITORY/issues/$PR/comments" |
  jq -r -s --arg sha "$SHA" '[add // [] | .[]
    | select(.user.login == "github-actions[bot]"
      and (.body | test("^<!-- factory-review round=[0-9]+ sha=" + $sha + " -->")))]
    | last | .body // "no review summary found"' > "$INPUTS/review.md"
if git clone -q --depth 1 --branch evidence --no-checkout \
  "$GITHUB_SERVER_URL/$GITHUB_REPOSITORY.git" "$RUNNER_TEMP/evidence"; then
  git -C "$RUNNER_TEMP/evidence" sparse-checkout set "pr-$PR"
  git -C "$RUNNER_TEMP/evidence" checkout -q
fi
if [ -d "$RUNNER_TEMP/evidence/pr-$PR" ]; then
  cp -R "$RUNNER_TEMP/evidence/pr-$PR" "$INPUTS/evidence"
  find "$INPUTS/evidence" -type f ! -name '*.png' -delete
  (cd "$INPUTS" && find evidence -name '*.png' | sort -V) > "$INPUTS/evidence.txt"
else
  echo "No evidence for PR #$PR on the evidence branch" > "$INPUTS/evidence.txt"
fi
echo "Evidence: $(grep -c '\.png$' "$INPUTS/evidence.txt" || true) screenshots"
