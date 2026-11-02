# ADR 0003: Group 3 (Markets) Curriculum and Toy Mechanics

## Status

Accepted

## Context

Ripples is a bilingual (English and German) financial education web app built for an 8-year-old child on a laptop and tablet.
Group 1 (Money and Work, lessons 1 to 10) established foundational concepts: money, work, savings, loans, banks, interest, taxes, inflation, printing money, and interest rates.
Group 2 (Business, lessons 11 to 18) introduced business operations: costs and profit, sales, ticket size, market share, competition, marketing, hiring and risk, and scale.

Group 3 (Markets, lessons 19 to 26) introduces how economic actors interact in organized markets, trade standardized goods, pool capital, fund large public and private ventures, and manage uncertainty:
1. Supply and Demand (`supplydemand`)
2. Raw Goods and Commodities (`commodities`)
3. Gold and Safe Harbors (`gold`)
4. Owning a Piece of a Company (`stocks`)
5. Lending with Bonds (`bonds`)
6. Stocks or Bonds? (`stocksvsbonds`)
7. Price Locks and Protection (`derivatives`)
8. Giving Back Forever (`philanthropy`)

GitHub Issue #25 (Research: Group 3 Toy Mechanics for Derivatives & Bonds) poses the core research question:
"What intuitive, hands-on visual metaphors and slider mechanics allow an 8-year-old to understand stock ownership, bond coupons/yields, commodities, and derivatives (risk hedging/options) without jargon?"

To prepare for implementation in task t_51061d79 (GitHub issue #28), this ADR establishes:
1. Intuitive visual metaphors and tactile slider mechanics for complex financial instruments (stocks, bond coupon/yield dynamics, commodities, derivatives and risk hedging).
2. The complete pedagogical progression, Ripple Town stories, starred vocabulary, widget questions, German real-life cards, verified primary sources, and Ask Dad questions for all 8 lessons in Group 3.

All lessons and toys must comply with standing project standards:
1. Strict bilingual parity (EN and DE written together, child-friendly du-form in German).
2. No em dashes or en dashes anywhere (enforced by vitest across the repo).
3. Zero emoji: all graphics drawn as pure SVG code using the shared kit.
4. Tactile interaction in toys: drag-and-drop or direct controls with immediate visual cause and effect.
5. Single interaction path: never offer duplicate buttons or competing shortcuts for the same action.
6. Progression gating: the ready button stays disabled until the child completes the toy activity (onDone).
7. ActionPrompt styling: passive instructions in dashed cards, action triggers in solid buttons with explicit verb phrases (no boolean ON/OFF toggles).
8. Geometric layouts: triangular or grid layouts for multi-party flows rather than flat horizontal crossing rows.
9. Fits inside 1366x768 laptop viewport with zero vertical or horizontal scrolling in lesson runners and toys.
10. Sourced fact cards: at least 5 claims per lesson with verified primary https URLs from official institutions.

## Decision

We establish four foundational pedagogical metaphors for markets, define the Group 3 lesson sequence and metadata, and provide the complete specifications for lessons 19 through 26.

### 1. Pedagogical Metaphors and Slider Mechanics for the 4 Complex Concepts

```
=============================================================================
FOUR COMPLEX MARKET CONCEPTS: INTUITIVE METAPHORS FOR AN 8-YEAR-OLD
=============================================================================

1. STOCKS (Ownership Slice)
   [ Maya's Cider Press: 10 Wooden Tiles ]
   - Child holds 2 tiles (20% co-owner).
   - Good year: 30 coins profit -> 3 coins drop into your pouch per tile (Dividend).
   - Growth: cider becomes popular -> buyers bid 15 coins for your 10-coin tile.

2. BONDS & COUPONS (The Loan Seesaw / "Zins-Wippe")
   [ Mayor Moss Lighthouse Loan Scroll: 100 Coins + 3 Annual Coupon Stamps ]
   - Each Harvest Day: tear off 1 coupon stamp -> collect 5 coins.
   - At maturity (3 years) -> get back 100 coins principal.
   - The Seesaw:
     Bank Interest Rises (8%) ---> Existing 5-coin Bond Price DROPS (85 coins)
     Bank Interest Falls (2%) ---> Existing 5-coin Bond Price RISES (115 coins)

3. COMMODITIES (Standard Silo & Weather Shocks)
   [ Central Grain Silo: All Wheat is Identical ]
   - Maya's wheat = Tom's wheat. Traded in standard sacks at central warehouse.
   - Supply cannot change overnight: wheat takes a full season to grow.
   - Drought strikes (silo empty, demand high) ---> Sack price jumps to 8 coins.
   - Bumper harvest (silo overflowing)         ---> Sack price drops to 2 coins.

4. DERIVATIVES & RISK HEDGING (The Harvest Protection Shield)
   [ Pre-Harvest Lock-in Contract: Peace of Mind ]
   - Spring: Maya faces flood risk (price drops); Bea faces drought risk (price spikes).
   - Solution: Sign 4-coin Forward Contract in spring.
   - Autumn Storms hit: Market price swings to 8 or 1 coins.
   - Because they locked 4 coins: Maya and Bea both stay green, safe, and profitable!
   - Option Ticket: Pay 1 coin fee for a price cap; walk away if market is cheaper.
=============================================================================
```

#### A. Stock Ownership: The Cider Press Share Tiles
- Problem: An 8-year-old often hears the word "stock" and imagines casino chips or numbers on television screens.
- Metaphor: A physical company certificate divided into 10 wooden share tiles.
  Maya wants to build a large cider mill and orchard press costing 100 coins. Instead of taking a bank loan with fixed debt repayments, Maya issues 10 wooden share tiles. She keeps 2 tiles and sells 8 tiles to neighbors for 10 coins each.
- Mechanics:
  1. Dividends (Ernte-Gewinnausschüttung): If the orchard earns 30 coins of profit, Maya divides it among the 10 tiles. The child (holding 2 tiles) receives 6 coins (3 coins per tile) directly into their coin pouch. In a drought year with 0 profit, 0 coins are distributed.
  2. Share Price Fluctuations (Aktienkurs): When the orchard invents a famous spiced cider, villagers queue up to buy tiles. Villagers bid 16 coins for a tile that originally cost 10 coins. If trees catch a fungus, bids sink to 6 coins. The child can choose to hold for dividends or sell for capital gain.

#### B. Bond Coupons and Yields: The Loan Scroll and the "Zins-Wippe" (Interest Seesaw)
- Problem: Why do bonds exist when we have stocks? Why do bond prices drop when interest rates rise?
- Metaphor 1 (The Instrument): The Town Hall Loan Scroll with Tear-Off Coupons.
  Mayor Moss needs 100 coins to build a protective stone harbor wall. The town cannot sell shares (citizens own the town, not a private stock company). The town issues a 3-year bond: 100 coins principal, plus 3 detachable coupon tickets. On every annual Harvest Day, the holder tears off a coupon ticket and receives 5 coins from Town Hall. At year 3, Town Hall returns the full 100 coins.
- Metaphor 2 (Price vs Yield / "Die Zins-Wippe"):
  Existing bonds trade on the market. If the Town Bank raises interest rates on new accounts from 4% to 8%, nobody wants to pay 100 coins for an old paper that only pays 5 coins! To sell the old bond, the seller must lower the price tag to 85 coins. The buyer pays 85 coins, collects 5 coins each year, and gets 100 coins at the end, so their real yield matches 8%.
  Conversely, if bank rates fall to 2%, the 5-coin coupon is very valuable, and buyers bid 115 coins for it.
- Slider Mechanic: An interactive mechanical seesaw balance.
  - Left seat: Town Bank Interest Rate slider (1% to 8%).
  - Right seat: Bond Market Price Tag (120 coins down to 80 coins).
  - Center fulcrum: Fixed 5-coin annual coupon paper.
  - Moving the interest slider up pushes the left side down, tilting the right side down (bond price drops). Moving interest down lifts the bond price up.

#### C. Commodities: The Interchangeable Silo and Weather Shocks
- Problem: What makes raw goods different from finished bakery bread or leather shoes?
- Metaphor: Standard Raw Building Blocks of Nature.
  A loaf of honey bread has Bea's personal recipe and brand. A pair of custom boots has Sam's hand craftsmanship. But a sack of raw golden wheat from Farmer Maya is chemically identical to wheat from Farmer Tom. They are commodities (Rohstoffe).
  Because they are interchangeable, producers do not sell them in small gift shops. They store them in a shared central silo and trade them on a central exchange (Warenbörse).
- Supply Inelasticity and Weather Shocks:
  Unlike factory toys that can be made in hours, agricultural and mineral commodities require months or years of natural cycles. If a heatwave cuts the wheat harvest in half, supply shrinks while every hungry person still needs bread. Scarcity sends the commodity price soaring.
- Slider Mechanic:
  A transparent central town silo with a weather controller (Severe Drought, Normal Rain, Bumper Harvest). The silo level changes between 20 sacks, 50 sacks, and 90 sacks against a fixed bakery demand of 50 sacks. The price meter dynamically calculates the clearing price (8 coins, 4 coins, or 2 coins per sack).

#### D. Derivatives and Risk Hedging: The Harvest Protection Shield
- Problem: Derivatives are frequently treated as opaque speculative bets. Their core economic purpose is risk protection (hedging).
- Metaphor: The Pre-Harvest Handshake Agreement (Forward Contract / Terminkontrakt).
  In spring, Farmer Maya plants wheat. She spends 150 coins on seed and tractor fuel (cost = 3 coins per sack for 50 sacks). She fears that a flood across the continent will crash wheat prices to 1 coin in autumn, ruining her farm.
  At the same time, Baker Bea promises school lunches in autumn for fixed bread prices. She fears that a heatwave will send wheat prices to 8 coins, bankrupting her bakery.
  Maya and Bea meet in spring at the harbor table. They sign a contract: "In autumn, Maya will deliver 50 sacks of wheat at 4 coins per sack, and Bea will buy them at 4 coins, regardless of what the weather does."
  This contract is a derivative (its value comes from the underlying wheat). Both parties are hedged: Maya locks in a safe 1 coin profit per sack; Bea locks in an affordable flour cost. Both sleep peacefully through autumn storms.
- Metaphor Extension (Options as Insurance Tickets):
  Bea can also buy an Option Ticket (Kaufoption) for 1 small coin from Maya. The ticket gives Bea the right (but not the obligation) to buy wheat at 4 coins. If drought sends market wheat to 8 coins, Bea uses her ticket. If weather is perfect and market wheat falls to 2 coins, Bea buys cheap wheat at 2 coins on the open market, and lets the ticket expire. Maya keeps the 1-coin ticket fee as an insurance premium.
- Slider & Dial Mechanic:
  Split screen: Maya's Farm on left, Bea's Bakery on right.
  Center toggle: "No Contract (Gamble on Weather)" vs "4-Coin Price Lock Shield".
  Weather Wheel: Spin to select Drought (market 8 coins), Normal (market 4 coins), or Flood (market 1 coin).
  In unprotected mode, severe weather causes either the farm or bakery to flash red with a loss warning. In locked mode, both characters stay green, smiling, and financially secure.

---

### 2. Group 3 Lesson Sequence and Metadata

| Order | ID | English Title | German Title |
| --- | --- | --- | --- |
| 19 | supplydemand | Supply and demand | Angebot und Nachfrage |
| 20 | commodities | Raw goods and commodities | Rohstoffe und Grundgüter |
| 21 | gold | Gold and safe harbors | Gold und sichere Häfen |
| 22 | stocks | Owning a piece of a company | Anteile und Aktien |
| 23 | bonds | Lending with bonds | Kredite und Anleihen |
| 24 | stocksvsbonds | Stocks or bonds? | Aktien oder Anleihen? |
| 25 | derivatives | Price locks and protection | Absicherung und Derivate |
| 26 | philanthropy | Giving back forever | Stiftungen und Schenken |

---

### 3. Detailed Lesson Specifications

#### Lesson 19: Supply and Demand (`supplydemand`)

- **Pedagogical Goal:** Teach that prices in an open market are determined by the balance between how much sellers have to sell (supply) and how much buyers want to buy (demand). When price is set at the market clearing point (equilibrium), supply matches demand without shortages or unsold waste.
- **Ripple Town Cast & Narrative:** Finn arrives at Ripple Town harbor with 6 freshly caught trout. 6 villagers want fish for lunch. If Finn demands 8 coins per fish, only 1 wealthy captain buys, and 5 fish sit spoiling in the sun (surplus). If Finn charges only 1 coin, 15 villagers rush in shouting, fish sell out in seconds, and most villagers go home hungry (shortage). At 4 coins, exactly 6 villagers buy all 6 fish. The price balances the market.
- **Starred Terms:**
  - EN: *supply*, *demand*, *market price*
  - DE: *Angebot*, *Nachfrage*, *Marktpreis*
- **Interactive Toy Mechanics:**
  - *Layout:* Pier market stand. Left side shows Finn's fish crates (Supply). Right side shows the villager queue (Demand). Center shows the wooden price tag on the market scale.
  - *Interaction:* The child adjusts the price tag slider from 1 to 8 coins.
    - At 1 to 2 coins: Demand swells to 12 villagers, supply is only 6 fish (alert: "Shortage! Not enough fish for everyone").
    - At 6 to 8 coins: Demand shrinks to 2 villagers, 4 fish remain in crates (alert: "Surplus! Fish are sitting unsold").
    - At 4 coins: Market scale balances evenly. Exactly 6 buyers purchase 6 fish. A golden "Market balanced" banner pops up.
  - *Gating:* Child must balance the market at the 4-coin equilibrium price after observing both a shortage and a surplus.
- **Widget Question:** "Finn has 4 fresh fish. 4 villagers have 3 coins each to spend. Move the price tag slider so every fish is sold and every hungry villager gets lunch." Child sets slider to 3 coins and taps CheckButton.
- **In Real Life (Germany):** In Germany, weekly markets and modern exchanges use supply and demand to set prices. If a bad frost damages strawberry fields in Lower Saxony, strawberries become scarce and their supermarket price rises. When harvest is plentiful, prices drop so all berries find buyers.
- **Fact Card Sources:**
  - Gabler Wirtschaftslexikon (Marktpreis): https://wirtschaftslexikon.gabler.de/definition/marktpreis-38454
  - Deutsche Börse Group (Handelsplätze und Marktmechanismus): https://www.deutsche-boerse.com/dbg-de/maerkte-services/handel/handelsplaetze
  - European Central Bank (Educational Resources on Price Stability): https://www.ecb.europa.eu/ecb-and-you/educational/html/index.en.html
  - Statistisches Bundesamt Destatis (Preise und Preisindizes): https://www.destatis.de/DE/Themen/Wirtschaft/Preise/_inhalt.html
  - Deutsche Bundesbank (Schule und Bildung): https://www.bundesbank.de/de/service/schule-und-bildung
- **Ask Dad Question:** "Papa, what is something in our city that gets more expensive when lots of people want it at the same time?"

---

#### Lesson 20: Raw Goods and Commodities (`commodities`)

- **Pedagogical Goal:** Teach that commodities are standard, uniform raw materials produced by nature (like grain, wood, oil, and metals). Unlike specialized finished products, one sack of wheat is identical to another, so they are traded in bulk on central exchanges. Their prices fluctuate based on harvests, weather, and world demand.
- **Ripple Town Cast & Narrative:** Farmer Maya and Farmer Tom both bring sacks of golden wheat to the central Ripple Town grain silo. Maya's wheat is the same quality as Tom's wheat. They do not sell individual sacks with fancy labels; they pour them into the town silo as standard raw materials (*commodities*). When a long drought strikes the valley, the silo runs low. All town bakeries need flour, so the price of wheat sacks shoots up, making bread more expensive to bake.
- **Starred Terms:**
  - EN: *raw material*, *commodity*, *exchange*
  - DE: *Rohstoff*, *Standardware*, *Warenbörse*
- **Interactive Toy Mechanics:**
  - *Layout:* Central transparent grain silo in the center with a measurement scale. Weather controller on the left (Drought, Normal Rain, Super Harvest). Town bakery order queue on the right (requiring 50 sacks).
  - *Interaction:* The child switches the weather setting.
    - Drought: Silo drops to 20 sacks. High scarcity pushes the sack price gauge to 8 coins.
    - Normal Rain: Silo fills to 50 sacks. Price gauge balances at 4 coins.
    - Super Harvest: Silo overflows to 90 sacks. Oversupply drops the price gauge to 2 coins.
  - Tapping "Open Silo Gate for Bakers" lets bakers purchase their quota at the current market price, showing how grain prices directly affect bakery costs.
  - *Gating:* Child must run both drought (scarcity) and super harvest (abundance) scenarios to observe how weather changes commodity prices.
- **Widget Question:** "A summer drought has made wheat scarce. The silo has only 20 sacks, but bakers need 50. Adjust the weather dial to Normal Rain so the silo fills to 50 sacks at a fair 4-coin price." Child moves dial to Normal Rain and taps CheckButton.
- **In Real Life (Germany):** German industries need huge amounts of raw materials like wheat, copper, and timber. Germany trades agricultural commodities and energy on specialized exchanges like the European Energy Exchange (EEX) in Leipzig, where prices adjust daily based on global supply and weather.
- **Fact Card Sources:**
  - Gabler Wirtschaftslexikon (Rohstoffe): https://wirtschaftslexikon.gabler.de/definition/rohstoffe-46814
  - Statistisches Bundesamt Destatis (Erzeugerpreisindex gewerbliche Produkte): https://www.destatis.de/DE/Themen/Wirtschaft/Preise/Erzeugerpreisindex-gewerbliche-Produkte/_inhalt.html
  - Deutsche Börse Group (EEX und Commodities): https://www.deutsche-boerse.com/dbg-de/ueber-uns/deutsche-boerse-group/geschaeftsfelder
  - Deutsche Börse Group (Handelsplätze): https://www.deutsche-boerse.com/dbg-de/maerkte-services/handel
  - Gabler Wirtschaftslexikon (Terminwaren): https://wirtschaftslexikon.gabler.de/definition/terminwaren-47561
- **Ask Dad Question:** "Papa, where does Germany get raw materials like metals, oil, and timber to build cars and houses?"

---

#### Lesson 21: Gold and Safe Harbors (`gold`)

- **Pedagogical Goal:** Teach why gold has served as a store of value across millennia. Gold is rare, chemically durable (does not rust or decay), and cannot be created by governments. During economic storms, inflation, or crises, investors often move money into gold as a safe harbor (*sicherer Hafen*), which drives up its market price.
- **Ripple Town Cast & Narrative:** Ripple Town faces a stormy year where prices swing unpredictably and villagers worry about the value of paper notes. Captain Coral shows Otto the old harbor vault containing a shining gold bar. Coral explains: this bar was mined hundreds of years ago, survived shipwrecks, and never rusted. In calm times, villagers invest their coins in productive bakeries and ships. But when stormy uncertainty hits, villagers buy gold to keep their savings safe, turning gold into a trusted safe harbor.
- **Starred Terms:**
  - EN: *gold*, *store of value*, *safe harbor*
  - DE: *Gold*, *Wertspeicher*, *sicherer Hafen*
- **Interactive Toy Mechanics:**
  - *Layout:* Ripple Town harbor scene. Left side has productive business investments (Maya's Orchard and Bea's Bakery). Right side has the sturdy stone Gold Vault. Center has an Economic Climate Dial (Sunny Calm vs Stormy Crisis).
  - *Interaction:*
    - In Sunny Calm mode: Businesses earn healthy profits (green coin badges). Coins placed in the bakery grow. The gold price sits at a stable baseline (10 coins per ounce).
    - In Stormy Crisis mode: Business earnings become volatile and uncertain. The child drags coins from the shaky business stall into the safe Gold Vault.
    - As more coins move into the Gold Vault, gold demand rises and the gold price ticker climbs from 10 to 18 coins per ounce, preserving purchasing power through the storm.
  - *Gating:* Child must protect savings by transferring coins to the Gold Vault during a storm and observe how gold acts as a safe store of value.
- **Widget Question:** "A sudden economic storm makes business earnings uncertain. Drag 3 coins from the open market into the Gold Vault to protect your savings in a safe harbor." Child drags coins into the vault and taps CheckButton.
- **In Real Life (Germany):** The German central bank (Deutsche Bundesbank) holds over 3,300 tonnes of gold in Frankfurt, London, and New York as a national reserve. Many German savers also keep small gold bars or coins at home or in bank vaults as protection against high inflation.
- **Fact Card Sources:**
  - Deutsche Bundesbank (Das Gold der Bundesbank): https://www.bundesbank.de/de/startseite/gold-762904
  - Deutsche Bundesbank (Rede: Das Gold der Deutschen): https://www.bundesbank.de/de/presse/reden/das-gold-der-deutschen-897330
  - Deutsche Bundesbank (Geldmuseum): https://www.bundesbank.de/de/bundesbank/geldmuseum
  - European Central Bank (What is money?): https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_money.en.html
  - Verbraucherzentrale (Das kleine Einmaleins der Geldanlage): https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen/bevor-sie-geld-anlegen-das-kleine-einmaleins-der-geldanlage-10622
- **Ask Dad Question:** "Papa, why do people trust shiny gold even when paper money and bank accounts change value?"

---

#### Lesson 22: Owning a Piece of a Company (`stocks`)

- **Pedagogical Goal:** Teach that a stock share represents fractional ownership in a business. Stockholders are co-owners who share in company profits through dividends and benefit when the company grows in value. However, stocks carry risk: if the business suffers losses, dividends stop and share values fall, with no guaranteed payout.
- **Ripple Town Cast & Narrative:** Maya wants to expand her small apple farm into a grand cider press that can press barrels of sparkling juice. Building the press costs 100 coins. Maya does not want a bank loan with heavy interest payments every month. Instead, Maya divides the new enterprise into 10 wooden share certificates (*Aktien*). She sells 8 shares to neighbors for 10 coins each. In autumn, the cider press makes 30 coins profit. Maya pays 3 coins for each share as a *dividend*. When everyone loves the cider, villagers offer 15 coins to buy a share!
- **Starred Terms:**
  - EN: *stock share*, *shareholder*, *dividend*
  - DE: *Aktie*, *Aktionär*, *Dividende*
- **Interactive Toy Mechanics:**
  - *Layout:* Maya's Cider Press in the center, showing 10 certificate slots. The child's wallet is at the bottom-left holding 2 share tiles (20% ownership). A Town Trading Board is at the bottom-right.
  - *Interaction:*
    - The child adjusts an Annual Harvest Profit slider (Frost = 0 coins profit, Normal = 20 coins profit, Bumper = 50 coins profit).
    - Tapping "Distribute harvest profit" animates coins flowing out of Maya's press and landing on each share tile. The child collects their dividend directly into their coin wallet (0 coins in frost, 4 coins in normal, 10 coins in bumper).
    - On the Trading Board, town buyer bids update based on the company's track record. After a bumper year, buyers offer 16 coins per share. The child can tap "Sell 1 share to villager" to cash in capital gains, or keep both shares for future dividends.
  - *Gating:* Child must collect dividends across at least two harvest cycles and experience how share price responds to company performance.
- **Widget Question:** "The cider press earned 40 coins of profit this year, split equally across 10 shares. You own 2 shares. Collect your 8-coin dividend payout into your wallet." Child taps the dividend collection trigger and taps CheckButton.
- **In Real Life (Germany):** In Germany, large companies like Siemens, SAP, and BMW are joint-stock companies (Aktiengesellschaften, AG). Millions of people buy shares on the Frankfurt Stock Exchange (Börse Frankfurt / Xetra) to become part-owners and receive annual dividends.
- **Fact Card Sources:**
  - Gesetze im Internet (Aktiengesetz § 1 Wesen der AG): https://www.gesetze-im-internet.de/aktg/__1.html
  - Gesetze im Internet (Aktiengesetz § 8 Nennbetragsaktien und Stückaktien): https://www.gesetze-im-internet.de/aktg/__8.html
  - Gesetze im Internet (Aktiengesetz § 60 Gewinnverteilung): https://www.gesetze-im-internet.de/aktg/__60.html
  - Gabler Wirtschaftslexikon (Aktie Definition): https://wirtschaftslexikon.gabler.de/definition/aktie-31763
  - Deutsche Börse (So funktioniert die Börse): https://live.deutsche-boerse.com/einstieg-alt/so-funktioniert-die-boerse
  - Verbraucherzentrale (Finanzglossar Aktien): https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen/finanzglossar-durchblick-von-a-wie-aktien-bis-z-wie-zins-15907
- **Ask Dad Question:** "Papa, if you buy a share of a company, do you get to visit the factory and say you own part of it?"

---

#### Lesson 23: Lending with Bonds (`bonds`)

- **Pedagogical Goal:** Teach that a bond is a formal loan certificate issued by a government or corporation. The buyer acts as a lender, receiving regular fixed coupon payments and the return of their original principal at maturity. Teach the fundamental inverse relationship: when market interest rates rise, existing bond prices fall (the seesaw effect).
- **Ripple Town Cast & Narrative:** Mayor Moss needs 100 coins to build a protective stone harbor wall. The town cannot sell shares because public walls belong to everyone. Instead, Mayor Moss issues 3-year harbor *bonds* (*Anleihen*). Sam buys a bond for 100 coins. The paper scroll has 3 coupon tickets attached. On each annual Harvest Day, Sam tears off one ticket and receives 5 coins from Town Hall. After 3 years, Town Hall returns Sam's 100 coins. But when the Town Bank raises interest rates to 8%, nobody wants Sam's 5-coin paper for 100 coins, so its market price tag drops to 85 coins.
- **Starred Terms:**
  - EN: *bond*, *coupon*, *maturity*
  - DE: *Anleihe*, *Kupon*, *Laufzeit*
- **Interactive Toy Mechanics:**
  - *Layout:* The Town Hall Bond Desk at the top, holding the 100-coin scroll with 3 detachable coupon tickets. In the center sits "Die Zins-Wippe" (The Interest Seesaw).
  - *Interaction:*
    - Step 1: Child taps "Advance 1 year to Harvest Day" and drags the tear-off coupon ticket to the Town Hall teller to collect the guaranteed 5-coin coupon payment.
    - Step 2: The Seesaw Mechanic. Left side has a Town Bank Interest Rate slider (1% to 8%). Right side holds the bond's market price tag (120 coins down to 80 coins). Center fulcrum holds the fixed 5-coin coupon.
    - Dragging bank interest UP to 8% tilts the seesaw: the bond market price tag sinks to 85 coins (because buyers demand higher yield).
    - Dragging bank interest DOWN to 2% tilts the seesaw the other way: the bond market price tag floats up to 115 coins (because a 5-coin coupon is very attractive).
  - *Gating:* Child must collect a coupon payment and tilt the seesaw to observe both price drop (rising rates) and price gain (falling rates).
- **Widget Question:** "The Town Bank raised interest rates on new savings accounts to 7%. What happens to the market price of an older bond paying only 4%? Adjust the seesaw to show the discounted price tag." Child tilts seesaw so price drops below 100 coins and taps CheckButton.
- **In Real Life (Germany):** The Federal Republic of Germany issues government bonds called Bundesanleihen via the German Finance Agency (Deutsche Finanzagentur). They are considered among the safest investments in the world, paying reliable annual coupons backed by German tax revenue.
- **Fact Card Sources:**
  - Deutsche Finanzagentur (Bundesanleihen): https://www.deutsche-finanzagentur.de/bundeswertpapiere/bundeswertpapierarten/bundesanleihen/
  - Gesetze im Internet (BGB § 793 Schuldverschreibung auf den Inhaber): https://www.gesetze-im-internet.de/bgb/__793.html
  - Gabler Wirtschaftslexikon (Anleihe Definition): https://wirtschaftslexikon.gabler.de/definition/anleihe-28518
  - Deutsche Börse Group (Handelsplätze und Rentenmarkt): https://www.deutsche-boerse.com/dbg-de/maerkte-services/handel/handelsplaetze
  - Verbraucherzentrale (Finanzglossar Anleihen): https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen/finanzglossar-durchblick-von-a-wie-aktien-bis-z-wie-zins-15907
- **Ask Dad Question:** "Papa, why do governments borrow money with bonds instead of just saving up coins before building bridges and schools?"

---

#### Lesson 24: Stocks or Bonds? (`stocksvsbonds`)

- **Pedagogical Goal:** Directly compare equity (stocks) and debt (bonds). Co-owners (stocks) have unlimited profit upside and voting rights, but bear the risk of zero payouts and total loss. Lenders (bonds) receive fixed predictable interest and have legal priority over shareholders if a company fails, but do not share in extra business windfalls.
- **Ripple Town Cast & Narrative:** Captain Coral equips a large sea expedition ship to seek trade goods across distant oceans. Coral needs 200 coins to buy sails and provisions. Finn chooses to buy a Stock Share (becoming a co-owner of the voyage). Bea chooses to buy a Ship Bond (becoming a lender). When the ship returns with a chest of glittering pearls, Finn's stock share pays a massive dividend, while Bea receives only her fixed 5-coin coupon. But when another ship hits rocks and barely recovers cargo, Bea is paid her 5 coins first by law, leaving Finn with nothing.
- **Starred Terms:**
  - EN: *equity*, *debt*, *priority*
  - DE: *Eigenkapital*, *Fremdkapital*, *Rangfolge*
- **Interactive Toy Mechanics:**
  - *Layout:* Expedition Ship in center dock. Left side: Finn's Stock Portfolio (Equity). Right side: Bea's Bond Portfolio (Debt). Center: Voyage Outcome Selector.
  - *Interaction:*
    - The child selects 1 of 3 voyage results:
      1. Grand Treasure (100 coins revenue): Bondholder Bea receives her fixed 5 coins. Stockholder Finn receives the remaining 95 coins!
      2. Modest Voyage (15 coins revenue): Bondholder Bea receives her fixed 5 coins. Stockholder Finn receives the remaining 10 coins.
      3. Shipwreck & Scraped Cargo (4 coins salvaged): The priority rule activates. All 4 coins go to Bea (creditor priority under insolvency rules). Finn receives 0 coins.
  - *Gating:* Child must run both the Grand Treasure scenario (seeing stock upside) and the Shipwreck scenario (seeing bond legal priority).
- **Widget Question:** "The expedition ship earned only 6 coins from its catch. Bondholders must receive their fixed 5 coins before shareholders get anything. Drag 5 coins to Bea the bondholder first." Child drags 5 coins to Bea and taps CheckButton.
- **In Real Life (Germany):** Under German insolvency law (Insolvenzordnung InsO §§ 38, 39), if a company goes bankrupt, creditors and bondholders must be repaid from remaining assets before any shareholders receive a single cent. This is why stocks are riskier than bonds.
- **Fact Card Sources:**
  - Gesetze im Internet (Insolvenzordnung InsO § 38 Insolvenzgläubiger): https://www.gesetze-im-internet.de/inso/__38.html
  - Gesetze im Internet (Insolvenzordnung InsO § 39 Nachrangige Insolvenzgläubiger): https://www.gesetze-im-internet.de/inso/__39.html
  - Verbraucherzentrale (Finanzglossar Eigen- und Fremdkapital): https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen/finanzglossar-durchblick-von-a-wie-aktien-bis-z-wie-zins-15907
  - Gabler Wirtschaftslexikon (Aktie Definition): https://wirtschaftslexikon.gabler.de/definition/aktie-31763
  - Gabler Wirtschaftslexikon (Anleihe Definition): https://wirtschaftslexikon.gabler.de/definition/anleihe-28518
- **Ask Dad Question:** "Papa, if you were investing money for my future, would you choose the exciting ship shares or the steady harbor bonds?"

---

#### Lesson 25: Price Locks and Protection (`derivatives`)

- **Pedagogical Goal:** Teach that derivatives are financial contracts whose value is derived from an underlying real asset (such as grain, oil, or currencies). Their primary economic role is risk hedging (*Absicherung*), enabling farmers and producers to lock in prices in advance so that sudden weather disasters or price shocks do not bankrupt them.
- **Ripple Town Cast & Narrative:** In spring, Farmer Maya plants 50 sacks of wheat. Seeds and diesel cost her 150 coins (3 coins per sack). If autumn brings a massive flood elsewhere and wheat prices drop to 1 coin, Maya will go bankrupt. Meanwhile, Baker Bea promises school lunches in autumn for fixed bread prices. If a drought spikes wheat to 8 coins, Bea will go broke. Maya and Bea meet in spring and sign a Forward Lock-in Contract (*Terminkontrakt*): Maya promises to deliver 50 sacks at 4 coins, and Bea promises to buy at 4 coins, whatever happens to the weather. Both are protected from bad surprises.
- **Starred Terms:**
  - EN: *derivative*, *hedging*, *contract*
  - DE: *Derivat*, *Absicherung*, *Terminvertrag*
- **Interactive Toy Mechanics:**
  - *Layout:* Maya's Farm on the left, Bea's Bakery on the right. Protection Desk in the center with a toggle: "No Contract (Gamble on Weather)" vs "4-Coin Price Lock Shield". Weather Wheel at the bottom.
  - *Interaction:*
    - Unprotected Mode: The child spins the weather wheel.
      - If Severe Drought hits: Wheat market price spikes to 8 coins. Bea's bakery turns red with a flashing loss alert (-4 coins per sack).
      - If Super Flood hits: Wheat market price crashes to 1 coin. Maya's farm turns red with a bankruptcy alert (-2 coins per sack).
    - Protected Shield Mode: The child drags the golden 4-Coin Price Lock Contract between Maya and Bea.
      - Now spinning the weather wheel to Drought or Flood keeps both parties green, calm, and profitable (Maya earns 1 coin profit; Bea pays 4 coins for flour).
    - Optional Option Ticket: Bea buys a 1-coin Price Cap Ticket from Maya. If price spikes to 8, Bea uses the ticket at 4. If price drops to 2, Bea buys cheaply at 2 on the market!
  - *Gating:* Child must experience the risk of loss in unprotected mode, then apply the Price Lock Contract to safeguard both businesses through a storm.
- **Widget Question:** "Maya and Bea signed a 4-coin price lock contract in spring. In autumn, a severe drought drove open market prices up to 8 coins. Drag the 4-coin contract stamp to Bea's flour order to honor the agreed locked price." Child applies contract stamp and taps CheckButton.
- **In Real Life (Germany):** German airlines, farmers, and energy utilities use derivatives daily on regulated exchanges like Eurex and EEX. For example, Lufthansa buys fuel derivatives to lock in jet kerosene prices months ahead, protecting ticket prices from sudden oil price spikes.
- **Fact Card Sources:**
  - Gesetze im Internet (Wertpapierhandelsgesetz WpHG § 2 Begriffsbestimmungen Derivate): https://www.gesetze-im-internet.de/wphg/__2.html
  - Gabler Wirtschaftslexikon (Derivate Definition): https://wirtschaftslexikon.gabler.de/definition/derivate-31239
  - Gabler Wirtschaftslexikon (Hedging Definition): https://wirtschaftslexikon.gabler.de/definition/hedging-33310
  - Deutsche Börse Group (Eurex Derivatebörse): https://www.deutsche-boerse.com/dbg-de/ueber-uns/deutsche-boerse-group/geschaeftsfelder
  - Deutsche Börse Group (Handelsplätze): https://www.deutsche-boerse.com/dbg-de/maerkte-services/handel
- **Ask Dad Question:** "Papa, how do airlines know what price to charge for summer holiday flights when jet fuel prices change every single day?"

---

#### Lesson 26: Giving Back Forever (`philanthropy`)

- **Pedagogical Goal:** Teach how individuals and businesses use wealth to support the public good indefinitely through philanthropic foundations (*Stiftungen*). A foundation preserves its initial endowment capital permanently and invests it safely; only the annual earnings (interest and dividends) are spent each year on community causes, creating a perpetual benefit.
- **Ripple Town Cast & Narrative:** Old Captain Coral has saved 1,000 coins over a long career of sea trading. Coral wants to help Ripple Town children learn to read books and swim safely for centuries to come. If Coral gives the 1,000 coins away as cash handouts today, the coins will be spent and gone in two years. Instead, Coral creates the Ripple Harbor Foundation (*Stiftung*). The 1,000 coins stay permanently in the foundation vault (the endowment capital / *Stiftungsvermögen*), invested in stable harbor bonds. Every year, the 40 coins of interest pay for free swimming lessons and library books forever!
- **Starred Terms:**
  - EN: *foundation*, *endowment*, *public good*
  - DE: *Stiftung*, *Stiftungsvermögen*, *Gemeinwohl*
- **Interactive Toy Mechanics:**
  - *Layout:* The Endowment Apple Tree in the center. The trunk and roots represent the protected Endowment Capital (1,000 coins). The hanging red apples represent the Annual Yield / Harvest (40 coins). Below the tree are 3 Community Project Baskets: "Library Books", "Swimming Dock", and "Wildlife Nature Park".
  - *Interaction:*
    - Sustainable Mode: The child harvests the 40 ripe apple coins and drags them into the 3 community project baskets. The projects light up with happy villagers. The tree trunk stays solid and healthy, promising a fresh harvest next year.
    - Danger Demonstration ("The Impatient Mayor"): A toggle shows what happens if a greedy council tries to chop down the tree to spend the 1,000 coins at once. The tree falls, the town has a single noisy party, and the next year there are 0 apples forever.
    - Child restores the living tree and locks the endowment vault.
  - *Gating:* Child must allocate the annual endowment harvest to community projects while keeping the principal endowment intact.
- **Widget Question:** "The Ripple Harbor Foundation earned 40 coins of annual bond interest from its protected endowment. Drag 20 coins to the Library and 20 coins to the Swimming Dock to fund community projects." Child distributes coins and taps CheckButton.
- **In Real Life (Germany):** Germany has over 25,000 foundations (Stiftungen), such as the Robert Bosch Stiftung, the Bertelsmann Stiftung, and the VolkswagenStiftung. Under German civil law (BGB §§ 80 ff.), their original endowment capital must be preserved for eternity, funding scientific research, education, and social projects from annual investment earnings.
- **Fact Card Sources:**
  - Bundesverband Deutscher Stiftungen (Was ist eine Stiftung?): https://www.stiftungen.org/stiftungen/basiswissen-stiftungen/was-ist-eine-stiftung.html
  - Bundesverband Deutscher Stiftungen (10 Fakten über Stiftungen): https://www.stiftungen.org/stiftungen/basiswissen-stiftungen/was-ist-eine-stiftung/10-fakten-ueber-stiftungen.html
  - Gesetze im Internet (BGB § 80 Entstehung einer rechtsfähigen Stiftung): https://www.gesetze-im-internet.de/bgb/__80.html
  - Gesetze im Internet (BGB § 83 Stiftungsgeschäft): https://www.gesetze-im-internet.de/bgb/__83.html
  - Gabler Wirtschaftslexikon (Stiftung Definition): https://wirtschaftslexikon.gabler.de/definition/stiftung-44223
- **Ask Dad Question:** "Papa, what kind of foundation would you like to start to help people long after we are gone?"

---

## Consequences

1. Provides an unambiguous pedagogical blueprint and technical specification for all 8 lessons of Group 3 (Markets), directly enabling implementation in task t_51061d79 (GitHub issue #28).
2. Clarifies how complex financial mechanisms (dividends, bond yield inversions, uniform commodity pricing, risk hedging through forward contracts) can be modeled intuitively for an 8-year-old child through tactile sliders, seesaws, and shields.
3. Establishes 40 verified primary source citations from official institutions (Gesetze im Internet, Deutsche Bundesbank, Deutsche Börse Group, Deutsche Finanzagentur, Destatis, European Central Bank, Verbraucherzentrale, and Bundesverband Deutscher Stiftungen).
4. Strictly adheres to all project rules: no em or en dashes, bilingual English and German parity, zero emoji, progression gating on toys via onDone, and zero-scrolling 1366x768 layouts.
