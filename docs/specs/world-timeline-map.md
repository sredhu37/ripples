# Spec: World timeline as a world map

Status: confirmed by Sunny, 2026-11-24. Idea and grilling: [World-map timeline idea](https://github.com/sredhu37/ripples/issues/373). Every decision links the issue or comment that holds its reasoning.

## Summary

The World timeline screen becomes a world map. A slider picks a period. The map draws the borders of that time, and pins show what was happening where. Tapping a pin opens a thought cloud where Otto tells one sentence, with a Read more button when a lesson exists. The map replaces the old list screen.

```
Trail ──► World timeline
           ┌──────────────────────────────────────────┐
           │  world map, borders of the map year       │
           │     (pin)  (pin)   ( 3 )  cluster          │
           │         ┌──────────────────┐              │
           │         │ Otto: one line    │ Read more ─► lesson
           │         └──────────────────┘              │
           │  [ Ancient | Middle Ages | ...  | Digital ] │  era band
           │  ◄ Earlier  •──•──•──●──•──•  Later ►      │  22 stops
           └──────────────────────────────────────────┘
```

## 1. Screen

Decided: [layout comment, variant D](https://github.com/sredhu37/ripples/issues/373). Prototype for reference only: branch `prototype/timeline-map` (throwaway, never merged).

1. The thought cloud opens on top of the map at the pin. Otto sits inside the cloud and tells the line. Closing the cloud shows the pins it covered. No Otto panel beside the map.
2. The selected pin is drawn at 1.7 times its size.
3. The map zooms (pinch, scroll wheel, + and - buttons) and pans (drag). Pins closer than 44 px on screen at the current zoom group into a bubble with a count; tapping the bubble zooms in on it.
4. Phones and portrait iPads start on Europe to Asia instead of the full width.
5. Read more opens the matching existing lesson. The button shows only where a lesson exists. Short story pages per pin come later and are not part of this spec.
6. Pin labels name the present-day country only ("India", not "Bengal" or "British India").
7. The map shows one credit line: "Historical borders derived from Cliopatria (Seshat Global History Databank, CC BY 4.0)". Decided: [decisions comment](https://github.com/sredhu37/ripples/issues/373#issuecomment-7143064575).
8. Accessibility: every pin and cluster is a button with a label (country, year, title). The slider and era band work with a keyboard.

## 2. Slider and eras

Decided: [decisions comment](https://github.com/sredhu37/ripples/issues/373#issuecomment-7143064575), item 9, plus Q9 below.

22 stops. A pin belongs to the last stop at or before its map year.

| Era (band)                | Stops                                                         |
| ------------------------- | ------------------------------------------------------------- |
| Ancient Civilizations     | 3000 BCE, 600 BCE                                             |
| Silk Road and Middle Ages | 500, 1000                                                     |
| Global Trade and Empires  | 1500                                                          |
| Scientific Revolution     | 1600, 1700                                                    |
| Industrial Revolution     | 1800, 1850                                                    |
| The 20th Century          | 1900s, 1910s, 1920s, 1930s, 1940s, 1950s, 1960s, 1970s, 1980s |
| Digital and Modern Era    | 1990s, 2000s, 2010s, 2020s                                    |

1. The slider looks clickable: a "Pick a time" box with a hint, labelled stops, a big orange thumb, an orange fill up to the current stop, and Earlier and Later buttons.
2. The 7 existing eras show as a band above the stops. Tapping a band jumps to its first stop. Band names are the existing era labels in `web/src/timeline/data.ts`.
3. Era ranges no longer overlap: The 20th Century ends in 1989 and the Digital and Modern Era starts in 1990.
4. On phones only the current era's name shows in the band; the full band appears from tablet width.
5. Q9 (Sunny, 2026-11-24): the first two stops are 3000 BCE and 600 BCE, so the Pyramids of Giza (2560 BCE) and Athens (508 BCE) land on the right stop.

## 3. Pins

Decided: [decisions comment](https://github.com/sredhu37/ripples/issues/373#issuecomment-7143064575), items 1 to 4, plus Q10 below.

| Rule      | Detail                                                                                                                                                                            |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Count     | Every stop has 4 to 8 pins, in at least 3 different present-day countries (Q10: this holds before 1900 too; Sunny raised the cap from 6 to 8 on review, 2026-11-24)               |
| One pin   | One event at one place. Science events are normal pins.                                                                                                                           |
| Map year  | Each pin keeps its displayed year text ("1939 to 1945") and has one map year: the start year. The map draws that year's borders while the pin is open.                            |
| Line      | One sentence, in EN, DE and PL. ADR 0004 applies: mechanisms not graphic violence, regimes not peoples ("the Nazi government", never "the Germans"), no death counts, no methods. |
| Source    | One https source per pin. War, genocide, partition and famine pins need an institution (museum, UN, archive), not Wikipedia. A test checks both.                                  |
| Fact card | As today: a pin shown in a lesson's Meanwhile card also appears on that lesson's fact card with its source.                                                                       |

Pin fields:

| Field        | Meaning                                                                               |
| ------------ | ------------------------------------------------------------------------------------- |
| `id`         | Stable id, unchanged for the 55 existing events                                       |
| `year`       | Displayed year text (EN, DE, PL), as today                                            |
| `mapYear`    | Integer, negative for BCE. Start year of the event.                                   |
| `title`      | Short title (EN, DE, PL)                                                              |
| `line`       | The one sentence Otto tells (EN, DE, PL)                                              |
| `country`    | Present-day country, used for the label                                               |
| `lon`, `lat` | Where the pin sits                                                                    |
| `source`     | https URL                                                                             |
| `sensitive`  | true for war, genocide, partition and famine pins; then `source` may not be Wikipedia |
| `lessonId`   | Optional. Target of Read more.                                                        |

Content gap today, counted from `web/src/timeline/data.ts`:

| Stops               | Pins today | New pins needed (minimum)                                                                                         |
| ------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------- |
| 9 stops before 1900 | 31         | 10 (600 BCE +1, 500 +3, 1700 +3, 1800 +3)                                                                         |
| 13 decades          | 24         | 34 (1900s +3, 1910s +1, 1920s +2, 1930s +3, 1950s +4, 1960s +2, 1970s +4, 1980s +2, 1990s +4, 2010s +3, 2020s +3) |
| 1940s               | 7          | 0, all 7 stay (cap is 8)                                                                                          |

The "at least 3 countries" check may add more.

## 4. Borders

Decided: [Research: historical border maps](https://github.com/sredhu37/ripples/issues/374) (resolution), [Research: border data before 1900](https://github.com/sredhu37/ripples/issues/380), ADR 0016, [decisions comment](https://github.com/sredhu37/ripples/issues/373#issuecomment-7143064575) items 7 and 8.

| Map year       | Border source                                                                  | Licence                             |
| -------------- | ------------------------------------------------------------------------------ | ----------------------------------- |
| 1900 and later | OpenHistoricalMap country boundaries                                           | CC0                                 |
| Before 1900    | Cliopatria (Seshat Global History Databank)                                    | CC BY 4.0, credit line in section 1 |
| Every year     | Coastlines: every shape is clipped to Natural Earth land                       | Public domain                       |
| Every year     | India's outline: Natural Earth India POV, `ne_10m_admin_0_countries_ind` 5.1.1 | Public domain                       |

1. **India, hard rule (ADR 0016):** wherever borders are disputed, the map shows India as Indian law defines it. PoK and Gilgit-Baltistan, Aksai Chin, Shaksgam, Arunachal Pradesh and the other northeast areas, Kalapani and Sir Creek are part of India.
2. **From 1858:** India's outline (British India before 1947) is the India POV shape, cut out of every neighbour so no area belongs to two countries.
3. **Before 1858:** the dynastic borders stay (Mughal, Vijayanagara, Maratha and others). No foreign power (Qing, Tibet, Afghan or others) is drawn inside the India POV outline; overlaps are clipped away.
4. **Build failure:** the build fails if India is missing from the India POV file. No fallback to a source's own line.
5. **Colours:** a country keeps one colour in every period; only its borders change. Each historical shape takes the colour of the present-day country it covers most, using the India POV file as the present-day map. No colour per empire or ruler.
6. **No live fetching:** border files are generated by a script and committed. The app never calls OpenHistoricalMap or Cliopatria.
7. **Date:** with a pin open, the map draws the pin's map year. With no pin open, it draws the stop's default year (Implementation defaults).

## 5. What is removed

Decided: [decisions comment](https://github.com/sredhu37/ripples/issues/373#issuecomment-7143064575), item 5.

1. The old World timeline screen: era chips, region chips and text cards per region, and their tests.
2. The `region` field and the region labels (`regionIndia` and others), once nothing else uses them.
3. Not affected: the Meanwhile card in Group 5 lessons and the fact cards.

## 6. Glossary

Decided: [decisions comment](https://github.com/sredhu37/ripples/issues/373#issuecomment-7143064575), item 6. Applied in the same PR as this spec.

| Term                              | Change                                     |
| --------------------------------- | ------------------------------------------ |
| World timeline                    | Reworded: the world map with a slider      |
| Pin, Thought cloud, Map year, Era | New                                        |
| Track                             | Removed                                    |
| Trail                             | Reworded so "map" means only the world map |

## 7. Implementation defaults

Chosen while writing this spec, not grilled. Sunny checks these.

| #   | Default                                                                                                                                         | Why                                                                                |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| D1  | With no pin open, a stop draws its start year (1940s draws 1 January 1940; 1500 draws 1500).                                                    | Simplest rule; #374 left it to the build.                                          |
| D2  | One border file per distinct map year plus one per stop default, loaded on demand when a stop or pin opens.                                     | About 100 map years at 45 to 65 KB each would be 5 MB or more if bundled.          |
| D3  | The build fails if any pin's map year or any stop has no border file.                                                                           | Same spirit as the India build failure.                                            |
| D4  | Land with no polity in the data is drawn in a neutral colour with no label.                                                                     | Cliopatria leaves 97% of land blank at 3000 BCE and 54% at 1800.                   |
| D5  | Pins whose point falls just outside a shape (Syracuse at 250 BCE in the sea, Meerut 1857 in a gap) are moved onto land by hand in the pin data. | Research left both open; a hand fix is one number per pin.                         |
| D6  | The Olmec pin (1200 BCE) shows with no border around it.                                                                                        | No source has an Olmec polity.                                                     |
| D7  | This spec lives at `docs/specs/world-timeline-map.md`.                                                                                          | No specs folder existed.                                                           |
| D8  | Land that no polity held is drawn from one shared file, `web/public/borders/land.json`, under every map. The border files hold shapes only.     | D4 needs ground to draw neutral; one 67 KB file beats 102 copies.                  |
| D9  | A border file is JSON with one polyline-encoded ring list per shape (`web/src/timeline/borders.ts` decodes it), at most 70 KB.                  | Four bytes a point instead of fifteen, so coasts keep about four times the detail. |

## 8. Known limits

1. Border detail was not compared against a reference atlas. Sunny reviews each map once in the build ([#374](https://github.com/sredhu37/ripples/issues/374) deferred).
2. OpenHistoricalMap gaps in 1942 (Oman, Yemen, UAE) and 1900 (Egypt) are filled in the build from Natural Earth or fixed in OpenHistoricalMap itself.
3. Maps before 1000 are mostly empty land: that is the state of the data, not a bug.
4. The Natural Earth India outline (ADR 0016) holds only the western part of the Shaksgam Valley; the rest of the valley is drawn as China. Coasts are simplified to 0.08 to 0.2 degrees to keep each file under 70 KB.
