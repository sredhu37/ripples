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
          {lang === "en" ? "Workforce Training Policy:" : "Bildungs- und Foerderstrategie:"}
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
            {lang === "en" ? "Keep Routine Roles" : "Alte Berufe bewahren"}
          </button>
          <button
            type="button"
            className={`policy-btn ${policy === "balanced" ? "active" : ""}`}
            onClick={() => {
              setPolicy("balanced");
              setShowFeedback(false);
            }}
          >
            {lang === "en" ? "Gradual Shift" : "Schrittweiser Wandel"}
          </button>
          <button
            type="button"
            className={`policy-btn ${policy === "upskilling" ? "active" : ""}`}
            onClick={() => {
              setPolicy("upskilling");
              setShowFeedback(false);
            }}
          >
            {lang === "en" ? "Invest in Green & Tech Skills" : "Investition in Zukunftsberufe"}
          </button>
        </div>
      </div>

      {/* Workforce composition cards */}
      <div className="workforce-metrics-row">
        <div className="workforce-metric-card routine">
          <span className="card-label">
            {lang === "en" ? "Routine Manual Work" : "Reine Routinearbeiten"}
          </span>
          <strong className="card-val">{routineJobs}%</strong>
          <span className="card-sub">
            {lang === "en" ? "Repetitive tasks vulnerable to machines" : "Anfaellig fuer Automatisierung"}
          </span>
        </div>

        <div className="workforce-metric-card modern">
          <span className="card-label">
            {lang === "en" ? "Tech, Green & Care Roles" : "Tech-, Umwelt- & Pflegeberufe"}
          </span>
          <strong className="card-val">{modernJobs}%</strong>
          <span className="card-sub">
            {lang === "en" ? "High skill, creative & interpersonal" : "Kreativ, technisch & zwischenmenschlich"}
          </span>
        </div>
      </div>

      {/* Future readiness meter */}
      <div className={`readiness-dashboard ${status}`}>
        <div className="readiness-header">
          <span>{lang === "en" ? "Future Workforce Resilience:" : "Zukunftsfaehigkeit der Wirtschaft:"}</span>
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
              ? lang === "en"
                ? "Excellent! Investing in upskilling prepares 85% of workers for rewarding future careers."
                : "Hervorragend! Weiterbildung bereitet 85% der Arbeitskraefte auf zukunftssichere Berufe vor."
              : lang === "en"
              ? "Select 'Invest in Green & Tech Skills' to achieve >90% future workforce resilience."
              : "Waehle 'Investition in Zukunftsberufe', um ueber 90% Zukunftsfaehigkeit zu erreichen."}
          </div>
        )}
      </div>
    </div>
  );
}
