import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  SavingsChestDiagram,
  SpendingVsPreservingDiagram,
  EndowmentTreeDiagram,
  PerpetualCommunityDiagram,
  GermanFoundationsDiagram,
} from "./philanthropy.diagrams";
import { PhilanthropyToy } from "./philanthropy.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <PhilanthropyToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <PhilanthropyToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "philanthropy",
  story: [
    animatedBeat(
      [
        T(
          "Old Captain Coral has saved one thousand coins over a long career of sea trading.",
          "Der alte Kapitän Coral hat über eine lange Laufbahn im Seehandel eintausend Münzen gespart."
        ),
        T(
          "Coral wants to help Ripple Town children learn to read books and swim safely for centuries.",
          "Coral möchte den Kindern von Ripple Town helfen, über Jahrhunderte sicher lesen und schwimmen zu lernen."
        ),
        T(
          "Coral wonders how best to use this treasure to create lasting good.",
          "Coral überlegt, wie dieser Schatz am besten dauerhaft Gutes bewirken kann."
        ),
        T(
          "A lifetime of wealth can either be spent quickly or preserved forever.",
          "Ein Lebenswerk an Wohlstand kann entweder rasch ausgegeben oder für immer bewahrt werden."
        ),
      ],
      SavingsChestDiagram
    ),
    animatedBeat(
      [
        T(
          "If Coral hands out the one thousand coins as cash gifts today, the coins vanish in two years.",
          "Verteilt Coral die eintausend Münzen heute als Bargeldgeschenke, sind sie in zwei Jahren weg."
        ),
        T(
          "People would buy extra sweets, and then the money would be gone forever.",
          "Die Menschen würden Süßigkeiten kaufen, und danach wäre das Geld für immer verloren."
        ),
        T(
          "Instead, Coral establishes a charitable institution called a *foundation*.",
          "Stattdessen gründet Coral eine gemeinnützige Institution: eine *Stiftung*."
        ),
        T(
          "The one thousand coins become the protected *endowment*, never to be touched or spent.",
          "Die eintausend Münzen werden zum geschützten *Stiftungsvermögen*, das niemals angetastet wird."
        ),
      ],
      SpendingVsPreservingDiagram
    ),
    animatedBeat(
      [
        T(
          "The foundation acts like an apple tree with deep, protected roots.",
          "Die Stiftung funktioniert wie ein Apfelbaum mit tiefen, geschützten Wurzeln."
        ),
        T(
          "The one thousand coins are invested safely in town harbor bonds.",
          "Die eintausend Münzen werden sicher in den Hafenanleihen der Stadt angelegt."
        ),
        T(
          "Every year, the bonds yield forty coins of fresh interest.",
          "Jedes Jahr werfen die Anleihen vierzig Münzen frische Zinsen ab."
        ),
        T(
          "Only the annual harvest of forty coins is spent, leaving the living tree completely intact.",
          "Nur die jährliche Ernte von vierzig Münzen wird ausgegeben, der Baum bleibt unversehrt."
        ),
      ],
      EndowmentTreeDiagram
    ),
    animatedBeat(
      [
        T(
          "With forty coins every year, the foundation buys new books for the town library.",
          "Mit vierzig Münzen jedes Jahr kauft die Stiftung neue Bücher für die Dorfbücherei."
        ),
        T(
          "It pays a swimming instructor so every girl and boy learns water safety.",
          "Sie bezahlt einen Schwimmlehrer, damit jedes Kind sicher im Meer schwimmen lernt."
        ),
        T(
          "Decades from now, when Otto has grandchildren, the foundation will still be funding swimming lessons.",
          "In Jahrzehnten, wenn Otto Enkel hat, wird die Stiftung noch immer Schwimmunterricht bezahlen."
        ),
        T(
          "This is how private wealth transforms into an eternal *public good*.",
          "So verwandelt sich privater Wohlstand in ein ewiges *Gemeinwohl*."
        ),
      ],
      PerpetualCommunityDiagram
    ),
    animatedBeat(
      [
        T(
          "In Germany, more than twenty-five thousand foundations fund research, culture, and nature.",
          "In Deutschland fördern über fünfundzwanzigtausend Stiftungen Forschung, Kultur und Natur."
        ),
        T(
          "Pioneers like Robert Bosch and Carl Zeiss dedicated their companies to foundations.",
          "Pioniere wie Robert Bosch und Carl Zeiss übertrugen ihre Unternehmen an Stiftungen."
        ),
        T(
          "By law, their endowment capital must be preserved for eternity.",
          "Per Gesetz muss ihr Stiftungsvermögen auf ewig erhalten bleiben."
        ),
        T(
          "Philanthropy shows that the greatest reward of creating wealth is giving it back.",
          "Philanthropie zeigt: Der schönste Lohn für Wohlstand ist es, der Welt etwas zurückzugeben."
        ),
      ],
      GermanFoundationsDiagram
    ),
  ],
  toyIntro: T(
    "Allocate the 40-coin annual endowment harvest to community projects while keeping capital intact.",
    "Verteile die 40 Münzen Jahresertrag auf Dorfprojekte und schütze das Stiftungsvermögen."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "How does a philanthropic foundation fund community projects indefinitely?",
        "Wie finanziert eine gemeinnützige Stiftung Projekte auf unbegrenzte Zeit?"
      ),
      options: [
        {
          text: T(
            "It preserves its endowment capital permanently and only spends the annual earnings",
            "Sie bewahrt ihr Stiftungsvermögen dauerhaft und gibt nur die jährlichen Erträge aus"
          ),
          correct: true,
        },
        {
          text: T(
            "It spends all its money on fireworks on the very first day",
            "Sie gibt ihr gesamtes Geld am ersten Tag für ein Feuerwerk aus"
          ),
        },
        {
          text: T(
            "It forces citizens to pay a daily coin tax to the tree",
            "Sie zwingt die Bürger, dem Baum täglich eine Münzsteuer zu zahlen"
          ),
        },
      ],
      hint: T(
        "Think of the apple tree: harvest the apples, but never cut down the trunk.",
        "Denke an den Apfelbaum: Ernte die Äpfel, aber fälle niemals den Stamm."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What is an endowment (Stiftungsvermögen)?",
        "Was ist das Stiftungsvermögen?"
      ),
      options: [
        {
          text: T(
            "The protected capital of a foundation that generates annual income for charitable causes",
            "Das geschützte Grundkapital einer Stiftung, das jährliche Erträge für gute Zwecke abwirft"
          ),
          correct: true,
        },
        {
          text: T(
            "A pile of pirate treasure buried under a beach palm tree",
            "Ein Piratenschatz, der unter einer Strandpalme vergraben liegt"
          ),
        },
        {
          text: T(
            "A type of warm woolly hat worn in winter",
            "Eine warme Wollmütze, die man im Winter trägt"
          ),
        },
      ],
      hint: T(
        "Under German law, the endowment capital must be preserved forever.",
        "Nach deutschem Recht muss das Stiftungsvermögen für immer erhalten bleiben."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "The foundation earned 40 coins in annual bond interest. Allocate 20 coins to the Library and 20 to the Swim Dock.",
        "Die Stiftung erwirtschaftete 40 Münzen Zinsen. Teile 20 Münzen der Bücherei und 20 dem Schwimmsteg zu."
      ),
      Widget: Widget,
      hint: T(
        "Click +10 twice on Library, and +10 twice on Swimming Dock, then tap check.",
        "Klicke je zweimal auf +10 bei Bücherei und Schwimmsteg, dann auf prüfen."
      ),
    },
  ],
  askDad: T(
    "Papa, what kind of foundation would you like to start to help people long after we are gone?",
    "Papa, was für eine Stiftung würdest du gerne gründen, um Menschen noch lange nach unserer Zeit zu helfen?"
  ),
  realLife: {
    title: T("Foundations in Germany", "Stiftungen in Deutschland"),
    body: T(
      "Germany has over 25,000 foundations (Stiftungen), such as the Robert Bosch Stiftung, the Bertelsmann Stiftung, and the VolkswagenStiftung. Under German civil law (BGB §§ 80 ff.), their original endowment capital must be preserved for eternity, funding scientific research, education, and social projects from annual investment earnings.",
      "In Deutschland gibt es über 25.000 Stiftungen, etwa die Robert Bosch Stiftung, die Bertelsmann Stiftung oder die VolkswagenStiftung. Nach deutschem Zivilrecht (BGB §§ 80 ff.) muss das Stiftungsvermögen auf ewig erhalten bleiben; jährliche Erträge finanzieren Forschung, Bildung und Soziales."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The Association of German Foundations reports over 25,000 civil law foundations active in Germany.",
        source: "https://www.stiftungen.org/stiftungen/basiswissen-stiftungen/was-ist-eine-stiftung.html",
      },
      {
        text: "German foundations hold over 100 billion euros in dedicated endowment assets dedicated to public benefit purposes.",
        source: "https://www.stiftungen.org/stiftungen/basiswissen-stiftungen/was-ist-eine-stiftung/10-fakten-ueber-stiftungen.html",
      },
      {
        text: "The German Civil Code (BGB § 80) regulates the legal formation of foundations with legal personality.",
        source: "https://www.gesetze-im-internet.de/bgb/__80.html",
      },
      {
        text: "BGB § 83 mandates that a foundation endowment must be dedicated permanently to fulfilling its founder purpose.",
        source: "https://www.gesetze-im-internet.de/bgb/__83.html",
      },
      {
        text: "Endowment preservation requires foundations to sustain capital value in real terms and disburse only returns.",
        source: "https://wirtschaftslexikon.gabler.de/definition/stiftung-44223",
      },
    ],
    simplified: [
      "We explain foundations using an apple tree whose deep roots and trunk must never be chopped down.",
      "We contrast fleeting cash handouts with permanent endowments that produce continuous annual fruit.",
      "We connect private philanthropy to community goods like free library books, swimming safety, and clean parks.",
    ],
  },
};
