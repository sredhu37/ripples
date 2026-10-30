import { useState } from "react";
import { CheckButton, animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BigOvenDiagram,
  BuyOvenDiagram,
  CarefulDiagram,
  ExtraDiagram,
  LoanDiagram,
  PayBackDiagram,
  ReasonsDiagram,
  TinyOvenDiagram,
} from "./loans.diagrams";
import { LoanBoard, OVEN_COST, Toy as LoanToy, plan } from "./loans.toy";

export { OVEN_COST, SALES_PER_WEEK, plan } from "./loans.toy";
export type { Plan } from "./loans.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang }: ToyProps) {
  return <LoanToy lang={lang} />;
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
    animatedBeat(
      [
        T(
          "Let's visit Bea again. Bea is the baker of Ripple Town.",
          "Besuchen wir Bea noch einmal. Bea ist die Bäckerin von Ripple Town.",
        ),
        T(
          "Bea bakes her bread in an oven. But her oven is tiny.",
          "Bea backt ihr Brot in einem Ofen. Aber ihr Ofen ist winzig.",
        ),
        T("It bakes only a few loaves a day.", "Er backt nur ein paar Brote am Tag."),
        T(
          "Lots of people in Ripple Town keep asking for more bread.",
          "Viele Leute in Ripple Town wollen immer mehr Brot.",
        ),
      ],
      TinyOvenDiagram,
    ),
    animatedBeat(
      [
        T("Bea has a dream. She would love a big oven.", "Bea hat einen Traum. Sie hätte so gern einen großen Ofen."),
        T(
          "A big oven bakes lots more bread, so Bea could sell much more.",
          "Ein großer Ofen backt viel mehr Brot, und Bea könnte viel mehr verkaufen.",
        ),
        T("But a big oven costs 40 coins.", "Aber ein großer Ofen kostet 40 Münzen."),
        T(
          "Bea has only 5 coins. That is far too few, so she cannot buy the oven.",
          "Bea hat nur 5 Münzen. Das ist viel zu wenig, also kann sie den Ofen nicht kaufen.",
        ),
      ],
      BigOvenDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "This is Pim. Pim has saved lots of coins in a jar.",
          "Das ist Pim. Pim hat viele Münzen in einem Glas gespart.",
        ),
        T(
          "Pim says: Bea, I can lend you 40 coins. You can give them back to me later.",
          "Pim sagt: Bea, ich kann dir 40 Münzen leihen. Du kannst sie mir später zurückgeben.",
        ),
        T(
          "Bea takes the coins and promises to give them back. Taking something for a while like this is called *borrowing*.",
          "Bea nimmt die Münzen und verspricht, sie zurückzugeben. Etwas auf diese Weise für eine Zeit zu nehmen, nennt man *leihen*.",
        ),
        T(
          "What Bea gets from Pim has a name too. It is called a *loan*. A loan is money that you must give back.",
          "Das, was Bea von Pim bekommt, hat auch einen Namen: *Darlehen*. Ein Darlehen ist Geld, das man zurückgeben muss.",
        ),
      ],
      LoanDiagram,
    ),
    animatedBeat(
      [
        T(
          "Bea uses the 40 coins to buy the big oven.",
          "Bea kauft von den 40 Münzen den großen Ofen.",
        ),
        T("Now she bakes lots more bread every day.", "Jetzt backt sie jeden Tag viel mehr Brot."),
        T(
          "She sells the bread to the people of Ripple Town and earns coins.",
          "Sie verkauft das Brot an die Leute in Ripple Town und verdient Münzen.",
        ),
      ],
      BuyOvenDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T("Every week Bea pays some coins back to Pim.", "Jede Woche zahlt Bea ein paar Münzen an Pim zurück."),
        T(
          "She pays them from the coins that she earns with her bread.",
          "Sie zahlt sie von den Münzen, die sie mit ihrem Brot verdient.",
        ),
        T(
          "Little by little, she gives back everything she borrowed.",
          "Nach und nach gibt sie alles zurück, was sie sich geliehen hat.",
        ),
      ],
      PayBackDiagram,
    ),
    animatedBeat(
      [
        T(
          "But Pim wants back a little more than 40 coins. She has three reasons.",
          "Aber Pim will etwas mehr als 40 Münzen zurückhaben. Dafür hat sie drei Gründe.",
        ),
        T(
          "Reason one: Pim has to wait. She does not have her coins back for many weeks.",
          "Grund eins: Pim muss warten. Viele Wochen lang hat sie ihre Münzen nicht zurück.",
        ),
        T(
          "Reason two: Bea might not be able to pay. That is a *risk* for Pim. It means that things could go wrong.",
          "Grund zwei: Vielleicht kann Bea nicht zahlen. Das ist ein *Risiko* für Pim. Es heißt, dass etwas schiefgehen kann.",
        ),
        T(
          "Reason three: Pim could have used her coins herself, for example to buy a warm coat.",
          "Grund drei: Pim hätte ihre Münzen selbst nutzen können, zum Beispiel für einen warmen Mantel.",
        ),
      ],
      ReasonsDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "So Pim asks for a little extra when Bea pays back.",
          "Darum bittet Pim um ein kleines Extra, wenn Bea zurückzahlt.",
        ),
        T(
          "Bea gives back the 40 coins she borrowed, plus a few extra coins on top.",
          "Bea gibt die 40 geliehenen Münzen zurück und noch ein paar Münzen obendrauf.",
        ),
        T(
          "The extra is the price of the loan. It is what Bea pays for being allowed to use Pim's coins.",
          "Das Extra ist der Preis für das Darlehen. Den zahlt Bea dafür, dass sie Pims Münzen nutzen darf.",
        ),
      ],
      ExtraDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T(
          "Careful! Bea must pay back every week, even in a week when bread sells badly.",
          "Vorsicht! Bea muss jede Woche zurückzahlen, auch in einer Woche, in der sich das Brot schlecht verkauft.",
        ),
        T(
          "If Bea borrows too much, the weekly payments get too big for her bread money.",
          "Wenn Bea zu viel leiht, werden die Zahlungen pro Woche zu groß für ihr Brotgeld.",
        ),
        T(
          "So borrow only what you need, and only what you can pay back.",
          "Darum leih dir nur, was du brauchst und was du zurückzahlen kannst.",
        ),
      ],
      CarefulDiagram,
      "think",
    ),
  ],
  toyIntro: T(
    "Help Bea plan her loan! Pick the coins and the weeks. Orange is what she pays each week. Green is what her bread earns. Is green big enough?",
    "Hilf Bea, ihr Darlehen zu planen! Wähle Münzen und Wochen. Orange ist, was sie jede Woche zahlt. Grün ist, was ihr Brot einbringt. Reicht das Grün?",
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
