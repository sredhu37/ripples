import type { DiagramProps } from "../lesson/types";

export function SavingsChestDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl"
      ? "Skrzynia oszczędności kapitana Corala"
      : lang === "de"
        ? "Kapitän Corals Spartruhe"
        : "Captain Coral's Savings Chest";
  const coinsText =
    lang === "pl" ? "1 000 złotych monet" : lang === "de" ? "1.000 Goldmünzen" : "1,000 Gold Coins";
  const subtext =
    lang === "pl"
      ? "Oszczędności z całego życia uczciwej żeglugi"
      : lang === "de"
        ? "Ersparnisse aus einem langen Leben auf See"
        : "Saved across a lifetime of honest sailing";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <defs>
        <linearGradient id="chestWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>
      {/* Chest */}
      <rect
        x="120"
        y="70"
        width="160"
        height="100"
        rx="8"
        fill="url(#chestWood)"
        stroke="#1e293b"
        strokeWidth="3"
      />
      <path d="M120 70 Q200 40 280 70 Z" fill="#b45309" stroke="#1e293b" strokeWidth="2" />
      <circle cx="200" cy="95" r="12" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
      <text x="200" y="140" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fef3c7">
        {coinsText}
      </text>
      {step >= 2 && (
        <text x="200" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">
          {subtext}
        </text>
      )}
    </svg>
  );
}

export function SpendingVsPreservingDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl"
      ? "Rozdawanie gotówki kontra fundacja"
      : lang === "de"
        ? "Spenden vs Stiftung"
        : "Handouts vs Foundation";
  const title =
    lang === "pl"
      ? "Dwie drogi dzielenia się majątkiem"
      : lang === "de"
        ? "Zwei Wege zu helfen"
        : "Two Ways to Give Back";

  const handoutTitle =
    lang === "pl"
      ? "Szybkie rozdawnictwo"
      : lang === "de"
        ? "Bargeldgeschenke"
        : "Instant Handouts";
  const handoutTime =
    lang === "pl" ? "Wydane w 2 lata" : lang === "de" ? "In 2 Jahren weg" : "Spent in 2 years";
  const handoutLoss =
    lang === "pl" ? "Stracone na zawsze!" : lang === "de" ? "Für immer weg!" : "Gone Forever!";

  const foundationTitle =
    lang === "pl" ? "Fundacja wieczysta" : lang === "de" ? "Die Stiftung" : "The Foundation";
  const foundationEndowment =
    lang === "pl"
      ? "Kapitał nienaruszony"
      : lang === "de"
        ? "Stiftungsvermögen"
        : "Endowment stays";
  const foundationPerpetual =
    lang === "pl"
      ? "Zyski pomagają na zawsze!"
      : lang === "de"
        ? "Ertrag hilft ewig!"
        : "Yield Gives Forever!";

  const subtext =
    lang === "pl"
      ? "Chroń pień drzewa: zbieraj tylko owoce, nie ścinaj pnia"
      : lang === "de"
        ? "Schütze den Stamm; ernte nur die reifen Äpfel"
        : "Protect the tree trunk; harvest only the apples";

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
      <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
        {title}
      </text>
      {/* Handouts */}
      <rect
        x="60"
        y="85"
        width="125"
        height="75"
        rx="6"
        fill="#fee2e2"
        stroke="#ef4444"
        strokeWidth="2"
      />
      <text x="122" y="110" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">
        {handoutTitle}
      </text>
      <text x="122" y="128" textAnchor="middle" fontSize="10" fill="#991b1b">
        {handoutTime}
      </text>
      <text x="122" y="146" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7f1d1d">
        {handoutLoss}
      </text>
      {/* Foundation */}
      <rect
        x="215"
        y="85"
        width="125"
        height="75"
        rx="6"
        fill="#dcfce7"
        stroke="#15803d"
        strokeWidth="2"
      />
      <text x="277" y="110" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
        {foundationTitle}
      </text>
      <text x="277" y="128" textAnchor="middle" fontSize="10" fill="#166534">
        {foundationEndowment}
      </text>
      <text x="277" y="146" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">
        {foundationPerpetual}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#475569">
          {subtext}
        </text>
      )}
    </svg>
  );
}

export function EndowmentTreeDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl"
      ? "Drzewo kapitału żelaznego fundacji"
      : lang === "de"
        ? "Der Stiftungsbaum"
        : "The Endowment Tree";
  const capitalLabel =
    lang === "pl"
      ? "Kapitał żelazny fundacji: 1 000 monet"
      : lang === "de"
        ? "Stiftungsvermögen: 1.000 Münzen Kapital"
        : "Endowment Vault: 1,000 Coins Capital";
  const fruitLabel =
    lang === "pl"
      ? "Każdego roku rośnie 40 monet świeżych owoców zysku!"
      : lang === "de"
        ? "Jedes Jahr wachsen 40 Münzen frische Erträge!"
        : "Every year, 40 coins of fresh fruit grow naturally!";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      {/* Soil */}
      <rect x="50" y="170" width="300" height="40" rx="4" fill="#78350f" />
      <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fef3c7">
        {capitalLabel}
      </text>
      {/* Trunk */}
      <rect x="180" y="100" width="40" height="70" fill="#92400e" />
      {/* Canopy */}
      <circle cx="200" cy="70" r="50" fill="#22c55e" />
      {/* Apples */}
      <circle cx="175" cy="55" r="7" fill="#ef4444" />
      <circle cx="215" cy="50" r="7" fill="#ef4444" />
      <circle cx="190" cy="80" r="7" fill="#ef4444" />
      <circle cx="225" cy="80" r="7" fill="#ef4444" />
      {step >= 2 && (
        <text x="200" y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
          {fruitLabel}
        </text>
      )}
    </svg>
  );
}

export function PerpetualCommunityDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl"
      ? "Wieczysty pożytek dla społeczności"
      : lang === "de"
        ? "Dauerhafter Dorfnutzen"
        : "Perpetual Community Benefit";
  const title =
    lang === "pl"
      ? "Fundacja Portowa w Ripple Town"
      : lang === "de"
        ? "Die Ripple-Hafen-Stiftung"
        : "The Ripple Harbor Foundation";

  const libraryTitle = lang === "pl" ? "Biblioteka" : lang === "de" ? "Bücherei" : "Library";
  const librarySub =
    lang === "pl" ? "Darmowe książki" : lang === "de" ? "Freie Bücher" : "Free Books";

  const swimTitle =
    lang === "pl" ? "Przystań pływacka" : lang === "de" ? "Schwimmsteg" : "Swim Dock";
  const swimSub =
    lang === "pl" ? "Lekcje pływania" : lang === "de" ? "Schwimmkurse" : "Water Safety";

  const parkTitle = lang === "pl" ? "Park przyrody" : lang === "de" ? "Naturpark" : "Nature Park";
  const parkSub =
    lang === "pl" ? "Czyste lasy" : lang === "de" ? "Saubere Wälder" : "Clean Forests";

  const subtext =
    lang === "pl"
      ? "Służy kolejnym pokoleniom dzieci przez całe stulecia!"
      : lang === "de"
        ? "Hilft Generation um Generation über Jahrhunderte!"
        : "Helping generation after generation for centuries to come!";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect
        x="40"
        y="30"
        width="320"
        height="175"
        rx="12"
        fill="#eff6ff"
        stroke="#bfdbfe"
        strokeWidth="2"
      />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e3a8a">
        {title}
      </text>
      <g transform="translate(60, 80)">
        <rect x="0" y="0" width="85" height="60" rx="6" fill="#ffffff" stroke="#93c5fd" />
        <text x="42" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
          {libraryTitle}
        </text>
        <text x="42" y="44" textAnchor="middle" fontSize="10" fill="#3b82f6">
          {librarySub}
        </text>

        <rect x="100" y="0" width="85" height="60" rx="6" fill="#ffffff" stroke="#93c5fd" />
        <text x="142" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
          {swimTitle}
        </text>
        <text x="142" y="44" textAnchor="middle" fontSize="10" fill="#3b82f6">
          {swimSub}
        </text>

        <rect x="200" y="0" width="85" height="60" rx="6" fill="#ffffff" stroke="#93c5fd" />
        <text x="242" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
          {parkTitle}
        </text>
        <text x="242" y="44" textAnchor="middle" fontSize="10" fill="#3b82f6">
          {parkSub}
        </text>
      </g>
      {step >= 2 && (
        <text x="200" y="180" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">
          {subtext}
        </text>
      )}
    </svg>
  );
}

export function GermanFoundationsDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl"
      ? "Fundacje dobroczynne"
      : lang === "de"
        ? "Stiftungen in Deutschland"
        : "Foundations in Germany";
  const title =
    lang === "pl"
      ? "Fundacje pożytku publicznego"
      : lang === "de"
        ? "25.000 Stiftungen in Deutschland"
        : "Charitable Trusts & Foundations";
  const subtitle =
    lang === "pl"
      ? "Kapitał żelazny na zawsze wspiera naukę, zdrowie i kulturę"
      : lang === "de"
        ? "Bosch, Bertelsmann und Zeiss im Dienst von Wissenschaft & Kultur"
        : "Tata Trusts, Bosch, and Premji Foundation funding education & society";
  const subtext =
    lang === "pl"
      ? "Kapitał żelazny jest chroniony; zyski służą dobru wspólnemu na wieki"
      : lang === "de"
        ? "Vermögen auf ewig geschützt; Erträge fließen dem Gemeinwohl zu"
        : "Capital preserved forever; annual earnings dedicated to the common good";

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
      <text x="200" y="90" textAnchor="middle" fontSize="11" fill="#475569">
        {subtitle}
      </text>
      <circle cx="200" cy="130" r="26" fill="#15803d" />
      <text x="200" y="137" textAnchor="middle" fontSize="18" fill="#ffffff">
        🌱
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">
          {subtext}
        </text>
      )}
    </svg>
  );
}
