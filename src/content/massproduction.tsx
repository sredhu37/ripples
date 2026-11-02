import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  ArtisanWorkshopDiagram,
  LuxuryPriceTagDiagram,
  InterchangeableGearsDiagram,
  MovingConveyorAssemblyDiagram,
  BicyclesForEveryoneDiagram,
} from "./massproduction.diagrams";
import { MassProductionToy } from "./massproduction.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <MassProductionToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <MassProductionToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "massproduction",
  story: [
    animatedBeat(
      [
        T(
          "Centuries ago, skilled craftsmen shaped every carriage, pocket watch, and leather boot by hand.",
          "Vor Jahrhunderten fertigten Handwerker jede Kutsche, Taschenuhr und jeden Stiefel einzeln von Hand an."
        ),
        T(
          "Master artisans measured and filed each metal cog to fit only one specific clock case.",
          "Meister feilten jedes Zahnrad passgenau zurecht, sodass es nur in dieses eine Gehaeuse passte."
        ),
        T(
          "If a part broke years later, a blacksmith had to custom-forge a unique replacement from scratch.",
          "Ging spaeter ein Teil kaputt, musste ein Schmied ein einzelnes Ersatzteil muehsam neu anfertigen."
        ),
      ],
      ArtisanWorkshopDiagram
    ),
    animatedBeat(
      [
        T(
          "Because handcrafting required weeks of labor, clocks and bicycles were extraordinarily expensive.",
          "Weil die Handarbeit Wochen dauerte, waren Uhren und Fahrraeder ausserordentlich teuer."
        ),
        T(
          "Only aristocrats and wealthy landowners could afford manufactured goods in their homes.",
          "Nur wohlhabende Kaufleute und Grundbesitzer konnten sich solche feinen Waren leisten."
        ),
        T(
          "Ordinary families had to wash clothes by hand and walk long miles on foot every single day.",
          "Einfache Familien mussten ihre Kleidung mit der Hand waschen und weite Strecken zu Fuss gehen."
        ),
      ],
      LuxuryPriceTagDiagram
    ),
    animatedBeat(
      [
        T(
          "In the nineteenth century, gunsmiths and toolmakers introduced *interchangeable parts*.",
          "Im neunzehnten Jahrhundert entwickelten Werkzeugmacher *austauschbare Bauteile*."
        ),
        T(
          "Instead of making unique one-off pieces, precision stamping machines made identical metal parts.",
          "Statt Einzelstuecken stanzten praezise Maschinen tausende vollkommen gleiche Bauteile."
        ),
        T(
          "Any gear or bolt could fit into any machine on the bench without filing or trimming.",
          "Jedes Zahnrad und jede Schraube passte nun ohne Feilen in jede Maschine auf der Werkbank."
        ),
      ],
      InterchangeableGearsDiagram
    ),
    animatedBeat(
      [
        T(
          "Automakers like Henry Ford combined standardized parts with the moving *assembly line*.",
          "Automobilpioniere wie Henry Ford verbanden Standardteile mit dem beweglichen *Fliessband*."
        ),
        T(
          "Instead of workers walking around collecting parts, a motorized conveyor belt brought work to them.",
          "Statt dass Arbeiter durch die Halle liefen, brachte ein Foerderband die Teile direkt zu ihnen."
        ),
        T(
          "Each worker mastered one specific task, completing complex assemblies in minutes instead of days.",
          "Jeder Arbeiter meisterte einen Handgriff und montierte Geraete in Minuten statt in Tagen."
        ),
      ],
      MovingConveyorAssemblyDiagram
    ),
    animatedBeat(
      [
        T(
          "This efficient process, known as *mass production*, caused the prices of everyday goods to plummet.",
          "Dieses Verfahren, die sogenannte *Massenfertigung*, liess die Preise fuer Alltagsgueter purzeln."
        ),
        T(
          "Suddenly, millions of working families could afford safety bicycles, sewing machines, and radios.",
          "Ploetzlich konnten sich Millionen von Familien Fahrraeder, Naehmaschinen und Radios leisten."
        ),
        T(
          "Standardization and assembly lines brought comfort and freedom to regular homes across the world.",
          "Standardisierung und Fliessbaender brachten Komfort und Freiheit in die Haushalte der Welt."
        ),
      ],
      BicyclesForEveryoneDiagram
    ),
  ],
  toyIntro: T(
    "Compare an artisan workshop to a moving assembly line and advance the line to make affordable bicycles.",
    "Vergleiche eine Werkstatt mit einem Fliessband und ruecke die Stationen vor, um guenstige Raeder zu bauen."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What are interchangeable parts in manufacturing?",
        "Was versteht man in der Fertigung unter austauschbaren Bauteilen?"
      ),
      options: [
        {
          text: T(
            "Identical standard components that fit into any unit without custom hand trimming",
            "Gleiche Standardteile, die ohne Nachfeilen in jedes hergestellte Geraet passen"
          ),
          correct: true,
        },
        {
          text: T(
            "Parts made of chocolate that melt whenever it begins to rain outside",
            "Bauteile aus Schokolade, die schmelzen, sobald es draussen regnet"
          ),
        },
        {
          text: T(
            "Screws that only turn when workers sing sea shanties together",
            "Schrauben, die sich nur drehen, wenn alle Arbeiter Seemannslieder singen"
          ),
        },
      ],
      hint: T(
        "Standard parts fit into any copy of the product, making assembly and repairs fast.",
        "Standardteile passen in jedes Exemplar und machen Montage und Reparatur schnell."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "How did the moving assembly line lower the price of manufactured goods?",
        "Wie senkte das Fliessband die Preise fuer hergestellte Waren?"
      ),
      options: [
        {
          text: T(
            "It sped up production so factories made ten times more goods in the same time",
            "Es beschleunigte die Arbeit, sodass Fabriken zehnmal mehr Waren in derselben Zeit bauten"
          ),
          correct: true,
        },
        {
          text: T(
            "It made products invisible so stores did not have to pay for lighting",
            "Es machte Waren unsichtbar, damit Geschaefte kein Licht bezahlen mussten"
          ),
        },
        {
          text: T(
            "It replaced factory workers with magical leaping rabbits",
            "Es ersetzte Fabrikarbeiter durch magische huepfende Kaninchen"
          ),
        },
      ],
      hint: T(
        "High efficiency and high volume drastically reduced the labor cost for each item.",
        "Hohe Effizienz und grosse Stueckzahlen senkten die Arbeitskosten pro Stueck gewaltig."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Select Moving Assembly Line and advance all three stations to produce bicycles at 50 coins each.",
        "Waehle Fliessband-Fertigung und ruecke alle drei Stationen vor, um Raeder fuer 50 Muenzen zu bauen."
      ),
      Widget: Widget,
      hint: T(
        "Click Moving Assembly Line, advance through frame, wheels, and inspection, then tap check.",
        "Klicke auf Fliessband, ruecke Rahmen, Raeder und Pruefung vor und tippe auf pruefen."
      ),
    },
  ],
  askDad: T(
    "Papa, why is it that today almost every store sells clothes in standard sizes like S, M, and L?",
    "Papa, warum verkaufen fast alle Geschaefte heute Kleidung in festen Groessen wie S, M und L?"
  ),
  realLife: {
    title: T("Automotive Assembly in Germany", "Automobilproduktion in Deutschland"),
    body: T(
      "In modern manufacturing plants in Wolfsburg, Sindelfingen, and Leipzig, high-precision assembly lines produce motor vehicles with millimeter accuracy. Thousands of standardized components arrive just in time to be installed by skilled workers and robotic systems, ensuring high reliability and efficiency.",
      "In modernen Autowerken in Wolfsburg, Sindelfingen und Leipzig fertigen Fliessbaender Fahrzeuge mit Millimetergenauigkeit. Tausende genormte Bauteile treffen puenktlich ein und werden von Fachkraeften und Robotern verbaut, was Qualitaet und Zuverlaessigkeit gewaehrleistet."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The concept of interchangeable parts was pioneered in the late eighteenth century by gunsmiths like Honore Blanc and Eli Whitney.",
        source: "https://www.britannica.com/technology/interchangeable-parts",
      },
      {
        text: "Henry Ford installed the first moving assembly line for mass automobile production at Highland Park in 1913.",
        source: "https://www.thehenryford.org/explore/stories-of-innovation/visionaries/henry-ford/assembly-line/",
      },
      {
        text: "The moving assembly line reduced the production time of a Model T car from over 12 hours to roughly 93 minutes.",
        source: "https://www.history.com/this-day-in-history/fords-assembly-line-starts-rolling",
      },
      {
        text: "Mass production reduced the price of a Model T automobile from 850 dollars in 1908 down to under 300 dollars in the 1920s.",
        source: "https://www.britannica.com/topic/Model-T",
      },
      {
        text: "The Deutsches Museum in Munich displays historic machine tools and production exhibits tracing modern industrial standardization.",
        source: "https://www.deutsches-museum.de/museumsinsel/ausstellungen/produktionstechnik",
      },
    ],
    simplified: [
      "We explain interchangeable parts using identical gears that fit any machine without filing.",
      "We show how moving conveyor belts bring parts directly to specialized workstations.",
      "We demonstrate how higher throughput makes everyday goods affordable for regular families.",
    ],
  },
};
