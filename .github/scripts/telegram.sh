#!/usr/bin/env bash
# Send a plain text message from the factory bot to Sunny (Telegram Bot API, sendMessage).
# Spec: docs/factory.md, section Notifications.
#
# Usage: telegram.sh <text>        (use real newlines in <text> for line breaks)
# Env:   TELEGRAM_TOKEN    bot token
#        TELEGRAM_CHAT_ID  chat id
#        TELEGRAM_API      API base URL, defaults to https://api.telegram.org (override for tests)
set -euo pipefail

text=${1:?usage: telegram.sh <text>}
: "${TELEGRAM_TOKEN:?TELEGRAM_TOKEN is not set}"
: "${TELEGRAM_CHAT_ID:?TELEGRAM_CHAT_ID is not set}"
api=${TELEGRAM_API:-https://api.telegram.org}

# The token goes in a curl config read from stdin, so it never shows up in the process list.
# On failure, print Telegram's JSON answer (its error description), never the URL.
if ! response=$(printf 'url = "%s/bot%s/sendMessage"\n' "$api" "$TELEGRAM_TOKEN" |
  curl --silent --show-error --fail-with-body --max-time 20 --config - \
    --data-urlencode "chat_id=$TELEGRAM_CHAT_ID" \
    --data-urlencode "text=$text" \
    --data-urlencode "disable_web_page_preview=true"); then
  echo "telegram: send failed: $response" >&2
  exit 1
fi

echo "telegram: message sent"
