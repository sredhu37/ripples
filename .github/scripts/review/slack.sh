#!/usr/bin/env bash
# Slack "Needs human" for a PR the review handed to Sunny.
#
# Usage: review/slack.sh
# Env:   GH_TOKEN, SLACK_WEBHOOK_URL, PR, REASON, RUN_URL
set -euo pipefail

title=$(gh api "repos/$GITHUB_REPOSITORY/pulls/$PR" --jq .title)
.github/scripts/shared/slack.sh "Needs human: PR #$PR, $REASON
\"$title\"
$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/pull/$PR
run: $RUN_URL"
