import type { DiagramProps } from "../lesson/types";

export function PepperCornDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Black Pepper Sacks">
      <defs>
        <radialGradient id="pepperGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
      </defs>
      {/* Sacks */}
      <rect x="130" y="80" width="140" height="100" rx="16" fill="#d97706" stroke="#92400e" strokeWidth="3" />
      <text x="200" y="130" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">
        Malabar Pepper
      </text>
      {/* Peppercorns */}
      <circle cx="170" cy="155" r="8" fill="url(#pepperGrad)" />
      <circle cx="195" cy="150" r="9" fill="url(#pepperGrad)" />
      <circle cx="225" cy="155" r="8" fill="url(#pepperGrad)" />
      {step >= 2 && (
        <text x="200" y="210" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">
          Once worth its weight in pure silver coins!
        </text>
      )}
    </svg>
  );
}

export function SilkRoadCaravanDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Silk Road Overland Caravan">
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">
        The Overland Silk Road (12 Months)
      </text>
      {/* Camels / Trail */}
      <path d="M60 140 Q150 90 250 140 T340 120" fill="none" stroke="#d97706" strokeWidth="4" strokeDasharray="6 6" />
      <circle cx="100" cy="130" r="10" fill="#b45309" />
      <circle cx="180" cy="115" r="10" fill="#b45309" />
      <circle cx="270" cy="135" r="10" fill="#b45309" />
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#78350f">
          Mountain passes, desert storms, and dozens of toll gates
        </text>
      )}
    </svg>
  );
}

export function MonsoonWindDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Monsoon Wind Sailing">
      {/* Sea background */}
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0369a1">
        Monsoon Winds Across the Arabian Sea
      </text>
      {/* Wind arrows */}
      <path d="M60 160 C120 130 180 130 240 90" stroke="#0284c7" strokeWidth="4" fill="none" markerEnd="url(#arrow)" />
      <path d="M100 190 C160 160 220 160 280 120" stroke="#0284c7" strokeWidth="4" fill="none" />
      <path d="M140 210 C200 180 260 180 320 140" stroke="#0284c7" strokeWidth="4" fill="none" />
      <text x="120" y="110" fontSize="12" fontWeight="bold" fill="#0284c7">Summer Wind</text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0c4a6e">
          Seasonal winds blew ocean caravels across the open sea
        </text>
      )}
    </svg>
  );
}

export function CaravelShipDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Ocean Caravel Ship">
      <defs>
        <linearGradient id="hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#854d0e" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>
      {/* Ocean waves */}
      <path d="M30 170 Q100 150 200 170 T370 170 L370 210 L30 210 Z" fill="#38bdf8" />
      {/* Hull */}
      <path d="M100 160 L140 200 L260 200 L300 150 L100 160 Z" fill="url(#hull)" stroke="#1e293b" strokeWidth="2" />
      {/* Masts & Sails */}
      <line x1="170" y1="80" x2="170" y2="160" stroke="#78350f" strokeWidth="3" />
      <path d="M170 85 Q210 110 170 145 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="240" y1="95" x2="240" y2="160" stroke="#78350f" strokeWidth="3" />
      <path d="M240 100 Q270 120 240 150 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      {step >= 2 && (
        <text x="200" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">
          Carrying 50 sacks of pepper directly to port
        </text>
      )}
    </svg>
  );
}

export function SpeicherstadtWarehouseDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Hamburg Speicherstadt Brick Warehouse">
      <defs>
        <linearGradient id="brick" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
      </defs>
      {/* Canal water */}
      <rect x="30" y="170" width="340" height="40" fill="#0284c7" />
      {/* Warehouse building */}
      <rect x="70" y="60" width="260" height="110" fill="url(#brick)" stroke="#450a0a" strokeWidth="2" />
      {/* Windows */}
      <g fill="#fef2f2">
        <rect x="90" y="80" width="20" height="25" />
        <rect x="130" y="80" width="20" height="25" />
        <rect x="170" y="80" width="20" height="25" />
        <rect x="210" y="80" width="20" height="25" />
        <rect x="250" y="80" width="20" height="25" />
        <rect x="290" y="80" width="20" height="25" />
      </g>
      {step >= 2 && (
        <text x="200" y="40" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7f1d1d">
          Hamburg's Speicherstadt: Spice Warehouse of Europe
        </text>
      )}
    </svg>
  );
}
