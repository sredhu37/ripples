import { CAST } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Bread, Person } from "../components/icons";
import type { DiagramProps } from "../lesson/types";

export function BeaAloneDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Bea pracuje sama w piekarni"
      : lang === "de"
        ? "Bea arbeitet allein in der Backstube"
        : "Bea works alone in the bakery";
  const loavesDay =
    lang === "pl" ? "4 bochenki dziennie" : lang === "de" ? "4 Brote pro Tag" : "4 loaves per day";
  const capacityTitle =
    lang === "pl"
      ? "Maksymalna wydajność"
      : lang === "de"
        ? "Volle Auslastung"
        : "Working at Capacity";
  const queueWaits =
    lang === "pl"
      ? "Zbyt wielu klientów czeka"
      : lang === "de"
        ? "Zu viele Kunden warten"
        : "Too many customers wait";
  const needsHelp =
    lang === "pl"
      ? "Bea potrzebuje pomocy!"
      : lang === "de"
        ? "Bea braucht Hilfe!"
        : "Bea needs help!";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={60}>
        <Person {...CAST.Bea} size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Bea
        </text>
      </Pop>
      <Pop x={220} y={65}>
        <Bread x={0} y={0} size={70} />
        <text x="35" y="85" textAnchor="middle" fill="#854d0e" fontSize="13" fontWeight="bold">
          {loavesDay}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={380} y={60}>
          <rect
            x="0"
            y="0"
            width="200"
            height="110"
            rx="12"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          <text x="100" y="35" textAnchor="middle" fill="#334155" fontSize={14} fontWeight="bold">
            {capacityTitle}
          </text>
          <text x="100" y="65" textAnchor="middle" fill="#64748b" fontSize={12}>
            {queueWaits}
          </text>
          <text x="100" y="90" textAnchor="middle" fill="#0284c7" fontSize={11} fontWeight="bold">
            {needsHelp}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function BeaHiresLeoDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl" ? "Bea zatrudnia Leo" : lang === "de" ? "Bea stellt Leo ein" : "Bea hires Leo";
  const hiresTitle =
    lang === "pl"
      ? "Bea postanawia zatrudnić"
      : lang === "de"
        ? "Bea stellt Leo ein"
        : "Bea decides to hire";
  const newCapacity =
    lang === "pl"
      ? "Wydajność: 8 bochenków dziennie"
      : lang === "de"
        ? "Kapazität: 8 Brote täglich"
        : "Capacity: 8 loaves daily";
  const guaranteedWage =
    lang === "pl"
      ? "Gwarantowana płaca: 5 monet"
      : lang === "de"
        ? "Festes Gehalt: 5 Münzen"
        : "Guaranteed Wage: 5 coins";

  return (
    <DiagramCanvas label={label}>
      <Pop x={50} y={60}>
        <Person {...CAST.Bea} mood="happy" size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Bea
        </text>
      </Pop>
      <Pop x={450} y={60}>
        <Person {...CAST.Leo} mood="happy" size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Leo
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={200} y={55}>
          <rect
            x="0"
            y="0"
            width="220"
            height="130"
            rx="12"
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="2"
          />
          <text x="110" y="35" textAnchor="middle" fill="#15803d" fontSize={14} fontWeight="bold">
            {hiresTitle}
          </text>
          <text x="110" y="65" textAnchor="middle" fill="#166534" fontSize={12}>
            {newCapacity}
          </text>
          <rect x="25" y="80" width="170" height="30" rx="6" fill="#ffffff" />
          <text x="110" y="100" textAnchor="middle" fill="#15803d" fontSize={12} fontWeight="bold">
            {guaranteedWage}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function SunnyDayBusyDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Słoneczny dzień: duża sprzedaż i zysk"
      : lang === "de"
        ? "Sonniger Tag: Viele Verkäufe und Gewinn"
        : "Sunny day: big sales and profit";
  const sunnyMorning =
    lang === "pl"
      ? "Słoneczny poranek (8 bochenków)"
      : lang === "de"
        ? "Sonniger Morgen (8 Brote)"
        : "Sunny Morning (8 Loaves)";
  const allSold =
    lang === "pl"
      ? "Wszystkie 8 bochenków sprzedane!"
      : lang === "de"
        ? "Alle 8 Brote verkauft!"
        : "All 8 loaves sold!";
  const ledgerTitle =
    lang === "pl"
      ? "Księga w słoneczny dzień"
      : lang === "de"
        ? "Kasse am Sonnentag"
        : "Sunny Day Ledger";
  const coinsLabel = lang === "pl" ? "monet" : lang === "de" ? "Münzen" : "coins";
  const salesLine =
    lang === "pl"
      ? `Sprzedaż (8 bochenków): +32 ${coinsLabel}`
      : lang === "de"
        ? `Umsatz (8 Brote): +32 ${coinsLabel}`
        : `Sales (8 loaves): +32 ${coinsLabel}`;
  const costsLine =
    lang === "pl"
      ? `Mąka i drewno: -16 ${coinsLabel}`
      : lang === "de"
        ? `Mehl & Holz: -16 ${coinsLabel}`
        : `Flour & wood: -16 ${coinsLabel}`;
  const wageLine =
    lang === "pl"
      ? `Płaca Leo: -5 ${coinsLabel}`
      : lang === "de"
        ? `Leos Gehalt: -5 ${coinsLabel}`
        : `Leo's wage: -5 ${coinsLabel}`;
  const profitLine =
    lang === "pl"
      ? `Zysk netto: +11 ${coinsLabel}!`
      : lang === "de"
        ? `Reingewinn: +11 ${coinsLabel}!`
        : `Net profit: +11 ${coinsLabel}!`;
  const wagePaidEasy =
    lang === "pl"
      ? "Płaca Leo łatwo pokryta!"
      : lang === "de"
        ? "Leos Lohn locker gedeckt!"
        : "Leo's wage easily paid!";

  return (
    <DiagramCanvas label={label}>
      <Pop x={50} y={50}>
        <rect
          x="0"
          y="0"
          width="230"
          height="160"
          rx="14"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="3"
        />
        <text x="115" y="30" textAnchor="middle" fill="#23383f" fontSize={14} fontWeight="bold">
          {sunnyMorning}
        </text>
        <g transform="translate(25, 45)">
          <Person {...CAST.Bea} size={70} x={10} y={0} />
          <Person {...CAST.Leo} size={70} x={90} y={0} />
        </g>
        <text x="115" y="145" textAnchor="middle" fill="#15803d" fontSize={12} fontWeight="bold">
          {allSold}
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
        <text x="135" y="30" textAnchor="middle" fill="#23383f" fontSize={14} fontWeight="bold">
          {ledgerTitle}
        </text>
        <text x="30" y="65" fill="#1e40af" fontSize={12}>
          {salesLine}
        </text>
        <text x="30" y="90" fill="#991b1b" fontSize={12}>
          {costsLine}
        </text>
        <text x="30" y="115" fill="#991b1b" fontSize={12}>
          {wageLine}
        </text>
        <text x="30" y="145" fill="#15803d" fontSize={13} fontWeight="bold">
          {profitLine}
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
            fill="#dcfce7"
            stroke="#16a34a"
            strokeWidth="2"
          />
          <text x="90" y="25" textAnchor="middle" fill="#15803d" fontSize={12} fontWeight="bold">
            {wagePaidEasy}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function StormyDayQuietDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Burzowy dzień: deszcz i puste uliczki"
      : lang === "de"
        ? "Stürmischer Tag: Regen und leere Straßen"
        : "Stormy day: rain and quiet square";
  const rainTitle =
    lang === "pl"
      ? "Ulewny deszcz i wiatr"
      : lang === "de"
        ? "Starker Regen und Wind"
        : "Heavy Rain & Wind";
  const onlyTwoSold =
    lang === "pl"
      ? "Sprzedano tylko 2 bochenki"
      : lang === "de"
        ? "Nur 2 Brote verkauft"
        : "Only 2 loaves sold";
  const ledgerTitle =
    lang === "pl"
      ? "Księga w deszczowy dzień"
      : lang === "de"
        ? "Kasse am Regentag"
        : "Stormy Day Ledger";
  const coinsLabel = lang === "pl" ? "monet" : lang === "de" ? "Münzen" : "coins";
  const salesLine =
    lang === "pl"
      ? `Sprzedaż (2 bochenki): +8 ${coinsLabel}`
      : lang === "de"
        ? `Umsatz (2 Brote): +8 ${coinsLabel}`
        : `Sales (2 loaves): +8 ${coinsLabel}`;
  const costsLine =
    lang === "pl"
      ? `Mąka i drewno: -4 ${coinsLabel}`
      : lang === "de"
        ? `Mehl & Holz: -4 ${coinsLabel}`
        : `Flour & wood: -4 ${coinsLabel}`;
  const wageLine =
    lang === "pl"
      ? `Płaca Leo: -5 ${coinsLabel}`
      : lang === "de"
        ? `Leos Gehalt: -5 ${coinsLabel}`
        : `Leo's wage: -5 ${coinsLabel}`;
  const lossLine =
    lang === "pl"
      ? `Wynik netto: -1 ${coinsLabel} (strata)`
      : lang === "de"
        ? `Reingewinn: -1 ${coinsLabel} (Verlust)`
        : `Net profit: -1 ${coinsLabel} (Loss)`;
  const wageNotCovered =
    lang === "pl"
      ? "Sprzedaż nie pokrywa płacy"
      : lang === "de"
        ? "Umsatz deckt Lohn nicht"
        : "Sales do not cover wage";

  return (
    <DiagramCanvas label={label}>
      <Pop x={50} y={50}>
        <rect
          x="0"
          y="0"
          width="240"
          height="160"
          rx="14"
          fill="#f8fafc"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        <text x="120" y="30" textAnchor="middle" fill="#334155" fontSize={14} fontWeight="bold">
          {rainTitle}
        </text>
        <g transform="translate(30, 45)">
          <Person {...CAST.Bea} mood="think" size={70} x={10} y={0} />
          <Person {...CAST.Leo} size={70} x={90} y={0} />
        </g>
        <text x="120" y="145" textAnchor="middle" fill="#dc2626" fontSize={12} fontWeight="bold">
          {onlyTwoSold}
        </text>
      </Pop>
      <Pop x={330} y={50}>
        <rect
          x="0"
          y="0"
          width="260"
          height="160"
          rx="14"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="3"
        />
        <text x="130" y="30" textAnchor="middle" fill="#23383f" fontSize={14} fontWeight="bold">
          {ledgerTitle}
        </text>
        <text x="25" y="65" fill="#1e40af" fontSize={12}>
          {salesLine}
        </text>
        <text x="25" y="90" fill="#991b1b" fontSize={12}>
          {costsLine}
        </text>
        <text x="25" y="115" fill="#991b1b" fontSize={12}>
          {wageLine}
        </text>
        <text x="25" y="145" fill="#dc2626" fontSize={13} fontWeight="bold">
          {lossLine}
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
            fill="#fee2e2"
            stroke="#ef4444"
            strokeWidth="2"
          />
          <text x="90" y="25" textAnchor="middle" fill="#b91c1c" fontSize={12} fontWeight="bold">
            {wageNotCovered}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function RiskAndWageDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Gwarantowana płaca to ryzyko przedsiębiorcy"
      : lang === "de"
        ? "Fester Lohn bedeutet unternehmerisches Risiko"
        : "Guaranteed wage is business risk";
  const workedFull =
    lang === "pl"
      ? "Leo przepracował całą zmianę"
      : lang === "de"
        ? "Leo hat voll gearbeitet"
        : "Leo worked his full shift";
  const mustPay =
    lang === "pl"
      ? "Płaca musi zostać wypłacona!"
      : lang === "de"
        ? "Gehalt muss gezahlt werden!"
        : "Wage must be paid!";
  const workerPaidTime =
    lang === "pl"
      ? "Pracownik otrzymuje płacę za czas,"
      : lang === "de"
        ? "Arbeiter erhalten Lohn für Zeit,"
        : "A worker is paid for time,";
  const notForTraffic =
    lang === "pl"
      ? "a nie za ruch klientów na ulicy."
      : lang === "de"
        ? "nicht nach Kundenandrang."
        : "not for shop sales.";
  const riskTitle =
    lang === "pl"
      ? "To jest ryzyko gospodarcze."
      : lang === "de"
        ? "Das ist das Geschäftsrisiko."
        : "This is business risk.";
  const relyOnWage =
    lang === "pl"
      ? "Pracownicy polegają na swojej pensji"
      : lang === "de"
        ? "Arbeiter verlassen sich darauf"
        : "Workers rely on their wage";

  return (
    <DiagramCanvas label={label}>
      <Pop x={60} y={50}>
        <rect
          x="0"
          y="0"
          width="240"
          height="160"
          rx="14"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="3"
        />
        <Person {...CAST.Leo} mood="happy" x={75} y={10} size={90} />
        <text className="diagram-name" x={120} y={115} textAnchor="middle">
          Leo
        </text>
        <rect x="25" y="125" width="190" height="25" rx="5" fill="#dcfce7" />
        <text x="120" y="142" textAnchor="middle" fill="#15803d" fontSize={11} fontWeight="bold">
          {workedFull}
        </text>
      </Pop>
      <Pop x={340} y={50}>
        <rect
          x="0"
          y="0"
          width="240"
          height="160"
          rx="14"
          fill="#ffffff"
          stroke="#cbd5e1"
          strokeWidth="3"
        />
        <rect
          x="20"
          y="20"
          width="200"
          height="40"
          rx="8"
          fill="#fef3c7"
          stroke="#f59e0b"
          strokeWidth="2"
        />
        <text x="120" y="45" textAnchor="middle" fill="#b45309" fontSize={13} fontWeight="bold">
          {mustPay}
        </text>
        <text x="120" y="90" textAnchor="middle" fill="#475569" fontSize={12}>
          {workerPaidTime}
        </text>
        <text x="120" y="115" textAnchor="middle" fill="#475569" fontSize={12}>
          {notForTraffic}
        </text>
        <text x="120" y="145" textAnchor="middle" fill="#dc2626" fontSize={12} fontWeight="bold">
          {riskTitle}
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
            fill="#e0f2fe"
            stroke="#0284c7"
            strokeWidth="2"
          />
          <text x="90" y="25" textAnchor="middle" fill="#0369a1" fontSize={12} fontWeight="bold">
            {relyOnWage}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function EmergencyReserveDiagram({ lang, step }: DiagramProps) {
  const label =
    lang === "pl"
      ? "Bea trzyma słoik z rezerwą awaryjną"
      : lang === "de"
        ? "Bea hat ein Notfall-Münzglas"
        : "Bea keeps an emergency reserve jar";
  const jarTitle =
    lang === "pl"
      ? "Słoik z rezerwą awaryjną"
      : lang === "de"
        ? "Das Notfall-Sparschwein"
        : "The Emergency Reserve Jar";
  const sunnyRule =
    lang === "pl"
      ? "W słoneczne dni: odkładaj dodatkowe zyski na rezerwę"
      : lang === "de"
        ? "An sonnigen Tagen: Extragewinne zur Seite legen"
        : "On sunny days: save extra profits into the reserve";
  const stormyRule =
    lang === "pl"
      ? "W burzowe dni: płać pensje z rezerwy, aby zachować spokój"
      : lang === "de"
        ? "An Regentagen: Gehälter aus Rücklagen zahlen"
        : "On stormy days: pay wages from the reserve to stay safe";
  const badge =
    lang === "pl"
      ? "Rezerwy chronią firmę!"
      : lang === "de"
        ? "Rücklagen schützen das Geschäft!"
        : "Reserves protect the business!";

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
          {jarTitle}
        </text>
        <text x="240" y="80" textAnchor="middle" fill="#475569" fontSize={14}>
          {sunnyRule}
        </text>
        <text x="240" y="120" textAnchor="middle" fill="#475569" fontSize={14}>
          {stormyRule}
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
