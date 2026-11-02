import type { DiagramProps } from "../lesson/types";

export function GrainSiloDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Central Grain Silo" : "Zentrales Getreidesilo"}>
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
        {lang === "en" ? "Town Grain Silo" : "Dorf-Getreidesilo"}
      </text>
      {/* Farmers */}
      <circle cx="80" cy="140" r="14" fill="#fbbf24" />
      <text x="80" y="170" textAnchor="middle" fontSize="11" fill="#475569">
        {lang === "en" ? "Farmer Maya" : "Baeuerin Maya"}
      </text>
      <circle cx="320" cy="140" r="14" fill="#fb923c" />
      <text x="320" y="170" textAnchor="middle" fontSize="11" fill="#475569">
        {lang === "en" ? "Farmer Tom" : "Bauer Tom"}
      </text>
      {step >= 2 && (
        <text x="200" y="220" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">
          {lang === "en" ? "Identical Wheat = Standard Commodity" : "Identischer Weizen = Standard-Rohstoff"}
        </text>
      )}
    </svg>
  );
}

export function IdenticalWheatDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Identical Commodities" : "Identische Rohstoffe"}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
      <text x="200" y="75" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">
        {lang === "en" ? "Maya's Sack = Tom's Sack" : "Mayas Sack = Toms Sack"}
      </text>
      <rect x="70" y="100" width="100" height="60" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="120" y="135" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">
        {lang === "en" ? "Sack of Wheat" : "Sack Weizen"}
      </text>
      <circle cx="200" cy="130" r="14" fill="#f59e0b" />
      <text x="200" y="135" textAnchor="middle" fontSize="14" fill="#ffffff" fontWeight="bold">=</text>
      <rect x="230" y="100" width="100" height="60" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="280" y="135" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">
        {lang === "en" ? "Sack of Wheat" : "Sack Weizen"}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fill="#78350f">
          {lang === "en" ? "No brands or special wrappers needed" : "Keine Marken oder Spezialverpackung noetig"}
        </text>
      )}
    </svg>
  );
}

export function WeatherDroughtDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Drought Scarcity" : "Duerre-Mangel"}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#fef2f2" stroke="#fca5a5" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#991b1b">
        {lang === "en" ? "Summer Drought: 20 Sacks" : "Sommerduerre: 20 Saecke"}
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
        {lang === "en" ? "8 Coins" : "8 Muenzen"}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b91c1c">
          {lang === "en" ? "Severe Scarcity = Skyrocketing Price" : "Starke Knappheit = Steigender Preis"}
        </text>
      )}
    </svg>
  );
}

export function SuperHarvestDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Super Harvest" : "Rekordernte"}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        {lang === "en" ? "Bumper Harvest: 90 Sacks" : "Rekordernte: 90 Saecke"}
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
        {lang === "en" ? "2 Coins" : "2 Muenzen"}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">
          {lang === "en" ? "Abundant Supply = Affordable Flour for All" : "Reichliches Angebot = Bezahlbares Mehl fuer alle"}
        </text>
      )}
    </svg>
  );
}

export function CentralExchangeDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Commodity Exchange" : "Warenboerse"}>
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e40af">
        {lang === "en" ? "The Central Commodity Exchange" : "Die zentrale Warenboerse"}
      </text>
      <text x="200" y="95" textAnchor="middle" fontSize="12" fill="#3b82f6">
        {lang === "en" ? "Grain, metals, and timber traded in bulk" : "Getreide, Metalle und Holz in grossen Mengen gehandelt"}
      </text>
      <rect x="60" y="115" width="80" height="50" rx="6" fill="#ffffff" stroke="#93c5fd" />
      <text x="100" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">
        {lang === "en" ? "Wheat Silo" : "Weizensilo"}
      </text>
      <rect x="160" y="115" width="80" height="50" rx="6" fill="#ffffff" stroke="#93c5fd" />
      <text x="200" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">
        {lang === "en" ? "Copper Depot" : "Kupferdepot"}
      </text>
      <rect x="260" y="115" width="80" height="50" rx="6" fill="#ffffff" stroke="#93c5fd" />
      <text x="300" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">
        {lang === "en" ? "Timber Yard" : "Holzplatz"}
      </text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">
          {lang === "en" ? "One market price for standard raw building blocks" : "Ein Marktpreis fuer standardisierte Grundstoffe"}
        </text>
      )}
    </svg>
  );
}
