import { useState } from "react";
import { CheckButton, Stage, ToyButton } from "../lesson/toolkit";
import type { Lesson, Text, ToyProps, WidgetProps } from "../lesson/types";
import type { Lang } from "../progress";

const T = (en: string, de: string): Text => ({ en, de });

interface Board {
  coinsOn: boolean;
  fish: boolean;
  coins: number;
  bread: boolean;
  say: Text;
}

const START: Board = {
  coinsOn: false,
  fish: true,
  coins: 0,
  bread: false,
  say: T("Finn has a fish. He wants bread.", "Finn hat einen Fisch. Er will Brot."),
};

/** Finn tries to get bread. Without coins nobody wants his fish. With coins it works. */
function TradeBoard({ lang, onBread }: { lang: Lang; onBread?: () => void }) {
  const [b, setB] = useState<Board>(START);

  const offer = (who: "Bea" | "Sam") => {
    if (!b.coinsOn) {
      setB({
        ...b,
        say:
          who === "Bea"
            ? T("Bea: No thanks! I don't want fish. I need shoes.", "Bea: Nein danke! Ich will keinen Fisch. Ich brauche Schuhe.")
            : T("Sam: No thanks! I don't want fish. I want apples.", "Sam: Nein danke! Ich will keinen Fisch. Ich will Äpfel."),
      });
      return;
    }
    setB({
      ...b,
      fish: false,
      coins: b.coins + 2,
      say:
        who === "Bea"
          ? T("Bea: Fish! Here are 2 coins.", "Bea: Fisch! Hier sind 2 Münzen.")
          : T("Sam: Fish! Here are 2 coins.", "Sam: Fisch! Hier sind 2 Münzen."),
    });
  };

  const buy = () => {
    setB({
      ...b,
      coins: b.coins - 2,
      bread: true,
      say: T("Bea: Thank you for 2 coins! Here is your bread.", "Bea: Danke für 2 Münzen! Hier ist dein Brot."),
    });
    onBread?.();
  };

  return (
    <Stage label="Finn, Bea and Sam">
      <div className="trade">
        <div className="trade-row">
          <span className="trade-who">🧔 Finn</span>
          <span className="trade-things" aria-label="Finn has">
            {b.fish && "🐟"} {b.coins > 0 && "🪙".repeat(b.coins)} {b.bread && "🍞"}
            {!b.fish && b.coins === 0 && !b.bread && "-"}
          </span>
        </div>
        <div className="trade-row">
          <span className="trade-who">👩‍🍳 Bea</span>
          <span className="trade-things">
            {lang === "en" ? "has 🍞, wants 👟" : "hat 🍞, will 👟"}
          </span>
        </div>
        <div className="trade-row">
          <span className="trade-who">🧑 Sam</span>
          <span className="trade-things">
            {lang === "en" ? "has 👟, wants 🍎" : "hat 👟, will 🍎"}
          </span>
        </div>
        <p className="trade-say" role="status">
          {b.say[lang]}
        </p>
        <div className="row wrap">
          <ToyButton pressed={b.coinsOn} onClick={() => setB({ ...b, coinsOn: !b.coinsOn })}>
            🪙 {lang === "en" ? (b.coinsOn ? "Coins: ON" : "Coins: OFF") : b.coinsOn ? "Münzen: AN" : "Münzen: AUS"}
          </ToyButton>
          <ToyButton disabled={!b.fish} onClick={() => offer("Bea")}>
            🐟 → Bea
          </ToyButton>
          <ToyButton disabled={!b.fish} onClick={() => offer("Sam")}>
            🐟 → Sam
          </ToyButton>
          <ToyButton disabled={!b.coinsOn || b.coins < 2 || b.bread} onClick={buy}>
            🪙🪙 → 🍞
          </ToyButton>
          <ToyButton onClick={() => setB(START)}>↺</ToyButton>
        </div>
      </div>
    </Stage>
  );
}

function Toy({ lang }: ToyProps) {
  return <TradeBoard lang={lang} />;
}

function GetBreadWidget({ lang, onAnswer }: WidgetProps) {
  const [hasBread, setHasBread] = useState(false);
  return (
    <>
      <TradeBoard lang={lang} onBread={() => setHasBread(true)} />
      <div className="row nav">
        <CheckButton lang={lang} onClick={() => onAnswer(hasBread)} />
      </div>
    </>
  );
}

export const lesson: Lesson = {
  id: "money",
  story: [
    {
      scene: "🧔 🐟🐟🐟",
      text: T("This is Finn. Finn catches fish. Today he caught three!", "Das ist Finn. Finn fängt Fische. Heute hat er drei gefangen!"),
    },
    {
      scene: "😋 🍞 👩‍🍳",
      text: T(
        "Finn is hungry for bread. Bea the baker has lots of bread.",
        "Finn hat Hunger auf Brot. Bäckerin Bea hat jede Menge Brot.",
      ),
    },
    {
      scene: "🐟 ➡️ 👩‍🍳 🙅 👟",
      mood: "think",
      text: T(
        "Finn offers a fish. But Bea says: No thanks! I need new shoes.",
        "Finn bietet einen Fisch an. Aber Bea sagt: Nein danke! Ich brauche neue Schuhe.",
      ),
    },
    {
      scene: "🔍 👟 ❓ 🐟",
      mood: "think",
      text: T(
        "Now Finn must find someone with shoes who wants fish. That could take all day!",
        "Jetzt muss Finn jemanden finden, der Schuhe hat und Fisch will. Das kann den ganzen Tag dauern!",
      ),
    },
    {
      scene: "🐟 ➡️ 🪙🪙",
      text: T(
        "So people invented money. Everyone takes coins. Finn sells his fish for coins.",
        "Darum haben Menschen Geld erfunden. Alle nehmen Münzen. Finn verkauft seinen Fisch für Münzen.",
      ),
    },
    {
      scene: "🪙🪙 ➡️ 🍞",
      text: T(
        "Then Finn buys bread with the coins. Easy! Money helps us swap.",
        "Dann kauft Finn mit den Münzen Brot. Ganz leicht! Geld hilft uns beim Tauschen.",
      ),
    },
    {
      scene: "🏷️ 🍞 = 🪙🪙   🐷 🪙",
      text: T(
        "Money does two more jobs. It shows the price of things. And you can keep it for later.",
        "Geld kann noch mehr. Es zeigt, was etwas kostet. Und du kannst es für später aufheben.",
      ),
    },
  ],
  toyIntro: T(
    "Help Finn get bread! First try without coins. Then switch the coins on.",
    "Hilf Finn, Brot zu bekommen! Probier es zuerst ohne Münzen. Schalte dann die Münzen an.",
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
        "Get Finn his bread. Turn the coins on, sell the fish, then buy bread. Press Check when Finn has bread.",
        "Besorge Finn sein Brot. Schalte die Münzen an, verkaufe den Fisch und kaufe dann Brot. Drücke Prüfen, wenn Finn Brot hat.",
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
