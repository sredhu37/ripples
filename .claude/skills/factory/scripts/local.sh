#!/usr/bin/env bash
# The local /factory override: the same agent rules (.claude/agents/), prompt templates
# (.github/prompts/) and input scripts (.github/scripts/) as the GitHub factory, run from Sunny's
# Claude Code as Sunny (gh login). Spec: docs/factory.md, section Local run. Used by SKILL.md.
#
# Usage: local.sh <command> [args]
#   build-prep <issue> [<summary-file>]
#       Worktree .claude/worktrees/local-issue-<n> on branch local/issue-<n> (continues it when it
#       exists), issue to factory:in-progress, and the build prompt in <work>/.factory-local/prompt-build.md.
#       With <summary-file> (a local review summary) it is a fix round on the open PR.
#   review-prep <pr>
#       Worktree of origin/main with the PR head in ./pr-head, review inputs, and one prompt per
#       review agent in <work>/.factory-local/prompt-<agent>.md.
#   review-summary <pr>       (env ROUND: the local round, default 1)
#       Reads <work>/.factory-local/answer-<agent>.md (each agent's final message), writes the same
#       summary as CI to <work>/.factory-local/summary/comment.md, prints outcome= fails= ...
#   gate-prep <pr>
#       Risky list check and, when no file is risky, the gate prompt in <work>/.factory-local/prompt-gate.md.
#   gate-decide <pr>
#       Reads answer-gate.md (missing when risky), prints decision= reason= and the comment path.
#   wait-checks <pr>
#       Waits for the PR head's required checks (up to 30 minutes), prints state= detail=.
#   merge <pr>
#       Brings the PR up to date with main when behind (waits for its checks again), then
#       squash-merges it as Sunny. Run only after Sunny said yes in the chat.
#       NO_MOVE=1 skips the label move (a test run).
#   move <issue> <label>
#       shared/move.sh as Sunny.
#   scan-now <issue>
#       "Run now on GitHub": dispatches factory-sweep.yml task scan for one issue.
#   cleanup <pr|issue>
#       Removes the review or build worktree.
set -euo pipefail

root=$(cd "$(dirname "$(git rev-parse --path-format=absolute --git-common-dir)")" && pwd)
# Scripts, templates and agent rules always come from origin/main, like on GitHub: never from the
# checkout this runs in, which may be old or a PR branch.
factory_main="$root/.claude/worktrees/local-main"
export GITHUB_REPOSITORY=${GITHUB_REPOSITORY:-$(gh repo view --json nameWithOwner --jq .nameWithOwner)}
export REPO=$GITHUB_REPOSITORY
export GITHUB_SERVER_URL=${GITHUB_SERVER_URL:-https://github.com}
export GITHUB_REPOSITORY_OWNER=${GITHUB_REPOSITORY%%/*}
GH_TOKEN=$(gh auth token)
export GH_TOKEN
export BOARD_TOKEN=$GH_TOKEN
export TRUSTED_ACTORS=${TRUSTED_ACTORS:-sredhu37,sredhu37-bot,claude[bot],github-actions[bot]}
AGENTS="ux-ui security content code-quality"

cmd=${1:?usage: local.sh <command> [args]}
shift

num() {
  [[ "${1:-}" =~ ^[0-9]+$ ]] || {
    echo "local.sh: '${1:-}' is not a number" >&2
    exit 2
  }
}

# A step output file (shared/output.sh format) to plain text.
unwrap() { sed '1d;$d' "$1"; }

# Wrap an agent's final message like a claude-code-action execution file, for review.mjs and gate.mjs.
as_execution() {
  jq -n --rawfile text "$1" '[{type: "result", subtype: "success", is_error: false, result: $text}]'
}

review_dir() { echo "$root/.claude/worktrees/local-review-$1"; }

main_worktree() {
  local dir=$1
  git -C "$root" fetch -q origin main
  if [ ! -d "$dir" ]; then
    git -C "$root" worktree add -q --detach "$dir" origin/main
  else
    git -C "$dir" checkout -q --detach origin/main
  fi
  mkdir -p "$dir/.factory-local"
}

main_worktree "$factory_main"
scripts="$factory_main/.github/scripts"

case "$cmd" in
  build-prep)
    issue=${1:-}
    num "$issue"
    summary=${2:-}
    branch="local/issue-$issue"
    work="$root/.claude/worktrees/local-issue-$issue"
    git -C "$root" fetch -q origin
    if [ ! -d "$work" ]; then
      if git -C "$root" ls-remote --exit-code --heads origin "$branch" > /dev/null; then
        git -C "$root" worktree add -q -B "$branch" "$work" "origin/$branch"
      elif git -C "$root" show-ref --verify --quiet "refs/heads/$branch"; then
        git -C "$root" worktree add -q "$work" "$branch"
      else
        git -C "$root" worktree add -q -b "$branch" "$work" origin/main
      fi
    fi
    mkdir -p "$work/.factory-local"
    labels=$(gh api "repos/$REPO/issues/$issue/labels" --jq '[.[].name | select(startswith("factory:"))] | join(",")')
    case "$labels" in
      factory:in-review | factory:human) ;; # a fix round keeps the label
      *) if [ "${NO_MOVE:-}" != 1 ]; then "$scripts/shared/move.sh" "$issue" factory:in-progress; fi ;;
    esac
    out=$(mktemp)
    (cd "$factory_main" && ISSUE=$issue BRANCH=$branch FIX_PR="" HUMAN="" GITHUB_OUTPUT=$out \
      RUNNER_TEMP=${TMPDIR:-/tmp} "$scripts/build/prompt.sh")
    {
      unwrap "$out"
      if [ -n "$summary" ]; then
        pr=$(gh pr list --repo "$REPO" --head "$branch" --state open --json number --jq '.[0].number // ""')
        printf '\n'
        FIX_PR=${pr:-none} BRANCH=$branch REVIEW_FILE=$summary \
          CHECKS="see gh pr checks ${pr:-}" CONFLICT="run gh pr view ${pr:-} --json mergeable; if CONFLICTING, merge origin/main and resolve" \
          node "$scripts/shared/render.mjs" "$factory_main/.github/prompts/build-fix-review.md"
      fi
      cat << EOF

<local_run>
This is a local run in Sunny's Claude Code, as Sunny. These lines override the GitHub-only ones above:
- Work only in the worktree $work (branch $branch). Use absolute paths, or cd there first in every Bash call.
- Push with: git -C $work push -u origin $branch. Pushing .github/workflows changes is allowed here: push them like any other commit.
- Open or update the PR with --head $branch. Its body still needs "Closes #$issue".
- Do not change labels or the board; the /factory skill does that.
</local_run>
EOF
    } > "$work/.factory-local/prompt-build.md"
    echo "work=$work"
    echo "branch=$branch"
    echo "prompt=$work/.factory-local/prompt-build.md"
    ;;

  review-prep)
    pr=${1:-}
    num "$pr"
    dir=$(review_dir "$pr")
    main_worktree "$dir"
    sha=$(gh api "repos/$REPO/pulls/$pr" --jq .head.sha)
    git -C "$root" fetch -q origin "$sha"
    rm -rf "$dir/pr-head" "$dir/.factory-local/inputs"
    git -C "$root" worktree prune
    git -C "$root" worktree add -q --detach "$dir/pr-head" "$sha"
    inputs="$dir/.factory-local/inputs"
    (cd "$dir" && AGENT=ux-ui PR=$pr INPUTS=$inputs RUNNER_TEMP=$(mktemp -d) "$scripts/review/inputs.sh")
    rounds=$(gh api --paginate "repos/$REPO/issues/$pr/comments" --jq '[.[] | select(.user.login == "github-actions[bot]" and ((.body // "") | startswith("<!-- factory-review round=")))] | length')
    for agent in $AGENTS; do
      out=$(mktemp)
      (cd "$dir" && AGENT=$agent PR=$pr SHA=$sha ROUND="local (after $rounds on GitHub)" MAX_ROUNDS=5 \
        INPUTS=$inputs ALLOWED_TOOLS="Read,Grep,Glob,WebFetch,WebSearch" GITHUB_OUTPUT=$out \
        "$scripts/review/prompt.sh")
      unwrap "$out" | sed -e "s#\./pr-head/#$dir/pr-head/#g" -e "s#^- \./ is main\.#- $dir/ is main.#" \
        > "$dir/.factory-local/prompt-$agent.md"
      rm -f "$dir/.factory-local/answer-$agent.md"
    done
    echo "work=$dir"
    echo "sha=$sha"
    for agent in $AGENTS; do echo "prompt_$agent=$dir/.factory-local/prompt-$agent.md"; done
    echo "answers=$dir/.factory-local/answer-<agent>.md"
    ;;

  review-summary)
    pr=${1:-}
    num "$pr"
    dir=$(review_dir "$pr")
    local_dir="$dir/.factory-local"
    rm -rf "$local_dir/results" "$local_dir/summary"
    mkdir -p "$local_dir/results"
    for agent in $AGENTS; do
      if [ -s "$local_dir/answer-$agent.md" ]; then
        as_execution "$local_dir/answer-$agent.md" > "$local_dir/exec-$agent.json"
        node "$scripts/shared/review.mjs" parse "$agent" "$local_dir/exec-$agent.json" "$local_dir/results/$agent.json" > /dev/null
      fi
    done
    sha=$(git -C "$dir/pr-head" rev-parse HEAD)
    ROUND=${ROUND:-1} SHA=$sha PR=$pr RUN_URL="local run" \
      node "$scripts/shared/review.mjs" summary "$local_dir/results" "$local_dir/summary"
    echo "summary=$local_dir/summary/comment.md"
    ;;

  gate-prep)
    pr=${1:-}
    num "$pr"
    dir="$root/.claude/worktrees/local-gate-$pr"
    main_worktree "$dir"
    sha=$(gh api "repos/$REPO/pulls/$pr" --jq .head.sha)
    inputs="$dir/.factory-local/inputs"
    rm -rf "$inputs" "$dir/.factory-local/answer-gate.md"
    gh api --paginate "repos/$REPO/pulls/$pr/files?per_page=100" \
      --jq '.[] | .filename, (.previous_filename // empty)' > "$dir/.factory-local/files.txt"
    node "$scripts/gate/gate.mjs" match "$dir/.github/gate-paths.txt" "$dir/.factory-local/files.txt" \
      > "$dir/.factory-local/risky.txt"
    risky=$(grep -c . "$dir/.factory-local/risky.txt" || true)
    echo "work=$dir"
    echo "sha=$sha"
    echo "risky=$risky"
    if [ "$risky" -gt 0 ]; then
      sed 's/^/risky: /' "$dir/.factory-local/risky.txt"
      exit 0
    fi
    (cd "$dir" && PR=$pr SHA=$sha INPUTS=$inputs RUNNER_TEMP=$(mktemp -d) "$scripts/gate/inputs.sh")
    out=$(mktemp)
    (cd "$dir" && PR=$pr SHA=$sha INPUTS=$inputs ALLOWED_TOOLS="Read,Grep,Glob" GITHUB_OUTPUT=$out \
      "$scripts/gate/prompt.sh")
    unwrap "$out" | sed -e "s#^- \./ is main\.#- $dir/ is main.#" > "$dir/.factory-local/prompt-gate.md"
    echo "prompt_gate=$dir/.factory-local/prompt-gate.md"
    echo "answer=$dir/.factory-local/answer-gate.md"
    ;;

  gate-decide)
    pr=${1:-}
    num "$pr"
    dir="$root/.claude/worktrees/local-gate-$pr"
    local_dir="$dir/.factory-local"
    rm -f "$local_dir/gate.json"
    if [ -s "$local_dir/answer-gate.md" ]; then
      as_execution "$local_dir/answer-gate.md" > "$local_dir/exec-gate.json"
      node "$scripts/gate/gate.mjs" parse "$local_dir/exec-gate.json" "$local_dir/gate.json" > /dev/null
    fi
    sha=$(gh api "repos/$REPO/pulls/$pr" --jq .head.sha)
    SHA=$sha PR=$pr RUN_URL="local run" RISKY_FILE="$local_dir/risky.txt" RESULT_FILE="$local_dir/gate.json" \
      node "$scripts/gate/gate.mjs" comment "$local_dir/gate-comment.md"
    echo "comment=$local_dir/gate-comment.md"
    ;;

  wait-checks)
    pr=${1:-}
    num "$pr"
    sha=$(gh api "repos/$REPO/pulls/$pr" --jq .head.sha)
    POLL_SECONDS=30 "$scripts/gate/checks-green.sh" "$sha" "${CHECK_WAIT:-1800}"
    ;;

  merge)
    pr=${1:-}
    num "$pr"
    sha=$(gh api "repos/$REPO/pulls/$pr" --jq .head.sha)
    behind=$(gh api "repos/$REPO/compare/main...$sha" --jq .behind_by)
    if [ "$behind" -gt 0 ]; then
      echo "PR #$pr is $behind commit(s) behind main: updating the branch"
      gh pr update-branch "$pr" --repo "$REPO"
      sleep 10
      sha=$(gh api "repos/$REPO/pulls/$pr" --jq .head.sha)
    fi
    checks=$(POLL_SECONDS=30 "$scripts/gate/checks-green.sh" "$sha" "${CHECK_WAIT:-1800}")
    if [ "$(sed -n 's/^state=//p' <<< "$checks")" != green ]; then
      echo "merged=false"
      echo "reason=$(sed -n 's/^detail=//p' <<< "$checks")"
      exit 1
    fi
    gh pr merge "$pr" --repo "$REPO" --squash --delete-branch --match-head-commit "$sha"
    echo "merged=true"
    ;;

  move)
    num "${1:-}"
    "$scripts/shared/move.sh" "$1" "${2:?usage: local.sh move <issue> <label>}"
    ;;

  scan-now)
    num "${1:-}"
    gh workflow run factory-sweep.yml --repo "$REPO" --ref main -f task=scan -f issue="$1"
    sleep 5
    gh run list --repo "$REPO" --workflow factory-sweep.yml --limit 1 --json url --jq '"run=" + .[0].url'
    ;;

  cleanup)
    num "${1:-}"
    for dir in "$(review_dir "$1")" "$root/.claude/worktrees/local-gate-$1"; do
      if [ -d "$dir" ]; then
        git -C "$root" worktree remove --force "$dir/pr-head" 2> /dev/null || true
        git -C "$root" worktree remove --force "$dir"
        echo "removed $dir"
      fi
    done
    ;;

  *)
    echo "local.sh: unknown command '$cmd'" >&2
    exit 2
    ;;
esac
