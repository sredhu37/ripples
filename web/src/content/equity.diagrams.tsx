import { CAST, Villager } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Person } from "../components/icons";
import type { DiagramProps } from "../lesson/types";
import type { Lang } from "../progress";
import { IceCreamCart } from "./business.diagrams";

function txt(en: string, de: string, pl: string, lang: Lang): string {
  return lang === "pl" ? pl : lang === "de" ? de : en;
}

export function WafflePressIcon({
  x = 0,
  y = 0,
  size = 60,
}: {
  x?: number;
  y?: number;
  size?: number;
}) {
  const s = size / 60;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* Base */}
      <rect
        x="10"
        y="36"
        width="40"
        height="14"
        rx="4"
        fill="#475569"
        stroke="#1e293b"
        strokeWidth="2"
      />
      {/* Top iron lid */}
      <path d="M12 36 L30 14 L48 36 Z" fill="#64748b" stroke="#1e293b" strokeWidth="2" />
      {/* Handle */}
      <line x1="30" y1="14" x2="42" y2="8" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
      {/* Waffle grid lines */}
      <line x1="20" y1="36" x2="30" y2="24" stroke="#fef08a" strokeWidth="1.5" />
      <line x1="40" y1="36" x2="30" y2="24" stroke="#fef08a" strokeWidth="1.5" />
      {/* Steam lines */}
      <path
        d="M22 10 Q24 4 22 0 M32 10 Q34 4 32 0"
        stroke="#94a3b8"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

/** Beat 1: Finn studying at school */
export function FinnAtSchoolDiagram({ lang, step }: DiagramProps) {
  const label = txt(
    "Finn at school studying reading and numbers",
    "Finn in der Schule beim Lernen",
    "Finn w szkole uczy się czytania i liczb",
    lang,
  );
  return (
    <DiagramCanvas label={label}>
      <Villager who="Finn" x={80} y={60} size={130} name="Finn" />
      {step >= 2 && (
        <Pop x={280} y={70}>
          {/* School book desk */}
          <rect
            x="0"
            y="40"
            width="130"
            height="14"
            rx="4"
            fill="#a86f3c"
            stroke="#5a2f1a"
            strokeWidth="2"
          />
          <path d="M25 40 L60 20 L95 40 Z" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
          <line x1="60" y1="20" x2="60" y2="40" stroke="#334155" strokeWidth="2" />
          <text x="60" y="75" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
            1 + 2 = 3
          </text>
          <text x="60" y="95" textAnchor="middle" fontSize="12" fill="#64748b">
            {txt("School day", "Schultag", "Dzień w szkole", lang)}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 2: Leo scooping at town fountain; coins rolling in */
export function LeoAtFountainDiagram({ lang, step }: DiagramProps) {
  const label = txt(
    "Leo operating the cart at the fountain",
    "Leo bedient den Wagen am Brunnen",
    "Leo obsługuje wózek przy fontannie",
    lang,
  );
  return (
    <DiagramCanvas label={label}>
      <Pop x={40} y={60}>
        <IceCreamCart x={0} y={0} size={140} />
      </Pop>
      <Pop x={230} y={70}>
        <Person {...CAST.Leo} size={120} />
        <text className="diagram-name" x={60} y={150} textAnchor="middle">
          Leo ({txt("Employee", "Angestellter", "Pracownik", lang)})
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={380} y={70}>
          <rect
            x="0"
            y="0"
            width="120"
            height="120"
            rx="10"
            fill="#f0fdf4"
            stroke="#22c55e"
            strokeWidth="2"
          />
          <text x="60" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">
            {txt("Sales Coins", "Einnahmen", "Sprzedaż", lang)}
          </text>
          <circle cx="60" cy="70" r="22" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
          <text x="60" y="77" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#713f12">
            $$$
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 3: The cart is an ASSET earning PASSIVE INCOME */
export function ProductiveAssetDiagram({ lang, step }: DiagramProps) {
  const label = txt(
    "The cart is an asset generating passive income",
    "Der Wagen ist ein ertragreiches Vermögen",
    "Wózek to majątek dający dochód pasywny",
    lang,
  );
  const assetTag = txt("ASSET", "VERMÖGENSWERT", "MAJĄTEK", lang);
  const passiveTag = txt("PASSIVE INCOME", "PASSIVES EINKOMMEN", "DOCHÓD PASYWNY", lang);
  return (
    <DiagramCanvas label={label}>
      <Pop x={80} y={50}>
        <rect
          x="-10"
          y="-10"
          width="160"
          height="160"
          rx="12"
          fill="#eff6ff"
          stroke="#3b82f6"
          strokeWidth="3"
        />
        <IceCreamCart x={0} y={0} size={140} />
        <rect x="0" y="115" width="140" height="26" rx="13" fill="#2563eb" />
        <text x="70" y="132" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
          ★ {assetTag}
        </text>
      </Pop>

      {step >= 2 && (
        <Pop x={280} y={60}>
          <rect
            x="0"
            y="0"
            width="200"
            height="130"
            rx="10"
            fill="#ecfdf5"
            stroke="#10b981"
            strokeWidth="2"
          />
          <text x="100" y="32" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#065f46">
            ★ {passiveTag}
          </text>
          <text x="100" y="70" textAnchor="middle" fontSize="13" fill="#047857">
            {txt("Coins earned while", "Geld verdient, während", "Pieniądze zarobione,", lang)}
          </text>
          <text x="100" y="92" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#047857">
            {txt("Finn is studying!", "Finn lernt!", "gdy Finn się uczy!", lang)}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 4: Finn wants a waffle-cone iron (costs 10 coins) */
export function WaffleIronNeedDiagram({ lang, step }: DiagramProps) {
  const label = txt(
    "Finn wants a waffle iron costing 10 coins",
    "Finn wünscht sich ein Waffeleisen für 10 Münzen",
    "Finn potrzebuje gofrownicy za 10 monet",
    lang,
  );
  return (
    <DiagramCanvas label={label}>
      <Villager who="Finn" x={80} y={70} size={120} name="Finn" />
      <Pop x={240} y={60}>
        <rect
          x="0"
          y="0"
          width="130"
          height="140"
          rx="10"
          fill="#fffbeb"
          stroke="#f59e0b"
          strokeWidth="2"
        />
        <WafflePressIcon x={35} y={15} size={60} />
        <text x="65" y="95" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">
          {txt("Waffle Press", "Waffeleisen", "Gofrownica", lang)}
        </text>
        <text x="65" y="120" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#b45309">
          10 {txt("coins", "Münzen", "monet", lang)}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={400} y={80}>
          <circle cx="40" cy="40" r="35" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
          <text x="40" y="46" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#b91c1c">
            {txt("Need 10!", "Fehlen 10!", "Brak 10!", lang)}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 5: Mira arrives with 10 saved coins to become a CO-OWNER */
export function MiraPartnershipDiagram({ lang, step }: DiagramProps) {
  const label = txt(
    "Mira brings 10 coins to become a co-owner",
    "Mira bringt 10 Münzen als Mitinhaberin",
    "Mira wnosi 10 monet jako współwłaścicielka",
    lang,
  );
  const coOwnerTag = txt("CO-OWNER", "MITINHABERIN", "WSPÓŁWŁAŚCICIELKA", lang);
  return (
    <DiagramCanvas label={label}>
      <Villager who="Finn" x={60} y={70} size={120} name="Finn" />
      <Pop x={220} y={70}>
        <Person {...CAST.Mira} size={120} />
        <text className="diagram-name" x={60} y={150} textAnchor="middle">
          Mira
        </text>
        <rect x="-10" y="160" width="140" height="26" rx="13" fill="#ec4899" />
        <text x="60" y="177" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">
          ★ {coOwnerTag}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={380} y={80}>
          <rect
            x="0"
            y="0"
            width="110"
            height="90"
            rx="8"
            fill="#fefce8"
            stroke="#ca8a04"
            strokeWidth="2"
          />
          <text x="55" y="35" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#854d0e">
            {txt("Mira's Capital", "Miras Kapital", "Wkład Miry", lang)}
          </text>
          <text x="55" y="65" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#a16207">
            +10
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: The 50/50 Equity Share Pie */
export function EquityShareDiagram({ lang, step }: DiagramProps) {
  const label = txt(
    "The 50/50 equity pie: Finn and Mira each own a share",
    "Die 50/50-Beteiligung: Finn und Mira besitzen Anteile",
    "Podział udziałów 50/50: Finn i Mira mają po połowie",
    lang,
  );
  return (
    <DiagramCanvas label={label}>
      {/* 50/50 Pie Chart */}
      <Pop x={60} y={35}>
        <svg viewBox="0 0 160 160" width="160" height="160">
          <circle cx="80" cy="80" r="70" fill="#f8fafc" stroke="#23383f" strokeWidth="3" />
          {/* Left half: Finn 50% */}
          <path
            d="M80 80 L80 10 A70 70 0 0 0 80 150 Z"
            fill="#38bdf8"
            stroke="#23383f"
            strokeWidth="2"
          />
          {/* Right half: Mira 50% */}
          <path
            d="M80 80 L80 10 A70 70 0 0 1 80 150 Z"
            fill="#ec4899"
            stroke="#23383f"
            strokeWidth="2"
          />
          <text x="45" y="85" textAnchor="middle" fill="#0c4a6e" fontWeight="bold" fontSize="16">
            50%
          </text>
          <text x="115" y="85" textAnchor="middle" fill="#831843" fontWeight="bold" fontSize="16">
            50%
          </text>
        </svg>
      </Pop>

      {step >= 2 && (
        <Pop x={250} y={45}>
          <rect
            x="0"
            y="0"
            width="220"
            height="140"
            rx="10"
            fill="#f8fafc"
            stroke="#cbd5e1"
            strokeWidth="2"
          />
          <text x="110" y="30" textAnchor="middle" fontWeight="bold" fontSize="14" fill="#1e293b">
            ★ {txt("EQUITY SHARES", "GESCHÄFTSANTEILE", "UDZIAŁY W SPÓŁCE", lang)}
          </text>
          <text x="20" y="65" fontSize="13" fill="#0369a1" fontWeight="bold">
            • {txt("Finn: 50% ownership", "Finn: 50% Anteil", "Finn: 50% udziałów", lang)}
          </text>
          <text x="20" y="95" fontSize="13" fill="#be185d" fontWeight="bold">
            • {txt("Mira: 50% ownership", "Mira: 50% Anteil", "Mira: 50% udziałów", lang)}
          </text>
          <text x="110" y="125" textAnchor="middle" fontSize="12" fill="#64748b">
            {txt(
              "Partners in the business",
              "Partner im Unternehmen",
              "Wspólnicy w biznesie",
              lang,
            )}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 7: Waffle press installed; sweet smell and big crowds */
export function WaffleCrowdDiagram({ lang, step }: DiagramProps) {
  const label = txt(
    "Waffle press installed and crowd lines up",
    "Waffeleisen eingebaut und Kundenschlange wächst",
    "Zamontowana gofrownica i długa kolejka klientów",
    lang,
  );
  return (
    <DiagramCanvas label={label}>
      <Pop x={50} y={60}>
        <IceCreamCart x={0} y={0} size={140} />
        <WafflePressIcon x={105} y={10} size={50} />
      </Pop>
      {step >= 2 && (
        <Pop x={260} y={50}>
          <rect
            x="0"
            y="0"
            width="200"
            height="130"
            rx="10"
            fill="#fdf2f8"
            stroke="#f472b6"
            strokeWidth="2"
          />
          <text x="100" y="35" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9d174d">
            ✨ {txt("Sweet Vanilla Smell!", "Süßer Waffelduft!", "Zapach ciepłych gofrów!", lang)}
          </text>
          <text x="100" y="70" textAnchor="middle" fontSize="13" fill="#be185d">
            {txt("Lines around the corner!", "Schlangen um die Ecke!", "Kolejka za róg!", lang)}
          </text>
          <text x="100" y="105" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#047857">
            {txt("Sales doubled!", "Verkauf verdoppelt!", "Sprzedaż podwojona!", lang)}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 8: Equal Friday profit split: Finn 10, Mira 10 */
export function WeeklyProfitSplitDiagram({ lang, step }: DiagramProps) {
  const label = txt(
    "Friday profit split: equal shares for Finn and Mira",
    "Gewinnteilung am Freitag: gleiche Anteile für Finn und Mira",
    "Podział zysku w piątek: równe części dla Finna i Miry",
    lang,
  );
  return (
    <DiagramCanvas label={label}>
      <Pop x={20} y={40}>
        <rect
          x="0"
          y="0"
          width="130"
          height="150"
          rx="8"
          fill="#eff6ff"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <Person {...CAST.Finn} x={25} y={10} size={80} />
        <text x="65" y="110" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#1e40af">
          Finn (50%)
        </text>
        <text x="65" y="135" textAnchor="middle" fontWeight="bold" fontSize="18" fill="#2563eb">
          +10 {txt("coins", "Münzen", "monet", lang)}
        </text>
      </Pop>

      <Pop x={170} y={40}>
        <rect
          x="0"
          y="0"
          width="130"
          height="150"
          rx="8"
          fill="#fdf2f8"
          stroke="#ec4899"
          strokeWidth="2"
        />
        <Person {...CAST.Mira} x={25} y={10} size={80} />
        <text x="65" y="110" textAnchor="middle" fontWeight="bold" fontSize="13" fill="#9d174d">
          Mira (50%)
        </text>
        <text x="65" y="135" textAnchor="middle" fontWeight="bold" fontSize="18" fill="#db2777">
          +10 {txt("coins", "Münzen", "monet", lang)}
        </text>
      </Pop>

      {step >= 2 && (
        <Pop x={320} y={40}>
          <rect
            x="0"
            y="0"
            width="160"
            height="150"
            rx="8"
            fill="#f0fdf4"
            stroke="#22c55e"
            strokeWidth="2"
          />
          <text x="80" y="30" textAnchor="middle" fontWeight="bold" fontSize="14" fill="#166534">
            {txt("Total Profit", "Gesamtgewinn", "Cały zysk", lang)}
          </text>
          <text x="80" y="70" textAnchor="middle" fontWeight="bold" fontSize="32" fill="#15803d">
            20
          </text>
          <text x="80" y="105" textAnchor="middle" fontSize="12" fill="#166534">
            {txt(
              "Split by equity share!",
              "Geteilt nach Anteilen!",
              "Podzielony wg udziałów!",
              lang,
            )}
          </text>
          <text x="80" y="130" textAnchor="middle" fontSize="11" fill="#64748b">
            (50% + 50%)
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}
