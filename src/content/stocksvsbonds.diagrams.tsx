import type { DiagramProps } from "../lesson/types";

export function ExpeditionShipDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Expedition Ship In Dock">
      <defs>
        <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      <rect x="0" y="140" width="400" height="100" fill="url(#seaGrad)" />
      {/* Ship */}
      <path d="M100 130 L280 130 L250 170 L130 170 Z" fill="#78350f" stroke="#451a03" strokeWidth="3" />
      <line x1="180" y1="50" x2="180" y2="130" stroke="#451a03" strokeWidth="4" />
      <polygon points="180,60 250,90 180,120" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      {/* Captain Coral */}
      <circle cx="210" cy="115" r="12" fill="#fbbf24" />
      {step >= 2 && (
        <text x="200" y="210" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f8fafc">
          The Great Ocean Voyage: Funded by Stocks & Bonds
        </text>
      )}
    </svg>
  );
}

export function EquityVsDebtDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Equity vs Debt Comparison">
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        Two Ways to Fund the Ship
      </text>
      {/* Stock (Finn) */}
      <rect x="65" y="90" width="120" height="70" rx="6" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
      <text x="125" y="115" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c2410c">Finn: Stock (Equity)</text>
      <text x="125" y="132" textAnchor="middle" fontSize="10" fill="#9a3412">Co-owner of the ship</text>
      <text x="125" y="148" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#c2410c">Unlimited Upside</text>
      {/* Bond (Bea) */}
      <rect x="215" y="90" width="120" height="70" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="275" y="115" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">Bea: Bond (Debt)</text>
      <text x="275" y="132" textAnchor="middle" fontSize="10" fill="#075985">Lender to the voyage</text>
      <text x="275" y="148" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">Fixed 5c Coupon</text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#475569">
          One shares in treasure; the other gets a legal promise
        </text>
      )}
    </svg>
  );
}

export function GrandTreasureDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Grand Treasure Outcome">
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">
        Grand Treasure: 100 Coins Brought Back!
      </text>
      <g transform="translate(60, 85)">
        <rect x="0" y="0" width="130" height="65" rx="6" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
        <text x="65" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">Finn (Stockholder)</text>
        <text x="65" y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#166534">95 Coins!</text>

        <rect x="150" y="0" width="130" height="65" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <text x="215" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">Bea (Bondholder)</text>
        <text x="215" y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0369a1">5 Coins</text>
      </g>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">
          Stockholders enjoy massive windfalls when the business thrives!
        </text>
      )}
    </svg>
  );
}

export function ShipwreckPriorityDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Creditor Priority in Scrape">
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#fef2f2" stroke="#fca5a5" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#991b1b">
        Shipwreck: Only 4 Coins Salvaged!
      </text>
      <g transform="translate(60, 85)">
        <rect x="0" y="0" width="130" height="65" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
        <text x="65" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">Finn (Stockholder)</text>
        <text x="65" y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#b91c1c">0 Coins</text>

        <rect x="150" y="0" width="130" height="65" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <text x="215" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">Bea (Bondholder)</text>
        <text x="215" y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0369a1">4 Coins</text>
      </g>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">
          Legal Priority: Creditors are repaid before co-owners get a cent!
        </text>
      )}
    </svg>
  );
}

export function PortfolioBalanceDiagram({ step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Balanced Portfolio">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#166534">
        The Prudent Blend: Growth & Safety
      </text>
      <circle cx="150" cy="120" r="32" fill="#ea580c" opacity="0.9" />
      <text x="150" y="125" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">Stocks</text>
      <circle cx="250" cy="120" r="32" fill="#0284c7" opacity="0.9" />
      <text x="250" y="125" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">Bonds</text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">
          Stocks for future growth, bonds for steady peace of mind
        </text>
      )}
    </svg>
  );
}
