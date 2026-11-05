import type { DiagramProps } from "../lesson/types";

export function CiderPressDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Tłocznia cydru Mayi" : lang === "de" ? "Mayas Mosterei" : "Maya's Cider Mill";
  const buildingCost =
    lang === "pl"
      ? "Budowa tłoczni cydru kosztuje 100 monet"
      : lang === "de"
      ? "Der Bau der Mosterei kostet 100 Münzen"
      : "Building the cider mill costs 100 coins";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
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
          {buildingCost}
        </text>
      )}
    </svg>
  );
}

export function ShareTilesDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "10 certyfikatów akcji" : lang === "de" ? "10 Anteilssteine" : "10 Share Tiles";
  const title =
    lang === "pl"
      ? "Firma podzielona na 10 certyfikatów akcji"
      : lang === "de"
      ? "Betrieb in 10 Anteile aufgeteilt"
      : "Company Divided into 10 Share Tiles";
  const ownership =
    lang === "pl"
      ? "Posiadasz 2 certyfikaty akcji (20% współwłasności tłoczni!)"
      : lang === "de"
      ? "Dir gehören 2 Anteile (20% Miteigentümer der Mühle!)"
      : "You own 2 share tiles (20% co-owner of the mill!)";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">
        {title}
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
          {ownership}
        </text>
      )}
    </svg>
  );
}

export function DividendFlowDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Wypłata dywidendy" : lang === "de" ? "Dividendenausschüttung" : "Dividend Distribution";
  const title =
    lang === "pl" ? "Zysk ze zbiorów: 30 monet" : lang === "de" ? "Erntegewinn: 30 Münzen" : "Harvest Profit: 30 Coins";
  const payout =
    lang === "pl"
      ? "Każda akcja otrzymuje 3 monety dywidendy (dostajesz 6 monet!)"
      : lang === "de"
      ? "Jeder Anteil erhält 3 Münzen Dividende (Du bekommst 6 Münzen!)"
      : "Each tile receives 3 coins dividend (You get 6 coins!)";
  const source =
    lang === "pl"
      ? "Wypłacana z realnych zysków ze sprzedaży smacznego cydru"
      : lang === "de"
      ? "Gezahlt aus echten Gewinnen durch Mostverkauf"
      : "Paid from real profits earned by selling sweet cider";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        {title}
      </text>
      <circle cx="200" cy="115" r="24" fill="#22c55e" />
      <circle cx="200" cy="115" r="16" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
      <text x="200" y="120" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#713f12">
        30
      </text>
      {/* Payout to child */}
      <rect x="60" y="145" width="280" height="40" rx="6" fill="#dcfce7" stroke="#15803d" strokeWidth="1" />
      <text x="200" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
        {payout}
      </text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fill="#15803d">
          {source}
        </text>
      )}
    </svg>
  );
}

export function SharePriceFluctuationDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Wahania cen akcji" : lang === "de" ? "Aktienkursschwankungen" : "Share Price Swings";
  const title =
    lang === "pl"
      ? "Cena rynkowa: wielki sukces cydru korzennego!"
      : lang === "de"
      ? "Marktpreis: Beliebter Gewürzmost!"
      : "Market Price: Popular Spiced Cider!";
  const costLabel =
    lang === "pl" ? "Cena początkowa" : lang === "de" ? "Ursprungspreis" : "Original Cost";
  const costValue =
    lang === "pl" ? "10 monet" : lang === "de" ? "10 Münzen" : "10 Coins";
  const bidsLabel =
    lang === "pl" ? "Oferty sąsiadów" : lang === "de" ? "Dorf-Gebote" : "Villager Bids";
  const bidsValue =
    lang === "pl" ? "16 monet!" : lang === "de" ? "16 Münzen!" : "16 Coins!";
  const conclusion =
    lang === "pl"
      ? "Sprzedaj z zyskiem lub zatrzymaj dla przyszłych dywidend"
      : lang === "de"
      ? "Mit Kursgewinn verkaufen oder für Dividenden halten"
      : "Sell for a capital gain, or keep for future dividends";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#eff6ff" stroke="#93c5fd" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e3a8a">
        {title}
      </text>
      <rect x="70" y="95" width="110" height="55" rx="6" fill="#ffffff" stroke="#cbd5e1" />
      <text x="125" y="120" textAnchor="middle" fontSize="11" fill="#64748b">
        {costLabel}
      </text>
      <text x="125" y="140" textAnchor="middle" fontSize="14" fontWeight="bold">
        {costValue}
      </text>
      <text x="200" y="130" textAnchor="middle" fontSize="20" fill="#3b82f6">→</text>
      <rect x="220" y="95" width="110" height="55" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
      <text x="275" y="120" textAnchor="middle" fontSize="11" fill="#1e40af">
        {bidsLabel}
      </text>
      <text x="275" y="140" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">
        {bidsValue}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">
          {conclusion}
        </text>
      )}
    </svg>
  );
}

export function StockExchangeDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Giełda Papierów Wartościowych" : lang === "de" ? "Die Wertpapierbörse" : "The Stock Exchange";
  const title =
    lang === "pl"
      ? "Giełda Papierów Wartościowych (GPW)"
      : lang === "de"
      ? "Die Wertpapierbörse (Frankfurt / Xetra)"
      : "The Stock Exchange (NSE / BSE)";
  const subtitle =
    lang === "pl"
      ? "Miejsce, gdzie miliony ludzi współposiadają wspaniałe firmy"
      : lang === "de"
      ? "Wo Millionen Menschen Anteile großer Firmen besitzen"
      : "Where millions of people co-own great companies";

  const company1 = lang === "pl" ? "Orlen" : lang === "de" ? "Siemens" : "Tata";
  const company2 = lang === "pl" ? "CD Projekt" : lang === "de" ? "SAP" : "Infosys";
  const company3 = lang === "pl" ? "PKO Bank" : lang === "de" ? "BMW" : "Reliance";

  const conclusion =
    lang === "pl"
      ? "Akcjonariusze mają udział w zyskach i rozwoju gospodarki"
      : lang === "de"
      ? "Aktionäre teilen Gewinne und wirtschaftliches Wachstum"
      : "Shareholders share in company profits and economic growth";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">
        {title}
      </text>
      <text x="200" y="90" textAnchor="middle" fontSize="12" fill="#475569">
        {subtitle}
      </text>
      <rect x="70" y="115" width="70" height="40" rx="4" fill="#ffffff" stroke="#94a3b8" />
      <text x="105" y="140" textAnchor="middle" fontSize="11" fontWeight="bold">{company1}</text>
      <rect x="165" y="115" width="70" height="40" rx="4" fill="#ffffff" stroke="#94a3b8" />
      <text x="200" y="140" textAnchor="middle" fontSize="11" fontWeight="bold">{company2}</text>
      <rect x="260" y="115" width="70" height="40" rx="4" fill="#ffffff" stroke="#94a3b8" />
      <text x="295" y="140" textAnchor="middle" fontSize="11" fontWeight="bold">{company3}</text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
          {conclusion}
        </text>
      )}
    </svg>
  );
}
