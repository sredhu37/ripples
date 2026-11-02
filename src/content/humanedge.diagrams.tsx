import type { DiagramProps } from "../lesson/types";

export function TimelineStoneToAiDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Timeline from Stone to AI">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        The Great Arc of Human Tools
      </text>

      {/* Evolution timeline line */}
      <line x1="60" y1="120" x2="340" y2="120" stroke="#94a3b8" strokeWidth="3" />

      {/* 4 milestones */}
      <circle cx="90" cy="120" r="14" fill="#d97706" />
      <text x="90" y="150" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f">Stone Axe</text>

      <circle cx="160" cy="120" r="14" fill="#0284c7" />
      <text x="160" y="150" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369a1">Steam Gear</text>

      <circle cx="240" cy="120" r="14" fill="#10b981" />
      <text x="240" y="150" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#065f46">Microchip</text>

      <circle cx="310" cy="120" r="14" fill="#8b5cf6" />
      <text x="310" y="150" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#5b21b6">AI Neural Net</text>

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">
          Across thousands of years, humans have continually invented tools to expand capability
        </text>
      )}
    </svg>
  );
}

export function MachineSpeedComparisonDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Machine Speed vs Human Reflection">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0369a1">
        Speed vs Thoughtful Reflection
      </text>

      {/* Left box: Machine speed */}
      <rect x="60" y="80" width="125" height="75" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="122" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">Computer</text>
      <text x="122" y="125" textAnchor="middle" fontSize="10" fill="#0284c7">1,000,000,000</text>
      <text x="122" y="140" textAnchor="middle" fontSize="8" fill="#64748b">Calculations / Sec</text>

      {/* Right box: Human pondering */}
      <rect x="215" y="80" width="125" height="75" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <text x="277" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">Human Mind</text>
      <text x="277" y="125" textAnchor="middle" fontSize="10" fill="#b45309">Wisdom & Ethics</text>
      <text x="277" y="140" textAnchor="middle" fontSize="8" fill="#64748b">Why Does It Matter?</text>

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0c4a6e">
          Computers provide raw speed, but humans supply conscience, judgment, and purpose
        </text>
      )}
    </svg>
  );
}

export function HeartEmpathyCompassionDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Empathy and Human Care">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#fff1f2" stroke="#fecdd3" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9f1239">
        Empathy: The Uniquely Human Gift
      </text>

      {/* Glowing heart */}
      <path
        d="M200 135 C170 100 145 120 170 150 L200 175 L230 150 C255 120 230 100 200 135 Z"
        fill="#e11d48"
        stroke="#be123c"
        strokeWidth="2"
      />
      <circle cx="170" cy="115" r="16" fill="#fb7185" opacity="0.6" />
      <circle cx="230" cy="115" r="16" fill="#fb7185" opacity="0.6" />

      {/* Compassion rays */}
      <line x1="150" y1="95" x2="135" y2="85" stroke="#f43f5e" strokeWidth="2" />
      <line x1="250" y1="95" x2="265" y2="85" stroke="#f43f5e" strokeWidth="2" />
      <line x1="200" y1="85" x2="200" y2="72" stroke="#f43f5e" strokeWidth="2" />

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#881337">
          No algorithm can genuinely comfort a crying friend or feel real human tenderness
        </text>
      )}
    </svg>
  );
}

export function CreativeTeamCollaborationDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Creative Human Collaboration">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#6b21a8">
        Creativity and Teamwork
      </text>

      {/* 3 friends collaborating around a table */}
      <circle cx="130" cy="105" r="14" fill="#a855f7" />
      <circle cx="200" cy="95" r="14" fill="#3b82f6" />
      <circle cx="270" cy="105" r="14" fill="#ec4899" />

      {/* Shared blueprint desk */}
      <ellipse cx="200" cy="140" rx="75" ry="18" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
      <polygon points="190,135 210,135 200,122" fill="#f59e0b" />

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#581c87">
          Collaborating with friends to build imaginative solutions is a uniquely human superpower
        </text>
      )}
    </svg>
  );
}

export function AmplifiedHumanValuesFutureDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Human Values Guiding Future Technology">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#065f46">
        Technology Amplifies Human Purpose
      </text>

      {/* Radiant earth in gentle hands */}
      <circle cx="200" cy="115" r="28" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
      <path d="M190 100 Q205 110 200 130 Q185 125 190 100 Z" fill="#22c55e" />
      <path d="M210 105 Q220 120 215 130 Q205 120 210 105 Z" fill="#22c55e" />

      {/* Supporting rays */}
      <circle cx="200" cy="115" r="42" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" />

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#064e3b">
          When guided by kindness and ethics, our tools can build a fairer, healthier world
        </text>
      )}
    </svg>
  );
}
