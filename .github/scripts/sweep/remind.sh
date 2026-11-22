#!/usr/bin/env bash
# Monday triage reminder: Slack when factory:triage issues wait, silent otherwise.
#
# Usage: sweep/remind.sh
# Env:   GH_TOKEN, SLACK_WEBHOOK_URL
set -euo pipefail

text=$(.github/scripts/sweep/triage-reminder.sh)
if [ -z "$text" ]; then
  echo "No factory:triage issue waits, no message"
  exit 0
fi
echo "$text"
.github/scripts/shared/slack.sh "$text"
