import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import { resolveText, type Text } from "../lesson/types";
import "./mughals.css";

export function calcImperialHarmony(scholarCount: number, listensToAll: boolean) {
  if (!listensToAll) {
    return { harmony: 20, prosperity: 30, arts: 30, status: "conflict" as const };
  }
  const harmony = Math.min(100, scholarCount * 25);
  const prosperity = 20 + scholarCount * 20;
  const arts = 20 + scholarCount * 20;
  const status = (harmony >= 100 ? "harmony" : "growing") as "harmony" | "growing";
  return { harmony, prosperity, arts, status };
}

interface MughalsToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function MughalsToy({ lang, mode = "toy", onDone }: MughalsToyProps) {
  const [seatedScholars, setSeatedScholars] = useState<string[]>(
    mode === "quiz" ? ["astronomy"] : []
  );
  const [listensToAll, setListensToAll] = useState(mode !== "quiz");
  const [showFeedback, setShowFeedback] = useState(false);

  const { harmony, prosperity, arts, status } = calcImperialHarmony(
    seatedScholars.length,
    listensToAll
  );

  const allScholars = [
    {
      id: "philosophy",
      name: { en: "Philosophy and Ethics", de: "Philosophie und Ethik", pl: "Filozofia i etyka" } as Text,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" />
          <path d="M7 7h10M7 11h10M7 15h6" />
        </svg>
      ),
    },
    {
      id: "astronomy",
      name: { en: "Astronomy and Math", de: "Astronomie und Mathe", pl: "Astronomia i matematyka" } as Text,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      id: "agriculture",
      name: { en: "Farming and Food", de: "Landwirtschaft und Ernte", pl: "Rolnictwo i żywność" } as Text,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22v-8M7 10c0 5 5 5 5 5s5 0 5-5c0-4-5-8-5-8s-5 4-5 8z" />
        </svg>
      ),
    },
    {
      id: "trade",
      name: { en: "Textiles and Trade", de: "Handel und Webkunst", pl: "Tkactwo i handel" } as Text,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v18M5 8l7-4 7 4M2 13l3-5 3 5a3 3 0 0 1-6 0zM16 13l3-5 3 5a3 3 0 0 1-6 0z" />
        </svg>
      ),
    },
  ];

  const toggleScholar = (id: string) => {
    if (seatedScholars.includes(id)) {
      setSeatedScholars((prev) => prev.filter((s) => s !== id));
    } else {
      setSeatedScholars((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    if (mode === "toy" && seatedScholars.length === 4 && listensToAll && onDone) {
      onDone();
    }
  }, [seatedScholars, listensToAll, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (seatedScholars.length === 4 && listensToAll && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  const isCorrect = seatedScholars.length === 4 && listensToAll;

  return (
    <div className="mughals-wrap">
      {/* Listening Mode Selection */}
      <div className="mughals-mode-bar" role="group" aria-label={lang === "en" ? "Council Rule Style" : lang === "de" ? "Herrschaftsstil" : "Styl rządzenia"}>
        <button
          type="button"
          className={`mughals-toggle-btn ${listensToAll ? "active" : ""}`}
          onClick={() => {
            setListensToAll(true);
            setShowFeedback(false);
          }}
        >
          {lang === "en" ? "Listen and Learn Together" : lang === "de" ? "Zuhören und Miteinander lernen" : "Słuchaj i ucz się wspólnie"}
        </button>
        <button
          type="button"
          className={`mughals-toggle-btn ${!listensToAll ? "active warning" : ""}`}
          onClick={() => {
            setListensToAll(false);
            setShowFeedback(false);
          }}
        >
          {lang === "en" ? "Rule by Command Only" : lang === "de" ? "Befehle ohne Zuhören" : "Rządź tylko rozkazami"}
        </button>
      </div>

      {/* Council Chamber */}
      <div className={`mughals-council-chamber ${status}`}>
        <div className="mughals-chamber-title">
          {lang === "en" ? "The Ibadat Khana Council Table" : lang === "de" ? "Der Ratstisch des Ibadat Khana" : "Okrągły stół Ibadat Chana"}
        </div>
        <div className="mughals-scholars-grid">
          {allScholars.map((s) => {
            const isSeated = seatedScholars.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                className={`mughals-seat-btn ${isSeated ? "seated" : "empty"}`}
                onClick={() => toggleScholar(s.id)}
              >
                <span className="mughals-scholar-icon">{s.icon}</span>
                <span className="mughals-scholar-name">{resolveText(s.name, lang)}</span>
                <span className="mughals-seat-badge">
                  {isSeated
                    ? lang === "en" ? "At Table" : lang === "de" ? "Am Tisch" : "Przy stole"
                    : lang === "en" ? "+ Invite" : lang === "de" ? "+ Einladen" : "+ Zaproś"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mughals-metrics-row">
        <div className="mughals-metric-card">
          <div className="mughals-metric-label">
            {lang === "en" ? "Harmony" : lang === "de" ? "Eintracht" : "Harmonia"}
          </div>
          <div className="mughals-metric-bar">
            <div className="mughals-metric-fill harmony" style={{ width: `${harmony}%` }} />
          </div>
          <div className="mughals-metric-val">{harmony}%</div>
        </div>

        <div className="mughals-metric-card">
          <div className="mughals-metric-label">
            {lang === "en" ? "Prosperity" : lang === "de" ? "Wohlstand" : "Dobrobyt"}
          </div>
          <div className="mughals-metric-bar">
            <div className="mughals-metric-fill prosperity" style={{ width: `${prosperity}%` }} />
          </div>
          <div className="mughals-metric-val">{prosperity}%</div>
        </div>

        <div className="mughals-metric-card">
          <div className="mughals-metric-label">
            {lang === "en" ? "Arts & Science" : lang === "de" ? "Kultur & Wissen" : "Sztuka i nauka"}
          </div>
          <div className="mughals-metric-bar">
            <div className="mughals-metric-fill arts" style={{ width: `${arts}%` }} />
          </div>
          <div className="mughals-metric-val">{arts}%</div>
        </div>
      </div>

      {/* Explanatory Message */}
      <div className="mughals-message-box">
        {!listensToAll ? (
          <p className="mughals-warning-text">
            {lang === "en"
              ? "When a ruler commands without listening, scholars fall silent, distrust spreads, and trade slows down."
              : lang === "de"
              ? "Wenn ein Herrscher befiehlt ohne zuzuhören, schweigen die Gelehrten, Misstrauen wächst und der Handel stockt."
              : "Kiedy władca rozkazuje bez słuchania, uczeni milkną, nieufność rośnie, a handel zamiera."}
          </p>
        ) : seatedScholars.length === 4 ? (
          <p className="mughals-success-text">
            {lang === "en"
              ? "All voices share wisdom at the table. Peaceful dialogue brings lasting harmony and great discoveries!"
              : lang === "de"
              ? "Alle Stimmen teilen Weisheit am Tisch. Friedlicher Dialog bringt dauerhafte Eintracht und große Entdeckungen!"
              : "Wszystkie głosy dzielą się mądrością przy stole. Pokojowy dialog przynosi trwałą harmonię i wielkie odkrycia!"}
          </p>
        ) : (
          <p className="mughals-hint-text">
            {lang === "en"
              ? `Invite all 4 scholars to sit together. (${seatedScholars.length}/4 seated)`
              : lang === "de"
              ? `Lade alle 4 Gelehrten ein, sich an den Tisch zu setzen. (${seatedScholars.length}/4 am Tisch)`
              : `Zaproś wszystkich 4 uczonych do wspólnego stołu. (${seatedScholars.length}/4 przy stole)`}
          </p>
        )}
      </div>

      {mode === "quiz" && (
        <div className="mughals-quiz-actions">
          <CheckButton lang={lang} onClick={handleCheck} />
          {showFeedback && (
            <div className={`mughals-feedback ${isCorrect ? "correct" : "retry"}`}>
              {isCorrect
                ? lang === "en"
                  ? "Perfect! All four scholars sit together in shared dialogue."
                  : lang === "de"
                  ? "Perfekt! Alle vier Gelehrten sitzen im gemeinsamen Dialog zusammen."
                  : "Doskonale! Wszyscy czterej uczeni zasiadają razem do wspólnego dialogu."
                : lang === "en"
                  ? "Invite all 4 scholars and choose Listen and Learn Together."
                  : lang === "de"
                  ? "Lade alle 4 Gelehrten ein und wähle Zuhören und Miteinander lernen."
                  : "Zaproś wszystkich 4 uczonych i wybierz Słuchaj i ucz się wspólnie."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
