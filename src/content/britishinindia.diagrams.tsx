import type { DiagramProps } from "../lesson/types";

export function CharteredSealDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Royal Chartered Company Seal">
      <defs>
        <radialGradient id="waxSeal" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="110" r="55" fill="url(#waxSeal)" stroke="#450a0a" strokeWidth="4" />
      <circle cx="200" cy="110" r="45" fill="none" stroke="#fecaca" strokeWidth="2" strokeDasharray="4 4" />
      <text x="200" y="115" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">
        1600 CHARTER
      </text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7f1d1d">
          A private company granted monopoly trading rights
        </text>
      )}
    </svg>
  );
}

export function CompanyFortressDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Company Armed Fortress">
      <rect x="50" y="70" width="300" height="110" rx="4" fill="#64748b" stroke="#334155" strokeWidth="3" />
      {/* Bastions */}
      <rect x="40" y="50" width="40" height="130" fill="#475569" stroke="#1e293b" strokeWidth="2" />
      <rect x="320" y="50" width="40" height="130" fill="#475569" stroke="#1e293b" strokeWidth="2" />
      {/* Flag */}
      <line x1="200" y1="20" x2="200" y2="70" stroke="#1e293b" strokeWidth="3" />
      <rect x="200" y="20" width="40" height="25" fill="#ef4444" />
      <text x="200" y="125" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f8fafc">
        Fort William / Harbor Fortress
      </text>
      {step >= 2 && (
        <text x="200" y="205" textAnchor="middle" fontSize="11" fill="#1e293b">
          Private armies and walls protecting company warehouses
        </text>
      )}
    </svg>
  );
}

export function VillageHandloomDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Indian Artisan Handloom">
      <rect x="40" y="30" width="320" height="175" rx="10" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">
        Bengal Village Cotton Handloom
      </text>
      {/* Loom frame */}
      <rect x="110" y="80" width="180" height="80" fill="none" stroke="#78350f" strokeWidth="4" />
      {/* Threads */}
      <line x1="130" y1="80" x2="130" y2="160" stroke="#f59e0b" strokeWidth="2" />
      <line x1="160" y1="80" x2="160" y2="160" stroke="#f59e0b" strokeWidth="2" />
      <line x1="190" y1="80" x2="190" y2="160" stroke="#f59e0b" strokeWidth="2" />
      <line x1="220" y1="80" x2="220" y2="160" stroke="#f59e0b" strokeWidth="2" />
      <line x1="250" y1="80" x2="250" y2="160" stroke="#f59e0b" strokeWidth="2" />
      {/* Shuttle */}
      <rect x="150" y="115" width="80" height="14" rx="6" fill="#b45309" />
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350f">
          Weaving world-renowned fine muslin fabrics
        </text>
      )}
    </svg>
  );
}

export function IndustrialLoomManchesterDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Industrial Steam Factory in Manchester">
      <rect x="40" y="30" width="320" height="175" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
        Industrial Steam Loom Factory
      </text>
      {/* Chimney */}
      <rect x="80" y="50" width="25" height="50" fill="#64748b" />
      <path d="M92 45 Q110 30 92 15" stroke="#94a3b8" strokeWidth="4" fill="none" />
      {/* Factory Floor */}
      <rect x="70" y="95" width="260" height="75" rx="4" fill="#475569" />
      {/* Gears */}
      <circle cx="140" cy="132" r="18" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
      <circle cx="200" cy="132" r="18" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
      <circle cx="260" cy="132" r="18" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
      {step >= 2 && (
        <text x="200" y="190" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">
          Mass-producing cheap cloth powered by coal steam
        </text>
      )}
    </svg>
  );
}

export function RailwayExportPortDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Railway Line to Ocean Harbor">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#065f46">
        Railways Built for Raw Resource Export
      </text>
      {/* Railway tracks */}
      <line x1="50" y1="130" x2="350" y2="130" stroke="#71717a" strokeWidth="4" />
      <line x1="50" y1="145" x2="350" y2="145" stroke="#71717a" strokeWidth="4" />
      {/* Ties */}
      {[70, 110, 150, 190, 230, 270, 310].map((x) => (
        <line key={x} x1={x} y1="122" x2={x} y2="153" stroke="#52525b" strokeWidth="4" />
      ))}
      <rect x="70" y="85" width="70" height="35" rx="4" fill="#047857" />
      <text x="105" y="107" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">Raw Cotton</text>
      <rect x="160" y="85" width="70" height="35" rx="4" fill="#047857" />
      <text x="195" y="107" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">Tea Leaves</text>
      {step >= 2 && (
        <text x="200" y="190" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#064e3b">
          Shipping natural wealth out through ocean ports
        </text>
      )}
    </svg>
  );
}
