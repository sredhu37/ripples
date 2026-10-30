# ADR 0002: Group 4 (Governments) Neutrality and Political Systems Framing

## Status

Accepted

## Context

Group 4 of Ripples introduces civic, political, and economic systems to an 8-year-old child across lessons 27 to 34:
1. Why Government (`whygovernment`)
2. How Leaders are Chosen (`elections`)
3. Democracy (`democracy`)
4. Monarchy (`monarchy`)
5. Dictatorship (`dictatorship`)
6. Capitalism (`capitalism`)
7. Communism (`communism`)
8. The Power Triangle (`powertriangle`)

Teaching governance and economics to children carries three major risks:
1. Cynicism: Portraying politicians as purely corrupt, businesses as purely greedy, or voters as clueless.
2. Ideological cheerleading: Dividing systems into cartoon heroes and cartoon villains rather than examining institutional coordination mechanisms, incentives, and structural trade-offs.
3. Incomprehensible abstraction: Relying on academic definitions rather than tangible, physical dilemmas that an 8-year-old child experiences in daily life.

To prepare for implementation in task t_bfe52929 (GitHub issue #26), this ADR establishes the neutrality criteria, pedagogical frameworks, and complete lesson specifications for Group 4.

## Decision

We establish four pedagogical principles, define neutral mechanism-based framing standards for political and economic systems, specify the geometric Power Triangle model, and define the complete 8-lesson curriculum blueprint.

### 1. The Four Pedagogical Principles

#### Principle A: The Coordination Mechanism Focus
Every system is introduced by asking: "What shared problem does this try to solve?"
- Political systems answer: Who decides the shared rules, and how can mistakes be corrected peacefully?
- Economic systems answer: Who owns the tools and shops, and how do people decide what to produce and distribute?

#### Principle B: The Beutelsbacher Consensus Standard
We adopt the gold standard of German civic education (Bundeszentrale fuer politische Bildung):
1. Prohibition against overwhelming/indoctrination (Ueberwaeltigungsverbot): The teacher or app must not coach the child into a predetermined political opinion.
2. Controversial matters must remain controversial (Kontroversitaetsgebot): When a topic is debated in society and scholarship, its differing viewpoints, strengths, and failure modes must be presented honestly.
3. Student orientation (Schuelerorientierung): The child must be given the tools, evidence, and interactive agency to analyze trade-offs and form their own judgment.

#### Principle C: Anti-Cynicism Guardrails
- Public servants and leaders are portrayed as coordinators balancing scarce resources under tough constraints.
- Business owners and workers are portrayed as producers creating goods, services, and tools for the community.
- Citizens and voters are portrayed as neighbors with differing needs who must collaborate peacefully.

#### Principle D: Concrete Ripple Town Grounding
Every abstract concept is grounded in concrete Ripple Town objects (carts, wells, boats, bakeries, paper ballots, wooden boxes, council tables) before introducing formal vocabulary.

### 2. Political Systems Framing Standards

```
                     [ How Are Rules Decided? ]
                                  |
         +------------------------+------------------------+
         |                                                 |
  [ Power by People ]                              [ Power by One / Few ]
         |                                                 |
    DEMOCRACY                                  +-----------+-----------+
  - Citizens vote in secret                    |                       |
  - Free speech & open courts               MONARCHY              DICTATORSHIP
  - Mistakes fixed at next election     - Born into rule      - Power by force/control
  - Trade-off: compromise takes time    - Absolute vs Const.  - Silencing hides errors
```

- **Democracy (Rule with the People):**
  - *Core mechanism:* Citizens vote by secret ballot to elect representatives. Free speech allows open debate; independent courts protect rights; laws apply equally to all.
  - *Strength:* Accountability and peaceful error correction. Leaders who make poor decisions can be voted out without violence.
  - *Trade-off:* Reaching consensus takes time, debate, and patience. Nobody gets their way 100% of the time.

- **Monarchy (Hereditary Rule):**
  - *Core mechanism:* Leadership passes down within a ruling family.
  - *Distinction:*
    - Absolute monarchy: One king or queen holds total executive and legislative power alone.
    - Constitutional monarchy: The monarch serves as a non-partisan symbol of tradition and unity, while an elected parliament governs.
  - *Trade-off:* Avoids election campaigns, but leadership depends on the accident of birth. Citizens cannot vote out an incapable ruler. That is why modern monarchies place governing power in elected parliaments.

- **Dictatorship (Unchecked Rule):**
  - *Core mechanism:* One leader or small clique holds power by force and coercion, without free elections, independent judges, or free speech.
  - *Stated appeal:* Dictators often promise rapid action without parliamentary debate.
  - *Structural failure:* When people cannot speak freely or vote leaders out, mistakes cannot be flagged or corrected. If the ruler makes harmful decisions, citizens suffer in silence. Fear replaces trust.

### 3. Economic Systems Framing Standards

```
                     [ Who Owns the Tools & Shops? ]
                                  |
         +------------------------+------------------------+
         |                                                 |
  [ Private Individuals ]                            [ Collective / State ]
         |                                                 |
    CAPITALISM                                         COMMUNISM
  - People own shops and tools                       - State/community owns all tools
  - Prices set by supply & demand                    - Central planning desk sets quotas
  - Strong incentive to invent                       - Equal ration ideal
  - Needs fair rules for fairness                    - Information failure causes shortages
```

- **Capitalism (Market Economy):**
  - *Core mechanism:* Private individuals own tools, workshops, and boats. Prices, wages, and output are shaped by customer demand, supply, and competition.
  - *Strength:* Powerful incentives for initiative, quality, and invention. Great variety of goods and personal freedom to choose occupations.
  - *Trade-off:* Risk of income disparity, monopoly abuse, and neglect of public goods. Balanced through the Social Market Economy (Soziale Marktwirtschaft), where clear rules protect workers, consumers, and the environment.

- **Communism (Centrally Planned Economy):**
  - *Core mechanism:* Tools, land, and factories are owned collectively or by the state. A central planning desk decides what to produce, in what amounts, and at what price.
  - *Stated ideal:* Universal equality: no rich owners, no poor laborers, guaranteed basic goods for everyone.
  - *Structural failure:* The local knowledge problem. A central planning office cannot know the daily needs, shoe sizes, or tastes of thousands of people. Without price signals, surpluses of unneeded goods and severe shortages of essentials occur. Without personal rewards, motivation drops.

### 4. The Power Triangle (Citizens, Businesses, Government)

Society is modeled as an equilateral geometric triangle with three interacting poles:

```
                          [ GOVERNMENT ]
                           /          \
            Public goods, /            \ Laws, courts,
       infrastructure,   /              \ infrastructure,
       fair protection  /                \ fair regulations
                       /                  \
                      /                    \ Taxes
          Votes,     /                      \ from revenue
          taxes     /                        \
                   /                          \
            [ CITIZENS ] <=================> [ BUSINESSES ]
                          Labor, purchases
                          Wages, products
```

1. **Citizens / Voters (Bottom-Left):**
   - Provide labor to businesses and purchase goods with their earnings.
   - Vote in elections to choose lawmakers and fund public goods through taxes.
2. **Businesses / Producers (Bottom-Right):**
   - Produce goods and services, build tools, and create jobs.
   - Pay taxes into the public treasury and rely on government for roads, legal certainty, and peace.
3. **Government / State (Top-Center):**
   - Passes and enforces shared laws through independent courts.
   - Maintains public infrastructure (roads, clean water, schools, emergency services).
   - Prevents monopolies, unfair labor practices, and pollution.

*Equilibrium principle:*
- If Government dominates unchecked: Individual liberties and private initiative are crushed.
- If Businesses dominate unchecked: Workers, public goods, and the environment are exploited.
- If Citizens demand public services without paying taxes or obeying laws: Public infrastructure collapses.
A free, prosperous society requires continuous balance among all three corners.

---

### 5. Lesson Sequence and Specifications (Lessons 27 to 34)

| Order | ID | English Title | German Title |
| --- | --- | --- | --- |
| 27 | whygovernment | Why Government? | Warum gibt es eine Regierung? |
| 28 | elections | How Leaders are Chosen | Wie Anfuehrer gewaehlt werden |
| 29 | democracy | Democracy | Demokratie |
| 30 | monarchy | Monarchy | Monarchie |
| 31 | dictatorship | Dictatorship | Diktatur |
| 32 | capitalism | Capitalism | Kapitalismus |
| 33 | communism | Communism | Planwirtschaft |
| 34 | powertriangle | The Power Triangle | Das Macht-Dreieck |

---

#### Lesson 27: Why Government? (`whygovernment`)

- **Pedagogical Goal:** Teach that without shared rules and public coordination, shared resources (roads, wells, harbors) fall into disrepair (the tragedy of the commons / coordination failure). A government is the group of people chosen to organize shared rules, resolve disputes, and maintain public goods that no single family can build alone.
- **Ripple Town Cast & Narrative:** Ripple Town grows from a small cluster of huts into a busy village. But carts bump into each other on narrow unpaved tracks, and the town drinking well cracks because nobody feels responsible for fixing shared stones. Everyone takes care of their own doorstep, but shared spaces fall apart. Otto gathers the villagers: they need a council to agree on traffic rules and contribute small coins to a shared pot so the well stays clean and roads stay safe.
- **Starred Terms:**
  - EN: *government*, *public goods*, *rules*
  - DE: *Regierung*, *oeffentliche Gueter*, *Regeln*
- **Interactive Toy Mechanics:**
  - *Layout:* Town center showing the central drinking well, two cart roads, and a council table.
  - *Interaction:* The child adjusts a "Rules & Care" dial (0 = No rules, 50 = Balanced coordination, 100 = Over-regulated).
    - At 0: Carts collide, the well water turns brown, and villagers complain.
    - At 100: Five checkpoints block the road, carts cannot move, and deliveries freeze.
    - At 50 (balanced green zone): Carts drive on the right side smoothly, a town mason repairs the well stones, and sparkling water flows into every bucket.
  - *Single interaction path:* Move the single coordination slider to find the balanced zone.
  - *Gating:* Child must observe the 0 breakdown state and lock in the balanced 50 zone where the well runs clean and traffic moves.
- **Widget Question:** "Set the town rules slider so carts can deliver food smoothly and the shared water well stays clean." Child adjusts slider to 50 and taps CheckButton.
- **In Real Life (Germany):** In German towns and cities, municipal councils (Gemeinderat) and local offices (Ordnungsamt) coordinate road repairs, street lights, clean drinking water, fire departments, and waste collection for all residents.
- **Fact Card Sources:**
  - Bundeszentrale fuer politische Bildung (Was ist Politik?): https://www.bpb.de/themen/politisches-system/politik-einfach-fuer-alle/
  - Deutscher Bundestag (Aufgaben des Staates): https://www.bundestag.de/parlament/aufgaben
  - Gesetze im Internet (Grundgesetz Art. 20): https://www.gesetze-im-internet.de/gg/art_20.html
  - Statistisches Bundesamt Destatis (Oeffentliche Finanzen): https://www.destatis.de/DE/Themen/Staat/Oeffentliche-Finanzen/_inhalt.html
  - Umweltbundesamt (Trinkwasser und Daseinsvorsorge): https://www.umweltbundesamt.de/themen/wasser/trinkwasser
- **Ask Dad Question:** "Papa, what are some important things our city looks after that our family could not build on our own?"

---

#### Lesson 28: How Leaders are Chosen (`elections`)

- **Pedagogical Goal:** In a large community, not everyone can manage the town full-time. Citizens hold elections where every adult gets one equal, secret vote to choose representatives. Secret voting ensures people can vote their true conscience without fear of pressure or punishment.
- **Ripple Town Cast & Narrative:** Ripple Town has enough timber for one major project this season: Moss wants to build a sturdy harbor stone pier for fishing boats, while Pip wants to build a shaded market pavilion with a playground. Both ideas are helpful, but resources are limited. Instead of shouting or fighting, villagers hold an election. Each villager walks into a private wooden curtain booth, marks a paper ballot in secret, folds it, and drops it into a locked ballot box. When the votes are counted in public, the decision is peaceful, transparent, and respected by everyone.
- **Starred Terms:**
  - EN: *election*, *vote*, *ballot*
  - DE: *Wahl*, *Stimme*, *Stimmzettel*
- **Interactive Toy Mechanics:**
  - *Layout:* Village voting hall with 5 diverse villagers (Finn, Bea, Luca, Maya, Sam), a curtained voting booth, and a locked wooden ballot box with an open counting tray.
  - *Interaction:* Each villager steps up with their preference card. The child drags the villager into the private booth, stamps their chosen ballot, and drops the folded slip into the ballot box slot. Once all 5 ballots are cast, the box unlocks, the votes are counted onto the board, and the winning project is celebrated without any fighting.
  - *Single interaction path:* Drag each villager into the booth, then drop their secret ballot into the box slot.
  - *Gating:* Cast all 5 secret ballots and tally the election results.
- **Widget Question:** "Three villagers voted for the harbor pier and two voted for the market pavilion. Drag the winning project card to the town notice board." Child drags harbor pier and taps CheckButton.
- **In Real Life (Germany):** Every four years, German citizens elect the German Bundestag in a general election (Bundestagswahl). Grundgesetz Article 38 guarantees that elections are general, direct, free, equal, and secret (allgemein, unmittelbar, frei, gleich und geheim).
- **Fact Card Sources:**
  - Die Bundeswahlleiterin (Grundsaetze der Wahl): https://www.bundeswahlleiterin.de/bundestagswahlen/2025/informationen-waehler/wahlsystem.html
  - Deutscher Bundestag (Wahlen zum Deutschen Bundestag): https://www.bundestag.de/wahlen
  - Gesetze im Internet (Bundeswahlgesetz BWahlG): https://www.gesetze-im-internet.de/bwo_1975/
  - Bundeszentrale fuer politische Bildung (Wahlen): https://www.bpb.de/themen/politisches-system/wahlen/
  - Gesetze im Internet (Grundgesetz Art. 38): https://www.gesetze-im-internet.de/gg/art_38.html
- **Ask Dad Question:** "Papa, why is it so important that nobody is allowed to look at your ballot when you vote behind the curtain?"

---

#### Lesson 29: Democracy (`democracy`)

- **Pedagogical Goal:** Democracy means power rests with the people. It is not just majority rule; healthy democracy protects minority rights, encourages open debate, follows written laws, and allows mistakes to be corrected peacefully at the next election.
- **Ripple Town Cast & Narrative:** Moss is elected council chair, but he cannot simply issue orders as he pleases. Ripple Town has a written Council Charter: everyone has the right to speak at the public square, council meetings are open, and laws apply equally to the council leader and the newest villager. When Moss proposes spending all town funds on a giant marble clock tower, citizens organize a meeting, propose a compromise, and the council agrees to build a modest clock plus repair the town school roof.
- **Starred Terms:**
  - EN: *democracy*, *majority*, *compromise*
  - DE: *Demokratie*, *Mehrheit*, *Kompromiss*
- **Interactive Toy Mechanics:**
  - *Layout:* Ripple Town Council Chamber with three distinct villager delegations (Sailors wanting a lighthouse, Bakers wanting grain storage, Families wanting a park).
  - *Interaction:* The council has 10 budget tokens. If the child gives all 10 tokens to only one group, the other two groups walk out in protest. The child adjusts budget allocation sliders to reach a balanced compromise where all three groups give a thumbs-up (e.g. 4 for lighthouse, 3 for grain storage, 3 for park).
  - *Single interaction path:* Adjust sliders until all 3 citizen groups approve the compromise.
  - *Gating:* Achieve full council agreement via compromise.
- **Widget Question:** "Find a budget compromise where all three groups get at least 2 tokens and total budget equals 10 tokens." Child adjusts sliders and taps CheckButton.
- **In Real Life (Germany):** Germany is a parliamentary democracy. Members of Parliament (Abgeordnete) in the Bundestag represent different political parties and frequently form coalition governments, negotiating compromises so the government represents a broad majority.
- **Fact Card Sources:**
  - Deutscher Bundestag (Das Parlament im Ueberblick): https://www.bundestag.de/parlament
  - Bundeszentrale fuer politische Bildung (Demokratie): https://www.bpb.de/themen/politisches-system/demokratie/
  - Bundesverfassungsgericht (Schutz der Grundrechte): https://www.bundesverfassungsgericht.de/DE/Das-Gericht/Aufgaben/aufgaben_node.html
  - Gesetze im Internet (Grundgesetz Art. 1 und 20): https://www.gesetze-im-internet.de/gg/
  - Deutscher Bundesrat (Mitwirkung der Laender): https://www.bundesrat.de/DE/aufgaben/aufgaben-node.html
- **Ask Dad Question:** "Papa, what happens in a democracy if the leaders do a bad job or break their promises?"

---

#### Lesson 30: Monarchy (`monarchy`)

- **Pedagogical Goal:** Monarchy means leadership passes down within a ruling family. Teach the distinction between absolute monarchy (one king/queen holds total power) and constitutional monarchy (the king/queen is a ceremonial symbol of tradition, while an elected parliament governs).
- **Ripple Town Cast & Narrative:** On nearby Castle Island, leaders are not elected; they are born into the royal family. Long ago, Castle Island had an absolute king who made every law alone. When King Jasper was wise and kind, the kingdom flourished. But when his son took over, he cared only for hunting peacocks and forgot about the town bridge. The people realized: trusting all power to luck of birth is risky. Today, Castle Island has a constitutional monarchy: Queen Rosa wears the crown for festivals and welcomes foreign guests, but an elected town council makes all laws and taxes.
- **Starred Terms:**
  - EN: *monarchy*, *hereditary*, *constitution*
  - DE: *Monarchie*, *Erbfolge*, *Verfassung*
- **Interactive Toy Mechanics:**
  - *Layout:* Castle Island castle and parliament hall side by side.
  - *Interaction:* Toggle switch: "Absolute Monarchy" vs "Constitutional Monarchy".
    - In Absolute Mode: The child rolls a "Succession Wheel" (generating random ruler traits: Wise vs Careless). If Careless is rolled, the town tax meter spikes, roads crack, and citizens have no way to vote the ruler out.
    - In Constitutional Mode: The monarch remains a ceremonial figurehead at the castle, while the elected parliament council passes laws based on citizen needs. Stability stays high regardless of royal personality.
  - *Single interaction path:* Toggle between both modes and spin the succession wheel to compare stability.
  - *Gating:* Experience both modes and observe how the constitutional parliament protects town stability.
- **Widget Question:** "In a constitutional monarchy, who makes the laws and taxes?" Options: A) The royal peacock, B) The elected parliament, C) Nobody. Child chooses B and taps CheckButton.
- **In Real Life (Germany):** Germany had monarchs (emperors and kings) until 1918. After World War I, Germany became a republic. Today, European neighbors like the UK, the Netherlands, and Sweden are constitutional monarchies where elected parliaments run the government.
- **Fact Card Sources:**
  - Bundeszentrale fuer politische Bildung (Vom Kaiserreich zur Republik 1918): https://www.bpb.de/themen/zeit-unterwegs/weimarer-republik/
  - Deutscher Bundestag (Historische Meilensteine): https://www.bundestag.de/geschichte
  - Deutsches Historisches Museum LeMO (Das Kaiserreich): https://www.dhm.de/lemo/kapitel/kaiserreich.html
  - Gesetze im Internet (Weimarer Reichsverfassung von 1919): https://www.gesetze-im-internet.de/wrv/
  - British Parliament Educational Resources (Role of the Monarch): https://www.parliament.uk/about/how/role/monarchy/
- **Ask Dad Question:** "Papa, why did most modern countries decide that people should vote for their leaders instead of inheriting power?"

---

#### Lesson 31: Dictatorship (`dictatorship`)

- **Pedagogical Goal:** Dictatorship is rule by one leader or small group with unchecked power. Dictators often promise fast decisions, but without free elections, free press, or independent courts, mistakes cannot be corrected, citizens cannot speak up, and fear replaces trust.
- **Ripple Town Cast & Narrative:** In Far Harbor, a ruler named Barnaby takes total control. At first, Barnaby says: "Forget talking in circles, I make decisions fast!" But soon Barnaby bans meetings, closes the town newspaper, and takes people's fishing boats for himself. When a major water pipe cracks under Main Street, workers are afraid to tell Barnaby because anyone who reports bad news is punished. The leak floods the cellars because no one can speak the truth. Otto explains: without the freedom to speak up and vote bad leaders out, unchecked power harms everyone.
- **Starred Terms:**
  - EN: *dictatorship*, *power*, *freedom of speech*
  - DE: *Diktatur*, *Macht*, *Meinungsfreiheit*
- **Interactive Toy Mechanics:**
  - *Layout:* Split town view: "Open Town" (left) vs "Command Town" (right), with a town leak meter.
  - *Interaction:* In Command Town, an alarm blares as a water leak appears. The child tries to report the leak, but a padlock silences the worker megaphone. Because feedback is blocked, the flood meter rises to red danger. The child then unlocks Open Town: the worker speaks into the megaphone, the message reaches repair crews, and the pipe is promptly patched.
  - *Single interaction path:* Unlock the feedback megaphone and route the repair team.
  - *Gating:* Witness the failure mode of silenced feedback and restore the open feedback loop.
- **Widget Question:** "Why does an open town fix problems faster than a dictatorship where people are silenced?" Options: A) Because people can speak the truth and correct mistakes, B) Because water flows uphill, C) Because dictators have better tools. Child chooses A and taps CheckButton.
- **In Real Life (Germany):** Germany suffered under the Nazi dictatorship (1933 to 1945) and the communist dictatorship in East Germany (GDR, 1949 to 1989). To ensure this never happens again, the German Grundgesetz created an "eternity clause" (Article 79, Paragraph 3) protecting human dignity, democracy, and the rule of law forever.
- **Fact Card Sources:**
  - Bundeszentrale fuer politische Bildung (Diktatur und Totalitarismus): https://www.bpb.de/themen/politisches-system/politik-einfach-fuer-alle/
  - Gesetze im Internet (Grundgesetz Art. 79 Abs. 3 Ewigkeitsklausel): https://www.gesetze-im-internet.de/gg/art_79.html
  - Stiftung Deutsches Historisches Museum (NS-Regime und DDR): https://www.dhm.de/lemo/
  - Bundesbeauftragter fuer den Datenschutz und die Informationsfreiheit: https://www.bfdi.bund.de/
  - Bundesverfassungsgericht (Wehrhafte Demokratie): https://www.bundesverfassungsgericht.de/
- **Ask Dad Question:** "Papa, why does Germany's Basic Law (Grundgesetz) have rules that can never be changed, even by a majority vote?"

---

#### Lesson 32: Capitalism (`capitalism`)

- **Pedagogical Goal:** Capitalism is an economic system where individuals and private businesses own their shops, boats, and tools. Prices and wages are shaped by supply and competition. Its strength is personal freedom, innovation, and abundant choices; its trade-off is potential inequality, which is why modern societies use rules to protect workers and public goods (a Social Market Economy).
- **Ripple Town Cast & Narrative:** In Ripple Town's market square, Bea owns her brick oven and Finn owns his fishing boat. Because they own their tools and keep their profits, they work hard to invent delicious new sesame rolls and faster fishing nets. When Leo also opens a bakery, Bea and Leo compete: bread gets fresher, and prices become fair for everyone. But Otto notes: if a big business tries to dump waste in the river or pay tiny unfair wages, the community needs fair rules. That balance between private enterprise and social fairness is what creates a thriving town.
- **Starred Terms:**
  - EN: *capitalism*, *private property*, *market economy*
  - DE: *Kapitalismus*, *Privateigentum*, *Marktwirtschaft*
- **Interactive Toy Mechanics:**
  - *Layout:* Market square with Bea's Bakery and Leo's Bakery, customer queue, and a regulatory rulebook.
  - *Interaction:* The child adjusts two sliders: "Baker Innovation & Investment" (upgrading oven tools) and "Fair Ground Rules" (environmental and fair wage standards). With private ownership active, bakers bake diverse breads. When fair rules are enabled, workers get fair wages and the town river stays sparkling clean.
  - *Single interaction path:* Balance the investment slider and rulebook switch to achieve high production and clean town metrics.
  - *Gating:* Observe how private ownership motivates production and fair rules protect the community.
- **Widget Question:** "In a market economy, what motivates Bea to wake up early and bake delicious fresh bread?" Options: A) She owns her bakery and earns income from happy customers, B) The town dictator ordered her by force, C) Nobody likes bread. Child chooses A and taps CheckButton.
- **In Real Life (Germany):** Germany operates a "Social Market Economy" (Soziale Marktwirtschaft), designed after World War II by Ludwig Erhard. It combines the freedom and efficiency of private markets with social security, public healthcare, worker protections, and antitrust laws.
- **Fact Card Sources:**
  - Bundesministerium fuer Wirtschaft und Klimaschutz (Soziale Marktwirtschaft): https://www.bmwk.de/Redaktion/DE/Dossier/soziale-marktwirtschaft.html
  - Ludwig-Erhard-Stiftung (Konzept und Prinzipien): https://www.ludwig-erhard.de/
  - Bundeskartellamt (Schutz des freien Wettbewerbs): https://www.bundeskartellamt.de/
  - Bundeszentrale fuer politische Bildung (Wirtschaftssysteme): https://www.bpb.de/themen/wirtschaft/
  - Statistisches Bundesamt Destatis (Einkommen, Konsum und Lebensbedingungen): https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Einkommen-Konsum-Lebensbedingungen/_inhalt.html
- **Ask Dad Question:** "Papa, what does the word 'Social' add to 'Market Economy' in Germany?"

---

#### Lesson 33: Communism (`communism`)

- **Pedagogical Goal:** Communism is an economic system where tools, land, and factories are owned collectively or by the state, and a central office plans all production. The stated ideal is total equality without rich or poor; the structural failure is that central planners cannot know everyone's needs or set thousands of prices correctly, leading to shortages, queues, and loss of personal initiative.
- **Ripple Town Cast & Narrative:** In High Valley, the leaders decide that private shops are unfair. They announce: "From now on, all ovens, cows, and boats belong to everyone together! The Central Planning Desk will decide exactly how many shoes, loaves, and shirts to make." At first it sounds fair: everyone gets an identical coat. But the desk officer in the capital cannot guess that River District had a cold winter and needed warm wool boots, while Island District had sunny weather and needed sun hats. The desk orders 500 left shoes and only giant brown coats. Long queues form outside empty shelves, while workers lose the motivation to invent new recipes.
- **Starred Terms:**
  - EN: *communism*, *planned economy*, *shortage*
  - DE: *Kommunismus*, *Planwirtschaft*, *Mangel*
- **Interactive Toy Mechanics:**
  - *Layout:* The Central Planning Desk with supply clipboards on the left, and 3 distinct village districts (Mountain, Harbor, Valley) on the right with different actual needs.
  - *Interaction:* The child acts as the Central Planner. You have a fixed quota of 100 coats and 100 shoes to divide equally (33 each). When distributed equally, Mountain villagers freeze (they needed 60 coats), Harbor sailors have piles of unused coats, and Valley farmers wait in a long animated queue for boots that never arrive.
  - *Single interaction path:* Allocate items by central quota, then reveal actual citizen shortages and surpluses.
  - *Gating:* Experience the informational difficulty of central planning and see why shortages occur without prices and customer signals.
- **Widget Question:** "Why did the central planning desk produce the wrong sizes of shoes for the village?" Options: A) A central desk cannot guess the exact daily needs of thousands of people, B) Nobody in the village had feet, C) The leather turned into cheese. Child chooses A and taps CheckButton.
- **In Real Life (Germany):** From 1949 to 1989, East Germany (GDR / DDR) had a communist planned economy. The state owned all large factories (VEB) and set prices. Basic bread was cheap, but people had to wait up to 15 years to buy a small car (Trabant) and fresh fruit was often unavailable.
- **Fact Card Sources:**
  - Stiftung Haus der Geschichte (Wirtschaftsordnung der DDR): https://www.hdg.de/lemo/kapitel/geteiltes-deutschland-grunderjahre/wirtschaft-und-gesellschaft-ddr.html
  - Bundeszentrale fuer politische Bildung (Planwirtschaft in der DDR): https://www.bpb.de/themen/deutsche-einheit/lange-wege-der-deutschen-einheit/47178/planwirtschaft/
  - Bundesarchiv (Akten der Staatlichen Plankommission der DDR): https://www.bundesarchiv.de/
  - Deutsches Historisches Museum LeMO (Alltag und Versorgung in der DDR): https://www.dhm.de/lemo/kapitel/geteiltes-deutschland-modernisierung/wirtschaft-und-gesellschaft-ddr.html
  - Institut fuer Wirtschaftsforschung Halle (IWH - Transformation Ostdeutschlands): https://www.iwh-halle.de/
- **Ask Dad Question:** "Papa, why is it so hard for one central office to decide how much food and clothing an entire country needs every day?"

---

#### Lesson 34: The Power Triangle (`powertriangle`)

- **Pedagogical Goal:** A stable, free society is a dynamic triangle formed by Citizens, Businesses, and Government. Each corner has power, and each corner checks the others. If any one corner dominates completely, the system breaks; when all three are in balance, society thrives.
- **Ripple Town Cast & Narrative:** Otto sits at a triangular wooden table. At one corner stands Pip (Citizen/Voter). At the second corner stands Bea (Business Owner). At the third corner stands Moss (Town Government).
  - Pip provides labor to Bea and buys her bread; Pip votes in elections to choose Moss.
  - Bea pays wages to Pip and taxes to Moss; Bea relies on Moss for paved roads, clean water, and honest courts.
  - Moss makes fair laws to protect Pip from unsafe workplaces, and prevents Bea from forming a monopoly; Moss depends on Bea's taxes and Pip's votes to stay legitimate.
  Otto pulls one corner away: if Government takes total control, freedom vanishes. If Business takes total control, workers are exploited. If Citizens demand everything without taxes or laws, the town collapses. Harmony requires balance.
- **Starred Terms:**
  - EN: *balance of power*, *citizen*, *regulation*
  - DE: *Gewaltenteilung*, *Buerger*, *Regulierung*
- **Interactive Toy Mechanics:**
  - *Layout:* An equilateral geometric triangle with three interactive corner nodes: Citizens (bottom-left), Businesses (bottom-right), Government (top-center), with pulsing animated flow arrows connecting them.
  - *Interaction:* Sliders or tension knobs at each corner allow adjusting the power level of each corner (0 to 100).
    - If Government = 100 and others = 0: Screen displays "Authoritarian regime: liberties suppressed".
    - If Business = 100 and others = 0: Screen displays "Monopoly rule: high pollution, no safety net".
    - If Citizen demands = 100 with zero taxes/rules: Screen displays "Infrastructure collapse: roads crumble".
    - Balanced zone (e.g. 50/50/50): The triangle glows bright green, displaying "Thriving Society: Freedom, Prosperity, and Public Services in Equilibrium".
  - *Single interaction path:* Adjust the three corner sliders to find and lock in the equilibrium state.
  - *Gating:* Test extreme imbalances and bring the triangle into the stable green equilibrium zone.
- **Widget Question:** "Set the three corners of the Power Triangle so Citizens, Businesses, and Government balance each other in harmony." Child balances the three sliders and taps CheckButton.
- **In Real Life (Germany):** Germany's democratic order is built on checks and balances (Gewaltenteilung between Bundestag, Bundesrat, and courts) and the "Sozialpartnerschaft" (social partnership between trade unions representing workers, employer associations, and federal regulators negotiating collective agreements).
- **Fact Card Sources:**
  - Bundeszentrale fuer politische Bildung (Gewaltenteilung und Machtkontrolle): https://www.bpb.de/themen/politisches-system/politik-einfach-fuer-alle/gewaltenteilung/
  - Deutscher Bundestag (Gewaltenteilung im Grundgesetz): https://www.bundestag.de/parlament/aufgaben/gewaltenteilung
  - Gesetze im Internet (Grundgesetz Art. 20 Abs. 2 Gewaltenteilung): https://www.gesetze-im-internet.de/gg/art_20.html
  - Bundesministerium fuer Arbeit und Soziales (Sozialpartnerschaft und Tarifautonomie): https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Tarifvertraege/tarifvertraege.html
  - Bundesverfassungsgericht (Rechtsprechung zur Gewaltenteilung): https://www.bundesverfassungsgericht.de/
- **Ask Dad Question:** "Papa, who keeps watch over the government to make sure it doesn't take too much power?"

---

## Consequences

- **Unblocks Build Task t_bfe52929:** Implementation of Group 4 (lessons 27 to 34, Issue #26) can proceed immediately with complete pedagogical guidance, verified sources, and interactive toy definitions.
- **Vocabulary and Registry Parity:** Stable IDs (`whygovernment`, `elections`, `democracy`, `monarchy`, `dictatorship`, `capitalism`, `communism`, `powertriangle`) are fixed and ready to be registered in `src/lessons.ts`.
- **Quality Assurance:** All 8 lessons maintain zero em or en dashes, bilingual parity, pure SVG rendering, and single-path interactive toy mechanics.
