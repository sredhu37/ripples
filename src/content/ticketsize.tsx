import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BeaRollsDiagram,
  BusinessChoiceDiagram,
  EqualEarningsDiagram,
  MorningMarketDiagram,
  SamBootsDiagram,
  TicketSizeConceptDiagram,
} from "./ticketsize.diagrams";
import { TicketBalanceToy } from "./ticketsize.toy";
import "./ticketsize.css";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <TicketBalanceToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <TicketBalanceToy lang={lang} isWidget onWidgetAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "ticketsize",
  story: [
    animatedBeat(
      [
        T(
          "On Saturday morning, Bea and Sam open their shops side by side.",
          "Am Samstagmorgen öffnen Bea und Sam ihre Läden nebeneinander.",
        ),
        T(
          "Bea has trays of warm sweet rolls ready for breakfast.",
          "Bea hat Bleche voller warmer Brötchen fürs Frühstück parat.",
        ),
        T(
          "Sam finishes polishing sturdy leather boots in his workshop.",
          "Sam poliert in seiner Werkstatt feste Stiefel aus Leder.",
        ),
      ],
      MorningMarketDiagram,
    ),
    animatedBeat(
      [
        T(
          "A long line of villagers stops by Bea's counter.",
          "Eine lange Schlange von Leuten hält an Beas Theke.",
        ),
        T(
          "Each sweet roll costs only 1 coin.",
          "Jedes süße Brötchen kostet nur 1 Münze.",
        ),
        T(
          "Bea greets 30 customers and sells 30 rolls, earning 30 coins in total.",
          "Bea bedient 30 Leute und verkauft 30 Brötchen für insgesamt 30 Münzen.",
        ),
      ],
      BeaRollsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Across the lane, Sam works quietly at his bench.",
          "Gegenüber arbeitet Sam ruhig an seiner Werkbank.",
        ),
        T(
          "Mayor Moss walks in looking for sturdy riding boots.",
          "Bürgermeister Moss kommt herein und sucht feste Reitstiefel.",
        ),
        T(
          "Sam sells one custom pair to Moss for 30 coins.",
          "Sam verkauft ein maßgefertigtes Paar an Moss für 30 Münzen.",
        ),
      ],
      SamBootsDiagram,
    ),
    animatedBeat(
      [
        T(
          "At sunset, Bea and Sam count up their day's sales.",
          "Bei Sonnenuntergang zählen Bea und Sam ihren Tagesumsatz.",
        ),
        T(
          "Bea earned 30 coins. Sam earned 30 coins.",
          "Bea hat 30 Münzen eingenommen. Sam hat 30 Münzen eingenommen.",
        ),
        T(
          "Both businesses made the exact same total money from very different items!",
          "Beide Betriebe haben genau dieselbe Summe mit ganz anderen Waren erzielt!",
        ),
      ],
      EqualEarningsDiagram,
    ),
    animatedBeat(
      [
        T(
          "The price of a single purchase is called the *ticket size*.",
          "Der Preis eines einzelnen Einkaufs heißt *Ticketgröße*.",
        ),
        T(
          "Bea had a small ticket size of 1 coin; Sam had a big ticket size of 30 coins.",
          "Bea hatte eine kleine Ticketgröße von 1 Münze; Sam eine große von 30 Münzen.",
        ),
        T(
          "The total number of items sold is called the *volume*.",
          "Die Gesamtzahl aller verkauften Stücke nennt man *Menge*.",
        ),
        T(
          "Bea had high volume of 30 rolls, while Sam had low volume of 1 pair.",
          "Bea hatte eine hohe Menge von 30 Brötchen, Sam eine niedrige von 1 Paar.",
        ),
      ],
      TicketSizeConceptDiagram,
    ),
    animatedBeat(
      [
        T(
          "Selling with small prices means serving a huge crowd quickly.",
          "Kleine Preise bedeuten, dass man viele Leute schnell bedienen muss.",
        ),
        T(
          "Selling with big prices means taking time to build exceptional quality.",
          "Große Preise verlangen Zeit, Sorgfalt und besonders hohe Qualität.",
        ),
        T(
          "Both business models can thrive when planned carefully.",
          "Beide Geschäftsmodelle können gut funktionieren, wenn man sie klug plant.",
        ),
      ],
      BusinessChoiceDiagram,
    ),
  ],
  toyIntro: T(
    "Explore how small prices and big prices reach the same sales goal!",
    "Erkunde, wie kleine und große Preise dasselbe Umsatzziel erreichen können!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the difference between ticket size and volume in business?",
        "Was ist der Unterschied zwischen Ticketgröße und Menge im Geschäft?",
      ),
      options: [
        {
          text: T(
            "Ticket size is price per sale, volume is how many are sold",
            "Ticketgröße ist der Preis pro Verkauf, Menge ist die Verkaufszahl",
          ),
          correct: true,
        },
        {
          text: T(
            "Ticket size is the shop size, volume is how loud the music is",
            "Ticketgröße ist die Ladengröße, Menge ist die Musiklautstärke",
          ),
        },
        {
          text: T(
            "Volume is the price, ticket size is the customer age",
            "Menge ist der Preis, Ticketgröße ist das Alter der Kunden",
          ),
        },
      ],
      hint: T(
        "Ticket size is the average price of one sale. Volume is the count of items sold.",
        "Die Ticketgröße ist der Preis eines einzelnen Verkaufs. Menge ist die Stückzahl.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Bea sells 20 rolls for 2 coins each. Sam sells 2 pairs of boots for 20 coins each. Who has higher sales?",
        "Bea verkauft 20 Brötchen für je 2 Münzen. Sam verkauft 2 Stiefel für je 20 Münzen. Wer hat mehr Umsatz?",
      ),
      options: [
        { text: T("Bea has higher sales", "Bea hat mehr Umsatz") },
        { text: T("Sam has higher sales", "Sam hat mehr Umsatz") },
        { text: T("Both have the same sales", "Beide haben den gleichen Umsatz"), correct: true },
      ],
      hint: T(
        "Bea: 20 times 2 equals 40 coins. Sam: 2 times 20 equals 40 coins. Both reach 40 coins.",
        "Bea: 20 mal 2 ergibt 40 Münzen. Sam: 2 mal 20 ergibt 40 Münzen. Beide erreichen 40 Münzen.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Sam wants to earn 18 coins by selling 3 pairs of shoes. What price must he charge for each pair?",
        "Sam will 18 Münzen einnehmen und verkauft 3 Paar Schuhe. Welchen Preis muss er pro Paar verlangen?",
      ),
      Widget,
      hint: T(
        "Divide 18 coins by 3 pairs of shoes: Sam must set the price slider to 6 coins.",
        "Teile 18 Münzen durch 3 Paar Schuhe: Sam muss den Schieberegler auf 6 Münzen stellen.",
      ),
    },
  ],
  askDad: T(
    "Papa, would you rather run a shop that sells hundreds of small snacks or one that sells a few big bicycles each week?",
    "Papa, würdest du lieber einen Laden mit Hunderten kleinen Snacks oder einen mit wenigen teuren Fahrrädern betreiben?",
  ),
  realLife: {
    title: T("Supermarkets and bike shops in Germany", "Supermärkte und Fahrradläden in Deutschland"),
    body: T(
      "A German supermarket sells thousands of small everyday items like apples and milk for 1 or 2 euros each day. A local bike shop might sell only two high-quality e-bikes for 2,000 euros each, yet both businesses can make similar daily sales.",
      "Ein deutscher Supermarkt verkauft täglich Tausende kleine Artikel wie Äpfel und Milch für 1 oder 2 Euro. Ein lokaler Fahrradladen verkauft vielleicht nur zwei hochwertige E-Bikes für je 2.000 Euro, doch beide Betriebe können einen ähnlichen Tagesumsatz erzielen.",
    ),
  },
  factCard: {
    claims: [
      {
        text: "The German Bundesbank provides educational materials explaining how commercial enterprises manage turnover through pricing and transaction volume.",
        source: "https://www.bundesbank.de/de/service/schule-und-bildung",
      },
      {
        text: "The Federal Cartel Office (Bundeskartellamt) studies trade structures, contrasting high-frequency retail commerce with specialized durable equipment markets.",
        source: "https://www.bundeskartellamt.de/DE/Wirtschaftsbereiche/Handel/handel_node.html",
      },
      {
        text: "The Cologne Institute for Economic Research (IW Köln) analyzes structural differences in business models between mass consumer goods and bespoke manufacturing.",
        source: "https://www.iwkoeln.de/",
      },
      {
        text: "The Federal Statistical Office tracks consumer expenditures across both daily low-value grocery purchases and infrequent high-value household durable goods.",
        source: "https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Einkommen-Konsum-Lebensbedingungen/Konsumausgaben/_inhalt.html",
      },
      {
        text: "The German Retail Federation (HDE) documents that retail profit margins and inventory turnover rates vary substantially by product ticket size.",
        source: "https://einzelhandel.de/presse/zahlen-fakten",
      },
    ],
    simplified: [
      "In the lesson, both business models produce the exact same revenue. In real life, costs and profit margins vary significantly between low-ticket and high-ticket goods.",
      "Inventory holding costs for expensive items and spoilage risks for fresh foods are simplified here to focus on the price-times-volume relationship.",
    ],
  },
};
