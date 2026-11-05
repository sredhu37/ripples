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
  const label =
    lang === "pl"
      ? "Finn łowi ryby przy pomoście"
      : lang === "de"
      ? "Finn fängt Fische am Hafen"
      : "Finn catches fish at the dock";
  const fullBasket =
    lang === "pl" ? "Pełen kosz!" : lang === "de" ? "Voller Korb!" : "Full basket!";
  const freshTrout =
    lang === "pl" ? "Świeże pstrągi" : lang === "de" ? "Frische Forellen" : "Fresh trout";

  return (
    <DiagramCanvas label={label}>
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
            {fullBasket}
          </text>
          <text x="75" y="75" textAnchor="middle" fill="#0284c7" fontSize="13">
            {freshTrout}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function EmptyDocksDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Finn czeka w pustym porcie"
      : lang === "de"
      ? "Finn wartet am leeren Hafen"
      : "Finn waits at empty harbor";
  const emptyDock =
    lang === "pl" ? "Pusty pomost" : lang === "de" ? "Leerer Hafen" : "Empty dock";
  const noShoppers =
    lang === "pl" ? "Brak klientów" : lang === "de" ? "Noch keine Leute" : "No shoppers yet";

  return (
    <DiagramCanvas label={label}>
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
            {emptyDock}
          </text>
          <text x="75" y="65" textAnchor="middle" fill="#94a3b8" fontSize="12">
            {noShoppers}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function NoSalesDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Ryby w skrzynkach nie dają monet"
      : lang === "de"
      ? "Lagernde Fische bringen null Münzen"
      : "Stored fish make zero coins";
  const invZero =
    lang === "pl" ? "Towar w skrzynce = 0 monet" : lang === "de" ? "Lager = 0 Münzen" : "Inventory = 0 coins";
  const mustSell =
    lang === "pl"
      ? "Towar musi zostać sprzedany, by dać zysk"
      : lang === "de"
      ? "Waren bringen erst Geld beim Verkauf"
      : "Goods must be sold to bring money";

  return (
    <DiagramCanvas label={label}>
      <Pop x={70} y={60}>
        <DockStand x={0} y={20} />
        <Fish x={45} y={25} size={65} />
      </Pop>
      {step >= 2 && (
        <Pop x={300} y={70}>
          <rect x="0" y="0" width="280" height="120" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
          <text x="140" y="40" textAnchor="middle" fill="#23383f" fontSize={16} fontWeight="bold">
            {invZero}
          </text>
          <text x="140" y="75" textAnchor="middle" fill="#64748b" fontSize={14}>
            {mustSell}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function FerryArrivalDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Prom przypływa z klientami"
      : lang === "de"
      ? "Die Fähre bringt Kundschaft"
      : "Ferry arrives with customers";
  const customersText =
    lang === "pl" ? "Klienci!" : lang === "de" ? "Kundschaft!" : "Customers!";
  const readyToBuy =
    lang === "pl" ? "Gotowi do zakupu" : lang === "de" ? "Kaufbereit" : "Ready to buy";

  return (
    <DiagramCanvas label={label}>
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
          <text x="65" y="38" textAnchor="middle" fill="#15803d" fontSize={14} fontWeight="bold">
            {customersText}
          </text>
          <text x="65" y="65" textAnchor="middle" fill="#15803d" fontSize={12}>
            {readyToBuy}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function SalesExchangeDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Wymiana ryby na monety tworzy sprzedaż"
      : lang === "de"
      ? "Tausch von Fisch gegen Münzen bringt Umsatz"
      : "Exchange of fish for coins creates sales";
  const completeText =
    lang === "pl" ? "Sprzedaż udana!" : lang === "de" ? "Verkauf geglückt!" : "Sale complete!";

  return (
    <DiagramCanvas label={label}>
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
          <text x="80" y="25" textAnchor="middle" fill="#0369a1" fontSize={14} fontWeight="bold">
            {completeText}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function BusinessSalesGoalDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Przychód ze sprzedaży utrzymuje firmę na rynku"
      : lang === "de"
      ? "Umsatz hält das Geschäft am Laufen"
      : "Sales keep the business running";
  const mainTitle =
    lang === "pl"
      ? "Przychód = Wszystkie otrzymane monety"
      : lang === "de"
      ? "Umsatz = Alle eingenommenen Münzen"
      : "Sales = Total Coins Received";
  const subLine1 =
    lang === "pl"
      ? "Od każdego zadowolonego klienta"
      : lang === "de"
      ? "Von allen zufriedenen Kundinnen und Kunden"
      : "From every happy customer";
  const subLine2 =
    lang === "pl"
      ? "Większa sprzedaż pomaga naprawiać łódź i sieci"
      : lang === "de"
      ? "Mehr Umsatz hilft beim Boot-Unterhalt"
      : "More sales help pay for boat repairs";

  return (
    <DiagramCanvas label={label}>
      <Pop x={50} y={60}>
        <Person {...CAST.Finn} mood="happy" size={130} />
        <text className="diagram-name" x={65} y={160} textAnchor="middle">
          Finn
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={220} y={60}>
          <rect x="0" y="0" width="370" height="140" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
          <text x="185" y="40" textAnchor="middle" fill="#23383f" fontSize={16} fontWeight="bold">
            {mainTitle}
          </text>
          <text x="185" y="75" textAnchor="middle" fill="#475569" fontSize={14}>
            {subLine1}
          </text>
          <text x="185" y="110" textAnchor="middle" fill="#0284c7" fontSize={14} fontWeight="bold">
            {subLine2}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}
