#!/usr/bin/env bash
# Apply the build agent's workflow patches on its branch and push them as sredhu37-bot.
#
# Usage: build/push-workflows.sh
# Env:   BRANCH  factory/issue-<n>; patches in $RUNNER_TEMP/workflow-patches
set -euo pipefail

git config user.name "sredhu37-bot"
git config user.email "355726435+sredhu37-bot@users.noreply.github.com"
git am --3way "$RUNNER_TEMP"/workflow-patches/*.patch
git push origin "$BRANCH"
