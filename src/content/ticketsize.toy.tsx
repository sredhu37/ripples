import { useEffect, useState } from "react";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Bread, Coin, Shoe } from "../components/icons";
import { ActionPrompt, CheckButton, Slider, Stage, ToyButton } from "../lesson/toolkit";
import type { Lang } from "../progress";
import { sfx } from "../sound";

export function calcTicketRevenue(price: number, quantity: number) {
  return price * quantity;
}

export function calcRequiredVolume(targetRevenue: number, price: number) {
  if (price <= 0) return 0;
  return Math.round(targetRevenue / price);
}

export function TicketBalanceToy({
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
  const targetRevenue = isWidget ? 18 : 24;
  const [price, setPrice] = useState(isWidget ? 2 : 2);
  const [ranLow, setRanLow] = useState(false);
  const [ranHigh, setRanHigh] = useState(false);
  const [dayActive, setDayActive] = useState(false);

  const volume = isWidget ? 3 : calcRequiredVolume(targetRevenue, price);
  const currentSales = calcTicketRevenue(price, volume);

  const handleRunDay = () => {
    sfx.tap();
    setDayActive(true);
    if (!isWidget) {
      if (price <= 3) setRanLow(true);
      if (price >= 6) setRanHigh(true);
    }
  };

  useEffect(() => {
    if (!isWidget && ranLow && ranHigh) {
      onDone?.();
    }
  }, [ranLow, ranHigh, onDone, isWidget]);

  return (
    <div className="ticketsize-wrap">
      <Stage label={en ? "Ticket size balance board" : "Ticketgröße-Waage"}>
        <DiagramCanvas label={en ? "Balance ticket size and volume" : "Verhältnis von Ticketgröße und Menge"}>
          {/* Item type icon and price indicator */}
          <Pop x={40} y={40}>
            <rect x="0" y="0" width="180" height="180" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <text x="90" y="30" textAnchor="middle" fill="#23383f" fontSize="14" fontWeight="bold">
              {price <= 3 ? (en ? "Sweet Rolls" : "Brötchen") : en ? "Sturdy Boots" : "Lederstiefel"}
            </text>
            <g transform="translate(45, 45)">
              {price <= 3 ? <Bread x={10} y={0} size={70} /> : <Shoe x={10} y={0} size={70} />}
            </g>
            <rect x="25" y="135" width="130" height="30" rx="6" fill="#e0f2fe" />
            <text x="90" y="155" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="bold">
              {price} {en ? "coins each" : "Münzen pro Stück"}
            </text>
          </Pop>

          {/* Center: Market day summary / balance */}
          <Pop x={245} y={40}>
            <rect x="0" y="0" width="150" height="180" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <text x="75" y="30" textAnchor="middle" fill="#23383f" fontSize="14" fontWeight="bold">
              {en ? "Volume Needed" : "Nötige Menge"}
            </text>
            <circle cx="75" cy="85" r="35" fill="#f8fafc" stroke="#38bdf8" strokeWidth="3" />
            <text x="75" y="93" textAnchor="middle" fill="#0284c7" fontSize="22" fontWeight="bold">
              {volume}
            </text>
            <text x="75" y="145" textAnchor="middle" fill="#64748b" fontSize="12">
              {en ? "customers to serve" : "Kunden bedienen"}
            </text>
          </Pop>

          {/* Right: Target revenue gauge */}
          <Pop x={420} y={40}>
            <rect x="0" y="0" width="180" height="180" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <text x="90" y="30" textAnchor="middle" fill="#23383f" fontSize="14" fontWeight="bold">
              {en ? "Target Sales" : "Ziel-Umsatz"}
            </text>
            <g transform="translate(65, 45)">
              <Coin x={0} y={0} size={50} />
            </g>
            <rect x="20" y="110" width="140" height="55" rx="8" fill={dayActive ? "#dcfce7" : "#f1f5f9"} />
            <text x="90" y="132" textAnchor="middle" fill={dayActive ? "#15803d" : "#475569"} fontSize="16" fontWeight="bold">
              {currentSales} / {targetRevenue}
            </text>
            <text x="90" y="152" textAnchor="middle" fill={dayActive ? "#16a34a" : "#64748b"} fontSize="12">
              {dayActive ? (en ? "Target reached!" : "Ziel erreicht!") : en ? "Tap run to start" : "Tippe auf Start"}
            </text>
          </Pop>
        </DiagramCanvas>
      </Stage>

      <div className="ticketsize-controls">
        <Slider
          label={en ? `Price per item: ${price} coins` : `Preis pro Stück: ${price} Münzen`}
          min={1}
          max={isWidget ? 10 : 12}
          step={1}
          value={price}
          onChange={(v) => {
            setPrice(v);
            setDayActive(false);
          }}
        />

        {!isWidget && (
          <>
            <ActionPrompt lang={lang}>
              {!ranLow
                ? en
                  ? "First, set a small price (1 to 3 coins) and run the market day to see high customer volume!"
                  : "Stelle zuerst einen kleinen Preis (1 bis 3 Münzen) ein und starte den Tag für viele Kunden!"
                : !ranHigh
                ? en
                  ? "Great! Now set a high price (6 to 12 coins) and run the market day to see low customer volume!"
                  : "Super! Stelle nun einen hohen Preis (6 bis 12 Münzen) ein für wenige Kunden bei hohem Preis!"
                : en
                ? "Both low ticket (high volume) and high ticket (low volume) reach the 24-coin goal!"
                : "Beide Wege (viele kleine oder wenige große Verkäufe) erreichen das 24-Münzen-Ziel!"}
            </ActionPrompt>

            <div className="row nav">
              <ToyButton onClick={handleRunDay}>
                {en ? "Run market day" : "Markttag starten"}
              </ToyButton>
            </div>
          </>
        )}

        {isWidget && onWidgetAnswer && (
          <div className="row nav">
            <CheckButton lang={lang} onClick={() => onWidgetAnswer(price === 6)} />
          </div>
        )}
      </div>
    </div>
  );
}
