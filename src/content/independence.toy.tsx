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

  const charkhaTitle =
    lang === "pl"
      ? "Tradycyjny drewniany kołowrotek Charkha"
      : lang === "de"
      ? "Am hoelzernen Spinnrad"
      : "Spinning the Wooden Charkha";

  const spoolsLabel =
    lang === "pl"
      ? `${spools} szpulek własnoręcznie uprzędzionej nici`
      : lang === "de"
      ? `${spools} Spulen selbstgesponnenes Garn`
      : `${spools} Spools of Homespun Yarn`;

  const spinBtnLabel =
    lang === "pl"
      ? "Obróć koło (+1 szpulka)"
      : lang === "de"
      ? "Rad drehen (+1 Spule)"
      : "Spin Thread (+1 Spool)";

  const resetBtnLabel =
    lang === "pl" ? "Reset" : lang === "de" ? "Zuruecksetzen" : "Reset";

  const solLabel =
    lang === "pl"
      ? "Solidarność wspólnoty i samowystarczalność:"
      : lang === "de"
      ? "Gemeinschaft & Selbstbestimmung:"
      : "Community Solidarity & Self-Reliance:";

  const freedomBanner =
    lang === "pl"
      ? "Pokojowa jedność osiągnięta! (Swaraj)"
      : lang === "de"
      ? "Friedliche Einheit erreicht! (Swaraj)"
      : "Peaceful Unity Achieved! (Swaraj)";

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
          {charkhaTitle}
        </div>
        <div className="spool-count">
          {spoolsLabel}
        </div>

        <div className="charkha-controls">
          <ToyButton onClick={handleSpin}>
            {spinBtnLabel}
          </ToyButton>
          <ToyButton onClick={handleReset} disabled={spools === 0}>
            {resetBtnLabel}
          </ToyButton>
        </div>
      </div>

      {/* Solidarity Meter */}
      <div className="solidarity-meter-card">
        <div className="sol-label">
          {solLabel}{" "}
          <strong>{solidarity}%</strong>
        </div>
        <div className="sol-bar">
          <div className="sol-fill" style={{ width: `${solidarity}%` }} />
        </div>
        {isFree && (
          <div className="freedom-banner">
            {freedomBanner}
          </div>
        )}
      </div>

      <div className="independence-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${isFree ? "success" : "warning"}`}>
            {isFree
              ? lang === "pl"
                ? "Wspaniale! Wspólne przędzenie nici zbudowało niezwyciężoną, pokojową jedność."
                : lang === "de"
                ? "Wunderbar! Das gemeinsame Spinnen schuf friedliche Verbundenheit."
                : "Wonderful! Spinning yarn together built unstoppable peaceful unity."
              : lang === "pl"
              ? "Obróć koło Charkha, aby uprząść co najmniej 3 szpulki nici."
              : lang === "de"
              ? "Drehe das Rad, um mindestens 3 Spulen Garn zu spinnen."
              : "Spin the Charkha to create at least 3 spools of thread."}
          </div>
        )}
      </div>
    </div>
  );
}
