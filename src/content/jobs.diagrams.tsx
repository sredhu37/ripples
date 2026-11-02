import type { DiagramProps } from "../lesson/types";

export function HistoricalVanishedTradesDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Historical Vanished Trades">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
      <text x="200" y="58" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#78350f">
        Jobs of Yesterday: Lamplighters & Operators
      </text>

      {/* Street lamplighter silhouette */}
      <g transform="translate(90, 80)">
        <line x1="20" y1="20" x2="20" y2="90" stroke="#451a03" strokeWidth="3" />
        <circle cx="20" cy="15" r="8" fill="#f59e0b" />
        {/* Worker pole */}
        <line x1="45" y1="90" x2="25" y2="20" stroke="#78350f" strokeWidth="2" />
        <circle cx="50" cy="55" r="8" fill="#92400e" />
        <line x1="50" y1="63" x2="50" y2="85" stroke="#92400e" strokeWidth="4" />
        <text x="35" y="105" textAnchor="middle" fontSize="9" fill="#92400e">Lamplighter</text>
      </g>

      {/* Switchboard operator */}
      <g transform="translate(240, 80)">
        <rect x="10" y="20" width="60" height="50" rx="4" fill="#78350f" />
        <circle cx="25" cy="35" r="3" fill="#fde68a" />
        <circle cx="40" cy="35" r="3" fill="#fde68a" />
        <circle cx="55" cy="35" r="3" fill="#fde68a" />
        <circle cx="25" cy="50" r="3" fill="#fde68a" />
        <circle cx="40" cy="50" r="3" fill="#fde68a" />
        <circle cx="55" cy="50" r="3" fill="#fde68a" />
        {/* Plug cable */}
        <path d="M25 35 Q40 65 55 50" stroke="#ef4444" strokeWidth="2" fill="none" />
        <text x="40" y="105" textAnchor="middle" fontSize="9" fill="#92400e">Switchboard</text>
      </g>

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350f">
          Millions once worked lighting gas lamps by hand and plugging telephone cords
        </text>
      )}
    </svg>
  );
}

export function ElectricSwitchboardAutomatedDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Automatic Switching and Electric Lamps">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0369a1">
        Automation Replaces Routine Tasks
      </text>

      {/* Electric lamp post with timer */}
      <g transform="translate(100, 80)">
        <line x1="20" y1="20" x2="20" y2="90" stroke="#334155" strokeWidth="3" />
        <circle cx="20" cy="15" r="9" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
        <rect x="12" y="50" width="16" height="16" rx="2" fill="#0284c7" />
        <text x="20" y="105" textAnchor="middle" fontSize="9" fill="#0369a1">Electric Timer</text>
      </g>

      {/* Electronic chip switch */}
      <g transform="translate(240, 80)">
        <rect x="10" y="20" width="60" height="50" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
        <circle cx="25" cy="45" r="4" fill="#22c55e" />
        <circle cx="40" cy="45" r="4" fill="#22c55e" />
        <circle cx="55" cy="45" r="4" fill="#22c55e" />
        <text x="40" y="105" textAnchor="middle" fontSize="9" fill="#0369a1">Digital Routing</text>
      </g>

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0c4a6e">
          Automatic timers turned lights on instantly and digital circuits replaced cord switchboards
        </text>
      )}
    </svg>
  );
}

export function NewTechCareersWindCyberDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Modern Emerging Professions">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#065f46">
        Entirely New Professions Emerge
      </text>

      {/* Wind Turbine Technician */}
      <g transform="translate(100, 75)">
        <line x1="25" y1="30" x2="25" y2="95" stroke="#64748b" strokeWidth="3" />
        <circle cx="25" cy="30" r="5" fill="#334155" />
        <line x1="25" y1="30" x2="25" y2="10" stroke="#059669" strokeWidth="2" />
        <line x1="25" y1="30" x2="45" y2="40" stroke="#059669" strokeWidth="2" />
        <line x1="25" y1="30" x2="5" y2="40" stroke="#059669" strokeWidth="2" />
        <text x="25" y="110" textAnchor="middle" fontSize="9" fill="#065f46">Wind Technician</text>
      </g>

      {/* Cybersecurity Analyst */}
      <g transform="translate(240, 75)">
        <rect x="10" y="25" width="60" height="45" rx="5" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
        <polygon points="40,32 50,37 50,47 40,53 30,47 30,37" fill="#10b981" />
        <text x="40" y="110" textAnchor="middle" fontSize="9" fill="#065f46">Security Analyst</text>
      </g>

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#064e3b">
          Clean energy, software engineering, and healthcare created millions of rewarding jobs
        </text>
      )}
    </svg>
  );
}

export function TransitionCareerShiftDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Career Transition and Upskilling">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#6b21a8">
        Upskilling Pathways for Workers
      </text>

      {/* Left box: Manual Mechanic */}
      <rect x="60" y="90" width="90" height="45" rx="6" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5" />
      <text x="105" y="110" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#6b21a8">Assembly</text>
      <text x="105" y="125" textAnchor="middle" fontSize="9" fill="#7e22ce">Manual Worker</text>

      {/* Arrow */}
      <line x1="160" y1="112" x2="230" y2="112" stroke="#9333ea" strokeWidth="3" />
      <polygon points="230,107 240,112 230,117" fill="#9333ea" />
      <text x="195" y="102" textAnchor="middle" fontSize="9" fill="#9333ea">Training</text>

      {/* Right box: Robotics Specialist */}
      <rect x="250" y="90" width="95" height="45" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="297" y="110" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#15803d">Robotics</text>
      <text x="297" y="125" textAnchor="middle" fontSize="9" fill="#166534">Programmer</text>

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#581c87">
          Through vocational training, mechanics become robotics and software technicians
        </text>
      )}
    </svg>
  );
}

export function LifelongLearningCuriosityDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Lifelong Learning and Human Curiosity">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e40af">
        Lifelong Learning is Your Superpower
      </text>

      {/* Open book with glowing lightbulb */}
      <path d="M160 140 C175 130 195 130 200 135 C205 130 225 130 240 140 L240 110 C225 100 205 100 200 105 C195 100 175 100 160 110 Z" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
      <circle cx="200" cy="80" r="14" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
      <line x1="200" y1="60" x2="200" y2="52" stroke="#eab308" strokeWidth="2" />
      <line x1="180" y1="70" x2="173" y2="65" stroke="#eab308" strokeWidth="2" />
      <line x1="220" y1="70" x2="227" y2="65" stroke="#eab308" strokeWidth="2" />

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">
          Curiosity, empathy, and continuous learning prepare every student for the future
        </text>
      )}
    </svg>
  );
}
