import { useEffect, useState } from "react";
import { CheckButton, Slider, Stage, ToyButton } from "../lesson/toolkit";
import type { Lang } from "../progress";
import { IceCreamCart, RainCloudIcon, SunIcon } from "./business.diagrams";

function txt(en: string, de: string, pl: string, lang: Lang): string {
  return lang === "pl" ? pl : lang === "de" ? de : en;
}

export interface BusinessSimProps {
  lang: Lang;
  onDone?: () => void;
  isWidget?: boolean;
  onWidgetAnswer?: (correct: boolean) => void;
}

export function BusinessCartToy({ lang, onDone, isWidget, onWidgetAnswer }: BusinessSimProps) {
  const [weather, setWeather] = useState<"sunny" | "rainy">("sunny");
  const [hasHelper, setHasHelper] = useState<boolean>(true);
  const [scoops, setScoops] = useState<number>(20);

  useEffect(() => {
    onDone?.();
  }, [onDone]);

  // If rainy, scoops sold is always 0.
  const actualScoops = weather === "sunny" ? scoops : 0;
  const revenue = actualScoops * 1;
  const creamCost = weather === "sunny" ? Math.max(2, Math.round(actualScoops * 0.2)) : 2; // melted cream waste
  const helperWage = hasHelper ? 4 : 0;
  const totalCosts = creamCost + helperWage;
  const netProfit = revenue - totalCosts;

  const isProfit = netProfit >= 0;

  function handleCheck() {
    // In widget: target is sunny day, helper hired, profit >= 10 coins
    const correct = weather === "sunny" && hasHelper && netProfit >= 10;
    onWidgetAnswer?.(correct);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "100%",
        maxWidth: "560px",
        margin: "0 auto",
      }}
    >
      <Stage
        label={txt("Finn's Ice Cream Business", "Finns Eisgeschäft", "Lodziarnia Finna", lang)}
      >
        <svg viewBox="0 0 400 160" width="100%" height="160" style={{ display: "block" }}>
          {weather === "sunny" ? (
            <SunIcon x={30} y={15} size={50} />
          ) : (
            <RainCloudIcon x={25} y={15} size={65} />
          )}
          <IceCreamCart x={150} y={15} size={130} />
          <text x={200} y={145} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
            {weather === "sunny"
              ? `${actualScoops} ${txt("scoops sold", "Kugeln verkauft", "sprzedanych gałek", lang)}`
              : txt(
                  "Rainy day: 0 scoops sold!",
                  "Regentag: 0 Kugeln verkauft!",
                  "Deszczowy dzień: 0 gałek!",
                  lang,
                )}
          </text>
        </svg>
      </Stage>

      {/* Weather and Helper Controls */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <ToyButton
          pressed={weather === "sunny"}
          onClick={() => {
            setWeather("sunny");
            onDone?.();
          }}
        >
          ☀️ {txt("Sunny", "Sonne", "Słońce", lang)}
        </ToyButton>
        <ToyButton
          pressed={weather === "rainy"}
          onClick={() => {
            setWeather("rainy");
            onDone?.();
          }}
        >
          🌧️ {txt("Rainy", "Regen", "Deszcz", lang)}
        </ToyButton>
        <ToyButton
          pressed={hasHelper}
          onClick={() => {
            setHasHelper((prev) => !prev);
            onDone?.();
          }}
        >
          👤{" "}
          {hasHelper
            ? txt("Helper Leo (4 coins)", "Helfer Leo (4 Münzen)", "Pomocnik Leo (4 monety)", lang)
            : txt("Solo (No helper)", "Allein (Kein Helfer)", "Sam (Bez pomocnika)", lang)}
        </ToyButton>
      </div>

      {/* Scoop slider (only active when sunny) */}
      {weather === "sunny" && (
        <div style={{ padding: "0 10px" }}>
          <Slider
            label={txt(
              "Ice cream scoops sold",
              "Verkaufte Eiskugeln",
              "Sprzedane gałki lodów",
              lang,
            )}
            min={0}
            max={30}
            step={2}
            value={scoops}
            onChange={(val) => {
              setScoops(val);
              onDone?.();
            }}
          />
        </div>
      )}

      {/* Financial statement card */}
      <div
        style={{
          background: isProfit ? "#f0fdf4" : "#fff1f2",
          border: `2px solid ${isProfit ? "#86efac" : "#fda4af"}`,
          borderRadius: "12px",
          padding: "14px 18px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          fontSize: "14px",
        }}
      >
        <div>
          <span style={{ color: "#166534", fontWeight: "bold" }}>
            {txt("Sales Revenue", "Einnahmen", "Przychód", lang)}:
          </span>{" "}
          +{revenue} {txt("coins", "Münzen", "monet", lang)}
        </div>
        <div>
          <span style={{ color: "#991b1b", fontWeight: "bold" }}>
            {txt("Cream Cost", "Sahne-Kosten", "Koszt śmietanki", lang)}:
          </span>{" "}
          -{creamCost} {txt("coins", "Münzen", "monet", lang)}
        </div>
        <div>
          <span style={{ color: "#991b1b", fontWeight: "bold" }}>
            {txt("Helper Wage", "Lohn Helfer", "Pensja pomocnika", lang)}:
          </span>{" "}
          -{helperWage} {txt("coins", "Münzen", "monet", lang)}
        </div>
        <div
          style={{
            gridColumn: "span 2",
            borderTop: "1px dashed #cbd5e1",
            paddingTop: "8px",
            marginTop: "4px",
          }}
        >
          <strong style={{ fontSize: "16px", color: isProfit ? "#15803d" : "#b91c1c" }}>
            {isProfit
              ? `★ ${txt("Owner's Profit", "Finns Gewinn", "Zysk właściciela", lang)}: +${netProfit} ${txt("coins", "Münzen", "monet", lang)}`
              : `⚠ ${txt("Owner's Loss", "Finns Verlust", "Strata właściciela", lang)}: ${netProfit} ${txt("coins", "Münzen", "monet", lang)}`}
          </strong>
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
