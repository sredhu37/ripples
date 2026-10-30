import { useState } from "react";
import type { ReactElement } from "react";
import { Coin, InlineIcon, Person } from "../components/icons";
import { Slider, Stage } from "../lesson/toolkit";
import type { Lang } from "../progress";
import { ArrowIcon, Boat, Calendar, FIXER, GradCap, Wrench } from "./work.icons";
import type { Dir } from "./work.icons";
import "./work.css";

/** The town's job market for boat fixing. Three things decide the pay. */
export interface Market {
  /** Years it takes to learn the job (1 to 4) */
  years: number;
  /** Boat fixers in town (1 to 7). Four is a normal number. */
  people: number;
  /** How much the town needs boats fixed (1 = a little, 3 = a lot) */
  need: number;
}

export const NORMAL_PEOPLE = 4;

/** Coins per hour. Longer to learn, fewer people and more need all push the pay up. */
export function payPerHour(m: Market): number {
  return Math.max(1, 1 + m.years + m.need + (NORMAL_PEOPLE - m.people));
}

type Arrow = Dir;

/** Compared with a normal job (2 years, 4 people, medium need), does each reason push pay up or down? */
export function pushes(m: Market): { years: Arrow; people: Arrow; need: Arrow } {
  const a = (n: number): Arrow => (n > 0 ? "up" : n < 0 ? "down" : "same");
  return {
    years: a(m.years - 2),
    people: a(NORMAL_PEOPLE - m.people),
    need: a(m.need - 2),
  };
}

export const NORMAL: Market = { years: 2, people: NORMAL_PEOPLE, need: 2 };
/** Boat fixing starts out badly paid: quick to learn, too many fixers, nobody needs it much. */
export const LOW_PAY: Market = { years: 1, people: 6, need: 1 };

function Reason({
  lead,
  label,
  arrow,
  count,
  head,
  item,
}: {
  lead: string;
  label: string;
  arrow: Arrow;
  count: number;
  head: ReactElement;
  item: ReactElement;
}) {
  return (
    <div className={`job-reason job-${arrow}`}>
      <div className="job-reason-head">
        <InlineIcon size={30}>{head}</InlineIcon>
        <span>{label}</span>
        <InlineIcon size={26}>
          <ArrowIcon dir={arrow} />
        </InlineIcon>
        <span className="sr-only">{lead}</span>
      </div>
      <div className="job-reason-row" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <InlineIcon key={i} size={28}>
            {item}
          </InlineIcon>
        ))}
      </div>
    </div>
  );
}

export function JobMarket({ lang, start, onChange }: { lang: Lang; start: Market; onChange?: (pay: number) => void }) {
  const [m, setM] = useState<Market>(start);
  const en = lang === "en";
  const pay = payPerHour(m);
  const p = pushes(m);

  const set = (patch: Partial<Market>) => {
    const next = { ...m, ...patch };
    setM(next);
    onChange?.(payPerHour(next));
  };

  const dirWord = (d: Arrow) =>
    en ? (d === "up" ? "pushes pay up" : d === "down" ? "pushes pay down" : "pay stays the same") : d === "up" ? "Lohn steigt" : d === "down" ? "Lohn sinkt" : "Lohn bleibt gleich";

  return (
    <>
      <Stage label={en ? "Boat fixing job" : "Beruf: Boote reparieren"}>
        <div className="job">
          <div className="job-title">
            <InlineIcon size={34}>
              <Boat />
            </InlineIcon>
            <InlineIcon size={30}>
              <Wrench />
            </InlineIcon>
            <span>{en ? "Job: fix boats" : "Beruf: Boote reparieren"}</span>
          </div>
          <div className="job-pay" role="status">
            <span className="job-coins" aria-hidden="true">
              {Array.from({ length: pay }, (_, i) => (
                <InlineIcon key={i} size={26}>
                  <Coin />
                </InlineIcon>
              ))}
            </span>
            <strong>
              {pay} {en ? (pay === 1 ? "coin per hour" : "coins per hour") : pay === 1 ? "Münze pro Stunde" : "Münzen pro Stunde"}
            </strong>
            <span>{en ? `4 hours of work: ${pay * 4} coins` : `4 Stunden Arbeit: ${pay * 4} Münzen`}</span>
          </div>
          <div className="job-reasons">
            <Reason
              lead={dirWord(p.years)}
              label={en ? "Long to learn" : "Lange lernen"}
              arrow={p.years}
              count={m.years}
              head={<GradCap />}
              item={<Calendar />}
            />
            <Reason
              lead={dirWord(p.people)}
              label={en ? "Few can do it" : "Wenige können es"}
              arrow={p.people}
              count={m.people}
              head={<Person {...FIXER} />}
              item={<Person {...FIXER} />}
            />
            <Reason
              lead={dirWord(p.need)}
              label={en ? "Town needs it" : "Wird gebraucht"}
              arrow={p.need}
              count={m.need}
              head={<Boat />}
              item={<Boat />}
            />
          </div>
        </div>
      </Stage>
      <div className="job-sliders">
        <Slider
          label={en ? "Years to learn the job" : "Jahre zum Lernen"}
          value={m.years}
          min={1}
          max={4}
          onChange={(years) => set({ years })}
          left={en ? "quick" : "schnell"}
          right={en ? "long" : "lange"}
        />
        <Slider
          label={en ? "People who fix boats" : "Leute, die Boote reparieren"}
          value={m.people}
          min={1}
          max={7}
          onChange={(people) => set({ people })}
          left={en ? "few" : "wenige"}
          right={en ? "many" : "viele"}
        />
        <Slider
          label={en ? "How much it is needed" : "Wie sehr man es braucht"}
          value={m.need}
          min={1}
          max={3}
          onChange={(need) => set({ need })}
          left={en ? "a little" : "ein wenig"}
          right={en ? "a lot" : "sehr"}
        />
      </div>
    </>
  );
}
