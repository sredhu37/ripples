import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  RigidRulesIfElseDiagram,
  TrainingExamplesDatasetDiagram,
  PatternScatterFeatureDiagram,
  ScientificAssistantScansDiagram,
  MathematicalCalculatorNoFeelingsDiagram,
} from "./ai.diagrams";
import { AiToy } from "./ai.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <AiToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <AiToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "ai",
  story: [
    animatedBeat(
      [
        T(
          "For decades, computer programs only followed rigid step-by-step instructions written by humans.",
          "Jahrzehntelang folgten Computerprogramme nur starren Anweisungen, die Menschen aufgeschrieben hatten."
        ),
        T(
          "A programmer had to write an explicit rule for every single scenario the computer might encounter.",
          "Programmierer mussten fuer jeden denkbaren Fall eine feste Regel wie Wenn-Dann formulieren."
        ),
        T(
          "If an unforeseen situation arose, the traditional software broke down or gave up with an error.",
          "Tauchte eine unerwartete Situation auf, brach die klassische Software mit einem Fehler ab."
        ),
      ],
      RigidRulesIfElseDiagram
    ),
    animatedBeat(
      [
        T(
          "A revolutionary method called *machine learning* changed how computers solve complex problems.",
          "Ein neuer Ansatz namens *maschinelles Lernen* veraenderte, wie Computer Probleme loesen."
        ),
        T(
          "Instead of writing thousands of strict rules, researchers feed algorithms vast libraries of examples.",
          "Statt tausende starre Regeln zu tippen, fuettern Forscher den Algorithmus mit Millionen Beispielen."
        ),
        T(
          "By studying thousands of photos, the computer figures out its own mathematical guide to identify things.",
          "Durch das Betrachten vieler Fotos lernt der Computer selbststaendig, Dinge zu unterscheiden."
        ),
      ],
      TrainingExamplesDatasetDiagram
    ),
    animatedBeat(
      [
        T(
          "This statistical technique is known as *pattern recognition*.",
          "Dieses mathematische Verfahren heisst *Mustererkennung*."
        ),
        T(
          "To tell an apple from a pear, the model measures curves, color gradients, and pixel distributions.",
          "Um einen Apfel von einer Birne zu unterscheiden, vergleicht das Modell Rundung und Farbtone."
        ),
        T(
          "When fed enough clean examples, the model correctly sorts new fruits it has never seen before.",
          "Mit genuegend guten Trainingsdaten sortiert das Modell auch neue Fruechte treffsicher ein."
        ),
      ],
      PatternScatterFeatureDiagram
    ),
    animatedBeat(
      [
        T(
          "Doctors use these pattern finders to spot tiny early tumors in medical X-ray scans.",
          "Aerzte nutzen diese Musterfinder, um fruehe Spuren von Krankheiten in Roentgenbildern zu erkennen."
        ),
        T(
          "Astronomers analyze petabytes of starlight data to discover new exoplanets orbiting distant suns.",
          "Astronomen durchkaemmen riesige Datenmengen, um ferne Planeten um fremde Sonnen zu entdecken."
        ),
        T(
          "Translation systems allow people speaking different languages to communicate across borders instantly.",
          "Uebersetzungsprogramme ermoeglichen Menschen weltweit den sofortigen Austausch ohne Sprachbarriere."
        ),
      ],
      ScientificAssistantScansDiagram
    ),
    animatedBeat(
      [
        T(
          "Modern *artificial intelligence* is a brilliant mathematical calculator, not a conscious creature.",
          "Moderne *Kuenstliche Intelligenz* ist ein Rechenwerkzeug fuer Muster, kein fuehlendes Lebewesen."
        ),
        T(
          "An AI does not possess feelings, hopes, pain, personal intentions, or moral judgment.",
          "Eine KI hat weder Gefuehle noch Traeume, Absichten oder ein eigenes Gewissen."
        ),
        T(
          "Humans remain the thoughtful inventors and caring guides responsible for using these tools wisely.",
          "Wir Menschen bleiben die Erfinder und Entscheider, die diese Werkzeuge verantwortungsvoll lenken."
        ),
      ],
      MathematicalCalculatorNoFeelingsDiagram
    ),
  ],
  toyIntro: T(
    "Train the pattern model by selecting 10 cards with verified labels to achieve over 90% accuracy.",
    "Trainiere das Modell mit 10 Karten und sauberen Daten, um ueber 90% Erkennungsgenauigkeit zu erreichen."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "How does machine learning differ from classical rule-based computer programming?",
        "Wie unterscheidet sich maschinelles Lernen von klassischer Programmierung?"
      ),
      options: [
        {
          text: T(
            "It learns mathematical patterns from examples instead of needing humans to code every single rule",
            "Es lernt Muster aus vielen Beispielen, statt jede einzelne Regel vom Menschen vorgeschrieben zu bekommen"
          ),
          correct: true,
        },
        {
          text: T(
            "It requires feeding the computer chocolate pudding every twenty minutes",
            "Es verlangt, dass man dem Rechner alle zwanzig Minuten Schokoladenpudding serviert"
          ),
        },
        {
          text: T(
            "It only works on rainy Sundays when thunder strikes the roof",
            "Es funktioniert nur an regnerischen Sonntagen, wenn der Blitz ins Dach einschlaegt"
          ),
        },
      ],
      hint: T(
        "Machine learning discovers patterns from training examples rather than rigid manual rules.",
        "Maschinelles Lernen erkennt statistische Muster aus Beispielen statt aus starren Vorschriften."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Does an artificial intelligence model have feelings, emotions, or consciousness?",
        "Hat ein kuenstliches Intelligenzmodell Gefuehle, Emotionen oder ein echtes Bewusstsein?"
      ),
      options: [
        {
          text: T(
            "No, it is a sophisticated mathematical pattern calculator built and guided by humans",
            "Nein, es ist ein mathematischer Musterrechner, der von Menschen gebaut und gesteuert wird"
          ),
          correct: true,
        },
        {
          text: T(
            "Yes, computers get sad when they lose a game of checkers",
            "Ja, Computer sind traurig, wenn sie eine Partie Dame verlieren"
          ),
        },
        {
          text: T(
            "Yes, algorithms dream of eating strawberry ice cream at the park",
            "Ja, Algorithmen traeumen nachts davon, im Park Erdbeereis zu essen"
          ),
        },
      ],
      hint: T(
        "AI is a powerful computational tool that calculates probabilities without feelings or sentience.",
        "KI ist ein mathematisches Werkzeug zur Wahrscheinlichkeitsrechnung ohne Gefuehle oder Bewusstsein."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Select 10 Cards and make sure Verified Labels are active to achieve over 90% pattern accuracy.",
        "Waehle 10 Karten und saubere Daten, um ueber 90% Mustererkennungs-Genauigkeit zu erreichen."
      ),
      Widget: Widget,
      hint: T(
        "Tap 10 Cards, ensure clean labels are active, and tap check when the meter turns green.",
        "Tippe auf 10 Karten, aktiviere saubere Daten und druecke pruefen, wenn die Anzeige gruen wird."
      ),
    },
  ],
  askDad: T(
    "Papa, if an AI can compose a poem or draw a picture, does that mean it has feelings or imagination?",
    "Papa, wenn eine KI ein Gedicht schreibt oder ein Bild malt, hat sie dann echte Gefuehle oder Fantasie?"
  ),
  realLife: {
    title: T("Weather Forecasting at DWD Offenbach", "Wettervorhersage beim DWD in Offenbach"),
    body: T(
      "At the German Meteorological Service (Deutscher Wetterdienst, DWD) in Offenbach, supercomputers analyze petabytes of satellite imagery, atmospheric pressure readings, and wind measurements. Deep learning models help meteorologists predict severe storms, flash floods, and heatwaves hours earlier, saving lives and protecting communities.",
      "Beim Deutschen Wetterdienst (DWD) in Offenbach verarbeiten Supercomputer gewaltige Datenmengen aus Satellitenbildern, Luftdruck- und Windmessungen. Deep-Learning-Modelle helfen Meteorologen, Unwetter und Hitzewellen fruehzeitig vorherzusagen und Menschen rechtzeitig zu warnen."
    ),
  },
  factCard: {
    claims: [
      {
        text: "Alan Turing proposed the foundational question 'Can machines think?' in his famous 1950 paper 'Computing Machinery and Intelligence'.",
        source: "https://www.turing.ac.uk/about-us/alan-turing",
      },
      {
        text: "The term 'Artificial Intelligence' was officially coined at the Dartmouth Summer Research Project on Artificial Intelligence in 1956.",
        source: "https://www.britannica.com/technology/artificial-intelligence",
      },
      {
        text: "Deep neural networks trained on the ImageNet visual dataset in 2012 triggered a major boom in modern computer vision and deep learning.",
        source: "https://cacm.acm.org/magazines/2017/6/217743-imagenet/fulltext",
      },
      {
        text: "The Stanford Institute for Human-Centered AI publishes an annual AI Index detailing the global progress and research of machine learning systems.",
        source: "https://aiindex.stanford.edu/report/",
      },
      {
        text: "Germany adopted its national Artificial Intelligence Strategy in 2018 to foster responsible, trustworthy AI research and European innovation.",
        source: "https://www.ki-strategie-deutschland.de/en/",
      },
    ],
    simplified: [
      "We explain machine learning as finding statistical patterns in examples rather than writing rules by hand.",
      "We show how AI recognizes patterns across images, speech, and medical scans.",
      "We emphasize that AI models are human-created mathematical tools without feelings, soul, or consciousness.",
    ],
  },
};
