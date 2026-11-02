import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton, ToyButton } from "../lesson/toolkit";
import "./bonds.css";

export function calcBondPrice(interestRate: number) {
  // Coupon is fixed at 5 coins on 100 par value.
  // When interest rate = 5%, price = 100.
  // As rate rises, price drops: price = Math.round(100 - (interestRate - 5) * 5)
  const price = Math.max(70, Math.min(130, Math.round(100 - (interestRate - 5) * 5)));
  return { price };
}

interface BondsToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function BondsToy({ lang, mode = "toy", onDone }: BondsToyProps) {
  const [bankRate, setBankRate] = useState(mode === "quiz" ? 4 : 5);
  const [couponsLeft, setCouponsLeft] = useState(3);
  const [collectedCoins, setCollectedCoins] = useState(0);
  const [hasTiltedSeesaw, setHasTiltedSeesaw] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const { price } = calcBondPrice(bankRate);

  useEffect(() => {
    if (mode === "toy") {
      if (bankRate !== 5) setHasTiltedSeesaw(true);
      if (couponsLeft < 3 && hasTiltedSeesaw && onDone) {
        onDone();
      }
    }
  }, [bankRate, couponsLeft, hasTiltedSeesaw, mode, onDone]);

  const handleTearCoupon = () => {
    if (couponsLeft > 0) {
      setCouponsLeft((prev) => prev - 1);
      setCollectedCoins((prev) => prev + 5);
    }
  };

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (bankRate >= 7 && price < 100 && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="bonds-wrap">
      <div className="bonds-grid">
        {/* Loan Scroll & Coupons */}
        <div className="bonds-panel scroll-panel">
          <div className="panel-title">{lang === "en" ? "Town Hall Bond Scroll" : "Rathaus-Anleihe"}</div>
          <div className="principal-badge">
            📜 {lang === "en" ? "Principal: 100 Coins" : "Nennwert: 100 Münzen"}
          </div>
          <div className="coupons-stack">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`coupon-ticket ${i < couponsLeft ? "active" : "torn"}`}
              >
                {i < couponsLeft
                  ? `🎟️ 5 ${lang === "en" ? "Coins" : "Münzen"}`
                  : `✓ ${lang === "en" ? "Collected" : "Eingelöst"}`}
              </div>
            ))}
          </div>
          <ToyButton onClick={handleTearCoupon} disabled={couponsLeft <= 0}>
            {lang === "en" ? "Tear Off Coupon (Harvest Day)" : "Kupon abreißen (Erntetag)"}
          </ToyButton>
          <div className="collected-badge">
            {lang === "en" ? "Total Interest:" : "Gesamtzinsen:"}{" "}
            <strong>{collectedCoins} {lang === "en" ? "Coins" : "Münzen"}</strong>
          </div>
        </div>

        {/* Die Zins-Wippe (The Interest Seesaw) */}
        <div className="bonds-panel seesaw-panel">
          <div className="panel-title">{lang === "en" ? "Die Zins-Wippe (Interest Seesaw)" : "Die Zins-Wippe"}</div>
          <div className="seesaw-graphic">
            <div
              className="seesaw-beam"
              style={{
                transform: `rotate(${(bankRate - 5) * 5}deg)`,
              }}
            >
              <div className="beam-left">
                <span className="beam-label">{lang === "en" ? "Bank Rate" : "Bankzins"}</span>
                <span className="beam-val">{bankRate}%</span>
              </div>
              <div className="beam-center">⚖️ 5c</div>
              <div className="beam-right">
                <span className="beam-label">{lang === "en" ? "Bond Price" : "Anleihepreis"}</span>
                <span className="beam-val">{price}c</span>
              </div>
            </div>
            <div className="seesaw-fulcrum" />
          </div>

          <div className="seesaw-slider-wrap">
            <label className="slider-label">
              {lang === "en" ? "Town Bank Interest Rate:" : "Bankzinssatz im Dorf:"}
            </label>
            <input
              type="range"
              min="1"
              max="8"
              value={bankRate}
              onChange={(e) => {
                setBankRate(Number(e.target.value));
                setShowFeedback(false);
              }}
              className="rate-slider"
            />
          </div>
        </div>
      </div>

      <div className="bonds-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${bankRate >= 7 ? "success" : "warning"}`}>
            {bankRate >= 7
              ? lang === "en"
                ? "Correct! When new bank rates rise to 7%, older 5% bonds discount down to 90 coins."
                : "Richtig! Steigen die Bankzinsen auf 7%, sinkt der Preis älterer 5%-Anleihen auf 90 Münzen."
              : lang === "en"
              ? "Set the Town Bank rate to 7% or higher to show the price discount."
              : "Stelle den Bankzins auf 7% oder höher, um den Kursabschlag zu sehen."}
          </div>
        )}
      </div>
    </div>
  );
}
