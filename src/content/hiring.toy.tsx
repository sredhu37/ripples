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
  const en = lang === "en";

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

  return (
    <div className="hiring-wrap">
      <Stage label={en ? "Bakery team and weather simulator" : "Bäckerei-Team und Wettersimulator"}>
        <DiagramCanvas label={en ? "Bakery kitchen" : "Backstube"}>
          {/* Bea and Leo */}
          <Pop x={30} y={35}>
            <rect x="0" y="0" width="250" height="190" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <text x="125" y="25" textAnchor="middle" fill="#23383f" fontSize="13" fontWeight="bold">
              {en ? "The Bakery Team" : "Das Bäckerei-Team"}
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
                <text x="180" y="161" textAnchor="middle" fill="#15803d" fontSize="10" fontWeight="bold">
                  {en ? "Wage: 5 coins" : "Lohn: 5 Münzen"}
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
                <text x="47" y="45" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">
                  {en ? "Open Job" : "Offene Stelle"}
                </text>
                <text x="47" y="65" textAnchor="middle" fill="#94a3b8" fontSize="10">
                  {en ? "(Hire Leo)" : "(Leo einstellen)"}
                </text>
              </g>
            )}
          </Pop>

          {/* Daily Ledger */}
          <Pop x={310} y={35}>
            <rect x="0" y="0" width="300" height="190" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <text x="150" y="25" textAnchor="middle" fill="#23383f" fontSize="13" fontWeight="bold">
              {weather === "sunny"
                ? en
                  ? "Sunny Day (High Demand)"
                  : "Sonniger Tag (Hohe Nachfrage)"
                : en
                ? "Stormy Day (Low Demand)"
                : "Regentag (Wenig Nachfrage)"}
            </text>

            <g transform="translate(20, 45)">
              <text x="0" y="15" fill="#1e40af" fontSize="12">
                {en ? `Sales (${stats.loavesSold} loaves):` : `Umsatz (${stats.loavesSold} Brote):`}
              </text>
              <text x="260" y="15" textAnchor="end" fill="#1e40af" fontSize="12" fontWeight="bold">
                +{stats.revenue} {en ? "coins" : "Münzen"}
              </text>

              <text x="0" y="40" fill="#991b1b" fontSize="12">
                {en ? "Flour & oven fuel:" : "Mehl & Ofenholz:"}
              </text>
              <text x="260" y="40" textAnchor="end" fill="#991b1b" fontSize="12" fontWeight="bold">
                -{stats.cost} {en ? "coins" : "Münzen"}
              </text>

              <text x="0" y="65" fill="#991b1b" fontSize="12">
                {en ? "Leo's wage:" : "Leos Gehalt:"}
              </text>
              <text x="260" y="65" textAnchor="end" fill="#991b1b" fontSize="12" fontWeight="bold">
                -{stats.wage} {en ? "coins" : "Münzen"}
              </text>

              <line x1="0" y1="80" x2="260" y2="80" stroke="#cbd5e1" strokeWidth="1.5" />

              <text x="0" y="105" fill="#23383f" fontSize="13" fontWeight="bold">
                {en ? "Daily Net Result:" : "Tagesergebnis:"}
              </text>
              <text
                x="260"
                y="105"
                textAnchor="end"
                fill={stats.profit >= 0 ? "#15803d" : "#dc2626"}
                fontSize="16"
                fontWeight="bold"
              >
                {stats.profit >= 0 ? `+${stats.profit}` : stats.profit} {en ? "coins" : "Münzen"}
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
                ? en
                  ? "Leo Hired (Click to go Solo)"
                  : "Leo eingestellt (Klick für Solo)"
                : en
                ? "Hire Leo (5 coins wage)"
                : "Leo einstellen (5 Münzen Lohn)"}
            </button>
            <button
              type="button"
              className={`choice-btn ${weather === "sunny" ? "selected" : ""}`}
              onClick={() => setWeather("sunny")}
            >
              {en ? "Sunny Day" : "Sonniger Tag"}
            </button>
            <button
              type="button"
              className={`choice-btn ${weather === "stormy" ? "selected" : ""}`}
              onClick={() => setWeather("stormy")}
            >
              {en ? "Stormy Day" : "Stürmischer Tag"}
            </button>
          </div>
        )}

        {!isWidget && (
          <ActionPrompt lang={lang}>
            {!hired
              ? en
                ? "First, hire Leo as assistant baker to expand bakery capacity to 8 loaves!"
                : "Stelle zuerst Leo als Bäckergesellen ein, um die Kapazität auf 8 Brote zu verdoppeln!"
              : !seenSunnyHired
              ? en
                ? "Test a Sunny Day with Leo to see high profits cover his wage easily!"
                : "Teste einen sonnigen Tag mit Leo: Hohe Gewinne decken seinen Lohn mühelos!"
              : !seenStormyHired
              ? en
                ? "Now switch to a Stormy Day to see what happens when sales drop!"
                : "Wechsle nun zu einem stürmischen Tag, um zu sehen, was bei wenig Kundschaft passiert!"
              : en
              ? "Notice how hiring brings higher profit on good days, but fixed wage risk on slow days!"
              : "Siehst du: Einstellen bringt mehr Gewinn an guten Tagen, aber festes Lohnrisiko an Regentagen!"}
          </ActionPrompt>
        )}

        {isWidget && (
          <div className="hiring-widget-controls">
            <button
              type="button"
              className={`choice-btn ${paidFromReserve ? "selected" : ""}`}
              onClick={() => setPaidFromReserve(!paidFromReserve)}
            >
              {en
                ? "Pay Leo guaranteed 5 coins wage from reserve"
                : "Zahle Leo garantierte 5 Münzen Lohn aus der Rücklage"}
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
