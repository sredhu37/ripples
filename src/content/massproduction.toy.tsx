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

  const craftLabel =
    lang === "pl"
      ? "Warsztat rzemieślniczy"
      : lang === "de"
      ? "Handwerksbetrieb"
      : "Artisan Workshop";

  const assemblyLabel =
    lang === "pl"
      ? "Taśma montażowa"
      : lang === "de"
      ? "Fliessband-Fertigung"
      : "Moving Assembly Line";

  const station1Name =
    lang === "pl"
      ? "Spawanie ramy"
      : lang === "de"
      ? "Rahmen schweißen"
      : "Weld Frame";

  const station2Name =
    lang === "pl"
      ? "Montaż kół"
      : lang === "de"
      ? "Raeder montieren"
      : "Attach Wheels";

  const station3Name =
    lang === "pl"
      ? "Kontrola jakości"
      : lang === "de"
      ? "Qualitaetspruefung"
      : "Final Quality Check";

  const advanceLabel =
    lang === "pl"
      ? "Przesuń taśmę montażową"
      : lang === "de"
      ? "Fliessband weiterruecken"
      : "Advance Assembly Line";

  const resetLabel =
    lang === "pl"
      ? "Resetuj taśmę"
      : lang === "de"
      ? "Zuruecksetzen"
      : "Reset Line";

  const timeSpentLabel =
    lang === "pl"
      ? "Czas pracy:"
      : lang === "de"
      ? "Benoetigte Arbeitszeit:"
      : "Time spent:";

  const hoursLabel =
    lang === "pl"
      ? "godzin"
      : lang === "de"
      ? "Stunden"
      : "hours";

  const bikesCompletedLabel =
    lang === "pl"
      ? "Gotowe rowery:"
      : lang === "de"
      ? "Fertige Fahrraeder:"
      : "Bicycles completed:";

  const costPerBikeLabel =
    lang === "pl"
      ? "Koszt jednego roweru:"
      : lang === "de"
      ? "Kosten pro Fahrrad:"
      : "Cost per bicycle:";

  const coinsLabel =
    lang === "pl"
      ? "złotych monet"
      : lang === "de"
      ? "Goldmuenzen"
      : "gold coins";

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
          {craftLabel}
        </button>
        <button
          type="button"
          className={`massproduction-mode-btn ${prodMode === "assembly" ? "active" : ""}`}
          onClick={() => {
            setProdMode("assembly");
            setShowFeedback(false);
          }}
        >
          {assemblyLabel}
        </button>
      </div>

      {/* Assembly conveyor line visual */}
      <div className={`massproduction-conveyor-card ${status}`}>
        <div className="massproduction-conveyor-stations">
          <div className={`massproduction-station ${prodMode === "assembly" && stage >= 1 ? "done" : ""}`}>
            <span className="station-num">1</span>
            <span className="station-name">{station1Name}</span>
          </div>
          <div className={`massproduction-station ${prodMode === "assembly" && stage >= 2 ? "done" : ""}`}>
            <span className="station-num">2</span>
            <span className="station-name">{station2Name}</span>
          </div>
          <div className={`massproduction-station ${prodMode === "assembly" && stage >= 3 ? "done" : ""}`}>
            <span className="station-num">3</span>
            <span className="station-name">{station3Name}</span>
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
              {advanceLabel}
            </button>
            <button
              type="button"
              className="massproduction-reset-btn"
              onClick={handleReset}
              disabled={stage === 0}
            >
              {resetLabel}
            </button>
          </div>
        )}
      </div>

      {/* Production metrics dashboard */}
      <div className="massproduction-metrics-card">
        <div className="metric-row">
          <span>{timeSpentLabel}</span>
          <strong>{hoursSpent} {hoursLabel}</strong>
        </div>
        <div className="metric-row">
          <span>{bikesCompletedLabel}</span>
          <strong className="metric-highlight">{bikesProduced}</strong>
        </div>
        <div className="metric-row">
          <span>{costPerBikeLabel}</span>
          <strong className={isAffordable ? "price-cheap" : "price-expensive"}>
            {costPerBike} {coinsLabel}
          </strong>
        </div>
      </div>

      <div className="massproduction-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`massproduction-feedback ${isAffordable ? "success" : "warning"}`}>
            {isAffordable
              ? lang === "pl"
                ? "Wspaniale! Standardowy montaż na taśmie obniżył koszt jednostkowy z 500 do 50 monet!"
                : lang === "de"
                ? "Grossartig! Die getaktete Montage senkte die Stueckkosten von 500 auf 50 Muenzen!"
                : "Terrific! Standardized assembly lowered unit costs from 500 down to 50 coins!"
              : lang === "pl"
              ? "Wybierz Taśmę montażową i przesuń wszystkie 3 stanowiska."
              : lang === "de"
              ? "Waehle Fliessband-Fertigung und ruecke alle 3 Stationen vor."
              : "Select Moving Assembly Line and advance all 3 stations."}
          </div>
        )}
      </div>
    </div>
  );
}
