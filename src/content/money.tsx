import { useState } from "react";
import { CheckButton, animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import { BarterDiagram, JobsDiagram, MeetDiagram, MoneyDiagram, SearchDiagram, SwapWithCoinsDiagram } from "./money.diagrams";
import { TradeBoard } from "./money.toy";

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang }: ToyProps) {
  return <TradeBoard lang={lang} mode="toy" />;
}

function GetBreadWidget({ lang, onAnswer }: WidgetProps) {
  const [hasBread, setHasBread] = useState(false);
  const [passed, setPassed] = useState(false);
  return (
    <>
      <TradeBoard lang={lang} mode="quiz" onBread={() => setHasBread(true)} />
      {!passed && (
        <div className="row nav">
          <CheckButton
            lang={lang}
            onClick={() => {
              if (hasBread) setPassed(true);
              onAnswer(hasBread);
            }}
          />
        </div>
      )}
    </>
  );
}

export const lesson: Lesson = {
  id: "money",
  story: [
    animatedBeat(
      [
        T("Let's meet Finn. Finn lives in Ripple Town.", "Das ist Finn. Finn wohnt in Ripple Town."),
        T(
          "Finn is a fisherman. That means his job is to catch fish.",
          "Finn ist Fischer. Das heißt, sein Beruf ist es, Fische zu fangen.",
        ),
        T("Today he caught three fish. One, two, three!", "Heute hat er drei Fische gefangen. Eins, zwei, drei!"),
        T("Now Finn is hungry. He would love some bread.", "Jetzt hat Finn Hunger. Er hätte so gern Brot."),
        T(
          "Bea is a baker. That means she bakes bread, and she has lots of it!",
          "Bea ist Bäckerin. Das heißt, sie backt Brot, und sie hat jede Menge davon!",
        ),
      ],
      MeetDiagram,
    ),
    animatedBeat(
      [
        T(
          "Finn has an idea. He can swap one of his fish for some of Bea's bread.",
          "Finn hat eine Idee. Er kann einen Fisch gegen etwas von Beas Brot tauschen.",
        ),
        T(
          "Swapping things without any money has a name. It is called *barter*. Finn wants to barter his fish for bread.",
          "Tauschen ohne Geld hat einen Namen: *Tauschhandel*. Finn möchte seinen Fisch gegen Brot eintauschen.",
        ),
        T(
          "But Bea says: No thanks! I don't need fish. I need new shoes.",
          "Aber Bea sagt: Nein danke! Ich brauche keinen Fisch. Ich brauche neue Schuhe.",
        ),
      ],
      BarterDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "So Finn must find someone who has shoes and who wants fish.",
          "Also muss Finn jemanden finden, der Schuhe hat und Fisch will.",
        ),
        T(
          "Sam is a shoemaker, and Sam has lots of shoes. Finn asks him.",
          "Sam ist Schuhmacher und hat jede Menge Schuhe. Finn fragt ihn.",
        ),
        T(
          "But Sam says: No thanks! I want apples, not fish.",
          "Aber Sam sagt: Nein danke! Ich will Äpfel, keinen Fisch.",
        ),
        T(
          "Barter only works when both people want what the other one has. Finn could search all day, and he is still hungry!",
          "Tauschhandel klappt nur, wenn beide das wollen, was der andere hat. Finn könnte den ganzen Tag suchen, und sein Magen knurrt immer noch!",
        ),
      ],
      SearchDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "People thought: there must be an easier way. So they invented *money*.",
          "Die Menschen dachten: Es muss einfacher gehen. Also haben sie *Geld* erfunden.",
        ),
        T(
          "Money is something that everybody agrees to accept. In Ripple Town, the money is coins.",
          "Geld ist etwas, das alle annehmen. In Ripple Town ist das Geld aus Münzen.",
        ),
      ],
      MoneyDiagram,
    ),
    animatedBeat(
      [
        T(
          "Now Finn sells one fish to Sam. Sam pays 2 coins.",
          "Jetzt verkauft Finn einen Fisch an Sam. Sam bezahlt 2 Münzen.",
        ),
        T("Finn walks to Bea with his 2 coins.", "Finn geht mit seinen 2 Münzen zu Bea."),
        T(
          "Finn buys bread from Bea. She is happy to take the coins. Now Finn has bread, and nobody had to want fish!",
          "Finn kauft bei Bea Brot. Sie nimmt die Münzen gern. Jetzt hat Finn Brot, und niemand musste Fisch wollen!",
        ),
      ],
      SwapWithCoinsDiagram,
    ),
    animatedBeat(
      [
        T("Money does three jobs. Job one: it helps us swap.", "Geld hat drei Aufgaben. Aufgabe eins: Es hilft uns beim Tauschen."),
        T(
          "Job two: it shows the *price*. A price tells us how many coins something costs. Bread costs 2 coins.",
          "Aufgabe zwei: Es zeigt den *Preis*. Ein Preis sagt uns, wie viele Münzen etwas kostet. Brot kostet 2 Münzen.",
        ),
        T(
          "Job three: you can *save* it. When you save coins, you keep them for later.",
          "Aufgabe drei: Du kannst es *sparen*. Wer Münzen spart, hebt sie für später auf.",
        ),
      ],
      JobsDiagram,
    ),
  ],
  toyIntro: T(
    "Help Finn get bread! Follow the steps. Step 1 is barter: swapping without coins.",
    "Hilf Finn, an Brot zu kommen! Folge den Schritten. Schritt 1 ist Tauschhandel: tauschen ohne Münzen.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T("Why couldn't Finn swap his fish for bread?", "Warum konnte Finn seinen Fisch nicht gegen Brot tauschen?"),
      options: [
        { text: T("Bea wanted shoes, not fish", "Bea wollte Schuhe, keinen Fisch"), correct: true },
        { text: T("Finn had no fish left", "Finn hatte keinen Fisch mehr") },
        { text: T("Bea does not like bread", "Bea mag kein Brot") },
      ],
      hint: T(
        "Remember what Bea needed? She wanted shoes, not fish.",
        "Weißt du noch, was Bea brauchte? Sie wollte Schuhe, keinen Fisch.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Help Finn get his bread. Follow the 3 steps, then press Check.",
        "Hilf Finn, an sein Brot zu kommen. Folge den 3 Schritten und drücke dann Prüfen.",
      ),
      Widget: GetBreadWidget,
      hint: T(
        "Finn has no bread yet. Turn the coins on, sell the fish, then buy the bread.",
        "Finn hat noch kein Brot. Schalte die Münzen an, verkaufe den Fisch und kaufe dann das Brot.",
      ),
    },
    {
      kind: "choice",
      prompt: T("Which of these is NOT a job of money?", "Was kann Geld NICHT?"),
      options: [
        { text: T("Helps us swap things", "Uns beim Tauschen helfen") },
        { text: T("Shows the price of things", "Zeigen, was etwas kostet") },
        { text: T("Makes more fish by itself", "Von allein mehr Fische machen"), correct: true },
        { text: T("Lets us keep value for later", "Wert für später aufheben") },
      ],
      hint: T(
        "Money can't make fish! It helps us swap, shows prices, and lets us keep value for later.",
        "Geld kann keine Fische machen! Es hilft beim Tauschen, zeigt Preise und hebt Wert für später auf.",
      ),
    },
  ],
  askDad: T(
    "Have you ever wanted to swap something with a friend, but they did not want what you had? What did you do? And what do we use money for in our family?",
    "Wolltest du schon einmal etwas mit einem Freund tauschen, aber er wollte nicht, was du hattest? Was hast du gemacht? Und wofür nutzen wir in unserer Familie Geld?",
  ),
  realLife: {
    title: T("Money in Germany", "Geld in Deutschland"),
    body: T(
      "In Germany we pay with euros (€). One euro is 100 cents. There are coins from 1 cent up to 2 euros, and paper notes. Next time you are in a shop, look at the price tag!",
      "In Deutschland bezahlen wir mit Euro (€). Ein Euro sind 100 Cent. Es gibt Münzen von 1 Cent bis 2 Euro und Geldscheine. Schau im Laden mal auf das Preisschild!",
    ),
  },
  factCard: {
    claims: [
      {
        text: "Barter needs a 'double coincidence of wants': each side must have something the other side wants.",
        source: "https://www.stlouisfed.org/publications/page-one-economics/2013/03/01/money-and-inflation-a-functional-relationship",
      },
      {
        text: "With money as a medium of exchange, the two sides no longer need to want each other's goods.",
        source: "https://www.ecb.europa.eu/home/pdf/students/booklet_en.pdf",
      },
      {
        text: "Money has three functions: medium of exchange, unit of account (prices), store of value.",
        source: "https://www.ecb.europa.eu/ecb-and-you/explainers/tell-me-more/html/what_is_money.en.html",
      },
      {
        text: "Germany uses the euro as its currency.",
        source: "https://www.ecb.europa.eu/euro/intro/html/map.en.html",
      },
      {
        text: "Euro coins go from 1 cent to 2 euros (1, 2, 5, 10, 20, 50 cent, 1 and 2 euro), and there are euro banknotes. One euro is 100 cents.",
        source: "https://www.ecb.europa.eu/euro/coins/html/index.en.html",
      },
    ],
    simplified: [
      "Barter has more problems (measuring value, splitting goods). The lesson shows only the 'both must want each other's thing' problem, which is the one an 8-year-old can see.",
      "The three functions are told as 'helps us swap', 'shows the price', 'keep it for later'.",
      "Finn, Bea and Sam and the 2-coin price are made up. Real prices vary.",
      "In the toy every villager buys fish for coins. In real life someone must actually want fish and be able to pay.",
    ],
  },
};
