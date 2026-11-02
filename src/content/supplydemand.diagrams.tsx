import type { DiagramProps } from "../lesson/types";

export function HarborCatchDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Harbor Catch" : "Fang am Hafen"}>
      <defs>
        <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      <rect x="0" y="140" width="400" height="100" fill="url(#waterGrad)" />
      <rect x="20" y="100" width="140" height="50" rx="4" fill="#78350f" />
      <polygon points="90,40 40,100 140,100" fill="#f8fafc" />
      <line x1="90" y1="30" x2="90" y2="100" stroke="#451a03" strokeWidth="4" />
      {/* Pier */}
      <rect x="180" y="110" width="200" height="20" fill="#92400e" rx="2" />
      <rect x="210" y="130" width="16" height="50" fill="#78350f" />
      <rect x="330" y="130" width="16" height="50" fill="#78350f" />
      {/* Finn and catch */}
      <circle cx="230" cy="85" r="14" fill="#fbbf24" />
      <path d="M216 110 Q230 95 244 110" fill="#0284c7" />
      {/* Crates with fish */}
      <rect x="270" y="90" width="76" height="20" fill="#b45309" rx="2" />
      <text x="308" y="105" textAnchor="middle" fontSize="11" fill="#fef3c7" fontWeight="bold">
        {lang === "en" ? "6 Fresh Fish" : "6 Frische Fische"}
      </text>
      {step >= 2 && (
        <g>
          <circle cx="100" cy="180" r="8" fill="#38bdf8" opacity="0.6" />
          <circle cx="120" cy="170" r="12" fill="#38bdf8" opacity="0.4" />
        </g>
      )}
    </svg>
  );
}

export function HighPriceDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "High Price Surplus" : "Hoher Preis Ueberschuss"}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
      <text x="200" y="75" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">
        {lang === "en" ? "Price Tag: 8 Coins" : "Preisschild: 8 Muenzen"}
      </text>
      {/* Crates */}
      <rect x="70" y="100" width="120" height="70" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="130" y="130" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b45309">
        {lang === "en" ? "5 Fish Left" : "5 Fische uebrig"}
      </text>
      <text x="130" y="152" textAnchor="middle" fontSize="11" fill="#78350f">
        {lang === "en" ? "Spoiling in Sun" : "Verderben in der Sonne"}
      </text>
      {/* Buyers */}
      <rect x="210" y="100" width="120" height="70" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="270" y="130" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b91c1c">
        {lang === "en" ? "Only 1 Buyer" : "Nur 1 Kaeufer"}
      </text>
      <text x="270" y="152" textAnchor="middle" fontSize="11" fill="#991b1b">
        {lang === "en" ? "Too Expensive!" : "Viel zu teuer!"}
      </text>
      {step >= 2 && (
        <text x="200" y="192" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">
          {lang === "en" ? "Surplus (Unsold Waste)" : "Ueberschuss (Waren verschwendet)"}
        </text>
      )}
    </svg>
  );
}

export function LowPriceDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Low Price Shortage" : "Niedriger Preis Mangel"}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
      <text x="200" y="75" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">
        {lang === "en" ? "Price Tag: 1 Coin" : "Preisschild: 1 Muenze"}
      </text>
      {/* Sold out */}
      <rect x="70" y="100" width="120" height="70" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="130" y="130" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b91c1c">
        {lang === "en" ? "0 Fish Left" : "0 Fische uebrig"}
      </text>
      <text x="130" y="152" textAnchor="middle" fontSize="11" fill="#991b1b">
        {lang === "en" ? "Sold in 10s" : "In 10 Sek. weg"}
      </text>
      {/* Huge crowd */}
      <rect x="210" y="100" width="120" height="70" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="270" y="130" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b45309">
        {lang === "en" ? "15 Hungry Buyers" : "15 Hungrige Kaeufer"}
      </text>
      <text x="270" y="152" textAnchor="middle" fontSize="11" fill="#78350f">
        {lang === "en" ? "Shouting and Empty" : "Rufen und hungrig"}
      </text>
      {step >= 2 && (
        <text x="200" y="192" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">
          {lang === "en" ? "Shortage (Empty Stomachs)" : "Mangel (Leere Baeuche)"}
        </text>
      )}
    </svg>
  );
}

export function EquilibriumDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Market Equilibrium" : "Marktgleichgewicht"}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="75" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#166534">
        {lang === "en" ? "Fair Price: 4 Coins" : "Fairer Preis: 4 Muenzen"}
      </text>
      {/* Supply side */}
      <rect x="70" y="100" width="110" height="65" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
      <text x="125" y="128" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
        {lang === "en" ? "6 Fish" : "6 Fische"}
      </text>
      <text x="125" y="148" textAnchor="middle" fontSize="11" fill="#166534">
        {lang === "en" ? "Supply" : "Angebot"}
      </text>
      {/* Scale balance */}
      <circle cx="200" cy="130" r="14" fill="#22c55e" />
      <text x="200" y="135" textAnchor="middle" fontSize="14" fill="#ffffff" fontWeight="bold">=</text>
      {/* Demand side */}
      <rect x="220" y="100" width="110" height="65" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
      <text x="275" y="128" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
        {lang === "en" ? "6 Buyers" : "6 Kaeufer"}
      </text>
      <text x="275" y="148" textAnchor="middle" fontSize="11" fill="#166534">
        {lang === "en" ? "Demand" : "Nachfrage"}
      </text>
      {step >= 2 && (
        <text x="200" y="190" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
          {lang === "en" ? "Market Cleared: No Waste, No Hunger" : "Markt geraeumt: Kein Mangel, kein Abfall"}
        </text>
      )}
    </svg>
  );
}

export function MarketHarmonyDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Market Harmony" : "Markt-Harmonie"}>
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#eff6ff" stroke="#93c5fd" strokeWidth="2" />
      {/* Balance beam SVG */}
      <g transform="translate(200, 75)">
        <polygon points="0,0 -8,22 8,22" fill="#2563eb" />
        <line x1="-36" y1="0" x2="36" y2="0" stroke="#1d4ed8" strokeWidth="3" />
        <circle cx="-36" cy="0" r="5" fill="#f59e0b" />
        <circle cx="36" cy="0" r="5" fill="#10b981" />
      </g>
      <text x="200" y="125" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e3a8a">
        {lang === "en" ? "Supply & Demand in Balance" : "Angebot & Nachfrage im Gleichgewicht"}
      </text>
      <text x="200" y="150" textAnchor="middle" fontSize="12" fill="#1e40af">
        {lang === "en" ? "Prices guide goods where people need them" : "Preise lenken Waren dorthin, wo sie gebraucht werden"}
      </text>
      {step >= 2 && (
        <g>
          <rect x="100" y="168" width="200" height="24" rx="12" fill="#dbeafe" />
          <text x="200" y="184" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8">
            {lang === "en" ? "Self-Balancing Market" : "Selbstregulierender Markt"}
          </text>
        </g>
      )}
    </svg>
  );
}
