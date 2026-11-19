import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  RuinsOfEuropeDiagram,
  SchumanDeclarationDiagram,
  CoalAndSteelVatsDiagram,
  RebuiltRailwayBridgeDiagram,
  EuropeanUnionStarsDiagram,
} from "./rebuilding.diagrams";
import { RebuildingToy } from "./rebuilding.toy";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <RebuildingToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <RebuildingToy lang={lang} mode="quiz" onDone={() => onAnswer(true)} />;
}

export const lesson: Lesson = {
  id: "rebuilding",
  story: [
    animatedBeat(
      [
        T(
          "In 1945, after years of war, cities, factories, and railway bridges across Europe lay in ruins.",
          "Im Jahr 1945 lagen Staedte, Fabriken und Eisenbahnbruecken quer durch Europa in Truemmern.",
          "W 1945 roku, po latach wyniszczającej wojny, miasta, fabryki i mosty kolejowe w całej Europie leżały w gruzach.",
        ),
        T(
          "Families had lost their homes, and children needed warm clothes, shelter, and school books.",
          "Familien hatten ihr Zuhause verloren und Kinder brauchten warme Kleidung, Schutz und Buecher.",
          "Rodziny straciły dach nad głową, a dzieci potrzebowały ciepłych ubrań, schronienia i podręczników.",
        ),
        T(
          "After past conflicts, victorious nations had demanded harsh revenge and crippling financial penalties.",
          "Nach frueheren Kriegen hatten die Sieger oft harte Strafen und Reparationen gefordert.",
          "Po dawnych konfliktach zwycięskie kraje często domagały się odwetu i nakładały rujnujące kary.",
        ),
        T(
          "Wise thinkers realized that continuing endless cycles of bitterness would only bring future misery.",
          "Kluge Denker erkannten: Endlose Bitterkeit wuerde nur neue Not bringen.",
          "Mądrzy przywódcy zrozumieli, że powtarzanie cyklu wrogości przyniesie jedynie kolejne cierpienia.",
        ),
      ],
      RuinsOfEuropeDiagram,
    ),
    animatedBeat(
      [
        T(
          "On May 9, 1950, French foreign minister Robert Schuman announced an ingenious plan.",
          "Am 9. Mai 1950 verkuendete der franzoesische Aussenminister Robert Schuman einen genialen Plan.",
          "9 maja 1950 roku francuski minister spraw zagranicznych Robert Schuman ogłosił przełomowy plan.",
        ),
        T(
          "Together with economist Jean Monnet, he proposed pooling French and German coal and steel together.",
          "Gemeinsam mit Jean Monnet schlug er vor, franzoesische und deutsche Kohle und Stahl zusammenzulegen.",
          "Wraz z ekonomistą Jeanem Monnetem zaproponował połączenie francuskiej i niemieckiej produkcji węgla i stali.",
        ),
        T(
          "Coal was the essential fuel for home heating, and steel was the essential metal for building trains.",
          "Kohle war der Brennstoff zum Heizen und Stahl das Metall zum Bau von Zuegen und Bruecken.",
          "Węgiel był niezbędny do ogrzewania domów, a stal stanowiła podstawowy surowiec do odbudowy kolei i mostów.",
        ),
        T(
          "Because neither country could build weapons without coal and steel, pooling them made war impossible.",
          "Da man ohne Kohle und Stahl keine Waffen schmieden kann, machte das Teilen einen Krieg unmoeglich.",
          "Ponieważ bez węgla i stali nie można produkować broni, wspólne zarządzanie nimi czyniło wojnę niemożliwą.",
        ),
      ],
      SchumanDeclarationDiagram,
    ),
    animatedBeat(
      [
        T(
          "In 1951, France, Germany, Italy, Belgium, the Netherlands, and Luxembourg signed the historic treaty.",
          "1951 unterzeichneten Frankreich, Deutschland, Italien und die Benelux-Staaten den Vertrag.",
          "W 1951 roku Francja, Niemcy, Włochy, Belgia, Holandia i Luksemburg podpisały historyczny traktat.",
        ),
        T(
          "They created the European Coal and Steel Community (*EGKS*), governed by a shared council.",
          "Sie gruendeten die Europaeische Gemeinschaft fuer Kohle und Stahl (*EGKS*) unter gemeinsamer Aufsicht.",
          "Utworzyły one Europejską Wspólnotę Węgla i Stali (*EWWiS*), zarządzaną przez wspólny organ nadzorczy.",
        ),
        T(
          "For the first time in history, sovereign nations handed control of their heavy industries to a common European body.",
          "Erstmals uebertrugen souveraene Staaten die Kontrolle ihrer Schluesselindustrie an eine europaeische Behoerde.",
          "Po raz pierwszy w historii suwerenne kraje przekazały kontrolę nad strategicznym przemysłem wspólnej instytucji.",
        ),
        T(
          "Instead of secretly hoarding weapons, neighbors worked side by side in the mines and foundries.",
          "Statt heimlich Waffen zu horten, arbeiteten die Nachbarn Seite an Seite in Zechen und Huetten.",
          "Zamiast potajemnie gromadzić broń, sąsiedzi pracowali ramię w ramię w kopalniach i hutach.",
        ),
      ],
      CoalAndSteelVatsDiagram,
    ),
    animatedBeat(
      [
        T(
          "With shared steel and energy, workers rebuilt broken railway bridges across the Rhine river.",
          "Mit gemeinsamem Stahl und Strom bauten Arbeiter zerstoerte Eisenbahnbruecken ueber den Rhein auf.",
          "Dzięki wspólnej stali i energii robotnicy odbudowali zniszczone mosty kolejowe na Renie.",
        ),
        T(
          "New freight trains carried clean water pipes, bricks, and medicine to recovering communities.",
          "Gueterzuege brachten Wasserrohre, Ziegelsteine und Medikamente in die Doerfer und Staedte.",
          "Nowe pociągi towarowe przewoziły rury wodociągowe, cegły i lekarstwa do odbudowujących się miast.",
        ),
        T(
          "In 1963, Charles de Gaulle and Konrad Adenauer signed the Elysee Treaty of friendship and *reconciliation*.",
          "1963 unterzeichneten Charles de Gaulle und Konrad Adenauer den Elysee-Vertrag der *Versoehnung*.",
          "W 1963 roku Charles de Gaulle i Konrad Adenauer podpisali Traktat Elizejski o przyjaźni i *pojednaniu*.",
        ),
        T(
          "Former bitter battlefield enemies pledged to become trusted lifelong friends and partners.",
          "Fruehere Feinde versprachen feierlich, vertraute Freunde und Partner fürs Leben zu werden.",
          "Dawni wrogowie z pól bitewnych złożyli uroczystą obietnicę trwałego partnerstwa i przyjaźni.",
        ),
      ],
      RebuiltRailwayBridgeDiagram,
    ),
    animatedBeat(
      [
        T(
          "This magnificent cooperative foundation blossomed into the modern *European Union*.",
          "Dieses buendnisvolle Fundament wuchs zur heutigen *Europaeischen Union* heran.",
          "Ten solidny fundament współpracy przekształcił się w nowoczesną *Unię Europejską*.",
        ),
        T(
          "Today, the EU unites twenty-seven democratic nations in an area of shared peace, freedom, and law.",
          "Heute vereint die EU siebenundzwanzig Demokratien in einem Raum des Friedens, des Rechts und der Freiheit.",
          "Dziś Unia Europejska łączy dwadzieścia siedem demokratycznych państw w przestrzeni wolności, prawa i pokoju.",
        ),
        T(
          "Under the Schengen Agreement, families travel across international borders without passports or guards.",
          "Dank Schengen reisen Familien ohne Passkontrollen oder Grenzposten durch die Nachbarlaender.",
          "Dzięki układowi z Schengen rodziny podróżują między państwami bez kontroli paszportowych i szlabanów granicznych.",
        ),
        T(
          "Rebuilding proved that sharing resources and working together can transform rivalry into eternal peace.",
          "Der Wiederaufbau bewies: Gemeinsames Teilen kann jahrhundertealte Feindschaft in Frieden verwandeln.",
          "Odbudowa udowodniła, że dzielenie się zasobami i współpraca potrafią przekształcić dawną rywalizację w trwały pokój.",
        ),
      ],
      EuropeanUnionStarsDiagram,
    ),
  ],
  toyIntro: T(
    "Pool coal and steel resources to install the four girders of the European Peace Bridge.",
    "Bringe Kohle und Stahl zusammen, um die vier Traeger der europaeischen Friedensbruecke einzubauen.",
    "Połącz zasoby węgla i stali, aby zamontować cztery dźwigary europejskiego Mostu Pokoju.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why did European leaders pool their coal and steel production in 1950?",
        "Warum legten europaeische Politiker 1950 ihre Kohle- und Stahlproduktion zusammen?",
        "Dlaczego europejscy przywódcy połączyli produkcję węgla i stali w 1950 roku?",
      ),
      options: [
        {
          text: T(
            "To rebuild broken infrastructure and make war between historic rivals materially impossible",
            "Um Bruecken wieder aufzubauen und einen Krieg zwischen Nachbarn materiell unmoeglich zu machen",
            "Aby odbudować infrastrukturę i uczynić wojnę między sąsiadami materialnie niemożliwą",
          ),
          correct: true,
        },
        {
          text: T(
            "To build a skyscraper reaching all the way to the moon",
            "Um einen Wolkenkratzer bis zum Mond zu bauen",
            "Aby zbudować wieżowiec sięgający aż na Księżyc",
          ),
        },
        {
          text: T(
            "To manufacture twelve million miniature tin whistles for ducks",
            "Um zwoelf Millionen Blechpfeifen fuer Enten herzustellen",
            "Aby wyprodukować dwanaście milionów miniaturowych gwizdków dla kaczek",
          ),
        },
      ],
      hint: T(
        "Because steel and coal were required to build weapons, pooling them ensured mutual security.",
        "Weil man fuer Waffen Stahl und Kohle braucht, sicherte das Teilen den Frieden ab.",
        "Ponieważ produkcja broni wymaga węgla i stali, ich wspólna kontrola gwarantowała pokój.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What did the 1963 Elysee Treaty between France and Germany accomplish?",
        "Was bewirkte der Elysee-Vertrag von 1963 zwischen Frankreich und Deutschland?",
        "Co osiągnięto na mocy Traktatu Elizejskiego z 1963 roku między Francją a Niemcami?",
      ),
      options: [
        {
          text: T(
            "It sealed permanent friendship, youth exchange, and reconciliation between former adversaries",
            "Er besiegelte dauerhafte Freundschaft, Jugendaustausch und Versoehnung zwischen frueheren Gegnern",
            "Przypieczętował trwałą przyjaźń, wymianę młodzieży i pojednanie między dawnymi wrogami",
          ),
          correct: true,
        },
        {
          text: T(
            "It made singing lullabies to sheep compulsory on Sundays",
            "Er machte das Singen von Schlafliedern fuer Schafe an Sonntagen zur Pflicht",
            "Wprowadził obowiązek śpiewania kołysanek owcom w każdą niedzielę",
          ),
        },
        {
          text: T(
            "It ordered all school chalkboards to be replaced with blueberry pies",
            "Er ordnete an, alle Schultafeln durch Blaubeerkuchen zu ersetzen",
            "Nakazał wymianę wszystkich tablic szkolnych na placki jagodowe",
          ),
        },
      ],
      hint: T(
        "Konrad Adenauer and Charles de Gaulle established a lasting partnership of reconciliation.",
        "Konrad Adenauer und Charles de Gaulle begruendeten eine feste Partnerschaft der Versoehnung.",
        "Konrad Adenauer i Charles de Gaulle przypieczętowali historyczne pojednanie narodów.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Select 'Pooled Coal & Steel (EGKS)' and install all 4 steel beams to connect the European Peace Bridge.",
        "Waehle Montanunion (EGKS) und baue alle 4 Stahlträger ein, um die Bruecke zu vollenden.",
        "Wybierz 'Wspólnotę Węgla i Stali (EWWiS)' i zamontuj wszystkie 4 dźwigary, by ukończyć Most Pokoju.",
      ),
      Widget,
      hint: T(
        "Click Montanunion, then click + Connect Steel Beam until all 4 are placed, and tap check.",
        "Klicke auf Montanunion, dann auf Träger einbauen bis alle 4 sitzen, und tippe auf pruefen.",
        "Wybierz Wspólnotę Węgla i Stali, następnie dodawaj dźwigary, aż zamontujesz wszystkie 4, i kliknij sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, isn't it wonderful that we can drive to France or the Netherlands without stopping at any border guard?",
    "Papa, ist es nicht wunderbar, dass wir nach Frankreich oder Holland fahren koennen, ohne an einer Grenze zu stoppen?",
    "Tato, czy to nie niezwykłe, że możemy pojechać na wakacje do Czech, Niemiec czy Włoch bez kontroli granicznych?",
  ),
  realLife: {
    title: {
      en: "The European Union and Schengen",
      de: "Die Europaeische Union und Schengen",
      pl: "Polska w Unii Europejskiej i strefie Schengen",
    },
    body: {
      en: "Today, twenty-seven European democracies belong to the European Union, representing 450 million citizens. The Schengen Agreement eliminated border controls across most of Europe, while the Erasmus program enables hundreds of thousands of students each year to study abroad in neighboring countries, fostering deep international friendship.",
      de: "Heute gehoeren siebenundzwanzig Demokratien mit 450 Millionen Buergern zur Europaeischen Union. Das Schengener Abkommen schaffte Grenzkontrollen ab, und das Erasmus-Programm ermoeglicht es hunderttausenden jungen Menschen jedes Jahr, im Nachbarland zu studieren und Freundschaften zu schliessen.",
      pl: "Dzisiaj do Unii Europejskiej należy 27 demokratycznych państw, reprezentujących 450 milionów obywateli. Wejście Polski do UE 1 maja 2004 roku oraz dołączenie do strefy Schengen w 2007 roku zniosło kontrole na granicach z sąsiadami, a unijny program Erasmus umożliwia młodzieży bezpłatne studiowanie i zdobywanie doświadczenia w całej Europie.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "The Schuman Declaration was delivered by French Foreign Minister Robert Schuman on 9 May 1950.",
          de: "Die Schuman-Erklaerung wurde am 9. Mai 1950 vom franzoesischen Aussenminister Robert Schuman vorgetragen.",
          pl: "Deklaracja Schumana została ogłoszona przez francuskiego ministra spraw zagranicznych Roberta Schumana w dniu 9 maja 1950 roku.",
        },
        source:
          "https://european-union.europa.eu/principles-countries-history/history-eu/1945-59/schuman-declaration-may-1950_en",
      },
      {
        text: {
          en: "The Treaty of Paris establishing the European Coal and Steel Community (ECSC) was signed in April 1951 by six founding nations.",
          de: "Der Vertrag zur Gruendung der EGKS wurde im April 1951 von sechs Gruendungsstaaten in Paris unterzeichnet.",
          pl: "Traktat paryski powołujący Europejską Wspólnotę Węgla i Stali (EWWiS) został podpisany w kwietniu 1951 roku przez sześć państw założycielskich.",
        },
        source:
          "https://eur-lex.europa.eu/EN/legal-content/summary/treaty-establishing-the-european-coal-and-steel-community-ecsc-treaty.html",
      },
      {
        text: {
          en: "The Elysee Treaty was signed on 22 January 1963 by Charles de Gaulle and Konrad Adenauer to establish Franco-German cooperation.",
          de: "Der Elysee-Vertrag wurde am 22. Januar 1963 von Charles de Gaulle und Konrad Adenauer zur deutsch-franzoesischen Freundschaft besiegelt.",
          pl: "Traktat Elizejski został podpisany 22 stycznia 1963 roku przez Charles'a de Gaulle'a i Konrada Adenauera, ustanawiając historyczne pojednanie.",
        },
        source:
          "https://www.bundesregierung.de/breg-de/themen/deutsch-franzoesische-zusammenarbeit/der-elysee-vertrag-394246",
      },
      {
        text: {
          en: "The Schengen Agreement was originally signed in 1985 in Schengen, Luxembourg, to abolish internal border checks.",
          de: "Das Schengener Abkommen wurde 1985 in Schengen (Luxemburg) geschlossen, um Binnengrenzkontrollen abzuschaffen.",
          pl: "Układ z Schengen został zawarty w 1985 roku, a Polska dołączyła do strefy Schengen w grudniu 2007 roku, otwierając granice.",
        },
        source:
          "https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/schengen-area_en",
      },
      {
        text: {
          en: "The European Union was awarded the Nobel Peace Prize in 2012 for advancing peace, reconciliation, democracy, and human rights.",
          de: "Die Europaeische Union erhielt 2012 den Friedensnobelpreis fuer ihren Einsatz fuer Frieden, Versoehnung und Demokratie.",
          pl: "Unia Europejska otrzymała Pokojową Nagrodę Nobla w 2012 roku za wkład w pojednanie, pokój, demokrację i prawa człowieka w Europie.",
        },
        source: "https://www.nobelprize.org/prizes/peace/2012/summary/",
      },
    ],
    simplified: [
      {
        en: "We explain European integration through the tangible physical materials of coal energy and steel bridges.",
        de: "Wir erklaeren europaeische Einigung anfassbar ueber Kohle zum Heizen und Stahl fuer Bruecken.",
        pl: "Wyjaśniamy integrację europejską przez pryzmat konkretnych surowców: węgla do ogrzewania i stali na mosty.",
      },
      {
        en: "We demonstrate how sharing critical economic resources removes the physical capacity for war.",
        de: "Wir zeigen, wie das Teilen lebenswichtiger Ressourcen die materielle Moeglichkeit fuer Kriege nimmt.",
        pl: "Pokazujemy, jak wspólne zarządzanie surowcami strategicznymi uniemożliwia wywołanie wojny.",
      },
      {
        en: "We connect post-war reconciliation directly to modern everyday benefits like borderless European travel.",
        de: "Wir verbinden Nachkriegsversoehnung direkt mit heutigen Vorteilen wie grenzfreiem Reisen.",
        pl: "Łączymy powojenne pojednanie bezpośrednio z codziennymi korzyściami, takimi jak podróżowanie bez granic.",
      },
    ],
  },
};
