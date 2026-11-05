import { CAST } from "../components/cast";
import { Arrow, DiagramCanvas, Pop } from "../components/diagram";
import { Bread, Coin, Person } from "../components/icons";
import type { DiagramProps } from "../lesson/types";

export function FlourIcon({ x = 0, y = 0, size = 50 }: { x?: number; y?: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 100})`}>
      <path d="M25 85 C20 50 30 35 45 35 H55 C70 35 80 50 75 85 Z" fill="#f4f1e8" stroke="#cfc6ad" strokeWidth="4" />
      <path d="M40 35 L35 22 H65 L60 35 Z" fill="#e8b98c" stroke="#cfc6ad" strokeWidth="3" />
      <circle cx="50" cy="60" r="14" fill="#e8863a" opacity="0.3" />
      <text x="50" y="66" textAnchor="middle" fill="#23383f" fontSize="18" fontWeight="bold">F</text>
    </g>
  );
}

export function WoodIcon({ x = 0, y = 0, size = 50 }: { x?: number; y?: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 100})`}>
      <rect x="15" y="55" width="70" height="20" rx="10" fill="#8a5a36" stroke="#5a2f1a" strokeWidth="3" />
      <rect x="20" y="32" width="60" height="20" rx="10" fill="#a86f3c" stroke="#5a2f1a" strokeWidth="3" />
      <circle cx="25" cy="65" r="7" fill="#6f4627" />
      <circle cx="28" cy="42" r="6" fill="#5a2f1a" />
    </g>
  );
}

export function BakeryOven({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="20" width="120" height="90" rx="8" fill="#d47355" stroke="#23383f" strokeWidth="4" />
      <path d="M20 75 C20 45 100 45 100 75 Z" fill="#23383f" />
      <path d="M40 75 C40 60 80 60 80 75 Z" fill="#f2b632" />
      <rect x="10" y="100" width="100" height="16" rx="4" fill="#a9b6bd" />
    </g>
  );
}

export function BakeBeatDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Bea piecze chleb w swojej piekarni"
      : lang === "de"
      ? "Bea backt Brot in ihrer Bäckerei"
      : "Bea bakes bread in her bakery";
  const freshBread =
    lang === "pl" ? "Świeży chleb" : lang === "de" ? "Frisches Brot" : "Fresh bread";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={60}>
        <Person {...CAST.Bea} size={140} />
        <text className="diagram-name" x={70} y={170} textAnchor="middle">
          Bea
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={260} y={80}>
          <BakeryOven x={0} y={0} />
        </Pop>
      )}
      {step >= 3 && (
        <Pop x={440} y={90}>
          <Bread x={0} y={0} size={110} />
          <text className="diagram-name" x={55} y={135} textAnchor="middle">
            {freshBread}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function CustomerSaleDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Klient płaci 4 monety za chleb"
      : lang === "de"
      ? "Kundschaft zahlt 4 Münzen für Brot"
      : "Customer pays 4 coins for bread";
  const fourCoins =
    lang === "pl" ? "4 monety" : lang === "de" ? "4 Münzen" : "4 coins";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={60}>
        <Person {...CAST.Pip} size={130} />
        <text className="diagram-name" x={65} y={160} textAnchor="middle">
          Pip
        </text>
      </Pop>
      <Pop x={450} y={60}>
        <Person {...CAST.Bea} size={130} />
        <text className="diagram-name" x={65} y={160} textAnchor="middle">
          Bea
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={250} y={70}>
          <Arrow from={[40, 20]} to={[130, 20]} color="#e3a91a" width={5} head={14} />
          <g transform="translate(60, -25)">
            <Coin x={0} y={0} size={42} />
            <Coin x={18} y={0} size={42} />
            <Coin x={36} y={0} size={42} />
            <Coin x={54} y={0} size={42} />
          </g>
          <text x={85} y={45} textAnchor="middle" fill="#23383f" fontSize={15} fontWeight="bold">
            {fourCoins}
          </text>
        </Pop>
      )}
      {step >= 3 && (
        <Pop x={250} y={150}>
          <Arrow from={[130, 20]} to={[40, 20]} color="#d9953e" width={5} head={14} />
          <Bread x={65} y={-10} size={50} />
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function CostsDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Mąka, drewno i czynsz za piec to koszty"
      : lang === "de"
      ? "Mehl, Holz und Ofenmiete sind Kosten"
      : "Flour, wood, and oven rent are costs";
  const flourText =
    lang === "pl" ? "Mąka: 1 moneta" : lang === "de" ? "Mehl: 1 Münze" : "Flour: 1 coin";
  const woodText =
    lang === "pl" ? "Drewno: 1 moneta" : lang === "de" ? "Holz: 1 Münze" : "Wood: 1 coin";
  const rentText =
    lang === "pl" ? "Czynsz: 1 moneta" : lang === "de" ? "Miete: 1 Münze" : "Rent: 1 coin";
  const totalCosts =
    lang === "pl"
      ? "Koszty razem: 3 monety"
      : lang === "de"
      ? "Gesamtkosten: 3 Münzen"
      : "Total costs: 3 coins";

  return (
    <DiagramCanvas label={label}>
      <Pop x={40} y={60}>
        <rect x="0" y="0" width="160" height="150" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <FlourIcon x={45} y={10} size={70} />
        <text x="80" y="95" textAnchor="middle" fill="#23383f" fontSize={15} fontWeight="bold">
          {flourText}
        </text>
        <Coin x={65} y={105} size={30} />
      </Pop>
      {step >= 2 && (
        <Pop x={240} y={60}>
          <rect x="0" y="0" width="160" height="150" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
          <WoodIcon x={45} y={10} size={70} />
          <text x="80" y="95" textAnchor="middle" fill="#23383f" fontSize={15} fontWeight="bold">
            {woodText}
          </text>
          <Coin x={65} y={105} size={30} />
        </Pop>
      )}
      {step >= 3 && (
        <Pop x={440} y={60}>
          <rect x="0" y="0" width="160" height="150" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
          <g transform="translate(30, 10) scale(0.8)">
            <BakeryOven />
          </g>
          <text x="80" y="95" textAnchor="middle" fill="#23383f" fontSize={15} fontWeight="bold">
            {rentText}
          </text>
          <Coin x={65} y={105} size={30} />
        </Pop>
      )}
      {step >= 4 && (
        <Pop x={220} y={225}>
          <rect x="0" y="0" width="200" height="40" rx="10" fill="#d6403a" />
          <text x="100" y="26" textAnchor="middle" fill="#ffffff" fontSize={16} fontWeight="bold">
            {totalCosts}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function ProfitSplitDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Koszty są płacone najpierw, reszta to zysk"
      : lang === "de"
      ? "Kosten werden zuerst bezahlt, der Rest ist Gewinn"
      : "Costs are paid first, remaining coin is profit";
  const salesPrice =
    lang === "pl" ? "Cena sprzedaży" : lang === "de" ? "Verkaufspreis" : "Sales price";
  const fourCoins =
    lang === "pl" ? "4 monety" : lang === "de" ? "4 Münzen" : "4 coins";
  const costsLabel =
    lang === "pl" ? "Koszty (3 monety)" : lang === "de" ? "Kosten (3 Münzen)" : "Costs (3 coins)";
  const profitLabel =
    lang === "pl" ? "Zysk (1 moneta)" : lang === "de" ? "Gewinn (1 Münze)" : "Profit (1 coin)";

  return (
    <DiagramCanvas label={label}>
      <Pop x={30} y={70}>
        <rect x="0" y="0" width="140" height="130" rx="12" fill="#fff" stroke="#23383f" strokeWidth="3" />
        <text x="70" y="30" textAnchor="middle" fill="#23383f" fontSize={14} fontWeight="bold">
          {salesPrice}
        </text>
        <g transform="translate(15, 45)">
          <Coin x={0} y={0} size={32} />
          <Coin x={26} y={0} size={32} />
          <Coin x={52} y={0} size={32} />
          <Coin x={78} y={0} size={32} />
        </g>
        <text x="70" y="105" textAnchor="middle" fill="#23383f" fontSize={15}>
          {fourCoins}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={200} y={50}>
          <Arrow from={[0, 30]} to={[60, 30]} color="#d6403a" width={4} head={12} />
          <rect x="70" y="0" width="160" height="90" rx="10" fill="#fee2e2" stroke="#d6403a" strokeWidth="2" />
          <text x="150" y="28" textAnchor="middle" fill="#991b1b" fontSize={14} fontWeight="bold">
            {costsLabel}
          </text>
          <g transform="translate(105, 40)">
            <Coin x={0} y={0} size={28} />
            <Coin x={26} y={0} size={28} />
            <Coin x={52} y={0} size={28} />
          </g>
        </Pop>
      )}
      {step >= 3 && (
        <Pop x={200} y={150}>
          <Arrow from={[0, 30]} to={[60, 30]} color="#16a34a" width={4} head={12} />
          <rect x="70" y="0" width="160" height="90" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="150" y="28" textAnchor="middle" fill="#15803d" fontSize={14} fontWeight="bold">
            {profitLabel}
          </text>
          <g transform="translate(135, 40)">
            <Coin x={0} y={0} size={30} />
          </g>
        </Pop>
      )}
      {step >= 4 && (
        <Pop x={490} y={65}>
          <Person {...CAST.Bea} mood="happy" size={130} />
          <text className="diagram-name" x={65} y={160} textAnchor="middle">
            Bea
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function LossDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Niska cena powoduje stratę"
      : lang === "de"
      ? "Niedriger Preis führt zu Verlust"
      : "Low price causes a loss";
  const priceTwo =
    lang === "pl" ? "Cena: 2 monety" : lang === "de" ? "Preis: 2 Münzen" : "Price: 2 coins";
  const costsThree =
    lang === "pl" ? "Koszty: 3 monety" : lang === "de" ? "Kosten: 3 Münzen" : "Costs: 3 coins";
  const lossText =
    lang === "pl" ? "1 moneta straty!" : lang === "de" ? "1 Münze Verlust!" : "1 coin loss!";
  const subText =
    lang === "pl" ? "Bea musi dopłacić" : lang === "de" ? "Bea muss draufzahlen" : "Bea must pay from jar";

  return (
    <DiagramCanvas label={label}>
      <Pop x={40} y={60}>
        <rect x="0" y="0" width="150" height="130" rx="12" fill="#fff" stroke="#23383f" strokeWidth="3" />
        <text x="75" y="30" textAnchor="middle" fill="#23383f" fontSize={14} fontWeight="bold">
          {priceTwo}
        </text>
        <g transform="translate(40, 50)">
          <Coin x={0} y={0} size={32} />
          <Coin x={32} y={0} size={32} />
        </g>
      </Pop>
      {step >= 2 && (
        <Pop x={230} y={60}>
          <rect x="0" y="0" width="170" height="130" rx="12" fill="#fee2e2" stroke="#d6403a" strokeWidth="3" />
          <text x="85" y="30" textAnchor="middle" fill="#991b1b" fontSize={14} fontWeight="bold">
            {costsThree}
          </text>
          <g transform="translate(35, 50)">
            <Coin x={0} y={0} size={30} />
            <Coin x={32} y={0} size={30} />
            <Coin x={64} y={0} size={30} />
          </g>
        </Pop>
      )}
      {step >= 3 && (
        <Pop x={440} y={60}>
          <rect x="0" y="0" width="160" height="130" rx="12" fill="#991b1b" />
          <text x="80" y="45" textAnchor="middle" fill="#ffffff" fontSize={16} fontWeight="bold">
            {lossText}
          </text>
          <text x="80" y="75" textAnchor="middle" fill="#fecaca" fontSize={13}>
            {subText}
          </text>
          <Person {...CAST.Bea} mood="sad" x={35} y={50} size={85} />
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function HealthyBusinessDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Zysk utrzymuje firmę przy życiu"
      : lang === "de"
      ? "Gewinn hält das Geschäft gesund"
      : "Profit keeps the business healthy";
  const formula =
    lang === "pl"
      ? "Przychód - Koszty = Zysk"
      : lang === "de"
      ? "Umsatz - Kosten = Gewinn"
      : "Sales - Costs = Profit";
  const line1 =
    lang === "pl"
      ? "Pokrywa czynsz piekarni i składniki"
      : lang === "de"
      ? "Zahlt Miete und Zutaten der Bäckerei"
      : "Covers bakery rent and ingredients";
  const line2 =
    lang === "pl"
      ? "Zostawia oszczędności dla Bei i rodziny"
      : lang === "de"
      ? "Bringt Ersparnisse für Bea und Familie"
      : "Leaves savings for Bea and family";

  return (
    <DiagramCanvas label={label}>
      <Pop x={50} y={70}>
        <Person {...CAST.Bea} mood="happy" size={130} />
        <text className="diagram-name" x={65} y={160} textAnchor="middle">
          Bea
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={220} y={70}>
          <rect x="0" y="0" width="370" height="130" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
          <text x="185" y="35" textAnchor="middle" fill="#23383f" fontSize={16} fontWeight="bold">
            {formula}
          </text>
          <text x="185" y="70" textAnchor="middle" fill="#475569" fontSize={14}>
            {line1}
          </text>
          <text x="185" y="100" textAnchor="middle" fill="#15803d" fontSize={14} fontWeight="bold">
            {line2}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}
