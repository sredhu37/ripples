import { useState } from "react";
import { CheckButton, animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import {
  BikeGoalDiagram,
  BootDiagram,
  PocketMoneyDiagram,
  RainyJarDiagram,
  SaveDiagram,
  SweetsDiagram,
  WeeksDiagram,
} from "./savings.diagrams";
import { Planner, plan } from "./savings.toy";

// The planner logic lives in savings.toy.tsx; re-exported here for the tests.
export { plan } from "./savings.toy";
export type { Plan, PlanWeek, RainPaidBy } from "./savings.toy";

const T = (en: string, de: string): Text => ({ en, de });

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
    animatedBeat(
      [
        T("This is Pip. Pip lives in Ripple Town too.", "Das ist Pip. Pip wohnt auch in Ripple Town."),
        T("Every week Pip gets 4 coins from Dad.", "Jede Woche bekommt Pip 4 Münzen von Papa."),
        T(
          "Money that a child gets regularly has a name. It is called *pocket money*.",
          "Geld, das ein Kind regelmäßig bekommt, hat einen Namen. Es heißt *Taschengeld*.",
        ),
        T(
          "Pip can decide what to do with it. But what should Pip do?",
          "Pip darf selbst entscheiden, was damit passiert. Aber was soll Pip tun?",
        ),
      ],
      PocketMoneyDiagram,
    ),
    animatedBeat(
      [
        T(
          "One day Pip sees a red bike in a shop window.",
          "Eines Tages sieht Pip in einem Schaufenster ein rotes Fahrrad.",
        ),
        T("The price tag says 12 coins.", "Auf dem Preisschild stehen 12 Münzen."),
        T(
          "That is much more than the 4 coins Pip gets in a week. Pip cannot buy the bike today.",
          "Das ist viel mehr als die 4 Münzen, die Pip in einer Woche bekommt. Heute kann Pip das Fahrrad nicht kaufen.",
        ),
        T(
          "But Pip really wants this bike. Something you save up for has a name. It is called a *savings goal*. The bike is Pip's savings goal.",
          "Aber Pip möchte dieses Fahrrad unbedingt. Etwas, auf das du sparst, hat einen Namen. Es heißt *Sparziel*. Das Fahrrad ist Pips Sparziel.",
        ),
      ],
      BikeGoalDiagram,
    ),
    animatedBeat(
      [
        T("Pip could spend all 4 coins on sweets. Yum!", "Pip könnte alle 4 Münzen für Süßes ausgeben. Lecker!"),
        T(
          "Pip hands over the 4 coins and gets 4 sweets.",
          "Pip gibt die 4 Münzen her und bekommt dafür 4 Süßigkeiten.",
        ),
        T(
          "But sweets get eaten, and then the coins are gone. Pip has 0 coins left.",
          "Aber Süßes wird aufgegessen, und dann sind die Münzen weg. Pip hat keine Münzen mehr.",
        ),
        T(
          "Next week it is the same again, and the bike never gets closer.",
          "Nächste Woche ist es genauso, und das Fahrrad kommt nie näher.",
        ),
      ],
      SweetsDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Or Pip can save. You already know it: when you save, you keep coins for later instead of spending them.",
          "Oder Pip spart. Das weißt du schon: Wer spart, hebt Münzen für später auf, statt sie auszugeben.",
        ),
        T(
          "Saving is a choice: sweets now, or a bike later.",
          "Sparen ist eine Entscheidung: jetzt Süßes oder später ein Fahrrad.",
        ),
        T(
          "Pip decides: 3 coins go into the piggy bank, and 1 coin is for a sweet. Pip does this every week.",
          "Pip entscheidet: 3 Münzen kommen ins Sparschwein, und 1 Münze ist zum Naschen. Das macht Pip jede Woche.",
        ),
        T(
          "Waiting is hard! But every week the piggy bank gets a little fuller.",
          "Warten ist schwer! Aber jede Woche wird das Sparschwein ein bisschen voller.",
        ),
      ],
      SaveDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Week 1: Pip puts 3 coins into the piggy bank. Now it holds 3 coins.",
          "Woche 1: Pip legt 3 Münzen ins Sparschwein. Jetzt sind 3 Münzen drin.",
        ),
        T(
          "Week 2: 3 more coins. Now there are 6 coins in the piggy bank.",
          "Woche 2: 3 Münzen kommen dazu. Jetzt sind 6 Münzen im Sparschwein.",
        ),
        T("Week 3: 3 more coins. Now there are 9.", "Woche 3: wieder 3 Münzen. Jetzt sind es 9."),
        T(
          "Week 4: 3 more coins. Now there are 12 coins. That is exactly the price of the bike!",
          "Woche 4: wieder 3 Münzen. Jetzt sind es 12 Münzen. Das ist genau der Preis vom Fahrrad!",
        ),
        T(
          "Pip buys the bike. Pip reached the savings goal!",
          "Pip kauft das Fahrrad. Pip hat das Sparziel erreicht!",
        ),
      ],
      WeeksDiagram,
      "happy",
    ),
    animatedBeat(
      [
        T("One day it rains hard.", "Eines Tages regnet es in Strömen."),
        T("Oh no! Pip's boot breaks.", "Oh nein! Pips Stiefel geht kaputt."),
        T(
          "Fixing the boot costs 3 coins, and Pip needs the boot right now.",
          "Die Reparatur kostet 3 Münzen, und Pip braucht den Stiefel sofort.",
        ),
        T(
          "If the 3 coins come out of the bike's piggy bank, the bike comes later.",
          "Kommen die 3 Münzen aus dem Sparschwein fürs Fahrrad, kommt das Fahrrad später.",
        ),
      ],
      BootDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "Pip keeps the bike coins in the piggy bank.",
          "Pip hebt die Fahrrad-Münzen im Sparschwein auf.",
        ),
        T(
          "Now Pip adds a second jar, only for surprises like a broken boot.",
          "Jetzt bekommt Pip ein zweites Glas, nur für Überraschungen wie einen kaputten Stiefel.",
        ),
        T(
          "A jar for surprise costs has a name. It is called a *rainy-day jar*.",
          "Ein Glas für überraschende Kosten hat einen Namen. Es heißt *Regentag-Glas*.",
        ),
        T(
          "Every week Pip puts 1 coin into it. That is the coin that used to buy a sweet.",
          "Jede Woche legt Pip 1 Münze hinein. Das ist die Münze, die vorher für Süßes da war.",
        ),
        T(
          "Now Pip has two reasons to save: a goal to reach, and coins ready for surprises.",
          "Jetzt hat Pip zwei Gründe zum Sparen: ein Ziel und Münzen für Überraschungen.",
        ),
      ],
      RainyJarDiagram,
      "happy",
    ),
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
      "The lesson says pocket money is money a child gets regularly. Some families give it less regularly or in other ways; the regular weekly kind is the simplest to show.",
      "'Rainy-day jar' is the lesson's child-friendly word. Grown-ups call it a rainy-day fund or emergency fund (see the second claim).",
      "The DJI amounts are euros and only a recommendation, not a law. The lesson says 'about 3 to 4 euros a week' and the toy uses coins, not euros.",
    ],
  },
};
