import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import "./supplydemand.css";

interface SupplyDemandToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function calcSupplyDemand(price: number, supplyCount = 6) {
  // Demand decreases as price increases
  // At price 1: 15 buyers, price 4: 6 buyers, price 8: 1 buyer
  const demandCount = Math.max(1, Math.round(18 - 3 * price));
  const status =
    demandCount > supplyCount
      ? "shortage"
      : demandCount < supplyCount
      ? "surplus"
      : "equilibrium";
  return { demandCount, supplyCount, status };
}

export function SupplyDemandToy({ lang, mode = "toy", onDone }: SupplyDemandToyProps) {
  const [price, setPrice] = useState(mode === "quiz" ? 1 : 2);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hasExploredShortage, setHasExploredShortage] = useState(false);
  const [hasExploredSurplus, setHasExploredSurplus] = useState(false);

  const targetSupply = mode === "quiz" ? 4 : 6;
  // In quiz mode: demand = 10 - 2 * price. At price 3, demand = 4 = supply!
  const demandCount =
    mode === "quiz"
      ? Math.max(1, Math.round(10 - 2 * price))
      : Math.max(1, Math.round(18 - 3 * price));

  const status =
    demandCount > targetSupply
      ? "shortage"
      : demandCount < targetSupply
      ? "surplus"
      : "equilibrium";

  useEffect(() => {
    if (mode === "toy") {
      if (status === "shortage") setHasExploredShortage(true);
      if (status === "surplus") setHasExploredSurplus(true);
      if (status === "equilibrium" && hasExploredShortage && hasExploredSurplus && onDone) {
        onDone();
      }
    }
  }, [price, status, hasExploredShortage, hasExploredSurplus, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (price === 3 && onDone) {
        onDone();
      }
    } else {
      if (status === "equilibrium" && onDone) {
        onDone();
      }
    }
  };

  return (
    <div className="supplydemand-wrap">
      <div className="supplydemand-market">
        <div className="supplydemand-box supply-box">
          <div className="supplydemand-box-title">{lang === "en" ? "Harbor Catch (Supply)" : "Fang am Hafen (Angebot)"}</div>
          <div className="supplydemand-count-badge">{targetSupply} {lang === "en" ? "Fish" : "Fische"}</div>
          <div className="supplydemand-fish-icons">
            {Array.from({ length: targetSupply }).map((_, i) => (
              <span key={i} className="supplydemand-token" title={lang === "en" ? "Fish" : "Fisch"}>
                <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                  <path d="M2 10 C5 5 14 5 17 8 L19 6 V14 L17 12 C14 15 5 15 2 10 Z" fill="#0284c7" />
                </svg>
              </span>
            ))}
          </div>
        </div>

        <div className="supplydemand-scale">
          <div className="supplydemand-scale-title">{lang === "en" ? "Market Price" : "Marktpreis"}</div>
          <div className="supplydemand-price-tag">{price} {lang === "en" ? "Coins" : "Münzen"}</div>
          <input
            type="range"
            min="1"
            max="8"
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
              setShowFeedback(false);
            }}
            className="supplydemand-price-slider"
          />
          <div className="supplydemand-status-label">
            {status === "shortage" && (
              <span className="supplydemand-status-badge shortage">
                {lang === "en" ? "Shortage! Not enough fish" : "Mangel! Nicht genug Fisch"}
              </span>
            )}
            {status === "surplus" && (
              <span className="supplydemand-status-badge surplus">
                {lang === "en" ? "Surplus! Fish unsold" : "Überschuss! Fisch bleibt liegen"}
              </span>
            )}
            {status === "equilibrium" && (
              <span className="supplydemand-status-badge balanced">
                {lang === "en" ? "Equilibrium! Perfect balance" : "Gleichgewicht! Perfekte Balance"}
              </span>
            )}
          </div>
        </div>

        <div className="supplydemand-box demand-box">
          <div className="supplydemand-box-title">{lang === "en" ? "Hungry Buyers (Demand)" : "Hungrige Käufer (Nachfrage)"}</div>
          <div className="supplydemand-count-badge">{demandCount} {lang === "en" ? "Buyers" : "Käufer"}</div>
          <div className="supplydemand-buyer-icons">
            {Array.from({ length: Math.min(demandCount, 12) }).map((_, i) => (
              <span key={i} className="supplydemand-token" title={lang === "en" ? "Buyer" : "Käufer"}>
                <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                  <circle cx="10" cy="6" r="4" fill="#f59e0b" />
                  <path d="M4 18 C4 14 7 12 10 12 C13 12 16 14 16 18 Z" fill="#3b82f6" />
                </svg>
              </span>
            ))}
            {demandCount > 12 && <span className="supplydemand-buyer-more">+{demandCount - 12}</span>}
          </div>
        </div>
      </div>

      <div className="supplydemand-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`supplydemand-feedback-msg ${status === "equilibrium" ? "success" : "warning"}`}>
            {status === "equilibrium"
              ? lang === "en"
                ? "Every fish is sold at a fair price! Market is cleared."
                : "Jeder Fisch wird zu einem fairen Preis verkauft! Der Markt ist geräumt."
              : lang === "en"
              ? "The market is not balanced yet. Adjust the price slider."
              : "Der Markt ist noch nicht im Gleichgewicht. Passe den Schieberegler an."}
          </div>
        )}
      </div>
    </div>
  );
}
