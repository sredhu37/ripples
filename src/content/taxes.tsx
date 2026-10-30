import { useState } from "react";
import { CheckButton, animatedBeat } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import { BalanceDiagram, EarnDiagram, NeedsDiagram, PotDiagram, RoadDiagram, ShareDiagram, VoteDiagram } from "./taxes.diagrams";
import { BudgetBoard, budget } from "./taxes.toy";

export { budget };

const T = (en: string, de: string): Text => ({ en, de });

function Toy({ lang, onDone }: ToyProps) {
  const [tax, setTax] = useState(0);
  return (
    <BudgetBoard
      lang={lang}
      tax={tax}
      onTax={(next) => {
        setTax(next);
        onDone?.();
      }}
    />
  );
}

function BudgetWidget({ lang, onAnswer }: WidgetProps) {
  const [tax, setTax] = useState(0);
  const check = () => {
    const b = budget(tax);
    onAnswer(b.funded.includes("road") && b.funded.includes("school") && b.keep >= 7);
  };
  return (
    <>
      <BudgetBoard lang={lang} tax={tax} onTax={setTax} />
      <div className="row nav">
        <CheckButton lang={lang} onClick={check} />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "taxes",
  story: [
    animatedBeat(
      [
        T(
          "Ripple Town has a problem. The road to the harbour is full of holes.",
          "In Ripple Town gibt es ein Problem. Die Straße zum Hafen ist voller Löcher.",
        ),
        T(
          "Look! A cart is stuck in one of the holes. It cannot get through.",
          "Schau! Ein Karren steckt in einem der Löcher fest. Er kommt nicht weiter.",
        ),
        T(
          "Finn wants to fix the road all by himself. He has brought his hammer.",
          "Finn will die Straße ganz allein reparieren. Er hat seinen Hammer mitgebracht.",
        ),
        T(
          "But a whole road is much too big for one person. Finn gets tired and sad.",
          "Aber eine ganze Straße ist viel zu groß für einen allein. Finn wird müde und traurig.",
        ),
        T(
          "Bea and Sam use the road too. So the broken road is a problem for the whole town.",
          "Auch Bea und Sam benutzen die Straße. Die kaputte Straße ist also ein Problem für die ganze Stadt.",
        ),
      ],
      RoadDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "A town needs more than a road. It needs a school, where children learn.",
          "Eine Stadt braucht mehr als eine Straße. Sie braucht eine Schule, in der Kinder lernen.",
        ),
        T(
          "It needs a fire brigade. Firefighters put out fires and help everybody.",
          "Sie braucht eine Feuerwehr. Feuerwehrleute löschen Brände und helfen allen.",
        ),
        T(
          "And it needs a park, where everybody can play and rest.",
          "Und sie braucht einen Park, in dem alle spielen und sich ausruhen können.",
        ),
        T(
          "Nobody can build these alone. The whole town needs them.",
          "Das kann keiner allein bauen. Die ganze Stadt braucht sie.",
        ),
      ],
      NeedsDiagram,
    ),
    animatedBeat(
      [
        T(
          "This is Moss. He is the leader of Ripple Town. The leader of a town is called a *mayor*.",
          "Das ist Moss. Er leitet Ripple Town. Wer eine Stadt leitet, heißt *Bürgermeister*.",
        ),
        T(
          "Mayor Moss has an idea. Everybody puts a few coins into one big pot.",
          "Bürgermeister Moss hat eine Idee. Alle legen ein paar Münzen in einen großen Topf.",
        ),
        T(
          "The coins that everybody puts into the pot have a name. They are called *taxes*.",
          "Die Münzen, die alle in den Topf legen, haben einen Namen. Sie heißen *Steuern*.",
        ),
        T(
          "Moss pays from the pot for what the whole town needs: the road, the school, the fire brigade and the park.",
          "Moss bezahlt aus dem Topf, was die ganze Stadt braucht: die Straße, die Schule, die Feuerwehr und den Park.",
        ),
      ],
      PotDiagram,
    ),
    animatedBeat(
      [
        T(
          "Taxes are not a price. You do not pay coins every time you walk or ride on the road.",
          "Steuern sind kein Preis. Du zahlst nicht jedes Mal Münzen, wenn du auf der Straße gehst oder fährst.",
        ),
        T(
          "Taxes are a cost that we share, because everybody can use the road.",
          "Steuern sind Kosten, die wir uns teilen, denn alle dürfen die Straße benutzen.",
        ),
      ],
      ShareDiagram,
    ),
    animatedBeat(
      [
        T(
          "Let's see who puts in how much. Finn earns 10 coins.",
          "Schauen wir, wer wie viel einzahlt. Finn verdient 10 Münzen.",
        ),
        T(
          "From those 10 coins, he puts 2 into the pot as taxes.",
          "Von diesen 10 Münzen legt er 2 als Steuern in den Topf.",
        ),
        T(
          "Bea earns 20 coins, so she puts 4 coins into the pot.",
          "Bea verdient 20 Münzen, deshalb legt sie 4 Münzen in den Topf.",
        ),
        T(
          "Whoever earns more usually puts in more. Bea earns more than Finn, so she puts in more.",
          "Wer mehr verdient, zahlt meistens mehr. Bea verdient mehr als Finn, also zahlt sie mehr.",
        ),
      ],
      EarnDiagram,
    ),
    animatedBeat(
      [
        T(
          "Now Moss has a hard job. He must decide how many coins everybody puts in.",
          "Jetzt hat Moss eine schwere Aufgabe. Er muss entscheiden, wie viele Münzen jeder einzahlt.",
        ),
        T(
          "If the pot is too small, there is not enough for the road and the school.",
          "Ist der Topf zu klein, reicht es nicht für die Straße und die Schule.",
        ),
        T(
          "If the pot is too big, people keep too few coins for bread and shoes.",
          "Ist der Topf zu groß, bleiben den Leuten zu wenige Münzen für Brot und Schuhe.",
        ),
        T(
          "So Moss has to find the right amount, not too small and not too big.",
          "Moss muss also die richtige Menge finden, nicht zu klein und nicht zu groß.",
        ),
      ],
      BalanceDiagram,
      "think",
    ),
    animatedBeat(
      [
        T(
          "But Moss does not choose the taxes all alone. The town decides together.",
          "Aber Moss bestimmt die Steuern nicht ganz allein. Die Stadt entscheidet gemeinsam.",
        ),
        T(
          "The people of the town *vote*. To vote means to choose together, for example with a paper in a box.",
          "Die Leute der Stadt *wählen*. Wählen heißt, gemeinsam zu entscheiden, zum Beispiel mit einem Zettel in einer Box.",
        ),
        T(
          "They vote for the mayor and for the council, a group of townspeople who decide together. The mayor and the council choose the taxes.",
          "Sie wählen den Bürgermeister und den Rat, eine Gruppe von Leuten aus der Stadt, die gemeinsam entscheiden. Bürgermeister und Rat bestimmen die Steuern.",
        ),
        T(
          "Now it is your turn. Be Mayor Moss for a day and try the tax board!",
          "Jetzt bist du dran. Sei einen Tag lang Bürgermeister Moss und probier die Steuer-Tafel aus!",
        ),
      ],
      VoteDiagram,
    ),
  ],
  toyIntro: T(
    "Be Mayor Moss for a day. Everyone earns 10 coins and needs 6 for bread and shoes. Slide the tax and watch what the pot can pay for.",
    "Sei einen Tag lang Bürgermeister Moss. Alle verdienen 10 Münzen und brauchen 6 für Brot und Schuhe. Schiebe die Steuer und schau, was der Topf bezahlt.",
  ),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T("What are taxes?", "Was sind Steuern?"),
      options: [
        {
          text: T("A fee for each time you use the road", "Eine Gebühr für jedes Mal, wenn du die Straße benutzt"),
        },
        {
          text: T("Coins everyone shares for things the whole town needs", "Münzen, die alle für Dinge teilen, die die ganze Stadt braucht"),
          correct: true,
        },
        {
          text: T("Coins that Mayor Moss keeps for himself", "Münzen, die Bürgermeister Moss für sich behält"),
        },
      ],
      hint: T(
        "Taxes go into one pot that everybody shares. Mayor Moss spends it on the road, the school and more. It is not a price for each use.",
        "Steuern kommen in einen Topf, den alle teilen. Bürgermeister Moss bezahlt davon die Straße, die Schule und mehr. Es ist kein Preis für jede Benutzung.",
      ),
    },
    {
      kind: "widget",
      prompt: T(
        "Set the tax so the town can pay for the road and the school, and everyone still keeps at least 7 coins. Then press Check.",
        "Stelle die Steuer so ein, dass die Stadt die Straße und die Schule bezahlen kann und jeder trotzdem mindestens 7 Münzen behält. Drücke dann Prüfen.",
      ),
      Widget: BudgetWidget,
      hint: T(
        "The road and the school cost 30 coins. 10 people with 3 coins each make 30. Less, and there is no school. More, and people keep under 7.",
        "Die Straße und die Schule kosten 30 Münzen. 10 Leute mit je 3 Münzen ergeben 30. Weniger, und es gibt keine Schule. Mehr, und den Leuten bleiben unter 7.",
      ),
    },
    {
      kind: "choice",
      prompt: T(
        "Finn earns 10 coins. Bea earns 20 coins. Who usually puts more coins into the pot?",
        "Finn verdient 10 Münzen. Bea verdient 20 Münzen. Wer legt meistens mehr Münzen in den Topf?",
      ),
      options: [
        { text: T("Finn puts in more", "Finn legt mehr hinein") },
        { text: T("They put in the same number of coins", "Sie legen gleich viele Münzen hinein") },
        { text: T("Bea puts in more", "Bea legt mehr hinein"), correct: true },
      ],
      hint: T(
        "People who earn more usually put in more. Bea earns 20 coins and Finn only 10, so Bea puts more in the pot.",
        "Wer mehr verdient, zahlt meistens mehr. Bea verdient 20 Münzen und Finn nur 10, also legt Bea mehr in den Topf.",
      ),
    },
  ],
  askDad: T(
    "Do we pay taxes in our family? Where can you see them, for example on your payslip? And what would you pay for first in our town: better roads, a bigger school or a new park?",
    "Zahlen wir in unserer Familie Steuern? Wo siehst du sie, zum Beispiel auf deiner Gehaltsabrechnung? Und was würdest du in unserer Stadt zuerst bezahlen: bessere Straßen, eine größere Schule oder einen neuen Park?",
  ),
  realLife: {
    title: T("Taxes in Germany", "Steuern in Deutschland"),
    body: T(
      "In Germany the tax office is called the Finanzamt. Many employees never see their income tax, because the employer takes it from their pay (Lohnsteuer). A tax return (Steuererklärung) is a form to check the town got the right amount; sometimes you get money back, and you can send it online with ELSTER. For the year 2025 the usual deadline for people who must send one was 31 July 2026.",
      "In Deutschland heißt das Steueramt Finanzamt. Viele Arbeitnehmer sehen ihre Einkommensteuer gar nicht, denn der Arbeitgeber nimmt sie gleich vom Lohn (Lohnsteuer). Eine Steuererklärung ist ein Formular, mit dem man prüft, ob die Stadt den richtigen Betrag bekommen hat; manchmal gibt es Geld zurück, und man kann sie online mit ELSTER abschicken. Für das Jahr 2025 war die übliche Frist für alle, die eine abgeben müssen, der 31. Juli 2026.",
    ),
  },
  factCard: {
    claims: [
      {
        text: "Legally, taxes are money payments that are not a payment for a particular service in return, and that a public body charges everyone who meets the conditions set in the law (Abgabenordnung, section 3).",
        source: "https://www.gesetze-im-internet.de/ao_1977/__3.html",
      },
      {
        text: "Taxes are the state's most important source of income, and the money pays for shared tasks such as education, health, transport infrastructure and security.",
        source: "https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Themen/Steuern/steuern.html",
      },
      {
        text: "The Federal Ministry of Finance (easy-language page) says the state builds hospitals, schools and roads with tax money, and also pays police officers and firefighters.",
        source: "https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Service/Leichte_Sprache/steuern.html",
      },
      {
        text: "Income tax is not the same for everyone: people who earn a lot pay more tax, people who earn little pay less (called progression in the source).",
        source: "https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Service/Leichte_Sprache/steuern.html",
      },
      {
        text: "The Finanzamt works out how much each person must pay; people tell it once a year what they earned in an income tax return (Einkommensteuererklärung). Not everyone has to file one.",
        source: "https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Service/Leichte_Sprache/steuern.html",
      },
      {
        text: "Sometimes an employer pays too much wage tax (Lohnsteuer) to the Finanzamt, and the employee can get it back by filing a tax return.",
        source: "https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Service/Leichte_Sprache/steuern.html",
      },
      {
        text: "The employer must withhold wage tax (Lohnsteuer) from the wages at every wage payment, for the employee's account.",
        source: "https://esth.bundesfinanzministerium.de/lsth/2026/A-Einkommensteuergesetz/VI-Steuererhebung-36-47/2-Steuerabzug-vom-Arbeitslohn-Lohnsteuer-38-42g/Paragraf-38/paragraf-38.html",
      },
      {
        text: "ELSTER (ELektronische STeuerERklärung) is a free service of the tax administration for filling in a tax return and sending it electronically to the Finanzamt.",
        source: "https://www.finanzamt.nrw.de/elster-ihr-online-finanzamt",
      },
      {
        text: "About 29 October 2026 (page read that day): people who must file a tax return for the year 2025 had to send it by 31 July 2026; with a tax adviser the deadline is 1 March 2027. In general the deadline is 31 July of the following year.",
        source: "https://www.finanzamt.nrw.de/steuerinfos/weitere-themen/steuererklaerung/abgabepflichten-und-fristen",
      },
      {
        text: "Tax laws are made by town councils (only for that town), state parliaments (Landtag) and the Bundestag (all of Germany).",
        source: "https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Service/Leichte_Sprache/steuern.html",
      },
      {
        text: "In Germany, state power comes from the people and is exercised by the people in elections and votes (Basic Law, Article 20).",
        source: "https://www.gesetze-im-internet.de/gg/art_20.html",
      },
      {
        text: "Citizens should pay taxes but not be squeezed by them, because it is in the state's interest that the source of its income does not dry up.",
        source: "https://www.bpb.de/shop/zeitschriften/izpb/steuern-und-finanzen-288/147061/grundsaetze-der-steuerpolitik/",
      },
    ],
    simplified: [
      "In the toy and story everyone pays the same share (out of 10 coins). Real German income tax rises in steps with income, so higher earners pay a bigger share. The lesson only says 'who earns more usually pays more', which matches the source.",
      "Ripple Town has one pot and one mayor. Germany has taxes at town, state and federal level and nearly 40 kinds of tax. The lesson shows only the idea of a shared pot.",
      "All numbers (10 coins a week, costs of 10 and 20 coins, 6 coins needed for bread and shoes) are made up. The fixed order in which Mayor Moss pays for things is a toy rule; real budgets are decided by councils and parliaments.",
      "The trade-off (pot too small or too big) is simplified to a pot and coins people keep. Real budgets also involve debts, other income and many more tasks.",
      "Taxes in shops (VAT in the price) and other kinds of tax are not covered. 'Taxes are not a price for each use' follows the legal definition in section 3 of the Abgabenordnung (no direct payment for a particular service); fees for single services exist and are a different thing.",
      "'Many employees never see their income tax' is told as: the employer takes it from pay and sends it on. Tax class, allowances and social contributions are left out. 'Many' is used because the sources say the employer must withhold it; the lesson does not claim an exact share.",
      "A tax return is told as 'a form to check the town got the right amount'. In real life it also lets people claim costs that lower the tax, not everyone must file, and deadlines differ (tax adviser, extensions, voluntary filing). The lesson gives no advice on whether to file.",
      "Mayor Moss, Finn, Bea and Sam are made up. People vote for a mayor and council in towns; the lesson does not describe Germany's election system.",
      "The story says 'a mayor is the leader of a town', 'to vote means to choose together, for example with a paper in a box' and 'the council is a group of townspeople who decide together'. These are child-sized descriptions: in Germany only eligible citizens vote, the exact rules differ between states, and councils are elected bodies. The lesson names no election rules.",
    ],
  },
};
