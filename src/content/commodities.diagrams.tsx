import type { DiagramProps } from "../lesson/types";

export function GrainSiloDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Centralny silos zbożowy" : lang === "de" ? "Zentrales Getreidesilo" : "Central Grain Silo";
  const siloTitle =
    lang === "pl" ? "Gminny silos zbożowy" : lang === "de" ? "Dorf-Getreidesilo" : "Town Grain Silo";
  const mayaName =
    lang === "pl" ? "Rolniczka Maya" : lang === "de" ? "Baeuerin Maya" : "Farmer Maya";
  const tomName =
    lang === "pl" ? "Rolnik Tom" : lang === "de" ? "Bauer Tom" : "Farmer Tom";
  const conclusion =
    lang === "pl"
      ? "Identyczna pszenica = standardowy surowiec"
      : lang === "de"
      ? "Identischer Weizen = Standard-Rohstoff"
      : "Identical Wheat = Standard Commodity";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <defs>
        <linearGradient id="siloGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
      </defs>
      {/* Silo body */}
      <rect x="140" y="60" width="120" height="140" rx="6" fill="url(#siloGrad)" stroke="#64748b" strokeWidth="2" />
      <path d="M140 60 Q200 20 260 60" fill="#94a3b8" stroke="#64748b" strokeWidth="2" />
      {/* Grain inside */}
      <rect x="150" y="110" width="100" height="85" fill="#facc15" opacity="0.8" rx="4" />
      <text x="200" y="155" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#854d0e">
        {siloTitle}
      </text>
      {/* Farmers */}
      <circle cx="80" cy="140" r="14" fill="#fbbf24" />
      <text x="80" y="170" textAnchor="middle" fontSize="11" fill="#475569">
        {mayaName}
      </text>
      <circle cx="320" cy="140" r="14" fill="#fb923c" />
      <text x="320" y="170" textAnchor="middle" fontSize="11" fill="#475569">
        {tomName}
      </text>
      {step >= 2 && (
        <text x="200" y="220" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">
          {conclusion}
        </text>
      )}
    </svg>
  );
}

export function IdenticalWheatDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Identyczne surowce" : lang === "de" ? "Identische Rohstoffe" : "Identical Commodities";
  const equationTitle =
    lang === "pl" ? "Worek Mayi = Worek Toma" : lang === "de" ? "Mayas Sack = Toms Sack" : "Maya's Sack = Tom's Sack";
  const sackLabel =
    lang === "pl" ? "Worek pszenicy" : lang === "de" ? "Sack Weizen" : "Sack of Wheat";
  const noBrandNote =
    lang === "pl"
      ? "Żadnych marek ani ozdobnych opakowań"
      : lang === "de"
      ? "Keine Marken oder Spezialverpackung noetig"
      : "No brands or special wrappers needed";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
      <text x="200" y="75" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">
        {equationTitle}
      </text>
      <rect x="70" y="100" width="100" height="60" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="120" y="135" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">
        {sackLabel}
      </text>
      <circle cx="200" cy="130" r="14" fill="#f59e0b" />
      <text x="200" y="135" textAnchor="middle" fontSize="14" fill="#ffffff" fontWeight="bold">=</text>
      <rect x="230" y="100" width="100" height="60" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="280" y="135" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">
        {sackLabel}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fill="#78350f">
          {noBrandNote}
        </text>
      )}
    </svg>
  );
}

export function WeatherDroughtDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Niedobór przez suszę" : lang === "de" ? "Duerre-Mangel" : "Drought Scarcity";
  const title =
    lang === "pl" ? "Letnia susza: 20 worków" : lang === "de" ? "Sommerduerre: 20 Saecke" : "Summer Drought: 20 Sacks";
  const priceTag =
    lang === "pl" ? "8 monet" : lang === "de" ? "8 Muenzen" : "8 Coins";
  const conclusion =
    lang === "pl"
      ? "Ogromny niedobór = gwałtowny wzrost cen"
      : lang === "de"
      ? "Starke Knappheit = Steigender Preis"
      : "Severe Scarcity = Skyrocketing Price";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#fef2f2" stroke="#fca5a5" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#991b1b">
        {title}
      </text>
      {/* Sun drawn as SVG */}
      <g transform="translate(100, 120)">
        <circle cx="0" cy="0" r="14" fill="#f59e0b" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="0"
            y1="0"
            x2={Math.cos((angle * Math.PI) / 180) * 22}
            y2={Math.sin((angle * Math.PI) / 180) * 22}
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}
      </g>
      {/* Low Silo */}
      <rect x="170" y="90" width="60" height="70" rx="4" fill="#e2e8f0" stroke="#94a3b8" />
      <rect x="175" y="135" width="50" height="20" fill="#facc15" />
      {/* High price tag */}
      <rect x="250" y="100" width="90" height="50" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="295" y="130" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#b91c1c">
        {priceTag}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b91c1c">
          {conclusion}
        </text>
      )}
    </svg>
  );
}

export function SuperHarvestDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Rekordowe zbiory" : lang === "de" ? "Rekordernte" : "Super Harvest";
  const title =
    lang === "pl" ? "Urodzajne zbiory: 90 worków" : lang === "de" ? "Rekordernte: 90 Saecke" : "Bumper Harvest: 90 Sacks";
  const priceTag =
    lang === "pl" ? "2 monety" : lang === "de" ? "2 Muenzen" : "2 Coins";
  const conclusion =
    lang === "pl"
      ? "Obfita podaż = tania mąka dla wszystkich"
      : lang === "de"
      ? "Reichliches Angebot = Bezahlbares Mehl fuer alle"
      : "Abundant Supply = Affordable Flour for All";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        {title}
      </text>
      {/* Wheat stalk drawn as SVG */}
      <g transform="translate(100, 115)">
        <line x1="0" y1="20" x2="0" y2="-15" stroke="#16a34a" strokeWidth="3" />
        <ellipse cx="-6" cy="-8" rx="6" ry="3" fill="#eab308" transform="rotate(-30 -6 -8)" />
        <ellipse cx="6" cy="-8" rx="6" ry="3" fill="#eab308" transform="rotate(30 6 -8)" />
        <ellipse cx="-6" cy="2" rx="6" ry="3" fill="#eab308" transform="rotate(-30 -6 2)" />
        <ellipse cx="6" cy="2" rx="6" ry="3" fill="#eab308" transform="rotate(30 6 2)" />
        <ellipse cx="0" cy="-18" rx="4" ry="7" fill="#eab308" />
      </g>
      {/* Full Silo */}
      <rect x="170" y="90" width="60" height="70" rx="4" fill="#e2e8f0" stroke="#94a3b8" />
      <rect x="175" y="100" width="50" height="55" fill="#facc15" />
      {/* Low price tag */}
      <rect x="250" y="100" width="90" height="50" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
      <text x="295" y="130" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#15803d">
        {priceTag}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">
          {conclusion}
        </text>
      )}
    </svg>
  );
}

export function CentralExchangeDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Giełda towarowa" : lang === "de" ? "Warenboerse" : "Commodity Exchange";
  const title =
    lang === "pl" ? "Centralna Giełda Towarowa" : lang === "de" ? "Die zentrale Warenboerse" : "The Central Commodity Exchange";
  const subtitle =
    lang === "pl"
      ? "Zboże, metale i drewno handlowane hurtowo"
      : lang === "de"
      ? "Getreide, Metalle und Holz in grossen Mengen gehandelt"
      : "Grain, metals, and timber traded in bulk";
  const wheatSilo =
    lang === "pl" ? "Silos zboża" : lang === "de" ? "Weizensilo" : "Wheat Silo";
  const copperDepot =
    lang === "pl" ? "Skład miedzi" : lang === "de" ? "Kupferdepot" : "Copper Depot";
  const timberYard =
    lang === "pl" ? "Plac drewna" : lang === "de" ? "Holzplatz" : "Timber Yard";
  const conclusion =
    lang === "pl"
      ? "Jedna cena rynkowa dla ustandaryzowanych surowców"
      : lang === "de"
      ? "Ein Marktpreis fuer standardisierte Grundstoffe"
      : "One market price for standard raw building blocks";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e40af">
        {title}
      </text>
      <text x="200" y="95" textAnchor="middle" fontSize="12" fill="#3b82f6">
        {subtitle}
      </text>
      <rect x="60" y="115" width="80" height="50" rx="6" fill="#ffffff" stroke="#93c5fd" />
      <text x="100" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">
        {wheatSilo}
      </text>
      <rect x="160" y="115" width="80" height="50" rx="6" fill="#ffffff" stroke="#93c5fd" />
      <text x="200" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">
        {copperDepot}
      </text>
      <rect x="260" y="115" width="80" height="50" rx="6" fill="#ffffff" stroke="#93c5fd" />
      <text x="300" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">
        {timberYard}
      </text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">
          {conclusion}
        </text>
      )}
    </svg>
  );
}
