import type { DiagramProps } from "../lesson/types";

export function CentralDeskDiagram({ lang, step }: DiagramProps) {
  const deskTitle =
    lang === "pl" ? "Centralne Biuro Planowania" : lang === "de" ? "Staatliche Plankommission" : "Central Planning Desk";
  const deskLine1 =
    lang === "pl" ? "Ustala odgórne kwoty" : lang === "de" ? "Bestimmt Quoten" : "Decides quotas";
  const deskLine2 =
    lang === "pl" ? "Właściciel fabryk i warsztatów" : lang === "de" ? "Besitzt alle Betriebe" : "Owns all tools & shops";

  const idealTitle =
    lang === "pl" ? "Deklarowany ideał" : lang === "de" ? "Das erklärte Ideal" : "The Stated Ideal";
  const idealLine1 =
    lang === "pl" ? "Równy podział dóbr" : lang === "de" ? "Gleiche Verteilung" : "Equal distribution";
  const idealLine2 =
    lang === "pl" ? "Brak bogatych i biednych" : lang === "de" ? "Keine Reichen & Armen" : "No rich or poor";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(45, 30)">
        <rect x="0" y="10" width="145" height="120" fill="#fee2e2" stroke="#ef4444" rx="6" />
        <text x="72" y="35" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b">{deskTitle}</text>
        <text x="72" y="70" textAnchor="middle" fontSize="24">📋🏢</text>
        <text x="72" y="95" textAnchor="middle" fontSize="9" fill="#7f1d1d">{deskLine1}</text>
        <text x="72" y="110" textAnchor="middle" fontSize="9" fill="#7f1d1d">{deskLine2}</text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 30)">
          <rect x="0" y="10" width="145" height="120" fill="#f1f5f9" stroke="#cbd5e1" rx="6" />
          <text x="72" y="35" textAnchor="middle" fontSize="10" fontWeight="bold">{idealTitle}</text>
          <text x="72" y="70" textAnchor="middle" fontSize="24">⚖️🤝</text>
          <text x="72" y="95" textAnchor="middle" fontSize="9" fill="#475569">{idealLine1}</text>
          <text x="72" y="110" textAnchor="middle" fontSize="9" fill="#475569">{idealLine2}</text>
        </g>
      )}
    </svg>
  );
}

export function KnowledgeProblemDiagram({ lang, step }: DiagramProps) {
  const mainTitle =
    lang === "pl" ? "Problem wiedzy lokalnej" : lang === "de" ? "Das lokale Wissensproblem" : "The Local Knowledge Problem";

  const mountain =
    lang === "pl" ? "Góry" : lang === "de" ? "Gebirge" : "Mountain";
  const mountainNeed =
    lang === "pl" ? "Potrzeba 60 płaszczy" : lang === "de" ? "Braucht 60 Mäntel" : "Needs 60 coats";

  const harbor =
    lang === "pl" ? "Przystań" : lang === "de" ? "Hafen" : "Harbor";
  const harborNeed =
    lang === "pl" ? "Ciepło, słońce" : lang === "de" ? "Sonne & Wärme" : "Needs sun hats";

  const order =
    lang === "pl" ? "Odgórny nakaz" : lang === "de" ? "Zentraler Befehl" : "Central Order";
  const orderAlloc =
    lang === "pl" ? "Równo po 33 sztuki" : lang === "de" ? "Gleich je 33 Stück" : "Equal 33 to each";

  const footer =
    lang === "pl"
      ? "Skutek: W górach ludzie marzną, w przystani płaszcze leżą bezużytecznie!"
      : lang === "de"
      ? "Ergebnis: Das Gebirge friert, der Hafen hat ungenutzte Mäntel!"
      : "Result: Mountain freezes, Harbor has unneeded coats!";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(35, 20)">
        <text x="165" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
          {mainTitle}
        </text>
        <g transform="translate(0, 40)">
          <rect x="0" y="0" width="105" height="90" fill="#e0f2fe" rx="4" />
          <text x="52" y="25" textAnchor="middle" fontSize="10" fontWeight="bold">{mountain}</text>
          <text x="52" y="50" textAnchor="middle" fontSize="18">❄️🧥</text>
          <text x="52" y="75" textAnchor="middle" fontSize="9" fill="#0369a1">{mountainNeed}</text>
        </g>
        <g transform="translate(115, 40)">
          <rect x="0" y="0" width="105" height="90" fill="#fef9c3" rx="4" />
          <text x="52" y="25" textAnchor="middle" fontSize="10" fontWeight="bold">{harbor}</text>
          <text x="52" y="50" textAnchor="middle" fontSize="18">☀️🧢</text>
          <text x="52" y="75" textAnchor="middle" fontSize="9" fill="#854d0e">{harborNeed}</text>
        </g>
        <g transform="translate(230, 40)">
          <rect x="0" y="0" width="105" height="90" fill="#fee2e2" rx="4" />
          <text x="52" y="25" textAnchor="middle" fontSize="10" fontWeight="bold">{order}</text>
          <text x="52" y="50" textAnchor="middle" fontSize="18">📦📦</text>
          <text x="52" y="75" textAnchor="middle" fontSize="9" fill="#991b1b">{orderAlloc}</text>
        </g>
      </g>
      {step >= 2 && (
        <text x="200" y="170" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">
          {footer}
        </text>
      )}
    </svg>
  );
}

export function ShortagesQueuesDiagram({ lang, step }: DiagramProps) {
  const shelfTitle =
    lang === "pl" ? "Półka w sklepie" : lang === "de" ? "Ladenregal" : "Store Shelf";
  const shelfDesc =
    lang === "pl" ? "Chroniczne braki towaru" : lang === "de" ? "Mangel & leere Regale" : "Shortages & Out of Stock";

  const queueTitle =
    lang === "pl" ? "Kolejki po towar" : lang === "de" ? "Lange Warteschlangen" : "Long Waiting Queues";
  const queueDesc =
    lang === "pl" ? "Godziny stania w ogonkach" : lang === "de" ? "Stundenlanges Anstehen" : "Hours spent waiting in line";

  const footer =
    lang === "pl"
      ? "Bez sygnałów cenowych planiści nie potrafią dopasować podaży do potrzeb"
      : lang === "de"
      ? "Ohne Preissignale und Kundenwünsche scheitert die Bedarfsdeckung"
      : "Without price signals and customer feedback, planners cannot match supply to real needs";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(45, 30)">
        <rect x="0" y="10" width="140" height="100" fill="#f8fafc" stroke="#94a3b8" strokeDasharray="4" rx="4" />
        <text x="70" y="35" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#64748b">{shelfTitle}</text>
        <text x="70" y="65" textAnchor="middle" fontSize="20">📭</text>
        <text x="70" y="90" textAnchor="middle" fontSize="9" fill="#64748b">{shelfDesc}</text>
      </g>
      {step >= 2 && (
        <g transform="translate(210, 30)">
          <rect x="0" y="10" width="145" height="100" fill="#fef2f2" stroke="#fca5a5" rx="4" />
          <text x="72" y="35" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">{queueTitle}</text>
          <text x="72" y="65" textAnchor="middle" fontSize="20">🚶🚶🚶🚶</text>
          <text x="72" y="90" textAnchor="middle" fontSize="9" fill="#7f1d1d">{queueDesc}</text>
        </g>
      )}
      {step >= 3 && (
        <text x="200" y="165" textAnchor="middle" fontSize="10" fill="#475569">
          {footer}
        </text>
      )}
    </svg>
  );
}

export function CoreDifferenceDiagram({ lang, step }: DiagramProps) {
  const title =
    lang === "pl" ? "Mechanizmy koordynacji gospodarczej" : lang === "de" ? "Wirtschaftliche Koordination" : "Economic Coordination Mechanisms";

  const marketTitle =
    lang === "pl" ? "Koordynacja rynkowa" : lang === "de" ? "Markt-Koordination" : "Market Coordination";
  const m1 =
    lang === "pl" ? "• Ceny pokazują rzadkość dóbr" : lang === "de" ? "• Preise zeigen Knappheit" : "• Prices reflect real scarcity";
  const m2 =
    lang === "pl" ? "• Zdecentralizowane decyzje" : lang === "de" ? "• Dezentrale Entscheide" : "• Decentralized decisions";
  const m3 =
    lang === "pl" ? "• Bogaty wybór i elastyczność" : lang === "de" ? "• Hohe Vielfalt & Flexibilität" : "• High variety & flexibility";

  const planTitle =
    lang === "pl" ? "Centralne planowanie" : lang === "de" ? "Zentrale Planwirtschaft" : "Central Planning";
  const p1 =
    lang === "pl" ? "• Biuro ustala odgórne plany" : lang === "de" ? "• Büro bestimmt Quoten" : "• Central desk sets quotas";
  const p2 =
    lang === "pl" ? "• Brak lokalnych informacji" : lang === "de" ? "• Fehlende Detail-Infos" : "• Lacks local daily details";
  const p3 =
    lang === "pl" ? "• Chroniczne braki i kolejki" : lang === "de" ? "• Häufig Mangel & Schlangen" : "• Frequent shortages & lines";

  const footer =
    lang === "pl"
      ? "Wiedza jest rozproszona wśród milionów ludzi, a nie skupiona w jednym urzędzie"
      : lang === "de"
      ? "Wissen ist unter Millionen Bürgern verteilt, nicht in einer Behörde gebündelt"
      : "Information is scattered among millions of people, not held in one office";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(20, 20)">
        <text x="180" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
          {title}
        </text>
        <g transform="translate(10, 40)">
          <rect x="0" y="0" width="165" height="95" fill="#f0fdf4" rx="4" />
          <text x="82" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#166534">{marketTitle}</text>
          <text x="12" y="45" fontSize="8" fill="#14532d">{m1}</text>
          <text x="12" y="60" fontSize="8" fill="#14532d">{m2}</text>
          <text x="12" y="75" fontSize="8" fill="#14532d">{m3}</text>
        </g>
        <g transform="translate(185, 40)">
          <rect x="0" y="0" width="165" height="95" fill="#fee2e2" rx="4" />
          <text x="82" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b">{planTitle}</text>
          <text x="12" y="45" fontSize="8" fill="#7f1d1d">{p1}</text>
          <text x="12" y="60" fontSize="8" fill="#7f1d1d">{p2}</text>
          <text x="12" y="75" fontSize="8" fill="#7f1d1d">{p3}</text>
        </g>
      </g>
      {step >= 2 && (
        <text x="200" y="175" textAnchor="middle" fontSize="10" fill="#475569">
          {footer}
        </text>
      )}
    </svg>
  );
}

export function PlanningOutcomeDiagram({ lang, step }: DiagramProps) {
  const monopolyTitle =
    lang === "pl" ? "Monopol państwowy" : lang === "de" ? "Staatsmonopol" : "Central Monopoly";
  const monopolySub =
    lang === "pl" ? "Brak alternatyw" : lang === "de" ? "Keine Alternativen" : "No alternatives";

  const signalsTitle =
    lang === "pl" ? "Utracone sygnały" : lang === "de" ? "Verlorene Signale" : "Lost Signals";
  const signalsSub =
    lang === "pl" ? "Brak cen rynkowych" : lang === "de" ? "Keine Preissignale" : "No price guidance";

  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      <rect width="400" height="200" fill="#f8fafc" rx="8" />
      <g transform="translate(50, 40)">
        <rect x="0" y="0" width="130" height="90" fill="#fee2e2" stroke="#ef4444" rx="6" />
        <text x="65" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">{monopolyTitle}</text>
        <text x="65" y="55" textAnchor="middle" fontSize="20">🔒</text>
        <text x="65" y="75" textAnchor="middle" fontSize="9" fill="#7f1d1d">{monopolySub}</text>
      </g>
      {step >= 2 && (
        <g transform="translate(220, 40)">
          <rect x="0" y="0" width="130" height="90" fill="#f1f5f9" stroke="#64748b" rx="6" />
          <text x="65" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">{signalsTitle}</text>
          <text x="65" y="55" textAnchor="middle" fontSize="20">📉</text>
          <text x="65" y="75" textAnchor="middle" fontSize="9" fill="#475569">{signalsSub}</text>
        </g>
      )}
    </svg>
  );
}
