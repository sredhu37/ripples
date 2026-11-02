import type { DiagramProps } from "../lesson/types";

export function TriangleNodesDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      {/* Triangle geometry */}
      <polygon points="200,30 80,160 320,160" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4" />

      {/* Top Node: Government */}
      <g transform="translate(200, 30)">
        <circle cx="0" cy="0" r="22" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
        <text x="0" y="5" textAnchor="middle" fontSize="14">🏛️</text>
        <text x="0" y="-28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#3730a3">Government</text>
      </g>

      {/* Bottom Left: Citizens */}
      {step >= 2 && (
        <g transform="translate(80, 160)">
          <circle cx="0" cy="0" r="22" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fontSize="14">👥</text>
          <text x="0" y="32" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">Citizens</text>
        </g>
      )}

      {/* Bottom Right: Businesses */}
      {step >= 3 && (
        <g transform="translate(320, 160)">
          <circle cx="0" cy="0" r="22" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fontSize="14">🏪</text>
          <text x="0" y="32" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b45309">Businesses</text>
        </g>
      )}
    </svg>
  );
}

export function FlowArrowsDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      {/* Triangle base */}
      <polygon points="200,35 80,155 320,155" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />

      {/* Edge 1: Citizens <-> Government */}
      <text x="120" y="85" textAnchor="middle" fontSize="9" fill="#475569" transform="rotate(-45 120 85)">
        Votes & Taxes →
      </text>
      <text x="140" y="105" textAnchor="middle" fontSize="9" fill="#15803d" transform="rotate(-45 140 105)">
        ← Public Goods
      </text>

      {/* Edge 2: Businesses <-> Government */}
      {step >= 2 && (
        <>
          <text x="270" y="90" textAnchor="middle" fontSize="9" fill="#475569" transform="rotate(45 270 90)">
            ← Taxes & Compliance
          </text>
          <text x="250" y="110" textAnchor="middle" fontSize="9" fill="#0369a1" transform="rotate(45 250 110)">
            Rules & Infrastructure →
          </text>
        </>
      )}

      {/* Edge 3: Citizens <-> Businesses */}
      {step >= 3 && (
        <>
          <text x="200" y="145" textAnchor="middle" fontSize="9" fill="#b45309">
            Labor & Purchases →
          </text>
          <text x="200" y="172" textAnchor="middle" fontSize="9" fill="#166534">
            ← Wages & Products
          </text>
        </>
      )}
    </svg>
  );
}

export function ImbalanceFailureDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(30, 20)">
        <text x="170" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
          What Happens When One Corner Dominates?
        </text>
        <g transform="translate(10, 40)">
          <rect x="0" y="0" width="100" height="85" fill="#fee2e2" rx="4" />
          <text x="50" y="25" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#991b1b">Gov 100%</text>
          <text x="50" y="45" textAnchor="middle" fontSize="8" fill="#7f1d1d">Authoritarian:</text>
          <text x="50" y="60" textAnchor="middle" fontSize="8" fill="#7f1d1d">Liberties crushed</text>
          <text x="50" y="75" textAnchor="middle" fontSize="8" fill="#7f1d1d">Initative lost</text>
        </g>
        <g transform="translate(120, 40)">
          <rect x="0" y="0" width="100" height="85" fill="#fef3c7" rx="4" />
          <text x="50" y="25" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#b45309">Business 100%</text>
          <text x="50" y="45" textAnchor="middle" fontSize="8" fill="#92400e">Monopoly rule:</text>
          <text x="50" y="60" textAnchor="middle" fontSize="8" fill="#92400e">Pollution unchecked</text>
          <text x="50" y="75" textAnchor="middle" fontSize="8" fill="#92400e">Workers harmed</text>
        </g>
        <g transform="translate(230, 40)">
          <rect x="0" y="0" width="100" height="85" fill="#e0f2fe" rx="4" />
          <text x="50" y="25" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369a1">Citizen Demands</text>
          <text x="50" y="45" textAnchor="middle" fontSize="8" fill="#075985">Zero taxes/rules:</text>
          <text x="50" y="60" textAnchor="middle" fontSize="8" fill="#075985">Roads crumble</text>
          <text x="50" y="75" textAnchor="middle" fontSize="8" fill="#075985">Public goods fail</text>
        </g>
      </g>
      {step >= 2 && (
        <text x="200" y="165" textAnchor="middle" fontSize="11" fill="#dc2626" fontWeight="bold">
          Total domination by any single corner causes structural breakdown!
        </text>
      )}
    </svg>
  );
}

export function EquilibriumDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <polygon points="200,40 100,150 300,150" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
      
      <circle cx="200" cy="40" r="16" fill="#4f46e5" />
      <text x="200" y="45" textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="bold">G</text>

      <circle cx="100" cy="150" r="16" fill="#16a34a" />
      <text x="100" y="155" textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="bold">C</text>

      <circle cx="300" cy="150" r="16" fill="#d97706" />
      <text x="300" y="155" textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="bold">B</text>

      <text x="200" y="115" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
        Equilibrium
      </text>

      {step >= 2 && (
        <text x="200" y="180" textAnchor="middle" fontSize="11" fill="#334155">
          Dynamic balance creates freedom, prosperity, and reliable public services
        </text>
      )}
    </svg>
  );
}

export function HarmonyDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <rect x="0" y="0" width="90" height="80" fill="#ede9fe" stroke="#6366f1" rx="6" />
        <text x="45" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4338ca">Citizens</text>
        <text x="45" y="48" textAnchor="middle" fontSize="18">🗳️</text>
        <text x="45" y="68" textAnchor="middle" fontSize="8" fill="#4338ca">Vote & Work</text>

        <rect x="105" y="0" width="90" height="80" fill="#fef3c7" stroke="#f59e0b" rx="6" />
        <text x="45" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b45309">Business</text>
        <text x="45" y="48" textAnchor="middle" fontSize="18">🍞</text>
        <text x="45" y="68" textAnchor="middle" fontSize="8" fill="#b45309">Wages & Goods</text>

        <rect x="210" y="0" width="90" height="80" fill="#dcfce7" stroke="#16a34a" rx="6" />
        <text x="45" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#15803d">Government</text>
        <text x="45" y="48" textAnchor="middle" fontSize="18">⚖️</text>
        <text x="45" y="68" textAnchor="middle" fontSize="8" fill="#15803d">Rules & Courts</text>
      </g>
      {step >= 2 && (
        <text x="200" y="160" textAnchor="middle" fontSize="12" fill="#15803d" fontWeight="bold">
          Each checks the others so no single corner holds unchecked power
        </text>
      )}
    </svg>
  );
}
