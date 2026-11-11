# ADR 0007: Group 1 Entrepreneurship, Ownership, and Equity Lessons

## Status

Accepted

## Context

Lesson 2 ("Work and pay") introduces the concept of employment: trading hours of labor for wages. Lesson 3 ("Savings") introduces accumulating surplus coins in a piggy bank as seed capital.

Previously, the curriculum moved directly from savings to borrowing ("Loans") and "Banks". This sequence had an educational gap:

1. It framed earning solely through an employee mindset (hourly wage for physical labor).
2. It failed to explain why business owners or leadership can earn significantly more than employees, or how income can scale without working 24 hours a day.
3. It omitted the concept of business risk (an employee earns guaranteed pay rain or shine; an owner takes the downside risk of losses).
4. It omitted the distinction between physical labor and productive assets (equity, co-ownership, and passive income while away).

## Decision

We expand Group 1 from 10 to 12 lessons (expanding the full Ripples curriculum from 50 to 52 lessons), inserting two foundational lessons immediately following Lesson 3 ("Savings"):

### Lesson 4: Starting a business (`business`)

- **Core concept**: The transition from worker to founder. Finn invests 10 saved coins to build an ice cream cart with wheels.
- **The Good Day**: Finn hires friend Leo as an employee at 2 coins an hour. They sell 30 scoops. After paying Leo and paying for ingredients, Finn keeps 20 coins of profit.
- **The Rainy Day**: Storm clouds roll in and nobody visits the park. 0 scoops sold and cream melts. Leo still receives his guaranteed wage of 4 coins. Finn suffers a loss of 6 coins from his savings.
- **Vocabulary introduced**: `Owner`, `Employee`, `Profit`, `Loss`.

### Lesson 5: Assets and equity (`equity`)

- **Core concept**: Assets producing value without constant personal presence, and shared ownership.
- **Earning while away**: While Finn is in school, Leo operates the cart at the town fountain. Coins are earned through passive income from the productive asset.
- **The Upgrade**: A warm waffle-cone press costs 10 coins. Friend Mira invests 10 coins to become a 50% co-owner.
- **Equity and profit split**: Mira owns a 50% equity share in the cart. After paying Leo and ingredients, Finn and Mira split the net profit equally each week.
- **Vocabulary introduced**: `Asset`, `Passive income`, `Equity`, `Co-owner`.

### Cultural Anchors

- **Germany (DE - €)**: Handwerker, Gastronomen, GbR/GmbH-Beteiligungen, Unternehmerrisiko vs. Tariflohn.
- **India (EN - ₹)**: Local dukaandars, chai carts, partnership firms under the Partnership Act/LLP, equity ownership.
- **Poland (PL - zł)**: Jednoosobowa działalność gospodarcza, spółki cywilne i z o.o., ryzyko gospodarcze vs. etat.

Advanced concepts such as venture capital, burning cash for growth, and stock market IPOs are intentionally kept out of early lessons and reserved for an advanced module.

## Consequences

- Group 1 now covers the complete progression: Money -> Work -> Savings -> Starting a Business -> Assets & Equity -> Loans -> Banks -> Interest -> Taxes -> Inflation -> Central Bank Printing -> Interest Rates.
- Curriculum size increases to 52 lessons.
- Progress save codes support bitmasks up to 52 safely within JavaScript safe integer limits (Math.pow(2, 52) < Number.MAX_SAFE_INTEGER).
