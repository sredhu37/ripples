import type { DiagramProps } from "../lesson/types";

export function CiderPressDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Maya's Cider Mill" : "Mayas Mosterei"}>
      <defs>
        <linearGradient id="ciderWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>
      {/* Mill press structure */}
      <rect x="130" y="50" width="140" height="130" rx="8" fill="url(#ciderWood)" stroke="#451a03" strokeWidth="3" />
      <circle cx="200" cy="110" r="30" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
      {/* Red apple SVG */}
      <g transform="translate(190, 100)">
        <circle cx="10" cy="12" r="12" fill="#ef4444" />
        <path d="M10 2 Q14 2 12 7" stroke="#15803d" strokeWidth="2" fill="none" />
      </g>
      {/* Maya */}
      <circle cx="80" cy="120" r="16" fill="#fbbf24" />
      <text x="80" y="155" textAnchor="middle" fontSize="11" fill="#475569">Maya</text>
      {step >= 2 && (
        <text x="200" y="210" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
          {lang === "en" ? "Building the cider mill costs 100 coins" : "Der Bau der Mosterei kostet 100 Münzen"}
        </text>
      )}
    </svg>
  );
}

export function ShareTilesDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "10 Share Tiles" : "10 Anteilssteine"}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">
        {lang === "en" ? "Company Divided into 10 Share Tiles" : "Betrieb in 10 Anteile aufgeteilt"}
      </text>
      {/* 10 Tiles */}
      <g transform="translate(60, 90)">
        {Array.from({ length: 10 }).map((_, i) => (
          <rect
            key={i}
            x={(i % 5) * 56}
            y={Math.floor(i / 5) * 40}
            width="48"
            height="32"
            rx="4"
            fill={i < 2 ? "#fed7aa" : "#e2e8f0"}
            stroke={i < 2 ? "#ea580c" : "#94a3b8"}
            strokeWidth="2"
          />
        ))}
      </g>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ea580c">
          {lang === "en"
            ? "You own 2 share tiles (20% co-owner of the mill!)"
            : "Dir gehören 2 Anteile (20% Miteigentümer der Mühle!)"}
        </text>
      )}
    </svg>
  );
}

export function DividendFlowDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Dividend Distribution" : "Dividendenausschüttung"}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        {lang === "en" ? "Harvest Profit: 30 Coins" : "Erntegewinn: 30 Münzen"}
      </text>
      <circle cx="200" cy="115" r="24" fill="#22c55e" />
      <circle cx="200" cy="115" r="16" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
      <text x="200" y="120" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#713f12">
        30
      </text>
      {/* Payout to child */}
      <rect x="60" y="145" width="280" height="40" rx="6" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
      <text x="200" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
        {lang === "en"
          ? "Each tile receives 3 coins dividend (You get 6 coins!)"
          : "Jeder Anteil erhält 3 Münzen Dividende (Du bekommst 6 Münzen!)"}
      </text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fill="#15803d">
          {lang === "en"
            ? "Paid from real profits earned by selling sweet cider"
            : "Gezahlt aus echten Gewinnen durch Mostverkauf"}
        </text>
      )}
    </svg>
  );
}

export function SharePriceFluctuationDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "Share Price Swings" : "Aktienkursschwankungen"}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#eff6ff" stroke="#93c5fd" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e3a8a">
        {lang === "en" ? "Market Price: Popular Spiced Cider!" : "Marktpreis: Beliebter Gewürzmost!"}
      </text>
      <rect x="70" y="95" width="110" height="55" rx="6" fill="#ffffff" stroke="#cbd5e1" />
      <text x="125" y="120" textAnchor="middle" fontSize="11" fill="#64748b">
        {lang === "en" ? "Original Cost" : "Ursprungspreis"}
      </text>
      <text x="125" y="140" textAnchor="middle" fontSize="14" fontWeight="bold">
        {lang === "en" ? "10 Coins" : "10 Münzen"}
      </text>
      <text x="200" y="130" textAnchor="middle" fontSize="20" fill="#3b82f6">→</text>
      <rect x="220" y="95" width="110" height="55" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="275" y="120" textAnchor="middle" fontSize="11" fill="#1e40af">
        {lang === "en" ? "Villager Bids" : "Dorf-Gebote"}
      </text>
      <text x="275" y="140" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">
        {lang === "en" ? "16 Coins!" : "16 Münzen!"}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">
          {lang === "en"
            ? "Sell for a capital gain, or keep for future dividends"
            : "Mit Kursgewinn verkaufen oder für Dividenden halten"}
        </text>
      )}
    </svg>
  );
}

export function StockExchangeDiagram({ lang, step }: DiagramProps) {
  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={lang === "en" ? "The Stock Exchange" : "Die Wertpapierbörse"}>
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">
        {lang === "en" ? "The Stock Exchange (Börse)" : "Die Wertpapierbörse"}
      </text>
      <text x="200" y="90" textAnchor="middle" fontSize="12" fill="#475569">
        {lang === "en" ? "Where millions of people co-own great companies" : "Wo Millionen Menschen Anteile großer Firmen besitzen"}
      </text>
      <rect x="70" y="115" width="70" height="40" rx="4" fill="#ffffff" stroke="#94a3b8" />
      <text x="105" y="140" textAnchor="middle" fontSize="11" fontWeight="bold">Siemens</text>
      <rect x="165" y="115" width="70" height="40" rx="4" fill="#ffffff" stroke="#94a3b8" />
      <text x="200" y="140" textAnchor="middle" fontSize="11" fontWeight="bold">SAP</text>
      <rect x="260" y="115" width="70" height="40" rx="4" fill="#ffffff" stroke="#94a3b8" />
      <text x="295" y="140" textAnchor="middle" fontSize="11" fontWeight="bold">BMW</text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
          {lang === "en"
            ? "Shareholders share in company profits and economic growth"
            : "Aktionäre teilen Gewinne und wirtschaftliches Wachstum"}
        </text>
      )}
    </svg>
  );
}
