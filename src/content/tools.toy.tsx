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

  const muscleLabel =
    lang === "pl"
      ? "Siła mięśni (10 kW)"
      : lang === "de"
      ? "Muskelkraft (10 kW)"
      : "Muscle Power (10 kW)";

  const waterwheelLabel =
    lang === "pl"
      ? "Koło wodne (30 kW)"
      : lang === "de"
      ? "Wasserrad (30 kW)"
      : "Waterwheel (30 kW)";

  const steamLabel =
    lang === "pl"
      ? "Maszyna parowa (100 kW)"
      : lang === "de"
      ? "Dampfmaschine (100 kW)"
      : "Steam Engine (100 kW)";

  const coalBurningText =
    lang === "pl"
      ? "Piec: Węgiel płonie"
      : lang === "de"
      ? "Ofen: Kohle brennt"
      : "Furnace: Coal Burning";

  const addCoalText =
    lang === "pl"
      ? "Dodaj węgiel do pieca"
      : lang === "de"
      ? "Kohle in den Ofen geben"
      : "Add Coal to Furnace";

  const waterFullText =
    lang === "pl"
      ? "Kocioł: Woda napełniona"
      : lang === "de"
      ? "Kessel: Wasser gefuellt"
      : "Boiler: Water Full";

  const fillWaterText =
    lang === "pl"
      ? "Napełnij kocioł wodą"
      : lang === "de"
      ? "Kessel mit Wasser fuellen"
      : "Fill Boiler with Water";

  const powerOutputHeader =
    lang === "pl"
      ? "Mechaniczna moc wyjściowa:"
      : lang === "de"
      ? "Mechanische Leistung:"
      : "Mechanical Output Power:";

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
          {muscleLabel}
        </button>
        <button
          type="button"
          className={`tools-source-btn ${source === "waterwheel" ? "active" : ""}`}
          onClick={() => {
            setSource("waterwheel");
            setShowFeedback(false);
          }}
        >
          {waterwheelLabel}
        </button>
        <button
          type="button"
          className={`tools-source-btn ${source === "steam" ? "active" : ""}`}
          onClick={() => {
            setSource("steam");
            setShowFeedback(false);
          }}
        >
          {steamLabel}
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
            {hasCoal ? coalBurningText : addCoalText}
          </button>
          <button
            type="button"
            className={`tools-action-btn ${hasWater ? "active" : ""}`}
            onClick={() => {
              setHasWater((prev) => !prev);
              setShowFeedback(false);
            }}
          >
            {hasWater ? waterFullText : fillWaterText}
          </button>
        </div>
      )}

      {/* Power dashboard display */}
      <div className={`tools-power-display ${status}`}>
        <div className="tools-pd-header">
          <span>{powerOutputHeader}</span>
          <strong>{power} kW</strong>
        </div>
        <div className="tools-pd-bar">
          <div className="tools-pd-fill" style={{ width: `${power}%` }} />
        </div>
        <div className="tools-pd-status">
          {source === "muscle" && (
            <span>
              {lang === "pl"
                ? "Ograniczona szybkim zmęczeniem ludzi i zwierząt roboczych."
                : lang === "de"
                ? "Begrenzt durch Ermuedung von Mensch und Tier."
                : "Limited by human and animal fatigue."}
            </span>
          )}
          {source === "waterwheel" && (
            <span>
              {lang === "pl"
                ? "Czysta energia, lecz zamiera w czasie letnich susz i mroźnych zim."
                : lang === "de"
                ? "Sauber, aber abhaengig von Flusspegel und Jahreszeiten."
                : "Clean, but ceases during dry summers and icy winters."}
            </span>
          )}
          {source === "steam" && isContinuous && (
            <span>
              {lang === "pl"
                ? "Ciągła praca w dzień i w nocy napędza potężne maszyny fabryczne i pociągi!"
                : lang === "de"
                ? "Dauerhafte Kraft treibt Fabriken und Zuege Tag und Nacht an!"
                : "Continuous day and night power drives heavy factory machines!"}
            </span>
          )}
          {source === "steam" && !isContinuous && (
            <span>
              {lang === "pl"
                ? "Wymaga zarówno węgla w palenisku, jak i wody w kotle, by wytworzyć parę."
                : lang === "de"
                ? "Benoetigt Kohle und Wasser, um Dampfdruck aufzubauen."
                : "Needs both coal heat and water to create steam pressure."}
            </span>
          )}
        </div>
      </div>

      <div className="tools-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`tools-feedback-msg ${isContinuous ? "success" : "warning"}`}>
            {isContinuous
              ? lang === "pl"
                ? "Znakomicie! Maszyna parowa dostarcza niezmordowaną, ciągłą moc niezależnie od pory roku i pogody."
                : lang === "de"
                ? "Hervorragend! Die Dampfmaschine liefert unermuedliche Kraft unabhaengig vom Wetter."
                : "Excellent! The steam engine provides tireless continuous power regardless of season."
              : lang === "pl"
              ? "Wybierz Maszynę parową i dodaj do niej zarówno węgiel, jak i wodę."
              : lang === "de"
              ? "Waehle Dampfmaschine und fuege Kohle und Wasser hinzu."
              : "Select Steam Engine and add both coal and water."}
          </div>
        )}
      </div>
    </div>
  );
}
