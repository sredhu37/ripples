import type { DiagramProps } from "../lesson/types";

export function RadioPropagandaDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Narodziny dyktatury autorytarnej"
      : lang === "de"
        ? "Der Aufstieg der Diktatur"
        : "The Rise of Dictatorship";

  const sub =
    lang === "pl"
      ? "Cenzura i sama propaganda"
      : lang === "de"
        ? "Zensur und nur Propaganda"
        : "Censored news, only propaganda";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Loudspeaker and Propaganda">
      <rect
        x="30"
        y="30"
        width="340"
        height="180"
        rx="12"
        fill="#fff7ed"
        stroke="#fed7aa"
        strokeWidth="2"
      />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9a3412">
        {title}
      </text>
      {/* Loudspeaker */}
      <polygon points="120,110 180,80 180,140" fill="#475569" />
      <rect x="180" y="100" width="40" height="20" fill="#334155" />
      {/* Sound waves */}
      <path d="M100 90 Q70 110 100 130" stroke="#ea580c" strokeWidth="3" fill="none" />
      <path d="M85 75 Q45 110 85 145" stroke="#ea580c" strokeWidth="3" fill="none" />
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c2d12">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function TotalDevastationRubbleDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Zniszczenie: 1939 do 1945"
      : lang === "de"
        ? "Zerstoerung: 1939 bis 1945"
        : "Devastation: 1939 to 1945";

  const sub =
    lang === "pl"
      ? "Miasta w gruzach"
      : lang === "de"
        ? "Staedte in Truemmern"
        : "Cities and lives shattered";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Devastation of World War 2">
      <rect
        x="40"
        y="30"
        width="320"
        height="180"
        rx="12"
        fill="#f1f5f9"
        stroke="#cbd5e1"
        strokeWidth="2"
      />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e293b">
        {title}
      </text>
      {/* Broken brick silhouette */}
      <polygon points="80,160 110,110 130,130 150,90 180,160" fill="#64748b" />
      <polygon points="220,160 250,100 280,140 310,160" fill="#64748b" />
      <rect x="50" y="160" width="300" height="20" fill="#475569" />
      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function WhiteRoseLeafletDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Odwaga cywilna: Biała Róża"
      : lang === "de"
        ? "Zivilcourage: Die Weisse Rose"
        : "Civil Courage: White Rose";

  const sub =
    lang === "pl"
      ? "Hans i Sophie Scholl"
      : lang === "de"
        ? "Hans und Sophie Scholl"
        : "Hans and Sophie Scholl";

  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      aria-label="The White Rose and Civil Courage"
    >
      <rect
        x="40"
        y="30"
        width="320"
        height="180"
        rx="12"
        fill="#fafaf9"
        stroke="#e7e5e4"
        strokeWidth="2"
      />
      <text x="200" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1c1917">
        {title}
      </text>
      {/* Paper leaflet */}
      <rect
        x="140"
        y="75"
        width="120"
        height="80"
        rx="4"
        fill="#ffffff"
        stroke="#a8a29e"
        strokeWidth="2"
      />
      <line x1="155" y1="95" x2="245" y2="95" stroke="#78716c" strokeWidth="2" />
      <line x1="155" y1="110" x2="245" y2="110" stroke="#78716c" strokeWidth="2" />
      <line x1="155" y1="125" x2="220" y2="125" stroke="#78716c" strokeWidth="2" />
      {/* White rose icon */}
      <circle cx="120" cy="115" r="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
      <text x="120" y="121" textAnchor="middle" fontSize="16">
        🌹
      </text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#44403c">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function UnitedNationsGlobeDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "1945: Narody Zjednoczone"
      : lang === "de"
        ? "1945: Vereinte Nationen"
        : "1945: The United Nations";

  const sub =
    lang === "pl"
      ? "„Nigdy więcej” dla świata"
      : lang === "de"
        ? '"Nie wieder" weltweit'
        : '"Never again" worldwide';

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="The United Nations Founding">
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
      {/* Globe */}
      <circle cx="200" cy="120" r="40" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
      <ellipse cx="200" cy="120" rx="40" ry="16" fill="none" stroke="#f0f9ff" strokeWidth="2" />
      <line x1="200" y1="80" x2="200" y2="160" stroke="#f0f9ff" strokeWidth="2" />
      {/* Olive branch wreath */}
      <path
        d="M140 120 Q160 165 200 165 Q240 165 260 120"
        stroke="#16a34a"
        strokeWidth="4"
        fill="none"
      />
      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function GrundgesetzArticle1Diagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Konstytucja: godność to fundament"
      : lang === "de"
        ? "Deutsches Grundgesetz: Artikel 1"
        : "Basic Law: Article 1";

  const quote =
    lang === "pl"
      ? "„Godność człowieka jest nienaruszalna”"
      : lang === "de"
        ? '"Die Wuerde ist unantastbar"'
        : '"Human dignity is inviolable"';

  const sub =
    lang === "pl"
      ? "Z niej wynikają prawa"
      : lang === "de"
        ? "Menschenwuerde kommt zuerst"
        : "Rights start with dignity";

  return (
    <svg
      viewBox="0 0 400 240"
      className="diagram-svg"
      aria-label="Grundgesetz Article 1: Human Dignity"
    >
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
      <text x="200" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
        {title}
      </text>
      {/* Gold shield */}
      <path
        d="M160 80 L240 80 L240 130 Q200 160 160 130 Z"
        fill="#fef08a"
        stroke="#ca8a04"
        strokeWidth="2"
      />
      <text x="200" y="115" textAnchor="middle" fontSize="18">
        ⚖️
      </text>
      <text x="200" y="180" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">
        {quote}
      </text>
      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="11" fill="#475569">
          {sub}
        </text>
      )}
    </svg>
  );
}
