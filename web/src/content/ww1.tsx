import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  CompetingFleetsDiagram,
  AllianceBlocksDiagram,
  DominoTumbleDiagram,
  RuinedBridgeArmisticeDiagram,
  LeagueOfNationsGenevaDiagram,
} from "./ww1.diagrams";
import { Ww1Toy } from "./ww1.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <Ww1Toy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <Ww1Toy lang={lang} mode="quiz" onDone={() => onAnswer(true)} />;
}

export const lesson: Lesson = {
  id: "ww1",
  story: [
    animatedBeat(
      [
        T(
          "In the early twentieth century, European nations competed to build the largest armies.",
          "Im fruehen zwanzigsten Jahrhundert wetteiferten europaeische Staaten um die groessten Heere.",
          "Na początku dwudziestego wieku państwa europejskie rywalizowały w tworzeniu wielkich armii.",
        ),
        T(
          "Heavy steel battleships and artillery filled military depots across the continent.",
          "Gepanzerte Schlachtschiffe und Artillerie fuellten die militaerischen Lagerhallen.",
          "Ciężkie stalowe pancerniki i działa artyleryjskie wypełniały magazyny wojskowe na całym kontynencie.",
        ),
        T(
          "Leaders believed that building more weapons would make their nations safe from attack.",
          "Die Herrscher glaubten, mehr Waffen wuerden ihre Laender vor Angriffen schuetzen.",
          "Przywódcy wierzyli, że produkowanie coraz większej liczby broni zapewni ich krajom bezpieczeństwo.",
        ),
        T(
          "Instead, suspicion and fear grew between neighboring capitals with each passing year.",
          "Stattdessen wuchsen Misstrauen und Furcht zwischen den Hauptstaedten von Jahr zu Jahr.",
          "Zamiast spokoju, z roku na rok między sąsiednimi stolicami narastały nieufność i strach.",
        ),
      ],
      CompetingFleetsDiagram,
    ),
    animatedBeat(
      [
        T(
          "To guarantee security, leaders signed secret mutual defense treaties with their friends.",
          "Um Sicherheit zu garantieren, schlossen Herrscher geheime Verteidigungsvertraege ab.",
          "Aby zagwarantować bezpieczeństwo, władcy zawierali tajne traktaty o wzajemnej obronie.",
        ),
        T(
          "Europe was split into two armed camps: the Central Powers and the Allied Powers.",
          "Europa spaltete sich in zwei Bloecke: die Mittelmaechte und die Alliierten.",
          "Europa podzieliła się na dwa uzbrojone obozy: Państwa Centralne oraz Ententę.",
        ),
        T(
          "Each treaty promised: if an ally is attacked, all treaty partners must immediately declare war.",
          "Jeder Vertrag versprach: Wird ein Partner angegriffen, ziehen alle Verbuendeten in den Krieg.",
          "Każdy układ zobowiązywał: jeśli sojusznik zostanie zaatakowany, wszyscy partnerzy natychmiast ruszają na wojnę.",
        ),
        T(
          "These *alliances* linked nations together like a tightly strung web of tripwires.",
          "Diese *Buendnisse* verbanden die Staaten wie ein dicht gespanntes Netz von Stolperdrahten.",
          "Te *sojusze* powiązały państwa niczym gęsta i niebezpieczna sieć ukrytych potykaczy.",
        ),
      ],
      AllianceBlocksDiagram,
    ),
    animatedBeat(
      [
        T(
          "In the summer of 1914, a political crisis in Sarajevo sparked a chain reaction.",
          "Im Sommer 1914 loeste eine Krise in Sarajevo eine verhaengnisvolle Kettenreaktion aus.",
          "Latem 1914 roku kryzys polityczny w Sarajewie wywołał gwałtowną reakcję łańcuchową.",
        ),
        T(
          "Because of mutual treaties, *mobilization* orders fired in Berlin, Paris, Vienna, and St. Petersburg.",
          "Wegen der Vertraege folgten *Mobilmachungen* in Berlin, Paris, Wien und St. Petersburg.",
          "W myśl traktatów rozkazy *mobilizacji* padły jednocześnie w Berlinie, Paryżu, Wiedniu i Petersburgu.",
        ),
        T(
          "Railway timetables moved millions of young soldiers to the frontiers within days.",
          "Fahrplaene der Eisenbahn brachten binnen Tagen Millionen junger Soldaten an die Fronten.",
          "Rozkłady jazdy pociągów w ciągu kilku dni przetransportowały miliony żołnierzy na granice.",
        ),
        T(
          "Like falling dominoes, nations were dragged into World War 1 by their own promises.",
          "Wie fallende Dominosteine wurden die Staaten durch ihre eigenen Zusagen in den Krieg gerissen.",
          "Niczym przewracające się klocki domina, państwa zostały wciągnięte w I wojnę światową przez własne pakty.",
        ),
      ],
      DominoTumbleDiagram,
    ),
    animatedBeat(
      [
        T(
          "For four long years, industrial weapons brought immense devastation across Europe.",
          "Vier lange Jahre lang brachten Industriewaffen unendliche Zerstoerung ueber Europa.",
          "Przez cztery długie lata broń przemysłowa przynosiła niewyobrażalne zniszczenie w Europie.",
        ),
        T(
          "Bridges, farms, and historic towns were reduced to rubble by artillery.",
          "Bruecken, Hoefe und Staedte wurden von Artillerie in Truemmer gelegt.",
          "Mosty, gospodarstwa rolne i zabytkowe miasta zamieniły się pod ostrzałem w ruinę.",
        ),
        T(
          "On the eleventh hour of the eleventh day of November 1918, an armistice silenced the guns.",
          "Am elften Tag des elften Monats 1918 brachte ein Waffenstillstand die Waffen zum Schweigen.",
          "Jedenastego dnia jedenastego miesiąca 1918 roku o godzinie jedenastej zawieszenie broni uciszyło działa.",
        ),
        T(
          "The continent mourned, realizing that military rivalry had brought only heartbreak.",
          "Der Kontinent trauerte und erkannte, dass militaerischer Wettstreit nur Leid gebracht hatte.",
          "Kontynent pogrążył się w żałobie, uświadamiając sobie, że wyścig zbrojeń przyniósł jedynie cierpienie.",
        ),
      ],
      RuinedBridgeArmisticeDiagram,
    ),
    animatedBeat(
      [
        T(
          "Looking at the devastation, global leaders gathered to build a new system of diplomacy.",
          "Angesichts der Truemmer versammelten sich fuehrende Politiker fuer ein neues System der Diplomatie.",
          "Patrząc na ruiny, światowi przywódcy zebrali się, by zbudować nowy system dyplomacji.",
        ),
        T(
          "In Geneva, they founded the *League of Nations* (der Voelkerbund).",
          "In Genf gruendeten sie den *Voelkerbund*.",
          "W Genewie powołali *Ligę Narodów*, pierwszą powszechną organizację pokoju.",
        ),
        T(
          "Its principle was simple: disputes between nations must be discussed around an open table.",
          "Sein Grundsatz war einfach: Konflikte zwischen Laendern muessen am offenen Tisch verhandelt werden.",
          "Jej zasada była prosta: spory między państwami muszą być rozstrzygane przy wspólnym stole rokowań.",
        ),
        T(
          "Though imperfect, it established the first worldwide forum for collective peace.",
          "Obwohl unvollkommen, schuf er das erste weltweite Forum fuer gemeinsamen Frieden.",
          "Choć nie była doskonała, stworzyła pierwsze w dziejach forum dla budowania wspólnego pokoju.",
        ),
      ],
      LeagueOfNationsGenevaDiagram,
    ),
  ],
  toyIntro: T(
    "Test the alliance domino cascade and activate the Geneva Peace Table to defuse disputes safely.",
    "Teste den Buendnis-Dominoeffekt und aktiviere den Genfer Tisch, um Streit friedlich zu loesen.",
    "Przetestuj kaskadę domina sojuszy i uruchom genewski stół pokojowy, by rozwiązać spory bez wojny.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why did World War 1 spread so rapidly between European nations in 1914?",
        "Warum breitete sich der Erste Weltkrieg 1914 so rasch zwischen den Staaten aus?",
        "Dlaczego I wojna światowa rozprzestrzeniła się tak szybko między państwami w 1914 roku?",
      ),
      options: [
        {
          text: T(
            "Secret mutual defense alliance treaties dragged partner nations in like falling dominoes",
            "Geheime Buendnisvertraege rissen die Partnerlaender wie fallende Dominosteine mit",
            "Tajne traktaty o wzajemnej obronie wciągały sojuszników niczym przewracające się klocki domina",
          ),
          correct: true,
        },
        {
          text: T(
            "A sudden invasion of giant green kangaroos from the moon",
            "Eine ploetzliche Invasion von riesigen gruenen Kaengurus vom Mond",
            "Niespodziewana inwazja wielkich zielonych kangurów z księżyca",
          ),
        },
        {
          text: T(
            "All paper maps in Europe were accidentally washed in the laundry",
            "Alle Landkarten in Europa wurden aus Versehen in der Waschmaschine gewaschen",
            "Wszystkie papierowe mapy w Europie zostały przypadkowo wyprane w pralce",
          ),
        },
      ],
      hint: T(
        "Interlocking treaty obligations turned a local dispute into a continental conflict.",
        "Verflochtene Vertraege verwandelten einen regionalen Konflikt in einen Weltkrieg.",
        "Wzajemne zobowiązania traktatowe przekształciły lokalny spór w konflikt ogólnoeuropejski.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What was the main purpose of founding the League of Nations (Voelkerbund) in Geneva?",
        "Was war das Hauptziel bei der Gruendung des Voelkerbundes in Genf?",
        "Jaki był główny cel powołania Ligi Narodów w Genewie?",
      ),
      options: [
        {
          text: T(
            "To resolve international disputes through open diplomacy and law rather than war",
            "Streitigkeiten zwischen Laendern am Verhandlungstisch und mit Recht statt mit Krieg zu loesen",
            "Rozwiązywanie sporów międzynarodowych na drodze otwartej dyplomacji i prawa zamiast wojny",
          ),
          correct: true,
        },
        {
          text: T(
            "To build the world biggest bouncy castle in the Alps",
            "Die groesste Huepfburg der Welt in den Alpen aufzubauen",
            "Zbudowanie największego zamku dmuchanego w Alpach",
          ),
        },
        {
          text: T(
            "To replace all train whistles with tuba sounds",
            "Alle Zugpfeifen durch Tuba-Geraeusche zu ersetzen",
            "Zastąpienie wszystkich gwizdków kolejowych dźwiękiem tuby",
          ),
        },
      ],
      hint: T(
        "The League was created to provide a forum for peaceful conflict resolution.",
        "Der Bund wurde geschaffen, um Konflikte friedlich am Tisch zu klaeren.",
        "Ligę stworzono, aby zapewnić stałe miejsce do pokojowego załatwiania sporów.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Switch from 'Rigid Secret Alliances' to the 'Geneva Peace Mediation Table' to protect Europe from the domino trap.",
        "Wechsle von Geheime Buendnisfallen zum Genfer Vermittlungstisch, um den Dominoeffekt zu stoppen.",
        "Przełącz z 'Sztywnych tajnych sojuszy' na 'Genewski stół mediacji pokojowej', aby zatrzymać kaskadę domina.",
      ),
      Widget,
      hint: T(
        "Click Geneva Peace Mediation Table and tap check.",
        "Klicke auf Genfer Vermittlungstisch und tippe auf pruefen.",
        "Wybierz Genewski stół mediacji pokojowej i naciśnij sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, why is talking openly and listening to others so much better than making secret pacts?",
    "Papa, warum ist offenes Miteinander-Reden so viel besser als geheime Absprachen?",
    "Tato, dlaczego otwarta rozmowa i uważne słuchanie innych są o wiele lepsze niż zawieranie tajemnych paktów?",
  ),
  realLife: {
    title: {
      en: "The Peace Palace in The Hague",
      de: "Der Friedenspalast in Den Haag",
      pl: "Pałac Pokoju w Hadze i odzyskanie niepodległości",
    },
    body: {
      en: "Following the Hague Peace Conferences and World War 1, the Peace Palace (Vredespaleis) was opened in The Hague. Today it houses the International Court of Justice (ICJ), the highest judicial organ of the United Nations, where border treaties and international law questions are argued by jurists rather than armies.",
      de: "Nach den Haager Friedenskonferenzen und dem Ersten Weltkrieg wurde der Friedenspalast in Den Haag eroeffnet. Heute beherbergt er den Internationalen Gerichtshof (IGH) der Vereinten Nationen, wo Grenzvertraege und Rechtsfragen von Juristen statt von Armeen verhandelt werden.",
      pl: "Koniec I wojny światowej 11 listopada 1918 roku przyniósł upadek wielkich cesarstw zaborczych i umożliwił powrót niepodległej Polski na mapę Europy po 123 latach niewoli. W tym samym czasie w Europie zrozumiano potrzebę stworzenia stałych instytucji prawa międzynarodowego. W Pałacu Pokoju w Hadze mieści się Międzynarodowy Trybunał Sprawiedliwości ONZ, w którym sędziowie i dyplomaci rozstrzygają spory graniczne za pomocą kodeksów, a nie armat.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "The Triple Entente and the Triple Alliance divided the major European powers into opposing military blocs prior to 1914.",
          de: "Die Triple Entente und der Dreibund spalteten die europaeischen Grossmaechte vor 1914 in verfeindete Bloecke.",
          pl: "Trójprzymierze i Trójporozumienie (Ententa) podzieliły mocarstwa europejskie przed 1914 rokiem na dwa zbrojne bloki.",
        },
        source: "https://www.britannica.com/event/World-War-I/The-initial-stages-of-the-war",
      },
      {
        text: {
          en: "The assassination of Archduke Franz Ferdinand in Sarajevo triggered a rapid escalation of ultimatums and general mobilizations.",
          de: "Das Attentat von Sarajevo fuehrte zu einer raschen Eskalation von Ultimaten und Generalmobilmachungen.",
          pl: "Zamach na arcyksięcia Franciszka Ferdynanda w Sarajewie uruchomił lawinę ultimatum dyplomatycznych i powszechnej mobilizacji armii.",
        },
        source: "https://www.britannica.com/event/assassination-of-Franz-Ferdinand",
      },
      {
        text: {
          en: "The Armistice of 11 November 1918 ended hostilities on the Western Front, coming into effect at 11:00 a.m. Paris time.",
          de: "Der Waffenstillstand vom 11. November 1918 beendete die Kaempfe an der Westfront um 11:00 Uhr Pariser Zeit.",
          pl: "Rozejm w Compiègne z 11 listopada 1918 roku zakończył działania wojenne na froncie zachodnim o godzinie 11:00, stając się dniem odzyskania niepodległości przez Polskę.",
        },
        source: "https://www.britannica.com/event/Armistice",
      },
      {
        text: {
          en: "The Covenant of the League of Nations was integrated into the Treaty of Versailles in 1919 with its headquarters located in Geneva.",
          de: "Die Satzung des Voelkerbundes wurde 1919 in den Versailler Vertrag aufgenommen, mit Sitz in Genf.",
          pl: "Pakt Ligi Narodów został włączony do traktatu wersalskiego w 1919 roku, a główną siedzibą organizacji została szwajcarska Genewa.",
        },
        source: "https://www.ungeneva.org/en/about/league-of-nations",
      },
      {
        text: {
          en: "The Peace Palace in The Hague was completed in 1913 to serve as the seat of the Permanent Court of Arbitration.",
          de: "Der Friedenspalast in Den Haag wurde 1913 vollendet und dient als Sitz des Staendigen Schiedshofs und des IGH.",
          pl: "Pałac Pokoju w Hadze ukończony w 1913 roku stanowi siedzibę Stałego Trybunału Rozjemczego oraz Międzynarodowego Trybunału Sprawiedliwości.",
        },
        source: "https://www.vredespaleis.nl/building/history/?lang=en",
      },
    ],
    simplified: [
      {
        en: "We explain the outbreak of war as a mechanical failure of secret alliance tripwires and rigid mobilization plans.",
        de: "Wir erklaeren den Kriegsausbruch als verhaengnisvolles Versagen geheimer Buendnisse und starrer Plaene.",
        pl: "Wyjaśniamy wybuch wojny jako fatalny skutek tajnych sojuszy i sztywnych wojskowych planów mobilizacyjnych.",
      },
      {
        en: "We focus on the breakdown and subsequent rebuilding of international diplomatic mechanisms.",
        de: "Wir beleuchten das Scheitern und den Wiederaufbau diplomatischer Institutionen.",
        pl: "Skupiamy się na załamaniu, a następnie próbie odbudowy międzynarodowych mechanizmów dyplomacji.",
      },
      {
        en: "We strictly avoid graphic depictions of bodily trauma, highlighting instead the imperative of peaceful dispute arbitration.",
        de: "Wir verzichten auf drastische Bilder und betonen die Bedeutung friedlicher Schlichtung von Streitigkeiten.",
        pl: "Unikamy drastycznych opisów wojennych, akcentując konieczność pokojowego rozstrzygania sporów.",
      },
    ],
  },
};
