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
  const status = isTrained
    ? ("trained" as const)
    : accuracy >= 75
      ? ("partial" as const)
      : ("untrained" as const);

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

  const { accuracy, isTrained, status } = calcPatternRecognition(sampleCount, hasCleanLabels);

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

  const getCardsLabel = (count: number) => {
    if (lang === "pl") {
      if (count === 2) return "2 karty";
      return `${count} kart`;
    }
    if (lang === "de") {
      return `${count} Karten`;
    }
    return `${count} Cards`;
  };

  return (
    <div className="ai-wrap">
      {/* Sample Count selector */}
      <div className="ai-control-row">
        <span className="control-label">
          {lang === "pl"
            ? "Przykłady treningowe:"
            : lang === "de"
              ? "Trainingsbeispiele:"
              : "Training Examples:"}
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
              {getCardsLabel(count)}
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
            ? lang === "pl"
              ? "Zweryfikowane etykiety: Czyste (Jabłka i gruszki)"
              : lang === "de"
                ? "Verifizierte Beschriftung: Sauber"
                : "Verified Labels: Clean (Apples & Pears)"
            : lang === "pl"
              ? "Błędne / Zaszumione dane (Włącz czyste etykiety)"
              : lang === "de"
                ? "Falsche / Fehlerhafte Daten (Saubere Daten aktivieren)"
                : "Mislabeled / Noisy Data (Turn On Clean Labels)"}
        </button>
      </div>

      {/* Training and Accuracy Visualizer */}
      <div className={`ai-accuracy-card ${status}`}>
        <div className="accuracy-header">
          <span>
            {lang === "pl"
              ? "Dokładność rozpoznawania wzorców:"
              : lang === "de"
                ? "Mustererkennungs-Genauigkeit:"
                : "Pattern Recognition Accuracy:"}
          </span>
          <strong className="accuracy-val">{accuracy}%</strong>
        </div>

        <div className="accuracy-meter-bar">
          <div className="accuracy-fill" style={{ width: `${accuracy}%` }} />
        </div>

        <div className="inference-test-box">
          <span className="test-label">
            {lang === "pl"
              ? "Obraz testowy (Okrągły + czerwony owoc):"
              : lang === "de"
                ? "Testbild (Rund + Rote Frucht):"
                : "Test Image (Round + Red Fruit):"}
          </span>
          <strong className="test-prediction">
            {accuracy >= 90
              ? lang === "pl"
                ? "Rozpoznano: Jabłko (98% pewności)"
                : lang === "de"
                  ? "Erkannt: Apfel (98% Zuversicht)"
                  : "Predicted: Apple (98% confidence)"
              : accuracy >= 75
                ? lang === "pl"
                  ? "Rozpoznano: Jabłko (80% pewności)"
                  : lang === "de"
                    ? "Erkannt: Apfel (80% Zuversicht)"
                    : "Predicted: Apple (80% confidence)"
                : lang === "pl"
                  ? "Niepewne: Jabłko czy gruszka? (Dezorientacja)"
                  : lang === "de"
                    ? "Unsicher: Apfel oder Birne? (Verwirrt)"
                    : "Uncertain: Apple or Pear? (Confused)"}
          </strong>
        </div>
      </div>

      <div className="ai-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`ai-feedback ${isTrained ? "success" : "warning"}`}>
            {isTrained
              ? lang === "pl"
                ? "Sukces! 10 czystych przykładów treningowych pozwala algorytmowi rozpoznawać wzorce z dokładnością 98%."
                : lang === "de"
                  ? "Erfolg! 10 saubere Beispiele ermoeglichen eine 98% zuverlaessige Mustererkennung."
                  : "Success! 10 clean training examples allow the algorithm to spot patterns with 98% accuracy."
              : lang === "pl"
                ? "Wybierz 10 kart i upewnij się, że Zweryfikowane etykiety są włączone, aby osiągnąć dokładność >90%."
                : lang === "de"
                  ? "Waehle 10 Karten und saubere Daten, um ueber 90% Genauigkeit zu erreichen."
                  : "Select 10 Cards and make sure Verified Labels are active to reach >90% accuracy."}
          </div>
        )}
      </div>
    </div>
  );
}
