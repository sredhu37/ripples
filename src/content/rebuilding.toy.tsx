import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton, ToyButton } from "../lesson/toolkit";
import "./rebuilding.css";

export function calcRebuildingProgress(isEGKS: boolean, beamsPlaced: number) {
  if (!isEGKS) {
    return { peaceScore: 15, bridgeComplete: false, status: "rivalry" };
  }
  const peaceScore = Math.min(100, 20 + beamsPlaced * 20);
  const bridgeComplete = beamsPlaced >= 4;
  const status = bridgeComplete ? "united" : "building";
  return { peaceScore, bridgeComplete, status };
}

interface RebuildingToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function RebuildingToy({ lang, mode = "toy", onDone }: RebuildingToyProps) {
  const [isEGKS, setIsEGKS] = useState(mode !== "quiz");
  const [beamsPlaced, setBeamsPlaced] = useState(mode === "quiz" ? 1 : 0);
  const [showFeedback, setShowFeedback] = useState(false);

  const { peaceScore, bridgeComplete, status } = calcRebuildingProgress(
    isEGKS,
    beamsPlaced
  );

  useEffect(() => {
    if (mode === "toy" && isEGKS && bridgeComplete && onDone) {
      onDone();
    }
  }, [isEGKS, bridgeComplete, mode, onDone]);

  const handlePlaceBeam = () => {
    if (beamsPlaced < 4) {
      setBeamsPlaced((prev) => prev + 1);
      setShowFeedback(false);
    }
  };

  const handleReset = () => {
    setBeamsPlaced(0);
    setShowFeedback(false);
  };

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (isEGKS && bridgeComplete && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="rebuilding-wrap">
      {/* Pool Policy Bar */}
      <div className="egks-bar">
        <button
          type="button"
          className={`egks-btn ${!isEGKS ? "active warning" : ""}`}
          onClick={() => {
            setIsEGKS(false);
            setShowFeedback(false);
          }}
        >
          🏰 {lang === "en" ? "Separate Rival Borders" : "Getrennte Grenzen"}
        </button>
        <button
          type="button"
          className={`egks-btn ${isEGKS ? "active" : ""}`}
          onClick={() => {
            setIsEGKS(true);
            setShowFeedback(false);
          }}
        >
          🤝 {lang === "en" ? "Pooled Coal & Steel (EGKS)" : "Montanunion (EGKS)"}
        </button>
      </div>

      {/* The River Bridge Construction */}
      <div className={`bridge-stage ${status}`}>
        <div className="stage-header">
          <span className="country-label">🇫🇷 France</span>
          <span className="river-name">🌊 Rhine River Border</span>
          <span className="country-label">Germany 🇩🇪</span>
        </div>

        {/* Girder slots */}
        <div className="girders-row">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`girder-segment ${beamsPlaced >= num && isEGKS ? "placed" : "empty"}`}
            >
              {beamsPlaced >= num && isEGKS ? "🔩 Steel Girder" : "..."}
            </div>
          ))}
        </div>

        <div className="construction-controls">
          <ToyButton onClick={handlePlaceBeam} disabled={!isEGKS || beamsPlaced >= 4}>
            {lang === "en" ? "+ Connect Steel Beam" : "+ Stahlträger einbauen"}
          </ToyButton>
          <ToyButton onClick={handleReset} disabled={beamsPlaced === 0}>
            {lang === "en" ? "Reset" : "Zurücksetzen"}
          </ToyButton>
        </div>
      </div>

      {/* Peace & Integration Meter */}
      <div className="peace-meter-card">
        <div className="pm-label">
          {lang === "en" ? "European Peace & Integration:" : "Frieden & Europäische Einigung:"}{" "}
          <strong>{peaceScore}%</strong>
        </div>
        <div className="pm-bar">
          <div className="pm-fill" style={{ width: `${peaceScore}%` }} />
        </div>
        {bridgeComplete && (
          <div className="train-celebration">
            🚅 {lang === "en" ? "The bridge is open! Fast trains connect Paris and Berlin in peace." : "Die Brücke steht! Züge verbinden Paris und Berlin in Frieden."}
          </div>
        )}
      </div>

      <div className="rebuilding-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${isEGKS && bridgeComplete ? "success" : "warning"}`}>
            {isEGKS && bridgeComplete
              ? lang === "en"
                ? "Outstanding! Pooling coal and steel made future war impossible and united former rivals."
                : "Hervorragend! Das Teilen von Kohle und Stahl machte Krieg unmöglich und schuf Einigung."
              : lang === "en"
              ? "Select 'Pooled Coal & Steel (EGKS)' and place all 4 steel beams."
              : "Wähle Montanunion (EGKS) und baue alle 4 Stahlträger ein."}
          </div>
        )}
      </div>
    </div>
  );
}
