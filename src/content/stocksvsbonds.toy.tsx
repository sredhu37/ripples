import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./stocksvsbonds.css";

export type VoyageOutcome = "treasure" | "modest" | "shipwreck";

export function calcVoyagePayouts(outcome: VoyageOutcome) {
  switch (outcome) {
    case "treasure":
      return { totalRevenue: 100, bondPayout: 5, stockPayout: 95 };
    case "shipwreck":
      return { totalRevenue: 4, bondPayout: 4, stockPayout: 0 };
    case "modest":
    default:
      return { totalRevenue: 15, bondPayout: 5, stockPayout: 10 };
  }
}

interface StocksVsBondsToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function StocksVsBondsToy({ lang, mode = "toy", onDone }: StocksVsBondsToyProps) {
  const [outcome, setOutcome] = useState<VoyageOutcome>("modest");
  const [hasSeenTreasure, setHasSeenTreasure] = useState(false);
  const [hasSeenShipwreck, setHasSeenShipwreck] = useState(false);
  const [allocatedToBond, setAllocatedToBond] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const { totalRevenue, bondPayout, stockPayout } = calcVoyagePayouts(outcome);

  useEffect(() => {
    if (mode === "toy") {
      if (outcome === "treasure") setHasSeenTreasure(true);
      if (outcome === "shipwreck") setHasSeenShipwreck(true);
      if (hasSeenTreasure && hasSeenShipwreck && onDone) {
        onDone();
      }
    }
  }, [outcome, hasSeenTreasure, hasSeenShipwreck, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (allocatedToBond === 5 && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="stocksvsbonds-wrap">
      {mode === "toy" ? (
        <div className="stocksvsbonds-grid">
          {/* Outcome Selector */}
          <div className="svb-panel selector-panel">
            <div className="panel-title">{lang === "en" ? "Expedition Result" : "Expeditionsergebnis"}</div>
            <div className="outcome-buttons">
              <button
                type="button"
                className={`outcome-btn ${outcome === "treasure" ? "active" : ""}`}
                onClick={() => setOutcome("treasure")}
              >
                💎 {lang === "en" ? "Grand Treasure (100c)" : "Großer Schatz (100c)"}
              </button>
              <button
                type="button"
                className={`outcome-btn ${outcome === "modest" ? "active" : ""}`}
                onClick={() => setOutcome("modest")}
              >
                ⛵ {lang === "en" ? "Modest Voyage (15c)" : "Mäßige Fahrt (15c)"}
              </button>
              <button
                type="button"
                className={`outcome-btn ${outcome === "shipwreck" ? "active" : ""}`}
                onClick={() => setOutcome("shipwreck")}
              >
                🌊 {lang === "en" ? "Shipwreck (4c Salvaged)" : "Schiffbruch (4c gerettet)"}
              </button>
            </div>
            <div className="revenue-badge">
              {lang === "en" ? "Voyage Earnings:" : "Fahrterlös:"} <strong>{totalRevenue}c</strong>
            </div>
          </div>

          {/* Stockholder Finn */}
          <div className="svb-panel stock-panel">
            <div className="panel-title">{lang === "en" ? "Finn (Stockholder)" : "Finn (Aktionär)"}</div>
            <div className="role-tag equity">{lang === "en" ? "Co-Owner (Equity)" : "Miteigentümer"}</div>
            <div className="payout-num stock">{stockPayout}c</div>
            <div className="payout-desc">
              {outcome === "treasure"
                ? lang === "en" ? "Huge profit windfall!" : "Riesiger Gewinn!"
                : outcome === "shipwreck"
                ? lang === "en" ? "No coins left for owners" : "Nichts übrig für Eigentümer"
                : lang === "en" ? "Earns leftover profit" : "Erhält den Restgewinn"}
            </div>
          </div>

          {/* Bondholder Bea */}
          <div className="svb-panel bond-panel">
            <div className="panel-title">{lang === "en" ? "Bea (Bondholder)" : "Bea (Anleihehalterin)"}</div>
            <div className="role-tag debt">{lang === "en" ? "Lender (Debt)" : "Geldgeberin"}</div>
            <div className="payout-num bond">{bondPayout}c</div>
            <div className="payout-desc">
              {outcome === "shipwreck"
                ? lang === "en" ? "Legal priority: paid first!" : "Vorrang: Zuerst bedient!"
                : lang === "en" ? "Steady 5-coin coupon" : "Fester 5-Münzen-Kupon"}
            </div>
          </div>
        </div>
      ) : (
        /* Quiz Mode */
        <div className="quiz-priority-box">
          <div className="quiz-title">
            {lang === "en"
              ? "The ship brought back only 6 coins. Allocate 5 coins to Bea first (Creditor Priority)!"
              : "Das Schiff brachte nur 6 Münzen. Gib Bea zuerst 5 Münzen (Gläubiger-Vorrang)!"}
          </div>
          <div className="quiz-allocator">
            <button
              type="button"
              className="alloc-btn"
              onClick={() => setAllocatedToBond((prev) => Math.min(5, prev + 1))}
            >
              + {lang === "en" ? "Pay 1 Coin to Bea" : "1 Münze an Bea zahlen"}
            </button>
            <div className="alloc-count">
              {lang === "en" ? "Paid to Bea:" : "An Bea gezahlt:"} <strong>{allocatedToBond} / 5 Coins</strong>
            </div>
          </div>
        </div>
      )}

      <div className="stocksvsbonds-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${mode === "quiz" ? (allocatedToBond === 5 ? "success" : "warning") : "success"}`}>
            {mode === "quiz"
              ? allocatedToBond === 5
                ? lang === "en"
                  ? "Correct! Under insolvency law, bondholders must be paid before stockholders receive anything."
                  : "Richtig! Gläubiger werden immer vor den Miteigentümern bedient."
                : lang === "en"
                ? "Allocate the full 5-coin coupon to Bea first."
                : "Zahle den vollen 5-Münzen-Kupon zuerst an Bea."
              : lang === "en"
              ? "Great exploration! You understand stocks vs bonds."
              : "Toll erkundet! Du verstehst Aktien und Anleihen."}
          </div>
        )}
      </div>
    </div>
  );
}
