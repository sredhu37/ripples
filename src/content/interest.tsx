import { animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text } from "../lesson/types";
import {
  BankLoanDiagram,
  CompoundDiagram,
  InterestDiagram,
  LoanCostDiagram,
  PercentDiagram,
  SaverDiagram,
  SplitDiagram,
} from "./interest.diagrams";
import { Garden, GardenWidget } from "./interest.toy";

export { grow, reachesTarget, TARGET_HIGH, TARGET_LOW } from "./interest.toy";

const T = (en: string, de: string): Text => ({ en, de });

export const lesson: Lesson = {
  id: "interest",
  story: [
    animatedBeat(
      [
        T(
          "Remember Bea the baker? She keeps 100 coins safe in the town bank.",
          "Weißt du noch, Bea die Bäckerin? Sie bewahrt 100 Münzen sicher in der Stadtbank auf.",
        ),
        T(
          "Finn the fisherman wants a new boat, but he does not have enough coins.",
          "Fischer Finn möchte ein neues Boot, aber er hat nicht genug Münzen.",
        ),
        T(
          "So the bank lends Bea's coins to Finn, and he can buy his boat. Finn borrows the money.",
          "Also leiht die Bank Beas Münzen an Finn, und er kann sein Boot kaufen. Finn leiht sich das Geld.",
        ),
      ],
      BankLoanDiagram,
    ),
    animatedBeat(
      [
        T(
          "One year later, Finn pays the coins back. But he does not pay back only 100 coins. He pays back 105!",
          "Ein Jahr später gibt Finn die Münzen zurück. Aber er zahlt nicht nur 100 Münzen zurück. Er zahlt 105!",
        ),
        T(
          "The 5 extra coins are the price of the loan. Finn pays them to the bank, because he borrowed money.",
          "Die 5 Extra-Münzen sind der Preis fürs Leihen. Finn zahlt sie der Bank, weil er sich Geld geliehen hat.",
        ),
        T(
          "This extra money has a name. It is called *interest*.",
          "Dieses Extra-Geld hat einen Namen. Es heißt *Zinsen*.",
        ),
      ],
      InterestDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Banks count interest in a special way. Finn pays 5 extra coins for every 100 coins he borrows, each year.",
          "Banken zählen Zinsen auf eine besondere Art. Finn zahlt jedes Jahr 5 Extra-Münzen für je 100 Münzen, die er sich leiht.",
        ),
        T(
          "That is 5 out of every hundred. Out of a hundred has its own name. It is called *percent*.",
          "Das sind 5 von hundert. Von hundert hat einen eigenen Namen. Es heißt *Prozent*.",
        ),
        T(
          "We write percent with a special sign: 5%. So Finn pays 5 percent interest a year.",
          "Prozent schreibt man mit einem besonderen Zeichen: 5 %. Finn zahlt also 5 Prozent Zinsen im Jahr.",
        ),
      ],
      PercentDiagram,
    ),
    animatedBeat(
      [
        T(
          "The bank pays interest to Bea too, because her coins were lent out.",
          "Die Bank zahlt auch Bea Zinsen, weil ihre Münzen verliehen wurden.",
        ),
        T(
          "Bea gets 3 extra coins each year for her 100 coins. That is 3 percent.",
          "Bea bekommt jedes Jahr 3 Extra-Münzen für ihre 100 Münzen. Das sind 3 Prozent.",
        ),
        T(
          "Finn pays 5 percent, but Bea gets 3 percent. The bank pays savers a bit less than borrowers pay.",
          "Finn zahlt 5 Prozent, aber Bea bekommt 3 Prozent. Die Bank gibt Sparern etwas weniger, als die zahlen, die sich Geld leihen.",
        ),
      ],
      SaverDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T(
          "Let's follow the extra coins. Finn pays the bank 5 coins of interest.",
          "Schauen wir uns die Extra-Münzen an. Finn zahlt der Bank 5 Münzen Zinsen.",
        ),
        T("The bank gives 3 of them to Bea.", "Die Bank gibt 3 davon an Bea weiter."),
        T("The bank keeps the other 2 coins.", "Die anderen 2 Münzen behält die Bank."),
        T(
          "Those 2 coins pay for the bank's work, and for loans that are never paid back.",
          "Mit diesen 2 Münzen bezahlt die Bank ihre Arbeit und auch Geld, das nie zurückkommt.",
        ),
      ],
      SplitDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Bea leaves all her coins in the bank. Let's pretend the interest is 10 percent, so the numbers are easy to see.",
          "Bea lässt alle ihre Münzen in der Bank. Tun wir so, als gäbe es 10 Prozent Zinsen, dann sind die Zahlen leicht.",
        ),
        T(
          "After one year Bea has 110 coins: her 100, plus 10 extra.",
          "Nach einem Jahr hat Bea 110 Münzen: ihre 100 und 10 extra.",
        ),
        T(
          "In year two the bank pays interest on all 110 coins. That is 11 extra coins, not only 10!",
          "Im zweiten Jahr zahlt die Bank Zinsen auf alle 110 Münzen. Das sind 11 Extra-Münzen, nicht nur 10!",
        ),
        T(
          "Interest that earns interest has a name. It is called *compound interest*.",
          "Zinsen, die selbst Zinsen bringen, haben einen Namen. Es heißt *Zinseszins*.",
        ),
      ],
      CompoundDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T(
          "Interest works for loans too. The higher the interest, the more Finn must pay back.",
          "Zinsen gibt es auch beim Leihen. Je höher die Zinsen, desto mehr muss Finn zurückzahlen.",
        ),
        T(
          "For 100 coins, Finn pays back 105 coins at 5 percent, but 110 coins at 10 percent.",
          "Für 100 Münzen zahlt Finn bei 5 Prozent 105 Münzen zurück, bei 10 Prozent aber 110 Münzen.",
        ),
        T(
          "If Finn pays back nothing for 10 years, the interest grows too. At 10 percent he would owe 259 coins!",
          "Wenn Finn 10 Jahre lang nichts zurückzahlt, wachsen auch die Zinsen. Bei 10 Prozent schuldet er dann 259 Münzen!",
        ),
      ],
      LoanCostDiagram,
      "think",
    ),
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
        "Bea leaves the extra coins in the bank. Next year they earn interest too. That is compound interest, and it makes the pile grow faster and faster.",
        "Bea lässt die Extra-Münzen in der Bank. Im nächsten Jahr bringen sie auch Zinsen. Das ist der Zinseszins, und er lässt den Haufen immer schneller wachsen.",
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
      "Compound interest is shown with yearly steps and the child learns the word (Zinseszins in German): interest that earns interest, because the interest stays in the account. It is explained with a pretend 10% so the extra is easy to see: 100 becomes 110 after year one and 121 after year two, because year two's interest (11) is paid on 110. The same logic as the sourced 5% example.",
      "The loan beat says that if Finn pays back nothing for 10 years at 10%, he would owe about 259 coins (100 x 1.1 to the power 10 = 259.37). That is the same yearly compounding as the toy and assumes no part-payments, as in the line above.",
    ],
  },
};
