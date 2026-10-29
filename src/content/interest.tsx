import { useState } from "react";
import { CheckButton, Slider, Stage, ToyButton } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import type { Lang } from "../progress";
import "./interest.css";

const T = (en: string, de: string): Text => ({ en, de });

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
  mode: Mode;
  scaleMax?: number;
  band?: [number, number];
  label: string;
}

const W = 720;
const H = 116;
const AXIS = 16;

/** Bars for each year. Teal is the coins you started with, green or orange is the extra. */
function Chart({ values, start, mode, scaleMax, band, label }: ChartProps) {
  const max = scaleMax ?? Math.max(...values, 1);
  const n = values.length;
  const gap = n > 12 ? 2 : 4;
  const bw = (W - gap * (n - 1)) / n;
  const y = (v: number) => H - (Math.min(v, max) / max) * H;
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
        const startH = (Math.min(start, max) / max) * H;
        const totalH = (Math.min(v, max) / max) * H;
        return (
          <g key={i}>
            <rect className="ig-bar-start" x={x} y={H - startH} width={bw} height={startH} />
            <rect
              className={mode === "save" ? "ig-bar-extra-save" : "ig-bar-extra-loan"}
              x={x}
              y={H - totalH}
              width={bw}
              height={Math.max(0, totalH - startH)}
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
  return lang === "en"
    ? `${rate}% = ${rate} extra coins for every 100 coins, each year`
    : `${rate} % = ${rate} Extra-Münzen für je 100 Münzen, jedes Jahr`;
}

function Garden({ lang }: ToyProps) {
  const [mode, setMode] = useState<Mode>("save");
  const [start, setStart] = useState(100);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);

  const values = grow(start, rate, years);
  const total = Math.round(values[years]);
  const extra = total - start;
  const simple = Math.round((start * rate * years) / 100);
  const onExtra = Math.max(0, extra - simple);
  const save = mode === "save";

  const chartLabel =
    lang === "en"
      ? `Bars for each year from 0 to ${years}. After ${years} years: ${total} coins.`
      : `Balken für jedes Jahr von 0 bis ${years}. Nach ${years} Jahren: ${total} Münzen.`;

  return (
    <Stage label={lang === "en" ? "The money garden" : "Der Geldgarten"}>
      <div className="ig-wrap">
        <div className="ig-modes">
          <ToyButton pressed={save} onClick={() => setMode("save")}>
            🌱 {lang === "en" ? "Saving" : "Sparen"}
          </ToyButton>
          <ToyButton pressed={!save} onClick={() => setMode("loan")}>
            🤝 {lang === "en" ? "Loan" : "Geld leihen"}
          </ToyButton>
        </div>
        <Chart values={values} start={start} mode={mode} label={chartLabel} />
        <div className="ig-readout" role="status">
          {save ? (
            <>
              <span className="ig-big">
                {lang === "en" ? `After ${years} years: ${total} coins` : `Nach ${years} Jahren: ${total} Münzen`}
              </span>
              <span className="ig-small">
                {lang === "en"
                  ? `You put in ${start}. Interest added ${extra}.`
                  : `Du hast ${start} eingezahlt. Die Zinsen bringen ${extra}.`}
                {onExtra > 0 &&
                  (lang === "en"
                    ? ` 🌱 ${onExtra} of them are extra on extra!`
                    : ` 🌱 Davon sind ${onExtra} Extra auf Extra!`)}
              </span>
            </>
          ) : (
            <>
              <span className="ig-big">
                {lang === "en"
                  ? `After ${years} years you pay back: ${total} coins`
                  : `Nach ${years} Jahren zahlst du zurück: ${total} Münzen`}
              </span>
              <span className="ig-small">
                {lang === "en"
                  ? `You borrowed ${start}. The loan cost ${extra} extra coins.`
                  : `Du hast ${start} geliehen. Das Leihen kostet ${extra} Extra-Münzen.`}
              </span>
            </>
          )}
          <span className="ig-small">{ratePhrase(lang, rate)}</span>
        </div>
        <div className="ig-sliders">
          <Slider
            label={
              save
                ? lang === "en"
                  ? "Coins put in"
                  : "Eingezahlte Münzen"
                : lang === "en"
                  ? "Coins borrowed"
                  : "Geliehene Münzen"
            }
            value={start}
            min={10}
            max={200}
            step={10}
            onChange={setStart}
          />
          <Slider label={lang === "en" ? "Interest (%)" : "Zinsen (%)"} value={rate} min={0} max={10} onChange={setRate} />
          <Slider label={lang === "en" ? "Years" : "Jahre"} value={years} min={1} max={20} onChange={setYears} />
        </div>
      </div>
    </Stage>
  );
}

function GardenWidget({ lang, onAnswer }: WidgetProps) {
  const [rate, setRate] = useState(2);
  const [years, setYears] = useState(3);
  const values = grow(100, rate, years);
  const total = Math.round(values[years]);

  return (
    <>
      <Stage label={lang === "en" ? "Bea's money garden" : "Beas Geldgarten"}>
        <div className="ig-wrap">
          <Chart
            values={values}
            start={100}
            mode="save"
            scaleMax={270}
            band={[TARGET_LOW, TARGET_HIGH]}
            label={
              lang === "en"
                ? `Bea's coins after ${years} years: ${total}. The goal is between ${TARGET_LOW} and ${TARGET_HIGH}.`
                : `Beas Münzen nach ${years} Jahren: ${total}. Das Ziel liegt zwischen ${TARGET_LOW} und ${TARGET_HIGH}.`
            }
          />
          <div className="ig-readout" role="status">
            <span className="ig-big">
              {lang === "en" ? `Bea has ${total} coins after ${years} years` : `Bea hat nach ${years} Jahren ${total} Münzen`}
            </span>
            <span className="ig-small">
              {lang === "en"
                ? `Goal: the green stripe, ${TARGET_LOW} to ${TARGET_HIGH} coins. ${ratePhrase(lang, rate)}`
                : `Ziel: der grüne Streifen, ${TARGET_LOW} bis ${TARGET_HIGH} Münzen. ${ratePhrase(lang, rate)}`}
            </span>
          </div>
          <div className="ig-sliders two">
            <Slider label={lang === "en" ? "Interest (%)" : "Zinsen (%)"} value={rate} min={0} max={10} onChange={setRate} />
            <Slider label={lang === "en" ? "Years" : "Jahre"} value={years} min={1} max={10} onChange={setYears} />
          </div>
        </div>
      </Stage>
      <div className="row nav">
        <CheckButton lang={lang} onClick={() => onAnswer(reachesTarget(rate, years))} />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "interest",
  story: [
    {
      scene: "👩‍🍳 🪙 ➡️ 🏦 ➡️ 🧔 ⛵",
      text: T(
        "Bea keeps 100 coins in the town bank. The bank lends them to Finn, so he can buy a new boat.",
        "Bea hat 100 Münzen in der Stadtbank. Die Bank leiht sie Finn, damit er ein neues Boot kaufen kann.",
      ),
    },
    {
      scene: "🧔 ➡️ 🪙100 + 🪙5",
      mood: "think",
      text: T(
        "After a year Finn pays back 105 coins, not 100. The 5 extra coins are the price of the loan. This extra has a name: interest.",
        "Nach einem Jahr zahlt Finn 105 Münzen zurück, nicht 100. Die 5 Extra-Münzen sind der Preis fürs Leihen. Dieses Extra heißt Zinsen.",
      ),
    },
    {
      scene: "🪙×100 ➡️ +5 ➡️ 5 %",
      text: T(
        "We say: 5 extra coins for every 100 coins, each year. That is 5 percent a year, or 5%. Percent means out of a hundred.",
        "Wir sagen: 5 Extra-Münzen für je 100 Münzen, jedes Jahr. Das sind 5 Prozent im Jahr, kurz 5 %. Prozent heißt von hundert.",
      ),
    },
    {
      scene: "🏦 ➡️ 👩‍🍳 🪙🪙🪙",
      mood: "happy",
      text: T(
        "The bank pays Bea too, because she lent out her coins. Bea gets 3 extra coins for her 100. That is 3% a year, a bit less than Finn pays.",
        "Die Bank zahlt auch Bea etwas, weil sie ihre Münzen verliehen hat: 3 Extra-Münzen für ihre 100. Das sind 3 % im Jahr, etwas weniger als Finn zahlt.",
      ),
    },
    {
      scene: "🧔 5 ➡️ 🏦 ➡️ 3 👩‍🍳   🏦 2",
      mood: "think",
      text: T(
        "Finn pays 5, Bea gets 3, and the bank keeps 2. That pays for the bank's work, and for loans that are never paid back.",
        "Finn zahlt 5, Bea bekommt 3 und die Bank behält 2. Davon bezahlt sie ihre Arbeit und auch geliehenes Geld, das nie zurückkommt.",
      ),
    },
    {
      scene: "🌱 ➡️ 🌿 ➡️ 🌳",
      text: T(
        "Bea leaves her coins and her extra in the bank. Next year the extra coins earn extra too! Like seeds that grow into more seeds.",
        "Bea lässt ihre Münzen und das Extra in der Bank. Im nächsten Jahr bringen auch die Extra-Münzen Extra! Wie Samen, aus denen noch mehr Samen werden.",
      ),
    },
    {
      scene: "⛵ 5 % ➡️ 105   ⛵ 10 % ➡️ 110",
      mood: "think",
      text: T(
        "Now the other side. A loan with higher interest costs more. At 10% Finn pays back 110 coins, at 5% only 105. A loan that waits for years grows like a garden.",
        "Jetzt die andere Seite. Leihen kostet mehr, wenn die Zinsen höher sind. Bei 10 % zahlt Finn 110 Münzen zurück, bei 5 % nur 105. Geliehenes Geld, das Jahre wartet, wächst wie ein Garten.",
      ),
    },
  ],
  toyIntro: T(
    "Welcome to the money garden! Pick the coins, the interest and the years. Then switch to a loan and see what the same numbers cost.",
    "Willkommen im Geldgarten! Wähle die Münzen, die Zinsen und die Jahre. Schalte dann auf Geld leihen und sieh, was dieselben Zahlen kosten.",
  ),
  Toy: Garden,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Interest is the price of a loan. Finn borrows 100 coins. Which loan costs Finn the most?",
        "Zinsen sind der Preis fürs Leihen. Finn leiht sich 100 Münzen. Welches Leihen kostet Finn am meisten?",
      ),
      options: [
        { text: T("5 extra coins a year", "5 Extra-Münzen im Jahr") },
        { text: T("10 extra coins a year", "10 Extra-Münzen im Jahr"), correct: true },
        { text: T("2 extra coins a year", "2 Extra-Münzen im Jahr") },
      ],
      hint: T(
        "Interest is the price of the loan, so higher interest means Finn pays back more. With 10 extra coins he pays back 110.",
        "Zinsen sind der Preis fürs Leihen. Je höher die Zinsen, desto mehr zahlt Finn zurück. Mit 10 Extra-Münzen zahlt er 110 zurück.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Bea plants 100 coins in the money garden. Set the interest and the years so she ends with 150 to 170 coins. Then press Check.",
        "Bea pflanzt 100 Münzen in den Geldgarten. Stelle Zinsen und Jahre so ein, dass sie am Ende 150 bis 170 Münzen hat. Drücke dann Prüfen.",
      ),
      Widget: GardenWidget,
      hint: T(
        "Not in the green stripe yet. More interest or more years makes the pile bigger, less makes it smaller. Try again until the number is 150 to 170.",
        "Noch nicht im grünen Streifen. Mehr Zinsen oder mehr Jahre machen den Haufen größer, weniger machen ihn kleiner. Probiere, bis die Zahl 150 bis 170 ist.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Bea adds no new coins. Why does her pile still grow faster and faster over the years?",
        "Bea legt keine neuen Münzen dazu. Warum wächst ihr Haufen trotzdem mit den Jahren immer schneller?",
      ),
      options: [
        { text: T("The bank raises the interest every year", "Die Bank erhöht jedes Jahr die Zinsen") },
        { text: T("Bea saves a few more coins each year", "Bea spart jedes Jahr ein paar Münzen mehr") },
        { text: T("The extra coins start to earn extra too", "Die Extra-Münzen bringen selbst auch Extra"), correct: true },
      ],
      hint: T(
        "Bea leaves the extra coins in the bank. Next year they earn extra too, like seeds that grow into more seeds.",
        "Bea lässt die Extra-Münzen in der Bank. Im nächsten Jahr bringen sie auch Extra, wie Samen, aus denen noch mehr Samen werden.",
      ),
    },
  ],
  askDad: T(
    "Do we earn interest on any of our money, or pay interest on anything? Why do you think the bank pays savers less than borrowers pay?",
    "Bekommen wir Zinsen für unser Geld, oder zahlen wir irgendwo Zinsen? Warum zahlt die Bank Sparern wohl weniger, als Leute fürs Leihen zahlen?",
  ),
  realLife: {
    title: T("Interest in Germany", "Zinsen in Deutschland"),
    body: T(
      "In Germany interest is called Zinsen. A Tagesgeld account lets you take out your money any day, and the bank can change its interest rate at any time. Each grown-up can earn up to 1,000 euros of savings interest a year without paying tax, if they tell their bank (you will learn about taxes later). For loans, banks and shops must show the effektiver Jahreszins, one yearly number with all the costs, so people can compare.",
      "In Deutschland heißt das Extra Zinsen. Bei einem Tagesgeldkonto kannst du dein Geld jeden Tag abheben, und die Bank darf ihre Zinsen jederzeit ändern. Jeder Erwachsene darf bis zu 1.000 Euro Sparzinsen im Jahr ohne Steuern verdienen, wenn er es seiner Bank sagt (über Steuern lernst du später). Für Kredite müssen Banken und Läden den effektiven Jahreszins zeigen, eine Jahreszahl mit allen Kosten, damit man vergleichen kann.",
    ),
  },
  factCard: {
    claims: [
      {
        text: "Interest is the price of borrowing money. The interest rate is shown in percent ('out of a hundred') and says what share of the saved or borrowed amount is charged as interest.",
        source: "https://www.bundesbank.de/de/service/schule-und-bildung/erklaerfilme/was-sind-zinsen--860012",
      },
      {
        text: "A bank can pay its savers interest on their deposits, and a borrower must pay interest to the bank. The higher the risk that a borrower cannot repay, the higher the loan rate.",
        source: "https://www.bundesbank.de/de/service/schule-und-bildung/erklaerfilme/was-sind-zinsen--860012",
      },
      {
        text: "Lending and taking deposits are among the most important functions of banks. Borrowers pay interest to the bank, the bank pays interest on customer deposits, and the difference (Zinsmarge) is one of banks' most important sources of income. Loan interest includes compensation for the risk that a borrower does not repay.",
        source: "https://publikationen.bundesbank.de/content/922604.md",
      },
      {
        text: "Banks price loans (a reference rate plus a mark-up) to cover at least on average their operating costs, which include capital costs, expected losses from loan defaults, funding costs and running costs. The rate banks pay on customer deposits is normally below the reference rate.",
        source: "https://publikationen.bundesbank.de/caas/v1/media/794132/data/9d633327cfea2255dfa059fe89f2cef1",
      },
      {
        text: "Compound interest is interest earned on interest: 100 at 5% a year becomes 105 after one year and 110.25 after two, because the second year's interest is paid on 105.",
        source: "https://www.investor.gov/additional-resources/information/youth/teachers-classroom-resources/what-compound-interest",
      },
      {
        text: "Same compounding example with a yearly calculation: start with 1,000 at 5%, then 1,050 after year one and 1,102.50 after year two.",
        source: "https://www.consumerfinance.gov/ask-cfpb/how-does-compound-interest-work-en-1683/",
      },
      {
        text: "In Germany, if capital income (interest is capital income) is up to 1,000 euros per person a year (2,000 for couples assessed together), a Freistellungsauftrag (exemption order) given to the bank avoids the bank's tax deduction. Page last updated 13 May 2026.",
        source: "https://verwaltung.bund.de/leistungsverzeichnis/de/leistung/99102040010000/herausgeber/RP-229931708/region/070000000000",
      },
      {
        text: "The Sparerpauschbetrag is 1,000 euros per person (2,000 for couples). Above the amount covered by an exemption order, domestic banks must pass 25 percent capital gains tax plus solidarity surcharge and possibly church tax to the tax office.",
        source: "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen/steuererklaerung-2025-was-sie-ueber-fristen-freibetraege-und-regeln-wissen-muessen-122798",
      },
      {
        text: "Tagesgeld has no fixed term, you can take the money out at any time, and the bank can change the interest rate at any time. The interest paid counts as capital income and is taxable.",
        source: "https://www.bafin.de/DE/verbraucherinnen-verbraucher/themen-finanzprodukte/geldanlage/spareinlagen/tagesgeld/tagesgeld_node.html",
      },
      {
        text: "Banks, but also car dealers and electronics shops, must show the effektiver Jahreszinssatz, which includes all costs of a loan, so that customers can compare loan offers.",
        source: "https://www.bundesbank.de/de/service/schule-und-bildung/erklaerfilme/was-sind-zinsen--860012",
      },
      {
        text: "Context for the simplified rates (not stated in the lesson): in January 2026 the top Tagesgeld offers on the market paid more than 3 percent, while many banks and savings banks paid between 0 and 1 percent. Not re-checked for October 2026.",
        source: "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen/geldanlage-und-inflation-wie-lege-ich-geld-bei-geringen-zinsen-an-11534",
      },
    ],
    simplified: [
      "The rates 3%, 5% and 10% are made up to give round numbers. Real savings rates are usually lower than loan rates (about January 2026: many banks 0 to 1 percent, top Tagesgeld offers above 3 percent), and the toy slider goes up to 10% only so the growth is easy to see.",
      "The bank's gap (5 minus 3 = 2) is told as 'the bank's work and loans that are not paid back'. The Bundesbank also lists capital and funding costs, and the gap is also a source of the bank's income. Fair, because work and loan risk are the two parts a child can picture.",
      "Interest is paid once a year at one fixed rate. Real rates can change (Tagesgeld rates are variable) and interest can be paid monthly or quarterly.",
      "The loan side assumes nothing is paid back until the end. Real loans are usually repaid in parts, so interest is charged on a shrinking amount. The point shown is only that a higher rate costs more, and that waiting costs more.",
      "Numbers are rounded to whole coins in the toy. Money in the toy is 'coins', not euros.",
      "The tax rule is told as 'a grown-up can earn up to 1,000 euros of savings interest a year without paying tax if they tell their bank'. In practice it is the Freistellungsauftrag, and extra tax paid can also be refunded in the tax return. Taxes are only named here; the next lesson covers them.",
      "Compound interest is shown with yearly steps and described as 'extra coins earn extra too'. The term 'compound interest' is not used with the child.",
    ],
  },
};
