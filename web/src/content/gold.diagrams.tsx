import type { DiagramProps } from "../lesson/types";

export function GoldVaultDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl"
      ? "Skarbiec ze złotem w porcie"
      : lang === "de"
        ? "Hafen-Goldtresor"
        : "Harbor Gold Vault";
  const conclusion =
    lang === "pl"
      ? "Trwałe, rzadkie i nigdy nie rdzewieje"
      : lang === "de"
        ? "Langlebig, selten und rostet nie"
        : "Durable, Rare, and Never Rusts";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <defs>
        <linearGradient id="goldBarGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
      </defs>
      {/* Stone Vault */}
      <rect
        x="100"
        y="40"
        width="200"
        height="150"
        rx="8"
        fill="#334155"
        stroke="#1e293b"
        strokeWidth="4"
      />
      <circle cx="200" cy="115" r="40" fill="#475569" stroke="#64748b" strokeWidth="3" />
      {/* Golden bar inside */}
      <polygon points="175,100 225,100 235,120 165,120" fill="url(#goldBarGrad)" stroke="#78350f" />
      <polygon points="165,120 235,120 230,135 170,135" fill="#ca8a04" stroke="#78350f" />
      <text x="200" y="116" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350f">
        999.9 PURE
      </text>
      {step >= 2 && (
        <text x="200" y="215" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
          {conclusion}
        </text>
      )}
    </svg>
  );
}

export function SunnyCalmDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl"
      ? "Inwestowanie w spokojnych czasach"
      : lang === "de"
        ? "Investieren in ruhigen Zeiten"
        : "Sunny Calm Investing";
  const title =
    lang === "pl"
      ? "Spokojne morze: produktywne biznesy"
      : lang === "de"
        ? "Ruhige See: Produktive Betriebe"
        : "Calm Seas: Productive Businesses";
  const bakeryTitle =
    lang === "pl" ? "Zyski piekarni" : lang === "de" ? "Bäckereigewinn" : "Bakery Profits";
  const bakeryCoins = lang === "pl" ? "+5 monet" : lang === "de" ? "+5 Münzen" : "+5 Coins";
  const shipsTitle =
    lang === "pl" ? "Statki handlowe" : lang === "de" ? "Handelsschiffe" : "Trading Ships";
  const shipsCoins = lang === "pl" ? "+8 monet" : lang === "de" ? "+8 Münzen" : "+8 Coins";
  const conclusion =
    lang === "pl"
      ? "Monety tworzą narzędzia i wypiekają chleb"
      : lang === "de"
        ? "Münzen bauen Werkzeuge und backen Brot"
        : "Coins build real tools and bake bread";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect
        x="40"
        y="40"
        width="320"
        height="160"
        rx="12"
        fill="#f0fdf4"
        stroke="#86efac"
        strokeWidth="2"
      />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        {title}
      </text>
      {/* Bakery stall */}
      <rect
        x="70"
        y="95"
        width="110"
        height="65"
        rx="6"
        fill="#fef3c7"
        stroke="#f59e0b"
        strokeWidth="2"
      />
      <text x="125" y="125" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">
        {bakeryTitle}
      </text>
      <text x="125" y="145" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
        {bakeryCoins}
      </text>
      {/* Ship stall */}
      <rect
        x="220"
        y="95"
        width="110"
        height="65"
        rx="6"
        fill="#e0f2fe"
        stroke="#38bdf8"
        strokeWidth="2"
      />
      <text x="275" y="125" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">
        {shipsTitle}
      </text>
      <text x="275" y="145" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0369a1">
        {shipsCoins}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fill="#166534">
          {conclusion}
        </text>
      )}
    </svg>
  );
}

export function StormyCrisisDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Burza gospodarcza" : lang === "de" ? "Wirtschaftssturm" : "Economic Storm";
  const title =
    lang === "pl"
      ? "Burza gospodarcza: duża niepewność"
      : lang === "de"
        ? "Wirtschaftssturm: Hohe Unsicherheit"
        : "Economic Storm: High Uncertainty";
  const paperTitle =
    lang === "pl" ? "Wahania papieru" : lang === "de" ? "Papier-Schwankung" : "Paper Volatility";
  const paperSubtitle =
    lang === "pl"
      ? "Wartości gwałtownie skaczą"
      : lang === "de"
        ? "Werte schwanken stark"
        : "Values swing wildly";
  const conclusion =
    lang === "pl"
      ? "Ludzie szukają bezpiecznej przystani dla oszczędności"
      : lang === "de"
        ? "Menschen suchen Sicherheit für Erspartes"
        : "People seek safety for their savings";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect
        x="40"
        y="40"
        width="320"
        height="160"
        rx="12"
        fill="#f8fafc"
        stroke="#94a3b8"
        strokeWidth="2"
      />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
        {title}
      </text>
      {/* Storm clouds */}
      <circle cx="100" cy="115" r="22" fill="#64748b" />
      <circle cx="130" cy="110" r="28" fill="#475569" />
      <circle cx="160" cy="115" r="22" fill="#64748b" />
      {/* Lightning bolt SVG */}
      <polygon points="132,108 122,124 130,124 126,140 140,120 132,120" fill="#facc15" />
      {/* Flashing warning */}
      <rect
        x="220"
        y="95"
        width="120"
        height="65"
        rx="6"
        fill="#fee2e2"
        stroke="#ef4444"
        strokeWidth="2"
      />
      <text x="280" y="125" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">
        {paperTitle}
      </text>
      <text x="280" y="145" textAnchor="middle" fontSize="11" fill="#b91c1c">
        {paperSubtitle}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">
          {conclusion}
        </text>
      )}
    </svg>
  );
}

export function SafeHarborDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl"
      ? "Bezpieczna przystań w złocie"
      : lang === "de"
        ? "Sicherer Hafen in Gold"
        : "Safe Harbor In Gold";
  const title =
    lang === "pl"
      ? "Złoto jako bezpieczna przystań"
      : lang === "de"
        ? "Gold als sicherer Hafen"
        : "Gold as a Safe Harbor";
  const conclusion =
    lang === "pl"
      ? "Wartości zabezpieczone w złocie chronią siłę nabywczą"
      : lang === "de"
        ? "In Gold gesicherte Werte behalten ihre Kaufkraft"
        : "Coins stored in gold preserve their purchasing power";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect
        x="40"
        y="40"
        width="320"
        height="160"
        rx="12"
        fill="#fffbeb"
        stroke="#fef08a"
        strokeWidth="2"
      />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#854d0e">
        {title}
      </text>
      {/* Shield SVG */}
      <path
        d="M200 90 L235 105 L235 135 Q200 165 200 165 Q165 135 165 105 Z"
        fill="#eab308"
        stroke="#a16207"
        strokeWidth="2"
      />
      <polygon
        points="200,105 210,120 226,120 213,130 218,145 200,135 182,145 187,130 174,120 190,120"
        fill="#ffffff"
      />
      {step >= 2 && (
        <text x="200" y="188" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#78350f">
          {conclusion}
        </text>
      )}
    </svg>
  );
}

export function CentralBankVaultDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl"
      ? "Rezerwy banku centralnego"
      : lang === "de"
        ? "Zentralbankreserven"
        : "Central Bank Reserves";
  const title =
    lang === "pl"
      ? "Krajowe rezerwy złota"
      : lang === "de"
        ? "Nationale Goldreserven"
        : "National Gold Reserves";
  const subtitle =
    lang === "pl"
      ? "Setki ton złota gwarantują zaufanie do państwa"
      : lang === "de"
        ? "Über 3.300 Tonnen Gold sichern nationales Vertrauen"
        : "Over 3,300 tonnes of gold backing national trust";
  const conclusion =
    lang === "pl"
      ? "Ponadczasowa kotwica, gdy waluty tracą na wartości"
      : lang === "de"
        ? "Ein zeitloser Anker, wenn Währungen schwanken"
        : "A timeless anchor when other currencies wobble";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#f8fafc"
        stroke="#cbd5e1"
        strokeWidth="2"
      />
      <text x="200" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e293b">
        {title}
      </text>
      <text x="200" y="90" textAnchor="middle" fontSize="12" fill="#475569">
        {subtitle}
      </text>
      {/* Bars row */}
      <rect x="110" y="115" width="50" height="25" rx="3" fill="#eab308" stroke="#a16207" />
      <rect x="175" y="115" width="50" height="25" rx="3" fill="#eab308" stroke="#a16207" />
      <rect x="240" y="115" width="50" height="25" rx="3" fill="#eab308" stroke="#a16207" />
      {step >= 2 && (
        <text x="200" y="175" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
          {conclusion}
        </text>
      )}
    </svg>
  );
}
