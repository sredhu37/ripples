import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./tools.css";

export type PowerSource = "muscle" | "waterwheel" | "steam";

export function calcSteamPower(
  source: PowerSource,
  hasCoal: boolean,
  hasWater: boolean
) {
  if (source === "muscle") {
    return { power: 10, isContinuous: false, status: "muscle" as const };
  }
  if (source === "waterwheel") {
    return { power: 30, isContinuous: false, status: "weather" as const };
  }
  if (hasCoal && hasWater) {
    return { power: 100, isContinuous: true, status: "full_steam" as const };
  }
  return { power: 0, isContinuous: false, status: "empty" as const };
}

interface ToolsToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function ToolsToy({ lang, mode = "toy", onDone }: ToolsToyProps) {
  const [source, setSource] = useState<PowerSource>(mode === "quiz" ? "muscle" : "steam");
  const [hasCoal, setHasCoal] = useState(mode !== "quiz");
  const [hasWater, setHasWater] = useState(mode !== "quiz");
  const [showFeedback, setShowFeedback] = useState(false);

  const { power, isContinuous, status } = calcSteamPower(source, hasCoal, hasWater);

  useEffect(() => {
    if (mode === "toy" && isContinuous && onDone) {
      onDone();
    }
  }, [isContinuous, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (isContinuous && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="tools-wrap">
      {/* Source selector buttons */}
      <div className="tools-sources-bar">
        <button
          type="button"
          className={`tools-source-btn ${source === "muscle" ? "active" : ""}`}
          onClick={() => {
            setSource("muscle");
            setShowFeedback(false);
          }}
        >
          {lang === "en" ? "Muscle Power (10 kW)" : "Muskelkraft (10 kW)"}
        </button>
        <button
          type="button"
          className={`tools-source-btn ${source === "waterwheel" ? "active" : ""}`}
          onClick={() => {
            setSource("waterwheel");
            setShowFeedback(false);
          }}
        >
          {lang === "en" ? "Waterwheel (30 kW)" : "Wasserrad (30 kW)"}
        </button>
        <button
          type="button"
          className={`tools-source-btn ${source === "steam" ? "active" : ""}`}
          onClick={() => {
            setSource("steam");
            setShowFeedback(false);
          }}
        >
          {lang === "en" ? "Steam Engine (100 kW)" : "Dampfmaschine (100 kW)"}
        </button>
      </div>

      {/* Steam fuel actions */}
      {source === "steam" && (
        <div className="tools-steam-inputs">
          <button
            type="button"
            className={`tools-action-btn ${hasCoal ? "active" : ""}`}
            onClick={() => {
              setHasCoal((prev) => !prev);
              setShowFeedback(false);
            }}
          >
            {hasCoal
              ? lang === "en"
                ? "Furnace: Coal Burning"
                : "Ofen: Kohle brennt"
              : lang === "en"
              ? "Add Coal to Furnace"
              : "Kohle in den Ofen geben"}
          </button>
          <button
            type="button"
            className={`tools-action-btn ${hasWater ? "active" : ""}`}
            onClick={() => {
              setHasWater((prev) => !prev);
              setShowFeedback(false);
            }}
          >
            {hasWater
              ? lang === "en"
                ? "Boiler: Water Full"
                : "Kessel: Wasser gefuellt"
              : lang === "en"
              ? "Fill Boiler with Water"
              : "Kessel mit Wasser fuellen"}
          </button>
        </div>
      )}

      {/* Power dashboard display */}
      <div className={`tools-power-display ${status}`}>
        <div className="tools-pd-header">
          <span>{lang === "en" ? "Mechanical Output Power:" : "Mechanische Leistung:"}</span>
          <strong>{power} kW</strong>
        </div>
        <div className="tools-pd-bar">
          <div className="tools-pd-fill" style={{ width: `${power}%` }} />
        </div>
        <div className="tools-pd-status">
          {source === "muscle" && (
            <span>{lang === "en" ? "Limited by human and animal fatigue." : "Begrenzt durch Ermuedung von Mensch und Tier."}</span>
          )}
          {source === "waterwheel" && (
            <span>{lang === "en" ? "Clean, but ceases during dry summers and icy winters." : "Sauber, aber abhaengig von Flusspegel und Jahreszeiten."}</span>
          )}
          {source === "steam" && isContinuous && (
            <span>{lang === "en" ? "Continuous day and night power drives heavy factory machines!" : "Dauerhafte Kraft treibt Fabriken und Zuege Tag und Nacht an!"}</span>
          )}
          {source === "steam" && !isContinuous && (
            <span>{lang === "en" ? "Needs both coal heat and water to create steam pressure." : "Benoetigt Kohle und Wasser, um Dampfdruck aufzubauen."}</span>
          )}
        </div>
      </div>

      <div className="tools-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`tools-feedback-msg ${isContinuous ? "success" : "warning"}`}>
            {isContinuous
              ? lang === "en"
                ? "Excellent! The steam engine provides tireless continuous power regardless of season."
                : "Hervorragend! Die Dampfmaschine liefert unermuedliche Kraft unabhaengig vom Wetter."
              : lang === "en"
              ? "Select Steam Engine and add both coal and water."
              : "Waehle Dampfmaschine und fuege Kohle und Wasser hinzu."}
          </div>
        )}
      </div>
    </div>
  );
}
