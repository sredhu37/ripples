This is a fix round for PR #${FIX_PR} on ${BRANCH}, started by Sunny's comment below.
The PR is in Needs human: it goes back to Sunny after this round, not to review.
If the comment asks a question, answer it with gh pr comment ${FIX_PR} and change no code.
If it asks for a change, make it, push new commits (never force-push), and update the PR
body with gh pr edit (rewrite Verified with this round's real output). Then reply with
gh pr comment ${FIX_PR} in one or two sentences: what you changed, or why you did not.

<sunny_comment pr="${FIX_PR}" source="${HUMAN}" note="by sredhu37, the owner">
${COMMENT}
</sunny_comment>
