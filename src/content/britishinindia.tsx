import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  CharteredSealDiagram,
  CompanyFortressDiagram,
  VillageHandloomDiagram,
  IndustrialLoomManchesterDiagram,
  RailwayExportPortDiagram,
} from "./britishinindia.diagrams";
import { BritishInIndiaToy } from "./britishinindia.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <BritishInIndiaToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <BritishInIndiaToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "britishinindia",
  story: [
    animatedBeat(
      [
        T(
          "In 1600, Queen Elizabeth I signed a royal charter creating the British East India Company.",
          "Im Jahr 1600 unterzeichnete Koenigin Elisabeth I. den Freibrief fuer die Britische Ostindien-Kompanie."
        ),
        T(
          "It was not a nation or government, but a private *chartered company* owned by shareholders.",
          "Es war kein Staat oder Volk, sondern eine private *Handelskompanie* im Besitz von Aktionaeren."
        ),
        T(
          "Its goal was straightforward: make high profits by trading silk, tea, and spices.",
          "Ihr Ziel war klar: Hohe Gewinne durch den Handel mit Seide, Tee und Gewuerzen erwirtschaften."
        ),
        T(
          "At first, company merchants lived peacefully in coastal ports, paying rent to local rulers.",
          "Zunaechst lebten die Kaufleute friedlich in Kuestenhaefen und zahlten Pacht an die Herrscher."
        ),
      ],
      CharteredSealDiagram
    ),
    animatedBeat(
      [
        T(
          "Over time, the Company built stone bastions and recruited its own private army of soldiers.",
          "Mit der Zeit baute die Kompanie Steinbastionen und rekrutierte eine eigene Privatarmee."
        ),
        T(
          "In 1757, following the Battle of Plassey, the Company took over tax collection in Bengal.",
          "1757 uebernahm die Kompanie nach der Schlacht von Plassey das Recht der Steuereintreibung in Bengalen."
        ),
        T(
          "A private corporation now collected taxes from millions of farming families.",
          "Ein privates Unternehmen trieb nun Steuern von Millionen Bauernfamilien ein."
        ),
        T(
          "Profits flowed across the seas to company headquarters in London rather than staying local.",
          "Die Gewinne flossen ueber die Meere nach London, anstatt vor Ort reinvestiert zu werden."
        ),
      ],
      CompanyFortressDiagram
    ),
    animatedBeat(
      [
        T(
          "For centuries, Indian weavers had created the softest and finest cotton muslin in the world.",
          "Jahrhundertelang hatten indische Weber den weichsten und feinsten Baumwollmusselin gefertigt."
        ),
        T(
          "Almost every village had skilled weavers working intricate wooden handlooms.",
          "Fast jedes Dorf hatte geschickte Handwerker an hoelzernen Webstuehlen."
        ),
        T(
          "Their handloom textiles were treasured by families from Cairo to Tokyo and Amsterdam.",
          "Ihre Stoffe wurden von Familien von Kairo bis Tokio und Amsterdam geschaetzt."
        ),
        T(
          "These handcrafted traditions sustained vibrant rural communities and independent artisans.",
          "Dieses Kunsthandwerk ernaehrte ganze Doerfer und unabhaengige Familienbetriebe."
        ),
      ],
      VillageHandloomDiagram
    ),
    animatedBeat(
      [
        T(
          "In Britain, the Industrial Revolution created steam-powered spinning mills in Manchester.",
          "In Grossbritannien entstanden durch die Industrielle Revolution dampfbetriebene Spinnereien."
        ),
        T(
          "To protect these new mills, the British Parliament placed high tariffs on Indian cloth.",
          "Um diese Fabriken zu schuetzen, belegte das britische Parlament indische Stoffe mit hohen Zoellen."
        ),
        T(
          "Meanwhile, British factory-made cloth entered India with zero import taxes.",
          "Gleichzeitig durften britische Industriestoffe zollfrei nach Indien eingefuehrt werden."
        ),
        T(
          "Village handlooms could not compete against subsidized steam engines, and many shut down.",
          "Gegen die subventionierten Dampfmaschinen konnten Doerfer nicht bestehen; viele Webstuehle verstummten."
        ),
      ],
      IndustrialLoomManchesterDiagram
    ),
    animatedBeat(
      [
        T(
          "A massive railway network was laid across India, built with iron tracks and steam engines.",
          "Ein riesiges Eisenbahnnetz wurde gebaut, mit eisernen Gleisen und Dampflokomotiven."
        ),
        T(
          "The main tracks ran from inland cotton fields and coal mines straight to harbor export docks.",
          "Die Hauptstrecken fuehrten von Baumwollfeldern und Minen direkt zu den Ausfuhrhaefen."
        ),
        T(
          "The system prioritized resource *extraction* rather than local internal prosperity.",
          "Das System diente vor allem dem *Rohstoffexport* und weniger dem Wohlstand im Landesinneren."
        ),
        T(
          "In 1858, following widespread uprisings, the British Crown took direct control, establishing the *Raj*.",
          "1858 uebernahm die britische Krone nach Aufstaenden die direkte Macht: Die Zeit des *Raj* begann."
        ),
      ],
      RailwayExportPortDiagram
    ),
  ],
  toyIntro: T(
    "Compare unfair colonial monopoly tariffs with fair reciprocal trade between weavers and factories.",
    "Vergleiche einseitige Kolonialzoelle mit fairen Handelsregeln zwischen Webern und Fabriken."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What was the British East India Company originally?",
        "Was war die Britische Ostindien-Kompanie urspruenglich?"
      ),
      options: [
        {
          text: T(
            "A private corporation owned by shareholders seeking trade profits",
            "Ein privates Unternehmen im Besitz von Aktionaeren mit dem Ziel, Handelsgewinne zu erzielen"
          ),
          correct: true,
        },
        {
          text: T(
            "A charity that provided free bicycles to schoolchildren",
            "Eine Wohltatigkeitsorganisation, die Fahrraeder an Schueler verteilte"
          ),
        },
        {
          text: T(
            "An international sports team playing cricket in giant airships",
            "Ein internationales Sportteam, das Cricket auf Luftschiffen spielte"
          ),
        },
      ],
      hint: T(
        "It was created by a royal charter as a joint-stock business enterprise.",
        "Sie entstand durch einen Freibrief als fruehe Aktiengesellschaft."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "How did one-sided trade rules harm local village handlooms?",
        "Wie schadeten einseitige Zollregeln den Doerfern und ihren Handwebstuehlen?"
      ),
      options: [
        {
          text: T(
            "High tariffs taxed Indian cloth exports, while British factory goods entered without taxes",
            "Hohe Zoelle verteuerten indische Exporte, waehrend britische Fabrikwaren zollfrei blieben"
          ),
          correct: true,
        },
        {
          text: T(
            "All cotton plants turned into broccoli overnight",
            "Alle Baumwollpflanzen verwandelten sich ueber Nacht in Brokkoli"
          ),
        },
        {
          text: T(
            "The rivers began flowing backwards into the mountain peaks",
            "Die Fluesse begannen rueckwaerts in die Berge hinaufzufliessen"
          ),
        },
      ],
      hint: T(
        "Tariff imbalances made handmade cloth artificially expensive in world markets.",
        "Zollunterschiede machten handgewebte Stoffe auf den Maerkten kuenstlich teuer."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Switch trade policy to 'Fair Reciprocal Trade' to balance tariffs and allow weavers to thrive.",
        "Schalte auf 'Faire Handelsbedingungen' um, damit die Dorfweber wieder aufbluehen koennen."
      ),
      Widget: Widget,
      hint: T(
        "Click the Fair Reciprocal Trade button and tap check.",
        "Klicke auf Faire Handelsbedingungen und tippe auf pruefen."
      ),
    },
  ],
  askDad: T(
    "Papa, why is it important for countries today to trade fairly so both sides benefit equally?",
    "Papa, warum ist es fuer Laender heute so wichtig, fair zu handeln, damit beide Seiten gewinnen?"
  ),
  realLife: {
    title: T("Colonial Trade History in Museums", "Koloniale Handelsgeschichte im Museum"),
    body: T(
      "The Deutsches Historisches Museum (DHM) in Berlin and the Victoria Memorial in Kolkata preserve historical shipping ledgers, textile swatches, and currency tokens from the East India Company era. Historians study these primary records to explain how trade monopolies and tariffs affected global economic development.",
      "Das Deutsche Historische Museum in Berlin und das Victoria Memorial in Kolkata bewahren Frachtbuecher, Stoffmuster und Handelsmuenzen aus der Zeit der Ostindien-Kompanie auf. Historiker erforschen diese Originaldokumente, um die Auswirkungen von Monopolen und Zoellen zu verstehen."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The East India Company was granted an exclusive English trade monopoly charter by Queen Elizabeth I on 31 December 1600.",
        source: "https://www.britannica.com/topic/East-India-Company",
      },
      {
        text: "The Company acquired the Diwani (revenue collection rights) over Bengal following the Treaty of Allahabad in 1765.",
        source: "https://www.britannica.com/event/Treaty-of-Allahabad",
      },
      {
        text: "Indian share of world industrial manufacturing dropped from approximately 25 percent in 1750 to under 3 percent by 1900.",
        source: "https://www.cambridge.org/core/books/economic-history-of-india-18571947/72F18A370EF5EF4C2161A28A6993CEF7",
      },
      {
        text: "The Government of India Act 1858 transferred corporate control from the East India Company directly to the British Crown.",
        source: "https://www.britannica.com/topic/Government-of-India-Act-1858",
      },
      {
        text: "Railway construction in colonial India connected interior agricultural hinterlands directly to coastal export ports.",
        source: "https://www.cambridge.org/core/books/railways-in-modern-india/E341F758C5A3764831B39F29E0436FF0",
      },
    ],
    simplified: [
      "We explain the East India Company as a private chartered business corporation driven by shareholder dividends.",
      "We show how tariff policies affected artisan cottage industries and factory production.",
      "We emphasize economic mechanisms and trade balance over caricature.",
    ],
  },
};
