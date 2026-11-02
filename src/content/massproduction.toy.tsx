import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./massproduction.css";

export type ProductionMode = "craft" | "assembly";

export function calcAssemblyThroughput(mode: ProductionMode, stage: number) {
  if (mode === "craft") {
    return {
      bikesProduced: 1,
      costPerBike: 500,
      hoursSpent: 10,
      isAffordable: false,
      status: "craft" as const,
    };
  }
  const bikesProduced = Math.min(10, Math.max(1, stage * 3 + 1));
  const costPerBike = 50;
  const isAffordable = bikesProduced >= 10;
  return {
    bikesProduced,
    costPerBike,
    hoursSpent: 10,
    isAffordable,
    status: "assembly" as const,
  };
}

interface MassProductionToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function MassProductionToy({ lang, mode = "toy", onDone }: MassProductionToyProps) {
  const [prodMode, setProdMode] = useState<ProductionMode>(mode === "quiz" ? "craft" : "assembly");
  const [stage, setStage] = useState(mode === "quiz" ? 0 : 3);
  const [showFeedback, setShowFeedback] = useState(false);

  const { bikesProduced, costPerBike, hoursSpent, isAffordable, status } = calcAssemblyThroughput(
    prodMode,
    stage
  );

  useEffect(() => {
    if (mode === "toy" && prodMode === "assembly" && isAffordable && onDone) {
      onDone();
    }
  }, [prodMode, isAffordable, mode, onDone]);

  const handleAdvance = () => {
    if (stage < 3) {
      setStage((prev) => prev + 1);
      setShowFeedback(false);
    }
  };

  const handleReset = () => {
    setStage(0);
    setShowFeedback(false);
  };

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (prodMode === "assembly" && isAffordable && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="massproduction-wrap">
      {/* Mode selection buttons */}
      <div className="massproduction-modes-bar">
        <button
          type="button"
          className={`massproduction-mode-btn ${prodMode === "craft" ? "active" : ""}`}
          onClick={() => {
            setProdMode("craft");
            setShowFeedback(false);
          }}
        >
          {lang === "en" ? "Artisan Workshop" : "Handwerksbetrieb"}
        </button>
        <button
          type="button"
          className={`massproduction-mode-btn ${prodMode === "assembly" ? "active" : ""}`}
          onClick={() => {
            setProdMode("assembly");
            setShowFeedback(false);
          }}
        >
          {lang === "en" ? "Moving Assembly Line" : "Fliessband-Fertigung"}
        </button>
      </div>

      {/* Assembly conveyor line visual */}
      <div className={`massproduction-conveyor-card ${status}`}>
        <div className="massproduction-conveyor-stations">
          <div className={`massproduction-station ${prodMode === "assembly" && stage >= 1 ? "done" : ""}`}>
            <span className="station-num">1</span>
            <span className="station-name">{lang === "en" ? "Weld Frame" : "Rahmen schweißen"}</span>
          </div>
          <div className={`massproduction-station ${prodMode === "assembly" && stage >= 2 ? "done" : ""}`}>
            <span className="station-num">2</span>
            <span className="station-name">{lang === "en" ? "Attach Wheels" : "Raeder montieren"}</span>
          </div>
          <div className={`massproduction-station ${prodMode === "assembly" && stage >= 3 ? "done" : ""}`}>
            <span className="station-num">3</span>
            <span className="station-name">{lang === "en" ? "Final Quality Check" : "Qualitaetspruefung"}</span>
          </div>
        </div>

        {prodMode === "assembly" && (
          <div className="massproduction-controls">
            <button
              type="button"
              className="massproduction-step-btn"
              onClick={handleAdvance}
              disabled={stage >= 3}
            >
              {lang === "en" ? "Advance Assembly Line" : "Fliessband weiterruecken"}
            </button>
            <button
              type="button"
              className="massproduction-reset-btn"
              onClick={handleReset}
              disabled={stage === 0}
            >
              {lang === "en" ? "Reset Line" : "Zuruecksetzen"}
            </button>
          </div>
        )}
      </div>

      {/* Production metrics dashboard */}
      <div className="massproduction-metrics-card">
        <div className="metric-row">
          <span>{lang === "en" ? "Time spent:" : "Benoetigte Arbeitszeit:"}</span>
          <strong>{hoursSpent} {lang === "en" ? "hours" : "Stunden"}</strong>
        </div>
        <div className="metric-row">
          <span>{lang === "en" ? "Bicycles completed:" : "Fertige Fahrraeder:"}</span>
          <strong className="metric-highlight">{bikesProduced}</strong>
        </div>
        <div className="metric-row">
          <span>{lang === "en" ? "Cost per bicycle:" : "Kosten pro Fahrrad:"}</span>
          <strong className={isAffordable ? "price-cheap" : "price-expensive"}>
            {costPerBike} {lang === "en" ? "gold coins" : "Goldmuenzen"}
          </strong>
        </div>
      </div>

      <div className="massproduction-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`massproduction-feedback ${isAffordable ? "success" : "warning"}`}>
            {isAffordable
              ? lang === "en"
                ? "Terrific! Standardized assembly lowered unit costs from 500 down to 50 coins!"
                : "Grossartig! Die getaktete Montage senkte die Stueckkosten von 500 auf 50 Muenzen!"
              : lang === "en"
              ? "Select Moving Assembly Line and advance all 3 stations."
              : "Waehle Fliessband-Fertigung und ruecke alle 3 Stationen vor."}
          </div>
        )}
      </div>
    </div>
  );
}
