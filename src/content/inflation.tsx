import { useState } from "react";
import { CheckButton, animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  CostsDiagram,
  DeflationDiagram,
  InflationDiagram,
  JarDiagram,
  LastSummerDiagram,
  ManyWantDiagram,
  SamDiagram,
  TwoCoinsDiagram,
} from "./inflation.diagrams";
import { POCKET, START, TimeMachine, scoopsFor } from "./inflation.toy";
import type { Setting } from "./inflation.toy";

export { priceTenths, scoopsFor } from "./inflation.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  const [s, setS] = useState<Setting>(START);
  return (
    <TimeMachine
      lang={lang}
      value={s}
      onChange={(next) => {
        setS(next);
        onDone?.();
      }}
    />
  );
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
    animatedBeat(
      [
        T("Finn loves ice cream.", "Finn liebt Eis."),
        T(
          "In Ripple Town, the ice cream seller sells it from a little stand. That is the seller's job.",
          "In Ripple Town verkauft der Eisverkäufer es an einem kleinen Stand. Das ist sein Beruf.",
        ),
        T("Last summer, one scoop of ice cream cost 1 coin.", "Letzten Sommer kostete eine Kugel Eis 1 Münze."),
        T(
          "Finn bought one scoop every Friday. He gave his coin, and he got his scoop.",
          "Finn kaufte sich jeden Freitag eine Kugel. Er gab seine Münze, und er bekam sein Eis.",
        ),
      ],
      LastSummerDiagram,
    ),
    animatedBeat(
      [
        T(
          "But this summer, something is different. One scoop now costs 2 coins!",
          "Aber diesen Sommer ist etwas anders. Eine Kugel kostet jetzt 2 Münzen!",
        ),
        T("Finn still has just his 1 coin.", "Finn hat immer noch nur seine 1 Münze."),
        T(
          "Now his coin buys only half a scoop. Finn is sad.",
          "Jetzt bekommt er für seine Münze nur noch eine halbe Kugel. Finn ist traurig.",
        ),
      ],
      TwoCoinsDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Why did the price go up? Here is the first reason. Everybody in town wants ice cream.",
          "Warum ist der Preis gestiegen? Hier ist der erste Grund. Alle in der Stadt wollen Eis.",
        ),
        T("But the seller can only make so much ice cream.", "Aber der Eisverkäufer kann nur so viel Eis machen."),
        T(
          "When lots of people want something and there is only so much of it, the seller can ask for more coins.",
          "Wenn viele Leute etwas wollen und es nur so viel davon gibt, kann der Verkäufer mehr Münzen verlangen.",
        ),
      ],
      ManyWantDiagram,
    ),
    animatedBeat(
      [
        T(
          "Here is the second reason. To make ice cream, the seller needs milk and sugar.",
          "Hier ist der zweite Grund. Für Eis braucht der Eisverkäufer Milch und Zucker.",
        ),
        T(
          "Now milk and sugar cost the seller more coins than before.",
          "Jetzt kosten Milch und Zucker den Eisverkäufer mehr Münzen als früher.",
        ),
        T(
          "So the seller asks for more coins for each scoop, too.",
          "Darum verlangt der Verkäufer auch für jede Kugel mehr Münzen.",
        ),
      ],
      CostsDiagram,
    ),
    animatedBeat(
      [
        T(
          "It is not only ice cream. Bread costs more than before, and shoes do too.",
          "Nicht nur Eis ist teurer geworden. Auch Brot kostet mehr als früher, und Schuhe auch.",
        ),
        T(
          "When most prices in a town go up over time, that has a name. It is called *inflation*.",
          "Wenn die meisten Preise in einer Stadt mit der Zeit steigen, hat das einen Namen. Man nennt es *Inflation*.",
        ),
        T(
          "With inflation, the same coin buys less than before.",
          "Bei Inflation kauft dieselbe Münze weniger als früher.",
        ),
      ],
      InflationDiagram,
    ),
    animatedBeat(
      [
        T(
          "Sam is a shoemaker. That means his job is to make shoes. He still gets 10 coins a day for them.",
          "Sam ist Schuhmacher. Das heißt, sein Beruf ist es, Schuhe zu machen. Er bekommt dafür weiter 10 Münzen am Tag.",
        ),
        T(
          "A little inflation is normal. Prices go up slowly, and his coins buy only a bit less.",
          "Ein bisschen Inflation ist normal. Die Preise steigen langsam, und seine Münzen kaufen nur etwas weniger.",
        ),
        T(
          "A lot of inflation is hard. If prices climb fast, his 10 coins buy less and less.",
          "Viel Inflation ist hart. Steigen die Preise schnell, kaufen seine 10 Münzen immer weniger.",
        ),
      ],
      SamDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Finn keeps 10 coins in a jar. He is saving them for later.",
          "Finn hebt 10 Münzen in einem Glas auf. Er spart sie für später.",
        ),
        T(
          "If prices rise, his 10 coins buy fewer scoops next year than they buy today.",
          "Steigen die Preise, kaufen seine 10 Münzen nächstes Jahr weniger Kugeln als heute.",
        ),
        T(
          "Interest from a bank helps. But it only keeps up if it is as big as the price rise.",
          "Zinsen von der Bank helfen. Aber nur, wenn sie so groß sind wie der Preisanstieg.",
        ),
      ],
      JarDiagram,
    ),
    animatedBeat(
      [
        T(
          "Prices can also fall. When most prices in a town go down over time, it is called *deflation*.",
          "Preise können auch sinken. Wenn die meisten Preise in einer Stadt mit der Zeit sinken, nennt man das *Deflation*.",
        ),
        T(
          "That sounds nice, but then the shops earn less money.",
          "Das klingt schön, aber dann verdienen die Läden weniger Geld.",
        ),
        T(
          "A shop that earns less may have to let some workers go. That means the workers lose their jobs.",
          "Ein Laden, der weniger verdient, muss vielleicht Leute entlassen. Das heißt, sie verlieren ihre Arbeit.",
        ),
      ],
      DeflationDiagram,
    ),
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
        "Half of 10 scoops is 5 scoops. Look at the scoops next to the price tag. Move the sliders until exactly 5 are bright.",
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
