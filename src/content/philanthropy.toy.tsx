import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton, ToyButton } from "../lesson/toolkit";
import "./philanthropy.css";

interface PhilanthropyToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function calcEndowmentDistribution(library: number, swim: number, park: number) {
  const totalAllocated = library + swim + park;
  const isSustainable = totalAllocated <= 40;
  return { totalAllocated, isSustainable };
}

export function PhilanthropyToy({ lang, mode = "toy", onDone }: PhilanthropyToyProps) {
  const [libraryCoins, setLibraryCoins] = useState(0);
  const [swimCoins, setSwimCoins] = useState(0);
  const [parkCoins, setParkCoins] = useState(0);
  const [treeCutDown, setTreeCutDown] = useState(false);
  const [hasAllocatedAll, setHasAllocatedAll] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const totalAllocated = libraryCoins + swimCoins + parkCoins;
  const remainingYield = 40 - totalAllocated;

  useEffect(() => {
    if (mode === "toy") {
      if (totalAllocated >= 40) {
        setHasAllocatedAll(true);
      }
      if (hasAllocatedAll && onDone) {
        onDone();
      }
    }
  }, [totalAllocated, hasAllocatedAll, mode, onDone]);

  const handleAllocate = (project: "library" | "swim" | "park") => {
    if (remainingYield >= 10) {
      if (project === "library") setLibraryCoins((prev) => prev + 10);
      if (project === "swim") setSwimCoins((prev) => prev + 10);
      if (project === "park") setParkCoins((prev) => prev + 10);
    }
  };

  const handleResetYield = () => {
    setLibraryCoins(0);
    setSwimCoins(0);
    setParkCoins(0);
  };

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (libraryCoins === 20 && swimCoins === 20 && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="philanthropy-wrap">
      {/* Endowment Tree */}
      <div className="tree-container">
        {!treeCutDown ? (
          <div className="endowment-tree">
            <div className="tree-apples">
              🍎 {lang === "en" ? "Annual Harvest:" : "Jahresertrag:"}{" "}
              <strong>{remainingYield} {lang === "en" ? "Coins Available" : "Münzen verfügbar"}</strong>
            </div>
            <div className="tree-trunk">
              🛡️ {lang === "en" ? "Endowment Capital: 1,000 Coins (Protected)" : "Stiftungsvermögen: 1.000 Münzen (Geschützt)"}
            </div>
          </div>
        ) : (
          <div className="tree-stump">
            <div className="stump-warning">
              🪓 {lang === "en" ? "The tree was chopped down! 1,000 coins spent today = 0 apples forever." : "Der Baum wurde gefällt! 1.000 Münzen heute weg = 0 Äpfel für immer."}
            </div>
          </div>
        )}

        {mode !== "quiz" && (
          <div className="tree-toggle-bar">
            <button
              type="button"
              className="toggle-stump-btn"
              onClick={() => setTreeCutDown((prev) => !prev)}
            >
              {treeCutDown
                ? lang === "en" ? "🌱 Replant Living Tree" : "🌱 Baum wieder pflanzen"
                : lang === "en" ? "🪓 Try 'Impatient Mayor' Handout" : "🪓 'Ungeduldiger Bürgermeister' testen"}
            </button>
          </div>
        )}
      </div>

      {/* Community Baskets */}
      <div className="projects-grid">
        <div className="project-card">
          <div className="p-title">📚 {lang === "en" ? "Library Books" : "Dorfbücherei"}</div>
          <div className="p-coins">{libraryCoins} {lang === "en" ? "Coins" : "Münzen"}</div>
          <ToyButton
            onClick={() => handleAllocate("library")}
            disabled={treeCutDown || remainingYield < 10}
          >
            +10 {lang === "en" ? "Coins" : "Münzen"}
          </ToyButton>
        </div>

        <div className="project-card">
          <div className="p-title">🏊 {lang === "en" ? "Swimming Dock" : "Schwimmsteg"}</div>
          <div className="p-coins">{swimCoins} {lang === "en" ? "Coins" : "Münzen"}</div>
          <ToyButton
            onClick={() => handleAllocate("swim")}
            disabled={treeCutDown || remainingYield < 10}
          >
            +10 {lang === "en" ? "Coins" : "Münzen"}
          </ToyButton>
        </div>

        <div className="project-card">
          <div className="p-title">🌲 {lang === "en" ? "Nature Park" : "Naturpark"}</div>
          <div className="p-coins">{parkCoins} {lang === "en" ? "Coins" : "Münzen"}</div>
          <ToyButton
            onClick={() => handleAllocate("park")}
            disabled={treeCutDown || remainingYield < 10}
          >
            +10 {lang === "en" ? "Coins" : "Münzen"}
          </ToyButton>
        </div>
      </div>

      <div className="philanthropy-actions">
        <div className="action-row">
          <ToyButton onClick={handleResetYield} disabled={totalAllocated === 0}>
            {lang === "en" ? "Reset" : "Zurücksetzen"}
          </ToyButton>
          <CheckButton lang={lang} onClick={handleCheck} />
        </div>
        {showFeedback && (
          <div className={`feedback-msg ${mode === "quiz" ? (libraryCoins === 20 && swimCoins === 20 ? "success" : "warning") : "success"}`}>
            {mode === "quiz"
              ? libraryCoins === 20 && swimCoins === 20
                ? lang === "en"
                  ? "Wonderful! You funded library books and swimming lessons while keeping the 1,000-coin endowment intact!"
                  : "Wunderbar! Du hast Bücher und Schwimmsteg gefördert und das Stiftungsvermögen geschützt!"
                : lang === "en"
                ? "Allocate exactly 20 coins to the Library and 20 coins to the Swimming Dock."
                : "Teile genau 20 Münzen der Bücherei und 20 Münzen dem Schwimmsteg zu."
              : lang === "en"
              ? "Great job! Protecting the capital lets you fund community projects forever."
              : "Toll gemacht! Das geschützte Kapital fördert Projekte für immer."}
          </div>
        )}
      </div>
    </div>
  );
}
