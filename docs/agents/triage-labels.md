# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual label strings used in this repo's issue tracker. The `factory:` labels drive the software factory (see `docs/factory.md`, "Labels and board").

| Label in mattpocock/skills | Label in our tracker | Meaning                                               |
| -------------------------- | -------------------- | ----------------------------------------------------- |
| `needs-triage`             | `factory:triage`     | Sunny needs to evaluate this issue                    |
| `needs-info`               | `factory:human`      | Waiting on Sunny or the reporter for more information |
| `ready-for-agent`          | `factory:ready`      | Fully specified, ready for the build agent            |
| `ready-for-human`          | `factory:human`      | Requires Sunny                                        |
| `wontfix`                  | `wontfix`            | Will not be actioned                                  |

`factory:suggestion` is not a triage role: it marks the review agents' "Suggestions from PR #n" issues, which wait in the Agent suggestions column until Sunny swaps them to `factory:triage` or `factory:ready`. Leave it on those issues; give every other new issue `factory:triage`.

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

An issue carries exactly one `factory:` label at a time: swap the old one when you apply a new one. No agent moves an issue to `factory:ready` on its own: Sunny does, a build ticket split from a confirmed wayfinder spec gets it, or `/factory` does at the end of triage in Sunny's own session, where he confirms it.
