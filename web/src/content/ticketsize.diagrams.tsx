import { CAST } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Bread, Person, Shoe } from "../components/icons";
import type { DiagramProps } from "../lesson/types";

export function MorningMarketDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Bea i Sam rozstawiają swoje stoiska na targu"
      : lang === "de"
        ? "Bea und Sam bauen ihre Marktstände auf"
        : "Bea and Sam set up their market stalls";
  const twoShops =
    lang === "pl"
      ? "Dwa różne sklepy"
      : lang === "de"
        ? "Zwei verschiedene Läden"
        : "Two different shops";
  const breadAndBoots =
    lang === "pl" ? "Chleb i buty" : lang === "de" ? "Brot und Stiefel" : "Bread and boots";

  return (
    <DiagramCanvas label={label}>
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
          <rect
            x="0"
            y="0"
            width="180"
            height="90"
            rx="12"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="3"
          />
          <text x="90" y="38" textAnchor="middle" fill="#23383f" fontSize={15} fontWeight="bold">
            {twoShops}
          </text>
          <text x="90" y="65" textAnchor="middle" fill="#64748b" fontSize={13}>
            {breadAndBoots}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function BeaRollsDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Bea sprzedaje bułki po 1 monecie za sztukę"
      : lang === "de"
        ? "Bea verkauft Brötchen für je 1 Münze"
        : "Bea sells rolls for 1 coin each";
  const oneCoin = lang === "pl" ? "1 moneta" : lang === "de" ? "1 Münze" : "1 coin";
  const queueText =
    lang === "pl"
      ? "30 klientów w kolejce"
      : lang === "de"
        ? "30 Kundinnen und Kunden"
        : "30 customers line up";
  const totalText =
    lang === "pl" ? "Razem: 30 monet" : lang === "de" ? "Gesamt: 30 Münzen" : "Total: 30 coins";

  return (
    <DiagramCanvas label={label}>
      <Pop x={50} y={60}>
        <Person {...CAST.Bea} size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Bea
        </text>
      </Pop>
      <Pop x={190} y={90}>
        <Bread x={0} y={0} size={50} />
        <text x="25" y="70" textAnchor="middle" fill="#23383f" fontSize={13} fontWeight="bold">
          {oneCoin}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={290} y={60}>
          <Person {...CAST.Pip} size={90} x={0} y={10} />
          <Person {...CAST.Finn} size={90} x={70} y={10} />
          <Person {...CAST.Pim} size={90} x={140} y={10} />
          <text x={110} y={130} textAnchor="middle" fill="#0369a1" fontSize={13} fontWeight="bold">
            {queueText}
          </text>
        </Pop>
      )}
      {step >= 3 && (
        <Pop x={440} y={150}>
          <rect
            x="0"
            y="0"
            width="160"
            height="40"
            rx="8"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="2"
          />
          <text x="80" y="25" textAnchor="middle" fill="#15803d" fontSize={13} fontWeight="bold">
            {totalText}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function SamBootsDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Sam sprzedaje parę butów za 30 monet"
      : lang === "de"
        ? "Sam verkauft ein Paar Stiefel für 30 Münzen"
        : "Sam sells one pair of boots for 30 coins";
  const thirtyCoins = lang === "pl" ? "30 monet" : lang === "de" ? "30 Münzen" : "30 coins";
  const oneCust = lang === "pl" ? "1 klient" : lang === "de" ? "1 Kunde" : "1 customer";
  const totalThirty =
    lang === "pl" ? "Razem: 30 monet" : lang === "de" ? "Gesamt: 30 Münzen" : "Total: 30 coins";

  return (
    <DiagramCanvas label={label}>
      <Pop x={50} y={60}>
        <Person {...CAST.Sam} size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Sam
        </text>
      </Pop>
      <Pop x={190} y={80}>
        <Shoe x={0} y={0} size={65} />
        <text x="32" y="80" textAnchor="middle" fill="#23383f" fontSize={13} fontWeight="bold">
          {thirtyCoins}
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
          <rect
            x="0"
            y="0"
            width="170"
            height="90"
            rx="12"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="2"
          />
          <text x="85" y="38" textAnchor="middle" fill="#15803d" fontSize={14} fontWeight="bold">
            {oneCust}
          </text>
          <text x="85" y="65" textAnchor="middle" fill="#15803d" fontSize={14} fontWeight="bold">
            {totalThirty}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function EqualEarningsDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Bea i Sam osiągnęli dokładnie taki sam przychód"
      : lang === "de"
        ? "Bea und Sam erzielten denselben Umsatz"
        : "Bea and Sam earned the same total sales";
  const beaRole = lang === "pl" ? "Piekarka" : lang === "de" ? "Bäckerei" : "Baker";
  const beaCalc =
    lang === "pl"
      ? "30 bułek x 1 moneta"
      : lang === "de"
        ? "30 Brötchen x 1 Münze"
        : "30 rolls x 1 coin";
  const samRole = lang === "pl" ? "Szewc" : lang === "de" ? "Schuhmacher" : "Shoemaker";
  const samCalc =
    lang === "pl"
      ? "1 para butów x 30 monet"
      : lang === "de"
        ? "1 Stiefel x 30 Münzen"
        : "1 boot x 30 coins";
  const coinsBadge = lang === "pl" ? "30 monet" : lang === "de" ? "30 Münzen" : "30 coins";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={40}>
        <rect
          x="0"
          y="0"
          width="220"
          height="180"
          rx="14"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="3"
        />
        <text x="110" y="32" textAnchor="middle" fill="#23383f" fontSize={15} fontWeight="bold">
          Bea ({beaRole})
        </text>
        <text x="110" y="65" textAnchor="middle" fill="#475569" fontSize={13}>
          {beaCalc}
        </text>
        <rect x="30" y="90" width="160" height="40" rx="8" fill="#e0f2fe" />
        <text x="110" y="115" textAnchor="middle" fill="#0369a1" fontSize={15} fontWeight="bold">
          {coinsBadge}
        </text>
      </Pop>
      <Pop x={360} y={40}>
        <rect
          x="0"
          y="0"
          width="220"
          height="180"
          rx="14"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="3"
        />
        <text x="110" y="32" textAnchor="middle" fill="#23383f" fontSize={15} fontWeight="bold">
          Sam ({samRole})
        </text>
        <text x="110" y="65" textAnchor="middle" fill="#475569" fontSize={13}>
          {samCalc}
        </text>
        <rect x="30" y="90" width="160" height="40" rx="8" fill="#e0f2fe" />
        <text x="110" y="115" textAnchor="middle" fill="#0369a1" fontSize={15} fontWeight="bold">
          {coinsBadge}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={250} y={100}>
          <circle cx="20" cy="20" r="26" fill="#e3a91a" />
          <text x="20" y="27" textAnchor="middle" fill="#fff" fontSize={20} fontWeight="bold">
            =
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function TicketSizeConceptDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Cena jednostkowa i liczba sztuk"
      : lang === "de"
        ? "Ticketgröße und Menge"
        : "Ticket size and volume";
  const titleLeft =
    lang === "pl" ? "Cena za sztukę" : lang === "de" ? "Ticketgröße" : "Ticket Size";
  const subLeft1 =
    lang === "pl"
      ? "Cena pojedynczej sprzedaży"
      : lang === "de"
        ? "Preis eines einzelnen Verkaufs"
        : "Price of one sale";
  const subLeft2 =
    lang === "pl"
      ? "Niska (1 moneta) lub wysoka (30)"
      : lang === "de"
        ? "Klein (1 Münze) oder Groß (30)"
        : "Small (1 coin) or Big (30)";

  const titleRight = lang === "pl" ? "Wolumen (Menge)" : lang === "de" ? "Menge" : "Volume";
  const subRight1 =
    lang === "pl"
      ? "Ile sztuk zostało sprzedanych"
      : lang === "de"
        ? "Wie viele Stücke verkauft werden"
        : "How many items sold";
  const subRight2 =
    lang === "pl"
      ? "Duża liczba kontra mała liczba"
      : lang === "de"
        ? "Viele Stücke oder wenige"
        : "High count vs low count";

  const formula =
    lang === "pl"
      ? "Cena x Ilość = Przychód"
      : lang === "de"
        ? "Preis x Menge = Umsatz"
        : "Size x Volume = Sales";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={50}>
        <rect
          x="0"
          y="0"
          width="230"
          height="160"
          rx="14"
          fill="#f8fafc"
          stroke="#38bdf8"
          strokeWidth="3"
        />
        <text x="115" y="35" textAnchor="middle" fill="#0369a1" fontSize={16} fontWeight="bold">
          {titleLeft}
        </text>
        <text x="115" y="70" textAnchor="middle" fill="#334155" fontSize={13}>
          {subLeft1}
        </text>
        <text x="115" y="105" textAnchor="middle" fill="#64748b" fontSize={13}>
          {subLeft2}
        </text>
      </Pop>
      <Pop x={350} y={50}>
        <rect
          x="0"
          y="0"
          width="230"
          height="160"
          rx="14"
          fill="#f8fafc"
          stroke="#16a34a"
          strokeWidth="3"
        />
        <text x="115" y="35" textAnchor="middle" fill="#15803d" fontSize={16} fontWeight="bold">
          {titleRight}
        </text>
        <text x="115" y="70" textAnchor="middle" fill="#334155" fontSize={13}>
          {subRight1}
        </text>
        <text x="115" y="105" textAnchor="middle" fill="#64748b" fontSize={13}>
          {subRight2}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={230} y={180}>
          <rect
            x="0"
            y="0"
            width="180"
            height="40"
            rx="8"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          <text x="90" y="25" textAnchor="middle" fill="#23383f" fontSize={13} fontWeight="bold">
            {formula}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function BusinessChoiceDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Oba modele biznesowe mogą odnieść sukces"
      : lang === "de"
        ? "Beide Geschäftsmodelle können erfolgreich sein"
        : "Both business models can succeed";
  const mainTitle =
    lang === "pl"
      ? "Wybór Twojej drogi"
      : lang === "de"
        ? "Die Wahl des Weges"
        : "Choosing Your Way";
  const line1 =
    lang === "pl"
      ? "Wiele małych sprzedaży wymaga rzeszy klientów co godzinę"
      : lang === "de"
        ? "Viele kleine Verkäufe brauchen viele Kundinnen und Kunden"
        : "Many small sales need lots of customers every hour";
  const line2 =
    lang === "pl"
      ? "Drogie produkty wymagają cierpliwości, kunsztu i wysokiej jakości"
      : lang === "de"
        ? "Große Preise brauchen Geduld, Handwerk und hohe Qualität"
        : "Big sales need patient craftsmanship and high quality";
  const outcome =
    lang === "pl"
      ? "Oba sposoby działają!"
      : lang === "de"
        ? "Beide Wege funktionieren!"
        : "Both ways can work!";

  return (
    <DiagramCanvas label={label}>
      <Pop x={80} y={50}>
        <rect
          x="0"
          y="0"
          width="480"
          height="160"
          rx="14"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="3"
        />
        <text x="240" y="40" textAnchor="middle" fill="#23383f" fontSize={16} fontWeight="bold">
          {mainTitle}
        </text>
        <text x="240" y="80" textAnchor="middle" fill="#475569" fontSize={14}>
          {line1}
        </text>
        <text x="240" y="120" textAnchor="middle" fill="#475569" fontSize={14}>
          {line2}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={220} y={180}>
          <rect
            x="0"
            y="0"
            width="200"
            height="40"
            rx="8"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="2"
          />
          <text x="100" y="25" textAnchor="middle" fill="#15803d" fontSize={14} fontWeight="bold">
            {outcome}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}
