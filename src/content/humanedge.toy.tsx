import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./humanedge.css";

export function calcHumanMachineHarmony(machinePower: number, humanValues: number) {
  let score = machinePower * 12 + humanValues * 20;
  if (humanValues === 1) score -= 15;
  if (machinePower >= 2 && humanValues === 3) score = 96;

  const flourishingScore = Math.min(100, Math.max(10, score));
  const isHarmonious = machinePower >= 2 && humanValues === 3;
  const status = isHarmonious
    ? ("flourishing" as const)
    : humanValues === 1
    ? ("imbalanced" as const)
    : ("developing" as const);

  return {
    machinePower,
    humanValues,
    flourishingScore,
    isHarmonious,
    status,
  };
}

interface HumanEdgeToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function HumanEdgeToy({ lang, mode = "toy", onDone }: HumanEdgeToyProps) {
  const [machinePower, setMachinePower] = useState(mode === "quiz" ? 3 : 2);
  const [humanValues, setHumanValues] = useState(mode === "quiz" ? 1 : 2);
  const [showFeedback, setShowFeedback] = useState(false);

  const { flourishingScore, isHarmonious, status } = calcHumanMachineHarmony(
    machinePower,
    humanValues
  );

  useEffect(() => {
    if (mode === "toy" && isHarmonious && onDone) {
      onDone();
    }
  }, [isHarmonious, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (isHarmonious && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="humanedge-wrap">
      {/* Machine Power selector */}
      <div className="humanedge-control-box">
        <span className="control-title">
          {lang === "en" ? "Technological Capability:" : "Technologische Leistungsfaehigkeit:"}
        </span>
        <div className="tier-buttons">
          {[1, 2, 3].map((val) => (
            <button
              key={val}
              type="button"
              className={`tier-btn ${machinePower === val ? "active" : ""}`}
              onClick={() => {
                setMachinePower(val);
                setShowFeedback(false);
              }}
            >
              {val === 1
                ? lang === "en"
                  ? "Basic Computers"
                  : "Einfache Rechner"
                : val === 2
                ? lang === "en"
                  ? "Smart Automation"
                  : "Kluge Automation"
                : lang === "en"
                ? "Next-Gen AI"
                : "Zukunfts-KI"}
            </button>
          ))}
        </div>
      </div>

      {/* Human Values & Ethics selector */}
      <div className="humanedge-control-box">
        <span className="control-title">
          {lang === "en" ? "Guiding Human Values:" : "Leitende menschliche Werte:"}
        </span>
        <div className="tier-buttons">
          {[1, 2, 3].map((val) => (
            <button
              key={val}
              type="button"
              className={`tier-btn ${humanValues === val ? "active" : ""}`}
              onClick={() => {
                setHumanValues(val);
                setShowFeedback(false);
              }}
            >
              {val === 1
                ? lang === "en"
                  ? "Cost & Speed Only"
                  : "Nur Kosten & Tempo"
                : val === 2
                ? lang === "en"
                  ? "Fair Guidelines"
                  : "Faire Regeln"
                : lang === "en"
                ? "Deep Empathy & Care"
                : "Mitgefuehl & Ethik"}
            </button>
          ))}
        </div>
      </div>

      {/* Societal flourishing meter */}
      <div className={`flourishing-dashboard ${status}`}>
        <div className="flourishing-header">
          <span>{lang === "en" ? "Societal Flourishing Index:" : "Menschlicher Wohlstands-Index:"}</span>
          <strong className="flourishing-val">{flourishingScore}%</strong>
        </div>

        <div className="flourishing-bar">
          <div className="flourishing-fill" style={{ width: `${flourishingScore}%` }} />
        </div>

        <div className="flourishing-subtext">
          {status === "flourishing" && (
            <span>{lang === "en" ? "Flourishing! Advanced technology guided by empathy creates a thriving society." : "Bluhende Zukunft! Technik verstaerkt menschliche Waerme und Lebensqualitaet."}</span>
          )}
          {status === "imbalanced" && (
            <span>{lang === "en" ? "Warning: High speed without empathy risks leaving vulnerable people behind." : "Achtung: Hohes Tempo ohne Mitgefuehl laesst schwaechere Menschen zurueck."}</span>
          )}
          {status === "developing" && (
            <span>{lang === "en" ? "Positive balance, ready to embrace deeper empathy and advanced tools." : "Guter Weg, bereit fuer staerkere Werte und kluge Werkzeuge."}</span>
          )}
        </div>
      </div>

      <div className="humanedge-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`humanedge-feedback ${isHarmonious ? "success" : "warning"}`}>
            {isHarmonious
              ? lang === "en"
                ? "Wonderful! Empathy, ethical care, and creativity guide technology to lift all humanity."
                : "Wunderbar! Mitgefuehl, Ethik und Kreativitaet lenken Technik zum Wohle aller."
              : lang === "en"
              ? "Select 'Deep Empathy & Care' and at least Smart Automation to achieve >90% flourishing."
              : "Waehle 'Mitgefuehl & Ethik' und mindestens Kluge Automation fuer ueber 90% Wohlstand."}
          </div>
        )}
      </div>
    </div>
  );
}
