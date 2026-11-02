import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./britishinindia.css";

export function calcColonialTrade(policy: "colonial" | "fair") {
  if (policy === "colonial") {
    return {
      artisanTariff: 30,
      factoryTariff: 0,
      artisanIncome: 1,
      factoryIncome: 12,
      artisanStatus: "struggling",
      statusText: {
        en: "Heavy export taxes crushed the village handlooms.",
        de: "Hohe Exportzoelle brachten die Doerfer in Not.",
      },
    };
  }
  return {
    artisanTariff: 0,
    factoryTariff: 0,
    artisanIncome: 8,
    factoryIncome: 7,
    artisanStatus: "thriving",
    statusText: {
      en: "Fair trade allows weavers and factories to thrive on merit.",
      de: "Faire Bedingungen lassen Handwerker und Fabriken aufbluehen.",
    },
  };
}

interface BritishInIndiaToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function BritishInIndiaToy({ lang, mode = "toy", onDone }: BritishInIndiaToyProps) {
  const [policy, setPolicy] = useState<"colonial" | "fair">(
    mode === "quiz" ? "colonial" : "colonial"
  );
  const [showFeedback, setShowFeedback] = useState(false);

  const { artisanTariff, factoryTariff, artisanIncome, factoryIncome, artisanStatus, statusText } =
    calcColonialTrade(policy);

  useEffect(() => {
    if (mode === "toy" && policy === "fair" && onDone) {
      onDone();
    }
  }, [policy, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (policy === "fair" && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="colonial-wrap">
      {/* Policy Bar */}
      <div className="policy-bar">
        <button
          type="button"
          className={`pol-btn ${policy === "colonial" ? "active warning" : ""}`}
          onClick={() => {
            setPolicy("colonial");
            setShowFeedback(false);
          }}
        >
          {lang === "en" ? "Colonial Monopoly Tariffs" : "Koloniale Schutzzoelle"}
        </button>
        <button
          type="button"
          className={`pol-btn ${policy === "fair" ? "active" : ""}`}
          onClick={() => {
            setPolicy("fair");
            setShowFeedback(false);
          }}
        >
          {lang === "en" ? "Fair Reciprocal Trade" : "Faire Handelsbedingungen"}
        </button>
      </div>

      {/* Trade Balance Comparison */}
      <div className="trade-grid">
        {/* Bengal Handloom */}
        <div className={`producer-box ${artisanStatus}`}>
          <div className="prod-title">
            {lang === "en" ? "Bengal Village Weaver" : "Weber im Dorf"}
          </div>
          <div className="tariff-tag">
            {lang === "en" ? "Export Tariff:" : "Exportzoll:"} <strong>{artisanTariff}%</strong>
          </div>
          <div className="income-badge">
            {artisanIncome} {lang === "en" ? "Coins/day" : "Muenzen/Tag"}
          </div>
          <div className="prod-state">
            {artisanStatus === "thriving"
              ? lang === "en" ? "Handloom Busy & Thriving!" : "Webstuhl aktiv & erfolgreich!"
              : lang === "en" ? "Loom Silent (Crushed by Tax)" : "Webstuhl still (Ueberlastet)"}
          </div>
        </div>

        {/* Manchester Mill */}
        <div className="producer-box factory">
          <div className="prod-title">
            {lang === "en" ? "Industrial Steam Mill" : "Industrie-Dampfmuehle"}
          </div>
          <div className="tariff-tag">
            {lang === "en" ? "Import Tariff:" : "Importzoll:"} <strong>{factoryTariff}%</strong>
          </div>
          <div className="income-badge">
            {factoryIncome} {lang === "en" ? "Coins/day" : "Muenzen/Tag"}
          </div>
          <div className="prod-state">
            {policy === "colonial"
              ? lang === "en" ? "Monopoly Advantage" : "Monopol-Vorteil"
              : lang === "en" ? "Healthy Competition" : "Gesunder Wettbewerb"}
          </div>
        </div>
      </div>

      <div className="status-note">{statusText[lang]}</div>

      <div className="colonial-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${policy === "fair" ? "success" : "warning"}`}>
            {policy === "fair"
              ? lang === "en"
                ? "Excellent! Removing unfair colonial tariffs restored balance and protected local weavers."
                : "Ausgezeichnet! Faire Handelsregeln schuetzen Handwerker und schaffen Balance."
              : lang === "en"
              ? "Switch to Fair Reciprocal Trade to give local artisans an equal chance."
              : "Wechsle zu Faire Handelsbedingungen, um Handwerkern gleiche Chancen zu geben."}
          </div>
        )}
      </div>
    </div>
  );
}
