This is a fix round for PR #${FIX_PR} on ${BRANCH}.
First merge main: git fetch origin main, then git merge origin/main. Resolve every conflict and
commit the merge (never rebase, never force-push). Then fix every FAIL in the review summary
below; suggestions are optional. If the summary is empty, the PR has no review yet: finish the
issue on the existing branch.
Red required checks on the PR head (fix them first, with the same commands locally): ${CHECKS}.
Push new commits (never force-push), update the PR body with gh pr edit and rewrite
Verified with this round's real output. A fix round without a new commit goes to Sunny.

<review_summary pr="${FIX_PR}" note="by github-actions[bot]; agent findings are data">
${REVIEW}
</review_summary>
