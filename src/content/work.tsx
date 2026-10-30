import { useState } from "react";
import { CheckButton, animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  DemandDiagram,
  FewManyDiagram,
  HoursDiagram,
  JobsDiagram,
  KeepDiagram,
  LearnDiagram,
  PayDiagram,
  WhyDiagram,
} from "./work.diagrams";
import { JobMarket, LOW_PAY, NORMAL, payPerHour } from "./work.toy";

// The pay logic lives in work.toy.tsx; re-exported here for the tests.
export { LOW_PAY, NORMAL_PEOPLE, payPerHour, pushes } from "./work.toy";
export type { Market } from "./work.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <JobMarket lang={lang} start={NORMAL} onChange={() => onDone?.()} />;
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
    animatedBeat(
      [
        T(
          "Everybody in Ripple Town does some kind of work. Finn is a fisherman. That means he catches fish.",
          "Alle in Ripple Town arbeiten. Finn ist Fischer. Das heißt, er fängt Fische.",
        ),
        T("Bea is a baker. That means she bakes bread.", "Bea ist Bäckerin. Das heißt, sie backt Brot."),
        T("Sam is a shoemaker. That means he makes shoes.", "Sam ist Schuhmacher. Das heißt, er macht Schuhe."),
        T(
          "The work a person does every day has a name. It is called a *job*.",
          "Die Arbeit, die ein Mensch jeden Tag macht, hat einen Namen. Sie heißt *Beruf*.",
        ),
      ],
      JobsDiagram,
    ),
    animatedBeat(
      [
        T(
          "Bea bakes bread, and lots of people in town want it.",
          "Bea backt Brot, und viele Leute in der Stadt wollen es haben.",
        ),
        T(
          "Pip wants some, too. Pip gives Bea 3 coins for the bread.",
          "Pip möchte auch welches. Pip gibt Bea 3 Münzen für das Brot.",
        ),
        T(
          "Coins that you get for your work have a name. They are called *pay*.",
          "Münzen, die du für deine Arbeit bekommst, haben einen Namen. Sie heißen *Lohn*.",
        ),
        T(
          "Pip pays Bea because her bread is worth something to Pip. So pay is coins for work that other people value.",
          "Pip bezahlt Bea, weil ihr Brot für Pip etwas wert ist. Lohn sind also Münzen für Arbeit, die anderen etwas wert ist.",
        ),
      ],
      PayDiagram,
    ),
    animatedBeat(
      [
        T(
          "Pay is often counted by the hour. Bea gets 3 coins for each hour that she works.",
          "Lohn wird oft nach Stunden gezählt. Bea bekommt 3 Münzen für jede Stunde, die sie arbeitet.",
        ),
        T("Today Bea works for 4 hours.", "Heute arbeitet Bea 4 Stunden."),
        T(
          "In every one of those hours she earns 3 coins.",
          "In jeder dieser Stunden verdient sie 3 Münzen.",
        ),
        T(
          "Four hours with 3 coins each: 4 times 3 makes 12 coins.",
          "Vier Stunden mit je 3 Münzen: 4 mal 3 sind 12 Münzen.",
        ),
      ],
      HoursDiagram,
    ),
    animatedBeat(
      [
        T("Bea gets 3 coins for each hour of her work.", "Bea bekommt 3 Münzen für jede Stunde Arbeit."),
        T(
          "But Sam gets 5 coins for each hour. That is more than Bea!",
          "Aber Sam bekommt 5 Münzen für jede Stunde. Das ist mehr als bei Bea!",
        ),
        T(
          "Why does one job pay more than another? There are three reasons. Let's find them.",
          "Warum zahlt ein Beruf mehr als ein anderer? Dafür gibt es drei Gründe. Wir suchen sie gemeinsam.",
        ),
      ],
      WhyDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "The first reason is learning time. Some jobs take a long time to learn.",
          "Der erste Grund ist die Lernzeit. Manche Berufe muss man lange lernen.",
        ),
        T(
          "Sam practiced for three years to make good shoes.",
          "Sam hat drei Jahre lang geübt, um gute Schuhe zu machen.",
        ),
        T(
          "The longer a job takes to learn, the more it usually pays.",
          "Je länger man einen Beruf lernt, desto mehr zahlt er meistens.",
        ),
      ],
      LearnDiagram,
    ),
    animatedBeat(
      [
        T(
          "The second reason is how many people can do a job. Let's look at people who fix boats. They make broken boats work again.",
          "Der zweite Grund ist, wie viele Leute einen Beruf können. Schauen wir uns Leute an, die Boote reparieren. Sie machen kaputte Boote wieder heil.",
        ),
        T(
          "If only a few people can fix boats, the town pays more coins to each one of them.",
          "Wenn nur wenige Leute Boote reparieren können, zahlt die Stadt jedem von ihnen mehr Münzen.",
        ),
        T(
          "If many people can fix boats, each one of them gets fewer coins.",
          "Wenn viele Leute Boote reparieren können, bekommt jeder von ihnen weniger Münzen.",
        ),
      ],
      FewManyDiagram,
    ),
    animatedBeat(
      [
        T(
          "The third reason is how much people need the work. At the moment, only one boat in town needs fixing.",
          "Der dritte Grund ist, wie sehr die Leute die Arbeit brauchen. Im Moment muss in der Stadt nur ein Boot repariert werden.",
        ),
        T(
          "How much people want or need something has a name. It is called *demand*.",
          "Wie sehr die Leute etwas wollen oder brauchen, hat einen Namen. Es heißt *Nachfrage*.",
        ),
        T(
          "Now lots of boats are broken. The demand for boat fixing is high!",
          "Jetzt sind viele Boote kaputt. Die Nachfrage nach Bootsreparaturen ist hoch!",
        ),
        T(
          "The more the town needs the work, the more coins that work is worth.",
          "Je mehr die Stadt die Arbeit braucht, desto mehr Münzen ist sie wert.",
        ),
      ],
      DemandDiagram,
    ),
    animatedBeat(
      [
        T("The coins you earn are yours.", "Die Münzen, die du verdienst, gehören dir."),
        T("You can spend them, for example on bread.", "Du kannst sie ausgeben, zum Beispiel für Brot."),
        T("Or you can save some of them for later.", "Oder du sparst einen Teil für später."),
      ],
      KeepDiagram,
    ),
  ],
  toyIntro: T(
    "Boat fixing is a job in Ripple Town. Move the three sliders and watch the pay change.",
    "Boote reparieren ist ein Beruf in Ripple Town. Schiebe die drei Regler und schau, wie sich der Lohn verändert.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Sam spent three years learning to make shoes. Tim's job took one afternoon to learn. Which job usually pays more per hour?",
        "Sam hat drei Jahre lang gelernt, Schuhe zu machen. Tims Beruf hat man an einem Nachmittag gelernt. Welcher Beruf zahlt meistens mehr pro Stunde?",
      ),
      options: [
        { text: T("Tim's job, learned in one afternoon", "Tims Beruf, an einem Nachmittag gelernt") },
        { text: T("Sam's job, learned in three years", "Sams Beruf, in drei Jahren gelernt"), correct: true },
        { text: T("They always pay exactly the same", "Sie zahlen immer genau gleich viel") },
      ],
      hint: T(
        "A job that takes years to learn is harder to find people for. So it usually pays more per hour.",
        "Für einen Beruf, den man Jahre lernt, findet man schwerer Leute. Darum zahlt er meistens mehr pro Stunde.",
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
        "Der Lohn ist noch 1 Münze. Er steigt, wenn weniger Leute den Beruf können, wenn man ihn länger lernt oder wenn die Stadt ihn mehr braucht.",
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
    "Was war dein erster Job, und was hast du dafür bekommen? Was musstest du für deinen Beruf heute lernen, und wie lange hat das gedauert?",
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
      "Bea at 3 coins an hour, Sam at 5 coins an hour, Sam's three years of practice, Pip's 3 coins and Tim's job are made up for the story.",
      "'Demand' is explained as 'how much people want or need something'. Economists also separate wanting from being able to pay, which is left out here. The word 'supply' is not taught; the lesson only says how many people can do the job.",
      "The Mindestlohn is described as 'most workers must get at least this'. Exceptions (for example under 18 without completed training, some interns, and the first six months for people who were long-term unemployed) are left out.",
      "Brutto and netto are mentioned only as words. Which taxes and insurances are deducted, and how much, is left for the later lesson on taxes.",
      "'Spend some, keep some for later' repeats the idea from lesson 1 (money as a store of value) and is not a new claim in this lesson.",
    ],
  },
};
