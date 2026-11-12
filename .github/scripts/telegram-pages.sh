#!/usr/bin/env bash
# Sends one message from the factory Telegram bot.
# Spec: docs/factory.md, section Notifications.
# Usage: telegram-pages.sh "<text>"
# Env: TELEGRAM_TOKEN, TELEGRAM_CHAT_ID.
set -euo pipefail

text=${1:?usage: telegram-pages.sh "<text>"}
: "${TELEGRAM_TOKEN:?TELEGRAM_TOKEN is not set}"
: "${TELEGRAM_CHAT_ID:?TELEGRAM_CHAT_ID is not set}"

response=$(mktemp)
trap 'rm -f "$response"' EXIT
status=$(curl -sS --retry 3 --max-time 30 -o "$response" -w '%{http_code}' \
  "https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage" \
  --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" \
  --data-urlencode "text=${text}" \
  --data-urlencode "disable_web_page_preview=true")

if [ "$status" != "200" ]; then
  # Print only Telegram's error text, never the request URL (it holds the token).
  echo "::error::Telegram sendMessage failed with HTTP $status: $(jq -r '.description // "no description"' "$response" 2>/dev/null || echo "unreadable response")"
  exit 1
fi
echo "Telegram message sent."
