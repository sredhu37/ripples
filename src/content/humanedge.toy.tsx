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
    humanValues,
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

  const getMachineBtnText = (val: number) => {
    if (val === 1) {
      return lang === "pl"
        ? "Proste komputery"
        : lang === "de"
          ? "Einfache Rechner"
          : "Basic Computers";
    }
    if (val === 2) {
      return lang === "pl"
        ? "Inteligentna automatyzacja"
        : lang === "de"
          ? "Kluge Automation"
          : "Smart Automation";
    }
    return lang === "pl"
      ? "Sztuczna inteligencja przyszłości"
      : lang === "de"
        ? "Zukunfts-KI"
        : "Next-Gen AI";
  };

  const getValuesBtnText = (val: number) => {
    if (val === 1) {
      return lang === "pl"
        ? "Tylko zysk i tempo"
        : lang === "de"
          ? "Nur Kosten & Tempo"
          : "Cost & Speed Only";
    }
    if (val === 2) {
      return lang === "pl" ? "Uczciwe zasady" : lang === "de" ? "Faire Regeln" : "Fair Guidelines";
    }
    return lang === "pl"
      ? "Głęboka empatia i troska"
      : lang === "de"
        ? "Mitgefuehl & Ethik"
        : "Deep Empathy & Care";
  };

  return (
    <div className="humanedge-wrap">
      {/* Machine Power selector */}
      <div className="humanedge-control-box">
        <span className="control-title">
          {lang === "pl"
            ? "Poziom zaawansowania technologii:"
            : lang === "de"
              ? "Technologische Leistungsfaehigkeit:"
              : "Technological Capability:"}
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
              {getMachineBtnText(val)}
            </button>
          ))}
        </div>
      </div>

      {/* Human Values & Ethics selector */}
      <div className="humanedge-control-box">
        <span className="control-title">
          {lang === "pl"
            ? "Kierujące wartości ludzkie:"
            : lang === "de"
              ? "Leitende menschliche Werte:"
              : "Guiding Human Values:"}
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
              {getValuesBtnText(val)}
            </button>
          ))}
        </div>
      </div>

      {/* Societal flourishing meter */}
      <div className={`flourishing-dashboard ${status}`}>
        <div className="flourishing-header">
          <span>
            {lang === "pl"
              ? "Wskaźnik rozkwitu społeczeństwa:"
              : lang === "de"
                ? "Menschlicher Wohlstands-Index:"
                : "Societal Flourishing Index:"}
          </span>
          <strong className="flourishing-val">{flourishingScore}%</strong>
        </div>

        <div className="flourishing-bar">
          <div className="flourishing-fill" style={{ width: `${flourishingScore}%` }} />
        </div>

        <div className="flourishing-subtext">
          {status === "flourishing" && (
            <span>
              {lang === "pl"
                ? "Rozkwit! Zaawansowana technologia kierowana empatią buduje szczęśliwe społeczeństwo."
                : lang === "de"
                  ? "Bluehende Zukunft! Technik verstaerkt menschliche Waerme und Lebensqualitaet."
                  : "Flourishing! Advanced technology guided by empathy creates a thriving society."}
            </span>
          )}
          {status === "imbalanced" && (
            <span>
              {lang === "pl"
                ? "Uwaga: Wysokie tempo bez empatii grozi pozostawieniem słabszych w tyle."
                : lang === "de"
                  ? "Achtung: Hohes Tempo ohne Mitgefuehl laesst schwaechere Menschen zurueck."
                  : "Warning: High speed without empathy risks leaving vulnerable people behind."}
            </span>
          )}
          {status === "developing" && (
            <span>
              {lang === "pl"
                ? "Pozytywna równowaga, gotowa na głębszą empatię i nowoczesne narzędzia."
                : lang === "de"
                  ? "Guter Weg, bereit fuer staerkere Werte und kluge Werkzeuge."
                  : "Positive balance, ready to embrace deeper empathy and advanced tools."}
            </span>
          )}
        </div>
      </div>

      <div className="humanedge-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`humanedge-feedback ${isHarmonious ? "success" : "warning"}`}>
            {isHarmonious
              ? lang === "pl"
                ? "Cudownie! Empatia, etyczna troska i kreatywność sprawiają, że technologia służy wszystkim ludziom."
                : lang === "de"
                  ? "Wunderbar! Mitgefuehl, Ethik und Kreativitaet lenken Technik zum Wohle aller."
                  : "Wonderful! Empathy, ethical care, and creativity guide technology to lift all humanity."
              : lang === "pl"
                ? "Wybierz 'Głęboka empatia i troska' oraz co najmniej Inteligentną automatyzację, by uzyskać >90% rozkwitu."
                : lang === "de"
                  ? "Waehle 'Mitgefuehl & Ethik' und mindestens Kluge Automation fuer ueber 90% Wohlstand."
                  : "Select 'Deep Empathy & Care' and at least Smart Automation to achieve >90% flourishing."}
          </div>
        )}
      </div>
    </div>
  );
}
