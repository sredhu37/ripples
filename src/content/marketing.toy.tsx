import { useEffect, useState } from "react";
import { DiagramCanvas, Pop } from "../components/diagram";
import { ActionPrompt, CheckButton, Stage } from "../lesson/toolkit";
import type { Lang } from "../progress";
import { BootsIcon } from "./marketing.diagrams";

export interface MarketingChannels {
  poster: boolean;
  coral: boolean;
  crier: boolean;
}

export function calcMarketing(channels: MarketingChannels) {
  let cost = 0;
  let alerted = 0;

  if (channels.poster) {
    cost += 2;
    alerted += 4;
  }
  if (channels.coral) {
    cost += 3;
    alerted += 4;
  }
  if (channels.crier) {
    cost += 4;
    alerted += 4;
  }

  const revenue = alerted * 2;
  const profit = revenue - cost;

  return { cost, alerted, revenue, profit };
}

export function MarketingToy({
  lang,
  onDone,
  isWidget,
  onWidgetAnswer,
}: {
  lang: Lang;
  onDone?: () => void;
  isWidget?: boolean;
  onWidgetAnswer?: (correct: boolean) => void;
}) {
  const [channels, setChannels] = useState<MarketingChannels>({
    poster: false,
    coral: false,
    crier: false,
  });

  const stats = calcMarketing(channels);

  useEffect(() => {
    if (!isWidget && stats.alerted >= 8 && stats.profit > 0) {
      onDone?.();
    }
  }, [stats.alerted, stats.profit, onDone, isWidget]);

  const togglePoster = () => setChannels((prev) => ({ ...prev, poster: !prev.poster }));

  const toggleCoral = () => setChannels((prev) => ({ ...prev, coral: !prev.coral }));

  const toggleCrier = () => setChannels((prev) => ({ ...prev, crier: !prev.crier }));

  const stageLabel =
    lang === "pl"
      ? "Przekazywanie wiadomości w Ripple Town"
      : lang === "de"
        ? "Werbung in Ripple Town"
        : "Spreading the word in Ripple Town";

  const canvasLabel =
    lang === "pl"
      ? "12 mieszkańców w miasteczku"
      : lang === "de"
        ? "12 Leute im Ort"
        : "12 villagers in town";

  const villagersGridTitle =
    lang === "pl"
      ? "Mieszkańcy (łącznie 12)"
      : lang === "de"
        ? "Dorfbewohner (12 gesamt)"
        : "Town Villagers (12 Total)";

  const ledgerTitle =
    lang === "pl" ? "Księga rachunkowa Sama" : lang === "de" ? "Sams Kasse" : "Sam's Ledger";

  const coinsLabel = lang === "pl" ? "monet" : lang === "de" ? "Münzen" : "coins";

  const adCostLabel =
    lang === "pl" ? "Koszty reklamy:" : lang === "de" ? "Werbekosten:" : "Ad Cost:";

  const salesLabel =
    lang === "pl" ? "Sprzedaż (buty):" : lang === "de" ? "Umsatz (Stiefel):" : "Sales (Boots):";

  const netProfitLabel = lang === "pl" ? "ZYSK NETTO" : lang === "de" ? "REINGEWINN" : "NET PROFIT";

  const posterBtnText =
    lang === "pl"
      ? "Szyld w porcie (Koszt 2, dociera do 4)"
      : lang === "de"
        ? "Hafenschild (Kostet 2, erreicht 4)"
        : "Harbor Poster (Cost 2, Alerts 4)";

  const coralBtnText =
    lang === "pl"
      ? "Próba dla Kapitana Corala (Koszt 3, dociera do 4)"
      : lang === "de"
        ? "Probe für Kapitän Coral (Kostet 3, erreicht 4)"
        : "Captain Coral Sample (Cost 3, Alerts 4)";

  const crierBtnText =
    lang === "pl"
      ? "Goniec miejski (Koszt 4, dociera do 4)"
      : lang === "de"
        ? "Marktausrufer (Kostet 4, erreicht 4)"
        : "Market Crier (Cost 4, Alerts 4)";

  const promptText =
    stats.alerted < 8
      ? lang === "pl"
        ? "Włącz narzędzia marketingowe, aby dotrzeć do co najmniej 8 mieszkańców!"
        : lang === "de"
          ? "Aktiviere Werbemittel, um mindestens 8 Dorfbewohner zu erreichen!"
          : "Activate marketing tools to spread the word to at least 8 villagers!"
      : lang === "pl"
        ? "Świetnie! Więcej ludzi wie o butach Sama i osiąga on zdrowy zysk!"
        : lang === "de"
          ? "Klasse! Mehr Leute wissen von Sams Stiefeln und er macht einen guten Gewinn!"
          : "Great! More people know about Sam's boots and he earns a healthy profit!";

  return (
    <div className="marketing-wrap">
      <Stage label={stageLabel}>
        <DiagramCanvas label={canvasLabel}>
          {/* Town Map Grid with 12 Villagers */}
          <Pop x={30} y={30}>
            <rect
              x="0"
              y="0"
              width="340"
              height="200"
              rx="14"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            <text x="170" y="24" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="bold">
              {villagersGridTitle}
            </text>

            <g transform="translate(25, 45)">
              {Array.from({ length: 12 }).map((_, i) => {
                const isAlerted = i < stats.alerted;
                const col = i % 4;
                const row = Math.floor(i / 4);
                const x = col * 75;
                const y = row * 45;
                return (
                  <g key={i} transform={`translate(${x}, ${y})`}>
                    <circle
                      cx="25"
                      cy="20"
                      r="16"
                      fill={isAlerted ? "#dcfce7" : "#f1f5f9"}
                      stroke={isAlerted ? "#16a34a" : "#94a3b8"}
                      strokeWidth="2"
                    />
                    {isAlerted ? (
                      <BootsIcon x={12} y={10} size={25} />
                    ) : (
                      <text
                        x="25"
                        y="25"
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        ?
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          </Pop>

          {/* Business Balance Card */}
          <Pop x={390} y={30}>
            <rect
              x="0"
              y="0"
              width="220"
              height="200"
              rx="14"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="3"
            />
            <text x="110" y="28" textAnchor="middle" fill="#23383f" fontSize={14} fontWeight="bold">
              {ledgerTitle}
            </text>

            <rect x="20" y="45" width="180" height="30" rx="6" fill="#fee2e2" />
            <text x="30" y="65" fill="#991b1b" fontSize={12} fontWeight="bold">
              {adCostLabel}
            </text>
            <text x="190" y="65" textAnchor="end" fill="#991b1b" fontSize={13} fontWeight="bold">
              {stats.cost} {coinsLabel}
            </text>

            <rect x="20" y="85" width="180" height="30" rx="6" fill="#dbeafe" />
            <text x="30" y="105" fill="#1e40af" fontSize={12} fontWeight="bold">
              {salesLabel}
            </text>
            <text x="190" y="105" textAnchor="end" fill="#1e40af" fontSize={13} fontWeight="bold">
              +{stats.revenue} {coinsLabel}
            </text>

            <rect
              x="20"
              y="130"
              width="180"
              height="50"
              rx="8"
              fill="#dcfce7"
              stroke="#16a34a"
              strokeWidth="2"
            />
            <text
              x="110"
              y="150"
              textAnchor="middle"
              fill="#166534"
              fontSize={11}
              fontWeight="bold"
            >
              {netProfitLabel}
            </text>
            <text
              x="110"
              y="172"
              textAnchor="middle"
              fill="#15803d"
              fontSize={18}
              fontWeight="bold"
            >
              {stats.profit >= 0 ? `+${stats.profit}` : stats.profit} {coinsLabel}
            </text>
          </Pop>
        </DiagramCanvas>
      </Stage>

      <div className="marketing-controls">
        <div className="row">
          <button
            type="button"
            className={`choice-btn ${channels.poster ? "selected" : ""}`}
            onClick={togglePoster}
          >
            {posterBtnText}
          </button>
          {!isWidget && (
            <>
              <button
                type="button"
                className={`choice-btn ${channels.coral ? "selected" : ""}`}
                onClick={toggleCoral}
              >
                {coralBtnText}
              </button>
              <button
                type="button"
                className={`choice-btn ${channels.crier ? "selected" : ""}`}
                onClick={toggleCrier}
              >
                {crierBtnText}
              </button>
            </>
          )}
        </div>

        {!isWidget && <ActionPrompt lang={lang}>{promptText}</ActionPrompt>}

        {isWidget && onWidgetAnswer && (
          <div className="row nav">
            <CheckButton
              lang={lang}
              onClick={() => onWidgetAnswer(channels.poster && !channels.coral && !channels.crier)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
