import type { DiagramProps } from "../lesson/types";

export function TakeoverDiagram({ lang, step }: DiagramProps) {
  const harbor = lang === "pl" ? "Odległa Przystań" : lang === "de" ? "Ferner Hafen" : "Far Harbor";
  const takeover =
    lang === "pl"
      ? "Barnaby przejmuje kontrolę"
      : lang === "de"
        ? "Barnaby übernimmt Kontrolle"
        : "Barnaby takes control";
  const boxTitle =
    lang === "pl"
      ? "Władza bez kontroli"
      : lang === "de"
        ? "Unkontrollierte Macht"
        : "Unchecked Power";
  const line1 =
    lang === "pl"
      ? "• Zakaz zgromadzeń"
      : lang === "de"
        ? "• Verbietet Treffen"
        : "• Bans public meetings";
  const line2 =
    lang === "pl"
      ? "• Zamknięcie gazety"
      : lang === "de"
        ? "• Schließt die Zeitung"
        : "• Shuts town newspaper";
  const line3 =
    lang === "pl"
      ? "• Zakaz wolnych wyborów"
      : lang === "de"
        ? "• Keine Wahlen erlaubt"
        : "• No elections allowed";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(60, 30)">
        <rect x="0" y="20" width="120" height="120" fill="#fee2e2" stroke="#ef4444" rx="6" />
        <text x="60" y="55" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">
          {harbor}
        </text>
        <text x="60" y="90" textAnchor="middle" fontSize="30">
          🛑
        </text>
        <text x="60" y="125" textAnchor="middle" fontSize="9" fill="#b91c1c">
          {takeover}
        </text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 40)">
          <rect x="0" y="10" width="150" height="100" fill="#fef2f2" stroke="#fca5a5" rx="4" />
          <text x="75" y="35" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">
            {boxTitle}
          </text>
          <text x="12" y="60" fontSize="9" fill="#7f1d1d">
            {line1}
          </text>
          <text x="12" y="75" fontSize="9" fill="#7f1d1d">
            {line2}
          </text>
          <text x="12" y="90" fontSize="9" fill="#7f1d1d">
            {line3}
          </text>
        </g>
      )}
    </svg>
  );
}

export function SilencedFeedbackDiagram({ lang, step }: DiagramProps) {
  const pipeTitle =
    lang === "pl" ? "Pęknięta rura!" : lang === "de" ? "Wasserrohr leckt!" : "Water Pipe Leaks!";
  const pipeSub =
    lang === "pl"
      ? "Zalewa ulicę Główną"
      : lang === "de"
        ? "Flutet die Hauptstraße"
        : "Flooding Main Street";

  const silenceTitle =
    lang === "pl"
      ? "Uciszeni mieszkańcy"
      : lang === "de"
        ? "Bürger zum Schweigen gebracht"
        : "Silenced Citizens";
  const silenceLine1 =
    lang === "pl"
      ? "Strach przed złymi wieściami"
      : lang === "de"
        ? "Angst vor schlechten Nachrichten"
        : "Afraid to speak bad news";
  const silenceLine2 =
    lang === "pl"
      ? "Zablokowany obieg informacji"
      : lang === "de"
        ? "Keine freie Rückmeldung"
        : "No free feedback loop";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <rect x="0" y="0" width="130" height="120" fill="#fef2f2" stroke="#f87171" rx="6" />
        <text x="65" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">
          {pipeTitle}
        </text>
        <text x="65" y="65" textAnchor="middle" fontSize="24">
          🌊💦
        </text>
        <text x="65" y="95" textAnchor="middle" fontSize="10" fill="#b91c1c">
          {pipeSub}
        </text>
      </g>
      {step >= 2 && (
        <g transform="translate(220, 40)">
          <rect x="0" y="0" width="140" height="120" fill="#f1f5f9" stroke="#94a3b8" rx="6" />
          <text x="70" y="30" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">
            {silenceTitle}
          </text>
          <text x="70" y="65" textAnchor="middle" fontSize="24">
            🤐🔒
          </text>
          <text x="70" y="90" textAnchor="middle" fontSize="8" fill="#64748b">
            {silenceLine1}
          </text>
          <text x="70" y="105" textAnchor="middle" fontSize="8" fill="#64748b">
            {silenceLine2}
          </text>
        </g>
      )}
    </svg>
  );
}

export function ContrastDiagram({ lang, step }: DiagramProps) {
  const mainTitle =
    lang === "pl"
      ? "Obieg informacji a naprawianie problemów"
      : lang === "de"
        ? "Rückmeldung und Problemlösung"
        : "Feedback and Problem Solving";

  const closedTitle =
    lang === "pl"
      ? "Dyktatura (Zamknięta)"
      : lang === "de"
        ? "Diktatur (Geschlossen)"
        : "Dictatorship (Closed)";
  const c1 =
    lang === "pl"
      ? "• Błędy są ukrywane"
      : lang === "de"
        ? "• Fehler werden versteckt"
        : "• Mistakes are hidden";
  const c2 =
    lang === "pl"
      ? "• Złe wieści są karane"
      : lang === "de"
        ? "• Schlechte News bestraft"
        : "• Bad news is punished";
  const c3 =
    lang === "pl"
      ? "• Szkody nieustannie rosną"
      : lang === "de"
        ? "• Schäden wachsen an"
        : "• Damage keeps growing";

  const openTitle =
    lang === "pl"
      ? "Wolne państwo (Otwarte)"
      : lang === "de"
        ? "Freie Gesellschaft (Offen)"
        : "Open Society (Free)";
  const o1 =
    lang === "pl"
      ? "• Obywatele zgłaszają błędy"
      : lang === "de"
        ? "• Bürger melden Probleme"
        : "• People report problems";
  const o2 =
    lang === "pl"
      ? "• Wolna prasa wytyka wady"
      : lang === "de"
        ? "• Freie Presse zeigt Fehler"
        : "• Free press flags errors";
  const o3 =
    lang === "pl"
      ? "• Naprawy ruszają szybko"
      : lang === "de"
        ? "• Schnelle Reparaturen"
        : "• Fixes happen quickly";

  const footer =
    lang === "pl"
      ? "Wolność słowa to praktyczne narzędzie naprawiania błędów, nie tylko ideał"
      : lang === "de"
        ? "Meinungsfreiheit ist ein praktisches Werkzeug zur Fehlerkorrektur, nicht nur ein Ideal"
        : "Freedom of speech is a practical error-correction tool, not just an ideal";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(20, 20)">
        <text x="180" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
          {mainTitle}
        </text>
        <g transform="translate(10, 40)">
          <rect x="0" y="0" width="165" height="100" fill="#fee2e2" rx="4" />
          <text x="82" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">
            {closedTitle}
          </text>
          <text x="12" y="50" fontSize="9" fill="#7f1d1d">
            {c1}
          </text>
          <text x="12" y="70" fontSize="9" fill="#7f1d1d">
            {c2}
          </text>
          <text x="12" y="90" fontSize="9" fill="#7f1d1d">
            {c3}
          </text>
        </g>
        <g transform="translate(185, 40)">
          <rect x="0" y="0" width="165" height="100" fill="#f0fdf4" rx="4" />
          <text x="82" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">
            {openTitle}
          </text>
          <text x="12" y="50" fontSize="9" fill="#14532d">
            {o1}
          </text>
          <text x="12" y="70" fontSize="9" fill="#14532d">
            {o2}
          </text>
          <text x="12" y="90" fontSize="9" fill="#14532d">
            {o3}
          </text>
        </g>
      </g>
      {step >= 2 && (
        <text x="200" y="175" textAnchor="middle" fontSize="11" fill="#475569">
          {footer}
        </text>
      )}
    </svg>
  );
}

export function SafeguardsDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Konstytucyjne tarcze przed dyktaturą"
      : lang === "de"
        ? "Verfassungs-Schutz vor Diktatur"
        : "Constitutional Safeguards Against Dictatorship";

  const pressTitle = lang === "pl" ? "Wolna prasa" : lang === "de" ? "Freie Presse" : "Free Press";
  const pressSub =
    lang === "pl" ? "Niezależne media" : lang === "de" ? "Unabhängige Medien" : "Independent news";

  const courtsTitle =
    lang === "pl"
      ? "Niezawisłe sądy"
      : lang === "de"
        ? "Unabhängige Gerichte"
        : "Independent Courts";
  const courtsSub =
    lang === "pl"
      ? "Kontrola władzy"
      : lang === "de"
        ? "Richter prüfen Macht"
        : "Judges check power";

  const electionsTitle =
    lang === "pl" ? "Wolne wybory" : lang === "de" ? "Freie Wahlen" : "Free Elections";
  const electionsSub =
    lang === "pl" ? "Pokojowa zmiana" : lang === "de" ? "Friedlicher Wechsel" : "Peaceful change";

  const footer =
    lang === "pl"
      ? "Prawo musi wiecznie chronić godność człowieka i prawa obywatelskie!"
      : lang === "de"
        ? "Regeln müssen Menschenwürde und Grundrechte für immer schützen!"
        : "Rules must protect human dignity and basic rights forever!";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(30, 30)">
        <text x="170" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
          {title}
        </text>
        <g transform="translate(10, 45)">
          <rect x="0" y="0" width="100" height="70" fill="#e0e7ff" rx="4" />
          <text x="50" y="30" textAnchor="middle" fontSize="10" fontWeight="bold">
            {pressTitle}
          </text>
          <text x="50" y="50" textAnchor="middle" fontSize="8" fill="#3730a3">
            {pressSub}
          </text>
        </g>
        <g transform="translate(120, 45)">
          <rect x="0" y="0" width="100" height="70" fill="#e0e7ff" rx="4" />
          <text x="50" y="30" textAnchor="middle" fontSize="10" fontWeight="bold">
            {courtsTitle}
          </text>
          <text x="50" y="50" textAnchor="middle" fontSize="8" fill="#3730a3">
            {courtsSub}
          </text>
        </g>
        <g transform="translate(230, 45)">
          <rect x="0" y="0" width="100" height="70" fill="#e0e7ff" rx="4" />
          <text x="50" y="30" textAnchor="middle" fontSize="10" fontWeight="bold">
            {electionsTitle}
          </text>
          <text x="50" y="50" textAnchor="middle" fontSize="8" fill="#3730a3">
            {electionsSub}
          </text>
        </g>
      </g>
      {step >= 2 && (
        <text x="200" y="165" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="bold">
          {footer}
        </text>
      )}
    </svg>
  );
}

export function VigilanceDiagram({ lang, step }: DiagramProps) {
  const vigilance =
    lang === "pl"
      ? "Czujność obywatelska"
      : lang === "de"
        ? "Wachsame Bürger"
        : "Citizen Vigilance";
  const freedomTitle =
    lang === "pl"
      ? "Obrona wolności"
      : lang === "de"
        ? "Schutz der Freiheit"
        : "Protecting Freedom";
  const freedomSub =
    lang === "pl"
      ? "Każde pokolenie chroni praw"
      : lang === "de"
        ? "Jede Generation verteidigt Rechte"
        : "Every generation defends rights";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <circle cx="50" cy="50" r="35" fill="#fef08a" />
        <text x="50" y="55" textAnchor="middle" fontSize="24">
          🛡️
        </text>
        <text x="50" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#854d0e">
          {vigilance}
        </text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 40)">
          <rect x="0" y="15" width="150" height="70" fill="#dcfce7" rx="6" />
          <text x="75" y="45" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">
            {freedomTitle}
          </text>
          <text x="75" y="65" textAnchor="middle" fontSize="8" fill="#15803d">
            {freedomSub}
          </text>
        </g>
      )}
    </svg>
  );
}
