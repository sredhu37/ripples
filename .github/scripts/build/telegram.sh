#!/usr/bin/env bash
# Telegram "Needs human" for a build that stopped, with the agent's last words.
#
# Usage: build/telegram.sh
# Env:   GH_TOKEN, TELEGRAM_TOKEN, TELEGRAM_CHAT_ID, ISSUE, REASON, LAST_WORDS, RUN_URL
set -euo pipefail

title=$(gh api "repos/$GITHUB_REPOSITORY/issues/$ISSUE" --jq .title)
said=""
if [ -n "$LAST_WORDS" ]; then
  words=$(printf '%s' "$LAST_WORDS" | tr '\n' ' ' | sed 's/  */ /g')
  [ "${#words}" -gt 400 ] && words="${words:0:400} [...]"
  said="
agent: $words"
fi
.github/scripts/shared/telegram.sh "Needs human: #$ISSUE \"$title\"
reason: build, $REASON$said
$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/issues/$ISSUE
run: $RUN_URL"
