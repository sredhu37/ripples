import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BreadPriceDiagram,
  FineDiagram,
  HyperDiagram,
  IdeaDiagram,
  InflationDiagram,
  PriceUpDiagram,
  PrintDiagram,
  ProblemDiagram,
} from "./printing.diagrams";
import { PrintToy } from "./printing.toy";
import "./printing.css";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  return <PrintToy lang={lang} onInteract={onDone} />;
}

/** Print some new coins but keep a loaf at 2 coins: the widget only passes when it really is 2 coins. */
function KeepPriceWidget({ lang, onAnswer }: WidgetProps) {
  return <PrintToy lang={lang} onCheck={onAnswer} />;
}

export const lesson: Lesson = {
  id: "printing",
  story: [
    animatedBeat(
      [
        T("This is Mayor Moss. He looks after Ripple Town.", "Das ist Bürgermeister Moss. Er kümmert sich um Ripple Town."),
        T("The town needs a new bridge over the river.", "Die Stadt braucht eine neue Brücke über den Fluss."),
        T(
          "But there is a problem. The town chest is empty, so there are no coins left to pay for the bridge.",
          "Aber es gibt ein Problem. Die Stadtkasse ist leer, also sind keine Münzen mehr da, um die Brücke zu bezahlen.",
        ),
      ],
      ProblemDiagram,
    ),
    animatedBeat(
      [
        T(
          "Then Moss has an idea. He owns a coin press. That is a machine that makes new coins.",
          "Da hat Moss eine Idee. Er hat eine Münzpresse. Das ist eine Maschine, die neue Münzen macht.",
        ),
        T(
          "He thinks: I will make lots and lots of new coins, and then the whole town will be rich!",
          "Er denkt: Ich mache ganz viele neue Münzen, und dann ist die ganze Stadt reich!",
        ),
        T(
          "Making new money just because you want more has a name. It is called *printing money*.",
          "Neues Geld zu machen, nur weil man mehr haben will, hat einen Namen. Es heißt *Geld drucken*.",
        ),
      ],
      IdeaDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T(
          "But first, let's look at the bread. Bea the baker bakes 10 loaves every day.",
          "Aber schauen wir zuerst aufs Brot. Bäckerin Bea backt jeden Tag 10 Brote.",
        ),
        T("Right now, the whole town has 20 coins.", "Im Moment hat die ganze Stadt 20 Münzen."),
        T(
          "20 coins for 10 loaves: one loaf costs 2 coins. That is its price.",
          "20 Münzen für 10 Brote: Ein Brot kostet 2 Münzen. Das ist sein Preis.",
        ),
      ],
      BreadPriceDiagram,
    ),
    animatedBeat(
      [
        T("Now Moss uses the coin press. It makes 20 new coins.", "Jetzt benutzt Moss die Münzpresse. Sie macht 20 neue Münzen."),
        T(
          "Before, there were 20 coins in town. Now there are 40!",
          "Vorher gab es 20 Münzen in der Stadt. Jetzt sind es 40!",
        ),
        T(
          "Everybody feels rich and runs to Bea to buy bread.",
          "Alle fühlen sich reich und rennen zu Bea, um Brot zu kaufen.",
        ),
      ],
      PrintDiagram,
    ),
    animatedBeat(
      [
        T(
          "But Bea still bakes only 10 loaves a day. Coins cannot bake bread!",
          "Aber Bea backt immer noch nur 10 Brote am Tag. Münzen können kein Brot backen!",
        ),
        T(
          "Now 40 coins want the same 10 loaves. That is twice as many coins as before.",
          "Jetzt wollen 40 Münzen die gleichen 10 Brote. Das sind doppelt so viele Münzen wie vorher.",
        ),
        T(
          "Everybody offers more coins for the little bread there is. Now one loaf costs 4 coins.",
          "Alle bieten mehr Münzen für das wenige Brot, das es gibt. Jetzt kostet ein Brot 4 Münzen.",
        ),
      ],
      PriceUpDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Prices went up. When most prices in a town go up, that is called inflation. You already know this word.",
          "Die Preise sind gestiegen. Wenn die meisten Preise in einer Stadt steigen, nennt man das Inflation. Das Wort kennst du schon.",
        ),
        T(
          "The town has more coins, but still only 10 loaves. Nobody can buy more bread than before.",
          "Die Stadt hat mehr Münzen, aber immer noch nur 10 Brote. Niemand kann mehr Brot kaufen als vorher.",
        ),
        T(
          "So nobody got richer. Printing coins does not make real things appear.",
          "Also ist niemand reicher geworden. Münzen zu drucken lässt keine echten Dinge entstehen.",
        ),
      ],
      InflationDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "What if Moss keeps printing and printing? Then a loaf costs 10 coins, and then 100 coins.",
          "Was, wenn Moss immer weiter druckt? Dann kostet ein Brot 10 Münzen und danach 100 Münzen.",
        ),
        T(
          "When prices shoot up this fast, it has its own name. It is called *hyperinflation*.",
          "Wenn Preise so schnell in die Höhe schießen, hat das einen eigenen Namen. Es heißt *Hyperinflation*.",
        ),
        T(
          "People stop trusting the coins. Then the coins are just pieces of metal.",
          "Die Leute vertrauen den Münzen nicht mehr. Dann sind die Münzen nur noch Stücke aus Metall.",
        ),
      ],
      HyperDiagram,
    ),
    animatedBeat(
      [
        T(
          "Does that mean a town may never make new coins? No. A few new coins can be fine.",
          "Heißt das, eine Stadt darf nie neue Münzen machen? Nein. Ein paar neue Münzen können in Ordnung sein.",
        ),
        T(
          "It works when the town also makes more bread and other things to buy.",
          "Das klappt, wenn die Stadt auch mehr Brot und andere Dinge zum Kaufen herstellt.",
        ),
        T(
          "Then a loaf still costs 2 coins. Coins are worth something because you can buy real things with them.",
          "Dann kostet ein Brot weiter 2 Münzen. Münzen sind etwas wert, weil man echte Dinge damit kaufen kann.",
        ),
        T(
          "In real life, a special bank looks after a country's money. It is called the *central bank*.",
          "Im echten Leben kümmert sich eine besondere Bank um das Geld eines Landes. Sie heißt *Zentralbank*.",
        ),
        T(
          "Its main job is to keep prices steady, so that your coins buy about the same tomorrow.",
          "Ihre wichtigste Aufgabe ist es, die Preise stabil zu halten, damit deine Münzen morgen ungefähr so viel kaufen wie heute.",
        ),
      ],
      FineDiagram,
      "happy",
    ),
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
        "Print some new coins, but keep a loaf at 2 coins. Use the buttons, then press Check.",
        "Drucke ein paar neue Münzen, aber lass ein Brot bei 2 Münzen. Nutze die Knöpfe und drücke dann Prüfen.",
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
        "Remember the toy: when Bea baked more bread, the price could stay the same. New coins are fine when there are more real things to buy too.",
        "Denk an das Spielzeug: Wenn Bea mehr Brot backte, konnte der Preis gleich bleiben. Neue Münzen sind in Ordnung, wenn es auch mehr echte Dinge zu kaufen gibt.",
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
      {
        text: "The European Central Bank (ECB) is the central bank for the euro. Its main objective is to keep prices stable in the countries that use the euro.",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/five_things.en.html",
      },
      {
        text: "In 1923, during the months of hyperinflation, the value of the German currency fell at such a rate that wages were paid daily. Once the Mark was declining rapidly almost daily, the currency could no longer function as a general means of payment or store of value.",
        source: "https://www.bundesbank.de/en/tasks/topics/inflation-lessons-learnt-from-history-666006",
      },
      {
        text: "Fiat money such as the euro is declared legal tender and issued by a central bank. It is accepted because it is widely usable and central banks work to keep the value of money stable.",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_money.en.html",
      },
    ],
    simplified: [
      "The town numbers (20 coins, 10 loaves, a 2-coin loaf) are made up. In the toy the price of a loaf is simply coins divided by loaves. Real prices depend on many things (costs, wages, what people expect, trade), so the toy shows the idea 'more coins for the same goods pushes prices up', not a formula.",
      "Economists still discuss how closely money growth and inflation are linked. An ECB Executive Board member said in 2023 that this debate had been renewed (https://www.ecb.europa.eu/press/key/date/2023/html/ecb.sp230925_1~7ad8ef22e2.en.html). The lesson only says that printing without more goods pushes prices up, which is the clear case.",
      "The lesson calls it 'printing coins'. Coins are really struck (minted), and in the euro area the countries issue coins and central banks produce banknotes. 'Printing' is used as the everyday word for creating new money.",
      "The lesson says 'a few new coins are fine if the town makes more things'. Real central banks decide carefully how much money to create, and the ECB aims for a small, steady rise in prices (2%), not zero. The child-sized picture is 'printing for nothing, without more goods'.",
      "In the real life card, 'EU rules do not let it simply print money to pay a government's bills' sums up Article 123, which bans direct credit to governments and direct purchases of their debt. The ECB may still buy bonds on the market under its monetary policy, to steer inflation. That is not explained to the child.",
      "1923 hyperinflation had several causes (war debts, reparations, the occupation of the Ruhr, falling trust). The lesson only tells the part about printing money without more goods. The bread price is the nominal price from a Bundestag history page, in marks of that time.",
      "The lesson story is told with new words: 'printing money' (making new money without more goods), 'hyperinflation' (prices rising extremely fast; the Bundesbank uses the word for 1923) and 'central bank' (the institution that issues money and works for stable prices, such as the ECB). Central banks also supervise banks and do more than the child is told.",
      "Mayor Moss, his coin press, the bridge and the empty town chest are made up. 'People stop trusting the coins, then coins are just metal' is a child-sized version of the Bundesbank statement that in 1923 the currency could no longer work as a means of payment or store of value.",
      "The toy changes in steps of 10 coins and 5 loaves, and the picture shows one stack for 10 coins. Real money is not counted in neat stacks.",
      "Money in the town is simplified to coins only. Most real money is bank account money, not cash, but an 8-year-old does not need that here.",
    ],
  },
};
