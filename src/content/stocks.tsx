import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  CiderPressDiagram,
  ShareTilesDiagram,
  DividendFlowDiagram,
  SharePriceFluctuationDiagram,
  StockExchangeDiagram,
} from "./stocks.diagrams";
import { StocksToy } from "./stocks.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <StocksToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <StocksToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "stocks",
  story: [
    animatedBeat(
      [
        T(
          "Maya dreams of building a large cider mill to press sweet sparkling juice.",
          "Maya träumt davon, eine große Mosterei zu bauen, um süßen Saft zu pressen."
        ),
        T(
          "Building the wooden mill and heavy granite press costs one hundred coins.",
          "Der Bau der hölzernen Mühle und der schweren Granitpresse kostet hundert Münzen."
        ),
        T(
          "Maya does not want a bank loan that requires stressful monthly repayments.",
          "Maya möchte keinen Bankkredit mit stressigen monatlichen Raten abbezahlen."
        ),
        T(
          "Instead, Maya divides the mill business into ten equal share certificates.",
          "Stattdessen teilt Maya den Mühlenbetrieb in zehn gleiche Anteilsurkunden auf."
        ),
      ],
      CiderPressDiagram
    ),
    animatedBeat(
      [
        T(
          "Maya keeps two certificates and offers eight to neighbors for ten coins each.",
          "Maya behält zwei Scheine und bietet den Nachbarn acht für je zehn Münzen an."
        ),
        T(
          "Each wooden certificate represents one *stock share* of the company.",
          "Jedes hölzerne Zertifikat stellt eine *Aktie* des Unternehmens dar."
        ),
        T(
          "By buying two shares, you become a genuine co-owner (*shareholder*).",
          "Mit dem Kauf von zwei Aktien wirst du ein echter Miteigentümer (*Aktionär*)."
        ),
        T(
          "You now own twenty percent of the cider press, its equipment, and its future.",
          "Dir gehören nun zwanzig Prozent der Mosterei, ihrer Ausrüstung und Zukunft."
        ),
      ],
      ShareTilesDiagram
    ),
    animatedBeat(
      [
        T(
          "In autumn, the orchard yields fragrant apples and the mill presses barrels of juice.",
          "Im Herbst trägt die Obstwiese duftende Äpfel und die Mühle presst Fässer voll Saft."
        ),
        T(
          "After paying all costs, Maya counts thirty coins of clear profit.",
          "Nach Abzug aller Kosten zählt Maya dreißig Münzen Reingewinn."
        ),
        T(
          "Maya divides the profit equally across all ten shares, paying three coins per share.",
          "Maya teilt den Gewinn gleichmäßig auf alle zehn Aktien auf: drei Münzen pro Aktie."
        ),
        T(
          "This profit distribution is called a *dividend*.",
          "Diese Gewinnausschüttung nennt man *Dividende*."
        ),
      ],
      DividendFlowDiagram
    ),
    animatedBeat(
      [
        T(
          "When word spreads of Maya's delicious spiced cider, neighbors queue up.",
          "Als sich herumpricht, wie köstlich Mayas Gewürzmost schmeckt, stehen Nachbarn Schlange."
        ),
        T(
          "Other villagers offer sixteen coins to buy your share tile.",
          "Andere Dorfbewohner bieten sechzehn Münzen, um dir deinen Anteilsstein abzukaufen."
        ),
        T(
          "You can sell to lock in a six-coin profit, or keep holding for future dividends.",
          "Du kannst verkaufen, um sechs Münzen Gewinn mitzunehmen, oder für Dividenden halten."
        ),
        T(
          "If frost ruins the harvest, share prices drop because dividends dry up.",
          "Wenn Frost die Ernte verdirbt, sinkt der Aktienkurs, weil Dividenden ausbleiben."
        ),
      ],
      SharePriceFluctuationDiagram
    ),
    animatedBeat(
      [
        T(
          "On the modern stock exchange, millions of people co-own great enterprises.",
          "An der modernen Börse besitzen Millionen von Menschen gemeinsam große Unternehmen."
        ),
        T(
          "When companies innovate and grow, shareholders share in their success.",
          "Wenn Unternehmen Neues erfinden und wachsen, teilen die Aktionäre ihren Erfolg."
        ),
        T(
          "Stocks carry risk, but they allow everyday citizens to build lasting wealth.",
          "Aktien bergen Risiken, ermöglichen es Bürgern aber, langfristig Wohlstand aufzubauen."
        ),
        T(
          "Being a shareholder means putting your savings to work in the real economy.",
          "Aktionär zu sein bedeutet, seine Ersparnisse in der realen Wirtschaft arbeiten zu lassen."
        ),
      ],
      StockExchangeDiagram
    ),
  ],
  toyIntro: T(
    "Set the harvest outcome, collect your dividend payout, or sell shares at market bids.",
    "Wähle die Ernte, sammle deine Dividendenauszahlung oder verkaufe Aktien an Interessenten."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does it mean to own a stock share in a company?",
        "Was bedeutet es, eine Aktie an einem Unternehmen zu besitzen?"
      ),
      options: [
        {
          text: T(
            "You are a fractional co-owner of the business and its profits",
            "Du bist Miteigentümer eines Teils des Unternehmens und seiner Gewinne"
          ),
          correct: true,
        },
        {
          text: T(
            "You lent coins that the company must repay with fixed interest tomorrow",
            "Du hast Münzen geliehen, die das Unternehmen morgen mit Zinsen zurückzahlen muss"
          ),
        },
        {
          text: T(
            "You are legally forced to clean the factory floor every morning",
            "Du bist gesetzlich verpflichtet, jeden Morgen den Fabrikboden zu wischen"
          ),
        },
      ],
      hint: T(
        "A shareholder is a part-owner of the enterprise.",
        "Ein Aktionär ist ein Miteigentümer des Unternehmens."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What is a dividend?",
        "Was ist eine Dividende?"
      ),
      options: [
        {
          text: T(
            "A share of company profits paid out directly to shareholders",
            "Ein Teil des Unternehmensgewinns, der direkt an Aktionäre ausgezahlt wird"
          ),
          correct: true,
        },
        {
          text: T(
            "A fine paid to the government for baking too much bread",
            "Eine Geldstrafe an den Staat für das Backen von zu viel Brot"
          ),
        },
        {
          text: T(
            "The secret password used to open the factory gate",
            "Das geheime Passwort, um das Fabriktor zu öffnen"
          ),
        },
      ],
      hint: T(
        "When the cider press earns a profit, Maya distributes coins to tile owners.",
        "Wenn die Mosterei Gewinn macht, schüttet Maya Münzen an die Anteilseigner aus."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "The cider press earned 40 coins profit (4 coins per share). Collect your 8-coin dividend payout.",
        "Die Mosterei machte 40 Münzen Gewinn (4 Münzen pro Aktie). Hole deine 8 Münzen Dividende ab."
      ),
      Widget: Widget,
      hint: T(
        "Tap the Collect Dividend button to collect 8 coins into your wallet and tap check.",
        "Tippe auf Dividende abholen, um 8 Münzen in deinen Beutel zu legen, und tippe auf prüfen."
      ),
    },
  ],
  askDad: T(
    "Papa, if you buy a share of a company, do you get to visit the factory and say you own part of it?",
    "Papa, wenn du eine Aktie einer Firma kaufst, darfst du dann die Fabrik besuchen und sagen, dass sie dir gehört?"
  ),
  realLife: {
    title: T("Joint-Stock Companies in Germany", "Aktiengesellschaften in Deutschland"),
    body: T(
      "In Germany, large companies like Siemens, SAP, and BMW are joint-stock companies (Aktiengesellschaften, AG). Millions of people buy shares on the Frankfurt Stock Exchange (Börse Frankfurt / Xetra) to become part-owners and receive annual dividends from company profits.",
      "In Deutschland sind große Unternehmen wie Siemens, SAP und BMW Aktiengesellschaften (AG). Millionen Menschen kaufen Anteile an der Frankfurter Wertpapierbörse (Xetra), um Miteigentümer zu werden und jährliche Dividenden aus Unternehmensgewinnen zu erhalten."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The German Stock Corporation Act (Aktiengesetz § 1) defines the AG as a corporation with capital divided into shares.",
        source: "https://www.gesetze-im-internet.de/aktg/__1.html",
      },
      {
        text: "Shares can be issued as par-value shares or no-par shares under Aktiengesetz § 8.",
        source: "https://www.gesetze-im-internet.de/aktg/__8.html",
      },
      {
        text: "Shareholders are entitled to the balance sheet profit distributed according to their share of capital under AktG § 60.",
        source: "https://www.gesetze-im-internet.de/aktg/__60.html",
      },
      {
        text: "Stock shares represent equity capital entitling owners to dividends and voting rights at the annual general meeting.",
        source: "https://wirtschaftslexikon.gabler.de/definition/aktie-31763",
      },
      {
        text: "The Frankfurt Stock Exchange and Xetra provide electronic trading systems connecting buyers and sellers.",
        source: "https://live.deutsche-boerse.com/einstieg-alt/so-funktioniert-die-boerse",
      },
      {
        text: "Consumer guidance emphasizes that stocks participate in economic expansion while requiring a long-term investment horizon.",
        source: "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen/finanzglossar-durchblick-von-a-wie-aktien-bis-z-wie-zins-15907",
      },
    ],
    simplified: [
      "We explain shares as physical wooden tiles dividing a cider mill so an 8-year-old child visualizes co-ownership.",
      "We connect dividend payouts directly to real cider sales and barrels rather than abstract quarterly financial statements.",
      "We illustrate capital gains and share price drops through neighbor bids responding to sweet cider or frost.",
    ],
  },
};
