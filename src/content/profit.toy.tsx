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
  const en = lang === "en";
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

  return (
    <div className="profit-wrap">
      <Stage label={en ? "Bea's bakery workstation" : "Beas Bäckerei"}>
        <DiagramCanvas label={en ? "Bea's profit kitchen" : "Beas Backstube"}>
          {/* Left: Ingredients & Cost */}
          <Pop x={30} y={40}>
            <rect x="0" y="0" width="160" height="180" rx="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
            <text x="80" y="28" textAnchor="middle" fill="#23383f" fontSize="14" fontWeight="bold">
              {en ? "Ingredients" : "Zutaten"}
            </text>
            <FlourIcon x={15} y={40} size={50} />
            <text x="110" y="70" fill="#23383f" fontSize="13">
              {en ? "Flour (1)" : "Mehl (1)"}
            </text>
            <WoodIcon x={15} y={105} size={50} />
            <text x="110" y="135" fill="#23383f" fontSize="13">
              {en ? "Wood (1)" : "Holz (1)"}
            </text>
            <rect x="15" y="150" width="130" height="22" rx="6" fill="#fee2e2" />
            <text x="80" y="166" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">
              {en ? "Cost: 2 coins" : "Kosten: 2 Münzen"}
            </text>
          </Pop>

          {/* Center: Oven & Bread */}
          <Pop x={230} y={60}>
            <BakeryOven x={30} y={10} />
            <Bread x={50} y={-10} size={75} />
            <text x="90" y="155" textAnchor="middle" fill="#23383f" fontSize="14" fontWeight="bold">
              {en ? `Price: ${price} coins` : `Preis: ${price} Münzen`}
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
                    <text x="65" y="24" textAnchor="middle" fill="#15803d" fontSize="13" fontWeight="bold">
                      {en ? `Profit: +${lastBake.profit}` : `Gewinn: +${lastBake.profit}`}
                    </text>
                    <text x="65" y="42" textAnchor="middle" fill="#15803d" fontSize="11">
                      {en ? "Bea keeps coins!" : "Bea behält Münzen!"}
                    </text>
                  </g>
                ) : (
                  <g>
                    <rect x="0" y="0" width="130" height="50" rx="8" fill="#fee2e2" stroke="#d6403a" strokeWidth="2" />
                    <text x="65" y="24" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="bold">
                      {en ? `Loss: -${lastBake.loss}` : `Verlust: -${lastBake.loss}`}
                    </text>
                    <text x="65" y="42" textAnchor="middle" fill="#991b1b" fontSize="11">
                      {en ? "Must pay from jar" : "Zahlt aus dem Glas"}
                    </text>
                  </g>
                )}
              </g>
            ) : (
              <text x="80" y="145" textAnchor="middle" fill="#64748b" fontSize="13">
                {en ? "Ready to bake" : "Bereit zum Backen"}
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
          label={en ? "Selling price per loaf" : "Verkaufspreis pro Laib"}
          value={price}
          min={1}
          max={5}
          step={1}
          onChange={setPrice}
          left={en ? "1 coin (cheap)" : "1 Münze (billig)"}
          right={en ? "5 coins (costly)" : "5 Münzen (teuer)"}
        />

        {!isWidget && (
          <>
            <ActionPrompt lang={lang}>
              {sim.profitsSeen === 0
                ? en
                  ? "Set a price higher than 2 coins and bake to make a profit."
                  : "Stelle einen Preis über 2 Münzen ein und backe, um Gewinn zu machen."
                : sim.lossesSeen === 0
                ? en
                  ? "Now set price to 1 or 2 coins to see what happens when costs exceed price."
                  : "Stelle nun 1 oder 2 Münzen ein, um zu sehen, was bei zu geringem Preis geschieht."
                : en
                ? "Great job! You saw how profit and loss work. You can keep testing or move forward."
                : "Toll gemacht! Du hast Gewinn und Verlust erlebt. Du kannst weitermachen."}
            </ActionPrompt>
            <div className="row nav">
              <ToyButton onClick={handleBakeAndSell}>
                {en ? `Bake and sell for ${price} coins` : `Backen und für ${price} Münzen verkaufen`}
              </ToyButton>
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
