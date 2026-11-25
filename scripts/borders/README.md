# Border files for the world map

`npm run borders` makes the borders the World timeline map draws: one file per map year in `web/public/borders/<year>.json`, and `land.json`, the neutral ground under all of them. Spec: [docs/specs/world-timeline-map.md](../../docs/specs/world-timeline-map.md), section 4. India: [ADR 0016](../../docs/adr/0016-india-borders-on-maps.md).

The files are committed. The app never calls a map source. Run the script only when a pin or stop gets a map year that has no file yet (`web/src/timeline/borders.test.ts` fails and names the year).

## Run it

Needs [uv](https://docs.astral.sh/uv/) (`brew install uv`).

```
npm run borders                   # every map year (about 5 minutes once the cache is warm)
npm run borders -- --years 1942   # only these map years
npm run borders -- sheet          # the contact sheet: scripts/borders/.cache/sheet/page-NN.png
```

The first run downloads about 60 MB of map data and about 1,300 country shapes from OpenHistoricalMap into `scripts/borders/.cache/` (gitignored); that takes 15 to 30 minutes. Later runs reuse the cache. OpenHistoricalMap is live data: a fresh cache a year from now can give slightly different shapes, so the files in git are the record, not a rerun.

## What it does

| Step | File                            | What                                                                                                                                                                                                                                                 |
| ---- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | `inputs.py`, `inputs.json`      | Downloads Natural Earth land, Natural Earth countries (India point of view) and Cliopatria v0.2.1. Each file has a pinned URL and sha256.                                                                                                            |
| 2    | `web/scripts/borders-export.ts` | Writes the map years and pins to `.cache/years.json`: every pin's map year and every stop's start year, 102 in all.                                                                                                                                  |
| 3    | `ohm.py`                        | Fetches OpenHistoricalMap country relations (Overpass) and joins their ways into polygons. A country that ends and starts again under the same name within 2 years is one country with a hole in the data: it keeps its last shape through the hole. |
| 4    | `prep.py`                       | Cuts every source shape to Natural Earth land, thins it a little and finds the present-day country it covers most. Cached in `.cache/prep.pkl`.                                                                                                      |
| 5    | `build.py`                      | Builds each map year (below), writes the file, stops with an error if a file is over 70 KB or a control point is wrong.                                                                                                                              |
| 6    | `sheet.py`                      | Draws every file as a picture, eight maps a page, with an inset of South Asia on each map from 1858.                                                                                                                                                 |

### One map year

1. **Sources.** From 1900 OpenHistoricalMap (CC0), before 1900 Cliopatria (CC BY 4.0). The year starts on 1 January (spec D1).
2. **Gaps.** OpenHistoricalMap has no shape for part of Oman, Yemen and the Emirates, or for Egypt in 1900 (spec section 8.2). Where one of these four present-day countries is not covered, its Natural Earth outline fills the hole. Every other hole stays unassigned: the app draws it neutral (D4).
3. **Simplify.** Every shape is simplified to 0.08 degrees (about 9 km). A file over 70 KB gets a coarser tolerance in steps of 25 percent until it fits; the 1900 to 2023 maps need 0.16 to 0.2. Islands and holes under 0.03 square degrees are dropped.
4. **India** (ADR 0016). The Natural Earth India outline is simplified like every other shape.
   - From 1858 the shape that is India in that year (British India before 1947) takes in the whole outline, and every other shape loses whatever part of it it held. Nothing belongs to two countries.
   - Before 1858 the dynastic borders stay (Mughal, Maratha and others), but a shape of another present-day country loses the part inside the outline.
   - The control points in `web/src/timeline/india-control-points.json` are kept inside India even when simplifying would move the edge past them (Kalapani lies 0.6 km inside the real outline): India grows a disc of 0.04 degrees around such a point.
   - The build fails if India is missing from the India file. There is no fallback.
5. **Colours.** Each shape takes the colour of the present-day country it covers most, using the India point-of-view file as the present-day map. A country has one colour on every map; neighbouring countries differ. India, Russia, Germany and China have fixed colours.
6. **Write.** Coordinates snap to 0.01 degrees. Shapes are sorted big first, so small ones draw on top.

## File format

`<year>.json`:

```json
{
  "year": 1942,
  "shapes": [{ "country": "India", "colour": "#f7b37a", "rings": ["_p~iF~ps|U..."] }]
}
```

- `country` is the present-day country the shape covers most. `colour` is the same on every map.
- `rings` are polylines: longitude and latitude in hundredths of a degree, each as the difference to the point before, zigzag encoded, 5 bits a character, 63 added (the format map libraries use). Four bytes a point instead of fifteen. `decodeRing` in `web/src/timeline/borders.ts` reads them.
- Fill rings even-odd: a ring inside a ring is a hole.
- Shapes carry no names, so the app shows no polity label (D4). The map box is longitude -180 to 180, latitude -58 to 84.

`land.json`: `{"rings":["..."]}`, all land in the map box, same encoding.

## Known limits

- **Detail.** 70 KB a file means about 17,000 points, so coasts are rounded at 0.08 to 0.2 degrees (9 to 22 km). Fine at the zoom of the map, visible at the highest zoom.
- **Shaksgam Valley.** India's outline is the Natural Earth India point-of-view file and nothing else (Sunny, 2026-11-25: more accurate than a hand-drawn extension). Whatever part of the Trans-Karakoram (Shaksgam) Tract the file holds is drawn as India, the rest as China. How much of the Tract that is has not been measured, because no polygon of the Tract has been checked. Measured against the file: the Tract's centre (Wikipedia, 76.65 E, 36.03 N) is inside the outline, 15 km from its edge; the control point (76.3 E, 36.1 N) is inside by 21 km; the coordinate from the #374 research (76.5 E, 36.3 N) is 9 km outside.
- **Gaps in OpenHistoricalMap beyond the four filled.** Checked in five sampled years (1900, 1920, 1942, 1945, 1960): Saudi Arabia and Jordan in 1900 and 1920, Niger, Chad, Libya, Mauritania, Cambodia, Laos and Ghana in 1900, Hungary in 1920 and 1945, Austria and the former Yugoslavia in 1920, Algeria and Greenland in 1945, Mali and Senegal in 1960. They are drawn neutral (D4). The contact sheet shows them.
- **Pre-1900 data is Cliopatria's.** It leaves most of the Americas and Africa empty before 1500 and merges some colonies.
- **Pins on the coast.** 16 of the 96 pins sit within 0.13 degrees (14 km) of a drawn shape but outside it, because the coast is simplified (Mumbai 1942 by 0.02, Syracuse 250 BCE by 0.1). One pin (Meerut, 1857) sits on unclaimed land 0.44 degrees from the nearest shape, and the Olmec pin (1200 BCE) has no shape by design (spec D6). At the world scale 0.1 degrees is a third of a pixel, so no pin was moved (spec D5 allowed moving them).

## Licenses

See [LICENSING.md](../../LICENSING.md), section Map border files. The tools (shapely, pyshp, numpy, matplotlib) only run here and are not shipped.
