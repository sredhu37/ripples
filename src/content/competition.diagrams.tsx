import { CAST } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Bread, Person } from "../components/icons";
import type { DiagramProps } from "../lesson/types";

export function SoleBakerDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Bea is the only baker in town" : "Bea ist die einzige Bäckerin im Ort"}>
      <Pop x={60} y={60}>
        <Person {...CAST.Bea} size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Bea
        </text>
      </Pop>
      <Pop x={200} y={70}>
        <Bread x={0} y={0} size={65} />
        <text x="32" y="75" textAnchor="middle" fill="#64748b" fontSize="12">
          {en ? "Cold, plain bread" : "Kaltes, einfaches Brot"}
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
            {en ? "No other baker in town" : "Keine andere Bäckerei"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function NewBakerArrivesDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Luca opens a new bakery" : "Luca eröffnet eine neue Bäckerei"}>
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
            {en ? "Warm Sesame Rolls!" : "Warme Sesam-Brötchen!"}
          </text>
          <text x="100" y="65" textAnchor="middle" fill="#2563eb" fontSize="12">
            {en ? "Fresh out of the oven" : "Frisch aus dem Ofen"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function CustomersSwitchDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Customers hurry to Luca" : "Kunden eilen zu Luca"}>
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
          <text x="100" y="142" textAnchor="middle" fill="#b45309" fontSize="12" fontWeight="bold">
            {en ? "Luca is Bea's competitor!" : "Luca ist Beas Konkurrent!"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function BeaImprovesDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Bea bakes warm honey-raisin loaves" : "Bea backt warmes Honig-Rosinenbrot"}>
      <Pop x={60} y={60}>
        <Person {...CAST.Bea} mood="happy" size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Bea
        </text>
      </Pop>
      <Pop x={220} y={60}>
        <rect x="0" y="0" width="220" height="110" rx="12" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="110" y="35" textAnchor="middle" fill="#b45309" fontSize="15" fontWeight="bold">
          {en ? "Honey-Raisin Bread!" : "Honig-Rosinenbrot!"}
        </text>
        <text x="110" y="65" textAnchor="middle" fill="#d97706" fontSize="12">
          {en ? "Crisp warm crust and free tasting" : "Knusprig warm mit Gratis-Probe"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={460} y={60}>
          <rect x="0" y="0" width="140" height="100" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="70" y="40" textAnchor="middle" fill="#15803d" fontSize="13" fontWeight="bold">
            {en ? "Trying harder" : "Mehr Mühe"}
          </text>
          <text x="70" y="70" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="bold">
            {en ? "is competition!" : "ist Wettbewerb!"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function BothBakeriesBusyDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Both bakeries are busy with happy buyers" : "Beide Bäckereien haben zufriedene Kunden"}>
      <Pop x={60} y={50}>
        <rect x="0" y="0" width="220" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <Person {...CAST.Bea} mood="happy" x={65} y={10} size={90} />
        <text className="diagram-name" x={110} y={115} textAnchor="middle">
          Bea ({en ? "Honey Bread" : "Honigbrot"})
        </text>
        <rect x="30" y="125" width="160" height="25" rx="5" fill="#dcfce7" />
        <text x="110" y="142" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
          {en ? "5 happy customers" : "5 zufriedene Kunden"}
        </text>
      </Pop>
      <Pop x={360} y={50}>
        <rect x="0" y="0" width="220" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <Person {...CAST.Luca} mood="happy" x={65} y={10} size={90} />
        <text className="diagram-name" x={110} y={115} textAnchor="middle">
          Luca ({en ? "Sesame Rolls" : "Sesambrötchen"})
        </text>
        <rect x="30" y="125" width="160" height="25" rx="5" fill="#dcfce7" />
        <text x="110" y="142" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
          {en ? "5 happy customers" : "5 zufriedene Kunden"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={230} y={180}>
          <rect x="0" y="0" width="180" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x="90" y="25" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">
            {en ? "Town gets better bread!" : "Die Stadt hat besseres Brot!"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function CompetitionBenefitsAllDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Competition benefits everybody" : "Wettbewerb nützt allen"}>
      <Pop x={80} y={50}>
        <rect x="0" y="0" width="480" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="240" y="40" textAnchor="middle" fill="#23383f" fontSize="16" fontWeight="bold">
          {en ? "Why Competition Helps Everyone" : "Warum Wettbewerb allen hilft"}
        </text>
        <text x="240" y="80" textAnchor="middle" fill="#475569" fontSize="14">
          {en ? "Better quality: shops bake warmer, tastier food" : "Bessere Qualität: Läden backen frischer und leckerer"}
        </text>
        <text x="240" y="120" textAnchor="middle" fill="#475569" fontSize="14">
          {en ? "Fair prices: competitors cannot overcharge customers" : "Faire Preise: Niemand kann übertriebene Preise verlangen"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={200} y={180}>
          <rect x="0" y="0" width="240" height="40" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="120" y="25" textAnchor="middle" fill="#15803d" fontSize="13" fontWeight="bold">
            {en ? "Friendly competition wins!" : "Faire Konkurrenz gewinnt!"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}
