#!/usr/bin/env bash
# Telegram "Needs human" for each stuck build.
#
# Usage: sweep/telegram-stuck.sh
# Env:   GH_TOKEN, TELEGRAM_TOKEN, TELEGRAM_CHAT_ID, STUCK ("<issue> <minutes>" per line)
set -euo pipefail

while read -r issue minutes; do
  title=$(gh api "repos/$GITHUB_REPOSITORY/issues/$issue" --jq .title)
  .github/scripts/shared/telegram.sh "Needs human: #$issue \"$title\"
reason: build stuck, $minutes min in progress with no build run
$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/issues/$issue"
done <<< "$STUCK"
