import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  HistoricalVanishedTradesDiagram,
  ElectricSwitchboardAutomatedDiagram,
  NewTechCareersWindCyberDiagram,
  TransitionCareerShiftDiagram,
  LifelongLearningCuriosityDiagram,
} from "./jobs.diagrams";
import { JobsToy } from "./jobs.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <JobsToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <JobsToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "jobs",
  story: [
    animatedBeat(
      [
        T(
          "A hundred years ago, cities employed thousands of people to walk streets every evening lighting gas lanterns.",
          "Vor hundert Jahren beschaeftigten Staedte tausende Menschen, um abends Strassenlaternen von Hand anzuenden."
        ),
        T(
          "Telephone exchanges were filled with operators plugging cords into wooden boards by hand all day long.",
          "In Telefonzentralen steckten hunderte Vermittlerinnen den ganzen Tag Verbindungskabel in Stecktafeln."
        ),
        T(
          "At bowling alleys, young pin-setters hurried down the lane after each roll to set pins back upright.",
          "Auf Kegelbahnen stellten fleissige Helfer nach jedem Wurf die umgefallenen Holzkegel muehsam wieder auf."
        ),
      ],
      HistoricalVanishedTradesDiagram
    ),
    animatedBeat(
      [
        T(
          "When electric streetlights and automatic telephone switches were invented, those jobs disappeared.",
          "Als elektrische Laternen und automatische Telefonvermittlungen kamen, verschwanden diese alten Berufe."
        ),
        T(
          "This continuous transformation of human work caused by technology is called *automation*.",
          "Diesen fortlaufenden Wandel der Arbeitswelt durch neue Maschinen nennt man *Automatisierung*."
        ),
        T(
          "While repetitive tasks vanish, society becomes more productive and discovers new needs.",
          "Waehrend monotone Handgriffe weichen, wird die Gesellschaft produktiver und neue Beduerfnisse entstehen."
        ),
      ],
      ElectricSwitchboardAutomatedDiagram
    ),
    animatedBeat(
      [
        T(
          "Technology has never eliminated human work: it continuously creates jobs our ancestors never imagined.",
          "Technik hat menschliche Arbeit nie abgeschafft: Sie schafft staendig Berufe, die frueher undenkbar waren."
        ),
        T(
          "No one in 1900 could have worked as an aerospace engineer, a web designer, or a mobile app developer.",
          "Um 1900 konnte niemand als Luftfahrtingenieur, Webdesigner oder Smartphone-Entwickler arbeiten."
        ),
        T(
          "Each invention unlocks hundreds of new specializations, services, and creative fields.",
          "Jede Erfindung eroeffnet hunderte neue Fachgebiete, Dienstleistungen und kreative Taetigkeiten."
        ),
      ],
      NewTechCareersWindCyberDiagram
    ),
    animatedBeat(
      [
        T(
          "Today, growing fields like clean energy and environmental engineering offer thousands of *green jobs*.",
          "Heute bieten erneuerbare Energien und Umweltschutz tausende neue *Zukunftsberufe*."
        ),
        T(
          "Wind turbine technicians climb high towers, and battery chemists engineer cleaner electric buses.",
          "Windkraft-Techniker klettern auf hohe Tuerme, waehrend Batterie-Forscher saubere Busse ermoeglichen."
        ),
        T(
          "Hospitals need healthcare workers and therapists who bring genuine human warmth to patient care.",
          "Kliniken brauchen Pflegekraefte und Therapeuten, die Patienten echte menschliche Waerme schenken."
        ),
      ],
      TransitionCareerShiftDiagram
    ),
    animatedBeat(
      [
        T(
          "The greatest skill you can build for the future is a mindset of *lifelong learning*.",
          "Die wertvollste Faehigkeit fuer deine Zukunft ist die Freude an *lebenslanges Lernen*."
        ),
        T(
          "Curiosity, adaptability, and learning how to learn matter more than memorizing any single tool.",
          "Neugier und die Bereitschaft, Neues zu probieren, zaehlen weit mehr als starres Auswendiglernen."
        ),
        T(
          "By exploring new ideas, you can comfortably master whatever tools the future brings.",
          "Wer neugierig bleibt, meistert mit Leichtigkeit jedes neue Werkzeug, das die Zukunft bringt."
        ),
      ],
      LifelongLearningCuriosityDiagram
    ),
  ],
  toyIntro: T(
    "Choose a workforce training policy to invest in green and tech skills and reach over 90% resilience.",
    "Waehle die Foerderstrategie fuer Zukunftsberufe, um ueber 90% Zukunftsfaehigkeit zu erreichen."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What happened to jobs like street lamplighters and telephone switchboard operators?",
        "Was geschah mit Berufen wie Laternenanzuender und Telefon-Stoepselvermittler?"
      ),
      options: [
        {
          text: T(
            "They were automated by electricity and digital circuits, opening room for new modern careers",
            "Sie wurden durch Strom und Digitaltechnik ersetzt und machten Platz fuer moderne Zukunftsberufe"
          ),
          correct: true,
        },
        {
          text: T(
            "They were turned into stone statues and moved to an underwater museum",
            "Sie wurden in Steinstatuen verwandelt und in ein Unterwassermuseum gebracht"
          ),
        },
        {
          text: T(
            "They moved to Mars to set up bowling alleys on the red dunes",
            "Sie zogen auf den Mars, um Bowlingbahnen auf den roten Duenen zu bauen"
          ),
        },
      ],
      hint: T(
        "Routine tasks were replaced by automatic systems, paving the way for newer, higher-skilled jobs.",
        "Monotone Handgriffe wurden automatisiert und schufen Raum fuer anspruchsvollere Berufe."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Why is lifelong learning the most valuable mindset for navigating the future?",
        "Warum ist lebenslanges Lernen die wichtigste Faehigkeit fuer die Zukunft?"
      ),
      options: [
        {
          text: T(
            "Because technology evolves constantly, and curiosity helps us adopt new tools and skills",
            "Weil Technik sich staendig wandelt und Neugier uns hilft, neue Werkzeuge schnell zu lernen"
          ),
          correct: true,
        },
        {
          text: T(
            "Because it allows people to avoid brushing their teeth before going to bed",
            "Weil man sich dadurch abends vor dem Schlafen nicht mehr die Zaehne putzen muss"
          ),
        },
        {
          text: T(
            "Because it lets you win every board game without reading the rules",
            "Weil man dadurch jedes Brettspiel gewinnt, ohne jemals die Regeln gelesen zu haben"
          ),
        },
      ],
      hint: T(
        "Being adaptable and eager to learn allows workers to thrive through economic changes.",
        "Wer anpassungsfaehig und lernbereit bleibt, meistert wirtschaftliche Veraenderungen souveraen."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Select 'Invest in Green & Tech Skills' to achieve over 90% future workforce resilience.",
        "Waehle 'Investition in Zukunftsberufe', um ueber 90% Zukunftsfaehigkeit der Wirtschaft zu erreichen."
      ),
      Widget: Widget,
      hint: T(
        "Tap the green button for skills investment, check the resilience bar, and tap check.",
        "Tippe auf den Button fuer Zukunftsberufe, pruefe den Balken und druecke auf pruefen."
      ),
    },
  ],
  askDad: T(
    "Papa, if machines can do many jobs in the future, what skills should I learn while I grow up?",
    "Papa, wenn Maschinen spaeter viele Berufe uebernehmen, welche Faehigkeiten soll ich heute lernen?"
  ),
  realLife: {
    title: T("The Dual Vocational Training System in Germany", "Das duale Ausbildungssystem in Deutschland"),
    body: T(
      "In Germany, the dual vocational training system (Duale Ausbildung) combines classroom study at trade schools with paid on-the-job apprenticeship at real companies. Working with chambers of commerce (IHK and Handwerkskammern), the curriculum is regularly updated to train young people in cutting-edge robotics, solar installation, and digital manufacturing.",
      "In Deutschland kombiniert das duale Ausbildungssystem Berufsschulunterricht mit bezahlter Praxis im Betrieb. Gemeinsam mit Industrie- und Handelskammern (IHK) sowie Handwerkskammern werden Lehrplaene laufend modernisiert, um junge Menschen in Robotik, Solartechnik und digitaler Fertigung auszubilden."
    ),
  },
  factCard: {
    claims: [
      {
        text: "The World Economic Forum's Future of Jobs Report estimates that 69 million new roles will emerge in green technology, data, and education by 2027.",
        source: "https://www.weforum.org/publications/the-future-of-jobs-report-2023/",
      },
      {
        text: "The OECD Employment Outlook shows that technological progress shifts job composition toward higher-skilled, non-routine tasks.",
        source: "https://www.oecd.org/employment/Employment-Outlook-2023-Key-Findings.pdf",
      },
      {
        text: "According to the German Federal Statistical Office (Destatis), employment in renewable energy and green technologies has grown steadily over two decades.",
        source: "https://www.destatis.de/EN/Themes/Labour/Labour-Market/Labour-Market-Information-System/green-jobs.html",
      },
      {
        text: "Historical labor studies show that while 60% of jobs in 1940 no longer exist in the same form, overall employment has expanded dramatically.",
        source: "https://www.nber.org/papers/w29974",
      },
      {
        text: "The German Federal Institute for Vocational Education and Training (BIBB) continuously adapts training regulations for emerging technological occupations.",
        source: "https://www.bibb.de/en/index.php",
      },
    ],
    simplified: [
      "We explain that technology automates routine manual chores while creating new professions.",
      "We highlight emerging jobs in clean energy, healthcare, and digital technology.",
      "We show that lifelong learning, curiosity, and adaptability are key skills for the future.",
    ],
  },
};
