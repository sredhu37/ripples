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

  const dignityTitle =
    lang === "pl"
      ? "Godność człowieka jest nienaruszalna"
      : lang === "de"
      ? "Die Wuerde des Menschen ist unantastbar"
      : "Human Dignity is Inviolable";

  const protectionLevel =
    lang === "pl" ? "Poziom ochrony:" : lang === "de" ? "Schutzgrad:" : "Protection Level:";

  const speechLabel =
    lang === "pl" ? "Wolna prasa i słowo" : lang === "de" ? "Freie Presse" : "Free Speech & Press";

  const equalRightsLabel =
    lang === "pl" ? "Równe prawa dla wszystkich" : lang === "de" ? "Gleiche Rechte" : "Equal Rights for All";

  const courageLabel =
    lang === "pl" ? "Odwaga cywilna" : lang === "de" ? "Zivilcourage" : "Civil Courage";

  return (
    <div className="ww2-wrap">
      {/* Central Flame of Human Dignity */}
      <div className={`dignity-monument ${isFullyDefended ? "illuminated" : ""}`}>
        <div className="flame-icon">🕯️</div>
        <div className="monument-title">
          {dignityTitle}
        </div>
        <div className="liberty-meter">
          {protectionLevel} <strong>{libertyScore}%</strong>
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
          <span className="p-name">{speechLabel}</span>
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
          <span className="p-name">{equalRightsLabel}</span>
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
          <span className="p-name">{courageLabel}</span>
          <span className="p-badge">{courage ? "✅" : "+"}</span>
        </button>
      </div>

      <div className="ww2-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${isFullyDefended ? "success" : "warning"}`}>
            {isFullyDefended
              ? lang === "pl"
                ? "Wspaniale! Wzniesienie wszystkich trzech filarów chroni społeczeństwo przed tyranią i bezprawiem."
                : lang === "de"
                ? "Grossartig! Alle drei Pfeiler schuetzen die Gesellschaft vor Willkuer und Unrecht."
                : "Brilliant! Raising all three pillars protects society against tyranny and prejudice."
              : lang === "pl"
              ? "Aktywuj wszystkie trzy filary, aby zapewnić pełną 100% ochronę godności ludzkiej."
              : lang === "de"
              ? "Aktiviere alle drei Pfeiler fuer vollstaendigen Schutz."
              : "Activate all three pillars to achieve complete 100% protection."}
          </div>
        )}
      </div>
    </div>
  );
}
