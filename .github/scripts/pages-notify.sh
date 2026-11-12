#!/usr/bin/env bash
# Tells Sunny on Telegram that the live check failed and what the rollback did.
# Spec: docs/factory.md, sections Deploy and live check, Notifications.
# Env: SIMULATED (true/false), DEPLOY_RESULT (result of rollback-deploy), ROLLBACK_RESULT,
#      GOOD_SHA, PR_URL, PR_NOTE, REVERT_OUTCOME, RUN_URL, GITHUB_SHA,
#      TELEGRAM_TOKEN, TELEGRAM_CHAT_ID.
set -euo pipefail

if [ "${DEPLOY_RESULT:-}" = "success" ]; then
  head="Live site rolled back to live-good (${GOOD_SHA:0:7})"
elif ! git ls-remote --exit-code origin refs/tags/live-good >/dev/null; then
  head="Live check failed, NO rollback: tag live-good does not exist. The live site may be broken."
else
  head="Live check failed, rollback FAILED (${ROLLBACK_RESULT:-unknown}). The live site may be broken."
fi

if [ "${SIMULATED:-false}" = "true" ]; then
  head="SIMULATED: $head"
  pr="Revert PR: none (simulated run)"
elif [ -n "${PR_URL:-}" ]; then
  pr="Revert PR waits for your merge: $PR_URL"
elif [ -n "${PR_NOTE:-}" ]; then
  pr="$PR_NOTE"
else
  pr="Revert PR could not be opened (step ${REVERT_OUTCOME:-not run}), see the run."
fi

subject=$(git log -1 --format=%s "$GITHUB_SHA")
msg=$(printf '%s\nBroken: %s %s\n%s\nRun: %s' "$head" "${GITHUB_SHA:0:7}" "$subject" "$pr" "$RUN_URL")
printf '%s\n' "$msg"
"$(dirname "$0")/telegram-pages.sh" "$msg"
