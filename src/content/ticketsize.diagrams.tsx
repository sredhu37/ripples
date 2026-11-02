import { CAST } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Bread, Person, Shoe } from "../components/icons";
import type { DiagramProps } from "../lesson/types";

export function MorningMarketDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Bea and Sam set up their market stalls" : "Bea und Sam bauen ihre Marktstände auf"}>
      <Pop x={80} y={60}>
        <Person {...CAST.Bea} size={120} />
        <text className="diagram-name" x={60} y={150} textAnchor="middle">
          Bea
        </text>
      </Pop>
      <Pop x={440} y={60}>
        <Person {...CAST.Sam} size={120} />
        <text className="diagram-name" x={60} y={150} textAnchor="middle">
          Sam
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={230} y={80}>
          <rect x="0" y="0" width="180" height="90" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
          <text x="90" y="38" textAnchor="middle" fill="#23383f" fontSize="15" fontWeight="bold">
            {en ? "Two different shops" : "Zwei verschiedene Läden"}
          </text>
          <text x="90" y="65" textAnchor="middle" fill="#64748b" fontSize="13">
            {en ? "Bread and boots" : "Brot und Stiefel"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function BeaRollsDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Bea sells rolls for 1 coin each" : "Bea verkauft Brötchen für je 1 Münze"}>
      <Pop x={50} y={60}>
        <Person {...CAST.Bea} size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Bea
        </text>
      </Pop>
      <Pop x={190} y={90}>
        <Bread x={0} y={0} size={50} />
        <text x="25" y="70" textAnchor="middle" fill="#23383f" fontSize="13" fontWeight="bold">
          1 {en ? "coin" : "Münze"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={290} y={60}>
          <Person {...CAST.Pip} size={90} x={0} y={10} />
          <Person {...CAST.Finn} size={90} x={70} y={10} />
          <Person {...CAST.Pim} size={90} x={140} y={10} />
          <text x="110" y="130" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">
            {en ? "30 customers line up" : "30 Kundinnen und Kunden"}
          </text>
        </Pop>
      )}
      {step >= 3 && (
        <Pop x={440} y={150}>
          <rect x="0" y="0" width="160" height="40" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="80" y="25" textAnchor="middle" fill="#15803d" fontSize="13" fontWeight="bold">
            {en ? "Total: 30 coins" : "Gesamt: 30 Münzen"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function SamBootsDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Sam sells one pair of boots for 30 coins" : "Sam verkauft ein Paar Stiefel für 30 Münzen"}>
      <Pop x={50} y={60}>
        <Person {...CAST.Sam} size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Sam
        </text>
      </Pop>
      <Pop x={190} y={80}>
        <Shoe x={0} y={0} size={65} />
        <text x="32" y="80" textAnchor="middle" fill="#23383f" fontSize="13" fontWeight="bold">
          30 {en ? "coins" : "Münzen"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={310} y={60}>
          <Person {...CAST.Moss} size={110} />
          <text className="diagram-name" x={55} y={140} textAnchor="middle">
            Moss
          </text>
        </Pop>
      )}
      {step >= 3 && (
        <Pop x={440} y={80}>
          <rect x="0" y="0" width="170" height="90" rx="12" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="85" y="38" textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="bold">
            {en ? "1 customer" : "1 Kunde"}
          </text>
          <text x="85" y="65" textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="bold">
            {en ? "Total: 30 coins" : "Gesamt: 30 Münzen"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function EqualEarningsDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Bea and Sam earned the same total sales" : "Bea und Sam erzielten denselben Umsatz"}>
      <Pop x={60} y={40}>
        <rect x="0" y="0" width="220" height="180" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="110" y="32" textAnchor="middle" fill="#23383f" fontSize="15" fontWeight="bold">
          Bea ({en ? "Baker" : "Bäckerei"})
        </text>
        <text x="110" y="65" textAnchor="middle" fill="#475569" fontSize="13">
          {en ? "30 rolls x 1 coin" : "30 Brötchen x 1 Münze"}
        </text>
        <rect x="30" y="90" width="160" height="40" rx="8" fill="#e0f2fe" />
        <text x="110" y="115" textAnchor="middle" fill="#0369a1" fontSize="15" fontWeight="bold">
          30 {en ? "coins" : "Münzen"}
        </text>
      </Pop>
      <Pop x={360} y={40}>
        <rect x="0" y="0" width="220" height="180" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="110" y="32" textAnchor="middle" fill="#23383f" fontSize="15" fontWeight="bold">
          Sam ({en ? "Shoemaker" : "Schuhmacher"})
        </text>
        <text x="110" y="65" textAnchor="middle" fill="#475569" fontSize="13">
          {en ? "1 boot x 30 coins" : "1 Stiefel x 30 Münzen"}
        </text>
        <rect x="30" y="90" width="160" height="40" rx="8" fill="#e0f2fe" />
        <text x="110" y="115" textAnchor="middle" fill="#0369a1" fontSize="15" fontWeight="bold">
          30 {en ? "coins" : "Münzen"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={250} y={100}>
          <circle cx="20" cy="20" r="26" fill="#e3a91a" />
          <text x="20" y="27" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold">
            =
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function TicketSizeConceptDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Ticket size and volume" : "Ticketgröße und Menge"}>
      <Pop x={60} y={50}>
        <rect x="0" y="0" width="230" height="160" rx="14" fill="#f8fafc" stroke="#38bdf8" strokeWidth="3" />
        <text x="115" y="35" textAnchor="middle" fill="#0369a1" fontSize="16" fontWeight="bold">
          {en ? "Ticket Size" : "Ticketgröße"}
        </text>
        <text x="115" y="70" textAnchor="middle" fill="#334155" fontSize="13">
          {en ? "Price of one sale" : "Preis eines einzelnen Verkaufs"}
        </text>
        <text x="115" y="105" textAnchor="middle" fill="#64748b" fontSize="13">
          {en ? "Small (1 coin) or Big (30)" : "Klein (1 Münze) oder Groß (30)"}
        </text>
      </Pop>
      <Pop x={350} y={50}>
        <rect x="0" y="0" width="230" height="160" rx="14" fill="#f8fafc" stroke="#16a34a" strokeWidth="3" />
        <text x="115" y="35" textAnchor="middle" fill="#15803d" fontSize="16" fontWeight="bold">
          {en ? "Volume" : "Menge"}
        </text>
        <text x="115" y="70" textAnchor="middle" fill="#334155" fontSize="13">
          {en ? "How many items sold" : "Wie viele Stücke verkauft werden"}
        </text>
        <text x="115" y="105" textAnchor="middle" fill="#64748b" fontSize="13">
          {en ? "High count vs low count" : "Viele Stücke oder wenige"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={230} y={180}>
          <rect x="0" y="0" width="180" height="40" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <text x="90" y="25" textAnchor="middle" fill="#23383f" fontSize="13" fontWeight="bold">
            {en ? "Size x Volume = Sales" : "Preis x Menge = Umsatz"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function BusinessChoiceDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Both business models can succeed" : "Beide Geschäftsmodelle können erfolgreich sein"}>
      <Pop x={80} y={50}>
        <rect x="0" y="0" width="480" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="240" y="40" textAnchor="middle" fill="#23383f" fontSize="16" fontWeight="bold">
          {en ? "Choosing Your Way" : "Die Wahl des Weges"}
        </text>
        <text x="240" y="80" textAnchor="middle" fill="#475569" fontSize="14">
          {en ? "Many small sales need lots of customers every hour" : "Viele kleine Verkäufe brauchen viele Kundinnen und Kunden"}
        </text>
        <text x="240" y="120" textAnchor="middle" fill="#475569" fontSize="14">
          {en ? "Big sales need patient craftsmanship and high quality" : "Große Verkäufe brauchen Geduld, Handwerk und hohe Qualität"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={220} y={180}>
          <rect x="0" y="0" width="200" height="40" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="100" y="25" textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="bold">
            {en ? "Both ways can work!" : "Beide Wege funktionieren!"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}
