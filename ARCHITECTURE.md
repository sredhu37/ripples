# Architecture

Update this file in the same pull request as any structural change.

## Big picture

![A request from the React app through the edge and the Node API to Postgres and back](docs/diagrams/request-flow.svg)

One React app talks to one Node API over `/api`. The API is the source of truth for kid progress and the only thing that touches Postgres. Lessons live in code, not in the database. The diagram follows one save: a child earns a badge.

| Step | Where                                | What happens                                                                                                                                                                                               |
| ---- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | React app (`web/src/api.ts`)         | The screen changes at once, then the app saves through the API: `fetch` with the session cookie, no library. The cookie is httpOnly, so the app never sees it.                                             |
| 2    | App to edge                          | `POST /api/profiles/:id/badges` with the cookie (`credentials: "same-origin"`). The service worker (`web/public/sw.js`) never touches `/api/` requests: those always go to the network.                    |
| 3    | Edge                                 | Forwards `/api` to the API unchanged. In dev it is the Vite proxy, in Docker it is nginx; with `npm start` there is no edge (see below).                                                                   |
| 4    | Node API (`server/profileRoutes.ts`) | `requireFamily` asks Better Auth for the session (`auth.api.getSession`), finds the parent's family, then the route runs. No session: 401 `unauthorized`.                                                  |
| 5    | Postgres                             | One SQL statement adds the badge once, only to a profile of that family.                                                                                                                                   |
| 6    | Back to the app                      | The API answers 200 with the profile and the app keeps it. A failed save shows a "not saved" notice and the change stays on screen for the session; a 401 goes back to `login`. There is no offline queue. |

The API has a parent login ([Parent login](#parent-login)) and the Profiles API ([below](#profiles-api)). The app calls both.

### Three ways to run it

| Mode                | Who serves the app                          | Who serves `/api`                                         | Port                              |
| ------------------- | ------------------------------------------- | --------------------------------------------------------- | --------------------------------- |
| `npm run dev`       | Vite                                        | The API, reached through the Vite proxy                   | Vite 5173, API 8080               |
| `npm start`         | The API itself (`DIST_DIR=../web/dist`)     | The same process                                          | 8080 (`PORT`)                     |
| `docker compose up` | nginx in the frontend image (the built app) | The backend image, nginx forwards `/api` to `BACKEND_URL` | `127.0.0.1:${RIPPLES_PORT:-8080}` |

The API serves the built app only when `DIST_DIR` is set. The backend image leaves it unset and serves only `/api`.

## The app (`web/`)

![The screens of the app and how a child or a parent moves between them](docs/diagrams/app-screens.svg)

**App** (`web/src/App.tsx`) holds the family's profiles, the active profile id and the current screen: `loading`, `login`, `firstKid`, `picker`, `settings` (family settings), `map` (the trail), `lesson`, `facts`, `timeline`, `legal`.

- **Start:** a device without a parent session opens `login`. One with a session opens `picker`, or `firstKid` when the family has no profile: the family adds a kid, then the picker opens.
- **Picker:** it shows on every app start; the app does not remember the last kid. The trail header shows the active kid's villager and nickname as a "Switch profile" button back to the picker, and labels its sound, timeline and parents buttons.
- **Progress:** the trail reads `Progress`, filled from the active profile (`progressFromProfile`).
- **Saving:** a change updates the screen at once, then saves through the API (`web/src/api.ts`: `fetch` with the session cookie, no library). A failed save shows a "not saved" notice and the change stays on screen for the session; a 401 goes back to `login`. There is no offline queue.

### State and text

- **Device key** `ripples.lang` (`web/src/deviceLang.ts`): the language of the login and picker screens, before a profile is chosen. Picking a profile switches to that profile's language; changing the language on the trail saves it to the profile and to this key. Nothing reads, writes or deletes the old key `ripples.progress.v1` (`loadProgress` stays for the import of old progress).
- **Progress** (`web/src/progress.ts`): pure functions for badges, next lesson, disabled lessons, the profile mapping, the old browser storage loader and the old save code (`exportCode`, `importCode`, kept for the import ticket). Tested in `web/src/progress.test.ts`.
- **Lessons registry** (`web/src/lessons.ts`): the ordered lesson list and curriculum groups with ids and titles in EN, DE, and PL. Ids are saved in progress and in the save code, so only append new ids, never reorder or rename.
- **UI text** (`web/src/i18n.ts`): all interface strings in EN, DE, and PL.

### Lessons

- **Lesson engine** (`web/src/lesson/`): `types.ts` (the `Lesson` shape), `LessonRunner.tsx` (story, toy, quiz, badge, real life, Ask Dad), `toolkit.tsx` (Stage, Slider, ToyButton, CheckButton, `animatedBeat`). A story beat is either an old emoji `scene` or an animated beat: one Otto line per tap and a diagram that shows one more part per tap.
- **Lesson content** (`web/src/content/<id>.tsx`, registry in `web/src/content/index.ts`): one file per lesson, checked by `web/src/content/content.test.ts`. There is one age group, so one lesson per id. How to write one: [docs/writing-lessons.md](docs/writing-lessons.md). Parents read each lesson's fact card in the app (gear icon, maths gate, Fact cards).

### Screens and pieces

All in `web/src/components/`.

| Piece                            | Does                                                                                                                                                                                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Otto`, `SpeechBubble`           | The otter guide; the bubble highlights _term_ words and has the read-aloud button.                                                                                                                                                                      |
| `icons.tsx`, `diagram.tsx`       | Flat SVG icons and villagers, drawn in code; the diagram canvas, pop-in, arrows, bubbles and term chip.                                                                                                                                                 |
| `LangSwitch`, `BackButton`       | The global 3-way language toggle; the one "← destination" button at the top left of every sub-screen.                                                                                                                                                   |
| `NameScreen`                     | Not shown for now, reused by the anonymous start.                                                                                                                                                                                                       |
| `FirstKidScreen`                 | First run: a family with no kid adds one, then the picker opens. Reuses `ProfileForm` from `FamilySettings`.                                                                                                                                            |
| `ProfilePicker`, `ProfileTile`   | The start screen of a logged-in device. The tile is the villager picture and nickname, used by the picker and family settings; the 11 villagers of `CAST` are the pictures, `web/src/avatar.ts` picks the default and falls back to the first villager. |
| `MapScreen`, `RiverMapBackdrop`  | The trail: river stepping-stone map with `RiverMapBackdrop` SVG landscape; sections and which stops show in full come from `buildTrail` in `web/src/trailView.ts`.                                                                                      |
| `FamilySettings`                 | Behind the maths gate: a kid list with add and a 6-profile limit message; each kid opens a detail with rename, picture, their lesson selection and Delete behind the in-app `ConfirmDialog`; fact cards; log out in a separate Account section.         |
| `FactCards`, `LessonPlaceholder` | The parents' fact cards; the stand-in for a lesson with no content yet.                                                                                                                                                                                 |

### Timeline, sound, offline

- **World timeline** (`web/src/timeline/`, `web/src/components/TimelineScreen.tsx`): the world map with a slider. `TimelineScreen` puts `TimelineMap` over `TimelineSlider`; picking a stop shows that stop's pins and draws the stop's start year (spec D1); Read more on a pin opens its lesson. Opened from the globe button on the trail header. Static event data (7 eras, 6 tracks: India, Europe, Americas, East Asia, Africa and Middle East, Science) with trilingual titles and one summary each; the summary is the pin's line. Events can name a `lessonId` they relate to. The `region` field and its labels stay because the Meanwhile card shows one latest event per track.
  - **Meanwhile card:** group 5 lessons also get a "Meanwhile around the world" card (`web/src/timeline/meanwhile.ts`, `web/src/components/MeanwhileCard.tsx`) shown after the real life card: a year slider over a per-lesson window, one latest event per track, one intro text. Each event shown is also appended to the lesson's fact card with a source.
  - **Pins and stops** (`web/src/timeline/pins.ts`, spec `docs/specs/world-timeline-map.md`): `PINS` is the 65 events in the pin model (map year, country, lon, lat, one https source from `EVENT_SOURCES`, `sensitive`). `TIMELINE_STOPS` holds the 22 slider stops, `stopForYear` returns the last stop at or before a map year, `pinsByStop` returns pins and distinct countries per stop. `TimelineSlider` (`web/src/components/TimelineSlider.tsx`) is the 22-stop slider with the era band (native range input, non-interactive tick labels, Earlier and Later; you pick with the range input, the era band, or Earlier and Later; only the current era shows on phones). `TimelineScreen` uses both; the old list screen (era and region chips, text cards) is deleted.
  - **World map** (`web/src/components/TimelineMap.tsx`): takes the pins to show and a default map year, draws the border file of that year (or of the open pin's map year) over the neutral `land.json`, and holds the open pin itself. Flat projection, one map unit per degree. View maths (projection, start view, zoom, clamp, clusters, cloud placement) is pure code in `web/src/timeline/mapView.ts`; `web/src/timeline/useBorders.ts` loads and decodes border files on demand and keeps the map on screen until the next one arrives. The service worker caches the files after the first load, so a visited map works offline. Pinch, wheel, + and - zoom; drag pans; pins closer than 44 px group into a count bubble that zooms in when tapped; the open pin is drawn 1.7 times its size and its thought cloud (Otto, the line, Read more only with a `lessonId`) sits on the map at the pin. Phones and portrait screens start on Europe to Asia. `TimelineScreen` shows it with `TimelineSlider`. The map's `data-year` attribute holds the map year it draws.
  - Tested in `web/src/timeline/borders.test.ts`, `web/src/timeline/pins.test.ts`, `web/src/timeline/mapView.test.ts`, `web/src/timeline/timeline.test.ts`, `web/src/components/TimelineMap.test.tsx`, `web/src/components/TimelineSlider.test.tsx` and `web/src/components/TimelineScreen.test.tsx`.
- **Sound and speech** (`web/src/sound.ts`, `web/src/speech.ts`): synthesized effects and read-aloud. Read-aloud plays Otto's voice file for the line through the shared Web Audio context; without a file it uses the device voice.
- **Voice files** (`web/public/audio/<lang>/<id>.m4a`, `web/src/voice/`): one AAC file per line Otto can say, made by `npm run voices` (`scripts/voices/`, see [docs/writing-lessons.md](docs/writing-lessons.md#voice-files)). The app finds a file through `manifest.<lang>.json` (a hash of the screen line to the file name), loaded as a lazy chunk per language. The file name is a hash of the voice, its speed and the spoken text, so a changed line or voice gets a new file. `spoken.<lang>.json` holds the spoken version of lines with numbers. `web/src/voice/voice.test.ts` fails when a line has no file or a number line has no spoken version.
- **Border files** (`web/public/borders/<map year>.json` and `land.json`, `web/src/timeline/borders.ts`): the borders of every map year a pin or slider stop uses (102 files of at most 70 KB), made by `npm run borders` (`scripts/borders/`, see its README). Shapes carry a present-day country and a fixed colour, rings are polylines in hundredths of a degree, and `land.json` is the neutral ground under all maps. Sources: OpenHistoricalMap from 1900, Cliopatria before, clipped to Natural Earth land; India always follows the Natural Earth India point of view (ADR 0016). They are loaded on demand, never fetched live from a source. `web/src/timeline/borders.test.ts` fails when a map year has no file, a file is unused or over 70 KB, or a control point from ADR 0016 is not drawn inside India on a map from 1858.
- **Offline** (`web/public/sw.js`): caches app files after the first visit (border files included, they are fetched from the same origin). Voice files go to a separate cache on their first play and are never fetched again (their names change with their content). It never touches `/api/` requests: those always go to the network.

## The API (`server/`)

TypeScript on Node, [Hono](https://hono.dev). `app.ts` builds the routes, `config.ts` reads the environment, `db/` holds the database code, `index.ts` starts the server. The API starts even when Postgres is down. The response types in `server/apiTypes.ts` are used only by the API. Tested in `server/*.test.ts`.

| Route                               | Does                                                                                                      | Answers                                                          |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `GET /api/health`                   | Runs `SELECT 1` and waits up to 2 seconds. JSON, shape in `server/apiTypes.ts`.                           | 200 when it answers, 503 when it does not                        |
| `GET /api/features`                 | Serves the `FEATURES` setting (see [Feature flags](#feature-flags)).                                      | 200 object                                                       |
| `GET /api/legal`                    | Serves the Impressum details (see [Legal pages](#legal-pages)).                                           | 200 object                                                       |
| `GET`, `POST /api/auth/*`           | The login library (see [Parent login](#parent-login)).                                                    | The library's own                                                |
| Profile routes                      | Kid profiles of the logged-in parent's family (see [Profiles API](#profiles-api)).                        | See the table there                                              |
| Any other `/api/*`                  | Nothing.                                                                                                  | JSON 404                                                         |
| Any other path, with `DIST_DIR` set | Serves the built app from that folder at `/`. A path without a file extension falls back to `index.html`. | The file, `index.html`, or 404 for a missing file with extension |

### Profiles API

(`server/profileRoutes.ts`, `server/db/profiles.ts`, `server/db/testDb.ts`)

| Route                           | Does                                                             | Answers                               |
| ------------------------------- | ---------------------------------------------------------------- | ------------------------------------- |
| `GET /api/family`               | all profiles with progress, oldest first                         | 200 `{ profiles }`                    |
| `POST /api/profiles`            | adds a profile, body `{ nickname, avatar }`                      | 201 profile; 409 `profile_limit` at 6 |
| `PATCH /api/profiles/:id`       | changes `nickname`, `avatar`, `lang`, `muted`, `disabledLessons` | 200 profile                           |
| `POST /api/profiles/:id/badges` | body `{ lessonId }`, adds the badge once                         | 200 profile                           |
| `DELETE /api/profiles/:id`      | deletes the profile and its progress                             | 204                                   |

Errors: 401 `unauthorized`, 404 `not_found`, 400 `invalid`.

- **Session and family:** every route needs the parent's session cookie (`auth.api.getSession`) and acts only on that parent's family (created with `ensureFamily` if missing).
- **Writes:** `PATCH` replaces the whole value of each field it sends. A badge is added one id at a time in one SQL statement, so two devices never erase each other's badges. The 6-profile limit holds under concurrency because an add locks the `family` row inside a transaction.
- **Not found:** a profile id that is not a uuid, missing, or of another family is the same 404.
- **Checks:** the server checks the shape and size of lesson ids and avatar names (lesson id 1 to 64 characters, at most 200 in a list, avatar 1 to 32), not whether they exist. Nicknames get the same cleaning as `cleanName` in the app.
- **Tests:** database tests get a throwaway migrated database from `testDb.ts`, which refuses a host other than `localhost` or `127.0.0.1`.

## Parent login

![The parent login: email, a 6-digit code, then a session cookie](docs/diagrams/parent-login.svg)

(`server/auth.ts`, `server/mailer.ts`, `server/db/family.ts`, `web/src/auth.ts`, `web/src/components/LoginScreen.tsx`)

[Better Auth](https://better-auth.com) with the Email OTP plugin (`type: "sign-in"`), mounted by `createApp` at `/api/auth/*` and using the `pg` pool. The parent enters an email, then the 6-digit Login code (valid 5 minutes, hashed in the database).

- **First login:** it creates the user and, through a session hook, the `family` row with `free_month_ends_at` = now + 30 days (`ensureFamily` is idempotent, so a failed first attempt is repaired by the next login).
- **Tables:** Better Auth's tables (`user`, `session`, `account`, `verification`) are written by hand in `server/db/migrations/20261120083116000_create-auth-tables.sql`, and `server/schema-probe.test.ts` fails if the library expects a column the migration lacks. `family.parent_user_id` references `"user"` and cascades on delete.
- **Sessions:** 90 days (`SESSION_DAYS`), refreshed daily, so a family device stays logged in for weeks. The cookie is httpOnly, and Secure when `NODE_ENV=production`.
- **Limits** (the library's own): 3 sends and 3 checks per minute per client address and route, 3 wrong guesses burn a code, and a general limit on every route. The counters are kept in the API process memory, so with several API instances each has its own count (the 3-guess limit is in the database and holds everywhere).
- **Email:** with `RESEND_API_KEY` (and `EMAIL_FROM`) the code goes out through the Resend HTTP API. Without it (Self-host mode) it is written to the API log as `Login code for <email>: <code>`, and the API prints a startup warning. A failed send is logged and the screen still says "sent", so the answer does not show whether an address is known.
- **Screens:** parent panel (maths gate) -> "Log in" -> email entry -> code entry (spam hint, resend button with a 30 second cooldown) -> profile screen. The profile screen only shows the email and a log out button until the kid profile ticket.

## Database

![The tables and how a delete runs down from the parent account](docs/diagrams/data-model.svg)

(`compose.yaml`, `server/db/`)

Postgres 17 on the developer's machine for `npm run dev` (README, Running locally); `compose.yaml` runs its own Postgres for the Docker stack. Lessons stay in code; the tables hold only what users create. Deleting a `family` row cascades to its profiles and subscription (GDPR erasure).

| Table          | Holds                                                                                                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `family`       | id, `created_at`, `free_month_ends_at`, `parent_user_id` (unique: one Parent account per family; foreign key to the login library's `"user"` table).                                       |
| `kid_profile`  | id, `family_id`, nickname (max 20), `avatar` (villager name, 1 to 32 characters), `lang` (en/de/pl), `muted`, `badges`, `disabled_lessons` (lesson ids), `created_at`. Mirrors `Progress`. |
| `subscription` | `family_id` (one per family), `provider` (`stripe`), provider customer id, provider subscription id, `status`, `current_period_end`.                                                       |

- **Code:** `pool.ts` creates the pool, `migrations/` holds the SQL migrations, `migrations.test.ts` runs them on a throwaway database.
- **Connection:** `DATABASE_URL` configures it (local Postgres or Neon with `?sslmode=require`; the URL is passed through unchanged). Idle connections close after 30 seconds, so Neon can scale to zero (it suspends compute after 5 minutes idle).
- **Migrations:** `npm run migrate` applies the files in `server/db/migrations/` (a separate command, not run at API startup; a second run does nothing).

## Legal pages

(`web/src/legal/texts.ts`, `web/src/legal/api.ts`, `web/src/components/LegalScreen.tsx`, `LegalLinks.tsx`, `server/app.ts`)

- Impressum, privacy policy and terms in EN, DE and PL, linked from the login and profile screens (the profile screen is the family settings for now). The texts are drafts until Sunny approves them.
- The repo is public, so the Impressum details (name, address, email, phone, VAT ID) are not in the source: the API reads `LEGAL_NAME`, `LEGAL_ADDRESS`, `LEGAL_EMAIL`, `LEGAL_PHONE` and `LEGAL_VAT_ID` at startup and serves them at `GET /api/legal`, and the Impressum page fetches them when opened. Without the API the page says the details are not available.

## Feature flags

(`server/config.ts`, `server/app.ts`, `web/src/features.ts`, [ADR 0014](docs/adr/0014-feature-flags-server-setting.md))

- **Setting:** the API setting `FEATURES` is a JSON object of named true/false values, for example `{"show-loans": false}`. Unset or empty means no flags. The server refuses to start on invalid JSON, a non-object or a non-boolean value.
- **Serving:** `GET /api/features` serves the object (public, `Cache-Control: no-store`). The app fetches it once at start; no API or a failed request means `{}`.
- **Paused lessons:** `show-<lessonId>: false` makes a Paused lesson: it is left out of the trail, badge shelf, parent screen and fact cards, and the next-lesson logic skips it. Stored badges and `disabledLessons` stay untouched. An unknown id is ignored with a console warning.
- **Other switches:** any other name is a feature switch read by `isFeatureOn(features, name)`; a missing switch is off. Flags are public: nothing secret or paid may rely on one.

## Tests and factory

- **End-to-end specs** (`web/e2e/`, its own npm package with Playwright): one spec per screen, each a test and a demo recording. The `demo` job of `pr-checks.yml` runs them on every pull request and posts the evidence comment; `scripts/check-spec-changed.mjs` fails a PR that changes `*.tsx` or `*.css` without changing a spec.
- **Factory** (`.claude/agents/`, `.claude/skills/factory/` (local run), `.github/prompts/`, `.github/scripts/`, `.github/gate-paths.txt`, `.github/workflows/`): agent rules, prompt templates, the scripts every workflow step calls (one folder per workflow plus `shared/`), the risky file list for the software factory, and GitHub Actions workflows locked to the `factory` environment on `main`. See [docs/factory.md](docs/factory.md).

## Key decisions

See [docs/design.md](docs/design.md) and [docs/adr](docs/adr).

How work moves from an issue to a merge (agents, review, gate): [docs/factory.md](docs/factory.md). Map of every workflow and its trigger, generated by `scripts/workflows-map.mjs` and checked in CI: [docs/WORKFLOWS.md](docs/WORKFLOWS.md). Secrets are locked to the `factory` environment restricted to `main`; workflow edits by the build agent push via an isolated step outside the agent workspace.

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

`scripts/borders/` is not a package either: the Python tools behind `npm run borders` (shapely, pyshp, matplotlib in `requirements.txt`, installed by uv into a gitignored `.cache/`). They make the border files and are never shipped.

`scripts/voices/` is not a package: it holds the Python tools behind `npm run voices` (kokoro-onnx, piper-tts in `requirements.txt`, installed by uv into a gitignored `.cache/`). They make the voice files and are never shipped.

The root `package.json` only forwards commands (`npm test`, `npm run build`, `npm run dev`) to `web/` and `server/`. Each package has its own Dockerfile and builds from its own folder: `docker build web/` and `docker build server/`.

- **Frontend image:** nginx serving the built app (gzip; hashed files in `assets/` and voice files in `audio/` cached for one week, everything else revalidated on each visit) and forwarding `/api` to `BACKEND_URL`.
- **Backend image:** needs `DATABASE_URL`. It also holds the SQL migrations, so it can run `node-pg-migrate` itself. Both variables are listed in the `.env.example` next to each Dockerfile.
- **Compose:** `compose.yaml` runs the whole app with both images: Postgres (not published to the host), a one-off `migrate` service, the API, and the web app on `127.0.0.1:${RIPPLES_PORT:-8080}`; its settings come from the root `.env` (`.env.example`), and it refuses to start without `BETTER_AUTH_SECRET`.

Decision: [ADR 0013](docs/adr/0013-separate-web-and-server-packages.md).

## How to run and test

```bash
npm run install:all    # root, web/, server/
npm run dev            # Vite on :5173 and the API on :8080 (/api is proxied); needs Postgres on :5432
npm test               # the real-Postgres health and migration tests also run when DATABASE_URL is set:
                       #   DATABASE_URL=postgres://ripples:***@localhost:5432/ripples npm test
npm run build          # app to web/dist/, API to server/dist/
npm start              # production twin: one process serves the app and /api
docker compose up --build -d --wait   # the whole app in Docker on :8080 (BETTER_AUTH_SECRET in .env)
```
