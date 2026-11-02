import type { DiagramProps } from "../lesson/types";

export function GoldVaultDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Harbor Gold Vault" : "Hafen-Goldtresor"}>
      <defs>
        <linearGradient id="goldBarGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
      </defs>
      {/* Stone Vault */}
      <rect x="100" y="40" width="200" height="150" rx="8" fill="#334155" stroke="#1e293b" strokeWidth="4" />
      <circle cx="200" cy="115" r="40" fill="#475569" stroke="#64748b" strokeWidth="3" />
      {/* Golden bar inside */}
      <polygon points="175,100 225,100 235,120 165,120" fill="url(#goldBarGrad)" stroke="#78350f" />
      <polygon points="165,120 235,120 230,135 170,135" fill="#ca8a04" stroke="#78350f" />
      <text x="200" y="116" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350f">
        999.9 PURE
      </text>
      {step >= 2 && (
        <text x="200" y="215" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
          {lang === "en" ? "Durable, Rare, and Never Rusts" : "Langlebig, selten und rostet nie"}
        </text>
      )}
    </svg>
  );
}

export function SunnyCalmDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Sunny Calm Investing" : "Investieren in ruhigen Zeiten"}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        {lang === "en" ? "Calm Seas: Productive Businesses" : "Ruhige See: Produktive Betriebe"}
      </text>
      {/* Bakery stall */}
      <rect x="70" y="95" width="110" height="65" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="125" y="125" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">
        {lang === "en" ? "Bakery Profits" : "Bäckereigewinn"}
      </text>
      <text x="125" y="145" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
        {lang === "en" ? "+5 Coins" : "+5 Münzen"}
      </text>
      {/* Ship stall */}
      <rect x="220" y="95" width="110" height="65" rx="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
      <text x="275" y="125" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">
        {lang === "en" ? "Trading Ships" : "Handelsschiffe"}
      </text>
      <text x="275" y="145" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0369a1">
        {lang === "en" ? "+8 Coins" : "+8 Münzen"}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fill="#166534">
          {lang === "en" ? "Coins build real tools and bake bread" : "Münzen bauen Werkzeuge und backen Brot"}
        </text>
      )}
    </svg>
  );
}

export function StormyCrisisDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Economic Storm" : "Wirtschaftssturm"}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
        {lang === "en" ? "Economic Storm: High Uncertainty" : "Wirtschaftssturm: Hohe Unsicherheit"}
      </text>
      {/* Storm clouds */}
      <circle cx="100" cy="115" r="22" fill="#64748b" />
      <circle cx="130" cy="110" r="28" fill="#475569" />
      <circle cx="160" cy="115" r="22" fill="#64748b" />
      {/* Lightning bolt SVG */}
      <polygon points="132,108 122,124 130,124 126,140 140,120 132,120" fill="#facc15" />
      {/* Flashing warning */}
      <rect x="220" y="95" width="120" height="65" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="280" y="125" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">
        {lang === "en" ? "Paper Volatility" : "Papier-Schwankung"}
      </text>
      <text x="280" y="145" textAnchor="middle" fontSize="11" fill="#b91c1c">
        {lang === "en" ? "Values swing wildly" : "Werte schwanken stark"}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">
          {lang === "en" ? "People seek safety for their savings" : "Menschen suchen Sicherheit für Erspartes"}
        </text>
      )}
    </svg>
  );
}

export function SafeHarborDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Safe Harbor In Gold" : "Sicherer Hafen in Gold"}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#fffbeb" stroke="#fef08a" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#854d0e">
        {lang === "en" ? "Gold as a Safe Harbor" : "Gold als sicherer Hafen"}
      </text>
      {/* Shield SVG */}
      <path d="M200 90 L235 105 L235 135 Q200 165 200 165 Q165 135 165 105 Z" fill="#eab308" stroke="#a16207" strokeWidth="2" />
      <polygon points="200,105 210,120 226,120 213,130 218,145 200,135 182,145 187,130 174,120 190,120" fill="#ffffff" />
      {step >= 2 && (
        <text x="200" y="188" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#78350f">
          {lang === "en" ? "Coins stored in gold preserve their purchasing power" : "In Gold gesicherte Werte behalten ihre Kaufkraft"}
        </text>
      )}
    </svg>
  );
}

export function CentralBankVaultDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Central Bank Reserves" : "Zentralbankreserven"}>
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">
        {lang === "en" ? "National Gold Reserves" : "Nationale Goldreserven"}
      </text>
      <text x="200" y="90" textAnchor="middle" fontSize="12" fill="#475569">
        {lang === "en" ? "Over 3,300 tonnes of gold backing national trust" : "Über 3.300 Tonnen Gold sichern nationales Vertrauen"}
      </text>
      {/* Bars row */}
      <rect x="110" y="115" width="50" height="25" rx="3" fill="#eab308" stroke="#a16207" />
      <rect x="175" y="115" width="50" height="25" rx="3" fill="#eab308" stroke="#a16207" />
      <rect x="240" y="115" width="50" height="25" rx="3" fill="#eab308" stroke="#a16207" />
      {step >= 2 && (
        <text x="200" y="175" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
          {lang === "en" ? "A timeless anchor when other currencies wobble" : "Ein zeitloser Anker, wenn Währungen schwanken"}
        </text>
      )}
    </svg>
  );
}
