import type { DiagramProps } from "../lesson/types";

export function MughalPavilionDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Mughal Pavilion Architecture">
      <defs>
        <linearGradient id="sandstone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
      </defs>
      {/* Arch Pavilion */}
      <rect x="70" y="70" width="260" height="130" rx="8" fill="url(#sandstone)" stroke="#1e293b" strokeWidth="2" />
      {/* Arches */}
      <path d="M100 200 C100 130 160 130 160 200 Z" fill="#fef2f2" />
      <path d="M170 200 C170 120 230 120 230 200 Z" fill="#fef2f2" />
      <path d="M240 200 C240 130 300 130 300 200 Z" fill="#fef2f2" />
      {/* Central Dome */}
      <path d="M160 70 Q200 25 240 70 Z" fill="#fecdd3" stroke="#b91c1c" strokeWidth="2" />
      <circle cx="200" cy="22" r="5" fill="#facc15" />
      {step >= 2 && (
        <text x="200" y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
          Red Sandstone Pavilion and Gardens
        </text>
      )}
    </svg>
  );
}

export function AkbarThroneDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Emperor Akbar Seeking Wisdom">
      <rect x="50" y="30" width="300" height="180" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">
        Emperor Akbar at Fatehpur Sikri
      </text>
      <circle cx="200" cy="115" r="32" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
      <path d="M188 124 L188 112 L194 118 L200 106 L206 118 L212 112 L212 124 Z" fill="#ffffff" stroke="#b45309" strokeWidth="1.5" />
      {step >= 2 && (
        <text x="200" y="175" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#78350f">
          Wisdom and listening guide a fair ruler
        </text>
      )}
    </svg>
  );
}

export function IbadatKhanaDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Ibadat Khana Dialogue Table">
      <rect x="40" y="30" width="320" height="180" rx="12" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        Ibadat Khana: The House of Wisdom
      </text>
      {/* Central Table */}
      <circle cx="200" cy="125" r="45" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
      <text x="200" y="130" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#854d0e">Shared Dialogue</text>
      {/* 4 Scholars */}
      <circle cx="130" cy="125" r="18" fill="#bae6fd" stroke="#0284c7" />
      <text x="130" y="130" textAnchor="middle" fontSize="10" fontWeight="bold">East</text>
      <circle cx="270" cy="125" r="18" fill="#bae6fd" stroke="#0284c7" />
      <text x="270" y="130" textAnchor="middle" fontSize="10" fontWeight="bold">West</text>
      <circle cx="200" cy="65" r="18" fill="#bae6fd" stroke="#0284c7" />
      <text x="200" y="70" textAnchor="middle" fontSize="10" fontWeight="bold">North</text>
      <circle cx="200" cy="185" r="18" fill="#bae6fd" stroke="#0284c7" />
      <text x="200" y="190" textAnchor="middle" fontSize="10" fontWeight="bold">South</text>
      {step >= 2 && (
        <text x="200" y="222" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">
          Scholars of all faiths discussing ethics
        </text>
      )}
    </svg>
  );
}

export function GrandTrunkRoadDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="The Grand Trunk Road">
      {/* Landscape */}
      <rect x="30" y="40" width="340" height="160" rx="10" fill="#fdf4ff" stroke="#f0abfc" strokeWidth="2" />
      <path d="M40 160 Q200 90 360 120" stroke="#a855f7" strokeWidth="8" fill="none" />
      <text x="200" y="70" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7e22ce">
        The Grand Trade Highway
      </text>
      <text x="80" y="180" textAnchor="middle" fontSize="11" fill="#6b21a8">Bengal Delta</text>
      <text x="320" y="140" textAnchor="middle" fontSize="11" fill="#6b21a8">Peshawar Pass</text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#581c87">
          Caravans, rest stops, wells, and secure travel
        </text>
      )}
    </svg>
  );
}

export function CulturalSynthesisDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Cultural Synthesis">
      <rect x="40" y="30" width="320" height="180" rx="12" fill="#eff6ff" stroke="#93c5fd" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e40af">
        Synthesis: Diverse Traditions Unite
      </text>
      <g transform="translate(60, 95)">
        <rect x="0" y="0" width="80" height="50" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="40" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">Architecture</text>
        <text x="40" y="40" textAnchor="middle" fontSize="10" fill="#64748b">Stone and Domes</text>

        <rect x="100" y="0" width="80" height="50" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="140" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">Astronomy</text>
        <text x="140" y="40" textAnchor="middle" fontSize="10" fill="#64748b">Star Tables</text>

        <rect x="200" y="0" width="80" height="50" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="240" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">Textiles</text>
        <text x="240" y="40" textAnchor="middle" fontSize="10" fill="#64748b">Fine Muslin</text>
      </g>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">
          Tolerance built lasting prosperity for millions
        </text>
      )}
    </svg>
  );
}
