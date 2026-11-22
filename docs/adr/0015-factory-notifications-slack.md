# ADR 0015: Factory notifications in Slack

## Status

Accepted. Replaces the Telegram secrets named in ADR 0011, decision 1; the rest of ADR 0011 stands.

## Context

The factory bot sent "Needs human" messages and the Monday triage reminder through a Telegram bot (`TELEGRAM_TOKEN`, `TELEGRAM_CHAT_ID`). Sunny moved all his notifications from Telegram to a Slack workspace, `redhu-engineering`, with one channel per area, and removed Telegram from his setup.

## Decision

1. The factory posts to the private Slack channel `#ripples-factory`.
2. It posts through an incoming webhook of its own Slack app, "Ripples Factory". The webhook URL is the only secret: `SLACK_WEBHOOK_URL` in the `factory` environment, locked to `main` like the other factory secrets.
3. `shared/slack.sh` replaces `shared/telegram.sh`. Message texts do not change. It escapes `&`, `<` and `>` (Slack control characters) and turns link previews off.
4. The webhook URL goes to curl through a config on stdin, so it never shows in the process list, and an error prints Slack's answer, never the URL.

## Rejected

- **Reusing the Hermes Slack bot token.** That token can read every channel Hermes is in, including private ones. A leak from GitHub would expose them. A webhook can only post to one channel.
- **Slack `chat.postMessage` with a factory bot token.** Two secrets (token and channel id) and wider scopes for the same one-way message.

## Consequences

- Messages show as "Ripples Factory" in `#ripples-factory`, apart from Hermes.
- A leaked webhook URL lets someone post to that one channel and nothing else. Sunny regenerates it in the Slack app and updates the secret.
- `TELEGRAM_TOKEN` and `TELEGRAM_CHAT_ID` are deleted from the `factory` environment once this is on `main`.
