import { useState } from "react";
import { CheckButton, Slider, Stage } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import type { Lang } from "../progress";
import "./work.css";

const T = (en: string, de: string): Text => ({ en, de });

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

type Arrow = "up" | "same" | "down";

/** Compared with a normal job (2 years, 4 people, medium need), does each reason push pay up or down? */
export function pushes(m: Market): { years: Arrow; people: Arrow; need: Arrow } {
  const a = (n: number): Arrow => (n > 0 ? "up" : n < 0 ? "down" : "same");
  return {
    years: a(m.years - 2),
    people: a(NORMAL_PEOPLE - m.people),
    need: a(m.need - 2),
  };
}

const ARROW: Record<Arrow, string> = { up: "⬆️", same: "➡️", down: "⬇️" };

const NORMAL: Market = { years: 2, people: NORMAL_PEOPLE, need: 2 };
/** Boat fixing starts out badly paid: quick to learn, too many fixers, nobody needs it much. */
export const LOW_PAY: Market = { years: 1, people: 6, need: 1 };

function Reason({ icon, label, arrow }: { icon: string; label: string; arrow: Arrow }) {
  return (
    <div className={`job-reason job-${arrow}`}>
      <span className="job-reason-icon" aria-hidden="true">
        {icon}
      </span>
      <span>{label}</span>
      <span aria-hidden="true">{ARROW[arrow]}</span>
    </div>
  );
}

function JobMarket({ lang, start, onChange }: { lang: Lang; start: Market; onChange?: (pay: number) => void }) {
  const [m, setM] = useState<Market>(start);
  const en = lang === "en";
  const pay = payPerHour(m);
  const p = pushes(m);

  const set = (patch: Partial<Market>) => {
    const next = { ...m, ...patch };
    setM(next);
    onChange?.(payPerHour(next));
  };

  return (
    <>
      <Stage label={en ? "Boat fixing job" : "Job: Boote reparieren"}>
        <div className="job">
          <div className="job-title">
            <span aria-hidden="true">🛶🔧</span> {en ? "Job: fix boats" : "Job: Boote reparieren"}
          </div>
          <div className="job-pay" role="status">
            <span className="job-coins" aria-hidden="true">
              {"🪙".repeat(pay)}
            </span>
            <strong>
              {pay} {en ? (pay === 1 ? "coin per hour" : "coins per hour") : pay === 1 ? "Münze pro Stunde" : "Münzen pro Stunde"}
            </strong>
            <span>{en ? `4 hours of work: ${pay * 4} coins` : `4 Stunden Arbeit: ${pay * 4} Münzen`}</span>
          </div>
          <div className="job-reasons">
            <Reason icon="🎓" label={en ? "Long to learn" : "Lange lernen"} arrow={p.years} />
            <Reason icon="☝️" label={en ? "Few can do it" : "Wenige können es"} arrow={p.people} />
            <Reason icon="🛶" label={en ? "Town needs it" : "Wird gebraucht"} arrow={p.need} />
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

function Toy({ lang }: ToyProps) {
  return <JobMarket lang={lang} start={NORMAL} />;
}

function PayMoreWidget({ lang, onAnswer }: WidgetProps) {
  const [pay, setPay] = useState(payPerHour(LOW_PAY));
  return (
    <>
      <JobMarket lang={lang} start={LOW_PAY} onChange={setPay} />
      <div className="row nav">
        <CheckButton lang={lang} onClick={() => onAnswer(pay > payPerHour(LOW_PAY))} />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "work",
  story: [
    {
      scene: "🧔🎣  👩‍🍳🥖  🧑👟",
      text: T(
        "Finn catches fish. Bea bakes bread. Sam makes shoes. Doing work like this is called having a job.",
        "Finn fängt Fische. Bea backt Brot. Sam macht Schuhe. Wer solche Arbeit macht, hat einen Job.",
      ),
    },
    {
      scene: "👩‍🍳🥖 ➡️ 🧑 🪙🪙🪙",
      text: T(
        "People want Bea's bread, so they pay her coins. That is pay: coins for work that other people value.",
        "Die Leute wollen Beas Brot, also zahlen sie ihr Münzen. Das ist Lohn: Münzen für Arbeit, die anderen etwas wert ist.",
      ),
    },
    {
      scene: "⏰⏰⏰⏰  🪙🪙🪙 × 4 = 12",
      text: T(
        "Pay often counts hours. Bea works 4 hours and gets 3 coins for each hour. That makes 12 coins.",
        "Oft zählt man die Stunden. Bea arbeitet 4 Stunden und bekommt 3 Münzen pro Stunde. Das sind 12 Münzen.",
      ),
    },
    {
      scene: "🧑👟 🪙🪙🪙🪙🪙 ⏰ ❓",
      mood: "think",
      text: T(
        "But Sam gets 5 coins an hour! Why does one job pay more than another? There are three reasons.",
        "Aber Sam bekommt 5 Münzen pro Stunde! Warum zahlt ein Job mehr als ein anderer? Es gibt drei Gründe.",
      ),
    },
    {
      scene: "🎓⏳ 👟",
      text: T(
        "Reason one: learning time. Sam practiced for years to make good shoes. The longer a job takes to learn, the more it usually pays.",
        "Grund eins: Lernzeit. Sam hat jahrelang geübt, um gute Schuhe zu machen. Je länger man einen Job lernt, desto mehr zahlt er meistens.",
      ),
    },
    {
      scene: "🛶🔧 ☝️",
      text: T(
        "Reason two: how many people can do it. If only a few can fix boats, the town pays more for one. If many can, each gets less.",
        "Grund zwei: wie viele Leute es können. Können nur wenige Boote reparieren, zahlt die Stadt für einen mehr. Können es viele, bekommt jeder weniger.",
      ),
    },
    {
      scene: "🛶💥🛶💥 ➡️ 🪙🪙🪙🪙",
      text: T(
        "Reason three: how much people need the result. The more the town needs its boats fixed, the more coins that work is worth.",
        "Grund drei: wie sehr die Leute das Ergebnis brauchen. Je dringender die Stadt ihre Boote repariert haben will, desto mehr Münzen ist die Arbeit wert.",
      ),
    },
    {
      scene: "🪙🪙🪙🪙 ➡️ 🍞  🐷",
      text: T(
        "The coins you earn are yours. You can spend them, like on bread, or keep some for later.",
        "Die Münzen, die du verdienst, gehören dir. Du kannst sie ausgeben, zum Beispiel für Brot, oder einen Teil für später aufheben.",
      ),
    },
  ],
  toyIntro: T(
    "Boat fixing is a job in Ripple Town. Move the three sliders and watch the pay change.",
    "Boote reparieren ist ein Job in Ripple Town. Schiebe die drei Regler und schau, wie sich der Lohn verändert.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Sam spent three years learning to make shoes. Tim's job took one afternoon to learn. Which job usually pays more per hour?",
        "Sam hat drei Jahre lang gelernt, Schuhe zu machen. Tims Job hat man an einem Nachmittag gelernt. Welcher Job zahlt meistens mehr pro Stunde?",
      ),
      options: [
        { text: T("Tim's job, learned in one afternoon", "Tims Job, an einem Nachmittag gelernt") },
        { text: T("Sam's job, learned in three years", "Sams Job, in drei Jahren gelernt"), correct: true },
        { text: T("They always pay exactly the same", "Sie zahlen immer genau gleich viel") },
      ],
      hint: T(
        "A job that takes years to learn is harder to find people for. So it usually pays more per hour.",
        "Für einen Job, den man Jahre lernt, findet man schwerer Leute. Darum zahlt er meistens mehr pro Stunde.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Boat fixers only get 1 coin an hour right now. Move the sliders so that boat fixing pays more. Then press Check.",
        "Wer Boote repariert, bekommt gerade nur 1 Münze pro Stunde. Verschiebe die Regler so, dass die Arbeit mehr Lohn bringt. Drücke dann Prüfen.",
      ),
      Widget: PayMoreWidget,
      hint: T(
        "The pay is still 1 coin. It goes up when fewer people can do the job, when it takes longer to learn, or when the town needs it more.",
        "Der Lohn ist noch 1 Münze. Er steigt, wenn weniger Leute den Job können, wenn man ihn länger lernt oder wenn die Stadt ihn mehr braucht.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Suddenly the whole town needs its boats fixed. But there are still only 3 boat fixers. What happens to their pay?",
        "Plötzlich will die ganze Stadt ihre Boote repariert haben. Aber es gibt immer noch nur 3 Leute, die Boote reparieren. Was passiert mit ihrem Lohn?",
      ),
      options: [
        { text: T("It goes up", "Er steigt"), correct: true },
        { text: T("It goes down", "Er sinkt") },
        { text: T("It stays exactly the same", "Er bleibt genau gleich") },
      ],
      hint: T(
        "Lots of work and only a few people who can do it. So the town has to pay more coins to get a boat fixed.",
        "Viel Arbeit und nur wenige, die sie können. Darum muss die Stadt mehr Münzen zahlen, damit ein Boot repariert wird.",
      ),
    },
  ],
  askDad: T(
    "What was your first job, and what did you get paid for it? What did you have to learn for the job you do now, and how long did that take?",
    "Was war dein erster Job, und was hast du dafür bekommen? Was musstest du für deinen Job heute lernen, und wie lange hat das gedauert?",
  ),
  realLife: {
    title: T("Pay in Germany", "Lohn in Deutschland"),
    body: T(
      "Most workers in Germany must get at least the Mindestlohn (minimum wage): about 13.90 euros for each hour in October 2026. In January 2027 it goes up to 14.60 euros. These are \"brutto\" amounts, before anything is taken off. On a payslip, some money goes to taxes and insurance, and what is left is \"netto\".",
      "Die meisten Arbeitnehmer in Deutschland müssen mindestens den Mindestlohn bekommen: im Oktober 2026 etwa 13,90 Euro für jede Stunde. Im Januar 2027 steigt er auf 14,60 Euro. Das sind \"Brutto\"-Beträge, bevor etwas abgezogen wird. Auf der Gehaltsabrechnung geht Geld an Steuern und Versicherungen, und was übrig bleibt, ist \"netto\".",
    ),
  },
  factCard: {
    claims: [
      {
        text: "In the labor market, the 'good' that is bought and sold is labor, and its price is the wage. The labor market works like other markets, with buyers and sellers who set a price.",
        source: "https://www.federalreserveeducation.org/teaching-resources/economics/labor-income/the-labor-market-podcast",
      },
      {
        text: "Workers can raise their productivity and wages by gaining skill, education and training. For higher wages, the Federal Reserve Education text advises a profession with high demand but a relatively small supply of qualified providers.",
        source: "https://www.federalreserveeducation.org/teaching-resources/economics/labor-income/the-labor-market-podcast",
      },
      {
        text: "Pay within a job type varies with market conditions such as the number of jobs available and the number of qualified candidates, and consumer demand for what the worker produces affects earnings.",
        source: "https://www.dallasfed.org/~/media/documents/educate/navigate/navigateunit1.pdf",
      },
      {
        text: "In Germany, full-time employees with a completed vocational training earned about 3,521 euros gross on average in April 2022, compared with 2,817 euros without such training (about 700 euros less). Destatis says higher qualifications usually lead to higher pay. This is an average, not a rule for every person.",
        source: "https://www.destatis.de/DE/Presse/Pressemitteilungen/2023/05/PD23_200_62.html",
      },
      {
        text: "The statutory minimum wage in Germany is 13.90 euros gross per hour since 1 January 2026, and it will rise to 14.60 euros gross per hour on 1 January 2027 (checked 29 October 2026).",
        source: "https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Mindestlohn/Informationen-zum-Mindestlohn/informationen-zum-mindestlohn-deutsch.html",
      },
      {
        text: "The Federal Government confirms the same figures: 13.90 euros gross per hour since 1 January 2026, 14.60 euros in 2027.",
        source: "https://www.bundesregierung.de/breg-de/aktuelles/mindestlohn-steigt-2391010",
      },
      {
        text: "The minimum wage applies to employees in Germany for every hour actually worked, with few exceptions. For example, employees under 18 without completed vocational training are excluded.",
        source: "https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Mindestlohn/Informationen-zum-Mindestlohn/informationen-zum-mindestlohn-deutsch.html",
      },
      {
        text: "Gross (brutto) pay is the earnings before taxes and social insurance contributions are deducted. Net (netto) pay is what is left after income tax and the pension, health, long-term care and unemployment insurance contributions are deducted. The employer deducts them directly and passes them on.",
        source: "https://www.bpb.de/kurz-knapp/lexika/das-junge-politik-lexikon/319967/bruttolohn-nettolohn/",
      },
    ],
    simplified: [
      "Real pay depends on many more things than three: working conditions and risk, union agreements, a company's profits, and more. The lesson shows three that an 8-year-old can see and that the sources above name (skill and training, number of qualified workers, demand for the work).",
      "The pay formula in the toy (coins per hour from years of learning, number of fixers and need) is made up to show direction only. Real pay does not move in neat steps, and real wages adjust slowly and are bargained, not set by a town.",
      "'Longer to learn means more pay' is a tendency, not a law. Some long trainings pay little and some quick jobs pay well, for example because the work is dangerous or rare.",
      "Bea at 3 coins an hour, Sam at 5 coins an hour and Tim's job are made-up for the story.",
      "The Mindestlohn is described as 'most workers must get at least this'. Exceptions (for example under 18 without completed training, some interns, and the first six months for people who were long-term unemployed) are left out.",
      "Brutto and netto are mentioned only as words. Which taxes and insurances are deducted, and how much, is left for the later lesson on taxes.",
      "'Spend some, keep some for later' repeats the idea from lesson 1 (money as a store of value) and is not a new claim in this lesson.",
    ],
  },
};
