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

  const outcomeTitle =
    lang === "pl"
      ? "Wynik ekspedycji"
      : lang === "de"
        ? "Expeditionsergebnis"
        : "Expedition Result";
  const treasureBtn =
    lang === "pl"
      ? "Wielki skarb (100 monet)"
      : lang === "de"
        ? "Großer Schatz (100c)"
        : "Grand Treasure (100c)";
  const modestBtn =
    lang === "pl"
      ? "Zwykły rejs (15 monet)"
      : lang === "de"
        ? "Mäßige Fahrt (15c)"
        : "Modest Voyage (15c)";
  const shipwreckBtn =
    lang === "pl"
      ? "Katastrofa (4 monety uratowane)"
      : lang === "de"
        ? "Schiffbruch (4c gerettet)"
        : "Shipwreck (4c Salvaged)";

  const earningsLabel =
    lang === "pl" ? "Przychód z wyprawy:" : lang === "de" ? "Fahrterlös:" : "Voyage Earnings:";

  const finnTitle =
    lang === "pl"
      ? "Finn (Akcjonariusz)"
      : lang === "de"
        ? "Finn (Aktionär)"
        : "Finn (Stockholder)";
  const finnRole =
    lang === "pl"
      ? "Współwłaściciel (Kapitał własny)"
      : lang === "de"
        ? "Miteigentümer (Eigenkapital)"
        : "Co-Owner (Equity)";

  const finnDesc =
    outcome === "treasure"
      ? lang === "pl"
        ? "Olbrzymi zysk!"
        : lang === "de"
          ? "Riesiger Gewinn!"
          : "Huge profit windfall!"
      : outcome === "shipwreck"
        ? lang === "pl"
          ? "Brak monet dla właściciela"
          : lang === "de"
            ? "Nichts übrig für Eigentümer"
            : "No coins left for owners"
        : lang === "pl"
          ? "Otrzymuje resztę zysku"
          : lang === "de"
            ? "Erhält den Restgewinn"
            : "Earns leftover profit";

  const beaTitle =
    lang === "pl"
      ? "Bea (Obligatariuszka)"
      : lang === "de"
        ? "Bea (Anleihehalterin)"
        : "Bea (Bondholder)";
  const beaRole =
    lang === "pl"
      ? "Pożyczkodawczyni (Dług)"
      : lang === "de"
        ? "Geldgeberin (Fremdkapital)"
        : "Lender (Debt)";

  const beaDesc =
    outcome === "shipwreck"
      ? lang === "pl"
        ? "Pierwszeństwo spłaty: dostaje wszystko!"
        : lang === "de"
          ? "Vorrang: Zuerst bedient!"
          : "Legal priority: paid first!"
      : lang === "pl"
        ? "Stały kupon: 5 monet"
        : lang === "de"
          ? "Fester 5-Münzen-Kupon"
          : "Steady 5-coin coupon";

  const quizTitle =
    lang === "pl"
      ? "Statek przywiózł tylko 6 monet. Przydziel najpierw 5 monet Bei (Pierwszeństwo wierzyciela)!"
      : lang === "de"
        ? "Das Schiff brachte nur 6 Münzen. Gib Bea zuerst 5 Münzen (Gläubiger-Vorrang)!"
        : "The ship brought back only 6 coins. Allocate 5 coins to Bea first (Creditor Priority)!";

  const payBeaBtn =
    lang === "pl"
      ? "Wypłać 1 monetę Bei"
      : lang === "de"
        ? "1 Münze an Bea zahlen"
        : "Pay 1 Coin to Bea";

  const paidToBeaLabel =
    lang === "pl" ? "Wypłacono Bei:" : lang === "de" ? "An Bea gezahlt:" : "Paid to Bea:";
  const coinsUnit = lang === "pl" ? "monet" : lang === "de" ? "Münzen" : "Coins";

  const quizSuccess =
    lang === "pl"
      ? "Prawidłowo! W prawie upadłościowym posiadacze obligacji muszą zostać spłaceni, zanim akcjonariusze otrzymają choć grosz."
      : lang === "de"
        ? "Richtig! Gläubiger werden immer vor den Miteigentümern bedient."
        : "Correct! Under insolvency law, bondholders must be paid before stockholders receive anything.";

  const quizWarning =
    lang === "pl"
      ? "Przydziel najpierw pełen 5-monetowy kupon Bei."
      : lang === "de"
        ? "Zahle den vollen 5-Münzen-Kupon zuerst an Bea."
        : "Allocate the full 5-coin coupon to Bea first.";

  const toySuccess =
    lang === "pl"
      ? "Świetnie! Rozumiesz już różnicę między akcjami a obligacjami."
      : lang === "de"
        ? "Toll erkundet! Du verstehst Aktien und Anleihen."
        : "Great exploration! You understand stocks vs bonds.";

  return (
    <div className="stocksvsbonds-wrap">
      {mode === "toy" ? (
        <div className="stocksvsbonds-grid">
          {/* Outcome Selector */}
          <div className="svb-panel selector-panel">
            <div className="panel-title">{outcomeTitle}</div>
            <div className="outcome-buttons">
              <button
                type="button"
                className={`outcome-btn ${outcome === "treasure" ? "active" : ""}`}
                onClick={() => setOutcome("treasure")}
              >
                💎 {treasureBtn}
              </button>
              <button
                type="button"
                className={`outcome-btn ${outcome === "modest" ? "active" : ""}`}
                onClick={() => setOutcome("modest")}
              >
                ⛵ {modestBtn}
              </button>
              <button
                type="button"
                className={`outcome-btn ${outcome === "shipwreck" ? "active" : ""}`}
                onClick={() => setOutcome("shipwreck")}
              >
                🌊 {shipwreckBtn}
              </button>
            </div>
            <div className="revenue-badge">
              {earningsLabel} <strong>{totalRevenue}c</strong>
            </div>
          </div>

          {/* Stockholder Finn */}
          <div className="svb-panel stock-panel">
            <div className="panel-title">{finnTitle}</div>
            <div className="role-tag equity">{finnRole}</div>
            <div className="payout-num stock">{stockPayout}c</div>
            <div className="payout-desc">{finnDesc}</div>
          </div>

          {/* Bondholder Bea */}
          <div className="svb-panel bond-panel">
            <div className="panel-title">{beaTitle}</div>
            <div className="role-tag debt">{beaRole}</div>
            <div className="payout-num bond">{bondPayout}c</div>
            <div className="payout-desc">{beaDesc}</div>
          </div>
        </div>
      ) : (
        /* Quiz Mode */
        <div className="quiz-priority-box">
          <div className="quiz-title">{quizTitle}</div>
          <div className="quiz-allocator">
            <button
              type="button"
              className="alloc-btn"
              onClick={() => setAllocatedToBond((prev) => Math.min(5, prev + 1))}
            >
              + {payBeaBtn}
            </button>
            <div className="alloc-count">
              {paidToBeaLabel}{" "}
              <strong>
                {allocatedToBond} / 5 {coinsUnit}
              </strong>
            </div>
          </div>
        </div>
      )}

      <div className="stocksvsbonds-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div
            className={`feedback-msg ${mode === "quiz" ? (allocatedToBond === 5 ? "success" : "warning") : "success"}`}
          >
            {mode === "quiz" ? (allocatedToBond === 5 ? quizSuccess : quizWarning) : toySuccess}
          </div>
        )}
      </div>
    </div>
  );
}
