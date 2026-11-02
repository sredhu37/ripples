import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  DangerousFoundryLaborDiagram,
  RoboticArmActuatorDiagram,
  PrecisionWeldingDiagram,
  SafetySensorsCurtainDiagram,
  HumanSupervisorSafeDiagram,
} from "./automation.diagrams";
import { AutomationToy } from "./automation.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <AutomationToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return (
    <AutomationToy
      lang={lang}
      mode="quiz"
      onDone={() => onAnswer(true)}
    />
  );
}

export const lesson: Lesson = {
  id: "automation",
  story: [
    animatedBeat(
      [
        T(
          "In older manufacturing plants, workers had to carry heavy pots of white-hot molten metal.",
          "In frueheren Huettenwerken trugen Arbeiter gluehende Bottiche mit fluessigem Metall."
        ),
        T(
          "Breathing thick paint fumes and bending down thousands of times a day injured workers' backs.",
          "Giftige Farbgase und tausendfaches Buecken am Tag fuehrten oft zu schweren Verletzungen."
        ),
        T(
          "Factory owners and labor leaders searched for ways to protect people from hazardous tasks.",
          "Ingenieure und Gewerkschaften suchten nach Wegen, Menschen vor Gefahr zu bewahren."
        ),
      ],
      DangerousFoundryLaborDiagram
    ),
    animatedBeat(
      [
        T(
          "Engineers designed *automated* machinery that could perform repetitive physical jobs reliably.",
          "Ingenieure entwickelten *automatisierte* Maschinen, die schwere Arbeiten zuverlaessig ausfuehren."
        ),
        T(
          "Instead of a human swinging a heavy sledgehammer, a mechanical arm lifts the steel beam.",
          "Statt dass ein Mensch schwere Vorschlaghaemmer schwingt, hebt ein mechanischer Greifer den Traeger."
        ),
        T(
          "Electric servos and hydraulic pistons give the arm the strength of twenty draft horses.",
          "Elektromotoren und Hydraulikzylinder verleihen dem Arm die Kraft von zwanzig Pferden."
        ),
      ],
      RoboticArmActuatorDiagram
    ),
    animatedBeat(
      [
        T(
          "Robots follow exact mathematical coordinates to weld seams with sub-millimeter precision.",
          "Roboter folgen mathematischen Koordinaten, um Naehte mit Millimetergenauigkeit zu schweissen."
        ),
        T(
          "They apply smooth coats of car paint in sealed booths where human lungs would be harmed.",
          "Sie lackieren Autokarosserien in versiegelten Kammern, in denen Menschenluft schaedlich waere."
        ),
        T(
          "A robot never loses focus, never slips on an oily floor, and never suffers back strain.",
          "Ein Roboter ermuedet nicht, rutscht nicht aus und leidet nie unter Rueckenschmerzen."
        ),
      ],
      PrecisionWeldingDiagram
    ),
    animatedBeat(
      [
        T(
          "Modern robotic cells are guarded by an electronic *sensor* called an optical safety light curtain.",
          "Moderne Roboterzellen werden durch einen elektronischen *Sensor* wie ein Lichtgitter geschuetzt."
        ),
        T(
          "Invisible beams of light create an invisible protective wall around the moving mechanical arm.",
          "Unsichtbare Lichtstrahlen spannen eine schuetzende Wand um den beweglichen Greifarm."
        ),
        T(
          "If a maintenance engineer steps across the line, the machine shuts off in a split second.",
          "Tritt eine Wartungskraft ueber die Begrenzung, schaltet die Anlage im Bruchteil einer Sekunde ab."
        ),
      ],
      SafetySensorsCurtainDiagram
    ),
    animatedBeat(
      [
        T(
          "Rather than replacing people, the industrial *robot* liberates humans from dangerous drudgery.",
          "Statt Menschen zu verdraengen, befreit der industrielle *Roboter* uns von gefaehrlicher Plackerei."
        ),
        T(
          "Workers step into skilled roles as software programmers, quality inspectors, and designers.",
          "Fachkraefte uebernehmen anspruchsvolle Aufgaben als Programmierer, Pruefer und Konstrukteure."
        ),
        T(
          "Automation protects human health while enabling society to build safer cars and affordable goods.",
          "Automation schuetzt die Gesundheit und ermoeglicht den Bau sicherer und bezahlbarer Gueter."
        ),
      ],
      HumanSupervisorSafeDiagram
    ),
  ],
  toyIntro: T(
    "Set production speed and activate both distance sensors and the safety curtain for 100% worker safety.",
    "Waehle das Tempo und schalte Sensoren und Lichtgitter ein, um 100% Arbeitssicherheit zu erreichen."
  ),
  Toy: Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why are automated robots used for jobs like welding and spray painting in factories?",
        "Warum setzen Fabriken Roboter zum Schweissen und Lackieren ein?"
      ),
      options: [
        {
          text: T(
            "To protect human workers from extreme heat, toxic chemical fumes, and physical injuries",
            "Um Menschen vor extremer Hitze, giftigen chemischen Daempfen und Verletzungen zu schuetzen"
          ),
          correct: true,
        },
        {
          text: T(
            "Because robots love to eat metal chips and drink lubricating grease for lunch",
            "Weil Roboter zum Mittagessen am liebsten Metallspaene knabbern und Oel trinken"
          ),
        },
        {
          text: T(
            "To practice acrobatic somersaults before the circus opens on Saturday",
            "Um akrobatische Saltos zu ueben, bevor am Samstag der Zirkus beginnt"
          ),
        },
      ],
      hint: T(
        "Robots handle hazardous and exhausting tasks, keeping human workers safe from harm.",
        "Roboter uebernehmen gefaehrliche Aufgaben, damit menschliche Arbeiter unversehrt bleiben."
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "How does an optical safety curtain protect factory workers near a robot arm?",
        "Wie schuetzt ein optisches Sicherheits-Lichtgitter Menschen in der Naehe eines Roboters?"
      ),
      options: [
        {
          text: T(
            "It halts the machinery in a split second if a person interrupts the invisible light beams",
            "Es stoppt die Maschine sofort, sobald ein Mensch die unsichtbaren Lichtschranken unterbricht"
          ),
          correct: true,
        },
        {
          text: T(
            "It plays disco music and flashes glitter onto the factory floor",
            "Es spielt Discomusik und wirft Glitzer auf den Fabrikboden"
          ),
        },
        {
          text: T(
            "It drops a giant velvet curtain like in an opera theater",
            "Es laesst einen riesigen Samtvorhang wie in der Oper herunterfallen"
          ),
        },
      ],
      hint: T(
        "Safety sensors detect human presence and shut down mechanical motion instantly.",
        "Sicherheitssensoren erkennen Menschen sofort und stoppen jede Bewegung der Maschine."
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Arm the Distance Sensors and Safety Curtain, and select at least 2x Standard speed for 100% safety.",
        "Schalte Sensoren und Lichtgitter scharf und waehle mindestens 2x Standard-Tempo fuer 100% Schutz."
      ),
      Widget: Widget,
      hint: T(
        "Activate both safety buttons, pick 2x or 3x speed until safety shows 100%, then tap check.",
        "Aktiviere beide Schutzschalter, waehle Tempo 2x oder 3x bis 100% Schutz erscheint, und tippe auf pruefen."
      ),
    },
  ],
  askDad: T(
    "Papa, which jobs in a hospital or factory are best done by robots, and which require human doctors and nurses?",
    "Papa, welche Aufgaben im Krankenhaus oder in der Fabrik machen Roboter am besten, und wo braucht man menschliche Aerzte und Pfleger?"
  ),
  realLife: {
    title: T("Robotic Logistics Hubs in Germany", "Automatisierte Logistikzentren in Deutschland"),
    body: T(
      "In parcel distribution centers across Germany, such as Deutsche Post DHL hubs in Bochum and Obertshausen, automated sorting systems scan and route millions of packages every night. Robotic arms and camera scanners read barcodes in milliseconds, ensuring deliveries arrive reliably without workers having to lift heavy loads.",
      "In Paketzentren quer durch Deutschland, etwa bei der Deutschen Post DHL in Bochum oder Obertshausen, sortieren automatische Anlagen jede Nacht Millionen Pakete. Roboterarme und Kamerasensoren scannen Barcodes in Millisekunden und entlasten Beschaeftigte vom Heben schwerer Lasten."
    ),
  },
  factCard: {
    claims: [
      {
        text: "George Devol patented the first programmable industrial robot arm, Unimate, in 1954.",
        source: "https://www.britannica.com/technology/Unimate",
      },
      {
        text: "General Motors installed the first Unimate robot arm on an automotive assembly line in New Jersey in 1961.",
        source: "https://spectrum.ieee.org/unimate-the-first-industrial-robot",
      },
      {
        text: "According to the International Federation of Robotics (IFR), over 3.9 million industrial robots operate in factories worldwide.",
        source: "https://ifr.org/ifr-press-releases/news/record-of-553000-industrial-robots-installed-globally-in-2022",
      },
      {
        text: "Germany is the fifth most automated country in the world, with over 415 robots per 10,000 manufacturing workers according to IFR data.",
        source: "https://ifr.org/post/world-robotics-2023-report-germany",
      },
      {
        text: "The Fraunhofer Institute for Manufacturing Engineering and Automation (IPA) conducts research into collaborative robots that work safely alongside humans.",
        source: "https://www.ipa.fraunhofer.de/en/expertise/robot-and-assistive-systems.html",
      },
    ],
    simplified: [
      "We explain automation as using machines with motors and sensors for repetitive, dangerous tasks.",
      "We demonstrate how safety sensors immediately halt machines to protect workers from accidents.",
      "We highlight that robots relieve humans from dangerous labor so they can do creative and caring work.",
    ],
  },
};
