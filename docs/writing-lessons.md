# Writing a lesson

One lesson is one file: `web/src/content/<id>.tsx` exporting `lesson: Lesson` (type in `web/src/lesson/types.ts`). The first lesson, `web/src/content/money.tsx`, is the reference. Copy its structure.

## What a lesson is

Story (5 to 8 beats), then a toy the child plays with, then 3 questions, then a badge, then an "In real life" card (Germany, euros), then an "Ask Dad" question. The engine (`web/src/lesson/LessonRunner.tsx`) does all of that. A lesson file only provides content and the toy.

## Animated story beats

Prefer `animatedBeat(lines, Diagram, mood?)` from `web/src/lesson/toolkit.tsx` over emoji `scene` beats. Each tap shows the next line and the next part of the diagram. The money lesson (`web/src/content/money.tsx`, `money.diagrams.tsx`) is the reference.

- **Lines:** 2 to 6 per beat, one idea each, written like a friendly teacher talking to the child: warm full sentences, not caption fragments. Say what a job is called ("Finn is a fisherman. That means his job is to catch fish.").
- **Terms:** when a new word first appears, name it and say what it is called, in all three languages: "Swapping things without any money has a name. It is called _barter_." Put the word between _stars_; the app highlights it and reads it without the stars. EN, DE and PL must have the same number of starred terms on every line (`content.test.ts` compares EN and DE today; check PL yourself). Also show the word on a `TermChip` in the diagram.
- **Diagram:** a component receiving `{ lang, step }`. Show a part with `step >= n` (parts mount on their tap and pop in). Build from `web/src/components/diagram.tsx` and the SVG icons in `web/src/components/icons.tsx`. Add new icons there, flat shapes, no emoji. Use icons and arrows rather than text; a name or term label must work in all three languages.
- **Canvas:** 640 x 280. Check every tap in a browser at 1366x768, on an iPad-size window, and in German and Polish.

## Rules

1. **Reader:** an 8-year-old who reads simply. Story beats (or each line of an animated beat): one idea each, at most 190 characters in English, short sentences, concrete things (fish, bread, coins) before any word like "economy".
2. **Three languages, written together.** English, German and Polish for every text. German is natural child German (du-form, "Papa"), not a word-for-word copy. Check grammar and umlauts: write ä, ö, ü and ß, never ae, oe, ue or ss for them (`web/src/germanSpelling.test.ts` fails on them). Polish is natural child Polish (informal "ty", "Tata"), not a word-for-word copy.
3. **No em dashes or en dashes** anywhere (tests fail on them). No filler, no "Great job!" padding.
4. **The world:** Ripple Town. Otto the otter is the guide. Recurring cast: Finn (fisherman), Bea (baker), Sam (shoemaker). Add new town people if needed (for example Mayor Moss in the tax lesson). Town money is "coins". Do not reuse a lesson's toy idea from another lesson. Otto and the Ripple Town cast keep their names in every language. Other story characters get a name that fits each language:
   - EN: Indian names. Girls Aish, Anjali, Kriti; boys Abhi, Arjun, Karan, Aarav.
   - DE: German names. Girls Mia, Lena, Sophie; boys Lukas, Felix, Jonas, Leon.
   - PL: Polish names. Girls Zofia, Maja, Alicja; boys Jan, Aleksander, Antoni, Stanisław. Never use "Bartek" anywhere in Polish text.
   - Exception: the `fx` lesson names real countries in its main story (EN India to Germany, DE Germany to India, PL Poland to India). The whole point is that the same coins buy a different, moving amount across a real border. Other lessons may not do this; issue #208 decides if that changes.
5. **Build on earlier lessons only.** Order: money, work, savings, loans, banks, interest, taxes, inflation, printing, rates. A lesson may use ideas from lessons before it, never after it. A word from a later lesson may be named once as "you will learn about this later" and not explained.
6. **Toy:** free play, no score, one clear idea, 1 to 3 controls (use `Slider`, `ToyButton`, `Stage` from `web/src/lesson/toolkit.tsx`). Cause and effect must be visible at once (a number or picture changes). It must fit a 1366x768 laptop screen without scrolling inside the lesson body. Mouse, trackpad and keyboard must work (native buttons and range inputs do).
7. **Questions:** exactly 3, at least one `widget` question (the child does something in a toy and presses `CheckButton`; call `onAnswer(true|false)` only on that press). A wrong answer gets a `hint` that explains, never "wrong". Choice questions have one correct option; vary which position is correct. Do not make a question answerable by length or by the only serious-sounding option.
8. **Real life card:** Germany and euros, 2 to 4 sentences. Use only facts you verified. Prefer facts that stay true (institution names, rules) over numbers that change; if you use a number, say "about" and record the date in the fact card.
9. **Fact card:** at least 5 claims, each with an https source you actually opened and that supports the claim: official or institutional sources first (ECB, Bundesbank, Destatis, BMF, Bundesregierung, Verbraucherzentrale, Fed or Bank of England explainers, university or encyclopedia pages). For every simplification the lesson makes, add a line in `simplified` saying what was simplified and why it is fair. If a source cannot be opened or does not say it, replace it. Do not cite from memory. English only.
10. **No product or brand advice.** Never name a specific bank or financial product as a recommendation. Nothing the child could read as investment advice.
11. **Physical anchor:** before any technical or economic concept, anchor it in an everyday object or kid activity (pizza slices, sneaker drops, lemonade, a gaming PC build, dominoes, a light switch). Use direct, concrete, everyday words in all three languages.
12. **Length caps** (CI checks all four in `web/src/content/content.test.ts`):
    - Story sentences: at most 15 words.
    - Diagram labels and badges: at most 4 words each, in every language. Icons and arrows carry the meaning; a diagram must lower reading effort, not add to it.
    - Question prompts: at most 20 words, clear and conversational.
    - Answer options: under 15 words, one clause, no walls of text.
    - Distractors: plausible but distinct, in a fun and gentle tone.
13. **Facts from today:** the current date is late October 2026. Use web search for anything time-sensitive (rates, minimum wage, deadlines).
14. **Otto has no gender in the text.** Otto speaks with a female voice and keeps the name Otto. Never give Otto a pronoun, and never let Otto use a word that shows a gender for itself (Polish past forms such as "byłem" or "byłam", German "ich bin ein..." with a gendered noun). Rephrase in the present tense ("Widzę to") or leave Otto out of the sentence.

## Mechanics

- Lesson-specific styles go in `web/src/content/<id>.css`, imported from your tsx. Do not edit `web/src/styles.css`, `web/src/lesson/*`, `web/src/lessons.ts`, `web/src/content/index.ts` or other lessons' files. If you need a shared change, say so in your final report instead of making it.
- Write multilingual text with a local helper: `const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });`
- `npm test` runs `web/src/content/content.test.ts` over your lesson automatically (structure, all three languages, no dashes, sources). Add your own tests next to your file only if the toy has real logic worth testing.
- `npm run build` must pass (type check included).
- Look at it in a browser if you can: `npx vite preview --port <your port>` after a build, then walk the whole lesson (story, toy, wrong answer, right answer, widget question, badge). To unlock your lesson, run the API locally (Self-host mode, the Login code is in the API log), log in, add a profile, and in family settings (gear icon, maths gate) turn off the lessons before yours for that profile. Your lesson then becomes the next stop. Check German and Polish too.

## Voice files

Otto reads every line in a speech bubble aloud from a voice file (`web/public/audio/<lang>/`). When you add or change a line Otto says (story line, toy intro, quiz prompt or hint, or a bubble text in `web/src/i18n.ts`):

1. **Numbers get a spoken version.** If the line has a digit or a Roman numeral, add it to `web/src/voice/spoken.<lang>.json`: the key is the line as shown (stars removed), the value is the same sentence with every number written out the way a teacher reads it aloud (EN "In 1963" becomes "In nineteen sixty-three"; DE "1963" becomes "neunzehnhundertdreiundsechzig"; PL "W 1963 roku" becomes "W tysiąc dziewięćset sześćdziesiątym trzecim roku", in the right case). Change only the numbers. Remove the entry of a line you deleted or changed.
2. **Run `npm run voices`.** It renders only the lines without a file and deletes files no line uses. Commit the new files in `web/public/audio/` and the changed `web/src/voice/manifest.<lang>.json` with the text change.
3. `npm test` fails until both are done (`web/src/voice/voice.test.ts`).

`npm run voices` needs [uv](https://docs.astral.sh/uv/) and ffmpeg (`brew install uv ffmpeg`). The first run downloads about 740 MB of voice models into `scripts/voices/.cache/` (pinned versions, checked by sha256). One line takes 1 to 2 seconds; a full render of all three languages (a new voice or speed in `web/src/voice/voices.json`) takes about 2 hours on an M1 Pro.
