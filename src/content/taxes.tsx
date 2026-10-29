import { useState } from "react";
import { CheckButton, Slider, Stage } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import type { Lang } from "../progress";
import "./taxes.css";

const T = (en: string, de: string): Text => ({ en, de });

/** Every person in Ripple Town earns this many coins a week. */
const INCOME = 10;
/** How many people put coins into the pot. */
const PEOPLE = 10;
/** Coins a person needs to keep for bread and shoes. */
const NEED = 6;
/** The slider goes from none up to this many coins out of every 10. */
const MAX_TAX = 6;

interface Item {
  id: "road" | "school" | "fire" | "park";
  icon: string;
  broken: string;
  name: Text;
  cost: number;
}

/** Mayor Moss pays for these in this order, until the pot runs out. */
const ITEMS: Item[] = [
  { id: "road", icon: "🛣️", broken: "🕳️", name: T("Road", "Straße"), cost: 10 },
  { id: "school", icon: "🏫", broken: "🚧", name: T("School", "Schule"), cost: 20 },
  { id: "fire", icon: "🚒", broken: "🔥", name: T("Fire brigade", "Feuerwehr"), cost: 10 },
  { id: "park", icon: "🌳", broken: "🪨", name: T("Park", "Park"), cost: 10 },
];

/** What a tax rate does. Pure, so the toy and the question agree. */
export function budget(tax: number) {
  const pot = PEOPLE * tax;
  let left = pot;
  const funded: Item["id"][] = [];
  for (const item of ITEMS) {
    if (left >= item.cost) {
      left -= item.cost;
      funded.push(item.id);
    } else break;
  }
  const keep = INCOME - tax;
  return { pot, funded, keep, enough: keep >= NEED };
}

function BudgetBoard({ lang, tax, onTax }: { lang: Lang; tax: number; onTax: (v: number) => void }) {
  const b = budget(tax);
  return (
    <Stage label={lang === "en" ? "Mayor Moss's tax board" : "Bürgermeister Moss' Steuer-Tafel"}>
      <div className="tb">
        <div className="tb-items">
          {ITEMS.map((it) => {
            const on = b.funded.includes(it.id);
            return (
              <div key={it.id} className={`tb-item ${on ? "tb-on" : "tb-off"}`}>
                <span className="tb-icon" aria-hidden="true">
                  {on ? it.icon : it.broken}
                </span>
                <span className="tb-name">{it.name[lang]}</span>
                <span className="tb-cost">
                  {it.cost} 🪙 {on ? "✅" : ""}
                </span>
              </div>
            );
          })}
        </div>
        <p className="tb-line" role="status">
          🫙 {lang === "en" ? "Pot" : "Topf"}: <strong>{b.pot}</strong> 🪙
          <span className="tb-sub">
            {" "}
            ({PEOPLE} {lang === "en" ? "people" : "Leute"} × {tax})
          </span>
        </p>
        <p className="tb-line">
          🧑 {lang === "en" ? "Each person earns 10" : "Jeder verdient 10"} 🪙
          <span className="tb-coins" aria-hidden="true">
            {"🫙".repeat(tax)}
            {"🪙".repeat(INCOME - tax)}
          </span>
        </p>
        <p className={`tb-line tb-keep ${b.enough ? "tb-ok" : "tb-low"}`}>
          {lang === "en" ? "Each person keeps" : "Jeder behält"} <strong>{b.keep}</strong> 🪙
          {" · "}
          {b.enough
            ? lang === "en"
              ? `🙂 enough (needs ${NEED})`
              : `🙂 genug (nötig: ${NEED})`
            : lang === "en"
              ? `😟 too few (needs ${NEED})`
              : `😟 zu wenig (nötig: ${NEED})`}
        </p>
        <Slider
          label={lang === "en" ? "Tax from every 10 coins" : "Steuer von je 10 Münzen"}
          value={tax}
          min={0}
          max={MAX_TAX}
          onChange={onTax}
          left={lang === "en" ? "0 (no tax)" : "0 (keine Steuer)"}
          right={String(MAX_TAX)}
        />
      </div>
    </Stage>
  );
}

function Toy({ lang }: ToyProps) {
  const [tax, setTax] = useState(0);
  return <BudgetBoard lang={lang} tax={tax} onTax={setTax} />;
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
    {
      scene: "🛣️🕳️🕳️ 🛒",
      text: T(
        "Ripple Town has a problem. The road to the harbour is full of holes. Carts get stuck!",
        "In Ripple Town gibt es ein Problem. Die Straße zum Hafen hat lauter Löcher. Die Karren bleiben stecken!",
      ),
    },
    {
      scene: "🧔 🔨 😓 🛣️",
      mood: "think",
      text: T(
        "Finn tries to fix it alone. But a whole road is too big for one person. And Bea and Sam use it too.",
        "Finn will sie allein reparieren. Aber eine ganze Straße ist zu groß für einen allein. Und Bea und Sam benutzen sie auch.",
      ),
    },
    {
      scene: "🏫 🚒 🌳",
      text: T(
        "A school, a fire brigade, a park: nobody can build these alone. The whole town needs them.",
        "Eine Schule, eine Feuerwehr, ein Park: Das kann keiner allein bauen. Die ganze Stadt braucht sie.",
      ),
    },
    {
      scene: "🐢 🫙 🪙🪙🪙",
      text: T(
        "Mayor Moss has an idea. Everyone puts some coins into one big pot. These coins are called taxes. Moss pays for what the town needs.",
        "Bürgermeister Moss hat eine Idee. Alle legen ein paar Münzen in einen großen Topf. Diese Münzen heißen Steuern. Moss bezahlt davon, was die Stadt braucht.",
      ),
    },
    {
      scene: "🛣️ 🚶 🚲 🛒",
      text: T(
        "Taxes are not a price for each time you use the road. It is a cost we share, because everybody can use the road.",
        "Steuern sind kein Preis für jedes Mal, wenn du die Straße benutzt. Alle teilen sich die Kosten, denn alle dürfen die Straße benutzen.",
      ),
    },
    {
      scene: "🧔 10🪙 ➡️ 2🪙   👩‍🍳 20🪙 ➡️ 4🪙",
      text: T(
        "Finn earns 10 coins and puts in 2. Bea earns 20 coins and puts in 4. Who earns more usually puts in more.",
        "Finn verdient 10 Münzen und legt 2 hinein. Bea verdient 20 Münzen und legt 4 hinein. Wer mehr verdient, zahlt meistens mehr.",
      ),
    },
    {
      scene: "🫙 ⚖️ 🪙",
      mood: "think",
      text: T(
        "The pot is hard to get right. Too small: not enough for roads and school. Too big: people keep too few coins for bread and shoes.",
        "Den Topf richtig zu füllen ist schwer. Zu klein: Es reicht nicht für Straßen und Schule. Zu groß: Den Leuten bleiben zu wenige Münzen für Brot und Schuhe.",
      ),
    },
    {
      scene: "🗳️ 🐢 🏘️",
      text: T(
        "So the town decides together. People vote for the mayor and the council who choose the taxes. Now try the tax board yourself!",
        "Darum entscheidet die Stadt gemeinsam. Die Leute wählen den Bürgermeister und den Rat, die über die Steuern bestimmen. Probier jetzt die Steuer-Tafel selbst aus!",
      ),
    },
  ],
  toyIntro: T(
    "Be Mayor Moss for a day. Everyone earns 10 coins and needs 6 for bread and shoes. Slide the tax and watch what the pot can pay for.",
    "Sei einen Tag lang Bürgermeister Moss. Alle verdienen 10 Münzen und brauchen 6 für Brot und Schuhe. Schiebe die Steuer und schau, was der Topf bezahlen kann.",
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
    ],
  },
};
