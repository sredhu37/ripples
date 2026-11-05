import type { DiagramProps } from "../lesson/types";

export function ExpeditionShipDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Statek ekspedycyjny w doku" : lang === "de" ? "Expeditionsschiff im Dock" : "Expedition Ship In Dock";
  const subtext =
    lang === "pl"
      ? "Wielka wyprawa morska: finansowana z akcji i obligacji"
      : lang === "de"
      ? "Die große Seereise: Finanziert durch Aktien & Anleihen"
      : "The Great Ocean Voyage: Funded by Stocks & Bonds";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <defs>
        <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      <rect x="0" y="140" width="400" height="100" fill="url(#seaGrad)" />
      {/* Ship */}
      <path d="M100 130 L280 130 L250 170 L130 170 Z" fill="#78350f" stroke="#451a03" strokeWidth="3" />
      <line x1="180" y1="50" x2="180" y2="130" stroke="#451a03" strokeWidth="4" />
      <polygon points="180,60 250,90 180,120" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      {/* Captain Coral */}
      <circle cx="210" cy="115" r="12" fill="#fbbf24" />
      {step >= 2 && (
        <text x="200" y="210" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f8fafc">
          {subtext}
        </text>
      )}
    </svg>
  );
}

export function EquityVsDebtDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Porównanie kapitału własnego i dłużnego" : lang === "de" ? "Eigenkapital vs Fremdkapital" : "Equity vs Debt Comparison";
  const title =
    lang === "pl" ? "Dwa sposoby sfinansowania statku" : lang === "de" ? "Zwei Wege, das Schiff zu finanzieren" : "Two Ways to Fund the Ship";

  const finnTitle =
    lang === "pl" ? "Finn: Akcje (Własność)" : lang === "de" ? "Finn: Aktie (Eigenkapital)" : "Finn: Stock (Equity)";
  const finnDesc =
    lang === "pl" ? "Współwłaściciel statku" : lang === "de" ? "Miteigentümer des Schiffes" : "Co-owner of the ship";
  const finnUpside =
    lang === "pl" ? "Nieograniczony zysk" : lang === "de" ? "Unbegrenzte Gewinnchancen" : "Unlimited Upside";

  const beaTitle =
    lang === "pl" ? "Bea: Obligacja (Dług)" : lang === "de" ? "Bea: Anleihe (Fremdkapital)" : "Bea: Bond (Debt)";
  const beaDesc =
    lang === "pl" ? "Pożyczkodawca wyprawy" : lang === "de" ? "Geldgeberin der Reise" : "Lender to the voyage";
  const beaCoupon =
    lang === "pl" ? "Stały kupon: 5 monet" : lang === "de" ? "Fester 5-Münzen-Kupon" : "Fixed 5c Coupon";

  const subtext =
    lang === "pl"
      ? "Jeden ma udział w skarbach; drugi ma prawną obietnicę"
      : lang === "de"
      ? "Einer teilt den Schatz; die andere hat eine feste Zusage"
      : "One shares in treasure; the other gets a legal promise";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="70" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        {title}
      </text>
      {/* Stock (Finn) */}
      <rect x="65" y="90" width="120" height="70" rx="6" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
      <text x="125" y="115" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#c2410c">{finnTitle}</text>
      <text x="125" y="132" textAnchor="middle" fontSize="10" fill="#9a3412">{finnDesc}</text>
      <text x="125" y="148" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#c2410c">{finnUpside}</text>
      {/* Bond (Bea) */}
      <rect x="215" y="90" width="120" height="70" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="275" y="115" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">{beaTitle}</text>
      <text x="275" y="132" textAnchor="middle" fontSize="10" fill="#075985">{beaDesc}</text>
      <text x="275" y="148" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">{beaCoupon}</text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#475569">
          {subtext}
        </text>
      )}
    </svg>
  );
}

export function GrandTreasureDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Wielki skarb wyprawy" : lang === "de" ? "Großer Schatz-Erfolg" : "Grand Treasure Outcome";
  const title =
    lang === "pl" ? "Wielki skarb: przywieziono 100 monet!" : lang === "de" ? "Großer Schatz: 100 Münzen erlöst!" : "Grand Treasure: 100 Coins Brought Back!";
  const finnRole =
    lang === "pl" ? "Finn (Akcjonariusz)" : lang === "de" ? "Finn (Aktionär)" : "Finn (Stockholder)";
  const finnPayout =
    lang === "pl" ? "95 monet!" : lang === "de" ? "95 Münzen!" : "95 Coins!";
  const beaRole =
    lang === "pl" ? "Bea (Obligatariuszka)" : lang === "de" ? "Bea (Anleihehalterin)" : "Bea (Bondholder)";
  const beaPayout =
    lang === "pl" ? "5 monet" : lang === "de" ? "5 Münzen" : "5 Coins";
  const subtext =
    lang === "pl"
      ? "Akcjonariusze zgarniają olbrzymie zyski, gdy interes kwitnie!"
      : lang === "de"
      ? "Aktionäre erzielen riesige Gewinne, wenn das Geschäft boomt!"
      : "Stockholders enjoy massive windfalls when the business thrives!";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">
        {title}
      </text>
      <g transform="translate(60, 85)">
        <rect x="0" y="0" width="130" height="65" rx="6" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
        <text x="65" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">{finnRole}</text>
        <text x="65" y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#166534">{finnPayout}</text>

        <rect x="150" y="0" width="130" height="65" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <text x="215" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">{beaRole}</text>
        <text x="215" y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0369a1">{beaPayout}</text>
      </g>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">
          {subtext}
        </text>
      )}
    </svg>
  );
}

export function ShipwreckPriorityDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Kolejność zaspokajania roszczeń po katastrofie" : lang === "de" ? "Gläubigervorrang bei Havarie" : "Creditor Priority in Scrape";
  const title =
    lang === "pl" ? "Katastrofa: uratowano tylko 4 monety!" : lang === "de" ? "Schiffbruch: Nur 4 Münzen gerettet!" : "Shipwreck: Only 4 Coins Salvaged!";
  const finnRole =
    lang === "pl" ? "Finn (Akcjonariusz)" : lang === "de" ? "Finn (Aktionär)" : "Finn (Stockholder)";
  const finnPayout =
    lang === "pl" ? "0 monet" : lang === "de" ? "0 Münzen" : "0 Coins";
  const beaRole =
    lang === "pl" ? "Bea (Obligatariuszka)" : lang === "de" ? "Bea (Anleihehalterin)" : "Bea (Bondholder)";
  const beaPayout =
    lang === "pl" ? "4 monety" : lang === "de" ? "4 Münzen" : "4 Coins";
  const subtext =
    lang === "pl"
      ? "Pierwszeństwo spłaty: Wierzyciele otrzymują spłatę, zanim właściciele dostaną choć grosz!"
      : lang === "de"
      ? "Gesetzlicher Vorrang: Gläubiger werden bedient, bevor Miteigentümer einen Cent sehen!"
      : "Legal Priority: Creditors are repaid before co-owners get a cent!";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="40" y="40" width="320" height="160" rx="12" fill="#fef2f2" stroke="#fca5a5" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#991b1b">
        {title}
      </text>
      <g transform="translate(60, 85)">
        <rect x="0" y="0" width="130" height="65" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
        <text x="65" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">{finnRole}</text>
        <text x="65" y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#b91c1c">{finnPayout}</text>

        <rect x="150" y="0" width="130" height="65" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <text x="215" y="24" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">{beaRole}</text>
        <text x="215" y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0369a1">{beaPayout}</text>
      </g>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">
          {subtext}
        </text>
      )}
    </svg>
  );
}

export function PortfolioBalanceDiagram({ lang, step }: DiagramProps) {
  const ariaLabel =
    lang === "pl" ? "Zrównoważony portfel" : lang === "de" ? "Ausgewogenes Portfolio" : "Balanced Portfolio";
  const title =
    lang === "pl" ? "Mądra równowaga: Wzrost i Bezpieczeństwo" : lang === "de" ? "Die kluge Mischung: Wachstum & Sicherheit" : "The Prudent Blend: Growth & Safety";
  const stocksLabel =
    lang === "pl" ? "Akcje" : lang === "de" ? "Aktien" : "Stocks";
  const bondsLabel =
    lang === "pl" ? "Obligacje" : lang === "de" ? "Anleihen" : "Bonds";
  const subtext =
    lang === "pl"
      ? "Akcje dla przyszłego wzrostu, obligacje dla spokojnego snu"
      : lang === "de"
      ? "Aktien für künftiges Wachstum, Anleihen für ruhigen Schlaf"
      : "Stocks for future growth, bonds for steady peace of mind";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label={ariaLabel}>
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#166534">
        {title}
      </text>
      <circle cx="150" cy="120" r="32" fill="#ea580c" opacity="0.9" />
      <text x="150" y="125" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">{stocksLabel}</text>
      <circle cx="250" cy="120" r="32" fill="#0284c7" opacity="0.9" />
      <text x="250" y="125" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">{bondsLabel}</text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">
          {subtext}
        </text>
      )}
    </svg>
  );
}
