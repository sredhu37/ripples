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

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

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
          "Im sechzehnten Jahrhundert errichtete die Mogul-Dynastie ein grosses, bluehendes Reich in Suedasien.",
          "W szesnastym wieku dynastia Mogołów zbudowała rozległe i kwitnące państwo w Azji Południowej.",
        ),
        T(
          "It united mountains, fertile river valleys, and coastal ports into one grand *empire*.",
          "Es vereinte Gebirge, fruchtbare Flusstaeler und Kuestenhaefen zu einem grossen *Grossreich*.",
          "Połączyło góry, żyzne doliny rzeczne i porty morskie w jedno potężne *imperium*.",
        ),
        T(
          "Artisans carved red sandstone palaces and wove the finest cotton textiles in the world.",
          "Handwerker meisselten Palaeste aus rotem Sandstein und woben die feinsten Baumwollstoffe der Welt.",
          "Rzemieślnicy wznosili pałace z czerwonego piaskowca i tkali najdelikatniejsze tkaniny bawełniane na świecie.",
        ),
        T(
          "Yet the greatest challenge was bringing peace to a land of many diverse cultures.",
          "Doch die groesste Aufgabe bestand darin, vielen unterschiedlichen Kulturen Frieden zu schenken.",
          "Jednak największym wyzwaniem było zapewnienie pokoju i jedności w kraju wielu różnorodnych kultur.",
        ),
      ],
      MughalPavilionDiagram,
    ),
    animatedBeat(
      [
        T(
          "Emperor Akbar realized that no realm could thrive through force or military conquest alone.",
          "Kaiser Akbar erkannte, dass kein Reich allein durch militaerische Gewalt bluehen kann.",
          "Cesarz Akbar zrozumiał, że żadne państwo nie może trwale rozkwitać wyłącznie dzięki sile oręża.",
        ),
        T(
          "He understood that lasting stability required wise laws, fair taxation, and honest governance.",
          "Er verstand: Dauerhafte Stabilitaet braucht gerechte Gesetze, faire Steuern und kluge Verwaltung.",
          "Wiedział, że trwały spokój wymaga mądrych praw, sprawiedliwych podatków i uczciwej administracji.",
        ),
        T(
          "Akbar abolished special taxes on pilgrims and welcomed capable advisors from every background.",
          "Akbar schaffte Sondersteuern fuer Pilger ab und begruesste faehige Berater aller Herkuenfte.",
          "Akbar zniósł obciążające podatki od pielgrzymów i zaprosił do rady zdolnych doradców każdego pochodzenia.",
        ),
        T(
          "He believed that truth is like a bright diamond with many shining facets.",
          "Er glaubte daran, dass die Wahrheit wie ein funkelnder Diamant mit vielen Facetten ist.",
          "Wierzył, że prawda jest jak lśniący diament posiadający wiele promiennych ścianek.",
        ),
      ],
      AkbarThroneDiagram,
    ),
    animatedBeat(
      [
        T(
          "In the royal city of Fatehpur Sikri, Akbar constructed the *Ibadat Khana*, the House of Wisdom.",
          "In der Residenzstadt Fatehpur Sikri baute Akbar das *Ibadat Khana*, das Haus der Weisheit.",
          "W stolicy Fatehpur Sikri Akbar wzniósł *Ibadat Chana*, czyli Dom Mądrości.",
        ),
        T(
          "He invited scholars of Hinduism, Islam, Christianity, Jainism, and Zoroastrianism to meet.",
          "Er lud Gelehrte des Hinduismus, Islam, Christentums, Jainismus und Zoroastrismus ein.",
          "Zaprosił mędrców hinduizmu, islamu, chrześcijaństwa, dżinizmu i zaratusztrianizmu na wspólne spotkania.",
        ),
        T(
          "Every Thursday night, they gathered around the council table to discuss justice and ethics.",
          "Jeden Donnerstagabend versammelten sie sich am Beratungstisch, um ueber Gerechtigkeit und Ethik zu sprechen.",
          "W każdy czwartkowy wieczór zasiadali przy okrągłym stole rady, by rozmawiać o sprawiedliwości i etyce.",
        ),
        T(
          "This practice of *tolerance* allowed people of differing faiths to live together in mutual respect.",
          "Diese gelebte *Toleranz* ermoeglichte es Menschen unterschiedlichen Glaubens, in gegenseitigem Respekt zu leben.",
          "Ta praktyka *tolerancji* pozwalała ludziom różnych wyznań i tradycji żyć obok siebie w szacunku.",
        ),
      ],
      IbadatKhanaDiagram,
    ),
    animatedBeat(
      [
        T(
          "Across the empire, builders paved the Grand Trunk Road, stretching thousands of kilometers.",
          "Quer durch das Reich wurde die Grand Trunk Road ausgebaut, die tausende Kilometer umspannte.",
          "W poprzek całego imperium rozbudowano trakt Grand Trunk Road, ciągnący się tysiące kilometrów.",
        ),
        T(
          "Shaded rest stops, freshwater wells, and horse messengers connected distant trading hubs.",
          "Schattige Rasthaeuser, Brunnen und berittene Boten verbanden weit entfernte Handelsplaetze.",
          "Zacienione karawanseraje, studnie ze słodką wodą i konni posłańcy połączyli odległe targowiska.",
        ),
        T(
          "Merchants carried spices, tea, indigo, and silk safely without fear of highway bandits.",
          "Kaufleute transportierten Gewuerze, Tee, Indigo und Seide sicher und ohne Furcht vor Raeubern.",
          "Kupcy przewozili przyprawy, herbatę, indygo i jedwab bez lęku przed rozbójnikami na traktach.",
        ),
        T(
          "South Asia produced nearly a quarter of all goods manufactured on Earth.",
          "Suedasien stellte damals fast ein Viertel aller auf der Erde gefertigten Gueter her.",
          "Ówczesna Azja Południowa wytwarzała blisko jedną czwartą wszystkich dóbr produkowanych na Ziemi.",
        ),
      ],
      GrandTrunkRoadDiagram,
    ),
    animatedBeat(
      [
        T(
          "This great era created a lasting cultural *synthesis* between Persian, Indian, and Central Asian ideas.",
          "Diese Aera schuf eine dauerhafte kulturelle *Verschmelzung* persischer, indischer und asiatischer Ideen.",
          "Ta epoka przyniosła trwałą kulturową *syntezę* tradycji perskich, indyjskich i środkowoazjatyckich.",
        ),
        T(
          "It blossomed in breathtaking wonders like the Taj Mahal and royal astronomical observatories.",
          "Sie bluehte in atemberaubenden Wunderwerken wie dem Taj Mahal und Sternwarten auf.",
          "Zaowocowała cudami architektury, takimi jak Tadź Mahal czy królewskie obserwatoria astronomiczne.",
        ),
        T(
          "Poets, musicians, and painters exchanged styles, creating new musical ragas and miniature paintings.",
          "Dichter, Musiker und Maler tauschten Stile aus und schufen neue Ragas und Miniaturgemaelde.",
          "Poeci, muzycy i malarze wymieniali się doświadczeniami, tworząc nowe melodie i subtelne miniatury.",
        ),
        T(
          "History teaches us that societies flourish when they open their doors and listen to one another.",
          "Die Geschichte lehrt uns: Gesellschaften bluehen auf, wenn sie ihre Tueren oeffnen und einander zuhoeren.",
          "Historia uczy nas, że społeczeństwa rozkwitają, gdy otwierają drzwi i z uwagą słuchają się nawzajem.",
        ),
      ],
      CulturalSynthesisDiagram,
    ),
  ],
  toyIntro: T(
    "Invite scholars of philosophy, astronomy, farming, and trade to the council table to build harmony.",
    "Lade Gelehrte fuer Philosophie, Astronomie, Landbau und Handel an den Tisch ein, um Harmonie zu stiften.",
    "Zaproś mędrców filozofii, astronomii, rolnictwa i handlu do stołu rady, by zbudować imperialną harmonię.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why did Emperor Akbar build the Ibadat Khana council table?",
        "Warum baute Kaiser Akbar den Beratungstisch im Ibadat Khana?",
        "Dlaczego cesarz Akbar zbudował stół obrad w Domu Mądrości (Ibadat Chana)?",
      ),
      options: [
        {
          text: T(
            "To invite scholars of diverse traditions to discuss ethics, justice, and shared wisdom",
            "Um Gelehrte verschiedener Traditionen einzuladen und ueber Ethik, Recht und Weisheit zu sprechen",
            "Aby zaprosić myślicieli różnych kultur do rozmowy o etyce, sprawiedliwości i wspólnej mądrości",
          ),
          correct: true,
        },
        {
          text: T(
            "To challenge neighboring kings to arm-wrestling contests",
            "Um Nachbarkoenige zum Armdruecken herauszufordern",
            "Aby wyzywać sąsiednich władców na pojedynki w siłowaniu na rękę",
          ),
        },
        {
          text: T(
            "To count how many gold coins could fit into a teapot",
            "Um zu zaehlen, wie viele Goldmuenzen in eine Teekanne passen",
            "Aby sprawdzić, ile złotych monet zmieści się w glinianym dzbanku do herbaty",
          ),
        },
      ],
      hint: T(
        "Akbar sought truth and understanding across different philosophies and traditions.",
        "Akbar suchte nach Wahrheit und Verstaendnis zwischen verschiedenen Traditionen.",
        "Akbar poszukiwał prawdy i wzajemnego zrozumienia ponad granicami wyznań i kultur.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What does the term 'cultural synthesis' mean?",
        "Was bedeutet der Begriff 'kulturelle Verschmelzung'?",
        "Co oznacza pojęcie 'synteza kulturowa'?",
      ),
      options: [
        {
          text: T(
            "Blending ideas, architecture, and traditions from different cultures into something new and beautiful",
            "Das Verbinden von Ideen, Bauwerken und Braeuche verschiedener Kulturen zu etwas Neuem und Schoenem",
            "Łączenie idei, architektury i tradycji z różnych kultur w nową i piękną całość",
          ),
          correct: true,
        },
        {
          text: T(
            "Forcing everyone to wear the exact same grey hat every day",
            "Jeden Menschen zu zwingen, taeglich den gleichen grauen Hut zu tragen",
            "Zmuszanie wszystkich mieszkańców do noszenia identycznej szarej czapki",
          ),
        },
        {
          text: T(
            "Locking all library books in an iron chest at the bottom of the ocean",
            "Alle Buecher der Bibliothek in einer Eisenkiste auf dem Meeresgrund einzusperren",
            "Zamykanie wszystkich książek w żelaznej skrzyni na dnie oceanu",
          ),
        },
      ],
      hint: T(
        "Think of how Persian domes, Indian stone carving, and Central Asian music merged together.",
        "Denke daran, wie persische Kuppeln, indische Steinmetzkunst und Musik verschmolzen.",
        "Przypomnij sobie, jak perskie kopuły, indyjska rzeźba w piaskowcu i melodie stworzyły nową sztukę.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Assemble all four scholars at the council table and select 'Listen & Learn Together' to reach full harmony.",
        "Versammle alle vier Gelehrten am Tisch und waehle 'Zuhoeren & Miteinander lernen' fuer volle Harmonie.",
        "Zbierz wszystkich czterech mędrców przy stole i wybierz 'Słuchaj i ucz się wspólnie', aby osiągnąć pełną harmonię.",
      ),
      Widget,
      hint: T(
        "Click to invite all four scholars and ensure the listening mode is active, then tap check.",
        "Klicke, um alle vier Gelehrten einzuladen, aktiviere den Zuhoer-Modus und tippe auf pruefen.",
        "Kliknij, aby zaprosić czterech mędrców, upewnij się, że tryb uważnego słuchania jest włączony i kliknij sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, how did leaders like Akbar learn to bring people of different beliefs together peacefully?",
    "Papa, wie haben Herrscher wie Akbar gelernt, Menschen mit verschiedenen Ansichten friedlich zu vereinen?",
    "Tato, jak dawni władcy potrafili łączyć ludzi o zupełnie odmiennych poglądach i wyznaniach?",
  ),
  realLife: {
    title: {
      en: "The Architectural and Trade Legacy of the Mughals",
      de: "Mogul-Kunst in deutschen Museen",
      pl: "Sztuka i dyplomacja Mogołów w zbiorach polskich",
    },
    body: {
      en: "The Mughal era left monuments like the Taj Mahal in Agra, the Red Fort in Delhi, and Fatehpur Sikri. It also made India the epicenter of pre-industrial global trade, producing fine calico cotton and silk fabrics sought by European and Asian merchants across maritime and overland routes.",
      de: "Museen in Berlin und Muenchen bewahren wunderschoene Mogul-Miniaturgemaelde, handgeknoepfte Teppiche und Astrolabien auf. Das Museum fuer Islamische Kunst in Berlin zeigt, wie Handelsrouten im 17. Jahrhundert deutsche Kaufleute mit Mogul-Baumwollwebern verbanden.",
      pl: "Kunsztowne dzieła rzemiosła, dywany oraz jedwabie z epoki Mogołów docierały do dawnej Rzeczypospolitej szlakami handlowymi przez Persję i Imperium Osmańskie. W zbiorach Muzeum Narodowego w Warszawie i Krakowie (Muzeum Książąt Czartoryskich) zachowały się wspaniałe orientalne tkaniny, pasy jedwabne oraz szable z damasceńskiej stali wysadzane klejnotami, które polska szlachta ceniła jako symbol wykwintnego gustu.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "The Mughal Empire governed over one hundred million people across South Asia at its height in the seventeenth century.",
          de: "Das Mogulreich regierte auf seinem Hoehepunkt im 17. Jahrhundert ueber hundert Millionen Menschen in Suedasien.",
          pl: "Imperium Mogołów u szczytu swojego rozwoju w XVII wieku obejmowało ponad sto milionów mieszkańców na subkontynencie indyjskim.",
        },
        source: "https://www.britannica.com/summary/Mughal-Dynasty",
      },
      {
        text: {
          en: "Emperor Akbar established the Ibadat Khana at Fatehpur Sikri in 1575 for philosophical and interfaith discussions.",
          de: "Kaiser Akbar gruendete 1575 das Ibadat Khana in Fatehpur Sikri fuer philosophische und religioese Gespraeche.",
          pl: "Cesarz Akbar wzniósł w 1575 r. w Fatehpur Sikri Dom Mądrości (Ibadat Chana), gdzie mędrcy różnych tradycji prowadzili otwarte dysputy filozoficzne.",
        },
        source: "https://www.britannica.com/biography/Akbar",
      },
      {
        text: {
          en: "Mughal South Asia produced approximately twenty-four percent of global manufacturing output prior to European colonization.",
          de: "Das Mogul-Reich erwirtschaftete vor der Kolonialisierung rund 24 Prozent der weltweiten Produktion.",
          pl: "Według badań historyków gospodarczych Indie w epoce Mogołów wytwarzały blisko 24 procent światowej produkcji manufakturowej, głównie tkanin bawełnianych.",
        },
        source: "https://www.cambridge.org/core/books/cambridge-economic-history-of-india/mughal-economy/1C3C62F5290D5EEF565158A55BBE0E78",
      },
      {
        text: {
          en: "The Grand Trunk Road was upgraded with regular caravan serais, mile markers, and security patrols connecting Bengal to Kabul.",
          de: "Die Grand Trunk Road wurde mit Rasthaeusern, Meilensteinen und Wachposten von Bengalen bis Kabul ausgebaut.",
          pl: "Trakt Grand Trunk Road wyposażono w gęstą sieć karawanserajów, studni, słupów milowych i strażnic, łącząc Bengal z Kabulem.",
        },
        source: "https://whc.unesco.org/en/tentativelists/5492/",
      },
      {
        text: {
          en: "Mughal architecture synthesized Persian geometric domes with traditional Indian sandstone masonry and lotus carvings.",
          de: "Die Mogul-Architektur verband persische Kuppelformen mit indischer Sandstein-Baukunst und Lotusmotiven.",
          pl: "Architektura Mogołów połączyła perskie motywy kopuł i łuków z indyjską tradycją rzeźby w piaskowcu i marmurze, czego szczytem stał się Tadź Mahal.",
        },
        source: "https://whc.unesco.org/en/list/252/",
      },
    ],
    simplified: [
      {
        en: "We focus on administration, dialogue, and public infrastructure rather than military campaigns.",
        de: "Wir betonen Verwaltung, Dialog und Infrastruktur statt militaerischer Feldzuege.",
        pl: "Skupiamy się na administracji, dialogu mędrców i drogach handlowych, a nie na wojnach.",
      },
      {
        en: "We explain Akbar's council table as a model for how diverse communities solve problems peacefully.",
        de: "Wir zeigen Akbars Beratungstisch als Vorbild fuer friedliche Verstaendigung verschiedener Gemeinschaften.",
        pl: "Przedstawiamy stół rady Akbara jako przykład pokojowego rozwiązywania sporów w zróżnicowanym społeczeństwie.",
      },
      {
        en: "We highlight shared craftsmanship, astronomy, and trade connecting continents.",
        de: "Wir heben gemeinsames Handwerk, Astronomie und den weltweiten Handel hervor.",
        pl: "Podkreślamy rolę rzemiosła, nauki i handlu łączącego różne części świata.",
      },
    ],
  },
};
