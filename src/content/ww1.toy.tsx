import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./ww1.css";

export function calcAllianceCascade(hasMediationTable: boolean, incidentTriggered: boolean) {
  if (!incidentTriggered) {
    return { conflict: 0, fallenDominoes: 0, status: "calm" };
  }
  if (!hasMediationTable) {
    return { conflict: 100, fallenDominoes: 6, status: "cascade" };
  }
  return { conflict: 0, fallenDominoes: 0, status: "defused" };
}

interface Ww1ToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function Ww1Toy({ lang, mode = "toy", onDone }: Ww1ToyProps) {
  const [hasMediationTable, setHasMediationTable] = useState(mode !== "quiz");
  const [incidentTriggered, setIncidentTriggered] = useState(mode === "quiz");
  const [showFeedback, setShowFeedback] = useState(false);

  const { conflict: _conflict, fallenDominoes, status } = calcAllianceCascade(
    hasMediationTable,
    incidentTriggered
  );

  useEffect(() => {
    if (mode === "toy" && incidentTriggered && hasMediationTable && onDone) {
      onDone();
    }
  }, [incidentTriggered, hasMediationTable, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (hasMediationTable && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="ww1-wrap">
      {/* Diplomacy Switch */}
      <div className="diplomacy-bar">
        <button
          type="button"
          className={`dip-btn ${!hasMediationTable ? "active warning" : ""}`}
          onClick={() => {
            setHasMediationTable(false);
            setShowFeedback(false);
          }}
        >
          ⛓️ {lang === "en" ? "Rigid Secret Alliances" : "Geheime Buendnisfallen"}
        </button>
        <button
          type="button"
          className={`dip-btn ${hasMediationTable ? "active" : ""}`}
          onClick={() => {
            setHasMediationTable(true);
            setShowFeedback(false);
          }}
        >
          🕊️ {lang === "en" ? "Geneva Peace Mediation Table" : "Genfer Vermittlungstisch"}
        </button>
      </div>

      {/* Domino Visualizer */}
      <div className={`domino-stage ${status}`}>
        <div className="stage-title">
          {hasMediationTable
            ? lang === "en" ? "Geneva Open Dialogue Council" : "Genfer Gespraechsrat"
            : lang === "en" ? "Six Nations Bound by Secret Treaties" : "Sechs Staaten in Buendnisketten"}
        </div>

        <div className="domino-row">
          {["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"].map((name, i) => (
            <div
              key={name}
              className={`domino-tile ${fallenDominoes > i ? "fallen" : "upright"}`}
            >
              <div className="tile-flag">{fallenDominoes > i ? "💥" : "🏛️"}</div>
              <div className="tile-name">{name}</div>
            </div>
          ))}
        </div>

        <div className="incident-row">
          <button
            type="button"
            className="incident-btn"
            onClick={() => {
              setIncidentTriggered(true);
              setShowFeedback(false);
            }}
          >
            ⚡ {lang === "en" ? "Trigger Border Dispute" : "Grenzstreit ausloesen"}
          </button>
        </div>
      </div>

      {/* Outcome Banner */}
      <div className="status-readout">
        {status === "calm" && (
          <span className="calm-text">
            {lang === "en" ? "Europe is at peace. Trigger a dispute to test the system." : "Europa hat Frieden. Loese einen Streit aus, um das System zu testen."}
          </span>
        )}
        {status === "cascade" && (
          <span className="danger-text">
            ⚠️ {lang === "en" ? "All 6 nations were dragged in by mutual defense dominoes! (Conflict: 100%)" : "Alle 6 Staaten wurden durch den Dominoeffekt in den Krieg gezogen! (Konflikt: 100%)"}
          </span>
        )}
        {status === "defused" && (
          <span className="peace-text">
            ✅ {lang === "en" ? "The dispute was brought to the mediation table and defused peacefully! (Conflict: 0%)" : "Der Streit wurde am Vermittlungstisch friedlich geloest! (Konflikt: 0%)"}
          </span>
        )}
      </div>

      <div className="ww1-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${hasMediationTable ? "success" : "warning"}`}>
            {hasMediationTable
              ? lang === "en"
                ? "Perfect! The Geneva Peace Mediation Table prevented the alliance domino trap."
                : "Perfekt! Der Vermittlungstisch verhinderte die Buendnis-Kettenreaktion."
              : lang === "en"
              ? "Switch to the Geneva Peace Mediation Table to prevent the domino cascade."
              : "Waehle den Genfer Vermittlungstisch, um die Kettenreaktion zu stoppen."}
          </div>
        )}
      </div>
    </div>
  );
}
