import type { DiagramProps } from "../lesson/types";

export function PrivateOwnershipDiagram({ lang, step }: DiagramProps) {
  const beaTitle =
    lang === "pl" ? "Piekarnia Bei" : lang === "de" ? "Beas Bäckerei" : "Bea's Bakery";
  const beaLine1 =
    lang === "pl" ? "Własny piec chlebowy" : lang === "de" ? "Eigener Ofen" : "Owns brick oven";
  const beaLine2 =
    lang === "pl" ? "Zachowuje zysk" : lang === "de" ? "Behält Gewinn" : "Keeps profits";

  const finnTitle =
    lang === "pl" ? "Łódź Finna" : lang === "de" ? "Finns Boot" : "Finn's Boat";
  const finnLine1 =
    lang === "pl" ? "Własna sieć rybacka" : lang === "de" ? "Eigenes Fischernetz" : "Owns fishing net";
  const finnLine2 =
    lang === "pl" ? "Tworzy lepsze narzędzia" : lang === "de" ? "Erfindet Werkzeuge" : "Invents faster tools";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(60, 40)">
        <rect x="0" y="0" width="120" height="110" fill="#fef3c7" stroke="#f59e0b" rx="6" />
        <text x="60" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b45309">{beaTitle}</text>
        <text x="60" y="60" textAnchor="middle" fontSize="24">🥖🍞</text>
        <text x="60" y="85" textAnchor="middle" fontSize="9" fill="#92400e">{beaLine1}</text>
        <text x="60" y="100" textAnchor="middle" fontSize="9" fill="#92400e">{beaLine2}</text>
      </g>
      {step >= 2 && (
        <g transform="translate(220, 40)">
          <rect x="0" y="0" width="120" height="110" fill="#e0f2fe" stroke="#0284c7" rx="6" />
          <text x="60" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">{finnTitle}</text>
          <text x="60" y="60" textAnchor="middle" fontSize="24">⛵🐟</text>
          <text x="60" y="85" textAnchor="middle" fontSize="9" fill="#075985">{finnLine1}</text>
          <text x="60" y="100" textAnchor="middle" fontSize="9" fill="#075985">{finnLine2}</text>
        </g>
      )}
    </svg>
  );
}

export function CompetitionDiagram({ lang, step }: DiagramProps) {
  const beaShop =
    lang === "pl" ? "Bea: Bułki sezamowe" : lang === "de" ? "Bea: Sesambrötchen" : "Bea: Sesame Rolls";
  const beaTrait =
    lang === "pl" ? "Świeże i chrupiące" : lang === "de" ? "Frisch & knusprig" : "Fresh & crunchy";
  const beaPrice =
    lang === "pl" ? "Cena: 2 monety" : lang === "de" ? "Preis: 2 Münzen" : "Price: 2 coins";

  const leoShop =
    lang === "pl" ? "Leo: Chleb ziarnisty" : lang === "de" ? "Leo: Körnerbrot" : "Leo: Seeded Bread";
  const leoTrait =
    lang === "pl" ? "Ciepły i pożywny" : lang === "de" ? "Warm & lecker" : "Warm & tasty";
  const leoPrice =
    lang === "pl" ? "Cena: 2 monety" : lang === "de" ? "Preis: 2 Münzen" : "Price: 2 coins";

  const note =
    lang === "pl"
      ? "Konkurencja daje klientom wybór, wysoką jakość i uczciwe ceny!"
      : lang === "de"
      ? "Wettbewerb bietet Kunden Auswahl, Qualität und faire Preise!"
      : "Competition gives customers variety, quality, and fair prices!";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(40, 30)">
        <rect x="0" y="10" width="140" height="110" fill="#fef9c3" stroke="#eab308" rx="6" />
        <text x="70" y="35" textAnchor="middle" fontSize="11" fontWeight="bold">{beaShop}</text>
        <text x="70" y="65" textAnchor="middle" fontSize="20">🥐</text>
        <text x="70" y="90" textAnchor="middle" fontSize="9" fill="#854d0e">{beaTrait}</text>
        <text x="70" y="105" textAnchor="middle" fontSize="9" fill="#854d0e">{beaPrice}</text>

        <rect x="180" y="10" width="140" height="110" fill="#fed7aa" stroke="#f97316" rx="6" />
        <text x="250" y="35" textAnchor="middle" fontSize="11" fontWeight="bold">{leoShop}</text>
        <text x="250" y="65" textAnchor="middle" fontSize="20">🍞</text>
        <text x="250" y="90" textAnchor="middle" fontSize="9" fill="#9a3412">{leoTrait}</text>
        <text x="250" y="105" textAnchor="middle" fontSize="9" fill="#9a3412">{leoPrice}</text>
      </g>
      {step >= 2 && (
        <text x="200" y="170" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="bold">
          {note}
        </text>
      )}
    </svg>
  );
}

export function RulesBalanceDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl" ? "Społeczna gospodarka rynkowa" : lang === "de" ? "Soziale Marktwirtschaft" : "Social Market Economy";

  const freeTitle =
    lang === "pl" ? "Wolność rynkowa" : lang === "de" ? "Markt-Freiheit" : "Market Freedom";
  const f1 =
    lang === "pl" ? "• Inicjatywa prywatna" : lang === "de" ? "• Private Initiative" : "• Private initiative";
  const f2 =
    lang === "pl" ? "• Innowacje i handel" : lang === "de" ? "• Innovation & Handel" : "• Innovation & trade";
  const f3 =
    lang === "pl" ? "• Wybór dla klienta" : lang === "de" ? "• Kunden-Auswahl" : "• Customer choice";

  const rulesTitle =
    lang === "pl" ? "Reguły społeczne" : lang === "de" ? "Soziale Spielregeln" : "Social Ground Rules";
  const r1 =
    lang === "pl" ? "• Płace i bezpieczeństwo" : lang === "de" ? "• Faire Löhne & Schutz" : "• Fair wages & safety";
  const r2 =
    lang === "pl" ? "• Czysta przyroda" : lang === "de" ? "• Saubere Umwelt" : "• Clean environment";
  const r3 =
    lang === "pl" ? "• Przepisy antymonopolowe" : lang === "de" ? "• Kartellgesetze" : "• Anti-monopoly laws";

  const footer =
    lang === "pl"
      ? "Wolność tworzy dobrobyt, a sprawiedliwe reguły chronią ludzi i środowisko"
      : lang === "de"
      ? "Freiheit schafft Wohlstand, und faire Regeln schützen Arbeiter und Gemeingüter"
      : "Freedom creates prosperity, and fair rules protect workers and public goods";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 30)">
        <text x="150" y="20" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
          {title}
        </text>
        <g transform="translate(0, 40)">
          <rect x="0" y="0" width="140" height="90" fill="#e0f2fe" rx="4" />
          <text x="70" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">{freeTitle}</text>
          <text x="12" y="45" fontSize="9" fill="#0284c7">{f1}</text>
          <text x="12" y="60" fontSize="9" fill="#0284c7">{f2}</text>
          <text x="12" y="75" fontSize="9" fill="#0284c7">{f3}</text>
        </g>
        <g transform="translate(160, 40)">
          <rect x="0" y="0" width="140" height="90" fill="#dcfce7" rx="4" />
          <text x="70" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">{rulesTitle}</text>
          <text x="12" y="45" fontSize="9" fill="#166534">{r1}</text>
          <text x="12" y="60" fontSize="9" fill="#166534">{r2}</text>
          <text x="12" y="75" fontSize="9" fill="#166534">{r3}</text>
        </g>
      </g>
      {step >= 2 && (
        <text x="200" y="175" textAnchor="middle" fontSize="10" fill="#475569">
          {footer}
        </text>
      )}
    </svg>
  );
}

export function SummaryDiagram({ lang, step }: DiagramProps) {
  const innov =
    lang === "pl" ? "Innowacje" : lang === "de" ? "Innovation" : "Innovation";
  const trade =
    lang === "pl" ? "Uczciwy handel" : lang === "de" ? "Fairer Handel" : "Fair Trade";
  const protect =
    lang === "pl" ? "Ochrona praw" : lang === "de" ? "Schutz" : "Protection";

  const note =
    lang === "pl"
      ? "Przedsiębiorczość działa najlepiej w połączeniu ze sprawiedliwymi regułami!"
      : lang === "de"
      ? "Freie Wirtschaft funktioniert am besten mit starken und fairen Regeln!"
      : "Free enterprise works best with strong and fair community rules!";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 30)">
        <circle cx="50" cy="50" r="35" fill="#fef08a" />
        <text x="50" y="45" textAnchor="middle" fontSize="20">💡</text>
        <text x="50" y="70" textAnchor="middle" fontSize="10" fontWeight="bold">{innov}</text>
        
        <circle cx="150" cy="50" r="35" fill="#bae6fd" />
        <text x="150" y="45" textAnchor="middle" fontSize="20">🤝</text>
        <text x="150" y="70" textAnchor="middle" fontSize="10" fontWeight="bold">{trade}</text>

        <circle cx="250" cy="50" r="35" fill="#bbf7d0" />
        <text x="250" y="45" textAnchor="middle" fontSize="20">⚖️</text>
        <text x="250" y="70" textAnchor="middle" fontSize="10" fontWeight="bold">{protect}</text>
      </g>
      {step >= 2 && (
        <text x="200" y="150" textAnchor="middle" fontSize="12" fill="#15803d" fontWeight="bold">
          {note}
        </text>
      )}
    </svg>
  );
}

export function ProsperityDiagram({ lang, step }: DiagramProps) {
  const abund =
    lang === "pl" ? "Dostatniość" : lang === "de" ? "Wohlstand" : "Abundance";
  const prosp =
    lang === "pl" ? "Wspólny dobrobyt" : lang === "de" ? "Geteilter Wohlstand" : "Shared Prosperity";
  const prospSub =
    lang === "pl" ? "Uczciwe zasady wspierają każdego" : lang === "de" ? "Faire Regeln stärken jeden" : "Fair rules lift everyone";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <circle cx="60" cy="50" r="35" fill="#fef08a" />
        <text x="60" y="55" textAnchor="middle" fontSize="24">🌾🍞</text>
        <text x="60" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#854d0e">{abund}</text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 40)">
          <rect x="0" y="15" width="150" height="70" fill="#dcfce7" rx="6" />
          <text x="75" y="45" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">{prosp}</text>
          <text x="75" y="65" textAnchor="middle" fontSize="8" fill="#15803d">{prospSub}</text>
        </g>
      )}
    </svg>
  );
}
