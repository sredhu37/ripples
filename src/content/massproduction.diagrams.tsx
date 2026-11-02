import type { DiagramProps } from "../lesson/types";

export function ArtisanWorkshopDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Artisan Workshop">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#fffbeb" stroke="#fef3c7" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">
        Traditional Artisan Handcrafting
      </text>

      {/* Workbench */}
      <rect x="80" y="140" width="240" height="18" fill="#78350f" rx="3" />
      <rect x="100" y="158" width="16" height="35" fill="#451a03" />
      <rect x="284" y="158" width="16" height="35" fill="#451a03" />

      {/* Hand tools on wall */}
      <rect x="100" y="85" width="6" height="35" fill="#94a3b8" />
      <circle cx="103" cy="85" r="5" fill="#64748b" />
      <rect x="125" y="90" width="4" height="30" fill="#94a3b8" />
      <polygon points="120,90 134,90 127,78" fill="#64748b" />

      {/* Single handmade clock */}
      <circle cx="200" cy="115" r="22" fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
      <line x1="200" y1="115" x2="200" y2="102" stroke="#78350f" strokeWidth="2" />
      <line x1="200" y1="115" x2="210" y2="115" stroke="#78350f" strokeWidth="2" />

      {step >= 2 && (
        <text x="200" y="210" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350f">
          Each piece was cut and filed by hand to fit only that single item
        </text>
      )}
    </svg>
  );
}

export function LuxuryPriceTagDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="High Costs of Handmade Goods">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#fff1f2" stroke="#fecdd3" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9f1239">
        Handmade Goods Were Rare Luxuries
      </text>

      {/* Golden pocket watch */}
      <circle cx="140" cy="125" r="32" fill="#fef08a" stroke="#ca8a04" strokeWidth="4" />
      <circle cx="140" cy="125" r="24" fill="#ffffff" stroke="#ca8a04" strokeWidth="1" />
      <line x1="140" y1="125" x2="140" y2="110" stroke="#854d0e" strokeWidth="2" />
      <line x1="140" y1="125" x2="152" y2="125" stroke="#854d0e" strokeWidth="2" />
      <path d="M140 93 L140 85" stroke="#ca8a04" strokeWidth="4" />

      {/* Big price tag */}
      <rect x="220" y="95" width="110" height="60" rx="8" fill="#e11d48" />
      <text x="275" y="122" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ffffff">
        500 Coins
      </text>
      <text x="275" y="142" textAnchor="middle" fontSize="10" fill="#fecdd3">
        1 Month of Wages
      </text>

      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#881337">
          Because craft took weeks, ordinary families could not afford basic machines
        </text>
      )}
    </svg>
  );
}

export function InterchangeableGearsDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Interchangeable Parts">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="2" />
      <text x="200" y="58" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        Interchangeable Standard Parts
      </text>

      {/* 3 identical gears side by side */}
      {[100, 200, 300].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="120" r="26" fill="#bbf7d0" stroke="#16a34a" strokeWidth="3" />
          <circle cx={cx} cy="120" r="8" fill="#ffffff" stroke="#15803d" strokeWidth="2" />
          <line x1={cx} y1="88" x2={cx} y2="152" stroke="#15803d" strokeWidth="3" />
          <line x1={cx - 32} y1="120" x2={cx + 32} y2="120" stroke="#15803d" strokeWidth="3" />
          <text x={cx} y="165" textAnchor="middle" fontSize="10" fill="#166534">Identical</text>
        </g>
      ))}

      {step >= 2 && (
        <text x="200" y="198" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">
          Every part made to the exact same size: any gear fits any clock or bicycle
        </text>
      )}
    </svg>
  );
}

export function MovingConveyorAssemblyDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Moving Assembly Line">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        The Moving Assembly Line
      </text>

      {/* Conveyor belt */}
      <rect x="60" y="130" width="280" height="16" rx="4" fill="#334155" />
      {[80, 140, 200, 260, 320].map((x) => (
        <circle key={x} cx={x} cy="138" r="5" fill="#94a3b8" />
      ))}

      {/* 3 Workstations */}
      <rect x="80" y="80" width="50" height="40" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="105" y="104" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369a1">1. Frame</text>

      <rect x="175" y="80" width="50" height="40" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="200" y="104" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369a1">2. Wheels</text>

      <rect x="270" y="80" width="50" height="40" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="295" y="104" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369a1">3. Inspect</text>

      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">
          Conveyor belts brought parts directly to workers, multiplying production tenfold
        </text>
      )}
    </svg>
  );
}

export function BicyclesForEveryoneDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Affordable Goods for All">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#115e59">
        Affordable Bicycles for Every Family
      </text>

      {/* Bicycle outline */}
      <circle cx="130" cy="135" r="24" fill="none" stroke="#0d9488" strokeWidth="4" />
      <circle cx="230" cy="135" r="24" fill="none" stroke="#0d9488" strokeWidth="4" />
      <path d="M130 135 L170 135 L200 95 L150 95 Z" fill="none" stroke="#0f766e" strokeWidth="4" />
      <line x1="200" y1="95" x2="230" y2="135" stroke="#0f766e" strokeWidth="4" />
      <line x1="170" y1="135" x2="165" y2="85" stroke="#0f766e" strokeWidth="4" />
      <line x1="155" y1="85" x2="175" y2="85" stroke="#115e59" strokeWidth="4" />

      {/* Reduced price badge */}
      <rect x="270" y="90" width="85" height="50" rx="8" fill="#0d9488" />
      <text x="312" y="112" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">
        50 Coins
      </text>
      <text x="312" y="130" textAnchor="middle" fontSize="9" fill="#ccfbf1">
        Affordable!
      </text>

      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#134e4a">
          Lower costs turned luxury goods into everyday tools for ordinary households
        </text>
      )}
    </svg>
  );
}
