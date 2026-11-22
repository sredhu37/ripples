#!/usr/bin/env bash
# What the build run led to: review (PR open, or opened or pushed in this run even if the job then
# failed), paused (usage limit), stopped (the job failed or timed out before a push: the scan
# continues it) or human (the agent gave up, or nothing to review), with a reason.
# Spec: docs/factory.md, section Build.
#
# Usage: build/outcome.sh
# Env:   GH_TOKEN      token with pull-requests: read
#        ISSUE, BUILD_RESULT, PUSH_RESULT, LIMIT, START_SHA, HUMAN, FIX_PR
# Output (GITHUB_OUTPUT): outcome, reason
set -euo pipefail

# Same-repo PRs only: a fork could use the same branch name.
pr=$(gh pr list --repo "$GITHUB_REPOSITORY" --head "factory/issue-$ISSUE" --state open \
  --json url,headRepositoryOwner \
  --jq "[.[] | select(.headRepositoryOwner.login == \"$GITHUB_REPOSITORY_OWNER\")][0].url // \"\"")
if [ "$PUSH_RESULT" = "failure" ]; then
  outcome=human
  reason="the workflow push step failed to push .github/workflows changes"
elif [ "$BUILD_RESULT" = "success" ] && [ -n "$pr" ]; then
  outcome=review
  reason="PR open: $pr"
  # A fix round must push: only a new head starts CI and the next review round.
  if [ -n "$START_SHA" ] && [ "$(gh pr view "$pr" --repo "$GITHUB_REPOSITORY" --json headRefOid --jq .headRefOid)" = "$START_SHA" ]; then
    outcome=human
    reason="the fix round pushed no new commit to $pr, so no review can start"
  fi
elif [ -n "$pr" ] && { [ -z "$START_SHA" ] ||
  [ "$(gh pr view "$pr" --repo "$GITHUB_REPOSITORY" --json headRefOid --jq .headRefOid)" != "$START_SHA" ]; }; then
  # The job failed, but the agent opened the PR or pushed to it in this run (for example the action
  # fails a finished session that went over --max-turns). The pushed head goes to CI and review.
  outcome=review
  reason="PR open: $pr (the build job ended with $BUILD_RESULT after the push)"
elif [ "$LIMIT" = "true" ]; then
  outcome=paused
  reason="Claude usage limit"
elif [ "$BUILD_RESULT" = "success" ]; then
  # The agent ended on its own without a PR: it says why in its last words, a question for Sunny.
  outcome=human
  reason="the build agent finished without opening a PR"
else
  # Out of turns, the 30 minute timeout, a crash or a cancel: the scan continues it (max 3).
  outcome=stopped
  case "$BUILD_RESULT" in
    failure) reason="the build job failed (out of turns, agent error, crash or the 30 minute timeout)" ;;
    cancelled) reason="the build job was cancelled" ;;
    *) reason="the build job did not run ($BUILD_RESULT)" ;;
  esac
fi
if [ -n "$HUMAN" ]; then
  # Sunny's fix round: back to Sunny whatever happened (once HUMAN, stays HUMAN).
  head=$(gh api "repos/$GITHUB_REPOSITORY/pulls/$FIX_PR" --jq .head.sha)
  if [ "$outcome" = "review" ] && [ "$head" != "$START_SHA" ]; then
    reason="fix round after your ${HUMAN%%:*} pushed ${head:0:7}"
  elif [ "$outcome" = "review" ] || { [ "$outcome" = "human" ] && [ "$BUILD_RESULT" = "success" ]; }; then
    reason="no new commit after your ${HUMAN%%:*}: see the agent's reply on the PR"
  elif [ "$outcome" = "paused" ] || [ "$outcome" = "stopped" ]; then
    reason="the fix round after your ${HUMAN%%:*} stopped ($reason); comment again later"
  else
    reason="the fix round after your ${HUMAN%%:*} failed: $reason"
  fi
  outcome=human
fi
echo "$outcome: $reason"
echo "outcome=$outcome" >> "$GITHUB_OUTPUT"
echo "reason=$reason" >> "$GITHUB_OUTPUT"
