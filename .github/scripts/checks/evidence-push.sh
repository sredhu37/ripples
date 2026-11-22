#!/usr/bin/env bash
# Push this PR's evidence (pr-<n>/) to the evidence branch, retrying from a fresh fetch when another
# PR pushes or the cleanup rewrites the branch.
#
# Usage: checks/evidence-push.sh
# Env:   GH_TOKEN (contents: write), REPO, PR_NUMBER, HEAD_SHA, EVIDENCE_OUT
# Output (GITHUB_OUTPUT): sha
set -euo pipefail

dir="pr-$PR_NUMBER"
repo_dir="$RUNNER_TEMP/evidence-repo"
git init -q "$repo_dir"
cd "$repo_dir"
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git remote add origin "https://x-access-token:${GH_TOKEN}@github.com/${REPO}.git"
# Retry from a fresh fetch: another PR may push, or cleanup may rewrite the branch.
for attempt in 1 2 3 4; do
  if git ls-remote --exit-code --heads origin evidence > /dev/null; then
    git fetch -q --depth 1 origin evidence
    git checkout -q -f -B "work-$attempt" FETCH_HEAD
  else
    echo "No evidence branch yet, starting an orphan branch"
    git checkout -q -f --orphan "work-$attempt"
    git rm -rq --cached . > /dev/null 2>&1 || true
  fi
  rm -rf "$dir"
  cp -R "$EVIDENCE_OUT/$dir" "$dir"
  git add -A "$dir"
  if git diff --cached --quiet; then
    echo "Evidence unchanged"
    echo "sha=$(git rev-parse HEAD)" >> "$GITHUB_OUTPUT"
    exit 0
  fi
  git commit -q -m "Evidence for PR #$PR_NUMBER at ${HEAD_SHA:0:7}"
  if git push -q origin "HEAD:refs/heads/evidence"; then
    echo "Pushed $dir to evidence"
    echo "sha=$(git rev-parse HEAD)" >> "$GITHUB_OUTPUT"
    exit 0
  fi
  sleep $(( attempt * 5 ))
done
echo "Could not push to the evidence branch"
exit 1
