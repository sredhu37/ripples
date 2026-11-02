import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import { CharterDiagram, DebateProposalDiagram, CompromiseDiagram, PillarsDiagram, TrustDiagram } from "./democracy.diagrams";
import { DemocracyToy } from "./democracy.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <DemocracyToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <DemocracyToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "democracy",
  story: [
    animatedBeat(
      [
        T(
          "Moss was elected council chair, but winning an election does not mean you can do whatever you want.",
          "Moss wurde zum Ratsvorsitzenden gewählt, aber eine Wahl zu gewinnen bedeutet nicht, dass man tun kann, was man will."
        ),
        T(
          "Ripple Town wrote down a shared Town Charter that sets fair rules for everyone.",
          "Ripple Town schrieb eine gemeinsame Dorfsatzung auf, die faire Regeln für jeden festlegt."
        ),
        T(
          "The Charter guarantees that everyone has the right to speak up and that laws apply equally to all.",
          "Die Satzung garantiert, dass jeder das Recht hat seine Meinung zu sagen und Gesetze für alle gleich gelten."
        ),
        T(
          "Even the council leader must obey the same laws as the newest villager in town.",
          "Sogar der Ratsleiter muss dieselben Gesetze befolgen wie der neueste Dorfbewohner."
        ),
      ],
      CharterDiagram
    ),
    animatedBeat(
      [
        T(
          "One morning, Moss proposed spending the entire town treasury on a giant marble clock tower.",
          "Eines Morgens schlug Moss vor, die gesamte Dorfkasse für einen riesigen Marmor-Uhrenturm auszugeben."
        ),
        T(
          "In a democracy, leaders cannot just issue commands without listening to citizens.",
          "In einer Demokratie können Anführer nicht einfach Befehle erteilen, ohne den Bürgern zuzuhören."
        ),
        T(
          "Citizens gathered at an open town hall: 'The school roof leaks, and bakers need grain storage!'",
          "Die Bürger versammelten sich: 'Das Schuldach ist undicht und Bäcker brauchen einen Kornspeicher!'"
        ),
        T(
          "Open debate allowed villagers to speak the truth openly without fear.",
          "Die offene Debatte ermöglichte es den Dorfbewohnern, die Wahrheit ohne Angst frei auszusprechen."
        ),
      ],
      DebateProposalDiagram
    ),
    animatedBeat(
      [
        T(
          "Instead of arguing endlessly, the council negotiated a sensible compromise.",
          "Statt endlos zu streiten, handelte der Dorfrat einen vernünftigen Kompromiss aus."
        ),
        T(
          "A compromise means every group gives up a little bit so that everyone gets what they truly need.",
          "Ein Kompromiss bedeutet, dass jede Gruppe ein wenig nachgibt, damit jeder bekommt, was er wirklich braucht."
        ),
        T(
          "They agreed to repair the school roof, build a shared grain store, and put a modest clock on the hall.",
          "Sie einigten sich darauf, das Schuldach zu reparieren, einen Speicher zu bauen und eine Uhr anzubringen."
        ),
        T(
          "Democracy works through patience, discussion, and finding solutions together.",
          "Demokratie funktioniert durch Geduld, Diskussion und das gemeinsame Finden von Lösungen."
        ),
      ],
      CompromiseDiagram
    ),
    animatedBeat(
      [
        T(
          "Democracy means 'rule by the people', built on three core pillars.",
          "Demokratie bedeutet 'Herrschaft des Volkes', gestützt auf drei Kernsäulen."
        ),
        T(
          "First: Free speech and open debates so mistakes are identified quickly.",
          "Erstens: Freie Meinungsäußerung und offene Debatten, damit Fehler schnell erkannt werden."
        ),
        T(
          "Second: The rule of law, meaning rules and courts protect everyone, including minorities.",
          "Zweitens: Die Rechtsstaatlichkeit, was bedeutet, dass Regeln und Gerichte jeden schützen."
        ),
        T(
          "Third: Peaceful error correction: if leaders break their promises, citizens can vote them out next time.",
          "Drittens: Friedliche Fehlerkorrektur: Wenn Anführer Wort brechen, können Bürger sie abwählen."
        ),
      ],
      PillarsDiagram
    ),
    animatedBeat(
      [
        T(
          "Because every citizen has a voice, people trust the shared rules and work together peacefully.",
          "Weil jeder Bürger eine Stimme hat, vertrauen die Menschen den gemeinsamen Regeln und arbeiten friedlich zusammen."
        ),
        T(
          "A healthy democracy requires citizens to listen to each other and respect differing viewpoints.",
          "Eine gesunde Demokratie erfordert, dass die Bürger einander zuhören und unterschiedliche Sichtweisen respektieren."
        ),
        T(
          "Through cooperation and peaceful debates, Ripple Town stays strong, fair, and welcoming for everyone.",
          "Durch Zusammenarbeit und friedliche Debatten bleibt Ripple Town stark, gerecht und offen für alle."
        ),
      ],
      TrustDiagram
    ),
  ],
  toyIntro: T(
    "Balance the council budget tokens so all three citizen groups are satisfied with the compromise.",
    "Bringe die Ratsbudget-Münzen ins Gleichgewicht, damit alle drei Bürgergruppen mit dem Kompromiss zufrieden sind."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does 'democracy' mean in everyday life?",
        "Was bedeutet 'Demokratie' im täglichen Leben?"
      ),
      options: [
        {
          text: T(
            "Citizens participate in decisions, follow shared laws, and resolve disputes through debate and voting",
            "Bürger wirken an Entscheidungen mit, befolgen gemeinsame Gesetze und lösen Streit durch Debatte und Wahl"
          ),
          correct: true,
        },
        {
          text: T(
            "One ruler tells everyone what to do without asking",
            "Ein Anführer befiehlt jedem, was er tun soll, ohne zu fragen"
          ),
        },
        {
          text: T(
            "There are no rules and everyone does whatever they want",
            "Es gibt keine Regeln und jeder macht, was er will"
          ),
        },
      ],
      hint: T(
        "Democracy empowers all citizens to have a voice through representatives and fair rules.",
        "Demokratie ermächtigt alle Bürger, durch Vertreter und faire Regeln eine Stimme zu haben."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is finding a compromise so important in a democratic council?",
        "Warum ist das Finden eines Kompromisses im Gemeinderat so wichtig?"
      ),
      options: [
        {
          text: T(
            "Because different neighbors have different needs, and cooperation requires balanced solutions",
            "Weil Nachbarn verschiedene Bedürfnisse haben und Zusammenarbeit ausgewogene Lösungen erfordert"
          ),
          correct: true,
        },
        {
          text: T(
            "Because one person should always win 100 percent of the time",
            "Weil eine Person immer zu 100 Prozent gewinnen sollte"
          ),
        },
        {
          text: T(
            "Because compromise means giving all the money to the richest merchant",
            "Weil Kompromiss bedeutet, das ganze Geld dem reichsten Händler zu geben"
          ),
        },
      ],
      hint: T(
        "A compromise ensures that everyone's core needs are respected and protected.",
        "Ein Kompromiss stellt sicher, dass die Grundbedürfnisse aller respektiert und geschützt werden."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Allocate 10 tokens so Sailors, Bakers, and Families each get at least 2 tokens to reach consensus.",
        "Verteile 10 Münzen so, dass Seeleute, Bäcker und Familien jeweils mindestens 2 Münzen erhalten."
      ),
      Widget: Widget,
      hint: T(
        "Ensure the total budget equals 10 and each of the three groups has 2 or more tokens.",
        "Stelle sicher, dass die Summe genau 10 beträgt und jede der drei Gruppen 2 oder mehr Münzen hat."
      ),
    },
  ],
  askDad: T(
    "Papa, what happens in a democracy if the leaders do a bad job or break their promises?",
    "Papa, was passiert in einer Demokratie, wenn die Anführer schlechte Arbeit leisten oder ihre Versprechen brechen?"
  ),
  realLife: {
    title: T("Parliamentary Democracy in Germany", "Parlamentarische Demokratie in Deutschland"),
    body: T(
      "Germany is a parliamentary democracy. Members of Parliament in the Bundestag represent different political parties and frequently form coalition governments, negotiating compromises so the government represents a broad majority.",
      "Deutschland ist eine parlamentarische Demokratie. Abgeordnete im Bundestag vertreten verschiedene Parteien und bilden Koalitionen, um Kompromisse auszuhandeln, die eine breite Mehrheit vertreten."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The German Bundestag is the federal parliament where freely elected representatives debate bills, scrutinize the executive, and represent citizens.",
        source: "https://www.bundestag.de/parlament",
      },
      {
        text: "The Basic Law (Grundgesetz Art. 20) defines Germany as a democratic and social federal state where all state authority derives from the people.",
        source: "https://www.gesetze-im-internet.de/gg/",
      },
      {
        text: "The Federal Constitutional Court (Bundesverfassungsgericht) safeguards basic rights, minority protections, and compliance with the constitution.",
        source: "https://www.bundesverfassungsgericht.de/DE/Das-Gericht/Aufgaben/aufgaben_node.html",
      },
      {
        text: "Civic education frameworks define democratic political culture through peaceful dispute resolution, respect for dissenting opinions, and willingness to compromise.",
        source: "https://www.bpb.de/themen/politisches-system/demokratie/",
      },
      {
        text: "The Bundesrat represents the 16 German federal states, ensuring that federal legislation balances national and regional community interests.",
        source: "https://www.bundrat.de/DE/aufgaben/aufgaben-node.html",
      },
    ],
    simplified: [
      "We explain democracy through a town council budget dilemma so children understand why consensus and compromise take time.",
      "We emphasize that elected leaders are bound by written rules, preventing arbitrary decisions.",
      "We show that peaceful error correction at elections is the main protection against bad policy.",
    ],
  },
};
