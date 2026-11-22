#!/usr/bin/env bash
# Should the factory gate act on this PR now? One check per mode.
# Spec: docs/factory.md, section Gate.
#
# Usage: gate/check.sh <mode> <pr> [<source>]
#   gate     review passed: a factory PR (factory/issue-<n>, by claude[bot]) whose issue has
#            factory:in-review, no gate comment for the head yet, the head's review summary is a
#            PASS with status factory-review success, every required check green. Then the
#            risky list: changed files (old names of renames too) against GATE_PATHS.
#   approve  Sunny's approval: the PR is in Needs human (a factory PR whose issue has
#            factory:human, or a revert PR by sredhu37-bot on revert-<sha>), sredhu37's latest
#            approving or blocking review is APPROVED on the current head, every required check
#            green (waits up to CHECK_WAIT seconds while checks run).
#   fix      Sunny's comment: <source> is review:<id> or comment:<id> by sredhu37 on this PR, a
#            factory PR whose issue has factory:human. The workflow then starts a fix round.
#            While the issue has factory:in-review, only a comment containing @build counts.
#   merge    a head the factory may merge without a new review: the bot's factory-update marker
#            names it (gate/updated.sh after update-branch), or the gate said MERGE to it and the
#            issue is still factory:in-review. Factory PR (in-review or human) or revert PR, every
#            required check green (waits up to CHECK_WAIT). Output approved=update|gate.
# Env:   GH_TOKEN    token with pull-requests, issues, checks and statuses read (GITHUB_TOKEN)
#        REPO        owner/name, defaults to GITHUB_REPOSITORY, then to the current gh repo
#        SUNNY       the account whose review or comment counts (default sredhu37)
#        GATE_PATHS  risky list file, checked out from main (default .github/gate-paths.txt)
#        RISKY_OUT   gate mode: file for the risky hits, "<file><TAB><pattern>" per line
#        CHECK_WAIT  seconds to wait for running checks (default 600 gate, 1200 approve and merge)
# Output: key=value lines on stdout: go, reason, mode, pr, sha, kind, issue, title, and risky
#         (gate mode, count of hits), tell (approve mode: worth a note on the PR when go=false),
#         early (approve mode: the approval came while the factory still has the PR).
#         Also appended to GITHUB_OUTPUT when it is set.
#         Exit 0 for every decision; non-zero only on API errors.
set -euo pipefail

mode=${1:?usage: gate/check.sh <gate|approve|fix|merge> <pr> [<source>]}
pr=${2:?usage: gate/check.sh <gate|approve|fix|merge> <pr> [<source>]}
source=${3:-}
sunny=${SUNNY:-sredhu37}
gate_paths=${GATE_PATHS:-.github/gate-paths.txt}
here=$(cd "$(dirname "$0")" && pwd)

repo=${REPO:-${GITHUB_REPOSITORY:-}}
if [ -z "$repo" ]; then
  repo=$(gh repo view --json nameWithOwner --jq .nameWithOwner)
fi

emit() {
  # One line per key: newlines in values become spaces.
  local value=${2//$'\n'/ }
  echo "$1=$value"
  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "$1=$value" >> "$GITHUB_OUTPUT"
  fi
}

# tell=true: Sunny acted on this PR and should hear why nothing happened (approve mode).
tell=false

# In a workflow run, the decision also shows as an annotation.
notice() {
  if [ "${GITHUB_ACTIONS:-}" = true ]; then echo "::notice::$1"; fi
}

skip() {
  echo "gate-check: PR #$pr, $mode: no: $1" >&2
  notice "No $mode: $1"
  emit go false
  emit tell "$tell"
  emit reason "$1"
  exit 0
}

emit mode "$mode"
case "$mode" in
  gate | approve | fix | merge) ;;
  *) skip "unknown mode '$mode'" ;;
esac
if ! [[ "$pr" =~ ^[0-9]+$ ]]; then
  skip "'$pr' is not a PR number"
fi

pull=$(gh api "repos/$repo/pulls/$pr" \
  --jq '[.state, .head.ref, .head.sha, .head.repo.full_name, .user.login] | @tsv')
IFS=$'\t' read -r state ref sha head_repo author <<< "$pull"
title=$(gh api "repos/$repo/pulls/$pr" --jq .title)

emit pr "$pr"
emit sha "$sha"
emit title "$title"

[ "$state" = "open" ] || skip "the PR is $state"
[ "$head_repo" = "$repo" ] || skip "the head is in $head_repo, not $repo"

kind=other
issue=""
if [[ "$ref" =~ ^factory/issue-([0-9]+)$ ]] && [ "$author" = "claude[bot]" ]; then
  kind=factory
  issue=${BASH_REMATCH[1]}
elif [[ "$ref" =~ ^revert-[0-9a-f]{40}$ ]] && [ "$author" = "sredhu37-bot" ]; then
  kind=revert
fi
emit kind "$kind"
emit issue "$issue"

label=""
if [ "$kind" = "factory" ]; then
  label=$(gh api "repos/$repo/issues/$issue/labels" --jq '[.[].name | select(startswith("factory:"))] | join(",")')
fi

case "$mode" in
  gate)
    [ "$kind" = "factory" ] || skip "branch $ref by $author is not a factory PR"
    if [ "$label" = "factory:human" ]; then
      skip "#$issue has factory:human: once HUMAN, the PR stays with Sunny"
    fi
    [ "$label" = "factory:in-review" ] || skip "#$issue has '$label', not factory:in-review"
    gated=$(gh api --paginate "repos/$repo/issues/$pr/comments" --jq "
      .[] | select(.user.login == \"github-actions[bot]\"
        and ((.body // \"\") | startswith(\"<!-- factory-gate sha=$sha -->\"))) | .id")
    [ -z "$gated" ] || skip "head ${sha:0:7} already has a gate comment"
    # The review summary for this head (marker on line 1, outcome in the heading).
    summary=$(gh api --paginate "repos/$repo/issues/$pr/comments" --jq "
      .[] | select(.user.login == \"github-actions[bot]\")
      | .body | split(\"\n\") | select(.[0] | test(\"^<!-- factory-review round=[0-9]+ sha=$sha -->$\"))
      | .[1]")
    summary=${summary##*$'\n'}
    [[ "$summary" =~ :\ PASS$ ]] || skip "no review PASS for ${sha:0:7} (last summary heading: '${summary:-none}')"
    status=$(gh api "repos/$repo/commits/$sha/statuses?per_page=100" \
      --jq '[.[] | select(.context == "factory-review")][0].state // "none"')
    [ "$status" = "success" ] || skip "status factory-review is $status for ${sha:0:7}"
    ;;
  approve)
    if [ "$kind" = "factory" ]; then
      if [ "$label" != "factory:human" ]; then
        # An approval before the gate decides does not count: say so, do not stay silent.
        if [ "$label" = "factory:in-review" ] && bash "$here/early-approval.sh" "$pr" | grep -qx 'early=true'; then
          tell=true
          emit early true
        fi
        skip "#$issue has '$label', not factory:human: the factory still has the PR"
      fi
    elif [ "$kind" != "revert" ]; then
      skip "branch $ref by $author is neither a factory PR nor a revert PR"
    fi
    tell=true
    # The latest review by Sunny that approves or blocks; comment-only reviews do not change it.
    review=$(gh api --paginate "repos/$repo/pulls/$pr/reviews?per_page=100" --jq "
      .[] | select(.user.login == \"$sunny\" and .state != \"COMMENTED\" and .state != \"PENDING\")
      | [.id, .state, .commit_id] | @tsv")
    review=${review##*$'\n'}
    [ -n "$review" ] || skip "$sunny has not approved this PR"
    IFS=$'\t' read -r review_id review_state review_sha <<< "$review"
    [ "$review_state" = "APPROVED" ] || skip "$sunny's latest review is $review_state"
    if [ "$review_sha" != "$sha" ]; then
      skip "$sunny approved ${review_sha:0:7}, the head is now ${sha:0:7}: approve the new head"
    fi
    emit review "$review_id"
    ;;
  merge)
    # A head the factory may merge without a new review: its own update-branch merge of an approved
    # head (marker from gate/updated.sh), or a head the gate said MERGE to that is still in review.
    [ "$kind" = "factory" ] || [ "$kind" = "revert" ] || skip "branch $ref by $author is neither a factory PR nor a revert PR"
    if [ "$kind" = "factory" ]; then
      case "$label" in
        factory:in-review | factory:human) ;;
        *) skip "#$issue has '$label', not factory:in-review or factory:human" ;;
      esac
    fi
    firsts=$(gh api --paginate "repos/$repo/issues/$pr/comments" --jq '
      .[] | select(.user.login == "github-actions[bot]") | (.body // "") | split("\n") | .[0] + "\t" + (.[1] // "")')
    if grep -q "^<!-- factory-update sha=$sha from=[0-9a-f]\{40\} -->" <<< "$firsts"; then
      emit approved update
    elif [ "$kind" = "factory" ] && [ "$label" = "factory:in-review" ] &&
      grep -qF "<!-- factory-gate sha=$sha -->"$'\t'"## Gate at \`${sha:0:7}\`: MERGE" <<< "$firsts"; then
      emit approved gate
    else
      skip "${sha:0:7} is neither the factory's update of an approved head nor a head the gate said MERGE to"
    fi
    ;;
  fix)
    [ "$kind" = "factory" ] || skip "branch $ref by $author is not a factory PR"
    case "$label" in
      factory:human | factory:in-review) ;;
      *) skip "#$issue has '$label', not factory:human or factory:in-review" ;;
    esac
    if [[ "$source" =~ ^review:([0-9]+)$ ]]; then
      who=$(gh api "repos/$repo/pulls/$pr/reviews/${BASH_REMATCH[1]}" --jq '[.user.login, .state] | @tsv')
      IFS=$'\t' read -r login review_state <<< "$who"
      [ "$login" = "$sunny" ] || skip "review $source is by $login, not $sunny"
      case "$review_state" in
        CHANGES_REQUESTED | COMMENTED) ;;
        *) skip "review $source is $review_state, not a change request or comment" ;;
      esac
    elif [[ "$source" =~ ^comment:([0-9]+)$ ]]; then
      who=$(gh api "repos/$repo/issues/comments/${BASH_REMATCH[1]}" --jq '[.user.login, .issue_url] | @tsv')
      IFS=$'\t' read -r login issue_url <<< "$who"
      [ "$login" = "$sunny" ] || skip "comment $source is by $login, not $sunny"
      [ "${issue_url##*/}" = "$pr" ] || skip "comment $source is not on PR #$pr"
      if [ "$label" = "factory:in-review" ]; then
        # The factory still has the PR: a comment only talks to the build agent when it says @build.
        body=$(gh api "repos/$repo/issues/comments/${BASH_REMATCH[1]}" --jq '.body // ""')
        mention='(^|[^[:alnum:]_@])@build([^[:alnum:]_-]|$)'
        [[ "$body" =~ $mention ]] || skip "#$issue has factory:in-review and comment $source does not mention @build"
      fi
    else
      skip "source '$source' is not review:<id> or comment:<id>"
    fi
    emit source "$source"
    ;;
esac

# Required checks: the gate and an approval merge only a green head.
if [ "$mode" != "fix" ]; then
  default_wait=600
  { [ "$mode" = "approve" ] || [ "$mode" = "merge" ]; } && default_wait=1200
  checks=$("$here/checks-green.sh" "$sha" "${CHECK_WAIT:-$default_wait}")
  checks_state=$(sed -n 's/^state=//p' <<< "$checks")
  checks_detail=$(sed -n 's/^detail=//p' <<< "$checks")
  emit checks "$checks_state"
  [ "$checks_state" = "green" ] || skip "checks $checks_detail"
fi

if [ "$mode" = "gate" ]; then
  files=$(mktemp)
  hits=$(mktemp)
  gh api --paginate "repos/$repo/pulls/$pr/files?per_page=100" \
    --jq '.[] | .filename, (.previous_filename // empty)' > "$files"
  node "$here/gate.mjs" match "$gate_paths" "$files" > "$hits"
  count=$(grep -c . "$hits" || true)
  echo "gate-check: $(grep -c . "$files" || true) changed paths, $count on the risky list" >&2
  sed 's/^/gate-check: risky: /' "$hits" >&2
  if [ -n "${RISKY_OUT:-}" ]; then mkdir -p "$(dirname "$RISKY_OUT")" && cp "$hits" "$RISKY_OUT"; fi
  rm -f "$files" "$hits"
  emit risky "$count"
fi

case "$mode" in
  gate) reason="review passed and every required check is green for ${sha:0:7}" ;;
  approve) reason="$sunny approved ${sha:0:7} and every required check is green" ;;
  fix) reason="$sunny's $source on a PR with $label" ;;
  merge) reason="${sha:0:7} is approved for merge and every required check is green" ;;
esac
notice "$mode: $reason"
emit go true
emit reason "$reason"
