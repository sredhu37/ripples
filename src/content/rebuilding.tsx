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

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <RebuildingToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <RebuildingToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "rebuilding",
  story: [
    animatedBeat(
      [
        T(
          "In 1945, after years of war, cities, factories, and railway bridges across Europe lay in ruins.",
          "Im Jahr 1945 lagen Staedte, Fabriken und Eisenbahnbruecken quer durch Europa in Truemmern."
        ),
        T(
          "Families had lost their homes, and children needed warm clothes, shelter, and school books.",
          "Familien hatten ihr Zuhause verloren und Kinder brauchten warme Kleidung, Schutz und Buecher."
        ),
        T(
          "After past conflicts, victorious nations had demanded harsh revenge and crippling financial penalties.",
          "Nach frueheren Kriegen hatten die Sieger oft harte Strafen und Reparationen gefordert."
        ),
        T(
          "Wise thinkers realized that continuing endless cycles of bitterness would only bring future misery.",
          "Kluge Denker erkannten: Endlose Bitterkeit wuerde nur neue Not bringen."
        ),
      ],
      RuinsOfEuropeDiagram
    ),
    animatedBeat(
      [
        T(
          "On May 9, 1950, French foreign minister Robert Schuman announced an ingenious plan.",
          "Am 9. Mai 1950 verkuendete der franzoesische Aussenminister Robert Schuman einen genialen Plan."
        ),
        T(
          "Together with economist Jean Monnet, he proposed pooling French and German coal and steel together.",
          "Gemeinsam mit Jean Monnet schlug er vor, franzoesische und deutsche Kohle und Stahl zusammenzulegen."
        ),
        T(
          "Coal was the essential fuel for home heating, and steel was the essential metal for building trains.",
          "Kohle war der Brennstoff zum Heizen und Stahl das Metall zum Bau von Zuegen und Bruecken."
        ),
        T(
          "Because neither country could build weapons without coal and steel, pooling them made war impossible.",
          "Da man ohne Kohle und Stahl keine Waffen schmieden kann, machte das Teilen einen Krieg unmoeglich."
        ),
      ],
      SchumanDeclarationDiagram
    ),
    animatedBeat(
      [
        T(
          "In 1951, France, Germany, Italy, Belgium, the Netherlands, and Luxembourg signed the historic treaty.",
          "1951 unterzeichneten Frankreich, Deutschland, Italien und die Benelux-Staaten den Vertrag."
        ),
        T(
          "They created the European Coal and Steel Community (*EGKS*), governed by a shared council.",
          "Sie gruendeten die Europaeische Gemeinschaft fuer Kohle und Stahl (*EGKS*) unter gemeinsamer Aufsicht."
        ),
        T(
          "For the first time in history, sovereign nations handed control of their heavy industries to a common European body.",
          "Erstmals uebertrugen souveraene Staaten die Kontrolle ihrer Schluesselindustrie an eine europaeische Behoerde."
        ),
        T(
          "Instead of secretly hoarding weapons, neighbors worked side by side in the mines and foundries.",
          "Statt heimlich Waffen zu horten, arbeiteten die Nachbarn Seite an Seite in Zechen und Huetten."
        ),
      ],
      CoalAndSteelVatsDiagram
    ),
    animatedBeat(
      [
        T(
          "With shared steel and energy, workers rebuilt broken railway bridges across the Rhine river.",
          "Mit gemeinsamem Stahl und Strom bauten Arbeiter zerstoerte Eisenbahnbruecken ueber den Rhein auf."
        ),
        T(
          "New freight trains carried clean water pipes, bricks, and medicine to recovering communities.",
          "Gueterzuege brachten Wasserrohre, Ziegelsteine und Medikamente in die Doerfer und Staedte."
        ),
        T(
          "In 1963, Charles de Gaulle and Konrad Adenauer signed the Elysee Treaty of friendship and *reconciliation*.",
          "1963 unterzeichneten Charles de Gaulle und Konrad Adenauer den Elysee-Vertrag der *Versoehnung*."
        ),
        T(
          "Former bitter battlefield enemies pledged to become trusted lifelong friends and partners.",
          "Fruehere Feinde versprachen feierlich, vertraute Freunde und Partner fürs Leben zu werden."
        ),
      ],
      RebuiltRailwayBridgeDiagram
    ),
    animatedBeat(
      [
        T(
          "This magnificent cooperative foundation blossomed into the modern *European Union*.",
          "Dieses buendnisvolle Fundament wuchs zur heutigen *Europaeischen Union* heran."
        ),
        T(
          "Today, the EU unites twenty-seven democratic nations in an area of shared peace, freedom, and law.",
          "Heute vereint die EU siebenundzwanzig Demokratien in einem Raum des Friedens, des Rechts und der Freiheit."
        ),
        T(
          "Under the Schengen Agreement, families travel across international borders without passports or guards.",
          "Dank Schengen reisen Familien ohne Passkontrollen oder Grenzposten durch die Nachbarlaender."
        ),
        T(
          "Rebuilding proved that sharing resources and working together can transform rivalry into eternal peace.",
          "Der Wiederaufbau bewies: Gemeinsames Teilen kann jahrhundertealte Feindschaft in Frieden verwandeln."
        ),
      ],
      EuropeanUnionStarsDiagram
    ),
  ],
  toyIntro: T(
    "Pool coal and steel resources to install the four girders of the European Peace Bridge.",
    "Bringe Kohle und Stahl zusammen, um die vier Traeger der europaeischen Friedensbruecke einzubauen."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why did European leaders pool their coal and steel production in 1950?",
        "Warum legten europaeische Politiker 1950 ihre Kohle- und Stahlproduktion zusammen?"
      ),
      options: [
        {
          text: T(
            "To rebuild broken infrastructure and make war between historic rivals materially impossible",
            "Um Bruecken wieder aufzubauen und einen Krieg zwischen Nachbarn materiell unmoeglich zu machen"
          ),
          correct: true,
        },
        {
          text: T(
            "To build a skyscraper reaching all the way to the moon",
            "Um einen Wolkenkratzer bis zum Mond zu bauen"
          ),
        },
        {
          text: T(
            "To manufacture twelve million miniature tin whistles for ducks",
            "Um zwoelf Millionen Blechpfeifen fuer Enten herzustellen"
          ),
        },
      ],
      hint: T(
        "Because steel and coal were required to build weapons, pooling them ensured mutual security.",
        "Weil man fuer Waffen Stahl und Kohle braucht, sicherte das Teilen den Frieden ab."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What did the 1963 Elysee Treaty between France and Germany accomplish?",
        "Was bewirkte der Elysee-Vertrag von 1963 zwischen Frankreich und Deutschland?"
      ),
      options: [
        {
          text: T(
            "It sealed permanent friendship, youth exchange, and reconciliation between former adversaries",
            "Er besiegelte dauerhafte Freundschaft, Jugendaustausch und Versoehnung zwischen frueheren Gegnern"
          ),
          correct: true,
        },
        {
          text: T(
            "It made singing lullabies to sheep compulsory on Sundays",
            "Er machte das Singen von Schlafliedern fuer Schafe an Sonntagen zur Pflicht"
          ),
        },
        {
          text: T(
            "It ordered all school chalkboards to be replaced with blueberry pies",
            "Er ordnete an, alle Schultafeln durch Blaubeerkuchen zu ersetzen"
          ),
        },
      ],
      hint: T(
        "Konrad Adenauer and Charles de Gaulle established a lasting partnership of reconciliation.",
        "Konrad Adenauer und Charles de Gaulle begruendeten eine feste Partnerschaft der Versoehnung."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Select 'Pooled Coal & Steel (EGKS)' and install all 4 steel beams to connect the European Peace Bridge.",
        "Waehle Montanunion (EGKS) und baue alle 4 Stahlträger ein, um die Bruecke zu vollenden."
      ),
      Widget: Widget,
      hint: T(
        "Click Montanunion, then click + Connect Steel Beam until all 4 are placed, and tap check.",
        "Klicke auf Montanunion, dann auf Träger einbauen bis alle 4 sitzen, und tippe auf pruefen."
      ),
    },
  ],
  askDad: T(
    "Papa, isn't it wonderful that we can drive to France or the Netherlands without stopping at any border guard?",
    "Papa, ist es nicht wunderbar, dass wir nach Frankreich oder Holland fahren koennen, ohne an einer Grenze zu stoppen?"
  ),
  realLife: {
    title: T("The European Union and Schengen", "Die Europaeische Union und Schengen"),
    body: T(
      "Today, twenty-seven European democracies belong to the European Union, representing 450 million citizens. The Schengen Agreement eliminated border controls across most of Europe, while the Erasmus program enables hundreds of thousands of students each year to study abroad in neighboring countries, fostering deep international friendship.",
      "Heute gehoeren siebenundzwanzig Demokratien mit 450 Millionen Buergern zur Europaeischen Union. Das Schengener Abkommen schaffte Grenzkontrollen ab, und das Erasmus-Programm ermoeglicht es hunderttausenden jungen Menschen jedes Jahr, im Nachbarland zu studieren und Freundschaften zu schliessen."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The Schuman Declaration was delivered by French Foreign Minister Robert Schuman on 9 May 1950.",
        source: "https://european-union.europa.eu/principles-countries-history/history-eu/1945-59/schuman-declaration-may-1950_en",
      },
      {
        text: "The Treaty of Paris establishing the European Coal and Steel Community (ECSC) was signed in April 1951 by six founding nations.",
        source: "https://eur-lex.europa.eu/EN/legal-content/summary/treaty-establishing-the-european-coal-and-steel-community-ecsc-treaty.html",
      },
      {
        text: "The Elysee Treaty was signed on 22 January 1963 by Charles de Gaulle and Konrad Adenauer to establish Franco-German cooperation.",
        source: "https://www.bundesregierung.de/breg-de/themen/deutsch-franzoesische-zusammenarbeit/der-elysee-vertrag-394246",
      },
      {
        text: "The Schengen Agreement was originally signed in 1985 in Schengen, Luxembourg, to abolish internal border checks.",
        source: "https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/schengen-area_en",
      },
      {
        text: "The European Union was awarded the Nobel Peace Prize in 2012 for advancing peace, reconciliation, democracy, and human rights.",
        source: "https://www.nobelprize.org/prizes/peace/2012/summary/",
      },
    ],
    simplified: [
      "We explain European integration through the tangible physical materials of coal energy and steel bridges.",
      "We demonstrate how sharing critical economic resources removes the physical capacity for war.",
      "We connect post-war reconciliation directly to modern everyday benefits like borderless European travel.",
    ],
  },
};
