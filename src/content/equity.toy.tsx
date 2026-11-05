import { useEffect, useState } from "react";
import { CheckButton, Slider, Stage } from "../lesson/toolkit";
import type { Lang } from "../progress";
import { IceCreamCart } from "./business.diagrams";
import { WafflePressIcon } from "./equity.diagrams";

function txt(en: string, de: string, pl: string, lang: Lang): string {
  return lang === "pl" ? pl : lang === "de" ? de : en;
}

export interface EquitySimProps {
  lang: Lang;
  onDone?: () => void;
  isWidget?: boolean;
  onWidgetAnswer?: (correct: boolean) => void;
}

export function EquityPartnerToy({ lang, onDone, isWidget, onWidgetAnswer }: EquitySimProps) {
  const [cones, setCones] = useState<number>(24);

  useEffect(() => {
    onDone?.();
  }, [onDone]);

  const revenue = cones * 1;
  const ingredientsCost = Math.round(cones * 0.25);
  const helperWage = 4;
  const totalCosts = ingredientsCost + helperWage;
  const totalProfit = Math.max(0, revenue - totalCosts);

  // 50% split for Finn and Mira
  const finnShare = Math.floor(totalProfit / 2);
  const miraShare = Math.floor(totalProfit / 2);

  function handleCheck() {
    // Widget goal: total profit >= 20, miraShare >= 10
    const correct = totalProfit >= 20 && miraShare >= 10;
    onWidgetAnswer?.(correct);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "560px", margin: "0 auto" }}>
      <Stage label={txt("Finn & Mira's Partnership Cart", "Finns & Miras Gemeinschaftswagen", "Wspólny wózek Finna i Miry", lang)}>
        <svg viewBox="0 0 400 160" width="100%" height="160" style={{ display: "block" }}>
          <IceCreamCart x={120} y={15} size={130} />
          <WafflePressIcon x={245} y={25} size={50} />
          <text x={200} y={145} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
            {`${cones} ${txt("fresh waffle cones sold", "frische Waffeln verkauft", "sprzedanych świeżych gofrów", lang)}`}
          </text>
        </svg>
      </Stage>

      {/* Slider for cones sold */}
      <div style={{ padding: "0 10px" }}>
        <Slider
          label={txt("Weekly waffle cones sold", "Wöchentlich verkaufte Waffeln", "Tygodniowa sprzedaż gofrów", lang)}
          min={0}
          max={40}
          step={2}
          value={cones}
          onChange={(val) => {
            setCones(val);
            onDone?.();
          }}
        />
      </div>

      {/* Financial Statement & Equity Distribution */}
      <div
        style={{
          background: "#f8fafc",
          border: "2px solid #cbd5e1",
          borderRadius: "12px",
          padding: "14px 18px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          fontSize: "14px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "6px" }}>
          <span>
            <strong>{txt("Sales", "Einnahmen", "Sprzedaż", lang)}:</strong> +{revenue} {txt("coins", "Münzen", "monet", lang)}
          </span>
          <span>
            <strong>{txt("Costs", "Kosten", "Koszty", lang)}:</strong> -{totalCosts} (Leo: 4, {txt("Ingredients", "Zutaten", "Składniki", lang)}: {ingredientsCost})
          </span>
          <span style={{ color: "#15803d", fontWeight: "bold" }}>
            {txt("Total Profit", "Gewinn", "Zysk", lang)}: +{totalProfit} {txt("coins", "Münzen", "monet", lang)}
          </span>
        </div>

        {/* 50/50 Equity Split cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "4px" }}>
          <div style={{ background: "#eff6ff", border: "1.5px solid #93c5fd", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
            <div style={{ fontWeight: "bold", color: "#1e40af", fontSize: "13px" }}>
              Finn (50% {txt("Equity", "Anteil", "Udział", lang)})
            </div>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#2563eb", marginTop: "4px" }}>
              +{finnShare} {txt("coins", "Münzen", "monet", lang)}
            </div>
            <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
              {txt("Founder", "Gründer", "Założyciel", lang)}
            </div>
          </div>

          <div style={{ background: "#fdf2f8", border: "1.5px solid #f472b6", borderRadius: "8px", padding: "10px", textAlign: "center" }}>
            <div style={{ fontWeight: "bold", color: "#9d174d", fontSize: "13px" }}>
              Mira (50% {txt("Equity", "Anteil", "Udział", lang)})
            </div>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#db2777", marginTop: "4px" }}>
              +{miraShare} {txt("coins", "Münzen", "monet", lang)}
            </div>
            <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
              {txt("Investor Partner", "Partnerin", "Inwestorka", lang)}
            </div>
          </div>
        </div>
      </div>

      {isWidget && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "6px" }}>
          <CheckButton lang={lang} onClick={handleCheck} />
        </div>
      )}
    </div>
  );
}
