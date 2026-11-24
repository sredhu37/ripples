# ADR 0016: India's borders on every map

## Status

Accepted. Hard rule set by Sunny on 2026-11-24 (#374). No exceptions without a new ADR.

## Context

The World Timeline becomes a world map with borders per period (#373). Every historical border source checked in #374 (OpenHistoricalMap, CShapes 2.0, Cliopatria, aourednik/historical-basemaps) draws India's disputed borders by the line of actual control: Gilgit-Baltistan and Pakistan-administered Kashmir in Pakistan, Aksai Chin in China. Ripples is made for children with Indian roots, and the maps must match what India's law says.

## Decision

1. Wherever a border is disputed, every Ripples map shows India as Indian law defines it. Disputed areas are part of India, including Pakistan-administered Kashmir and Gilgit-Baltistan, Siachen, Aksai Chin, the Shaksgam Valley, Arunachal Pradesh and the rest of the northeast, Kalapani and Lipulekh, and Sir Creek.
2. This holds before and after 1947. Before 1947, British India uses the same northern outline.
3. India's outline always comes from Natural Earth's India point-of-view file (`ne_10m_admin_0_countries_ind`, public domain). The map build replaces India's shape with it and cuts it out of every neighbour (Pakistan, China, Nepal and others), so no area belongs to two countries.
4. The same holds for colours. A country keeps one colour in every period, and the disputed areas take India's colour.
5. It covers every map, label, text and fact card in every language (EN, DE, PL).

## Rejected

- **Showing the line of control or dashed "disputed" areas.** This is what most international maps do, but it does not match Indian law.
- **Trusting the historical border source for India.** No source checked draws India this way.

## Consequences

- Any map build script needs the India point-of-view file next to its border source. If the build cannot find India in that file, it fails; it never falls back.
- Reviewers check India's northern border and the northeast on every new or changed map.
- Maps may differ from those in German or Polish schoolbooks. That is accepted.
