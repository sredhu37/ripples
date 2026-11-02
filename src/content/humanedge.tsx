import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  TimelineStoneToAiDiagram,
  MachineSpeedComparisonDiagram,
  HeartEmpathyCompassionDiagram,
  CreativeTeamCollaborationDiagram,
  AmplifiedHumanValuesFutureDiagram,
} from "./humanedge.diagrams";
import { HumanEdgeToy } from "./humanedge.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <HumanEdgeToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <HumanEdgeToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "humanedge",
  story: [
    animatedBeat(
      [
        T(
          "From chipped flint handaxes to steam engines and microchips, humans have always been toolmakers.",
          "Vom Faustkeil aus Feuerstein ueber Dampfmaschinen bis zum Mikrochip waren Menschen immer Erfinder."
        ),
        T(
          "Every generation invents new technology to protect families, explore nature, and cure diseases.",
          "Jede Generation baut neue Technik, um Familien zu schuetzen, die Natur zu erforschen und Not zu lindern."
        ),
        T(
          "Now, powerful computer networks and artificial intelligence stand alongside us as our newest tools.",
          "Heute stehen uns weltweite Rechnernetze und kuenstliche Intelligenz als neueste Helfer zur Seite."
        ),
      ],
      TimelineStoneToAiDiagram
    ),
    animatedBeat(
      [
        T(
          "Computers can calculate billions of numbers every second without ever tiring or needing a break.",
          "Computer koennen Milliarden Zahlen in einer Sekunde berechnen, ohne je muede zu werden."
        ),
        T(
          "They remember entire encyclopedias and spot tiny mathematical patterns across vast oceans of data.",
          "Sie speichern ganze Bibliotheken und finden kleinste statistische Muster in riesigen Datenmengen."
        ),
        T(
          "Yet raw computational speed alone cannot decide what is fair, good, or meaningful for human life.",
          "Doch blosse Rechengeschwindigkeit allein kann nicht entscheiden, was gerecht oder gut fuer Menschen ist."
        ),
      ],
      MachineSpeedComparisonDiagram
    ),
    animatedBeat(
      [
        T(
          "A computer algorithm cannot shed a tear of joy, feel remorse, or love another living being.",
          "Ein Computeralgorithmus kann weder Freudentraenen weinen, noch Reue empfinden oder jemanden lieben."
        ),
        T(
          "It cannot wrap a warm blanket around a shivering child or understand the bittersweet sadness of goodbye.",
          "Er kann kein frierendes Kind troestend in den Arm nehmen oder den Abschiedsschmerz verstehen."
        ),
        T(
          "Genuine warmth, conscience, and shared feeling remain the sacred heart of the human spirit.",
          "Echte Herzenswaerme, Gewissen und Mitgefuehl bleiben der lebendige Kern des Menschseins."
        ),
      ],
      HeartEmpathyCompassionDiagram
    ),
    animatedBeat(
      [
        T(
          "Human gifts like *empathy* and *creativity*, ethical courage, and joyful teamwork belong uniquely to us.",
          "Menschliche Gaben wie *Mitgefuehl* und *Kreativitaet*, ethischer Mut und Teamgeist gehoeren uns allein."
        ),
        T(
          "We can imagine brand new worlds, write poetry that moves hearts, and forgive each other's mistakes.",
          "Wir koennen neue Welten erfinden, beruehrende Lieder dichten und einander Fehler verzeihen."
        ),
        T(
          "When we sit down together to solve a community challenge, our shared imagination has no limit.",
          "Wenn wir uns gemeinsam an einen Tisch setzen, um Probleme zu loesen, kennt unsere Fantasie keine Grenze."
        ),
      ],
      CreativeTeamCollaborationDiagram
    ),
    animatedBeat(
      [
        T(
          "Technology is our great multiplier, but our future must always be steered by *human values*.",
          "Technik ist unser grosser Verstaerker, doch unsere Zukunft muss immer von *menschliche Werte* gelenkt werden."
        ),
        T(
          "By pairing brilliant machinery with kindness, fairness, and care, we can lift up every person.",
          "Wenn wir kluge Maschinen mit Guete, Gerechtigkeit und Fuersorge verbinden, blueht die Menschheit auf."
        ),
        T(
          "The greatest adventure in human history is just beginning, and you are here to help guide it.",
          "Das groesste Abenteuer der Menschheit faengt gerade erst an, und du gestaltest es mit."
        ),
      ],
      AmplifiedHumanValuesFutureDiagram
    ),
  ],
  toyIntro: T(
    "Set technological capability and guide it with deep empathy and care to achieve over 90% flourishing.",
    "Waehle die Technikstufe und lenke sie mit Mitgefuehl und Ethik, um ueber 90% Wohlstand zu erreichen."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What essential qualities make human beings irreplaceable by computers and algorithms?",
        "Welche Eigenschaften machen uns Menschen fuer Computer und Algorithmen unersetzlich?"
      ),
      options: [
        {
          text: T(
            "Empathy, conscience, ethical judgment, artistic creativity, and warm human collaboration",
            "Mitgefuehl, Gewissen, ethische Urteilskraft, kuenstlerische Kreativitaet und Zuwendung"
          ),
          correct: true,
        },
        {
          text: T(
            "The ability to sleep upside down on the ceiling like fruit bats",
            "Die Faehigkeit, wie eine Fledermaus kopfueber an der Zimmerdecke zu schlafen"
          ),
        },
        {
          text: T(
            "Having antennas that receive radio stations from outer space",
            "Kleine Antennen auf dem Kopf, die Radiosender aus dem Weltall empfangen"
          ),
        },
      ],
      hint: T(
        "Human empathy, conscience, and shared values give meaning and moral direction to technology.",
        "Menschliches Mitgefuehl, Gewissen und Werte geben der Technologie ihren moralischen Sinn."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What is the best way for society to use advanced technological tools?",
        "Wie sollte die Gesellschaft moderne technische Werkzeuge am besten nutzen?"
      ),
      options: [
        {
          text: T(
            "Guide them with human values, compassion, and fairness to lift up communities and protect nature",
            "Sie mit menschlichen Werten, Mitgefuehl und Fairness lenken, um Menschen zu helfen und die Natur zu schuetzen"
          ),
          correct: true,
        },
        {
          text: T(
            "Let computers make all moral rules while people stop thinking entirely",
            "Computern alle ethischen Entscheidungen ueberlassen und das Nachdenken ganz einstellen"
          ),
        },
        {
          text: T(
            "Bury all computers underground and communicate only through smoke signals",
            "Alle Rechner im Garten vergraben und nur noch ueber Rauchzeichen miteinander reden"
          ),
        },
      ],
      hint: T(
        "Technology serves as a powerful multiplier when guided by compassion and ethical purpose.",
        "Technologie wirkt als maechtiger Hebel, wenn sie von Mitgefuehl und Ethik gelenkt wird."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Select 'Deep Empathy & Care' and at least Smart Automation to achieve over 90% flourishing.",
        "Waehle 'Mitgefuehl & Ethik' und mindestens Kluge Automation, um ueber 90% Wohlstand zu erreichen."
      ),
      Widget: Widget,
      hint: T(
        "Choose deep empathy for human values, ensure automation is active, and tap check.",
        "Waehle Mitgefuehl bei den Werten, stelle sicher dass Automation aktiv ist, und tippe auf pruefen."
      ),
    },
  ],
  askDad: T(
    "Papa, no matter how smart computers get, what makes human beings special and irreplaceable?",
    "Papa, egal wie klug Computer werden, was macht uns Menschen fuer immer einzigartig und unersetzlich?"
  ),
  realLife: {
    title: T("UNESCO Global Recommendation on AI Ethics", "UNESCO-Empfehlung zur Ethik der Kuenstlichen Intelligenz"),
    body: T(
      "In November 2021, 193 member states of the United Nations Educational, Scientific and Cultural Organization (UNESCO) unanimously adopted the Recommendation on the Ethics of Artificial Intelligence. This historic international framework establishes that technology must always protect human dignity, human rights, gender equality, and the natural environment.",
      "Im November 2021 verabschiedeten alle 193 Mitgliedsstaaten der UNESCO einstimmig die weltweite Empfehlung zur Ethik der Kuenstlichen Intelligenz. Dieses Rahmenwerk legt fest, dass Technologie stets die Menschenwuerde, Grundrechte, Chancengleichheit und die Umwelt schuetzen und foerdern muss."
    ),
  },
  factCard: {
    claims: [
      {
        text: "In November 2021, UNESCO member states adopted the first global standard-setting instrument on the ethics of artificial intelligence.",
        source: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics",
      },
      {
        text: "The European Union passed the EU AI Act in 2024 to establish risk-based ethical boundaries and safeguards for artificial intelligence applications.",
        source: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
      },
      {
        text: "Cognitive science research highlights that empathy, shared intentionality, and cultural learning distinguish human cognition from machine computing.",
        source: "https://www.mpib-berlin.mpg.de/research/research-centers/adaptive-rationality",
      },
      {
        text: "The Stanford Institute for Human-Centered AI was founded to guide machine intelligence with multidisciplinary humanistic values.",
        source: "https://hai.stanford.edu/about",
      },
      {
        text: "Historical studies on technological revolutions show that long-term social flourishing depends on democratic institutions and public investment in people.",
        source: "https://www.nber.org/books-and-chapters/power-and-progress-our-thousand-year-struggle-over-technology-and-prosperity",
      },
    ],
    simplified: [
      "We celebrate the long journey of human toolmaking from simple stones to computers.",
      "We contrast the raw calculating speed of machines with the unique warmth of human conscience.",
      "We conclude that when guided by empathy and values, technology can build a wonderful future.",
    ],
  },
};
