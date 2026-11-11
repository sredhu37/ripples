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

  const {
    conflict: _conflict,
    fallenDominoes,
    status,
  } = calcAllianceCascade(hasMediationTable, incidentTriggered);

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

  const secretAlliancesLabel =
    lang === "pl"
      ? "Sztywne tajne sojusze"
      : lang === "de"
        ? "Geheime Buendnisfallen"
        : "Rigid Secret Alliances";

  const mediationTableLabel =
    lang === "pl"
      ? "Genewski stół mediacji pokojowej"
      : lang === "de"
        ? "Genfer Vermittlungstisch"
        : "Geneva Peace Mediation Table";

  const stageTitle = hasMediationTable
    ? lang === "pl"
      ? "Genewska rada otwartego dialogu"
      : lang === "de"
        ? "Genfer Gespraechsrat"
        : "Geneva Open Dialogue Council"
    : lang === "pl"
      ? "Sześć państw spętanych tajnymi paktami"
      : lang === "de"
        ? "Sechs Staaten in Buendnisketten"
        : "Six Nations Bound by Secret Treaties";

  const triggerIncidentLabel =
    lang === "pl"
      ? "Wywołaj spór graniczny"
      : lang === "de"
        ? "Grenzstreit ausloesen"
        : "Trigger Border Dispute";

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
          ⛓️ {secretAlliancesLabel}
        </button>
        <button
          type="button"
          className={`dip-btn ${hasMediationTable ? "active" : ""}`}
          onClick={() => {
            setHasMediationTable(true);
            setShowFeedback(false);
          }}
        >
          🕊️ {mediationTableLabel}
        </button>
      </div>

      {/* Domino Visualizer */}
      <div className={`domino-stage ${status}`}>
        <div className="stage-title">{stageTitle}</div>

        <div className="domino-row">
          {["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"].map((name, i) => (
            <div key={name} className={`domino-tile ${fallenDominoes > i ? "fallen" : "upright"}`}>
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
            ⚡ {triggerIncidentLabel}
          </button>
        </div>
      </div>

      {/* Outcome Banner */}
      <div className="status-readout">
        {status === "calm" && (
          <span className="calm-text">
            {lang === "pl"
              ? "W Europie panuje pokój. Wywołaj spór, aby przetestować system."
              : lang === "de"
                ? "Europa hat Frieden. Loese einen Streit aus, um das System zu testen."
                : "Europe is at peace. Trigger a dispute to test the system."}
          </span>
        )}
        {status === "cascade" && (
          <span className="danger-text">
            ⚠️{" "}
            {lang === "pl"
              ? "Wszystkie 6 państw zostało wciągniętych do wojny przez efekt domina! (Konflikt: 100%)"
              : lang === "de"
                ? "Alle 6 Staaten wurden durch den Dominoeffekt in den Krieg gezogen! (Konflikt: 100%)"
                : "All 6 nations were dragged in by mutual defense dominoes! (Conflict: 100%)"}
          </span>
        )}
        {status === "defused" && (
          <span className="peace-text">
            ✅{" "}
            {lang === "pl"
              ? "Spór został skierowany do stołu mediacji i rozwiązany pokojowo! (Konflikt: 0%)"
              : lang === "de"
                ? "Der Streit wurde am Vermittlungstisch friedlich geloest! (Konflikt: 0%)"
                : "The dispute was brought to the mediation table and defused peacefully! (Conflict: 0%)"}
          </span>
        )}
      </div>

      <div className="ww1-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${hasMediationTable ? "success" : "warning"}`}>
            {hasMediationTable
              ? lang === "pl"
                ? "Doskonale! Genewski stół mediacji pokojowej zapobiegł pułapce domina sojuszy."
                : lang === "de"
                  ? "Perfekt! Der Vermittlungstisch verhinderte die Buendnis-Kettenreaktion."
                  : "Perfect! The Geneva Peace Mediation Table prevented the alliance domino trap."
              : lang === "pl"
                ? "Przełącz na Genewski stół mediacji pokojowej, aby zatrzymać kaskadę domina."
                : lang === "de"
                  ? "Waehle den Genfer Vermittlungstisch, um die Kettenreaktion zu stoppen."
                  : "Switch to the Geneva Peace Mediation Table to prevent the domino cascade."}
          </div>
        )}
      </div>
    </div>
  );
}
