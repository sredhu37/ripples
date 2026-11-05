import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./spicetrade.css";

export function calcSpiceVoyage(route: "land" | "ocean", wind: "summer" | "winter") {
  if (route === "land") {
    return {
      months: 12,
      capacity: 10,
      tolls: 40,
      profit: 20,
      status: "slow",
    };
  }
  if (wind === "summer") {
    return {
      months: 3,
      capacity: 50,
      tolls: 0,
      profit: 150,
      status: "favorable",
    };
  }
  return {
    months: 8,
    capacity: 50,
    tolls: 0,
    profit: 80,
    status: "headwind",
  };
}

interface SpiceTradeToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function SpiceTradeToy({ lang, mode = "toy", onDone }: SpiceTradeToyProps) {
  const [route, setRoute] = useState<"land" | "ocean">(mode === "quiz" ? "land" : "ocean");
  const [wind, setWind] = useState<"summer" | "winter">("winter");
  const [hasSailedFavorable, setHasSailedFavorable] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const { months, capacity, tolls, profit, status } = calcSpiceVoyage(route, wind);

  useEffect(() => {
    if (mode === "toy") {
      if (route === "ocean" && wind === "summer") {
        setHasSailedFavorable(true);
      }
      if (hasSailedFavorable && onDone) {
        onDone();
      }
    }
  }, [route, wind, hasSailedFavorable, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (route === "ocean" && wind === "summer" && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  const landRouteLabel =
    lang === "pl" ? "Lądowy Jedwabny Szlak" : lang === "de" ? "Seidenstrasse ueber Land" : "Overland Silk Road";
  const oceanRouteLabel =
    lang === "pl" ? "Morski szlak oceaniczny" : lang === "de" ? "Seeweg ueber den Ozean" : "Maritime Ocean Route";

  const windLabel =
    lang === "pl" ? "Wiatr monsunowy:" : lang === "de" ? "Monsunwind:" : "Monsoon Wind:";

  const summerWindLabel =
    lang === "pl"
      ? "Letni południowo-zachodni (z wiatrem)"
      : lang === "de"
      ? "Sommer-Suedwest (Rueckenwind)"
      : "Summer South-West (Tailwind)";

  const winterWindLabel =
    lang === "pl"
      ? "Zimowy północno-wschodni (pod wiatr)"
      : lang === "de"
      ? "Winter-Nordost (Gegenwind)"
      : "Winter North-East (Headwind)";

  const voyageTitle =
    route === "land"
      ? lang === "pl"
        ? "Wyprawa karawaną przez góry i pustynie"
        : lang === "de"
        ? "Karawane durch Wueste und Berge"
        : "Silk Road Mountain Trek"
      : wind === "summer"
      ? lang === "pl"
        ? "Błyskawiczny rejs z letnim monsunem!"
        : lang === "de"
        ? "Schnelle Monsun-Fahrt!"
        : "High-Speed Monsoon Voyage!"
      : lang === "pl"
      ? "Żegluga pod wiatr z trudem"
      : lang === "de"
      ? "Fahrt gegen den Gegenwind"
      : "Sailing against Headwinds";

  const durationLabel =
    lang === "pl" ? "Czas podróży" : lang === "de" ? "Reisezeit" : "Duration";
  const monthsUnit =
    lang === "pl" ? "Miesięcy" : lang === "de" ? "Monate" : "Months";

  const cargoLabel =
    lang === "pl" ? "Ładunek" : lang === "de" ? "Ladung" : "Cargo";
  const sacksUnit =
    lang === "pl" ? "Worków" : lang === "de" ? "Saecke" : "Sacks";

  const tollsLabel =
    lang === "pl" ? "Rogatki i cła" : lang === "de" ? "Wegzoelle" : "Road Tolls";
  const coinsUnit =
    lang === "pl" ? "Monet" : lang === "de" ? "Muenzen" : "Coins";

  const profitLabel =
    lang === "pl" ? "Zysk" : lang === "de" ? "Gewinn" : "Profit";
  const silverUnit =
    lang === "pl" ? "Srebra" : lang === "de" ? "Silber" : "Silver";

  return (
    <div className="spicetrade-wrap">
      {/* Route Selector */}
      <div className="route-bar">
        <button
          type="button"
          className={`r-btn ${route === "land" ? "active" : ""}`}
          onClick={() => {
            setRoute("land");
            setShowFeedback(false);
          }}
        >
          {landRouteLabel}
        </button>
        <button
          type="button"
          className={`r-btn ${route === "ocean" ? "active" : ""}`}
          onClick={() => {
            setRoute("ocean");
            setShowFeedback(false);
          }}
        >
          {oceanRouteLabel}
        </button>
      </div>

      {/* Wind Selector (for ocean) */}
      {route === "ocean" && (
        <div className="wind-bar">
          <span className="wind-label">{windLabel}</span>
          <button
            type="button"
            className={`w-pill ${wind === "summer" ? "active" : ""}`}
            onClick={() => {
              setWind("summer");
              setShowFeedback(false);
            }}
          >
            {summerWindLabel}
          </button>
          <button
            type="button"
            className={`w-pill ${wind === "winter" ? "active" : ""}`}
            onClick={() => {
              setWind("winter");
              setShowFeedback(false);
            }}
          >
            {winterWindLabel}
          </button>
        </div>
      )}

      {/* Voyage Overview Card */}
      <div className={`voyage-card ${status}`}>
        <div className="voyage-title">
          {voyageTitle}
        </div>
        <div className="stats-row">
          <div className="s-item">
            <span className="s-lbl">{durationLabel}</span>
            <span className="s-val">{months} {monthsUnit}</span>
          </div>
          <div className="s-item">
            <span className="s-lbl">{cargoLabel}</span>
            <span className="s-val">{capacity} {sacksUnit}</span>
          </div>
          <div className="s-item">
            <span className="s-lbl">{tollsLabel}</span>
            <span className="s-val">{tolls} {coinsUnit}</span>
          </div>
          <div className="s-item highlight">
            <span className="s-lbl">{profitLabel}</span>
            <span className="s-val">+{profit} {silverUnit}</span>
          </div>
        </div>
      </div>

      <div className="spicetrade-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${route === "ocean" && wind === "summer" ? "success" : "warning"}`}>
            {route === "ocean" && wind === "summer"
              ? lang === "pl"
                ? "Wspaniała nawigacja! Letni monsun bezpiecznie przywiódł 50 worków pieprzu prosto do portu."
                : lang === "de"
                ? "Ausgezeichnete Navigation! Der Sommermonsun trug 50 Saecke Pfeffer sicher in den Hafen."
                : "Excellent navigation! The summer monsoon carried 50 sacks of pepper safely to harbor."
              : lang === "pl"
              ? "Wybierz szlak oceaniczny z letnim monsunem, aby zmaksymalizować prędkość i zysk."
              : lang === "de"
              ? "Waehle den Seeweg mit Sommermonsun, um Geschwindigkeit und Ladung zu maximieren."
              : "Select the Ocean Route with Summer Monsoon wind to maximize speed and cargo."}
          </div>
        )}
      </div>
    </div>
  );
}
