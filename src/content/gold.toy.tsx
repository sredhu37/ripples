import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton, ToyButton } from "../lesson/toolkit";
import "./gold.css";

export type ClimateMode = "calm" | "storm";

export function calcGoldPrice(climate: ClimateMode, vaultedCoins: number) {
  const basePrice = climate === "calm" ? 10 : 14;
  const price = basePrice + vaultedCoins;
  const businessProfit = climate === "calm" ? 4 : -2;
  return { price, businessProfit };
}

interface GoldToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function GoldToy({ lang, mode = "toy", onDone }: GoldToyProps) {
  const [climate, setClimate] = useState<ClimateMode>(mode === "quiz" ? "storm" : "calm");
  const [vaultedCoins, setVaultedCoins] = useState(0);
  const [hasExperiencedStorm, setHasExperiencedStorm] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const { price, businessProfit } = calcGoldPrice(climate, vaultedCoins);

  useEffect(() => {
    if (mode === "toy") {
      if (climate === "storm") setHasExperiencedStorm(true);
      if (hasExperiencedStorm && vaultedCoins >= 3 && onDone) {
        onDone();
      }
    }
  }, [climate, vaultedCoins, hasExperiencedStorm, mode, onDone]);

  const handleDeposit = () => {
    if (vaultedCoins < 5) {
      setVaultedCoins((prev) => prev + 1);
    }
  };

  const handleWithdraw = () => {
    if (vaultedCoins > 0) {
      setVaultedCoins((prev) => prev - 1);
    }
  };

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (climate === "storm" && vaultedCoins >= 3 && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  const climateTitle =
    lang === "pl" ? "Klimat gospodarczy" : lang === "de" ? "Wirtschaftsklima" : "Economic Climate";

  const calmBtn =
    lang === "pl" ? "Słoneczny spokój" : lang === "de" ? "Sonnige Ruhe" : "Sunny Calm";
  const stormBtn =
    lang === "pl" ? "Burzliwy kryzys" : lang === "de" ? "Stürmische Krise" : "Stormy Crisis";

  const calmStatus =
    lang === "pl"
      ? "Spokojna gospodarka: firmy przynoszą stałe zyski"
      : lang === "de"
      ? "Ruhige Wirtschaft: Betriebe machen stetige Gewinne"
      : "Calm economy: businesses earn steady profits";

  const stormStatus =
    lang === "pl"
      ? "Duża niepewność: firmy ponoszą straty przez wahania rynkowe"
      : lang === "de"
      ? "Hohe Unsicherheit: Betriebe drohen Verluste"
      : "High uncertainty: businesses face volatile losses";

  const bakeryTitle =
    lang === "pl" ? "Działająca piekarnia" : lang === "de" ? "Produktive Bäckerei" : "Productive Bakery";

  const coinsPerYear =
    lang === "pl" ? "monet/rok" : lang === "de" ? "Münzen/Jahr" : "Coins/Year";

  const businessDesc =
    lang === "pl"
      ? "Zarabia w dobrych czasach, ale jest narażona na kryzysy."
      : lang === "de"
      ? "Verdient gut in guten Zeiten, ist aber anfällig für Stürme."
      : "Earns coins when times are good, but vulnerable to storms.";

  const vaultTitle =
    lang === "pl" ? "Skarbiec ze złotem w porcie" : lang === "de" ? "Hafen-Goldtresor" : "Harbor Gold Vault";

  const vaultedCoinsText =
    lang === "pl"
      ? `${vaultedCoins} monet w skarbcu`
      : lang === "de"
      ? `${vaultedCoins} Münzen im Tresor`
      : `${vaultedCoins} Coins Vaulted`;

  const goldPriceLabel =
    lang === "pl" ? "Cena złota:" : lang === "de" ? "Goldpreis:" : "Gold Price:";

  const priceUnit =
    lang === "pl" ? `${price} monet/uncję` : lang === "de" ? `${price} Münzen/oz` : `${price} Coins/oz`;

  const depositBtn =
    lang === "pl" ? "+ Schowaj 1 monetę" : lang === "de" ? "+ 1 Münze sichern" : "+ Store 1 Coin";

  const withdrawBtn =
    lang === "pl" ? "Wypłać" : lang === "de" ? "Entnehmen" : "Take Out";

  const successMsg =
    lang === "pl"
      ? "Świetnie! Twoje oszczędności są bezpieczne w skarbcu przystani."
      : lang === "de"
      ? "Super! Deine Ersparnisse sind im sicheren Hafen geschützt."
      : "Great! Your savings are protected in the safe harbor vault.";

  const warningMsg =
    lang === "pl"
      ? "Zabezpiecz co najmniej 3 monety w skarbcu złota podczas burzy."
      : lang === "de"
      ? "Sichere mindestens 3 Münzen im Goldtresor während eines Sturms."
      : "Store at least 3 coins in the Gold Vault during a storm.";

  return (
    <div className="gold-wrap">
      <div className="gold-grid">
        {/* Economic Climate */}
        <div className="gold-panel climate-panel">
          <div className="gold-panel-title">{climateTitle}</div>
          <div className="gold-climate-buttons">
            <button
              type="button"
              className={`gold-climate-btn ${climate === "calm" ? "active" : ""}`}
              onClick={() => {
                setClimate("calm");
                setShowFeedback(false);
              }}
            >
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" className="climate-icon">
                <circle cx="10" cy="10" r="5" fill="#f59e0b" />
                <path d="M10 2 V4 M10 16 V18 M2 10 H4 M16 10 H18" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>{calmBtn}</span>
            </button>
            <button
              type="button"
              className={`gold-climate-btn ${climate === "storm" ? "active" : ""}`}
              onClick={() => {
                setClimate("storm");
                setShowFeedback(false);
              }}
            >
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" className="climate-icon">
                <path d="M5 9 A4 4 0 0 1 13 8 A3 3 0 0 1 17 12 H4 A3 3 0 0 1 5 9 Z" fill="#64748b" />
                <polygon points="10,13 8,16 11,16 9,19 13,15 10,15" fill="#facc15" />
              </svg>
              <span>{stormBtn}</span>
            </button>
          </div>
          <div className={`gold-climate-status ${climate}`}>
            {climate === "calm" ? calmStatus : stormStatus}
          </div>
        </div>

        {/* Business Stall */}
        <div className="gold-panel business-panel">
          <div className="gold-panel-title">{bakeryTitle}</div>
          <div className={`gold-profit-badge ${businessProfit >= 0 ? "profit" : "loss"}`}>
            {businessProfit >= 0 ? `+${businessProfit}` : businessProfit} {coinsPerYear}
          </div>
          <div className="gold-business-desc">
            {businessDesc}
          </div>
        </div>

        {/* Stone Gold Vault */}
        <div className="gold-panel vault-panel">
          <div className="gold-panel-title">{vaultTitle}</div>
          <div className="gold-vault-bar-icon">
            <svg viewBox="0 0 40 24" width="40" height="24" aria-hidden="true">
              <polygon points="6,4 34,4 38,16 2,16" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
              <polygon points="2,16 38,16 34,22 6,22" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="gold-vault-balance">
            {vaultedCoinsText}
          </div>
          <div className="gold-price-badge">
            {goldPriceLabel}{" "}
            <strong>{priceUnit}</strong>
          </div>
          <div className="gold-vault-actions">
            <ToyButton onClick={handleDeposit} disabled={vaultedCoins >= 5}>
              {depositBtn}
            </ToyButton>
            <ToyButton onClick={handleWithdraw} disabled={vaultedCoins <= 0}>
              {withdrawBtn}
            </ToyButton>
          </div>
        </div>
      </div>

      <div className="gold-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`gold-feedback-msg ${climate === "storm" && vaultedCoins >= 3 ? "success" : "warning"}`}>
            {climate === "storm" && vaultedCoins >= 3 ? successMsg : warningMsg}
          </div>
        )}
      </div>
    </div>
  );
}
