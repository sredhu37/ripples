#!/usr/bin/env bash
# Monday triage reminder: Telegram when factory:triage issues wait, silent otherwise.
#
# Usage: sweep/remind.sh
# Env:   GH_TOKEN, TELEGRAM_TOKEN, TELEGRAM_CHAT_ID
set -euo pipefail

text=$(.github/scripts/sweep/triage-reminder.sh)
if [ -z "$text" ]; then
  echo "No factory:triage issue waits, no message"
  exit 0
fi
echo "$text"
.github/scripts/shared/telegram.sh "$text"
