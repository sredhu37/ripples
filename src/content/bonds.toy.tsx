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

  const scrollTitle =
    lang === "pl" ? "Obligacja ratusza" : lang === "de" ? "Rathaus-Anleihe" : "Town Hall Bond Scroll";
  const principalBadge =
    lang === "pl"
      ? "Wartość nominalna: 100 monet"
      : lang === "de"
      ? "Nennwert: 100 Münzen"
      : "Principal: 100 Coins";

  const couponActive =
    lang === "pl" ? "monet" : lang === "de" ? "Münzen" : "Coins";
  const couponTorn =
    lang === "pl" ? "Odebrany" : lang === "de" ? "Eingelöst" : "Collected";

  const tearBtn =
    lang === "pl"
      ? "Oderwij kupon (Święto Plonów)"
      : lang === "de"
      ? "Kupon abreißen (Erntetag)"
      : "Tear Off Coupon (Harvest Day)";

  const interestLabel =
    lang === "pl" ? "Łączne odsetki:" : lang === "de" ? "Gesamtzinsen:" : "Total Interest:";

  const seesawTitle =
    lang === "pl"
      ? "Huśtawka cenowa obligacji (Zins-Wippe)"
      : lang === "de"
      ? "Die Zins-Wippe (Interest Seesaw)"
      : "Die Zins-Wippe (Interest Seesaw)";

  const beamRateLabel =
    lang === "pl" ? "Stopa bankowa" : lang === "de" ? "Bankzins" : "Bank Rate";
  const beamPriceLabel =
    lang === "pl" ? "Cena obligacji" : lang === "de" ? "Anleihepreis" : "Bond Price";

  const sliderLabel =
    lang === "pl"
      ? "Stopa procentowa w Banku Miejskim:"
      : lang === "de"
      ? "Bankzinssatz im Dorf:"
      : "Town Bank Interest Rate:";

  const successMsg =
    lang === "pl"
      ? "Prawidłowo! Gdy nowe stopy rosną do 7%, starsze obligacje 5% tanieją do 90 monet."
      : lang === "de"
      ? "Richtig! Steigen die Bankzinsen auf 7%, sinkt der Preis älterer 5%-Anleihen auf 90 Münzen."
      : "Correct! When new bank rates rise to 7%, older 5% bonds discount down to 90 coins.";

  const promptMsg =
    lang === "pl"
      ? "Ustaw stopę w Banku Miejskim na 7% lub wyższą, aby zobaczyć spadek ceny obligacji."
      : lang === "de"
      ? "Stelle den Bankzins auf 7% oder höher, um den Kursabschlag zu sehen."
      : "Set the Town Bank rate to 7% or higher to show the price discount.";

  return (
    <div className="bonds-wrap">
      <div className="bonds-grid">
        {/* Loan Scroll & Coupons */}
        <div className="bonds-panel scroll-panel">
          <div className="panel-title">{scrollTitle}</div>
          <div className="principal-badge">
            📜 {principalBadge}
          </div>
          <div className="coupons-stack">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`coupon-ticket ${i < couponsLeft ? "active" : "torn"}`}
              >
                {i < couponsLeft
                  ? `🎟️ 5 ${couponActive}`
                  : `✓ ${couponTorn}`}
              </div>
            ))}
          </div>
          <ToyButton onClick={handleTearCoupon} disabled={couponsLeft <= 0}>
            {tearBtn}
          </ToyButton>
          <div className="collected-badge">
            {interestLabel}{" "}
            <strong>{collectedCoins} {couponActive}</strong>
          </div>
        </div>

        {/* Die Zins-Wippe (The Interest Seesaw) */}
        <div className="bonds-panel seesaw-panel">
          <div className="panel-title">{seesawTitle}</div>
          <div className="seesaw-graphic">
            <div
              className="seesaw-beam"
              style={{
                transform: `rotate(${(bankRate - 5) * 5}deg)`,
              }}
            >
              <div className="beam-left">
                <span className="beam-label">{beamRateLabel}</span>
                <span className="beam-val">{bankRate}%</span>
              </div>
              <div className="beam-center">⚖️ 5c</div>
              <div className="beam-right">
                <span className="beam-label">{beamPriceLabel}</span>
                <span className="beam-val">{price}c</span>
              </div>
            </div>
            <div className="seesaw-fulcrum" />
          </div>

          <div className="seesaw-slider-wrap">
            <label className="slider-label">
              {sliderLabel}
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
            {bankRate >= 7 ? successMsg : promptMsg}
          </div>
        )}
      </div>
    </div>
  );
}
