import { useEffect, useState } from "react";
import { CAST } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Apple, Person } from "../components/icons";
import { ActionPrompt, CheckButton, Slider, Stage } from "../lesson/toolkit";
import type { Lang } from "../progress";
import { GreenApple } from "./marketshare.diagrams";

export function calcMarketShare(finnShoppers: number, totalShoppers = 10) {
  const claraShoppers = totalShoppers - finnShoppers;
  return {
    finnPercent: Math.round((finnShoppers / totalShoppers) * 100),
    claraPercent: Math.round((claraShoppers / totalShoppers) * 100),
    finnCount: finnShoppers,
    claraCount: claraShoppers,
  };
}

export function MarketShareToy({
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
  const [finnCount, setFinnCount] = useState(isWidget ? 5 : 5);
  const [seenFinnHigh, setSeenFinnHigh] = useState(false);
  const [seenClaraHigh, setSeenClaraHigh] = useState(false);

  const stats = calcMarketShare(finnCount, 10);

  // SVG pie slice math
  const R = 65;
  const cx = 75;
  const cy = 75;
  const angle = (finnCount / 10) * 2 * Math.PI;
  const endAngle = -Math.PI / 2 + angle;
  const x2 = cx + R * Math.cos(endAngle);
  const y2 = cy + R * Math.sin(endAngle);
  const largeArc = finnCount > 5 ? 1 : 0;

  const handleSliderChange = (val: number) => {
    setFinnCount(val);
    if (!isWidget) {
      if (val >= 7) setSeenFinnHigh(true);
      if (val <= 5) setSeenClaraHigh(true);
    }
  };

  useEffect(() => {
    if (!isWidget && seenFinnHigh && seenClaraHigh) {
      onDone?.();
    }
  }, [seenFinnHigh, seenClaraHigh, onDone, isWidget]);

  return (
    <div className="marketshare-wrap">
      <Stage label={en ? "Fruit market share simulator" : "Obst-Marktanteil Simulator"}>
        <DiagramCanvas label={en ? "Market share split between Finn and Clara" : "Marktanteile zwischen Finn und Clara"}>
          {/* Left: Finn's Green Apples */}
          <Pop x={30} y={40}>
            <rect x="0" y="0" width="160" height="180" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <Person {...CAST.Finn} x={35} y={10} size={90} />
            <text className="diagram-name" x={80} y={115} textAnchor="middle">
              Finn
            </text>
            <GreenApple x={25} y={120} size={40} />
            <rect x="75" y="125" width="70" height="30" rx="6" fill="#dcfce7" />
            <text x="110" y="145" textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="bold">
              {stats.finnPercent}%
            </text>
          </Pop>

          {/* Center: Dynamic Pie Chart */}
          <Pop x={245} y={40}>
            <rect x="0" y="0" width="150" height="180" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <text x="75" y="24" textAnchor="middle" fill="#23383f" fontSize="13" fontWeight="bold">
              {en ? "10 Shoppers" : "10 Kundinnen"}
            </text>
            <g transform="translate(0, 20)">
              {/* Clara's full base circle in red */}
              <circle cx={cx} cy={cy} r={R} fill="#df4a3f" />
              {/* Finn's slice in green */}
              {finnCount === 10 ? (
                <circle cx={cx} cy={cy} r={R} fill="#4fa75a" />
              ) : finnCount > 0 ? (
                <path
                  d={`M ${cx} ${cy} L ${cx} ${cy - R} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill="#4fa75a"
                />
              ) : null}
              {/* Donut hole for clean badge */}
              <circle cx={cx} cy={cy} r={22} fill="#ffffff" stroke="#23383f" strokeWidth="2.5" />
            </g>
            <text x="75" y="170" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">
              {stats.finnCount} : {stats.claraCount}
            </text>
          </Pop>

          {/* Right: Clara's Red Apples */}
          <Pop x={440} y={40}>
            <rect x="0" y="0" width="160" height="180" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <Person {...CAST.Clara} x={35} y={10} size={90} />
            <text className="diagram-name" x={80} y={115} textAnchor="middle">
              Clara
            </text>
            <Apple x={25} y={120} size={40} />
            <rect x="75" y="125" width="70" height="30" rx="6" fill="#fee2e2" />
            <text x="110" y="145" textAnchor="middle" fill="#991b1b" fontSize="14" fontWeight="bold">
              {stats.claraPercent}%
            </text>
          </Pop>
        </DiagramCanvas>
      </Stage>

      <div className="marketshare-controls">
        <Slider
          label={
            en
              ? `Finn: ${stats.finnCount} (${stats.finnPercent}%) | Clara: ${stats.claraCount} (${stats.claraPercent}%)`
              : `Finn: ${stats.finnCount} (${stats.finnPercent}%) | Clara: ${stats.claraCount} (${stats.claraPercent}%)`
          }
          min={0}
          max={10}
          step={1}
          value={finnCount}
          onChange={handleSliderChange}
        />

        {!isWidget && (
          <ActionPrompt lang={lang}>
            {!seenFinnHigh
              ? en
                ? "First, adjust the slider so Finn holds at least 70% of the shoppers (7 out of 10)!"
                : "Schiebe zuerst so, dass Finn mindestens 70% der Käufer hat (7 von 10)!"
              : !seenClaraHigh
              ? en
                ? "Great! Now adjust so Clara reaches at least 50% market share (5 or more shoppers)!"
                : "Super! Schiebe nun so, dass Clara mindestens 50% Marktanteil erreicht (5 oder mehr)!"
              : en
              ? "Notice how every customer who switches changes both sellers' market shares!"
              : "Siehst du, wie jeder wechselnde Kunde den Marktanteil beider Händler verändert!"}
          </ActionPrompt>
        )}

        {isWidget && onWidgetAnswer && (
          <div className="row nav">
            <CheckButton lang={lang} onClick={() => onWidgetAnswer(stats.claraCount === 6)} />
          </div>
        )}
      </div>
    </div>
  );
}
