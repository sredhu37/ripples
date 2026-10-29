# Writing a lesson

One lesson is one file: `src/content/<id>.tsx` exporting `lesson: Lesson` (type in `src/lesson/types.ts`). The first lesson, `src/content/money.tsx`, is the reference. Copy its structure.

## What a lesson is

Story (5 to 8 beats), then a toy the child plays with, then 3 questions, then a badge, then an "In real life" card (Germany, euros), then an "Ask Dad" question. The engine (`src/lesson/LessonRunner.tsx`) does all of that. A lesson file only provides content and the toy.

## Rules

1. **Reader:** an 8-year-old who reads simply. Story beats: one idea each, at most 190 characters in English, short sentences, concrete things (fish, bread, coins) before any word like "economy".
2. **Two languages, written together.** English and German for every text. German is natural child German (du-form, "Papa"), not a word-for-word copy. Check grammar and umlauts.
3. **No em dashes or en dashes** anywhere (tests fail on them). No filler, no "Great job!" padding.
4. **The world:** Ripple Town. Otto the otter is the guide. Recurring cast: Finn (fisherman), Bea (baker), Sam (shoemaker). Add new town people if needed (for example Mayor Moss in the tax lesson). Town money is "coins". Do not reuse a lesson's toy idea from another lesson.
5. **Build on earlier lessons only.** Order: money, work, savings, loans, banks, interest, taxes, inflation, printing, rates. A lesson may use ideas from lessons before it, never after it. A word from a later lesson may be named once as "you will learn about this later" and not explained.
6. **Toy:** free play, no score, one clear idea, 1 to 3 controls (use `Slider`, `ToyButton`, `Stage` from `src/lesson/toolkit.tsx`). Cause and effect must be visible at once (a number or picture changes). It must fit a 1366x768 laptop screen without scrolling inside the lesson body. Mouse, trackpad and keyboard must work (native buttons and range inputs do).
7. **Questions:** exactly 3, at least one `widget` question (the child does something in a toy and presses `CheckButton`; call `onAnswer(true|false)` only on that press). A wrong answer gets a `hint` that explains, never "wrong". Choice questions have one correct option; vary which position is correct. Do not make a question answerable by length or by the only serious-sounding option.
8. **Real life card:** Germany and euros, 2 to 4 sentences. Use only facts you verified. Prefer facts that stay true (institution names, rules) over numbers that change; if you use a number, say "about" and record the date in the fact card.
9. **Fact card:** at least 5 claims, each with an https source you actually opened and that supports the claim: official or institutional sources first (ECB, Bundesbank, Destatis, BMF, Bundesregierung, Verbraucherzentrale, Fed or Bank of England explainers, university or encyclopedia pages). For every simplification the lesson makes, add a line in `simplified` saying what was simplified and why it is fair. If a source cannot be opened or does not say it, replace it. Do not cite from memory. English only.
10. **No product or brand advice.** Never name a specific bank or financial product as a recommendation. Nothing the child could read as investment advice.
11. **Facts from today:** the current date is late October 2026. Use web search for anything time-sensitive (rates, minimum wage, deadlines).

## Mechanics

- Lesson-specific styles go in `src/content/<id>.css`, imported from your tsx. Do not edit `src/styles.css`, `src/lesson/*`, `src/lessons.ts`, `src/content/index.ts` or other lessons' files. If you need a shared change, say so in your final report instead of making it.
- Write bilingual text with a local helper: `const T = (en: string, de: string): Text => ({ en, de });`
- `npm test` runs `src/content/content.test.ts` over your lesson automatically (structure, both languages, no dashes, sources). Add your own tests next to your file only if the toy has real logic worth testing.
- `npm run build` must pass (type check included).
- Look at it in a browser if you can: `npx vite preview --port <your port>` after a build, then walk the whole lesson (story, toy, wrong answer, right answer, widget question, badge). Set `localStorage` key `ripples.progress.v1` to `{"name":"Mia","lang":"en","muted":true,"badges":[<earlier ids>]}` to unlock your lesson. Check German too.
