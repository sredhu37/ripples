#!/usr/bin/env bash
# Send a plain text message from the factory to Sunny's Slack channel #ripples-factory
# (Slack incoming webhook of the "Ripples Factory" app).
# Spec: docs/factory.md, section Notifications.
#
# Usage: shared/slack.sh <text>        (use real newlines in <text> for line breaks)
# Env:   SLACK_WEBHOOK_URL  incoming webhook URL; it can only post to #ripples-factory
set -euo pipefail

text=${1:?usage: shared/slack.sh <text>}
: "${SLACK_WEBHOOK_URL:?SLACK_WEBHOOK_URL is not set}"

# Slack reads &, < and > as control characters in message text, so escape them.
# No link previews: every message carries GitHub links.
payload=$(jq -cn --arg text "$text" '{
  text: ($text | gsub("&"; "&amp;") | gsub("<"; "&lt;") | gsub(">"; "&gt;")),
  unfurl_links: false,
  unfurl_media: false
}')

# The webhook URL is the secret: it goes in a curl config read from stdin, so it never shows
# up in the process list. On failure, print Slack's answer (its error text), never the URL.
if ! response=$(printf 'url = "%s"\n' "$SLACK_WEBHOOK_URL" |
  curl --silent --show-error --fail-with-body --max-time 20 --config - \
    --header 'Content-Type: application/json' \
    --data "$payload"); then
  echo "slack: send failed: $response" >&2
  exit 1
fi

echo "slack: message sent"
