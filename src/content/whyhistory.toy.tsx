import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./whyhistory.css";

export const ARTIFACTS = [
  { id: "astrolabe", nameEn: "Astrolabe", nameDe: "Astrolabium", icon: "🧭", target: "dialogue" },
  { id: "yarn", nameEn: "Spinning Wheel Yarn", nameDe: "Charkha-Garn", icon: "🧵", target: "selfreliance" },
  { id: "treaty", nameEn: "Peace Treaty Scroll", nameDe: "Friedensvertrag", icon: "📜", target: "diplomacy" },
  { id: "steel", nameEn: "1951 Steel Beam", nameDe: "EGKS-Stahlträger", icon: "🔩", target: "reconciliation" },
];

export const TARGET_LABELS: Record<string, { en: string; de: string }> = {
  dialogue: { en: "Cultural Dialogue & Science", de: "Kulturaustausch & Wissen" },
  selfreliance: { en: "Non-violent Self-Reliance", de: "Gewaltfreie Selbstbestimmung" },
  diplomacy: { en: "International Diplomacy", de: "Internationale Diplomatie" },
  reconciliation: { en: "European Reconciliation", de: "Europäische Versöhnung" },
};

export function calcHistoryInsights(matches: Record<string, string>) {
  let correctCount = 0;
  for (const item of ARTIFACTS) {
    if (matches[item.id] === item.target) {
      correctCount += 1;
    }
  }
  const insightsScore = correctCount * 25;
  const isFullyDecoded = correctCount === 4;
  return { correctCount, insightsScore, isFullyDecoded };
}

interface WhyHistoryToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function WhyHistoryToy({ lang, mode = "toy", onDone }: WhyHistoryToyProps) {
  const [matches, setMatches] = useState<Record<string, string>>(
    mode === "quiz"
      ? { astrolabe: "dialogue" }
      : { astrolabe: "dialogue", yarn: "selfreliance" }
  );
  const [showFeedback, setShowFeedback] = useState(false);

  const { correctCount, insightsScore, isFullyDecoded } = calcHistoryInsights(matches);

  useEffect(() => {
    if (mode === "toy" && isFullyDecoded && onDone) {
      onDone();
    }
  }, [isFullyDecoded, mode, onDone]);

  const handleSelect = (artifactId: string, targetId: string) => {
    setMatches((prev) => ({ ...prev, [artifactId]: targetId }));
    setShowFeedback(false);
  };

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (isFullyDecoded && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="whyhistory-wrap">
      {/* Archive Header */}
      <div className={`archive-beacon ${isFullyDecoded ? "shining" : ""}`}>
        <span className="beacon-icon">💡</span>
        <span className="beacon-text">
          {lang === "en" ? "Historical Insights & Memory:" : "Historische Erkenntnis & Erinnerung:"}{" "}
          <strong>{insightsScore}%</strong>
        </span>
      </div>

      {/* Artifacts matcher grid */}
      <div className="archive-grid">
        {ARTIFACTS.map((item) => (
          <div key={item.id} className="artifact-card">
            <div className="artifact-header">
              <span className="artifact-icon">{item.icon}</span>
              <span className="artifact-name">{lang === "en" ? item.nameEn : item.nameDe}</span>
            </div>
            <select
              className="artifact-select"
              value={matches[item.id] || ""}
              onChange={(e) => handleSelect(item.id, e.target.value)}
            >
              <option value="">{lang === "en" ? "-- Choose Meaning --" : "-- Bedeutung wählen --"}</option>
              {Object.entries(TARGET_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {lang === "en" ? label.en : label.de}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="archive-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${isFullyDecoded ? "success" : "warning"}`}>
            {isFullyDecoded
              ? lang === "en"
                ? "Wonderful! You connected the primary evidence to the lessons of human history."
                : "Wunderbar! Du hast alle historischen Quellen mit den Lehren der Geschichte verknüpft."
              : lang === "en"
              ? `You have matched ${correctCount} of 4 correctly. Keep investigating!`
              : `Du hast ${correctCount} von 4 richtig zugeordnet. Forscht weiter!`}
          </div>
        )}
      </div>
    </div>
  );
}
