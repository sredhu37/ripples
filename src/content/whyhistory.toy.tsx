import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./whyhistory.css";

export const ARTIFACTS = [
  {
    id: "astrolabe",
    nameEn: "Astrolabe",
    nameDe: "Astrolabium",
    namePl: "Astrolabium",
    icon: "🧭",
    target: "dialogue",
  },
  {
    id: "yarn",
    nameEn: "Spinning Wheel Yarn",
    nameDe: "Charkha-Garn",
    namePl: "Przędza z kołowrotka Charkha",
    icon: "🧵",
    target: "selfreliance",
  },
  {
    id: "treaty",
    nameEn: "Peace Treaty Scroll",
    nameDe: "Friedensvertrag",
    namePl: "Zwój traktatu pokojowego",
    icon: "📜",
    target: "diplomacy",
  },
  {
    id: "steel",
    nameEn: "1951 Steel Beam",
    nameDe: "EGKS-Stahlträger",
    namePl: "Dźwigar stalowy EWWiS (1951)",
    icon: "🔩",
    target: "reconciliation",
  },
];

export const TARGET_LABELS: Record<string, { en: string; de: string; pl: string }> = {
  dialogue: {
    en: "Cultural Dialogue & Science",
    de: "Kulturaustausch & Wissen",
    pl: "Dialog kulturowy i nauka",
  },
  selfreliance: {
    en: "Non-violent Self-Reliance",
    de: "Gewaltfreie Selbstbestimmung",
    pl: "Pokojowa samowystarczalność",
  },
  diplomacy: {
    en: "International Diplomacy",
    de: "Internationale Diplomatie",
    pl: "Międzynarodowa dyplomacja",
  },
  reconciliation: {
    en: "European Reconciliation",
    de: "Europäische Versöhnung",
    pl: "Pojednanie europejskie",
  },
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
    mode === "quiz" ? { astrolabe: "dialogue" } : { astrolabe: "dialogue", yarn: "selfreliance" },
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

  const insightsLabel =
    lang === "pl"
      ? "Wgląd historyczny i pamięć:"
      : lang === "de"
        ? "Historische Erkenntnis & Erinnerung:"
        : "Historical Insights & Memory:";

  const choosePrompt =
    lang === "pl"
      ? "-- Wybierz znaczenie --"
      : lang === "de"
        ? "-- Bedeutung wählen --"
        : "-- Choose Meaning --";

  const getItemName = (item: (typeof ARTIFACTS)[0]) => {
    if (lang === "pl") return item.namePl;
    if (lang === "de") return item.nameDe;
    return item.nameEn;
  };

  const getTargetLabel = (label: { en: string; de: string; pl: string }) => {
    if (lang === "pl") return label.pl;
    if (lang === "de") return label.de;
    return label.en;
  };

  return (
    <div className="whyhistory-wrap">
      {/* Archive Header */}
      <div className={`archive-beacon ${isFullyDecoded ? "shining" : ""}`}>
        <span className="beacon-icon">💡</span>
        <span className="beacon-text">
          {insightsLabel} <strong>{insightsScore}%</strong>
        </span>
      </div>

      {/* Artifacts matcher grid */}
      <div className="archive-grid">
        {ARTIFACTS.map((item) => (
          <div key={item.id} className="artifact-card">
            <div className="artifact-header">
              <span className="artifact-icon">{item.icon}</span>
              <span className="artifact-name">{getItemName(item)}</span>
            </div>
            <select
              className="artifact-select"
              value={matches[item.id] || ""}
              onChange={(e) => handleSelect(item.id, e.target.value)}
            >
              <option value="">{choosePrompt}</option>
              {Object.entries(TARGET_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {getTargetLabel(label)}
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
              ? lang === "pl"
                ? "Wspaniale! Połączyłeś dowody ze źródeł pierwotnych z najważniejszymi lekcjami historii ludzkości."
                : lang === "de"
                  ? "Wunderbar! Du hast alle historischen Quellen mit den Lehren der Geschichte verknüpft."
                  : "Wonderful! You connected the primary evidence to the lessons of human history."
              : lang === "pl"
                ? `Dopasowałeś poprawnie ${correctCount} z 4. Badaj dalej!`
                : lang === "de"
                  ? `Du hast ${correctCount} von 4 richtig zugeordnet. Forscht weiter!`
                  : `You have matched ${correctCount} of 4 correctly. Keep investigating!`}
          </div>
        )}
      </div>
    </div>
  );
}
