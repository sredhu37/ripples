# Ripples

A web app that explains how the real world works (money, taxes, governments, history, technology) to an 8-year-old, with Otto the otter as guide. English and German.

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-Ko--fi-FF5E5B?logo=kofi&logoColor=white)](https://ko-fi.com/sunnyredhu)

Each lesson is a short story, then a toy the child can play with, then three questions. A badge is earned when all three are right. Wrong answers get a hint, never a red cross.

Live site: https://sredhu37.github.io/ripples/ (add it to the iPad home screen; it works offline after the first visit).

## Status

| Group | Lessons | State |
| --- | --- | --- |
| Money and Work | 10 | All 10 lessons written (EN and DE), fact cards waiting for Sunny's review |
| Business, Markets, Governments, History, Technology | to be planned | Not started |

The full list of design decisions is in [docs/design.md](docs/design.md).

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173/ripples/
npm test         # progress and save-code tests
npm run build    # type check + production build into dist/
```

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

## Support

If this saved you time, you can [buy me a coffee](https://ko-fi.com/sunnyredhu).
