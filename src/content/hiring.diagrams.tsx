import { CAST } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Bread, Person } from "../components/icons";
import type { DiagramProps } from "../lesson/types";

export function BeaAloneDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Bea works alone in the bakery" : "Bea arbeitet allein in der Backstube"}>
      <Pop x={60} y={60}>
        <Person {...CAST.Bea} size={110} />
        <text className="diagram-name" x={55} y={140} textAnchor="middle">
          Bea
        </text>
      </Pop>
      <Pop x={220} y={65}>
        <Bread x={0} y={0} size={70} />
        <text x="35" y="85" textAnchor="middle" fill="#854d0e" fontSize="13" fontWeight="bold">
          {en ? "4 loaves per day" : "4 Brote pro Tag"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={380} y={60}>
          <rect x="0" y="0" width="200" height="110" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <text x="100" y="35" textAnchor="middle" fill="#334155" fontSize="14" fontWeight="bold">
            {en ? "Working at Capacity" : "Volle Auslastung"}
          </text>
          <text x="100" y="65" textAnchor="middle" fill="#64748b" fontSize="12">
            {en ? "Too many customers wait" : "Zu viele Kunden warten"}
          </text>
          <text x="100" y="90" textAnchor="middle" fill="#0284c7" fontSize="11" fontWeight="bold">
            {en ? "Bea needs help!" : "Bea braucht Hilfe!"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function BeaHiresLeoDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Bea hires Leo" : "Bea stellt Leo ein"}>
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
          <rect x="0" y="0" width="220" height="130" rx="12" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="110" y="35" textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="bold">
            {en ? "Bea decides to hire" : "Bea stellt Leo ein"}
          </text>
          <text x="110" y="65" textAnchor="middle" fill="#166534" fontSize="12">
            {en ? "Capacity: 8 loaves daily" : "Kapazität: 8 Brote täglich"}
          </text>
          <rect x="25" y="80" width="170" height="30" rx="6" fill="#ffffff" />
          <text x="110" y="100" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">
            {en ? "Guaranteed Wage: 5 coins" : "Festes Gehalt: 5 Münzen"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function SunnyDayBusyDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Sunny day: big sales and profit" : "Sonniger Tag: Viele Verkäufe und Gewinn"}>
      <Pop x={50} y={50}>
        <rect x="0" y="0" width="230" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="115" y="30" textAnchor="middle" fill="#23383f" fontSize="14" fontWeight="bold">
          {en ? "Sunny Morning (8 Loaves)" : "Sonniger Morgen (8 Brote)"}
        </text>
        <g transform="translate(25, 45)">
          <Person {...CAST.Bea} size={70} x={10} y={0} />
          <Person {...CAST.Leo} size={70} x={90} y={0} />
        </g>
        <text x="115" y="145" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">
          {en ? "All 8 loaves sold!" : "Alle 8 Brote verkauft!"}
        </text>
      </Pop>
      <Pop x={320} y={50}>
        <rect x="0" y="0" width="270" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="135" y="30" textAnchor="middle" fill="#23383f" fontSize="14" fontWeight="bold">
          {en ? "Sunny Day Ledger" : "Kasse am Sonnentag"}
        </text>
        <text x="30" y="65" fill="#1e40af" fontSize="12">
          {en ? "Sales (8 loaves): +32 coins" : "Umsatz (8 Brote): +32 Münzen"}
        </text>
        <text x="30" y="90" fill="#991b1b" fontSize="12">
          {en ? "Flour & wood: -16 coins" : "Mehl & Holz: -16 Münzen"}
        </text>
        <text x="30" y="115" fill="#991b1b" fontSize="12">
          {en ? "Leo's wage: -5 coins" : "Leos Gehalt: -5 Münzen"}
        </text>
        <text x="30" y="145" fill="#15803d" fontSize="13" fontWeight="bold">
          {en ? "Net profit: +11 coins!" : "Reingewinn: +11 Münzen!"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={230} y={180}>
          <rect x="0" y="0" width="180" height="40" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="90" y="25" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">
            {en ? "Leo's wage easily paid!" : "Leos Lohn locker gedeckt!"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function StormyDayQuietDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Stormy day: rain and quiet square" : "Stürmischer Tag: Regen und leere Straßen"}>
      <Pop x={50} y={50}>
        <rect x="0" y="0" width="240" height="160" rx="14" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
        <text x="120" y="30" textAnchor="middle" fill="#334155" fontSize="14" fontWeight="bold">
          {en ? "Heavy Rain & Wind" : "Starker Regen und Wind"}
        </text>
        <g transform="translate(30, 45)">
          <Person {...CAST.Bea} mood="think" size={70} x={10} y={0} />
          <Person {...CAST.Leo} size={70} x={90} y={0} />
        </g>
        <text x="120" y="145" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="bold">
          {en ? "Only 2 loaves sold" : "Nur 2 Brote verkauft"}
        </text>
      </Pop>
      <Pop x={330} y={50}>
        <rect x="0" y="0" width="260" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="130" y="30" textAnchor="middle" fill="#23383f" fontSize="14" fontWeight="bold">
          {en ? "Stormy Day Ledger" : "Kasse am Regentag"}
        </text>
        <text x="25" y="65" fill="#1e40af" fontSize="12">
          {en ? "Sales (2 loaves): +8 coins" : "Umsatz (2 Brote): +8 Münzen"}
        </text>
        <text x="25" y="90" fill="#991b1b" fontSize="12">
          {en ? "Flour & wood: -4 coins" : "Mehl & Holz: -4 Münzen"}
        </text>
        <text x="25" y="115" fill="#991b1b" fontSize="12">
          {en ? "Leo's wage: -5 coins" : "Leos Gehalt: -5 Münzen"}
        </text>
        <text x="25" y="145" fill="#dc2626" fontSize="13" fontWeight="bold">
          {en ? "Net profit: -1 coin (Loss)" : "Reingewinn: -1 Münze (Verlust)"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={230} y={180}>
          <rect x="0" y="0" width="180" height="40" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
          <text x="90" y="25" textAnchor="middle" fill="#b91c1c" fontSize="12" fontWeight="bold">
            {en ? "Sales do not cover wage" : "Umsatz deckt Lohn nicht"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function RiskAndWageDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Guaranteed wage is business risk" : "Fester Lohn bedeutet unternehmerisches Risiko"}>
      <Pop x={60} y={50}>
        <rect x="0" y="0" width="240" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <Person {...CAST.Leo} mood="happy" x={75} y={10} size={90} />
        <text className="diagram-name" x={120} y={115} textAnchor="middle">
          Leo
        </text>
        <rect x="25" y="125" width="190" height="25" rx="5" fill="#dcfce7" />
        <text x="120" y="142" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
          {en ? "Leo worked his full shift" : "Leo hat voll gearbeitet"}
        </text>
      </Pop>
      <Pop x={340} y={50}>
        <rect x="0" y="0" width="240" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <rect x="20" y="20" width="200" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="120" y="45" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="bold">
          {en ? "Wage must be paid!" : "Gehalt muss gezahlt werden!"}
        </text>
        <text x="120" y="90" textAnchor="middle" fill="#475569" fontSize="12">
          {en ? "A worker is paid for time," : "Arbeiter erhalten Lohn für Zeit,"}
        </text>
        <text x="120" y="115" textAnchor="middle" fill="#475569" fontSize="12">
          {en ? "not for shop sales." : "nicht nach Kundenandrang."}
        </text>
        <text x="120" y="145" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="bold">
          {en ? "This is business risk." : "Das ist das Geschäftsrisiko."}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={230} y={180}>
          <rect x="0" y="0" width="180" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x="90" y="25" textAnchor="middle" fill="#0369a1" fontSize="12" fontWeight="bold">
            {en ? "Workers rely on their wage" : "Arbeiter verlassen sich darauf"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

export function EmergencyReserveDiagram({ lang, step }: DiagramProps) {
  const en = lang === "en";
  return (
    <DiagramCanvas label={en ? "Bea keeps an emergency reserve jar" : "Bea hat ein Notfall-Münzglas"}>
      <Pop x={80} y={50}>
        <rect x="0" y="0" width="480" height="160" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
        <text x="240" y="40" textAnchor="middle" fill="#23383f" fontSize="16" fontWeight="bold">
          {en ? "The Emergency Reserve Jar" : "Das Notfall-Sparschwein"}
        </text>
        <text x="240" y="80" textAnchor="middle" fill="#475569" fontSize="14">
          {en ? "On sunny days: save extra profits into the reserve" : "An sonnigen Tagen: Extragewinne zur Seite legen"}
        </text>
        <text x="240" y="120" textAnchor="middle" fill="#475569" fontSize="14">
          {en ? "On stormy days: pay wages from the reserve to stay safe" : "An Regentagen: Gehälter aus Rücklagen zahlen"}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={200} y={180}>
          <rect x="0" y="0" width="240" height="40" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
          <text x="120" y="25" textAnchor="middle" fill="#15803d" fontSize="13" fontWeight="bold">
            {en ? "Reserves protect the business!" : "Rücklagen schützen das Geschäft!"}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}
