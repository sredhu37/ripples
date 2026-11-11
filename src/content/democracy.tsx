import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  CharterDiagram,
  CompromiseDiagram,
  DebateProposalDiagram,
  PillarsDiagram,
  TrustDiagram,
} from "./democracy.diagrams";
import { DemocracyToy } from "./democracy.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <DemocracyToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <DemocracyToy lang={lang} mode="quiz" onDone={() => onAnswer(true)} />;
}

export const lesson: Lesson = {
  id: "democracy",
  story: [
    animatedBeat(
      [
        T(
          "Moss was elected council chair, but winning an election does not mean you can do whatever you want.",
          "Moss wurde zum Ratsvorsitzenden gewählt, aber eine Wahl zu gewinnen bedeutet nicht, dass man tun kann, was man will.",
          "Moss został wybrany przewodniczącym rady, ale wygrana w wyborach nie oznacza, że można robić wszystko, na co ma się ochotę.",
        ),
        T(
          "Ripple Town wrote down a shared Town Charter that sets fair rules for everyone.",
          "Ripple Town schrieb eine gemeinsame Dorfsatzung auf, die faire Regeln für jeden festlegt.",
          "Mieszkańcy Ripple Town spisali wspólny Statut Miasteczka, który ustala sprawiedliwe reguły dla każdego.",
        ),
        T(
          "The Charter guarantees that everyone has the right to speak up and that laws apply equally to all.",
          "Die Satzung garantiert, dass jeder das Recht hat seine Meinung zu sagen und Gesetze für alle gleich gelten.",
          "Statut gwarantuje, że każdy ma prawo zabrać głos, a prawo obowiązuje wszystkich w równym stopniu.",
        ),
        T(
          "Even the council leader must obey the same laws as the newest villager in town.",
          "Sogar der Ratsleiter muss dieselben Gesetze befolgen wie der neueste Dorfbewohner.",
          "Nawet przewodniczący rady musi przestrzegać tych samych praw co najmłodszy czy nowo przybyły mieszkaniec.",
        ),
      ],
      CharterDiagram,
    ),
    animatedBeat(
      [
        T(
          "One morning, Moss proposed spending the entire town treasury on a giant marble clock tower.",
          "Eines Morgens schlug Moss vor, die gesamte Dorfkasse für einen riesigen Marmor-Uhrenturm auszugeben.",
          "Pewnego ranka Moss zaproponował wydanie całej kasy miasteczka na gigantyczną marmurową wieżę zegarową.",
        ),
        T(
          "In a democracy, leaders cannot just issue commands without listening to citizens.",
          "In einer Demokratie können Anführer nicht einfach Befehle erteilen, ohne den Bürgern zuzuhören.",
          "W demokracji rządzący nie mogą po prostu wydawać rozkazów, nie słuchając głosu obywateli.",
        ),
        T(
          "Citizens gathered at an open town hall: 'The school roof leaks, and bakers need grain storage!'",
          "Die Bürger versammelten sich: 'Das Schuldach ist undicht und Bäcker brauchen einen Kornspeicher!'",
          "Mieszkańcy zebrali się na rynku: 'Dach szkoły przecieka, a piekarze potrzebują spichlerza na zboże!'",
        ),
        T(
          "Open debate allowed villagers to speak the truth openly without fear.",
          "Die offene Debatte ermöglichte es den Dorfbewohnern, die Wahrheit ohne Angst frei auszusprechen.",
          "Otwarta debata pozwoliła mieszkańcom mówić prawdę prosto w oczy bez lęku przed karą.",
        ),
      ],
      DebateProposalDiagram,
    ),
    animatedBeat(
      [
        T(
          "Instead of arguing endlessly, the council negotiated a sensible compromise.",
          "Statt endlos zu streiten, handelte der Dorfrat einen vernünftigen Kompromiss aus.",
          "Zamiast kłócić się bez końca, rada wynegocjowała rozsądny kompromis.",
        ),
        T(
          "A compromise means every group gives up a little bit so that everyone gets what they truly need.",
          "Ein Kompromiss bedeutet, dass jede Gruppe ein wenig nachgibt, damit jeder bekommt, was er wirklich braucht.",
          "Kompromis oznacza, że każda ze stron ustępuje odrobinę, aby każdy otrzymał to, co jest mu naprawdę niezbędne.",
        ),
        T(
          "They agreed to repair the school roof, build a shared grain store, and put a modest clock on the hall.",
          "Sie einigten sich darauf, das Schuldach zu reparieren, einen Speicher zu bauen und eine Uhr anzubringen.",
          "Zgodzili się naprawić dach szkoły, postawić spichlerz i umieścić skromny zegar na ścianie ratusza.",
        ),
        T(
          "Democracy works through patience, discussion, and finding solutions together.",
          "Demokratie funktioniert durch Geduld, Diskussion und das gemeinsame Finden von Lösungen.",
          "Demokracja działa dzięki cierpliwości, spokojnej dyskusji i wspólnemu poszukiwaniu rozwiązań.",
        ),
      ],
      CompromiseDiagram,
    ),
    animatedBeat(
      [
        T(
          "Democracy means 'rule by the people', built on three core pillars.",
          "Demokratie bedeutet 'Herrschaft des Volkes', gestützt auf drei Kernsäulen.",
          "Demokracja oznacza 'władzę ludu', opartą na trzech głównych filarach.",
        ),
        T(
          "First: Free speech and open debates so mistakes are identified quickly.",
          "Erstens: Freie Meinungsäußerung und offene Debatten, damit Fehler schnell erkannt werden.",
          "Po pierwsze: Wolność słowa i otwarta debata, dzięki czemu błędy są szybko zauważane i naprawiane.",
        ),
        T(
          "Second: The rule of law, meaning rules and courts protect everyone, including minorities.",
          "Zweitens: Die Rechtsstaatlichkeit, was bedeutet, dass Regeln und Gerichte jeden schützen.",
          "Po drugie: Rządy prawa, co oznacza, że ustawy i niezawisłe sądy chronią każdego obywatela, w tym mniejszości.",
        ),
        T(
          "Third: Peaceful error correction: if leaders break their promises, citizens can vote them out next time.",
          "Drittens: Friedliche Fehlerkorrektur: Wenn Anführer Wort brechen, können Bürger sie abwählen.",
          "Po trzecie: Pokojowa korekta błędów: jeśli rządzący łamią obietnice, obywatele mogą ich odwołać w kolejnych wyborach.",
        ),
      ],
      PillarsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Because every citizen has a voice, people trust the shared rules and work together peacefully.",
          "Weil jeder Bürger eine Stimme hat, vertrauen die Menschen den gemeinsamen Regeln und arbeiten friedlich zusammen.",
          "Ponieważ każdy obywatel ma prawo głosu, ludzie ufają wspólnym zasadom i współpracują w pokoju.",
        ),
        T(
          "A healthy democracy requires citizens to listen to each other and respect differing viewpoints.",
          "Eine gesunde Demokratie erfordert, dass die Bürger einander zuhören und unterschiedliche Sichtweisen respektieren.",
          "Zdrowa demokracja wymaga, by obywatele uważnie słuchali się nawzajem i szanowali odmienne poglądy.",
        ),
        T(
          "Through cooperation and peaceful debates, Ripple Town stays strong, fair, and welcoming for everyone.",
          "Durch Zusammenarbeit und friedliche Debatten bleibt Ripple Town stark, gerecht und offen für alle.",
          "Dzięki współpracy i mądrym dyskusjom Ripple Town pozostaje silne, sprawiedliwe i przyjazne dla każdego.",
        ),
      ],
      TrustDiagram,
    ),
  ],
  toyIntro: T(
    "Balance the council budget tokens so all three citizen groups are satisfied with the compromise.",
    "Bringe die Ratsbudget-Münzen ins Gleichgewicht, damit alle drei Bürgergruppen mit dem Kompromiss zufrieden sind.",
    "Zrównoważ żetony budżetowe rady, aby wszystkie trzy grupy mieszkańców były zadowolone z kompromisu.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What does 'democracy' mean in everyday life?",
        "Was bedeutet 'Demokratie' im täglichen Leben?",
        "Co oznacza 'demokracja' w codziennym życiu społeczeństwa?",
      ),
      options: [
        {
          text: T(
            "Citizens participate in decisions, follow shared laws, and resolve disputes through debate and voting",
            "Bürger wirken an Entscheidungen mit, befolgen gemeinsame Gesetze und lösen Streit durch Debatte und Wahl",
            "Obywatele współdecydują o wspólnych sprawach, przestrzegają praw i rozwiązują spory poprzez debatę i głosowanie",
          ),
          correct: true,
        },
        {
          text: T(
            "One ruler tells everyone what to do without asking",
            "Ein Anführer befiehlt jedem, was er tun soll, ohne zu fragen",
            "Jeden władca rozkazuje wszystkim, co mają robić, o nic nikogo nie pytając",
          ),
        },
        {
          text: T(
            "There are no rules and everyone does whatever they want",
            "Es gibt keine Regeln und jeder macht, was er will",
            "Nie ma żadnych praw ani zasad i każdy robi tylko to, na co ma ochotę",
          ),
        },
      ],
      hint: T(
        "Democracy empowers all citizens to have a voice through representatives and fair rules.",
        "Demokratie ermächtigt alle Bürger, durch Vertreter und faire Regeln eine Stimme zu haben.",
        "Demokracja daje głos wszystkim obywatelom poprzez wybieranych przedstawicieli i równe prawo.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is finding a compromise so important in a democratic council?",
        "Warum ist das Finden eines Kompromisses im Gemeinderat so wichtig?",
        "Dlaczego zawieranie kompromisów jest tak istotne w demokratycznej radzie?",
      ),
      options: [
        {
          text: T(
            "Because different neighbors have different needs, and cooperation requires balanced solutions",
            "Weil Nachbarn verschiedene Bedürfnisse haben und Zusammenarbeit ausgewogene Lösungen erfordert",
            "Ponieważ różni mieszkańcy mają różne potrzeby, a współpraca wymaga wyważonych i sprawiedliwych rozwiązań",
          ),
          correct: true,
        },
        {
          text: T(
            "Because one person should always win 100 percent of the time",
            "Weil eine Person immer zu 100 Prozent gewinnen sollte",
            "Ponieważ jedna osoba powinna zawsze wygrywać we wszystkim w stu procentach",
          ),
        },
        {
          text: T(
            "Because compromise means giving all the money to the richest merchant",
            "Weil Kompromiss bedeutet, das ganze Geld dem reichsten Händler zu geben",
            "Ponieważ kompromis polega na oddaniu wszystkich pieniędzy najbogatszemu kupcowi",
          ),
        },
      ],
      hint: T(
        "A compromise ensures that everyone's core needs are respected and protected.",
        "Ein Kompromiss stellt sicher, dass die Grundbedürfnisse aller respektiert und geschützt werden.",
        "Kompromis gwarantuje, że podstawowe potrzeby każdego są szanowane i chronione.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Allocate 10 tokens so Sailors, Bakers, and Families each get at least 2 tokens to reach consensus.",
        "Verteile 10 Münzen so, dass Seeleute, Bäcker und Familien jeweils mindestens 2 Münzen erhalten.",
        "Rozdziel 10 żetonów tak, aby Żeglarze, Piekarze i Rodziny otrzymali co najmniej po 2 żetony, osiągając zgodę.",
      ),
      Widget,
      hint: T(
        "Ensure the total budget equals 10 and each of the three groups has 2 or more tokens.",
        "Stelle sicher, dass die Summe genau 10 beträgt und jede der drei Gruppen 2 oder mehr Münzen hat.",
        "Upewnij się, że suma wynosi 10 i każda z trzech grup posiada co najmniej 2 żetony.",
      ),
    },
  ],
  askDad: T(
    "Papa, what happens in a democracy if the leaders do a bad job or break their promises?",
    "Papa, was passiert in einer Demokratie, wenn die Anführer schlechte Arbeit leisten oder ihre Versprechen brechen?",
    "Tato, co się dzieje w demokracji, gdy rządzący źle wykonują swoją pracę lub łamią obietnice?",
  ),
  realLife: {
    title: {
      en: "Parliamentary Democracy and the Indian Parliament",
      de: "Parlamentarische Demokratie in Deutschland",
      pl: "Demokracja parlamentarna w Polsce",
    },
    body: {
      en: "India is the world's largest constitutional parliamentary democracy. In the Parliament of India (consisting of the Lok Sabha and Rajya Sabha), representatives from across the country debate bills and negotiate compromises. Independent courts, guided by the Supreme Court of India, ensure that no leader can override the fundamental rights laid down in the Constitution.",
      de: "Deutschland ist eine parlamentarische Demokratie. Abgeordnete im Bundestag vertreten verschiedene Parteien und bilden Koalitionen, um Kompromisse auszuhandeln, die eine breite Mehrheit vertreten.",
      pl: "Rzeczpospolita Polska jest demokratycznym państwem prawnym (art. 2 Konstytucji RP). Władzę ustawodawczą sprawują Sejm i Senat. Posłowie i senatorowie debatują nad projektami ustaw i wypracowują kompromisy. Niezawisłe sądy oraz Trybunał Konstytucyjny dbają o to, by żadna władza nie naruszała praw obywatelskich zapisanych w Konstytucji.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "Constitutional democracy provisions define the state as a democratic state under the rule of law realizing social justice principles.",
          de: "Artikel 20 Absatz 1 des Grundgesetzes bestimmt die Bundesrepublik Deutschland als demokratischen und sozialen Bundesstaat.",
          pl: "Art. 2 Konstytucji Rzeczypospolitej Polskiej stanowi: 'Rzeczpospolita Polska jest demokratycznym państwem prawnym, urzeczywistniającym zasady sprawiedliwości społecznej'.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19970780483",
      },
      {
        text: {
          en: "Constitutional equality clauses mandate that all persons are equal before the law and have equal rights in public life.",
          de: "Artikel 3 Absatz 1 des Grundgesetzes garantiert: 'Alle Menschen sind vor dem Gesetz gleich.'",
          pl: "Art. 32 Konstytucji RP gwarantuje: 'Wszyscy są wobec prawa równi. Wszyscy mają prawo do równego traktowania przez władze publiczne'.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19970780483",
      },
      {
        text: {
          en: "Constitutional courts protect fundamental civil liberties, minority interests, and institutional balance against executive or legislative overreach.",
          de: "Das Bundesverfassungsgericht wacht als oberster Hüter des Grundgesetzes über die Einhaltung der Grundrechte und Verfassungsgrenzen.",
          pl: "Trybunał Konstytucyjny orzeka w sprawach zgodności ustaw i umów międzynarodowych z Konstytucją RP, chroniąc nienaruszalność praw obywatelskich.",
        },
        source: "https://trybunal.gov.pl",
      },
      {
        text: {
          en: "Democratic political culture frameworks highlight parliamentary deliberation, coalition building, and consensus negotiation as foundational governance norms.",
          de: "Die Bundeszentrale für politische Bildung definiert Kompromissfähigkeit und Dialogbereitschaft als unverzichtbare Tugenden lebendiger Demokratie.",
          pl: "Kultura polityczna demokracji opiera się na dialogu społecznym, wolności debaty, prawach opozycji oraz poszukiwaniu kompromisu służącego dobru wspólnemu.",
        },
        source: "https://www.sejm.gov.pl/Sejm10.nsf/page.xsp/historia",
      },
      {
        text: {
          en: "Separation of powers doctrines distribute sovereignty across legislative, executive, and judicial branches to avert autocratic concentrations of power.",
          de: "Gewaltenteilung nach Art. 20 Abs. 2 GG trennt Gesetzgebung, vollziehende Gewalt und Rechtsprechung zur gegenseitigen Hemmung und Kontrolle.",
          pl: "Art. 10 Konstytucji RP ustala ustrój oparty na podziale i równowadze władzy ustawodawczej, wykonawczej i sądowniczej.",
        },
        source: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19970780483",
      },
    ],
    simplified: [
      {
        en: "We explain democracy through a town council budget dilemma so children understand why consensus and compromise take time.",
        de: "Wir erklären Demokratie anhand eines Ratsbudget-Problems, damit Kinder verstehen, warum Verständigung Zeit braucht.",
        pl: "Tłumaczymy demokrację na przykładzie budżetu rady miasteczka, pokazując, dlaczego wypracowanie zgody i kompromisu wymaga cierpliwości.",
      },
      {
        en: "We emphasize that elected leaders are bound by written rules, preventing arbitrary decisions.",
        de: "Wir betonen, dass gewählte Anführer an Gesetze gebunden sind, um Willkür zu verhindern.",
        pl: "Podkreślamy, że wybrani przywódcy są związani prawem i statutem, co wyklucza samowolę i dyktat.",
      },
      {
        en: "We show that peaceful error correction at elections is the main protection against bad policy.",
        de: "Wir zeigen, dass die friedliche Fehlerkorrektur bei Wahlen der wichtigste Schutz vor schlechter Politik ist.",
        pl: "Wskazujemy pokojową korektę błędów podczas wyborów jako główną tarczę obywateli przed złymi rządami.",
      },
    ],
  },
};
