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

  const stageLabel =
    lang === "pl"
      ? "Waga wielkości sprzedaży i ilości"
      : lang === "de"
        ? "Ticketgröße-Waage"
        : "Ticket size balance board";

  const canvasLabel =
    lang === "pl"
      ? "Równowaga ceny i liczby sztuk"
      : lang === "de"
        ? "Verhältnis von Ticketgröße und Menge"
        : "Balance ticket size and volume";

  const itemName =
    price <= 3
      ? lang === "pl"
        ? "Słodkie bułki"
        : lang === "de"
          ? "Brötchen"
          : "Sweet Rolls"
      : lang === "pl"
        ? "Skórzane buty"
        : lang === "de"
          ? "Lederstiefel"
          : "Sturdy Boots";

  const priceBadge =
    lang === "pl"
      ? `${price} monet za sztukę`
      : lang === "de"
        ? `${price} Münzen pro Stück`
        : `${price} coins each`;

  const volumeTitle =
    lang === "pl" ? "Wymagana ilość" : lang === "de" ? "Nötige Menge" : "Volume Needed";

  const custToServe =
    lang === "pl"
      ? "klientów do obsłużenia"
      : lang === "de"
        ? "Kunden bedienen"
        : "customers to serve";

  const targetTitle =
    lang === "pl" ? "Docelowy przychód" : lang === "de" ? "Ziel-Umsatz" : "Target Sales";

  const targetStatus = dayActive
    ? lang === "pl"
      ? "Cel osiągnięty!"
      : lang === "de"
        ? "Ziel erreicht!"
        : "Target reached!"
    : lang === "pl"
      ? "Dotknij Start"
      : lang === "de"
        ? "Tippe auf Start"
        : "Tap run to start";

  const sliderLabel =
    lang === "pl"
      ? `Cena za sztukę: ${price} monet`
      : lang === "de"
        ? `Preis pro Stück: ${price} Münzen`
        : `Price per item: ${price} coins`;

  const promptText = !ranLow
    ? lang === "pl"
      ? "Najpierw ustaw niską cenę (1 do 3 monet) i rozpocznij dzień targowy, aby zobaczyć dużą liczbę klientów!"
      : lang === "de"
        ? "Stelle zuerst einen kleinen Preis (1 bis 3 Münzen) ein und starte den Tag für viele Kunden!"
        : "First, set a small price (1 to 3 coins) and run the market day to see high customer volume!"
    : !ranHigh
      ? lang === "pl"
        ? "Świetnie! Teraz ustaw wysoką cenę (6 do 12 monet) i rozpocznij dzień, aby zobaczyć małą liczbę klientów przy wysokiej cenie!"
        : lang === "de"
          ? "Super! Stelle nun einen hohen Preis (6 bis 12 Münzen) ein für wenige Kunden bei hohem Preis!"
          : "Great! Now set a high price (6 to 12 coins) and run the market day to see low customer volume!"
      : lang === "pl"
        ? "Zarówno niska cena (duża ilość), jak i wysoka cena (mała ilość) osiągają cel 24 monet!"
        : lang === "de"
          ? "Beide Wege (viele kleine oder wenige große Verkäufe) erreichen das 24-Münzen-Ziel!"
          : "Both low ticket (high volume) and high ticket (low volume) reach the 24-coin goal!";

  const runDayButton =
    lang === "pl"
      ? "Rozpocznij dzień targowy"
      : lang === "de"
        ? "Markttag starten"
        : "Run market day";

  return (
    <div className="ticketsize-wrap">
      <Stage label={stageLabel}>
        <DiagramCanvas label={canvasLabel}>
          {/* Item type icon and price indicator */}
          <Pop x={40} y={40}>
            <rect
              x="0"
              y="0"
              width="180"
              height="180"
              rx="14"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="3"
            />
            <text x="90" y="30" textAnchor="middle" fill="#23383f" fontSize={14} fontWeight="bold">
              {itemName}
            </text>
            <g transform="translate(45, 45)">
              {price <= 3 ? <Bread x={10} y={0} size={70} /> : <Shoe x={10} y={0} size={70} />}
            </g>
            <rect x="25" y="135" width="130" height="30" rx="6" fill="#e0f2fe" />
            <text x="90" y="155" textAnchor="middle" fill="#0369a1" fontSize={13} fontWeight="bold">
              {priceBadge}
            </text>
          </Pop>

          {/* Center: Market day summary / balance */}
          <Pop x={245} y={40}>
            <rect
              x="0"
              y="0"
              width="150"
              height="180"
              rx="14"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="3"
            />
            <text x="75" y="30" textAnchor="middle" fill="#23383f" fontSize={14} fontWeight="bold">
              {volumeTitle}
            </text>
            <circle cx="75" cy="85" r="35" fill="#f8fafc" stroke="#38bdf8" strokeWidth="3" />
            <text x="75" y="93" textAnchor="middle" fill="#0284c7" fontSize={22} fontWeight="bold">
              {volume}
            </text>
            <text x="75" y="145" textAnchor="middle" fill="#64748b" fontSize={12}>
              {custToServe}
            </text>
          </Pop>

          {/* Right: Target revenue gauge */}
          <Pop x={420} y={40}>
            <rect
              x="0"
              y="0"
              width="180"
              height="180"
              rx="14"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="3"
            />
            <text x="90" y="30" textAnchor="middle" fill="#23383f" fontSize={14} fontWeight="bold">
              {targetTitle}
            </text>
            <g transform="translate(65, 45)">
              <Coin x={0} y={0} size={50} />
            </g>
            <rect
              x="20"
              y="110"
              width="140"
              height="55"
              rx="8"
              fill={dayActive ? "#dcfce7" : "#f1f5f9"}
            />
            <text
              x="90"
              y="132"
              textAnchor="middle"
              fill={dayActive ? "#15803d" : "#475569"}
              fontSize={16}
              fontWeight="bold"
            >
              {currentSales} / {targetRevenue}
            </text>
            <text
              x="90"
              y="152"
              textAnchor="middle"
              fill={dayActive ? "#16a34a" : "#64748b"}
              fontSize={12}
            >
              {targetStatus}
            </text>
          </Pop>
        </DiagramCanvas>
      </Stage>

      <div className="ticketsize-controls">
        <Slider
          label={sliderLabel}
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
            <ActionPrompt lang={lang}>{promptText}</ActionPrompt>

            <div className="row nav">
              <ToyButton onClick={handleRunDay}>{runDayButton}</ToyButton>
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
