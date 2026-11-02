import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  MagnifyingGlassArchiveDiagram,
  PrimarySourcesTapestryDiagram,
  MemorialStolpersteineDiagram,
  CompassFutureCompassDiagram,
  InterlockingGenerationsDiagram,
} from "./whyhistory.diagrams";
import { WhyHistoryToy } from "./whyhistory.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <WhyHistoryToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <WhyHistoryToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "whyhistory",
  story: [
    animatedBeat(
      [
        T(
          "Why do we spend time learning about events that happened decades, centuries, or millennia ago?",
          "Warum beschaeftigen wir uns mit Ereignissen, die Jahrzehnte, Jahrhunderte oder Jahrtausende zurueckliegen?"
        ),
        T(
          "Because every bridge, law, book, and freedom we enjoy today was built by the generations before us.",
          "Weil jede Bruecke, jedes Gesetz und jede Freiheit von frueheren Generationen geschaffen wurde."
        ),
        T(
          "History is not a dusty list of dry dates and dead kings to memorize for an exam.",
          "Geschichte ist keine verstaubte Liste aus trockenen Jahreszahlen fuer eine Pruefung."
        ),
        T(
          "It is the living, breathing human story of how our modern world came to be.",
          "Sie ist die lebendige Erzaehlung darueber, wie unsere heutige Welt entstanden ist."
        ),
      ],
      MagnifyingGlassArchiveDiagram
    ),
    animatedBeat(
      [
        T(
          "When historians investigate the past, they search for genuine *primary sources*.",
          "Wenn Historiker die Vergangenheit erforschen, suchen sie nach echten *Primaerquellen*."
        ),
        T(
          "A primary source is direct evidence created at the time: handwritten diaries, stone seals, letters, and tools.",
          "Eine Primaerquelle ist ein direktes Zeugnis aus der Zeit: Tagebuecher, Urkunden, Briefe und Werkzeuge."
        ),
        T(
          "Historians compare different eyewitness accounts to separate verified facts from exaggeration or bias.",
          "Sie vergleichen Augenzeugenberichte, um echte Fakten von Uebertreibung und Vorurteilen zu trennen."
        ),
        T(
          "Just like detectives, they follow the evidence wherever the honest truth leads.",
          "Wie Detektive folgen Historiker den Beweisen dorthin, wo die ehrliche Wahrheit liegt."
        ),
      ],
      PrimarySourcesTapestryDiagram
    ),
    animatedBeat(
      [
        T(
          "In Germany and across Europe, communities practice *Erinnerungskultur* (memorial culture).",
          "In Deutschland und ganz Europa pflegen Menschen eine lebendige *Erinnerungskultur*."
        ),
        T(
          "This means confronting both glorious achievements and painful mistakes with total honesty.",
          "Das bedeutet, sowohl Errungenschaften als auch schmerzhafte Fehler ehrlich anzuschauen."
        ),
        T(
          "By remembering injustice, societies ensure they never repeat the dark choices of authoritarian pasts.",
          "Indem wir uns an Unrecht erinnern, stellen wir sicher, Fehler der Vergangenheit niemals zu wiederholen."
        ),
        T(
          "True courage means learning from the past rather than hiding or pretending it did not happen.",
          "Wahrer Mut bedeutet, aus der Geschichte zu lernen, statt wegzuschauen oder sie zu verschweigen."
        ),
      ],
      MemorialStolpersteineDiagram
    ),
    animatedBeat(
      [
        T(
          "History acts as our ultimate navigation compass for charting the uncharted waters ahead.",
          "Geschichte ist unser Kompass, um sichere Wege in die Zukunft zu finden."
        ),
        T(
          "It shows us which paths led to flourishing cooperation, and which paths led to tragedy.",
          "Sie zeigt uns, welche Wege zu bluehendem Frieden und welche in die Sackgasse fuehrten."
        ),
        T(
          "When we understand why past institutions succeeded or failed, we make smarter decisions today.",
          "Wenn wir verstehen, warum Ideen funktionierten oder scheiterten, treffen wir heute kluegere Entscheidungen."
        ),
        T(
          "History empowers every citizen with wisdom, perspective, and moral clarity.",
          "Geschichte schenkt jedem Buerger Weitsicht, Urteilskraft und Klarheit."
        ),
      ],
      CompassFutureCompassDiagram
    ),
    animatedBeat(
      [
        T(
          "Now, the torch of human history passes into your capable, curious hands.",
          "Nun wird die Fackel der Menschheitsgeschichte an dich weitergereicht."
        ),
        T(
          "Every kind word you speak, fair rule you respect, and idea you build ripples forward in time.",
          "Jedes freundliche Wort, jede faire Regel und jede gute Idee schlaegt Wellen in die Zukunft."
        ),
        T(
          "You are not just a spectator watching history; you are actively writing the next page.",
          "Du bist nicht nur Zuschauer der Geschichte; du schreibst aktiv das naechste Kapitel."
        ),
        T(
          "Let us build an open, thoughtful, and compassionate tomorrow for everyone on Earth!",
          "Lasst uns eine offene, kluge und friedliche Zukunft fuer alle Menschen gestalten!"
        ),
      ],
      InterlockingGenerationsDiagram
    ),
  ],
  toyIntro: T(
    "Connect each historical artifact in the archive with its enduring lesson for humanity.",
    "Verknuepfe jedes Fundstueck im Archiv mit seiner bleibenden Bedeutung fuer die Menschheit."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is a primary source in historical research?",
        "Was versteht man unter einer Primaerquelle in der Geschichtswissenschaft?"
      ),
      options: [
        {
          text: T(
            "Direct evidence created at the time, such as diaries, handwritten letters, treaties, or tools",
            "Ein direktes Zeugnis aus der Zeit, wie Tagebuecher, Briefe, Vertraege oder Werkzeuge"
          ),
          correct: true,
        },
        {
          text: T(
            "A magic crystal ball that plays cartoon music when placed in warm milk",
            "Eine Kristallkugel, die Musik abspielt, wenn man sie in warme Milch legt"
          ),
        },
        {
          text: T(
            "A comic book written yesterday about dragons dancing in sixteenth-century castles",
            "Ein Comic von gestern ueber tanzende Drachen in Schloessern"
          ),
        },
      ],
      hint: T(
        "Primary sources are genuine physical artifacts and written documents from the period.",
        "Primaerquellen stammen unmittelbar aus der Zeit, die erforscht wird."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why do societies practice memorial culture (Erinnerungskultur)?",
        "Warum pflegen Gesellschaften eine lebendige Erinnerungskultur?"
      ),
      options: [
        {
          text: T(
            "To learn honestly from past mistakes, protect human dignity, and defend democratic freedoms",
            "Um aus Fehlern zu lernen, die Menschenwuerde zu schuetzen und die Freiheit zu verteidigen"
          ),
          correct: true,
        },
        {
          text: T(
            "To test how many museum postcards can fit inside an empty cereal box",
            "Um auszuprobieren, wie viele Museumskarten in eine Mueslischachtel passen"
          ),
        },
        {
          text: T(
            "To forbid all students from ever eating strawberry ice cream after school",
            "Um allen Schuelern zu verbieten, jemals wieder Erdbeereis zu essen"
          ),
        },
      ],
      hint: T(
        "Remembering the past with honesty is essential for safeguarding democracy.",
        "Ehrliches Erinnern ist die beste Verteidigung unserer Demokratie."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Match all 4 historical artifacts in the archive to their meaning to achieve 100% insight.",
        "Ordne alle 4 Fundstuecke im Archiv ihrer Bedeutung zu, um 100% Erkenntnis zu erreichen."
      ),
      Widget: Widget,
      hint: T(
        "Select Cultural Dialogue for Astrolabe, Self-Reliance for Yarn, Diplomacy for Treaty, and Reconciliation for Steel Beam.",
        "Waehle Kulturaustausch fuers Astrolabium, Selbstbestimmung fuer Garn, Diplomatie fuer Vertrag und Versoehnung fuer Stahl."
      ),
    },
  ],
  askDad: T(
    "Papa, what is one historical lesson or family story that has guided your decisions in life?",
    "Papa, welche historische Lektion oder Familiengeschichte hat dich in deinem Leben besonders gepraegt?"
  ),
  realLife: {
    title: T("Archives and History Workshops", "Archive und Geschichtswerkstaetten"),
    body: T(
      "Almost every town in Germany has a municipal archive (Stadtarchiv) where original birth registers, maps, building plans, and council minutes going back centuries are preserved in climate-controlled vaults. Citizen historians and students can visit to examine original primary sources for their own school projects, discovering how world events shaped their own neighborhood.",
      "Fast jede Stadt in Deutschland besitzt ein Stadtarchiv, in dem Originalurkunden, Karten und Ratsprotokolle aus vielen Jahrhunderten sicher aufbewahrt werden. Schueler und Buerger koennen dort historische Originalquellen einsehen und erforschen, wie die Weltgeschichte ihre eigene Nachbarschaft gepraegt hat."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The discipline of modern historical methodology is rooted in the systematic analysis and critical cross-referencing of primary sources.",
        source: "https://www.historians.org/about-aha-and-membership/aha-history-and-archives/historical-thinking-skills",
      },
      {
        text: "The concept of Erinnerungskultur (culture of remembrance) is central to post-war German civic education and democratic political culture.",
        source: "https://www.bpb.de/themen/erinnerung/",
      },
      {
        text: "The UNESCO Recommendation concerning the Protection and Promotion of Museums and Collections underscores museums as places of civic dialogue.",
        source: "https://unesdoc.unesco.org/ark:/48223/pf0000246331",
      },
      {
        text: "The International Council on Archives (ICA) promotes the preservation and accessible use of documentary heritage worldwide.",
        source: "https://www.ica.org/en/about-archives",
      },
      {
        text: "The Universal Declaration on Cultural Diversity (UNESCO 2001) affirms intercultural heritage as essential for human flourishing.",
        source: "https://www.unesco.org/en/legal-affairs/unesco-universal-declaration-cultural-diversity",
      },
    ],
    simplified: [
      "We explain the nature of primary sources using relatable everyday examples like letters and tools.",
      "We teach that history is a dynamic method of detective inquiry rather than passive memorization.",
      "We show that honest remembrance builds an ethical foundation for democratic responsibility.",
    ],
  },
};
