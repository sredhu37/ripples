import type { DiagramProps } from "../lesson/types";

export function SpringWorriesDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Wiosenne obawy rolniczki i piekarza" : lang === "de" ? "Frühlingssorgen von Bauer und Bäcker" : "Spring Planning Worries";
  const title =
    lang === "pl"
      ? "Wiosenne siewy: dwa wielkie zmartwienia"
      : lang === "de"
      ? "Frühjahrsaussaat: Zwei große Sorgen"
      : "Spring Planting: Two Big Worries";

  const mayaTitle =
    lang === "pl" ? "Rolniczka Maya" : lang === "de" ? "Bäuerin Maya" : "Farmer Maya";
  const mayaCost =
    lang === "pl" ? "Koszt: 3 monety/worek" : lang === "de" ? "Kosten: 3c/Sack" : "Cost: 3c per sack";
  const mayaFear =
    lang === "pl" ? "Boi się powodzi (Cena = 1m)" : lang === "de" ? "Fürchtet Flut (Preis = 1c)" : "Fears Flood (Price = 1c)";

  const beaTitle =
    lang === "pl" ? "Piekarka Bea" : lang === "de" ? "Bäckerin Bea" : "Baker Bea";
  const beaNeeds =
    lang === "pl" ? "Potrzebuje 50 worków" : lang === "de" ? "Braucht 50 Säcke" : "Needs 50 sacks";
  const beaFear =
    lang === "pl" ? "Boi się suszy (Cena = 8m)" : lang === "de" ? "Fürchtet Dürre (Preis = 8c)" : "Fears Drought (Price = 8c)";

  const subtext =
    lang === "pl"
      ? "Oboje pragną pewności, zanim nadejdzie jesień"
      : lang === "de"
      ? "Beide wollen Sicherheit vor dem Herbst"
      : "Both want certainty before autumn arrives";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        {title}
      </text>
      {/* Farmer Maya */}
      <rect x="60" y="85" width="125" height="80" rx="6" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" />
      <text x="122" y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">{mayaTitle}</text>
      <text x="122" y="130" textAnchor="middle" fontSize="10" fill="#78350f">{mayaCost}</text>
      <text x="122" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b91c1c">{mayaFear}</text>
      {/* Baker Bea */}
      <rect x="215" y="85" width="125" height="80" rx="6" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
      <text x="277" y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c2410c">{beaTitle}</text>
      <text x="277" y="130" textAnchor="middle" fontSize="10" fill="#9a3412">{beaNeeds}</text>
      <text x="277" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b91c1c">{beaFear}</text>
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
    lang === "pl" ? "Kontrakt terminowy forward" : lang === "de" ? "Der Terminvertrag" : "The Forward Contract";
  const title =
    lang === "pl"
      ? "Umowa blokująca cenę (Pochodna / Deriwatyw)"
      : lang === "de"
      ? "Die Preisabsicherung (Derivat)"
      : "The Price Lock Agreement (Derivative)";
  const header =
    lang === "pl"
      ? "KONTRAKT NA JESIENNĄ DOSTAWĘ PSZENICY"
      : lang === "de"
      ? "LIEFERVERTRAG FÜR HERBSTWEIZEN"
      : "AUTUMN WHEAT DELIVERY CONTRACT";
  const terms =
    lang === "pl"
      ? "50 worków zablokowanych po 4 monety każdy"
      : lang === "de"
      ? "50 Säcke gesichert zu je 4 Münzen"
      : "50 Sacks locked at 4 Coins each";
  const signed =
    lang === "pl"
      ? "Podpisano wiosną przez Mayę i Beę"
      : lang === "de"
      ? "Im Frühjahr unterzeichnet von Maya & Bea"
      : "Signed in Spring by Maya & Bea";
  const subtext =
    lang === "pl"
      ? "Wartość wynika z pszenicy: oboje śpią spokojnie bez względu na pogodę!"
      : lang === "de"
      ? "Wert leitet sich vom Weizen ab: Beide schlafen ruhig bei jedem Wetter!"
      : "Value derived from wheat: both sleep peacefully through storms!";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="30" width="320" height="175" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        {title}
      </text>
      <rect x="70" y="75" width="260" height="80" rx="6" fill="#ffffff" stroke="#15803d" strokeWidth="2" />
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
    lang === "pl" ? "Susza pod ochroną kontraktu" : lang === "de" ? "Dürre mit Schutz" : "Drought With Protection";
  const title =
    lang === "pl"
      ? "Jesienna susza: wolny rynek wystrzelił do 8 monet!"
      : lang === "de"
      ? "Herbst-Dürre: Freier Markt schießt auf 8 Münzen!"
      : "Autumn Drought: Open Market Spikes to 8 Coins!";
  const shieldLabel =
    lang === "pl"
      ? "Kontrakt gwarantuje 4 monety"
      : lang === "de"
      ? "Vertrag sichert 4 Münzen"
      : "Contract Honors 4 Coins";
  const subtext =
    lang === "pl"
      ? "Bea kupuje mąkę w normalnej cenie i piecze chleb dla dzieci!"
      : lang === "de"
      ? "Bea kauft Mehl bezahlbar ein und Kinder bekommen ihr Schulbrot!"
      : "Bea buys affordable flour and children get school lunches!";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e3a8a">
        {title}
      </text>
      {/* Protected Shield */}
      <circle cx="200" cy="115" r="30" fill="#3b82f6" />
      <text x="200" y="122" textAnchor="middle" fontSize="22" fill="#ffffff">🛡️</text>
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
    lang === "pl" ? "Powódź pod ochroną kontraktu" : lang === "de" ? "Flut mit Schutz" : "Flood With Protection";
  const title =
    lang === "pl"
      ? "Jesienna powódź: wolny rynek załamał się do 1 monety!"
      : lang === "de"
      ? "Herbst-Flut: Freier Markt stürzt auf 1 Münze ab!"
      : "Autumn Flood: Open Market Crashes to 1 Coin!";
  const guaranteeLabel =
    lang === "pl"
      ? "Kontrakt gwarantuje 4 monety"
      : lang === "de"
      ? "Vertrag garantiert 4 Münzen"
      : "Contract Guarantees 4 Coins";
  const subtext =
    lang === "pl"
      ? "Maya pokrywa swój koszt 3 monet i bezpiecznie zarabia 1 monetę!"
      : lang === "de"
      ? "Maya deckt ihre Kosten von 3 Münzen und sichert 1 Münze Gewinn!"
      : "Maya covers her 3-coin cost and earns 1 coin profit safely!";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">
        {title}
      </text>
      {/* Maya safe */}
      <circle cx="200" cy="115" r="30" fill="#22c55e" />
      <text x="200" y="122" textAnchor="middle" fontSize="22" fill="#ffffff">🌾</text>
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
    lang === "pl" ? "Giełda instrumentów pochodnych" : lang === "de" ? "Terminbörsen" : "Global Derivatives Exchange";
  const title =
    lang === "pl"
      ? "Regulowane giełdy pochodnych (GPW & TGE)"
      : lang === "de"
      ? "Regulierte Terminbörsen (Eurex & EEX)"
      : "Regulated Derivatives Exchanges (NSE & MCX)";
  const subtitle =
    lang === "pl"
      ? "Linie lotnicze zabezpieczają paliwo, piekarnie zboże, a elektrownie prąd"
      : lang === "de"
      ? "Airlines sichern Kerosin, Bäckereien Getreide, Stadtwerke Energie"
      : "Airlines lock jet fuel, bakeries lock grain, power grids lock energy";
  const subtext =
    lang === "pl"
      ? "Zabezpieczanie ryzyka usuwa szoki cenowe, chroniąc stabilność gospodarki"
      : lang === "de"
      ? "Absicherung federt Preisschocks ab und hält die Wirtschaft stabil"
      : "Hedging removes price shocks so our economy stays stable";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e293b">
        {title}
      </text>
      <text x="200" y="90" textAnchor="middle" fontSize="11" fill="#475569">
        {subtitle}
      </text>
      <circle cx="200" cy="130" r="26" fill="#0284c7" />
      <text x="200" y="137" textAnchor="middle" fontSize="18" fill="#ffffff">✈️</text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
          {subtext}
        </text>
      )}
    </svg>
  );
}
