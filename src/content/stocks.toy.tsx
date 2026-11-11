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

  const harvestTitle =
    lang === "pl" ? "Zbiory jabłek" : lang === "de" ? "Apfelernte" : "Cider Harvest";
  const frostBtn =
    lang === "pl" ? "Mrozy (0 zysku)" : lang === "de" ? "Frost (0 Gewinn)" : "Frost (0 Profit)";
  const normalBtn =
    lang === "pl"
      ? "Zwykłe (20 zysku)"
      : lang === "de"
        ? "Normal (20 Gewinn)"
        : "Normal (20 Profit)";
  const bumperBtn =
    lang === "pl"
      ? "Urodzaj (50 zysku)"
      : lang === "de"
        ? "Rekord (50 Gewinn)"
        : "Bumper (50 Profit)";

  const millProfitLabel =
    lang === "pl" ? "Zysk tłoczni:" : lang === "de" ? "Mühlengewinn:" : "Mill Profit:";
  const coinsLabel = lang === "pl" ? "monet" : lang === "de" ? "Münzen" : "Coins";

  const dividendLabel = lang === "pl" ? "Dywidenda:" : lang === "de" ? "Dividende:" : "Dividend:";
  const coinsPerShare =
    lang === "pl" ? "monet/akcję" : lang === "de" ? "Münzen/Aktie" : "Coins/Share";

  const collectBtn =
    lang === "pl" ? "Odbierz dywidendę" : lang === "de" ? "Dividende abholen" : "Collect Dividend";

  const portfolioTitle =
    lang === "pl"
      ? "Twoje certyfikaty akcji"
      : lang === "de"
        ? "Deine Anteilssteine"
        : "Your Share Tiles";

  const sharesOwnedText =
    lang === "pl"
      ? `${sharesOwned} / 10 posiadanych akcji`
      : lang === "de"
        ? `${sharesOwned} / 10 Aktien im Besitz`
        : `${sharesOwned} / 10 Shares Owned`;

  const walletLabel = lang === "pl" ? "Portfel:" : lang === "de" ? "Geldbeutel:" : "Wallet:";

  const tradingTitle =
    lang === "pl" ? "Tablica giełdowa" : lang === "de" ? "Handelstafel" : "Trading Board";
  const buyerBidLabel =
    lang === "pl" ? "Oferta kupna:" : lang === "de" ? "Kaufangebot:" : "Buyer Bid:";

  const tradingDesc =
    lang === "pl"
      ? "Sprzedaj akcję, by zdobyć monety, lub trzymaj dla przyszłych dywidend."
      : lang === "de"
        ? "Verkaufe eine Aktie oder behalte sie für künftige Dividenden."
        : "Sell a share to cash out, or hold for future dividends.";

  const sellShareBtn =
    lang === "pl" ? "Sprzedaj 1 akcję" : lang === "de" ? "1 Aktie verkaufen" : "Sell 1 Share";

  const successMsg =
    lang === "pl"
      ? "Dywidendy odebrane! Zarabiasz bezpośrednio na zyskach firmy."
      : lang === "de"
        ? "Dividenden eingesammelt! Du verdienst direkt an den Unternehmensgewinnen."
        : "Dividends collected! You earn income directly from company profits.";

  const promptMsg =
    lang === "pl"
      ? "Naciśnij Odbierz dywidendę, aby otrzymać swoją wypłatę."
      : lang === "de"
        ? "Tippe auf Dividende abholen, um deine Auszahlung zu erhalten."
        : "Tap Collect Dividend to receive your payout.";

  return (
    <div className="stocks-wrap">
      <div className="stocks-grid">
        {/* Harvest Controller */}
        <div className="stocks-panel harvest-panel">
          <div className="panel-title">{harvestTitle}</div>
          {mode !== "quiz" && (
            <div className="harvest-buttons">
              <button
                type="button"
                className={`harvest-btn ${harvest === "frost" ? "active" : ""}`}
                onClick={() => setHarvest("frost")}
              >
                ❄️ {frostBtn}
              </button>
              <button
                type="button"
                className={`harvest-btn ${harvest === "normal" ? "active" : ""}`}
                onClick={() => setHarvest("normal")}
              >
                🍏 {normalBtn}
              </button>
              <button
                type="button"
                className={`harvest-btn ${harvest === "bumper" ? "active" : ""}`}
                onClick={() => setHarvest("bumper")}
              >
                🍎 {bumperBtn}
              </button>
            </div>
          )}
          <div className="profit-display">
            {millProfitLabel}{" "}
            <strong>
              {totalProfit} {coinsLabel}
            </strong>
          </div>
          <div className="dividend-tag">
            {dividendLabel}{" "}
            <strong>
              {dividendPerShare} {coinsPerShare}
            </strong>
          </div>
          <ToyButton onClick={handleCollectDividend}>{collectBtn}</ToyButton>
        </div>

        {/* Share Portfolio */}
        <div className="stocks-panel portfolio-panel">
          <div className="panel-title">{portfolioTitle}</div>
          <div className="tiles-holder">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={`share-tile ${i < sharesOwned ? "owned" : "other"}`}>
                {i < sharesOwned ? "📜" : "·"}
              </div>
            ))}
          </div>
          <div className="shares-count">{sharesOwnedText}</div>
          <div className="wallet-badge">
            🪙 {walletLabel}{" "}
            <strong>
              {walletCoins} {coinsLabel}
            </strong>
          </div>
        </div>

        {/* Town Trading Board */}
        <div className="stocks-panel trading-panel">
          <div className="panel-title">{tradingTitle}</div>
          <div className="board-price">
            {buyerBidLabel}{" "}
            <span className="price-num">
              {sharePrice} {coinsLabel}
            </span>
          </div>
          <div className="trading-desc">{tradingDesc}</div>
          <ToyButton onClick={handleSellShare} disabled={sharesOwned <= 0}>
            {sellShareBtn}
          </ToyButton>
        </div>
      </div>

      <div className="stocks-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div
            className={`feedback-msg ${walletCoins >= (mode === "quiz" ? 8 : 1) ? "success" : "warning"}`}
          >
            {walletCoins >= (mode === "quiz" ? 8 : 1) ? successMsg : promptMsg}
          </div>
        )}
      </div>
    </div>
  );
}
