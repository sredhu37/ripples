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

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

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
          "Vor Jahrhunderten fertigten Handwerker jede Kutsche, Taschenuhr und jeden Stiefel einzeln von Hand an.",
          "Przed wiekami rzemieślnicy wytwarzali każdy powóz, zegarek kieszonkowy i skórzany but wyłącznie ręcznie.",
        ),
        T(
          "Master artisans measured and filed each metal cog to fit only one specific clock case.",
          "Meister feilten jedes Zahnrad passgenau zurecht, sodass es nur in dieses eine Gehaeuse passte.",
          "Mistrzowie mierzyli i piłowali każde metalowe koło zębate tak, by pasowało tylko do jednej, konkretnej obudowy zegara.",
        ),
        T(
          "If a part broke years later, a blacksmith had to custom-forge a unique replacement from scratch.",
          "Ging spaeter ein Teil kaputt, musste ein Schmied ein einzelnes Ersatzteil muehsam neu anfertigen.",
          "Jeśli część pękła po latach, kowal musiał od podstaw wykuwać unikalny zamiennik na specjalne zamówienie.",
        ),
      ],
      ArtisanWorkshopDiagram,
    ),
    animatedBeat(
      [
        T(
          "Because handcrafting required weeks of labor, clocks and bicycles were extraordinarily expensive.",
          "Weil die Handarbeit Wochen dauerte, waren Uhren und Fahrraeder ausserordentlich teuer.",
          "Ponieważ ręczne rzemiosło wymagało tygodni żmudnej pracy, zegary i rowery były niezwykle drogie.",
        ),
        T(
          "Only aristocrats and wealthy landowners could afford manufactured goods in their homes.",
          "Nur wohlhabende Kaufleute und Grundbesitzer konnten sich solche feinen Waren leisten.",
          "Tylko arystokraci i zamożni kupcy mogli pozwolić sobie na posiadanie takich wyrobów w domu.",
        ),
        T(
          "Ordinary families had to wash clothes by hand and walk long miles on foot every single day.",
          "Einfache Familien mussten ihre Kleidung mit der Hand waschen und weite Strecken zu Fuss gehen.",
          "Zwykłe rodziny musiały prać ubrania ręcznie w balii i pokonywać wiele kilometrów każdego dnia pieszo.",
        ),
      ],
      LuxuryPriceTagDiagram,
    ),
    animatedBeat(
      [
        T(
          "In the nineteenth century, gunsmiths and toolmakers introduced *interchangeable parts*.",
          "Im neunzehnten Jahrhundert entwickelten Werkzeugmacher *austauschbare Bauteile*.",
          "W XIX wieku rusznikarze i producenci narzędzi wprowadzili *zamienne części standardowe*.",
        ),
        T(
          "Instead of making unique one-off pieces, precision stamping machines made identical metal parts.",
          "Statt Einzelstuecken stanzten praezise Maschinen tausende vollkommen gleiche Bauteile.",
          "Zamiast unikalnych pojedynczych sztuk, precyzyjne maszyny tłoczyły tysiące identycznych elementów.",
        ),
        T(
          "Any gear or bolt could fit into any machine on the bench without filing or trimming.",
          "Jedes Zahnrad und jede Schraube passte nun ohne Feilen in jede Maschine auf der Werkbank.",
          "Każde koło zębate lub śruba pasowały do dowolnej maszyny na stole warsztatowym bez piłowania.",
        ),
      ],
      InterchangeableGearsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Automakers like Henry Ford combined standardized parts with the moving *assembly line*.",
          "Automobilpioniere wie Henry Ford verbanden Standardteile mit dem beweglichen *Fliessband*.",
          "Pionierzy motoryzacji, tacy jak Henry Ford, połączyli standaryzację części z ruchomą *taśmą montażową*.",
        ),
        T(
          "Instead of workers walking around collecting parts, a motorized conveyor belt brought work to them.",
          "Statt dass Arbeiter durch die Halle liefen, brachte ein Foerderband die Teile direkt zu ihnen.",
          "Zamiast pracowników krążących po hali po śruby i ramy, taśmociąg dostarczał części prosto w ich ręce.",
        ),
        T(
          "Each worker mastered one specific task, completing complex assemblies in minutes instead of days.",
          "Jeder Arbeiter meisterte einen Handgriff und montierte Geraete in Minuten statt in Tagen.",
          "Każdy robotnik opanował do perfekcji jedną czynność, składając skomplikowane maszyny w minuty zamiast dni.",
        ),
      ],
      MovingConveyorAssemblyDiagram,
    ),
    animatedBeat(
      [
        T(
          "This efficient process, known as *mass production*, caused the prices of everyday goods to plummet.",
          "Dieses Verfahren, die sogenannte *Massenfertigung*, liess die Preise fuer Alltagsgueter purzeln.",
          "Ten wydajny proces, znany jako *produkcja masowa*, doprowadził do gwałtownego spadku cen towarów.",
        ),
        T(
          "Suddenly, millions of working families could afford safety bicycles, sewing machines, and radios.",
          "Ploetzlich konnten sich Millionen von Familien Fahrraeder, Naehmaschinen und Radios leisten.",
          "Nagle miliony pracujących rodzin mogły kupić bezpieczne rowery, maszyny do szycia i odbiorniki radiowe.",
        ),
        T(
          "Standardization and assembly lines brought comfort and freedom to regular homes across the world.",
          "Standardisierung und Fliessbaender brachten Komfort und Freiheit in die Haushalte der Welt.",
          "Standaryzacja i taśmy montażowe przyniosły wygodę i wolność milionom domów na całym świecie.",
        ),
      ],
      BicyclesForEveryoneDiagram,
    ),
  ],
  toyIntro: T(
    "Compare an artisan workshop to a moving assembly line and advance the line to make affordable bicycles.",
    "Vergleiche eine Werkstatt mit einem Fliessband und ruecke die Stationen vor, um guenstige Raeder zu bauen.",
    "Porównaj warsztat rzemieślniczy z taśmą montażową i przesuń stanowiska, aby złożyć tanie rowery.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What are interchangeable parts in manufacturing?",
        "Was versteht man in der Fertigung unter austauschbaren Bauteilen?",
        "Czym są wymienne części w nowoczesnej produkcji?",
      ),
      options: [
        {
          text: T(
            "Identical standard components that fit into any unit without custom hand trimming",
            "Gleiche Standardteile, die ohne Nachfeilen in jedes hergestellte Geraet passen",
            "Identyczne elementy standardowe pasujące do każdego egzemplarza bez ręcznego docinania",
          ),
          correct: true,
        },
        {
          text: T(
            "Parts made of chocolate that melt whenever it begins to rain outside",
            "Bauteile aus Schokolade, die schmelzen, sobald es draussen regnet",
            "Części zrobione z czekolady, które topnieją na deszczu",
          ),
        },
        {
          text: T(
            "Screws that only turn when workers sing sea shanties together",
            "Schrauben, die sich nur drehen, wenn alle Arbeiter Seemannslieder singen",
            "Śruby, które obracają się tylko wtedy, gdy robotnicy śpiewają szanty",
          ),
        },
      ],
      hint: T(
        "Standard parts fit into any copy of the product, making assembly and repairs fast.",
        "Standardteile passen in jedes Exemplar und machen Montage und Reparatur schnell.",
        "Części standardowe pasują do każdego egzemplarza wyrobu, przyspieszając montaż i naprawy.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "How did the moving assembly line lower the price of manufactured goods?",
        "Wie senkte das Fliessband die Preise fuer hergestellte Waren?",
        "W jaki sposób ruchoma taśma montażowa obniżyła ceny wytwarzanych towarów?",
      ),
      options: [
        {
          text: T(
            "It sped up production so factories made ten times more goods in the same time",
            "Es beschleunigte die Arbeit, sodass Fabriken zehnmal mehr Waren in derselben Zeit bauten",
            "Przyspieszyła produkcję, dzięki czemu fabryki wytwarzały dziesięć razy więcej towarów w tym samym czasie",
          ),
          correct: true,
        },
        {
          text: T(
            "It made products invisible so stores did not have to pay for lighting",
            "Es machte Waren unsichtbar, damit Geschaefte kein Licht bezahlen mussten",
            "Uczyniła produkty niewidzialnymi, by sklepy nie musiały płacić za oświetlenie",
          ),
        },
        {
          text: T(
            "It replaced factory workers with magical leaping rabbits",
            "Es ersetzte Fabrikarbeiter durch magische huepfende Kaninchen",
            "Zastąpiła pracowników fabryki magicznymi skaczącymi królikami",
          ),
        },
      ],
      hint: T(
        "High efficiency and high volume drastically reduced the labor cost for each item.",
        "Hohe Effizienz und grosse Stueckzahlen senkten die Arbeitskosten pro Stueck gewaltig.",
        "Wysoka wydajność i duża skala dramatycznie obniżyły koszt robocizny przypadający na jedną sztukę.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Select Moving Assembly Line and advance all three stations to produce bicycles at 50 coins each.",
        "Waehle Fliessband-Fertigung und ruecke alle drei Stationen vor, um Raeder fuer 50 Muenzen zu bauen.",
        "Wybierz Taśmę montażową i przesuń wszystkie trzy stanowiska, by produkować rowery po 50 monet za sztukę.",
      ),
      Widget,
      hint: T(
        "Click Moving Assembly Line, advance through frame, wheels, and inspection, then tap check.",
        "Klicke auf Fliessband, ruecke Rahmen, Raeder und Pruefung vor und tippe auf pruefen.",
        "Wybierz Taśmę montażową, przejdź przez ramę, koła i kontrolę jakości, a potem kliknij sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, why is it that today almost every store sells clothes in standard sizes like S, M, and L?",
    "Papa, warum verkaufen fast alle Geschaefte heute Kleidung in festen Groessen wie S, M und L?",
    "Tato, dlaczego dzisiaj prawie każdy sklep sprzedaje ubrania w gotowych rozmiarach, takich jak S, M i L?",
  ),
  realLife: {
    title: {
      en: "Automotive Assembly in Germany",
      de: "Automobilproduktion in Deutschland",
      pl: "Nowoczesne fabryki i produkcja masowa w Polsce",
    },
    body: {
      en: "In modern manufacturing plants in Wolfsburg, Sindelfingen, and Leipzig, high-precision assembly lines produce motor vehicles with millimeter accuracy. Thousands of standardized components arrive just in time to be installed by skilled workers and robotic systems, ensuring high reliability and efficiency.",
      de: "In modernen Autowerken in Wolfsburg, Sindelfingen und Leipzig fertigen Fliessbaender Fahrzeuge mit Millimetergenauigkeit. Tausende genormte Bauteile treffen puenktlich ein und werden von Fachkraeften und Robotern verbaut, was Qualitaet und Zuverlaessigkeit gewaehrleistet.",
      pl: "W Polsce działają wielkie, zautomatyzowane zakłady produkcyjne, na przykład fabryki samochodów w Gliwicach, Tychach i Poznaniu oraz zakłady sprzętu AGD we Wrocławiu i Łodzi. Tysiące standaryzowanych części dociera na taśmę dokładnie na czas, gdzie pracownicy i precyzyjne roboty montują urządzenia z dokładnością do milimetra, czyniąc je powszechnie dostępnymi dla milionów rodzin.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "The concept of interchangeable parts was pioneered in the late eighteenth century by gunsmiths like Honore Blanc and Eli Whitney.",
          de: "Das Prinzip austauschbarer Bauteile wurde im spaeten 18. Jahrhundert von Buechsenmachern wie Honore Blanc und Eli Whitney entwickelt.",
          pl: "Zasadę wymiennych części wprowadzili pod koniec XVIII wieku rusznikarze i mechanicy, tacy jak Honoré Blanc i Eli Whitney.",
        },
        source: "https://www.britannica.com/technology/interchangeable-parts",
      },
      {
        text: {
          en: "Henry Ford installed the first moving assembly line for mass automobile production at Highland Park in 1913.",
          de: "Henry Ford fuehrte 1913 in Highland Park das erste bewegliche Fliessband fuer die Automobilmassenfertigung ein.",
          pl: "Henry Ford uruchomił w 1913 roku w Highland Park pierwszą ruchomą linię montażową do seryjnej produkcji samochodów.",
        },
        source: "https://www.thehenryford.org/explore/stories-of-innovation/visionaries/henry-ford/assembly-line/",
      },
      {
        text: {
          en: "The moving assembly line reduced the production time of a Model T car from over 12 hours to roughly 93 minutes.",
          de: "Das Fliessband senkte die Bauzeit eines Ford Modell T von ueber 12 Stunden auf rund 93 Minuten.",
          pl: "Ruchoma taśma montażowa skróciła czas montażu samochodu Ford Model T z ponad 12 godzin do około 93 minut.",
        },
        source: "https://www.history.com/this-day-in-history/fords-assembly-line-starts-rolling",
      },
      {
        text: {
          en: "Mass production reduced the price of a Model T automobile from 850 dollars in 1908 down to under 300 dollars in the 1920s.",
          de: "Die Massenfertigung senkte den Preis des Modell T von 850 Dollar im Jahr 1908 auf unter 300 Dollar in den 1920er Jahren.",
          pl: "Produkcja masowa obniżyła cenę Forda T z 850 dolarów w 1908 roku do poniżej 300 dolarów w latach dwudziestych XX wieku.",
        },
        source: "https://www.britannica.com/topic/Model-T",
      },
      {
        text: {
          en: "The Deutsches Museum in Munich displays historic machine tools and production exhibits tracing modern industrial standardization.",
          de: "Das Deutsche Museum in Muenchen zeigt historische Werkzeugmaschinen und Ausstellungen zur industriellen Normung.",
          pl: "Centralny Okręg Przemysłowy (COP) w II RP w latach 1936-1939 stworzył nowoczesne fabryki maszynowe i zbrojeniowe w Stalowej Woli i Mielcu.",
        },
        source: "https://dzieje.pl/aktualnosci/centralny-okreg-przemyslowy-najwieksze-przedsiewziecie-gospodarcze-ii-rp",
      },
    ],
    simplified: [
      {
        en: "We explain interchangeable parts using identical gears that fit any machine without filing.",
        de: "Wir erklaeren austauschbare Bauteile anhand gleicher Zahnraeder, die ohne Feilen in jede Maschine passen.",
        pl: "Tłumaczymy wymienne części na przykładzie identycznych kół zębatych pasujących do każdej maszyny.",
      },
      {
        en: "We show how moving conveyor belts bring parts directly to specialized workstations.",
        de: "Wir zeigen, wie Foerderbaender Teile direkt zu spezialisierten Stationen bringen.",
        pl: "Pokazujemy, jak taśmociągi dostarczają części bezpośrednio do wyspecjalizowanych stanowisk montażowych.",
      },
      {
        en: "We demonstrate how higher throughput makes everyday goods affordable for regular families.",
        de: "Wir veranschaulichen, wie grosse Stueckzahlen Alltagsgueter fuer Familien bezahlbar machen.",
        pl: "Wskazujemy, jak masowa skala produkcji czyni codzienne towary przystępnymi cenowo dla zwykłych rodzin.",
      },
    ],
  },
};
