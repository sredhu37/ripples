import type { DiagramProps } from "../lesson/types";

export function SaltCrystalDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Bryłka naturalnej soli morskiej"
      : lang === "de"
        ? "Ein natuerlicher Brocken Meersalz"
        : "A Natural Lump of Ocean Salt";

  const sub =
    lang === "pl"
      ? "Darowana przez ocean, lecz obłożona wysokim podatkiem przez władców"
      : lang === "de"
        ? "Vom Meer geschenkt, aber von Herrschern schwer besteuert"
        : "Freely given by the sea, but heavily taxed by rulers";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Natural Sea Salt Crystal">
      <defs>
        <linearGradient id="saltGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>
      {/* Hand holding lump of salt */}
      <circle cx="200" cy="110" r="50" fill="url(#saltGlow)" stroke="#cbd5e1" strokeWidth="3" />
      <path d="M170 95 L200 70 L230 95 L200 120 Z" fill="#f8fafc" stroke="#94a3b8" />
      <path d="M185 115 L200 140 L215 115 Z" fill="#f1f5f9" stroke="#94a3b8" />
      <text x="200" y="180" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
        {title}
      </text>
      {step >= 2 && (
        <text x="200" y="205" textAnchor="middle" fontSize="11" fill="#475569">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function DandiMarchCoastDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Marsz do Dandi na dystansie 240 mil"
      : lang === "de"
        ? "Der 240-Meilen-Marsch nach Dandi"
        : "The 240-Mile March to Dandi";

  const sub =
    lang === "pl"
      ? "Pokojowy marsz w białych szatach przeciw niesprawiedliwemu podatkowi"
      : lang === "de"
        ? "Friedlicher Marsch im weissen Gewand gegen eine ungerechte Steuer"
        : "Walking peacefully in white robes to defy an unjust tax";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="The 240-Mile Dandi March">
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
      {/* Coastline */}
      <path d="M50 170 Q180 120 350 170 L350 210 L50 210 Z" fill="#fde68a" />
      {/* Ocean */}
      <path d="M50 170 Q180 120 350 170 L350 140 Q180 90 50 140 Z" fill="#60a5fa" opacity="0.6" />
      {/* Footsteps */}
      <circle cx="100" cy="165" r="4" fill="#92400e" />
      <circle cx="150" cy="155" r="4" fill="#92400e" />
      <circle cx="200" cy="150" r="4" fill="#92400e" />
      <circle cx="250" cy="155" r="4" fill="#92400e" />
      <circle cx="300" cy="165" r="4" fill="#92400e" />
      {step >= 2 && (
        <text x="200" y="95" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function CharkhaSpinningWheelDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Kołowrotek Charkha: Symbol samowystarczalności"
      : lang === "de"
        ? "Das Charkha: Symbol der Selbstbestimmung"
        : "The Charkha: Symbol of Self-Reliance";

  const sub =
    lang === "pl"
      ? "Przędzenie własnej nici z godnością i cierpliwością"
      : lang === "de"
        ? "Selbstgesponnenes Garn mit Wuerde und Geduld"
        : "Spinning homespun thread with dignity and patience";

  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      aria-label="The Wooden Charkha Spinning Wheel"
    >
      <rect
        x="40"
        y="30"
        width="320"
        height="180"
        rx="12"
        fill="#fffbeb"
        stroke="#fef08a"
        strokeWidth="2"
      />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#854d0e">
        {title}
      </text>
      {/* Large Wheel */}
      <circle cx="140" cy="130" r="40" fill="none" stroke="#78350f" strokeWidth="4" />
      {/* Spokes */}
      <line x1="140" y1="90" x2="140" y2="170" stroke="#b45309" strokeWidth="2" />
      <line x1="100" y1="130" x2="180" y2="130" stroke="#b45309" strokeWidth="2" />
      {/* Spindle */}
      <rect x="230" y="125" width="50" height="10" rx="4" fill="#78350f" />
      {/* Thread connecting */}
      <line
        x1="140"
        y1="90"
        x2="230"
        y2="130"
        stroke="#d97706"
        strokeWidth="2"
        strokeDasharray="3 3"
      />
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#713f12">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function TriColorAshokaDiagram({ lang, step }: DiagramProps) {
  const sub =
    lang === "pl"
      ? "15 sierpnia 1947: Niepodległość i wolność"
      : lang === "de"
        ? "15. August 1947: Unabhaengigkeit und Freiheit"
        : "15 August 1947: Independence and Freedom";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Tricolor and Ashoka Chakra">
      {/* Flag Stripes */}
      <rect x="70" y="50" width="260" height="40" fill="#f97316" rx="2" />
      <rect x="70" y="90" width="260" height="40" fill="#ffffff" stroke="#e2e8f0" />
      <rect x="70" y="130" width="260" height="40" fill="#15803d" rx="2" />
      {/* Border */}
      <rect
        x="70"
        y="50"
        width="260"
        height="120"
        fill="none"
        stroke="#1e293b"
        strokeWidth="2"
        rx="4"
      />
      {/* 24-spoke Chakra */}
      <circle cx="200" cy="110" r="16" fill="none" stroke="#1e3a8a" strokeWidth="2" />
      <circle cx="200" cy="110" r="3" fill="#1e3a8a" />
      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function ConstitutionAssemblyDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Demokratyczna Konstytucja"
      : lang === "de"
        ? "Die demokratische Verfassung"
        : "The Democratic Constitution";

  const weThePeople =
    lang === "pl" ? "MY, NARÓD" : lang === "de" ? "WIR, DAS VOLK" : "WE, THE PEOPLE";

  const values =
    lang === "pl"
      ? "Sprawiedliwość, Wolność, Równość"
      : lang === "de"
        ? "Gerechtigkeit, Freiheit, Gleichheit"
        : "Justice, Liberty, Equality";

  const sub =
    lang === "pl"
      ? "Opracowana pod przewodnictwem dra B. R. Ambedkara w celu zapewnienia równych praw"
      : lang === "de"
        ? "Unter Dr. B. R. Ambedkar fuer gleiche Rechte vor dem Gesetz erarbeitet"
        : "Framed by Dr. B. R. Ambedkar for equal rights under law";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="The Constitutional Assembly">
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
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
        {title}
      </text>
      {/* Constitution Book */}
      <rect
        x="130"
        y="80"
        width="140"
        height="85"
        rx="6"
        fill="#1e3a8a"
        stroke="#0f172a"
        strokeWidth="2"
      />
      <text x="200" y="115" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fde047">
        {weThePeople}
      </text>
      <text x="200" y="135" textAnchor="middle" fontSize="10" fill="#ffffff">
        {values}
      </text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af">
          {sub}
        </text>
      )}
    </svg>
  );
}
