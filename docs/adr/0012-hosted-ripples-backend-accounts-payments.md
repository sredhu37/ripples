# ADR 0012: Hosted Ripples: repos, backend, database, accounts and payments

## Status

Accepted (19.11.2026). Full record with facts checked: issue #210.

## Context

Ripples ran as a static app on GitHub Pages: lessons in code, one child's progress in the browser's localStorage, moved between devices with a save code. Sunny wants three audiences on one codebase: parents who pay for a hosted version (EUR 5 or INR 500 a month, first month free), self-hosters who run it for free under the noncommercial license, and SREs who learn from watching it be deployed. A paid hosted version needs to know who paid and needs progress that follows a family across devices.

## Decision

1. **Repos.** `ripples` (public) holds the app, API, DB schema and Dockerfile. `ripples-demo` (public) becomes infra only: Terraform and teaching material that deploy the `ripples` image. Production Terraform lives in the private `sunny-redhu-engineering` repo. Public is anything people learn from or run; private is anything touching live customers, money or secrets.
2. **Lessons stay in git.** The database stores only what users create: accounts, kid profiles, progress and subscriptions. Who writes the data decides where it lives.
3. **PostgreSQL everywhere.** Docker for local dev and self-hosting, Cloud SQL in the teaching demos, Neon free tier for production now, Cloud SQL once paying users cover it. Firestore was rejected because self-hosters cannot run it.
4. **Region Frankfurt** for app and database (Cloud Run `europe-west3`, Neon `aws-eu-central-1`).
5. **Own GCP project `ripples-prod`** on Sunny's existing billing account, with its own budget.
6. **API in TypeScript on Node**, in this repo, sharing types with the app.
7. **One parent account per family, with kid profiles.** Kids never log in. A profile stores a nickname and progress.
8. **Parent login by 6-digit email code** (Better Auth Email OTP, Resend), with long sessions.
9. **Stripe for the rest of the world, Razorpay for India.** Stripe (German account) handles EUR subscriptions everywhere except India. India pays INR through Razorpay via Sunny's Indian business, with the region rule `IN` vs everyone else. Stripe UPI is not available for the German account ("UPI is not supported for your business type"), so Stripe-only for India was dropped (#222).
10. **Free month without card.** After 30 days lessons pause until payment; profiles and progress are kept.
11. **Self-host runs the same image.** No Stripe key turns billing off; no email sender prints the login code to the API log. Save codes and the GitHub Pages deploy are retired, with a one-time import of localStorage progress into a kid profile.

## Consequences

- The app gains a server: one container image serves the app and the API, with Postgres beside it.
- The save code, `src/progress.ts` localStorage storage and `pages.yml` are replaced in the build tickets that follow #210.
- Kids' nicknames are personal data of children: the privacy policy must cover them before launch.
- Neon's free plan has no spending notifications and suspends compute until next month when the 100 CU-hours run out, so production needs its own usage alert.
- Two payment integrations are needed (Stripe and Razorpay) behind one provider-neutral subscription status.
