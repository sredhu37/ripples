import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./automation.css";

export function calcAutomationSafety(speed: number, hasSensors: boolean, hasCurtain: boolean) {
  const throughput = speed * 30;
  const baseScore = (hasSensors ? 50 : 0) + (hasCurtain ? 50 : 0);
  const penalty = speed === 3 && !hasCurtain ? 20 : 0;
  const safetyScore = Math.max(0, baseScore - penalty);
  const isSafe = safetyScore === 100;
  const isOptimal = isSafe && speed >= 2;
  const status = isOptimal ? ("optimal" as const) : !isSafe ? ("hazard" as const) : ("slow" as const);

  return {
    speed,
    throughput,
    safetyScore,
    isSafe,
    isOptimal,
    status,
  };
}

interface AutomationToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function AutomationToy({ lang, mode = "toy", onDone }: AutomationToyProps) {
  const [speed, setSpeed] = useState(mode === "quiz" ? 3 : 2);
  const [hasSensors, setHasSensors] = useState(mode !== "quiz");
  const [hasCurtain, setHasCurtain] = useState(mode !== "quiz");
  const [showFeedback, setShowFeedback] = useState(false);

  const { throughput, safetyScore, isOptimal, status } = calcAutomationSafety(
    speed,
    hasSensors,
    hasCurtain
  );

  useEffect(() => {
    if (mode === "toy" && isOptimal && onDone) {
      onDone();
    }
  }, [isOptimal, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (isOptimal && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="automation-wrap">
      {/* Speed control selector */}
      <div className="automation-speed-bar">
        <span className="speed-label">{lang === "en" ? "Production Speed:" : "Fertigungstempo:"}</span>
        <div className="speed-btns">
          {[1, 2, 3].map((val) => (
            <button
              key={val}
              type="button"
              className={`speed-btn ${speed === val ? "active" : ""}`}
              onClick={() => {
                setSpeed(val);
                setShowFeedback(false);
              }}
            >
              {val === 1
                ? lang === "en"
                  ? "1x Gentle"
                  : "1x Sanft"
                : val === 2
                ? lang === "en"
                  ? "2x Standard"
                  : "2x Standard"
                : lang === "en"
                ? "3x High Speed"
                : "3x Schnell"}
            </button>
          ))}
        </div>
      </div>

      {/* Safety equipment toggles */}
      <div className="automation-safety-toggles">
        <button
          type="button"
          className={`safety-toggle-btn ${hasSensors ? "active" : ""}`}
          onClick={() => {
            setHasSensors((prev) => !prev);
            setShowFeedback(false);
          }}
        >
          {hasSensors
            ? lang === "en"
              ? "Distance Sensors: Armed"
              : "Abstandssensoren: Scharf"
            : lang === "en"
            ? "Turn On Distance Sensors"
            : "Abstandssensoren einschalten"}
        </button>

        <button
          type="button"
          className={`safety-toggle-btn ${hasCurtain ? "active" : ""}`}
          onClick={() => {
            setHasCurtain((prev) => !prev);
            setShowFeedback(false);
          }}
        >
          {hasCurtain
            ? lang === "en"
              ? "Safety Light Curtain: Armed"
              : "Sicherheits-Lichtgitter: Scharf"
            : lang === "en"
            ? "Arm Safety Light Curtain"
            : "Lichtgitter aktivieren"}
        </button>
      </div>

      {/* Robot cell status dashboard */}
      <div className={`automation-status-card ${status}`}>
        <div className="status-metric-row">
          <span>{lang === "en" ? "Production Output:" : "Produktionsleistung:"}</span>
          <strong className="metric-val">{throughput} {lang === "en" ? "units/hr" : "Stueck/h"}</strong>
        </div>

        <div className="status-metric-row">
          <span>{lang === "en" ? "Human Safety Rating:" : "Arbeitssicherheit:"}</span>
          <strong className={`metric-val ${safetyScore === 100 ? "safe" : "danger"}`}>
            {safetyScore}%
          </strong>
        </div>

        <div className="status-explanation">
          {status === "optimal" && (
            <span>{lang === "en" ? "Optimal! High production output with 100% human worker safety." : "Optimal! Hohe Leistung bei 100% Schutz der Mitarbeiter."}</span>
          )}
          {status === "hazard" && (
            <span>{lang === "en" ? "Warning: High speed without safety curtain creates danger for workers." : "Achtung: Hohes Tempo ohne Lichtgitter gefaehrdet Menschen."}</span>
          )}
          {status === "slow" && (
            <span>{lang === "en" ? "Safe, but gentle speed runs below factory capacity." : "Sicher, aber das sanfte Tempo nutzt die Fabrik nicht voll aus."}</span>
          )}
        </div>
      </div>

      <div className="automation-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`automation-feedback ${isOptimal ? "success" : "warning"}`}>
            {isOptimal
              ? lang === "en"
                ? "Perfect! Automated robots operate at high speed while safeguarding every worker."
                : "Perfekt! Roboter arbeiten mit hohem Tempo und schuetzen alle Mitarbeiter."
              : lang === "en"
              ? "Activate both Distance Sensors and Safety Curtain, and select at least 2x Standard speed."
              : "Aktiviere Sensoren und Lichtgitter und waehle mindestens 2x Standard-Tempo."}
          </div>
        )}
      </div>
    </div>
  );
}
