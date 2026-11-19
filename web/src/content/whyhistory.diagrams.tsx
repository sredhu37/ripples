import type { DiagramProps } from "../lesson/types";

export function MagnifyingGlassArchiveDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Archiwum historyka"
      : lang === "de"
        ? "Das Archiv des Historikers"
        : "The Historian's Archive";

  const sub =
    lang === "pl"
      ? "Badanie autentycznych listów, traktatów i pamiętników z przeszłości"
      : lang === "de"
        ? "Erforschung echter Briefe, Urkunden und Tagebuecher aus der Vergangenheit"
        : "Examining genuine letters, treaties, and diaries from the past";

  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      aria-label="Magnifying Glass and Ancient Archive"
    >
      <defs>
        <radialGradient id="lensGlass" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </radialGradient>
      </defs>
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#fffbeb"
        stroke="#fde68a"
        strokeWidth="2"
      />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">
        {title}
      </text>
      {/* Ancient Book */}
      <rect
        x="90"
        y="85"
        width="130"
        height="85"
        rx="6"
        fill="#78350f"
        stroke="#451a03"
        strokeWidth="2"
      />
      <rect x="100" y="95" width="110" height="65" fill="#fef3c7" />
      <line x1="110" y1="110" x2="195" y2="110" stroke="#b45309" strokeWidth="2" />
      <line x1="110" y1="125" x2="195" y2="125" stroke="#b45309" strokeWidth="2" />
      <line x1="110" y1="140" x2="175" y2="140" stroke="#b45309" strokeWidth="2" />
      {/* Magnifying Glass */}
      <circle cx="250" cy="120" r="32" fill="url(#lensGlass)" stroke="#0284c7" strokeWidth="4" />
      <line
        x1="275"
        y1="145"
        x2="310"
        y2="180"
        stroke="#0369a1"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350f">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function PrimarySourcesTapestryDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Źródła pierwotne: Głosy z przeszłości"
      : lang === "de"
        ? "Primaerquellen: Stimmen der Geschichte"
        : "Primary Evidence: Voices from History";

  const lettersLabel = lang === "pl" ? "Listy" : lang === "de" ? "Briefe" : "Letters";
  const lettersSub = lang === "pl" ? "Odręczne" : lang === "de" ? "Handschriftlich" : "Handwritten";

  const treatiesLabel = lang === "pl" ? "Traktaty" : lang === "de" ? "Urkunden" : "Treaties";
  const treatiesSub = lang === "pl" ? "Pieczęcie" : lang === "de" ? "Mit Siegel" : "Signed Seals";

  const toolsLabel = lang === "pl" ? "Narzędzia" : lang === "de" ? "Werkzeuge" : "Tools";
  const toolsSub = lang === "pl" ? "Przedmioty" : lang === "de" ? "Gegenstaende" : "Real Objects";

  const sub =
    lang === "pl"
      ? "Historia opiera się na weryfikowalnych dowodach, a nie na pogłoskach"
      : lang === "de"
        ? "Geschichte stuetzt sich auf pruefbare Belege statt auf Geruechte"
        : "History relies on verifiable evidence rather than hearsay";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Primary Evidence Clues">
      <rect
        x="40"
        y="30"
        width="320"
        height="180"
        rx="12"
        fill="#f8fafc"
        stroke="#cbd5e1"
        strokeWidth="2"
      />
      <text x="200" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
        {title}
      </text>
      <g transform="translate(60, 75)">
        <rect x="0" y="0" width="85" height="50" rx="6" fill="#ffffff" stroke="#94a3b8" />
        <text x="42" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">
          {lettersLabel}
        </text>
        <text x="42" y="40" textAnchor="middle" fontSize="10" fill="#64748b">
          {lettersSub}
        </text>

        <rect x="100" y="0" width="85" height="50" rx="6" fill="#ffffff" stroke="#94a3b8" />
        <text x="142" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">
          {treatiesLabel}
        </text>
        <text x="142" y="40" textAnchor="middle" fontSize="10" fill="#64748b">
          {treatiesSub}
        </text>

        <rect x="200" y="0" width="85" height="50" rx="6" fill="#ffffff" stroke="#94a3b8" />
        <text x="242" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">
          {toolsLabel}
        </text>
        <text x="242" y="40" textAnchor="middle" fontSize="10" fill="#64748b">
          {toolsSub}
        </text>
      </g>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#334155">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function MemorialStolpersteineDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Kultura pamięci (Erinnerungskultur)"
      : lang === "de"
        ? "Erinnerungskultur"
        : "Memorial Culture (Erinnerungskultur)";

  const line1 = lang === "pl" ? "TU MIESZKAŁ" : "HIER WOHNTE";
  const line2 = lang === "pl" ? "NAZWISKO I DATA" : "NAME & DATUM";
  const line3 = lang === "pl" ? "NIGDY WIĘCEJ" : "NIE WIEDER";

  const sub =
    lang === "pl"
      ? "Uczciwe spojrzenie w przeszłość wzmacnia wartości demokratyczne"
      : lang === "de"
        ? "Ehrliche Erinnerung staerkt unsere demokratischen Werte"
        : "Facing the past honestly makes democratic values resilient";

  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      aria-label="Memorial Culture and Commemoration"
    >
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#f1f5f9"
        stroke="#cbd5e1"
        strokeWidth="2"
      />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e293b">
        {title}
      </text>
      {/* Brass Commemorative Plate */}
      <rect
        x="140"
        y="80"
        width="120"
        height="75"
        rx="6"
        fill="#fef08a"
        stroke="#ca8a04"
        strokeWidth="2"
      />
      <text x="200" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#713f12">
        {line1}
      </text>
      <text x="200" y="125" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#854d0e">
        {line2}
      </text>
      <text x="200" y="142" textAnchor="middle" fontSize="10" fill="#a16207">
        {line3}
      </text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function CompassFutureCompassDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Historia to kompas na przyszłość"
      : lang === "de"
        ? "Geschichte als Kompass fuer die Zukunft"
        : "History is a Compass for the Future";

  const sub =
    lang === "pl"
      ? "Wiedza o tym, skąd przychodzimy, pomaga nam mądrze wybierać dalszą drogę"
      : lang === "de"
        ? "Zu wissen, woher wir kommen, hilft uns, kluge Entscheidungen zu treffen"
        : "Knowing where we came from helps us choose wise paths forward";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="The Compass for the Future">
      <rect
        x="40"
        y="30"
        width="320"
        height="180"
        rx="12"
        fill="#ecfdf5"
        stroke="#a7f3d0"
        strokeWidth="2"
      />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#065f46">
        {title}
      </text>
      {/* Compass Dial */}
      <circle cx="200" cy="120" r="40" fill="#ffffff" stroke="#059669" strokeWidth="3" />
      <polygon points="200,90 207,120 193,120" fill="#ef4444" />
      <polygon points="200,150 207,120 193,120" fill="#64748b" />
      <circle cx="200" cy="120" r="4" fill="#0f172a" />
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#047857">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function InterlockingGenerationsDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Pokolenia budujące wspólne jutro"
      : lang === "de"
        ? "Generationen bauen ein gemeinsames Morgen"
        : "Generations Building a Shared Tomorrow";

  const sub =
    lang === "pl"
      ? "Przyszłość należy do ciekawych świata, pełnych empatii umysłów!"
      : lang === "de"
        ? "Die Zukunft gehoert neugierigen, mitfuehlenden Koepfen!"
        : "The future belongs to curious, compassionate minds!";

  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      aria-label="Interlocking Generations in Harmony"
    >
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#eff6ff"
        stroke="#bfdbfe"
        strokeWidth="2"
      />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e40af">
        {title}
      </text>
      {/* Handshake of generations */}
      <circle cx="150" cy="115" r="26" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="150" y="122" textAnchor="middle" fontSize="16">
        👴
      </text>
      <circle cx="250" cy="115" r="26" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="250" y="122" textAnchor="middle" fontSize="16">
        👧
      </text>
      <path d="M176 115 L224 115" stroke="#2563eb" strokeWidth="4" />
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">
          {sub}
        </text>
      )}
    </svg>
  );
}
