import { useEffect, useRef, useState } from "react";
import { CAST } from "../components/cast";
import { DiagramCanvas, Pop } from "../components/diagram";
import { Fish, Person } from "../components/icons";
import { ActionPrompt, CheckButton, Stage, ToyButton } from "../lesson/toolkit";
import type { Lang } from "../progress";
import { sfx } from "../sound";
import { DockStand } from "./sales.diagrams";

export interface SalesSim {
  customersServed: number;
  totalSales: number;
}

export function calcSales(customers: number, pricePerFish = 3) {
  return customers * pricePerFish;
}

interface CustomerQueue {
  id: string;
  name: string;
  castKey: keyof typeof CAST;
  wanted: string;
  price: number;
}

const CUSTOMERS: CustomerQueue[] = [
  { id: "c1", name: "Pip", castKey: "Pip", wanted: "Trout", price: 3 },
  { id: "c2", name: "Sam", castKey: "Sam", wanted: "Trout", price: 3 },
  { id: "c3", name: "Bea", castKey: "Bea", wanted: "Trout", price: 3 },
  { id: "c4", name: "Pim", castKey: "Pim", wanted: "Trout", price: 3 },
];

export function SalesHarbor({
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [custIndex, setCustIndex] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [servedCount, setServedCount] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const [fishDelivered, setFishDelivered] = useState(false);

  const currentCust = CUSTOMERS[custIndex % CUSTOMERS.length];

  const handlePointerDown = (e: React.PointerEvent) => {
    if (fishDelivered) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragging(false);
    setDragPos(null);

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * 640;
    const relY = ((e.clientY - rect.top) / rect.height) * 280;

    // Hit test for customer area (x: 440 to 610, y: 30 to 230)
    if (relX >= 420 && relX <= 630 && relY >= 20 && relY <= 240) {
      sfx.tap();
      setFishDelivered(true);
      const earned = currentCust.price;
      const nextSales = totalSales + earned;
      const nextCount = servedCount + 1;
      setTotalSales(nextSales);
      setServedCount(nextCount);
    }
  };

  const handleNextCustomer = () => {
    sfx.tap();
    setFishDelivered(false);
    setCustIndex((i) => i + 1);
  };

  useEffect(() => {
    if (!isWidget && servedCount >= 4 && totalSales >= 12) {
      onDone?.();
    }
  }, [servedCount, totalSales, onDone, isWidget]);

  return (
    <div
      className="sales-wrap"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <Stage label={en ? "Finn's fish stand" : "Finns Fischstand"}>
        <DiagramCanvas label={en ? "Finn makes sales to customers" : "Finn verkauft Fisch an Kundschaft"}>
          {/* Finn at harbor stand */}
          <Pop x={40} y={40}>
            <DockStand x={0} y={40} />
            <Person {...CAST.Finn} mood="happy" x={20} y={10} size={110} />
            <text className="diagram-name" x={75} y={135} textAnchor="middle">
              Finn
            </text>
          </Pop>

          {/* Central draggable fish tray */}
          <Pop x={230} y={70}>
            <rect x="0" y="0" width="160" height="130" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <text x="80" y="26" textAnchor="middle" fill="#23383f" fontSize="13" fontWeight="bold">
              {en ? "Fish crate" : "Fischkiste"}
            </text>
            {!fishDelivered ? (
              <g
                onPointerDown={handlePointerDown}
                style={{ cursor: "grab", touchAction: "none" }}
                transform="translate(35, 30)"
              >
                <rect x="-8" y="-6" width="105" height="65" rx="8" fill="#e0f2fe" stroke="#38bdf8" strokeDasharray="4 4" />
                <Fish x={10} y={0} size={70} />
                <text x="45" y="70" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">
                  {en ? "Drag fish" : "Fisch ziehen"}
                </text>
              </g>
            ) : (
              <text x="80" y="75" textAnchor="middle" fill="#94a3b8" fontSize="13">
                {en ? "Delivered!" : "Übergeben!"}
              </text>
            )}
          </Pop>

          {/* Customer & Basket drop zone */}
          <Pop x={440} y={40}>
            <rect
              x="0"
              y="0"
              width="170"
              height="180"
              rx="14"
              fill={dragging ? "#fef3c7" : "#ffffff"}
              stroke={dragging ? "#f59e0b" : "#cbd5e1"}
              strokeWidth={dragging ? 3 : 2}
            />
            <Person {...CAST[currentCust.castKey]} mood="happy" x={35} y={10} size={95} />
            <text className="diagram-name" x={85} y={120} textAnchor="middle">
              {currentCust.name}
            </text>

            {/* Request bubble */}
            <g transform="translate(15, 130)">
              <rect x="0" y="0" width="140" height="40" rx="8" fill="#e0f2fe" />
              <text x="70" y="18" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">
                {en ? `Wants fish (${currentCust.price} coins)` : `Will Fisch (${currentCust.price} Münzen)`}
              </text>
              <text x="70" y="32" textAnchor="middle" fill="#0284c7" fontSize="10">
                {fishDelivered ? (en ? "Paid 3 coins!" : "3 Münzen bezahlt!") : (en ? "Drop fish here" : "Hier ablegen")}
              </text>
            </g>
          </Pop>
        </DiagramCanvas>

        {/* Floating preview while dragging */}
        {dragging && dragPos && (
          <div
            className="sales-drag-preview"
            style={{
              position: "fixed",
              left: dragPos.x - 28,
              top: dragPos.y - 28,
              pointerEvents: "none",
              zIndex: 100,
            }}
          >
            <Fish size={56} />
          </div>
        )}
      </Stage>

      <div className="sales-controls">
        <div className="sales-status-bar">
          <div className="sales-metric">
            <span className="sales-metric-label">{en ? "Customers served" : "Bediente Kundschaft"}:</span>
            <span className="sales-metric-val">{servedCount}</span>
          </div>
          <div className="sales-metric">
            <span className="sales-metric-label">{en ? "Total sales" : "Gesamtumsatz"}:</span>
            <span className="sales-metric-val">{totalSales} {en ? "coins" : "Münzen"}</span>
          </div>
        </div>

        {!isWidget && (
          <>
            <ActionPrompt lang={lang}>
              {!fishDelivered
                ? en
                  ? `Drag the fish from Finn's crate to ${currentCust.name} to make a sale!`
                  : `Ziehe den Fisch aus Finns Kiste zu ${currentCust.name}, um einen Verkauf zu machen!`
                : servedCount < 4
                ? en
                  ? "Sale made! Tap below to welcome the next customer."
                  : "Verkauf geglückt! Tippe unten für die nächste Kundschaft."
                : en
                ? "Excellent! You served 4 customers and reached 12 coins in sales!"
                : "Großartig! Du hast 4 Kundinnen und Kunden bedient und 12 Münzen Umsatz erzielt!"}
            </ActionPrompt>

            <div className="row nav">
              {fishDelivered && servedCount < 4 && (
                <ToyButton onClick={handleNextCustomer}>
                  {en ? "Next customer" : "Nächste Kundschaft"}
                </ToyButton>
              )}
            </div>
          </>
        )}

        {isWidget && onWidgetAnswer && (
          <div className="row nav">
            <CheckButton lang={lang} onClick={() => onWidgetAnswer(fishDelivered)} />
          </div>
        )}
      </div>
    </div>
  );
}
