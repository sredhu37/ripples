import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./ww2.css";

export function calcHumanRightsDefense(speech: boolean, equalRights: boolean, courage: boolean) {
  const count = (speech ? 1 : 0) + (equalRights ? 1 : 0) + (courage ? 1 : 0);
  const libertyScore = Math.round((count / 3) * 100);
  const isFullyDefended = count === 3;
  return { libertyScore, isFullyDefended };
}

interface Ww2ToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function Ww2Toy({ lang, mode = "toy", onDone }: Ww2ToyProps) {
  const [speech, setSpeech] = useState(mode !== "quiz");
  const [equalRights, setEqualRights] = useState(false);
  const [courage, setCourage] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const { libertyScore, isFullyDefended } = calcHumanRightsDefense(
    speech,
    equalRights,
    courage
  );

  useEffect(() => {
    if (mode === "toy" && isFullyDefended && onDone) {
      onDone();
    }
  }, [isFullyDefended, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (isFullyDefended && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="ww2-wrap">
      {/* Central Flame of Human Dignity */}
      <div className={`dignity-monument ${isFullyDefended ? "illuminated" : ""}`}>
        <div className="flame-icon">🕯️</div>
        <div className="monument-title">
          {lang === "en" ? "Human Dignity is Inviolable" : "Die Wuerde des Menschen ist unantastbar"}
        </div>
        <div className="liberty-meter">
          {lang === "en" ? "Protection Level:" : "Schutzgrad:"} <strong>{libertyScore}%</strong>
        </div>
      </div>

      {/* The 3 Protective Pillars */}
      <div className="pillars-grid">
        <button
          type="button"
          className={`pillar-btn ${speech ? "active" : ""}`}
          onClick={() => {
            setSpeech((prev) => !prev);
            setShowFeedback(false);
          }}
        >
          <span className="p-icon">📰</span>
          <span className="p-name">{lang === "en" ? "Free Speech & Press" : "Freie Presse"}</span>
          <span className="p-badge">{speech ? "✅" : "+"}</span>
        </button>

        <button
          type="button"
          className={`pillar-btn ${equalRights ? "active" : ""}`}
          onClick={() => {
            setEqualRights((prev) => !prev);
            setShowFeedback(false);
          }}
        >
          <span className="p-icon">⚖️</span>
          <span className="p-name">{lang === "en" ? "Equal Rights for All" : "Gleiche Rechte"}</span>
          <span className="p-badge">{equalRights ? "✅" : "+"}</span>
        </button>

        <button
          type="button"
          className={`pillar-btn ${courage ? "active" : ""}`}
          onClick={() => {
            setCourage((prev) => !prev);
            setShowFeedback(false);
          }}
        >
          <span className="p-icon">🌹</span>
          <span className="p-name">{lang === "en" ? "Civil Courage" : "Zivilcourage"}</span>
          <span className="p-badge">{courage ? "✅" : "+"}</span>
        </button>
      </div>

      <div className="ww2-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${isFullyDefended ? "success" : "warning"}`}>
            {isFullyDefended
              ? lang === "en"
                ? "Brilliant! Raising all three pillars protects society against tyranny and prejudice."
                : "Grossartig! Alle drei Pfeiler schuetzen die Gesellschaft vor Willkuer und Unrecht."
              : lang === "en"
              ? "Activate all three pillars to achieve complete 100% protection."
              : "Aktiviere alle drei Pfeiler fuer vollstaendigen Schutz."}
          </div>
        )}
      </div>
    </div>
  );
}
