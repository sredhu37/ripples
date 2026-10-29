import { useState } from "react";
import { CheckButton, Slider, Stage } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import type { Lang } from "../progress";
import "./inflation.css";

const T = (en: string, de: string): Text => ({ en, de });

/** Coins in Finn's pocket. At the start one scoop costs 1 coin, so they buy 10 scoops. */
const POCKET = 10;

/** The scoop price in tenths of a coin after some years of price rises (the seller rounds to 0.1). */
export function priceTenths(years: number, percent: number): number {
  return Math.round(10 * Math.pow(1 + percent / 100, years));
}

/** How many whole scoops the pocket buys. Works in tenths so there is no rounding surprise. */
export function scoopsFor(years: number, percent: number): number {
  return Math.floor((POCKET * 10) / priceTenths(years, percent));
}

interface Setting {
  years: number;
  percent: number;
}

const START: Setting = { years: 3, percent: 5 };

const fmt = (tenths: number, lang: Lang) => {
  const s = (tenths / 10).toFixed(1);
  return lang === "de" ? s.replace(".", ",") : s;
};

function sayFor(s: Setting, tenths: number, scoops: number): Text {
  if (scoops === 0) {
    return T("Now 10 coins do not even buy one scoop!", "Jetzt reichen 10 Münzen nicht mal für eine Kugel!");
  }
  if (tenths === 10) {
    return T(
      "The price has not moved. 10 coins still buy 10 scoops. Try more years or a bigger rise.",
      "Der Preis hat sich nicht bewegt. 10 Münzen kaufen noch 10 Kugeln. Probier mehr Jahre oder einen größeren Anstieg.",
    );
  }
  return T(
    `At the start, 10 coins bought 10 scoops. After ${s.years} ${s.years === 1 ? "year" : "years"}, they buy ${scoops}.`,
    `Am Anfang kauften 10 Münzen 10 Kugeln. Nach ${s.years} ${s.years === 1 ? "Jahr" : "Jahren"} kaufen sie ${scoops}.`,
  );
}

/** Ice cream time machine: jump ahead some years, set how fast prices rise, see what 10 coins buy. */
function TimeMachine({ lang, value, onChange }: { lang: Lang; value: Setting; onChange: (s: Setting) => void }) {
  const tenths = priceTenths(value.years, value.percent);
  const scoops = scoopsFor(value.years, value.percent);
  const say = sayFor(value, tenths, scoops);
  const en = lang === "en";
  return (
    <Stage label={en ? "Ice cream time machine" : "Eis-Zeitmaschine"}>
      <div className="inf">
        <div className="inf-sliders">
          <Slider
            label={en ? "Years later" : "Jahre später"}
            value={value.years}
            min={0}
            max={10}
            onChange={(years) => onChange({ ...value, years })}
            left={en ? "now" : "jetzt"}
            right={en ? "10 years" : "10 Jahre"}
          />
          <Slider
            label={en ? "Price rise each year (%)" : "Preisanstieg pro Jahr (%)"}
            value={value.percent}
            min={0}
            max={20}
            onChange={(percent) => onChange({ ...value, percent })}
            left={en ? "none" : "keiner"}
            right={en ? "20 out of 100" : "20 von 100"}
          />
        </div>
        <div className="inf-board">
          <div className="inf-tag">
            🍦 {en ? "One scoop costs" : "Eine Kugel kostet"}
            <strong>
              {fmt(tenths, lang)} 🪙
            </strong>
          </div>
          <div>
            <div className="inf-scoops" role="img" aria-label={en ? `${scoops} scoops` : `${scoops} Kugeln`}>
              {Array.from({ length: POCKET }, (_, i) => (
                <span key={i} className={i < scoops ? "inf-scoop" : "inf-scoop gone"} aria-hidden="true">
                  🍦
                </span>
              ))}
            </div>
            <div className="inf-count">
              {en ? `10 🪙 buy ${scoops} ${scoops === 1 ? "scoop" : "scoops"}` : `10 🪙 kaufen ${scoops} ${scoops === 1 ? "Kugel" : "Kugeln"}`}
            </div>
          </div>
        </div>
        <p className="trade-say" role="status">
          {say[lang]}
        </p>
      </div>
    </Stage>
  );
}

function Toy({ lang }: ToyProps) {
  const [s, setS] = useState<Setting>(START);
  return <TimeMachine lang={lang} value={s} onChange={setS} />;
}

/** The child must set the machine so that 10 coins buy half as many scoops as at the start (5). */
function HalfScoopsWidget({ lang, onAnswer }: WidgetProps) {
  const [s, setS] = useState<Setting>(START);
  return (
    <>
      <TimeMachine lang={lang} value={s} onChange={setS} />
      <div className="row nav">
        <CheckButton lang={lang} onClick={() => onAnswer(scoopsFor(s.years, s.percent) === POCKET / 2)} />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "inflation",
  story: [
    {
      scene: "🍦 = 🪙",
      text: T(
        "Last summer, one scoop of ice cream in Ripple Town cost 1 coin. Finn bought one every Friday.",
        "Letzten Sommer kostete eine Kugel Eis in Ripple Town 1 Münze. Finn kaufte sich jeden Freitag eine.",
      ),
    },
    {
      scene: "🍦 = 🪙🪙   🧔 🪙 ➡️ ½ 🍦",
      mood: "think",
      text: T(
        "This summer a scoop costs 2 coins! Finn still has his 1 coin. Now it buys only half a scoop.",
        "Diesen Sommer kostet eine Kugel 2 Münzen! Finn hat immer noch seine 1 Münze. Damit bekommt er nur noch eine halbe Kugel.",
      ),
    },
    {
      scene: "🧒🧑👧 ➡️ 🍦 🏷️⬆️",
      text: T(
        "Why? One reason: everybody wants ice cream, but there is only so much. The seller can ask for more coins.",
        "Warum? Ein Grund: Alle wollen Eis, aber es gibt nur so viel. Der Eisverkäufer kann mehr Münzen verlangen.",
      ),
    },
    {
      scene: "🥛🍬 🏷️⬆️ ➡️ 🍦 🏷️⬆️",
      text: T(
        "Another reason: milk and sugar cost the seller more. So the scoop costs more too.",
        "Noch ein Grund: Milch und Zucker kosten den Eisverkäufer mehr. Darum kostet auch die Kugel mehr.",
      ),
    },
    {
      scene: "🍦🏷️⬆️ 🍞🏷️⬆️ 👟🏷️⬆️ ➡️ 🪙 = ½",
      text: T(
        "When most prices in a town go up over time, we call it inflation. The same coin buys less than before.",
        "Wenn die meisten Preise in einer Stadt mit der Zeit steigen, nennt man das Inflation. Dieselbe Münze kauft dann weniger als früher.",
      ),
    },
    {
      scene: "🧑 🪙×10 ➡️ 🏷️⬆️⬆️ ➡️ 🍦⬇️",
      mood: "think",
      text: T(
        "A little inflation is normal. A lot is hard. Sam still gets 10 coins a day for his shoes, but if prices climb fast, those coins buy less and less.",
        "Ein bisschen Inflation ist normal. Viel davon ist hart. Sam bekommt für seine Schuhe weiter 10 Münzen am Tag. Steigen die Preise schnell, kaufen sie immer weniger.",
      ),
    },
    {
      scene: "🫙🪙×10 ⏳ ➡️ 🍦⬇️",
      text: T(
        "Finn keeps 10 coins in a jar. If prices rise, next year they buy fewer scoops. Interest from a bank helps, but only if it is as big as the price rise.",
        "Finn hebt 10 Münzen in einem Glas auf. Steigen die Preise, kaufen sie nächstes Jahr weniger Kugeln. Zinsen von der Bank helfen, aber nur, wenn sie so groß sind wie der Preisanstieg.",
      ),
    },
    {
      scene: "🏷️⬇️ 🍦 ➡️ 🏪 😟",
      text: T(
        "Prices can fall too. That is called deflation. It sounds nice, but then shops earn less and may let workers go.",
        "Preise können auch sinken. Das nennt man Deflation. Es klingt schön, aber dann verdienen die Läden weniger und müssen vielleicht Leute entlassen.",
      ),
    },
  ],
  toyIntro: T(
    "Ice cream time machine! Jump ahead some years and pick how fast prices rise. Percent means out of 100: at 10, a 100-coin thing costs 110 next year. Watch what 10 coins buy.",
    "Eis-Zeitmaschine! Spring ein paar Jahre vor und stelle ein, wie schnell die Preise steigen. Prozent heißt von 100: Bei 10 kostet etwas, das 100 Münzen kostet, nächstes Jahr 110. Schau, was 10 Münzen kaufen.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "A scoop used to cost 1 coin. Now it costs 2 coins. What does one coin buy now?",
        "Eine Kugel kostete früher 1 Münze. Jetzt kostet sie 2 Münzen. Was kauft eine Münze jetzt?",
      ),
      options: [
        { text: T("One whole scoop", "Eine ganze Kugel") },
        { text: T("Half a scoop", "Eine halbe Kugel"), correct: true },
        { text: T("Two scoops", "Zwei Kugeln") },
      ],
      hint: T(
        "A whole scoop costs 2 coins now. One coin is only half of that, so it buys half a scoop.",
        "Eine ganze Kugel kostet jetzt 2 Münzen. Eine Münze ist nur die Hälfte davon, also bekommst du eine halbe Kugel.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "At the start, 10 coins buy 10 scoops. Set the time machine so that 10 coins buy only half as many. Press Check when you see it.",
        "Am Anfang kaufen 10 Münzen 10 Kugeln. Stelle die Zeitmaschine so ein, dass 10 Münzen nur halb so viele kaufen. Drücke Prüfen, wenn du es siehst.",
      ),
      Widget: HalfScoopsWidget,
      hint: T(
        "Half of 10 scoops is 5 scoops. Look at the scoops under the price tag. Move the sliders until exactly 5 are bright.",
        "Die Hälfte von 10 Kugeln sind 5 Kugeln. Schau auf die Kugeln neben dem Preisschild. Schiebe die Regler, bis genau 5 hell sind.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "The bank gives Finn 2 coins of interest for every 100 coins he saves. But prices rise by 5 coins out of 100. After a year, what is true?",
        "Die Bank gibt Finn für je 100 gesparte Münzen 2 Münzen Zinsen. Aber die Preise steigen um 5 von 100. Was stimmt nach einem Jahr?",
      ),
      options: [
        { text: T("His savings buy a bit more than before", "Seine Ersparnisse kaufen etwas mehr als vorher") },
        { text: T("His savings buy exactly the same as before", "Seine Ersparnisse kaufen genau so viel wie vorher") },
        { text: T("His savings buy a bit less than before", "Seine Ersparnisse kaufen etwas weniger als vorher"), correct: true },
      ],
      hint: T(
        "His savings grew by 2 out of 100, but prices grew by 5 out of 100. Prices ran faster, so each coin buys less.",
        "Seine Ersparnisse wuchsen um 2 von 100, aber die Preise um 5 von 100. Die Preise waren schneller, also kauft jede Münze weniger.",
      ),
    },
  ],
  askDad: T(
    "Do you remember what an ice cream or a bus ticket cost when you were my age? What does it cost now? Why do you think it changed?",
    "Weißt du noch, was ein Eis oder ein Busticket kostete, als du so alt warst wie ich? Was kostet es heute? Warum hat sich der Preis wohl geändert?",
  ),
  realLife: {
    title: T("Prices in Germany", "Preise in Deutschland"),
    body: T(
      "In Germany, the statistics office Destatis checks prices every month. It looks at things families buy, like food, rent and haircuts, and works out how much prices changed. The European Central Bank (ECB) aims for prices to rise by about 2 percent a year. In 2022 they rose by about 7 percent, much faster than in the years before.",
      "In Deutschland prüft das Statistische Bundesamt (Destatis) jeden Monat die Preise. Es schaut auf Dinge, die Familien kaufen, wie Essen, Miete und Friseur, und rechnet aus, wie stark sich die Preise verändert haben. Die Europäische Zentralbank (EZB) möchte, dass die Preise um etwa 2 Prozent im Jahr steigen. Im Jahr 2022 stiegen sie um etwa 7 Prozent, viel schneller als in den Jahren davor.",
    ),
  },
  factCard: {
    claims: [
      {
        text: "Inflation means a persistent rise in the general price level (prices in general, not single products). The inflation rate is the percentage by which the price level rose over a period, for example a year. Inflation lowers the purchasing power of money: more money must be spent to buy the same products.",
        source: "https://www.bundesbank.de/en/bundesbank/research/survey-on-consumer-expectations-bop-hh/background-information-850064",
      },
      {
        text: "High inflation means you lose purchasing power: the money you have, income and savings, does not buy as much as it used to. The ECB describes the result as being able to buy less for your money.",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/stableprices.en.html",
      },
      {
        text: "Inflation can rise when growing demand outstrips the supply of goods and services (demand-pull), or when the cost of producing them rises notably or they cannot be produced in sufficient quantities (cost-push).",
        source: "https://www.clevelandfed.org/center-for-inflation-research/inflation-explained-your-guide-to-inflation-basics/what-causes-inflation",
      },
      {
        text: "Salaries, pensions and social benefits generally do not rise at first when prices rise, so those who receive them are hit hard. High inflation also hurts savers: their deposits noticeably lose purchasing power. Example from the Bundesbank: shoes at 100 euros cost 105 euros after one year and almost 128 euros after five years at 5% inflation.",
        source: "https://www.bundesbank.de/en/service/school-service/animation-videos/price-stability-860064",
      },
      {
        text: "Real interest is interest corrected for the loss of purchasing power; approximately it is the nominal interest rate minus the inflation rate (for low rates and price changes). So interest smaller than inflation does not keep the buying power of savings.",
        source: "https://www.bundesbank.de/de/statistiken/geld-und-kapitalmaerkte/zinssaetze-und-renditen/realzinssaetze-auf-bankeinlagen/realzinssaetze-auf-bankeinlagen-772412",
      },
      {
        text: "Deflation (falling price level) is also harmful: companies make less profit, some lay off employees, and people postpone purchases hoping for lower prices, which can start a downward spiral.",
        source: "https://www.bundesbank.de/en/service/school-service/animation-videos/price-stability-860064",
      },
      {
        text: "Destatis publishes the consumer price index (CPI) monthly. It measures the average price development of all goods and services that private households in Germany buy for consumption. The change against the previous year or month is called the inflation rate.",
        source: "https://www.destatis.de/DE/Themen/Wirtschaft/Preise/Verbraucherpreisindex/_inhalt.html",
      },
      {
        text: "The ECB's Governing Council considers that price stability is best maintained by aiming for 2% inflation over the medium term, measured by the Harmonised Index of Consumer Prices (HICP), for the euro area as a whole.",
        source: "https://www.ecb.europa.eu/mopo/strategy/pricestab/html/index.en.html",
      },
      {
        text: "Germany's annual average CPI inflation was 6.9% in 2022 (Destatis GENESIS table, retrieved 29 October 2026), the highest year in the table for 1991 to 2025. Later years: 5.9% in 2023, 2.2% in 2024 and 2025. Lesson says 'about 7 percent'.",
        source: "https://genesis.destatis.de/datenbank/online/statistic/61111/table/61111-0001",
      },
      {
        text: "Destatis described the 2022 rise as historically high, driven mainly by extreme price rises for energy products and food since the war in Ukraine started. (That first release gave 7.9% before the index was recalculated to base year 2020, which gives the 6.9% above.)",
        source: "https://www.destatis.de/EN/Press/2023/01/PE23_022_611.html",
      },
    ],
    simplified: [
      "Ice cream prices, the 1 coin to 2 coins jump and Finn's 10 coins are made up. Real prices differ for every product and rarely double within one year.",
      "The lesson says inflation is 'most prices going up over time'. Official definitions say a persistent rise in the general price level, measured by an index of a basket of goods. Fair for age 8: same idea, no index maths.",
      "Only two causes are shown (more wanting than there is, and higher costs for the seller). Economists also name expectations and other causes, and real inflation usually has several causes at once.",
      "The toy applies one fixed percentage every year and rounds the scoop price to one tenth of a coin. Real inflation changes from month to month, and different prices rise at different speeds.",
      "'The same coin buys less' is true on average. Some prices fall while others rise; Destatis follows the average of a basket.",
      "'Interest helps, but only if it is as big as the price rise' simplifies real interest (nominal rate minus inflation, approximately). It ignores taxes on interest. Fair because the child needs only the idea that interest and price rises race each other.",
      "The ECB aim is told as 'about 2 percent a year'. The official wording is 2% over the medium term for the euro area, measured by the HICP, not Germany's CPI. Prices in Germany are checked with the CPI by Destatis; both move similarly. The lesson does not explain the two indices.",
      "'In 2022 they rose by about 7 percent' uses the current Destatis figure of 6.9% (CPI annual average). The first release said 7.9% before the index was recalculated. The German twin and card say 'about 7 percent'; the lesson does not name the 2022 causes.",
      "Deflation is told in one sentence (shops earn less, may let workers go). The Bundesbank also names the downward spiral and postponed purchases.",
      "Not used in the lesson: Destatis reported 3.3% inflation for September 2026 (press release of 13 October 2026). It is listed here so a parent can see current context, and it will go out of date.",
    ],
  },
};
