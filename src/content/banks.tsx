import { useState } from "react";
import { CheckButton, animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BedDiagram,
  CardDiagram,
  DepositDiagram,
  LendDiagram,
  OvenDiagram,
  ProtectDiagram,
  ReadyDiagram,
  RunDiagram,
} from "./banks.diagrams";
import { BankBoard, Controls, START, bankIsBalanced } from "./banks.toy";
import type { Board } from "./banks.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  const [s, set] = useState<Board>(START);
  return (
    <>
      <BankBoard lang={lang} s={s} />
      <Controls
        lang={lang}
        s={s}
        set={(newBoard) => {
          set(newBoard);
          onDone?.();
        }}
      />
    </>
  );
}

function BalanceWidget({ lang, onAnswer }: WidgetProps) {
  const [s, set] = useState<Board>(START);
  return (
    <>
      <BankBoard lang={lang} s={s} />
      <Controls lang={lang} s={s} set={set} />
      <div className="row nav">
        <CheckButton lang={lang} onClick={() => onAnswer(bankIsBalanced(s))} />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "banks",
  story: [
    animatedBeat(
      [
        T(
          "This is Finn again. He has a few spare coins that he does not need today.",
          "Das ist wieder Finn. Er hat ein paar Münzen übrig, die er heute nicht braucht.",
        ),
        T("So he hides them under his bed.", "Darum versteckt er sie unter seinem Bett."),
        T(
          "But what if the cat finds them? Or what if Finn forgets where he hid them?",
          "Aber was, wenn die Katze sie findet? Oder wenn Finn vergisst, wo er sie versteckt hat?",
        ),
        T("A bed is not a very safe place for coins.", "Ein Bett ist kein besonders sicherer Ort für Münzen."),
      ],
      BedDiagram,
    ),
    animatedBeat(
      [
        T(
          "Bea is a baker, and she has a big wish. She wants a new oven, so she can bake more bread.",
          "Bea ist Bäckerin und hat einen großen Wunsch. Sie möchte einen neuen Ofen, damit sie mehr Brot backen kann.",
        ),
        T(
          "The oven costs 4 coins. But Bea does not have 4 coins, so she needs to borrow them.",
          "Der Ofen kostet 4 Münzen. Aber Bea hat keine 4 Münzen, also muss sie sich welche leihen.",
        ),
        T(
          "But who has coins to spare? Bea cannot knock on every door in town.",
          "Aber wer hat Münzen übrig? Bea kann ja nicht an jeder Tür im Ort klingeln.",
        ),
      ],
      OvenDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Luckily, Ripple Town has a *bank*. A bank is a safe place that looks after people's coins.",
          "Zum Glück gibt es in Ripple Town eine *Bank*. Eine Bank ist ein sicherer Ort, der auf die Münzen der Leute aufpasst.",
        ),
        T("Finn brings his spare coins to the bank.", "Finn bringt seine übrigen Münzen zur Bank."),
        T(
          "Putting coins into a bank has a name. It is called a *deposit*. Finn makes a deposit.",
          "Münzen auf die Bank zu bringen hat einen Namen. Es heißt *Einzahlung*. Finn zahlt seine Münzen ein.",
        ),
        T(
          "The bank writes down whose coins they are. These coins belong to Finn.",
          "Die Bank schreibt auf, wem die Münzen gehören. Diese Münzen gehören Finn.",
        ),
      ],
      DepositDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T(
          "Now Bea goes to the bank. She asks if she can borrow 4 coins.",
          "Jetzt geht Bea zur Bank. Sie fragt, ob sie sich 4 Münzen leihen darf.",
        ),
        T("The bank lends her some of the saved coins.", "Die Bank leiht ihr einige der gesparten Münzen."),
        T("Now Bea can buy her new oven!", "Jetzt kann Bea ihren neuen Ofen kaufen!"),
        T("Later, Bea pays the coins back to the bank.", "Später zahlt Bea die Münzen an die Bank zurück."),
      ],
      LendDiagram,
    ),
    animatedBeat(
      [
        T(
          "But Finn may want his coins back soon. Savers can ask for their coins on any day.",
          "Aber Finn will seine Münzen vielleicht bald zurückhaben. Sparer dürfen an jedem Tag nach ihren Münzen fragen.",
        ),
        T(
          "So the bank never lends out everything. Some coins stay ready in its safe.",
          "Darum verleiht die Bank nie alles. Ein paar Münzen bleiben im Tresor bereit.",
        ),
        T(
          "On a normal day only a few savers come. Then the coins in the safe are enough.",
          "An einem normalen Tag kommen nur wenige Sparer. Dann reichen die Münzen im Tresor.",
        ),
      ],
      ReadyDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "But what if lots of savers come on the very same day?",
          "Aber was, wenn ganz viele Sparer am selben Tag kommen?",
        ),
        T(
          "Some of the coins are with Bea, so the bank cannot give everything back at once.",
          "Ein Teil der Münzen ist bei Bea. Die Bank kann nicht alles auf einmal zurückgeben.",
        ),
        T(
          "When many savers want their coins back at the same time, it is called a *bank run*.",
          "Wenn viele Sparer gleichzeitig ihre Münzen zurückwollen, nennt man das einen *Ansturm auf die Bank*.",
        ),
      ],
      RunDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "In real life, the law protects the money that people keep in a bank.",
          "In echt schützt das Gesetz das Geld, das Leute auf der Bank haben.",
        ),
        T(
          "This is called *deposit protection*. If a bank ever fails, savers still get their money back, up to a limit.",
          "Das heißt *Einlagensicherung*. Wenn eine Bank einmal pleitegeht, bekommen die Sparer ihr Geld trotzdem zurück, bis zu einer Grenze.",
        ),
        T(
          "So Finn's coins are protected. You can read the limit on the card at the end of the lesson.",
          "So sind Finns Münzen geschützt. Die Grenze steht auf der Karte am Ende der Lektion.",
        ),
      ],
      ProtectDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T(
          "A bank also helps with paying. Sam wants to pay Bea, but he does not use coins. He uses a card.",
          "Eine Bank hilft auch beim Bezahlen. Sam will Bea bezahlen, aber nicht mit Münzen. Er nimmt eine Karte.",
        ),
        T(
          "No coins have to move! The bank just changes numbers on its computer.",
          "Es müssen keine Münzen wandern! Die Bank ändert nur Zahlen in ihrem Computer.",
        ),
        T(
          "Sam's number gets smaller and Bea's number gets bigger. Money in a bank is mostly numbers like these.",
          "Sams Zahl wird kleiner und Beas Zahl wird größer. Geld auf der Bank besteht meistens aus solchen Zahlen.",
        ),
      ],
      CardDiagram,
    ),
  ],
  toyIntro: T(
    "Put coins into the bank and lend some to Bea. Then press Bank run. Can everyone get their coins back?",
    "Bringe Münzen zur Bank und verleihe einige. Drück dann Ansturm. Bekommen alle ihre Münzen zurück?",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why does the bank keep some coins ready instead of lending them all?",
        "Warum behält die Bank einige Münzen bereit, statt alle zu verleihen?",
      ),
      options: [
        { text: T("Bea only needs a few coins", "Bea braucht nur ein paar Münzen") },
        { text: T("Lending coins is not allowed in Ripple Town", "Münzen verleihen ist in Ripple Town nicht erlaubt") },
        { text: T("Savers can ask for their coins back", "Sparer können ihre Münzen zurückverlangen"), correct: true },
      ],
      hint: T(
        "Think of Finn. He may come to get his coins on any day. So the bank needs some coins ready for him.",
        "Denk an Finn. Er kann an jedem Tag kommen und seine Münzen holen. Darum braucht die Bank ein paar Münzen für ihn bereit.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Set the bank so Bea gets her oven AND a bank run still works. Test it with Bank run. Then press Check.",
        "Stelle die Bank so ein, dass Bea ihren Ofen bekommt UND ein Ansturm trotzdem klappt. Teste es mit Ansturm. Drücke dann Prüfen.",
      ),
      Widget: BalanceWidget,
      hint: T(
        "Bea needs 4 coins. And on a bank run day, enough coins must stay ready. Try Bank run!",
        "Bea braucht 4 Münzen. Beim Ansturm müssen genug bereit bleiben. Probier ihn aus!",
      ),
    },
    {
      kind: "choice",
      prompt: T("Sam pays Bea with a card. What does the bank do?", "Sam bezahlt Bea mit einer Karte. Was macht die Bank?"),
      options: [
        { text: T("It changes numbers: less for Sam, more for Bea", "Sie ändert Zahlen: weniger bei Sam, mehr bei Bea"), correct: true },
        { text: T("It carries a bag of coins from Sam's house to Bea", "Sie trägt einen Beutel Münzen von Sams Haus zu Bea") },
        { text: T("It waits until Sam brings enough coins to the bank", "Sie wartet, bis Sam genug Münzen zur Bank bringt") },
      ],
      hint: T(
        "No coins have to move. Money in a bank is mostly numbers on a computer, so the bank just changes the numbers.",
        "Es müssen keine Münzen wandern. Geld auf der Bank besteht meistens aus Zahlen im Computer, also ändert die Bank nur die Zahlen.",
      ),
    },
  ],
  askDad: T(
    "Do we keep any money at a bank? What do you think the bank does with it while it waits? And why do people feel safer with their money in a bank than under a bed?",
    "Haben wir Geld auf der Bank? Was glaubst du, macht die Bank damit, solange es dort liegt? Und warum fühlen sich Menschen mit ihrem Geld auf der Bank sicherer als unter dem Bett?",
  ),
  realLife: {
    title: T("Banks in Germany", "Banken in Deutschland"),
    body: T(
      "In Germany, the law protects money in savings and everyday accounts (Einlagensicherung). If a bank ever fails, savers get back up to 100,000 euros per person per bank. That is the EU rule in October 2026. Banks are also watched by BaFin and the European Central Bank.",
      "In Deutschland schützt das Gesetz Geld auf Sparkonten und Girokonten (Einlagensicherung). Geht eine Bank pleite, bekommen Sparer bis zu 100.000 Euro pro Person und Bank zurück. So lautet die EU-Regel im Oktober 2026. Auch die BaFin und die Europäische Zentralbank passen auf die Banken auf.",
    ),
  },
  factCard: {
    claims: [
      {
        text: "A bank's main role is to take in deposits from people who have money, pool them, and lend them to people who need funds. Banks are intermediaries between depositors and borrowers.",
        source: "https://www.imf.org/en/publications/fandd/issues/series/back-to-basics/banks",
      },
      {
        text: "Banks get by with a fairly small cash reserve, much lower than their customers' daily-available deposits, because not all customers want to withdraw their money in cash at the same time (Bundesbank school book, in German: 'weil nicht alle Kundinnen und Kunden ihr Geld gleichzeitig bar abheben wollen').",
        source: "https://publikationen.bundesbank.de/publikationen-de/schule-bildung/geld-und-geldpolitik-921580?article=3-banken-und-buchgeld-922604",
      },
      {
        text: "If customers fear for their deposits and withdraw very fast (a 'run on deposits'), the small portion of liquid assets a bank holds can be exhausted quickly and the bank may be driven into trouble.",
        source: "https://www.imf.org/en/publications/fandd/issues/series/back-to-basics/banks",
      },
      {
        text: "An attempt by many depositors to withdraw at once is called a bank run. Two policies have greatly reduced bank runs: emergency lending by central banks and deposit insurance.",
        source: "https://www.stlouisfed.org/publications/regional-economist/2023/may/interest-rate-risk-bank-runs",
      },
      {
        text: "Money in a bank account is mostly 'book money', an electronic record that is the basis of cashless payment. There is much more book money than cash in circulation. A transfer is an order to your bank to move an amount from your account to another account; payments can also be made with a debit card.",
        source: "https://publikationen.bundesbank.de/publikationen-de/schule-bildung/geld-und-geldpolitik-921580?article=3-banken-und-buchgeld-922604",
      },
      {
        text: "Euro money can exist in a bank account as a computer entry. Most of the money people use is commercial bank money, created by banks when they grant loans.",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_money.en.html",
      },
      {
        text: "Most money in the economy is created by banks when they provide loans, as electronic deposits (the Bank of England says around 80%). Banknotes and coins make up only about 3%.",
        source: "https://www.bankofengland.co.uk/explainers/how-is-money-created",
      },
      {
        text: "The Bundesbank says banks can create book money just by making an accounting entry when they grant credit, which refutes the popular idea that banks can only lend funds that other customers deposited earlier.",
        source: "https://www.bundesbank.de/en/tasks/topics/how-money-is-created-667392",
      },
      {
        text: "In Germany, statutory deposit guarantee schemes give a legal entitlement to compensation of up to a maximum of EUR 100,000 per depositor and per bank, including claims to interest.",
        source: "https://www.bundesbank.de/en/tasks/financial-supervision/individual-aspects/deposit-protection-622748",
      },
      {
        text: "In Germany, every bank with a licence for deposit and credit business automatically belongs to a deposit guarantee scheme, as the law requires. The statutory claim is at most 100,000 euros per customer and bank, regardless of the number of accounts. Covered deposits include account balances, fixed-term deposits and savings deposits.",
        source: "https://www.bafin.de/DE/verbraucherinnen-verbraucher/themen-finanzprodukte/geldanlage/einlagensicherung-anlegerentschaedigung/einlagensicherung-anlegerentschaedigung_node.html",
      },
      {
        text: "EU rule: deposit guarantee schemes protect deposits of up to EUR 100,000. The European Commission page was dated 17 July 2026 (checked 29 October 2026) and still says EUR 100 000.",
        source: "https://finance.ec.europa.eu/banking/banking-regulation/deposit-guarantee-schemes_en",
      },
      {
        text: "EU rule: the EUR 100,000 limit applies per depositor per bank, to all accounts at the same bank added together. Every EU country must have at least one scheme that all banks must join.",
        source: "https://eur-lex.europa.eu/summary/sr/240406_9",
      },
      {
        text: "Banks in Germany are supervised by BaFin together with the Bundesbank. BaFin is part of the Single Supervisory Mechanism, led by the European Central Bank, which directly supervises the significant banks in the euro area.",
        source: "https://www.bafin.de/EN/die-bafin/ueber-die-bafin/aufgaben/bankenaufsicht/bankenaufsicht_node_en.html",
      },
      {
        text: "The ECB supervises large and significant banks in the euro area. The Single Supervisory Mechanism is the ECB together with the national supervisors of the euro area countries.",
        source: "https://www.bankingsupervision.europa.eu/press/other-publications/publications/html/ssm.faq_about~c50751c039.en.html",
      },
    ],
    simplified: [
      "The story says the bank 'lends some of the saved coins'. In reality banks create most money when they lend: a loan creates a new number in the borrower's account. The picture of lending Finn's exact coins is child-sized. It is fair because it shows the real roles (savers, bank, borrowers) and the real need to keep enough ready for withdrawals. Later lessons can tell the fuller story.",
      "The toy uses made-up numbers: Bea needs 4 coins, a normal day is about one fifth of the coins asked back, a rush day is half. Real banks follow many rules and can borrow from the central bank, and a real bank run is rare. The toy keeps one idea: lend some, keep some ready.",
      "The story does not say how banks earn money, because interest is the next lesson.",
      "The real life card only covers deposit protection for ordinary accounts, up to 100,000 euros per person per bank. Special cases (for example up to 500,000 euros for six months after certain events, joint accounts counting per holder, or the extra voluntary schemes of banking associations) are left out. Shares and other investments are not covered.",
      "Supervision is only mentioned by name (BaFin, ECB). Who supervises which bank (the ECB directly the large ones, national authorities the others, with the Bundesbank helping) is too detailed for an 8-year-old.",
      "Finn, Bea, Sam, the town bank and all coin numbers are made up. 'Rush' stands for what experts call a bank run.",
    ],
  },
};
