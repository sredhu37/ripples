# GitHub Projects automation for the Ripples board

Research ticket: [#110](https://github.com/sredhu37/ripples/issues/110). Part of map #109.
Board: [Ripples Kanban board](https://github.com/users/sredhu37/projects/2) (user-owned, private, number 2).
Checked on 2026-11-11 with `gh` 2.98.0, authenticated as `sredhu37` (OAuth token, scopes `repo`, `project`, `read:org`, `gist`, `admin:public_key`).

## Summary

| Question | Answer | Evidence |
|---|---|---|
| What can the board automate natively? | Add items (auto-add, sub-issues), set Status on add, close, PR merge, PR linked; close the issue when Status hits a value; auto-archive. | Docs + live workflow list |
| Can built-in workflows be configured by API? | No. GraphQL can only read them (name, number, enabled) and delete them. No REST endpoint. Configure in the UI. | Schema introspection |
| Can a label change move Status natively? | No. No built-in workflow triggers on labels for items already on the board. | Docs; no label trigger exists |
| Can a Status change trigger an Action? | No, not on a user-owned board. The `projects_v2_item` webhook is organization-only and there is no Actions event for it. | Webhook docs |
| What needs GitHub Actions? | Label to Status sync, anything event-driven beyond the built-ins. | Docs |
| Which token in Actions? | Classic PAT with `repo` + `project`, stored as a secret. `GITHUB_TOKEN`, fine-grained PATs and GitHub App tokens cannot write a user-owned project. | Docs (REST explicit, GraphQL inferred) |
| How does an agent move an item? | `gh project item-edit` (by name or by IDs), GraphQL `updateProjectV2ItemFieldValue`, or REST `PATCH /users/{user}/projectsV2/{n}/items/{id}`. All four proven live. | Live run below |
| Can Status options (Triage, Gate) be added by API? | Yes, GraphQL `updateProjectV2Field` with `singleSelectOptions`. It replaces the whole list, so pass every existing option with its `id`. No `gh` command for it. Not run (read-only rule). | Schema introspection |

**Recommendation**

1. Keep the built-in workflows for the boring edges: auto-add, Item closed to Done, PR merged to Done, Auto-close issue.
2. Let the agents own every middle transition (Ready, In progress, In review, Gate) with `gh project item-edit` using node IDs. Agents run with Sunny's `gh` login, which already works.
3. Add one Actions workflow for label to Status sync (`needs-triage` to Triage, `ready-for-agent` to Ready) using a classic PAT secret `PROJECTS_PAT` (`repo`, `project`). Only needed if humans label in the GitHub UI and expect the card to move.
4. Add Triage and Gate options in the UI (Project settings, Status field). The UI keeps existing option IDs; the API call is easy to get wrong.
5. Decide on the **Pull request linked to issue** workflow: it sets the issue to In progress when a PR links, which overlaps with the BUILD agent's own moves. Test it once with a real build PR before relying on it.

## Board facts (read live)

| Thing | ID |
|---|---|
| Project | `PVT_kwHOAIaaWM4BrKpj` |
| Status field | `PVTSSF_lAHOAIaaWM4BrKpjzhpejZI` (REST id `442404242`) |
| Backlog | `f75ad846` |
| Ready | `61e4505c` |
| In progress | `47fc9ee4` |
| In review | `df73e18b` |
| Done | `98236657` |
| Priority field | `PVTSSF_lAHOAIaaWM4BrKpjzhpejoY` (P0 `79628723`, P1 `0a877460`, P2 `da944a9c`) |
| Size field | `PVTSSF_lAHOAIaaWM4BrKpjzhpejog` (XS `6c6483d2`, S `f784b110`, M `7515a9f1`, L `817d0097`, XL `db339eb2`) |
| Item for issue #110 | `PVTI_lAHOAIaaWM4BrKpjzhH3E24` (REST id `301405038`) |

Option IDs are stable as long as nobody recreates the options. Agents should still look them up at start-up rather than hardcode them (query below).

## Built-in workflows

Live list from GraphQL (`projectV2.workflows`), all `enabled: true`:

| Workflow | Number | Trigger | What it sets | Source |
|---|---|---|---|---|
| Auto-add to project | 13 | Issue or PR created or updated in a chosen repo that matches a filter (`is`, `label`, `reason`, `assignee`, `no`). Does not backfill existing items. | Adds the item. Status then comes from "Item added to project". GitHub Free allows 1 auto-add workflow. | [Adding items automatically](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/adding-items-automatically) |
| Auto-add sub-issues to project | 10 | A sub-issue is added to a parent that is on the board. | Adds the sub-issue. | [Sub-issues preview discussion](https://github.com/orgs/community/discussions/139932) (partly verified: the trigger wording comes from a GitHub staff post, not docs) |
| Item added to project | 12 | Item added to the board. | Status to a chosen option. On this board new items land in Backlog, so it is very likely set to Backlog (inferred, the UI page needs a logged-in browser). | [Using the built-in automations](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-built-in-automations) |
| Item closed | 7 | Issue or PR on the board is closed. | Status to Done (default). | Same page, "enabled by default" |
| Pull request merged | 8 | PR on the board is merged. | Status to Done (default). Acts on the PR item, not the linked issue. The issue reaches Done through "Item closed" when `Closes #N` closes it. | Same page |
| Pull request linked to issue | 11 | An issue on the board has a linked PR. | Issue Status to In progress. | [Changelog 2025-11-06](https://github.blog/changelog/2025-11-06-improved-onboarding-flow-for-github-projects/) |
| Auto-close issue | 9 | Item Status changes to a chosen value. | Closes the issue. | [Using the built-in automations](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-built-in-automations), [changelog 2024-04-25](https://github.blog/changelog/2024-04-25-github-issues-projects-auto-close-issue-project-workflow/) |

Not enabled here: Auto-archive items (filters `is`, `reason`, `updated`, see [Archiving items automatically](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/archiving-items-automatically)). The UI also offers Item reopened, Code changes requested and Code review approved (unverified: from the Workflows page, not described in the docs text; they do not appear in this board's API list).

### API or UI only?

UI only for configuration. Evidence from schema introspection on 2026-11-11:

- `ProjectV2Workflow` fields: `createdAt, enabled, fullDatabaseId, id, name, number, project, updatedAt`. No trigger, filter or target-status fields.
- The only workflow mutation is `deleteProjectV2Workflow`. There is no create, enable, disable or update mutation.
- The REST Projects API covers drafts, fields, items, projects and views only ([REST Projects](https://docs.github.com/en/rest/projects)).
- The docs describe enabling and editing only through the project menu: Workflows, Edit, "Save and turn on workflow".

## Can a label change move Status?

Not natively. None of the built-in workflows triggers on a label change for an item that is already on the board.

The closest thing is the auto-add filter (`label:ready-for-agent`): a labelled issue that is not yet on the board gets added, and "Item added to project" then sets one fixed Status. That does not help here, because auto-add already puts every new issue on the board, so the item exists before the label arrives.

To move Status on a label, use an Actions workflow on `issues: [labeled]` (next section).

## What needs GitHub Actions

| Need | Native? | How |
|---|---|---|
| Add new issues/PRs | Yes | Auto-add (already on) |
| Status on close / merge | Yes | Item closed, Pull request merged (already on) |
| Close issue when Done | Yes | Auto-close issue (already on) |
| Label to Status | No | Actions on `issues: labeled` |
| Status to Gate based on risk | No | Review agent or Actions sets it |
| React to a Status change (for example start BUILD when Ready) | No, and not possible with Actions on a user board | Poll the board, or react to the label instead of the Status |

Why the last row: the `projects_v2_item` webhook "occurs when there is activity relating to an item on an organization-level project" and is available for Organizations only ([Webhook events](https://docs.github.com/en/webhooks/webhook-events-and-payloads#projects_v2_item)). [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) has no project event at all. So the factory should key off the `ready-for-agent` label (an `issues` event), not off the Ready column.

### Which token

From [Automating Projects using Actions](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/automating-projects-using-actions): "`GITHUB_TOKEN` is scoped to the repository level and cannot access projects. To access projects you can either create a GitHub App (recommended for organization projects) or a personal access token (recommended for user projects)." The PAT example uses a **classic** PAT with `project` and `repo`.

| Token | Works on this user-owned board? | Evidence |
|---|---|---|
| `GITHUB_TOKEN` | No | Quote above |
| Classic PAT (`repo`, `project`) | Yes | Docs PAT example; [add-to-project README](https://github.com/actions/add-to-project) asks for the same scopes |
| `gh` OAuth login (`gho_`, `project`) | Yes | Proven live below. This is what local agents use. |
| Fine-grained PAT | No | REST "Update project item for user" says it "does not work with GitHub App user access tokens, GitHub App installation access tokens, or fine-grained personal access tokens" ([REST items](https://docs.github.com/en/rest/projects/items#update-project-item-for-user)). Fine-grained PATs only have an organization "Projects" permission ([permissions list](https://docs.github.com/en/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens)), so GraphQL is also out (inferred). |
| GitHub App installation token | No | Same REST note. Apps get "organization projects" permission only (Actions doc above). GraphQL inferred. |

If the board ever moves to an organization, a GitHub App becomes possible and `projects_v2_item` webhooks start working.

Side effect to remember: events created with `GITHUB_TOKEN` do not start other workflows; a PAT or App token does ([Triggering a workflow from a workflow](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow#triggering-a-workflow-from-a-workflow)). Labels added by agents through Sunny's `gh` login do fire `issues: labeled`.

### Sketch: label to Status workflow

Not run. Needs the Triage option to exist first. `item-add` is idempotent: adding an item that is already on the board returns its existing ID ([API docs](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-api-to-manage-projects#adding-an-item-to-a-project), confirmed live: item count stayed at 10).

```yaml
name: Board status from labels
on:
  issues:
    types: [labeled]
jobs:
  move:
    if: contains(fromJSON('["needs-triage","ready-for-agent"]'), github.event.label.name)
    runs-on: ubuntu-latest
    steps:
      - env:
          GH_TOKEN: ${{ secrets.PROJECTS_PAT }}   # classic PAT: repo, project
          LABEL: ${{ github.event.label.name }}
          ISSUE_URL: ${{ github.event.issue.html_url }}
        run: |
          case "$LABEL" in
            needs-triage)    STATUS="Triage" ;;
            ready-for-agent) STATUS="Ready" ;;
          esac
          gh project item-add 2 --owner sredhu37 --url "$ISSUE_URL" > /dev/null
          gh project item-edit 2 --owner sredhu37 --url "$ISSUE_URL" --field Status --value "$STATUS"
```

## How an agent moves an item (proven live)

All four were run against issue #110 on 2026-11-11, each read back afterwards. The item ended in In progress, then closing #110 let "Item closed" set Done.

Find the item for an issue:

```bash
gh api graphql -F n=110 -f query='
query($n:Int!){repository(owner:"sredhu37",name:"ripples"){issue(number:$n){
  projectItems(first:5){nodes{id project{number}
    fieldValueByName(name:"Status"){... on ProjectV2ItemFieldSingleSelectValue{name optionId}}}}}}}'
# -> PVTI_lAHOAIaaWM4BrKpjzhH3E24, Status "Backlog"
```

Look up field and option IDs:

```bash
gh project field-list 2 --owner sredhu37 --format json \
  --jq '.fields[] | select(.name=="Status")'
```

**1. `gh` by name** (simplest, one extra lookup per call):

```bash
gh project item-edit 2 --owner sredhu37 \
  --url https://github.com/sredhu37/ripples/issues/110 \
  --field Status --value "In progress"
# read back: {"id":"PVTI_lAHOAIaaWM4BrKpjzhH3E24","status":"In progress"}
```

**2. `gh` by node IDs** (best for agents: no name lookups, survives renames):

```bash
gh project item-edit \
  --id PVTI_lAHOAIaaWM4BrKpjzhH3E24 \
  --project-id PVT_kwHOAIaaWM4BrKpj \
  --field-id PVTSSF_lAHOAIaaWM4BrKpjzhpejZI \
  --single-select-option-id 47fc9ee4
# read back: "In progress"
```

**3. GraphQL** (same as 2, usable from any client):

```bash
gh api graphql \
  -f p=PVT_kwHOAIaaWM4BrKpj -f i=PVTI_lAHOAIaaWM4BrKpjzhH3E24 \
  -f f=PVTSSF_lAHOAIaaWM4BrKpjzhpejZI -f o=df73e18b \
  -f query='mutation($p:ID!,$i:ID!,$f:ID!,$o:String!){
    updateProjectV2ItemFieldValue(input:{projectId:$p,itemId:$i,fieldId:$f,
      value:{singleSelectOptionId:$o}}){projectV2Item{id}}}'
# returned Status "In review"
```

**4. REST** (integer IDs, newer API):

```bash
echo '{"fields":[{"id":442404242,"value":"df73e18b"}]}' | \
  gh api -X PATCH /users/sredhu37/projectsV2/2/items/301405038 --input -
# returned status.name.raw "In review"
```

Rules from the docs:

- One field per `item-edit` call for non-draft items ([gh manual](https://cli.github.com/manual/gh_project_item-edit)).
- Add and update cannot happen in one call: `addProjectV2ItemById` first, then `updateProjectV2ItemFieldValue` ([API docs](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-api-to-manage-projects#updating-a-single-select-field)).
- Labels, assignees and milestone are issue properties, not item fields; change them with `gh issue edit` (same page).
- Setting Done by hand closes the issue, because Auto-close issue is on. Agents should never set Done; let the merge close the issue.

## Adding Status options (Triage, Gate)

Possible by API, not run here (read-only rule for the board).

- Mutation: `updateProjectV2Field(input:{fieldId, singleSelectOptions:[...]})`. Introspected input description: "provided values overwrite existing options, and existing options should be fetched for partial updates".
- Each option needs `name`, `color` and `description` (all non-null). Pass the existing `id` to keep it: "Include this to preserve the option's identity during updates, preventing item field values from being cleared." Leaving an `id` out would wipe that column's cards.
- `gh` 2.98 has `field-create` and `field-delete` but no `field-edit`. REST fields endpoints are list, add and get only.
- Built-in workflows point at option IDs. Keeping IDs should keep them working (inferred, untested).

Command for the factory line (Triage after Backlog, Gate after In review). Current colors and descriptions are copied from the live field so nothing else changes:

```bash
gh api graphql -f query='mutation{updateProjectV2Field(input:{
  fieldId:"PVTSSF_lAHOAIaaWM4BrKpjzhpejZI",
  singleSelectOptions:[
    {id:"f75ad846",name:"Backlog",    color:GREEN, description:"This item hasn'"'"'t been started"},
    {              name:"Triage",     color:GRAY,  description:"Human and agent shaping the issue"},
    {id:"61e4505c",name:"Ready",      color:BLUE,  description:"This is ready to be picked up"},
    {id:"47fc9ee4",name:"In progress",color:YELLOW,description:"This is actively being worked on"},
    {id:"df73e18b",name:"In review",  color:PURPLE,description:"This item is in review"},
    {              name:"Gate",       color:RED,   description:"Waiting for human merge decision"},
    {id:"98236657",name:"Done",       color:ORANGE,description:"This has been completed"}
  ]}){projectV2Field{... on ProjectV2SingleSelectField{options{id name}}}}}'
```

The UI route (Settings, Status field, add option, drag to order) does the same with less risk. After either route, board views may need the new columns made visible (unverified).

## Proposed mapping for the factory line

| Stage | Status | Who moves it | How |
|---|---|---|---|
| Idea | Backlog | Item added to project | Built-in |
| TRIAGE | Triage (new) | Human or triage agent | `needs-triage` label + Action, or agent `item-edit` |
| READY | Ready | Human labels `ready-for-agent` | Action, or the triage agent |
| BUILD | In progress | BUILD agent on claim | `item-edit` by IDs. Pull request linked to issue also does it when the PR opens. |
| REVIEW | In review | BUILD agent after the PR is up and CI starts | `item-edit` by IDs |
| GATE | Gate (new) | Review agent, high risk only | `item-edit` by IDs |
| DONE | Done | Merge closes the issue | Item closed, Pull request merged (built-in) |

Open risk: whether "Pull request linked to issue" fires again on later PR events and pulls an In review card back to In progress. Unverified; check on the first real build PR.

## Verification log

Commands run on 2026-11-11 (all with an explicit 30 to 40 s alarm):

- `gh project view 2 --owner sredhu37`, `gh project field-list`, GraphQL `projectV2{workflows views items}`: read board, fields, 7 workflows, 5 views.
- GraphQL introspection: mutation list, `UpdateProjectV2FieldInput`, `ProjectV2SingleSelectFieldOptionInput`, `ProjectV2Workflow`.
- REST `GET /users/sredhu37/projectsV2/2/fields` and `/items`: integer IDs.
- Writes, issue #110's item only: Backlog to In progress (`item-edit` by name), to In review (GraphQL), to In progress (`item-edit` by IDs), to In review (REST PATCH), to In progress (`item-edit` by name). `item-add` on the existing item returned the same ID; item count stayed 10.
- No fields, options, workflows or views were changed.

## Sources

- [Using the built-in automations](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-built-in-automations)
- [Adding items automatically](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/adding-items-automatically)
- [Archiving items automatically](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/archiving-items-automatically)
- [Automating Projects using Actions](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/automating-projects-using-actions)
- [Using the API to manage Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-api-to-manage-projects)
- [REST API: Project items](https://docs.github.com/en/rest/projects/items)
- [Permissions required for fine-grained PATs](https://docs.github.com/en/rest/authentication/permissions-required-for-fine-grained-personal-access-tokens)
- [Webhook events: projects_v2_item](https://docs.github.com/en/webhooks/webhook-events-and-payloads#projects_v2_item)
- [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows)
- [Triggering a workflow from a workflow](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow#triggering-a-workflow-from-a-workflow)
- [gh project item-edit](https://cli.github.com/manual/gh_project_item-edit)
- [actions/add-to-project](https://github.com/actions/add-to-project)
- [Changelog: Pull request linked to issue workflow (2025-11-06)](https://github.blog/changelog/2025-11-06-improved-onboarding-flow-for-github-projects/)
- [Changelog: Auto-close issue workflow (2024-04-25)](https://github.blog/changelog/2024-04-25-github-issues-projects-auto-close-issue-project-workflow/)
- [Sub-issues public preview discussion](https://github.com/orgs/community/discussions/139932)
