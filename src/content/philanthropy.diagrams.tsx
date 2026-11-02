import type { DiagramProps } from "../lesson/types";

export function SavingsChestDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Captain Coral's Savings Chest">
      <defs>
        <linearGradient id="chestWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>
      {/* Chest */}
      <rect x="120" y="70" width="160" height="100" rx="8" fill="url(#chestWood)" stroke="#1e293b" strokeWidth="3" />
      <path d="M120 70 Q200 40 280 70 Z" fill="#b45309" stroke="#1e293b" strokeWidth="2" />
      <circle cx="200" cy="95" r="12" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
      <text x="200" y="140" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fef3c7">
        1,000 Gold Coins
      </text>
      {step >= 2 && (
        <text x="200" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">
          Saved across a lifetime of honest sailing
        </text>
      )}
    </svg>
  );
}

export function SpendingVsPreservingDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Handouts vs Foundation">
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
        Two Ways to Give Back
      </text>
      {/* Handouts */}
      <rect x="60" y="85" width="125" height="75" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="122" y="110" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">Instant Handouts</text>
      <text x="122" y="128" textAnchor="middle" fontSize="10" fill="#991b1b">Spent in 2 years</text>
      <text x="122" y="146" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7f1d1d">Gone Forever!</text>
      {/* Foundation */}
      <rect x="215" y="85" width="125" height="75" rx="6" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
      <text x="277" y="110" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">The Foundation</text>
      <text x="277" y="128" textAnchor="middle" fontSize="10" fill="#166534">Endowment stays</text>
      <text x="277" y="146" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">Yield Gives Forever!</text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#475569">
          Protect the tree trunk; harvest only the apples
        </text>
      )}
    </svg>
  );
}

export function EndowmentTreeDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="The Endowment Tree">
      {/* Soil */}
      <rect x="50" y="170" width="300" height="40" rx="4" fill="#78350f" />
      <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fef3c7">
        Endowment Vault: 1,000 Coins Capital
      </text>
      {/* Trunk */}
      <rect x="180" y="100" width="40" height="70" fill="#92400e" />
      {/* Canopy */}
      <circle cx="200" cy="70" r="50" fill="#22c55e" />
      {/* Apples */}
      <circle cx="175" cy="55" r="7" fill="#ef4444" />
      <circle cx="215" cy="50" r="7" fill="#ef4444" />
      <circle cx="190" cy="80" r="7" fill="#ef4444" />
      <circle cx="225" cy="80" r="7" fill="#ef4444" />
      {step >= 2 && (
        <text x="200" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
          Every year, 40 coins of fresh fruit grow naturally!
        </text>
      )}
    </svg>
  );
}

export function PerpetualCommunityDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Perpetual Community Benefit">
      <rect x="40" y="30" width="320" height="175" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e3a8a">
        The Ripple Harbor Foundation
      </text>
      <g transform="translate(60, 80)">
        <rect x="0" y="0" width="85" height="60" rx="6" fill="#ffffff" stroke="#93c5fd" />
        <text x="42" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">Library</text>
        <text x="42" y="44" textAnchor="middle" fontSize="10" fill="#3b82f6">Free Books</text>

        <rect x="100" y="0" width="85" height="60" rx="6" fill="#ffffff" stroke="#93c5fd" />
        <text x="142" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">Swim Dock</text>
        <text x="142" y="44" textAnchor="middle" fontSize="10" fill="#3b82f6">Water Safety</text>

        <rect x="200" y="0" width="85" height="60" rx="6" fill="#ffffff" stroke="#93c5fd" />
        <text x="242" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">Nature Park</text>
        <text x="242" y="44" textAnchor="middle" fontSize="10" fill="#3b82f6">Clean Forests</text>
      </g>
      {step >= 2 && (
        <text x="200" y="180" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">
          Helping generation after generation for centuries to come!
        </text>
      )}
    </svg>
  );
}

export function GermanFoundationsDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Foundations in Germany">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">
        25,000 Foundations in Germany
      </text>
      <text x="200" y="90" textAnchor="middle" fontSize="12" fill="#475569">
        Bosch, Bertelsmann, and Zeiss serving science & society
      </text>
      <circle cx="200" cy="130" r="26" fill="#15803d" />
      <text x="200" y="137" textAnchor="middle" fontSize="18" fill="#ffffff">🌱</text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
          Capital preserved forever; annual earnings dedicated to the common good
        </text>
      )}
    </svg>
  );
}
