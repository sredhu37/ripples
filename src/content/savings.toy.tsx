import { useState } from "react";
import type { ReactNode } from "react";
import { CAST } from "../components/cast";
import { Coin, InlineIcon, Person } from "../components/icons";
import { Slider, Stage, ToyButton } from "../lesson/toolkit";
import type { Text } from "../lesson/types";
import type { Lang } from "../progress";
import { Bike, BikePiggy, Calendar, Candy, RainCloud, RainyJar } from "./savings.icons";
import "./savings.css";

const T = (en: string, de: string): Text => ({ en, de });

export const POCKET = 4; // coins of pocket money each week
export const BIKE = 12; // price of the bike in coins
const RAIN_WEEK = 4; // week in which the surprise happens
const RAIN_COST = 3; // what the surprise costs
const WEEKS = 15; // columns shown

export interface PlanWeek {
  n: number;
  bike: number;
  rainy: number;
  rain: boolean;
  buy: boolean;
}

export type RainPaidBy = "none" | "rainy" | "bike" | "mix" | "short";

export interface Plan {
  weeks: PlanWeek[];
  /** Week in which the bike is bought, or null if it is not bought within WEEKS. */
  bikeWeek: number | null;
  /** Coins left for sweets each week. */
  treats: number;
  /** Coins really put into the bike jar each week. */
  saved: number;
  rainPaidBy: RainPaidBy;
}

/**
 * Pip gets POCKET coins each week. `save` coins go to the bike jar.
 * With a cushion, 1 coin each week goes to the rainy-day jar first, the rest is for sweets.
 * Saved coins stay the same (no interest in this lesson).
 */
export function plan(save: number, cushion: boolean, rain: boolean): Plan {
  const keep = cushion ? 1 : 0;
  const saved = Math.max(0, Math.min(save, POCKET - keep));
  let bike = 0;
  let rainy = 0;
  let bikeWeek: number | null = null;
  let rainPaidBy: RainPaidBy = "none";
  const weeks: PlanWeek[] = [];
  for (let n = 1; n <= WEEKS; n++) {
    if (bikeWeek === null) bike += saved;
    rainy += keep;
    const isRain = rain && n === RAIN_WEEK;
    if (isRain) {
      if (rainy >= RAIN_COST) {
        rainy -= RAIN_COST;
        rainPaidBy = "rainy";
      } else if (rainy + bike >= RAIN_COST) {
        bike -= RAIN_COST - rainy;
        rainPaidBy = rainy > 0 ? "mix" : "bike";
        rainy = 0;
      } else {
        rainPaidBy = "short";
      }
    }
    let buy = false;
    if (bikeWeek === null && saved > 0 && bike >= BIKE) {
      bike -= BIKE;
      bikeWeek = n;
      buy = true;
    }
    weeks.push({ n, bike, rainy, rain: isRain, buy });
  }
  return { weeks, bikeWeek, treats: POCKET - saved - keep, saved, rainPaidBy };
}

function statusText(p: Plan, rain: boolean): Text {
  const parts: Text[] = [];
  if (p.saved === 0) {
    parts.push(T("Pip saves nothing, so the bike never gets closer.", "Pip spart nichts, also kommt das Fahrrad nie näher."));
  } else if (p.bikeWeek === null) {
    parts.push(
      T(
        `That is too slow: the bike needs more than ${WEEKS} weeks.`,
        `Das ist zu langsam: Pip braucht für das Fahrrad mehr als ${WEEKS} Wochen.`,
      ),
    );
  } else {
    parts.push(T(`Pip buys the bike in week ${p.bikeWeek}.`, `Pip kauft das Fahrrad in Woche ${p.bikeWeek}.`));
  }
  if (rain) {
    const by: Record<RainPaidBy, Text> = {
      none: T("", ""),
      rainy: T(
        `Rain in week ${RAIN_WEEK}! The rainy-day jar pays ${RAIN_COST} coins. The bike plan is safe.`,
        `Regen in Woche ${RAIN_WEEK}! Das Regentag-Glas zahlt ${RAIN_COST} Münzen. Der Fahrrad-Plan bleibt sicher.`,
      ),
      mix: T(
        `Rain in week ${RAIN_WEEK}! The rainy-day jar is too small, so the bike jar helps. The bike comes later.`,
        `Regen in Woche ${RAIN_WEEK}! Das Regentag-Glas ist zu klein, also hilft das Fahrrad-Glas. Das Fahrrad kommt später.`,
      ),
      bike: T(
        `Rain in week ${RAIN_WEEK}! The bike jar pays ${RAIN_COST} coins, so the bike comes later.`,
        `Regen in Woche ${RAIN_WEEK}! Das Fahrrad-Glas zahlt ${RAIN_COST} Münzen, darum kommt das Fahrrad später.`,
      ),
      short: T(
        `Rain in week ${RAIN_WEEK}! Pip has no saved coins for the fix and must wait.`,
        `Regen in Woche ${RAIN_WEEK}! Pip hat keine gesparten Münzen für die Reparatur und muss warten.`,
      ),
    };
    parts.push(by[p.rainPaidBy]);
  }
  return T(
    parts.map((x) => x.en).join(" "),
    parts.map((x) => x.de).join(" "),
  );
}


/** One small icon on a toy tile. */
function Ico({ size = 28, children }: { size?: number; children: ReactNode }) {
  return <InlineIcon size={size}>{children}</InlineIcon>;
}

/** The four weekly coins, each one shown by where it goes: bike piggy bank, rainy-day jar or sweet. */
function Split({ lang, saved, keep, treats }: { lang: Lang; saved: number; keep: number; treats: number }) {
  const tiles: ("bike" | "rain" | "treat")[] = [
    ...Array<"bike">(saved).fill("bike"),
    ...Array<"rain">(keep).fill("rain"),
    ...Array<"treat">(treats).fill("treat"),
  ];
  const en = lang === "en";
  return (
    <div className="sv-split">
      <span className="sv-split-label">
        <Ico size={26}>
          <Calendar />
        </Ico>
        <span>{en ? "Each week" : "Jede Woche"}</span>
      </span>
      {tiles.map((k, i) => (
        <span key={i} className={`sv-tile sv-tile-${k}`}>
          <Ico size={30}>{k === "bike" ? <BikePiggy /> : k === "rain" ? <RainyJar /> : <Candy />}</Ico>
        </span>
      ))}
    </div>
  );
}

export function Planner({
  lang,
  full,
  save,
  setSave,
}: {
  lang: Lang;
  full: boolean;
  save: number;
  setSave: (v: number) => void;
}) {
  const [cushion, setCushion] = useState(false);
  const [rain, setRain] = useState(false);
  const max = POCKET - (cushion ? 1 : 0);
  const eff = Math.min(save, max);
  const p = plan(eff, cushion, rain);
  const en = lang === "en";

  return (
    <Stage label={en ? "Pip's pocket money planner" : "Pips Taschengeld-Planer"}>
      <div className="sv">
        <div className="sv-facts">
          <span className="sv-fact">
            <Ico>
              <Person {...CAST.Pip} />
            </Ico>
            {en ? "Pocket money" : "Taschengeld"}: {POCKET}
            <Ico size={24}>
              <Coin />
            </Ico>
            {en ? "a week" : "pro Woche"}
          </span>
          <span className="sv-fact">
            <Ico>
              <Bike />
            </Ico>
            {en ? "Bike" : "Fahrrad"}: {BIKE}
            <Ico size={24}>
              <Coin />
            </Ico>
          </span>
        </div>
        <Split lang={lang} saved={p.saved} keep={cushion ? 1 : 0} treats={p.treats} />
        <div className="sv-grid" aria-hidden="true">
          <span className="sv-head">
            <Ico size={26}>
              <Calendar />
            </Ico>
          </span>
          {p.weeks.map((w) => (
            <span
              key={`w${w.n}`}
              className={`sv-cell sv-week${w.buy ? " sv-buy" : ""}${w.rain ? " sv-rain" : ""}`}
            >
              {w.buy && w.rain ? (
                <>
                  <Ico size={17}>
                    <Bike />
                  </Ico>
                  <Ico size={17}>
                    <RainCloud />
                  </Ico>
                </>
              ) : w.buy ? (
                <Ico size={24}>
                  <Bike />
                </Ico>
              ) : w.rain ? (
                <Ico size={24}>
                  <RainCloud />
                </Ico>
              ) : (
                w.n
              )}
            </span>
          ))}
          <span className="sv-head">
            <Ico size={30}>
              <BikePiggy />
            </Ico>
          </span>
          {p.weeks.map((w) => (
            <span key={`b${w.n}`} className={`sv-cell${p.bikeWeek !== null && w.n > p.bikeWeek ? " sv-done" : ""}`}>
              {w.bike}
            </span>
          ))}
          {full && cushion && (
            <>
              <span className="sv-head">
                <Ico size={30}>
                  <RainyJar />
                </Ico>
              </span>
              {p.weeks.map((w) => (
                <span key={`r${w.n}`} className="sv-cell">
                  {w.rainy}
                </span>
              ))}
            </>
          )}
        </div>
        <p className="sv-say" role="status">
          {statusText(p, rain)[lang]}
        </p>
        <div className="sv-controls">
          <Slider
            label={en ? "Coins saved for the bike each week" : "Münzen pro Woche fürs Fahrrad gespart"}
            value={eff}
            min={0}
            max={max}
            onChange={setSave}
            left={en ? "more sweets" : "mehr Naschen"}
            right={en ? "bike sooner" : "Fahrrad früher"}
          />
          {full && (
            <div className="row wrap">
              <ToyButton pressed={cushion} onClick={() => setCushion(!cushion)}>
                <span className="btn-icons">
                  <Ico size={30}>
                    <RainyJar />
                  </Ico>
                  {en
                    ? cushion
                      ? "Rainy-day jar: ON"
                      : "Rainy-day jar: OFF"
                    : cushion
                      ? "Regentag-Glas: AN"
                      : "Regentag-Glas: AUS"}
                </span>
              </ToyButton>
              <ToyButton pressed={rain} onClick={() => setRain(!rain)}>
                <span className="btn-icons">
                  <Ico size={30}>
                    <RainCloud />
                  </Ico>
                  {en
                    ? rain
                      ? "Rain in week 4: ON"
                      : "Rain in week 4: OFF"
                    : rain
                      ? "Regen in Woche 4: AN"
                      : "Regen in Woche 4: AUS"}
                </span>
              </ToyButton>
            </div>
          )}
        </div>
      </div>
    </Stage>
  );
}
