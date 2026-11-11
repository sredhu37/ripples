import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import { CapitalismToy } from "./capitalism.toy";
import {
  CompetitionDiagram,
  PrivateOwnershipDiagram,
  ProsperityDiagram,
  RulesBalanceDiagram,
  SummaryDiagram,
} from "./capitalism.diagrams";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <CapitalismToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <CapitalismToy lang={lang} mode="quiz" onDone={() => onAnswer(true)} />;
}

export const lesson: Lesson = {
  id: "capitalism",
  story: [
    animatedBeat(
      [
        T(
          "In Ripple Town's market square, Bea owns her brick oven and Finn owns his fishing boat.",
          "Auf dem Marktplatz von Ripple Town besitzt Bea ihren gemauerten Ofen und Finn sein Fischerboot.",
          "Na rynku w Ripple Town Bea jest właścicielką ceglanego pieca, a Finn ma własną łódź rybacką.",
        ),
        T(
          "An economic system where individuals and private businesses own tools, shops, and land is called *capitalism*.",
          "Ein Wirtschaftssystem, in dem Einzelpersonen und Betriebe Werkzeuge, Läden und Land besitzen, heißt *Kapitalismus*.",
          "Ustrój gospodarczy, w którym osoby prywatne i firmy są właścicielami narzędzi, warsztatów i ziemi, nazywamy *kapitalizmem*.",
        ),
        T(
          "Because Bea owns her bakery and keeps her earnings, she works hard to invent tasty sesame rolls.",
          "Weil Bea ihre Bäckerei besitzt und ihren Erlös behält, strengt sie sich an neue Sesambrötchen zu erfinden.",
          "Ponieważ Bea jest właścicielką piekarni i zachowuje swój dochód, chętnie wstaje o świcie i tworzy pyszne bułki sezamowe.",
        ),
        T(
          "Private ownership creates a powerful incentive to work diligently, take care of tools, and invent new ideas.",
          "Privateigentum schafft einen starken Anreiz fleißig zu arbeiten, Werkzeuge zu pflegen und Neues zu erfinden.",
          "Własność prywatna tworzy silną motywację do sumiennej pracy, dbania o narzędzia i rozwijania nowych pomysłów.",
        ),
      ],
      PrivateOwnershipDiagram,
    ),
    animatedBeat(
      [
        T(
          "Soon, Leo opens a second bakery across the street, offering whole grain loaves.",
          "Bald eröffnet Leo eine zweite Bäckerei gegenüber und bietet Vollkornbrote an.",
          "Wkrótce Leo otwiera drugą piekarnię po przeciwnej stronie ulicy, oferując chleb pełnoziarnisty.",
        ),
        T(
          "This friendly contest between businesses to attract customers is called *competition*.",
          "Diesen fairen Wettbewerb zwischen Unternehmen um Kunden nennt man *Konkurrenz*.",
          "Tę uczciwą rywalizację firm o względy kupujących nazywamy *konkurencją*.",
        ),
        T(
          "Neither Bea nor Leo can charge unfair high prices, because customers would just go to the other shop.",
          "Weder Bea noch Leo können überteuerte Preise verlangen, weil Kunden sonst zum anderen Laden gehen.",
          "Ani Bea, ani Leo nie mogą żądać wygórowanych cen, bo klienci poszliby po prostu do konkurencji.",
        ),
        T(
          "Competition gives people choices, encourages quality, and keeps prices fair.",
          "Wettbewerb bietet Menschen Auswahl, fördert Qualität und hält Preise fair.",
          "Konkurencja daje ludziom szeroki wybór, podnosi jakość i utrzymuje uczciwe ceny.",
        ),
      ],
      CompetitionDiagram,
    ),
    animatedBeat(
      [
        T(
          "However, totally unchecked markets can lead to problems if there are no ground rules.",
          "Völlig unkontrollierte Märkte können jedoch Probleme schaffen, wenn es keine Grundregeln gibt.",
          "Jednak całkowicie wolny rynek bez żadnych zasad mógłby prowadzić do poważnych problemów.",
        ),
        T(
          "A business might try to pay unfair wages or dump dirty oven ash straight into the town river.",
          "Ein Betrieb könnte versuchen, unfaire Löhne zu zahlen oder Ofenasche direkt in den Fluss zu kippen.",
          "Przedsiębiorca mógłby próbować płacić głodowe pensje albo zrzucać gorący popiół z pieca prosto do rzeki.",
        ),
        T(
          "That is why modern societies create a *Social Market Economy*.",
          "Deshalb schaffen moderne Gesellschaften eine *Soziale Marktwirtschaft*.",
          "Dlatego nowoczesne społeczeństwa tworzą *Społeczną Gospodarkę Rynkową*.",
        ),
        T(
          "Fair laws protect workers, stop monopolies from bullying smaller shops, and keep nature clean.",
          "Faire Gesetze schützen Arbeiter, verhindern Monopole und halten die Natur sauber.",
          "Sprawiedliwe prawa chronią pracowników, zapobiegają monopolom niszczącym małe sklepy i dbają o czyste środowisko.",
        ),
      ],
      RulesBalanceDiagram,
    ),
    animatedBeat(
      [
        T(
          "Capitalism unleashes human energy, creativity, and abundance.",
          "Kapitalismus entfesselt menschliche Energie, Kreativität und Wohlstand.",
          "Gospodarka rynkowa wyzwala ludzką energię, pomysłowość i obfitość dóbr.",
        ),
        T(
          "Combined with democratic rules and social protection, it creates a thriving, fair society for all.",
          "Kombiniert mit demokratischen Regeln und sozialem Schutz schafft er ein faires Dorf für alle.",
          "Połączona z demokratycznymi regułami i ochroną socjalną tworzy kwitnące i sprawiedliwe społeczeństwo.",
        ),
      ],
      SummaryDiagram,
    ),
    animatedBeat(
      [
        T(
          "When everyone has the opportunity to build and innovate under fair rules, the entire community shares in prosperity.",
          "Wenn jeder die Möglichkeit hat unter fairen Regeln aufzubauen und Neues zu erfinden, teilt das ganze Dorf den Wohlstand.",
          "Gdy każdy ma szansę tworzyć i rozwijać firmę na jasnych zasadach, cała społeczność uczestniczy w dobrobycie.",
        ),
        T(
          "Freedom to create combined with social responsibility creates a balance where everyone can flourish.",
          "Freiheit zum Gestalten verbunden mit sozialer Verantwortung schafft ein Gleichgewicht, in dem alle aufblühen können.",
          "Swoboda twórcza połączona z odpowiedzialnością społeczną tworzy równowagę, w której każdy może się rozwijać.",
        ),
      ],
      ProsperityDiagram,
    ),
  ],
  toyIntro: T(
    "Run the market square simulation: balance business investment with fair rules for workers and nature.",
    "Führe die Marktplatz-Simulation aus: verbinde Investitionen mit fairen Regeln für Arbeiter und Umwelt.",
    "Uruchom symulację rynku: połącz inwestycje piekarni ze sprawiedliwymi zasadami dla pracowników i przyrody.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What is the main characteristic of capitalism?",
        "Was ist das Hauptmerkmal des Kapitalismus?",
        "Jaka jest główna cecha kapitalizmu i gospodarki rynkowej?",
      ),
      options: [
        {
          text: T(
            "Private individuals own tools, workshops, and businesses, and decide what to produce based on markets",
            "Private Personen besitzen Werkzeuge, Werkstätten und Betriebe und entscheiden nach dem Markt was produziert wird",
            "Prywatni ludzie posiadają narzędzia, warsztaty i firmy, decydując o produkcji na podstawie popytu i podaży",
          ),
          correct: true,
        },
        {
          text: T(
            "The town leader owns every pencil and spoon in the entire village",
            "Der Dorfanführer besitzt jeden Bleistift und Löffel im gesamten Dorf",
            "Wódz miasteczka jest właścicielem każdego ołówka i każdej łyżki",
          ),
        },
        {
          text: T(
            "Nobody is allowed to work or trade anything ever",
            "Niemand darf jemals arbeiten oder handeln",
            "Nikomu nie wolno pracować ani wymieniać się towarami",
          ),
        },
      ],
      hint: T(
        "Capitalism is based on private property, voluntary trade, and market competition.",
        "Kapitalismus basiert auf Privateigentum, freiwilligem Handel und Marktwettbewerb.",
        "Kapitalizm opiera się na własności prywatnej, dobrowolnej wymianie i konkurencji rynkowej.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why does Germany call its system a 'Social Market Economy'?",
        "Warum nennt Deutschland sein Wirtschaftssystem 'Soziale Marktwirtschaft'?",
        "Dlaczego ustrój gospodarczy w Polsce i Niemczech określa się mianem 'społecznej gospodarki rynkowej'?",
      ),
      options: [
        {
          text: T(
            "It combines the efficiency and freedom of markets with social protections, fair wages, and environmental rules",
            "Es verbindet Freiheit und Effizienz von Märkten mit sozialer Absicherung, fairen Löhnen und Umweltregeln",
            "Łączy wolność i efektywność rynku z osłoną socjalną, prawami pracowniczymi i ochroną środowiska",
          ),
          correct: true,
        },
        {
          text: T(
            "It only sells social games and board games in stores",
            "Es verkauft in den Läden nur Gesellschaftsspiele",
            "W sklepach sprzedaje się wyłącznie gry towarzyskie i planszowe",
          ),
        },
        {
          text: T(
            "It bans all private shops completely",
            "Es verbietet alle privaten Geschäfte vollständig",
            "Całkowicie zakazuje istnienia prywatnych sklepów i zakładów",
          ),
        },
      ],
      hint: T(
        "The social element adds worker rights, social safety nets, and fair competition rules.",
        "Das soziale Element ergänzt Arbeitnehmerrechte, soziale Netze und faire Wettbewerbsregeln.",
        "Element społeczny dodaje prawa pracownicze, ubezpieczenia społeczne i nadzór nad uczciwą konkurencją.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "In a market economy, what motivates Bea to wake up early and bake delicious bread?",
        "Was motiviert Bea in einer Marktwirtschaft, früh aufzustehen und leckeres Brot zu backen?",
        "Co w gospodarce rynkowej motywuje Beę do wczesnego wstawania i pieczenia pysznego pieczywa?",
      ),
      Widget,
      hint: T(
        "Think about what owning a shop and earning customer satisfaction provides.",
        "Überlege, was der Besitz eines Geschäfts und zufriedene Kunden ermöglichen.",
        "Zastanów się, co daje własność piekarni i uznanie zadowolonych kupujących.",
      ),
    },
  ],
  askDad: T(
    "Papa, why does the constitution describe our system as a 'Social Market Economy'?",
    "Papa, was fügt das Wort 'Sozial' zur 'Marktwirtschaft' in Deutschland hinzu?",
    "Tato, dlaczego Konstytucja nazywa ustrój gospodarczy Polski 'społeczną gospodarką rynkową'?",
  ),
  realLife: {
    title: {
      en: "Liberalization and Market Reforms in India",
      de: "Die Soziale Marktwirtschaft in Deutschland",
      pl: "Społeczna gospodarka rynkowa w Polsce",
    },
    body: {
      en: "Before 1991, India operated under the restrictive 'License Raj' where state permits controlled production. Historic economic reforms in 1991 opened the market to private enterprise, competition, and global trade. To protect consumers and prevent unfair business practices, the Competition Commission of India (CCI) enforces antitrust laws, ensuring markets remain fair and competitive.",
      de: "Deutschland lebt in einer 'Sozialen Marktwirtschaft', nach dem Zweiten Weltkrieg von Ludwig Erhard geprägt. Sie verbindet Markt-Freiheit und Produktivität mit sozialer Sicherheit, gesetzlicher Krankenversicherung, Arbeitsschutz und Kartellgesetzen.",
      pl: "Po 1989 r. Polska przeszła wielką transformację od centralnego planowania do gospodarki rynkowej. Zgodnie z art. 20 Konstytucji RP podstawą ustroju gospodarczego Polski jest społeczna gospodarka rynkowa, oparta na wolności działalności gospodarczej, własności prywatnej oraz solidarności i dialogu partnerów społecznych. Uczciwej konkurencji i praw konsumentów strzeże Urząd Ochrony Konkurencji i Konsumentów (UOKiK).",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Constitutional economic provisions establish the social market economy based on freedom of economic activity, private property, and solidarity as the bedrock of the national economic system.",
          de: "Das Konzept der Sozialen Marktwirtschaft wurde im Nachkriegsdeutschland von Ludwig Erhard und Alfred Müller-Armack begründet.",
          pl: "Art. 20 Konstytucji Rzeczypospolitej Polskiej stanowi: 'Społeczna gospodarka rynkowa oparta na wolności działalności gospodarczej, własności prywatnej oraz solidarności, dialogu i współpracy partnerów społecznych stanowi podstawę ustroju gospodarczego Rzeczypospolitej Polskiej'.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19970780483",
      },
      {
        text: {
          en: "Constitutional property clauses protect the right to property, inheritance, and business freedom while subjecting ownership to statutory public interest obligations.",
          de: "Artikel 14 des Grundgesetzes schützt das Privateigentum, bestimmt aber zugleich: 'Eigentum verpflichtet. Sein Gebrauch soll zugleich dem Wohle der Allgemeinheit dienen.'",
          pl: "Art. 21 i art. 64 Konstytucji RP chronią własność i prawo dziedziczenia, zastrzegając, że własność może być ograniczona tylko w drodze ustawy i tylko w zakresie, w jakim nie narusza jej istoty.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19970780483",
      },
      {
        text: {
          en: "Independent antimonopoly regulators monitor mergers, penalize cartels, and sanction abuses of dominant market position to preserve consumer price discovery.",
          de: "Das Bundeskartellamt bekämpft Monopolbildungen und Kartellabsprachen zum Schutz von Konsumenten und fairem Wettbewerb.",
          pl: "Urząd Ochrony Konkurencji i Konsumentów (UOKiK) przeciwdziała praktykom monopolistycznym, niedozwolonym porozumieniom cenowym oraz chroni zbiorowe interesy konsumentów.",
        },
        source: "https://uokik.gov.pl",
      },
      {
        text: {
          en: "National statistical offices record that millions of registered private micro, small, and medium enterprises generate the majority of employment and gross domestic product.",
          de: "Statistische Daten von Destatis belegen, dass mittelständische Privatunternehmen das Rückgrat der deutschen Wirtschaftsleistung und Beschäftigung bilden.",
          pl: "Główny Urząd Statystyczny (GUS) oraz PARP raportują, że sektor prywatnych małych i średnich przedsiębiorstw tworzy blisko połowę polskiego PKB i zatrudnia większość pracujących.",
        },
        source: "https://stat.gov.pl",
      },
      {
        text: {
          en: "Economic history documents that replacing state production quotas with decentralized price mechanisms dramatically increases innovation, resource efficiency, and consumer welfare.",
          de: "Das Bundesministerium für Wirtschaft und Klimaschutz dokumentiert die ordoliberale Marktkoordination als Grundlage für Wohlstand für alle.",
          pl: "Doświadczenie transformacji gospodarczej w Polsce po 1989 r. potwierdza, że uwolnienie przedsiębiorczości i cen wyeliminowało kolejki i stworzyło nowoczesną, dynamiczną gospodarkę.",
        },
        source: "https://www.gov.pl/web/rozwoj-technologia",
      },
    ],
    simplified: [
      {
        en: "We explain capitalism through Bea's bakery and Finn's fishing boat so children see how owning tools drives initiative.",
        de: "Wir erklären Kapitalismus anhand von Beas Bäckerei und Finns Fischerboot, damit Kinder verstehen, wie Eigentum motiviert.",
        pl: "Tłumaczymy kapitalizm na przykładzie piekarni Bei i łodzi Finna, pokazując dzieciom, jak własność narzędzi zachęca do przedsiębiorczości.",
      },
      {
        en: "We show competition between two bakers as the reason why bread stays fresh and prices remain fair.",
        de: "Wir zeigen den Wettbewerb zweier Bäcker als Grund dafür, warum Brot frisch bleibt und Preise fair sind.",
        pl: "Ukazujemy konkurencję między dwoma piekarzami jako przyczynę, dla której pieczywo jest świeże, a ceny sprawiedliwe.",
      },
      {
        en: "We introduce the Social Market Economy as rules keeping river water clean and wages fair.",
        de: "Wir stellen die Soziale Marktwirtschaft als Regeln vor, die Flusswasser sauber halten und faire Löhne sichern.",
        pl: "Wyjaśniamy społeczną gospodarkę rynkową jako zbiór zasad chroniących czystość rzeki i godne wynagrodzenia pracowników.",
      },
    ],
  },
};
