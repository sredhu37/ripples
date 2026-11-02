import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  MughalPavilionDiagram,
  AkbarThroneDiagram,
  IbadatKhanaDiagram,
  GrandTrunkRoadDiagram,
  CulturalSynthesisDiagram,
} from "./mughals.diagrams";
import { MughalsToy } from "./mughals.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <MughalsToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <MughalsToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "mughals",
  story: [
    animatedBeat(
      [
        T(
          "In the sixteenth century, the Mughal dynasty built a vast and flourishing realm across South Asia.",
          "Im sechzehnten Jahrhundert errichtete die Mogul-Dynastie ein grosses, bluehendes Reich in Suedasien."
        ),
        T(
          "It united mountains, fertile river valleys, and coastal ports into one grand *empire*.",
          "Es vereinte Gebirge, fruchtbare Flusstaeler und Kuestenhaefen zu einem grossen *Grossreich*."
        ),
        T(
          "Artisans carved red sandstone palaces and wove the finest cotton textiles in the world.",
          "Handwerker meisselten Palaeste aus rotem Sandstein und woben die feinsten Baumwollstoffe der Welt."
        ),
        T(
          "Yet the greatest challenge was bringing peace to a land of many diverse cultures.",
          "Doch die groesste Aufgabe bestand darin, vielen unterschiedlichen Kulturen Frieden zu schenken."
        ),
      ],
      MughalPavilionDiagram
    ),
    animatedBeat(
      [
        T(
          "Emperor Akbar realized that no realm could thrive through force or military conquest alone.",
          "Kaiser Akbar erkannte, dass kein Reich allein durch militaerische Gewalt bluehen kann."
        ),
        T(
          "He understood that lasting stability required wise laws, fair taxation, and honest governance.",
          "Er verstand: Dauerhafte Stabilitaet braucht gerechte Gesetze, faire Steuern und kluge Verwaltung."
        ),
        T(
          "Akbar abolished special taxes on pilgrims and welcomed capable advisors from every background.",
          "Akbar schaffte Sondersteuern fuer Pilger ab und begruesste faehige Berater aller Herkuenfte."
        ),
        T(
          "He believed that truth is like a bright diamond with many shining facets.",
          "Er glaubte daran, dass die Wahrheit wie ein funkelnder Diamant mit vielen Facetten ist."
        ),
      ],
      AkbarThroneDiagram
    ),
    animatedBeat(
      [
        T(
          "In the royal city of Fatehpur Sikri, Akbar constructed the *Ibadat Khana*, the House of Wisdom.",
          "In der Residenzstadt Fatehpur Sikri baute Akbar das *Ibadat Khana*, das Haus der Weisheit."
        ),
        T(
          "He invited scholars of Hinduism, Islam, Christianity, Jainism, and Zoroastrianism to meet.",
          "Er lud Gelehrte des Hinduismus, Islam, Christentums, Jainismus und Zoroastrismus ein."
        ),
        T(
          "Every Thursday night, they gathered around the council table to discuss justice and ethics.",
          "Jeden Donnerstagabend versammelten sie sich am Beratungstisch, um ueber Gerechtigkeit und Ethik zu sprechen."
        ),
        T(
          "This practice of *tolerance* allowed people of differing faiths to live together in mutual respect.",
          "Diese gelebte *Toleranz* ermoeglichte es Menschen unterschiedlichen Glaubens, in gegenseitigem Respekt zu leben."
        ),
      ],
      IbadatKhanaDiagram
    ),
    animatedBeat(
      [
        T(
          "Across the empire, builders paved the Grand Trunk Road, stretching thousands of kilometers.",
          "Quer durch das Reich wurde die Grand Trunk Road ausgebaut, die tausende Kilometer umspannte."
        ),
        T(
          "Shaded rest stops, freshwater wells, and horse messengers connected distant trading hubs.",
          "Schattige Rasthaeuser, Brunnen und berittene Boten verbanden weit entfernte Handelsplaetze."
        ),
        T(
          "Merchants carried spices, tea, indigo, and silk safely without fear of highway bandits.",
          "Kaufleute transportierten Gewuerze, Tee, Indigo und Seide sicher und ohne Furcht vor Raeubern."
        ),
        T(
          "South Asia produced nearly a quarter of all goods manufactured on Earth.",
          "Suedasien stellte damals fast ein Viertel aller auf der Erde gefertigten Gueter her."
        ),
      ],
      GrandTrunkRoadDiagram
    ),
    animatedBeat(
      [
        T(
          "This great era created a lasting cultural *synthesis* between Persian, Indian, and Central Asian ideas.",
          "Diese Aera schuf eine dauerhafte kulturelle *Verschmelzung* persischer, indischer und asiatischer Ideen."
        ),
        T(
          "It blossomed in breathtaking wonders like the Taj Mahal and royal astronomical observatories.",
          "Sie bluehte in atemberaubenden Wunderwerken wie dem Taj Mahal und Sternwarten auf."
        ),
        T(
          "Poets, musicians, and painters exchanged styles, creating new musical ragas and miniature paintings.",
          "Dichter, Musiker und Maler tauschten Stile aus und schufen neue Ragas und Miniaturgemaelde."
        ),
        T(
          "History teaches us that societies flourish when they open their doors and listen to one another.",
          "Die Geschichte lehrt uns: Gesellschaften bluehen auf, wenn sie ihre Tueren oeffnen und einander zuhoeren."
        ),
      ],
      CulturalSynthesisDiagram
    ),
  ],
  toyIntro: T(
    "Invite scholars of philosophy, astronomy, farming, and trade to the council table to build harmony.",
    "Lade Gelehrte fuer Philosophie, Astronomie, Landbau und Handel an den Tisch ein, um Harmonie zu stiften."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why did Emperor Akbar build the Ibadat Khana council table?",
        "Warum baute Kaiser Akbar den Beratungstisch im Ibadat Khana?"
      ),
      options: [
        {
          text: T(
            "To invite scholars of diverse traditions to discuss ethics, justice, and shared wisdom",
            "Um Gelehrte verschiedener Traditionen einzuladen und ueber Ethik, Recht und Weisheit zu sprechen"
          ),
          correct: true,
        },
        {
          text: T(
            "To challenge neighboring kings to arm-wrestling contests",
            "Um Nachbarkoenige zum Armdruecken herauszufordern"
          ),
        },
        {
          text: T(
            "To count how many gold coins could fit into a teapot",
            "Um zu zaehlen, wie viele Goldmuenzen in eine Teekanne passen"
          ),
        },
      ],
      hint: T(
        "Akbar sought truth and understanding across different philosophies and traditions.",
        "Akbar suchte nach Wahrheit und Verstaendnis zwischen verschiedenen Traditionen."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What does the term 'cultural synthesis' mean?",
        "Was bedeutet der Begriff 'kulturelle Verschmelzung'?"
      ),
      options: [
        {
          text: T(
            "Blending ideas, architecture, and traditions from different cultures into something new and beautiful",
            "Das Verbinden von Ideen, Bauwerken und Braeuche verschiedener Kulturen zu etwas Neuem und Schoenem"
          ),
          correct: true,
        },
        {
          text: T(
            "Forcing everyone to wear the exact same grey hat every day",
            "Jeden Menschen zu zwingen, taeglich den gleichen grauen Hut zu tragen"
          ),
        },
        {
          text: T(
            "Locking all library books in an iron chest at the bottom of the ocean",
            "Alle Buecher der Bibliothek in einer Eisenkiste auf dem Meeresgrund einzusperren"
          ),
        },
      ],
      hint: T(
        "Think of how Persian domes, Indian stone carving, and Central Asian music merged together.",
        "Denke daran, wie persische Kuppeln, indische Steinmetzkunst und Musik verschmolzen."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Assemble all four scholars at the council table and select 'Listen & Learn Together' to reach full harmony.",
        "Versammle alle vier Gelehrten am Tisch und waehle 'Zuhoeren & Miteinander lernen' fuer volle Harmonie."
      ),
      Widget: Widget,
      hint: T(
        "Click to invite all four scholars and ensure the listening mode is active, then tap check.",
        "Klicke, um alle vier Gelehrten einzuladen, aktiviere den Zuhoer-Modus und tippe auf pruefen."
      ),
    },
  ],
  askDad: T(
    "Papa, how did leaders like Akbar learn to bring people of different beliefs together peacefully?",
    "Papa, wie haben Herrscher wie Akbar gelernt, Menschen mit verschiedenen Ansichten friedlich zu vereinen?"
  ),
  realLife: {
    title: T("Mughal Art in German Museums", "Mogul-Kunst in deutschen Museen"),
    body: T(
      "Museums in Berlin and Munich preserve magnificent Mughal miniature paintings, hand-knotted floral carpets, and bronze astrolabes. The Museum of Islamic Art in Berlin's Pergamon Museum showcases how international trade routes connected German merchants with Mughal textile weavers in the 17th century.",
      "Museen in Berlin und Muenchen bewahren wunderschoene Mogul-Miniaturgemaelde, handgeknoepfte Teppiche und Astrolabien auf. Das Museum fuer Islamische Kunst in Berlin zeigt, wie Handelsrouten im 17. Jahrhundert deutsche Kaufleute mit Mogul-Baumwollwebern verbanden."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The Mughal Empire governed over one hundred million people across South Asia at its height in the seventeenth century.",
        source: "https://www.britannica.com/summary/Mughal-Dynasty",
      },
      {
        text: "Emperor Akbar established the Ibadat Khana at Fatehpur Sikri in 1575 for philosophical and interfaith discussions.",
        source: "https://www.britannica.com/biography/Akbar",
      },
      {
        text: "Mughal South Asia produced approximately twenty-four percent of global manufacturing output prior to European colonization.",
        source: "https://www.cambridge.org/core/books/cambridge-economic-history-of-india/mughal-economy/1C3C62F5290D5EEF565158A55BBE0E78",
      },
      {
        text: "The Grand Trunk Road was upgraded with regular caravan serais, mile markers, and security patrols connecting Bengal to Kabul.",
        source: "https://whc.unesco.org/en/tentativelists/5492/",
      },
      {
        text: "Mughal architecture synthesized Persian geometric domes with traditional Indian sandstone masonry and lotus carvings.",
        source: "https://whc.unesco.org/en/list/252/",
      },
    ],
    simplified: [
      "We focus on administration, dialogue, and public infrastructure rather than military campaigns.",
      "We explain Akbar council table as a model for how diverse communities solve problems peacefully.",
      "We highlight shared craftsmanship, astronomy, and trade connecting continents.",
    ],
  },
};
