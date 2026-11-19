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

The API has no tables and no login yet (ADR 0012: the tickets after #212 add them). GitHub Pages is being retired (#283); the app does not call the API yet.

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
- **API** (`server/`, TypeScript on Node, [Hono](https://hono.dev)): `app.ts` builds the routes, `config.ts` reads the environment, `db.ts` creates the Postgres pool, `index.ts` starts the server. `GET /api/health` returns 200 when `SELECT 1` answers within 2 seconds and 503 when it does not (JSON, shape in `web/src/apiTypes.ts`). The API starts even when Postgres is down. Unknown `/api/*` paths return a JSON 404. With `NODE_ENV=production` it also serves the built app from `dist/` at `/` (a path without a file extension falls back to `index.html`), so one process and one image serve both. Types shared with the app live in `web/src/` and are imported with `import type` only. Tested in `server/*.test.ts`.
- **Database** (`compose.yaml`, `server/migrations/`): Postgres 17 for local dev (`docker compose up -d`). `DATABASE_URL` configures the connection (local Postgres or Neon with `?sslmode=require`; the URL is passed through unchanged). Idle connections close after 30 seconds, so Neon can scale to zero (it suspends compute after 5 minutes idle). There are no tables yet; `npm run migrate` applies the files in `server/migrations/`.
- **End-to-end specs** (`web/e2e/`, its own npm package with Playwright): one spec per screen, each a test and a demo recording. The `demo` job of `pr-checks.yml` runs them on every pull request and posts the evidence comment; `scripts/check-spec-changed.mjs` fails a PR that changes `*.tsx` or `*.css` without changing a spec.
- **Factory** (`.claude/agents/`, `.github/gate-paths.txt`, `.github/workflows/`): agent prompts, the risky file list for the software factory, and GitHub Actions workflows locked to the `factory` environment on `main`. See [docs/factory.md](docs/factory.md).

## Key decisions

See [docs/design.md](docs/design.md) and [docs/adr](docs/adr).

How work moves from an issue to the live site (agents, review, gate, deploy): [docs/factory.md](docs/factory.md). Map of every workflow and its trigger, generated by `scripts/workflows-map.mjs` and checked in CI: [docs/WORKFLOWS.md](docs/WORKFLOWS.md). Secrets are locked to the `factory` environment restricted to `main`; workflow edits by the build agent push via an isolated step outside the agent workspace.

### API stack choices

| Choice                                            | Why                                                                                                                                                                                                                                                                                                                                                   | Cost                                                                            |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Hono with `@hono/node-server`                     | Small, mainstream, one dependency chain, built-in static file serving, and Better Auth ships a Hono handler (#215). Not checked here against its docs: the builder of #215 confirms.                                                                                                                                                                  | Fewer plugins than Express.                                                     |
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

The root `package.json` only forwards commands (`npm test`, `npm run build`, `npm run dev`) to `web/` and `server/`. Each package has its own Dockerfile and builds from its own folder: `docker build web/` and `docker build server/`. The frontend image is nginx serving the built app and forwarding `/api` to `BACKEND_URL`; the backend image needs `DATABASE_URL`. Both variables are listed in the `.env.example` next to each Dockerfile. Decision: [ADR 0013](docs/adr/0013-separate-web-and-server-packages.md).

## How to run and test

```bash
npm run install:all    # root, web/, server/
docker compose up -d   # local Postgres
npm run dev            # Vite on :5173 and the API on :8080 (/api is proxied)
npm test               # the real-Postgres health test also runs when DATABASE_URL is set:
                       #   DATABASE_URL=postgres://ripples:ripples@localhost:5432/ripples npm test
npm run build          # app to web/dist/, API to server/dist/
npm start              # production twin: one process serves the app and /api
```
