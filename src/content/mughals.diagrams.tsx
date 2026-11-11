import type { DiagramProps } from "../lesson/types";

export function MughalPavilionDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Pawilon z czerwonego piaskowca i ogrody"
      : lang === "de"
        ? "Roter Sandstein-Pavillon und Gärten"
        : "Red Sandstone Pavilion and Gardens";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Mughal Pavilion Architecture">
      <defs>
        <linearGradient id="sandstone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
      </defs>
      {/* Arch Pavilion */}
      <rect
        x="70"
        y="70"
        width="260"
        height="130"
        rx="8"
        fill="url(#sandstone)"
        stroke="#1e293b"
        strokeWidth="2"
      />
      {/* Arches */}
      <path d="M100 200 C100 130 160 130 160 200 Z" fill="#fef2f2" />
      <path d="M170 200 C170 120 230 120 230 200 Z" fill="#fef2f2" />
      <path d="M240 200 C240 130 300 130 300 200 Z" fill="#fef2f2" />
      {/* Central Dome */}
      <path d="M160 70 Q200 25 240 70 Z" fill="#fecdd3" stroke="#b91c1c" strokeWidth="2" />
      <circle cx="200" cy="22" r="5" fill="#facc15" />
      {step >= 2 && (
        <text x="200" y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
          {label}
        </text>
      )}
    </svg>
  );
}

export function AkbarThroneDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Cesarz Akbar w Fatehpur Sikri"
      : lang === "de"
        ? "Kaiser Akbar in Fatehpur Sikri"
        : "Emperor Akbar at Fatehpur Sikri";

  const sub =
    lang === "pl"
      ? "Mądrość i uważne słuchanie prowadzą sprawiedliwego władcę"
      : lang === "de"
        ? "Weisheit und Zuhören leiten einen gerechten Herrscher"
        : "Wisdom and listening guide a fair ruler";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Emperor Akbar Seeking Wisdom">
      <rect
        x="50"
        y="30"
        width="300"
        height="180"
        rx="12"
        fill="#fffbeb"
        stroke="#fde68a"
        strokeWidth="2"
      />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">
        {title}
      </text>
      <circle cx="200" cy="115" r="32" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
      <path
        d="M188 124 L188 112 L194 118 L200 106 L206 118 L212 112 L212 124 Z"
        fill="#ffffff"
        stroke="#b45309"
        strokeWidth="1.5"
      />
      {step >= 2 && (
        <text x="200" y="175" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#78350f">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function IbadatKhanaDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Ibadat Chana: Dom Mądrości"
      : lang === "de"
        ? "Ibadat Khana: Das Haus der Weisheit"
        : "Ibadat Khana: The House of Wisdom";

  const tableLabel =
    lang === "pl" ? "Wspólny dialog" : lang === "de" ? "Gemeinsamer Dialog" : "Shared Dialogue";

  const e = lang === "pl" ? "Wschód" : lang === "de" ? "Ost" : "East";
  const w = lang === "pl" ? "Zachód" : lang === "de" ? "West" : "West";
  const n = lang === "pl" ? "Północ" : lang === "de" ? "Nord" : "North";
  const s = lang === "pl" ? "Południe" : lang === "de" ? "Süd" : "South";

  const sub =
    lang === "pl"
      ? "Uczeni wszystkich wyznań dyskutują o etyce i sprawiedliwości"
      : lang === "de"
        ? "Gelehrte aller Glaubensrichtungen im Ethik-Dialog"
        : "Scholars of all faiths discussing ethics";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Ibadat Khana Dialogue Table">
      <rect
        x="40"
        y="30"
        width="320"
        height="180"
        rx="12"
        fill="#f0fdf4"
        stroke="#bbf7d0"
        strokeWidth="2"
      />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        {title}
      </text>
      {/* Central Table */}
      <circle cx="200" cy="125" r="45" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
      <text x="200" y="130" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#854d0e">
        {tableLabel}
      </text>
      {/* 4 Scholars */}
      <circle cx="125" cy="125" r="18" fill="#bae6fd" stroke="#0284c7" />
      <text x="125" y="130" textAnchor="middle" fontSize="9" fontWeight="bold">
        {e}
      </text>
      <circle cx="275" cy="125" r="18" fill="#bae6fd" stroke="#0284c7" />
      <text x="275" y="130" textAnchor="middle" fontSize="9" fontWeight="bold">
        {w}
      </text>
      <circle cx="200" cy="65" r="18" fill="#bae6fd" stroke="#0284c7" />
      <text x="200" y="70" textAnchor="middle" fontSize="9" fontWeight="bold">
        {n}
      </text>
      <circle cx="200" cy="185" r="18" fill="#bae6fd" stroke="#0284c7" />
      <text x="200" y="190" textAnchor="middle" fontSize="9" fontWeight="bold">
        {s}
      </text>
      {step >= 2 && (
        <text x="200" y="222" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function GrandTrunkRoadDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Wielki trakt handlowy"
      : lang === "de"
        ? "Die große Handelsstraße"
        : "The Grand Trade Highway";
  const start = lang === "pl" ? "Delta Bengalu" : lang === "de" ? "Bengal-Delta" : "Bengal Delta";
  const end =
    lang === "pl" ? "Przełęcz Peszawaru" : lang === "de" ? "Peshawar-Pass" : "Peshawar Pass";
  const sub =
    lang === "pl"
      ? "Karawany, karawanseraje, studnie i bezpieczny szlak handlowy"
      : lang === "de"
        ? "Karawanen, Rasthäuser, Brunnen und sichere Wege"
        : "Caravans, rest stops, wells, and secure travel";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="The Grand Trunk Road">
      {/* Landscape */}
      <rect
        x="30"
        y="40"
        width="340"
        height="160"
        rx="10"
        fill="#fdf4ff"
        stroke="#f0abfc"
        strokeWidth="2"
      />
      <path d="M40 160 Q200 90 360 120" stroke="#a855f7" strokeWidth="8" fill="none" />
      <text x="200" y="70" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7e22ce">
        {title}
      </text>
      <text x="80" y="180" textAnchor="middle" fontSize="10" fill="#6b21a8">
        {start}
      </text>
      <text x="320" y="140" textAnchor="middle" fontSize="10" fill="#6b21a8">
        {end}
      </text>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#581c87">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function CulturalSynthesisDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Synteza: Różnorodne tradycje łączą się"
      : lang === "de"
        ? "Verschmelzung: Traditionen vereinen sich"
        : "Synthesis: Diverse Traditions Unite";

  const archTitle = lang === "pl" ? "Architektura" : lang === "de" ? "Architektur" : "Architecture";
  const archDesc =
    lang === "pl" ? "Marmur i kopuły" : lang === "de" ? "Marmor & Kuppeln" : "Stone and Domes";

  const astroTitle = lang === "pl" ? "Astronomia" : lang === "de" ? "Astronomie" : "Astronomy";
  const astroDesc = lang === "pl" ? "Mapy gwiazd" : lang === "de" ? "Sternentafeln" : "Star Tables";

  const textTitle = lang === "pl" ? "Tkactwo" : lang === "de" ? "Textilien" : "Textiles";
  const textDesc =
    lang === "pl" ? "Cienki muślin" : lang === "de" ? "Feiner Musselin" : "Fine Muslin";

  const sub =
    lang === "pl"
      ? "Tolerancja i otwartość przyniosły trwały dobrobyt milionom ludzi"
      : lang === "de"
        ? "Toleranz brachte Millionen Menschen Wohlstand"
        : "Tolerance built lasting prosperity for millions";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Cultural Synthesis">
      <rect
        x="40"
        y="30"
        width="320"
        height="180"
        rx="12"
        fill="#eff6ff"
        stroke="#93c5fd"
        strokeWidth="2"
      />
      <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">
        {title}
      </text>
      <g transform="translate(45, 95)">
        <rect x="0" y="0" width="95" height="50" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="47" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">
          {archTitle}
        </text>
        <text x="47" y="38" textAnchor="middle" fontSize="9" fill="#64748b">
          {archDesc}
        </text>

        <rect x="105" y="0" width="95" height="50" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="152" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">
          {astroTitle}
        </text>
        <text x="152" y="38" textAnchor="middle" fontSize="9" fill="#64748b">
          {astroDesc}
        </text>

        <rect x="210" y="0" width="95" height="50" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="257" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">
          {textTitle}
        </text>
        <text x="257" y="38" textAnchor="middle" fontSize="9" fill="#64748b">
          {textDesc}
        </text>
      </g>
      {step >= 2 && (
        <text x="200" y="185" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8">
          {sub}
        </text>
      )}
    </svg>
  );
}
