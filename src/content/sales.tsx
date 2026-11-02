import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BusinessSalesGoalDiagram,
  CatchFishDiagram,
  EmptyDocksDiagram,
  FerryArrivalDiagram,
  NoSalesDiagram,
  SalesExchangeDiagram,
} from "./sales.diagrams";
import { SalesHarbor } from "./sales.toy";
import "./sales.css";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <SalesHarbor lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <SalesHarbor lang={lang} isWidget onWidgetAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "sales",
  story: [
    animatedBeat(
      [
        T(
          "At sunrise, Finn pulls his little fishing boat up to the dock.",
          "Bei Sonnenaufgang legt Finn mit seinem kleinen Fischerboot am Steg an.",
        ),
        T(
          "His fishing net is heavy with fresh, silvery trout.",
          "Sein Netz ist schwer von frischen, silbrigen Forellen.",
        ),
        T(
          "He packs them carefully into clean wooden crates.",
          "Er packt die Fische sorgfältig in saubere Holzkisten.",
        ),
      ],
      CatchFishDiagram,
    ),
    animatedBeat(
      [
        T(
          "Finn sets up his table and waits at the harbor market.",
          "Finn baut seinen Tisch auf und wartet am Hafenmarkt.",
        ),
        T(
          "The morning breeze is cool, but no one is walking by.",
          "Die Morgenbrise ist kühl, aber niemand kommt vorbei.",
        ),
      ],
      EmptyDocksDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Even with crates full of fish, Finn does not have a single coin.",
          "Obwohl die Kisten voll sind, hat Finn noch keine einzige Münze.",
        ),
        T(
          "Goods sitting in crates do not earn any income on their own.",
          "Waren in Kisten bringen von allein noch kein Einkommen.",
        ),
      ],
      NoSalesDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "At noon, the island ferry horn blows loud across the water.",
          "Mittags ertönt das laute Horn der Inselfähre über dem Wasser.",
        ),
        T(
          "Pip and Sam walk off the boat looking for lunch.",
          "Pip und Sam steigen vom Schiff und suchen nach Mittagessen.",
        ),
        T(
          "A person who comes to buy goods is called a *customer*.",
          "Eine Person, die kommt um Waren zu kaufen, heißt *Kundschaft*.",
        ),
      ],
      FerryArrivalDiagram,
    ),
    animatedBeat(
      [
        T(
          "Pip asks for a fresh trout and hands Finn 3 coins.",
          "Pip möchte eine frische Forelle und gibt Finn 3 Münzen.",
        ),
        T(
          "Finn hands over the fish and places the coins into his wooden box.",
          "Finn übergibt den Fisch und legt die Münzen in seine Holzschatulle.",
        ),
        T(
          "The total coins brought in by selling goods are called *sales*.",
          "Alle Münzen, die durch das Verkaufen von Waren hereinkommen, heißen *Umsatz*.",
        ),
      ],
      SalesExchangeDiagram,
    ),
    animatedBeat(
      [
        T(
          "More customers arrive and buy fish before evening falls.",
          "Weitere Leute kommen vorbei und kaufen Fisch bis zum Abend.",
        ),
        T(
          "Every sale adds more coins to Finn's box.",
          "Jeder Verkauf bringt weitere Münzen in Finns Kasse.",
        ),
        T(
          "Steady sales give Finn the money he needs to mend his nets and boat.",
          "Ein stetiger Umsatz sichert Finn das Geld für neue Netze und Reparaturen.",
        ),
      ],
      BusinessSalesGoalDiagram,
    ),
  ],
  toyIntro: T(
    "Help Finn sell fresh fish to hungry customers at the harbor!",
    "Hilf Finn dabei, frischen Fisch an hungrige Kundschaft am Hafen zu verkaufen!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What must happen before goods sitting in crates bring money to a business?",
        "Was muss geschehen, damit Waren in Kisten einem Betrieb Geld bringen?",
      ),
      options: [
        { text: T("They must be stored longer", "Sie müssen länger gelagert werden") },
        { text: T("They must be sold to a customer", "Sie müssen an die Kundschaft verkauft werden"), correct: true },
        { text: T("They must be painted", "Sie müssen bemalt werden") },
      ],
      hint: T(
        "Products only generate income when sold to customers who pay for them.",
        "Waren bringen erst dann Geld ein, wenn zahlende Kundschaft sie kauft.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "If Finn sells 5 fish for 3 coins each, what are his total sales?",
        "Wenn Finn 5 Fische für je 3 Münzen verkauft, wie hoch ist sein Umsatz?",
      ),
      options: [
        { text: T("8 coins", "8 Münzen") },
        { text: T("15 coins", "15 Münzen"), correct: true },
        { text: T("2 coins", "2 Münzen") },
      ],
      hint: T(
        "Multiply the number of items by the price: 5 times 3 equals 15 coins in total sales.",
        "Rechne Menge mal Preis: 5 mal 3 ergibt 15 Münzen Gesamtumsatz.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Pip wants a fresh fish and offers 3 coins. Drag the fish to Pip's basket to make the sale.",
        "Pip will einen frischen Fisch und bietet 3 Münzen. Ziehe den Fisch in Pips Korb für den Verkauf.",
      ),
      Widget,
      hint: T(
        "Drag the fish from Finn's crate over to Pip's customer basket.",
        "Ziehe den Fisch aus Finns Kiste hinüber in Pips Einkaufskorb.",
      ),
    },
  ],
  askDad: T(
    "Papa, what makes someone decide to buy from one shop instead of another?",
    "Papa, warum entscheidet sich jemand, in einem bestimmten Laden einzukaufen und nicht in einem anderen?",
  ),
  realLife: {
    title: T("Weekly markets and sales in Germany", "Wochenmärkte und Verkauf in Deutschland"),
    body: T(
      "In German towns, weekly markets (Wochenmärkte) take place on open squares. Farmers, bakers, and cheesemakers set up stalls. Their sales depend on welcoming neighborhood customers and offering good quality food.",
      "In deutschen Städten finden auf Marktplätzen regelmäßige Wochenmärkte statt. Bauern, Bäcker und Käsereien bauen Stände auf. Ihr Umsatz hängt davon ab, freundliche Kundschaft zu gewinnen und gute Qualität anzubieten.",
    ),
  },
  factCard: {
    claims: [
      {
        text: "The Federal Statistical Office tracks monthly retail sales (Einzelhandelsumsatz) as a core measure of economic activity in Germany.",
        source: "https://www.destatis.de/DE/Themen/Wirtschaft/Grosshandel-Einzelhandel/_inhalt.html",
      },
      {
        text: "The German Federal Ministry for Economic Affairs highlights that customer demand drives small business turnover across service and trade sectors.",
        source: "https://www.bmwk.de/Redaktion/DE/Dossier/mittelstand.html",
      },
      {
        text: "The German Retail Federation (HDE) represents retail enterprises that connect producers directly with end consumers.",
        source: "https://einzelhandel.de/",
      },
      {
        text: "The Association of German Chambers of Industry and Commerce provides guidance on market presence and customer relations for trade businesses.",
        source: "https://www.dihk.de/",
      },
      {
        text: "German fiscal law requires commercial sellers using electronic cash registers to record individual sales transactions securely.",
        source: "https://www.bundesfinanzministerium.de/",
      },
    ],
    simplified: [
      "In the lesson, every passing customer buys the same fish for a fixed price. In real markets, customers browse, compare prices, and choose different goods.",
      "The lesson focuses on direct cash sales, while modern businesses also handle card payments and digital transactions.",
    ],
  },
};
