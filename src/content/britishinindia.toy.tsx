import { useState, useEffect } from "react";
import type { Lang } from "../progress";
import { CheckButton } from "../lesson/toolkit";
import { resolveText, type Text } from "../lesson/types";
import "./britishinindia.css";

export function calcColonialTrade(policy: "colonial" | "fair") {
  if (policy === "colonial") {
    return {
      artisanTariff: 30,
      factoryTariff: 0,
      artisanIncome: 1,
      factoryIncome: 12,
      artisanStatus: "struggling",
      statusText: {
        en: "Heavy export taxes crushed the village handlooms.",
        de: "Hohe Exportzoelle brachten die Doerfer in Not.",
        pl: "Wysokie cła eksportowe zniszczyły wiejskie krosna tkackie.",
      } as Text,
    };
  }
  return {
    artisanTariff: 0,
    factoryTariff: 0,
    artisanIncome: 8,
    factoryIncome: 7,
    artisanStatus: "thriving",
    statusText: {
      en: "Fair trade allows weavers and factories to thrive on merit.",
      de: "Faire Bedingungen lassen Handwerker und Fabriken aufbluehen.",
      pl: "Uczciwe warunki handlu pozwalają tkaczom i fabrykom rozwijać się dzięki pracy.",
    } as Text,
  };
}

interface BritishInIndiaToyProps {
  lang: Lang;
  mode?: "toy" | "quiz";
  onDone?: () => void;
}

export function BritishInIndiaToy({ lang, mode = "toy", onDone }: BritishInIndiaToyProps) {
  const [policy, setPolicy] = useState<"colonial" | "fair">(
    mode === "quiz" ? "colonial" : "colonial"
  );
  const [showFeedback, setShowFeedback] = useState(false);

  const { artisanTariff, factoryTariff, artisanIncome, factoryIncome, artisanStatus, statusText } =
    calcColonialTrade(policy);

  useEffect(() => {
    if (mode === "toy" && policy === "fair" && onDone) {
      onDone();
    }
  }, [policy, mode, onDone]);

  const handleCheck = () => {
    setShowFeedback(true);
    if (mode === "quiz") {
      if (policy === "fair" && onDone) {
        onDone();
      }
    } else {
      if (onDone) onDone();
    }
  };

  return (
    <div className="colonial-wrap">
      {/* Policy Bar */}
      <div className="policy-bar">
        <button
          type="button"
          className={`pol-btn ${policy === "colonial" ? "active warning" : ""}`}
          onClick={() => {
            setPolicy("colonial");
            setShowFeedback(false);
          }}
        >
          {lang === "en" ? "Colonial Monopoly Tariffs" : lang === "de" ? "Koloniale Schutzzoelle" : "Kolonialne cła monopolistyczne"}
        </button>
        <button
          type="button"
          className={`pol-btn ${policy === "fair" ? "active" : ""}`}
          onClick={() => {
            setPolicy("fair");
            setShowFeedback(false);
          }}
        >
          {lang === "en" ? "Fair Reciprocal Trade" : lang === "de" ? "Faire Handelsbedingungen" : "Uczciwy handel wzajemny"}
        </button>
      </div>

      {/* Trade Balance Comparison */}
      <div className="trade-grid">
        {/* Bengal Handloom */}
        <div className={`producer-box ${artisanStatus}`}>
          <div className="prod-title">
            {lang === "en" ? "Bengal Village Weaver" : lang === "de" ? "Weber im Dorf" : "Wiejski tkacz"}
          </div>
          <div className="tariff-tag">
            {lang === "en" ? "Export Tariff:" : lang === "de" ? "Exportzoll:" : "Cło eksportowe:"} <strong>{artisanTariff}%</strong>
          </div>
          <div className="income-badge">
            {artisanIncome} {lang === "en" ? "Coins/day" : lang === "de" ? "Muenzen/Tag" : "Monet/dzień"}
          </div>
          <div className="prod-state">
            {artisanStatus === "thriving"
              ? lang === "en" ? "Handloom Busy & Thriving!" : lang === "de" ? "Webstuhl aktiv & erfolgreich!" : "Krosno działa i prosperuje!"
              : lang === "en" ? "Loom Silent (Crushed by Tax)" : lang === "de" ? "Webstuhl still (Ueberlastet)" : "Krosno milczy (zniszczone podatkiem)"}
          </div>
        </div>

        {/* Manchester Mill */}
        <div className="producer-box factory">
          <div className="prod-title">
            {lang === "en" ? "Industrial Steam Mill" : lang === "de" ? "Industrie-Dampfmuehle" : "Fabryka parowa"}
          </div>
          <div className="tariff-tag">
            {lang === "en" ? "Import Tariff:" : lang === "de" ? "Importzoll:" : "Cło importowe:"} <strong>{factoryTariff}%</strong>
          </div>
          <div className="income-badge">
            {factoryIncome} {lang === "en" ? "Coins/day" : lang === "de" ? "Muenzen/Tag" : "Monet/dzień"}
          </div>
          <div className="prod-state">
            {policy === "colonial"
              ? lang === "en" ? "Monopoly Advantage" : lang === "de" ? "Monopol-Vorteil" : "Przewaga monopolu"
              : lang === "en" ? "Healthy Competition" : lang === "de" ? "Gesunder Wettbewerb" : "Zdrowa konkurencja"}
          </div>
        </div>
      </div>

      <div className="status-note">{resolveText(statusText, lang)}</div>

      <div className="colonial-actions">
        <CheckButton lang={lang} onClick={handleCheck} />
        {showFeedback && (
          <div className={`feedback-msg ${policy === "fair" ? "success" : "warning"}`}>
            {policy === "fair"
              ? lang === "en"
                ? "Excellent! Removing unfair colonial tariffs restored balance and protected local weavers."
                : lang === "de"
                ? "Ausgezeichnet! Faire Handelsregeln schuetzen Handwerker und schaffen Balance."
                : "Wspaniale! Usunięcie niesprawiedliwych ceł przywróciło równowagę i ochroniło tkaczy."
              : lang === "en"
              ? "Switch to Fair Reciprocal Trade to give local artisans an equal chance."
              : lang === "de"
              ? "Wechsle zu Faire Handelsbedingungen, um Handwerkern gleiche Chancen zu geben."
              : "Przełącz na uczciwe warunki handlu, aby dać rzemieślnikom równe szanse."}
          </div>
        )}
      </div>
    </div>
  );
}
