import { useEffect, useState } from "react";
import { CAST } from "../components/cast";
import { Arrow, DiagramCanvas, Pop } from "../components/diagram";
import { Bread, Person } from "../components/icons";
import { ActionPrompt, CheckButton, Slider, Stage, ToyButton } from "../lesson/toolkit";
import type { Lang } from "../progress";
import { BakeryOven, FlourIcon, WoodIcon } from "./profit.diagrams";

export interface ProfitSim {
  price: number;
  ingredientCost: number;
  bakes: number;
  profitsSeen: number;
  lossesSeen: number;
}

export function calcOutcome(price: number, cost: number) {
  const diff = price - cost;
  return {
    revenue: price,
    cost,
    profit: Math.max(0, diff),
    loss: Math.max(0, -diff),
  };
}

export function ProfitKitchen({
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
  const [price, setPrice] = useState(4);
  const cost = 2; // flour + wood
  const [sim, setSim] = useState<ProfitSim>({
    price: 4,
    ingredientCost: 2,
    bakes: 0,
    profitsSeen: 0,
    lossesSeen: 0,
  });
  const [lastBake, setLastBake] = useState<ReturnType<typeof calcOutcome> | null>(null);

  const outcome = calcOutcome(price, cost);

  const handleBakeAndSell = () => {
    const res = calcOutcome(price, cost);
    setLastBake(res);
    setSim((s) => {
      const nextProfits = res.profit > 0 ? s.profitsSeen + 1 : s.profitsSeen;
      const nextLosses = res.loss > 0 || res.profit === 0 ? s.lossesSeen + 1 : s.lossesSeen;
      return {
        ...s,
        bakes: s.bakes + 1,
        profitsSeen: nextProfits,
        lossesSeen: nextLosses,
      };
    });
  };

  useEffect(() => {
    if (!isWidget && sim.profitsSeen >= 1 && sim.lossesSeen >= 1) {
      onDone?.();
    }
  }, [sim, onDone, isWidget]);

  const stageLabel =
    lang === "pl"
      ? "Stanowisko piekarni Bei"
      : lang === "de"
      ? "Beas Bäckerei"
      : "Bea's bakery workstation";

  const canvasLabel =
    lang === "pl"
      ? "Kuchnia zysków Bei"
      : lang === "de"
      ? "Beas Backstube"
      : "Bea's profit kitchen";

  const ingredientsText =
    lang === "pl" ? "Składniki" : lang === "de" ? "Zutaten" : "Ingredients";
  const flourText =
    lang === "pl" ? "Mąka (1)" : lang === "de" ? "Mehl (1)" : "Flour (1)";
  const woodText =
    lang === "pl" ? "Drewno (1)" : lang === "de" ? "Holz (1)" : "Wood (1)";
  const costBadge =
    lang === "pl"
      ? "Koszt: 2 monety"
      : lang === "de"
      ? "Kosten: 2 Münzen"
      : "Cost: 2 coins";

  const priceBadge =
    lang === "pl"
      ? `Cena: ${price} monet`
      : lang === "de"
      ? `Preis: ${price} Münzen`
      : `Price: ${price} coins`;

  const profitBadge =
    lang === "pl"
      ? `Zysk: +${lastBake?.profit}`
      : lang === "de"
      ? `Gewinn: +${lastBake?.profit}`
      : `Profit: +${lastBake?.profit}`;

  const beaKeepsText =
    lang === "pl"
      ? "Bea zatrzymuje monety!"
      : lang === "de"
      ? "Bea behält Münzen!"
      : "Bea keeps coins!";

  const lossBadge =
    lang === "pl"
      ? `Strata: -${lastBake?.loss}`
      : lang === "de"
      ? `Verlust: -${lastBake?.loss}`
      : `Loss: -${lastBake?.loss}`;

  const payFromJarText =
    lang === "pl"
      ? "Musi dopłacić ze słoika"
      : lang === "de"
      ? "Zahlt aus dem Glas"
      : "Must pay from jar";

  const readyToBakeText =
    lang === "pl" ? "Gotowa do pieczenia" : lang === "de" ? "Bereit zum Backen" : "Ready to bake";

  const sliderLabel =
    lang === "pl"
      ? "Cena sprzedaży za bochenek"
      : lang === "de"
      ? "Verkaufspreis pro Laib"
      : "Selling price per loaf";

  const sliderLeft =
    lang === "pl" ? "1 moneta (tanio)" : lang === "de" ? "1 Münze (billig)" : "1 coin (cheap)";
  const sliderRight =
    lang === "pl" ? "5 monet (drogo)" : lang === "de" ? "5 Münzen (teuer)" : "5 coins (costly)";

  const bakeButtonText =
    lang === "pl"
      ? `Upiecz i sprzedaj za ${price} monet`
      : lang === "de"
      ? `Backen und für ${price} Münzen verkaufen`
      : `Bake and sell for ${price} coins`;

  const promptText =
    sim.profitsSeen === 0
      ? lang === "pl"
        ? "Ustaw cenę wyższą niż 2 monety i upiecz chleb, aby osiągnąć zysk."
        : lang === "de"
        ? "Stelle einen Preis über 2 Münzen ein und backe, um Gewinn zu machen."
        : "Set a price higher than 2 coins and bake to make a profit."
      : sim.lossesSeen === 0
      ? lang === "pl"
        ? "Teraz ustaw cenę na 1 lub 2 monety, aby zobaczyć, co się stanie, gdy koszty przewyższą cenę."
        : lang === "de"
        ? "Stelle nun 1 oder 2 Münzen ein, um zu sehen, was bei zu geringem Preis geschieht."
        : "Now set price to 1 or 2 coins to see what happens when costs exceed price."
      : lang === "pl"
      ? "Świetna robota! Zobaczyłeś, jak działają zysk i strata. Możesz eksperymentować dalej lub przejść do pytań."
      : lang === "de"
      ? "Toll gemacht! Du hast Gewinn und Verlust erlebt. Du kannst weitermachen."
      : "Great job! You saw how profit and loss work. You can keep testing or move forward.";

  return (
    <div className="profit-wrap">
      <Stage label={stageLabel}>
        <DiagramCanvas label={canvasLabel}>
          {/* Left: Ingredients & Cost */}
          <Pop x={30} y={40}>
            <rect x="0" y="0" width="160" height="180" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <text x="80" y="28" textAnchor="middle" fill="#23383f" fontSize="14" fontWeight="bold">
              {ingredientsText}
            </text>
            <FlourIcon x={15} y={40} size={50} />
            <text x="110" y="70" fill="#23383f" fontSize="13">
              {flourText}
            </text>
            <WoodIcon x={15} y={105} size={50} />
            <text x="110" y="135" fill="#23383f" fontSize="13">
              {woodText}
            </text>
            <rect x="15" y="150" width="130" height="22" rx="6" fill="#fee2e2" />
            <text x="80" y="166" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">
              {costBadge}
            </text>
          </Pop>

          {/* Center: Oven & Bread */}
          <Pop x={230} y={60}>
            <BakeryOven x={30} y={10} />
            <Bread x={50} y={-10} size={75} />
            <text x="90" y="155" textAnchor="middle" fill="#23383f" fontSize="14" fontWeight="bold">
              {priceBadge}
            </text>
          </Pop>

          {/* Right: Bea & Outcome */}
          <Pop x={450} y={40}>
            <rect x="0" y="0" width="160" height="180" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <Person
              {...CAST.Bea}
              mood={lastBake ? (lastBake.profit > 0 ? "happy" : "sad") : "happy"}
              x={35}
              y={10}
              size={90}
            />
            {lastBake ? (
              <g transform="translate(15, 115)">
                {lastBake.profit > 0 ? (
                  <g>
                    <rect x="0" y="0" width="130" height="50" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
                    <text x="65" y="24" textAnchor="middle" fill="#15803d" fontSize={13} fontWeight="bold">
                      {profitBadge}
                    </text>
                    <text x="65" y="42" textAnchor="middle" fill="#15803d" fontSize={11}>
                      {beaKeepsText}
                    </text>
                  </g>
                ) : (
                  <g>
                    <rect x="0" y="0" width="130" height="50" rx="8" fill="#fee2e2" stroke="#d6403a" strokeWidth="2" />
                    <text x="65" y="24" textAnchor="middle" fill="#991b1b" fontSize={13} fontWeight="bold">
                      {lossBadge}
                    </text>
                    <text x="65" y="42" textAnchor="middle" fill="#991b1b" fontSize={11}>
                      {payFromJarText}
                    </text>
                  </g>
                )}
              </g>
            ) : (
              <text x="80" y="145" textAnchor="middle" fill="#64748b" fontSize={13}>
                {readyToBakeText}
              </text>
            )}
          </Pop>

          {/* Money flow arrows */}
          {lastBake && (
            <Pop x={190} y={120}>
              <Arrow from={[0, 0]} to={[35, 0]} color="#23383f" width={3} head={10} />
              <Arrow from={[180, 0]} to={[250, 0]} color="#23383f" width={3} head={10} />
            </Pop>
          )}
        </DiagramCanvas>
      </Stage>

      <div className="profit-controls">
        <Slider
          label={sliderLabel}
          value={price}
          min={1}
          max={5}
          step={1}
          onChange={setPrice}
          left={sliderLeft}
          right={sliderRight}
        />

        {!isWidget && (
          <>
            <ActionPrompt lang={lang}>{promptText}</ActionPrompt>
            <div className="row nav">
              <ToyButton onClick={handleBakeAndSell}>{bakeButtonText}</ToyButton>
            </div>
          </>
        )}

        {isWidget && onWidgetAnswer && (
          <div className="row nav">
            <CheckButton lang={lang} onClick={() => onWidgetAnswer(outcome.profit >= 2)} />
          </div>
        )}
      </div>
    </div>
  );
}
