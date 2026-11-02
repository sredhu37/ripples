import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./derivatives.css";

export type WeatherScenario = "drought" | "normal" | "flood";

export function calcDerivativeOutcome(weather: WeatherScenario, isShielded: boolean) {
  const openMarketPrice = weather === "drought" ? 8 : weather === "flood" ? 1 : 4;
  const effectivePrice = isShielded ? 4 : openMarketPrice;
  const mayaProfitPerSack = effectivePrice - 3;
  const beaFlourCostPerSack = effectivePrice;

  const mayaStatus = mayaProfitPerSack < 0 ? "danger" : "safe";
  const beaStatus = beaFlourCostPerSack > 6 ? "danger" : "safe";

  return { openMarketPrice, effectivePrice, mayaProfitPerSack, beaFlourCostPerSack, mayaStatus, beaStatus };
}

interface DerivativesToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function DerivativesToy({ lang, mode = "toy", onDone }: DerivativesToyProps) {
  const [weather, setWeather] = useState<WeatherScenario>(mode === "quiz" ? "drought" : "normal");
  const [isShielded, setIsShielded] = useState(false);
  const [hasTriedUnprotected, setHasTriedUnprotected] = useState(false);
  const [hasTriedShielded, setHasTriedShielded] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const { openMarketPrice, effectivePrice, mayaProfitPerSack, beaFlourCostPerSack, mayaStatus, beaStatus } =
    calcDerivativeOutcome(weather, isShielded);

  useEffect(() => {
    if (mode === "toy") {
      if (!isShielded && (weather === "drought" || weather === "flood")) {
        setHasTriedUnprotected(true);
      }
      if (isShielded) {
        setHasTriedShielded(true);
      }
      if (hasTriedUnprotected && hasTriedShielded && onDone) {
        onDone();
      }
    }
  }, [weather, isShielded, hasTriedUnprotected, hasTriedShielded, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (isShielded && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="derivatives-wrap">
      {/* Center Contract Desk */}
      <div className="contract-bar">
        <button
          type="button"
          className={`contract-btn ${!isShielded ? "active" : ""}`}
          onClick={() => {
            setIsShielded(false);
            setShowFeedback(false);
          }}
        >
          🎲 {lang === "en" ? "No Contract (Gamble on Weather)" : "Kein Vertrag (Wetter-Poker)"}
        </button>
        <button
          type="button"
          className={`contract-btn shield ${isShielded ? "active" : ""}`}
          onClick={() => {
            setIsShielded(true);
            setShowFeedback(false);
          }}
        >
          🛡️ {lang === "en" ? "4-Coin Price Lock Shield" : "4-Münzen-Preisschild"}
        </button>
      </div>

      <div className="derivatives-grid">
        {/* Farmer Maya */}
        <div className={`business-box maya-box ${mayaStatus}`}>
          <div className="box-title">{lang === "en" ? "Maya's Wheat Farm" : "Mayas Bauernhof"}</div>
          <div className="cost-tag">{lang === "en" ? "Cost: 3c/sack" : "Kosten: 3c/Sack"}</div>
          <div className="selling-price">
            {lang === "en" ? "Selling Price:" : "Verkaufspreis:"}{" "}
            <strong>{effectivePrice}c</strong>
          </div>
          <div className={`status-pill ${mayaStatus}`}>
            {mayaProfitPerSack >= 0
              ? `+${mayaProfitPerSack}c ${lang === "en" ? "Profit/sack" : "Gewinn/Sack"}`
              : `${mayaProfitPerSack}c ${lang === "en" ? "Loss (Bankrupt!)" : "Verlust (Pleite!)"}`}
          </div>
        </div>

        {/* Weather & Open Market */}
        <div className="weather-center">
          <div className="center-title">{lang === "en" ? "Weather & Market" : "Wetter & Markt"}</div>
          <div className="weather-options">
            <button
              type="button"
              className={`w-btn ${weather === "drought" ? "active" : ""}`}
              onClick={() => setWeather("drought")}
            >
              ☀️ {lang === "en" ? "Drought (8c)" : "Dürre (8c)"}
            </button>
            <button
              type="button"
              className={`w-btn ${weather === "normal" ? "active" : ""}`}
              onClick={() => setWeather("normal")}
            >
              🌧️ {lang === "en" ? "Normal (4c)" : "Normal (4c)"}
            </button>
            <button
              type="button"
              className={`w-btn ${weather === "flood" ? "active" : ""}`}
              onClick={() => setWeather("flood")}
            >
              🌊 {lang === "en" ? "Flood (1c)" : "Flut (1c)"}
            </button>
          </div>
          <div className="market-ticker">
            {lang === "en" ? "Open Market:" : "Freier Markt:"} <strong>{openMarketPrice}c</strong>
          </div>
        </div>

        {/* Baker Bea */}
        <div className={`business-box bea-box ${beaStatus}`}>
          <div className="box-title">{lang === "en" ? "Bea's Bakery" : "Beas Bäckerei"}</div>
          <div className="cost-tag">{lang === "en" ? "Bakes school bread" : "Schulbrot-Bedarf"}</div>
          <div className="selling-price">
            {lang === "en" ? "Flour Cost:" : "Mehlpreis:"}{" "}
            <strong>{beaFlourCostPerSack}c</strong>
          </div>
          <div className={`status-pill ${beaStatus}`}>
            {beaFlourCostPerSack <= 4
              ? lang === "en" ? "Safe & affordable!" : "Sicher & bezahlbar!"
              : lang === "en" ? "Too costly to bake!" : "Zu teuer zum Backen!"}
          </div>
        </div>
      </div>

      <div className="derivatives-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${isShielded ? "success" : "warning"}`}>
            {isShielded
              ? lang === "en"
                ? "Perfect! The price lock contract protects both Maya and Bea from wild price swings."
                : "Perfekt! Der Festpreisvertrag schützt Maya und Bea vor extremen Preissprüngen."
              : lang === "en"
              ? "Turn on the 4-Coin Price Lock Shield to protect both businesses."
              : "Aktiviere das 4-Münzen-Preisschild, um beide Betriebe abzusichern."}
          </div>
        )}
      </div>
    </div>
  );
}
