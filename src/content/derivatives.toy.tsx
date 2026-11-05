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

  const gambleBtn =
    lang === "pl" ? "Brak kontraktu (Ryzyko pogodowe)" : lang === "de" ? "Kein Vertrag (Wetter-Poker)" : "No Contract (Gamble on Weather)";
  const shieldBtn =
    lang === "pl" ? "Tarcza cenowa: 4 monety" : lang === "de" ? "4-Münzen-Preisschild" : "4-Coin Price Lock Shield";

  const mayaFarmTitle =
    lang === "pl" ? "Pole pszenicy Mayi" : lang === "de" ? "Mayas Bauernhof" : "Maya's Wheat Farm";
  const mayaCostTag =
    lang === "pl" ? "Koszt: 3m/worek" : lang === "de" ? "Kosten: 3c/Sack" : "Cost: 3c/sack";
  const sellingPriceLabel =
    lang === "pl" ? "Cena sprzedaży:" : lang === "de" ? "Verkaufspreis:" : "Selling Price:";

  const mayaProfitTag =
    mayaProfitPerSack >= 0
      ? `+${mayaProfitPerSack}m ${lang === "pl" ? "Zysk/worek" : lang === "de" ? "Gewinn/Sack" : "Profit/sack"}`
      : `${mayaProfitPerSack}m ${lang === "pl" ? "Strata (Bankructwo!)" : lang === "de" ? "Verlust (Pleite!)" : "Loss (Bankrupt!)"}`;

  const weatherCenterTitle =
    lang === "pl" ? "Pogoda i rynek" : lang === "de" ? "Wetter & Markt" : "Weather & Market";
  const droughtBtn =
    lang === "pl" ? "Susza (8m)" : lang === "de" ? "Dürre (8c)" : "Drought (8c)";
  const normalWeatherBtn =
    lang === "pl" ? "Zwykła (4m)" : lang === "de" ? "Normal (4c)" : "Normal (4c)";
  const floodBtn =
    lang === "pl" ? "Powódź (1m)" : lang === "de" ? "Flut (1c)" : "Flood (1c)";

  const openMarketTicker =
    lang === "pl" ? "Wolny rynek:" : lang === "de" ? "Freier Markt:" : "Open Market:";

  const beaBakeryTitle =
    lang === "pl" ? "Piekarnia Bei" : lang === "de" ? "Beas Bäckerei" : "Bea's Bakery";
  const beaNeedTag =
    lang === "pl" ? "Piecze chleb do szkół" : lang === "de" ? "Schulbrot-Bedarf" : "Bakes school bread";
  const flourCostLabel =
    lang === "pl" ? "Koszt mąki:" : lang === "de" ? "Mehlpreis:" : "Flour Cost:";

  const beaStatusTag =
    beaFlourCostPerSack <= 4
      ? lang === "pl" ? "Bezpiecznie i tanio!" : lang === "de" ? "Sicher & bezahlbar!" : "Safe & affordable!"
      : lang === "pl" ? "Za drogo na wypieki!" : lang === "de" ? "Zu teuer zum Backen!" : "Too costly to bake!";

  const successMsg =
    lang === "pl"
      ? "Idealnie! Kontrakt blokujący cenę chroni Mayę i Beę przed gwałtownymi wstrząsami rynkowymi."
      : lang === "de"
      ? "Perfekt! Der Festpreisvertrag schützt Maya und Bea vor extremen Preissprüngen."
      : "Perfect! The price lock contract protects both Maya and Bea from wild price swings.";

  const promptMsg =
    lang === "pl"
      ? "Włącz tarczę cenową 4 monet, aby zabezpieczyć oba przedsiębiorstwa."
      : lang === "de"
      ? "Aktiviere das 4-Münzen-Preisschild, um beide Betriebe abzusichern."
      : "Turn on the 4-Coin Price Lock Shield to protect both businesses.";

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
          🎲 {gambleBtn}
        </button>
        <button
          type="button"
          className={`contract-btn shield ${isShielded ? "active" : ""}`}
          onClick={() => {
            setIsShielded(true);
            setShowFeedback(false);
          }}
        >
          🛡️ {shieldBtn}
        </button>
      </div>

      <div className="derivatives-grid">
        {/* Farmer Maya */}
        <div className={`business-box maya-box ${mayaStatus}`}>
          <div className="box-title">{mayaFarmTitle}</div>
          <div className="cost-tag">{mayaCostTag}</div>
          <div className="selling-price">
            {sellingPriceLabel}{" "}
            <strong>{effectivePrice}c</strong>
          </div>
          <div className={`status-pill ${mayaStatus}`}>
            {mayaProfitTag}
          </div>
        </div>

        {/* Weather & Open Market */}
        <div className="weather-center">
          <div className="center-title">{weatherCenterTitle}</div>
          <div className="weather-options">
            <button
              type="button"
              className={`w-btn ${weather === "drought" ? "active" : ""}`}
              onClick={() => setWeather("drought")}
            >
              ☀️ {droughtBtn}
            </button>
            <button
              type="button"
              className={`w-btn ${weather === "normal" ? "active" : ""}`}
              onClick={() => setWeather("normal")}
            >
              🌧️ {normalWeatherBtn}
            </button>
            <button
              type="button"
              className={`w-btn ${weather === "flood" ? "active" : ""}`}
              onClick={() => setWeather("flood")}
            >
              🌊 {floodBtn}
            </button>
          </div>
          <div className="market-ticker">
            {openMarketTicker} <strong>{openMarketPrice}c</strong>
          </div>
        </div>

        {/* Baker Bea */}
        <div className={`business-box bea-box ${beaStatus}`}>
          <div className="box-title">{beaBakeryTitle}</div>
          <div className="cost-tag">{beaNeedTag}</div>
          <div className="selling-price">
            {flourCostLabel}{" "}
            <strong>{beaFlourCostPerSack}c</strong>
          </div>
          <div className={`status-pill ${beaStatus}`}>
            {beaStatusTag}
          </div>
        </div>
      </div>

      <div className="derivatives-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${isShielded ? "success" : "warning"}`}>
            {isShielded ? successMsg : promptMsg}
          </div>
        )}
      </div>
    </div>
  );
}
