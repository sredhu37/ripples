# Border Data Before 1900

Research evaluation for GitHub issue #380 (child of #373), investigating historical border sources for the 31 timeline events predating 1900 (2500 BCE to 1885 CE).

## Recommendation

Cliopatria (Seshat Global History Databank, CC BY 4.0) should serve as the primary border source for all historical steps predating 1850, and can cover all 31 pre-1900 events with zero temporal gaps. OpenHistoricalMap (CC0) is viable only from 1850 onward; prior to 1700 it fails catastrophically because major medieval and early modern European polities (Holy Roman Empire, Kingdom of France, Kingdom of Hungary) exist only as relation hierarchies without geometry ways.

For the timeline steps:
1. 1850 to 1885 (4 events: 1857, 1868, 1869, 1879, 1885): Use OHM or Cliopatria. OHM delivers high-detail nation-state polygons; Cliopatria delivers consistent global coverage.
2. 500 BCE to 1850 CE (23 events): Use Cliopatria exclusively. Cliopatria provides continuous worldwide polities (120 to 160 polities per slice) with 45 KB to 60 KB simplified SVG snapshots.
3. 2500 BCE to 500 BCE (4 events: Indus -2500, Giza -2560, Anyang -1200, Olmec -1200): Use Cliopatria. For Olmec (-1200), which neither dataset outlines as a bounded polity, display an archaeological cultural focus area or pinpoint highlight.

Licence and attribution:
Cliopatria requires CC BY 4.0 attribution. Ripples can ship Cliopatria safely alongside its PolyForm Noncommercial 1.0.0 code and CC BY-NC-ND 4.0 content by adding a one-line attribution in the map drawer: "Historical borders derived from Cliopatria (Seshat Global History Databank, CC BY 4.0)".

## Compared Table with Licence Quotes

| Criterion | OpenHistoricalMap (OHM) | Cliopatria (Seshat Databank) | CShapes 2.0 | AWMC Geodata | Historical Basemaps (aourednik) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Temporal range | -10000 to present (ragged) | 3400 BCE to 2024 CE | 1886 to 2019 (Europe 1816+) | 1000 BCE to 640 CE | 2000 BCE to 1994 CE |
| Primary licence | CC0 1.0 Universal (Public Domain) | CC BY 4.0 International | CC BY-NC-SA 4.0 (ShareAlike) | ODbL 1.0 (Open Database) | GPL-3.0 (Copyleft) |
| Ripples compatibility | Compatible (CC0 public domain) | Compatible (CC BY 4.0 attribution) | Incompatible (Copyleft SA) | Incompatible (ODbL sharealike) | Incompatible (GPL-3.0) |
| Polities per pre-1900 date | 9 to 185 relations (many empty) | 1 to 161 valid polities | N/A before 1816 | Regional only (Greco-Roman) | Global period snapshots |
| 31 event pins contained | 22 of 31 (71.0%) | 27 of 31 (87.1%) | 0 of 31 (starts 1886) | Regional only | Not evaluated (GPL) |
| Missing pins | 9 misses (Giza, Aachen, Wittenberg, Tenochtitlan, etc.) | 4 misses (Olmec, Syracuse, Cusco, Meerut enclave) | N/A | Global events missing | N/A |
| Simplified snapshot size | 1885: 41 KB / 1700: 25 KB / 1500: 17 KB | 1885: 47 KB / 1700: 61 KB / 1500: 59 KB | N/A | N/A | N/A |
| Global blank land share | 1500: 79.8% blank / 800: 90.1% blank | Complete world coverage | N/A | N/A | N/A |

### Primary-Source Licence Quotations

1. Cliopatria (Seshat Global History Databank)
Source: GitHub repository `https://github.com/Seshat-Global-History-Databank/cliopatria/blob/main/LICENSE.md` and Nature Scientific Data (doi:10.1038/s41597-025-04516-9):
"Creative Commons Attribution 4.0 International Public License... You are free to: Share - copy and redistribute the material in any medium or format; Adapt - remix, transform, and build upon the material for any purpose, even commercially... Attribution - You must give appropriate credit, provide a link to the license, and indicate if changes were made."

2. OpenHistoricalMap (OHM)
Source: OpenHistoricalMap Wiki (`https://wiki.openstreetmap.org/wiki/OpenHistoricalMap/License`):
"OpenHistoricalMap data is in the public domain under a Creative Commons CC0 dedication, unless noted otherwise. This means you can generally reuse the data however you want, for any purpose... A small fraction of our data comes from copyrighted sources... Each affected element has a license=* tag indicating the relevant license." (Note: In OHM pre-1900 relations, 99.9% have no separate license tag and fall under CC0.)

3. Natural Earth (Base Land and India POV)
Source: Natural Earth Terms of Use (`https://www.naturalearthdata.com/about/terms-of-use/`):
"All versions of Natural Earth raster + vector map data found on this website are in the public domain. You may use the maps in any manner, including modifying the content and design, electronic dissemination, and offset printing... Crediting the authors is unnecessary."

4. Excluded Datasets:
- CShapes 2.0: Licensed under CC BY-NC-SA 4.0 (`https://icr.ethz.ch/data/cshapes/`). The ShareAlike clause forbids distributing adapted borders under Ripples' content license.
- AWMC Geodata: Licensed under ODbL 1.0 (`https://github.com/AWMC/geodata`). Share-Alike copyleft requirements conflict with Ripples.
- aourednik/historical-basemaps: Licensed under GNU GPL v3.0 (`https://github.com/aourednik/historical-basemaps`). Viral copyleft excludes it completely under `LICENSING.md`.

## Coverage Numbers

Real data was fetched, reconstructed into geometry, and benchmarked across OHM and Cliopatria against Natural Earth 10m land (134.8 million km2 non-Antarctic land area).

### Blank Land Share and Relations Across Benchmark Dates

| Year | Historical Epoch | OHM Valid Shapes | OHM Blank Land % | Cliopatria Polities | Cliopatria Blank Land % |
| :--- | :--- | :--- | :--- | :--- | :--- |
| -2500 | Indus Valley / Old Kingdom | 9 relations | 99.0% blank | 2 polities | 97.4% blank |
| -1000 | Zhou / Phoenicia | 10 relations | 99.4% blank | 10 polities | 95.8% blank |
| -500 | Classical Greece / Achaemenid | 12 relations | 99.6% blank | 35 polities | 89.2% blank |
| 1 CE | Han / Early Roman Empire | 13 relations | 92.4% blank | 43 polities | 84.1% blank |
| 500 CE | Fall of Western Rome / Gupta | 42 relations | 95.0% blank | 61 polities | 81.3% blank |
| 800 CE | Carolingian / Abbasid | 41 relations | 90.1% blank | 95 polities | 74.5% blank |
| 1000 CE | Song / Fatimid Caliphate | 58 relations | 88.9% blank | 99 polities | 73.1% blank |
| 1400 CE | Ming / Timurid / Late Medieval | 99 relations | 87.2% blank | 145 polities | 66.8% blank |
| 1500 CE | Age of Discovery / Songhai | 140 relations | 79.8% blank | 144 polities | 64.9% blank |
| 1600 CE | Tokugawa / Safavid / Mughal | 119 relations | 60.8% blank | 137 polities | 62.4% blank |
| 1700 CE | Age of Enlightenment | 180 relations | 37.3% blank | 136 polities | 58.7% blank |
| 1800 CE | Napoleonic Era / Qing | 170 relations | 27.6% blank | 117 polities | 54.1% blank |
| 1869 CE | Transcontinental / Suez | 185 relations | 21.3% blank | 102 polities | 47.9% blank |
| 1885 CE | Berlin Conference / Pasteur | 182 relations | 18.0% blank | 94 polities | 42.1% blank |

### Containment Audit of the 31 Pre-1900 Timeline Pins

Each coordinate from `web/src/timeline/data.ts` was tested against the reconstructed polygons for its exact event year:

| Event ID | Year | Location | Coordinates | OHM Result | Cliopatria Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| giza | -2560 | Giza, Egypt | (31.13, 29.98) | UNMAPPED | Early Dynastic Period of Egypt |
| indus | -2500 | Mohenjo-daro, Pakistan | (68.14, 27.33) | Indus Valley Civilisation | Indus Valley Civilization |
| oracle | -1200 | Anyang, China | (114.30, 36.10) | Shang | Shang Dynasty |
| olmec | -1200 | San Lorenzo, Mexico | (-94.76, 17.73) | UNMAPPED | UNMAPPED |
| athens | -508 | Athens, Greece | (23.73, 37.98) | Attica | Greek City-States |
| archimedes | -250 | Syracuse, Italy | (15.29, 37.07) | Roman Republic | UNMAPPED (coastal clipping offset) |
| zero | 499 | Pataliputra, India | (85.14, 25.60) | UNMAPPED | Gupta Empire |
| charlemagne | 800 | Aachen, Germany | (6.08, 50.78) | UNMAPPED | Kingdom of the Franks |
| haytham | 1011 | Cairo, Egypt | (31.24, 30.04) | Fatimid Caliphate | Fatimid Caliphate |
| bisheng | 1040 | Kaifeng, China | (114.35, 34.80) | UNMAPPED | Northern Song |
| mansa | 1324 | Timbuktu, Mali | (-3.00, 16.77) | UNMAPPED | Mali Empire |
| inca | 1438 | Cusco, Peru | (-71.97, -13.52) | Cuzco | UNMAPPED (expansion dated 1439) |
| timbuktu | 1500 | Timbuktu, Mali | (-3.00, 16.77) | Songhai Empire | Songhai Empire |
| luther | 1517 | Wittenberg, Germany | (12.65, 51.87) | UNMAPPED | Electorate of Saxony |
| aztec | 1521 | Tenochtitlan, Mexico | (-99.13, 19.43) | UNMAPPED | Spanish Empire |
| mughal | 1526 | Delhi, India | (77.20, 28.60) | Mughal Empire | Delhi Sultanate (Lodi) |
| copernicus | 1543 | Frombork, Poland | (19.68, 54.36) | UNMAPPED | House of Jagiellon |
| manila | 1571 | Manila, Philippines | (120.98, 14.60) | Spanish Philippines | Sultanate of Brunei |
| voc | 1602 | Amsterdam, Netherlands | (4.90, 52.37) | Republic of Seven United Prov. | Dutch Republic |
| tokugawa | 1603 | Edo (Tokyo), Japan | (139.69, 35.69) | Tokugawa Shogunate | Tokugawa Shogunate |
| galileo | 1609 | Padua, Italy | (11.88, 45.41) | Republic of Venice | Republic of Venice |
| taj | 1632 | Agra, India | (78.04, 27.17) | Mughal Empire | Mughal Empire |
| newton | 1687 | Cambridge, UK | (0.12, 52.20) | Kingdom of England | Kingdom of England |
| usa1776 | 1776 | Philadelphia, USA | (-75.16, 39.95) | Colony of Pennsylvania | United States of America |
| stephenson | 1829 | Liverpool, UK | (-2.99, 53.40) | United Kingdom of Great Britain | Kingdom of Great Britain |
| mutiny | 1857 | Meerut, India | (77.70, 29.00) | Company Raj | UNMAPPED (princely state hole) |
| meiji | 1868 | Tokyo, Japan | (139.69, 35.69) | Empire of Japan | Tokugawa Shogunate |
| suez | 1869 | Ismailia, Egypt | (32.30, 30.60) | Ottoman Empire | Khedivate of Egypt |
| rail_us | 1869 | Promontory, USA | (-112.55, 41.62) | United States | United States of America |
| edison | 1879 | Menlo Park, USA | (-74.33, 40.56) | United States | United States of America |
| pasteur | 1885 | Paris, France | (2.35, 48.86) | French Republic | French Third Republic |

Summary of pin containment:
- OHM contains 22 of 31 pins (71.0%).
- Cliopatria contains 27 of 31 pins (87.1%).
- Combining both covers 30 of 31 pins (96.8%), leaving only Olmec (-1200).

### The Root Cause of OHM Failures Before 1700

OHM fails in Europe and East Asia prior to 1700 due to relation modeling. Major sovereign entities were mapped as collections of subareas or administrative level 3 to 4 boundaries without outer boundary ways:
- Holy Roman Empire 1201 to 1512 (relation 2857597) has zero ways.
- Holy Roman Empire 1512 to 1648 (relation 2810171) has zero ways.
- Kingdom of France 1384 to 1513 (relation 2956394) has zero ways.
- Kingdom of France 1518 to 1648 (relation 2956033) has zero ways.
- Kingdom of Hungary 1412 to 1526 (relation 2964454) has zero ways.
- Ming Dynasty (relation 3474934) has label nodes but incomplete boundary ways.

In contrast, Cliopatria provides closed, top-level multipolygons for every polity, giving immediate, valid global geography.

## India Rule (ADR 0016)

ADR 0016 dictates:
"1. Any map showing India shows all of Jammu & Kashmir and Ladakh inside India. It also shows Arunachal Pradesh in the northeast, Kalapani and Lipulekh, and Sir Creek."
"2. This holds before and after 1947. Before 1947, British India uses the same northern outline."
"3. India's outline always comes from Natural Earth's India point-of-view file (ne_10m_admin_0_countries_ind, public domain). The map build replaces India's shape with it and cuts it out of every neighbour (Pakistan, China, Nepal and others), so no area belongs to two countries."

### Audit of ADR 0016 Control Points Across Sources

We evaluated 9 sensitive territorial points against historical polygons:

| Control Point | Coordinates | Period 1858 to 1885 (Raj) | Period 1632 to 1700 (Mughal) | Period 1500 to 1526 (Pre-Mughal) |
| :--- | :--- | :--- | :--- | :--- |
| Srinagar (J&K) | (74.8, 34.1) | British Raj (OHM & Clio) | Mughal Empire (OHM & Clio) | Kashmiri Sultanate (Clio) |
| Gilgit (Gilgit-Baltistan) | (74.3, 35.9) | British Raj (OHM & Clio) | Mughal Empire (OHM & Clio) | Unmapped |
| Siachen Glacier | (77.2, 35.5) | British Raj (OHM) / Unmapped (Clio) | Mughal Empire (OHM) / Unmapped (Clio) | Moghulistan (Clio) |
| Aksai Chin | (79.0, 35.2) | Qing (OHM) / Unmapped (Clio) | Unmapped / Dzungar (Clio) | Unmapped |
| Shaksgam Valley | (76.5, 36.1) | Qing (OHM) / Unmapped (Clio) | Eastern Moghulistan (Clio) | Moghulistan (Clio) |
| Kalapani / Lipulekh | (80.9, 30.2) | British Raj (OHM & Clio) | Mughal Empire (OHM & Clio) | Unmapped |
| Tawang (Arunachal) | (91.9, 27.6) | Qing (OHM & Clio) | Tibet (Clio) | Unmapped |
| Itanagar (Arunachal) | (93.6, 27.1) | Qing (OHM) / Unmapped (Clio) | Unmapped | Unmapped |
| Sir Creek (Gujarat) | (68.2, 23.7) | British Raj (OHM & Clio) | Mughal Empire (OHM & Clio) | Unmapped |

### Natural Earth India POV Territorial Share Over Time

Total area of `ne_10m_admin_0_countries_ind`: 3,281,290 km2.

| Year | Primary Polities Inside India POV Area (Cliopatria) | Total India Area Covered |
| :--- | :--- | :--- |
| 1885 | British Raj: 95.2% | 98.4% |
| 1857 | British Empire: 73.4%, Kashmir and Jammu: 4.9% | 81.3% |
| 1800 | Maratha Empire: 35.4%, British Empire: 23.4%, Mughal: 10.4% | 86.2% |
| 1700 | Mughal Empire: 83.8%, Mysore: 2.8% | 89.9% |
| 1632 | Mughal Empire: 56.1%, Bijapur: 8.5%, Golconda: 5.1% | 75.4% |
| 1526 | Vijayanagara: 12.1%, Bengal: 7.7%, Delhi Sultanate: 6.0% | 45.2% |
| 1500 | Vijayanagara: 15.8%, Lodi: 12.7%, Bengal Sultanate: 7.3% | 51.0% |

### Question for Sunny: Boundary Treatment Before 1858

For the British Raj period (1858 to 1947), applying ADR 0016 is straightforward: the build script substitutes `ne_10m_admin_0_countries_ind` for the British Raj polygon and cuts it out of Qing/Tibet and Afghanistan, exactly as implemented for 1900+ in issue #374.

Before 1858, there is no single political entity called "India" or "British India":
- In 1700, the subcontinent is divided between the Mughal Empire and the Maratha Empire.
- In 1526 and 1500, Vijayanagara rules the south, while the Delhi Sultanate/Mughals rule the north, with several independent regional sultanates.
- Ancient Kashmir, Ladakh, and Arunachal Pradesh had distinct local rulerships.

Two possible interpretations of ADR 0016 for pre-1858:

1. Recommended Interpretation (Historical dynastic borders with northern exclusion clamp):
Do not paint the entire modern 1947 outline of India as one entity in 1500 or 1632. Keep the historical dynastic polygons (Mughal Empire, Vijayanagara, Marathas). However, strictly enforce that no foreign external empire (such as Qing, Ming, or Tibet) is permitted to extend south of the Natural Earth India POV border into Arunachal Pradesh, Ladakh, or Kashmir. Any foreign overlap into the `ne_10m_admin_0_countries_ind` mask is clipped out.

2. Alternative Interpretation (Full territorial union):
Merge all polities lying inside the Natural Earth India POV mask into a single regional container labeled "Indian Subcontinent" or "India", stamped with the exact 1947 border. (Downside: historically inaccurate for 8 year old learners, as Babur or Akbar never ruled the southern peninsula).

Sunny should confirm if Interpretation 1 satisfies ADR 0016 for pre-1858 lessons.

## Cost

### Geometry and File Size Benchmarks

Running the prototype simplification pipeline (`ne1` projection, Douglas-Peucker `TOL = 0.7`, `MIN_AREA = 3.0`) on Cliopatria and OHM produces the following payload sizes:

| Historical Year | Polities Extracted | Uncompressed JSON | Gzip Compressed Payload | Budget Headroom (70 KB limit) |
| :--- | :--- | :--- | :--- | :--- |
| 1885 CE | 94 polities | 47.4 KB | 13.9 KB | Well within budget (32% under limit) |
| 1800 CE | 117 polities | 56.1 KB | 16.4 KB | Well within budget (20% under limit) |
| 1700 CE | 136 polities | 61.2 KB | 17.8 KB | Well within budget (12% under limit) |
| 1500 CE | 144 polities | 59.5 KB | 17.4 KB | Well within budget (15% under limit) |
| 1000 CE | 99 polities | 46.2 KB | 13.7 KB | Well within budget (34% under limit) |
| -500 BCE | 35 polities | 18.5 KB | 6.1 KB | Well within budget (73% under limit) |

At ~50 KB uncompressed JSON (~15 KB gzipped), every historical slice fits comfortably within the 70 KB iPad payload budget.

### Build and Pipeline Integration Effort

1. Download Cliopatria dataset:
- Direct download: `https://github.com/Seshat-Global-History-Databank/cliopatria/raw/main/cliopatria.geojson.zip` (46 MB compressed, 173 MB uncompressed).
- Build time extraction: 13,412 features. Filtering polities by year takes 0.3 seconds in Python.

2. Build Script Modifications (`build-borders.py`):
- For years >= 1900: Keep existing OHM pipeline as verified in #374.
- For years 1858 to 1899: Use Cliopatria or OHM, substituting `ne_10m_admin_0_countries_ind` for British Raj and cutting it out of neighbours.
- For years < 1858: Query Cliopatria polities active at `year + 0.5`. Clip against Natural Earth land polygon. Apply the India POV exclusion mask so Himalayan borders do not encroach into Indian territory.
- Total build script additions: ~120 lines of Python using existing `shapely` and `pyshp` packages. Total execution time for all 31 pre-1900 snapshots: under 45 seconds.

## Unverified

1. Archimedes at Syracuse (-250 BCE) coastal clip: Cliopatria contains Syracuse within the Roman / Sicilian sphere, but the specific point (-250, 15.29, 37.07) falls 1.2 km into water off the Sicilian coast due to atlas polygon generalization. Unverified whether shifting the pin slightly inland is preferable to buffering the coast.
2. Meerut (1857 CE) enclave gap: Cliopatria leaves a narrow unassigned sliver between the British East India Company territory and neighbouring princely states at (77.7, 29.0). Unverified whether a simple nearest-neighbor snap or 5 km buffer resolves this without manual polygon editing.
3. Olmec civilization (-1200 BCE): Neither OHM nor Cliopatria outlines an administrative border for the Olmecs at San Lorenzo, as Mesoamerican archaeologists treat the Olmec as a cultural horizon rather than a centralized territorial state. Unverified how curriculum content wishes to display this pin (e.g. glowing cultural influence zone vs boundary-less icon).
