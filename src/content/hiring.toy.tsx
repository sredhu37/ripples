import { useEffect, useState } from "react";
import { CAST } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Person } from "../components/icons";
import { ActionPrompt, CheckButton, Stage } from "../lesson/toolkit";
import type { Lang } from "../progress";

export function calcHiringDay(hired: boolean, weather: "sunny" | "stormy") {
  if (!hired) {
    if (weather === "sunny") {
      return { loavesSold: 4, revenue: 16, cost: 8, wage: 0, profit: 8 };
    }
    return { loavesSold: 2, revenue: 8, cost: 4, wage: 0, profit: 4 };
  }
  // Hired mode
  if (weather === "sunny") {
    return { loavesSold: 8, revenue: 32, cost: 16, wage: 5, profit: 11 };
  }
  return { loavesSold: 2, revenue: 8, cost: 4, wage: 5, profit: -1 };
}

export function HiringToy({
  lang,
  onDone,
  isWidget,
  onWidgetAnswer,
}: {
  lang: Lang;
  onDone?: () => void;
  isWidget?: boolean;
  onWidgetAnswer?: (correct: boolean) => void;
}) {
  const [hired, setHired] = useState(isWidget ? true : false);
  const [weather, setWeather] = useState<"sunny" | "stormy">(
    isWidget ? "stormy" : "sunny",
  );
  const [paidFromReserve, setPaidFromReserve] = useState(false);

  const [seenSunnyHired, setSeenSunnyHired] = useState(false);
  const [seenStormyHired, setSeenStormyHired] = useState(false);

  const stats = calcHiringDay(hired, weather);

  useEffect(() => {
    if (!isWidget) {
      if (hired && weather === "sunny") setSeenSunnyHired(true);
      if (hired && weather === "stormy") setSeenStormyHired(true);
    }
  }, [hired, weather, isWidget]);

  useEffect(() => {
    if (!isWidget && seenSunnyHired && seenStormyHired) {
      onDone?.();
    }
  }, [seenSunnyHired, seenStormyHired, onDone, isWidget]);

  const stageLabel =
    lang === "pl"
      ? "Zespół piekarni i symulator pogody"
      : lang === "de"
      ? "Bäckerei-Team und Wettersimulator"
      : "Bakery team and weather simulator";

  const canvasLabel =
    lang === "pl" ? "Backstube" : lang === "de" ? "Backstube" : "Bakery kitchen";

  const teamTitle =
    lang === "pl" ? "Zespół piekarni" : lang === "de" ? "Das Bäckerei-Team" : "The Bakery Team";

  const coinsLabel =
    lang === "pl" ? "monet" : lang === "de" ? "Münzen" : "coins";

  const wageBadge =
    lang === "pl"
      ? `Płaca: 5 ${coinsLabel}`
      : lang === "de"
      ? `Lohn: 5 ${coinsLabel}`
      : "Wage: 5 coins";

  const openJobTitle =
    lang === "pl" ? "Wolny etat" : lang === "de" ? "Offene Stelle" : "Open Job";

  const hireLeoSub =
    lang === "pl" ? "(Zatrudnij Leo)" : lang === "de" ? "(Leo einstellen)" : "(Hire Leo)";

  const dayDemandTitle =
    weather === "sunny"
      ? lang === "pl"
        ? "Słoneczny dzień (duży popyt)"
        : lang === "de"
        ? "Sonniger Tag (Hohe Nachfrage)"
        : "Sunny Day (High Demand)"
      : lang === "pl"
      ? "Burzowy dzień (mały popyt)"
      : lang === "de"
      ? "Regentag (Wenig Nachfrage)"
      : "Stormy Day (Low Demand)";

  const loavesSoldLabel =
    lang === "pl"
      ? `Sprzedaż (${stats.loavesSold} bochenków):`
      : lang === "de"
      ? `Umsatz (${stats.loavesSold} Brote):`
      : `Sales (${stats.loavesSold} loaves):`;

  const fuelCostLabel =
    lang === "pl"
      ? "Mąka i drewno do pieca:"
      : lang === "de"
      ? "Mehl & Ofenholz:"
      : "Flour & oven fuel:";

  const leoWageLabel =
    lang === "pl" ? "Płaca Leo:" : lang === "de" ? "Leos Gehalt:" : "Leo's wage:";

  const dailyResultLabel =
    lang === "pl" ? "Wynik dnia:" : lang === "de" ? "Tagesergebnis:" : "Daily Net Result:";

  const promptText = !hired
    ? lang === "pl"
      ? "Najpierw zatrudnij Leo jako pomocnika, aby zwiększyć wydajność do 8 bochenków!"
      : lang === "de"
      ? "Stelle zuerst Leo als Bäckergesellen ein, um die Kapazität auf 8 Brote zu verdoppeln!"
      : "First, hire Leo as assistant baker to expand bakery capacity to 8 loaves!"
    : !seenSunnyHired
    ? lang === "pl"
      ? "Sprawdź słoneczny dzień z Leo, aby zobaczyć, jak wysoki zysk bez problemu pokrywa jego płacę!"
      : lang === "de"
      ? "Teste einen sonnigen Tag mit Leo: Hohe Gewinne decken seinen Lohn mühelos!"
      : "Test a Sunny Day with Leo to see high profits cover his wage easily!"
    : !seenStormyHired
    ? lang === "pl"
      ? "Teraz przełącz na burzowy dzień, aby zobaczyć, co się dzieje, gdy sprzedaż drastycznie spada!"
      : lang === "de"
      ? "Wechsle nun zu einem stürmischen Tag, um zu sehen, was bei wenig Kundschaft passiert!"
      : "Now switch to a Stormy Day to see what happens when sales drop!"
    : lang === "pl"
    ? "Zobacz: zatrudnienie przynosi wyższy zysk w dobre dni, ale niesie ryzyko stałej płacy w gorsze dni!"
    : lang === "de"
    ? "Siehst du: Einstellen bringt mehr Gewinn an guten Tagen, aber festes Lohnrisiko an Regentagen!"
    : "Notice how hiring brings higher profit on good days, but fixed wage risk on slow days!";

  return (
    <div className="hiring-wrap">
      <Stage label={stageLabel}>
        <DiagramCanvas label={canvasLabel}>
          {/* Bea and Leo */}
          <Pop x={30} y={35}>
            <rect x="0" y="0" width="250" height="190" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <text x="125" y="25" textAnchor="middle" fill="#23383f" fontSize={13} fontWeight="bold">
              {teamTitle}
            </text>
            <Person {...CAST.Bea} x={25} y={40} size={85} />
            <text className="diagram-name" x={67} y={135} textAnchor="middle">
              Bea
            </text>

            {hired ? (
              <>
                <Person {...CAST.Leo} x={140} y={40} size={85} />
                <text className="diagram-name" x={182} y={135} textAnchor="middle">
                  Leo
                </text>
                <rect x="120" y="145" width="120" height="24" rx="4" fill="#dcfce7" />
                <text x="180" y="161" textAnchor="middle" fill="#15803d" fontSize={10} fontWeight="bold">
                  {wageBadge}
                </text>
              </>
            ) : (
              <g transform="translate(135, 50)">
                <rect
                  x="0"
                  y="0"
                  width="95"
                  height="100"
                  rx="10"
                  fill="#f1f5f9"
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                />
                <text x="47" y="45" textAnchor="middle" fill="#64748b" fontSize={11} fontWeight="bold">
                  {openJobTitle}
                </text>
                <text x="47" y="65" textAnchor="middle" fill="#94a3b8" fontSize={10}>
                  {hireLeoSub}
                </text>
              </g>
            )}
          </Pop>

          {/* Daily Ledger */}
          <Pop x={310} y={35}>
            <rect x="0" y="0" width="300" height="190" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <text x="150" y="25" textAnchor="middle" fill="#23383f" fontSize={13} fontWeight="bold">
              {dayDemandTitle}
            </text>

            <g transform="translate(20, 45)">
              <text x="0" y="15" fill="#1e40af" fontSize={12}>
                {loavesSoldLabel}
              </text>
              <text x="260" y="15" textAnchor="end" fill="#1e40af" fontSize={12} fontWeight="bold">
                +{stats.revenue} {coinsLabel}
              </text>

              <text x="0" y="40" fill="#991b1b" fontSize={12}>
                {fuelCostLabel}
              </text>
              <text x="260" y="40" textAnchor="end" fill="#991b1b" fontSize={12} fontWeight="bold">
                -{stats.cost} {coinsLabel}
              </text>

              <text x="0" y="65" fill="#991b1b" fontSize={12}>
                {leoWageLabel}
              </text>
              <text x="260" y="65" textAnchor="end" fill="#991b1b" fontSize={12} fontWeight="bold">
                -{stats.wage} {coinsLabel}
              </text>

              <line x1="0" y1="80" x2="260" y2="80" stroke="#cbd5e1" strokeWidth="1.5" />

              <text x="0" y="105" fill="#23383f" fontSize={13} fontWeight="bold">
                {dailyResultLabel}
              </text>
              <text
                x="260"
                y="105"
                textAnchor="end"
                fill={stats.profit >= 0 ? "#15803d" : "#dc2626"}
                fontSize={16}
                fontWeight="bold"
              >
                {stats.profit >= 0 ? `+${stats.profit}` : stats.profit} {coinsLabel}
              </text>
            </g>
          </Pop>
        </DiagramCanvas>
      </Stage>

      <div className="hiring-controls">
        {!isWidget && (
          <div className="row">
            <button
              type="button"
              className={`choice-btn ${hired ? "selected" : ""}`}
              onClick={() => setHired(!hired)}
            >
              {hired
                ? lang === "pl"
                  ? "Leo zatrudniony (kliknij na tryb solo)"
                  : lang === "de"
                  ? "Leo eingestellt (Klick für Solo)"
                  : "Leo Hired (Click to go Solo)"
                : lang === "pl"
                ? "Zatrudnij Leo (5 monet płacy)"
                : lang === "de"
                ? "Leo einstellen (5 Münzen Lohn)"
                : "Hire Leo (5 coins wage)"}
            </button>
            <button
              type="button"
              className={`choice-btn ${weather === "sunny" ? "selected" : ""}`}
              onClick={() => setWeather("sunny")}
            >
              {lang === "pl" ? "Słoneczny dzień" : lang === "de" ? "Sonniger Tag" : "Sunny Day"}
            </button>
            <button
              type="button"
              className={`choice-btn ${weather === "stormy" ? "selected" : ""}`}
              onClick={() => setWeather("stormy")}
            >
              {lang === "pl" ? "Burzowy dzień" : lang === "de" ? "Stürmischer Tag" : "Stormy Day"}
            </button>
          </div>
        )}

        {!isWidget && (
          <ActionPrompt lang={lang}>{promptText}</ActionPrompt>
        )}

        {isWidget && (
          <div className="hiring-widget-controls">
            <button
              type="button"
              className={`choice-btn ${paidFromReserve ? "selected" : ""}`}
              onClick={() => setPaidFromReserve(!paidFromReserve)}
            >
              {lang === "pl"
                ? "Wypłać Leo gwarantowane 5 monet płacy z rezerwy"
                : lang === "de"
                ? "Zahle Leo garantierte 5 Münzen Lohn aus der Rücklage"
                : "Pay Leo guaranteed 5 coins wage from reserve"}
            </button>
            {onWidgetAnswer && (
              <div className="row nav">
                <CheckButton
                  lang={lang}
                  onClick={() => onWidgetAnswer(paidFromReserve)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
