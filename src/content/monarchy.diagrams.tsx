import type { DiagramProps } from "../lesson/types";

export function CastleDiagram({ lang, step }: DiagramProps) {
  const castleTitle =
    lang === "pl" ? "Wyspa Zamkowa" : lang === "de" ? "Schlossinsel" : "Castle Island";
  const ruleTitle =
    lang === "pl"
      ? "Władza dziedziczna"
      : lang === "de"
        ? "Erbliche Herrschaft"
        : "Hereditary Rule";
  const ruleLine1 =
    lang === "pl"
      ? "Władza przechodzi"
      : lang === "de"
        ? "Führung wird vererbt"
        : "Leadership passes";
  const ruleLine2 =
    lang === "pl"
      ? "w rodzie królewskim"
      : lang === "de"
        ? "in Herrscherfamilie"
        : "within royal family";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(60, 30)">
        <rect x="20" y="30" width="100" height="100" fill="#e2e8f0" stroke="#64748b" rx="4" />
        <polygon points="10,30 70,-10 130,30" fill="#cbd5e1" stroke="#64748b" />
        <text x="70" y="80" textAnchor="middle" fontSize="30">
          👑
        </text>
        <text x="70" y="115" textAnchor="middle" fontSize="11" fontWeight="bold">
          {castleTitle}
        </text>
      </g>
      {step >= 2 && (
        <g transform="translate(200, 50)">
          <rect x="0" y="10" width="140" height="90" fill="#fef08a" stroke="#ca8a04" rx="4" />
          <text x="70" y="35" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#713f12">
            {ruleTitle}
          </text>
          <text x="70" y="60" textAnchor="middle" fontSize="10" fill="#854d0e">
            {ruleLine1}
          </text>
          <text x="70" y="75" textAnchor="middle" fontSize="10" fill="#854d0e">
            {ruleLine2}
          </text>
        </g>
      )}
    </svg>
  );
}

export function TwoKingsDiagram({ lang, step }: DiagramProps) {
  const kingJasper =
    lang === "pl"
      ? "Król Jasper (Ojciec)"
      : lang === "de"
        ? "König Jasper (Vater)"
        : "King Jasper (Father)";
  const jasperTrait =
    lang === "pl"
      ? "Mądry i troskliwy"
      : lang === "de"
        ? "Weise und fürsorglich"
        : "Wise and caring";
  const jasperAction =
    lang === "pl" ? "Zbudował mosty" : lang === "de" ? "Baute Dorfbrücke" : "Built town bridge";

  const princeLeo =
    lang === "pl" ? "Książę Leo (Syn)" : lang === "de" ? "Prinz Leo (Sohn)" : "Prince Leo (Son)";
  const leoTrait =
    lang === "pl"
      ? "Beztroski władca"
      : lang === "de"
        ? "Nachlässiger Herrscher"
        : "Careless ruler";
  const leoAction =
    lang === "pl"
      ? "Poluje tylko na pawie"
      : lang === "de"
        ? "Jagt nur Pfauen"
        : "Hunts peacocks only";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <rect x="0" y="0" width="130" height="120" fill="#f0fdf4" stroke="#86efac" rx="6" />
        <text x="65" y="30" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">
          {kingJasper}
        </text>
        <text x="65" y="65" textAnchor="middle" fontSize="24">
          👑
        </text>
        <text x="65" y="90" textAnchor="middle" fontSize="10" fill="#15803d">
          {jasperTrait}
        </text>
        <text x="65" y="105" textAnchor="middle" fontSize="9" fill="#166534">
          {jasperAction}
        </text>
      </g>
      {step >= 2 && (
        <g transform="translate(220, 40)">
          <rect x="0" y="0" width="130" height="120" fill="#fef2f2" stroke="#fca5a5" rx="6" />
          <text x="65" y="30" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">
            {princeLeo}
          </text>
          <text x="65" y="65" textAnchor="middle" fontSize="24">
            🦚
          </text>
          <text x="65" y="90" textAnchor="middle" fontSize="10" fill="#b91c1c">
            {leoTrait}
          </text>
          <text x="65" y="105" textAnchor="middle" fontSize="9" fill="#991b1b">
            {leoAction}
          </text>
        </g>
      )}
    </svg>
  );
}

export function ComparisonDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Dwa rodzaje monarchii"
      : lang === "de"
        ? "Zwei Arten von Monarchie"
        : "Two Types of Monarchy";

  const absTitle =
    lang === "pl"
      ? "Monarchia absolutna"
      : lang === "de"
        ? "Absolute Monarchie"
        : "Absolute Monarchy";
  const abs1 =
    lang === "pl"
      ? "• Król ma pełnię władzy"
      : lang === "de"
        ? "• König hat alle Macht"
        : "• King holds total power";
  const abs2 =
    lang === "pl"
      ? "• Brak wyborów/parlamentu"
      : lang === "de"
        ? "• Keine Wahlen/Parlament"
        : "• No elections or parliament";
  const abs3 =
    lang === "pl"
      ? "• Zależność od urodzenia"
      : lang === "de"
        ? "• Hängt von Geburt ab"
        : "• Depends on birth luck";

  const constTitle =
    lang === "pl"
      ? "Monarchia konstytucyjna"
      : lang === "de"
        ? "Konstitutionelle Monarchie"
        : "Constitutional Monarchy";
  const const1 =
    lang === "pl"
      ? "• Król to symbol jedności"
      : lang === "de"
        ? "• Monarch ist Symbol"
        : "• Monarch is figurehead";
  const const2 =
    lang === "pl"
      ? "• Rządzi wybrany parlament"
      : lang === "de"
        ? "• Gewähltes Parlament"
        : "• Elected parliament rules";
  const const3 =
    lang === "pl"
      ? "• Prawo chroni obywateli"
      : lang === "de"
        ? "• Gesetze schützen Bürger"
        : "• Laws protect citizens";

  const footer =
    lang === "pl"
      ? "Większość współczesnych monarchii powierza stanowienie prawa parlamentom"
      : lang === "de"
        ? "Die meisten modernen Monarchien legen die Gesetzgebung ins Parlament"
        : "Most modern monarchies place real lawmaking power in elected parliaments";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(20, 20)">
        <text x="180" y="20" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
          {title}
        </text>
        <g transform="translate(10, 40)">
          <rect x="0" y="0" width="165" height="100" fill="#fee2e2" rx="4" />
          <text x="82" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">
            {absTitle}
          </text>
          <text x="12" y="50" fontSize="9" fill="#7f1d1d">
            {abs1}
          </text>
          <text x="12" y="70" fontSize="9" fill="#7f1d1d">
            {abs2}
          </text>
          <text x="12" y="90" fontSize="9" fill="#7f1d1d">
            {abs3}
          </text>
        </g>
        <g transform="translate(185, 40)">
          <rect x="0" y="0" width="165" height="100" fill="#e0f2fe" rx="4" />
          <text x="82" y="25" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">
            {constTitle}
          </text>
          <text x="12" y="50" fontSize="9" fill="#0c4a6e">
            {const1}
          </text>
          <text x="12" y="70" fontSize="9" fill="#0c4a6e">
            {const2}
          </text>
          <text x="12" y="90" fontSize="9" fill="#0c4a6e">
            {const3}
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

export function ModernRoleDiagram({ lang, step }: DiagramProps) {
  const monarchLabel = lang === "pl" ? "Monarcha" : lang === "de" ? "Monarch" : "Monarch";
  const monarchSub =
    lang === "pl" ? "Symbol jedności" : lang === "de" ? "Symbol der Einheit" : "Symbol of Unity";

  const parlLabel =
    lang === "pl"
      ? "Wybrany parlament"
      : lang === "de"
        ? "Gewähltes Parlament"
        : "Elected Parliament";
  const parlSub =
    lang === "pl"
      ? "Uchwala ustawy i budżet"
      : lang === "de"
        ? "Gesetze, Steuern, Budget"
        : "Makes laws, taxes, budget";

  const note =
    lang === "pl"
      ? "Wysoka stabilność: Tradycja połączona z głosem obywateli!"
      : lang === "de"
        ? "Hohe Stabilität: Tradition kombiniert mit demokratischer Wahl!"
        : "High Stability: Tradition combined with democratic votes!";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <circle cx="50" cy="50" r="35" fill="#fef08a" />
        <text x="50" y="45" textAnchor="middle" fontSize="20">
          👑
        </text>
        <text x="50" y="70" textAnchor="middle" fontSize="10" fontWeight="bold">
          {monarchLabel}
        </text>
        <text x="50" y="105" textAnchor="middle" fontSize="9" fill="#713f12">
          {monarchSub}
        </text>
      </g>
      {step >= 2 && (
        <g transform="translate(200, 40)">
          <rect x="0" y="15" width="150" height="70" fill="#bbf7d0" rx="4" />
          <text x="75" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">
            {parlLabel}
          </text>
          <text x="75" y="65" textAnchor="middle" fontSize="9" fill="#14532d">
            {parlSub}
          </text>
        </g>
      )}
      {step >= 3 && (
        <text x="200" y="170" textAnchor="middle" fontSize="12" fill="#15803d" fontWeight="bold">
          {note}
        </text>
      )}
    </svg>
  );
}

export function TraditionDiagram({ lang, step }: DiagramProps) {
  const traditionLabel = lang === "pl" ? "Tradycja" : lang === "de" ? "Tradition" : "Tradition";
  const voiceLabel =
    lang === "pl" ? "Głos obywateli" : lang === "de" ? "Gewählte Stimme" : "Elected Voice";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(60, 40)">
        <circle cx="50" cy="50" r="35" fill="#e0e7ff" />
        <text x="50" y="55" textAnchor="middle" fontSize="24">
          🏰
        </text>
        <text x="50" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#3730a3">
          {traditionLabel}
        </text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 40)">
          <circle cx="50" cy="50" r="35" fill="#dcfce7" />
          <text x="50" y="55" textAnchor="middle" fontSize="24">
            🗳️
          </text>
          <text x="50" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">
            {voiceLabel}
          </text>
        </g>
      )}
    </svg>
  );
}
