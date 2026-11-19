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

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <WhyHistoryToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <WhyHistoryToy lang={lang} mode="quiz" onDone={() => onAnswer(true)} />;
}

export const lesson: Lesson = {
  id: "whyhistory",
  story: [
    animatedBeat(
      [
        T(
          "Why do we spend time learning about events that happened decades, centuries, or millennia ago?",
          "Warum beschaeftigen wir uns mit Ereignissen, die Jahrzehnte, Jahrhunderte oder Jahrtausende zurueckliegen?",
          "Dlaczego poświęcamy czas na poznawanie wydarzeń, które miały miejsce dziesiątki, setki lub tysiące lat temu?",
        ),
        T(
          "Because every bridge, law, book, and freedom we enjoy today was built by the generations before us.",
          "Weil jede Bruecke, jedes Gesetz und jede Freiheit von frueheren Generationen geschaffen wurde.",
          "Ponieważ każdy most, każde prawo, książka i wolność, z których dziś korzystamy, zostały zbudowane przez pokolenia przed nami.",
        ),
        T(
          "History is not a dusty list of dry dates and dead kings to memorize for an exam.",
          "Geschichte ist keine verstaubte Liste aus trockenen Jahreszahlen fuer eine Pruefung.",
          "Historia nie jest zakurzoną listą suchych dat i dawnych królów do zapamiętania na sprawdzian.",
        ),
        T(
          "It is the living, breathing human story of how our modern world came to be.",
          "Sie ist die lebendige Erzaehlung darueber, wie unsere heutige Welt entstanden ist.",
          "To żywa opowieść o ludziach, ich wyborach i drogach, które ukształtowały nasz dzisiejszy świat.",
        ),
      ],
      MagnifyingGlassArchiveDiagram,
    ),
    animatedBeat(
      [
        T(
          "When historians investigate the past, they search for genuine *primary sources*.",
          "Wenn Historiker die Vergangenheit erforschen, suchen sie nach echten *Primaerquellen*.",
          "Gdy historycy badają przeszłość, poszukują autentycznych *źródeł pierwotnych*.",
        ),
        T(
          "A primary source is direct evidence created at the time: handwritten diaries, stone seals, letters, and tools.",
          "Eine Primaerquelle ist ein direktes Zeugnis aus der Zeit: Tagebuecher, Urkunden, Briefe und Werkzeuge.",
          "Źródło pierwotne to bezpośrednie świadectwo z epoki: ręcznie pisane pamiętniki, pieczęcie, listy i narzędzia.",
        ),
        T(
          "Historians compare different eyewitness accounts to separate verified facts from exaggeration or bias.",
          "Sie vergleichen Augenzeugenberichte, um echte Fakten von Uebertreibung und Vorurteilen zu trennen.",
          "Badacze porównują relacje naocznych świadków, by odróżnić sprawdzone fakty od uprzedzeń i mitów.",
        ),
        T(
          "Just like detectives, they follow the evidence wherever the honest truth leads.",
          "Wie Detektive folgen Historiker den Beweisen dorthin, wo die ehrliche Wahrheit liegt.",
          "Niczym detektywi podążają za dowodami tam, gdzie prowadzi prawda.",
        ),
      ],
      PrimarySourcesTapestryDiagram,
    ),
    animatedBeat(
      [
        T(
          "In Germany and across Europe, communities practice *Erinnerungskultur* (memorial culture).",
          "In Deutschland und ganz Europa pflegen Menschen eine lebendige *Erinnerungskultur*.",
          "W Polsce i w całej Europie społeczeństwa pielęgnują *kulturę pamięci* (Erinnerungskultur).",
        ),
        T(
          "This means confronting both glorious achievements and painful mistakes with total honesty.",
          "Das bedeutet, sowohl Errungenschaften als auch schmerzhafte Fehler ehrlich anzuschauen.",
          "Oznacza to rzetelne i uczciwe spojrzenie zarówno na wielkie osiągnięcia, jak i na bolesne błędy.",
        ),
        T(
          "By remembering injustice, societies ensure they never repeat the dark choices of authoritarian pasts.",
          "Indem wir uns an Unrecht erinnern, stellen wir sicher, Fehler der Vergangenheit niemals zu wiederholen.",
          "Pamiętając o krzywdach i niesprawiedliwości, dbamy o to, by nigdy nie powtórzyć wyborów z czasów tyranii.",
        ),
        T(
          "True courage means learning from the past rather than hiding or pretending it did not happen.",
          "Wahrer Mut bedeutet, aus der Geschichte zu lernen, statt wegzuschauen oder sie zu verschweigen.",
          "Prawdziwa odwaga polega na wyciąganiu wniosków z przeszłości zamiast jej przemilczania.",
        ),
      ],
      MemorialStolpersteineDiagram,
    ),
    animatedBeat(
      [
        T(
          "History acts as our ultimate navigation compass for charting the uncharted waters ahead.",
          "Geschichte ist unser Kompass, um sichere Wege in die Zukunft zu finden.",
          "Historia służy nam jako niezawodny kompas pomagający odnaleźć drogę w nieznaną przyszłość.",
        ),
        T(
          "It shows us which paths led to flourishing cooperation, and which paths led to tragedy.",
          "Sie zeigt uns, welche Wege zu bluehendem Frieden und welche in die Sackgasse fuehrten.",
          "Ukazuje, które drogi prowadziły do rozkwitu i współpracy, a które do tragedii i upadku.",
        ),
        T(
          "When we understand why past institutions succeeded or failed, we make smarter decisions today.",
          "Wenn wir verstehen, warum Ideen funktionierten oder scheiterten, treffen wir heute kluegere Entscheidungen.",
          "Gdy rozumiemy, dlaczego dawne instytucje odnosiły sukcesy lub upadały, podejmujemy dziś mądrzejsze decyzje.",
        ),
        T(
          "History empowers every citizen with wisdom, perspective, and moral clarity.",
          "Geschichte schenkt jedem Buerger Weitsicht, Urteilskraft und Klarheit.",
          "Znajomość historii obdarza każdego obywatela mądrością, szerszą perspektywą i jasnością moralną.",
        ),
      ],
      CompassFutureCompassDiagram,
    ),
    animatedBeat(
      [
        T(
          "Now, the torch of human history passes into your capable, curious hands.",
          "Nun wird die Fackel der Menschheitsgeschichte an dich weitergereicht.",
          "Teraz pochodnia ludzkiej historii trafia w Twoje dociekliwe, pełne energii ręce.",
        ),
        T(
          "Every kind word you speak, fair rule you respect, and idea you build ripples forward in time.",
          "Jedes freundliche Wort, jede faire Regel und jede gute Idee schlaegt Wellen in die Zukunft.",
          "Każde dobre słowo, sprawiedliwa zasada, którą szanujesz, i pomysł, który tworzysz, zataczają fale w przyszłość.",
        ),
        T(
          "You are not just a spectator watching history; you are actively writing the next page.",
          "Du bist nicht nur Zuschauer der Geschichte; du schreibst aktiv das naechste Kapitel.",
          "Nie jesteś tylko widzem obserwującym przeszłość; piszesz kolejną stronę historii świata.",
        ),
        T(
          "Let us build an open, thoughtful, and compassionate tomorrow for everyone on Earth!",
          "Lasst uns eine offene, kluge und friedliche Zukunft fuer alle Menschen gestalten!",
          "Zbudujmy otwarte, mądre i pełne życzliwości jutro dla wszystkich ludzi na Ziemi!",
        ),
      ],
      InterlockingGenerationsDiagram,
    ),
  ],
  toyIntro: T(
    "Connect each historical artifact in the archive with its enduring lesson for humanity.",
    "Verknuepfe jedes Fundstueck im Archiv mit seiner bleibenden Bedeutung fuer die Menschheit.",
    "Połącz każde znalezisko w archiwum z jego trwałą lekcją dla ludzkości.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is a primary source in historical research?",
        "Was versteht man unter einer Primaerquelle in der Geschichtswissenschaft?",
        "Czym jest źródło pierwotne w badaniach historycznych?",
      ),
      options: [
        {
          text: T(
            "Direct evidence created at the time, such as diaries, handwritten letters, treaties, or tools",
            "Ein direktes Zeugnis aus der Zeit, wie Tagebuecher, Briefe, Vertraege oder Werkzeuge",
            "Bezpośrednim świadectwem powstałym w epoce, jak pamiętniki, listy, traktaty czy narzędzia",
          ),
          correct: true,
        },
        {
          text: T(
            "A magic crystal ball that plays cartoon music when placed in warm milk",
            "Eine Kristallkugel, die Musik abspielt, wenn man sie in warme Milch legt",
            "Kryształową kulą wygrywającą melodie z kreskówek po włożeniu do ciepłego mleka",
          ),
        },
        {
          text: T(
            "A comic book written yesterday about dragons dancing in sixteenth-century castles",
            "Ein Comic von gestern ueber tanzende Drachen in Schloessern",
            "Komiksem napisanym wczoraj o smokach tańczących w szesnastowiecznych zamkach",
          ),
        },
      ],
      hint: T(
        "Primary sources are genuine physical artifacts and written documents from the period.",
        "Primaerquellen stammen unmittelbar aus der Zeit, die erforscht wird.",
        "Źródła pierwotne to autentyczne przedmioty i dokumenty powstałe bezpośrednio w badanych czasach.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why do societies practice memorial culture (Erinnerungskultur)?",
        "Warum pflegen Gesellschaften eine lebendige Erinnerungskultur?",
        "Dlaczego społeczeństwa pielęgnują kulturę pamięci (Erinnerungskultur)?",
      ),
      options: [
        {
          text: T(
            "To learn honestly from past mistakes, protect human dignity, and defend democratic freedoms",
            "Um aus Fehlern zu lernen, die Menschenwuerde zu schuetzen und die Freiheit zu verteidigen",
            "Aby rzetelnie uczyć się na błędach, chronić ludzką godność i bronić wolności demokratycznych",
          ),
          correct: true,
        },
        {
          text: T(
            "To test how many museum postcards can fit inside an empty cereal box",
            "Um auszuprobieren, wie viele Museumskarten in eine Mueslischachtel passen",
            "Aby sprawdzić, ile pocztówek z muzeum zmieści się w pustym pudełku po płatkach",
          ),
        },
        {
          text: T(
            "To forbid all students from ever eating strawberry ice cream after school",
            "Um allen Schuelern zu verbieten, jemals wieder Erdbeereis zu essen",
            "Aby zabronić uczniom jedzenia lodów truskawkowych po lekcjach",
          ),
        },
      ],
      hint: T(
        "Remembering the past with honesty is essential for safeguarding democracy.",
        "Ehrliches Erinnern ist die beste Verteidigung unserer Demokratie.",
        "Uczciwa pamięć o przeszłości stanowi najlepszą tarczę ochronną dla demokracji.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Match all 4 historical artifacts in the archive to their meaning to achieve 100% insight.",
        "Ordne alle 4 Fundstuecke im Archiv ihrer Bedeutung zu, um 100% Erkenntnis zu erreichen.",
        "Dopasuj wszystkie 4 obiekty w archiwum do ich znaczenia, aby osiągnąć 100% wiedzy.",
      ),
      Widget,
      hint: T(
        "Select Cultural Dialogue for Astrolabe, Self-Reliance for Yarn, Diplomacy for Treaty, and Reconciliation for Steel Beam.",
        "Waehle Kulturaustausch fuers Astrolabium, Selbstbestimmung fuer Garn, Diplomatie fuer Vertrag und Versoehnung fuer Stahl.",
        "Wybierz Dialog kulturowy dla Astrolabium, Samowystarczalność dla Przędzy, Dyplomację dla Traktatu i Pojednanie dla Dźwigara.",
      ),
    },
  ],
  askDad: T(
    "Papa, what is one historical lesson or family story that has guided your decisions in life?",
    "Papa, welche historische Lektion oder Familiengeschichte hat dich in deinem Leben besonders gepraegt?",
    "Tato, jaka lekcja z historii lub opowieść rodzinna była dla Ciebie najważniejszym drogowskazem w życiu?",
  ),
  realLife: {
    title: {
      en: "Archives and History Workshops",
      de: "Archive und Geschichtswerkstaetten",
      pl: "Archiwa państwowe i pracownie historyczne",
    },
    body: {
      en: "Almost every town in Germany has a municipal archive (Stadtarchiv) where original birth registers, maps, building plans, and council minutes going back centuries are preserved in climate-controlled vaults. Citizen historians and students can visit to examine original primary sources for their own school projects, discovering how world events shaped their own neighborhood.",
      de: "Fast jede Stadt in Deutschland besitzt ein Stadtarchiv, in dem Originalurkunden, Karten und Ratsprotokolle aus vielen Jahrhunderten sicher aufbewahrt werden. Schueler und Buerger koennen dort historische Originalquellen einsehen und erforschen, wie die Weltgeschichte ihre eigene Nachbarschaft gepraegt hat.",
      pl: "Niemal w każdym mieście w Polsce działa archiwum państwowe lub biblioteka z działem starodruków, gdzie przechowuje się oryginalne księgi metrykalne, mapy, plany architektoniczne i kroniki miejskie sprzed wieków. Każdy uczeń i mieszkaniec może bezpłatnie przeglądać zdigitalizowane źródła w serwisie szukajwarchiwach.gov.pl lub odwiedzić czytelnię, by badać historię własnej rodziny i miejscowości.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "The discipline of modern historical methodology is rooted in the systematic analysis and critical cross-referencing of primary sources.",
          de: "Die Methodik der modernen Geschichtswissenschaft beruht auf der systematischen und kritischen Auswertung von Primaerquellen.",
          pl: "Metodologia współczesnej historiografii opiera się na krytycznej analizie, weryfikacji i porównywaniu źródeł pierwotnych.",
        },
        source:
          "https://www.historians.org/about-aha-and-membership/aha-history-and-archives/historical-thinking-skills",
      },
      {
        text: {
          en: "The concept of Erinnerungskultur (culture of remembrance) is central to post-war German civic education and democratic political culture.",
          de: "Das Konzept der Erinnerungskultur ist zentraler Bestandteil der demokratischen Bildung und politischen Kultur im Nachkriegsdeutschland.",
          pl: "Pojęcie kultury pamięci (Erinnerungskultur) stanowi fundament nowoczesnej edukacji obywatelskiej i dojrzałej kultury demokratycznej.",
        },
        source: "https://www.bpb.de/themen/erinnerung/",
      },
      {
        text: {
          en: "The UNESCO Recommendation concerning the Protection and Promotion of Museums and Collections underscores museums as places of civic dialogue.",
          de: "Die UNESCO-Empfehlung zum Schutz von Museen und Sammlungen wuerdigt Museen als Raeume des buergerlichen Dialogs.",
          pl: "Zalecenie UNESCO dotyczące ochrony i promocji muzeów i kolekcji (2015) podkreśla ich rolę jako przestrzeni dialogu społecznego i edukacji.",
        },
        source: "https://unesdoc.unesco.org/ark:/48223/pf0000246331",
      },
      {
        text: {
          en: "The International Council on Archives (ICA) promotes the preservation and accessible use of documentary heritage worldwide.",
          de: "Der Internationale Archivrat (ICA) foerdert weltweit den Erhalt und die zugaengliche Nutzung des schriftlichen Kulturerbes.",
          pl: "Międzynarodowa Rada Archiwów (ICA) oraz Archiwa Państwowe w Polsce dbają o zachowanie i powszechną dostępność dziedzictwa dokumentacyjnego.",
        },
        source: "https://www.ica.org/en/about-archives",
      },
      {
        text: {
          en: "The Universal Declaration on Cultural Diversity (UNESCO 2001) affirms intercultural heritage as essential for human flourishing.",
          de: "Die Allgemeine Erklaerung zur kulturellen Vielfalt (UNESCO 2001) betont das interkulturelle Erbe fuer das friedliche Zusammenleben.",
          pl: "Powszechna Deklaracja o Różnorodności Kulturowej (UNESCO 2001) uznaje dziedzictwo międzykulturowe za warunek pomyślnego rozwoju ludzkości.",
        },
        source:
          "https://www.unesco.org/en/legal-affairs/unesco-universal-declaration-cultural-diversity",
      },
    ],
    simplified: [
      {
        en: "We explain the nature of primary sources using relatable everyday examples like letters and tools.",
        de: "Wir erklaeren das Wesen von Primaerquellen an alltaeglichen Beispielen wie Briefen und Werkzeugen.",
        pl: "Tłumaczymy istotę źródeł pierwotnych na prostych przykładach z życia, takich jak listy i narzędzia.",
      },
      {
        en: "We teach that history is a dynamic method of detective inquiry rather than passive memorization.",
        de: "Wir vermitteln Geschichte als detektivische Forschungsmethode statt als Auswendiglernen von Jahreszahlen.",
        pl: "Uczymy, że historia to fascynujące śledztwo detektywistyczne, a nie nudne wkuwanie dat na pamięć.",
      },
      {
        en: "We show that honest remembrance builds an ethical foundation for democratic responsibility.",
        de: "Wir zeigen, dass aufrichtiges Erinnern das ethische Fundament fuer demokratische Verantwortung legt.",
        pl: "Pokazujemy, że rzetelna pamięć o przeszłości stanowi etyczny fundament odpowiedzialności obywatelskiej.",
      },
    ],
  },
};
