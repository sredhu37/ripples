import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  SpringWorriesDiagram,
  HandshakeContractDiagram,
  DroughtWithContractDiagram,
  FloodWithContractDiagram,
  EurexExchangeDiagram,
} from "./derivatives.diagrams";
import { DerivativesToy } from "./derivatives.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <DerivativesToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <DerivativesToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "derivatives",
  story: [
    animatedBeat(
      [
        T(
          "In spring, Farmer Maya spends one hundred and fifty coins planting fifty sacks of wheat.",
          "Im Frühling investiert Bäuerin Maya einhundertfünfzig Münzen, um fünfzig Säcke Weizen anzubauen."
        ),
        T(
          "Each sack costs Maya three coins in tractor fuel, seeds, and field labor.",
          "Jeder Sack kostet Maya drei Münzen an Treibstoff, Saatgut und Feldarbeit."
        ),
        T(
          "Maya worries that autumn floods elsewhere will flood the market and crash wheat to one coin.",
          "Maya sorgt sich, dass Überschwemmungen anderswo den Markt überschwemmen und den Preis auf eine Münze drücken."
        ),
        T(
          "Meanwhile, Baker Bea fears summer heatwaves will spike wheat to eight coins, ruining her bakery.",
          "Gleichzeitig fürchtet Bäckerin Bea eine Hitzewelle, die den Weizen auf acht Münzen treibt und ihre Bäckerei ruiniert."
        ),
      ],
      SpringWorriesDiagram
    ),
    animatedBeat(
      [
        T(
          "Maya and Bea meet at the harbor table in spring before any seeds have even sprouted.",
          "Maya und Bea treffen sich im Frühling am Hafentisch, noch bevor ein einziger Halm sprießt."
        ),
        T(
          "They sign an agreement: in autumn, Maya will deliver fifty sacks at four coins each.",
          "Sie unterzeichnen einen Vertrag: Im Herbst liefert Maya fünfzig Säcke für je vier Münzen."
        ),
        T(
          "Bea promises to buy all fifty sacks at exactly four coins, whatever the weather does.",
          "Bea verspricht, alle fünfzig Säcke für genau vier Münzen zu kaufen, wie auch immer das Wetter wird."
        ),
        T(
          "This contract is a *derivative*, derived from real wheat, designed for *hedging* risk.",
          "Dieser Vertrag ist ein *Derivat*, abgeleitet von echtem Weizen, geschaffen zur *Absicherung* von Risiken."
        ),
      ],
      HandshakeContractDiagram
    ),
    animatedBeat(
      [
        T(
          "Autumn arrives with a harsh continent-wide drought that burns distant crops.",
          "Der Herbst kommt mit einer harten Dürre, die Ernten auf dem Kontinent verbrennt."
        ),
        T(
          "On the open market, wheat prices shoot up to eight coins per sack.",
          "Auf dem freien Markt schießt der Weizenpreis auf acht Münzen pro Sack hinauf."
        ),
        T(
          "Other bakeries panic and close their ovens because flour is far too expensive.",
          "Andere Bäckereien geraten in Panik und schließen ihre Öfen, weil Mehl unbezahlbar ist."
        ),
        T(
          "Bea smiles and shows her signed contract, buying flour at four coins to bake school bread.",
          "Bea lächelt, zeigt ihren Vertrag vor und kauft Mehl zu vier Münzen, um Schulbrote zu backen."
        ),
      ],
      DroughtWithContractDiagram
    ),
    animatedBeat(
      [
        T(
          "What if the season had brought super floods instead?",
          "Was aber, wenn die Jahreszeit stattdessen Riesenüberflutungen gebracht hätte?"
        ),
        T(
          "Open market prices would have plunged to one coin per sack.",
          "Die freien Marktpreise wären auf eine einzige Münze pro Sack abgestürzt."
        ),
        T(
          "Unprotected farmers would have lost two coins per sack and faced bankruptcy.",
          "Ungeschützte Bauern hätten zwei Münzen pro Sack verloren und wären pleitegegangen."
        ),
        T(
          "With the price lock contract, Maya delivers at four coins and earns her honest one-coin profit.",
          "Mit dem Festpreisvertrag liefert Maya zu vier Münzen und sichert ihren ehrlichen Gewinn."
        ),
      ],
      FloodWithContractDiagram
    ),
    animatedBeat(
      [
        T(
          "Around the globe, airlines, coffee roasters, and power grids use derivatives daily.",
          "Weltweit nutzen Fluggesellschaften, Kaffeeröster und Stromnetze täglich Derivate."
        ),
        T(
          "Lufthansa locks jet fuel prices months ahead so holiday ticket prices stay predictable.",
          "Die Lufthansa sichert Treibstoffpreise Monate im Voraus, damit Urlaubsflüge planbar bleiben."
        ),
        T(
          "Derivatives help real businesses protect jobs and keep production running smoothly.",
          "Derivate helfen echten Unternehmen, Arbeitsplätze zu sichern und verlässlich zu wirtschaften."
        ),
        T(
          "Used prudently for hedging, they turn wild storms into calm, steady waters.",
          "Klug zur Absicherung eingesetzt, verwandeln sie stürmische Wogen in ruhiges Fahrwasser."
        ),
      ],
      EurexExchangeDiagram
    ),
  ],
  toyIntro: T(
    "Switch between gambling on weather and using the price lock shield to protect farm and bakery.",
    "Wechsle zwischen Wetter-Poker und dem Preisschild, um Hof und Bäckerei abzusichern."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why do producers like farmers and bakeries use price lock contracts (derivatives)?",
        "Warum nutzen Betriebe wie Bauernhöfe und Bäckereien Festpreisverträge (Derivate)?"
      ),
      options: [
        {
          text: T(
            "To hedge against unexpected price swings and protect their businesses from losses",
            "Um sich gegen unvorhersehbare Preisschwankungen abzusichern und Verluste zu vermeiden"
          ),
          correct: true,
        },
        {
          text: T(
            "To make the wheat harvest turn into glitter and gold",
            "Damit die Weizenernte zu Glitzer und Gold wird"
          ),
        },
        {
          text: T(
            "To avoid having to bake bread ever again",
            "Um nie wieder Brot backen zu müssen"
          ),
        },
      ],
      hint: T(
        "Hedging locks in certainty so bad weather does not bankrupt the business.",
        "Absicherung schafft Planbarkeit, damit schlechtes Wetter nicht in die Pleite führt."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What does the term 'derivative' mean?",
        "Was bedeutet der Begriff 'Derivat'?"
      ),
      options: [
        {
          text: T(
            "A financial contract whose value is derived from an underlying real asset like wheat or fuel",
            "Ein Vertrag, dessen Wert von einem realen Basiswert wie Weizen oder Treibstoff abhängt"
          ),
          correct: true,
        },
        {
          text: T(
            "A special type of tractor with twelve giant wheels",
            "Ein spezieller Traktor mit zwölf riesigen Rädern"
          ),
        },
        {
          text: T(
            "A secret cooking recipe found in ancient caves",
            "Ein geheimes Kochrezept, das in alten Höhlen gefunden wurde"
          ),
        },
      ],
      hint: T(
        "The value of Maya's contract comes from the real sacks of wheat delivered in autumn.",
        "Der Wert von Mayas Vertrag stammt von den echten Säcken Weizen im Herbst."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "A severe drought drove open market wheat to 8 coins. Activate the 4-Coin Price Lock Shield to honor the contract.",
        "Eine Dürre treibt Weizen auf 8 Münzen. Aktiviere das 4-Münzen-Preisschild, um den Vertrag einzuhalten."
      ),
      Widget: Widget,
      hint: T(
        "Click the 4-Coin Price Lock Shield button and tap check.",
        "Klicke auf das 4-Münzen-Preisschild und tippe auf prüfen."
      ),
    },
  ],
  askDad: T(
    "Papa, how do airlines know what price to charge for holiday flights when jet fuel prices change every single day?",
    "Papa, woher wissen Fluggesellschaften die Ticketpreise, wenn sich die Treibstoffpreise täglich ändern?"
  ),
  realLife: {
    title: T("Hedging in the German Economy", "Preisabsicherung in der deutschen Wirtschaft"),
    body: T(
      "German airlines, farmers, and energy utilities use derivatives daily on regulated exchanges like Eurex and EEX. For example, Lufthansa buys fuel derivatives to lock in jet kerosene prices months ahead, protecting ticket prices from sudden oil price spikes.",
      "Deutsche Fluggesellschaften, Landwirte und Stadtwerke nutzen täglich Derivate an regulierten Börsen wie der Eurex und EEX. So sichert sich etwa die Lufthansa Kerosinpreise Monate im Voraus ab, um Ticketpreise vor plötzlichen Ölpreissprüngen zu schützen."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The German Securities Trading Act (WpHG § 2) defines derivatives as financial instruments whose value derives from underlying assets.",
        source: "https://www.gesetze-im-internet.de/wphg/__2.html",
      },
      {
        text: "Derivatives include futures, forwards, options, and swaps traded on organized exchanges or OTC markets.",
        source: "https://wirtschaftslexikon.gabler.de/definition/derivate-31239",
      },
      {
        text: "Hedging constitutes risk management designed to offset potential losses from adverse price fluctuations in spot markets.",
        source: "https://wirtschaftslexikon.gabler.de/definition/hedging-33310",
      },
      {
        text: "Eurex operates Europe leading derivatives exchange offering standardized clearing services through central counterparty structures.",
        source: "https://www.deutsche-boerse.com/dbg-de/ueber-uns/deutsche-boerse-group/geschaeftsfelder",
      },
      {
        text: "Regulated exchange trading requires margin collateral to protect counterparties against default risks.",
        source: "https://www.deutsche-boerse.com/dbg-de/maerkte-services/handel",
      },
    ],
    simplified: [
      "We explain derivatives as an advance handshake agreement locking in autumn harvest prices so both farm and bakery are protected.",
      "We avoid speculative day-trading concepts and focus squarely on the foundational economic role of risk hedging.",
      "We show how price stability in raw inputs protects everyday public goods like affordable bread and reliable transport.",
    ],
  },
};
