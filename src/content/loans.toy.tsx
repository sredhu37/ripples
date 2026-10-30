import { useState } from "react";
import { CAST } from "../components/cast";
import { Bread, Clock, Coin, Person, Tag } from "../components/icons";
import type { Mood } from "../components/icons";
import { Slider, Stage } from "../lesson/toolkit";
import type { Lang } from "../progress";
import { ExtraRing, Oven, Plus } from "./loans.icons";
import "./loans.css";

/** The oven costs this many coins. */
export const OVEN_COST = 40;
/** What the new oven adds to Bea's bread sales each week. */
export const SALES_PER_WEEK = 8;
/** Toy rule: the lender asks 1 extra coin for every 10 coins, for every 4 weeks of waiting. */
const COINS_PER_EXTRA = 10;
const WEEKS_PER_EXTRA = 4;
const BAR_MAX = 24;

export interface Plan {
  extra: number;
  total: number;
  weekly: number;
  ovenBought: boolean;
  leftOver: number;
  covered: boolean;
  shortBy: number;
}

/** Pure toy maths. coins is a multiple of 10, weeks a multiple of 4. */
export function plan(coins: number, weeks: number): Plan {
  const extra = (coins / COINS_PER_EXTRA) * (weeks / WEEKS_PER_EXTRA);
  const total = coins + extra;
  const weekly = Math.ceil(total / weeks);
  return {
    extra,
    total,
    weekly,
    ovenBought: coins >= OVEN_COST,
    leftOver: Math.max(0, coins - OVEN_COST),
    covered: weekly <= SALES_PER_WEEK,
    shortBy: Math.max(0, weekly - SALES_PER_WEEK),
  };
}

function sayFor(p: Plan, lang: Lang): { text: string; ok: boolean } {
  if (!p.ovenBought) {
    return {
      ok: false,
      text:
        lang === "en"
          ? `Not enough for the oven yet. It costs ${OVEN_COST} coins.`
          : `Das reicht noch nicht für den Ofen. Er kostet ${OVEN_COST} Münzen.`,
    };
  }
  if (!p.covered) {
    return {
      ok: false,
      text:
        lang === "en"
          ? `Too much each week! Bea's bread money is ${p.shortBy} coin${p.shortBy === 1 ? "" : "s"} short every week.`
          : `Pro Woche zu viel! Beas Brotgeld fehlt jede Woche ${p.shortBy} ${p.shortBy === 1 ? "Münze" : "Münzen"}.`,
    };
  }
  if (p.leftOver > 0) {
    return {
      ok: true,
      text:
        lang === "en"
          ? `Bea can pay each week. But ${p.leftOver} borrowed coins are left over, and she pays them back too!`
          : `Bea kann jede Woche zahlen. Aber ${p.leftOver} geliehene Münzen bleiben übrig, und die zahlt sie auch zurück!`,
    };
  }
  return {
    ok: true,
    text:
      lang === "en"
        ? "Bea buys the oven and her bread money pays each week. It works!"
        : "Bea kauft den Ofen und ihr Brotgeld zahlt jede Woche. Es klappt!",
  };
}

const X0 = 96;
const UNIT = 20;

/** A coin with a number next to it, drawn in the toy picture. */
function CoinNum({ x, y, n, size = 38, plus }: { x: number; y: number; n: number; size?: number; plus?: boolean }) {
  return (
    <g>
      {plus && <Plus x={x - 34} y={y + 4} size={28} />}
      <Coin x={x} y={y} size={size} />
      <text className="diagram-name" x={x + size + 8} y={y + size * 0.72} style={{ fontSize: 26 }}>
        {n}
      </text>
    </g>
  );
}

interface LoanBoardProps {
  lang: Lang;
  coins: number;
  weeks: number;
  onCoins: (v: number) => void;
  onWeeks: (v: number) => void;
}

/** Bea chooses a loan size and how many weeks to pay it back. */
export function LoanBoard({ lang, coins, weeks, onCoins, onWeeks }: LoanBoardProps) {
  const p = plan(coins, weeks);
  const say = sayFor(p, lang);
  const en = lang === "en";
  const mood: Mood = !p.ovenBought ? "think" : p.covered ? "happy" : "sad";
  const barW = (n: number) => Math.min(BAR_MAX, n) * UNIT;
  const limitX = X0 + SALES_PER_WEEK * UNIT;

  return (
    <Stage label={en ? "Bea's loan" : "Beas Darlehen"}>
      <div className="loan">
        <div className="loan-sliders">
          <Slider
            label={en ? "Coins Bea borrows" : "Münzen, die Bea leiht"}
            value={coins}
            min={10}
            max={80}
            step={10}
            onChange={onCoins}
          />
          <Slider
            label={en ? "Weeks to pay back" : "Wochen zum Zurückzahlen"}
            value={weeks}
            min={4}
            max={20}
            step={4}
            onChange={onWeeks}
          />
        </div>
        <svg
          className="diagram loan-picture"
          viewBox="0 0 640 238"
          role="img"
          aria-label={
            en
              ? `Pim lends Bea ${coins} coins. The extra is ${p.extra} coins, so Bea pays back ${p.total} coins in total, ${p.weekly} coins each week for ${weeks} weeks. Her bread sales are ${SALES_PER_WEEK} coins each week.`
              : `Pim leiht Bea ${coins} Münzen. Das Extra sind ${p.extra} Münzen, also zahlt Bea insgesamt ${p.total} Münzen zurück, jede Woche ${p.weekly} Münzen, ${weeks} Wochen lang. Ihr Brotverkauf bringt ${SALES_PER_WEEK} Münzen pro Woche.`
          }
        >
          {/* Pim lends coins to Bea, Bea has the oven */}
          <Person {...CAST.Pim} x={6} y={4} size={96} />
          <CoinNum x={110} y={6} n={coins} />
          <path d="M108 68 H200" stroke="#23383f" strokeWidth="5" strokeLinecap="round" />
          <polygon points="214,68 198,59 198,77" fill="#23383f" stroke="#23383f" strokeWidth="2" strokeLinejoin="round" />
          <Person {...CAST.Bea} mood={mood} x={216} y={4} size={96} />
          <g opacity={p.ovenBought ? 1 : 0.28}>
            <Oven x={318} y={14} size={86} />
          </g>
          {!p.ovenBought && (
            <g>
              <circle cx="361" cy="57" r="36" fill="none" stroke="#d6403a" strokeWidth="7" />
              <path d="M336 32 L386 82" stroke="#d6403a" strokeWidth="7" strokeLinecap="round" />
            </g>
          )}
          {p.leftOver > 0 && (
            <g>
              <Coin x={414} y={22} size={34} />
              <text className="diagram-name" x="431" y="80" textAnchor="middle" style={{ fontSize: 22 }}>
                {p.leftOver}
              </text>
            </g>
          )}

          {/* what Bea pays back in total */}
          <g>
            <rect x="468" y="4" width="166" height="108" rx="16" fill="#fff" stroke="#23383f" strokeWidth="3" />
            <CoinNum x={484} y={10} n={coins} size={30} />
            <g>
              <Plus x={470} y={46} size={24} />
              <Coin x={494} y={42} size={30} />
              <ExtraRing x={491} y={39} size={36} />
              <text className="diagram-name" x="536" y="66" style={{ fontSize: 26 }}>
                {p.extra}
              </text>
            </g>
            <path d="M480 80 H622" stroke="#23383f" strokeWidth="3" strokeDasharray="6 5" />
            <CoinNum x={484} y={82} n={p.total} size={26} />
            <Tag x={572} y={76} size={44} />
          </g>

          {/* weekly payment against weekly bread sales */}
          <line x1={limitX} y1="124" x2={limitX} y2="232" stroke="#357a3e" strokeWidth="3" strokeDasharray="7 6" />
          <Coin x={8} y={126} size={30} />
          <Clock x={42} y={126} size={30} />
          <rect x={X0} y="124" width={barW(p.weekly)} height="42" rx="10" fill="#f08a2e" />
          <text className="diagram-name" x={X0 + barW(p.weekly) + 10} y="154" style={{ fontSize: 26 }}>
            {p.weekly}
          </text>
          <Bread x={8} y={184} size={30} />
          <Clock x={42} y={184} size={30} />
          <rect x={X0} y="182" width={barW(SALES_PER_WEEK)} height="42" rx="10" fill="#4fa75a" />
          <text className="diagram-name" x={X0 + barW(SALES_PER_WEEK) + 10} y="212" style={{ fontSize: 26 }}>
            {SALES_PER_WEEK}
          </text>
        </svg>
        <p className={`loan-say ${say.ok ? "ok" : "bad"}`} role="status">
          {say.text}
        </p>
      </div>
    </Stage>
  );
}

export function Toy({ lang }: { lang: Lang }) {
  const [coins, setCoins] = useState(30);
  const [weeks, setWeeks] = useState(4);
  return <LoanBoard lang={lang} coins={coins} weeks={weeks} onCoins={setCoins} onWeeks={setWeeks} />;
}
