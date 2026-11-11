import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";

interface WhyGovernmentToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function WhyGovernmentToy({ lang, mode = "toy", onDone }: WhyGovernmentToyProps) {
  const [rulesLevel, setRulesLevel] = useState(50);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState(false);

  // Update the visual state based on rules level
  const getTownState = () => {
    if (rulesLevel < 20) {
      return {
        cartState: "colliding",
        wellState: "dirty",
        checkpointCount: 0,
        description:
          lang === "pl"
            ? "Wozy zderzają się na zakrętach, woda w studni mętnieje, a mieszkańcy kłócą się bezradnie."
            : lang === "en"
              ? "Carts collide, well water turns brown, villagers complain"
              : "Kutschen stoßen zusammen, Brunnenwasser wird braun, Dorfbewohner beschweren sich",
      };
    } else if (rulesLevel > 80) {
      return {
        cartState: "blocked",
        wellState: "clean",
        checkpointCount: 5,
        description:
          lang === "pl"
            ? "Pięć punktów kontrolnych blokuje przejazd, wozy stoją w korku, a dostawy żywności zamierają."
            : lang === "en"
              ? "Five checkpoints block the road, carts cannot move, deliveries freeze"
              : "Fünf Kontrollpunkte blockieren die Straße, Kutschen können sich nicht bewegen, Lieferungen frieren ein",
      };
    } else {
      return {
        cartState: "smooth",
        wellState: "clean",
        checkpointCount: 2,
        description:
          lang === "pl"
            ? "Wozy płynnie mijają się prawą stroną, wiejski mularz naprawia kamienie studni i płynie czysta woda."
            : lang === "en"
              ? "Carts drive on the right side smoothly, town mason repairs well stones, sparkling water flows"
              : "Kutschen fahren auf der rechten Seite reibungslos, Dorfmaurer repariert Brunnensteine, sprudelndes Wasser fließt",
      };
    }
  };

  const townState = getTownState();

  const handleCheck = () => {
    if (mode === "quiz") {
      // Quiz mode: check if rulesLevel is in balanced zone (40-60)
      const isCorrect = rulesLevel >= 40 && rulesLevel <= 60;
      setQuizCorrect(isCorrect);
      setShowQuizResult(true);
      if (isCorrect && onDone) {
        onDone();
      }
    } else {
      // Toy mode: just trigger done
      if (onDone) onDone();
    }
  };

  useEffect(() => {
    // In toy mode, auto-complete when user finds balanced zone
    if (mode === "toy" && rulesLevel >= 40 && rulesLevel <= 60 && onDone) {
      const timer = setTimeout(() => {
        onDone();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [rulesLevel, mode, onDone]);

  const controlLabel =
    lang === "pl"
      ? "Poziom reguł i koordynacji"
      : lang === "de"
        ? "Regeln & Pflege-Stufe"
        : "Rules & Care Level";
  const noRulesLabel = lang === "pl" ? "Brak reguł" : lang === "de" ? "Keine Regeln" : "No Rules";
  const balancedLabel = lang === "pl" ? "Równowaga" : lang === "de" ? "Ausgewogen" : "Balanced";
  const overRegulatedLabel =
    lang === "pl" ? "Przeregulowanie" : lang === "de" ? "Überreguliert" : "Over-regulated";
  const levelText =
    lang === "pl"
      ? `Poziom: ${rulesLevel}`
      : lang === "de"
        ? `Stufe: ${rulesLevel}`
        : `Level: ${rulesLevel}`;

  const quizInstruction =
    lang === "pl"
      ? "Ustaw suwak reguł tak, aby wozy mogły płynnie dowozić żywność, a wspólna studnia pozostała czysta."
      : lang === "de"
        ? "Stelle den Dorfregler-Schieber so ein, dass Kutschen Lebensmittel reibungslos liefern können und der gemeinsame Wasserbrunnen sauber bleibt."
        : "Set the town rules slider so carts can deliver food smoothly and the shared water well stays clean.";

  const toyInstruction =
    lang === "pl"
      ? "Znajdź zieloną strefę równowagi, w której miasteczko działa harmonijnie!"
      : lang === "de"
        ? "Finde die ausgewogene Zone, in der das Dorf gut funktioniert!"
        : "Find the balanced zone where the town works well!";

  const quizSuccess =
    lang === "pl"
      ? "✓ Idealna równowaga!"
      : lang === "de"
        ? "✓ Perfekte Balance!"
        : "✓ Perfect balance!";
  const quizRetry =
    lang === "pl"
      ? "Spróbuj przesunąć suwak w stronę środkowej zielonej strefy"
      : lang === "de"
        ? "Versuche, den Schieber in die grüne Zone zu stellen"
        : "Try adjusting the slider to the green zone";

  return (
    <div className="whygovernment-toy">
      <div className="town-visualization">
        <div className={`well ${townState.wellState}`}>
          {townState.wellState === "dirty" ? "💧🟤" : "💧💙"}
        </div>
        <div className={`road ${townState.cartState}`}>
          {townState.checkpointCount > 0 &&
            Array(townState.checkpointCount)
              .fill(0)
              .map((_, i) => (
                <span key={i} className="checkpoint">
                  🚧
                </span>
              ))}
          <div className="cart">🛒</div>
          <div className="cart">🛒</div>
        </div>
        <div className="mason">{rulesLevel >= 40 && rulesLevel <= 60 ? "🧱🔨" : "🧱"}</div>
      </div>

      <div className="rules-control">
        <label>{controlLabel}</label>
        <input
          type="range"
          min="0"
          max="100"
          value={rulesLevel}
          onChange={(e) => setRulesLevel(parseInt(e.target.value))}
          className="rules-slider"
        />
        <div className="slider-labels">
          <span>{noRulesLabel}</span>
          <span className="balanced-zone">{balancedLabel}</span>
          <span>{overRegulatedLabel}</span>
        </div>
        <div className="rules-value">{levelText}</div>
      </div>

      <div className="town-status">
        <p>{townState.description}</p>
      </div>

      {mode === "quiz" && (
        <div className="quiz-instruction">
          <p>{quizInstruction}</p>
        </div>
      )}

      {mode === "toy" && onDone && (
        <div className="toy-completion">
          <p>{toyInstruction}</p>
        </div>
      )}

      {mode === "quiz" && (
        <div className="quiz-check">
          <CheckButton lang={lang} onClick={handleCheck} />
          {showQuizResult && (
            <div className={`quiz-feedback ${quizCorrect ? "correct" : "incorrect"}`}>
              {quizCorrect ? quizSuccess : quizRetry}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
