# Architecture

Update this file in the same pull request as any structural change.

## Big picture

```mermaid
flowchart LR
  Child --> App[React app on the iPad]
  App --> Store[(Browser storage: name, language, badges)]
  App --> Speech[Device voice]
  Pages[GitHub Pages] --> App
  Repo[GitHub repo, main] -->|Action: test, build| Pages
  App -->|/api| API[Node API in server/]
  API -->|serves web/dist when DIST_DIR is set| App
  API --> DB[(Postgres)]
```

The API has a parent login (below). GitHub Pages is being retired (#283); the app does not call the API yet.

## Components

- **App** (`web/src/App.tsx`): holds progress state (language, name, disabled lessons, badges) and the current screen (name, map, lesson, parents, facts, timeline).
- **Progress** (`web/src/progress.ts`): pure functions for badges, next lesson, disabled lessons, storage and the save code. Tested in `web/src/progress.test.ts`.
- **Lessons registry** (`web/src/lessons.ts`): the ordered lesson list and curriculum groups with ids and titles in EN, DE, and PL. Ids are saved in progress and in the save code, so only append new ids, never reorder or rename.
- **UI text** (`web/src/i18n.ts`): all interface strings in EN, DE, and PL.
- **Lesson engine** (`web/src/lesson/`): `types.ts` (the `Lesson` shape), `LessonRunner.tsx` (story, toy, quiz, badge, real life, Ask Dad), `toolkit.tsx` (Stage, Slider, ToyButton, CheckButton, `animatedBeat`). A story beat is either an old emoji `scene` or an animated beat: one Otto line per tap and a diagram that shows one more part per tap.
- **Lesson content** (`web/src/content/<id>.tsx`, registry in `web/src/content/index.ts`): one file per lesson, checked by `web/src/content/content.test.ts`. There is one age group, so one lesson per id. How to write one: [docs/writing-lessons.md](docs/writing-lessons.md). Parents read each lesson's fact card in the app (gear icon, maths gate, Fact cards).
- **Screens and pieces** (`web/src/components/`): `Otto`, `SpeechBubble` (highlights _term_ words), `icons.tsx` (flat SVG icons and villagers, drawn in code), `diagram.tsx` (canvas, pop-in, arrows, bubbles, term chip), `LangSwitch` (global 3-way language toggle), `NameScreen`, `MapScreen`, `ParentPanel`, `FactCards`, `LessonPlaceholder`.
- **World timeline** (`web/src/timeline/`, `web/src/components/TimelineScreen.tsx`): static event data (7 eras, 6 tracks: India, Europe, Americas, East Asia, Africa and Middle East, Science) with trilingual titles and one summary each. Opened from the globe button on the map header. Events can name a `lessonId` they relate to. Group 5 lessons also get a "Meanwhile around the world" card (`web/src/timeline/meanwhile.ts`, `web/src/components/MeanwhileCard.tsx`) shown after the real life card: a year slider over a per-lesson window, one latest event per track, one intro text. Each event shown is also appended to the lesson's fact card with a source. Tested in `web/src/timeline/timeline.test.ts` and `web/src/components/TimelineScreen.test.tsx`.
- **Sound and speech** (`web/src/sound.ts`, `web/src/speech.ts`): synthesized effects and read-aloud.
- **Offline** (`web/public/sw.js`): caches app files after the first visit. It never touches `/api/` requests: those always go to the network.
- **API** (`server/`, TypeScript on Node, [Hono](https://hono.dev)): `app.ts` builds the routes, `config.ts` reads the environment, `db/` holds the database code, `index.ts` starts the server. `GET /api/health` returns 200 when `SELECT 1` answers within 2 seconds and 503 when it does not (JSON, shape in `server/apiTypes.ts`). The API starts even when Postgres is down. Unknown `/api/*` paths return a JSON 404. With `DIST_DIR` set it also serves the built app from that folder at `/` (a path without a file extension falls back to `index.html`). The backend image leaves it unset and serves only `/api`. The response types in `server/apiTypes.ts` are used only by the API. Tested in `server/*.test.ts`.
- **Database** (`compose.yaml`, `server/db/`): `pool.ts` creates the pool, `migrations/` holds the SQL migrations, `migrations.test.ts` runs them on a throwaway database. Postgres 17 for local dev (`docker compose up -d`). `DATABASE_URL` configures the connection (local Postgres or Neon with `?sslmode=require`; the URL is passed through unchanged). Idle connections close after 30 seconds, so Neon can scale to zero (it suspends compute after 5 minutes idle). `npm run migrate` applies the files in `server/db/migrations/` (a separate command, not run at API startup; a second run does nothing). Lessons stay in code; the tables hold only what users create. Deleting a `family` row cascades to its profiles and subscription (GDPR erasure).

  | Table          | Holds                                                                                                                                                                                      |
  | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
  | `family`       | id, `created_at`, `free_month_ends_at`, `parent_user_id` (unique: one Parent account per family; foreign key to the login library's `"user"` table).                                       |
  | `kid_profile`  | id, `family_id`, nickname (max 20), `avatar` (villager name, 1 to 32 characters), `lang` (en/de/pl), `muted`, `badges`, `disabled_lessons` (lesson ids), `created_at`. Mirrors `Progress`. |
  | `subscription` | `family_id` (one per family), `provider` (`stripe`), provider customer id, provider subscription id, `status`, `current_period_end`.                                                       |

- **Profiles API** (`server/profileRoutes.ts`, `server/db/profiles.ts`, `server/db/testDb.ts`): every route needs the parent's session cookie (`auth.api.getSession`) and acts only on that parent's family (created with `ensureFamily` if missing). `PATCH` replaces the whole value of each field it sends. A badge is added one id at a time in one SQL statement, so two devices never erase each other's badges. The 6-profile limit holds under concurrency because an add locks the `family` row inside a transaction. A profile id that is not a uuid, missing, or of another family is the same 404. The server checks the shape and size of lesson ids and avatar names (lesson id 1 to 64 characters, at most 200 in a list, avatar 1 to 32), not whether they exist. Nicknames get the same cleaning as `cleanName` in the app. Database tests get a throwaway migrated database from `testDb.ts`, which refuses a host other than `localhost` or `127.0.0.1`.

  | Route                           | Does                                                             | Answers                               |
  | ------------------------------- | ---------------------------------------------------------------- | ------------------------------------- |
  | `GET /api/family`               | all profiles with progress, oldest first                         | 200 `{ profiles }`                    |
  | `POST /api/profiles`            | adds a profile, body `{ nickname, avatar }`                      | 201 profile; 409 `profile_limit` at 6 |
  | `PATCH /api/profiles/:id`       | changes `nickname`, `avatar`, `lang`, `muted`, `disabledLessons` | 200 profile                           |
  | `POST /api/profiles/:id/badges` | body `{ lessonId }`, adds the badge once                         | 200 profile                           |
  | `DELETE /api/profiles/:id`      | deletes the profile and its progress                             | 204                                   |

  Errors: 401 `unauthorized`, 404 `not_found`, 400 `invalid`.

- **Parent login** (`server/auth.ts`, `server/mailer.ts`, `server/db/family.ts`, `web/src/auth.ts`, `web/src/components/LoginScreen.tsx`, `ProfileScreen.tsx`): [Better Auth](https://better-auth.com) with the Email OTP plugin (`type: "sign-in"`), mounted by `createApp` at `/api/auth/*` and using the `pg` pool. The parent enters an email, then the 6-digit Login code (valid 5 minutes, hashed in the database). The first login creates the user and, through a session hook, the `family` row with `free_month_ends_at` = now + 30 days (`ensureFamily` is idempotent, so a failed first attempt is repaired by the next login). Better Auth's tables (`user`, `session`, `account`, `verification`) are written by hand in `server/db/migrations/20261120083116000_create-auth-tables.sql`, and `server/schema-probe.test.ts` fails if the library expects a column the migration lacks. `family.parent_user_id` references `"user"` and cascades on delete.
  - **Sessions:** 90 days (`SESSION_DAYS`), refreshed daily, so a family device stays logged in for weeks. The cookie is httpOnly, and Secure when `NODE_ENV=production`.
  - **Limits** (the library's own): 3 sends and 3 checks per minute per client address and route, 3 wrong guesses burn a code, and a general limit on every route. The counters are kept in the API process memory, so with several API instances each has its own count (the 3-guess limit is in the database and holds everywhere).
  - **Email:** with `RESEND_API_KEY` (and `EMAIL_FROM`) the code goes out through the Resend HTTP API. Without it (Self-host mode) it is written to the API log as `Login code for <email>: <code>`, and the API prints a startup warning. A failed send is logged and the screen still says "sent", so the answer does not show whether an address is known.
  - **Screens:** parent panel (maths gate) -> "Log in" -> email entry -> code entry (spam hint, resend button with a 30 second cooldown) -> profile screen. The profile screen only shows the email and a log out button until the kid profile ticket.
- **Legal pages** (`web/src/legal/texts.ts`, `web/src/legal/api.ts`, `web/src/components/LegalScreen.tsx`, `LegalLinks.tsx`, `server/app.ts`): Impressum, privacy policy and terms in EN, DE and PL, linked from the login and profile screens (the profile screen is the family settings for now). The texts are drafts until Sunny approves them. The repo is public, so the Impressum details (name, address, email, phone, VAT ID) are not in the source: the API reads `LEGAL_NAME`, `LEGAL_ADDRESS`, `LEGAL_EMAIL`, `LEGAL_PHONE` and `LEGAL_VAT_ID` at startup and serves them at `GET /api/legal`, and the Impressum page fetches them when opened. Without the API the page says the details are not available.
- **End-to-end specs** (`web/e2e/`, its own npm package with Playwright): one spec per screen, each a test and a demo recording. The `demo` job of `pr-checks.yml` runs them on every pull request and posts the evidence comment; `scripts/check-spec-changed.mjs` fails a PR that changes `*.tsx` or `*.css` without changing a spec.
- **Factory** (`.claude/agents/`, `.github/gate-paths.txt`, `.github/workflows/`): agent prompts, the risky file list for the software factory, and GitHub Actions workflows locked to the `factory` environment on `main`. See [docs/factory.md](docs/factory.md).

## Key decisions

See [docs/design.md](docs/design.md) and [docs/adr](docs/adr).

How work moves from an issue to the live site (agents, review, gate, deploy): [docs/factory.md](docs/factory.md). Map of every workflow and its trigger, generated by `scripts/workflows-map.mjs` and checked in CI: [docs/WORKFLOWS.md](docs/WORKFLOWS.md). Secrets are locked to the `factory` environment restricted to `main`; workflow edits by the build agent push via an isolated step outside the agent workspace.

### API stack choices

| Choice                                            | Why                                                                                                                                                                                                                                                                                                                                                   | Cost                                                                            |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Hono with `@hono/node-server`                     | Small, mainstream, one dependency chain, built-in static file serving, and Better Auth ships a Hono handler (#215). Confirmed in #215: Better Auth's `handler(request)` takes the Fetch `Request` that Hono exposes.                                                                                                                                  | Fewer plugins than Express.                                                     |
| `pg` (node-postgres)                              | The most used Postgres driver. Better Auth's built-in database adapter takes a `pg` Pool directly, and its `migrate` and `getMigrations` only work with that adapter, so #215 needs no second path.                                                                                                                                                   | Plain SQL, no query builder.                                                    |
| `node-pg-migrate`, pinned to 7.6.1                | Small, plain migration files, runs from a command (`npm run migrate`) or from code, uses `pg`. Better Auth creates its own tables through its own tool, which #214 and #215 have to reconcile with this folder. Pinned because 9.0.0 and 7.7.x pull `glob` and `minimatch` versions that `npm audit` flags (moderate), which fails the `audit` check. | A second migration path next to Better Auth's. Re-check the pin when upgrading. |
| `tsc` build to `server/dist/`, `tsx watch` in dev | The Dockerfile (#213) compiles the API.                                                                                                                                                                                                                                                                                                               | One more build step.                                                            |

The compiled entry is `server/dist/index.js`. `npm start` runs it with `NODE_ENV=production` and `DIST_DIR=../web/dist`, so one process serves the app and `/api`. Without `DIST_DIR` the API serves only `/api`, which is what the backend image does. The API listens on `PORT` (default 8080). In dev Vite runs on 5173 and proxies `/api` to the API on 8080.

## Packages

Each folder below has its own `package.json` and lockfile. No code is shared between `web/` and `server/`.

| Folder    | Holds                                                                      | Own dependencies               |
| --------- | -------------------------------------------------------------------------- | ------------------------------ |
| `web/`    | The React app, Vite, unit tests, `web/e2e/` (Playwright, a fourth package) | react, vite, vitest, jsdom     |
| `server/` | The Hono API, migrations, unit tests                                       | hono, pg, node-pg-migrate, tsx |
| repo root | Docs, CI, `scripts/` (CI tools and their tests), lint and format           | oxlint, oxfmt, vitest          |

The root `package.json` only forwards commands (`npm test`, `npm run build`, `npm run dev`) to `web/` and `server/`. Each package has its own Dockerfile and builds from its own folder: `docker build web/` and `docker build server/`. The frontend image is nginx serving the built app (gzip; hashed files in `assets/` cached for one week, everything else revalidated on each visit) and forwarding `/api` to `BACKEND_URL`; the backend image needs `DATABASE_URL`. Both variables are listed in the `.env.example` next to each Dockerfile. Decision: [ADR 0013](docs/adr/0013-separate-web-and-server-packages.md).

## How to run and test

```bash
npm run install:all    # root, web/, server/
docker compose up -d   # local Postgres
npm run dev            # Vite on :5173 and the API on :8080 (/api is proxied)
npm test               # the real-Postgres health and migration tests also run when DATABASE_URL is set:
                       #   DATABASE_URL=postgres://ripples:ripples@localhost:5432/ripples npm test
npm run build          # app to web/dist/, API to server/dist/
npm start              # production twin: one process serves the app and /api
```
