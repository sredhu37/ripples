import type { DiagramProps } from "../lesson/types";

export function CompetingFleetsDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Europa w 1914 roku: Wyścig zbrojeń"
      : lang === "de"
      ? "Europa im Jahr 1914: Das Wettruezten"
      : "Europe in 1914: The Arms Race";

  const ships = lang === "pl" ? "Pancerniki" : lang === "de" ? "Schlachtschiffe" : "Battleships";
  const artillery = lang === "pl" ? "Artyleria" : lang === "de" ? "Artillerie" : "Artillery";

  const sub =
    lang === "pl"
      ? "Państwa budowały potężną broń, wierząc, że siła zapewnia bezpieczeństwo"
      : lang === "de"
      ? "Staaten bauten riesige Waffen im Glauben, Staerke bedeute Sicherheit"
      : "Nations built massive weapons, believing strength meant safety";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Competing Fleets and Armies">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        {title}
      </text>
      {/* Ships */}
      <rect x="70" y="90" width="100" height="40" rx="4" fill="#64748b" />
      <line x1="120" y1="65" x2="120" y2="90" stroke="#334155" strokeWidth="3" />
      <text x="120" y="150" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">{ships}</text>

      <rect x="230" y="90" width="100" height="40" rx="4" fill="#64748b" />
      <line x1="280" y1="65" x2="280" y2="90" stroke="#334155" strokeWidth="3" />
      <text x="280" y="150" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">{artillery}</text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function AllianceBlocksDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Dwa wrogie bloki sojusznicze"
      : lang === "de"
      ? "Die zwei Buendnisbloecke"
      : "The Two Alliance Blocs";

  const centralTitle =
    lang === "pl" ? "Państwa Centralne" : lang === "de" ? "Mittelmaechte" : "Central Powers";
  const centralSub =
    lang === "pl" ? "Niemcy i Austro-Węgry" : lang === "de" ? "Deutschland & Oesterreich" : "Germany & Austria";

  const alliedTitle =
    lang === "pl" ? "Ententa (Sojusznicy)" : lang === "de" ? "Alliierte Maechte" : "Allied Powers";
  const alliedSub =
    lang === "pl" ? "Francja, UK, Rosja" : lang === "de" ? "Frankreich, GB, Russland" : "France, UK, Russia";

  const sub =
    lang === "pl"
      ? "Tajne pakty o wzajemnej obronie stworzyły pułapkę wzajemnych powiązań"
      : lang === "de"
      ? "Geheime Vertraege bildeten ein Netz gegenseitiger Abhaengigkeiten"
      : "Secret mutual defense treaties formed an interconnected trap";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Two Rigid Alliance Blocs">
      <rect x="40" y="30" width="320" height="180" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e3a8a">
        {title}
      </text>
      {/* Central Powers */}
      <rect x="60" y="80" width="115" height="70" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="117" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c">{centralTitle}</text>
      <text x="117" y="125" textAnchor="middle" fontSize="10" fill="#7f1d1d">{centralSub}</text>
      {/* Allied Powers */}
      <rect x="225" y="80" width="115" height="70" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="282" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">{alliedTitle}</text>
      <text x="282" y="125" textAnchor="middle" fontSize="10" fill="#1e3a8a">{alliedSub}</text>
      {/* Tripwire */}
      <line x1="175" y1="115" x2="225" y2="115" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 4" />
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fill="#475569">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function DominoTumbleDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Kaskada domina (sierpień 1914)"
      : lang === "de"
      ? "Die Domino-Kettenreaktion (August 1914)"
      : "The Domino Cascade (August 1914)";

  const sub =
    lang === "pl"
      ? "Jedna iskra uruchomiła kolejowe plany mobilizacyjne w całej Europie"
      : lang === "de"
      ? "Ein Funke loeste Eisenbahn-Mobilmachungen in ganz Europa aus"
      : "One spark caused railway mobilization orders across Europe";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Domino Chain Reaction">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#fff7ed" stroke="#fed7aa" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#c2410c">
        {title}
      </text>
      {/* Tilted dominoes */}
      <rect x="60" y="90" width="18" height="65" rx="3" fill="#ea580c" transform="rotate(20 60 90)" />
      <rect x="110" y="95" width="18" height="65" rx="3" fill="#ea580c" transform="rotate(25 110 95)" />
      <rect x="160" y="100" width="18" height="65" rx="3" fill="#ea580c" transform="rotate(30 160 100)" />
      <rect x="210" y="105" width="18" height="65" rx="3" fill="#ea580c" transform="rotate(35 210 105)" />
      <rect x="260" y="110" width="18" height="65" rx="3" fill="#ea580c" transform="rotate(40 260 110)" />
      <rect x="310" y="115" width="18" height="65" rx="3" fill="#ea580c" transform="rotate(45 310 115)" />
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9a3412">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function RuinedBridgeArmisticeDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Zawieszenie broni: Listopad 1918"
      : lang === "de"
      ? "Der Waffenstillstand: November 1918"
      : "The Armistice: November 1918";

  const sub =
    lang === "pl"
      ? "Działa umilkły, pozostawiając zrujnowane pola i tęsknotę za trwałym pokojem"
      : lang === "de"
      ? "Die Waffen schwiegen, zurueck blieben zerstoerte Felder und Sehnsucht nach Frieden"
      : "The guns fell silent, leaving empty fields and a yearning for peace";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="11 November 1918 Armistice">
      <rect x="40" y="30" width="320" height="180" rx="12" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
        {title}
      </text>
      {/* Broken bridge */}
      <rect x="70" y="120" width="90" height="20" rx="4" fill="#64748b" />
      <rect x="240" y="120" width="90" height="20" rx="4" fill="#64748b" />
      {/* River below */}
      <rect x="50" y="150" width="300" height="30" fill="#38bdf8" opacity="0.4" />
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function LeagueOfNationsGenevaDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Liga Narodów w Genewie"
      : lang === "de"
      ? "Der Voelkerbund in Genf"
      : "The League of Nations (Voelkerbund)";

  const tableLabel =
    lang === "pl" ? "Genewa" : lang === "de" ? "Genf" : "Geneva";

  const sub =
    lang === "pl"
      ? "Zastąpienie tajnych pułapek wojskowych otwartym dialogiem dyplomatycznym"
      : lang === "de"
      ? "Gespraeche am Verhandlungstisch statt geheimer Abhaengigkeiten"
      : "Replacing secret military traps with open dialogue";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="League of Nations in Geneva">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        {title}
      </text>
      {/* Round council table */}
      <circle cx="200" cy="120" r="45" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
      <text x="200" y="125" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">{tableLabel}</text>
      {/* Diplomat chairs */}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 200 + 60 * Math.cos(rad);
        const cy = 120 + 60 * Math.sin(rad);
        return <circle key={deg} cx={cx} cy={cy} r="10" fill="#3b82f6" />;
      })}
      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">
          {sub}
        </text>
      )}
    </svg>
  );
}
