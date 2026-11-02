# ADR 0001: Group 2 (Business) Curriculum and Toy Mechanics

## Status

Accepted

## Context

Ripples is a bilingual (English and German) financial education app built for an 8-year-old child on a laptop and tablet.
Group 1 (Money and Work, lessons 1 to 10) established foundational concepts: money, work, savings, loans, banks, interest, taxes, inflation, printing money, and interest rates.

Group 2 (Business, lessons 11 to 18) introduces how economic actors organize to produce goods and services, earn income, face risk, and compete.
To prepare for implementation in task t_9c3bea0e (GitHub issue #24), all 8 lessons, their pedagogical progression, Ripple Town stories, starred vocabulary, interactive toy mechanics, widget questions, real-life cards, verified fact sources, and Ask Dad questions must be defined unambiguously.

All lessons and toys must comply with standing project standards:
1. Strict bilingual parity (EN and DE written together, child-friendly du-form in German).
2. No em dashes or en dashes anywhere (checked by vitest).
3. Zero emoji: all graphics drawn as pure SVG code using the shared kit.
4. Tactile interaction in toys: drag-and-drop or direct controls with immediate visual cause and effect.
5. Single interaction path: never offer duplicate buttons or competing shortcuts for the same action.
6. Progression gating: the ready button stays disabled until the child completes the toy activity (onDone).
7. ActionPrompt styling: passive instructions in dashed cards, action triggers in solid buttons with explicit verb phrases (no boolean ON/OFF toggles).
8. Geometric layouts: triangular or grid layouts for multi-party flows rather than flat horizontal crossing rows.
9. Fits inside 1366x768 laptop viewport with zero vertical or horizontal scrolling in lesson runners and toys.
10. Sourced fact cards: at least 5 claims per lesson with verified primary https URLs from official institutions.

## Decision

We establish the 8 lessons of Group 2 in strict pedagogical order, assigning stable identifiers and defining the complete specification for each lesson.

### Lesson Sequence and Metadata

| Order | ID | English Title | German Title |
| --- | --- | --- | --- |
| 11 | profit | Costs and profit | Kosten und Gewinn |
| 12 | sales | Making sales | Verkauf und Kundschaft |
| 13 | ticketsize | Small and big prices | Kleine und grosse Preise |
| 14 | marketshare | Market share | Der Marktanteil |
| 15 | competition | Friendly competition | Wettbewerb |
| 16 | marketing | Spreading the word | Werbung und Bekanntheit |
| 17 | hiring | Hiring and risk | Einstellen und Risiko |
| 18 | scale | Big and small business | Grosse und kleine Betriebe |

---

### Detailed Lesson Specifications

#### Lesson 11: Costs and Profit (`profit`)

- **Pedagogical Goal:** Teach that money received from selling (revenue) is not profit. To know what you keep, you must subtract the cost of ingredients, materials, and rent. If costs exceed revenue, the business makes a loss.
- **Ripple Town Cast & Narrative:** Bea the baker bakes fresh loaves of bread. She sells each loaf for 4 coins. But baking is not free: flour costs 1 coin, firewood costs 1 coin, and oven stall rent costs 1 coin per loaf. When Bea sells a loaf for 4 coins, 3 coins immediately go to pay her costs, leaving her with 1 shiny coin of profit. If she lowers the price to 2 coins, she loses money on every bake.
- **Starred Terms:**
  - EN: *costs*, *profit*, *loss*
  - DE: *Kosten*, *Gewinn*, *Verlust*
- **Interactive Toy Mechanics:**
  - *Layout:* Triangular workstation with an ingredient pantry (left), mixing oven (center), and customer coin register (right).
  - *Interaction:* The child drags ingredients (flour sack = 1 coin, wood bundle = 1 coin) into the oven. A cost meter increments to 2 coins. Next, a customer buys the loaf by tapping "Sell loaf for 4 coins". 4 coins drop into the register. The toy splits the coins with an animated path: 2 coins slide into the supplier cost box, and 2 coins slide into Bea's profit pouch.
  - *Price Slider:* A slider allows setting bread price from 1 to 5 coins. At 1 coin, the toy displays a red "Loss" indicator and draws a coin out of Bea's savings jar to cover supplier costs.
  - *Gating:* Child must bake and sell loaves at profit and experience at least one loss or break-even price.
- **Widget Question:** "Set the bread price so Bea makes at least 2 coins of profit when ingredients cost 2 coins." The child moves the slider to 4 coins (or 5) and taps CheckButton.
- **In Real Life (Germany):** A traditional German bakery (Bäckerei) collects money when customers buy Brötchen and Brot. The baker must pay for flour, bakery electricity, and shop rent before keeping any profit for their own family.
- **Fact Card Sources:**
  - Gabler Wirtschaftslexikon (Definition Gewinn): https://wirtschaftslexikon.gabler.de/definition/gewinn-33630
  - Statistisches Bundesamt Destatis: https://www.destatis.de/DE/Themen/Wirtschaft/Preise/_inhalt.html
  - Gesetze im Internet (Handelsgesetzbuch § 242 Gewinn- und Verlustrechnung): https://www.gesetze-im-internet.de/hgb/__242.html
  - Zentralverband des Deutschen Bäckerhandwerks: https://www.baeckerhandwerk.de/
  - European Central Bank Educational Resources: https://www.ecb.europa.eu/ecb/educational/html/index.en.html
- **Ask Dad Question:** "Papa, when you buy groceries or tools, how do the shops decide how much profit they need to stay open?"

---

#### Lesson 12: Making Sales (`sales`)

- **Pedagogical Goal:** Products sitting in inventory generate zero income until a customer buys them. Making sales requires offering what customers want, being present when they shop, and exchanging goods clearly.
- **Ripple Town Cast & Narrative:** Finn the fisherman catches plenty of fresh fish, but in the morning the harbor docks are empty. Finn makes zero sales while his fish sit in crates. At midday, the ferry brings hungry villagers. When Finn calls out and displays fresh fish, villagers step up to buy. Each purchase is a sale that brings coins.
- **Starred Terms:**
  - EN: *customer*, *sales*
  - DE: *Kundschaft*, *Umsatz*
- **Interactive Toy Mechanics:**
  - *Layout:* Finn's harbor market stand at the center, a customer walkway across the top, and a dockside fish tank at the bottom.
  - *Interaction:* Villagers walk past with request bubbles (trout, salmon, or smoked fish). The child drags the matching fish from Finn's boat directly to the customer's shopping basket. When matched, the customer drops coins into Finn's till, the customer smiles and walks away, and the sales counter increments.
  - *Single interaction path:* Only dragging the correct fish completes the sale. No duplicate clickable shortcuts.
  - *Gating:* Child must serve 4 customers with matching catches, achieving at least 12 coins in total sales.
- **Widget Question:** "Pip wants a fresh fish and offers 3 coins. Drag the fish to Pip's basket to make the sale." Child drags the fish to Pip and taps CheckButton.
- **In Real Life (Germany):** In German towns and cities, weekly markets (Wochenmärkte) take place on public squares. Farmers and food sellers set up stalls to make direct sales to neighborhood residents.
- **Fact Card Sources:**
  - Statistisches Bundesamt Destatis (Gross- und Einzelhandel Umsatz): https://www.destatis.de/DE/Themen/Wirtschaft/Grosshandel-Einzelhandel/_inhalt.html
  - Bundesministerium für Wirtschaft und Klimaschutz (Mittelstand): https://www.bmwk.de/Redaktion/DE/Dossier/mittelstand.html
  - Handelsverband Deutschland (HDE): https://einzelhandel.de/
  - Deutscher Industrie- und Handelskammertag (DIHK): https://www.dihk.de/
  - Bundesfinanzministerium (Kassensicherungsverordnung): https://www.bundesfinanzministerium.de/
- **Ask Dad Question:** "Papa, what makes someone decide to buy from one shop instead of another?"

---

#### Lesson 13: Small and Big Prices (`ticketsize`)

- **Pedagogical Goal:** A business can reach the same total sales revenue through high volume with small prices (low ticket size) or low volume with high prices (high ticket size). Both models work, but they require different time, operations, and effort.
- **Ripple Town Cast & Narrative:** Bea and Sam compare their day's earnings. Bea sells 30 sweet rolls for 1 coin each, earning 30 coins. She had to greet 30 customers and bake all morning. Sam crafts one pair of sturdy leather boots and sells it to Captain Coral for 30 coins. Both made 30 coins in sales. Bea handled high volume with a small ticket size; Sam handled low volume with a large ticket size.
- **Starred Terms:**
  - EN: *ticket size*, *volume*
  - DE: *Ticketgröße*, *Menge*
- **Interactive Toy Mechanics:**
  - *Layout:* Split balance board comparing "Small Price / High Volume" (left, bread rolls) against "Big Price / Low Volume" (right, boots).
  - *Interaction:* The target revenue goal is set to 24 coins. The child uses a price slider (1 to 12 coins per item) or selects between item types. The toy dynamically displays the crowd of customers required to reach the goal (for 1 coin = 24 customers in a long line; for 6 coins = 4 customers; for 12 coins = 2 customers).
  - Tapping "Run market day" sends customers through the checkout, filling the coin scale until the target balances.
  - *Gating:* The child must balance the 24-coin target using both small-ticket (many customers) and big-ticket (few customers) settings.
- **Widget Question:** "Sam wants to earn 18 coins by selling 3 pairs of shoes. What price must he charge for each pair?" Child adjusts the price slider to 6 coins (3 x 6 = 18) and taps CheckButton.
- **In Real Life (Germany):** A German supermarket sells thousands of small everyday items like apples and milk for 1 or 2 euros each day. A local bike shop might sell only two high-quality e-bikes for 2,000 euros each, yet both businesses can make similar daily sales.
- **Fact Card Sources:**
  - Deutsche Bundesbank (Schule und Bildung): https://www.bundesbank.de/de/service/schule-und-bildung
  - Bundeskartellamt (Handelssektor): https://www.bundeskartellamt.de/DE/Wirtschaftsbereiche/Handel/handel_node.html
  - Institut der deutschen Wirtschaft Köln (IW Köln): https://www.iwkoeln.de/
  - Statistisches Bundesamt Destatis (Konsumausgaben): https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Einkommen-Konsum-Lebensbedingungen/Konsumausgaben/_inhalt.html
  - Handelsverband Deutschland (HDE Zahlen und Fakten): https://einzelhandel.de/presse/zahlen-fakten
- **Ask Dad Question:** "Papa, would you rather run a shop that sells hundreds of small snacks or one that sells a few big bicycles each week?"

---

#### Lesson 14: Market Share (`marketshare`)

- **Pedagogical Goal:** All the customers who buy a certain product make up that market. A company's market share is the percentage or slice of those total purchases it wins. Market share changes when customers move between sellers.
- **Ripple Town Cast & Narrative:** In Ripple Town, 10 villagers buy fresh fruit every morning. Finn sells green apples, and Clara sells red apples. When Finn sells to 7 villagers and Clara sells to 3, Finn owns 70 percent of the fruit market. But when Clara introduces sweet honey apples, 3 villagers switch to Clara. Now each seller has 5 customers, sharing the market equally (50 percent each).
- **Starred Terms:**
  - EN: *market*, *market share*
  - DE: *Markt*, *Marktanteil*
- **Interactive Toy Mechanics:**
  - *Layout:* A circular SVG pie chart in the center representing 10 market shoppers, flanked by Finn's apple stall on the left (green) and Clara's stall on the right (red).
  - *Interaction:* 10 animated villager avatars stand in the middle. The child drags villagers between Finn and Clara based on stall perks (price cut, honey glaze sample, or umbrella shelter).
  - As villagers move, the pie chart slices dynamically expand and contract, displaying both the fraction (7/10) and the percentage (70%).
  - *Gating:* Rebalance the market so Finn holds at least 70%, then adjust perks so Clara reaches at least 50% market share.
- **Widget Question:** "There are 10 shoppers in town. Drag shoppers so Clara holds a 60% market share (6 out of 10 shoppers)." Child drags 6 shoppers to Clara and taps CheckButton.
- **In Real Life (Germany):** In Germany, major supermarket chains like Edeka, Rewe, Aldi, and Lidl divide the food market. The Federal Cartel Office (Bundeskartellamt) monitors market shares to ensure no single business becomes too dominant.
- **Fact Card Sources:**
  - Bundeskartellamt (Fusionskontrolle und Marktbeherrschung): https://www.bundeskartellamt.de/DE/Fusionskontrolle/fusionskontrolle_node.html
  - Monopolkommission (Hauptgutachten): https://www.monopolkommission.de/
  - Gabler Wirtschaftslexikon (Definition Marktanteil): https://wirtschaftslexikon.gabler.de/definition/marktanteil-39049
  - Bundeskartellamt (Jahresbericht): https://www.bundeskartellamt.de/DE/UeberUns/Jahresbericht/jahresbericht_node.html
  - BMWK (Wettbewerbspolitik): https://www.bmwk.de/Redaktion/DE/Dossier/wettbewerbspolitik.html
- **Ask Dad Question:** "Papa, how does the government make sure one giant company does not buy up all the grocery stores in our city?"

---

#### Lesson 15: Friendly Competition (`competition`)

- **Pedagogical Goal:** When multiple businesses sell similar things, they compete for customers. Fair competition helps customers get better quality, lower prices, and nicer service, pushing businesses to improve rather than become lazy.
- **Ripple Town Cast & Narrative:** Bea was long the only baker in Ripple Town. Her bread was plain and often cold, because customers had nowhere else to go. Then Luca opens a new bakery across the street, offering warm sesame rolls. Customers hurry to Luca. Instead of getting angry, Bea improves her bread: she bakes honey-raisin loaves and puts out free tasting slices. Now both bakeries are busy, and the whole town enjoys better bread.
- **Starred Terms:**
  - EN: *competitor*, *competition*
  - DE: *Konkurrent*, *Wettbewerb*
- **Interactive Toy Mechanics:**
  - *Layout:* Street scene with Bea's Bakery on the left and Luca's Bakery on the right, with a central pedestrian plaza.
  - *Interaction:* The child can upgrade 3 attributes for either bakery:
    1. Freshness & Taste (standard vs warm honey crust)
    2. Price per roll (3 coins vs 2 coins)
    3. Warm greeting & bench (plain counter vs sunny bench)
  - Pedestrians walking through the plaza evaluate both shops. Thought bubbles show their choices ("Cheaper rolls!", "Fresh honey bread!").
  - *Gating:* Experiment with at least one quality improvement and one price change to observe how competition moves customer choices.
- **Widget Question:** "Luca charges 4 coins for dry bread. Bea charges 3 coins for warm honey bread. Drag the customer to the bakery they choose." Child drags customer to Bea's shop and taps CheckButton.
- **In Real Life (Germany):** Germany operates under a Social Market Economy (Soziale Marktwirtschaft). The Act against Restraints of Competition (GWB) ensures companies compete honestly on quality and price, and forbids secret price-fixing cartels.
- **Fact Card Sources:**
  - Bundeskartellamt (Kartellverbot und Schutz des Wettbewerbs): https://www.bundeskartellamt.de/DE/Kartellverbot/kartellverbot_node.html
  - Gesetze im Internet (Gesetz gegen Wettbewerbsbeschränkungen GWB): https://www.gesetze-im-internet.de/gwb/
  - European Commission (Competition Policy): https://competition-policy.ec.europa.eu/index_en
  - Ludwig-Erhard-Stiftung (Soziale Marktwirtschaft): https://www.ludwig-erhard.de/
  - Bundesregierung (Grundlagen der Sozialen Marktwirtschaft): https://www.bundesregierung.de/breg-de/themen/soziale-marktwirtschaft
- **Ask Dad Question:** "Papa, what would happen if the only two shoe shops in town secretly agreed to double their prices together?"

---

#### Lesson 16: Spreading the Word (`marketing`)

- **Pedagogical Goal:** Even the best invention or product cannot help anyone if nobody knows it exists. Marketing means telling people truthfully what you made and why it helps them. Deceptive or false claims are harmful and forbidden by law.
- **Ripple Town Cast & Narrative:** Sam invents waterproof leather boots that keep feet warm and dry even in puddles and sea waves. But Sam leaves them tucked away on his workshop back shelf. Nobody buys them because nobody knows. Sam paints a colorful harbor sign showing boots splashing happily in puddles, and he gives a sample pair to Captain Coral to wear on the boat. Soon sailors see the boots in action, read the sign, and visit Sam's shop.
- **Starred Terms:**
  - EN: *marketing*, *advertising*
  - DE: *Marketing*, *Werbung*
- **Interactive Toy Mechanics:**
  - *Layout:* Ripple Town map with 12 villagers initially displaying grey question mark bubbles.
  - *Interaction:* Sam can deploy three distinct marketing tools from his workbench:
    1. Harbor Crossroads Poster (costs 2 coins, alerts 4 dockworkers)
    2. Test Pair to Captain Coral (costs 3 coins, alerts 4 sailors via word of mouth)
    3. Market Square Crier (costs 4 coins, alerts 4 townspeople)
  - Dragging a marketing tool onto the town map triggers sound ripples in SVG, lighting up the question marks into boot icons. Each alerted customer visits Sam's shop and buys boots, returning revenue to Sam.
  - *Gating:* Place marketing items to alert at least 8 villagers while keeping net earnings positive.
- **Widget Question:** "Sam has 2 coins. Placing the Harbor Poster costs 2 coins and informs 4 eager sailors. Drag the Harbor Poster to the dock crossroads." Child places poster and taps CheckButton.
- **In Real Life (Germany):** In Germany, the Act against Unfair Competition (UWG) strictly regulates advertising. Companies are prohibited from making false statements or misleading customers about what a product can do.
- **Fact Card Sources:**
  - Gesetze im Internet (Gesetz gegen den unlauteren Wettbewerb UWG): https://www.gesetze-im-internet.de/uwg_2004/
  - Deutscher Werberat (Verhaltensregeln): https://werberat.de/
  - Bundesverband Digitale Wirtschaft (BVDW): https://www.bvdw.org/
  - Deutscher Industrie- und Handelskammertag (Marketing im Mittelstand): https://www.dihk.de/
  - Gabler Wirtschaftslexikon (Definition Marketing): https://wirtschaftslexikon.gabler.de/definition/marketing-39297
- **Ask Dad Question:** "Papa, when we see an ad on a billboard or on the internet, how do we know if it is telling the real truth?"

---

#### Lesson 17: Hiring and Risk (`hiring`)

- **Pedagogical Goal:** When demand grows, hiring an employee allows a business to produce more. However, hiring introduces fixed wage commitments that must be paid regardless of whether sales are high or low, creating business risk.
- **Ripple Town Cast & Narrative:** Bea's bakery is so popular that she cannot bake enough bread by herself. She decides to hire Leo as an assistant baker. With Leo helping, Bea bakes twice as many loaves. On busy sunny days, the extra bread brings lots of coins, easily covering Leo's wage. But on rainy stormy days when few villagers visit, Bea still must pay Leo his full daily wage from her emergency reserve jar.
- **Starred Terms:**
  - EN: *hire*, *wage*, *risk*
  - DE: *einstellen*, *Gehalt*, *Risiko*
- **Interactive Toy Mechanics:**
  - *Layout:* Bea's bakery kitchen showing Bea, an open assistant baker apron for Leo, a daily weather dial (Sunny vs Stormy), and Bea's emergency reserve coin jar.
  - *Interaction:*
    - Solo mode: Bea bakes 4 loaves. Sunny day: 4 sales (16 revenue - 8 costs = 8 profit). Stormy day: 2 sales (8 revenue - 4 costs = 4 profit).
    - Hired mode: Child drags Leo into the kitchen to hire him. Production capacity rises to 8 loaves. Leo's daily wage is fixed at 5 coins.
      - On Sunny Day: 8 sales (32 revenue - 16 costs - 5 wage = 11 profit). Extra 3 coins go into reserve.
      - On Stormy Day: 2 sales (8 revenue - 4 costs - 5 wage = -1 loss). 1 coin is automatically withdrawn from the reserve jar to honor Leo's wage.
  - *Gating:* Run both a sunny day and a stormy day with Leo hired to see how wages must be paid regardless of sales.
- **Widget Question:** "On a stormy day, sales were low, but Leo worked his full shift. Drag 5 coins from the reserve jar to pay Leo his guaranteed wage." Child transfers coins to Leo and taps CheckButton.
- **In Real Life (Germany):** In Germany, employers are legally required to pay contracted wages even if business is temporarily slow. Germany also mandates a statutory minimum wage (Mindestlohn) to ensure workers receive fair pay.
- **Fact Card Sources:**
  - Bundesministerium für Arbeit und Soziales (Mindestlohn): https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Mindestlohn/mindestlohn.html
  - Bundesarbeitsgericht (Urteile zu Betriebsrisiko und Lohnanspruch): https://www.bundesarbeitsgericht.de/
  - Institut für Arbeitsmarkt- und Berufsforschung (IAB): https://iab.de/
  - Kreditanstalt für Wiederaufbau (KfW Mittelstandspanel): https://www.kfw.de/
  - Deutsche Bundesbank: https://www.bundesbank.de/
- **Ask Dad Question:** "Papa, how does a shop owner decide when it is safe to hire an assistant without risking running out of money?"

---

#### Lesson 18: Big and Small Business (`scale`)

- **Pedagogical Goal:** Small businesses and large factories have different strengths. Small businesses offer custom craftsmanship, flexibility, and close customer relationships. Large factories achieve economies of scale, producing large quantities of standardized goods at low cost.
- **Ripple Town Cast & Narrative:** Sam crafts custom leather boots one pair at a time in his small workshop, tailoring each pair to the customer's foot. Across the water, Grand Harbor builds a shoe factory with big cutting machines. The factory buys leather by the boatload at a wholesale discount and produces 100 simple work boots a day for only 3 coins each. When Maya needs 50 simple boots for orchard workers, she orders from the factory. When Mayor Moss wants custom-carved formal boots, he visits Sam. Both businesses serve important needs.
- **Starred Terms:**
  - EN: *small business*, *factory*, *scale*
  - DE: *Kleinbetrieb*, *Fabrik*, *Größenvorteil*
- **Interactive Toy Mechanics:**
  - *Layout:* Split screen showing Sam's Artisan Workshop on the left and Grand Harbor Shoe Factory on the right.
  - *Interaction:* Incoming order cards arrive:
    1. Custom order: "Special boots with initials carved for wide feet." Child drags card to Sam's Workshop. Sam crafts them carefully and earns a high price.
    2. Bulk order: "40 plain brown boots for the orchard crew." Child drags card to the Factory. Factory machinery hums and delivers bulk boots at low unit cost.
    - A bulk material slider demonstrates economies of scale: purchasing 1 leather piece costs 2 coins; purchasing 50 sheets at once drops the price to 1 coin per sheet.
  - *Gating:* Route both custom and bulk orders correctly to see the distinct advantages of small craft shops versus large-scale factories.
- **Widget Question:** "Maya needs 30 standard boots quickly at the lowest price for her team. Drag the order to the workshop that produces low-cost boots in bulk." Child drags order to Factory and taps CheckButton.
- **In Real Life (Germany):** Germany's economy is powered by the Mittelstand: thousands of small and medium family-owned businesses known for high-quality specialized products. Germany also hosts large global factories (like car manufacturers) that produce goods at massive scale.
- **Fact Card Sources:**
  - Institut für Mittelstandsforschung Bonn (IfM Bonn Definitionen und Daten): https://www.ifm-bonn.org/
  - Statistisches Bundesamt Destatis (Unternehmensregister): https://www.destatis.de/DE/Themen/Branchen-Unternehmen/Unternehmen/_inhalt.html
  - Bundesministerium für Wirtschaft und Klimaschutz (Mittelstandspolitik): https://www.bmwk.de/Redaktion/DE/Dossier/mittelstand.html
  - Gabler Wirtschaftslexikon (Definition Skaleneffekte): https://wirtschaftslexikon.gabler.de/definition/skaleneffekte-45455
  - Deutscher Industrie- und Handelskammertag (DIHK): https://www.dihk.de/
- **Ask Dad Question:** "Papa, why does Germany have so many family-owned Mittelstand companies instead of only giant corporations?"

---

## Consequences

- **Unblocks Build Task t_9c3bea0e:** Implementation of Group 2 (lessons 11 to 18) can proceed with complete clarity on story beats, diagrams, vocabulary, toys, questions, and sources.
- **Vocabulary and Registry Parity:** Stable IDs (`profit`, `sales`, `ticketsize`, `marketshare`, `competition`, `marketing`, `hiring`, `scale`) are fixed and ready to be registered in `src/lessons.ts`.
- **Quality Assurance:** All 8 lessons maintain zero em or en dashes, bilingual parity, pure SVG rendering, and single-path interactive toy mechanics.
