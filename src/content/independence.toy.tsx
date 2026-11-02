import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton, ToyButton } from "../lesson/toolkit";
import "./independence.css";

export function calcSatyagrahaSpool(spools: number) {
  const solidarity = Math.min(100, Math.round(spools * 33.34));
  const isFree = spools >= 3;
  return { solidarity, isFree };
}

interface IndependenceToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function IndependenceToy({ lang, mode = "toy", onDone }: IndependenceToyProps) {
  const [spools, setSpools] = useState(mode === "quiz" ? 1 : 0);
  const [showFeedback, setShowFeedback] = useState(false);

  const { solidarity, isFree } = calcSatyagrahaSpool(spools);

  useEffect(() => {
    if (mode === "toy" && isFree && onDone) {
      onDone();
    }
  }, [isFree, mode, onDone]);

  const handleSpin = () => {
    setSpools((prev) => prev + 1);
    setShowFeedback(false);
  };

  const handleReset = () => {
    setSpools(0);
    setShowFeedback(false);
  };

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (isFree && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="independence-wrap">
      {/* Charkha Spinning Box */}
      <div className={`charkha-box ${isFree ? "complete" : ""}`}>
        <div className="wheel-art">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#78350f" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
          </svg>
        </div>
        <div className="charkha-title">
          {lang === "en" ? "Spinning the Wooden Charkha" : "Am hoelzernen Spinnrad"}
        </div>
        <div className="spool-count">
          {spools} {lang === "en" ? "Spools of Homespun Yarn" : "Spulen selbstgesponnenes Garn"}
        </div>

        <div className="charkha-controls">
          <ToyButton onClick={handleSpin}>
            {lang === "en" ? "Spin Thread (+1 Spool)" : "Rad drehen (+1 Spule)"}
          </ToyButton>
          <ToyButton onClick={handleReset} disabled={spools === 0}>
            {lang === "en" ? "Reset" : "Zuruecksetzen"}
          </ToyButton>
        </div>
      </div>

      {/* Solidarity Meter */}
      <div className="solidarity-meter-card">
        <div className="sol-label">
          {lang === "en" ? "Community Solidarity & Self-Reliance:" : "Gemeinschaft & Selbstbestimmung:"}{" "}
          <strong>{solidarity}%</strong>
        </div>
        <div className="sol-bar">
          <div className="sol-fill" style={{ width: `${solidarity}%` }} />
        </div>
        {isFree && (
          <div className="freedom-banner">
            {lang === "en" ? "Peaceful Unity Achieved! (Swaraj)" : "Friedliche Einheit erreicht! (Swaraj)"}
          </div>
        )}
      </div>

      <div className="independence-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${isFree ? "success" : "warning"}`}>
            {isFree
              ? lang === "en"
                ? "Wonderful! Spinning yarn together built unstoppable peaceful unity."
                : "Wunderbar! Das gemeinsame Spinnen schuf friedliche Verbundenheit."
              : lang === "en"
              ? "Spin the Charkha to create at least 3 spools of thread."
              : "Drehe das Rad, um mindestens 3 Spulen Garn zu spinnen."}
          </div>
        )}
      </div>
    </div>
  );
}
