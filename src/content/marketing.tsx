import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BusyWorkshopDiagram,
  CoralWearingBootsDiagram,
  EmptyShopDiagram,
  HarborSignDiagram,
  HiddenBootsDiagram,
  TruthfulMarketingDiagram,
} from "./marketing.diagrams";
import { MarketingToy } from "./marketing.toy";
import "./marketing.css";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <MarketingToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <MarketingToy lang={lang} isWidget onWidgetAnswer={onAnswer} />;
}

export const lesson: Lesson = {
  id: "marketing",
  story: [
    animatedBeat(
      [
        T(
          "Sam finishes stitching a wonderful new invention in his workshop.",
          "Sam stellt in seiner Werkstatt eine tolle neue Erfindung fertig.",
        ),
        T(
          "These waterproof leather boots keep feet completely dry in rain puddles and sea waves.",
          "Diese wasserfesten Lederstiefel halten Füße bei Regen und Wellen völlig trocken.",
        ),
        T(
          "Sam feels proud of his sturdy, warm craft.",
          "Sam ist stolz auf sein stabiles, warmes Handwerk.",
        ),
      ],
      HiddenBootsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Sam places the boots neatly on a high wooden shelf in the back.",
          "Sam stellt die Stiefel ordentlich auf ein hohes Holzregal hinten im Laden.",
        ),
        T(
          "Days pass by, but not a single customer walks through his door.",
          "Tage vergehen, aber kein einziger Kunde betritt seinen Laden.",
        ),
        T(
          "Even the best invention cannot help anyone if nobody knows it exists!",
          "Selbst die beste Erfindung hilft niemandem, wenn niemand weiß, dass es sie gibt!",
        ),
      ],
      EmptyShopDiagram,
    ),
    animatedBeat(
      [
        T(
          "Sam takes wooden boards and paints a colorful sign at the harbor crossroads.",
          "Sam nimmt Holzbretter und malt ein buntes Schild an der Hafenkreuzung.",
        ),
        T(
          "The sign shows boots splashing happily through seawater while feet stay dry.",
          "Das Schild zeigt Stiefel im Meerwasser, während die Füße trocken bleiben.",
        ),
        T(
          "Telling people truthfully what you built and how it helps them is called *marketing*.",
          "Den Leuten ehrlich zu sagen, was man gebaut hat und wie es hilft, nennt man *Marketing*.",
        ),
      ],
      HarborSignDiagram,
    ),
    animatedBeat(
      [
        T(
          "Next, Sam gives a test pair of boots to Captain Coral to wear on the boat deck.",
          "Dann schenkt Sam Kapitän Coral ein Probepaar für das nasse Schiffsdeck.",
        ),
        T(
          "All the sailors see Captain Coral walking through puddles with warm dry socks.",
          "Alle Seeleute sehen, wie Kapitän Coral mit warmen, trockenen Socken durch Pfützen geht.",
        ),
        T(
          "Publicly showing your product in real action is called *advertising*.",
          "Ein Produkt öffentlich im echten Einsatz zu zeigen, nennt man *Werbung*.",
        ),
      ],
      CoralWearingBootsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Word travels quickly across the docks and streets.",
          "Die Nachricht verbreitet sich rasch an den Docks und in den Gassen.",
        ),
        T(
          "Sailors and dockworkers line up outside Sam's workshop to buy their own pairs.",
          "Seeleute und Hafenarbeiter stehen vor Sams Werkstatt Schlange für eigene Paare.",
        ),
        T(
          "Sam's boots solve a real problem for the people who needed them.",
          "Sams Stiefel lösen ein echtes Problem für die Menschen, die sie brauchen.",
        ),
      ],
      BusyWorkshopDiagram,
    ),
    animatedBeat(
      [
        T(
          "Good marketing is always honest about what a product can and cannot do.",
          "Gutes Marketing ist immer ehrlich darüber, was ein Produkt kann und was nicht.",
        ),
        T(
          "False promises fool people once, but break trust forever.",
          "Falsche Versprechen täuschen einmal, zerstören aber für immer das Vertrauen.",
        ),
        T(
          "Truthful advertising connects makers with happy, loyal customers.",
          "Ehrliche Werbung verbindet Hersteller mit zufriedenen, treuen Kunden.",
        ),
      ],
      TruthfulMarketingDiagram,
    ),
  ],
  toyIntro: T(
    "Choose marketing channels to inform villagers about Sam's boots while keeping profits healthy!",
    "Wähle Werbewege, um die Dorfbewohner über Sams Stiefel zu informieren und Gewinn zu machen!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the main purpose of honest marketing?",
        "Was ist der Hauptzweck von ehrlichem Marketing?",
      ),
      options: [
        {
          text: T(
            "To tell people truthfully what you made and how it can help them",
            "Den Leuten ehrlich zu sagen, was man gebaut hat und wie es ihnen hilft",
          ),
          correct: true,
        },
        {
          text: T(
            "To trick people into buying things they cannot use",
            "Leute dazu zu bringen, unbrauchbare Dinge zu kaufen",
          ),
        },
        {
          text: T(
            "To hide your shop behind tall trees",
            "Den eigenen Laden hinter hohen Bäumen zu verstecken",
          ),
        },
      ],
      hint: T(
        "Marketing helps potential customers discover useful products that solve their problems.",
        "Marketing hilft Kunden dabei, nützliche Produkte zu entdecken, die ihre Probleme lösen.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why does the law forbid companies from making false claims in advertising?",
        "Warum verbietet das Gesetz falsche Versprechen in der Werbung?",
      ),
      options: [
        {
          text: T(
            "To protect consumers from deception and preserve fair competition",
            "Um Verbraucher vor Täuschung zu schützen und fairen Wettbewerb zu wahren",
          ),
          correct: true,
        },
        {
          text: T(
            "Because colors on posters are expensive",
            "Weil bunte Farben auf Plakaten zu teuer sind",
          ),
        },
        {
          text: T(
            "To stop people from reading signs",
            "Damit die Leute keine Schilder mehr lesen",
          ),
        },
      ],
      hint: T(
        "Advertising laws ensure businesses compete on genuine merit, not misleading lies.",
        "Werbegesetze stellen sicher, dass Firmen durch echte Leistung überzeugen, nicht durch Lügen.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Sam has 2 coins. Placing the Harbor Poster costs 2 coins and informs 4 eager sailors. Activate the Harbor Poster to spread the word!",
        "Sam hat 2 Münzen. Das Hafenschild kostet 2 Münzen und informiert 4 Seeleute. Aktiviere das Hafenschild, um die Nachricht zu verbreiten!",
      ),
      Widget,
      hint: T(
        "Tap the Harbor Poster button and then press Check.",
        "Tippe auf das Hafenschild und drücke dann auf Prüfen.",
      ),
    },
  ],
  askDad: T(
    "Papa, when we see an ad on a billboard or on the internet, how do we know if it is telling the real truth?",
    "Papa, wenn wir Werbung auf einem Plakat oder im Internet sehen, woher wissen wir dann, ob sie wirklich die Wahrheit sagt?",
  ),
  realLife: {
    title: T("Advertising laws and consumer protection in Germany", "Werbegesetze und Verbraucherschutz in Deutschland"),
    body: T(
      "In Germany, the Act against Unfair Competition (UWG) strictly regulates commercial advertising. Companies are legally prohibited from making deceptive claims or misleading customers about product features. The German Advertising Council (Deutscher Werberat) investigates complaints from citizens.",
      "In Deutschland regelt das Gesetz gegen den unlauteren Wettbewerb (UWG) die geschäftliche Werbung streng. Unternehmen ist es gesetzlich verboten, irreführende Angaben über Produkte zu machen. Der Deutsche Werberat prüft Beschwerden von Bürgerinnen und Bürgern.",
    ),
  },
  factCard: {
    claims: [
      {
        text: "The German Act against Unfair Competition (UWG) prohibits misleading commercial practices and false statements in advertising.",
        source: "https://www.gesetze-im-internet.de/uwg_2004/",
      },
      {
        text: "The German Advertising Council (Deutscher Werberat) operates voluntary industry oversight handling consumer complaints on advertisements.",
        source: "https://werberat.de/",
      },
      {
        text: "The Federal Association of the Digital Economy (BVDW) provides industry guidelines on digital transparency and consumer marketing standards.",
        source: "https://www.bvdw.org/",
      },
      {
        text: "The German Chamber of Commerce and Industry (DIHK) provides guidance to small and medium enterprises on lawful marketing practices.",
        source: "https://www.dihk.de/",
      },
      {
        text: "In business economics, marketing encompasses all customer-oriented activities identifying and fulfilling consumer needs responsibly.",
        source: "https://wirtschaftslexikon.gabler.de/definition/marketing-39297",
      },
    ],
    simplified: [
      "In the story, Sam uses a simple painted wooden sign and a sample pair. In modern commerce, marketing utilizes digital channels, television, and print media.",
      "Advertising costs in real companies involve budgets, agencies, and market analytics, whereas our toy simplifies this into immediate visitor counts.",
    ],
  },
};
