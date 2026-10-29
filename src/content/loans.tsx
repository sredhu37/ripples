import { useState } from "react";
import { CheckButton, Slider, Stage } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import type { Lang } from "../progress";
import "./loans.css";

const T = (en: string, de: string): Text => ({ en, de });

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

interface LoanBoardProps {
  lang: Lang;
  coins: number;
  weeks: number;
  onCoins: (v: number) => void;
  onWeeks: (v: number) => void;
}

/** Bea chooses a loan size and how many weeks to pay it back. */
function LoanBoard({ lang, coins, weeks, onCoins, onWeeks }: LoanBoardProps) {
  const p = plan(coins, weeks);
  const say = sayFor(p, lang);
  const en = lang === "en";
  const pct = (n: number) => `${Math.min(100, (n / BAR_MAX) * 100)}%`;

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
        <dl className="loan-sums">
          <dt>{en ? "👵 Pim lends Bea" : "👵 Pim leiht Bea"}</dt>
          <dd>{coins} 🪙</dd>
          <dt>{en ? "➕ The extra, for waiting" : "➕ Das Extra fürs Warten"}</dt>
          <dd>+ {p.extra} 🪙</dd>
          <dt className="loan-total">{en ? "Bea pays back in total" : "Bea zahlt insgesamt zurück"}</dt>
          <dd className="loan-total">{p.total} 🪙</dd>
          <dt>{en ? `Each week, for ${weeks} weeks` : `Jede Woche, ${weeks} Wochen lang`}</dt>
          <dd>{p.weekly} 🪙</dd>
        </dl>
        <div className="loan-bars">
          <div className="loan-bar">
            <span>{en ? "Payment each week" : "Zahlung pro Woche"}</span>
            <div className="loan-track" aria-hidden="true">
              <div className="loan-fill pay" style={{ width: pct(p.weekly) }}>
                {p.weekly}
              </div>
            </div>
          </div>
          <div className="loan-bar">
            <span>{en ? "🍞 Bread sales each week" : "🍞 Brotverkauf pro Woche"}</span>
            <div className="loan-track" aria-hidden="true">
              <div className="loan-fill sales" style={{ width: pct(SALES_PER_WEEK) }}>
                {SALES_PER_WEEK}
              </div>
            </div>
          </div>
        </div>
        <p className={`loan-say ${say.ok ? "ok" : "bad"}`} role="status">
          {say.text}
        </p>
      </div>
    </Stage>
  );
}

function Toy({ lang }: ToyProps) {
  const [coins, setCoins] = useState(30);
  const [weeks, setWeeks] = useState(4);
  return <LoanBoard lang={lang} coins={coins} weeks={weeks} onCoins={setCoins} onWeeks={setWeeks} />;
}

function PayWeeklyWidget({ lang, onAnswer }: WidgetProps) {
  const [coins, setCoins] = useState(20);
  const [weeks, setWeeks] = useState(4);
  const check = () => onAnswer(coins === OVEN_COST && plan(coins, weeks).covered);
  return (
    <>
      <LoanBoard lang={lang} coins={coins} weeks={weeks} onCoins={setCoins} onWeeks={setWeeks} />
      <div className="row nav">
        <CheckButton lang={lang} onClick={check} />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "loans",
  story: [
    {
      scene: "👩‍🍳 🔥 🍞",
      text: T(
        "Bea the baker has a tiny oven. It bakes only a few loaves a day. People in Ripple Town keep asking for more bread.",
        "Bäckerin Bea hat einen winzigen Ofen. Er backt nur ein paar Brote am Tag. Die Leute in Ripple Town wollen immer mehr Brot.",
      ),
    },
    {
      scene: "🔥🔥 ➡️ 🪙🪙🪙🪙 ❓",
      mood: "think",
      text: T(
        "A big oven would bake lots more bread. But it costs 40 coins, and Bea has only 5. She cannot buy it.",
        "Ein großer Ofen würde viel mehr Brot backen. Aber er kostet 40 Münzen, und Bea hat nur 5. Sie kann ihn nicht kaufen.",
      ),
    },
    {
      scene: "👵 🫙🪙 ➡️ 👩‍🍳",
      text: T(
        "Pim has saved lots of coins in a jar. Pim says: I can lend you 40 coins. You give them back later. That is called a loan.",
        "Pim hat viele Münzen in einem Glas gespart. Pim sagt: Ich kann dir 40 Münzen leihen. Du gibst sie später zurück. Das nennt man ein Darlehen.",
      ),
    },
    {
      scene: "🪙🪙🪙🪙 ➡️ 🔥 ➡️ 🍞🍞🍞🍞",
      mood: "happy",
      text: T(
        "Bea borrows the 40 coins and buys the big oven. Now she bakes lots more bread and sells it for coins.",
        "Bea leiht sich die 40 Münzen und kauft den großen Ofen. Jetzt backt sie viel mehr Brot und verkauft es für Münzen.",
      ),
    },
    {
      scene: "🍞 ➡️ 🪙 ➡️ 👵",
      text: T(
        "Every week Bea pays some coins back to Pim. Little by little she gives back everything she borrowed.",
        "Jede Woche zahlt Bea ein paar Münzen an Pim zurück. Nach und nach gibt sie alles zurück, was sie geliehen hat.",
      ),
    },
    {
      scene: "👵 ⏳ 😟 🪙❓",
      mood: "think",
      text: T(
        "But Pim wants back a little more than 40 coins. Why? First, she must wait for her coins. Second, Bea might not be able to pay. That is a risk for Pim. It could go wrong.",
        "Aber Pim will etwas mehr als 40 Münzen zurück. Warum? Erstens muss sie auf ihre Münzen warten. Zweitens kann Bea vielleicht nicht zahlen. Das ist ein Risiko für Pim. Es kann schiefgehen.",
      ),
    },
    {
      scene: "🧥 🪙🪙 ➕🪙",
      text: T(
        "Third, Pim could have used her coins herself, for a warm coat. So she asks for a little extra. The extra is the price of the loan.",
        "Drittens hätte Pim ihre Münzen selbst nutzen können, zum Beispiel für einen warmen Mantel. Darum bittet sie um ein kleines Extra. Das Extra ist der Preis für das Darlehen.",
      ),
    },
    {
      scene: "⚠️ 🍞📉 🪙🪙🪙",
      mood: "think",
      text: T(
        "Careful! Bea must pay back even in a week when bread sells badly. Borrow too much and the weekly payments get too big. Borrow only what you need.",
        "Vorsicht! Bea muss auch in einer Woche zurückzahlen, in der sich Brot schlecht verkauft. Wer zu viel leiht, hat zu große Raten. Leih dir nur, was du brauchst.",
      ),
    },
  ],
  toyIntro: T(
    "Help Bea plan her loan! Choose how many coins she borrows and how many weeks she takes. Watch the bars: can her bread sales pay each week?",
    "Hilf Bea, ihr Darlehen zu planen! Wähle, wie viele Münzen sie leiht und wie viele Wochen sie braucht. Schau auf die Balken: Reicht ihr Brotverkauf für jede Woche?",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Which one is NOT a reason why Pim wants a little extra back?",
        "Was ist KEIN Grund dafür, dass Pim ein kleines Extra zurückhaben will?",
      ),
      options: [
        { text: T("Pim has to wait for her coins", "Pim muss auf ihre Münzen warten") },
        { text: T("Bea now has a shiny new oven", "Bea hat jetzt einen glänzenden neuen Ofen"), correct: true },
        { text: T("Bea might not be able to pay", "Bea kann vielleicht nicht zahlen") },
        { text: T("Pim could have used the coins herself", "Pim hätte die Münzen selbst nutzen können") },
      ],
      hint: T(
        "Remember Pim's three reasons: she waits, Bea might not pay (a risk), and Pim could have used the coins herself. Bea's oven is not a reason.",
        "Weißt du noch, Pims drei Gründe? Sie wartet, Bea zahlt vielleicht nicht (ein Risiko) und Pim hätte die Münzen selbst nutzen können. Beas Ofen ist kein Grund.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Bea needs exactly 40 coins for the oven. Set the coins and the weeks so that her bread sales (8 coins a week) can pay each weekly payment. Then press Check.",
        "Bea braucht genau 40 Münzen für den Ofen. Stelle Münzen und Wochen so ein, dass ihr Brotverkauf (8 Münzen pro Woche) jede Wochenzahlung bezahlen kann. Drücke dann Prüfen.",
      ),
      Widget: PayWeeklyWidget,
      hint: T(
        "Bea needs exactly 40 coins for the oven. Then the weekly payment must be no bigger than her bread sales. More weeks make each payment smaller.",
        "Bea braucht genau 40 Münzen für den Ofen. Dann darf die Zahlung pro Woche nicht größer sein als ihr Brotverkauf. Mehr Wochen machen jede Zahlung kleiner.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Bread sells badly for a week. What must Bea still do?",
        "Eine Woche lang verkauft sich das Brot schlecht. Was muss Bea trotzdem tun?",
      ),
      options: [
        { text: T("Nothing. Losing the coins is Pim's problem now", "Nichts. Dass die Münzen weg sind, ist jetzt Pims Problem") },
        { text: T("Pay back only what the bread earned that week", "Nur zurückzahlen, was das Brot in der Woche gebracht hat") },
        { text: T("Pay back as agreed, even when it is hard", "Zurückzahlen wie ausgemacht, auch wenn es schwer ist"), correct: true },
      ],
      hint: T(
        "A loan is a promise. Bea agreed to pay back every week, even when bread sells badly. That is why we borrow only what we can pay back.",
        "Ein Darlehen ist ein Versprechen. Bea hat ausgemacht, jede Woche zurückzuzahlen, auch wenn sich das Brot schlecht verkauft. Darum leiht man sich nur, was man zurückzahlen kann.",
      ),
    },
  ],
  askDad: T(
    "Dad, have you ever borrowed money or something big from someone? How did you make sure you could give it back? And do we ever borrow in our family?",
    "Papa, hast du dir schon einmal Geld oder etwas Großes geliehen? Wie hast du dafür gesorgt, dass du es zurückgeben kannst? Und leihen wir uns in unserer Familie manchmal etwas?",
  ),
  realLife: {
    title: T("Loans in Germany", "Darlehen in Deutschland"),
    body: T(
      "In Germany you can take out a loan on your own from age 18. Before that, your parents and a court must agree. A loan contract is written down and must show how much you pay back in total. Grown-ups call the extra \"interest\". A later lesson explains it.",
      "In Deutschland kannst du ab 18 Jahren allein ein Darlehen aufnehmen. Davor müssen deine Eltern und ein Gericht zustimmen. Ein Darlehensvertrag wird aufgeschrieben und muss zeigen, wie viel du insgesamt zurückzahlst. Erwachsene nennen das Extra „Zinsen“. Eine spätere Lektion erklärt sie.",
    ),
  },
  factCard: {
    claims: [
      {
        text: "In German law, a loan contract obliges the lender to hand over the agreed sum and the borrower to pay any agreed interest and to repay the loan when it falls due (BGB section 488).",
        source: "https://www.gesetze-im-internet.de/bgb/__488.html",
      },
      {
        text: "Borrowing now to build something that pays later, with the lender getting back more than was lent, is shown in a European Parliament study as a fisherman story: he borrows 30 fish to make a net and agrees to return the 30 plus another 30. It describes the trade-off between consuming now and investing for greater future consumption.",
        source: "https://www.europarl.europa.eu/workingpapers/econ/116/116_en.htm",
      },
      {
        text: "In economic theory, interest is the price paid to induce people who have money to save it rather than spend it (same European Parliament study). This is the 'Pim could have used the coins herself' reason.",
        source: "https://www.europarl.europa.eu/workingpapers/econ/116/116_en.htm",
      },
      {
        text: "For loans, lenders consider the risk of the loan not being paid back: the greater the risk, the higher the rate they charge. The rate can also depend on how long the loan lasts. (Page last updated 13 October 2026.)",
        source: "https://www.bankofengland.co.uk/explainers/what-are-interest-rates",
      },
      {
        text: "Because some borrowers do not repay, or do not repay on time, the interest on a bank loan includes compensation for the default risk the bank has to allow for (Deutsche Bundesbank school publication 'Geld und Geldpolitik').",
        source: "https://publikationen.bundesbank.de/publikationen-de/schule-bildung/geld-und-geldpolitik-921580?article=3-banken-und-buchgeld-922604",
      },
      {
        text: "Every loan has its price and carries an additional economic risk. Borrowers should honestly check how much they can pay in instalments over the whole term, and saving first avoids the cost of a loan.",
        source: "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/kredit-schulden-insolvenz/kredite-und-darlehen-auch-beim-geldleihen-laesst-sich-sparen-10409",
      },
      {
        text: "If a borrower falls behind with instalments, the lender can charge late-payment interest and further costs. For contracts since 21 March 2016, the bank can cancel the loan if the borrower is behind with at least two instalments in a row and the arrears reach a minimum share of the loan.",
        source: "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/kredit-schulden-insolvenz/kreditvertraege-diese-rechte-haben-sie-als-kreditnehmer-6879",
      },
      {
        text: "In Germany, legal adulthood (Volljährigkeit) starts at the completed 18th year of life.",
        source: "https://www.gesetze-im-internet.de/bgb/__2.html",
      },
      {
        text: "Minors cannot take out a loan alone. According to the Verbraucherzentrale NRW (page dated 10 December 2025), a loan for a minor needs court approval, and the parents' agreement alone is not enough; without it the contract never becomes valid.",
        source: "https://www.verbraucherzentrale.nrw/wissen/geld-versicherungen/sparen-und-anlegen/bankgeschaefte-mit-minderjaehrigen-eltern-muessen-meistens-zustimmen-10398",
      },
      {
        text: "Parents need the family court's approval for the cases in which a guardian would need it, and for a guardian this includes taking up money on credit in the child's name (BGB sections 1643 and 1822 no. 8).",
        source: "https://www.gesetze-im-internet.de/bgb/__1822.html",
      },
      {
        text: "Before a consumer loan contract is signed, the lender must give information that includes the borrowing rate (Sollzinssatz), the number and amount of instalments, the total amount to be paid (Gesamtbetrag) and a warning about the consequences of missed payments.",
        source: "https://www.gesetze-im-internet.de/bgbeg/art_247__3.html",
      },
      {
        text: "The consumer loan contract itself must clearly contain these items (the information listed in Art. 247 section 3 EGBGB, numbers 1 to 14, so including the total amount and the warning), as well as the borrower's name and the cancellation procedure.",
        source: "https://www.gesetze-im-internet.de/bgbeg/art_247__6.html",
      },
    ],
    simplified: [
      "The toy's price rule (1 extra coin for every 10 coins borrowed, for every 4 weeks) is made up to make cause and effect visible. Real loans are priced with an interest rate per year plus other terms, and real lenders also have running costs. The lesson names 'interest' only on the last card and does not explain rates, percentages or compounding.",
      "The 'extra' is explained with three reasons: waiting, the risk of not being paid back, and giving up your own use of the coins. Economists and banks list more factors (for example the lender's costs and expected price rises). Three reasons are fair for an 8-year-old and each is backed by the sources above.",
      "Pim is a neighbour who lends her own savings. In real life most loans come from banks, which a later lesson covers. Pim being a saver links to the savings lesson.",
      "Bea's new oven adds a fixed 8 coins of bread sales a week and costs a fixed 40 coins. Real income is uncertain, which is exactly the risk the lesson mentions. Weekly payments are rounded up to whole coins.",
      "'Borrow only what you need' and 'pay back as agreed' are simple rules of thumb. The Verbraucherzentrale also advises honestly checking what you can afford. The lesson does not cover what to do when payments become impossible (for example debt counselling).",
      "The real life card says people under 18 need 'their parents and a court' for a loan. The Verbraucherzentrale page says 'Vormundschaftsgericht', the older name; the statute now says Familiengericht (family court), and 'a court' is accurate for both. Exceptions and the pocket money rule are left out, since a child does not take loans.",
      "The contract statement describes what the law requires for consumer loan contracts with a business lender. Loans between private people are not covered by the card.",
    ],
  },
};
