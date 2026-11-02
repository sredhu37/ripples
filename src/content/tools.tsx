import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  MusclePlowDiagram,
  WindWaterMillDiagram,
  BoilingKettlePistonDiagram,
  JamesWattEngineDiagram,
  SteamLocomotiveTrainDiagram,
} from "./tools.diagrams";
import { ToolsToy } from "./tools.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <ToolsToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <ToolsToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "tools",
  story: [
    animatedBeat(
      [
        T(
          "For thousands of years, every stone cut, field plowed, and wall built was limited by muscle power.",
          "Jahrtausende lang war jeder gehauene Stein und jeder gepfluegte Acker durch Muskelkraft begrenzt."
        ),
        T(
          "Farmers pushed heavy wooden plows by hand or hitched oxen and horses to pull through thick clay.",
          "Bauern schoben schwere Holzpfluege von Hand oder spannten Ochsen und Pferde vor das Gespann."
        ),
        T(
          "Even with animals, work was slow and exhausting. When muscles grew tired, all work had to stop.",
          "Selbst mit Tieren war die Arbeit muehsam. Wenn die Kraefte schwanden, stand alles still."
        ),
      ],
      MusclePlowDiagram
    ),
    animatedBeat(
      [
        T(
          "Clever builders learned to capture wind for sailing ships and water currents to turn mill wheels.",
          "Kluge Baumeister nutzten den Wind fuer Segelschiffe und Wasserstroeme fuer Muehlraeder."
        ),
        T(
          "Waterwheels ground grain into flour and sawed timber, but they depended completely on the weather.",
          "Wasserraeder mahlten Korn zu Mehl und saegten Holz, doch sie hingen voellig vom Wetter ab."
        ),
        T(
          "In freezing winters rivers iced over, and during dry summers water levels dropped to a trickle.",
          "Im eisigen Winter fror der Fluss zu, und im trockenen Sommer floss oft nur ein kleines Rinnsal."
        ),
      ],
      WindWaterMillDiagram
    ),
    animatedBeat(
      [
        T(
          "Inventors noticed that heating water in a closed pot creates tremendous expansion pressure.",
          "Erfinder bemerkten, dass erhitztes Wasser in einem geschlossenen Kessel gewaltigen Druck erzeugt."
        ),
        T(
          "When water boils into steam, it expands to take up over one thousand times more volume than liquid.",
          "Wenn Wasser zu Dampf kocht, dehnt es sich auf das ueber tausendfache Volumen aus."
        ),
        T(
          "Thomas Newcomen built an early *steam engine* to pump flooding water out of deep coal mines.",
          "Thomas Newcomen baute eine fruehe *Dampfmaschine*, um Grubenwasser aus Bergwerken zu pumpen."
        ),
      ],
      BoilingKettlePistonDiagram
    ),
    animatedBeat(
      [
        T(
          "In Scotland, James Watt dramatically improved the design with a separate cooling condenser.",
          "In Schottland verbesserte James Watt den Entwurf entscheidend durch einen getrennten Kondensator."
        ),
        T(
          "Instead of only pumping up and down, Watt designed gears to produce continuous *rotary motion*.",
          "Statt nur auf und ab zu pumpen, erzeugte Watts Maschine eine gleichmaessige *Drehbewegung*."
        ),
        T(
          "Now a steam engine could turn spinning wheels and factory shafts day and night without stopping.",
          "Nun konnte eine Dampfmaschine Spinnraeder und Fabrikwellen Tag und Nacht zuverlaessig drehen."
        ),
      ],
      JamesWattEngineDiagram
    ),
    animatedBeat(
      [
        T(
          "Steam power sparked the *Industrial Revolution*, reshaping manufacturing, travel, and cities.",
          "Die Dampfkraft entfachte die *Industrielle Revolution* und veraenderte Handwerk, Reisen und Staedte."
        ),
        T(
          "Steam locomotives carried grain, coal, and passengers across vast countries in just hours.",
          "Dampflokomotiven transportierten Getreide, Kohle und Fahrgaeste in wenigen Stunden ueber Land."
        ),
        T(
          "Humanity had stepped beyond muscle power into an era of tireless mechanical energy.",
          "Die Menschheit liess die reine Muskelkraft hinter sich und betrat das Zeitalter der Maschinen."
        ),
      ],
      SteamLocomotiveTrainDiagram
    ),
  ],
  toyIntro: T(
    "Choose a power source and run the steam engine with coal and water to produce continuous power.",
    "Waehle eine Kraftquelle und betreibe die Dampfmaschine mit Kohle und Wasser fuer dauerhafte Kraft."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why did waterwheels sometimes stop working before steam engines were invented?",
        "Warum standen Wasserraeder manchmal still, bevor Dampfmaschinen erfunden wurden?"
      ),
      options: [
        {
          text: T(
            "Rivers could freeze in winter or dry up during hot summers",
            "Fluesse konnten im Winter zufrieren oder im Sommer austrocknen"
          ),
          correct: true,
        },
        {
          text: T(
            "Fish refused to let the water turn the wooden blades",
            "Fische weigerten sich, das Wasser an die Holzschaufeln zu lassen"
          ),
        },
        {
          text: T(
            "The wheels had to be tucked into bed for an afternoon nap",
            "Die Raeder mussten sich fuer einen Mittagsschlaf ins Bett legen"
          ),
        },
      ],
      hint: T(
        "Waterwheels depended on river flow, which changed with seasons and weather.",
        "Wasserraeder hingen vom Fluss ab, der sich je nach Jahreszeit veraenderte."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "What key improvement did James Watt make to the steam engine?",
        "Welche wichtige Verbesserung erfand James Watt fuer die Dampfmaschine?"
      ),
      options: [
        {
          text: T(
            "He created a separate condenser and converted piston strokes into rotary motion",
            "Er baute einen getrennten Kondensator und wandelte Hubbewegungen in Drehbewegung um"
          ),
          correct: true,
        },
        {
          text: T(
            "He painted the boilers purple so they ran faster on Tuesdays",
            "Er strich die Kessel lila an, damit sie dienstags schneller liefen"
          ),
        },
        {
          text: T(
            "He replaced coal with scoops of vanilla ice cream",
            "Er ersetzte die Kohle durch Loeffel voller Vanilleeis"
          ),
        },
      ],
      hint: T(
        "Watt made the engine far more efficient and capable of turning factory wheels.",
        "Watt machte die Maschine viel sparsamer und liess sie Fabrikraeder drehen."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Switch to the Steam Engine, add coal to the furnace, and fill the boiler with water.",
        "Waehle die Dampfmaschine, gib Kohle in den Ofen und fuelle den Kessel mit Wasser."
      ),
      Widget: Widget,
      hint: T(
        "Click Steam Engine, activate both coal fuel and boiler water, then tap check.",
        "Klicke auf Dampfmaschine, aktiviere Kohle und Wasser, und tippe auf pruefen."
      ),
    },
  ],
  askDad: T(
    "Papa, how did people travel long distances before steam trains and cars were invented?",
    "Papa, wie sind die Menschen weite Strecken gereist, bevor es Dampfzuege und Autos gab?"
  ),
  realLife: {
    title: T("Historic Steam Railways in Germany", "Historische Dampfeisenbahnen in Deutschland"),
    body: T(
      "In Germany, preserved steam locomotives still climb the scenic Harz mountains on the Harzer Schmalspurbahnen, and historic engines are maintained at the Eisenbahnmuseum Bochum-Dahlhausen. These giant machines demonstrate how boiling water and hot coal transformed transport across continents.",
      "In Deutschland dampfen historische Lokomotiven noch heute auf den Harzer Schmalspurbahnen durch die Berge, und im Eisenbahnmuseum Bochum-Dahlhausen kann man Dampfriesen bestaunen. Diese Maschinen zeigen eindrucksvoll, wie heisses Wasser und Kohle das Reisen fuer immer veraendert haben."
    ),
  },
  factCard: {
    claims: [
      {
        text: "Thomas Newcomen built the first practical atmospheric steam engine in 1712 for draining flooded coal mines.",
        source: "https://www.britannica.com/technology/Newcomen-steam-engine",
      },
      {
        text: "James Watt patented his separate condenser steam engine in 1769, drastically cutting fuel consumption.",
        source: "https://www.britannica.com/biography/James-Watt",
      },
      {
        text: "Watt adapted his engine in 1781 to produce continuous rotary motion, enabling factories to run machinery.",
        source: "https://www.sciencemuseum.org.uk/objects-and-stories/james-watt-and-steam-engine",
      },
      {
        text: "George Stephenson's Rocket won the Rainhill Trials in 1829, establishing steam locomotives on public railways.",
        source: "https://www.railwaymuseum.org.uk/objects-and-stories/stephensons-rocket",
      },
      {
        text: "The Adler steam locomotive inaugurated Germany's first passenger railway between Nuremberg and Fuerth in 1835.",
        source: "https://www.dbmuseum.de/museum_de/unser-museum/ausstellungen/adler",
      },
    ],
    simplified: [
      "We explain mechanical energy through the simple expansion of boiling water into steam.",
      "We contrast weather-dependent waterwheels with continuous fuel-powered steam engines.",
      "We highlight James Watt's breakthrough in turning pumping strokes into rotary wheel motion.",
    ],
  },
};
