#!/usr/bin/env bash
# Telegram "Needs human" for a PR the review handed to Sunny.
#
# Usage: review/telegram.sh
# Env:   GH_TOKEN, TELEGRAM_TOKEN, TELEGRAM_CHAT_ID, PR, REASON, RUN_URL
set -euo pipefail

title=$(gh api "repos/$GITHUB_REPOSITORY/pulls/$PR" --jq .title)
.github/scripts/shared/telegram.sh "Needs human: PR #$PR, $REASON
\"$title\"
$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/pull/$PR
run: $RUN_URL"
