import { CAST, Villager } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Person } from "../components/icons";
import type { DiagramProps } from "../lesson/types";
import type { Lang } from "../progress";

function txt(en: string, de: string, pl: string, lang: Lang): string {
  return lang === "pl" ? pl : lang === "de" ? de : en;
}

export function IceCreamCart({
  x = 0,
  y = 0,
  size = 100,
}: {
  x?: number;
  y?: number;
  size?: number;
}) {
  const s = size / 100;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* Wooden body */}
      <rect
        x="20"
        y="44"
        width="65"
        height="32"
        rx="4"
        fill="#38bdf8"
        stroke="#23383f"
        strokeWidth="3"
      />
      <rect
        x="28"
        y="50"
        width="49"
        height="18"
        rx="2"
        fill="#bae6fd"
        stroke="#23383f"
        strokeWidth="1.5"
      />
      {/* Striped canopy */}
      <path
        d="M14 26 L90 26 L86 42 L76 38 L66 42 L56 38 L46 42 L36 38 L26 42 L18 38 Z"
        fill="#f43f5e"
        stroke="#23383f"
        strokeWidth="2.5"
      />
      <path
        d="M28 26 L26 40 M48 26 L46 40 M68 26 L66 40"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Poles & Handle */}
      <line
        x1="22"
        y1="26"
        x2="22"
        y2="44"
        stroke="#23383f"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="82"
        y1="26"
        x2="82"
        y2="44"
        stroke="#23383f"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M12 50 H20" stroke="#23383f" strokeWidth="3" strokeLinecap="round" />
      {/* Big wooden wheel */}
      <circle cx="52" cy="76" r="16" fill="#e0a860" stroke="#23383f" strokeWidth="3.5" />
      <circle cx="52" cy="76" r="5" fill="#f4f1e8" stroke="#23383f" strokeWidth="2" />
      <line x1="52" y1="60" x2="52" y2="92" stroke="#23383f" strokeWidth="2" />
      <line x1="36" y1="76" x2="68" y2="76" stroke="#23383f" strokeWidth="2" />
      {/* Ice cream emblem */}
      <path d="M74 14 L68 24 H80 Z" fill="#d9953e" stroke="#23383f" strokeWidth="1.5" />
      <circle cx="74" cy="12" r="6" fill="#fb7185" stroke="#23383f" strokeWidth="1.5" />
    </g>
  );
}

export function IceCreamCone({
  x = 0,
  y = 0,
  size = 50,
  flavor = "#fb7185",
}: {
  x?: number;
  y?: number;
  size?: number;
  flavor?: string;
}) {
  const s = size / 50;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M25 45 L13 18 H37 Z" fill="#d9953e" stroke="#8c5820" strokeWidth="2" />
      <circle cx="25" cy="14" r="12" fill={flavor} stroke="#23383f" strokeWidth="2" />
      <circle cx="21" cy="11" r="3" fill="#fff" opacity="0.6" />
    </g>
  );
}

export function SunIcon({ x = 0, y = 0, size = 60 }: { x?: number; y?: number; size?: number }) {
  const s = size / 60;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="30" cy="30" r="15" fill="#fbbf24" stroke="#d97706" strokeWidth="3" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 30 + Math.cos(rad) * 20;
        const y1 = 30 + Math.sin(rad) * 20;
        const x2 = 30 + Math.cos(rad) * 27;
        const y2 = 30 + Math.sin(rad) * 27;
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#f59e0b"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

export function RainCloudIcon({
  x = 0,
  y = 0,
  size = 70,
}: {
  x?: number;
  y?: number;
  size?: number;
}) {
  const s = size / 70;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M20 38 C14 38 10 33 12 26 C14 20 22 18 25 21 C28 14 38 12 45 16 C51 14 58 18 57 25 C63 26 65 32 61 37 C58 40 24 40 20 38 Z"
        fill="#64748b"
        stroke="#334155"
        strokeWidth="3"
      />
      <line
        x1="24"
        y1="46"
        x2="20"
        y2="54"
        stroke="#38bdf8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="36"
        y1="46"
        x2="32"
        y2="54"
        stroke="#38bdf8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="48"
        y1="46"
        x2="44"
        y2="54"
        stroke="#38bdf8"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  );
}

/** Beat 1: Finn and his 10 saved coins */
export function FinnSavingsDiagram({ lang, step }: DiagramProps) {
  const label = txt("Finn saves 10 coins", "Finn spart 10 Münzen", "Finn oszczędza 10 monet", lang);
  return (
    <DiagramCanvas label={label}>
      <Villager who="Finn" x={80} y={60} size={130} />
      {step >= 2 && (
        <Pop x={280} y={70}>
          <rect
            x="0"
            y="20"
            width="80"
            height="95"
            rx="10"
            fill="#f1f5f9"
            stroke="#94a3b8"
            strokeWidth="3"
          />
          <rect
            x="15"
            y="10"
            width="50"
            height="12"
            rx="4"
            fill="#cbd5e1"
            stroke="#94a3b8"
            strokeWidth="2"
          />
          <text x="40" y="70" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#eab308">
            10
          </text>
          <text x="40" y="90" textAnchor="middle" fontSize="12" fill="#64748b">
            {txt("coins", "Münzen", "monet", lang)}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 2: Building the cart; Finn becomes an Owner */
export function BuildCartDiagram({ lang, step }: DiagramProps) {
  const label = txt(
    "Finn builds his cart and becomes an owner",
    "Finn baut seinen Wagen und wird Inhaber",
    "Finn buduje wózek i zostaje właścicielem",
    lang,
  );
  const ownerLabel = txt("Owner", "Inhaber", "Właściciel", lang);
  return (
    <DiagramCanvas label={label}>
      <Villager who="Finn" x={60} y={60} size={130} />
      <Pop x={60} y={230}>
        <rect x="0" y="0" width="130" height="30" rx="15" fill="#0284c7" />
        <text x="65" y="20" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">
          ★ {ownerLabel}
        </text>
      </Pop>
      {step >= 2 && (
        <Pop x={260} y={60}>
          <IceCreamCart x={0} y={0} size={150} />
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 3: Sunny day, hiring Leo as employee */
export function HireLeoDiagram({ lang, step }: DiagramProps) {
  const label = txt(
    "Sunny day: hiring Leo as an employee",
    "Sonniger Tag: Leo als Angestellter eingestellt",
    "Słoneczny dzień: zatrudnienie Leo jako pracownika",
    lang,
  );
  const empLabel = txt("Employee", "Angestellter", "Pracownik", lang);
  return (
    <DiagramCanvas label={label}>
      <SunIcon x={40} y={15} size={65} />
      <Villager who="Finn" x={40} y={80} size={120} name="Finn (Owner)" />
      {step >= 2 && (
        <Pop x={210} y={70}>
          <IceCreamCart x={0} y={0} size={130} />
        </Pop>
      )}
      {step >= 3 && (
        <Pop x={400} y={80}>
          <Person {...CAST.Leo} size={120} />
          <text className="diagram-name" x={60} y={150} textAnchor="middle">
            Leo
          </text>
          <rect x="-10" y="160" width="140" height="28" rx="14" fill="#10b981" />
          <text x="60" y="179" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">
            ★ {empLabel}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 4: Sunny sales breakdown: Revenue, Costs, Helper Wage, and Finn's Profit */
export function SunnySalesDiagram({ lang, step }: DiagramProps) {
  const label = txt(
    "Sunny day sales and profit breakdown",
    "Verkauf und Gewinn am sonnigen Tag",
    "Rozliczenie sprzedaży i zysku w słoneczny dzień",
    lang,
  );
  return (
    <DiagramCanvas label={label}>
      <Pop x={30} y={40}>
        <rect
          x="0"
          y="0"
          width="140"
          height="170"
          rx="8"
          fill="#ecfdf5"
          stroke="#10b981"
          strokeWidth="2"
        />
        <text x="70" y="30" textAnchor="middle" fontWeight="bold" fontSize="16" fill="#065f46">
          {txt("Sales", "Einnahmen", "Sprzedaż", lang)}
        </text>
        <text x="70" y="70" textAnchor="middle" fontWeight="bold" fontSize="32" fill="#059669">
          +30
        </text>
        <text x="70" y="100" textAnchor="middle" fontSize="13" fill="#047857">
          {txt("30 scoops", "30 Kugeln", "30 gałek", lang)}
        </text>
      </Pop>

      {step >= 2 && (
        <Pop x={190} y={40}>
          <rect
            x="0"
            y="0"
            width="140"
            height="170"
            rx="8"
            fill="#fef2f2"
            stroke="#f43f5e"
            strokeWidth="2"
          />
          <text x="70" y="26" textAnchor="middle" fontWeight="bold" fontSize="14" fill="#9f1239">
            {txt("Costs", "Kosten", "Koszty", lang)}
          </text>
          <text x="70" y="60" textAnchor="middle" fontSize="13" fill="#be123c">
            {txt("Cream: -6", "Sahne: -6", "Śmietanka: -6", lang)}
          </text>
          <text x="70" y="90" textAnchor="middle" fontSize="13" fill="#be123c">
            {txt("Leo wage: -4", "Leo Lohn: -4", "Płaca Leo: -4", lang)}
          </text>
          <line x1="20" y1="110" x2="120" y2="110" stroke="#fda4af" strokeWidth="2" />
          <text x="70" y="140" textAnchor="middle" fontWeight="bold" fontSize="22" fill="#e11d48">
            -10
          </text>
        </Pop>
      )}

      {step >= 3 && (
        <Pop x={350} y={40}>
          <rect
            x="0"
            y="0"
            width="160"
            height="170"
            rx="8"
            fill="#eff6ff"
            stroke="#3b82f6"
            strokeWidth="3"
          />
          <text x="80" y="30" textAnchor="middle" fontWeight="bold" fontSize="16" fill="#1e40af">
            ★ {txt("PROFIT", "GEWINN", "ZYSK", lang)}
          </text>
          <text x="80" y="80" textAnchor="middle" fontWeight="bold" fontSize="38" fill="#2563eb">
            +20
          </text>
          <text x="80" y="120" textAnchor="middle" fontSize="13" fill="#1d4ed8">
            {txt("Finn keeps profit!", "Finn behält Gewinn!", "Zysk dla Finna!", lang)}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 5: Profit vs Hourly Wages: Earnings scale with sales */
export function ProfitScaleDiagram({ lang, step }: DiagramProps) {
  const label = txt(
    "Hourly wages vs business profit scaling",
    "Stundenlohn versus steigender Gewinn",
    "Pensja godzinowa a rosnący zysk firmy",
    lang,
  );
  return (
    <DiagramCanvas label={label}>
      <Pop x={40} y={40}>
        <rect
          x="0"
          y="0"
          width="200"
          height="180"
          rx="8"
          fill="#f8fafc"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        <text x="100" y="30" textAnchor="middle" fontWeight="bold" fontSize="14" fill="#334155">
          {txt("Employee (Leo)", "Angestellter (Leo)", "Pracownik (Leo)", lang)}
        </text>
        <line x1="30" y1="120" x2="170" y2="120" stroke="#10b981" strokeWidth="4" />
        <text x="100" y="105" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#047857">
          {txt("Fixed 4 coins", "Feste 4 Münzen", "Stałe 4 monety", lang)}
        </text>
        <text x="100" y="155" textAnchor="middle" fontSize="12" fill="#64748b">
          {txt("Capped by hours", "Begrenzt durch Zeit", "Ograniczone czasem", lang)}
        </text>
      </Pop>

      {step >= 2 && (
        <Pop x={280} y={40}>
          <rect
            x="0"
            y="0"
            width="220"
            height="180"
            rx="8"
            fill="#eff6ff"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <text x="110" y="30" textAnchor="middle" fontWeight="bold" fontSize="14" fill="#1e40af">
            {txt("Owner (Finn)", "Inhaber (Finn)", "Właściciel (Finn)", lang)}
          </text>
          <path d="M30 140 L190 60" stroke="#2563eb" strokeWidth="4" />
          <polygon points="195,57 185,68 180,55" fill="#2563eb" />
          <text x="110" y="85" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">
            {txt("Scales with scoops!", "Wächst mit Kugeln!", "Rośnie ze sprzedażą!", lang)}
          </text>
          <text x="110" y="155" textAnchor="middle" fontSize="12" fill="#64748b">
            {txt("No hourly ceiling", "Keine Stundengrenze", "Brak limitu godzin", lang)}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: Rainy storm clouds, empty park */
export function RainStormDiagram({ lang, step }: DiagramProps) {
  const label = txt(
    "Rainy day with empty park",
    "Regentag mit leerem Park",
    "Deszczowy dzień i pusty park",
    lang,
  );
  return (
    <DiagramCanvas label={label}>
      <RainCloudIcon x={60} y={20} size={100} />
      <RainCloudIcon x={320} y={20} size={100} />
      <Pop x={200} y={90}>
        <IceCreamCart x={0} y={0} size={140} />
        {step >= 2 && (
          <text x="75" y="145" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#64748b">
            {txt("0 scoops sold", "0 Kugeln verkauft", "0 sprzedanych gałek", lang)}
          </text>
        )}
      </Pop>
    </DiagramCanvas>
  );
}

/** Beat 7: Rainy day loss breakdown */
export function RainyLossDiagram({ lang, step }: DiagramProps) {
  const label = txt(
    "Rainy day: helper still gets paid, Finn suffers a loss",
    "Regentag: Helfer bekommt Lohn, Finn macht Verlust",
    "Deszczowy dzień: pomocnik dostaje pensję, Finn ponosi stratę",
    lang,
  );
  return (
    <DiagramCanvas label={label}>
      <Pop x={30} y={40}>
        <rect
          x="0"
          y="0"
          width="140"
          height="170"
          rx="8"
          fill="#f8fafc"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        <text x="70" y="30" textAnchor="middle" fontWeight="bold" fontSize="15" fill="#475569">
          {txt("Sales", "Einnahmen", "Sprzedaż", lang)}
        </text>
        <text x="70" y="85" textAnchor="middle" fontWeight="bold" fontSize="38" fill="#64748b">
          0
        </text>
      </Pop>

      {step >= 2 && (
        <Pop x={190} y={40}>
          <rect
            x="0"
            y="0"
            width="140"
            height="170"
            rx="8"
            fill="#fef2f2"
            stroke="#f43f5e"
            strokeWidth="2"
          />
          <text x="70" y="26" textAnchor="middle" fontWeight="bold" fontSize="14" fill="#9f1239">
            {txt("Costs Due", "Fällige Kosten", "Koszty", lang)}
          </text>
          <text x="70" y="60" textAnchor="middle" fontSize="12" fill="#be123c">
            {txt("Cream: -2", "Sahne: -2", "Śmietanka: -2", lang)}
          </text>
          <text x="70" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#10b981">
            {txt("Leo wage: -4", "Leo Lohn: -4", "Płaca Leo: -4", lang)}
          </text>
          <line x1="20" y1="110" x2="120" y2="110" stroke="#fda4af" strokeWidth="2" />
          <text x="70" y="140" textAnchor="middle" fontWeight="bold" fontSize="24" fill="#e11d48">
            -6
          </text>
        </Pop>
      )}

      {step >= 3 && (
        <Pop x={350} y={40}>
          <rect
            x="0"
            y="0"
            width="160"
            height="170"
            rx="8"
            fill="#fff1f2"
            stroke="#e11d48"
            strokeWidth="3"
          />
          <text x="80" y="30" textAnchor="middle" fontWeight="bold" fontSize="16" fill="#9f1239">
            ★ {txt("LOSS", "VERLUST", "STRATA", lang)}
          </text>
          <text x="80" y="80" textAnchor="middle" fontWeight="bold" fontSize="38" fill="#e11d48">
            -6
          </text>
          <text x="80" y="120" textAnchor="middle" fontSize="12" fill="#be123c">
            {txt("From Finn's pocket!", "Aus Finns Tasche!", "Z kieszeni Finna!", lang)}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 8: Owner vs Employee comparison summary */
export function OwnerRiskSummaryDiagram({ lang, step }: DiagramProps) {
  const label = txt(
    "Summary: Owner risk vs Employee guaranteed pay",
    "Zusammenfassung: Unternehmerrisiko vs festes Gehalt",
    "Podsumowanie: Ryzyko właściciela a pewna płaca pracownika",
    lang,
  );
  return (
    <DiagramCanvas label={label}>
      <Pop x={30} y={30}>
        <rect
          x="0"
          y="0"
          width="220"
          height="200"
          rx="8"
          fill="#ecfdf5"
          stroke="#10b981"
          strokeWidth="2"
        />
        <Person {...CAST.Leo} x={65} y={15} size={90} />
        <text x="110" y="125" textAnchor="middle" fontWeight="bold" fontSize="14" fill="#065f46">
          {txt("Employee", "Angestellter", "Pracownik", lang)}
        </text>
        <text x="110" y="150" textAnchor="middle" fontSize="12" fill="#047857">
          ✓ {txt("Guaranteed wage", "Sicherer Lohn", "Pewna wypłata", lang)}
        </text>
        <text x="110" y="175" textAnchor="middle" fontSize="12" fill="#047857">
          ✓ {txt("No risk on rainy days", "Kein Risiko bei Regen", "Brak ryzyka w deszcz", lang)}
        </text>
      </Pop>

      {step >= 2 && (
        <Pop x={270} y={30}>
          <rect
            x="0"
            y="0"
            width="220"
            height="200"
            rx="8"
            fill="#eff6ff"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <Person {...CAST.Finn} x={65} y={15} size={90} />
          <text x="110" y="125" textAnchor="middle" fontWeight="bold" fontSize="14" fill="#1e40af">
            {txt("Owner", "Inhaber", "Właściciel", lang)}
          </text>
          <text x="110" y="150" textAnchor="middle" fontSize="12" fill="#1d4ed8">
            ★ {txt("Enjoys all profit", "Behält allen Gewinn", "Cieszy się całym zyskiem", lang)}
          </text>
          <text x="110" y="175" textAnchor="middle" fontSize="12" fill="#b91c1c">
            ⚠ {txt("Carries risk of loss", "Trägt Verlustrisiko", "Ponosi ryzyko straty", lang)}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}
