#!/usr/bin/env bash
# Run every spec with video on and record the run time.
#
# Usage: checks/specs.sh        (in web/e2e/)
# Env:   LESSON_IDS
# Output (GITHUB_OUTPUT): seconds
set -e # as in a default workflow step: no pipefail

start=$(date +%s)
set +e
npx playwright test
status=$?
seconds=$(( $(date +%s) - start ))
echo "seconds=$seconds" >> "$GITHUB_OUTPUT"
echo "Spec run time: ${seconds}s (exit $status)" | tee -a "$GITHUB_STEP_SUMMARY"
exit $status
