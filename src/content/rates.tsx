import { useEffect, useState } from "react";
import { CheckButton, Slider, Stage, ToyButton } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import type { Lang } from "../progress";
import "./rates.css";

const T = (en: string, de: string): Text => ({ en, de });

/* ---------- Town thermostat model (kept simple on purpose) ---------- */

export interface Sim {
  /** The key rate the child has set, in percent. */
  rate: number;
  /** The rate people in town actually feel. It follows `rate` slowly. */
  felt: number;
  /** How hot the town is, 0 to 100. 40 to 60 is "just right". */
  heat: number;
}

export type Zone = "hot" | "right" | "cold";

export const START_SIM: Sim = { rate: 1, felt: 1, heat: 85 };
/** At this felt rate the town settles at 50, which is just right. */
const NEUTRAL_RATE = 3;

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/** One tick of time. Rates reach people slowly, and the town reacts slowly to rates. */
export function stepSim(s: Sim): Sim {
  const felt = s.felt + (s.rate - s.felt) * 0.2;
  const target = clamp(50 - 12 * (felt - NEUTRAL_RATE), 0, 100);
  const heat = s.heat + (target - s.heat) * 0.1;
  return { ...s, felt, heat };
}

export function zoneOf(heat: number): Zone {
  if (heat > 60) return "hot";
  if (heat < 40) return "cold";
  return "right";
}

/** Jobs stay plentiful while the town is warm and drop when it gets cold. */
export function jobsOf(heat: number): number {
  return clamp(90 - Math.max(0, 45 - heat) * 2, 0, 100);
}

const TICK_MS = 400;

function useSim() {
  const [sim, setSim] = useState<Sim>(START_SIM);
  useEffect(() => {
    const id = window.setInterval(() => setSim((s) => stepSim(s)), TICK_MS);
    return () => window.clearInterval(id);
  }, []);
  return [sim, setSim] as const;
}

const OTTO_SAYS: Record<Zone, Text> = {
  hot: T("Otto reads the gauge: prices are rising fast. Too hot!", "Otto liest die Anzeige: Die Preise steigen schnell. Zu heiß!"),
  right: T("Otto reads the gauge: prices and jobs look fine. Just right!", "Otto liest die Anzeige: Preise und Arbeit sehen gut aus. Genau richtig!"),
  cold: T(
    "Otto reads the gauge: prices barely rise and jobs are going. Too cold!",
    "Otto liest die Anzeige: Die Preise steigen kaum und Arbeit geht verloren. Zu kalt!",
  ),
};

const TOWN_PIC: Record<Zone, string> = { hot: "🏘️🔥", right: "🏘️😊", cold: "🏘️🥶" };

function Thermostat({ lang, sim, setSim }: { lang: Lang; sim: Sim; setSim: (s: Sim) => void }) {
  const en = lang === "en";
  const zone = zoneOf(sim.heat);
  const jobs = jobsOf(sim.heat);
  const catchingUp = Math.abs(sim.rate - sim.felt) > 0.3;

  return (
    <Stage label={en ? "Town thermostat" : "Stadt-Thermostat"}>
      <div className="thermo">
        <div className="thermo-town" aria-hidden="true">
          {TOWN_PIC[zone]}
        </div>
        <div className="thermo-controls">
          <Slider
            label={en ? "Key rate in %" : "Leitzins in %"}
            value={sim.rate}
            min={0}
            max={8}
            step={1}
            onChange={(v) => setSim({ ...sim, rate: v })}
            left={en ? "loans cheap" : "Kredite billig"}
            right={en ? "loans costly" : "Kredite teuer"}
          />
          <p className="thermo-rates">
            🏦 {en ? "Rates people in town feel now" : "Zinsen, die die Leute jetzt spüren"}: <strong>{en ? `${sim.felt.toFixed(1)}%` : `${sim.felt.toFixed(1).replace(".", ",")} %`}</strong>
          </p>
          <p className="thermo-wait">{catchingUp ? (en ? "⏳ Rates are still catching up..." : "⏳ Die Zinsen kommen erst langsam an...") : ""}</p>
          <ToyButton onClick={() => setSim(START_SIM)}>↺ {en ? "Start again" : "Von vorn"}</ToyButton>
        </div>
        <div className="thermo-gauges">
          <div>
            <div className="gauge-name">
              <span>🌡️ {en ? "Prices rising" : "Preise steigen"}</span>
            </div>
            <div
              className="gauge-track"
              role="meter"
              aria-label={en ? "Prices rising" : "Preise steigen"}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sim.heat)}
            >
              <div className="gauge-band" />
              <div className={`gauge-fill ${zone}`} style={{ width: `${sim.heat}%` }} />
            </div>
            <div className="gauge-ends">
              <span>{en ? "slowly" : "langsam"}</span>
              <span>{en ? "just right" : "genau richtig"}</span>
              <span>{en ? "fast" : "schnell"}</span>
            </div>
          </div>
          <div>
            <div className="gauge-name">
              <span>🧑‍🔧 {en ? "Jobs" : "Arbeit"}</span>
            </div>
            <div
              className="gauge-track"
              role="meter"
              aria-label={en ? "Jobs" : "Arbeit"}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(jobs)}
            >
              <div className="gauge-fill jobs" style={{ width: `${jobs}%` }} />
            </div>
            <div className="gauge-ends">
              <span>{en ? "few jobs" : "wenig Arbeit"}</span>
              <span>{en ? "plenty of jobs" : "viel Arbeit"}</span>
            </div>
          </div>
          <p className="thermo-otto" role="status">
            🦦 {OTTO_SAYS[zone][lang]}
          </p>
        </div>
      </div>
    </Stage>
  );
}

function Toy({ lang }: ToyProps) {
  const [sim, setSim] = useSim();
  return <Thermostat lang={lang} sim={sim} setSim={setSim} />;
}

/** Start with a hot town. The child sets the rate, waits, and presses Check when the town is just right. */
function CoolDownWidget({ lang, onAnswer }: WidgetProps) {
  const [sim, setSim] = useSim();
  return (
    <>
      <Thermostat lang={lang} sim={sim} setSim={setSim} />
      <div className="row nav">
        <CheckButton lang={lang} onClick={() => onAnswer(zoneOf(sim.heat) === "right")} />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "rates",
  story: [
    {
      scene: "🏘️ 🔥 🍞 👟",
      text: T(
        "Ripple Town is very busy. Everyone buys a lot. Bread costs more this week, and shoes cost more too. Otto says: The town is too hot!",
        "In Ripple Town ist viel los. Alle kaufen ganz viel ein. Das Brot kostet diese Woche mehr, und die Schuhe auch. Otto sagt: Die Stadt ist zu heiß!",
      ),
    },
    {
      scene: "🏦 ➡️ 🏦",
      mood: "think",
      text: T(
        "Banks have a bank of their own. It is the central bank, the bank for the banks. It also looks after the country's money, even the printing of notes.",
        "Auch Banken haben eine eigene Bank. Das ist die Zentralbank, die Bank für die Banken. Sie kümmert sich auch ums Geld des Landes, sogar ums Drucken der Scheine.",
      ),
    },
    {
      scene: "🏦 🎚️ 📊",
      text: T(
        "The central bank sets one special interest rate, the key rate. Other banks watch it. When it moves, loan rates and saving rates usually move the same way.",
        "Die Zentralbank legt einen besonderen Zinssatz fest, den Leitzins. Die anderen Banken schauen darauf. Wenn er sich bewegt, ziehen die Zinsen für Kredite und Sparen meistens mit.",
      ),
    },
    {
      scene: "🔥 🎚️⬆️ ➡️ 😌",
      text: T(
        "Town too hot? The central bank raises the key rate. Loans cost more, so people borrow and spend less. Saving pays more. Prices calm down.",
        "Die Stadt ist zu heiß? Dann erhöht die Zentralbank den Leitzins. Kredite kosten mehr, also leihen und kaufen die Leute weniger. Sparen bringt mehr. Die Preise beruhigen sich.",
      ),
    },
    {
      scene: "🥶 🎚️⬇️ ➡️ 🏗️ 🛍️",
      text: T(
        "Town too cold? Shops are empty and people lose their jobs. The central bank lowers the key rate. Loans get cheaper, so people build and buy again.",
        "Die Stadt ist zu kalt? Die Läden sind leer und Leute verlieren ihre Arbeit. Dann senkt die Zentralbank den Leitzins. Kredite werden billiger, also bauen und kaufen die Leute wieder.",
      ),
    },
    {
      scene: "⏳ 🎚️ 🌡️",
      mood: "think",
      text: T(
        "But it works slowly, like a thermostat in a big house. It can take many months to feel it. And the central bank never gets it exactly right.",
        "Aber es wirkt langsam, wie ein Thermostat in einem großen Haus. Es kann viele Monate dauern, bis man es spürt. Und ganz genau trifft die Zentralbank es nie.",
      ),
    },
    {
      scene: "👨‍👩‍👧 🏠 🎚️",
      text: T(
        "It reaches families too. When rates are high, a new loan for a house costs more. When rates are low, it costs less. Saving pays more when rates are high.",
        "Das betrifft auch Familien. Bei hohen Zinsen kostet ein neuer Kredit für ein Haus mehr. Bei niedrigen Zinsen kostet er weniger. Sparen bringt bei hohen Zinsen mehr.",
      ),
    },
  ],
  toyIntro: T(
    "Turn the key rate like a thermostat. Watch prices and jobs. Be patient: the town reacts slowly!",
    "Dreh am Leitzins wie an einem Thermostat. Schau auf Preise und Arbeit. Hab Geduld: Die Stadt reagiert langsam!",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "The town is too quiet. Shops are empty and people lose their jobs. What can the central bank do?",
        "Die Stadt ist zu still. Die Läden sind leer und Leute verlieren ihre Arbeit. Was kann die Zentralbank tun?",
      ),
      options: [
        { text: T("Raise the key rate", "Den Leitzins erhöhen") },
        { text: T("Lower the key rate", "Den Leitzins senken"), correct: true },
        { text: T("Never change the key rate", "Den Leitzins nie ändern") },
      ],
      hint: T(
        "A cold town needs warming up. A lower key rate makes loans cheaper, so people build, buy and give work to others.",
        "Eine kalte Stadt muss warm werden. Ein niedrigerer Leitzins macht Kredite billiger, und die Leute bauen, kaufen und geben anderen Arbeit.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "The town is too hot. Set the key rate so it becomes just right. Wait and watch the gauge, then press Check.",
        "Die Stadt ist zu heiß. Stelle den Leitzins so ein, dass sie genau richtig wird. Warte und schau auf die Anzeige. Drücke dann Prüfen.",
      ),
      Widget: CoolDownWidget,
      hint: T(
        "Not yet just right. A hot town needs a higher key rate. But it works slowly, so wait until the gauge is inside the 'just right' box before you press Check.",
        "Noch nicht genau richtig. Eine heiße Stadt braucht einen höheren Leitzins. Aber es wirkt langsam. Warte, bis die Anzeige im Kasten „genau richtig“ ist, und drücke dann Prüfen.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "A family wants a new loan for a house. The key rate has gone up. What usually happens?",
        "Eine Familie will einen neuen Kredit für ein Haus. Der Leitzins ist gestiegen. Was passiert meistens?",
      ),
      options: [
        { text: T("The loan costs less", "Der Kredit kostet weniger") },
        { text: T("The loan costs the same", "Der Kredit kostet gleich viel") },
        { text: T("The loan costs more", "Der Kredit kostet mehr"), correct: true },
      ],
      hint: T(
        "When the key rate goes up, banks usually charge more interest on loans too. So the loan costs more.",
        "Wenn der Leitzins steigt, verlangen die Banken meistens auch mehr Zinsen für Kredite. Der Kredit kostet also mehr.",
      ),
    },
  ],
  askDad: T(
    "Have you noticed something getting more expensive lately? Why do you think that happens? And what would change for our family if loans got more expensive?",
    "Hast du in letzter Zeit bemerkt, dass etwas teurer geworden ist? Warum, glaubst du, passiert das? Und was würde sich für unsere Familie ändern, wenn Kredite teurer würden?",
  ),
  realLife: {
    title: T("Who sets interest rates in Germany?", "Wer bestimmt die Zinsen in Deutschland?"),
    body: T(
      "In Germany we use the euro, so the European Central Bank (ECB) in Frankfurt sets the key rates. Germany's Bundesbank takes part in the decision. The ECB wants prices to rise by about 2 percent a year. From July 2022 to September 2023 it raised its rates 10 times, because prices were rising too fast.",
      "In Deutschland nutzen wir den Euro, deshalb legt die Europäische Zentralbank (EZB) in Frankfurt die Leitzinsen fest. Die Deutsche Bundesbank entscheidet mit. Die EZB möchte, dass die Preise um etwa 2 Prozent im Jahr steigen. Von Juli 2022 bis September 2023 hat sie ihre Zinsen 10 Mal erhöht, weil die Preise zu schnell stiegen.",
    ),
  },
  factCard: {
    claims: [
      {
        text: "The ECB is the central bank for the euro and is based in Frankfurt am Main, Germany. Its main objective is to keep prices stable. It works within the Eurosystem, which groups the ECB with the national central banks of the euro area countries.",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/five_things.en.html",
      },
      {
        text: "The ECB's Governing Council (the six Executive Board members plus the governors of the euro area's national central banks) formulates monetary policy for the euro area, including the key interest rates. It takes monetary policy decisions every six weeks or so.",
        source: "https://www.ecb.europa.eu/ecb/decisions/govc/html/index.en.html",
      },
      {
        text: "The Bundesbank President is a voting member of the ECB Governing Council and so takes part in monetary policy decisions. The ECB and the euro area's national central banks, including the Bundesbank, together form the Eurosystem.",
        source: "https://www.bundesbank.de/en/tasks/monetary-policy/monetary-policy-625914",
      },
      {
        text: "The ECB aims for 2% inflation over the medium term, assessed for the euro area as a whole.",
        source: "https://www.ecb.europa.eu/mopo/strategy/pricestab/html/index.en.html",
      },
      {
        text: "The ECB does not set the rates people pay on loans or get on savings, but it influences them. The key rates are the rates the ECB offers to banks. When the ECB changes key rates, rates on loans and savings usually move broadly the same way.",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/html/interest-rates-changes.en.html",
      },
      {
        text: "If inflation is too high, the ECB can raise rates to make credit more expensive, which cools the economy and brings inflation down. If inflation is too low, it can lower rates and make credit cheaper to boost investment and spending.",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/html/interest-rates-changes.en.html",
      },
      {
        text: "In a downturn with inflation below target, a low interest rate makes credit cheaper and stimulates demand. When the economy is overheating and inflation is above target, a high rate makes borrowing more expensive so the economy and the rate at which prices rise can slow down. The ECB links prices that stop rising and start to fall (deflation) with locked-up spending and job losses.",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/five_things.en.html",
      },
      {
        text: "Higher interest rates make it less attractive to take out loans to finance consumption or investment. Monetary policy transmission has 'long, variable and uncertain time lags', so the precise effect is hard to predict.",
        source: "https://www.ecb.europa.eu/mopo/intro/transmission/html/index.en.html",
      },
      {
        text: "On 21 July 2022 the ECB decided to raise its three key interest rates by 50 basis points (0.5 percentage points), effective 27 July 2022. This was the first of the rises.",
        source: "https://www.ecb.europa.eu/press/pr/date/2022/html/ecb.mp220721~53e5bdd317.en.html",
      },
      {
        text: "On 14 September 2023 the ECB raised the three key rates by a further 25 basis points, effective 20 September 2023, taking the deposit facility rate to 4.00% (main refinancing rate 4.50%).",
        source: "https://www.ecb.europa.eu/press/pr/date/2023/html/ecb.mp230914~aab39f8c21.en.html",
      },
      {
        text: "The ECB's table of key interest rates lists 10 increases between 27 July 2022 and 20 September 2023 (27 Jul, 14 Sep, 2 Nov, 21 Dec 2022; 8 Feb, 22 Mar, 10 May, 21 Jun, 2 Aug, 20 Sep 2023). Table read on 29 October 2026.",
        source: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/key_ecb_interest_rates/html/index.en.html",
      },
      {
        text: "The ECB says it raised rates because inflation was too high, started in July 2022 and kept going until September 2023.",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/html/interest-rates-changes.en.html",
      },
      {
        text: "Euro banknotes are produced across the euro area under ECB oversight (the lesson says the central bank 'looks after' the printing of notes).",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/five_things.en.html",
      },
    ],
    simplified: [
      "The town thermostat is a picture, not a real model. Real economies have many more forces (energy prices, supply problems, world events), and the ECB names some of these as reasons for the 2022 price jump.",
      "In the toy, the rate people feel equals the key rate and just lags behind. In reality banks add their own margins, and loan and savings rates also depend on how much people want to borrow and save.",
      "'Jobs fall when the town is cold' is a general tendency, not a rule.",
      "The real time lag is long, variable and uncertain, not a fixed number of months. The lesson says 'many months' and 'never exactly right'.",
      "The story says a new house loan 'costs more' when rates are high. Many existing loans have fixed rates for years and do not change at once, so the lesson only talks about new loans.",
      "The ECB sets three key rates, and since March 2024 steers mainly through the deposit facility rate. The lesson calls them 'the key rate' and says the ECB raised 'its rates' 10 times, counting the dates on which all three were raised together.",
      "The ECB's 2% target is 'over the medium term'. The lesson says 'about 2 percent a year' to keep it short.",
      "'The bank for the banks' is a simplification. The central bank lends to banks and holds their overnight deposits, but it also supervises big banks and does other tasks.",
      "The lesson does not name the current key rate on purpose, because it changes. The ECB table above shows it.",
    ],
  },
};
