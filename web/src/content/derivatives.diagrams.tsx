import type { DiagramProps } from "../lesson/types";

export function SpringWorriesDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl"
      ? "Wiosenne obawy rolniczki i piekarza"
      : lang === "de"
        ? "Frühlingssorgen von Bauer und Bäcker"
        : "Spring Planning Worries";
  const title =
    lang === "pl"
      ? "Wiosna: dwa wielkie zmartwienia"
      : lang === "de"
        ? "Frühjahrsaussaat: Zwei große Sorgen"
        : "Spring: Two Big Worries";

  const mayaTitle =
    lang === "pl" ? "Rolniczka Maya" : lang === "de" ? "Bäuerin Maya" : "Farmer Maya";
  const mayaCost =
    lang === "pl"
      ? "Koszt: 3 monety/worek"
      : lang === "de"
        ? "Kosten: 3c/Sack"
        : "Cost: 3c per sack";
  const mayaFear =
    lang === "pl"
      ? "Boi się powodzi (1m)"
      : lang === "de"
        ? "Fürchtet Flut (Preis = 1c)"
        : "Fears Flood (Price = 1c)";

  const beaTitle = lang === "pl" ? "Piekarka Bea" : lang === "de" ? "Bäckerin Bea" : "Baker Bea";
  const beaNeeds =
    lang === "pl" ? "Potrzebuje 50 worków" : lang === "de" ? "Braucht 50 Säcke" : "Needs 50 sacks";
  const beaFear =
    lang === "pl"
      ? "Boi się suszy (8m)"
      : lang === "de"
        ? "Fürchtet Dürre (Preis = 8c)"
        : "Fears Drought (Price = 8c)";

  const subtext =
    lang === "pl"
      ? "Oboje chcą pewności"
      : lang === "de"
        ? "Beide wollen Sicherheit"
        : "Both want certainty";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect
        x="40"
        y="40"
        width="320"
        height="160"
        rx="12"
        fill="#f8fafc"
        stroke="#cbd5e1"
        strokeWidth="2"
      />
      <text x="200" y="65" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        {title}
      </text>
      {/* Farmer Maya */}
      <rect
        x="60"
        y="85"
        width="125"
        height="80"
        rx="6"
        fill="#fffbeb"
        stroke="#f59e0b"
        strokeWidth="2"
      />
      <text x="122" y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">
        {mayaTitle}
      </text>
      <text x="122" y="130" textAnchor="middle" fontSize="10" fill="#78350f">
        {mayaCost}
      </text>
      <text x="122" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b91c1c">
        {mayaFear}
      </text>
      {/* Baker Bea */}
      <rect
        x="215"
        y="85"
        width="125"
        height="80"
        rx="6"
        fill="#fff7ed"
        stroke="#ea580c"
        strokeWidth="2"
      />
      <text x="277" y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c2410c">
        {beaTitle}
      </text>
      <text x="277" y="130" textAnchor="middle" fontSize="10" fill="#9a3412">
        {beaNeeds}
      </text>
      <text x="277" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b91c1c">
        {beaFear}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#475569">
          {subtext}
        </text>
      )}
    </svg>
  );
}

export function HandshakeContractDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl"
      ? "Kontrakt terminowy forward"
      : lang === "de"
        ? "Der Terminvertrag"
        : "The Forward Contract";
  const title =
    lang === "pl"
      ? "Umowa blokująca cenę (Derywatyw)"
      : lang === "de"
        ? "Die Preisabsicherung (Derivat)"
        : "Price Lock Agreement (Derivative)";
  const header =
    lang === "pl"
      ? "KONTRAKT NA DOSTAWĘ PSZENICY"
      : lang === "de"
        ? "LIEFERVERTRAG FÜR HERBSTWEIZEN"
        : "AUTUMN WHEAT DELIVERY CONTRACT";
  const terms =
    lang === "pl" ? "4 monety za worek" : lang === "de" ? "4 Münzen pro Sack" : "4 Coins per sack";
  const signed =
    lang === "pl"
      ? "Podpisali Maya i Bea"
      : lang === "de"
        ? "Unterzeichnet von Maya & Bea"
        : "Signed by Maya & Bea";
  const subtext =
    lang === "pl"
      ? "Wartość wynika z pszenicy"
      : lang === "de"
        ? "Wert stammt vom Weizen"
        : "Value derived from wheat";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect
        x="40"
        y="30"
        width="320"
        height="175"
        rx="12"
        fill="#f0fdf4"
        stroke="#86efac"
        strokeWidth="2"
      />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        {title}
      </text>
      <rect
        x="70"
        y="75"
        width="260"
        height="80"
        rx="6"
        fill="#ffffff"
        stroke="#15803d"
        strokeWidth="2"
      />
      <text x="200" y="100" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
        {header}
      </text>
      <text x="200" y="122" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
        {terms}
      </text>
      <text x="200" y="142" textAnchor="middle" fontSize="10" fill="#166534">
        {signed}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">
          {subtext}
        </text>
      )}
    </svg>
  );
}

export function DroughtWithContractDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl"
      ? "Susza pod ochroną kontraktu"
      : lang === "de"
        ? "Dürre mit Schutz"
        : "Drought With Protection";
  const title =
    lang === "pl"
      ? "Susza: pszenica 8 monet!"
      : lang === "de"
        ? "Dürre: Weizen 8 Münzen!"
        : "Drought: Wheat 8 Coins!";
  const shieldLabel =
    lang === "pl"
      ? "Kontrakt gwarantuje 4 monety"
      : lang === "de"
        ? "Vertrag sichert 4 Münzen"
        : "Contract Honors 4 Coins";
  const subtext =
    lang === "pl"
      ? "Bea nadal piecze chleb!"
      : lang === "de"
        ? "Bea backt weiter Brot!"
        : "Bea still bakes bread!";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect
        x="40"
        y="40"
        width="320"
        height="160"
        rx="12"
        fill="#eff6ff"
        stroke="#bfdbfe"
        strokeWidth="2"
      />
      <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e3a8a">
        {title}
      </text>
      {/* Protected Shield */}
      <circle cx="200" cy="115" r="30" fill="#3b82f6" />
      <text x="200" y="122" textAnchor="middle" fontSize="22" fill="#ffffff">
        🛡️
      </text>
      <text x="200" y="160" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">
        {shieldLabel}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#1e40af">
          {subtext}
        </text>
      )}
    </svg>
  );
}

export function FloodWithContractDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl"
      ? "Powódź pod ochroną kontraktu"
      : lang === "de"
        ? "Flut mit Schutz"
        : "Flood With Protection";
  const title =
    lang === "pl"
      ? "Powódź: pszenica 1 moneta!"
      : lang === "de"
        ? "Flut: Weizen 1 Münze!"
        : "Flood: Wheat 1 Coin!";
  const guaranteeLabel =
    lang === "pl"
      ? "Kontrakt gwarantuje 4 monety"
      : lang === "de"
        ? "Vertrag garantiert 4 Münzen"
        : "Contract Guarantees 4 Coins";
  const subtext =
    lang === "pl"
      ? "Zysk Mayi: 1 moneta"
      : lang === "de"
        ? "Mayas Gewinn: 1 Münze"
        : "Maya's profit: 1 coin";

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
      <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">
        {title}
      </text>
      {/* Maya safe */}
      <circle cx="200" cy="115" r="30" fill="#22c55e" />
      <text x="200" y="122" textAnchor="middle" fontSize="22" fill="#ffffff">
        🌾
      </text>
      <text x="200" y="160" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
        {guaranteeLabel}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#166534">
          {subtext}
        </text>
      )}
    </svg>
  );
}

export function EurexExchangeDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl"
      ? "Giełda instrumentów pochodnych"
      : lang === "de"
        ? "Terminbörsen"
        : "Global Derivatives Exchange";
  const title =
    lang === "pl"
      ? "Giełdy pochodnych (GPW & TGE)"
      : lang === "de"
        ? "Regulierte Terminbörsen (Eurex & EEX)"
        : "Derivatives Exchanges (NSE & MCX)";
  const subtitle =
    lang === "pl"
      ? "Blokują paliwo, zboże, prąd"
      : lang === "de"
        ? "Sichern Kerosin, Getreide, Energie"
        : "Lock fuel, grain, energy";
  const subtext =
    lang === "pl"
      ? "Zabezpieczanie łagodzi szoki cenowe"
      : lang === "de"
        ? "Absicherung dämpft Preisschocks"
        : "Hedging calms price shocks";

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
      <text x="200" y="65" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e293b">
        {title}
      </text>
      <text x="200" y="90" textAnchor="middle" fontSize="11" fill="#475569">
        {subtitle}
      </text>
      <circle cx="200" cy="130" r="26" fill="#0284c7" />
      <text x="200" y="137" textAnchor="middle" fontSize="18" fill="#ffffff">
        ✈️
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
          {subtext}
        </text>
      )}
    </svg>
  );
}
