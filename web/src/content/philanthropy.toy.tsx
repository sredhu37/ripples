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

  const harvestLabel =
    lang === "pl" ? "Roczny plon zysków:" : lang === "de" ? "Jahresertrag:" : "Annual Harvest:";
  const availableLabel =
    lang === "pl" ? "monet do podziału" : lang === "de" ? "Münzen verfügbar" : "Coins Available";
  const capitalLabel =
    lang === "pl"
      ? "Kapitał żelazny: 1 000 monet (Nienaruszalny)"
      : lang === "de"
        ? "Stiftungsvermögen: 1.000 Münzen (Geschützt)"
        : "Endowment Capital: 1,000 Coins (Protected)";

  const stumpWarning =
    lang === "pl"
      ? "Drzewo zostało ścięte! 1 000 monet wydane dzisiaj = 0 jabłek na zawsze."
      : lang === "de"
        ? "Der Baum wurde gefällt! 1.000 Münzen heute weg = 0 Äpfel für immer."
        : "The tree was chopped down! 1,000 coins spent today = 0 apples forever.";

  const replantText =
    lang === "pl"
      ? "🌱 Posadź żywe drzewo na nowo"
      : lang === "de"
        ? "🌱 Baum wieder pflanzen"
        : "🌱 Replant Living Tree";
  const cutTreeText =
    lang === "pl"
      ? "🪓 Test: 'Niecierpliwy burmistrz' rozdaje wszystko"
      : lang === "de"
        ? "🪓 'Ungeduldiger Bürgermeister' testen"
        : "🪓 Try 'Impatient Mayor' Handout";

  const libraryTitle =
    lang === "pl" ? "Książki do biblioteki" : lang === "de" ? "Dorfbücherei" : "Library Books";
  const swimTitle =
    lang === "pl" ? "Przystań pływacka" : lang === "de" ? "Schwimmsteg" : "Swimming Dock";
  const parkTitle = lang === "pl" ? "Park przyrody" : lang === "de" ? "Naturpark" : "Nature Park";
  const coinsText = lang === "pl" ? "monet" : lang === "de" ? "Münzen" : "Coins";
  const addTenText = `+10 ${coinsText}`;
  const resetText = lang === "pl" ? "Zresetuj" : lang === "de" ? "Zurücksetzen" : "Reset";

  const quizSuccessMsg =
    lang === "pl"
      ? "Wspaniale! Sfinansowałeś książki i lekcje pływania, zachowując nienaruszony kapitał 1 000 monet!"
      : lang === "de"
        ? "Wunderbar! Du hast Bücher und Schwimmsteg gefördert und das Stiftungsvermögen geschützt!"
        : "Wonderful! You funded library books and swimming lessons while keeping the 1,000-coin endowment intact!";

  const quizPromptMsg =
    lang === "pl"
      ? "Przydziel dokładnie 20 monet Bibliotece i 20 monet Przystani Pływackiej."
      : lang === "de"
        ? "Teile genau 20 Münzen der Bücherei und 20 Münzen dem Schwimmsteg zu."
        : "Allocate exactly 20 coins to the Library and 20 coins to the Swimming Dock.";

  const toySuccessMsg =
    lang === "pl"
      ? "Świetna robota! Ochrona kapitału żelaznego pozwala finansować projekty społeczności przez stulecia."
      : lang === "de"
        ? "Toll gemacht! Das geschützte Kapital fördert Projekte für immer."
        : "Great job! Protecting the capital lets you fund community projects forever.";

  return (
    <div className="philanthropy-wrap">
      {/* Endowment Tree */}
      <div className="tree-container">
        {!treeCutDown ? (
          <div className="endowment-tree">
            <div className="tree-apples">
              🍎 {harvestLabel}{" "}
              <strong>
                {remainingYield} {availableLabel}
              </strong>
            </div>
            <div className="tree-trunk">🛡️ {capitalLabel}</div>
          </div>
        ) : (
          <div className="tree-stump">
            <div className="stump-warning">🪓 {stumpWarning}</div>
          </div>
        )}

        {mode !== "quiz" && (
          <div className="tree-toggle-bar">
            <button
              type="button"
              className="toggle-stump-btn"
              onClick={() => setTreeCutDown((prev) => !prev)}
            >
              {treeCutDown ? replantText : cutTreeText}
            </button>
          </div>
        )}
      </div>

      {/* Community Baskets */}
      <div className="projects-grid">
        <div className="project-card">
          <div className="p-title">📚 {libraryTitle}</div>
          <div className="p-coins">
            {libraryCoins} {coinsText}
          </div>
          <ToyButton
            onClick={() => handleAllocate("library")}
            disabled={treeCutDown || remainingYield < 10}
          >
            {addTenText}
          </ToyButton>
        </div>

        <div className="project-card">
          <div className="p-title">🏊 {swimTitle}</div>
          <div className="p-coins">
            {swimCoins} {coinsText}
          </div>
          <ToyButton
            onClick={() => handleAllocate("swim")}
            disabled={treeCutDown || remainingYield < 10}
          >
            {addTenText}
          </ToyButton>
        </div>

        <div className="project-card">
          <div className="p-title">🌲 {parkTitle}</div>
          <div className="p-coins">
            {parkCoins} {coinsText}
          </div>
          <ToyButton
            onClick={() => handleAllocate("park")}
            disabled={treeCutDown || remainingYield < 10}
          >
            {addTenText}
          </ToyButton>
        </div>
      </div>

      <div className="philanthropy-actions">
        <div className="action-row">
          <ToyButton onClick={handleResetYield} disabled={totalAllocated === 0}>
            {resetText}
          </ToyButton>
          <CheckButton lang={lang} onClick={handleCheck} />
        </div>
        {showFeedback && (
          <div
            className={`feedback-msg ${mode === "quiz" ? (libraryCoins === 20 && swimCoins === 20 ? "success" : "warning") : "success"}`}
          >
            {mode === "quiz"
              ? libraryCoins === 20 && swimCoins === 20
                ? quizSuccessMsg
                : quizPromptMsg
              : toySuccessMsg}
          </div>
        )}
      </div>
    </div>
  );
}
