import type { DiagramProps } from "../lesson/types";

export function HarborWallDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Projekt falochronu w porcie" : lang === "de" ? "Hafenmauer-Projekt" : "Harbor Wall Project";
  const wallLabel =
    lang === "pl" ? "Kamienny falochron portowy" : lang === "de" ? "Steinere Hafenmauer" : "Stone Harbor Wall";
  const mayorLabel =
    lang === "pl" ? "Burmistrz" : lang === "de" ? "Bürgermeister" : "Mayor";
  const costSub =
    lang === "pl"
      ? "Kosztuje 100 monet, by chronić łodzie i miasteczko przed falami"
      : lang === "de"
      ? "Kostet 100 Münzen, um das Dorf vor Wellen zu schützen"
      : "Costs 100 coins to protect the entire town from waves";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      {/* Ocean */}
      <rect x="0" y="140" width="400" height="100" fill="#0284c7" />
      {/* Stone Harbor Wall */}
      <rect x="80" y="90" width="240" height="60" rx="4" fill="#64748b" stroke="#334155" strokeWidth="2" />
      <line x1="80" y1="120" x2="320" y2="120" stroke="#475569" strokeWidth="2" strokeDasharray="8 4" />
      <text x="200" y="115" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f8fafc">
        {wallLabel}
      </text>
      {/* Mayor Moss */}
      <circle cx="50" cy="120" r="14" fill="#fbbf24" />
      <text x="50" y="150" textAnchor="middle" fontSize="10" fill="#0f172a">{mayorLabel}</text>
      {step >= 2 && (
        <text x="200" y="190" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#f8fafc">
          {costSub}
        </text>
      )}
    </svg>
  );
}

export function BondScrollDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Obligacja z kuponami odsetkowymi" : lang === "de" ? "Anleihe mit Kupons" : "The Loan Scroll with Coupons";
  const title =
    lang === "pl"
      ? "Obligacja ratusza: 100 monet wartości nominalnej"
      : lang === "de"
      ? "Rathaus-Anleihe: 100 Münzen Nennwert"
      : "Town Hall Bond: 100 Coins Principal";
  const couponLabel =
    lang === "pl" ? "Kupon" : lang === "de" ? "Kupon" : "Coupon";
  const coinsLabel =
    lang === "pl" ? "monet" : lang === "de" ? "Münzen" : "Coins";
  const subtext =
    lang === "pl"
      ? "Oderwij jeden kupon w każde Święto Plonów, by odebrać odsetki!"
      : lang === "de"
      ? "Reiße jeden Erntetag einen Kupon ab, um Zinsen einzulösen!"
      : "Tear off one coupon every Harvest Day to collect interest!";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="30" width="320" height="170" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">
        {title}
      </text>
      {/* 3 Coupons */}
      <g transform="translate(65, 90)">
        <rect x="0" y="0" width="80" height="55" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
        <text x="40" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b45309">{couponLabel} 1</text>
        <text x="40" y="42" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">5 {coinsLabel}</text>

        <rect x="95" y="0" width="80" height="55" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
        <text x="135" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b45309">{couponLabel} 2</text>
        <text x="135" y="42" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">5 {coinsLabel}</text>

        <rect x="190" y="0" width="80" height="55" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
        <text x="230" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b45309">{couponLabel} 3</text>
        <text x="230" y="42" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">5 {coinsLabel}</text>
      </g>
      {step >= 2 && (
        <text x="200" y="180" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#78350f">
          {subtext}
        </text>
      )}
    </svg>
  );
}

export function CouponPayoutDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Wypłata odsetek z kuponu" : lang === "de" ? "Kupon-Auszahlung" : "Tearing Off Coupon";
  const title =
    lang === "pl" ? "Wypłata kuponu w Święto Plonów" : lang === "de" ? "Kupon-Auszahlung am Erntetag" : "Harvest Day Coupon Payout";
  const payoutMsg =
    lang === "pl"
      ? "Ratusz wypłaca 5 monet gwarantowanych odsetek"
      : lang === "de"
      ? "Das Rathaus zahlt 5 Münzen feste Zinsen"
      : "Town Hall pays 5 coins fixed interest";
  const maturityMsg =
    lang === "pl"
      ? "W 3. roku (termin wykupu) ratusz zwraca całe 100 monet kapitału"
      : lang === "de"
      ? "Am Ende (Laufzeit) zahlt das Rathaus die 100 Münzen Nennwert zurück"
      : "At year 3 (maturity), Town Hall returns the full 100 coins principal";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        {title}
      </text>
      <circle cx="200" cy="115" r="26" fill="#22c55e" />
      <text x="200" y="122" textAnchor="middle" fontSize="20" fill="#ffffff">🎟️</text>
      <text x="200" y="160" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#15803d">
        {payoutMsg}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#166534">
          {maturityMsg}
        </text>
      )}
    </svg>
  );
}

export function ZinsWippeDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Huśtawka stóp i cen obligacji" : lang === "de" ? "Die Zins-Wippe" : "The Interest Seesaw";
  const title =
    lang === "pl"
      ? "Huśtawka cenowa obligacji (Zins-Wippe)"
      : lang === "de"
      ? "Die Zins-Wippe (Zins und Kurs)"
      : "The Interest Seesaw (Rates vs Price)";
  const rateLabel =
    lang === "pl" ? "Stopy: 8%" : lang === "de" ? "Zins: 8%" : "Rates: 8%";
  const priceLabel =
    lang === "pl" ? "Cena: 85m" : lang === "de" ? "Kurs: 85M" : "Price: 85c";
  const ruleMsg =
    lang === "pl"
      ? "Gdy stopy procentowe rosną, ceny starych obligacji spadają!"
      : lang === "de"
      ? "Wenn Zinsen steigen, sinken die Kurse bestehender Anleihen!"
      : "When bank interest goes up, old bond prices tilt down!";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="30" width="320" height="170" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e3a8a">
        {title}
      </text>
      {/* Seesaw Plank tilted down on left */}
      <polygon points="190,160 210,160 200,120" fill="#475569" />
      <line x1="80" y1="145" x2="320" y2="95" stroke="#1e3a8a" strokeWidth="8" strokeLinecap="round" />
      {/* Left weight: High Bank Rates */}
      <rect x="60" y="150" width="80" height="35" rx="4" fill="#fee2e2" stroke="#ef4444" />
      <text x="100" y="172" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">{rateLabel}</text>
      {/* Right weight: Sinking Bond Price */}
      <rect x="260" y="55" width="80" height="35" rx="4" fill="#dbeafe" stroke="#3b82f6" />
      <text x="300" y="77" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8">{priceLabel}</text>
      {step >= 2 && (
        <text x="200" y="192" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e40af">
          {ruleMsg}
        </text>
      )}
    </svg>
  );
}

export function SovereignBondDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Obligacje skarbowe państwa" : lang === "de" ? "Staatsanleihen" : "Sovereign Government Bonds";
  const title =
    lang === "pl"
      ? "Obligacje Skarbowe Rzeczypospolitej Polskiej"
      : lang === "de"
      ? "Deutsche Bundesanleihen"
      : "Government of India Sovereign Bonds (G-Secs)";
  const subtitle =
    lang === "pl"
      ? "Finansują linie kolejowe, szpitale i infrastrukturę publiczną"
      : lang === "de"
      ? "Finanzieren Schienen, Schulen und grüne Infrastruktur"
      : "Trusted worldwide to build railways, schools, and energy infrastructure";
  const guarantee =
    lang === "pl"
      ? "Gwarantowane przez Skarb Państwa z podatków"
      : lang === "de"
      ? "Garantiert durch deutsches Steueraufkommen"
      : "Backed by sovereign tax revenues and fiscal law";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e293b">
        {title}
      </text>
      <text x="200" y="90" textAnchor="middle" fontSize="12" fill="#475569">
        {subtitle}
      </text>
      <circle cx="200" cy="130" r="24" fill="#0f172a" />
      <text x="200" y="136" textAnchor="middle" fontSize="16" fill="#facc15" fontWeight="bold">🦅</text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
          {guarantee}
        </text>
      )}
    </svg>
  );
}
