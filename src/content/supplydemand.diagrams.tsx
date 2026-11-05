import type { DiagramProps } from "../lesson/types";

export function HarborCatchDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Złów w porcie" : lang === "de" ? "Fang am Hafen" : "Harbor Catch";
  const crateText =
    lang === "pl" ? "6 świeżych ryb" : lang === "de" ? "6 Frische Fische" : "6 Fresh Fish";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
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
        {crateText}
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
  const ariaLabel =
    lang === "pl" ? "Nadwyżka przy wysokiej cenie" : lang === "de" ? "Hoher Preis Ueberschuss" : "High Price Surplus";
  const priceTag =
    lang === "pl" ? "Cena: 8 monet" : lang === "de" ? "Preisschild: 8 Muenzen" : "Price Tag: 8 Coins";
  const fishLeft =
    lang === "pl" ? "Zostało 5 ryb" : lang === "de" ? "5 Fische uebrig" : "5 Fish Left";
  const spoiling =
    lang === "pl" ? "Psują się na słońcu" : lang === "de" ? "Verderben in der Sonne" : "Spoiling in Sun";
  const buyersCount =
    lang === "pl" ? "Tylko 1 kupiec" : lang === "de" ? "Nur 1 Kaeufer" : "Only 1 Buyer";
  const tooExpensive =
    lang === "pl" ? "O wiele za drogo!" : lang === "de" ? "Viel zu teuer!" : "Too Expensive!";
  const surplusMsg =
    lang === "pl"
      ? "Nadwyżka (niesprzedane marnotrawstwo)"
      : lang === "de"
      ? "Ueberschuss (Waren verschwendet)"
      : "Surplus (Unsold Waste)";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
      <text x="200" y="75" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">
        {priceTag}
      </text>
      {/* Crates */}
      <rect x="70" y="100" width="120" height="70" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="130" y="130" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b45309">
        {fishLeft}
      </text>
      <text x="130" y="152" textAnchor="middle" fontSize="11" fill="#78350f">
        {spoiling}
      </text>
      {/* Buyers */}
      <rect x="210" y="100" width="120" height="70" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="270" y="130" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b91c1c">
        {buyersCount}
      </text>
      <text x="270" y="152" textAnchor="middle" fontSize="11" fill="#991b1b">
        {tooExpensive}
      </text>
      {step >= 2 && (
        <text x="200" y="192" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">
          {surplusMsg}
        </text>
      )}
    </svg>
  );
}

export function LowPriceDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Niedobór przy niskiej cenie" : lang === "de" ? "Niedriger Preis Mangel" : "Low Price Shortage";
  const priceTag =
    lang === "pl" ? "Cena: 1 moneta" : lang === "de" ? "Preisschild: 1 Muenze" : "Price Tag: 1 Coin";
  const fishLeft =
    lang === "pl" ? "0 ryb w skrzyni" : lang === "de" ? "0 Fische uebrig" : "0 Fish Left";
  const soldOut =
    lang === "pl" ? "Sprzedane w 10 sekund" : lang === "de" ? "In 10 Sek. weg" : "Sold in 10s";
  const buyersCount =
    lang === "pl" ? "15 głodnych kupców" : lang === "de" ? "15 Hungrige Kaeufer" : "15 Hungry Buyers";
  const shouting =
    lang === "pl" ? "Krzyczą i są głodni" : lang === "de" ? "Rufen und hungrig" : "Shouting and Empty";
  const shortageMsg =
    lang === "pl"
      ? "Niedobór (puste brzuchy)"
      : lang === "de"
      ? "Mangel (Leere Baeuche)"
      : "Shortage (Empty Stomachs)";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
      <text x="200" y="75" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">
        {priceTag}
      </text>
      {/* Sold out */}
      <rect x="70" y="100" width="120" height="70" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="130" y="130" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b91c1c">
        {fishLeft}
      </text>
      <text x="130" y="152" textAnchor="middle" fontSize="11" fill="#991b1b">
        {soldOut}
      </text>
      {/* Huge crowd */}
      <rect x="210" y="100" width="120" height="70" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="270" y="130" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b45309">
        {buyersCount}
      </text>
      <text x="270" y="152" textAnchor="middle" fontSize="11" fill="#78350f">
        {shouting}
      </text>
      {step >= 2 && (
        <text x="200" y="192" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">
          {shortageMsg}
        </text>
      )}
    </svg>
  );
}

export function EquilibriumDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Równowaga rynkowa" : lang === "de" ? "Marktgleichgewicht" : "Market Equilibrium";
  const fairPrice =
    lang === "pl" ? "Uczciwa cena: 4 monety" : lang === "de" ? "Fairer Preis: 4 Muenzen" : "Fair Price: 4 Coins";
  const supplyCount =
    lang === "pl" ? "6 ryb" : lang === "de" ? "6 Fische" : "6 Fish";
  const supplyWord =
    lang === "pl" ? "Podaż" : lang === "de" ? "Angebot" : "Supply";
  const demandCount =
    lang === "pl" ? "6 kupców" : lang === "de" ? "6 Kaeufer" : "6 Buyers";
  const demandWord =
    lang === "pl" ? "Popyt" : lang === "de" ? "Nachfrage" : "Demand";
  const clearedMsg =
    lang === "pl"
      ? "Rynek w równowadze: zero odpadów, nikt nie jest głodny"
      : lang === "de"
      ? "Markt geraeumt: Kein Mangel, kein Abfall"
      : "Market Cleared: No Waste, No Hunger";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="75" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#166534">
        {fairPrice}
      </text>
      {/* Supply side */}
      <rect x="70" y="100" width="110" height="65" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
      <text x="125" y="128" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
        {supplyCount}
      </text>
      <text x="125" y="148" textAnchor="middle" fontSize="11" fill="#166534">
        {supplyWord}
      </text>
      {/* Scale balance */}
      <circle cx="200" cy="130" r="14" fill="#22c55e" />
      <text x="200" y="135" textAnchor="middle" fontSize="14" fill="#ffffff" fontWeight="bold">=</text>
      {/* Demand side */}
      <rect x="220" y="100" width="110" height="65" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
      <text x="275" y="128" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
        {demandCount}
      </text>
      <text x="275" y="148" textAnchor="middle" fontSize="11" fill="#166534">
        {demandWord}
      </text>
      {step >= 2 && (
        <text x="200" y="190" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
          {clearedMsg}
        </text>
      )}
    </svg>
  );
}

export function MarketHarmonyDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Harmonia rynkowa" : lang === "de" ? "Markt-Harmonie" : "Market Harmony";
  const balanceTitle =
    lang === "pl"
      ? "Podaż i popyt w równowadze"
      : lang === "de"
      ? "Angebot & Nachfrage im Gleichgewicht"
      : "Supply & Demand in Balance";
  const guideSubtitle =
    lang === "pl"
      ? "Ceny kierują towary tam, gdzie ludzie ich potrzebują"
      : lang === "de"
      ? "Preise lenken Waren dorthin, wo sie gebraucht werden"
      : "Prices guide goods where people need them";
  const selfBalancing =
    lang === "pl"
      ? "Samoregulujący się rynek"
      : lang === "de"
      ? "Selbstregulierender Markt"
      : "Self-Balancing Market";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#eff6ff" stroke="#93c5fd" strokeWidth="2" />
      {/* Balance beam SVG */}
      <g transform="translate(200, 75)">
        <polygon points="0,0 -8,22 8,22" fill="#2563eb" />
        <line x1="-36" y1="0" x2="36" y2="0" stroke="#1d4ed8" strokeWidth="3" />
        <circle cx="-36" cy="0" r="5" fill="#f59e0b" />
        <circle cx="36" cy="0" r="5" fill="#10b981" />
      </g>
      <text x="200" y="125" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e3a8a">
        {balanceTitle}
      </text>
      <text x="200" y="150" textAnchor="middle" fontSize="12" fill="#1e40af">
        {guideSubtitle}
      </text>
      {step >= 2 && (
        <g>
          <rect x="100" y="168" width="200" height="24" rx="12" fill="#dbeafe" />
          <text x="200" y="184" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8">
            {selfBalancing}
          </text>
        </g>
      )}
    </svg>
  );
}
