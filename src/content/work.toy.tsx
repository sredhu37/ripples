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
  const pay = payPerHour(m);
  const p = pushes(m);

  const set = (patch: Partial<Market>) => {
    const next = { ...m, ...patch };
    setM(next);
    onChange?.(payPerHour(next));
  };

  const dirWord = (d: Arrow) => {
    if (lang === "pl") {
      return d === "up" ? "płaca rośnie" : d === "down" ? "płaca spada" : "płaca bez zmian";
    }
    if (lang === "de") {
      return d === "up" ? "Lohn steigt" : d === "down" ? "Lohn sinkt" : "Lohn bleibt gleich";
    }
    return d === "up" ? "pushes pay up" : d === "down" ? "pushes pay down" : "pay stays the same";
  };

  const payUnit = () => {
    if (lang === "pl") {
      return pay === 1 ? "moneta za godzinę" : pay >= 2 && pay <= 4 ? "monety za godzinę" : "monet za godzinę";
    }
    if (lang === "de") {
      return pay === 1 ? "Münze pro Stunde" : "Münzen pro Stunde";
    }
    return pay === 1 ? "coin per hour" : "coins per hour";
  };

  const hoursText = () => {
    if (lang === "pl") {
      return `4 godziny pracy: ${pay * 4} monet`;
    }
    if (lang === "de") {
      return `4 Stunden Arbeit: ${pay * 4} Münzen`;
    }
    return `4 hours of work: ${pay * 4} coins`;
  };

  return (
    <>
      <Stage
        label={
          lang === "pl"
            ? "Zawód: naprawa łodzi"
            : lang === "de"
            ? "Beruf: Boote reparieren"
            : "Boat fixing job"
        }
      >
        <div className="job">
          <div className="job-title">
            <InlineIcon size={34}>
              <Boat />
            </InlineIcon>
            <InlineIcon size={30}>
              <Wrench />
            </InlineIcon>
            <span>
              {lang === "pl"
                ? "Zawód: naprawa łodzi"
                : lang === "de"
                ? "Beruf: Boote reparieren"
                : "Job: fix boats"}
            </span>
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
              {pay} {payUnit()}
            </strong>
            <span>{hoursText()}</span>
          </div>
          <div className="job-reasons">
            <Reason
              lead={dirWord(p.years)}
              label={
                lang === "pl"
                  ? "Długo się uczy"
                  : lang === "de"
                  ? "Lange lernen"
                  : "Long to learn"
              }
              arrow={p.years}
              count={m.years}
              head={<GradCap />}
              item={<Calendar />}
            />
            <Reason
              lead={dirWord(p.people)}
              label={
                lang === "pl"
                  ? "Niewielu to potrafi"
                  : lang === "de"
                  ? "Wenige können es"
                  : "Few can do it"
              }
              arrow={p.people}
              count={m.people}
              head={<Person {...FIXER} />}
              item={<Person {...FIXER} />}
            />
            <Reason
              lead={dirWord(p.need)}
              label={
                lang === "pl"
                  ? "Miasto tego potrzebuje"
                  : lang === "de"
                  ? "Wird gebraucht"
                  : "Town needs it"
              }
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
          label={
            lang === "pl"
              ? "Lata nauki zawodu"
              : lang === "de"
              ? "Jahre zum Lernen"
              : "Years to learn the job"
          }
          value={m.years}
          min={1}
          max={4}
          onChange={(years) => set({ years })}
          left={lang === "pl" ? "krótko" : lang === "de" ? "schnell" : "quick"}
          right={lang === "pl" ? "długo" : lang === "de" ? "lange" : "long"}
        />
        <Slider
          label={
            lang === "pl"
              ? "Liczba naprawiaczy łodzi"
              : lang === "de"
              ? "Leute, die Boote reparieren"
              : "People who fix boats"
          }
          value={m.people}
          min={1}
          max={7}
          onChange={(people) => set({ people })}
          left={lang === "pl" ? "mało" : lang === "de" ? "wenige" : "few"}
          right={lang === "pl" ? "dużo" : lang === "de" ? "viele" : "many"}
        />
        <Slider
          label={
            lang === "pl"
              ? "Zapotrzebowanie na pracę"
              : lang === "de"
              ? "Wie sehr man es braucht"
              : "How much it is needed"
          }
          value={m.need}
          min={1}
          max={3}
          onChange={(need) => set({ need })}
          left={lang === "pl" ? "małe" : lang === "de" ? "ein wenig" : "a little"}
          right={lang === "pl" ? "duże" : lang === "de" ? "sehr" : "a lot"}
        />
      </div>
    </>
  );
}
