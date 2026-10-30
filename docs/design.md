# Design decisions

Settled with Sunny before building. Change one only by naming it as a change.

## Product

1. **Audience:** a family tool for one child (age 8). No accounts, no product features.
2. **Lesson shape:** story, then toy, then 3 questions, about 5 minutes.
3. **Languages:** English and German with a switch. Every lesson is written in both.
4. **Scope order:** Money and Work first. Then Business, Markets, Governments, History, Technology (dependency order, groups 2 and 4 can swap).
5. **Real world link:** every lesson ends with an "In real life" card in Germany and euros.
6. **Parent role:** the child plays alone. One "Ask Dad" question per lesson. No parent dashboard.
7. **Fact check:** every lesson has a fact card (5 claims, a source each, what was simplified and why). Sunny approves it before the lesson goes live.
8. **Out of scope for now:** how to present sensitive history (world wars, colonization, slavery) fairly. Decide before the History group.

## Group 1 lessons, in order

1. What is money? 2. Work and pay 3. Savings 4. Loans 5. Banks 6. Interest 7. Taxes 8. Prices and inflation 9. Why not print money? 10. Interest rates up and down

Lessons unlock in order: the next one opens after the badge. Finished lessons can be replayed.

## Group 2 lessons (Business), in order

11. Costs and profit (profit)
12. Making sales (sales)
13. Small and big prices (ticketsize)
14. Market share (marketshare)
15. Friendly competition (competition)
16. Spreading the word (marketing)
17. Hiring and risk (hiring)
18. Big and small business (scale)

See docs/adr/0001-group-2-business-curriculum.md for the full curriculum and toy mechanics specification.

## Experience

- **Map and badges.** A trail on a map with one stop per lesson, and a shelf of badges. No coins, no streaks, no timers.
- **Quiz rule.** A wrong answer gets a hint and a retry, with no red cross. The badge comes after all 3 are right. Toy actions (set the slider so bread stays at 2 coins) are mixed into the questions so random tapping does not pass.
- **Guide.** Otto the otter, drawn as flat SVG, with CSS animation. Art is code, not generated images.
- **Voice.** Every speech bubble has a read-aloud button using the device voice (Web Speech API). No audio files.
- **Sound effects.** Synthesized with Web Audio (tap, correct, hint, badge), with a mute button. The iPad needs a first tap before audio plays.
- **Name.** The child types a first name once. It lives on the device only.

## Technology and hosting

- React, TypeScript and Vite. Output is static files.
- Public GitHub repo `sredhu37/ripples`, deployed by GitHub Action to GitHub Pages at `/ripples/`. No personal names in the repo.
- Progress is saved in browser storage on the device (name, language, mute, badges). Parents get a Save/Restore code (`RIP1.<payload>.<checksum>`) behind a maths gate. No server.
- Offline: a small service worker caches the app after the first visit.
- Tablet first (iPad), also works on phone and Mac. Touch targets are at least 60 px.

## Review status

All 10 group 1 lessons exist. None is approved yet: Sunny reads each fact card in the app (gear icon, maths question, Fact cards) and fixes or approves. German text has not been read by a native speaker.
