import { useState } from "react";
import { CheckButton, Slider, Stage, ToyButton } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import type { Lang } from "../progress";
import "./banks.css";

const T = (en: string, de: string): Text => ({ en, de });

/** Bea needs this many coins for her oven. */
const OVEN_NEED = 4;
const MAX_SAVED = 16;

interface Board {
  /** Coins the savers have put into the bank. */
  saved: number;
  /** Coins the bank has lent to Bea. */
  lent: number;
  /** Is it a rush day (many savers come at once)? */
  rush: boolean;
}

const START: Board = { saved: 10, lent: 0, rush: false };

/** How many coins the savers ask for today. A normal day: about one fifth. A rush day: half. */
function coinsAsked(saved: number, rush: boolean): number {
  return rush ? Math.ceil(saved / 2) : Math.ceil(saved / 5);
}

/** The widget question is solved when Bea can build her oven AND a rush day is still fine. */
function bankIsBalanced(b: Board): boolean {
  const ready = b.saved - b.lent;
  return b.lent >= OVEN_NEED && ready >= coinsAsked(b.saved, true);
}

function BankBoard({ lang, s }: { lang: Lang; s: Board }) {
  const ready = s.saved - s.lent;
  const asks = coinsAsked(s.saved, s.rush);
  const missing = Math.max(0, asks - ready);
  const trouble = s.saved > 0 && missing > 0;

  let saverSay: Text;
  if (s.saved === 0) {
    saverSay = T(
      "The bank is empty. Slide the first slider to bring in coins.",
      "Die Bank ist leer. Schiebe den ersten Regler, um Münzen zu bringen.",
    );
  } else if (trouble) {
    saverSay = T(
      `Uh-oh! Savers want ${asks} coins, but only ${ready} are ready. ${missing} must wait.`,
      `Oje! Die Sparer wollen ${asks} Münzen, aber nur ${ready} sind bereit. ${missing} müssen warten.`,
    );
  } else if (s.rush) {
    saverSay = T(
      `Rush day! Savers want ${asks} coins back. The bank has them ready.`,
      `Ansturm! Die Sparer wollen ${asks} Münzen zurück. Die Bank hat sie bereit.`,
    );
  } else {
    saverSay = T(
      `A normal day: savers want ${asks} coins back. The bank hands them over.`,
      `Ein normaler Tag: Die Sparer wollen ${asks} Münzen zurück. Die Bank gibt sie her.`,
    );
  }

  let beaSay: Text;
  if (s.lent === 0) {
    beaSay = T("Bea gets no coins, so no new oven.", "Bea bekommt keine Münzen, also keinen neuen Ofen.");
  } else if (s.lent < OVEN_NEED) {
    beaSay = T(
      `Bea has ${s.lent} coins. She needs ${OVEN_NEED} for her oven.`,
      `Bea hat ${s.lent} Münzen. Für ihren Ofen braucht sie ${OVEN_NEED}.`,
    );
  } else {
    beaSay = T("Bea has enough for her oven. She bakes more bread!", "Bea hat genug für ihren Ofen. Sie backt mehr Brot!");
  }

  const en = lang === "en";

  return (
    <Stage label={en ? "Savers, the bank and Bea" : "Sparer, die Bank und Bea"}>
      <div className="bk">
        <div className="bk-cols">
          <div className="bk-col">
            <div className="bk-who">🧔 {en ? "Savers" : "Sparer"}</div>
            <div className="bk-coins" aria-label={en ? `${s.saved} coins saved` : `${s.saved} gesparte Münzen`}>
              {s.saved === 0 ? "0" : "🪙".repeat(s.saved)}
            </div>
            <div className="bk-note">{en ? `${s.saved} saved` : `${s.saved} gespart`}</div>
          </div>
          <div className="bk-arrow" aria-hidden="true">
            ➡️
          </div>
          <div className={`bk-col bk-bank${trouble ? " bk-bad" : ""}${s.rush ? " bk-rush" : ""}`}>
            <div className="bk-who">🏦 Bank</div>
            <div className="bk-coins" aria-label={en ? `${ready} coins ready` : `${ready} Münzen bereit`}>
              {ready === 0 ? "0" : "🪙".repeat(ready)}
            </div>
            <div className="bk-note">{en ? `${ready} ready for savers` : `${ready} bereit für Sparer`}</div>
            <div className="bk-asks" aria-hidden="true">
              {"✋".repeat(asks)}
            </div>
          </div>
          <div className="bk-arrow" aria-hidden="true">
            ➡️
          </div>
          <div className="bk-col">
            <div className="bk-who">👩‍🍳 Bea</div>
            <div className="bk-coins" aria-label={en ? `${s.lent} coins lent` : `${s.lent} Münzen geliehen`}>
              {s.lent === 0 ? "0" : "🪙".repeat(s.lent)}
            </div>
            <div className="bk-note">
              {s.lent >= OVEN_NEED ? "🔥" : "🧱"} {en ? `${s.lent} lent` : `${s.lent} geliehen`}
            </div>
          </div>
        </div>
        <div className="bk-says" role="status">
          <p className={`bk-say${trouble ? " bk-say-bad" : ""}`}>{saverSay[lang]}</p>
          <p className="bk-say">{beaSay[lang]}</p>
        </div>
      </div>
    </Stage>
  );
}

function Controls({ lang, s, set }: { lang: Lang; s: Board; set: (b: Board) => void }) {
  const en = lang === "en";
  return (
    <div className="bk-controls">
      <Slider
        label={en ? "Coins saved" : "Gespart"}
        value={s.saved}
        min={0}
        max={MAX_SAVED}
        onChange={(v) => set({ ...s, saved: v, lent: Math.min(s.lent, v) })}
      />
      <Slider
        label={en ? "Lent to Bea" : "An Bea verliehen"}
        value={s.lent}
        min={0}
        max={s.saved}
        onChange={(v) => set({ ...s, lent: v })}
      />
      <div className="row wrap bk-buttons">
        <ToyButton pressed={s.rush} onClick={() => set({ ...s, rush: !s.rush })}>
          {s.rush
            ? en
              ? "😌 Normal day"
              : "😌 Normaler Tag"
            : en
              ? "🏃 Rush day"
              : "🏃 Ansturm"}
        </ToyButton>
        <ToyButton onClick={() => set(START)}>↺</ToyButton>
      </div>
    </div>
  );
}

function Toy({ lang }: ToyProps) {
  const [s, set] = useState<Board>(START);
  return (
    <>
      <BankBoard lang={lang} s={s} />
      <Controls lang={lang} s={s} set={set} />
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
    {
      scene: "🧔 🛏️ 🪙🪙🪙 🐈",
      text: T(
        "Finn has spare coins. He hides them under his bed. But what if the cat finds them? Or a thief? Or he forgets where they are?",
        "Finn hat Münzen übrig. Er versteckt sie unter dem Bett. Aber was, wenn die Katze sie findet? Oder ein Dieb? Oder er vergisst, wo sie sind?",
      ),
    },
    {
      scene: "👩‍🍳 🔥 ❓ 🚪🚪🚪",
      mood: "think",
      text: T(
        "Bea wants a big new oven and must borrow coins. But who has coins to spare? She cannot knock on every door in town.",
        "Bea möchte einen großen neuen Ofen und muss sich Münzen leihen. Aber wer hat Münzen übrig? Sie kann ja nicht an jeder Tür im Ort klingeln.",
      ),
    },
    {
      scene: "🧔 ➡️ 🏦 🪙🪙🪙🪙",
      mood: "happy",
      text: T(
        "Ripple Town has a bank. A bank is a safe place for coins. Finn brings his coins. The bank writes down: these are Finn's.",
        "In Ripple Town gibt es eine Bank. Eine Bank ist ein sicherer Ort für Münzen. Finn bringt seine Münzen. Die Bank schreibt auf: Die gehören Finn.",
      ),
    },
    {
      scene: "👩‍🍳 🙋 ➡️ 🏦 ➡️ 🪙🪙🪙",
      text: T(
        "Bea asks the bank if she can borrow coins. The bank lends her some of the saved coins. Bea buys her oven and pays them back later.",
        "Bea fragt die Bank, ob sie sich Münzen leihen darf. Die Bank leiht ihr einige der gesparten Münzen. Bea kauft ihren Ofen und zahlt später zurück.",
      ),
    },
    {
      scene: "🏦 🪙🪙 ✋ 🧔",
      mood: "think",
      text: T(
        "But Finn may want coins back soon. So the bank never lends everything. Some coins stay ready in its safe.",
        "Aber Finn will vielleicht bald Münzen zurück. Darum verleiht die Bank nie alles. Ein paar Münzen bleiben im Tresor bereit.",
      ),
    },
    {
      scene: "🧔 👵 🧒 🧑 ✋✋✋ 🏦 😰",
      mood: "think",
      text: T(
        "What if all the savers come on the same day? Some coins are with Bea, so the bank cannot give everything back at once. Enough must stay ready.",
        "Und wenn alle Sparer am selben Tag kommen? Ein Teil der Münzen ist bei Bea. Die Bank kann nicht alles auf einmal zurückgeben. Es muss genug bereit bleiben.",
      ),
    },
    {
      scene: "🧑 💳 ➡️ 🏦 🔢 ➡️ 👩‍🍳",
      text: T(
        "A bank helps with paying too. Sam pays Bea with a card. No coins move! The bank just changes numbers: less for Sam, more for Bea.",
        "Eine Bank hilft auch beim Bezahlen. Sam zahlt Bea mit einer Karte. Es wandern keine Münzen! Die Bank ändert nur Zahlen: weniger bei Sam, mehr bei Bea.",
      ),
    },
    {
      scene: "🧔 ➡️ 🏦 ➡️ 👩‍🍳",
      mood: "happy",
      text: T(
        "Money in a bank is mostly numbers on a computer. The bank stands in the middle: savers on one side, people who borrow on the other.",
        "Geld auf der Bank besteht meistens aus Zahlen im Computer. Die Bank steht in der Mitte: auf der einen Seite die Sparer, auf der anderen alle, die sich Geld leihen.",
      ),
    },
  ],
  toyIntro: T(
    "Move coins into the bank and lend some to Bea. Then press Rush day. Can everyone get coins back?",
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
        { text: T("Lending is not allowed", "Verleihen ist nicht erlaubt") },
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
        "Set the bank so Bea gets her oven AND a rush day still works. Test it with Rush day. Then press Check.",
        "Stelle die Bank so ein, dass Bea ihren Ofen bekommt UND ein Ansturm trotzdem klappt. Teste es mit Ansturm. Drücke dann Prüfen.",
      ),
      Widget: BalanceWidget,
      hint: T(
        "Bea needs 4 coins. And on a rush day, enough coins must stay ready. Try Rush day!",
        "Bea braucht 4 Münzen. Beim Ansturm müssen genug bereit bleiben. Probier ihn aus!",
      ),
    },
    {
      kind: "choice",
      prompt: T("Sam pays Bea with a card. What does the bank do?", "Sam bezahlt Bea mit einer Karte. Was macht die Bank?"),
      options: [
        { text: T("It changes numbers: less for Sam, more for Bea", "Sie ändert Zahlen: weniger bei Sam, mehr bei Bea"), correct: true },
        { text: T("It sends a bag of coins to Bea", "Sie schickt Bea einen Beutel Münzen") },
        { text: T("It waits until Sam brings coins", "Sie wartet, bis Sam Münzen bringt") },
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
