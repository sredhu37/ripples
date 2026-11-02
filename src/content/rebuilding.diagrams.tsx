import type { DiagramProps } from "../lesson/types";

export function RuinsOfEuropeDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Europe in 1945">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
        Europe in 1945: The Need for Rebuilding
      </text>
      {/* Broken railway / factory */}
      <line x1="80" y1="130" x2="160" y2="130" stroke="#64748b" strokeWidth="4" />
      <line x1="240" y1="130" x2="320" y2="130" stroke="#64748b" strokeWidth="4" />
      {/* Gap in the middle */}
      <text x="200" y="135" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">Broken Link</text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
          Factories in ruins and families longing for shelter and bread
        </text>
      )}
    </svg>
  );
}

export function SchumanDeclarationDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="The Schuman Declaration 1950">
      <rect x="40" y="30" width="320" height="180" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">
        9 May 1950: The Schuman Declaration
      </text>
      {/* Document scroll */}
      <rect x="130" y="80" width="140" height="85" rx="6" fill="#ffffff" stroke="#93c5fd" strokeWidth="2" />
      <text x="200" y="110" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">
        Pool Coal & Steel
      </text>
      <text x="200" y="130" textAnchor="middle" fontSize="10" fill="#3b82f6">
        "War between France and Germany
      </text>
      <text x="200" y="145" textAnchor="middle" fontSize="10" fill="#3b82f6">
        becomes materially impossible"
      </text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8">
          The birth of European economic integration
        </text>
      )}
    </svg>
  );
}

export function CoalAndSteelVatsDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="European Coal and Steel Pool">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#fffbeb" stroke="#fef08a" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#854d0e">
        The Coal and Steel Community (EGKS)
      </text>
      {/* Coal Vat */}
      <rect x="70" y="80" width="110" height="80" rx="8" fill="#334155" />
      <text x="125" y="115" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f8fafc">Rhine Coal</text>
      <text x="125" y="135" textAnchor="middle" fontSize="10" fill="#cbd5e1">Energy for homes</text>

      {/* Steel Vat */}
      <rect x="220" y="80" width="110" height="80" rx="8" fill="#475569" />
      <text x="275" y="115" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f8fafc">Lorraine Steel</text>
      <text x="275" y="135" textAnchor="middle" fontSize="10" fill="#cbd5e1">Girders for bridges</text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#713f12">
          Shared resources governed jointly under European law
        </text>
      )}
    </svg>
  );
}

export function RebuiltRailwayBridgeDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Rebuilt Peace Bridge">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        The Rebuilt Peace Bridge Across the Rhine
      </text>
      {/* River */}
      <rect x="50" y="140" width="300" height="40" fill="#38bdf8" opacity="0.5" />
      {/* Arch Bridge */}
      <path d="M50 140 Q200 70 350 140" stroke="#15803d" strokeWidth="6" fill="none" />
      <line x1="50" y1="140" x2="350" y2="140" stroke="#1e293b" strokeWidth="3" />
      {/* Train */}
      <rect x="160" y="125" width="80" height="15" rx="3" fill="#0284c7" />
      <circle cx="180" cy="140" r="4" fill="#0f172a" />
      <circle cx="220" cy="140" r="4" fill="#0f172a" />
      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">
          Fast trains carrying students, goods, and friends across borders
        </text>
      )}
    </svg>
  );
}

export function EuropeanUnionStarsDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Circle of Gold Stars">
      <rect x="40" y="30" width="320" height="180" rx="12" fill="#1e3a8a" stroke="#172554" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ffffff">
        The European Union
      </text>
      {/* 12 Stars in circle */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 200 + 45 * Math.cos(rad);
        const cy = 125 + 45 * Math.sin(rad);
        return <text key={deg} x={cx} y={cy + 4} textAnchor="middle" fontSize="12" fill="#facc15">★</text>;
      })}
      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fef08a">
          Seventy years of unbroken peace through shared democratic union
        </text>
      )}
    </svg>
  );
}
