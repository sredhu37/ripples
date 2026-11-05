import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton, ToyButton } from "../lesson/toolkit";
import "./commodities.css";

export type WeatherMode = "drought" | "normal" | "bumper";

export function calcCommodityPrice(weather: WeatherMode) {
  switch (weather) {
    case "drought":
      return { sacks: 20, price: 8, status: "scarce" };
    case "bumper":
      return { sacks: 90, price: 2, status: "plentiful" };
    case "normal":
    default:
      return { sacks: 50, price: 4, status: "balanced" };
  }
}

interface CommoditiesToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function CommoditiesToy({ lang, mode = "toy", onDone }: CommoditiesToyProps) {
  const [weather, setWeather] = useState<WeatherMode>(mode === "quiz" ? "drought" : "normal");
  const [hasTriedDrought, setHasTriedDrought] = useState(false);
  const [hasTriedBumper, setHasTriedBumper] = useState(false);
  const [bakersDelivered, setBakersDelivered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const { sacks, price, status } = calcCommodityPrice(weather);

  useEffect(() => {
    if (mode === "toy") {
      if (weather === "drought") setHasTriedDrought(true);
      if (weather === "bumper") setHasTriedBumper(true);
      if (hasTriedDrought && hasTriedBumper && onDone) {
        onDone();
      }
    }
  }, [weather, hasTriedDrought, hasTriedBumper, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (weather === "normal" && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  const weatherPanelTitle =
    lang === "pl" ? "Pogoda w dolinie" : lang === "de" ? "Talwetter" : "Valley Weather";

  const droughtBtn =
    lang === "pl" ? "Susza" : lang === "de" ? "Dürre" : "Drought";
  const normalBtn =
    lang === "pl" ? "Normalny deszcz" : lang === "de" ? "Normaler Regen" : "Normal Rain";
  const bumperBtn =
    lang === "pl" ? "Urodzajne zbiory" : lang === "de" ? "Rekordernte" : "Bumper Crop";

  const siloPanelTitle =
    lang === "pl" ? "Centralny silos zbożowy" : lang === "de" ? "Zentrales Getreidesilo" : "Central Grain Silo";

  const sacksCount =
    lang === "pl" ? `${sacks} worków pszenicy` : lang === "de" ? `${sacks} Säcke Weizen` : `${sacks} Wheat Sacks`;

  const exchangePriceLabel =
    lang === "pl" ? "Cena giełdowa:" : lang === "de" ? "Börsenpreis:" : "Exchange Price:";

  const priceUnit =
    lang === "pl" ? `${price} monet/worek` : lang === "de" ? `${price} Münzen/Sack` : `${price} Coins/Sack`;

  const bakeryTitle =
    lang === "pl" ? "Piekarnie w miasteczku" : lang === "de" ? "Dorfbäckereien" : "Town Bakeries";

  const bakeryDemand =
    lang === "pl" ? "Potrzeba: 50 worków" : lang === "de" ? "Bedarf: 50 Säcke nötig" : "Order: 50 Sacks needed";

  const flourCostLabel =
    lang === "pl" ? "Koszt mąki:" : lang === "de" ? "Mehlkosten:" : "Flour Cost:";

  const totalCostVal =
    lang === "pl"
      ? `${Math.min(sacks, 50) * price} monet`
      : lang === "de"
      ? `${Math.min(sacks, 50) * price} Münzen`
      : `${Math.min(sacks, 50) * price} Coins`;

  const deliverBtnText = bakersDelivered
    ? lang === "pl"
      ? "Mąka dostarczona!"
      : lang === "de"
      ? "Mehl geliefert!"
      : "Flour Delivered!"
    : lang === "pl"
    ? "Otwórz bramę silosu"
    : lang === "de"
    ? "Silotor öffnen"
    : "Open Silo Gate";

  const successMsg =
    lang === "pl"
      ? "Silos mieści 50 worków po uczciwej cenie 4 monet. Piekarnie wypiekają niedrogi chleb!"
      : lang === "de"
      ? "Das Silo fasst 50 Säcke zu fairen 4 Münzen. Die Bäcker backen bezahlbares Brot!"
      : "Silo holds 50 sacks at a fair 4-coin price. Bakers bake affordable bread!";

  const adjustMsg =
    lang === "pl"
      ? "Ustaw pogodę na normalny deszcz, aby przywrócić równowagę 50 worków."
      : lang === "de"
      ? "Stelle das Wetter auf normalen Regen, um 50 Säcke auszugleichen."
      : "Set the weather to Normal Rain to restore the 50-sack balance.";

  return (
    <div className="commodities-wrap">
      <div className="commodities-grid">
        {/* Weather Controller */}
        <div className="commodities-weather-panel">
          <div className="commodities-panel-title">{weatherPanelTitle}</div>
          <div className="commodities-weather-buttons">
            <button
              type="button"
              className={`commodities-weather-btn ${weather === "drought" ? "active" : ""}`}
              onClick={() => {
                setWeather("drought");
                setBakersDelivered(false);
                setShowFeedback(false);
              }}
            >
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" className="weather-icon">
                <circle cx="10" cy="10" r="5" fill="#f59e0b" />
                <path d="M10 2 V4 M10 16 V18 M2 10 H4 M16 10 H18 M4.5 4.5 L6 6 M14 14 L15.5 15.5 M4.5 15.5 L6 14 M14 6 L15.5 4.5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>{droughtBtn}</span>
            </button>
            <button
              type="button"
              className={`commodities-weather-btn ${weather === "normal" ? "active" : ""}`}
              onClick={() => {
                setWeather("normal");
                setBakersDelivered(false);
                setShowFeedback(false);
              }}
            >
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" className="weather-icon">
                <path d="M6 10 A4 4 0 0 1 14 10 A3 3 0 0 1 14 15 H6 A3 3 0 0 1 6 10 Z" fill="#60a5fa" />
                <line x1="8" y1="16" x2="6" y2="19" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="12" y1="16" x2="10" y2="19" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span>{normalBtn}</span>
            </button>
            <button
              type="button"
              className={`commodities-weather-btn ${weather === "bumper" ? "active" : ""}`}
              onClick={() => {
                setWeather("bumper");
                setBakersDelivered(false);
                setShowFeedback(false);
              }}
            >
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" className="weather-icon">
                <line x1="10" y1="18" x2="10" y2="2" stroke="#16a34a" strokeWidth="2" />
                <ellipse cx="6" cy="6" rx="3" ry="1.5" fill="#eab308" transform="rotate(-30 6 6)" />
                <ellipse cx="14" cy="6" rx="3" ry="1.5" fill="#eab308" transform="rotate(30 14 6)" />
                <ellipse cx="6" cy="11" rx="3" ry="1.5" fill="#eab308" transform="rotate(-30 6 11)" />
                <ellipse cx="14" cy="11" rx="3" ry="1.5" fill="#eab308" transform="rotate(30 14 11)" />
              </svg>
              <span>{bumperBtn}</span>
            </button>
          </div>
        </div>

        {/* Central Silo */}
        <div className="commodities-silo-panel">
          <div className="commodities-panel-title">{siloPanelTitle}</div>
          <div className="commodities-silo-meter">
            <div
              className={`commodities-silo-fill ${status}`}
              style={{ height: `${(sacks / 100) * 100}%` }}
            />
          </div>
          <div className="commodities-silo-count">
            {sacksCount}
          </div>
          <div className="commodities-price-callout">
            <span className="commodities-price-label">{exchangePriceLabel}</span>
            <span className="commodities-price-val">{priceUnit}</span>
          </div>
        </div>

        {/* Bakery Demand */}
        <div className="commodities-bakery-panel">
          <div className="commodities-panel-title">{bakeryTitle}</div>
          <div className="commodities-bakery-demand-badge">
            {bakeryDemand}
          </div>
          <div className="commodities-bakery-cost">
            {flourCostLabel}{" "}
            <strong>{totalCostVal}</strong>
          </div>
          <ToyButton
            onClick={() => setBakersDelivered(true)}
            disabled={bakersDelivered}
          >
            {deliverBtnText}
          </ToyButton>
        </div>
      </div>

      <div className="commodities-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`commodities-feedback-msg ${weather === "normal" ? "success" : "warning"}`}>
            {weather === "normal" ? successMsg : adjustMsg}
          </div>
        )}
      </div>
    </div>
  );
}
