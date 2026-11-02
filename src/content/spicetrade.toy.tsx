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
          {lang === "en" ? "Overland Silk Road" : "Seidenstrasse ueber Land"}
        </button>
        <button
          type="button"
          className={`r-btn ${route === "ocean" ? "active" : ""}`}
          onClick={() => {
            setRoute("ocean");
            setShowFeedback(false);
          }}
        >
          {lang === "en" ? "Maritime Ocean Route" : "Seeweg ueber den Ozean"}
        </button>
      </div>

      {/* Wind Selector (for ocean) */}
      {route === "ocean" && (
        <div className="wind-bar">
          <span className="wind-label">{lang === "en" ? "Monsoon Wind:" : "Monsunwind:"}</span>
          <button
            type="button"
            className={`w-pill ${wind === "summer" ? "active" : ""}`}
            onClick={() => {
              setWind("summer");
              setShowFeedback(false);
            }}
          >
            {lang === "en" ? "Summer South-West (Tailwind)" : "Sommer-Suedwest (Rueckenwind)"}
          </button>
          <button
            type="button"
            className={`w-pill ${wind === "winter" ? "active" : ""}`}
            onClick={() => {
              setWind("winter");
              setShowFeedback(false);
            }}
          >
            {lang === "en" ? "Winter North-East (Headwind)" : "Winter-Nordost (Gegenwind)"}
          </button>
        </div>
      )}

      {/* Voyage Overview Card */}
      <div className={`voyage-card ${status}`}>
        <div className="voyage-title">
          {route === "land"
            ? lang === "en" ? "Silk Road Mountain Trek" : "Karawane durch Wueste und Berge"
            : wind === "summer"
            ? lang === "en" ? "High-Speed Monsoon Voyage!" : "Schnelle Monsun-Fahrt!"
            : lang === "en" ? "Sailing against Headwinds" : "Fahrt gegen den Gegenwind"}
        </div>
        <div className="stats-row">
          <div className="s-item">
            <span className="s-lbl">{lang === "en" ? "Duration" : "Reisezeit"}</span>
            <span className="s-val">{months} {lang === "en" ? "Months" : "Monate"}</span>
          </div>
          <div className="s-item">
            <span className="s-lbl">{lang === "en" ? "Cargo" : "Ladung"}</span>
            <span className="s-val">{capacity} {lang === "en" ? "Sacks" : "Saecke"}</span>
          </div>
          <div className="s-item">
            <span className="s-lbl">{lang === "en" ? "Road Tolls" : "Wegzoelle"}</span>
            <span className="s-val">{tolls} {lang === "en" ? "Coins" : "Muenzen"}</span>
          </div>
          <div className="s-item highlight">
            <span className="s-lbl">{lang === "en" ? "Profit" : "Gewinn"}</span>
            <span className="s-val">+{profit} {lang === "en" ? "Silver" : "Silber"}</span>
          </div>
        </div>
      </div>

      <div className="spicetrade-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${route === "ocean" && wind === "summer" ? "success" : "warning"}`}>
            {route === "ocean" && wind === "summer"
              ? lang === "en"
                ? "Excellent navigation! The summer monsoon carried 50 sacks of pepper safely to harbor."
                : "Ausgezeichnete Navigation! Der Sommermonsun trug 50 Saecke Pfeffer sicher in den Hafen."
              : lang === "en"
              ? "Select the Ocean Route with Summer Monsoon wind to maximize speed and cargo."
              : "Waehle den Seeweg mit Sommermonsun, um Geschwindigkeit und Ladung zu maximieren."}
          </div>
        )}
      </div>
    </div>
  );
}
