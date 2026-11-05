import type { DiagramProps } from "../lesson/types";

export function DangerousFoundryLaborDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Ciężka i niebezpieczna praca fizyczna"
      : lang === "de"
      ? "Schwere und gefaehrliche Handarbeit"
      : "Heavy and Hazardous Physical Labor";

  const sub =
    lang === "pl"
      ? "Pracownicy znosili skrajne gorąco, dźwiganie ciężarów i toksyczne opary we wczesnych fabrykach"
      : lang === "de"
      ? "Arbeiter litten unter Hitze, schwerem Heben und giftigen Daempfen in fruehen Fabriken"
      : "Workers endured extreme heat, heavy lifting, and toxic fumes in early factories";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Dangerous Heavy Manual Work">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#fff7ed" stroke="#fed7aa" strokeWidth="2" />
      <text x="200" y="58" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9a3412">
        {title}
      </text>

      {/* Molten crucible pot */}
      <rect x="140" y="100" width="120" height="70" rx="10" fill="#78350f" stroke="#451a03" strokeWidth="3" />
      <path d="M150 115 Q200 130 250 115" stroke="#f97316" strokeWidth="8" fill="none" />
      <circle cx="170" cy="118" r="4" fill="#fef08a" />
      <circle cx="210" cy="122" r="5" fill="#fef08a" />
      <circle cx="230" cy="116" r="3" fill="#fef08a" />

      {/* Heat sparks */}
      <line x1="170" y1="95" x2="160" y2="80" stroke="#ea580c" strokeWidth="2" />
      <line x1="230" y1="95" x2="245" y2="80" stroke="#ea580c" strokeWidth="2" />
      <line x1="200" y1="90" x2="200" y2="75" stroke="#ea580c" strokeWidth="2" />

      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c2d12">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function RoboticArmActuatorDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Mechaniczne ramię robota"
      : lang === "de"
      ? "Der mechanische Roboterarm"
      : "The Mechanical Robot Arm";

  const sub =
    lang === "pl"
      ? "Silniki elektryczne i przekładnie obracają się z dokładnością poniżej milimetra w każdym kierunku"
      : lang === "de"
      ? "Elektromotoren drehen sich mit Millimeter-Praezision in jede Richtung"
      : "Electric motors and gears rotate with sub-millimeter precision in any direction";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Jointed Robotic Arm">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        {title}
      </text>

      {/* Base stand */}
      <rect x="100" y="155" width="60" height="20" rx="4" fill="#334155" />
      <circle cx="130" cy="155" r="12" fill="#0284c7" />

      {/* Arm segment 1 */}
      <line x1="130" y1="155" x2="180" y2="105" stroke="#0284c7" strokeWidth="10" strokeLinecap="round" />
      <circle cx="180" cy="105" r="10" fill="#0369a1" />

      {/* Arm segment 2 */}
      <line x1="180" y1="105" x2="250" y2="105" stroke="#0284c7" strokeWidth="8" strokeLinecap="round" />
      <circle cx="250" cy="105" r="8" fill="#0369a1" />

      {/* Gripper hand */}
      <path d="M250 105 L275 95 M250 105 L275 115" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function PrecisionWeldingDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Niestrudzona precyzja na linii montażowej"
      : lang === "de"
      ? "Ermuedungsfreie Praezision am Band"
      : "Tireless Precision on the Line";

  const sub =
    lang === "pl"
      ? "Roboty wykonują gorące, powtarzalne spawy tysiące razy bez najmniejszego zmęczenia"
      : lang === "de"
      ? "Roboter fuehren heisse Schweissarbeiten tausende Male ohne Ermuedung aus"
      : "Robots perform hot, repetitive welds thousands of times without growing tired";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Precision Welding Cell">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0369a1">
        {title}
      </text>

      {/* Steel chassis on rail */}
      <rect x="90" y="130" width="220" height="30" rx="6" fill="#64748b" />
      <line x1="70" y1="165" x2="330" y2="165" stroke="#334155" strokeWidth="4" />

      {/* Welding sparks */}
      <circle cx="180" cy="130" r="10" fill="#fef08a" opacity="0.8" />
      <line x1="180" y1="130" x2="165" y2="115" stroke="#eab308" strokeWidth="2" />
      <line x1="180" y1="130" x2="195" y2="115" stroke="#eab308" strokeWidth="2" />
      <line x1="180" y1="130" x2="180" y2="110" stroke="#eab308" strokeWidth="2" />

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0c4a6e">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function SafetySensorsCurtainDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Kurtyny bezpieczeństwa chronią ludzi"
      : lang === "de"
      ? "Sicherheitssensoren schuetzen Menschen"
      : "Safety Sensors Protect Humans";

  const sub =
    lang === "pl"
      ? "Gdy człowiek przekroczy linię wiązek światła, maszyna zatrzymuje się w ułamku sekundy"
      : lang === "de"
      ? "Tritt ein Mensch durch das Lichtgitter, stoppt die Maschine sofort"
      : "If a person steps across the light curtain, the machine halts in a split second";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Infrared Safety Curtain">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#065f46">
        {title}
      </text>

      {/* Safety sensor pillars */}
      <rect x="90" y="85" width="14" height="85" rx="3" fill="#059669" />
      <rect x="296" y="85" width="14" height="85" rx="3" fill="#059669" />

      {/* Invisible light beams */}
      {[100, 118, 136, 154].map((y) => (
        <line
          key={y}
          x1="104"
          y1={y}
          x2="296"
          y2={y}
          stroke="#10b981"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      ))}

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#064e3b">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function HumanSupervisorSafeDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Ludzie kierują, maszyny wykonują"
      : lang === "de"
      ? "Menschen lenken, Maschinen arbeiten"
      : "Humans Direct, Machines Execute";

  const sub =
    lang === "pl"
      ? "Ludzie rozwiązują twórcze problemy i dbają o jakość, podczas gdy maszyny wykonują ciężką pracę"
      : lang === "de"
      ? "Menschen loesen kreative Aufgaben, waehrend Maschinen die schwere Arbeit tun"
      : "Humans solve creative problems and ensure quality while machines do the heavy lifting";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Human Supervisor and Design">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#6b21a8">
        {title}
      </text>

      {/* Human supervisor silhouette with tablet */}
      <circle cx="150" cy="100" r="16" fill="#9333ea" />
      <path d="M125 155 C125 125 175 125 175 155 Z" fill="#7e22ce" />
      <rect x="160" y="120" width="30" height="22" rx="3" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" />

      {/* Robot in background */}
      <rect x="250" y="105" width="40" height="50" rx="6" fill="#94a3b8" />
      <circle cx="270" cy="120" r="6" fill="#38bdf8" />

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#581c87">
          {sub}
        </text>
      )}
    </svg>
  );
}
