import { useState } from "react";
import { CheckButton, Slider, Stage } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import type { Lang } from "../progress";
import "./printing.css";

const T = (en: string, de: string): Text => ({ en, de });

/** Ripple Town starts with 20 coins and 10 loaves a day, so one loaf costs 2 coins. */
const START_COINS = 20;
const START_LOAVES = 10;
const START_PRICE = 2;

function fmt(n: number, lang: Lang): string {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(1);
  return lang === "de" ? s.replace(".", ",") : s;
}

/** The price of one loaf is simply: coins in town divided by loaves baked. */
function loafPrice(printed: number, loaves: number): number {
  return (START_COINS + printed) / loaves;
}

/** True when the price is still exactly the starting price (integer maths, no rounding). */
function priceUnchanged(printed: number, loaves: number): boolean {
  return START_COINS + printed === START_PRICE * loaves;
}

function say(printed: number, loaves: number): Text {
  const total = START_COINS + printed;
  if (total === START_PRICE * loaves) {
    return printed === 0
      ? T("Nothing printed yet. A loaf costs 2 coins.", "Noch nichts gedruckt. Ein Brot kostet 2 Münzen.")
      : T(
          "More coins AND more bread. The price stays at 2 coins!",
          "Mehr Münzen UND mehr Brot. Der Preis bleibt bei 2 Münzen!",
        );
  }
  if (total > START_PRICE * loaves) {
    return T(
      "More coins want the same bread, so each coin buys less. Prices go up!",
      "Mehr Münzen wollen das gleiche Brot, also kauft jede Münze weniger. Die Preise steigen!",
    );
  }
  return T(
    "Lots of bread and not so many coins. Bread gets cheaper.",
    "Viel Brot und nicht so viele Münzen. Das Brot wird billiger.",
  );
}

function PrintBoard({ lang, printed, loaves }: { lang: Lang; printed: number; loaves: number }) {
  const total = START_COINS + printed;
  const price = loafPrice(printed, loaves);
  const cls = priceUnchanged(printed, loaves) ? "same" : total > START_PRICE * loaves ? "up" : "down";
  return (
    <Stage label={lang === "en" ? "Ripple Town coins and bread" : "Münzen und Brot in Ripple Town"}>
      <div className="pr">
        <div className="pr-row">
          <strong>{lang === "en" ? `Coins in town: ${total}` : `Münzen in der Stadt: ${total}`}</strong>
          <span>{lang === "en" ? "(💰 = 10 coins)" : "(💰 = 10 Münzen)"}</span>
        </div>
        <div className="pr-pile" aria-hidden="true">
          {"💰".repeat(total / 10)}
        </div>
        <div className="pr-row">
          <strong>{lang === "en" ? `Loaves baked: ${loaves}` : `Gebackene Brote: ${loaves}`}</strong>
        </div>
        <div className="pr-pile" aria-hidden="true">
          {"🍞".repeat(loaves)}
        </div>
        <div className={`pr-tag ${cls}`} role="status">
          🏷️ {lang === "en" ? `1 loaf = ${fmt(price, lang)} coins` : `1 Brot = ${fmt(price, lang)} Münzen`}
        </div>
        <p className="pr-say">{say(printed, loaves)[lang]}</p>
      </div>
    </Stage>
  );
}

interface SlidersProps {
  lang: Lang;
  printed: number;
  loaves: number;
  setPrinted: (n: number) => void;
  setLoaves: (n: number) => void;
}

function Sliders({ lang, printed, loaves, setPrinted, setLoaves }: SlidersProps) {
  return (
    <div className="pr-sliders">
      <Slider
        label={lang === "en" ? "🖨️ New coins printed" : "🖨️ Neue Münzen gedruckt"}
        value={printed}
        min={0}
        max={80}
        step={10}
        onChange={setPrinted}
        left={lang === "en" ? "none" : "keine"}
        right={lang === "en" ? "lots" : "viele"}
      />
      <Slider
        label={lang === "en" ? "🥖 Loaves Bea bakes" : "🥖 Brote, die Bea backt"}
        value={loaves}
        min={START_LOAVES}
        max={40}
        step={5}
        onChange={setLoaves}
        left={lang === "en" ? "10 (as now)" : "10 (wie jetzt)"}
        right={lang === "en" ? "more" : "mehr"}
      />
    </div>
  );
}

function Toy({ lang }: ToyProps) {
  const [printed, setPrinted] = useState(0);
  const [loaves, setLoaves] = useState(START_LOAVES);
  return (
    <div className="stage-wrap">
      <PrintBoard lang={lang} printed={printed} loaves={loaves} />
      <Sliders lang={lang} printed={printed} loaves={loaves} setPrinted={setPrinted} setLoaves={setLoaves} />
    </div>
  );
}

function KeepPriceWidget({ lang, onAnswer }: WidgetProps) {
  const [printed, setPrinted] = useState(0);
  const [loaves, setLoaves] = useState(START_LOAVES);
  return (
    <div className="stage-wrap">
      <PrintBoard lang={lang} printed={printed} loaves={loaves} />
      <Sliders lang={lang} printed={printed} loaves={loaves} setPrinted={setPrinted} setLoaves={setLoaves} />
      <div className="row nav">
        <CheckButton lang={lang} onClick={() => onAnswer(printed > 0 && priceUnchanged(printed, loaves))} />
      </div>
    </div>
  );
}

export const lesson: Lesson = {
  id: "printing",
  story: [
    {
      scene: "🏛️ 🧓 🪙❓",
      text: T(
        "Mayor Moss has a problem. The town chest is empty. There are no coins left to pay for a new bridge.",
        "Bürgermeister Moss hat ein Problem. Die Stadtkasse ist leer. Es sind keine Münzen mehr da, um eine neue Brücke zu bezahlen.",
      ),
    },
    {
      scene: "💡 🖨️ 🪙🪙🪙",
      mood: "happy",
      text: T(
        "Then he has an idea: I have a coin press! I will print lots of new coins. Then the town will be rich!",
        "Da hat er eine Idee: Ich habe eine Münzpresse! Ich drucke ganz viele neue Münzen. Dann ist die Stadt reich!",
      ),
    },
    {
      scene: "🍞🍞🍞🍞🍞 🍞🍞🍞🍞🍞",
      text: T(
        "But look at the bread first. Bea bakes 10 loaves a day. The town has 20 coins. So one loaf costs 2 coins.",
        "Aber schau zuerst aufs Brot. Bea backt am Tag 10 Brote. In der Stadt gibt es 20 Münzen. Also kostet ein Brot 2 Münzen.",
      ),
    },
    {
      scene: "🖨️ ➡️ 🪙🪙🪙🪙 🏃🏃🏃",
      text: T(
        "Moss prints 20 new coins. Now the town has 40! Everybody feels rich and runs to Bea to buy bread.",
        "Moss druckt 20 neue Münzen. Jetzt hat die Stadt 40! Alle fühlen sich reich und rennen zu Bea, um Brot zu kaufen.",
      ),
    },
    {
      scene: "🍞🍞🍞🍞🍞 🍞🍞🍞🍞🍞 🏷️ 2 ➡️ 4",
      mood: "think",
      text: T(
        "But Bea still bakes only 10 loaves. Coins cannot bake bread! Twice the coins want the same bread, so a loaf now costs 4 coins.",
        "Aber Bea backt immer noch nur 10 Brote. Münzen können kein Brot backen! Doppelt so viele Münzen wollen das gleiche Brot, also kostet ein Brot jetzt 4 Münzen.",
      ),
    },
    {
      scene: "🏷️⬆️ 🪙 = 🍞/2",
      mood: "think",
      text: T(
        "Prices went up. You know this word: inflation. The town has more coins, but nobody can buy more bread. Nobody got richer.",
        "Die Preise sind gestiegen. Dieses Wort kennst du: Inflation. Die Stadt hat mehr Münzen, aber niemand kann mehr Brot kaufen. Niemand ist reicher geworden.",
      ),
    },
    {
      scene: "🖨️🖨️🖨️ 🪙🪙🪙🪙🪙🪙 😟 🏷️ 100",
      text: T(
        "If Moss keeps printing, a loaf costs 10 coins, then 100. People stop trusting the coins. Then coins are just metal.",
        "Wenn Moss weiter druckt, kostet ein Brot 10 Münzen, dann 100. Die Leute vertrauen den Münzen nicht mehr. Dann sind Münzen nur noch Metall.",
      ),
    },
    {
      scene: "👩‍🍳 🍞🍞🍞🍞 + 🪙🪙 ✅",
      mood: "happy",
      text: T(
        "A few new coins are fine if the town makes more bread and other things too. Coins are worth something because they buy real things.",
        "Ein paar neue Münzen sind in Ordnung, wenn die Stadt auch mehr Brot und andere Dinge herstellt. Münzen sind etwas wert, weil man echte Sachen damit kaufen kann.",
      ),
    },
  ],
  toyIntro: T(
    "The coin press is ready! Print new coins and watch the bread price. Then make Bea bake more bread.",
    "Die Münzpresse ist bereit! Drucke neue Münzen und schau auf den Brotpreis. Dann lass Bea mehr Brot backen.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Mayor Moss prints lots of new coins, but Bea still bakes 10 loaves. What happens to the price of bread?",
        "Bürgermeister Moss druckt viele neue Münzen, aber Bea backt immer noch 10 Brote. Was passiert mit dem Brotpreis?",
      ),
      options: [
        { text: T("It goes down", "Er sinkt") },
        { text: T("It goes up", "Er steigt"), correct: true },
        { text: T("It stays the same", "Er bleibt gleich") },
      ],
      hint: T(
        "Think of the bread. There are more coins, but the same 10 loaves. More coins want the same bread, so each loaf costs more coins.",
        "Denk ans Brot. Es gibt mehr Münzen, aber die gleichen 10 Brote. Mehr Münzen wollen das gleiche Brot, also kostet jedes Brot mehr Münzen.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Print some new coins, but keep a loaf at 2 coins. Use both sliders, then press Check.",
        "Drucke ein paar neue Münzen, aber lass ein Brot bei 2 Münzen. Nutze beide Regler und drücke dann Prüfen.",
      ),
      Widget: KeepPriceWidget,
      hint: T(
        "Not exactly 2 coins yet, or nothing was printed. New coins need new bread too. If the town has 40 coins, Bea must bake 20 loaves.",
        "Es sind noch nicht genau 2 Münzen, oder es wurde nichts gedruckt. Zu neuen Münzen gehört auch neues Brot. Hat die Stadt 40 Münzen, muss Bea 20 Brote backen.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "When is it fine for a town to add a few new coins?",
        "Wann ist es in Ordnung, wenn eine Stadt ein paar neue Münzen dazugibt?",
      ),
      options: [
        { text: T("Whenever the mayor wants to build something", "Immer, wenn der Bürgermeister etwas bauen will") },
        { text: T("Never, not for any reason", "Nie, aus keinem Grund") },
        {
          text: T("When the town also makes more bread and things", "Wenn die Stadt auch mehr Brot und Sachen herstellt"),
          correct: true,
        },
      ],
      hint: T(
        "Remember the sliders: when Bea baked more bread, the price could stay the same. New coins are fine when there are more real things to buy too.",
        "Denk an die Regler: Wenn Bea mehr Brot backte, konnte der Preis gleich bleiben. Neue Münzen sind in Ordnung, wenn es auch mehr echte Dinge zu kaufen gibt.",
      ),
    },
  ],
  askDad: T(
    "If you were mayor and the town chest was empty, what would you do instead of printing coins? And what do you think would happen to our pocket money if all prices doubled?",
    "Wenn du Bürgermeister wärst und die Stadtkasse leer wäre, was würdest du statt Münzen zu drucken tun? Und was würde mit unserem Taschengeld passieren, wenn alle Preise doppelt so hoch wären?",
  ),
  realLife: {
    title: T("Why Germany does not just print money", "Warum Deutschland nicht einfach Geld druckt"),
    body: T(
      "In 1923 Germany printed so much money that a loaf of bread cost 201 billion marks. Workers carried their pay home in bags and carts and rushed to spend it. Today the European Central Bank looks after the euro. Its main goal is stable prices, and EU rules do not let it simply print money to pay a government's bills.",
      "Im Jahr 1923 hat Deutschland so viel Geld gedruckt, dass ein Brot 201 Milliarden Mark kostete. Arbeiter trugen ihren Lohn in Säcken und auf Wagen nach Hause und gaben ihn schnell aus. Heute kümmert sich die Europäische Zentralbank um den Euro. Ihr wichtigstes Ziel sind stabile Preise, und EU-Regeln erlauben ihr nicht, einfach Geld für die Rechnungen eines Staates zu drucken.",
    ),
  },
  factCard: {
    claims: [
      {
        text: "Inflation is a broad increase in the prices of goods and services: you can buy less for 1 euro today than yesterday, so inflation reduces the value of the currency.",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_inflation.en.html",
      },
      {
        text: "In 1923 the German government borrowed from the Reichsbank, which printed more and more banknotes. This was not matched by growth in the supply of goods, so huge price increases resulted. Wages were paid daily and people collected notes in bags and suitcases and rushed to spend them. The Mark was replaced by the Rentenmark in November 1923.",
        source: "https://www.bundesbank.de/en/tasks/topics/inflation-lessons-learnt-from-history-666006",
      },
      {
        text: "The nominal price of a loaf of bread in Germany was 0.80 Mark in December 1919, 250 Mark in January 1923 and 201 billion Mark in November 1923. Workers collected their pay in sacks, partly with carts at the factory gate, and took it to shops before it lost half its value again.",
        source: "https://www.bundestag.de/parlament/geschichte/100-jahre-weimar/hyperinflation-970722",
      },
      {
        text: "Article 123 of the Treaty on the Functioning of the European Union prohibits overdraft facilities and any other credit facility with the ECB or national central banks for governments and other public bodies, and also prohibits the ECB and national central banks from buying their debt instruments directly from them.",
        source: "https://eur-lex.europa.eu/eli/treaty/tfeu_2016/art_123/oj/eng",
      },
      {
        text: "The ECB's primary objective is price stability, which it defines as keeping inflation at 2% over the medium term. It is independent from political influence, because history shows that a central bank that follows political orders can lose sight of price stability.",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/five_things.en.html",
      },
      {
        text: "Central banks do create money in real life, in controlled ways. For example, when the ECB buys bonds as part of asset purchases, central bank money is created to pay for them.",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/five_things.en.html",
      },
      {
        text: "National central banks in the euro area create central bank money (banknotes and reserves), and commercial banks create most of the money people use when they grant loans. Money can be used to make payments because it is legal tender and has a value that people trust.",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_money.en.html",
      },
      {
        text: "High inflation limits purchasing power, so you can buy less for your money, and people may lose confidence in a currency that is losing value rapidly.",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/stableprices.en.html",
      },
      {
        text: "As a result of past inflation experiences, central banks became independent institutions tasked with safeguarding the value of the currency; the Bundesbank was the model for the structure of the Eurosystem.",
        source: "https://www.bundesbank.de/en/tasks/topics/inflation-lessons-learnt-from-history-666006",
      },
    ],
    simplified: [
      "The town numbers (20 coins, 10 loaves, a 2-coin loaf) are made up. In the toy the price of a loaf is simply coins divided by loaves. Real prices depend on many things (costs, wages, what people expect, trade), so the toy shows the idea 'more coins for the same goods pushes prices up', not a formula.",
      "Economists still discuss how closely money growth and inflation are linked. An ECB Executive Board member said in 2023 that this debate had been renewed (https://www.ecb.europa.eu/press/key/date/2023/html/ecb.sp230925_1~7ad8ef22e2.en.html). The lesson only says that printing without more goods pushes prices up, which is the clear case.",
      "The lesson calls it 'printing coins'. Coins are really struck (minted), and in the euro area the countries issue coins and central banks produce banknotes. 'Printing' is used as the everyday word for creating new money.",
      "The lesson says 'a few new coins are fine if the town makes more things'. Real central banks decide carefully how much money to create, and the ECB aims for a small, steady rise in prices (2%), not zero. The child-sized picture is 'printing for nothing, without more goods'.",
      "In the real life card, 'EU rules do not let it simply print money to pay a government's bills' sums up Article 123, which bans direct credit to governments and direct purchases of their debt. The ECB may still buy bonds on the market under its monetary policy, to steer inflation. That is not explained to the child.",
      "1923 hyperinflation had several causes (war debts, reparations, the occupation of the Ruhr, falling trust). The lesson only tells the part about printing money without more goods. The bread price is the nominal price from a Bundestag history page, in marks of that time.",
      "Money in the town is simplified to coins only. Most real money is bank account money, not cash, but an 8-year-old does not need that here.",
    ],
  },
};
