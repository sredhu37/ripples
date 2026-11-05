import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./computers.css";

export function calcBinaryLogic(
  b3: boolean,
  b2: boolean,
  b1: boolean,
  b0: boolean,
  target = 5
) {
  const val8 = b3 ? 8 : 0;
  const val4 = b2 ? 4 : 0;
  const val2 = b1 ? 2 : 0;
  const val1 = b0 ? 1 : 0;
  const decimal = val8 + val4 + val2 + val1;
  const binary = `${b3 ? 1 : 0}${b2 ? 1 : 0}${b1 ? 1 : 0}${b0 ? 1 : 0}`;
  const isMatch = decimal === target;

  return {
    val8,
    val4,
    val2,
    val1,
    decimal,
    binary,
    target,
    isMatch,
  };
}

interface ComputersToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function ComputersToy({ lang, mode = "toy", onDone }: ComputersToyProps) {
  const target = mode === "quiz" ? 10 : 5;
  const [b3, setB3] = useState(false);
  const [b2, setB2] = useState(mode !== "quiz");
  const [b1, setB1] = useState(false);
  const [b0, setB0] = useState(mode !== "quiz");
  const [showFeedback, setShowFeedback] = useState(false);

  const { decimal, binary, isMatch } = calcBinaryLogic(b3, b2, b1, b0, target);

  useEffect(() => {
    if (mode === "toy" && isMatch && onDone) {
      onDone();
    }
  }, [isMatch, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (isMatch && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  const targetLabel =
    lang === "pl"
      ? "Szukana liczba dziesiętna:"
      : lang === "de"
      ? "Gesuchte Dezimalzahl:"
      : "Target Decimal Number:";

  const getBitAction = (bit: boolean) => {
    if (bit) {
      return lang === "pl" ? "Wyłącz" : lang === "de" ? "Ausschalten" : "Turn Off";
    }
    return lang === "pl" ? "Włącz" : lang === "de" ? "Einschalten" : "Turn On";
  };

  const binaryCodeLabel =
    lang === "pl"
      ? "Kod binarny:"
      : lang === "de"
      ? "Binaerer Code:"
      : "Binary Code:";

  const calcValueLabel =
    lang === "pl"
      ? "Obliczona wartość:"
      : lang === "de"
      ? "Berechneter Wert:"
      : "Calculated Value:";

  return (
    <div className="computers-wrap">
      {/* Target indicator */}
      <div className="computers-target-card">
        <span className="computers-target-label">
          {targetLabel}
        </span>
        <strong className="computers-target-num">{target}</strong>
      </div>

      {/* 4 Bit Switch Board */}
      <div className="computers-switches-grid">
        {/* Bit 8 */}
        <button
          type="button"
          className={`computers-bit-btn ${b3 ? "active" : ""}`}
          onClick={() => {
            setB3((prev) => !prev);
            setShowFeedback(false);
          }}
        >
          <span className="bit-val-label">+8</span>
          <span className="bit-state">{b3 ? "1" : "0"}</span>
          <span className="bit-action">{getBitAction(b3)}</span>
        </button>

        {/* Bit 4 */}
        <button
          type="button"
          className={`computers-bit-btn ${b2 ? "active" : ""}`}
          onClick={() => {
            setB2((prev) => !prev);
            setShowFeedback(false);
          }}
        >
          <span className="bit-val-label">+4</span>
          <span className="bit-state">{b2 ? "1" : "0"}</span>
          <span className="bit-action">{getBitAction(b2)}</span>
        </button>

        {/* Bit 2 */}
        <button
          type="button"
          className={`computers-bit-btn ${b1 ? "active" : ""}`}
          onClick={() => {
            setB1((prev) => !prev);
            setShowFeedback(false);
          }}
        >
          <span className="bit-val-label">+2</span>
          <span className="bit-state">{b1 ? "1" : "0"}</span>
          <span className="bit-action">{getBitAction(b1)}</span>
        </button>

        {/* Bit 1 */}
        <button
          type="button"
          className={`computers-bit-btn ${b0 ? "active" : ""}`}
          onClick={() => {
            setB0((prev) => !prev);
            setShowFeedback(false);
          }}
        >
          <span className="bit-val-label">+1</span>
          <span className="bit-state">{b0 ? "1" : "0"}</span>
          <span className="bit-action">{getBitAction(b0)}</span>
        </button>
      </div>

      {/* Output calculation card */}
      <div className="computers-output-card">
        <div className="computers-math-line">
          <span>{binaryCodeLabel}</span>
          <code className="binary-string">{binary}</code>
        </div>
        <div className="computers-math-line">
          <span>{calcValueLabel}</span>
          <strong className={`calc-decimal ${isMatch ? "match" : ""}`}>{decimal}</strong>
        </div>
      </div>

      <div className="computers-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`computers-feedback ${isMatch ? "success" : "warning"}`}>
            {isMatch
              ? lang === "pl"
                ? `Brawo! Binarny ${binary} odpowiada dokładnie liczbie dziesiętnej ${target}!`
                : lang === "de"
                ? `Richtig! Binaer ${binary} entspricht genau der Dezimalzahl ${target}!`
                : `Success! Binary ${binary} equals decimal ${target} perfectly!`
              : lang === "pl"
              ? `Bieżąca wartość to ${decimal}. Przestaw bity, aby uzyskać ${target}.`
              : lang === "de"
              ? `Aktueller Wert ist ${decimal}. Passe die Schalter an, um ${target} zu erreichen.`
              : `Current value is ${decimal}. Adjust switches to reach ${target}.`}
          </div>
        )}
      </div>
    </div>
  );
}
