import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function RoboticArmsWeldingDiagram({ lang, step }: DiagramProps) {
  const name = lang === "pl" ? "Artur" : lang === "de" ? "Arno" : "Arjun";
  const label =
    lang === "pl"
      ? "Arjun i ramiona robotyczne: automatyzacja precyzyjnych i niebezpiecznych prac"
      : lang === "de"
        ? "Arno und Industrieroboter: Automation gefaehrlicher und praeziser Aufgaben"
        : "Arjun and robotic arms: automating hazardous, repetitive precision tasks";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#0f172a"
        stroke="#10b981"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#10b981" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#064e3b" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path
          d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z"
          fill="#059669"
          stroke="#10b981"
          strokeWidth="2"
        />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#a7f3d0">
          {name}
        </text>
      </g>
      <g>
        <rect
          x="135"
          y="35"
          width="230"
          height="32"
          rx="6"
          fill="#1e293b"
          stroke="#10b981"
          strokeWidth="1.5"
        />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#d1fae5">
          🦾{" "}
          {lang === "pl"
            ? "Robotyka i Automatyzacja"
            : lang === "de"
              ? "Roboter und Automation"
              : "Robotics & Automation"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect
            x="135"
            y="80"
            width="230"
            height="52"
            rx="8"
            fill="#1e293b"
            stroke="#059669"
            strokeWidth="1.5"
          />
          <text x="250" y="102" textAnchor="middle" fontSize="16">
            🤖 ➡️ ⚡ ➡️ 📦
          </text>
          <text x="250" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#34d399">
            {lang === "pl"
              ? "Precyzja mikronowa • Praca 24/7"
              : lang === "de"
                ? "Mikrometer-Praezision • 24/7-Betrieb"
                : "Micron Precision • 24/7 Uptime"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#064e3b" />
          <text
            x="250"
            y="170"
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="bold"
            fill="#ffffff"
          >
            {lang === "pl"
              ? "Eliminacja prac brudnych i niebezpiecznych"
              : lang === "de"
                ? "Befreiung von gefaehrlicher Schwerarbeit"
                : "Eliminating the 3Ds: Dull, Dirty, Dangerous"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#a7f3d0">
            {lang === "pl"
              ? "Ludzie stają się programistami i inżynierami"
              : lang === "de"
                ? "Menschen steuern und programmieren Systeme"
                : "Humans shift to design, maintenance, and oversight"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ClosedLoopFeedbackCyberneticsDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Sprzężenie zwrotne w automatyce: czujnik, sterownik i siłownik"
      : lang === "de"
        ? "Regelkreis und Rueckkopplung: Sensor, Regler und Aktor"
        : "Closed-loop feedback cybernetics: sensor, controller, and actuator";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fafafa"
        stroke="#475569"
        strokeWidth="2"
      />
      <g>
        <circle cx="80" cy="85" r="26" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
        <text x="80" y="82" textAnchor="middle" fontSize="12">
          📡
        </text>
        <text x="80" y="98" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#065f46">
          Sensor
        </text>

        <circle cx="200" cy="85" r="26" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
        <text x="200" y="82" textAnchor="middle" fontSize="12">
          🧠
        </text>
        <text x="200" y="98" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1e40af">
          PID Controller
        </text>

        <circle cx="320" cy="85" r="26" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="320" y="82" textAnchor="middle" fontSize="12">
          ⚙️
        </text>
        <text x="320" y="98" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#991b1b">
          Actuator
        </text>

        <line
          x1="106"
          y1="85"
          x2="174"
          y2="85"
          stroke="#334155"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
        <line
          x1="226"
          y1="85"
          x2="294"
          y2="85"
          stroke="#334155"
          strokeWidth="2"
          markerEnd="url(#arrow)"
        />
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#1e293b" />
          <text x="200" y="150" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#34d399">
            Continuous Self-Correction Without Human Intervention
          </text>
          <text x="200" y="165" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl"
              ? "Czujnik mierzy błąd; procesor natychmiast koryguje ruch silnika w milisekundach"
              : lang === "de"
                ? "Sensoren messen Abweichungen; Prozessoren korrigieren in Millisekunden"
                : "Measures error variance and corrects torque thousands of times per second"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#065f46" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Od regulatora odśrodkowego Watta po autonomiczne fabryki"
              : lang === "de"
                ? "Von Watts Fliehkraftregler bis zur vollautonomen Fabrik"
                : "From Watt's mechanical flyball governor to automated dark factories"}
          </text>
        </g>
      )}
    </svg>
  );
}

function AutomatedWarehouseLogisticsDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Zautomatyzowana logistyka magazynowa: roboty AGV i sortowniki"
      : lang === "de"
        ? "Automatisierte Lagerlogistik: Fahrerlose Transportroboter"
        : "Automated warehouse logistics: automated guided vehicles and high-speed sorters";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f8fafc"
        stroke="#334155"
        strokeWidth="2"
      />
      <g>
        <rect
          x="50"
          y="45"
          width="80"
          height="60"
          rx="6"
          fill="#d1fae5"
          stroke="#059669"
          strokeWidth="1.5"
        />
        <text x="90" y="70" textAnchor="middle" fontSize="14">
          🤖 📦
        </text>
        <text x="90" y="90" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#065f46">
          Kiva / AGV
        </text>

        <rect
          x="160"
          y="45"
          width="80"
          height="60"
          rx="6"
          fill="#dbeafe"
          stroke="#2563eb"
          strokeWidth="1.5"
        />
        <text x="200" y="70" textAnchor="middle" fontSize="14">
          🔀 📐
        </text>
        <text x="200" y="90" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1e40af">
          Sorter Belt
        </text>

        <rect
          x="270"
          y="45"
          width="80"
          height="60"
          rx="6"
          fill="#fee2e2"
          stroke="#dc2626"
          strokeWidth="1.5"
        />
        <text x="310" y="70" textAnchor="middle" fontSize="14">
          🚛 ⏱️
        </text>
        <text x="310" y="90" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#991b1b">
          Express Fleet
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="44" rx="6" fill="#1e293b" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#38bdf8">
            Orders Picked and Dispatched in Under 15 Minutes
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#e2e8f0">
            {lang === "pl"
              ? "Tysiące robotów koordynuje ruch w czasie rzeczywistym bez kolizji"
              : lang === "de"
                ? "Tausende Roboter bewegen Regale kollisionsfrei in Echtzeit"
                : "Thousands of autonomous robots move pods dynamically to human picking stations"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#0f766e" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "E-commerce stał się błyskawiczny i tani dzięki robotyce"
              : lang === "de"
                ? "Roboter machten weltweiten Onlinehandel schnell und bezahlbar"
                : "Robotics turned overnight parcel fulfillment into standard public infrastructure"}
          </text>
        </g>
      )}
    </svg>
  );
}

function QualityDefectZeroErrorDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Kontrola jakości i eliminacja wad: powtarzalność maszynowa"
      : lang === "de"
        ? "Qualitaetskontrolle und Null-Fehler-Toleranz: Maschinenpraezision"
        : "Quality control and defect elimination: machine repeatability";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#fdf4ff"
        stroke="#a21caf"
        strokeWidth="2"
      />
      <g>
        <circle cx="100" cy="85" r="30" fill="#fae8ff" stroke="#a21caf" strokeWidth="2" />
        <text x="100" y="80" textAnchor="middle" fontSize="18">
          🎯 🔍
        </text>
        <text x="100" y="100" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#701a75">
          Computer Vision
        </text>

        <rect x="230" y="60" width="130" height="55" rx="6" fill="#701a75" />
        <text x="295" y="83" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
          Six Sigma Accuracy
        </text>
        <text x="295" y="100" textAnchor="middle" fontSize="8" fill="#f5d0fe">
          3.4 defects per million
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="44" rx="6" fill="#1e293b" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f472b6">
            Machines Never Suffer Muscle Fatigue or Loss of Focus
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl"
              ? "Laserowy wzrok bada 1000 płytek drukowanych na minutę z dokładnością do mikrona"
              : lang === "de"
                ? "Kameras pruefen 1.000 Platinen pro Minute ohne jede Ermuedung"
                : "High-speed camera vision inspects solder joints without human optical strain"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#86198f" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl"
              ? "Niezawodność sprzętu medycznego i lotniczego wzrosła wykładniczo"
              : lang === "de"
                ? "Zuverlaessigkeit in Medizin und Luftfahrt stieg gewaltig"
                : "Drastically elevated life-critical reliability in medicine and aerospace"}
          </text>
        </g>
      )}
    </svg>
  );
}

function CobotsHumanRobotSynergyDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Koboty i synergia człowieka z maszyną: bezpieczna współpraca"
      : lang === "de"
        ? "Cobots und Mensch-Roboter-Kollaboration: Sichere Kooperation"
        : "Collaborative robots (cobots): human-robot synergy in manufacturing";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect
        x="10"
        y="10"
        width="380"
        height="220"
        rx="14"
        fill="#f0fdf4"
        stroke="#16a34a"
        strokeWidth="2"
      />
      <g>
        <circle cx="120" cy="80" r="30" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="120" y="75" textAnchor="middle" fontSize="18">
          👷 💡
        </text>
        <text x="120" y="95" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#15803d">
          Human Judgment
        </text>

        <circle cx="280" cy="80" r="30" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
        <text x="280" y="75" textAnchor="middle" fontSize="18">
          🤖 🦾
        </text>
        <text x="280" y="95" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#065f46">
          Cobot Power
        </text>

        <line
          x1="150"
          y1="80"
          x2="250"
          y2="80"
          stroke="#16a34a"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#15803d" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Force-Sensing Arms Work Safely Beside Human Operators
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#bbf7d0">
            {lang === "pl"
              ? "Robot unosi 50-kilogramowy silnik, podczas gdy technik precyzyjnie montuje przewody"
              : lang === "de"
                ? "Der Roboter traegt schwere Lasten, der Mensch fuehrt Feinarbeiten aus"
                : "Robots lift heavy chassis members while technicians handle dexterous assembly"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl"
              ? "Automatyzacja uwalnia ludzki potencjał do rozwiązywania problemów"
              : lang === "de"
                ? "Automation schafft Raum fuer Kreativitaet und Problemlosung"
                : "Automation elevates human labor from brute force to cognitive leadership"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [cobotCount, setCobotCount] = useState(1);
  const throughput = cobotCount * 50;
  const isFullyAutomated = cobotCount >= 5;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Factory Automation Level: {cobotCount}/5 | Daily Units Packaged: {throughput} Units
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            const next = Math.min(5, cobotCount + 1);
            setCobotCount(next);
            if (next >= 5) onDone?.();
          }}
        >
          Deploy Robotic Welding Arm (+Precision)
        </button>
        <button type="button" className="btn btn-quiet" onClick={() => setCobotCount(1)}>
          Reset to Manual Tooling
        </button>
      </div>
      <div
        style={{
          padding: "12px",
          background: isFullyAutomated ? "#eef8ef" : "#f0fdf4",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {isFullyAutomated
          ? "Robotic Cell Optimization Achieved: 6-axis cobots weld with sub-millimeter precision 24 hours a day, shielding workers from toxic fumes and extreme repetitive strain!"
          : "Manual Workshop: Workers perform repetitive heavy welding by hand under high heat and fatigue."}
      </div>
    </div>
  );
}

function AutomationWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>
        What is the primary operational and human benefit of deploying industrial robotics in
        manufacturing?
      </p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Robots can be trained to juggle flaming bowling pins during company picnics
      </button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>
        Robots take over repetitive, hazardous, and ergonomically grueling tasks, such as heavy
        lifting and toxic spray painting, while executing operations with consistent sub-millimeter
        precision
      </button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>
        Robots allow factories to eliminate electricity and run entirely on bubblegum
      </button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "automation",
  story: [
    animatedBeat(
      [
        T(
          "Meet Arjun. He watches an orange six-axis robotic arm spin through complex 3D space, placing spot welds on a car frame with laser precision.",
          "Das ist Arno. Er beobachtet einen Roboterarm, der mit Laserpraezision Schweisspunkte auf eine Karosserie setzt.",
          "Poznaj Arjuna. Obserwuje pomarańczowe ramię robota przemysłowego, które z laserową precyzją wykonuje zgrzewy na karoserii samochodu.",
        ),
        T(
          "For generations, factory welding and foundry casting were among the most physically grueling and dangerous jobs in industrial society.",
          "Jahrzehntelang gehoerten Schweissen und Giesserei zu den haertesten und giftigsten Berufen der Industrie.",
          "Przez pokolenia praca przy spawaniu i odlewnictwie należała do najbardziej wyczerpujących i niebezpiecznych zajęć w przemyśle.",
        ),
        T(
          "Workers inhaled toxic metal fumes, endured intense heat, and suffered debilitating repetitive stress injuries to their joints.",
          "Arbeiter atmeten giftige Daempfe ein, ertrugen enorme Hitze und riskierten schwere Gelenkschaeden.",
          "Robotnicy wdychali trujące opary, znosili żar pieców i cierpieli na przewlekłe urazy stawów od powtarzalnego wysiłku.",
        ),
      ],
      RoboticArmsWeldingDiagram,
    ),
    animatedBeat(
      [
        T(
          "In 1961, inventor George Devol and entrepreneur Joseph Engelberger introduced Unimate, the world's first industrial robot, at General Motors.",
          "1961 installierten George Devol und Joseph Engelberger bei General Motors mit Unimate den ersten Industrieroboter.",
          "W 1961 roku wynalazca George Devol i przedsiębiorca Joseph Engelberger zainstalowali w General Motors pierwszego robota przemysłowego: Unimate.",
        ),
        T(
          "Unimate used hydraulic actuators and magnetic drum memory to pull hot die-cast door handles out of molds and weld them onto auto bodies.",
          "Unimate entnahm gluehend heisse Druckgussteile aus Formen und schweisste sie zuverlaesslich an Karosserien.",
          "Unimate wyjmował rozgrzane do czerwoności odlewy z form i bezbłędnie zgrzewał je z elementami nadwozia.",
        ),
        T(
          "It never complained of fatigue, never suffered heat exhaustion, and performed the identical programmed trajectory thousands of times consecutively.",
          "Er ermuedete nie, litt nicht unter Hitze und wiederholte seine Bewegungen tausendfach millimetergenau.",
          "Nie ulegał zmęczeniu, nie doznawał udaru cieplnego i powtarzał zaprogramowaną trajektorię tysiące razy z rzędu.",
        ),
      ],
      ClosedLoopFeedbackCyberneticsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Modern automation relies on cybernetic feedback loops: sensors detect environmental variances, controllers compute corrections, and actuators respond.",
          "Moderne Automation nutzt geschlossene Regelkreise: Sensoren messen, Rechner entscheiden und Aktoren steuern nach.",
          "Nowoczesna automatyzacja opiera się na sprzężeniu zwrotnym: czujniki rejestrują otoczenie, sterowniki liczą korektę, a siłowniki wykonują ruch.",
        ),
        T(
          "Optical vision systems inspect circuit boards at two hundred frames per second, catching microscopic soldering flaws invisible to human eyes.",
          "Kamerasysteme scannen 200 Platinen pro Sekunde und finden Loetfehler, die kein menschliches Auge sehen kann.",
          "Kamery optyczne analizują dwieście płytek drukowanych na sekundę, wykrywając mikroskopijne wady lutownicze niedostrzegalne dla człowieka.",
        ),
        T(
          "In logistics centers, fleets of thousands of autonomous mobile robots retrieve storage pods and deliver them directly to packaging bays.",
          "In Logistikzentren bewegen tausende autonome Roboter ganze Regale lautlos zu Packstationen.",
          "W centrach logistycznych tysiące autonomicznych robotów transportowych bezszelestnie przewozi regały wprost do stacji pakowania.",
        ),
      ],
      AutomatedWarehouseLogisticsDiagram,
    ),
    animatedBeat(
      [
        T(
          "The rise of automation sparked profound debates regarding the nature of human labor and employment.",
          "Der Vormarsch der Roboter loeste intensive Debatten ueber die Zukunft der menschlichen Arbeit aus.",
          "Rozwój robotyki wywołał głęboką debatę nad przyszłością ludzkiej pracy i zatrudnienia.",
        ),
        T(
          "While automation phased out repetitive manual assembly roles, it created massive demand for robotics engineers, systems integrators, and software coders.",
          "Zwar fielen stupide Handgriffe weg, doch entstanden neue Berufe fuer Mechatroniker, Softwareentwickler und Steuerungsingenieure.",
          "Choć automatyzacja wyeliminowała żmudne czynności manualne, stworzyła ogromne zapotrzebowanie na inżynierów mechatroniki, robotyków i programistów.",
        ),
        T(
          "By handling the 'three Ds', jobs that are dull, dirty, or dangerous, robots allow human beings to elevate their work to design and problem solving.",
          "Indem Roboter gefaehrliche und monotone Aufgaben uebernehmen, befreien sie Menschen fuer kreative Loesungen.",
          "Przejmując zadania monotonne, brudne i niebezpieczne, roboty pozwalają ludziom skupić się na inżynierii, projektowaniu i rozwiązywaniu problemów.",
        ),
      ],
      QualityDefectZeroErrorDiagram,
    ),
    animatedBeat(
      [
        T(
          "Today, industrial engineering focuses heavily on 'collaborative robots' or cobots.",
          "Heute praegen sogenannte Cobots die Industrie: Roboter, die Hand in Hand mit Menschen arbeiten.",
          "Współczesna inżynieria kładzie nacisk na 'roboty współpracujące', czyli tak zwane koboty.",
        ),
        T(
          "Equipped with sensitive force-torque sensors, cobots stop instantly upon brushing human skin, enabling safe side-by-side teamwork without safety cages.",
          "Mit Kraftsensoren stoppen sie sofort bei Beruehrung und arbeiten sicher neben Menschen ohne Schutzgitter.",
          "Dzięki czułym sensorom momentu siły koboty zatrzymują się natychmiast przy dotknięciu, pracując bezpiecznie ramię w ramię z człowiekiem bez klatek ochronnych.",
        ),
        T(
          "The union of relentless mechanical precision and human cognitive creativity represents the cutting edge of global manufacturing.",
          "Die Verbindung aus unermuedlicher Praezision und menschlicher Klugheit treibt die moderne Industrie an.",
          "Połączenie niezrównanej precyzji maszyn i ludzkiej kreatywności stanowi szczytowe osiągnięcie współczesnej wytwórczości.",
        ),
      ],
      CobotsHumanRobotSynergyDiagram,
    ),
  ],
  toyIntro: T(
    "Coordinate an automated manufacturing cell: deploy 6-axis cobots with closed-loop optical feedback to achieve zero-defect welding 24 hours a day.",
    "Steuere eine automatisierte Fertigungszelle: Setze 6-Achs-Cobots mit optischem Feedback ein, um fehlerfrei rund um die Uhr zu produzieren.",
    "Zarządzaj zautomatyzowaną komórką produkcyjną: wdrażaj 6-osiowe koboty ze sprzężeniem optycznym, osiągając bezbłędną produkcję przez całą dobę.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why was the installation of Unimate at General Motors in 1961 such an important landmark in industrial history?",
        "Warum war die Installation des Unimate bei General Motors 1961 ein historischer Wendepunkt?",
        "Dlaczego zainstalowanie robota Unimate w General Motors w 1961 roku było przełomowym wydarzeniem w historii przemysłu?",
      ),
      options: [
        {
          text: T(
            "It was the first commercial programmable robot used to perform dangerous, repetitive industrial tasks: extracting red-hot castings and spot-welding auto bodies",
            "Es war der erste programmierbare Industrieroboter, der gefaehrliche, heisse Druckgussteile handhabte und Karosserien schweisste",
            "Był to pierwszy komercyjny programowalny robot wykonujący niebezpieczne czynności przemysłowe: wyciąganie gorących odlewów i zgrzewanie blach",
          ),
          correct: true,
        },
        {
          text: T(
            "Unimate was designed to play piano concertos during the workers' lunch breaks",
            "Unimate spielte in der Mittagspause klassische Klavierkonzerte fuer die Belegschaft",
            "Unimate został zaprojektowany, aby grać koncerty fortepianowe podczas przerw obiadowych",
          ),
          correct: false,
        },
        {
          text: T(
            "Unimate was powered entirely by fresh lemon juice and sea salt",
            "Unimate wurde ausschliesslich mit Zitronensaft und Meersalz betrieben",
            "Unimate był zasilany wyłącznie sokiem z cytryny i solą morską",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about what jobs were too hot, dangerous, or toxic for human hands.",
        "Achte darauf, welche gefaehrlichen Aufgaben Maschinen fuer Menschen uebernehmen konnten.",
        "Zwróć uwagę na zadania, które były zbyt gorące, toksyczne lub niebezpieczne dla ludzkich rąk.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "How do modern collaborative robots (cobots) differ fundamentally from traditional industrial robotic arms?",
        "Wie unterscheiden sich moderne Cobots grundlegend von traditionellen Industrierobotern?",
        "Czym różnią się nowoczesne roboty współpracujące (koboty) od tradycyjnych robotów przemysłowych?",
      ),
      options: [
        {
          text: T(
            "Cobots feature integrated force-torque sensors and speed limits that allow them to safely operate directly alongside human workers without heavy steel cages",
            "Cobots besitzen Kraftsensoren und Tempo-Limits, sodass sie ohne Schutzgitter gefahrlos direkt mit Menschen kooperieren",
            "Koboty mają wbudowane czujniki siły i ograniczniki prędkości, co pozwala im bezpiecznie pracować ramię w ramię z ludźmi bez stalowych klatek",
          ),
          correct: true,
        },
        {
          text: T(
            "Cobots are made out of inflatable rubber balloons and party streamers",
            "Cobots bestehen aus aufblasbaren Luftballons und bunten Girlanden",
            "Koboty są wykonane z nadmuchiwanych balonów i serpentyn",
          ),
          correct: false,
        },
        {
          text: T(
            "Cobots are legally required to wear a business suit and necktie at all times",
            "Cobots muessen in der Fabrik immer Schlips und Anzug tragen",
            "Koboty mają prawny obowiązek noszenia garnituru i krawata podczas pracy",
          ),
          correct: false,
        },
      ],
      hint: T(
        "Think about safety sensors, force limiting, and eliminating protective cages.",
        "Denke an Kraftbegrenzung, Beruehrungssensoren und den Verzicht auf Schutzkaefige.",
        "Pomyśl o czujnikach nacisku, ograniczeniach siły i rezygnacji z barier ochronnych.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Examine the primary human and operational benefits of automating dull, dirty, and dangerous tasks in manufacturing.",
        "Untersuche die menschlichen und wirtschaftlichen Vorteile der Automation schwerer und gefaehrlicher Arbeiten.",
        "Zbadaj kluczowe korzyści społeczne i wydajnościowe wynikające z automatyzacji prac monotonnych, brudnych i niebezpiecznych.",
      ),
      Widget: AutomationWidget,
      hint: T(
        "Focus on worker ergonomics, safety, repeatability, and shifting humans toward design roles.",
        "Achte auf Arbeitssicherheit, Gesundheit, Praezision und anspruchsvollere Berufe.",
        "Skup się na bezpieczeństwie pracy, precyzji wykonania i przejściu ludzi do ról projektowych.",
      ),
    },
  ],
  askDad: T(
    "Ask your parent: Have you ever interacted with an automated machine, robot vacuum, or automated checkout counter, and how did it change your routine?",
    "Frage deine Eltern: Nutzt ihr Staubsaugerroboter oder Selbstbedienungskassen, und wie veraendert das euren Alltag?",
    "Zapytaj rodziców: Czy korzystacie w domu z robota sprzątającego lub kas samoobsługowych i jak to wpłynęło na Wasze nawyki?",
  ),
  realLife: {
    title: T(
      "Real world: Unimate at GM's Ternstedt Plant in Trenton, New Jersey (1961)",
      "Echte Welt: Der Unimate im GM-Werk Trenton, New Jersey (1961)",
      "Prawdziwy świat: Robot Unimate w fabryce GM w Trenton, New Jersey (1961)",
    ),
    body: T(
      "In spring 1961, George Devol and Joseph Engelberger shipped the first production Unimate arm to General Motors' Ternstedt plant in Ewing Township near Trenton, New Jersey. The arm grabbed white-hot die-cast door handles and automotive hardware out of casting machines and plunged them into cooling liquid baths, a task that frequently resulted in burns and severe injuries for human operators. By 1969, GM had automated an entire car body welding line at Lordstown, Ohio, cutting welding cycle times dramatically.",
      "Im Fruehjahr 1961 lieferten George Devol und Joseph Engelberger den ersten Unimate-Roboterarm an ein General-Motors-Werk in New Jersey. Der Roboter griff gluehend heisse Tuergriffe direkt aus den Druckgussmaschinen und kuehlte sie ab, eine Arbeit, bei der sich Menschen oft schwer verbrannten. Bis 1969 automatisierte GM ganze Schweissstrassen in Ohio und steigerte die Fertigungsgeschwindigkeit enorm.",
      "Wiosną 1961 roku George Devol i Joseph Engelberger dostarczyli pierwszego robota Unimate do zakładu General Motors w Trenton w stanie New Jersey. Ramię chwytało rozżarzone klamki samochodowe prosto z maszyn odlewniczych i zanurzało je w chłodziwie, chroniąc ludzi przed częstymi i ciężkimi poparzeniami. Do 1969 roku GM zautomatyzowało całą linię zgrzewania nadwozi w Lordstown w Ohio, radykalnie skracając czas produkcji.",
    ),
  },
  factCard: {
    claims: [
      {
        text: T(
          "George Devol applied for US Patent 2,988,237 for 'Programmed Article Transfer' in 1954, granted in June 1961, defining the industrial robot.",
          "George Devol meldete 1954 das Patent fuer programmierbare Handhabungsgeraete an, das 1961 erteilt wurde.",
          "George Devol zgłosił w 1954 r. patent USA nr 2 988 237 na programowalne przenoszenie przedmiotów, przyznany w czerwcu 1961 r.",
        ),
        source: "https://patents.google.com/patent/US2988237A/en",
      },
      {
        text: T(
          "Joseph Engelberger founded Unimation in 1956, producing the world's first commercial industrial robots.",
          "Joseph Engelberger gruendete 1956 Unimation, das weltweit erste Unternehmen fuer Industrieroboter.",
          "Joseph Engelberger założył w 1956 r. firmę Unimation, pierwszego na świecie producenta robotów przemysłowych.",
        ),
        source: "https://www.robotics.org/joseph-engelberger-biography",
      },
      {
        text: T(
          "The International Federation of Robotics reported that operational global industrial robot stock exceeded 3.9 million units in 2023.",
          "Die International Federation of Robotics meldete fuer 2023 weltweit ueber 3,9 Millionen aktive Industrieroboter.",
          "Międzynarodowa Federacja Robotyki (IFR) odnotowała ponad 3,9 miliona pracujących robotów przemysłowych na świecie w 2023 r.",
        ),
        source: "https://ifr.org/ifr-press-releases/news/world-robotics-2023-report",
      },
      {
        text: T(
          "Universal Robots introduced the UR5, the first commercially viable collaborative robot (cobot), in December 2008.",
          "Universal Robots praesentierte im Dezember 2008 mit dem UR5 den ersten erfolgreichen kollaborierenden Roboter.",
          "Universal Robots zaprezentowało w grudniu 2008 r. model UR5, pierwszego udanego komercyjnie robota współpracującego (kobota).",
        ),
        source: "https://www.universal-robots.com/about-universal-robots/history/",
      },
      {
        text: T(
          "Kiva Systems developed autonomous mobile warehouse robots, acquired by Amazon in March 2012 for $775 million.",
          "Kiva Systems entwickelte autonome Lagerroboter und wurde 2012 von Amazon fuer 775 Millionen Dollar uebernommen.",
          "Firma Kiva Systems opracowała autonomiczne roboty magazynowe, przejęte przez Amazon w marcu 2012 r. za kwotę 775 mln dolarów.",
        ),
        source: "https://www.sec.gov/Archives/edgar/data/1018724/000119312512122606/d316104d8k.htm",
      },
    ],
    simplified: [
      T(
        "Complex kinematic inverse transformation matrices, proportional-integral-derivative control algorithms, and multi-robot path planning are translated into hands-on cobot simulations and clear safety principles.",
        "Inverse Kinematik, PID-Regelkreise und kollisionsfreie Bahnplanungen wurden in intuitive Roboter-Simulationen und anschauliche Beispiele uebersetzt.",
        "Złożone macierze kinematyki odwrotnej, regulatory PID i algorytmy wyznaczania tras robotów przedstawiono w formie intuicyjnych symulacji i jasnych reguł bezpieczeństwa pracy.",
      ),
    ],
  },
};
