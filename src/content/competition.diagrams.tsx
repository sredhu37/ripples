import { CAST } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Bread, Person } from "../components/icons";
import type { DiagramProps } from "../lesson/types";

export function SoleBakerDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Bea jest jedyną piekarką w miasteczku"
      : lang === "de"
      ? "Bea ist die einzige Bäckerin im Ort"
      : "Bea is the only baker in town";
  const breadText =
    lang === "pl"
      ? "Zimny, zwykły chleb"
      : lang === "de"
      ? "Kaltes, einfaches Brot"
      : "Cold, plain bread";
  const pipNote =
    lang === "pl"
      ? "Brak innej piekarni w mieście"
      : lang === "de"
      ? "Keine andere Bäckerei"
      : "No other baker in town";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={60}>
        <Person {...CAST.Bea} size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Bea
        </text>
      </Pop>
      <Pop x={200} y={70}>
        <Bread x={0} y={0} size={65} />
        <text x="32" y="75" textAnchor="middle" fill="#64748b" fontSize="12">
          {breadText}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={330} y={60}>
          <Person {...CAST.Pip} mood="think" size={95} />
          <text className="diagram-name" x={48} y={125} textAnchor="middle">
            Pip
          </text>
          <rect x="0" y="130" width="160" height="30" rx="6" fill="#f1f5f9" />
          <text x="80" y="150" textAnchor="middle" fill="#64748b" fontSize="11">
            {pipNote}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function NewBakerArrivesDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Luca otwiera nową piekarnię"
      : lang === "de"
      ? "Luca eröffnet eine neue Bäckerei"
      : "Luca opens a new bakery";
  const rollTitle =
    lang === "pl"
      ? "Ciepłe bułki sezamowe!"
      : lang === "de"
      ? "Warme Sesam-Brötchen!"
      : "Warm Sesame Rolls!";
  const rollSub =
    lang === "pl"
      ? "Świeżo upieczone z pieca"
      : lang === "de"
      ? "Frisch aus dem Ofen"
      : "Fresh out of the oven";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={60}>
        <Person {...CAST.Bea} size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Bea
        </text>
      </Pop>
      <Pop x={440} y={60}>
        <Person {...CAST.Luca} mood="happy" size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Luca
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={220} y={70}>
          <rect x="0" y="0" width="200" height="100" rx="12" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
          <text x="100" y="35" textAnchor="middle" fill="#1d4ed8" fontSize="14" fontWeight="bold">
            {rollTitle}
          </text>
          <text x="100" y="65" textAnchor="middle" fill="#2563eb" fontSize="12">
            {rollSub}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function CustomersSwitchDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Klienci biegną do Luci"
      : lang === "de"
      ? "Kunden eilen zu Luca"
      : "Customers hurry to Luca";
  const competitorBadge =
    lang === "pl"
      ? "Luca to konkurent Bei!"
      : lang === "de"
      ? "Luca ist Beas Konkurrent!"
      : "Luca is Bea's competitor!";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={60}>
        <Person {...CAST.Bea} mood="think" size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Bea
        </text>
      </Pop>
      <Pop x={440} y={60}>
        <Person {...CAST.Luca} mood="happy" size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Luca
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={220} y={60}>
          <Person {...CAST.Pip} mood="happy" size={90} x={10} y={10} />
          <Person {...CAST.Sam} mood="happy" size={90} x={100} y={10} />
          <rect x="10" y="120" width="180" height="35" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          <text x="100" y="142" textAnchor="middle" fill="#b45309" fontSize={12} fontWeight="bold">
            {competitorBadge}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function BeaImprovesDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Bea piecze ciepły chleb miodowo-rodzynkowy"
      : lang === "de"
      ? "Bea backt warmes Honig-Rosinenbrot"
      : "Bea bakes warm honey-raisin loaves";
  const breadTitle =
    lang === "pl"
      ? "Chleb miodowo-rodzynkowy!"
      : lang === "de"
      ? "Honig-Rosinenbrot!"
      : "Honey-Raisin Bread!";
  const breadSub =
    lang === "pl"
      ? "Chrupiący i ciepły z darmową degustacją"
      : lang === "de"
      ? "Knusprig warm mit Gratis-Probe"
      : "Crisp warm crust and free tasting";
  const tryLine1 =
    lang === "pl" ? "Więcej starań" : lang === "de" ? "Mehr Mühe" : "Trying harder";
  const tryLine2 =
    lang === "pl" ? "to konkurencja!" : lang === "de" ? "ist Wettbewerb!" : "is competition!";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={60}>
        <Person {...CAST.Bea} mood="happy" size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Bea
        </text>
      </Pop>
      <Pop x={220} y={60}>
        <rect x="0" y="0" width="220" height="110" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="110" y="35" textAnchor="middle" fill="#b45309" fontSize={15} fontWeight="bold">
          {breadTitle}
        </text>
        <text x="110" y="65" textAnchor="middle" fill="#d97706" fontSize={12}>
          {breadSub}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={460} y={60}>
          <rect x="0" y="0" width="140" height="100" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="70" y="40" textAnchor="middle" fill="#15803d" fontSize={13} fontWeight="bold">
            {tryLine1}
          </text>
          <text x="70" y="70" textAnchor="middle" fill="#166534" fontSize={13} fontWeight="bold">
            {tryLine2}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function BothBakeriesBusyDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Obie piekarnie mają zadowolonych klientów"
      : lang === "de"
      ? "Beide Bäckereien haben zufriedene Kunden"
      : "Both bakeries are busy with happy buyers";
  const beaProduct =
    lang === "pl" ? "Chleb miodowy" : lang === "de" ? "Honigbrot" : "Honey Bread";
  const lucaProduct =
    lang === "pl" ? "Bułki sezamowe" : lang === "de" ? "Sesambrötchen" : "Sesame Rolls";
  const happyCust =
    lang === "pl" ? "5 zadowolonych klientów" : lang === "de" ? "5 zufriedene Kunden" : "5 happy customers";
  const townBenefit =
    lang === "pl"
      ? "Całe miasto ma lepszy chleb!"
      : lang === "de"
      ? "Die Stadt hat besseres Brot!"
      : "Town gets better bread!";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={50}>
        <rect x="0" y="0" width="220" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <Person {...CAST.Bea} mood="happy" x={65} y={10} size={90} />
        <text className="diagram-name" x={110} y={115} textAnchor="middle">
          Bea ({beaProduct})
        </text>
        <rect x="30" y="125" width="160" height="25" rx="5" fill="#dcfce7" />
        <text x="110" y="142" textAnchor="middle" fill="#15803d" fontSize={11} fontWeight="bold">
          {happyCust}
        </text>
      </Pop>
      <Pop x={360} y={50}>
        <rect x="0" y="0" width="220" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <Person {...CAST.Luca} mood="happy" x={65} y={10} size={90} />
        <text className="diagram-name" x={110} y={115} textAnchor="middle">
          Luca ({lucaProduct})
        </text>
        <rect x="30" y="125" width="160" height="25" rx="5" fill="#dcfce7" />
        <text x="110" y="142" textAnchor="middle" fill="#15803d" fontSize={11} fontWeight="bold">
          {happyCust}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={230} y={180}>
          <rect x="0" y="0" width="180" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x="90" y="25" textAnchor="middle" fill="#0369a1" fontSize={13} fontWeight="bold">
            {townBenefit}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function CompetitionBenefitsAllDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Konkurencja przynosi korzyści wszystkim"
      : lang === "de"
      ? "Wettbewerb nützt allen"
      : "Competition benefits everybody";
  const title =
    lang === "pl"
      ? "Dlaczego konkurencja pomaga każdemu"
      : lang === "de"
      ? "Warum Wettbewerb allen hilft"
      : "Why Competition Helps Everyone";
  const point1 =
    lang === "pl"
      ? "Lepsza jakość: piekarnie pieką cieplejsze i smaczniejsze wypieki"
      : lang === "de"
      ? "Bessere Qualität: Läden backen frischer und leckerer"
      : "Better quality: shops bake warmer, tastier food";
  const point2 =
    lang === "pl"
      ? "Uczciwe ceny: sprzedawcy nie mogą narzucać wygórowanych cen"
      : lang === "de"
      ? "Faire Preise: Niemand kann übertriebene Preise verlangen"
      : "Fair prices: competitors cannot overcharge customers";
  const badge =
    lang === "pl"
      ? "Uczciwa konkurencja wygrywa!"
      : lang === "de"
      ? "Faire Konkurrenz gewinnt!"
      : "Friendly competition wins!";

  return (
    <DiagramCanvas label={label}>
      <Pop x={80} y={50}>
        <rect x="0" y="0" width="480" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="240" y="40" textAnchor="middle" fill="#23383f" fontSize={16} fontWeight="bold">
          {title}
        </text>
        <text x="240" y="80" textAnchor="middle" fill="#475569" fontSize={14}>
          {point1}
        </text>
        <text x="240" y="120" textAnchor="middle" fill="#475569" fontSize={14}>
          {point2}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={200} y={180}>
          <rect x="0" y="0" width="240" height="40" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="120" y="25" textAnchor="middle" fill="#15803d" fontSize={13} fontWeight="bold">
            {badge}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}
