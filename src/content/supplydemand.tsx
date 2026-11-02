import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  HarborCatchDiagram,
  HighPriceDiagram,
  LowPriceDiagram,
  EquilibriumDiagram,
  MarketHarmonyDiagram,
} from "./supplydemand.diagrams";
import { SupplyDemandToy } from "./supplydemand.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <SupplyDemandToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <SupplyDemandToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "supplydemand",
  story: [
    animatedBeat(
      [
        T(
          "Finn arrives at the Ripple Town pier with six freshly caught fish.",
          "Finn kommt mit sechs frisch gefangenen Fischen am Pier von Ripple Town an."
        ),
        T(
          "Six villagers are walking by looking for a warm lunch.",
          "Sechs Dorfbewohner kommen vorbei und suchen nach einem warmen Mittagessen."
        ),
        T(
          "The fish are the *supply*, and hungry bellies create the *demand*.",
          "Die Fische sind das *Angebot*, und hungrige Bäuche schaffen die *Nachfrage*."
        ),
        T(
          "Finn must pick a price tag to offer at the market stall.",
          "Finn muss ein Preisschild für seinen Marktstand auswählen."
        ),
      ],
      HarborCatchDiagram
    ),
    animatedBeat(
      [
        T(
          "First, Finn sets a greedy price of eight coins per fish.",
          "Zuerst verlangt Finn einen stolzen Preis von acht Münzen pro Fisch."
        ),
        T(
          "Only one wealthy sea captain can afford such an expensive meal.",
          "Nur ein wohlhabender Kapitän kann sich ein so teures Essen leisten."
        ),
        T(
          "Five fresh fish sit unsold under the hot sun and begin to spoil.",
          "Fünf frische Fische bleiben in der heißen Sonne liegen und beginnen zu verderben."
        ),
        T(
          "When price is too high, supply is bigger than demand, causing waste.",
          "Wenn der Preis zu hoch ist, ist das Angebot größer als die Nachfrage, was zu Verschwendung führt."
        ),
      ],
      HighPriceDiagram
    ),
    animatedBeat(
      [
        T(
          "Next, Finn drops the price all the way down to just one coin.",
          "Als Nächstes senkt Finn den Preis auf nur eine einzige Münze."
        ),
        T(
          "Fifteen hungry villagers rush forward shouting and waving coins.",
          "Fünfzehn hungrige Dorfbewohner stürmen heran, rufen und winken mit Münzen."
        ),
        T(
          "All six fish vanish in ten seconds, leaving nine villagers with empty stomachs.",
          "Alle sechs Fische sind in zehn Sekunden weg und neun Dorfbewohner gehen leer aus."
        ),
        T(
          "When price is too low, demand exceeds supply, causing a shortage.",
          "Wenn der Preis zu niedrig ist, übersteigt die Nachfrage das Angebot, was zu Mangel führt."
        ),
      ],
      LowPriceDiagram
    ),
    animatedBeat(
      [
        T(
          "Finally, Finn sets the price tag at exactly four coins.",
          "Schließlich setzt Finn das Preisschild auf genau vier Münzen."
        ),
        T(
          "Exactly six villagers decide the meal is worth four coins.",
          "Genau sechs Dorfbewohner entscheiden, dass das Essen vier Münzen wert ist."
        ),
        T(
          "Every fish is sold, no food is wasted, and everyone is satisfied.",
          "Jeder Fisch wird verkauft, kein Essen wird verschwendet und alle sind zufrieden."
        ),
        T(
          "This balance point is called the *market price*.",
          "Diesen Ausgleichspunkt nennt man den *Marktpreis*."
        ),
      ],
      EquilibriumDiagram
    ),
    animatedBeat(
      [
        T(
          "Markets use prices like signals to balance supply and demand.",
          "Märkte nutzen Preise wie Signale, um Angebot und Nachfrage auszugleichen."
        ),
        T(
          "When more people want something, the price nudges sellers to bring more.",
          "Wenn mehr Menschen etwas wollen, ermutigt der Preis Verkäufer, mehr zu bringen."
        ),
        T(
          "When goods are plentiful, prices fall so buyers can enjoy them.",
          "Wenn Waren reichlich vorhanden sind, sinken die Preise, damit Käufer zugreifen können."
        ),
        T(
          "Prices help guide resources to where people need them most.",
          "Preise lenken Ressourcen dorthin, wo Menschen sie am meisten brauchen."
        ),
      ],
      MarketHarmonyDiagram
    ),
  ],
  toyIntro: T(
    "Set the price slider to find the point where all fish are sold without shortage or waste.",
    "Bewege den Preisschieber, um den Punkt zu finden, an dem alle Fische ohne Mangel oder Verschwendung verkauft werden."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What happens when a seller sets the price much too high?",
        "Was passiert, wenn ein Verkäufer den Preis viel zu hoch ansetzt?"
      ),
      options: [
        {
          text: T(
            "Goods sit unsold because few buyers can afford them",
            "Waren bleiben unverkauft liegen, weil sich nur wenige Käufer das leisten können"
          ),
          correct: true,
        },
        {
          text: T(
            "More buyers rush in immediately to buy everything",
            "Mehr Käufer stürmen sofort herbei, um alles zu kaufen"
          ),
        },
        {
          text: T(
            "The items magically double in quantity",
            "Die Artikel verdoppeln sich wie von Zauberhand"
          ),
        },
      ],
      hint: T(
        "Think about what happened to Finn's fish when he charged eight coins.",
        "Denke daran, was mit Finns Fischen geschah, als er acht Münzen verlangte."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What is the market clearing price?",
        "Was ist der markträumende Preis?"
      ),
      options: [
        {
          text: T(
            "The price where the amount supplied equals the amount demanded",
            "Der Preis, bei dem die angebotene Menge der nachgefragten Menge entspricht"
          ),
          correct: true,
        },
        {
          text: T(
            "A price set by law that can never change",
            "Ein gesetzlich festgelegter Preis, der sich nie ändern darf"
          ),
        },
        {
          text: T(
            "The highest price a seller can possibly imagine",
            "Der höchste Preis, den sich ein Verkäufer überhaupt vorstellen kann"
          ),
        },
      ],
      hint: T(
        "It balances buyers and sellers so no goods are wasted and no one is left out.",
        "Er gleicht Käufer und Verkäufer aus, sodass keine Waren vergeudet werden."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Finn has 4 fresh fish. Set the price slider to 3 coins so all 4 fish find buyers at a fair balance.",
        "Finn hat 4 frische Fische. Stelle den Preisschieber auf 3 Münzen, damit alle 4 Fische im Gleichgewicht verkauft werden."
      ),
      Widget: Widget,
      hint: T(
        "Slide the price to 3 coins and tap check.",
        "Schiebe den Preis auf 3 Münzen und tippe auf prüfen."
      ),
    },
  ],
  askDad: T(
    "Papa, what is something in our city that gets more expensive when lots of people want it at the same time?",
    "Papa, was wird in unserer Stadt teurer, wenn viele Menschen es gleichzeitig haben wollen?"
  ),
  realLife: {
    title: T("Weekly Markets in Germany", "Wochenmärkte in Deutschland"),
    body: T(
      "In Germany, weekly markets and modern exchanges use supply and demand to set prices. If frost damages strawberry fields in Lower Saxony, strawberries become scarce and supermarket prices rise. When harvest is plentiful, prices drop so all berries find buyers.",
      "In Deutschland nutzen Wochenmärkte und moderne Börsen Angebot und Nachfrage zur Preisbildung. Wenn Frost Erdbeerfelder in Niedersachsen beschädigt, werden Erdbeeren knapp und die Supermarktpreise steigen. Bei reicher Ernte sinken die Preise, damit alle Beeren Käufer finden."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The market price forms at the intersection of supply and demand where the market clears.",
        source: "https://wirtschaftslexikon.gabler.de/definition/marktpreis-38454",
      },
      {
        text: "Modern trading venues continuously match buy and sell orders to establish transparent clearing prices.",
        source: "https://www.deutsche-boerse.com/dbg-de/maerkte-services/handel/handelsplaetze",
      },
      {
        text: "Price signals guide production decisions and consumer choices without central planning.",
        source: "https://www.ecb.europa.eu/ecb-and-you/educational/html/index.en.html",
      },
      {
        text: "The German Federal Statistical Office measures consumer and producer price fluctuations across thousands of goods.",
        source: "https://www.destatis.de/DE/Themen/Wirtschaft/Preise/_inhalt.html",
      },
      {
        text: "The Bundesbank provides educational materials explaining how market mechanisms support price stability.",
        source: "https://www.bundesbank.de/de/service/schule-und-bildung",
      },
    ],
    simplified: [
      "We explain supply and demand with fresh fish at a pier so an 8-year-old intuitively understands shortages and surpluses.",
      "We show that prices are signals that balance what sellers have with what buyers want.",
      "We avoid complex mathematical curves and instead focus on tangible fairness and reducing waste.",
    ],
  },
};
