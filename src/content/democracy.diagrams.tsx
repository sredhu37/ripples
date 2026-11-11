import type { DiagramProps } from "../lesson/types";

export function CharterDiagram({ lang, step }: DiagramProps) {
  const charterTitle =
    lang === "pl" ? "Statut Miasteczka" : lang === "de" ? "Dorfsatzung" : "Town Charter";
  const item1 =
    lang === "pl" ? "• Równe prawa" : lang === "de" ? "• Gleiche Rechte" : "• Equal Rights";
  const item2 =
    lang === "pl" ? "• Wolność słowa" : lang === "de" ? "• Freie Meinung" : "• Free Speech";
  const item3 = lang === "pl" ? "• Jawna rada" : lang === "de" ? "• Offener Rat" : "• Open Council";
  const item4 =
    lang === "pl" ? "• Uczciwe sądy" : lang === "de" ? "• Faire Gerichte" : "• Fair Courts";

  const leaderLabel = lang === "pl" ? "Władza" : lang === "de" ? "Anführer" : "Leader";
  const leaderSub =
    lang === "pl" ? "Związana prawem" : lang === "de" ? "An Gesetze gebunden" : "Bound by Laws";

  const citizenLabel = lang === "pl" ? "Obywatel" : lang === "de" ? "Bürger" : "Citizen";
  const citizenSub =
    lang === "pl"
      ? "Chroniony prawem"
      : lang === "de"
        ? "Durch Gesetz geschützt"
        : "Protected by Laws";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(60, 30)">
        <rect
          x="0"
          y="10"
          width="120"
          height="150"
          fill="#fef08a"
          stroke="#ca8a04"
          strokeWidth="2"
          rx="6"
        />
        <text x="60" y="40" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#713f12">
          {charterTitle}
        </text>
        <line x1="20" y1="55" x2="100" y2="55" stroke="#a16207" strokeWidth="1" />
        <text x="20" y="75" fontSize="10" fill="#854d0e">
          {item1}
        </text>
        <text x="20" y="95" fontSize="10" fill="#854d0e">
          {item2}
        </text>
        <text x="20" y="115" fontSize="10" fill="#854d0e">
          {item3}
        </text>
        <text x="20" y="135" fontSize="10" fill="#854d0e">
          {item4}
        </text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 50)">
          <circle cx="40" cy="40" r="30" fill="#bfdbfe" />
          <text x="40" y="45" textAnchor="middle" fontSize="12" fontWeight="bold">
            {leaderLabel}
          </text>
          <text x="40" y="90" textAnchor="middle" fontSize="10" fill="#1e40af">
            {leaderSub}
          </text>

          <circle cx="120" cy="40" r="30" fill="#bbf7d0" />
          <text x="120" y="45" textAnchor="middle" fontSize="12" fontWeight="bold">
            {citizenLabel}
          </text>
          <text x="120" y="90" textAnchor="middle" fontSize="10" fill="#166534">
            {citizenSub}
          </text>
        </g>
      )}
    </svg>
  );
}

export function DebateProposalDiagram({ lang, step }: DiagramProps) {
  const leaderIdea =
    lang === "pl" ? "Pomysł przywódcy" : lang === "de" ? "Idee des Leiters" : "Leader's Idea";
  const towerLabel =
    lang === "pl"
      ? "Wielka wieża zegarowa"
      : lang === "de"
        ? "Marmor-Uhrenturm"
        : "Giant Clock Tower";

  const responseTitle =
    lang === "pl" ? "Głos mieszkańców" : lang === "de" ? "Reaktion der Bürger" : "Citizen Response";
  const quote1 =
    lang === "pl"
      ? '"Dach szkoły przecieka!"'
      : lang === "de"
        ? '"Das Schuldach ist undicht!"'
        : '"The school roof leaks!"';
  const quote2 =
    lang === "pl"
      ? '"Potrzebujemy priorytetów!"'
      : lang === "de"
        ? '"Wir brauchen Prioritäten!"'
        : '"We need fair priorities!"';
  const hallLabel =
    lang === "pl" ? "Otwarte zgromadzenie" : lang === "de" ? "Bürgerversammlung" : "Open Town Hall";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <rect x="0" y="10" width="130" height="120" fill="#f1f5f9" stroke="#cbd5e1" rx="6" />
        <text x="65" y="35" textAnchor="middle" fontSize="12" fontWeight="bold">
          {leaderIdea}
        </text>
        <text x="65" y="70" textAnchor="middle" fontSize="24">
          🏛️
        </text>
        <text x="65" y="105" textAnchor="middle" fontSize="10" fill="#475569">
          {towerLabel}
        </text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 40)">
          <rect x="0" y="10" width="140" height="120" fill="#f0fdf4" stroke="#86efac" rx="6" />
          <text x="70" y="35" textAnchor="middle" fontSize="12" fontWeight="bold">
            {responseTitle}
          </text>
          <text x="70" y="65" textAnchor="middle" fontSize="10" fill="#15803d">
            {quote1}
          </text>
          <text x="70" y="90" textAnchor="middle" fontSize="10" fill="#15803d">
            {quote2}
          </text>
          <text x="70" y="115" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">
            {hallLabel}
          </text>
        </g>
      )}
    </svg>
  );
}

export function CompromiseDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Wypracowanie mądrego kompromisu"
      : lang === "de"
        ? "Der ausgewogene Kompromiss"
        : "Finding the Balanced Compromise";
  const lighthouse = lang === "pl" ? "Latarnia" : lang === "de" ? "Leuchtturm" : "Lighthouse";
  const grainStore = lang === "pl" ? "Spichlerz" : lang === "de" ? "Kornspeicher" : "Grain Store";
  const townPark = lang === "pl" ? "Park miejski" : lang === "de" ? "Dorf-Park" : "Town Park";
  const tokensLabel = lang === "pl" ? "żetony" : lang === "de" ? "Münzen" : "tokens";

  const bannerText =
    lang === "pl"
      ? "Wszyscy zgodni: Kompromis!"
      : lang === "de"
        ? "Alle Gruppen einig: Kompromiss!"
        : "All Groups Agree: Compromise!";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 30)">
        <text x="150" y="20" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
          {title}
        </text>
        <g transform="translate(10, 40)">
          <rect x="0" y="10" width="80" height="70" fill="#e0f2fe" rx="4" />
          <text x="40" y="45" textAnchor="middle" fontSize="11" fontWeight="bold">
            {lighthouse}
          </text>
          <text x="40" y="65" textAnchor="middle" fontSize="10" fill="#0369a1">
            4 {tokensLabel}
          </text>
        </g>
        <g transform="translate(100, 40)">
          <rect x="0" y="10" width="80" height="70" fill="#fef9c3" rx="4" />
          <text x="40" y="45" textAnchor="middle" fontSize="11" fontWeight="bold">
            {grainStore}
          </text>
          <text x="40" y="65" textAnchor="middle" fontSize="10" fill="#854d0e">
            3 {tokensLabel}
          </text>
        </g>
        <g transform="translate(190, 40)">
          <rect x="0" y="10" width="80" height="70" fill="#dcfce7" rx="4" />
          <text x="40" y="45" textAnchor="middle" fontSize="11" fontWeight="bold">
            {townPark}
          </text>
          <text x="40" y="65" textAnchor="middle" fontSize="10" fill="#166534">
            3 {tokensLabel}
          </text>
        </g>
      </g>
      {step >= 2 && (
        <g transform="translate(100, 150)">
          <rect x="0" y="0" width="200" height="30" fill="#22c55e" rx="4" />
          <text x="100" y="20" textAnchor="middle" fontSize="12" fill="#ffffff" fontWeight="bold">
            {bannerText}
          </text>
        </g>
      )}
    </svg>
  );
}

export function PillarsDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Filary ustroju demokratycznego"
      : lang === "de"
        ? "Säulen der Demokratie"
        : "Pillars of Democratic Governance";
  const pillar1Title =
    lang === "pl" ? "1. Wolność słowa" : lang === "de" ? "1. Freie Meinung" : "1. Free Speech";
  const pillar1Sub =
    lang === "pl" ? "Otwarta debata" : lang === "de" ? "Offene Debatte" : "Open debate";

  const pillar2Title =
    lang === "pl" ? "2. Rządy prawa" : lang === "de" ? "2. Rechtsstaat" : "2. Rule of Law";
  const pillar2Sub =
    lang === "pl"
      ? "Równe prawo dla każdego"
      : lang === "de"
        ? "Gleiches Recht für alle"
        : "Same rules for all";

  const pillar3Title =
    lang === "pl"
      ? "3. Korekta błędów"
      : lang === "de"
        ? "3. Fehlerkorrektur"
        : "3. Error Correction";
  const pillar3Sub =
    lang === "pl"
      ? "Odwołanie w wyborach"
      : lang === "de"
        ? "Abwahl schlechter Ideen"
        : "Vote out bad ideas";

  const subtext =
    lang === "pl"
      ? "Władza należy do obywateli dzięki instytucjom i regularnym wyborom"
      : lang === "de"
        ? "Macht bleibt bei den Bürgern durch Institutionen und regelmäßige Wahlen"
        : "Power stays with the citizens through institutions and regular elections";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(30, 20)">
        <text x="170" y="25" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
          {title}
        </text>
        <g transform="translate(10, 50)">
          <rect x="0" y="0" width="90" height="80" fill="#e0e7ff" rx="4" />
          <text x="45" y="30" textAnchor="middle" fontSize="10" fontWeight="bold">
            {pillar1Title}
          </text>
          <text x="45" y="55" textAnchor="middle" fontSize="9" fill="#3730a3">
            {pillar1Sub}
          </text>
        </g>
        <g transform="translate(115, 50)">
          <rect x="0" y="0" width="90" height="80" fill="#e0e7ff" rx="4" />
          <text x="45" y="30" textAnchor="middle" fontSize="10" fontWeight="bold">
            {pillar2Title}
          </text>
          <text x="45" y="55" textAnchor="middle" fontSize="9" fill="#3730a3">
            {pillar2Sub}
          </text>
        </g>
        <g transform="translate(220, 50)">
          <rect x="0" y="0" width="110" height="80" fill="#e0e7ff" rx="4" />
          <text x="55" y="30" textAnchor="middle" fontSize="10" fontWeight="bold">
            {pillar3Title}
          </text>
          <text x="55" y="55" textAnchor="middle" fontSize="9" fill="#3730a3">
            {pillar3Sub}
          </text>
        </g>
      </g>
      {step >= 2 && (
        <text x="200" y="165" textAnchor="middle" fontSize="11" fill="#64748b">
          {subtext}
        </text>
      )}
    </svg>
  );
}

export function TrustDiagram({ lang, step }: DiagramProps) {
  const trustLabel =
    lang === "pl"
      ? "Pokojowe zaufanie"
      : lang === "de"
        ? "Friedliches Vertrauen"
        : "Peaceful Trust";
  const progressTitle =
    lang === "pl"
      ? "Wspólny rozwój"
      : lang === "de"
        ? "Gemeinsamer Fortschritt"
        : "Shared Progress";
  const progressSub =
    lang === "pl"
      ? "Zgodna i bezpieczna współpraca"
      : lang === "de"
        ? "Friedliches Zusammenwirken"
        : "Working together peacefully";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <circle cx="60" cy="50" r="35" fill="#dcfce7" />
        <text x="60" y="55" textAnchor="middle" fontSize="24">
          🤝
        </text>
        <text x="60" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">
          {trustLabel}
        </text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 40)">
          <rect x="0" y="15" width="140" height="70" fill="#e0f2fe" rx="6" />
          <text x="70" y="45" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">
            {progressTitle}
          </text>
          <text x="70" y="65" textAnchor="middle" fontSize="9" fill="#0284c7">
            {progressSub}
          </text>
        </g>
      )}
    </svg>
  );
}
