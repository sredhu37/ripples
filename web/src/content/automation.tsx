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

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function Toy({ lang, onDone }: ToyProps) {
  return <AutomationToy lang={lang} onDone={onDone} />;
}

function Widget({ lang, onAnswer }: WidgetProps) {
  return <AutomationToy lang={lang} mode="quiz" onDone={() => onAnswer(true)} />;
}

export const lesson: Lesson = {
  id: "automation",
  story: [
    animatedBeat(
      [
        T(
          "In older manufacturing plants, workers had to carry heavy pots of white-hot molten metal.",
          "In frueheren Huettenwerken trugen Arbeiter gluehende Bottiche mit fluessigem Metall.",
          "W dawnych hutach i odlewniach pracownicy musieli ręcznie przenosić ciężkie kadzie z rozżarzonym, płynnym metalem.",
        ),
        T(
          "Breathing thick paint fumes and bending down thousands of times a day injured workers' backs.",
          "Giftige Farbgase und tausendfaches Buecken am Tag fuehrten oft zu schweren Verletzungen.",
          "Wdychanie oparów toksycznych lakierów i schylanie się tysiące razy dziennie niszczyło kręgosłupy robotników.",
        ),
        T(
          "Factory owners and labor leaders searched for ways to protect people from hazardous tasks.",
          "Ingenieure und Gewerkschaften suchten nach Wegen, Menschen vor Gefahr zu bewahren.",
          "Właściciele fabryk i inżynierowie szukali sposobów, by chronić ludzkie zdrowie przed niebezpieczną pracą.",
        ),
      ],
      DangerousFoundryLaborDiagram,
    ),
    animatedBeat(
      [
        T(
          "Engineers designed *automated* machinery that could perform repetitive physical jobs reliably.",
          "Ingenieure entwickelten *automatisierte* Maschinen, die schwere Arbeiten zuverlaessig ausfuehren.",
          "Inżynierowie skonstruowali *zautomatyzowane* maszyny, które potrafią niezawodnie wykonywać powtarzalną pracę fizyczną.",
        ),
        T(
          "Instead of a human swinging a heavy sledgehammer, a mechanical arm lifts the steel beam.",
          "Statt dass ein Mensch schwere Vorschlaghaemmer schwingt, hebt ein mechanischer Greifer den Traeger.",
          "Zamiast człowieka wymachującego ciężkim młotem kowalskim, mechaniczne ramię podnosi stalową belkę.",
        ),
        T(
          "Electric servos and hydraulic pistons give the arm the strength of twenty draft horses.",
          "Elektromotoren und Hydraulikzylinder verleihen dem Arm die Kraft von zwanzig Pferden.",
          "Serwomotory elektryczne i siłowniki hydrauliczne nadają ramieniu siłę dwudziestu koni pociągowych.",
        ),
      ],
      RoboticArmActuatorDiagram,
    ),
    animatedBeat(
      [
        T(
          "Robots follow exact mathematical coordinates to weld seams with sub-millimeter precision.",
          "Roboter folgen mathematischen Koordinaten, um Naehte mit Millimetergenauigkeit zu schweissen.",
          "Roboty podążają za precyzyjnymi współrzędnymi matematycznymi, by spawać łączenia z dokładnością do ułamka milimetra.",
        ),
        T(
          "They apply smooth coats of car paint in sealed booths where human lungs would be harmed.",
          "Sie lackieren Autokarosserien in versiegelten Kammern, in denen Menschenluft schaedlich waere.",
          "Nakładają gładkie warstwy lakieru w szczelnych komorach, gdzie opary chemiczne byłyby szkodliwe dla ludzkich płuc.",
        ),
        T(
          "A robot never loses focus, never slips on an oily floor, and never suffers back strain.",
          "Ein Roboter ermuedet nicht, rutscht nicht aus und leidet nie unter Rueckenschmerzen.",
          "Robot nigdy nie traci skupienia, nie ślizga się na zaolejonej posadzce i nie cierpi na bóle pleców.",
        ),
      ],
      PrecisionWeldingDiagram,
    ),
    animatedBeat(
      [
        T(
          "Modern robotic cells are guarded by an electronic *sensor* called an optical safety light curtain.",
          "Moderne Roboterzellen werden durch einen elektronischen *Sensor* wie ein Lichtgitter geschuetzt.",
          "Współczesne gniazda zrobotyzowane są strzeżone przez elektroniczny *czujnik* zwany optyczną kurtyną świetlną.",
        ),
        T(
          "Invisible beams of light create an invisible protective wall around the moving mechanical arm.",
          "Unsichtbare Lichtstrahlen spannen eine schuetzende Wand um den beweglichen Greifarm.",
          "Niewidoczne wiązki światła tworzą barierę ochronną wokół ruchomego ramienia mechanicznego.",
        ),
        T(
          "If a maintenance engineer steps across the line, the machine shuts off in a split second.",
          "Tritt eine Wartungskraft ueber die Begrenzung, schaltet die Anlage im Bruchteil einer Sekunde ab.",
          "Jeśli technik lub pracownik przekroczy tę linię, maszyna wyłącza się w ułamku sekundy.",
        ),
      ],
      SafetySensorsCurtainDiagram,
    ),
    animatedBeat(
      [
        T(
          "Rather than replacing people, the industrial *robot* liberates humans from dangerous drudgery.",
          "Statt Menschen zu verdraengen, befreit der industrielle *Roboter* uns von gefaehrlicher Plackerei.",
          "Zamiast zastępować ludzi, *robot* przemysłowy uwalnia nas od niebezpiecznego i niszczącego zdrowie mozołu.",
        ),
        T(
          "Workers step into skilled roles as software programmers, quality inspectors, and designers.",
          "Fachkraefte uebernehmen anspruchsvolle Aufgaben als Programmierer, Pruefer und Konstrukteure.",
          "Pracownicy podejmują wykwalifikowane role programistów, kontrolerów jakości i projektantów.",
        ),
        T(
          "Automation protects human health while enabling society to build safer cars and affordable goods.",
          "Automation schuetzt die Gesundheit und ermoeglicht den Bau sicherer und bezahlbarer Gueter.",
          "Automatyzacja chroni zdrowie ludzi, umożliwiając produkcję bezpiecznych pojazdów i tanich towarów.",
        ),
      ],
      HumanSupervisorSafeDiagram,
    ),
  ],
  toyIntro: T(
    "Set production speed and activate both distance sensors and the safety curtain for 100% worker safety.",
    "Waehle das Tempo und schalte Sensoren und Lichtgitter ein, um 100% Arbeitssicherheit zu erreichen.",
    "Ustaw tempo produkcji oraz włącz czujniki odległości i kurtynę świetlną dla 100% bezpieczeństwa.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why are automated robots used for jobs like welding and spray painting in factories?",
        "Warum setzen Fabriken Roboter zum Schweissen und Lackieren ein?",
        "Dlaczego w fabrykach do spawania i lakierowania stosuje się automatyczne roboty?",
      ),
      options: [
        {
          text: T(
            "To protect human workers from extreme heat, toxic chemical fumes, and physical injuries",
            "Um Menschen vor extremer Hitze, giftigen chemischen Daempfen und Verletzungen zu schuetzen",
            "Aby chronić ludzi przed żarem, toksycznymi oparami chemicznymi i urazami fizycznymi",
          ),
          correct: true,
        },
        {
          text: T(
            "Because robots love to eat metal chips and drink lubricating grease for lunch",
            "Weil Roboter zum Mittagessen am liebsten Metallspaene knabbern und Oel trinken",
            "Ponieważ roboty uwielbiają jeść wióry metalowe i pić smar maszynowy na obiad",
          ),
        },
        {
          text: T(
            "To practice acrobatic somersaults before the circus opens on Saturday",
            "Um akrobatische Saltos zu ueben, bevor am Samstag der Zirkus beginnt",
            "Aby ćwiczyć akrobatyczne salta przed sobotnim występem w cyrku",
          ),
        },
      ],
      hint: T(
        "Robots handle hazardous and exhausting tasks, keeping human workers safe from harm.",
        "Roboter uebernehmen gefaehrliche Aufgaben, damit menschliche Arbeiter unversehrt bleiben.",
        "Roboty wykonują niebezpieczne i wyczerpujące zadania, chroniąc pracowników przed urazami.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "How does an optical safety curtain protect factory workers near a robot arm?",
        "Wie schuetzt ein optisches Sicherheits-Lichtgitter Menschen in der Naehe eines Roboters?",
        "W jaki sposób optyczna kurtyna świetlna chroni ludzi w pobliżu ramienia robota?",
      ),
      options: [
        {
          text: T(
            "It halts the machinery in a split second if a person interrupts the invisible light beams",
            "Es stoppt die Maschine sofort, sobald ein Mensch die unsichtbaren Lichtschranken unterbricht",
            "Zatrzymuje maszynę w ułamku sekundy, gdy człowiek przetnie niewidzialne wiązki światła",
          ),
          correct: true,
        },
        {
          text: T(
            "It plays disco music and flashes glitter onto the factory floor",
            "Es spielt Discomusik und wirft Glitzer auf den Fabrikboden",
            "Włącza muzykę disco i rozsypuje brokat na posadzce w fabryce",
          ),
        },
        {
          text: T(
            "It drops a giant velvet curtain like in an opera theater",
            "Es laesst einen riesigen Samtvorhang wie in der Oper herunterfallen",
            "Opuszcza wielką aksamitną kurtynę jak na scenie w operze",
          ),
        },
      ],
      hint: T(
        "Safety sensors detect human presence and shut down mechanical motion instantly.",
        "Sicherheitssensoren erkennen Menschen sofort und stoppen jede Bewegung der Maschine.",
        "Czujniki bezpieczeństwa wykrywają obecność człowieka i natychmiast zatrzymują ruch maszyny.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Arm the Distance Sensors and Safety Curtain, and select at least 2x Standard speed for 100% safety.",
        "Schalte Sensoren und Lichtgitter scharf und waehle mindestens 2x Standard-Tempo fuer 100% Schutz.",
        "Uzbrój czujniki odległości oraz kurtynę świetlną i wybierz tempo co najmniej 2x Standard dla 100% bezpieczeństwa.",
      ),
      Widget,
      hint: T(
        "Activate both safety buttons, pick 2x or 3x speed until safety shows 100%, then tap check.",
        "Aktiviere beide Schutzschalter, waehle Tempo 2x oder 3x bis 100% Schutz erscheint, und tippe auf pruefen.",
        "Włącz oba przyciski zabezpieczeń, wybierz tempo 2x lub 3x, aż wskaźnik pokaże 100%, a potem kliknij sprawdź.",
      ),
    },
  ],
  askDad: T(
    "Papa, which jobs in a hospital or factory are best done by robots, and which require human doctors and nurses?",
    "Papa, welche Aufgaben im Krankenhaus oder in der Fabrik machen Roboter am besten, und wo braucht man menschliche Aerzte und Pfleger?",
    "Tato, które zadania w szpitalu lub fabryce najlepiej wykonują roboty, a gdzie niezbędni są ludzie?",
  ),
  realLife: {
    title: {
      en: "Robotic Logistics Hubs in Germany",
      de: "Automatisierte Logistikzentren in Deutschland",
      pl: "Nowoczesna automatyzacja i robotyka w Polsce",
    },
    body: {
      en: "In parcel distribution centers across Germany, such as Deutsche Post DHL hubs in Bochum and Obertshausen, automated sorting systems scan and route millions of packages every night. Robotic arms and camera scanners read barcodes in milliseconds, ensuring deliveries arrive reliably without workers having to lift heavy loads.",
      de: "In Paketzentren quer durch Deutschland, etwa bei der Deutschen Post DHL in Bochum oder Obertshausen, sortieren automatische Anlagen jede Nacht Millionen Pakete. Roboterarme und Kamerasensoren scannen Barcodes in Millisekunden und entlasten Beschaeftigte vom Heben schwerer Lasten.",
      pl: "W Polsce działają jedne z najnowocześniejszych centrów logistycznych i fabryk w Europie, w tym wielkie centra dystrybucyjne pod Poznaniem, Wrocławiem i Łodzią oraz zautomatyzowane paczkomaty InPost. Tysiące robotów mobilnych AGV przemieszcza regały z towarami, a precyzyjne ramiona robotyczne i skanery laserowe sortują paczki w ułamku sekundy, uwalniając ludzi od dźwigania ciężarów.",
    },
  },
  factCard: {
    claims: [
      {
        text: {
          en: "George Devol patented the first programmable industrial robot arm, Unimate, in 1954.",
          de: "George Devol liess sich 1954 den ersten programmierbaren Industrieroboterarm Unimate patentieren.",
          pl: "George Devol opatentował w 1954 roku pierwsze programowalne ramię robota przemysłowego o nazwie Unimate.",
        },
        source: "https://www.britannica.com/technology/Unimate",
      },
      {
        text: {
          en: "General Motors installed the first Unimate robot arm on an automotive assembly line in New Jersey in 1961.",
          de: "General Motors installierte 1961 in New Jersey den ersten Unimate-Roboterarm an einem Automobil-Fliessband.",
          pl: "Koncern General Motors zainstalował w 1961 roku pierwsze ramię robota Unimate na linii montażowej w New Jersey.",
        },
        source: "https://spectrum.ieee.org/unimate-the-first-industrial-robot",
      },
      {
        text: {
          en: "According to the International Federation of Robotics (IFR), over 3.9 million industrial robots operate in factories worldwide.",
          de: "Laut der International Federation of Robotics (IFR) sind weltweit ueber 3,9 Millionen Industrieroboter in Fabriken im Einsatz.",
          pl: "Według Międzynarodowej Federacji Robotyki (IFR) w fabrykach na całym świecie pracuje ponad 3,9 miliona robotów przemysłowych.",
        },
        source:
          "https://ifr.org/ifr-press-releases/news/record-of-553000-industrial-robots-installed-globally-in-2022",
      },
      {
        text: {
          en: "Germany is the fifth most automated country in the world, with over 415 robots per 10,000 manufacturing workers according to IFR data.",
          de: "Deutschland gehoert laut IFR mit ueber 415 Robotern pro 10.000 Industriearbeitern zu den fuenf am staerksten automatisierten Laendern.",
          pl: "Gęstość robotyzacji w polskim przemyśle dynamicznie rośnie, przekraczając 70 robotów na 10 000 pracowników w przetwórstwie przemysłowym.",
        },
        source: "https://automatykab2b.pl/gospodarka/56384-gestosc-robotyzacji-w-polsce-raport-ifr",
      },
      {
        text: {
          en: "The Fraunhofer Institute for Manufacturing Engineering and Automation (IPA) conducts research into collaborative robots that work safely alongside humans.",
          de: "Das Fraunhofer-Institut fuer Produktionstechnik und Automatisierung (IPA) erforscht Roboter, die sicher mit Menschen kooperieren.",
          pl: "Sieć Badawcza Łukasiewicz - Przemysłowy Instytut Automatyki i Pomiarów PIAP w Warszawie bada i rozwija polską robotykę mobilną i przemysłową.",
        },
        source: "https://piap.lukasiewicz.gov.pl/o-instytucie/",
      },
    ],
    simplified: [
      {
        en: "We explain automation as using machines with motors and sensors for repetitive, dangerous tasks.",
        de: "Wir erklaeren Automation anhand von Maschinen mit Motoren und Sensoren fuer gefaehrliche Routinearbeiten.",
        pl: "Tłumaczymy automatyzację jako użycie maszyn z silnikami i czujnikami do niebezpiecznych i powtarzalnych zadań.",
      },
      {
        en: "We demonstrate how safety sensors immediately halt machines to protect workers from accidents.",
        de: "Wir zeigen, wie Sicherheitssensoren Maschinen sofort stoppen, um Mitarbeiter vor Unfaellen zu bewahren.",
        pl: "Pokazujemy, jak czujniki bezpieczeństwa natychmiast zatrzymują maszyny, aby chronić pracowników przed wypadkiem.",
      },
      {
        en: "We highlight that robots relieve humans from dangerous labor so they can do creative and caring work.",
        de: "Wir betonen, dass Roboter Menschen von schwerer Last befreien, damit Zeit fuer kreative Arbeit bleibt.",
        pl: "Podkreślamy, że roboty odciążają ludzi od ciężkiej harówki, dając czas na pracę twórczą i troskliwą opiekę.",
      },
    ],
  },
};
