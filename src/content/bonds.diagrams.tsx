import type { DiagramProps } from "../lesson/types";

export function HarborWallDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Harbor Wall Project">
      {/* Ocean */}
      <rect x="0" y="140" width="400" height="100" fill="#0284c7" />
      {/* Stone Harbor Wall */}
      <rect x="80" y="90" width="240" height="60" rx="4" fill="#64748b" stroke="#334155" strokeWidth="2" />
      <line x1="80" y1="120" x2="320" y2="120" stroke="#475569" strokeWidth="2" strokeDasharray="8 4" />
      <text x="200" y="115" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f8fafc">
        Stone Harbor Wall
      </text>
      {/* Mayor Moss */}
      <circle cx="50" cy="120" r="14" fill="#fbbf24" />
      <text x="50" y="150" textAnchor="middle" fontSize="10" fill="#0f172a">Mayor</text>
      {step >= 2 && (
        <text x="200" y="190" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#f8fafc">
          Costs 100 coins to protect the entire town from waves
        </text>
      )}
    </svg>
  );
}

export function BondScrollDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="The Loan Scroll with Coupons">
      <rect x="40" y="30" width="320" height="170" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">
        Town Hall Bond: 100 Coins Principal
      </text>
      {/* 3 Coupons */}
      <g transform="translate(65, 90)">
        <rect x="0" y="0" width="80" height="55" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
        <text x="40" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b45309">Coupon 1</text>
        <text x="40" y="42" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">5 Coins</text>

        <rect x="95" y="0" width="80" height="55" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
        <text x="135" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b45309">Coupon 2</text>
        <text x="135" y="42" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">5 Coins</text>

        <rect x="190" y="0" width="80" height="55" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
        <text x="230" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b45309">Coupon 3</text>
        <text x="230" y="42" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">5 Coins</text>
      </g>
      {step >= 2 && (
        <text x="200" y="180" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#78350f">
          Tear off one coupon every Harvest Day to collect interest!
        </text>
      )}
    </svg>
  );
}

export function CouponPayoutDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Tearing Off Coupon">
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        Harvest Day Coupon Payout
      </text>
      <circle cx="200" cy="115" r="26" fill="#22c55e" />
      <text x="200" y="122" textAnchor="middle" fontSize="20" fill="#ffffff">🎟️</text>
      <text x="200" y="160" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#15803d">
        Town Hall pays 5 coins fixed interest
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#166534">
          At year 3 (maturity), Town Hall returns the full 100 coins principal
        </text>
      )}
    </svg>
  );
}

export function ZinsWippeDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="The Interest Seesaw">
      <rect x="40" y="30" width="320" height="170" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e3a8a">
        Die Zins-Wippe (The Interest Seesaw)
      </text>
      {/* Seesaw Plank tilted down on left */}
      <polygon points="190,160 210,160 200,120" fill="#475569" />
      <line x1="80" y1="145" x2="320" y2="95" stroke="#1e3a8a" strokeWidth="8" strokeLinecap="round" />
      {/* Left weight: High Bank Rates */}
      <rect x="60" y="150" width="80" height="35" rx="4" fill="#fee2e2" stroke="#ef4444" />
      <text x="100" y="172" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">Rates: 8%</text>
      {/* Right weight: Sinking Bond Price */}
      <rect x="260" y="55" width="80" height="35" rx="4" fill="#dbeafe" stroke="#3b82f6" />
      <text x="300" y="77" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8">Price: 85c</text>
      {step >= 2 && (
        <text x="200" y="192" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e40af">
          When bank interest goes up, old bond prices tilt down!
        </text>
      )}
    </svg>
  );
}

export function SovereignBondDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Federal Republic Bonds">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">
        German Federal Bonds (Bundesanleihen)
      </text>
      <text x="200" y="90" textAnchor="middle" fontSize="12" fill="#475569">
        Trusted worldwide to build bridges, rails, and green infrastructure
      </text>
      <circle cx="200" cy="130" r="24" fill="#0f172a" />
      <text x="200" y="136" textAnchor="middle" fontSize="16" fill="#facc15" fontWeight="bold">🦅</text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
          Guaranteed by German tax revenues and strict fiscal law
        </text>
      )}
    </svg>
  );
}
