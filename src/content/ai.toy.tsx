import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./ai.css";

export function calcPatternRecognition(sampleCount: number, hasCleanLabels: boolean) {
  let accuracy = 40;
  if (hasCleanLabels) {
    if (sampleCount === 2) accuracy = 50;
    else if (sampleCount === 5) accuracy = 80;
    else if (sampleCount >= 10) accuracy = 98;
  } else {
    accuracy = 35;
  }

  const isTrained = accuracy >= 90;
  const status = isTrained ? ("trained" as const) : accuracy >= 75 ? ("partial" as const) : ("untrained" as const);

  return {
    sampleCount,
    hasCleanLabels,
    accuracy,
    isTrained,
    status,
  };
}

interface AiToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function AiToy({ lang, mode = "toy", onDone }: AiToyProps) {
  const [sampleCount, setSampleCount] = useState(mode === "quiz" ? 2 : 5);
  const [hasCleanLabels, setHasCleanLabels] = useState(mode !== "quiz");
  const [showFeedback, setShowFeedback] = useState(false);

  const { accuracy, isTrained, status } = calcPatternRecognition(
    sampleCount,
    hasCleanLabels
  );

  useEffect(() => {
    if (mode === "toy" && isTrained && onDone) {
      onDone();
    }
  }, [isTrained, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (isTrained && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="ai-wrap">
      {/* Sample Count selector */}
      <div className="ai-control-row">
        <span className="control-label">
          {lang === "en" ? "Training Examples:" : "Trainingsbeispiele:"}
        </span>
        <div className="sample-btns">
          {[2, 5, 10].map((count) => (
            <button
              key={count}
              type="button"
              className={`sample-btn ${sampleCount === count ? "active" : ""}`}
              onClick={() => {
                setSampleCount(count);
                setShowFeedback(false);
              }}
            >
              {count} {lang === "en" ? "Cards" : "Karten"}
            </button>
          ))}
        </div>
      </div>

      {/* Label quality toggle */}
      <div className="ai-label-toggle">
        <button
          type="button"
          className={`label-quality-btn ${hasCleanLabels ? "active" : ""}`}
          onClick={() => {
            setHasCleanLabels((prev) => !prev);
            setShowFeedback(false);
          }}
        >
          {hasCleanLabels
            ? lang === "en"
              ? "Verified Labels: Clean (Apples & Pears)"
              : "Verifizierte Beschriftung: Sauber"
            : lang === "en"
            ? "Mislabeled / Noisy Data (Turn On Clean Labels)"
            : "Falsche / Fehlerhafte Daten (Saubere Daten aktivieren)"}
        </button>
      </div>

      {/* Training and Accuracy Visualizer */}
      <div className={`ai-accuracy-card ${status}`}>
        <div className="accuracy-header">
          <span>{lang === "en" ? "Pattern Recognition Accuracy:" : "Mustererkennungs-Genauigkeit:"}</span>
          <strong className="accuracy-val">{accuracy}%</strong>
        </div>

        <div className="accuracy-meter-bar">
          <div
            className="accuracy-fill"
            style={{ width: `${accuracy}%` }}
          />
        </div>

        <div className="inference-test-box">
          <span className="test-label">
            {lang === "en" ? "Test Image (Round + Red Fruit):" : "Testbild (Rund + Rote Frucht):"}
          </span>
          <strong className="test-prediction">
            {accuracy >= 90
              ? lang === "en"
                ? "Predicted: Apple (98% confidence)"
                : "Erkannt: Apfel (98% Zuversicht)"
              : accuracy >= 75
              ? lang === "en"
                ? "Predicted: Apple (80% confidence)"
                : "Erkannt: Apfel (80% Zuversicht)"
              : lang === "en"
              ? "Uncertain: Apple or Pear? (Confused)"
              : "Unsicher: Apfel oder Birne? (Verwirrt)"}
          </strong>
        </div>
      </div>

      <div className="ai-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`ai-feedback ${isTrained ? "success" : "warning"}`}>
            {isTrained
              ? lang === "en"
                ? "Success! 10 clean training examples allow the algorithm to spot patterns with 98% accuracy."
                : "Erfolg! 10 saubere Beispiele ermoeglichen eine 98% zuverlaessige Mustererkennung."
              : lang === "en"
              ? "Select 10 Cards and make sure Verified Labels are active to reach >90% accuracy."
              : "Waehle 10 Karten und saubere Daten, um ueber 90% Genauigkeit zu erreichen."}
          </div>
        )}
      </div>
    </div>
  );
}
