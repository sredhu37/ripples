import type { DiagramProps } from "../lesson/types";

export function RuinsOfEuropeDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Europa w 1945 roku: Potrzeba odbudowy"
      : lang === "de"
      ? "Europa im Jahr 1945: Notwendigkeit des Wiederaufbaus"
      : "Europe in 1945: The Need for Rebuilding";

  const brokenLink =
    lang === "pl" ? "Przerwany szlak" : lang === "de" ? "Zerstoerte Verbindung" : "Broken Link";

  const sub =
    lang === "pl"
      ? "Fabryki w ruinie i rodziny tęskniące za dachem nad głową i chlebem"
      : lang === "de"
      ? "Fabriken in Truemmern und Familien in Sehnsucht nach Obdach und Brot"
      : "Factories in ruins and families longing for shelter and bread";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Europe in 1945">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
        {title}
      </text>
      {/* Broken railway / factory */}
      <line x1="80" y1="130" x2="160" y2="130" stroke="#64748b" strokeWidth="4" />
      <line x1="240" y1="130" x2="320" y2="130" stroke="#64748b" strokeWidth="4" />
      {/* Gap in the middle */}
      <text x="200" y="135" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">{brokenLink}</text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function SchumanDeclarationDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "9 maja 1950: Deklaracja Schumana"
      : lang === "de"
      ? "9. Mai 1950: Die Schuman-Erklaerung"
      : "9 May 1950: The Schuman Declaration";

  const poolTitle =
    lang === "pl" ? "Wspólny Węgiel i Stal" : lang === "de" ? "Kohle & Stahl teilen" : "Pool Coal & Steel";

  const quote1 =
    lang === "pl"
      ? "„Wojna między Francją a Niemcami"
      : lang === "de"
      ? "\"Krieg zwischen Frankreich und Deutschland"
      : "\"War between France and Germany";

  const quote2 =
    lang === "pl"
      ? "stanie się materialnie niemożliwa”"
      : lang === "de"
      ? "wird materiell unmoeglich\""
      : "becomes materially impossible\"";

  const sub =
    lang === "pl"
      ? "Narodziny europejskiej integracji gospodarczej i pokoju"
      : lang === "de"
      ? "Die Geburtsstunde der europaeischen Einigung"
      : "The birth of European economic integration";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="The Schuman Declaration 1950">
      <rect x="40" y="30" width="320" height="180" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">
        {title}
      </text>
      {/* Document scroll */}
      <rect x="130" y="80" width="140" height="85" rx="6" fill="#ffffff" stroke="#93c5fd" strokeWidth="2" />
      <text x="200" y="110" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">
        {poolTitle}
      </text>
      <text x="200" y="130" textAnchor="middle" fontSize="10" fill="#3b82f6">
        {quote1}
      </text>
      <text x="200" y="145" textAnchor="middle" fontSize="10" fill="#3b82f6">
        {quote2}
      </text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1d4ed8">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function CoalAndSteelVatsDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Europejska Wspólnota Węgla i Stali (EWWiS)"
      : lang === "de"
      ? "Montanunion (EGKS)"
      : "The Coal and Steel Community (EGKS)";

  const coalTitle = lang === "pl" ? "Węgiel z Zagłębia" : lang === "de" ? "Ruhrkohle" : "Rhine Coal";
  const coalSub = lang === "pl" ? "Ciepło dla domów" : lang === "de" ? "Energie fuer Heime" : "Energy for homes";

  const steelTitle = lang === "pl" ? "Stal na mosty" : lang === "de" ? "Lothringer Stahl" : "Lorraine Steel";
  const steelSub = lang === "pl" ? "Dźwigary i szyny" : lang === "de" ? "Traeger fuer Bruecken" : "Girders for bridges";

  const sub =
    lang === "pl"
      ? "Wspólne zasoby zarządzane razem pod prawem europejskim"
      : lang === "de"
      ? "Gemeinsame Ressourcen unter europaeischem Recht"
      : "Shared resources governed jointly under European law";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="European Coal and Steel Pool">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#fffbeb" stroke="#fef08a" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#854d0e">
        {title}
      </text>
      {/* Coal Vat */}
      <rect x="70" y="80" width="110" height="80" rx="8" fill="#334155" />
      <text x="125" y="115" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f8fafc">{coalTitle}</text>
      <text x="125" y="135" textAnchor="middle" fontSize="10" fill="#cbd5e1">{coalSub}</text>

      {/* Steel Vat */}
      <rect x="220" y="80" width="110" height="80" rx="8" fill="#475569" />
      <text x="275" y="115" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#f8fafc">{steelTitle}</text>
      <text x="275" y="135" textAnchor="middle" fontSize="10" fill="#cbd5e1">{steelSub}</text>
      {step >= 2 && (
        <text x="200" y="195" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#713f12">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function RebuiltRailwayBridgeDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Odbudowany Most Pokoju przez Ren"
      : lang === "de"
      ? "Die wiederaufgebaute Friedensbruecke"
      : "The Rebuilt Peace Bridge Across the Rhine";

  const sub =
    lang === "pl"
      ? "Szybkie pociągi wiozące studentów, towary i przyjaciół przez otwarte granice"
      : lang === "de"
      ? "Schnelle Zuege verbinden Nachbarn und Freunde ueber offene Grenzen"
      : "Fast trains carrying students, goods, and friends across borders";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Rebuilt Peace Bridge">
      <rect x="30" y="30" width="340" height="180" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      <text x="200" y="55" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">
        {title}
      </text>
      {/* River */}
      <rect x="50" y="140" width="300" height="40" fill="#38bdf8" opacity="0.5" />
      {/* Arch Bridge */}
      <path d="M50 140 Q200 70 350 140" stroke="#15803d" strokeWidth="6" fill="none" />
      <line x1="50" y1="140" x2="350" y2="140" stroke="#1e293b" strokeWidth="3" />
      {/* Train */}
      <rect x="160" y="125" width="80" height="15" rx="3" fill="#0284c7" />
      <circle cx="180" cy="140" r="4" fill="#0f172a" />
      <circle cx="220" cy="140" r="4" fill="#0f172a" />
      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">
          {sub}
        </text>
      )}
    </svg>
  );
}

export function EuropeanUnionStarsDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl"
      ? "Unia Europejska"
      : lang === "de"
      ? "Die Europaeische Union"
      : "The European Union";

  const sub =
    lang === "pl"
      ? "Siedemdziesiąt lat nieprzerwanego pokoju dzięki demokratycznej wspólnocie"
      : lang === "de"
      ? "Siebzig Jahre dauerhafter Frieden durch demokratische Gemeinschaft"
      : "Seventy years of unbroken peace through shared democratic union";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" aria-label="Circle of Gold Stars">
      <rect x="40" y="30" width="320" height="180" rx="12" fill="#1e3a8a" stroke="#172554" strokeWidth="2" />
      <text x="200" y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ffffff">
        {title}
      </text>
      {/* 12 Stars in circle */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 200 + 45 * Math.cos(rad);
        const cy = 125 + 45 * Math.sin(rad);
        return <text key={deg} x={cx} y={cy + 4} textAnchor="middle" fontSize="12" fill="#facc15">★</text>;
      })}
      {step >= 2 && (
        <text x="200" y="200" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fef08a">
          {sub}
        </text>
      )}
    </svg>
  );
}
