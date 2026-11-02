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

const T = (en: string, de: string): Text => ({ en, de });

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
        ),
        T(
          "She mixes dough, shapes loaves, and bakes until golden brown.",
          "Sie knetet Teig, formt Laibe und backt sie goldbraun.",
        ),
        T(
          "The whole street smells of fresh, warm bread. Villagers love it!",
          "Die ganze Straße duftet nach frischem, warmem Brot. Alle lieben es!",
        ),
      ],
      BakeBeatDiagram,
    ),
    animatedBeat(
      [
        T(
          "Pip walks up to Bea's bakery counter to buy a fresh loaf.",
          "Pip kommt an Beas Verkaufstheke, um frisches Brot zu kaufen.",
        ),
        T(
          "Pip hands Bea 4 shiny coins to take the bread home.",
          "Pip gibt Bea 4 glänzende Münzen und nimmt das Brot mit.",
        ),
        T(
          "The 4 coins are Bea's sales money. But does Bea get to keep all 4?",
          "Die 4 Münzen sind Beas Einnahme. Aber darf Bea alle 4 behalten?",
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
        ),
        T(
          "Flour costs 1 coin. Firewood for the oven costs 1 coin.",
          "Mehl kostet 1 Münze. Brennholz für den Ofen kostet 1 Münze.",
        ),
        T(
          "Renting the oven space costs 1 coin for every loaf.",
          "Die Miete für den Backplatz kostet 1 Münze pro Laib.",
        ),
        T(
          "All the money spent to make something is called *costs*.",
          "Das ganze Geld, das man für die Herstellung ausgibt, heißt *Kosten*.",
        ),
        T(
          "Bea has 3 coins in total costs for every single loaf.",
          "Bea hat also 3 Münzen Gesamtkosten für jeden einzelnen Laib.",
        ),
      ],
      CostsDiagram,
    ),
    animatedBeat(
      [
        T(
          "When Pip pays 4 coins, Bea cannot keep all of them.",
          "Wenn Pip 4 Münzen zahlt, darf Bea nicht alle behalten.",
        ),
        T(
          "First, Bea takes 3 coins to pay for flour, wood, and rent.",
          "Zuerst nimmt Bea 3 Münzen, um Mehl, Holz und Miete zu zahlen.",
        ),
        T(
          "There is 1 coin left over in Bea's money pouch.",
          "In Beas Geldbeutel bleibt genau 1 Münze übrig.",
        ),
        T(
          "Money left after paying all costs has a name. It is called *profit*.",
          "Das Geld, das nach allen Kosten übrig bleibt, heißt *Gewinn*.",
        ),
      ],
      ProfitSplitDiagram,
    ),
    animatedBeat(
      [
        T(
          "What happens if Bea charges only 2 coins for her bread?",
          "Was passiert, wenn Bea nur 2 Münzen für ihr Brot verlangt?",
        ),
        T(
          "Her costs are still 3 coins for flour, wood, and rent.",
          "Ihre Kosten liegen aber immer noch bei 3 Münzen.",
        ),
        T(
          "Bea gets 2 coins, but must pay 3. She is missing 1 coin!",
          "Bea bekommt 2 Münzen, muss aber 3 zahlen. Ihr fehlt 1 Münze!",
        ),
        T(
          "Losing money on what you sell is called a *loss*.",
          "Wenn man beim Verkaufen Geld verliert, nennt man das *Verlust*.",
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
        ),
        T(
          "To stay in business, sales must cover all costs.",
          "Um zu überleben, müssen die Einnahmen alle Kosten decken.",
        ),
        T(
          "And there must be enough profit left for Bea to feed her family.",
          "Und es muss genug Gewinn übrig bleiben, damit Bea ihre Familie versorgt.",
        ),
      ],
      HealthyBusinessDiagram,
    ),
  ],
  toyIntro: T(
    "Help Bea bake bread and set the price. Watch how costs and profit change!",
    "Hilf Bea beim Backen und wähle den Preis. Sieh, wie sich Kosten und Gewinn verändern!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What do we call the money left over after paying all costs?",
        "Wie nennt man das Geld, das nach Abzug aller Kosten übrig bleibt?",
      ),
      options: [
        { text: T("Costs", "Kosten") },
        { text: T("Profit", "Gewinn"), correct: true },
        { text: T("Borrowing", "Schulden") },
      ],
      hint: T(
        "Costs are what you spend to make goods. Profit is the reward you keep after costs are paid.",
        "Kosten sind die Ausgaben für Zutaten. Gewinn ist das Geld, das nach den Kosten übrig bleibt.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Ingredients cost 2 coins and bread sells for 5 coins. What is the profit?",
        "Die Zutaten kosten 2 Münzen und das Brot wird für 5 Münzen verkauft. Wie hoch ist der Gewinn?",
      ),
      options: [
        { text: T("2 coins", "2 Münzen") },
        { text: T("3 coins", "3 Münzen"), correct: true },
        { text: T("7 coins", "7 Münzen") },
      ],
      hint: T(
        "Subtract costs from the selling price: 5 minus 2 equals 3 coins of profit.",
        "Rechne Verkaufspreis minus Kosten: 5 minus 2 ergibt 3 Münzen Gewinn.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Set the bread price so Bea makes at least 2 coins of profit when costs are 2 coins.",
        "Stelle den Brotpreis so ein, dass Bea mindestens 2 Münzen Gewinn macht, wenn die Kosten 2 Münzen betragen.",
      ),
      Widget,
      hint: T(
        "Costs are 2 coins. To keep at least 2 coins of profit, the price must be 4 or 5 coins.",
        "Die Kosten sind 2 Münzen. Für mindestens 2 Münzen Gewinn muss der Preis 4 oder 5 Münzen sein.",
      ),
    },
  ],
  askDad: T(
    "Papa, when you buy groceries or tools, how do the shops decide how much profit they need to stay open?",
    "Papa, wenn du Werkzeug oder Lebensmittel kaufst, wie entscheiden die Läden, wie viel Gewinn sie zum Überleben brauchen?",
  ),
  realLife: {
    title: T("Bakeries and profit in Germany", "Bäckereien und Gewinn in Deutschland"),
    body: T(
      "A German bakery sells Brot and Brötchen every morning. But before the baker takes any money home, they must pay for flour, bakery electricity, oven repairs, and shop rent. Only the profit that remains can feed the baker's family and pay for holidays.",
      "Eine deutsche Bäckerei verkauft jeden Morgen Brot und Brötchen. Doch bevor der Bäcker Geld mit nach Hause nimmt, muss er Mehl, Strom, Reparaturen und Ladenmiete bezahlen. Nur der verbleibende Gewinn ernährt die Familie des Bäckers.",
    ),
  },
  factCard: {
    claims: [
      {
        text: "In business accounting, profit is the positive difference between earnings (revenue) and expenses (costs) over a given period.",
        source: "https://wirtschaftslexikon.gabler.de/definition/gewinn-33630",
      },
      {
        text: "Germany's Federal Statistical Office tracks producer prices and consumer prices, showing how raw materials and energy directly influence final sales prices.",
        source: "https://www.destatis.de/DE/Themen/Wirtschaft/Preise/_inhalt.html",
      },
      {
        text: "The German Commercial Code requires businesses to draw up an annual income statement comparing expenses and income to determine net profit or loss.",
        source: "https://www.gesetze-im-internet.de/hgb/__242.html",
      },
      {
        text: "German craft bakeries calculate prices to cover raw ingredients, energy for high-temperature ovens, staff wages, and lease expenses.",
        source: "https://www.baeckerhandwerk.de/",
      },
      {
        text: "The European Central Bank explains that sustainable enterprises must cover production costs and earn sufficient profit to invest in new equipment.",
        source: "https://www.ecb.europa.eu/ecb/educational/html/index.en.html",
      },
    ],
    simplified: [
      "In the lesson, costs are fixed at simple coin counts per loaf. Real bakeries pay monthly rent, electricity, and bulk ingredients with varying prices.",
      "Taxes on corporate profit and sales taxes (value added tax) are omitted here to focus directly on basic operating costs and profit.",
    ],
  },
};
