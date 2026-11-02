import { CAST } from "../components/cast";
import { Arrow, DiagramCanvas, Pop } from "../components/diagram";
import { Coin, Fish, Person } from "../components/icons";
import type { DiagramProps } from "../lesson/types";

export function DockStand({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="40" width="160" height="20" rx="4" fill="#a86f3c" />
      <rect x="15" y="60" width="16" height="60" fill="#6f4627" />
      <rect x="129" y="60" width="16" height="60" fill="#6f4627" />
      <path d="M-10 40 L80 10 L170 40 Z" fill="#2f7fb8" opacity="0.85" />
    </g>
  );
}

export function FerryBoat({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M10 50 L110 50 L95 80 L25 80 Z" fill="#ffffff" stroke="#23383f" strokeWidth="3" />
      <rect x="35" y="25" width="45" height="25" rx="3" fill="#2f7fb8" />
      <circle cx="48" cy="37" r="6" fill="#f4f1e8" />
      <circle cx="68" cy="37" r="6" fill="#f4f1e8" />
      <path d="M0 85 C30 80 60 90 90 85 C110 80 130 90 140 85" stroke="#38bdf8" strokeWidth="4" fill="none" />
    </g>
  );
}

export function CatchFishDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Finn catches fish at the dock" : "Finn fängt Fische am Hafen"}>
      <Pop x={60} y={60}>
        <Person {...CAST.Finn} size={140} />
        <text className="diagram-name" x={70} y={170} textAnchor="middle">
          Finn
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={250} y={100}>
          <Fish x={0} y={0} size={80} />
          <Fish x={40} y={15} size={80} />
        </Pop>
      )}
      {step >= 3 && (
        <Pop x={440} y={80}>
          <rect x="0" y="0" width="150" height="110" rx="12" fill="#fff" stroke="#23383f" strokeWidth="3" />
          <text x="75" y="45" textAnchor="middle" fill="#23383f" fontSize="15" fontWeight="bold">
            {en ? "Full basket!" : "Voller Korb!"}
          </text>
          <text x="75" y="75" textAnchor="middle" fill="#0284c7" fontSize="13">
            {en ? "Fresh trout" : "Frische Forellen"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function EmptyDocksDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Finn waits at empty harbor" : "Finn wartet am leeren Hafen"}>
      <Pop x={60} y={60}>
        <Person {...CAST.Finn} mood="think" size={130} />
        <text className="diagram-name" x={65} y={160} textAnchor="middle">
          Finn
        </text>
      </Pop>
      <Pop x={240} y={60}>
        <DockStand x={0} y={20} />
        <Fish x={45} y={25} size={65} />
      </Pop>
      {step >= 2 && (
        <Pop x={450} y={80}>
          <rect x="0" y="0" width="150" height="90" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
          <text x="75" y="38" textAnchor="middle" fill="#64748b" fontSize="14" fontWeight="bold">
            {en ? "Empty dock" : "Leerer Hafen"}
          </text>
          <text x="75" y="65" textAnchor="middle" fill="#94a3b8" fontSize="12">
            {en ? "No shoppers yet" : "Noch keine Leute"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function NoSalesDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Stored fish make zero coins" : "Lagernde Fische bringen null Münzen"}>
      <Pop x={70} y={60}>
        <DockStand x={0} y={20} />
        <Fish x={45} y={25} size={65} />
      </Pop>
      {step >= 2 && (
        <Pop x={300} y={70}>
          <rect x="0" y="0" width="280" height="120" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
          <text x="140" y="40" textAnchor="middle" fill="#23383f" fontSize="16" fontWeight="bold">
            {en ? "Inventory = 0 coins" : "Lager = 0 Münzen"}
          </text>
          <text x="140" y="75" textAnchor="middle" fill="#64748b" fontSize="14">
            {en ? "Goods must be sold to bring money" : "Waren bringen erst Geld beim Verkauf"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function FerryArrivalDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Ferry arrives with customers" : "Die Fähre bringt Kundschaft"}>
      <Pop x={40} y={70}>
        <FerryBoat x={0} y={0} />
      </Pop>
      {step >= 2 && (
        <Pop x={230} y={60}>
          <Person {...CAST.Pip} size={110} />
          <text className="diagram-name" x={55} y={135} textAnchor="middle">
            Pip
          </text>
        </Pop>
      )}
      {step >= 3 && (
        <Pop x={360} y={60}>
          <Person {...CAST.Sam} size={110} />
          <text className="diagram-name" x={55} y={135} textAnchor="middle">
            Sam
          </text>
        </Pop>
      )}
      {step >= 4 && (
        <Pop x={490} y={70}>
          <rect x="0" y="0" width="130" height="90" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="65" y="38" textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="bold">
            {en ? "Customers!" : "Kundschaft!"}
          </text>
          <text x="65" y="65" textAnchor="middle" fill="#15803d" fontSize="12">
            {en ? "Ready to buy" : "Kaufbereit"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function SalesExchangeDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Exchange of fish for coins creates sales" : "Tausch von Fisch gegen Münzen bringt Umsatz"}>
      <Pop x={40} y={60}>
        <Person {...CAST.Finn} mood="happy" size={130} />
        <text className="diagram-name" x={65} y={160} textAnchor="middle">
          Finn
        </text>
      </Pop>
      <Pop x={460} y={60}>
        <Person {...CAST.Pip} mood="happy" size={130} />
        <text className="diagram-name" x={65} y={160} textAnchor="middle">
          Pip
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={220} y={60}>
          <Arrow from={[30, 20]} to={[150, 20]} color="#0284c7" width={4} head={12} />
          <Fish x={75} y={-10} size={50} />
        </Pop>
      )}
      {step >= 3 && (
        <Pop x={220} y={130}>
          <Arrow from={[150, 20]} to={[30, 20]} color="#e3a91a" width={4} head={12} />
          <g transform="translate(65, 0)">
            <Coin x={0} y={0} size={35} />
            <Coin x={24} y={0} size={35} />
            <Coin x={48} y={0} size={35} />
          </g>
        </Pop>
      )}
      {step >= 4 && (
        <Pop x={240} y={210}>
          <rect x="0" y="0" width="160" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x="80" y="25" textAnchor="middle" fill="#0369a1" fontSize="14" fontWeight="bold">
            {en ? "Sale complete!" : "Verkauf geglückt!"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function BusinessSalesGoalDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Sales keep the business running" : "Umsatz hält das Geschäft am Laufen"}>
      <Pop x={50} y={60}>
        <Person {...CAST.Finn} mood="happy" size={130} />
        <text className="diagram-name" x={65} y={160} textAnchor="middle">
          Finn
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={220} y={60}>
          <rect x="0" y="0" width="370" height="140" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
          <text x="185" y="40" textAnchor="middle" fill="#23383f" fontSize="16" fontWeight="bold">
            {en ? "Sales = Total Coins Received" : "Umsatz = Alle eingenommenen Münzen"}
          </text>
          <text x="185" y="75" textAnchor="middle" fill="#475569" fontSize="14">
            {en ? "From every happy customer" : "Von allen zufriedenen Kundinnen und Kunden"}
          </text>
          <text x="185" y="110" textAnchor="middle" fill="#0284c7" fontSize="14" fontWeight="bold">
            {en ? "More sales help pay for boat repairs" : "Mehr Umsatz hilft beim Boot-Unterhalt"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}
