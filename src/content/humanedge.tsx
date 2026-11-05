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

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

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
          "Vom Faustkeil aus Feuerstein ueber Dampfmaschinen bis zum Mikrochip waren Menschen immer Erfinder.",
          "Od krzemiennych pięściaków przez maszyny parowe aż po mikrochipy, ludzie od zawsze byli twórcami narzędzi.",
        ),
        T(
          "Every generation invents new technology to protect families, explore nature, and cure diseases.",
          "Jede Generation baut neue Technik, um Familien zu schuetzen, die Natur zu erforschen und Not zu lindern.",
          "Każde pokolenie tworzy nowe technologie, by chronić rodziny, badać przyrodę i leczyć choroby.",
        ),
        T(
          "Now, powerful computer networks and artificial intelligence stand alongside us as our newest tools.",
          "Heute stehen uns weltweite Rechnernetze und kuenstliche Intelligenz als neueste Helfer zur Seite.",
          "Dziś obok nas stają potężne sieci komputerowe i sztuczna inteligencja jako nasze najnowsze narzędzia.",
        ),
      ],
      TimelineStoneToAiDiagram,
    ),
    animatedBeat(
      [
        T(
          "Computers can calculate billions of numbers every second without ever tiring or needing a break.",
          "Computer koennen Milliarden Zahlen in einer Sekunde berechnen, ohne je muede zu werden.",
          "Komputery potrafią przeliczać miliardy liczb w każdej sekundzie, nigdy się nie męcząc ani nie potrzebując przerwy.",
        ),
        T(
          "They remember entire encyclopedias and spot tiny mathematical patterns across vast oceans of data.",
          "Sie speichern ganze Bibliotheken und finden kleinste statistische Muster in riesigen Datenmengen.",
          "Pamiętają całe biblioteki i odnajdują subtelne wzorce statystyczne w bezkresnych oceanach danych.",
        ),
        T(
          "Yet raw computational speed alone cannot decide what is fair, good, or meaningful for human life.",
          "Doch blosse Rechengeschwindigkeit allein kann nicht entscheiden, was gerecht oder gut fuer Menschen ist.",
          "Jednak czysta szybkość obliczeń nie potrafi sama zdecydować, co jest sprawiedliwe, dobre i wartościowe dla ludzkiego życia.",
        ),
      ],
      MachineSpeedComparisonDiagram,
    ),
    animatedBeat(
      [
        T(
          "A computer algorithm cannot shed a tear of joy, feel remorse, or love another living being.",
          "Ein Computeralgorithmus kann weder Freudentraenen weinen, noch Reue empfinden oder jemanden lieben.",
          "Algorytm komputerowy nie uroni łzy radości, nie odczuje skruchy ani nie pokocha drugiej żywej istoty.",
        ),
        T(
          "It cannot wrap a warm blanket around a shivering child or understand the bittersweet sadness of goodbye.",
          "Er kann kein frierendes Kind troestend in den Arm nehmen oder den Abschiedsschmerz verstehen.",
          "Nie potrafi otulić ciepłym kocem marznącego dziecka ani zrozumieć słodko-gorzkiego smutku pożegnania.",
        ),
        T(
          "Genuine warmth, conscience, and shared feeling remain the sacred heart of the human spirit.",
          "Echte Herzenswaerme, Gewissen und Mitgefuehl bleiben der lebendige Kern des Menschseins.",
          "Prawdziwe ciepło serca, sumienie i współodczuwanie pozostają nienaruszalnym jądrem ludzkiego ducha.",
        ),
      ],
      HeartEmpathyCompassionDiagram,
    ),
    animatedBeat(
      [
        T(
          "Human gifts like *empathy* and *creativity*, ethical courage, and joyful teamwork belong uniquely to us.",
          "Menschliche Gaben wie *Mitgefuehl* und *Kreativitaet*, ethischer Mut und Teamgeist gehoeren uns allein.",
          "Ludzkie dary, takie jak *empatia*, *kreatywność*, odwaga etyczna i radosna współpraca, należą wyłącznie do nas.",
        ),
        T(
          "We can imagine brand new worlds, write poetry that moves hearts, and forgive each other's mistakes.",
          "Wir koennen neue Welten erfinden, beruehrende Lieder dichten und einander Fehler verzeihen.",
          "Potrafimy wyobrażać sobie nowe światy, pisać wiersze poruszające serca i wybaczać sobie nawzajem błędy.",
        ),
        T(
          "When we sit down together to solve a community challenge, our shared imagination has no limit.",
          "Wenn wir uns gemeinsam an einen Tisch setzen, um Probleme zu loesen, kennt unsere Fantasie keine Grenze.",
          "Gdy siadamy razem, by rozwiązać problem naszej społeczności, nasza wspólna wyobraźnia nie ma granic.",
        ),
      ],
      CreativeTeamCollaborationDiagram,
    ),
    animatedBeat(
      [
        T(
          "Technology is our great multiplier, but our future must always be steered by *human values*.",
          "Technik ist unser grosser Verstaerker, doch unsere Zukunft muss immer von *menschliche Werte* gelenkt werden.",
          "Technologia jest potężnym wzmacniaczem, lecz nasza przyszłość musi być zawsze prowadzona przez *wartości ludzkie*.",
        ),
        T(
          "By pairing brilliant machinery with kindness, fairness, and care, we can lift up every person.",
          "Wenn wir kluge Maschinen mit Guete, Gerechtigkeit und Fuersorge verbinden, blueht die Menschheit auf.",
          "Łącząc genialne maszyny z dobrocią, sprawiedliwością i troską, możemy podnieść jakość życia każdego człowieka.",
        ),
        T(
          "The greatest adventure in human history is just beginning, and you are here to help guide it.",
          "Das groesste Abenteuer der Menschheit faengt gerade erst an, und du gestaltest es mit.",
          "Najwspanialsza przygoda w dziejach ludzkości dopiero się zaczyna, a Ty jesteś tutaj, by pomóc nadać jej mądry kierunek.",
        ),
      ],
      AmplifiedHumanValuesFutureDiagram,
    ),
  ],
  toyIntro: T(
    "Set technological capability and guide it with deep empathy and care to achieve over 90% flourishing.",
    "Waehle die Technikstufe und lenke sie mit Mitgefuehl und Ethik, um ueber 90% Wohlstand zu erreichen.",
    "Wybierz poziom technologii i poprowadź go głęboką empatią oraz troską, aby osiągnąć ponad 90% rozkwitu.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What essential qualities make human beings irreplaceable by computers and algorithms?",
        "Welche Eigenschaften machen uns Menschen fuer Computer und Algorithmen unersetzlich?",
        "Jakie kluczowe cechy czynią ludzi niezastąpionymi dla komputerów i algorytmów?",
      ),
      options: [
        {
          text: T(
            "Empathy, conscience, ethical judgment, artistic creativity, and warm human collaboration",
            "Mitgefuehl, Gewissen, ethische Urteilskraft, kuenstlerische Kreativitaet und Zuwendung",
            "Empatia, sumienie, osąd etyczny, twórczość artystyczna i serdeczna współpraca międzyludzka",
          ),
          correct: true,
        },
        {
          text: T(
            "The ability to sleep upside down on the ceiling like fruit bats",
            "Die Faehigkeit, wie eine Fledermaus kopfueber an der Zimmerdecke zu schlafen",
            "Zdolność do spania do góry nogami na suficie jak nietoperze owocożerne",
          ),
        },
        {
          text: T(
            "Having antennas that receive radio stations from outer space",
            "Kleine Antennen auf dem Kopf, die Radiosender aus dem Weltall empfangen",
            "Posiadanie anten na głowie odbierających stacje radiowe z kosmosu",
          ),
        },
      ],
      hint: T(
        "Human empathy, conscience, and shared values give meaning and moral direction to technology.",
        "Menschliches Mitgefuehl, Gewissen und Werte geben der Technologie ihren moralischen Sinn.",
        "Ludzka empatia, sumienie i wspólne wartości nadają technologii sens i kierunek moralny.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What is the best way for society to use advanced technological tools?",
        "Wie sollte die Gesellschaft moderne technische Werkzeuge am besten nutzen?",
        "W jaki sposób społeczeństwo powinno najlepiej korzystać z zaawansowanych narzędzi technologicznych?",
      ),
      options: [
        {
          text: T(
            "Guide them with human values, compassion, and fairness to lift up communities and protect nature",
            "Sie mit menschlichen Werten, Mitgefuehl und Fairness lenken, um Menschen zu helfen und die Natur zu schuetzen",
            "Prowadzić je ludzkimi wartościami, współczuciem i sprawiedliwością, by wspierać wspólnotę i chronić przyrodę",
          ),
          correct: true,
        },
        {
          text: T(
            "Let computers make all moral rules while people stop thinking entirely",
            "Computern alle ethischen Entscheidungen ueberlassen und das Nachdenken ganz einstellen",
            "Pozwolić komputerom ustalać wszystkie zasady moralne, podczas gdy ludzie przestaną myśleć",
          ),
        },
        {
          text: T(
            "Bury all computers underground and communicate only through smoke signals",
            "Alle Rechner im Garten vergraben und nur noch ueber Rauchzeichen miteinander reden",
            "Zakopać wszystkie komputery pod ziemią i porozumiewać się wyłącznie za pomocą sygnałów dymnych",
          ),
        },
      ],
      hint: T(
        "Technology serves as a powerful multiplier when guided by compassion and ethical purpose.",
        "Technologie wirkt als maechtiger Hebel, wenn sie von Mitgefuehl und Ethik gelenkt wird.",
        "Technologia działa jak potężny mnożnik sił, gdy kierują nią współczucie i cele etyczne.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Select 'Deep Empathy & Care' and at least Smart Automation to achieve over 90% flourishing.",
        "Waehle 'Mitgefuehl & Ethik' und mindestens Kluge Automation, um ueber 90% Wohlstand zu erreichen.",
        "Wybierz 'Głęboka empatia i troska' oraz co najmniej Inteligentną automatyzację, by osiągnąć ponad 90% rozkwitu.",
      ),
      Widget,
      hint: T(
        "Choose deep empathy for human values, ensure automation is active, and tap check.",
        "Waehle Mitgefuehl bei den Werten, stelle sicher dass Automation aktiv ist, und tippe auf pruefen.",
        "Wybierz głęboką empatię, upewnij się, że automatyzacja jest aktywna, i kliknij sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, no matter how smart computers get, what makes human beings special and irreplaceable?",
    "Papa, egal wie klug Computer werden, was macht uns Menschen fuer immer einzigartig und unersetzlich?",
    "Tato, bez względu na to, jak mądre staną się komputery, co sprawia, że człowiek na zawsze pozostanie wyjątkowy i niezastąpiony?",
  ),
  realLife: {
    title: {
      en: "UNESCO Global Recommendation on AI Ethics",
      de: "UNESCO-Empfehlung zur Ethik der Kuenstlichen Intelligenz",
      pl: "Rekomendacja UNESCO i europejski akt o sztucznej inteligencji",
    },
    body: {
      en: "In November 2021, 193 member states of the United Nations Educational, Scientific and Cultural Organization (UNESCO) unanimously adopted the Recommendation on the Ethics of Artificial Intelligence. This historic international framework establishes that technology must always protect human dignity, human rights, gender equality, and the natural environment.",
      de: "Im November 2021 verabschiedeten alle 193 Mitgliedsstaaten der UNESCO einstimmig die weltweite Empfehlung zur Ethik der Kuenstlichen Intelligenz. Dieses Rahmenwerk legt fest, dass Technologie stets die Menschenwuerde, Grundrechte, Chancengleichheit und die Umwelt schuetzen und foerdern muss.",
      pl: "W listopadzie 2021 roku 193 państwa członkowskie UNESCO, w tym Polska i Niemcy, jednogłośnie przyjęły Rekomendację w sprawie etyki sztucznej inteligencji. W 2024 roku Unia Europejska uchwaliła Akt o sztucznej inteligencji (AI Act). Dokumenty te stanowią, że technologie muszą zawsze chronić godność człowieka, prawa człowieka, równość szans i środowisko naturalne.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "In November 2021, UNESCO member states adopted the first global standard-setting instrument on the ethics of artificial intelligence.",
          de: "Im November 2021 verabschiedeten die UNESCO-Mitgliedsstaaten das erste weltweite Regelwerk zur KI-Ethik.",
          pl: "W listopadzie 2021 roku państwa członkowskie UNESCO przyjęły pierwszy globalny instrument normatywny w dziedzinie etyki sztucznej inteligencji.",
        },
        source: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics",
      },
      {
        text: {
          en: "The European Union passed the EU AI Act in 2024 to establish risk-based ethical boundaries and safeguards for artificial intelligence applications.",
          de: "Die Europaeische Union verabschiedete 2024 den EU AI Act, um risikobasierte ethische Leitplanken fuer KI zu schaffen.",
          pl: "Unia Europejska uchwaliła w 2024 roku Akt o sztucznej inteligencji (EU AI Act), wprowadzający wiążące ramy etyczne i ochronne.",
        },
        source: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
      },
      {
        text: {
          en: "Cognitive science research highlights that empathy, shared intentionality, and cultural learning distinguish human cognition from machine computing.",
          de: "Kognitionswissenschaftler betonen, dass Empathie, geteilte Absichten und kulturelles Lernen menschliches Denken auszeichnen.",
          pl: "Badania kognitywistyki dowodzą, że empatia, wspólna intencjonalność i uczenie się kulturowe odróżniają ludzki umysł od obliczeń maszyn.",
        },
        source: "https://www.mpib-berlin.mpg.de/research/research-centers/adaptive-rationality",
      },
      {
        text: {
          en: "The Stanford Institute for Human-Centered AI was founded to guide machine intelligence with multidisciplinary humanistic values.",
          de: "Das Stanford Institute for Human-Centered AI wurde gegruendet, um maschinelle Intelligenz an humanistischen Werten auszurichten.",
          pl: "Stanford Institute for Human-Centered AI powstał, aby kierować rozwojem sztucznej inteligencji w oparciu o wartości humanistyczne.",
        },
        source: "https://hai.stanford.edu/about",
      },
      {
        text: {
          en: "Historical studies on technological revolutions show that long-term social flourishing depends on democratic institutions and public investment in people.",
          de: "Historische Studien zeigen, dass gesellschaftlicher Wohlstand durch Technik von demokratischen Institutionen abhaengt.",
          pl: "Badania historyczne nad rewolucjami technicznymi wykazują, że o powszechnym dobrobycie decydują instytucje demokratyczne i inwestycje w ludzi.",
        },
        source: "https://www.nber.org/books-and-chapters/power-and-progress-our-thousand-year-struggle-over-technology-and-prosperity",
      },
    ],
    simplified: [
      {
        en: "We celebrate the long journey of human toolmaking from simple stones to computers.",
        de: "Wir feiern den langen Weg menschlicher Erfindungen von einfachen Steinen bis zu Computern.",
        pl: "Świętujemy długą drogę ludzkiej wynalazczości od prostych kamiennych narzędzi po superkomputery.",
      },
      {
        en: "We contrast the raw calculating speed of machines with the unique warmth of human conscience.",
        de: "Wir stellen die Rechengeschwindigkeit von Maschinen der einzigartigen Waerme des menschlichen Gewissens gegenueber.",
        pl: "Zestawiamy mechaniczną szybkość obliczeń maszyn z niezastąpionym ciepłem ludzkiego sumienia.",
      },
      {
        en: "We conclude that when guided by empathy and values, technology can build a wonderful future.",
        de: "Wir schliessen damit, dass Technik eine wunderbare Zukunft schafft, wenn sie von Mitgefuehl geleitet wird.",
        pl: "Podsumowujemy, że prowadzona przez empatię i wartości ludzkie technologia może zbudować wspaniałą przyszłość.",
      },
    ],
  },
};
