import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton, ToyButton } from "../lesson/toolkit";
import "./stocks.css";

export type HarvestYield = "frost" | "normal" | "bumper";

export function calcStockDividends(harvest: HarvestYield) {
  switch (harvest) {
    case "frost":
      return { totalProfit: 0, dividendPerShare: 0, sharePrice: 6 };
    case "bumper":
      return { totalProfit: 50, dividendPerShare: 5, sharePrice: 16 };
    case "normal":
    default:
      return { totalProfit: 20, dividendPerShare: 2, sharePrice: 10 };
  }
}

interface StocksToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function StocksToy({ lang, mode = "toy", onDone }: StocksToyProps) {
  const [harvest, setHarvest] = useState<HarvestYield>(mode === "quiz" ? "normal" : "normal");
  const [sharesOwned, setSharesOwned] = useState(2);
  const [walletCoins, setWalletCoins] = useState(0);
  const [harvestCount, setHarvestCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const { totalProfit, dividendPerShare, sharePrice } =
    mode === "quiz"
      ? { totalProfit: 40, dividendPerShare: 4, sharePrice: 14 }
      : calcStockDividends(harvest);

  useEffect(() => {
    if (mode === "toy" && harvestCount >= 2 && onDone) {
      onDone();
    }
  }, [harvestCount, mode, onDone]);

  const handleCollectDividend = () => {
    const payout = sharesOwned * dividendPerShare;
    setWalletCoins((prev) => prev + payout);
    setHarvestCount((prev) => prev + 1);
  };

  const handleSellShare = () => {
    if (sharesOwned > 0) {
      setSharesOwned((prev) => prev - 1);
      setWalletCoins((prev) => prev + sharePrice);
    }
  };

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (walletCoins >= 8 && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="stocks-wrap">
      <div className="stocks-grid">
        {/* Harvest Controller */}
        <div className="stocks-panel harvest-panel">
          <div className="panel-title">{lang === "en" ? "Cider Harvest" : "Apfelernte"}</div>
          {mode !== "quiz" && (
            <div className="harvest-buttons">
              <button
                type="button"
                className={`harvest-btn ${harvest === "frost" ? "active" : ""}`}
                onClick={() => setHarvest("frost")}
              >
                ❄️ {lang === "en" ? "Frost (0 Profit)" : "Frost (0 Gewinn)"}
              </button>
              <button
                type="button"
                className={`harvest-btn ${harvest === "normal" ? "active" : ""}`}
                onClick={() => setHarvest("normal")}
              >
                🍏 {lang === "en" ? "Normal (20 Profit)" : "Normal (20 Gewinn)"}
              </button>
              <button
                type="button"
                className={`harvest-btn ${harvest === "bumper" ? "active" : ""}`}
                onClick={() => setHarvest("bumper")}
              >
                🍎 {lang === "en" ? "Bumper (50 Profit)" : "Rekord (50 Gewinn)"}
              </button>
            </div>
          )}
          <div className="profit-display">
            {lang === "en" ? "Mill Profit:" : "Mühlengewinn:"} <strong>{totalProfit} {lang === "en" ? "Coins" : "Münzen"}</strong>
          </div>
          <div className="dividend-tag">
            {lang === "en" ? "Dividend:" : "Dividende:"} <strong>{dividendPerShare} {lang === "en" ? "Coins/Share" : "Münzen/Aktie"}</strong>
          </div>
          <ToyButton onClick={handleCollectDividend}>
            {lang === "en" ? "Collect Dividend" : "Dividende abholen"}
          </ToyButton>
        </div>

        {/* Share Portfolio */}
        <div className="stocks-panel portfolio-panel">
          <div className="panel-title">{lang === "en" ? "Your Share Tiles" : "Deine Anteilssteine"}</div>
          <div className="tiles-holder">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`share-tile ${i < sharesOwned ? "owned" : "other"}`}
              >
                {i < sharesOwned ? "📜" : "·"}
              </div>
            ))}
          </div>
          <div className="shares-count">
            {sharesOwned} / 10 {lang === "en" ? "Shares Owned" : "Aktien im Besitz"}
          </div>
          <div className="wallet-badge">
            🪙 {lang === "en" ? "Wallet:" : "Geldbeutel:"} <strong>{walletCoins} {lang === "en" ? "Coins" : "Münzen"}</strong>
          </div>
        </div>

        {/* Town Trading Board */}
        <div className="stocks-panel trading-panel">
          <div className="panel-title">{lang === "en" ? "Trading Board" : "Handelstafel"}</div>
          <div className="board-price">
            {lang === "en" ? "Buyer Bid:" : "Kaufangebot:"}
            <span className="price-num">{sharePrice} {lang === "en" ? "Coins" : "Münzen"}</span>
          </div>
          <div className="trading-desc">
            {lang === "en"
              ? "Sell a share to cash out, or hold for future dividends."
              : "Verkaufe eine Aktie oder behalte sie für künftige Dividenden."}
          </div>
          <ToyButton onClick={handleSellShare} disabled={sharesOwned <= 0}>
            {lang === "en" ? "Sell 1 Share" : "1 Aktie verkaufen"}
          </ToyButton>
        </div>
      </div>

      <div className="stocks-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${walletCoins >= (mode === "quiz" ? 8 : 1) ? "success" : "warning"}`}>
            {walletCoins >= (mode === "quiz" ? 8 : 1)
              ? lang === "en"
                ? "Dividends collected! You earn income directly from company profits."
                : "Dividenden eingesammelt! Du verdienst direkt an den Unternehmensgewinnen."
              : lang === "en"
              ? "Tap Collect Dividend to receive your payout."
              : "Tippe auf Dividende abholen, um deine Auszahlung zu erhalten."}
          </div>
        )}
      </div>
    </div>
  );
}
