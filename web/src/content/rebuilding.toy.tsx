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

  const { peaceScore, bridgeComplete, status } = calcRebuildingProgress(isEGKS, beamsPlaced);

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

  const rivalBordersLabel =
    lang === "pl"
      ? "Osobne, rywalizujące granice"
      : lang === "de"
        ? "Getrennte Grenzen"
        : "Separate Rival Borders";

  const egksLabel =
    lang === "pl"
      ? "Wspólnota Węgla i Stali (EWWiS)"
      : lang === "de"
        ? "Montanunion (EGKS)"
        : "Pooled Coal & Steel (EGKS)";

  const franceLabel = lang === "pl" ? "🇫🇷 Francja" : lang === "de" ? "Frankreich 🇫🇷" : "🇫🇷 France";

  const riverLabel =
    lang === "pl"
      ? "🌊 Rzeka Ren - dawna granica"
      : lang === "de"
        ? "🌊 Rhein-Grenze"
        : "🌊 Rhine River Border";

  const germanyLabel =
    lang === "pl" ? "Niemcy 🇩🇪" : lang === "de" ? "Deutschland 🇩🇪" : "Germany 🇩🇪";

  const girderLabel =
    lang === "pl" ? "🔩 Stalowy dźwigar" : lang === "de" ? "🔩 Stahlträger" : "🔩 Steel Girder";

  const connectBeamBtn =
    lang === "pl"
      ? "+ Zamontuj stalowy dźwigar"
      : lang === "de"
        ? "+ Stahlträger einbauen"
        : "+ Connect Steel Beam";

  const resetBtn = lang === "pl" ? "Reset" : lang === "de" ? "Zurücksetzen" : "Reset";

  const peaceMeterLabel =
    lang === "pl"
      ? "Pokój i integracja europejska:"
      : lang === "de"
        ? "Frieden & Europäische Einigung:"
        : "European Peace & Integration:";

  const trainCelebration =
    lang === "pl"
      ? "🚅 Most jest otwarty! Szybkie pociągi łączą europejskie stolice w pokoju."
      : lang === "de"
        ? "🚅 Die Brücke steht! Züge verbinden Paris und Berlin in Frieden."
        : "🚅 The bridge is open! Fast trains connect Paris and Berlin in peace.";

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
          🏰 {rivalBordersLabel}
        </button>
        <button
          type="button"
          className={`egks-btn ${isEGKS ? "active" : ""}`}
          onClick={() => {
            setIsEGKS(true);
            setShowFeedback(false);
          }}
        >
          🤝 {egksLabel}
        </button>
      </div>

      {/* The River Bridge Construction */}
      <div className={`bridge-stage ${status}`}>
        <div className="stage-header">
          <span className="country-label">{franceLabel}</span>
          <span className="river-name">{riverLabel}</span>
          <span className="country-label">{germanyLabel}</span>
        </div>

        {/* Girder slots */}
        <div className="girders-row">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`girder-segment ${beamsPlaced >= num && isEGKS ? "placed" : "empty"}`}
            >
              {beamsPlaced >= num && isEGKS ? girderLabel : "..."}
            </div>
          ))}
        </div>

        <div className="construction-controls">
          <ToyButton onClick={handlePlaceBeam} disabled={!isEGKS || beamsPlaced >= 4}>
            {connectBeamBtn}
          </ToyButton>
          <ToyButton onClick={handleReset} disabled={beamsPlaced === 0}>
            {resetBtn}
          </ToyButton>
        </div>
      </div>

      {/* Peace & Integration Meter */}
      <div className="peace-meter-card">
        <div className="pm-label">
          {peaceMeterLabel} <strong>{peaceScore}%</strong>
        </div>
        <div className="pm-bar">
          <div className="pm-fill" style={{ width: `${peaceScore}%` }} />
        </div>
        {bridgeComplete && <div className="train-celebration">{trainCelebration}</div>}
      </div>

      <div className="rebuilding-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${isEGKS && bridgeComplete ? "success" : "warning"}`}>
            {isEGKS && bridgeComplete
              ? lang === "pl"
                ? "Znakomicie! Wspólne zarządzanie węglem i stalą uczyniło przyszłą wojnę niemożliwą i zjednoczyło dawnych rywali."
                : lang === "de"
                  ? "Hervorragend! Das Teilen von Kohle und Stahl machte Krieg unmöglich und schuf Einigung."
                  : "Outstanding! Pooling coal and steel made future war impossible and united former rivals."
              : lang === "pl"
                ? "Wybierz 'Wspólnotę Węgla i Stali (EWWiS)' i zamontuj wszystkie 4 stalowe dźwigary."
                : lang === "de"
                  ? "Wähle Montanunion (EGKS) und baue alle 4 Stahlträger ein."
                  : "Select 'Pooled Coal & Steel (EGKS)' and place all 4 steel beams."}
          </div>
        )}
      </div>
    </div>
  );
}
