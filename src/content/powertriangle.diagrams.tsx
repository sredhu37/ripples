import type { DiagramProps } from "../lesson/types";

export function TriangleNodesDiagram({ lang, step }: DiagramProps) {
  const govLabel =
    lang === "pl" ? "Państwo" : lang === "de" ? "Regierung" : "Government";
  const citizenLabel =
    lang === "pl" ? "Obywatele" : lang === "de" ? "Bürger" : "Citizens";
  const businessLabel =
    lang === "pl" ? "Biznes" : lang === "de" ? "Unternehmen" : "Businesses";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      {/* Triangle geometry */}
      <polygon points="200,30 80,160 320,160" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4" />

      {/* Top Node: Government */}
      <g transform="translate(200, 30)">
        <circle cx="0" cy="0" r="22" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
        <text x="0" y="5" textAnchor="middle" fontSize="14">🏛️</text>
        <text x="0" y="-28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#3730a3">{govLabel}</text>
      </g>

      {/* Bottom Left: Citizens */}
      {step >= 2 && (
        <g transform="translate(80, 160)">
          <circle cx="0" cy="0" r="22" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fontSize="14">👥</text>
          <text x="0" y="32" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">{citizenLabel}</text>
        </g>
      )}

      {/* Bottom Right: Businesses */}
      {step >= 3 && (
        <g transform="translate(320, 160)">
          <circle cx="0" cy="0" r="22" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fontSize="14">🏪</text>
          <text x="0" y="32" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b45309">{businessLabel}</text>
        </g>
      )}
    </svg>
  );
}

export function FlowArrowsDiagram({ lang, step }: DiagramProps) {
  const cToG =
    lang === "pl" ? "Głosy i podatki →" : lang === "de" ? "Wahl & Steuern →" : "Votes & Taxes →";
  const gToC =
    lang === "pl" ? "← Dobra publiczne" : lang === "de" ? "← Öffentliche Güter" : "← Public Goods";

  const bToG =
    lang === "pl" ? "← Podatki i prawo" : lang === "de" ? "← Steuern & Regeln" : "← Taxes & Compliance";
  const gToB =
    lang === "pl" ? "Infrastruktura i sądy →" : lang === "de" ? "Infrastruktur & Recht →" : "Rules & Infrastructure →";

  const cToB =
    lang === "pl" ? "Praca i zakupy →" : lang === "de" ? "Arbeit & Konsum →" : "Labor & Purchases →";
  const bToC =
    lang === "pl" ? "← Płace i produkty" : lang === "de" ? "← Lohn & Produkte" : "← Wages & Products";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      {/* Triangle base */}
      <polygon points="200,35 80,155 320,155" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />

      {/* Edge 1: Citizens <-> Government */}
      <text x="120" y="85" textAnchor="middle" fontSize="9" fill="#475569" transform="rotate(-45 120 85)">
        {cToG}
      </text>
      <text x="140" y="105" textAnchor="middle" fontSize="9" fill="#15803d" transform="rotate(-45 140 105)">
        {gToC}
      </text>

      {/* Edge 2: Businesses <-> Government */}
      {step >= 2 && (
        <>
          <text x="270" y="90" textAnchor="middle" fontSize="9" fill="#475569" transform="rotate(45 270 90)">
            {bToG}
          </text>
          <text x="250" y="110" textAnchor="middle" fontSize="9" fill="#0369a1" transform="rotate(45 250 110)">
            {gToB}
          </text>
        </>
      )}

      {/* Edge 3: Citizens <-> Businesses */}
      {step >= 3 && (
        <>
          <text x="200" y="145" textAnchor="middle" fontSize="9" fill="#b45309">
            {cToB}
          </text>
          <text x="200" y="172" textAnchor="middle" fontSize="9" fill="#166534">
            {bToC}
          </text>
        </>
      )}
    </svg>
  );
}

export function ImbalanceFailureDiagram({ lang, step }: DiagramProps) {
  const mainTitle =
    lang === "pl"
      ? "Co się dzieje, gdy jeden róg dominuje?"
      : lang === "de"
      ? "Was passiert bei Vorherrschaft einer Ecke?"
      : "What Happens When One Corner Dominates?";

  const gTitle =
    lang === "pl" ? "Państwo 100%" : lang === "de" ? "Staat 100%" : "Gov 100%";
  const g1 =
    lang === "pl" ? "Autorytaryzm:" : lang === "de" ? "Autoritär:" : "Authoritarian:";
  const g2 =
    lang === "pl" ? "Utrata wolności" : lang === "de" ? "Freiheiten weg" : "Liberties crushed";
  const g3 =
    lang === "pl" ? "Zanik inicjatywy" : lang === "de" ? "Keine Initiative" : "Initative lost";

  const bTitle =
    lang === "pl" ? "Biznes 100%" : lang === "de" ? "Wirtschaft 100%" : "Business 100%";
  const b1 =
    lang === "pl" ? "Dyktat monopoli:" : lang === "de" ? "Monopolherrschaft:" : "Monopoly rule:";
  const b2 =
    lang === "pl" ? "Zatrucie rzeki" : lang === "de" ? "Umweltschäden" : "Pollution unchecked";
  const b3 =
    lang === "pl" ? "Wyzysk ludzi" : lang === "de" ? "Ausbeutung" : "Workers harmed";

  const cTitle =
    lang === "pl" ? "Roszczenia 100%" : lang === "de" ? "Forderungen 100%" : "Citizen Demands";
  const c1 =
    lang === "pl" ? "Brak podatków:" : lang === "de" ? "Keine Steuern/Regeln:" : "Zero taxes/rules:";
  const c2 =
    lang === "pl" ? "Zapaść dróg" : lang === "de" ? "Straßen zerfallen" : "Roads crumble";
  const c3 =
    lang === "pl" ? "Upadek usług" : lang === "de" ? "Güter versagen" : "Public goods fail";

  const footer =
    lang === "pl"
      ? "Całkowita dominacja jednego bieguna prowadzi do kryzysu całego społeczeństwa!"
      : lang === "de"
      ? "Totale Vorherrschaft einer einzelnen Ecke zerstört das Gleichgewicht!"
      : "Total domination by any single corner causes structural breakdown!";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(25, 20)">
        <text x="175" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
          {mainTitle}
        </text>
        <g transform="translate(10, 40)">
          <rect x="0" y="0" width="105" height="85" fill="#fee2e2" rx="4" />
          <text x="52" y="25" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#991b1b">{gTitle}</text>
          <text x="52" y="45" textAnchor="middle" fontSize="8" fill="#7f1d1d">{g1}</text>
          <text x="52" y="60" textAnchor="middle" fontSize="8" fill="#7f1d1d">{g2}</text>
          <text x="52" y="75" textAnchor="middle" fontSize="8" fill="#7f1d1d">{g3}</text>
        </g>
        <g transform="translate(125, 40)">
          <rect x="0" y="0" width="105" height="85" fill="#fef3c7" rx="4" />
          <text x="52" y="25" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#b45309">{bTitle}</text>
          <text x="52" y="45" textAnchor="middle" fontSize="8" fill="#92400e">{b1}</text>
          <text x="52" y="60" textAnchor="middle" fontSize="8" fill="#92400e">{b2}</text>
          <text x="52" y="75" textAnchor="middle" fontSize="8" fill="#92400e">{b3}</text>
        </g>
        <g transform="translate(240, 40)">
          <rect x="0" y="0" width="105" height="85" fill="#e0f2fe" rx="4" />
          <text x="52" y="25" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369a1">{cTitle}</text>
          <text x="52" y="45" textAnchor="middle" fontSize="8" fill="#075985">{c1}</text>
          <text x="52" y="60" textAnchor="middle" fontSize="8" fill="#075985">{c2}</text>
          <text x="52" y="75" textAnchor="middle" fontSize="8" fill="#075985">{c3}</text>
        </g>
      </g>
      {step >= 2 && (
        <text x="200" y="165" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">
          {footer}
        </text>
      )}
    </svg>
  );
}

export function EquilibriumDiagram({ lang, step }: DiagramProps) {
  const eqTitle =
    lang === "pl" ? "Równowaga" : lang === "de" ? "Gleichgewicht" : "Equilibrium";

  const footer =
    lang === "pl"
      ? "Dynamiczna równowaga daje wolność, dobrobyt i stabilne usługi publiczne"
      : lang === "de"
      ? "Dynamische Balance schafft Freiheit, Wohlstand und verlässliche Dienste"
      : "Dynamic balance creates freedom, prosperity, and reliable public services";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <polygon points="200,40 100,150 300,150" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
      
      <circle cx="200" cy="40" r="16" fill="#4f46e5" />
      <text x="200" y="45" textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="bold">
        {lang === "pl" ? "P" : "G"}
      </text>

      <circle cx="100" cy="150" r="16" fill="#16a34a" />
      <text x="100" y="155" textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="bold">
        {lang === "pl" ? "O" : "C"}
      </text>

      <circle cx="300" cy="150" r="16" fill="#d97706" />
      <text x="300" y="155" textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="bold">
        {lang === "pl" ? "B" : "B"}
      </text>

      <text x="200" y="115" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
        {eqTitle}
      </text>

      {step >= 2 && (
        <text x="200" y="180" textAnchor="middle" fontSize="10" fill="#334155">
          {footer}
        </text>
      )}
    </svg>
  );
}

export function HarmonyDiagram({ lang, step }: DiagramProps) {
  const cTitle =
    lang === "pl" ? "Obywatele" : lang === "de" ? "Bürger" : "Citizens";
  const cSub =
    lang === "pl" ? "Wybory i praca" : lang === "de" ? "Wahl & Arbeit" : "Vote & Work";

  const bTitle =
    lang === "pl" ? "Biznes" : lang === "de" ? "Wirtschaft" : "Business";
  const bSub =
    lang === "pl" ? "Płace i towary" : lang === "de" ? "Lohn & Güter" : "Wages & Goods";

  const gTitle =
    lang === "pl" ? "Państwo" : lang === "de" ? "Staat" : "Government";
  const gSub =
    lang === "pl" ? "Prawo i sądy" : lang === "de" ? "Recht & Gerichte" : "Rules & Courts";

  const footer =
    lang === "pl"
      ? "Każdy biegun pilnuje pozostałych, by nikt nie sprawował władzy absolutnej"
      : lang === "de"
      ? "Jede Seite kontrolliert die anderen, damit niemand absolute Macht anhäuft"
      : "Each checks the others so no single corner holds unchecked power";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(45, 40)">
        <rect x="0" y="0" width="95" height="80" fill="#ede9fe" stroke="#6366f1" rx="6" />
        <text x="47" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4338ca">{cTitle}</text>
        <text x="47" y="48" textAnchor="middle" fontSize="18">🗳️</text>
        <text x="47" y="68" textAnchor="middle" fontSize="8" fill="#4338ca">{cSub}</text>

        <rect x="110" y="0" width="95" height="80" fill="#fef3c7" stroke="#f59e0b" rx="6" />
        <text x="47" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b45309">{bTitle}</text>
        <text x="47" y="48" textAnchor="middle" fontSize="18">🍞</text>
        <text x="47" y="68" textAnchor="middle" fontSize="8" fill="#b45309">{bSub}</text>

        <rect x="220" y="0" width="95" height="80" fill="#dcfce7" stroke="#16a34a" rx="6" />
        <text x="47" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#15803d">{gTitle}</text>
        <text x="47" y="48" textAnchor="middle" fontSize="18">⚖️</text>
        <text x="47" y="68" textAnchor="middle" fontSize="8" fill="#15803d">{gSub}</text>
      </g>
      {step >= 2 && (
        <text x="200" y="160" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="bold">
          {footer}
        </text>
      )}
    </svg>
  );
}
