import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import { CentralDeskDiagram, KnowledgeProblemDiagram, ShortagesQueuesDiagram, CoreDifferenceDiagram, PlanningOutcomeDiagram } from "./communism.diagrams";
import { CommunismToy } from "./communism.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <CommunismToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <CommunismToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "communism",
  story: [
    animatedBeat(
      [
        T(
          "In High Valley, leaders decided that private shops and businesses were unfair.",
          "Im Hohen Tal beschlossen die Anführer, dass private Läden und Betriebe ungerecht seien."
        ),
        T(
          "They announced that all ovens, fishing nets, and workshops belong to everyone together.",
          "Sie verkündeten, dass alle Öfen, Netze und Werkstätten allen gemeinsam gehören sollten."
        ),
        T(
          "An economic system where the state owns all tools and plans production is called *communism*.",
          "Ein Wirtschaftssystem, in dem der Staat alle Werkzeuge besitzt und die Produktion plant, heißt *Kommunismus*."
        ),
        T(
          "A Central Planning Desk in the capital was created to decide what gets produced and distributed.",
          "Eine zentrale Planungsstelle in der Hauptstadt sollte entscheiden, was hergestellt und verteilt wird."
        ),
      ],
      CentralDeskDiagram
    ),
    animatedBeat(
      [
        T(
          "The central desk planned to treat everyone equally: every district gets 33 coats and 33 shoes.",
          "Das Planungsbüro wollte alle gleich behandeln: Jeder Bezirk sollte 33 Mäntel und 33 Schuhe bekommen."
        ),
        T(
          "At first glance, dividing everything equally sounded very fair to the planners.",
          "Auf den ersten Blick klang das gleichmäßige Aufteilen für die Planer sehr gerecht."
        ),
        T(
          "However, the distant desk officer had no idea what was actually happening on the ground.",
          "Doch der ferne Planer wusste überhaupt nicht, was vor Ort wirklich geschah."
        ),
        T(
          "This challenge is known as the *local knowledge problem*.",
          "Diese Herausforderung nennt man das *lokale Wissensproblem*."
        ),
      ],
      KnowledgeProblemDiagram
    ),
    animatedBeat(
      [
        T(
          "Mountain District had freezing blizzards and needed 60 heavy coats, but received only 33.",
          "Der Gebirgsbezirk hatte Schneestürme und brauchte 60 dicke Mäntel, bekam aber nur 33."
        ),
        T(
          "Harbor District had warm sunny weather and received piles of winter coats nobody could wear.",
          "Der Hafenbezirk hatte sonniges Wetter und stapelweise Wintermäntel, die niemand brauchte."
        ),
        T(
          "Empty store shelves and long waiting lines formed because quotas did not match real needs.",
          "Leere Regale und lange Warteschlangen entstanden, weil Quoten nicht zum echten Bedarf passten."
        ),
        T(
          "Without private ownership, workers also lost the motivation to invent new products.",
          "Ohne Privateigentum verloren die Arbeiter zudem den Antrieb, neue Produkte zu erfinden."
        ),
      ],
      ShortagesQueuesDiagram
    ),
    animatedBeat(
      [
        T(
          "In a market economy, price signals and customer choices tell producers what to make.",
          "In einer Marktwirtschaft signalisieren Preise und Kundenwünsche, was gebraucht wird."
        ),
        T(
          "In a planned economy, a single office tries to guess millions of details, leading to chronic shortages.",
          "In einer Planwirtschaft versucht ein einziges Büro Millionen Details zu erraten, was zu Mangel führt."
        ),
        T(
          "Understanding how information moves in society helps explain why market coordination succeeds.",
          "Zu verstehen wie Information fließt hilft zu erklären, warum Markt-Koordination funktioniert."
        ),
      ],
      CoreDifferenceDiagram
    ),
    animatedBeat(
      [
        T(
          "Without prices and voluntary trade, planners lack the signals needed to know what people really value.",
          "Ohne Preise und freiwilligen Handel fehlen Planern die Signale um zu wissen, was Menschen wirklich schätzen."
        ),
        T(
          "Economic systems that trust people to make their own choices adapt faster and serve daily needs better.",
          "Wirtschaftssysteme, die Menschen eigene Entscheidungen zutrauen, passen sich schneller an und versorgen den Alltag besser."
        ),
      ],
      PlanningOutcomeDiagram
    ),
  ],
  toyIntro: T(
    "Step into the Central Planning Desk and discover the local knowledge problem across three districts.",
    "Tritt in die Plankommission ein und entdecke das lokale Wissensproblem über drei Bezirke."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the main idea of a communist planned economy?",
        "Was ist die Grundidee einer kommunistischen Planwirtschaft?"
      ),
      options: [
        {
          text: T(
            "The state or community owns all factories and tools, and a central desk decides production quotas",
            "Der Staat besitzt alle Fabriken und Werkzeuge, und ein zentrales Büro bestimmt Produktionsquoten"
          ),
          correct: true,
        },
        {
          text: T(
            "Every person buys five different rocket ships",
            "Jeder Mensch kauft sich fünf verschiedene Raketenschiffe"
          ),
        },
        {
          text: T(
            "There are no schools, hospitals, or roads anywhere",
            "Es gibt nirgendwo Schulen, Krankenhäuser oder Straßen"
          ),
        },
      ],
      hint: T(
        "In communism, private businesses are replaced by state-directed central planning.",
        "Im Kommunismus werden Privatbetriebe durch staatlich gelenkte Planwirtschaft ersetzt."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why do central planning offices struggle to supply what citizens actually need?",
        "Warum haben Planungsbüros Schwierigkeiten, den echten Bedarf der Bürger zu decken?"
      ),
      options: [
        {
          text: T(
            "Because a distant central office cannot know the daily changing needs and tastes of millions of people",
            "Weil ein fernes Zentralbüro die täglichen Bedürfnisse und Wünsche von Millionen Menschen nicht kennen kann"
          ),
          correct: true,
        },
        {
          text: T(
            "Because pens run out of blue ink in government offices",
            "Weil den Stiften in Behörden die blaue Tinte ausgeht"
          ),
        },
        {
          text: T(
            "Because everyone only wants to wear wooden shoes",
            "Weil jeder Mensch ausschließlich Holzschuhe tragen möchte"
          ),
        },
      ],
      hint: T(
        "The local knowledge problem explains that decentralized prices coordinate information better than one office.",
        "Das Wissensproblem zeigt, dass dezentrale Preise Information besser koordinieren als ein Zentralbüro."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Why did the central planning desk produce the wrong amounts of coats and shoes for the districts?",
        "Warum plante das zentrale Planungsbüro die falschen Mengen an Mänteln und Schuhen?"
      ),
      Widget: Widget,
      hint: T(
        "Recall what happens when a distant office tries to guess local needs without market feedback.",
        "Erinnere dich, was passiert, wenn ein fernes Büro den lokalen Bedarf ohne Rückmeldung erraten muss."
      ),
    },
  ],
  askDad: T(
    "Papa, why is it so hard for one central office to decide how much food and clothing an entire country needs every day?",
    "Papa, warum ist es so schwer für ein einziges Büro zu entscheiden, wie viel Essen und Kleidung ein Land täglich braucht?"
  ),
  realLife: {
    title: T("The Planned Economy in East Germany (GDR)", "Die Planwirtschaft in der DDR"),
    body: T(
      "From 1949 to 1989, East Germany (GDR / DDR) had a communist planned economy. The state owned all large factories (VEB) and set prices. Basic bread was cheap, but people had to wait up to 15 years to buy a small car (Trabant) and fresh fruit was often unavailable.",
      "Von 1949 bis 1989 hatte die DDR eine Planwirtschaft. Der Staat besaß alle Betriebe (VEB) und legte Preise fest. Grundnahrungsmittel waren billig, aber Bürger warteten bis zu 15 Jahre auf ein Auto (Trabant) und Südfrüchte fehlten oft."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The German Democratic Republic (GDR/DDR) operated a state-directed command economy guided by five-year plans and the State Planning Commission.",
        source: "https://www.hdg.de/lemo/kapitel/geteiltes-deutschland-grunderjahre/wirtschaft-und-gesellschaft-ddr.html",
      },
      {
        text: "Historical research documents persistent shortages of consumer goods, long waiting queues, and technological stagnation in the East German command economy.",
        source: "https://www.bpb.de/themen/deutsche-einheit/lange-wege-der-deutschen-einheit/47178/planwirtschaft/",
      },
      {
        text: "Archival records from the State Planning Commission illustrate the structural difficulties of calculating input-output balances for thousands of commodities.",
        source: "https://www.bundesarchiv.de/",
      },
      {
        text: "Economists analyze the 'local knowledge problem' as a fundamental informational constraint that impedes central economic planning.",
        source: "https://www.iwh-halle.de/",
      },
      {
        text: "Exhibits at the German Historical Museum show everyday life, rationing, and supply bottlenecks experienced under the East German planned economy.",
        source: "https://www.dhm.de/lemo/kapitel/geteiltes-deutschland-modernisierung/wirtschaft-und-gesellschaft-ddr.html",
      },
    ],
    simplified: [
      "We illustrate central planning through a distant desk allocating coats to mountain and harbor districts.",
      "We explain the local knowledge problem without mathematical jargon using weather differences and shoe sizes.",
      "We use waiting lines and empty shelves to show the real-world consequence of missing price signals.",
    ],
  },
};
