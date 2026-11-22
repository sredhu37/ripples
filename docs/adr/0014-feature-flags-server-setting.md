# ADR 0014: Feature flags in a server setting

## Status

Accepted.

## Context

Sunny wants to take a lesson off the trail for every family at once, for example while it needs fixes. The parent switch (`disabledLessons`, ADR 0008) works per kid only. Lessons live in the app code, so today the only way to pull one is a code change.

## Decision

1. One server setting, `FEATURES`, holds a JSON object of named true/false flags, for example `{"show-loans": false, "new-badge-shelf": true}`. Sunny edits it in the Cloud Run console.
2. Unset or empty means no flags: every lesson shows. This is the local and self-host default.
3. The server refuses to start on invalid `FEATURES` (bad JSON, not an object, a value that is not `true` or `false`). The error names `FEATURES` and the key. Cloud Run keeps the previous revision live.
4. `GET /api/features` serves the object, public, with `Cache-Control: no-store`.
5. The app fetches it once at start. A failed request or no API means `{}`.
6. `show-<lessonId>: false` makes a **Paused lesson**. `true` or no flag shows it. The server does not know lesson ids (ADR 0013), so the app ignores a `show-` flag with an unknown id and logs one console warning.
7. Any other flag name is a feature switch that code reads by name. A missing switch is off. None exist yet.
8. A Paused lesson is left out of the trail, badge shelf, parent screen and fact cards for every family. Trail numbers stay consecutive. Stored badges and `disabledLessons` are kept, so the lesson and its badge come back when the flag is removed or set to `true`.
9. Flags are a curtain, not a lock. They are public, and lesson code ships in the bundle and the public repo. Nothing secret or paid may rely on a flag; paid access is checked on the server.

## Rejected

- **An admin role with a database table.** More to build and secure than one setting needs.
- **OpenFeature with flagd.** The provider is pre-1.0 and its file mode is documented for dev and test only.
- **Self-hosted Unleash or Flagsmith.** A second server and database for on/off switches.
- **Lesson versions in flags.** Two copies of a lesson in code. A branch already keeps the old version live while a rewrite happens.

## Consequences

- No new dependency, table or role.
- Changing a flag restarts the API (about a minute).
- Previewing a Paused lesson happens locally with `FEATURES` unset.
