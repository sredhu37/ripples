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
          <rect
            className="ig-band"
            x={0}
            y={y(band[1])}
            width={W}
            height={y(band[0]) - y(band[1])}
          />
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
            <rect
              className={`ig-bar-simple-${mode}`}
              x={x}
              y={y(simple)}
              width={bw}
              height={Math.max(0, h(simple) - h(start))}
            />
            <rect
              className={`ig-bar-comp-${mode}`}
              x={x}
              y={y(v)}
              width={bw}
              height={Math.max(0, h(v) - h(simple))}
            />
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
  if (lang === "pl") return `${rate}% = ${rate} dodatkowych monet na każde 100 monet rocznie`;
  if (lang === "de") return `${rate} % = ${rate} Extra-Münzen für je 100 Münzen, jedes Jahr`;
  return `${rate}% = ${rate} extra coins for every 100 coins, each year`;
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

  const values = grow(start, rate, years);
  const total = Math.round(values[years]);
  const extra = total - start;
  const simple = Math.round((start * rate * years) / 100);
  const onExtra = Math.max(0, extra - simple);
  const save = mode === "save";

  const chartLabel =
    lang === "pl"
      ? `Słupki dla każdego roku od 0 do ${years}. Po ${years} latach: ${total} monet.`
      : lang === "de"
        ? `Balken für jedes Jahr von 0 bis ${years}. Nach ${years} Jahren: ${total} Münzen.`
        : `Bars for each year from 0 to ${years}. After ${years} years: ${total} coins.`;

  return (
    <Stage
      label={
        lang === "pl" ? "Ogród pieniędzy" : lang === "de" ? "Der Geldgarten" : "The money garden"
      }
    >
      <div className="ig-wrap">
        <div className="ig-modes">
          <ToyButton pressed={save} onClick={() => setMode("save")}>
            <span className="btn-icons">
              <InlineIcon size={30}>
                <Piggy />
              </InlineIcon>
              <span className="sr-only">
                {lang === "pl" ? "Oszczędzanie" : lang === "de" ? "Sparen" : "Saving"}
              </span>
            </span>
          </ToyButton>
          <ToyButton pressed={!save} onClick={() => setMode("loan")}>
            <span className="btn-icons">
              <InlineIcon size={30}>
                <Boat />
              </InlineIcon>
              <span className="sr-only">
                {lang === "pl" ? "Pożyczka" : lang === "de" ? "Geld leihen" : "Loan"}
              </span>
            </span>
          </ToyButton>
        </div>
        <Chart values={values} start={start} rate={rate} mode={mode} label={chartLabel} />
        <div className="ig-readout" role="status">
          <span className="ig-big">
            <InlineIcon size={30}>
              {save ? <Person {...CAST.Bea} /> : <Person {...CAST.Finn} />}
            </InlineIcon>
            {save
              ? lang === "pl"
                ? `Po ${years} latach: ${total} monet`
                : lang === "de"
                  ? `Nach ${years} Jahren: ${total} Münzen`
                  : `After ${years} years: ${total} coins`
              : lang === "pl"
                ? `Po ${years} latach Finn spłaca: ${total} monet`
                : lang === "de"
                  ? `Nach ${years} Jahren zahlt Finn zurück: ${total} Münzen`
                  : `After ${years} years Finn pays back: ${total} coins`}
          </span>
          <span className="ig-legend">
            <Swatch cls="ig-bar-start">
              {save
                ? lang === "pl"
                  ? `${start} wpłacono`
                  : lang === "de"
                    ? `${start} eingezahlt`
                    : `${start} put in`
                : lang === "pl"
                  ? `${start} pożyczono`
                  : lang === "de"
                    ? `${start} geliehen`
                    : `${start} borrowed`}
            </Swatch>
            <Swatch cls={`ig-bar-simple-${mode}`}>
              {lang === "pl"
                ? `${simple} odsetek`
                : lang === "de"
                  ? `${simple} Zinsen`
                  : `${simple} interest`}
            </Swatch>
            <Swatch cls={`ig-bar-comp-${mode}`}>
              {lang === "pl"
                ? `${onExtra} odsetek od odsetek`
                : lang === "de"
                  ? `${onExtra} Zinsen auf Zinsen`
                  : `${onExtra} interest on interest`}
            </Swatch>
          </span>
          <span className="ig-small">{ratePhrase(lang, rate)}</span>
        </div>
        <div className="ig-sliders">
          <Slider
            label={
              save
                ? lang === "pl"
                  ? "Wpłacone monety"
                  : lang === "de"
                    ? "Eingezahlte Münzen"
                    : "Coins put in"
                : lang === "pl"
                  ? "Pożyczone monety"
                  : lang === "de"
                    ? "Geliehene Münzen"
                    : "Coins borrowed"
            }
            value={start}
            min={10}
            max={200}
            step={10}
            onChange={setStart}
          />
          <Slider
            label={lang === "pl" ? "Odsetki (%)" : lang === "de" ? "Zinsen (%)" : "Interest (%)"}
            value={rate}
            min={0}
            max={10}
            onChange={setRate}
          />
          <Slider
            label={lang === "pl" ? "Lata" : lang === "de" ? "Jahre" : "Years"}
            value={years}
            min={1}
            max={20}
            onChange={setYears}
          />
        </div>
      </div>
    </Stage>
  );
}

export function GardenWidget({ lang, onAnswer }: WidgetProps) {
  const [rate, setRate] = useState(2);
  const [years, setYears] = useState(3);
  const values = grow(100, rate, years);
  const total = Math.round(values[years]);

  return (
    <>
      <Stage
        label={
          lang === "pl"
            ? "Ogród pieniędzy Bei"
            : lang === "de"
              ? "Beas Geldgarten"
              : "Bea's money garden"
        }
      >
        <div className="ig-wrap">
          <Chart
            values={values}
            start={100}
            rate={rate}
            mode="save"
            scaleMax={270}
            band={[TARGET_LOW, TARGET_HIGH]}
            label={
              lang === "pl"
                ? `Monety Bei po ${years} latach: ${total}. Cel to między ${TARGET_LOW} a ${TARGET_HIGH}.`
                : lang === "de"
                  ? `Beas Münzen nach ${years} Jahren: ${total}. Das Ziel liegt zwischen ${TARGET_LOW} und ${TARGET_HIGH}.`
                  : `Bea's coins after ${years} years: ${total}. The goal is between ${TARGET_LOW} and ${TARGET_HIGH}.`
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
              {lang === "pl"
                ? `Bea ma ${total} monet po ${years} latach`
                : lang === "de"
                  ? `Bea hat nach ${years} Jahren ${total} Münzen`
                  : `Bea has ${total} coins after ${years} years`}
            </span>
            <span className="ig-small">
              {lang === "pl"
                ? `Cel: zielony pasek, ${TARGET_LOW} do ${TARGET_HIGH} monet. ${ratePhrase(lang, rate)}`
                : lang === "de"
                  ? `Ziel: der grüne Streifen, ${TARGET_LOW} bis ${TARGET_HIGH} Münzen. ${ratePhrase(lang, rate)}`
                  : `Goal: the green stripe, ${TARGET_LOW} to ${TARGET_HIGH} coins. ${ratePhrase(lang, rate)}`}
            </span>
          </div>
          <div className="ig-sliders two">
            <Slider
              label={lang === "pl" ? "Odsetki (%)" : lang === "de" ? "Zinsen (%)" : "Interest (%)"}
              value={rate}
              min={0}
              max={10}
              onChange={setRate}
            />
            <Slider
              label={lang === "pl" ? "Lata" : lang === "de" ? "Jahre" : "Years"}
              value={years}
              min={1}
              max={10}
              onChange={setYears}
            />
          </div>
        </div>
      </Stage>
      <div className="row nav">
        <CheckButton lang={lang} onClick={() => onAnswer(reachesTarget(rate, years))} />
      </div>
    </>
  );
}
