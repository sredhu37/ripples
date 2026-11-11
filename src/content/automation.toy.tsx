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
  const status = isOptimal
    ? ("optimal" as const)
    : !isSafe
      ? ("hazard" as const)
      : ("slow" as const);

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
    hasCurtain,
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

  const speedLabel =
    lang === "pl" ? "Tempo produkcji:" : lang === "de" ? "Fertigungstempo:" : "Production Speed:";

  const getSpeedBtnText = (val: number) => {
    if (val === 1) {
      return lang === "pl" ? "1x Łagodne" : lang === "de" ? "1x Sanft" : "1x Gentle";
    }
    if (val === 2) {
      return lang === "pl" ? "2x Standard" : lang === "de" ? "2x Standard" : "2x Standard";
    }
    return lang === "pl" ? "3x Szybkie" : lang === "de" ? "3x Schnell" : "3x High Speed";
  };

  const sensorsLabel = hasSensors
    ? lang === "pl"
      ? "Czujniki odległości: Uzbrojone"
      : lang === "de"
        ? "Abstandssensoren: Scharf"
        : "Distance Sensors: Armed"
    : lang === "pl"
      ? "Włącz czujniki odległości"
      : lang === "de"
        ? "Abstandssensoren einschalten"
        : "Turn On Distance Sensors";

  const curtainLabel = hasCurtain
    ? lang === "pl"
      ? "Kurtyna świetlna: Uzbrojona"
      : lang === "de"
        ? "Sicherheits-Lichtgitter: Scharf"
        : "Safety Light Curtain: Armed"
    : lang === "pl"
      ? "Włącz kurtynę świetlną"
      : lang === "de"
        ? "Lichtgitter aktivieren"
        : "Arm Safety Light Curtain";

  const outputLabel =
    lang === "pl"
      ? "Wydajność produkcji:"
      : lang === "de"
        ? "Produktionsleistung:"
        : "Production Output:";

  const unitsLabel = lang === "pl" ? "szt./godz." : lang === "de" ? "Stueck/h" : "units/hr";

  const safetyRatingLabel =
    lang === "pl"
      ? "Bezpieczeństwo pracy:"
      : lang === "de"
        ? "Arbeitssicherheit:"
        : "Human Safety Rating:";

  return (
    <div className="automation-wrap">
      {/* Speed control selector */}
      <div className="automation-speed-bar">
        <span className="speed-label">{speedLabel}</span>
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
              {getSpeedBtnText(val)}
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
          {sensorsLabel}
        </button>

        <button
          type="button"
          className={`safety-toggle-btn ${hasCurtain ? "active" : ""}`}
          onClick={() => {
            setHasCurtain((prev) => !prev);
            setShowFeedback(false);
          }}
        >
          {curtainLabel}
        </button>
      </div>

      {/* Robot cell status dashboard */}
      <div className={`automation-status-card ${status}`}>
        <div className="status-metric-row">
          <span>{outputLabel}</span>
          <strong className="metric-val">
            {throughput} {unitsLabel}
          </strong>
        </div>

        <div className="status-metric-row">
          <span>{safetyRatingLabel}</span>
          <strong className={`metric-val ${safetyScore === 100 ? "safe" : "danger"}`}>
            {safetyScore}%
          </strong>
        </div>

        <div className="status-explanation">
          {status === "optimal" && (
            <span>
              {lang === "pl"
                ? "Optymalnie! Wysoka wydajność przy 100% bezpieczeństwie pracowników."
                : lang === "de"
                  ? "Optimal! Hohe Leistung bei 100% Schutz der Mitarbeiter."
                  : "Optimal! High production output with 100% human worker safety."}
            </span>
          )}
          {status === "hazard" && (
            <span>
              {lang === "pl"
                ? "Uwaga: Wysokie tempo bez kurtyny świetlnej stwarza niebezpieczeństwo dla ludzi."
                : lang === "de"
                  ? "Achtung: Hohes Tempo ohne Lichtgitter gefaehrdet Menschen."
                  : "Warning: High speed without safety curtain creates danger for workers."}
            </span>
          )}
          {status === "slow" && (
            <span>
              {lang === "pl"
                ? "Bezpiecznie, ale łagodne tempo nie wykorzystuje w pełni możliwości fabryki."
                : lang === "de"
                  ? "Sicher, aber das sanfte Tempo nutzt die Fabrik nicht voll aus."
                  : "Safe, but gentle speed runs below factory capacity."}
            </span>
          )}
        </div>
      </div>

      <div className="automation-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`automation-feedback ${isOptimal ? "success" : "warning"}`}>
            {isOptimal
              ? lang === "pl"
                ? "Znakomicie! Zautomatyzowane roboty pracują z dużą prędkością, w pełni chroniąc każdego pracownika."
                : lang === "de"
                  ? "Perfekt! Roboter arbeiten mit hohem Tempo und schuetzen alle Mitarbeiter."
                  : "Perfect! Automated robots operate at high speed while safeguarding every worker."
              : lang === "pl"
                ? "Włącz zarówno Czujniki odległości, jak i Kurtynę świetlną oraz wybierz tempo co najmniej 2x Standard."
                : lang === "de"
                  ? "Aktiviere Sensoren und Lichtgitter und waehle mindestens 2x Standard-Tempo."
                  : "Activate both Distance Sensors and Safety Curtain, and select at least 2x Standard speed."}
          </div>
        )}
      </div>
    </div>
  );
}
