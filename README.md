# Ripples

A web app that explains how the real world works (money, taxes, governments, history, technology) to an 8-year-old, with Otto the otter as guide. English and German.

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-Ko--fi-FF5E5B?logo=kofi&logoColor=white)](https://ko-fi.com/sunnyredhu)

Each lesson is a short story, then a toy the child can play with, then three questions. A badge is earned when all three are right. Wrong answers get a hint, never a red cross.

Live site: https://sredhu37.github.io/ripples/ (add it to the iPad home screen; it works offline after the first visit).

## Status

| Group                                               | Lessons       | State                                                                     |
| --------------------------------------------------- | ------------- | ------------------------------------------------------------------------- |
| Money and Work                                      | 10            | All 10 lessons written (EN and DE), fact cards waiting for Sunny's review |
| Business, Markets, Governments, History, Technology | to be planned | Not started                                                               |

The full list of design decisions is in [docs/design.md](docs/design.md).

## Prerequisites

| Tool                | Version | Used for                               |
| ------------------- | ------- | -------------------------------------- |
| Node.js (via nvm)   | 24      | App, API, tests (CI also runs Node 24) |
| Docker with Compose | recent  | Local Postgres 17 from `compose.yaml`  |
| Git                 | any     | Clone and worktrees                    |

macOS (Homebrew):

```bash
# nvm
brew install nvm
mkdir -p ~/.nvm
cat >> ~/.zshrc <<'EOF'
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"
EOF
source ~/.zshrc

# Node 24
nvm install 24
nvm alias default 24

# Docker (pick one: Docker Desktop or OrbStack), includes `docker compose`
brew install --cask docker-desktop   # or: brew install --cask orbstack

# Optional: psql client to look inside the database (Postgres itself runs in Docker)
brew install libpq && brew link --force libpq
```

Linux or without Homebrew: install nvm with its [install script](https://github.com/nvm-sh/nvm#installing-and-updating), then `nvm install 24`, and install Docker Engine with the Compose plugin from the [Docker docs](https://docs.docker.com/engine/install/).

Check:

```bash
node -v             # v24.x
docker compose version
```

You do not install Postgres on the host. `compose.yaml` runs Postgres 17 in a container. If you prefer a host install instead, use `brew install postgresql@17`, create a `ripples` user and database, and set `DATABASE_URL` (below).

## Running locally

### 1. Install dependencies

```bash
nvm use 24
npm ci
```

### 2. Environment variables

None are needed for local development. There is no `.env` file: the app does not load one. The defaults are:

| Variable       | Default in dev                                      | Notes                                                                          |
| -------------- | --------------------------------------------------- | ------------------------------------------------------------------------------ |
| `DATABASE_URL` | `postgres://ripples:ripples@localhost:5432/ripples` | Matches `compose.yaml`. Required in production. Neon needs `?sslmode=require`. |
| `PORT`         | `8080`                                              | API port. Vite proxies `/api` to it, so change `vite.config.ts` too.           |
| `NODE_ENV`     | unset                                               | `production` makes the API serve the built app from `dist/`.                   |
| `DIST_DIR`     | `dist`                                              | Folder the API serves in production.                                           |

One exception: `npm run migrate` has no default, so pass the URL yourself (next step).

### 3. Database

```bash
docker compose up -d --wait     # start Postgres on 127.0.0.1:5432, waits until healthy
DATABASE_URL=postgres://ripples:ripples@localhost:5432/ripples npm run migrate
```

There are no tables yet, so `migrate` prints `No migrations to run!`. Other commands:

```bash
docker compose ps                                              # status
docker compose logs -f postgres                                # logs
psql postgres://ripples:ripples@localhost:5432/ripples         # shell (needs the psql client)
docker compose down                                            # stop, keep data
docker compose down -v                                         # stop and delete all data
```

The API starts even when Postgres is down. `/api/health` then returns 503.

### 4. Start the backend and the frontend

Both together (Ctrl-C stops both):

```bash
npm run dev
```

Or in two terminals:

```bash
npm run dev:api     # API on http://localhost:8080 (tsx watch, restarts on change)
npm run dev:web     # app on http://localhost:5173 (Vite, hot reload)
```

Open http://localhost:5173/. Check the API with `curl http://localhost:8080/api/health` (`{"status":"ok"}`). The same call through Vite, `http://localhost:5173/api/health`, also works.

### 5. Test and build

```bash
npm test            # unit tests; the real-Postgres health test also runs when DATABASE_URL is set:
                    #   DATABASE_URL=postgres://ripples:ripples@localhost:5432/ripples npm test
npm run lint
npm run typecheck
npm run build       # app to dist/, API to dist-server/
npm start           # production twin: one process on :8080 serves the app and /api
                    #   (needs DATABASE_URL set, because NODE_ENV=production has no default)
```

## Software Factory

Issues are built, checked, reviewed and merged by GitHub Actions workflows and AI agents. Sunny sets `factory:ready` and approves what the gate cannot merge on its own. The diagram below is kept in step with the workflows by the `flow-rule` check.

![Flow of the Ripples software factory, from factory:triage to the pages deploy](docs/factory-flow.svg)

Detail for every step: [docs/factory.md](docs/factory.md).

## Privacy

No accounts, no tracking, no server. The child's name, language and badges stay in the browser on the device. Parents can save and restore progress with a code (gear icon, behind a small maths question). Never put names or photos in this repository: it is public.

## Working with AI agents

- Rules and definition of done: [AGENTS.md](AGENTS.md)
- Architecture map: [ARCHITECTURE.md](ARCHITECTURE.md), vocabulary: [GLOSSARY.md](GLOSSARY.md), decisions: [docs/adr](docs/adr)
- Project skills: [.claude/skills](.claude/skills) (`/demo`)
- Matt Pocock skills (`/grill-with-docs`, `/wayfinder`, `/triage`, `/handoff`, `/tdd`) are enabled in `.claude/settings.json`. Install once per clone:

```bash
claude plugin install mattpocock-skills@claude-plugins-official --scope project
```

## License

Source-available, free for noncommercial use: practise DevOps on it, learn from it, run it yourself. Commercial use is not allowed. Code is PolyForm Noncommercial 1.0.0, lesson content is CC BY-NC-ND 4.0. Details: [LICENSING.md](LICENSING.md).

## Support

If this saved you time, you can [buy me a coffee](https://ko-fi.com/sunnyredhu).
