#!/usr/bin/env bash
# Create or update the one evidence comment on the PR (found by its <!-- evidence --> marker), with
# the video link pinned to the evidence commit just pushed.
#
# Usage: checks/evidence-comment.sh
# Env:   GH_TOKEN (pull-requests: write), REPO, PR_NUMBER, EVIDENCE_OUT, EVIDENCE_SHA
set -euo pipefail

body="$EVIDENCE_OUT/comment.md"
# The video link is pinned to the evidence commit just pushed.
sed -i "s/__EVIDENCE_SHA__/${EVIDENCE_SHA:-evidence}/g" "$body"
ids=$(gh api "repos/$REPO/issues/$PR_NUMBER/comments" --paginate \
  --jq '.[] | select(.user.login == "github-actions[bot]" and (.body | contains("<!-- evidence -->"))) | .id')
id="${ids%%$'\n'*}"
if [ -n "$id" ]; then
  gh api -X PATCH "repos/$REPO/issues/comments/$id" -F "body=@$body" --jq .html_url
else
  gh api -X POST "repos/$REPO/issues/$PR_NUMBER/comments" -F "body=@$body" --jq .html_url
fi
