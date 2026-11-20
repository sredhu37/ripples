# Ripples

A web app that explains how the real world works (money, taxes, governments, history, technology) to an 8-year-old, with Otto the otter as guide. English and German.

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-Ko--fi-FF5E5B?logo=kofi&logoColor=white)](https://ko-fi.com/sunnyredhu)

Each lesson is a short story, then a toy the child can play with, then three questions. A badge is earned when all three are right. Wrong answers get a hint, never a red cross.

Live site: https://sredhu37.github.io/ripples/ (add it to the iPad home screen; it works offline after the first visit).

## Prerequisites

| Tool                     | Version | Used for                                     |
| ------------------------ | ------- | -------------------------------------------- |
| Node.js (via nvm)        | 26      | App, API, tests (version pinned in `.nvmrc`) |
| PostgreSQL (with `psql`) | 17      | The API's database, running on your machine  |
| Git                      | any     | Clone and worktrees                          |

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

# Node 26 (reads .nvmrc)
nvm install
nvm alias default 26

# PostgreSQL 17 (keg-only, so add it to PATH), started now and at login
brew install postgresql@17
echo 'export PATH="/opt/homebrew/opt/postgresql@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
brew services start postgresql@17
```

Linux or without Homebrew: install nvm with its [install script](https://github.com/nvm-sh/nvm#installing-and-updating) and run `nvm install`. Install PostgreSQL 17 from your package manager or the [PostgreSQL downloads](https://www.postgresql.org/download/) page.

Check:

```bash
node -v             # v26.x
psql --version      # psql (PostgreSQL) 17.x
pg_isready          # accepting connections
```

## Running locally

### 1. Install dependencies

```bash
nvm use             # reads .nvmrc, selects Node 26
npm run install:all # npm ci in the root, web/ and server/
```

### 2. Environment variables

None are needed for local development. There is no `.env` file: the app does not load one. The defaults are:

| Variable       | Default in dev                                      | Notes                                                                            |
| -------------- | --------------------------------------------------- | -------------------------------------------------------------------------------- |
| `DATABASE_URL` | `postgres://ripples:ripples@localhost:5432/ripples` | The database from step 3. Required in production. Neon needs `?sslmode=require`. |
| `PORT`         | `8080`                                              | API port. Vite proxies `/api` to it, so change `web/vite.config.ts` too.         |
| `NODE_ENV`     | unset                                               | `production` makes `DATABASE_URL` required.                                      |
| `DIST_DIR`     | unset                                               | Built app the API serves at `/`. Unset: the API serves `/api` only.              |

One exception: `npm run migrate` has no default, so pass the URL yourself (next step).

### 3. Database

Create the `ripples` user and database once. On macOS, Homebrew makes your own macOS user a Postgres superuser, so no `sudo` is needed:

```bash
psql postgres -c "CREATE ROLE ripples LOGIN PASSWORD 'ripples'"
createdb -O ripples ripples
DATABASE_URL=postgres://ripples:ripples@localhost:5432/ripples npm run migrate
```

On Linux, run the first two commands as the `postgres` user: `sudo -u postgres psql -c "..."` and `sudo -u postgres createdb -O ripples ripples`.

`migrate` creates the tables on the first run and prints `No migrations to run!` on later runs. Migrations are a separate command, not part of API startup. The migration tests create and drop a throwaway database, so the role needs `CREATEDB` (`psql postgres -c "ALTER ROLE ripples CREATEDB"`). Other commands:

```bash
psql postgres://ripples:ripples@localhost:5432/ripples   # shell
brew services stop postgresql@17                           # stop Postgres (data stays)
dropdb ripples && dropuser ripples                         # delete the database and user
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
npm run build       # app to web/dist/, API to server/dist/
npm start           # production twin: one process on :8080 serves the app and /api (run build first)
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
