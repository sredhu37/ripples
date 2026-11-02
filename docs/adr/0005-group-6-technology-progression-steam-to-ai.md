# ADR 0005: Group 6 (Technology) Progression from Steam to AI

## Status

Accepted

## Context

Group 6 of Ripples introduces the technological revolutions that transformed human civilization across lessons 43 to 50:
1. Tools to Steam (`tools`)
2. Mass Production (`massproduction`)
3. Computers (`computers`)
4. Internet (`internet`)
5. Automation (`automation`)
6. Artificial Intelligence (`ai`)
7. Changing Jobs (`changingjobs`)
8. The Human Edge (`humanedge`)

Modern public discourse around technology, especially artificial intelligence and robotics, often generates severe anxiety and fatalism:
1. Tech Anxiety and Helplessness: Sensationalist headlines claim robots and AI will make human work and human beings obsolete, creating dread rather than curiosity in young minds.
2. Magical Thinking: Describing computers and AI algorithms as "mysterious sentient brains" obscures how they actually work, preventing children from building true digital literacy.
3. Devaluation of Humanities and Care: Pure technocratic focus can mislead children into believing only coding or computational tasks have value, devaluing art, empathy, nursing, teaching, and craftsmanship.
4. Technophobia vs. Uncritical Adoption: Children need a balanced perspective that neither rejects tools out of fear nor accepts algorithmic recommendations without critical discernment.

To guide implementation in task t_b13ed1f2 (GitHub issue #31), this ADR establishes the educational framework, pedagogical pillars, anti-anxiety strategies, and full 8-lesson specifications for Group 6.

## Decision

We establish four foundational pedagogical pillars for technology education, specify anti-anxiety guardrails, and define the complete curriculum specifications for Lessons 43 through 50.

### 1. The Four Pedagogical Pillars

#### Pillar A: Technology as an Amplifier of Human Purpose
Technology is not an alien force acting upon humanity; it is the sum of tools invented by humans to solve human challenges.
- A lever amplifies muscle force to lift heavy stone.
- A steam engine turns boiling water and coal heat into wheel rotation.
- A computer amplifies calculation speed.
- AI amplifies pattern discovery across vast libraries of text and images.
In every era, human beings choose what to build, set the goals, and decide ethical boundaries. The tool never replaces the human heart that directs it.

#### Pillar B: Demystification Through Mechanical Clarity
Fear comes from obscurity. When a child understands the basic mechanism behind a technology, the mystery transforms into mastery.
- In `computers`, we show that computers do not "think"; they flip tiny electronic switches (bits: 0 and 1) millions of times per second according to clear instructions (code).
- In `internet`, we show that web pages are sliced into numbered parcels (data packets) sent across cables like postcards, reassembled at the destination.
- In `ai`, we show that machine learning models are clever mathematical pattern spotters: by examining thousands of cat and dog photos, they discover pixel regularities, but do not possess consciousness, feelings, or intent.

#### Pillar C: History of Transition: How Work Evolves
Throughout history, every major invention shifted the types of jobs humans perform.
- When tractors arrived, 80% of workers no longer had to plow fields by hand; people became doctors, architects, teachers, and scientists.
- When spreadsheets arrived, bookkeepers stopped calculating columns of numbers by pencil and became financial strategists.
- Routine, repetitive, and hazardous tasks are automated, liberating human energy for higher-level problem solving, creative expression, and relational care.

#### Pillar D: The Irreplaceable Human Edge
The culmination of the curriculum (Lessons 49 and 50) celebrates what makes humans distinct and irreplaceable.
- Machines excel at repetitive arithmetic, sorting huge datasets, and rapid repetition.
- Humans excel at empathy, ethical judgment, authentic humor, emotional support, artistic voice, and moral courage.
- An AI can draft words, but only a human child can truly care about a friend, stand up against unfairness on the playground, or create art that reflects personal lived experience.

---

### 2. Tone and Anti-Anxiety Guardrails

```
+--------------------+------------------------------------------+------------------------------------------+
| Technology Topic   | Empowering Perspective (Teach)           | Anxiety-Inducing Trap (Avoid)            |
+--------------------+------------------------------------------+------------------------------------------+
| 43. Tools & Steam  | Muscle power amplified by steam heat     | Inevitable industrial misery, pollution  |
|                    | liberating humans from backbreaking toil | panic without historical context         |
+--------------------+------------------------------------------+------------------------------------------+
| 44. Mass Production| Standardization makes books, medicine,   | Dehumanizing factory worker stereotypes; |
|                    | and bicycles affordable for everyone     | framing mass products as solely low quality|
+--------------------+------------------------------------------+------------------------------------------+
| 45. Computers      | Binary switches (0 and 1) following code | "Sentient mechanical brains that think   |
|                    | instructions rapidly and without errors  | for themselves and outsmart humans"      |
+--------------------+------------------------------------------+------------------------------------------+
| 46. Internet       | Distributed network of postcards/packets | Cyber-dystopia, surveillance terror,     |
|                    | linking humanity across oceans           | or overwhelming digital noise            |
+--------------------+------------------------------------------+------------------------------------------+
| 47. Automation     | Robotic arms performing hazardous, hot,  | "Robots take all human jobs leaving      |
|                    | repetitive tasks safely in factories     | families with nothing to do"             |
+--------------------+------------------------------------------+------------------------------------------+
| 48. Artificial Int.| Mathematical pattern recognition trained | "Superintelligent conscious AI replacing |
|                    | on examples; helper for human creators   | human consciousness and human worth"     |
+--------------------+------------------------------------------+------------------------------------------+
| 49. Changing Jobs  | Shifting from physical drudgery to       | Hopeless economic obsolescence;          |
|                    | creative, strategic, and caring careers  | framing automation as a human catastrophe|
+--------------------+------------------------------------------+------------------------------------------+
| 50. The Human Edge | Empathy, kindness, creativity, curiosity | Cold technocratic ranking where humans   |
|                    | and moral judgment are irreplaceable     | are treated as inferior computers        |
+--------------------+------------------------------------------+------------------------------------------+
```

---

### 3. Detailed Curriculum Specifications: Lessons 43 to 50

#### Lesson 43: Tools to Steam (`tools`)
- **Title (EN / DE):** Tools to Steam / Von Werkzeugen zum Dampf
- **Pedagogical Goal:** Teach how early human hand tools were powered solely by muscle, and how James Watt and Thomas Newcomen's steam engines harnessed fuel heat to create continuous rotary motion.
- **Story Beats (5):**
  1. For thousands of years, every stone cut, field plowed, and wall built was limited by human and animal muscle power.
  2. Inventors harnessed wind for sailing ships and waterwheels for grinding grain, but both depended on fickle weather.
  3. In the eighteenth century, inventors discovered how to harness the immense physical pressure of boiling water steam.
  4. James Watt refined the steam engine with a separate condenser, converting coal heat into powerful rotary motion that ran day and night.
  5. Steam engines powered deep mine pumps, textile looms, and steam locomotives, inaugurating the Industrial Revolution.
- **Interactive Toy:** `ToolsToy` & `calcSteamPower`
  - Fuel boiler with coal and water; toggle between Muscle Power (10 units/hr), Waterwheel (30 units/hr, weather-dependent), and Steam Engine (100 units/hr continuous).
  - Piston animation converts expanding steam into rotating flywheel motion.
- **Fact Card Sources:** Science Museum London James Watt Archives, Newcomen Society Historical Collections.
- **Ask Dad Question:** Papa, how did people travel long distances before steam trains and cars were invented?
- **Real Life Card:** German steam locomotive museums (e.g., Eisenbahnmuseum Bochum-Dahlhausen) and historic preserved steam railways across the Harz mountains.

#### Lesson 44: Mass Production (`massproduction`)
- **Title (EN / DE):** Mass Production / Die Massenfertigung
- **Pedagogical Goal:** Teach how interchangeable parts and moving assembly lines lowered costs, making everyday goods accessible to regular families.
- **Story Beats (5):**
  1. In earlier eras, every clock, carriage, and pair of shoes was crafted by hand by an individual artisan.
  2. Because handcrafting took weeks for a single item, goods were expensive and only wealthy families could afford them.
  3. In the early twentieth century, engineers introduced *interchangeable parts*: standard components that fit any unit.
  4. Henry Ford and factory engineers built the moving *assembly line*, where conveyor belts brought work directly to specialists.
  5. Mass production dramatically lowered prices, allowing ordinary families to purchase bicycles, clocks, and home appliances.
- **Interactive Toy:** `MassProductionToy` & `calcAssemblyThroughput`
  - Conveyor belt with 3 workstations (Frame assembly, Wheels, Inspection).
  - Compare Craft Workshop (1 bike in 10 hours at 500 gold) vs Assembly Line (10 bikes in 10 hours at 50 gold each).
- **Fact Card Sources:** Henry Ford Museum Assembly Line Archives, Deutsches Museum Munich Production Technology.
- **Ask Dad Question:** Papa, why is it that today almost every store sells clothes in standard sizes like S, M, and L?
- **Real Life Card:** Modern automotive manufacturing in Germany (e.g. Wolfsburg, Stuttgart) where specialized robots and skilled engineers assemble complex vehicles with millimeter precision.

#### Lesson 45: Computers (`computers`)
- **Title (EN / DE):** Computers / Computer und Rechenmaschinen
- **Pedagogical Goal:** Teach how computers process information using binary switches (0 and 1) following clear algorithms, from Ada Lovelace and Konrad Zuse to modern microchips.
- **Story Beats (5):**
  1. Long before electronic screens, mathematicians used calculating gears like the abacus to tabulate numbers.
  2. In the 1840s, visionary mathematician Ada Lovelace wrote the world's very first computer algorithm for Charles Babbage's Analytical Engine.
  3. In 1941, German engineer Konrad Zuse built the Z3 in Berlin: the first programmable electromechanical digital computer.
  4. Inside modern microchips, billions of microscopic transistors act as tiny light switches: on (1) or off (0), called *binary*.
  5. By combining billions of simple 0s and 1s at lightning speed, computers process calculations, games, music, and maps.
- **Interactive Toy:** `ComputersToy` & `calcBinaryLogic`
  - 4-bit binary switch register (values 8, 4, 2, 1).
  - Child flips switches to compose target decimal numbers (e.g., 5 = 0101, 10 = 1010).
  - Visual output displays how numbers represent letters, colors, or pixels.
- **Fact Card Sources:** Konrad Zuse Internet Archive (Deutsches Technikmuseum Berlin), Ada Lovelace Papers (Bodleian Library Oxford), Computer History Museum.
- **Ask Dad Question:** Papa, how can tiny silicon chips inside our phones remember our favorite songs and family photos?
- **Real Life Card:** The Deutsches Museum in Munich and Deutsches Technikmuseum in Berlin, where children can inspect Konrad Zuse's original relays and room-sized computers.

#### Lesson 46: The Internet (`internet`)
- **Title (EN / DE):** The Internet / Das weltweite Netz
- **Pedagogical Goal:** Teach how computers around the world communicate through interconnected protocols, fiber-optic undersea cables, and packet switching.
- **Story Beats (5):**
  1. For decades, computers were isolated machines in separate rooms, unable to share information without physical tapes.
  2. In the 1960s, scientists invented *packet switching*: slicing messages into small, numbered digital envelopes.
  3. Each packet travels independently across phone lines, fiber-optic glass cables, and satellite links, reassembling at the destination.
  4. In 1989, Tim Berners-Lee created the World Wide Web at CERN, introducing web addresses, browsers, and hyperlinks.
  5. Today, undersea fiber cables spanning ocean floors link billions of people across all continents in instantaneous communication.
- **Interactive Toy:** `InternetToy` & `calcPacketRouting`
  - Network graph with Sender, 3 Routers (North, Central, South), and Receiver.
  - Slices a message into 3 packets and routes them across diverse network paths, avoiding clogged nodes to arrive intact.
- **Fact Card Sources:** CERN World Wide Web Archive (1989), Submarine Cable Map (TeleGeography), Internet Society History.
- **Ask Dad Question:** Papa, when I video call my grandparents across the world, how does my voice travel under the ocean so fast?
- **Real Life Card:** DE-CIX in Frankfurt am Main: the world's largest internet exchange point, where hundreds of terabits of data pass through fiber switches every single second.

#### Lesson 47: Automation (`automation`)
- **Title (EN / DE):** Robots and Automation / Roboter und Automation
- **Pedagogical Goal:** Teach how sensors, actuators, and controllers automate repetitive, dangerous, or heavy physical tasks, keeping human workers safe.
- **Story Beats (5):**
  1. In traditional workshops, workers had to carry heavy molten metal, breathe toxic paint fumes, and perform exhausting repetitive motions.
  2. Engineers designed *automated robots*: machines equipped with electronic sensors to see and mechanical arms to move.
  3. A robot arm follows precise mathematical coordinates, welding steel, tightening bolts, or packaging groceries tirelessly.
  4. Sensors measure temperature, distance, and pressure, allowing the machine to stop instantly if a person steps nearby.
  5. Automation takes over dangerous and dull tasks, allowing humans to work as supervisors, designers, and creative problem-solvers.
- **Interactive Toy:** `AutomationToy` & `calcAutomationSafety`
  - Automated robotic sorting cell with 3 levers: Speed, Sensor Precision, and Human Safety Curtain.
  - Optimize production throughput while maintaining 100% human worker safety rating.
- **Fact Card Sources:** International Federation of Robotics (IFR) Statistical Reports, Fraunhofer Institute for Manufacturing Engineering and Automation (IPA).
- **Ask Dad Question:** Papa, which jobs in a hospital or factory are best done by robots, and which require human doctors and nurses?
- **Real Life Card:** Modern German logistics and parcel distribution centers (e.g., Deutsche Post DHL hubs) where smart sorting conveyors and robotic arms sort millions of packages every night.

#### Lesson 48: Artificial Intelligence (`ai`)
- **Title (EN / DE):** Artificial Intelligence / Kuenstliche Intelligenz
- **Pedagogical Goal:** Teach how machine learning recognizes statistical patterns in data to classify images, translate languages, and assist human thinking.
- **Story Beats (5):**
  1. Classical computer software only followed rigid rules written directly by human programmers (if this, then that).
  2. *Machine learning* introduced a new approach: training algorithms on millions of examples so they discover patterns on their own.
  3. By examining thousands of pictures of apples and pears, an AI learns which shapes and colors distinguish them.
  4. AI assists astronomers finding distant exoplanets, doctors detecting illnesses in scans, and linguists translating languages.
  5. AI is a sophisticated pattern tool; it does not have feelings, consciousness, personal intentions, or moral values.
- **Interactive Toy:** `AiToy` & `calcPatternRecognition`
  - Training dataset simulator: feed 2, 5, or 10 labeled fruit examples (size, color, shape).
  - Accuracy meter increases with clean data; test classification on unknown samples.
- **Fact Card Sources:** Turing Institute Foundations of Machine Learning, Stanford HAI AI Index Reports, German AI Strategy (KI-Strategie der Bundesregierung).
- **Ask Dad Question:** Papa, if an AI can compose a poem or draw a picture, does that mean it has feelings or imagination?
- **Real Life Card:** AI-assisted weather forecasting at the Deutscher Wetterdienst (DWD) in Offenbach, predicting rainfall and storms with machine learning models.

#### Lesson 49: How Work Evolves (`changingjobs`)
- **Title (EN / DE):** How Work Evolves / Wie sich Arbeit veraendert
- **Pedagogical Goal:** Teach that technology changes which tasks humans do, transforming dirty and hazardous jobs into safer, creative, and service-oriented professions.
- **Story Beats (5):**
  1. Two hundred years ago, most children's ancestors spent twelve hours a day cutting wheat with sickles or digging coal in dark tunnels.
  2. As machines took over backbreaking physical labor, fears arose that there would be no jobs left for human hands.
  3. Instead of vanishing, human work shifted toward building things, designing software, researching cures, and caring for others.
  4. New inventions constantly create entirely new occupations: airplane pilots, web designers, environmental scientists, and park rangers.
  5. The secret to flourishing in a changing world is continuous curiosity, adapting new tools, and learning throughout life.
- **Interactive Toy:** `ChangingJobsToy` & `calcWorkforceEvolution`
  - Historical era slider (1850 Agricultural, 1950 Industrial, 2050 Knowledge & Care).
  - Visual distribution of workforce categories: Heavy Physical Labor vs Creative, Technical, and Caring Careers.
- **Fact Card Sources:** OECD Future of Work Reports, German Federal Institute for Vocational Education and Training (BIBB), International Labour Organization (ILO).
- **Ask Dad Question:** Papa, did your job exist when your grandparents were little children going to school?
- **Real Life Card:** German dual vocational training system (*Duale Ausbildung*), where apprentices learn modern digital technologies alongside practical craftsmanship.

#### Lesson 50: The Human Edge (`humanedge`)
- **Title (EN / DE):** The Human Edge / Was uns Menschen einzigartig macht
- **Pedagogical Goal:** Celebrate the uniquely human gifts: empathy, creativity, kindness, ethical discernment, and love, which no algorithm can replace.
- **Story Beats (5):**
  1. Throughout our journey from shells and coins to steam engines and artificial intelligence, we have built amazing tools.
  2. Tools can calculate digits of pi, lift locomotives, fly across oceans, and translate twenty languages in a second.
  3. But no machine can ever experience joy, understand grief, offer genuine comfort, or choose fairness for its own sake.
  4. Your greatest superpowers are uniquely human: deep empathy for others, courageous moral conscience, and imaginative spark.
  5. In a world full of wonderful technology, the most valuable thing you will ever bring to the table is your kind and curious human heart.
- **Interactive Toy:** `HumanEdgeToy` & `calcHumanSuperpowers`
  - Balance scale comparing "What Machines Calculate" (speed, precision, repetition) and "What Humans Bring" (empathy, kindness, ethical choice, creative spark).
  - Activating human virtues lights up the Golden Compass of Human Agency.
- **Fact Card Sources:** UNESCO Recommendation on the Ethics of Artificial Intelligence (2021), Harvard Center on the Developing Child, Council of Europe Human Rights.
- **Ask Dad Question:** Papa, what is something you did today that made someone feel happy or loved that no computer could ever do?
- **Real Life Card:** Volunteer emergency services (*Freiwillige Feuerwehr*, *Technisches Hilfswerk*) and neighborhood care associations across German communities, where human dedication and neighborly compassion hold society together.

---

### 4. Verification and Definition of Done

This decision will be verified when:
1. ADR 0005 is committed, linked in `docs/adr/README.md`, and new technology terms are added to `GLOSSARY.md`.
2. All 8 Group 6 lessons (43-50) are implemented in worktree `t_b13ed1f2` following these blueprints.
3. Every lesson includes EN and DE bilingual text, SVG diagrams, CSS, and interactive simulation toys.
4. Vitest unit tests pass for all calculation functions.
5. Zero em/en dashes are present in any markdown or typescript file.
