import { useState, useEffect } from "react";
import { CAST } from "../components/cast";
import { Coin, InlineIcon, Person, Piggy } from "../components/icons";
import { CheckButton, Slider, Stage, ToyButton } from "../lesson/toolkit";
import type { ToyProps, WidgetProps } from "../lesson/types";
import type { Lang } from "../progress";
import { Boat } from "./interest.icons";
import "./interest.css";

/**
 * Balance at the end of each year, from year 0 to `years`.
 * The extra of each year is added to the pile, so next year it earns extra too.
 */
export function grow(start: number, ratePercent: number, years: number): number[] {
  const out: number[] = [];
  for (let y = 0; y <= years; y++) out.push(start * Math.pow(1 + ratePercent / 100, y));
  return out;
}

/** The widget question wants the garden to end between these two numbers (whole coins). */
export const TARGET_LOW = 150;
export const TARGET_HIGH = 170;

export function reachesTarget(rate: number, years: number): boolean {
  const total = Math.round(grow(100, rate, years)[years]);
  return total >= TARGET_LOW && total <= TARGET_HIGH;
}

type Mode = "save" | "loan";

interface ChartProps {
  values: number[];
  start: number;
  rate: number;
  mode: Mode;
  scaleMax?: number;
  band?: [number, number];
  label: string;
}

const W = 720;
const H = 116;
const AXIS = 16;

/**
 * Bars for each year. Teal is the coins you started with. On top comes the plain
 * interest (the same every year) and then the interest on interest.
 */
function Chart({ values, start, rate, mode, scaleMax, band, label }: ChartProps) {
  const max = scaleMax ?? Math.max(...values, 1);
  const n = values.length;
  const gap = n > 12 ? 2 : 4;
  const bw = (W - gap * (n - 1)) / n;
  const y = (v: number) => H - (Math.min(v, max) / max) * H;
  const h = (v: number) => (Math.min(v, max) / max) * H;
  return (
    <svg className="ig-chart" viewBox={`0 0 ${W} ${H + AXIS}`} role="img" aria-label={label}>
      {band && (
        <>
          <rect className="ig-band" x={0} y={y(band[1])} width={W} height={y(band[0]) - y(band[1])} />
          <line className="ig-mark" x1={0} x2={W} y1={y(band[0])} y2={y(band[0])} />
          <line className="ig-mark" x1={0} x2={W} y1={y(band[1])} y2={y(band[1])} />
        </>
      )}
      {values.map((v, i) => {
        const x = i * (bw + gap);
        const simple = Math.min(v, start + (start * rate * i) / 100);
        return (
          <g key={i}>
            <rect className="ig-bar-start" x={x} y={y(start)} width={bw} height={h(start)} />
            <rect className={`ig-bar-simple-${mode}`} x={x} y={y(simple)} width={bw} height={Math.max(0, h(simple) - h(start))} />
            <rect className={`ig-bar-comp-${mode}`} x={x} y={y(v)} width={bw} height={Math.max(0, h(v) - h(simple))} />
          </g>
        );
      })}
      <text className="ig-axis" x={10} y={H + 13}>
        0
      </text>
      <text className="ig-axis" x={W - 10} y={H + 13} textAnchor="end">
        {n - 1}
      </text>
    </svg>
  );
}

function ratePhrase(lang: Lang, rate: number): string {
  return lang === "en"
    ? `${rate}% = ${rate} extra coins for every 100 coins, each year`
    : `${rate} % = ${rate} Extra-Münzen für je 100 Münzen, jedes Jahr`;
}

function Swatch({ cls, children }: { cls: string; children: string }) {
  return (
    <span className="ig-legend-item">
      <span className={`ig-swatch ${cls}`} aria-hidden="true" />
      {children}
    </span>
  );
}

export function Garden({ lang, onDone }: ToyProps) {
  const [mode, setMode] = useState<Mode>("save");
  const [start, setStart] = useState(100);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);

  useEffect(() => {
    if (start !== 100 || rate !== 5 || years !== 10 || mode !== "save") {
      onDone?.();
    }
  }, [start, rate, years, mode, onDone]);

  const en = lang === "en";
  const values = grow(start, rate, years);
  const total = Math.round(values[years]);
  const extra = total - start;
  const simple = Math.round((start * rate * years) / 100);
  const onExtra = Math.max(0, extra - simple);
  const save = mode === "save";

  const chartLabel = en
    ? `Bars for each year from 0 to ${years}. After ${years} years: ${total} coins.`
    : `Balken für jedes Jahr von 0 bis ${years}. Nach ${years} Jahren: ${total} Münzen.`;

  return (
    <Stage label={en ? "The money garden" : "Der Geldgarten"}>
      <div className="ig-wrap">
        <div className="ig-modes">
          <ToyButton pressed={save} onClick={() => setMode("save")}>
            <span className="btn-icons">
              <InlineIcon size={30}>
                <Piggy />
              </InlineIcon>
              <span className="sr-only">{en ? "Saving" : "Sparen"}</span>
            </span>
          </ToyButton>
          <ToyButton pressed={!save} onClick={() => setMode("loan")}>
            <span className="btn-icons">
              <InlineIcon size={30}>
                <Boat />
              </InlineIcon>
              <span className="sr-only">{en ? "Loan" : "Geld leihen"}</span>
            </span>
          </ToyButton>
        </div>
        <Chart values={values} start={start} rate={rate} mode={mode} label={chartLabel} />
        <div className="ig-readout" role="status">
          <span className="ig-big">
            <InlineIcon size={30}>{save ? <Person {...CAST.Bea} /> : <Person {...CAST.Finn} />}</InlineIcon>
            {save
              ? en
                ? `After ${years} years: ${total} coins`
                : `Nach ${years} Jahren: ${total} Münzen`
              : en
                ? `After ${years} years Finn pays back: ${total} coins`
                : `Nach ${years} Jahren zahlt Finn zurück: ${total} Münzen`}
          </span>
          <span className="ig-legend">
            <Swatch cls="ig-bar-start">
              {save ? (en ? `${start} put in` : `${start} eingezahlt`) : en ? `${start} borrowed` : `${start} geliehen`}
            </Swatch>
            <Swatch cls={`ig-bar-simple-${mode}`}>{en ? `${simple} interest` : `${simple} Zinsen`}</Swatch>
            <Swatch cls={`ig-bar-comp-${mode}`}>
              {en ? `${onExtra} interest on interest` : `${onExtra} Zinsen auf Zinsen`}
            </Swatch>
          </span>
          <span className="ig-small">{ratePhrase(lang, rate)}</span>
        </div>
        <div className="ig-sliders">
          <Slider
            label={save ? (en ? "Coins put in" : "Eingezahlte Münzen") : en ? "Coins borrowed" : "Geliehene Münzen"}
            value={start}
            min={10}
            max={200}
            step={10}
            onChange={setStart}
          />
          <Slider label={en ? "Interest (%)" : "Zinsen (%)"} value={rate} min={0} max={10} onChange={setRate} />
          <Slider label={en ? "Years" : "Jahre"} value={years} min={1} max={20} onChange={setYears} />
        </div>
      </div>
    </Stage>
  );
}

export function GardenWidget({ lang, onAnswer }: WidgetProps) {
  const [rate, setRate] = useState(2);
  const [years, setYears] = useState(3);
  const en = lang === "en";
  const values = grow(100, rate, years);
  const total = Math.round(values[years]);

  return (
    <>
      <Stage label={en ? "Bea's money garden" : "Beas Geldgarten"}>
        <div className="ig-wrap">
          <Chart
            values={values}
            start={100}
            rate={rate}
            mode="save"
            scaleMax={270}
            band={[TARGET_LOW, TARGET_HIGH]}
            label={
              en
                ? `Bea's coins after ${years} years: ${total}. The goal is between ${TARGET_LOW} and ${TARGET_HIGH}.`
                : `Beas Münzen nach ${years} Jahren: ${total}. Das Ziel liegt zwischen ${TARGET_LOW} und ${TARGET_HIGH}.`
            }
          />
          <div className="ig-readout" role="status">
            <span className="ig-big">
              <InlineIcon size={30}>
                <Person {...CAST.Bea} />
              </InlineIcon>
              <InlineIcon size={30}>
                <Coin />
              </InlineIcon>
              {en ? `Bea has ${total} coins after ${years} years` : `Bea hat nach ${years} Jahren ${total} Münzen`}
            </span>
            <span className="ig-small">
              {en
                ? `Goal: the green stripe, ${TARGET_LOW} to ${TARGET_HIGH} coins. ${ratePhrase(lang, rate)}`
                : `Ziel: der grüne Streifen, ${TARGET_LOW} bis ${TARGET_HIGH} Münzen. ${ratePhrase(lang, rate)}`}
            </span>
          </div>
          <div className="ig-sliders two">
            <Slider label={en ? "Interest (%)" : "Zinsen (%)"} value={rate} min={0} max={10} onChange={setRate} />
            <Slider label={en ? "Years" : "Jahre"} value={years} min={1} max={10} onChange={setYears} />
          </div>
        </div>
      </Stage>
      <div className="row nav">
        <CheckButton lang={lang} onClick={() => onAnswer(reachesTarget(rate, years))} />
      </div>
    </>
  );
}
