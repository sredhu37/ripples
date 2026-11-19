import { CAST } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Person } from "../components/icons";
import type { DiagramProps } from "../lesson/types";

export function BootsIcon({ x = 0, y = 0, size = 60 }: { x?: number; y?: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 100})`}>
      <path
        d="M25 20 L55 20 L55 60 C55 65 60 70 70 70 L80 70 C85 70 90 75 90 80 L90 85 C90 90 85 95 80 95 L20 95 C15 95 10 90 10 85 L10 65 C10 40 25 25 25 20 Z"
        fill="#854d0e"
        stroke="#451a03"
        strokeWidth="3"
      />
      <line x1="15" y1="85" x2="85" y2="85" stroke="#1c1917" strokeWidth="4" />
      <circle cx="35" cy="40" r="3" fill="#fef08a" />
      <circle cx="35" cy="55" r="3" fill="#fef08a" />
    </g>
  );
}

export function HiddenBootsDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Sam robi nieprzemakalne skórzane buty"
      : lang === "de"
        ? "Sam macht wasserfeste Stiefel"
        : "Sam makes waterproof boots";
  const bootsText =
    lang === "pl"
      ? "Nieprzemakalne buty"
      : lang === "de"
        ? "Wasserfeste Stiefel"
        : "Waterproof boots";
  const puddleText =
    lang === "pl"
      ? "Suche stopy w kałużach!"
      : lang === "de"
        ? "Trockene Füße im Regen!"
        : "Dry feet in puddles!";
  const sturdyText =
    lang === "pl" ? "Solidne i ciepłe" : lang === "de" ? "Warm und reißfest" : "Sturdy and warm";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={60}>
        <Person {...CAST.Sam} size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Sam
        </text>
      </Pop>
      <Pop x={200} y={65}>
        <BootsIcon x={0} y={0} size={70} />
        <text x="35" y="85" textAnchor="middle" fill="#854d0e" fontSize="13" fontWeight="bold">
          {bootsText}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={330} y={70}>
          <rect
            x="0"
            y="0"
            width="220"
            height="90"
            rx="10"
            fill="#e0f2fe"
            stroke="#0284c7"
            strokeWidth="2"
          />
          <text x="110" y="35" textAnchor="middle" fill="#0369a1" fontSize={14} fontWeight="bold">
            {puddleText}
          </text>
          <text x="110" y="65" textAnchor="middle" fill="#0284c7" fontSize={12}>
            {sturdyText}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function EmptyShopDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Buty stoją na tylnej półce"
      : lang === "de"
        ? "Stiefel stehen im Regal"
        : "Boots sit on a back shelf";
  const workshopTitle =
    lang === "pl" ? "Cichy warsztat" : lang === "de" ? "Stille Werkstatt" : "Quiet Workshop";
  const noShoppers =
    lang === "pl"
      ? "Żaden klient nie zagląda"
      : lang === "de"
        ? "Keine Kunden kommen"
        : "Zero shoppers visit";
  const nobodyKnows =
    lang === "pl"
      ? "Nikt nie wie o ich istnieniu!"
      : lang === "de"
        ? "Niemand weiß davon!"
        : "Nobody knows they exist!";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={60}>
        <Person {...CAST.Sam} mood="think" size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Sam
        </text>
      </Pop>
      <Pop x={220} y={60}>
        <rect
          x="0"
          y="0"
          width="220"
          height="120"
          rx="12"
          fill="#f8fafc"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        <text x="110" y="35" textAnchor="middle" fill="#475569" fontSize={14} fontWeight="bold">
          {workshopTitle}
        </text>
        <text x="110" y="70" textAnchor="middle" fill="#64748b" fontSize={13}>
          {noShoppers}
        </text>
        <text x="110" y="95" textAnchor="middle" fill="#dc2626" fontSize={12} fontWeight="bold">
          {nobodyKnows}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={470} y={70}>
          <circle cx="45" cy="45" r="40" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
          <text x="45" y="52" textAnchor="middle" fill="#b91c1c" fontSize={28} fontWeight="bold">
            ?
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function HarborSignDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Sam maluje szyld w porcie"
      : lang === "de"
        ? "Sam malt ein Hafenschild"
        : "Sam paints a harbor sign";
  const signTitle =
    lang === "pl" ? "Szyld w porcie" : lang === "de" ? "Hafenschild" : "Harbor Sign";
  const keepDry =
    lang === "pl"
      ? "Suche stopy na morzu!"
      : lang === "de"
        ? "Trockene Füße auf See!"
        : "Keep feet dry at sea!";
  const line1 =
    lang === "pl" ? "Mówienie ludziom" : lang === "de" ? "Weitersagen" : "Telling people";
  const line2 =
    lang === "pl" ? "to marketing!" : lang === "de" ? "ist Marketing!" : "is marketing!";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={60}>
        <Person {...CAST.Sam} mood="happy" size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Sam
        </text>
      </Pop>
      <Pop x={200} y={50}>
        <rect
          x="0"
          y="0"
          width="220"
          height="140"
          rx="12"
          fill="#fef3c7"
          stroke="#f59e0b"
          strokeWidth="3"
        />
        <text x="110" y="35" textAnchor="middle" fill="#b45309" fontSize={14} fontWeight="bold">
          {signTitle}
        </text>
        <BootsIcon x={75} y={45} size={50} />
        <text x="110" y="115" textAnchor="middle" fill="#78350f" fontSize={12} fontWeight="bold">
          {keepDry}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={450} y={70}>
          <rect
            x="0"
            y="0"
            width="160"
            height="90"
            rx="10"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="2"
          />
          <text x="80" y="35" textAnchor="middle" fill="#15803d" fontSize={13} fontWeight="bold">
            {line1}
          </text>
          <text x="80" y="65" textAnchor="middle" fill="#166534" fontSize={15} fontWeight="bold">
            {line2}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function CoralWearingBootsDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Kapitan Coral testuje buty"
      : lang === "de"
        ? "Kapitän Coral testet die Stiefel"
        : "Captain Coral tests the boots";
  const deckTitle =
    lang === "pl"
      ? "Na mokrym pokładzie"
      : lang === "de"
        ? "Auf nassem Schiffsdeck"
        : "On the Wet Deck";
  const warmDry =
    lang === "pl"
      ? "Całkowicie ciepło i sucho!"
      : lang === "de"
        ? "Völlig warm und trocken!"
        : "Completely warm and dry!";
  const sailorsNotice =
    lang === "pl"
      ? "Marynarze widzą działanie"
      : lang === "de"
        ? "Seeleute sehen es"
        : "Sailors see it work";
  const showLine1 =
    lang === "pl" ? "Pokazywanie efektów" : lang === "de" ? "Zeigen im Alltag" : "Showing results";
  const showLine2 =
    lang === "pl" ? "to reklama!" : lang === "de" ? "ist Werbung!" : "is advertising!";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={60}>
        <Person {...CAST.Moss} mood="happy" size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Captain Coral
        </text>
      </Pop>
      <Pop x={220} y={60}>
        <rect
          x="0"
          y="0"
          width="200"
          height="110"
          rx="12"
          fill="#dbeafe"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <text x="100" y="35" textAnchor="middle" fill="#1d4ed8" fontSize={14} fontWeight="bold">
          {deckTitle}
        </text>
        <text x="100" y="65" textAnchor="middle" fill="#2563eb" fontSize={12}>
          {warmDry}
        </text>
        <text x="100" y="90" textAnchor="middle" fill="#1e40af" fontSize={11} fontWeight="bold">
          {sailorsNotice}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={450} y={70}>
          <rect
            x="0"
            y="0"
            width="160"
            height="90"
            rx="10"
            fill="#fef3c7"
            stroke="#f59e0b"
            strokeWidth="2"
          />
          <text x="80" y="35" textAnchor="middle" fill="#b45309" fontSize={13} fontWeight="bold">
            {showLine1}
          </text>
          <text x="80" y="65" textAnchor="middle" fill="#b45309" fontSize={14} fontWeight="bold">
            {showLine2}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function BusyWorkshopDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Marynarze przychodzą kupić buty"
      : lang === "de"
        ? "Seeleute kaufen Stiefel"
        : "Sailors arrive to buy boots";
  const busyCrafting =
    lang === "pl"
      ? "Praca wre przy szyciu"
      : lang === "de"
        ? "Stiefel fleißig genäht"
        : "Busy crafting boots";
  const sailorsTitle =
    lang === "pl"
      ? "8 zachwyconych marynarzy"
      : lang === "de"
        ? "8 begeisterte Seeleute"
        : "8 Excited Sailors";
  const wordSpread =
    lang === "pl"
      ? "Wiadomość obiegła całe miasto!"
      : lang === "de"
        ? "Die Botschaft hat sich verbreitet!"
        : "Word spread across town!";
  const goodFoundBuyers =
    lang === "pl"
      ? "Dobre buty znalazły nabywców!"
      : lang === "de"
        ? "Gute Stiefel finden Käufer!"
        : "Good boots found buyers!";

  return (
    <DiagramCanvas label={label}>
      <Pop x={50} y={50}>
        <rect
          x="0"
          y="0"
          width="220"
          height="160"
          rx="14"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="3"
        />
        <Person {...CAST.Sam} mood="happy" x={65} y={10} size={90} />
        <text className="diagram-name" x={110} y={115} textAnchor="middle">
          Sam
        </text>
        <rect x="30" y="125" width="160" height="25" rx="5" fill="#dcfce7" />
        <text x="110" y="142" textAnchor="middle" fill="#15803d" fontSize={11} fontWeight="bold">
          {busyCrafting}
        </text>
      </Pop>
      <Pop x={320} y={50}>
        <rect
          x="0"
          y="0"
          width="270"
          height="160"
          rx="14"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="3"
        />
        <text x="135" y="35" textAnchor="middle" fill="#23383f" fontSize={15} fontWeight="bold">
          {sailorsTitle}
        </text>
        <g transform="translate(25, 55)">
          <Person {...CAST.Pip} x={0} y={0} size={70} />
          <Person {...CAST.Luca} x={75} y={0} size={70} />
          <Person {...CAST.Finn} x={150} y={0} size={70} />
        </g>
        <text x="135" y="145" textAnchor="middle" fill="#16a34a" fontSize={12} fontWeight="bold">
          {wordSpread}
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
            fill="#e0f2fe"
            stroke="#0284c7"
            strokeWidth="2"
          />
          <text x="100" y="25" textAnchor="middle" fill="#0369a1" fontSize={13} fontWeight="bold">
            {goodFoundBuyers}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function TruthfulMarketingDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Rzetelny marketing pomaga każdemu"
      : lang === "de"
        ? "Ehrliches Marketing hilft allen"
        : "Truthful marketing helps everyone";
  const ruleTitle =
    lang === "pl"
      ? "Złota zasada marketingu"
      : lang === "de"
        ? "Die goldene Regel des Marketings"
        : "The Golden Rule of Marketing";
  const rule1 =
    lang === "pl"
      ? "Uczciwa reklama mówi klientom, co produkt naprawdę potrafi"
      : lang === "de"
        ? "Ehrliche Werbung sagt Kunden, was ein Produkt wirklich kann"
        : "Truthful ads tell customers what a product really does";
  const rule2 =
    lang === "pl"
      ? "Fałszywe obietnice niszczą zaufanie i są zakazane przez prawo"
      : lang === "de"
        ? "Falsche Versprechen zerstören Vertrauen und sind verboten"
        : "False promises destroy trust and are forbidden by law";
  const badge =
    lang === "pl"
      ? "Uczciwość buduje trwałe zaufanie!"
      : lang === "de"
        ? "Ehrlichkeit schafft Vertrauen!"
        : "Honesty builds lasting trust!";

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
          {ruleTitle}
        </text>
        <text x="240" y="80" textAnchor="middle" fill="#475569" fontSize={14}>
          {rule1}
        </text>
        <text x="240" y="120" textAnchor="middle" fill="#475569" fontSize={14}>
          {rule2}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={200} y={180}>
          <rect
            x="0"
            y="0"
            width="240"
            height="40"
            rx="8"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="2"
          />
          <text x="120" y="25" textAnchor="middle" fill="#15803d" fontSize={13} fontWeight="bold">
            {badge}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}
