# ADR 0013: Separate web and server packages

## Status

Accepted.

## Context

The app and the API lived in one npm package. The backend image needs only the API's runtime dependencies, and the frontend image needs only the built app. One `package.json` made the backend Docker build either install everything or need a second install stage, and it hid which dependency belongs to which service. The API already shared no code with the app except one type that only the API used.

## Decision

1. `web/` (React, Vite, `web/e2e/`) and `server/` (Hono API) each have their own `package.json` and `package-lock.json`. They share no code.
2. The repo root keeps docs, CI, `scripts/` and the repo-wide tools (oxlint, oxfmt). Its `package.json` forwards `test`, `typecheck`, `build` and `dev` to the two packages.
3. The API serves the built app only when `DIST_DIR` is set. The backend image does not set it, so it serves `/api` only.
4. Each Docker image builds from the repo root and copies only its own folder.

## Consequences

- The backend image installs and builds once, then `npm prune --omit=dev`.
- `npm ci` runs in four places (root, `web/`, `server/`, `web/e2e/`). `npm run install:all` covers the first three.
- Paths in CI, `gate-paths.txt` and agent prompts moved under `web/`.
- A pull request that changes a lockfile in either package goes to the human gate, as the root one did.
