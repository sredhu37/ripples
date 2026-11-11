import type { DiagramProps } from "../lesson/types";

export function TimberDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Projekty w Ripple Town"
      : lang === "de"
        ? "Projekte in Ripple Town"
        : "Ripple Town Projects";
  const pierTitle =
    lang === "pl" ? "Pomost rybacki" : lang === "de" ? "Hafenanleger" : "Harbor Pier";
  const pavilionTitle =
    lang === "pl" ? "Pawilon targowy" : lang === "de" ? "Marktpavillon" : "Market Pavilion";
  const subtext =
    lang === "pl"
      ? "Ograniczone drewno: Wybierzmy jeden!"
      : lang === "de"
        ? "Begrenztes Bauholz: Wähle eins!"
        : "Limited Timber: Choose One!";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <text x="0" y="20" fontSize="16" fontWeight="bold" fill="#334155">
          {title}
        </text>
        <rect x="0" y="40" width="120" height="80" rx="6" fill="#e2e8f0" stroke="#94a3b8" />
        <text x="60" y="85" textAnchor="middle" fontSize="14" fill="#1e293b">
          {pierTitle}
        </text>
        <text x="60" y="105" textAnchor="middle" fontSize="12" fill="#64748b">
          (Moss)
        </text>

        <rect x="160" y="40" width="120" height="80" rx="6" fill="#e2e8f0" stroke="#94a3b8" />
        <text x="220" y="85" textAnchor="middle" fontSize="14" fill="#1e293b">
          {pavilionTitle}
        </text>
        <text x="220" y="105" textAnchor="middle" fontSize="12" fill="#64748b">
          (Pip)
        </text>
      </g>
      {step >= 2 && (
        <g transform="translate(140, 150)">
          <text x="50" y="20" textAnchor="middle" fontSize="14" fill="#0284c7" fontWeight="bold">
            {subtext}
          </text>
        </g>
      )}
    </svg>
  );
}

export function DebateDiagram({ lang, step }: DiagramProps) {
  const mossQuote =
    lang === "pl"
      ? '"Kutry rybackie potrzebują bezpiecznego pomostu!"'
      : lang === "de"
        ? '"Fischerboote brauchen sicheren Anleger!"'
        : '"Fishing boats need a safe pier!"';
  const pipQuote =
    lang === "pl"
      ? '"Rodziny potrzebują zacienionego pawilonu na targu!"'
      : lang === "de"
        ? '"Familien brauchen schattige Marktstände!"'
        : '"Families need shaded market stalls!"';

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(60, 50)">
        <circle cx="40" cy="50" r="30" fill="#bae6fd" />
        <text x="40" y="55" textAnchor="middle" fontSize="14">
          Moss
        </text>
        <text x="40" y="100" textAnchor="middle" fontSize="11" fill="#0369a1">
          {mossQuote}
        </text>
      </g>
      {step >= 2 && (
        <g transform="translate(220, 50)">
          <circle cx="40" cy="50" r="30" fill="#fed7aa" />
          <text x="40" y="55" textAnchor="middle" fontSize="14">
            Pip
          </text>
          <text x="40" y="100" textAnchor="middle" fontSize="11" fill="#c2410c">
            {pipQuote}
          </text>
        </g>
      )}
    </svg>
  );
}

export function BoothDiagram({ lang, step }: DiagramProps) {
  const boothLabel1 = lang === "pl" ? "Zasłonięta" : lang === "de" ? "Private" : "Private";
  const boothLabel2 =
    lang === "pl" ? "Kabina wyborcza" : lang === "de" ? "Wahlkabine" : "Voting Booth";
  const ballotTitle =
    lang === "pl" ? "Karta do głosowania" : lang === "de" ? "Stimmzettel" : "Paper Ballot";
  const ballotSub =
    lang === "pl" ? "Tajny wybór" : lang === "de" ? "Geheime Wahl" : "Secret Choice";
  const boxTitle = lang === "pl" ? "Urna wyborcza" : lang === "de" ? "Wahlurne" : "Ballot Box";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 30)">
        <rect x="0" y="20" width="100" height="120" fill="#cbd5e1" rx="4" />
        <rect x="10" y="30" width="80" height="100" fill="#f1f5f9" />
        <text x="50" y="70" textAnchor="middle" fontSize="11" fill="#475569">
          {boothLabel1}
        </text>
        <text x="50" y="90" textAnchor="middle" fontSize="11" fill="#475569">
          {boothLabel2}
        </text>
      </g>
      {step >= 2 && (
        <g transform="translate(180, 50)">
          <rect
            x="0"
            y="20"
            width="80"
            height="80"
            fill="#fef08a"
            stroke="#ca8a04"
            strokeWidth="2"
            rx="4"
          />
          <text x="40" y="55" textAnchor="middle" fontSize="10" fontWeight="bold">
            {ballotTitle}
          </text>
          <text x="40" y="75" textAnchor="middle" fontSize="10" fill="#854d0e">
            {ballotSub}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g transform="translate(290, 50)">
          <rect x="0" y="20" width="70" height="90" fill="#bbf7d0" stroke="#16a34a" rx="4" />
          <rect x="25" y="15" width="20" height="5" fill="#15803d" />
          <text x="35" y="65" textAnchor="middle" fontSize="11" fontWeight="bold">
            {boxTitle}
          </text>
        </g>
      )}
    </svg>
  );
}

export function CountDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Jawne liczenie głosów"
      : lang === "de"
        ? "Öffentliche Stimmauszählung"
        : "Public Vote Count";
  const pierLabel =
    lang === "pl" ? "Głosy na pomost" : lang === "de" ? "Anleger-Stimmen" : "Pier Votes";
  const pavilionLabel =
    lang === "pl" ? "Głosy na pawilon" : lang === "de" ? "Pavillon-Stimmen" : "Pavilion Votes";
  const outcomeText =
    lang === "pl"
      ? "Pomost rybacki wygrywa: wynik uszanowany!"
      : lang === "de"
        ? "Hafenanleger gewinnt: Entscheidung respektiert!"
        : "Harbor Pier Wins: Decision Respected!";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <text x="150" y="20" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">
          {title}
        </text>
        <rect x="20" y="50" width="110" height="60" fill="#e0f2fe" rx="4" />
        <text x="75" y="75" textAnchor="middle" fontSize="12" fill="#0369a1">
          {pierLabel}
        </text>
        <text x="75" y="95" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0284c7">
          3
        </text>

        <rect x="170" y="50" width="110" height="60" fill="#ffedd5" rx="4" />
        <text x="225" y="75" textAnchor="middle" fontSize="12" fill="#c2410c">
          {pavilionLabel}
        </text>
        <text x="225" y="95" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#ea580c">
          2
        </text>
      </g>
      {step >= 2 && (
        <text x="200" y="170" textAnchor="middle" fontSize="13" fill="#16a34a" fontWeight="bold">
          {outcomeText}
        </text>
      )}
    </svg>
  );
}

export function PrinciplesDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Zasady wyborów demokratycznych"
      : lang === "de"
        ? "Demokratische Wahlgrundsätze"
        : "Democratic Election Principles";
  const equalLabel = lang === "pl" ? "Równe" : lang === "de" ? "Gleich" : "Equal";
  const equalSub =
    lang === "pl" ? "1 osoba, 1 głos" : lang === "de" ? "1 Person, 1 Stimme" : "1 person, 1 vote";

  const secretLabel = lang === "pl" ? "Tajne" : lang === "de" ? "Geheim" : "Secret";
  const secretSub = lang === "pl" ? "W kabinie" : lang === "de" ? "In der Kabine" : "Private booth";

  const freeLabel = lang === "pl" ? "Wolne" : lang === "de" ? "Frei" : "Free";
  const freeSub = lang === "pl" ? "Bez przymusu" : lang === "de" ? "Ohne Zwang" : "No pressure";

  const subtext =
    lang === "pl"
      ? "Pokojowe rozstrzyganie sporów i wspólny szacunek"
      : lang === "de"
        ? "Friedliche Entscheidungen und gemeinsamer Respekt"
        : "Peaceful error correction and shared respect";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(30, 30)">
        <text x="170" y="20" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">
          {title}
        </text>
        <circle cx="50" cy="80" r="35" fill="#e0f2fe" />
        <text x="50" y="80" textAnchor="middle" fontSize="10" fontWeight="bold">
          {equalLabel}
        </text>
        <text x="50" y="95" textAnchor="middle" fontSize="9" fill="#0369a1">
          {equalSub}
        </text>

        <circle cx="170" cy="80" r="35" fill="#fef9c3" />
        <text x="170" y="80" textAnchor="middle" fontSize="10" fontWeight="bold">
          {secretLabel}
        </text>
        <text x="170" y="95" textAnchor="middle" fontSize="9" fill="#854d0e">
          {secretSub}
        </text>

        <circle cx="290" cy="80" r="35" fill="#dcfce7" />
        <text x="290" y="80" textAnchor="middle" fontSize="10" fontWeight="bold">
          {freeLabel}
        </text>
        <text x="290" y="95" textAnchor="middle" fontSize="9" fill="#15803d">
          {freeSub}
        </text>
      </g>
      {step >= 2 && (
        <text x="200" y="170" textAnchor="middle" fontSize="13" fill="#475569">
          {subtext}
        </text>
      )}
    </svg>
  );
}
