import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./jobs.css";

export type WorkforcePolicy = "routine" | "balanced" | "upskilling";

export function calcWorkforceShift(policy: WorkforcePolicy) {
  let routineJobs = 80;
  let modernJobs = 15;
  let readinessScore = 25;

  if (policy === "balanced") {
    routineJobs = 45;
    modernJobs = 50;
    readinessScore = 65;
  } else if (policy === "upskilling") {
    routineJobs = 15;
    modernJobs = 85;
    readinessScore = 95;
  }

  const isFutureReady = readinessScore >= 90;
  const status = isFutureReady ? ("future_ready" as const) : readinessScore >= 60 ? ("transitioning" as const) : ("vulnerable" as const);

  return {
    policy,
    routineJobs,
    modernJobs,
    readinessScore,
    isFutureReady,
    status,
  };
}

interface JobsToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function JobsToy({ lang, mode = "toy", onDone }: JobsToyProps) {
  const [policy, setPolicy] = useState<WorkforcePolicy>(mode === "quiz" ? "routine" : "balanced");
  const [showFeedback, setShowFeedback] = useState(false);

  const { routineJobs, modernJobs, readinessScore, isFutureReady, status } = calcWorkforceShift(policy);

  useEffect(() => {
    if (mode === "toy" && isFutureReady && onDone) {
      onDone();
    }
  }, [isFutureReady, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (isFutureReady && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="jobs-wrap">
      {/* Education & Economic Strategy Selector */}
      <div className="jobs-policy-selector">
        <span className="selector-title">
          {lang === "pl"
            ? "Strategia szkolenia i rozwoju kadr:"
            : lang === "de"
            ? "Bildungs- und Foerderstrategie:"
            : "Workforce Training Policy:"}
        </span>
        <div className="policy-buttons">
          <button
            type="button"
            className={`policy-btn ${policy === "routine" ? "active" : ""}`}
            onClick={() => {
              setPolicy("routine");
              setShowFeedback(false);
            }}
          >
            {lang === "pl"
              ? "Zachowaj stare zawody"
              : lang === "de"
              ? "Alte Berufe bewahren"
              : "Keep Routine Roles"}
          </button>
          <button
            type="button"
            className={`policy-btn ${policy === "balanced" ? "active" : ""}`}
            onClick={() => {
              setPolicy("balanced");
              setShowFeedback(false);
            }}
          >
            {lang === "pl"
              ? "Stopniowa zmiana"
              : lang === "de"
              ? "Schrittweiser Wandel"
              : "Gradual Shift"}
          </button>
          <button
            type="button"
            className={`policy-btn ${policy === "upskilling" ? "active" : ""}`}
            onClick={() => {
              setPolicy("upskilling");
              setShowFeedback(false);
            }}
          >
            {lang === "pl"
              ? "Inwestycja w zawody przyszłości"
              : lang === "de"
              ? "Investition in Zukunftsberufe"
              : "Invest in Green & Tech Skills"}
          </button>
        </div>
      </div>

      {/* Workforce composition cards */}
      <div className="workforce-metrics-row">
        <div className="workforce-metric-card routine">
          <span className="card-label">
            {lang === "pl"
              ? "Rutynowa praca fizyczna"
              : lang === "de"
              ? "Reine Routinearbeiten"
              : "Routine Manual Work"}
          </span>
          <strong className="card-val">{routineJobs}%</strong>
          <span className="card-sub">
            {lang === "pl"
              ? "Powtarzalne zadania podatne na automatyzację"
              : lang === "de"
              ? "Anfaellig fuer Automatisierung"
              : "Repetitive tasks vulnerable to machines"}
          </span>
        </div>

        <div className="workforce-metric-card modern">
          <span className="card-label">
            {lang === "pl"
              ? "Zawody technologiczne, zielone i opiekuńcze"
              : lang === "de"
              ? "Tech-, Umwelt- & Pflegeberufe"
              : "Tech, Green & Care Roles"}
          </span>
          <strong className="card-val">{modernJobs}%</strong>
          <span className="card-sub">
            {lang === "pl"
              ? "Wysokie kwalifikacje, twórczość i relacje z ludźmi"
              : lang === "de"
              ? "Kreativ, technisch & zwischenmenschlich"
              : "High skill, creative & interpersonal"}
          </span>
        </div>
      </div>

      {/* Future readiness meter */}
      <div className={`readiness-dashboard ${status}`}>
        <div className="readiness-header">
          <span>
            {lang === "pl"
              ? "Odporność gospodarki na zmiany:"
              : lang === "de"
              ? "Zukunftsfaehigkeit der Wirtschaft:"
              : "Future Workforce Resilience:"}
          </span>
          <strong className="readiness-val">{readinessScore}%</strong>
        </div>
        <div className="readiness-bar">
          <div className="readiness-fill" style={{ width: `${readinessScore}%` }} />
        </div>
      </div>

      <div className="jobs-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`jobs-feedback ${isFutureReady ? "success" : "warning"}`}>
            {isFutureReady
              ? lang === "pl"
                ? "Doskonale! Inwestycja w podnoszenie kwalifikacji przygotowuje 85% pracowników na zawody przyszłości."
                : lang === "de"
                ? "Hervorragend! Weiterbildung bereitet 85% der Arbeitskraefte auf zukunftssichere Berufe vor."
                : "Excellent! Investing in upskilling prepares 85% of workers for rewarding future careers."
              : lang === "pl"
              ? "Wybierz 'Inwestycja w zawody przyszłości', aby uzyskać >90% odporności gospodarki."
              : lang === "de"
              ? "Waehle 'Investition in Zukunftsberufe', um ueber 90% Zukunftsfaehigkeit zu erreichen."
              : "Select 'Invest in Green & Tech Skills' to achieve >90% future workforce resilience."}
          </div>
        )}
      </div>
    </div>
  );
}
