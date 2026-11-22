#!/usr/bin/env bash
# Post the round's review summary on the PR.
#
# Usage: review/comment.sh
# Env:   GH_TOKEN, PR; the comment in $RUNNER_TEMP/summary/comment.md
# Output (GITHUB_OUTPUT): url
set -euo pipefail

url=$(gh api -X POST "repos/$GITHUB_REPOSITORY/issues/$PR/comments" -F "body=@$RUNNER_TEMP/summary/comment.md" --jq .html_url)
echo "Posted $url"
echo "url=$url" >> "$GITHUB_OUTPUT"
