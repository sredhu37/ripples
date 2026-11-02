import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  ExpeditionShipDiagram,
  EquityVsDebtDiagram,
  GrandTreasureDiagram,
  ShipwreckPriorityDiagram,
  PortfolioBalanceDiagram,
} from "./stocksvsbonds.diagrams";
import { StocksVsBondsToy } from "./stocksvsbonds.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <StocksVsBondsToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <StocksVsBondsToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "stocksvsbonds",
  story: [
    animatedBeat(
      [
        T(
          "Captain Coral equips a large sea expedition ship to seek trade goods across the ocean.",
          "Kapitän Coral rüstet ein großes Expeditionsschiff aus, um Waren über den Ozean zu handeln."
        ),
        T(
          "Outfitting the hull with canvas sails and provisions requires two hundred coins.",
          "Den Rumpf mit Segeln und Proviant auszustatten, kostet zweihundert Münzen."
        ),
        T(
          "Two villagers want to participate in the journey, but each chooses a different path.",
          "Zwei Dorfbewohner möchten sich an der Reise beteiligen, wählen aber unterschiedliche Wege."
        ),
        T(
          "Finn buys a stock share, while Bea buys a formal ship bond.",
          "Finn kauft eine Aktie, während Bea eine feierliche Schiffanleihe erwirbt."
        ),
      ],
      ExpeditionShipDiagram
    ),
    animatedBeat(
      [
        T(
          "Finn becomes a part-owner of the ship by investing *equity*.",
          "Finn wird durch *Eigenkapital* zum Miteigentümer des Schiffes."
        ),
        T(
          "If the ship discovers vast riches, Finn shares in all the unbounded profits.",
          "Entdeckt das Schiff große Schätze, teilt Finn alle unbegrenzten Gewinne."
        ),
        T(
          "Bea acts as a lender, providing *debt* capital to the expedition.",
          "Bea fungiert als Geldgeberin und stellt *Fremdkapital* für die Reise bereit."
        ),
        T(
          "Bea gets no voting power and no extra windfalls, but holds a fixed promise of five coins.",
          "Bea hat kein Mitspracherecht, hält aber eine feste Zusage über fünf Münzen Zinsen."
        ),
      ],
      EquityVsDebtDiagram
    ),
    animatedBeat(
      [
        T(
          "On the first voyage, the ship returns laden with glistening pearls and rare silks.",
          "Von der ersten Reise kehrt das Schiff beladen mit Perlen und Seide zurück."
        ),
        T(
          "After costs, the expedition counts one hundred coins of revenue.",
          "Nach Abzug aller Kosten zählt die Expedition hundert Münzen Erlös."
        ),
        T(
          "Bea receives her fixed five coins interest as agreed in the bond contract.",
          "Bea erhält ihre fest vereinbarten fünf Münzen Zinsen aus dem Anleihevertrag."
        ),
        T(
          "Finn receives the entire remaining ninety-five coins as an extraordinary profit dividend!",
          "Finn erhält die gesamten restlichen fünfundneunzig Münzen als riesigen Gewinn!"
        ),
      ],
      GrandTreasureDiagram
    ),
    animatedBeat(
      [
        T(
          "On another voyage, violent rocks damage the hull and most cargo sinks into the waves.",
          "Auf einer anderen Fahrt beschädigen Klippen den Rumpf und Fracht versinkt im Meer."
        ),
        T(
          "The sailors barely scrape together four coins from salvaged timber.",
          "Die Matrosen können aus geretteten Planken mühsam vier Münzen erlösen."
        ),
        T(
          "Under the law of *priority*, lenders are repaid before owners receive anything.",
          "Nach der gesetzlichen *Rangfolge* werden Gläubiger bezahlt, bevor Eigentümer Geld sehen."
        ),
        T(
          "Bea receives all four salvaged coins, while Finn receives zero coins and loses his investment.",
          "Bea erhält alle vier geretteten Münzen, während Finn leer ausgeht und sein Geld verliert."
        ),
      ],
      ShipwreckPriorityDiagram
    ),
    animatedBeat(
      [
        T(
          "Wise savers balance both stocks and bonds in their portfolios.",
          "Kluge Sparer kombinieren Aktien und Anleihen in ihren Depots."
        ),
        T(
          "Stocks provide the engine of long-term economic growth.",
          "Aktien dienen als Motor für langfristiges wirtschaftliches Wachstum."
        ),
        T(
          "Bonds provide steady ballast, safety, and predictable income when storms hit.",
          "Anleihen bieten stabilen Ballast, Sicherheit und verlässliche Erträge im Sturm."
        ),
        T(
          "Together, they help families grow their wealth while sleeping peacefully.",
          "Zusammen helfen sie Familien, Vermögen aufzubauen und ruhig zu schlafen."
        ),
      ],
      PortfolioBalanceDiagram
    ),
  ],
  toyIntro: T(
    "Test different voyage outcomes to see how stockholders and bondholders share treasure and shipwreck losses.",
    "Teste Fahrtergebnisse, um zu sehen, wie Aktionäre und Anleiheinhaber Gewinn und Verlust teilen."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Who gets paid first if a company fails and only a few coins are salvaged?",
        "Wer wird zuerst bezahlt, wenn ein Unternehmen scheitert und nur wenige Münzen übrig sind?"
      ),
      options: [
        {
          text: T(
            "Bondholders (creditors) have legal priority over stockholders (owners)",
            "Anleihegläubiger haben gesetzlichen Vorrang vor Aktionären (Eigentümern)"
          ),
          correct: true,
        },
        {
          text: T(
            "Stockholders keep all the remaining coins for themselves",
            "Aktionäre behalten alle verbliebenen Münzen für sich selbst"
          ),
        },
        {
          text: T(
            "The coins must be tossed into the sea for the fish",
            "Die Münzen müssen für die Fische ins Meer geworfen werden"
          ),
        },
      ],
      hint: T(
        "Lenders are paid first by law before co-owners receive anything.",
        "Geldgeber werden gesetzlich zuerst bedient, bevor Eigentümer etwas bekommen."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why would an investor choose stocks instead of bonds?",
        "Warum würde ein Anleger Aktien statt Anleihen wählen?"
      ),
      options: [
        {
          text: T(
            "Stocks offer unlimited upside when a company invents great products and grows",
            "Aktien bieten unbegrenzte Gewinnchancen, wenn die Firma wächst und floriert"
          ),
          correct: true,
        },
        {
          text: T(
            "Stocks guarantee that you can never lose a single penny",
            "Aktien garantieren, dass man niemals einen Cent verlieren kann"
          ),
        },
        {
          text: T(
            "Stocks can be eaten as a nutritious snack after lunch",
            "Aktien können als nahrhafter Snack nach dem Mittagessen gegessen werden"
          ),
        },
      ],
      hint: T(
        "Think about Finn receiving 95 coins when the ship found the grand treasure.",
        "Denke daran, wie Finn 95 Münzen bekam, als das Schiff den großen Schatz fand."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "The ship brought back only 6 coins. Pay Bea her 5-coin bond interest first (Creditor Priority).",
        "Das Schiff brachte nur 6 Münzen. Zahle Bea zuerst ihre 5 Münzen Anleihezinsen (Vorrang)."
      ),
      Widget: Widget,
      hint: T(
        "Tap the Pay button until Bea receives 5 coins, then tap check.",
        "Tippe auf den Bezahlknopf, bis Bea 5 Münzen hat, und tippe auf prüfen."
      ),
    },
  ],
  askDad: T(
    "Papa, if you were investing money for my future, would you choose exciting company shares or steady bonds?",
    "Papa, wenn du Geld für meine Zukunft anlegst, würdest du eher spannende Firmenaktien oder sichere Anleihen wählen?"
  ),
  realLife: {
    title: T("Creditor Priority in German Insolvency Law", "Gläubigervorrang im deutschen Insolvenzrecht"),
    body: T(
      "Under German insolvency law (Insolvenzordnung InsO §§ 38, 39), if a company goes bankrupt, creditors and bondholders must be repaid from remaining assets before shareholders receive a single cent. This fundamental priority rule is why stocks are riskier than bonds.",
      "Nach der deutschen Insolvenzordnung (InsO §§ 38, 39) müssen bei einer Unternehmenspleite Gläubiger und Anleiheinhaber vorrangig aus der Masse bedient werden, bevor Aktionäre einen Cent erhalten. Wegen dieser Rangfolge sind Aktien riskanter als Anleihen."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The German Insolvency Statute (InsO § 38) grants priority satisfaction to insolvency creditors from debtor assets.",
        source: "https://www.gesetze-im-internet.de/inso/__38.html",
      },
      {
        text: "InsO § 39 ranks subordinated claims and equity shareholder returns after all senior creditors have been satisfied.",
        source: "https://www.gesetze-im-internet.de/inso/__39.html",
      },
      {
        text: "Equity capital represents residual ownership with variable profit returns and loss absorption capacity.",
        source: "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen/finanzglossar-durchblick-von-a-wie-aktien-bis-z-wie-zins-15907",
      },
      {
        text: "Stock shares confer fractional co-ownership of corporate assets while bonds constitute creditor debt obligations.",
        source: "https://wirtschaftslexikon.gabler.de/definition/aktie-31763",
      },
      {
        text: "Corporate bondholders receive fixed interest payments regardless of dividend distributions to equity holders.",
        source: "https://wirtschaftslexikon.gabler.de/definition/anleihe-28518",
      },
    ],
    simplified: [
      "We frame stocks versus bonds through a sea expedition ship with co-owner Finn and lender Bea.",
      "We demonstrate the priority rule by showing that salvaged shipwreck coins must pay Bea before Finn gets a cent.",
      "We illustrate the risk-reward tradeoff by showing that great treasure rewards equity with massive upside.",
    ],
  },
};
