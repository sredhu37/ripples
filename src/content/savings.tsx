import { useState } from "react";
import { CheckButton, Slider, Stage, ToyButton } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import type { Lang } from "../progress";
import "./savings.css";

const T = (en: string, de: string): Text => ({ en, de });

const POCKET = 4; // coins of pocket money each week
const BIKE = 12; // price of the bike in coins
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

function Planner({
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
          <span>
            🧒 {en ? "Pocket money" : "Taschengeld"}: {POCKET} 🪙 {en ? "a week" : "pro Woche"}
          </span>
          <span>
            🚲 {en ? "Bike" : "Fahrrad"}: {BIKE} 🪙
          </span>
          <span>
            🍬 {en ? "Sweets" : "Naschen"}: {p.treats} 🪙
          </span>
        </div>
        <div className="sv-grid" aria-hidden="true">
          <span className="sv-head">{en ? "Week" : "Woche"}</span>
          {p.weeks.map((w) => (
            <span
              key={`w${w.n}`}
              className={`sv-cell sv-week${w.buy ? " sv-buy" : ""}${w.rain ? " sv-rain" : ""}${w.buy && w.rain ? " sv-both" : ""}`}
            >
              {w.buy && w.rain ? "🚲🌧️" : w.buy ? "🚲" : w.rain ? "🌧️" : w.n}
            </span>
          ))}
          <span className="sv-head">🐷🚲</span>
          {p.weeks.map((w) => (
            <span key={`b${w.n}`} className={`sv-cell${p.bikeWeek !== null && w.n > p.bikeWeek ? " sv-done" : ""}`}>
              {w.bike}
            </span>
          ))}
          {full && cushion && (
            <>
              <span className="sv-head">🐷🌧️</span>
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
                🐷🌧️{" "}
                {en
                  ? cushion
                    ? "Rainy-day jar: ON"
                    : "Rainy-day jar: OFF"
                  : cushion
                    ? "Regentag-Glas: AN"
                    : "Regentag-Glas: AUS"}
              </ToyButton>
              <ToyButton pressed={rain} onClick={() => setRain(!rain)}>
                🌧️{" "}
                {en
                  ? rain
                    ? "Rain in week 4: ON"
                    : "Rain in week 4: OFF"
                  : rain
                    ? "Regen in Woche 4: AN"
                    : "Regen in Woche 4: AUS"}
              </ToyButton>
            </div>
          )}
        </div>
      </div>
    </Stage>
  );
}

function Toy({ lang }: ToyProps) {
  const [save, setSave] = useState(2);
  return <Planner lang={lang} full save={save} setSave={setSave} />;
}

function BikeInFourWidget({ lang, onAnswer }: WidgetProps) {
  const [save, setSave] = useState(2);
  // The widget has no rainy-day jar and no rain, so the plan is plan(save, false, false).
  const p = plan(save, false, false);
  const ok = p.bikeWeek !== null && p.bikeWeek <= 4 && p.treats >= 1;
  return (
    <>
      <Planner lang={lang} full={false} save={save} setSave={setSave} />
      <div className="row nav">
        <CheckButton lang={lang} onClick={() => onAnswer(ok)} />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "savings",
  story: [
    {
      scene: "🧒 🪙🪙🪙🪙 📅",
      text: T(
        "This is Pip. Every week Pip gets 4 coins of pocket money from Dad. What should Pip do with them?",
        "Das ist Pip. Jede Woche bekommt Pip 4 Münzen Taschengeld von Papa. Was soll Pip damit machen?",
      ),
    },
    {
      scene: "🚲 🏷️ 12 🪙",
      text: T(
        "In a shop window Pip sees a red bike. It costs 12 coins. That is much more than 4. Pip cannot buy it today.",
        "Im Schaufenster sieht Pip ein rotes Fahrrad. Es kostet 12 Münzen. Das ist viel mehr als 4. Heute kann Pip es nicht kaufen.",
      ),
    },
    {
      scene: "🍬🍬🍬🍬 😋 ➡️ 🪙 0",
      mood: "think",
      text: T(
        "Pip could buy sweets with all 4 coins. Yum! But then the coins are gone, and the bike is no closer.",
        "Pip könnte von allen 4 Münzen Süßes kaufen. Lecker! Aber dann sind die Münzen weg, und das Fahrrad ist keinen Schritt näher.",
      ),
    },
    {
      scene: "🐷 🪙🪙🪙",
      text: T(
        "Or Pip can save. Saving means you do not spend everything now. You keep some coins for later, in a piggy bank.",
        "Oder Pip spart. Sparen heißt: Du gibst nicht alles sofort aus. Du hebst Münzen für später in einem Sparschwein auf.",
      ),
    },
    {
      scene: "🍬 👀 ⏳ 🐷",
      mood: "think",
      text: T(
        "Saving is a choice: sweets now, or a bike later. Waiting is hard! But every week the piggy bank gets fuller.",
        "Sparen ist eine Entscheidung: jetzt Süßes oder später ein Fahrrad. Warten ist schwer! Aber jede Woche wird das Sparschwein voller.",
      ),
    },
    {
      scene: "3 + 3 + 3 + 3 = 12 🪙 ➡️ 🚲",
      mood: "happy",
      text: T(
        "Pip saves 3 coins a week and keeps 1 for sweets. After 4 weeks the piggy bank holds 12 coins. Pip buys the bike!",
        "Pip spart jede Woche 3 Münzen und behält 1 zum Naschen. Nach 4 Wochen liegen 12 Münzen im Sparschwein. Pip kauft das Fahrrad!",
      ),
    },
    {
      scene: "🌧️ 🥾💥 🪙🪙🪙",
      mood: "think",
      text: T(
        "One day it rains and Pip's boot breaks! Fixing it costs 3 coins. If the bike coins pay, the bike comes later.",
        "Eines Tages regnet es, und Pips Stiefel geht kaputt! Die Reparatur kostet 3 Münzen. Zahlen die Fahrrad-Münzen, kommt das Fahrrad später.",
      ),
    },
    {
      scene: "🐷🚲   🐷🌧️",
      mood: "happy",
      text: T(
        "So Pip keeps a second jar, a rainy-day jar, only for surprises. Two reasons to save: a goal you want, and a cushion.",
        "Darum hat Pip ein zweites Glas, das Regentag-Glas, nur für Überraschungen. Zwei Gründe zum Sparen: ein Ziel und ein Polster.",
      ),
    },
  ],
  toyIntro: T(
    "Plan Pip's pocket money! Slide the coins for the bike. Then switch on the rain, and then the rainy-day jar.",
    "Plane Pips Taschengeld! Schiebe, wie viele Münzen fürs Fahrrad gespart werden. Schalte dann den Regen an und danach das Regentag-Glas.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Pip spends all 4 coins on sweets every week. What happens to the bike?",
        "Pip gibt jede Woche alle 4 Münzen für Süßes aus. Was passiert mit dem Fahrrad?",
      ),
      options: [
        { text: T("The bike comes closer by itself", "Das Fahrrad kommt von allein näher") },
        { text: T("Pip gets the bike next week", "Pip bekommt das Fahrrad nächste Woche") },
        { text: T("Pip never has coins left for it", "Pip hat nie Münzen dafür übrig"), correct: true },
      ],
      hint: T(
        "Coins that are spent are gone. To buy the bike, Pip has to keep some coins each week.",
        "Ausgegebene Münzen sind weg. Um das Fahrrad zu kaufen, muss Pip jede Woche Münzen aufheben.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Pip wants the bike within 4 weeks and still wants 1 coin for sweets each week. Set the coins for the bike, then press Check.",
        "Pip will das Fahrrad in höchstens 4 Wochen und trotzdem jede Woche 1 Münze zum Naschen. Stelle die Münzen fürs Fahrrad ein und drücke dann Prüfen.",
      ),
      Widget: BikeInFourWidget,
      hint: T(
        "12 coins in 4 weeks means 3 coins each week. With 4 coins there is nothing left for sweets. With 2 coins the bike takes 6 weeks.",
        "12 Münzen in 4 Wochen sind 3 Münzen pro Woche. Bei 4 Münzen bleibt nichts zum Naschen. Bei 2 Münzen dauert es 6 Wochen.",
      ),
    },
    {
      kind: "choice",
      prompt: T("What is the rainy-day jar for?", "Wofür ist das Regentag-Glas da?"),
      options: [
        { text: T("For surprises that cost coins", "Für Überraschungen, die Münzen kosten"), correct: true },
        { text: T("For buying sweets every day", "Zum Süßigkeiten kaufen jeden Tag") },
        { text: T("For paying for the bike", "Zum Bezahlen des Fahrrads") },
      ],
      hint: T(
        "The bike has its own jar. The rainy-day jar waits for surprises, like a broken boot.",
        "Das Fahrrad hat sein eigenes Glas. Das Regentag-Glas wartet auf Überraschungen, zum Beispiel einen kaputten Stiefel.",
      ),
    },
  ],
  askDad: T(
    "What did you save up for when you were small? Was it hard to wait? And what would we put in a rainy-day jar in our family?",
    "Worauf hast du als Kind gespart? War es schwer zu warten? Und was würden wir bei uns in ein Regentag-Glas legen?",
  ),
  realLife: {
    title: T("Pocket money in Germany", "Taschengeld in Deutschland"),
    body: T(
      "Families can give children pocket money (Taschengeld), but no law says they must. Experts suggest about 3 to 4 euros a week for 8 and 9 year olds. From age 7 you may buy small things with your pocket money. For your own bank account, your parents have to agree.",
      "Familien können Kindern Taschengeld geben, aber kein Gesetz sagt, dass sie es müssen. Fachleute empfehlen für 8- und 9-Jährige etwa 3 bis 4 Euro pro Woche. Ab 7 Jahren darfst du kleine Dinge von deinem Taschengeld kaufen. Für ein eigenes Konto müssen deine Eltern zustimmen.",
    ),
  },
  factCard: {
    claims: [
      {
        text: "Savings is money you set aside today to use in the future. People save for things like a bill that is due, school supplies, or personal goals like a car or an appliance.",
        source: "https://files.consumerfinance.gov/f/documents/cfpb_your-money-your-goals_savings_booklet_cobrand.pdf",
      },
      {
        text: "Unexpected expenses can get in the way of reaching a savings goal, so building a 'rainy day fund' helps people stay on track. An emergency fund is a cash reserve set aside for unplanned expenses such as car or home repairs.",
        source: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/",
      },
      {
        text: "Even a small amount put aside can provide some financial security. Without savings, even a minor financial shock can set you back, and it may turn into debt.",
        source: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/",
      },
      {
        text: "To save more, a first step is to write down income and spending and look at the spending side: where can you do without something? (Verbraucherzentrale, in German)",
        source: "https://www.verbraucherzentrale.de/podcast-umgang-mit-geld-infos-rund-ums-taschengeld-125596",
      },
      {
        text: "In Germany there is no legal duty to pay children pocket money. The German Youth Institute (DJI) recommends, as guidance only, 3.00 to 4.00 euros a week for 8 to 9 year olds (table from 2025, the latest found in October 2026).",
        source: "https://www.dji.de/fileadmin/user_upload/dasdji/publikationen/Broschueren_2025/DJI_Taschengeld_Expertise_2025.pdf",
      },
      {
        text: "In Germany, children and teenagers from age 7 can buy things within the limits of their pocket money (the 'Taschengeldparagraf') without their parents' approval, if they can pay straight away.",
        source: "https://www.verbraucherzentrale.de/wissen/digitale-welt/onlinehandel/geschaeftsfaehigkeit-was-duerfen-kinder-im-internet-einkaufen-8377",
      },
      {
        text: "In Germany, minors need their parents' consent to open a bank account, for transfers, cash withdrawals or a payment card.",
        source: "https://www.verbraucherzentrale.de/wissen/geld-versicherungen/sparen-und-anlegen/bankgeschaefte-mit-minderjaehrigen-eltern-muessen-meistens-zustimmen-10398",
      },
      {
        text: "For grown-ups, German consumer advice gives a rule of thumb of two to three monthly salaries as a cushion for unexpected costs, and says the right size depends on the person's situation.",
        source: "https://www.verbraucherzentrale.de/laura-zieht-aus/sparen",
      },
    ],
    simplified: [
      "Pip, the bike (12 coins), the 4-coin pocket money and the 3-coin boot repair are made up. Real prices and pocket money differ from family to family.",
      "Coins in the jars stay exactly the same. In a real bank account money can earn or cost a little extra; the lesson leaves that for a later lesson (interest) so the child sees only the saving choice.",
      "In the toy the rainy-day jar gets 1 coin every week. Real emergency funds are much bigger (grown-ups are advised months of income), but a few coins is a fair size for a child's surprise like a broken boot.",
      "The surprise always comes in week 4 and always costs 3 coins so that the child can compare plans. Real surprises come at random and cost different amounts.",
      "'Waiting is hard but every week the piggy bank gets fuller' is a story point, not a research claim. No study is cited for it.",
      "The German rule that children from 7 may buy small things is shown as 'you may buy small things with your pocket money'. The full rule has more conditions (for example, paying at once with money given for free use).",
      "The DJI amounts are euros and only a recommendation, not a law. The lesson says 'about 3 to 4 euros a week' and the toy uses coins, not euros.",
    ],
  },
};
