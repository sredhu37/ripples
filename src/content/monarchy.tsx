import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import { CastleDiagram, TwoKingsDiagram, ComparisonDiagram, ModernRoleDiagram, TraditionDiagram } from "./monarchy.diagrams";
import { MonarchyToy } from "./monarchy.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <MonarchyToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <MonarchyToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "monarchy",
  story: [
    animatedBeat(
      [
        T(
          "Across the water on Castle Island, leaders are not chosen by elections.",
          "Auf der Schlossinsel jenseits des Wassers werden die Anführer nicht durch Wahlen bestimmt."
        ),
        T(
          "Instead, leadership passes down within a single ruling family from parent to child.",
          "Stattdessen wird die Führung innerhalb einer Herrscherfamilie von den Eltern an das Kind vererbt."
        ),
        T(
          "This system of hereditary rule by a king or queen is called a *monarchy*.",
          "Dieses System der Erbfolge durch einen König oder eine Königin nennt man *Monarchie*."
        ),
        T(
          "For hundreds of years, many places in history were ruled by monarchs.",
          "Hunderte von Jahren lang wurden viele Orte in der Geschichte von Monarchen regiert."
        ),
      ],
      CastleDiagram
    ),
    animatedBeat(
      [
        T(
          "Long ago, Castle Island had an absolute king named Jasper who held total power alone.",
          "Vor langer Zeit hatte die Schlossinsel einen König namens Jasper, der die gesamte Macht allein besaß."
        ),
        T(
          "When King Jasper was wise and caring, the island flourished and bridges were repaired.",
          "Als König Jasper weise und fürsorglich war, blühte die Insel auf und Brücken wurden repariert."
        ),
        T(
          "But when his son Prince Leo inherited the crown, Leo cared only about hunting fancy peacocks.",
          "Doch als sein Sohn Prinz Leo die Krone erbte, kümmerte er sich nur noch um die Jagd nach Pfauen."
        ),
        T(
          "The town roads cracked and taxes spiked, but citizens had no vote to change their leader.",
          "Die Dorfstraßen bekamen Risse und Steuern stiegen, aber Bürger durften ihren Anführer nicht abwählen."
        ),
      ],
      TwoKingsDiagram
    ),
    animatedBeat(
      [
        T(
          "The people of Castle Island realized: trusting power to luck of birth is very risky.",
          "Die Menschen auf der Schlossinsel erkannten: Macht dem Zufall der Geburt zu überlassen ist riskant."
        ),
        T(
          "An *absolute monarchy* gives one person total power without elections or courts to check them.",
          "Eine *absolute Monarchie* gibt einer Person die gesamte Macht ohne Wahlen oder Gerichte zur Kontrolle."
        ),
        T(
          "A *constitutional monarchy* keeps the king or queen as a symbol of unity, while an elected parliament governs.",
          "Eine *konstitutionelle Monarchie* behält den Monarchen als Symbol, während ein gewähltes Parlament regiert."
        ),
        T(
          "In a constitutional system, written laws protect citizens and parliament manages the budget.",
          "In einem konstitutionellen System schützen geschriebene Gesetze die Bürger und das Parlament führt das Budget."
        ),
      ],
      ComparisonDiagram
    ),
    animatedBeat(
      [
        T(
          "Today, Queen Rosa wears the golden crown for festivals and welcomes visiting travelers.",
          "Heute trägt Königin Rosa die Krone bei Festen und begrüßt reisende Gäste."
        ),
        T(
          "She represents shared tradition, but she cannot pass laws or raise taxes on her own.",
          "Sie vertritt die Tradition, kann aber keine Gesetze erlassen oder Steuern eigenmächtig erhöhen."
        ),
        T(
          "The island's freely elected council makes all decisions, ensuring stability and fairness.",
          "Der frei gewählte Rat der Insel trifft alle Entscheidungen und sichert Stabilität und Fairness."
        ),
      ],
      ModernRoleDiagram
    ),
    animatedBeat(
      [
        T(
          "Combining tradition with elected representation allows people to honor their history while governing fairly.",
          "Tradition mit gewählten Vertretern zu verbinden ermöglicht es, Geschichte zu ehren und gerecht zu regieren."
        ),
        T(
          "This balance ensures that governing decisions are always accountable to the citizens.",
          "Dieses Gleichgewicht stellt sicher, dass politische Entscheidungen stets den Bürgern gegenüber rechenschaftspflichtig sind."
        ),
      ],
      TraditionDiagram
    ),
  ],
  toyIntro: T(
    "Explore the Castle Island simulator to compare an absolute monarchy with a constitutional monarchy.",
    "Erkunde den Schlossinsel-Simulator, um absolute und konstitutionelle Monarchie zu vergleichen."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What defines how leaders are chosen in a monarchy?",
        "Wie werden Anführer in einer Monarchie bestimmt?"
      ),
      options: [
        {
          text: T(
            "Leadership is hereditary and passes down within a ruling royal family",
            "Die Herrschaft ist erblich und wird innerhalb einer königlichen Familie weitergegeben"
          ),
          correct: true,
        },
        {
          text: T(
            "All citizens vote every four weeks in secret booths",
            "Alle Bürger wählen alle vier Wochen in geheimen Kabinen"
          ),
        },
        {
          text: T(
            "The fastest runner in the village gets the crown",
            "Der schnellste Läufer des Dorfes bekommt die Krone"
          ),
        },
      ],
      hint: T(
        "In a monarchy, titles and leadership are inherited by birth within a family line.",
        "In einer Monarchie werden Titel und Führung durch Geburt in einer Familie vererbt."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What is the key difference between an absolute and a constitutional monarchy?",
        "Was ist der Hauptunterschied zwischen einer absoluten und einer konstitutionellen Monarchie?"
      ),
      options: [
        {
          text: T(
            "In a constitutional monarchy, real lawmaking power belongs to an elected parliament bound by laws",
            "In einer konstitutionellen Monarchie liegt die Gesetzgebung bei einem gewählten Parlament unter Gesetzen"
          ),
          correct: true,
        },
        {
          text: T(
            "In an absolute monarchy, the king must ask permission from cats",
            "In einer absoluten Monarchie muss der König Katzen um Erlaubnis bitten"
          ),
        },
        {
          text: T(
            "There is no difference between them",
            "Es gibt überhaupt keinen Unterschied zwischen ihnen"
          ),
        },
      ],
      hint: T(
        "Constitutional monarchies place governing power in an elected parliament and written constitution.",
        "Konstitutionelle Monarchien legen die Regierungsmacht in ein gewähltes Parlament und eine Verfassung."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "In a modern constitutional monarchy, who makes the laws and taxes?",
        "Wer beschließt in einer modernen konstitutionellen Monarchie die Gesetze und Steuern?"
      ),
      Widget: Widget,
      hint: T(
        "Remember: In a constitutional monarchy, governing power rests with the elected parliament.",
        "Denke daran: In einer konstitutionellen Monarchie liegt die Regierungsmacht beim gewählten Parlament."
      ),
    },
  ],
  askDad: T(
    "Papa, why did most modern countries decide that people should vote for their leaders instead of inheriting power?",
    "Papa, warum haben die meisten modernen Länder entschieden, dass Menschen ihre Anführer wählen sollten statt Macht zu erben?"
  ),
  realLife: {
    title: T("From Empire to Republic in Germany", "Vom Kaiserreich zur Republik in Deutschland"),
    body: T(
      "Germany had monarchs (emperors and kings) until 1918. After World War I, Germany became a democratic republic. Today, European neighbors like the UK, the Netherlands, and Sweden are constitutional monarchies where elected parliaments run the government.",
      "Deutschland hatte bis 1918 Monarchen (Kaiser und Könige). Nach dem Ersten Weltkrieg wurde Deutschland eine demokratische Republik. Heute sind Nachbarn wie Großbritannien, die Niederlande und Schweden konstitutionelle Monarchien mit gewählten Parlamenten."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The German Empire (Deutsches Kaiserreich) ended in November 1918 when Emperor Wilhelm II abdicated and the Weimar Republic was proclaimed.",
        source: "https://www.bpb.de/themen/zeit-unterwegs/weimarer-republik/",
      },
      {
        text: "The 1919 Weimar Constitution established parliamentary democracy and abolished nobility privileges in Germany.",
        source: "https://www.gesetze-im-internet.de/wrv/",
      },
      {
        text: "Several modern European democracies, including the United Kingdom, Sweden, Denmark, and the Netherlands, operate as constitutional monarchies.",
        source: "https://www.parliament.uk/about/how/role/monarchy/",
      },
      {
        text: "Historical records show that hereditary monarchies without parliamentary checks faced high risks of misrule when an heir lacked governing competence.",
        source: "https://www.dhm.de/lemo/kapitel/kaiserreich.html",
      },
      {
        text: "The German Bundestag's historical archives document the development from monarchical authority to parliamentary sovereignty.",
        source: "https://www.bundestag.de/geschichte",
      },
    ],
    simplified: [
      "We contrast wise King Jasper with careless Prince Leo so children understand the risk of relying purely on birth inheritance.",
      "We distinguish absolute power from constitutional figurehead roles using friendly castle and parliament comparisons.",
      "We explain modern monarchies as cultural symbols alongside democratic parliaments.",
    ],
  },
};
