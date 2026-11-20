import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BakeBeatDiagram,
  CostsDiagram,
  CustomerSaleDiagram,
  HealthyBusinessDiagram,
  LossDiagram,
  ProfitSplitDiagram,
} from "./profit.diagrams";
import { ProfitKitchen } from "./profit.toy";
import "./profit.css";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <ProfitKitchen lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <ProfitKitchen lang={lang} isWidget onWidgetAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "profit",
  story: [
    animatedBeat(
      [
        T(
          "Early in the morning, Bea starts up her oven in Ripple Town.",
          "Früh am Morgen heizt Bea ihren Ofen in Ripple Town an.",
          "Wcześnie rano Bea rozgrzewa piec w Ripple Town.",
        ),
        T(
          "She mixes dough, shapes loaves, and bakes until golden brown.",
          "Sie knetet Teig, formt Laibe und backt sie goldbraun.",
          "Zagniata ciasto, formuje bochenki i piecze je na złocisto-brązowy kolor.",
        ),
        T(
          "The whole street smells of fresh, warm bread. Villagers love it!",
          "Die ganze Straße duftet nach frischem, warmem Brot. Alle lieben es!",
          "Cała ulica pachnie świeżym, ciepłym chlebem. Wszyscy mieszkańcy go uwielbiają!",
        ),
      ],
      BakeBeatDiagram,
    ),
    animatedBeat(
      [
        T(
          "Pip walks up to Bea's bakery counter to buy a fresh loaf.",
          "Pip kommt an Beas Verkaufstheke, um frisches Brot zu kaufen.",
          "Pip podchodzi do lady piekarni Bei, aby kupić świeży bochenek.",
        ),
        T(
          "Pip hands Bea 4 shiny coins to take the bread home.",
          "Pip gibt Bea 4 glänzende Münzen und nimmt das Brot mit.",
          "Pip wręcza Bei 4 błyszczące monety i zabiera chleb do domu.",
        ),
        T(
          "The 4 coins are Bea's sales money. But does Bea get to keep all 4?",
          "Die 4 Münzen sind Beas Einnahme. Aber darf Bea alle 4 behalten?",
          "Te 4 monety to przychód ze sprzedaży Bei. Ale czy Bea może zatrzymać wszystkie 4?",
        ),
      ],
      CustomerSaleDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Baking is not free. Bea had to buy things before baking.",
          "Backen ist nicht umsonst. Bea musste vorher einiges einkaufen.",
          "Pieczenie nie jest darmowe. Bea musiała wcześniej zrobić zakupy.",
        ),
        T(
          "Flour costs 1 coin. Firewood for the oven costs 1 coin.",
          "Mehl kostet 1 Münze. Brennholz für den Ofen kostet 1 Münze.",
          "Mąka kosztuje 1 monetę. Drewno do pieca kosztuje 1 monetę.",
        ),
        T(
          "Renting the oven space costs 1 coin for every loaf.",
          "Die Miete für den Backplatz kostet 1 Münze pro Laib.",
          "Wynajęcie miejsca na piec kosztuje 1 monetę za każdy bochenek.",
        ),
        T(
          "All the money spent to make something is called *costs*.",
          "Das ganze Geld, das man für die Herstellung ausgibt, heißt *Kosten*.",
          "Wszystkie pieniądze wydane na wytworzenie czegoś nazywają się *kosztami*.",
        ),
        T(
          "Bea has 3 coins in total costs for every single loaf.",
          "Bea hat also 3 Münzen Gesamtkosten für jeden einzelnen Laib.",
          "Bea ponosi łącznie 3 monety kosztów za każdy pojedynczy bochenek.",
        ),
      ],
      CostsDiagram,
    ),
    animatedBeat(
      [
        T(
          "When Pip pays 4 coins, Bea cannot keep all of them.",
          "Wenn Pip 4 Münzen zahlt, darf Bea nicht alle behalten.",
          "Gdy Pip płaci 4 monety, Bea nie może zatrzymać ich wszystkich.",
        ),
        T(
          "First, Bea takes 3 coins to pay for flour, wood, and rent.",
          "Zuerst nimmt Bea 3 Münzen, um Mehl, Holz und Miete zu zahlen.",
          "Najpierw Bea bierze 3 monety, aby zapłacić za mąkę, drewno i czynsz.",
        ),
        T(
          "There is 1 coin left over in Bea's money pouch.",
          "In Beas Geldbeutel bleibt genau 1 Münze übrig.",
          "W sakiewce Bei zostaje dokładnie 1 moneta.",
        ),
        T(
          "Money left after paying all costs has a name. It is called *profit*.",
          "Das Geld, das nach allen Kosten übrig bleibt, heißt *Gewinn*.",
          "Pieniądze, które pozostają po opłaceniu wszystkich kosztów, mają swoją nazwę. To jest *zysk*.",
        ),
      ],
      ProfitSplitDiagram,
    ),
    animatedBeat(
      [
        T(
          "What happens if Bea charges only 2 coins for her bread?",
          "Was passiert, wenn Bea nur 2 Münzen für ihr Brot verlangt?",
          "Co się stanie, jeśli Bea zażąda za swój chleb tylko 2 monet?",
        ),
        T(
          "Her costs are still 3 coins for flour, wood, and rent.",
          "Ihre Kosten liegen aber immer noch bei 3 Münzen.",
          "Jej koszty nadal wynoszą 3 monety za mąkę, drewno i czynsz.",
        ),
        T(
          "Bea gets 2 coins, but must pay 3. She is missing 1 coin!",
          "Bea bekommt 2 Münzen, muss aber 3 zahlen. Ihr fehlt 1 Münze!",
          "Bea otrzymuje 2 monety, ale musi zapłacić 3. Brakuje jej 1 monety!",
        ),
        T(
          "Losing money on what you sell is called a *loss*.",
          "Wenn man beim Verkaufen Geld verliert, nennt man das *Verlust*.",
          "Tracenie pieniędzy na sprzedaży nazywa się *stratą*.",
        ),
      ],
      LossDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Bea wants her bakery to stay open for many years.",
          "Bea möchte, dass ihre Bäckerei viele Jahre lang geöffnet bleibt.",
          "Bea chce, aby jej piekarnia działała przez wiele lat.",
        ),
        T(
          "To stay in business, sales must cover all costs.",
          "Um zu überleben, müssen die Einnahmen alle Kosten decken.",
          "Aby przetrwać, przychody ze sprzedaży muszą pokrywać wszystkie koszty.",
        ),
        T(
          "And there must be enough profit left for Bea to feed her family.",
          "Und es muss genug Gewinn übrig bleiben, damit Bea ihre Familie versorgt.",
          "Musi też pozostać wystarczająco dużo zysku, aby Bea mogła wyżywić swoją rodzinę.",
        ),
      ],
      HealthyBusinessDiagram,
    ),
  ],
  toyIntro: T(
    "Help Bea bake bread and set the price. Watch how costs and profit change!",
    "Hilf Bea beim Backen und wähle den Preis. Sieh, wie sich Kosten und Gewinn verändern!",
    "Pomóż Bei upiec chleb i ustal cenę. Zobacz, jak zmieniają się koszty i zysk!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What do we call the money left over after paying all costs?",
        "Wie nennt man das Geld, das nach Abzug aller Kosten übrig bleibt?",
        "Jak nazywamy pieniądze, które pozostają po opłaceniu wszystkich kosztów?",
      ),
      options: [
        { text: T("Costs", "Kosten", "Koszty") },
        { text: T("Profit", "Gewinn", "Zysk"), correct: true },
        { text: T("Borrowing", "Schulden", "Długi") },
      ],
      hint: T(
        "Costs are what you spend to make goods. Profit is the reward you keep after costs are paid.",
        "Kosten sind die Ausgaben für Zutaten. Gewinn ist das Geld, das nach den Kosten übrig bleibt.",
        "Koszty to wydatki na wytworzenie towaru. Zysk to nadwyżka, którą zatrzymujesz po opłaceniu kosztów.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Ingredients cost 2 coins and bread sells for 5 coins. What is the profit?",
        "Die Zutaten kosten 2 Münzen und das Brot wird für 5 Münzen verkauft. Wie hoch ist der Gewinn?",
        "Składniki kosztują 2 monety, a chleb sprzedaje się za 5 monet. Ile wynosi zysk?",
      ),
      options: [
        { text: T("2 coins", "2 Münzen", "2 monety") },
        { text: T("3 coins", "3 Münzen", "3 monety"), correct: true },
        { text: T("7 coins", "7 Münzen", "7 monet") },
      ],
      hint: T(
        "Subtract costs from the selling price: 5 minus 2 equals 3 coins of profit.",
        "Rechne Verkaufspreis minus Kosten: 5 minus 2 ergibt 3 Münzen Gewinn.",
        "Odejmij koszty od ceny sprzedaży: 5 minus 2 daje 3 monety zysku.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Set the bread price so Bea makes at least 2 coins of profit when costs are 2 coins.",
        "Stelle den Brotpreis so ein, dass Bea mindestens 2 Münzen Gewinn macht, wenn die Kosten 2 Münzen betragen.",
        "Ustaw cenę chleba tak, aby Bea osiągnęła co najmniej 2 monety zysku, gdy koszty wynoszą 2 monety.",
      ),
      Widget,
      hint: T(
        "Costs are 2 coins. To keep at least 2 coins of profit, the price must be 4 or 5 coins.",
        "Die Kosten sind 2 Münzen. Für mindestens 2 Münzen Gewinn muss der Preis 4 oder 5 Münzen sein.",
        "Koszty wynoszą 2 monety. Aby zachować co najmniej 2 monety zysku, cena musi wynosić 4 lub 5 monet.",
      ),
    },
  ],
  askDad: T(
    "Papa, when you buy groceries or tools, how do the shops decide how much profit they need to stay open?",
    "Papa, wenn du Werkzeug oder Lebensmittel kaufst, wie entscheiden die Läden, wie viel Gewinn sie zum Überleben brauchen?",
    "Tato, kiedy kupujesz zakupy spożywcze albo narzędzia, jak sklepy decydują, jakiego zysku potrzebują, by utrzymać się na rynku?",
  ),
  realLife: {
    title: {
      en: "Bakeries and profit in India",
      de: "Bäckereien und Gewinn in Deutschland",
      pl: "Piekarnie i zysk w Polsce",
    },
    body: {
      en: "In India, local bakeries and chai shops sell fresh pav, bread, and snacks every morning. But before the shopkeeper takes any money home to feed their family, they must pay for maida (flour), butter, oven fuel, electricity, and shop rent. Only the profit that remains covers family expenses and savings.",
      de: "Eine deutsche Bäckerei verkauft jeden Morgen Brot und Brötchen. Doch bevor der Bäcker Geld mit nach Hause nimmt, muss er Mehl, Strom, Reparaturen und Ladenmiete bezahlen. Nur der verbleibende Gewinn ernährt die Familie des Bäckers.",
      pl: "Polska piekarnia sprzedaje codziennie rano świeży chleb, bułki i rogale. Zanim jednak piekarz zabierze jakiekolwiek pieniądze do domu, musi opłacić mąkę, prąd do pieców, naprawy maszyn oraz czynsz za lokal. Dopiero zysk, który pozostaje po opłaceniu wszystkich kosztów, pozwala utrzymać rodzinę i rozwijać piekarnię.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "In business accounting, profit is the positive difference between earnings (revenue) and expenses (costs) over a given period.",
          de: "Im Rechnungswesen ist Gewinn der positive Unterschiedsbetrag zwischen Erträgen und Aufwendungen einer Periode.",
          pl: "W rachunkowości zysk to dodatnia różnica między przychodami a kosztami ich uzyskania w danym okresie.",
        },
        source: "https://wirtschaftslexikon.gabler.de/definition/gewinn-33630",
      },
      {
        text: {
          en: "Under the Polish Accounting Act (Ustawa o rachunkowości) and German Commercial Code (HGB), businesses must account for all revenues and operating expenses in an income statement.",
          de: "Das Handelsgesetzbuch (HGB) verlangt von Kaufleuten eine Gewinn- und Verlustrechnung, die Aufwendungen und Erträge gegenüberstellt.",
          pl: "Ustawa o rachunkowości nakłada obowiązek sporządzania rachunku zysków i strat, który zestawia przychody i koszty przedsiębiorstwa.",
        },
        source: "https://www.gesetze-im-internet.de/hgb/__242.html",
      },
      {
        text: {
          en: "Official statistics show how raw material prices (flour, grain) and energy costs directly determine product pricing in craft bakeries.",
          de: "Statistische Ämter erfassen Erzeuger- und Verbraucherpreise, um den Einfluss von Energie- und Rohstoffkosten auf Endpreise zu zeigen.",
          pl: "Główny Urząd Statystyczny (GUS) bada wskaźniki cen produkcji, obrazując wpływ kosztów surowców i energii na ceny pieczywa.",
        },
        source: "https://www.destatis.de/DE/Themen/Wirtschaft/Preise/_inhalt.html",
      },
      {
        text: {
          en: "Central banks and economic institutions note that sustainable enterprises must cover costs and earn sufficient profit to reinvest in equipment and weather downturns.",
          de: "Wirtschaftsinstitute betonen, dass nachhaltige Unternehmen Gewinne erwirtschaften müssen, um Investitionen zu tätigen und Krisen zu überstehen.",
          pl: "Ekonomiści wskazują, że stabilne firmy muszą generować zysk, aby inwestować w rozwój i tworzyć poduszkę finansową.",
        },
        source: "https://www.ecb.europa.eu/ecb/educational/html/index.en.html",
      },
      {
        text: {
          en: "Trade associations note that craft bakeries calculate prices to cover raw ingredients, energy for high-temperature ovens, staff wages, and lease expenses.",
          de: "Das Bäckerhandwerk kalkuliert Preise so, dass Rohstoffe, Energie für Backöfen, Personallöhne und Pachtkosten gedeckt sind.",
          pl: "Związki rzemieślnicze wskazują, że piekarnie kalkulują ceny tak, by pokryć surowce, prąd do pieców, płace personelu i koszty najmu.",
        },
        source: "https://www.baeckerhandwerk.de/",
      },
    ],
    simplified: [
      {
        en: "In the lesson, costs are simplified into fixed coin units per loaf. Real bakeries manage variable overhead, batch costs, and wages.",
        de: "In der Lektion werden Kosten vereinfacht in Münzen dargestellt. Echte Bäckereien kalkulieren mit schwankenden Rohstoff- und Lohnkosten.",
        pl: "W lekcji koszty uproszczono do pojedynczych monet. Prawdziwe piekarnie rozliczają czynsz, energię, surowce i wynagrodzenia pracowników.",
      },
      {
        en: "Taxes such as VAT and corporate income tax are omitted at this introductory level to keep the core distinction between revenue and profit crystal clear.",
        de: "Steuern wie Mehrwertsteuer und Ertragsteuern werden hier weggelassen, um den Grundbegriff des Gewinns verständlich zu halten.",
        pl: "Podatki (VAT i dochodowy) pominięto na tym etapie, aby skupić się na podstawowej różnicy między przychodem a zyskiem.",
      },
    ],
  },
};
