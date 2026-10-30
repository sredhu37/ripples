import { useState } from "react";
import type { ReactElement } from "react";
import { CAST } from "../components/cast";
import { Arrow, Bubble, DiagramCanvas } from "../components/diagram";
import { Apple, Bread, Coin, Fish, NoSign, Person, Shoe } from "../components/icons";
import type { Mood } from "../components/icons";
import { ActionPrompt, Stage, ToyButton } from "../lesson/toolkit";
import type { Text } from "../lesson/types";
import type { Lang } from "../progress";

const T = (en: string, de: string): Text => ({ en, de });

type Who = "Bea" | "Sam";
type Phase = "barter" | "coins" | "sell" | "bread" | "done";
type Talk = { n: number; who: Who; kind: "no" | "coins" | "bread" } | null;

interface Board {
  phase: Phase;
  fish: boolean;
  coins: number;
  bread: boolean;
  say: Text;
  talk: Talk;
}

const START: Board = {
  phase: "barter",
  fish: true,
  coins: 0,
  bread: false,
  say: T("Finn has a fish. He wants bread.", "Finn hat einen Fisch. Er will Brot."),
  talk: null,
};

const FINN_X = 20;
const BEA_X = 255;
const SAM_X = 490;
const PERSON_Y = 64;
const PERSON = 110;
const ROW_Y = 208;

function Villager({ x, mood, hat, shirt, name }: { x: number; mood: Mood; hat: "fisher" | "baker" | "cap"; shirt: string; name: string }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <Person hat={hat} shirt={shirt} mood={mood} y={PERSON_Y} size={PERSON} />
      <text className="diagram-name" x={PERSON / 2} y={PERSON_Y + PERSON + 24} textAnchor="middle">
        {name}
      </text>
    </g>
  );
}

function HasWants({ x, has, wants, lang }: { x: number; has: ReactElement; wants: ReactElement; lang: Lang }) {
  return (
    <g transform={`translate(${x + 2} 0)`}>
      <g transform={`translate(0 ${ROW_Y})`}>{has}</g>
      <Arrow from={[52, ROW_Y + 20]} to={[84, ROW_Y + 20]} width={4} head={11} />
      <g transform={`translate(90 ${ROW_Y})`}>{wants}</g>
      <text className="diagram-small" x="20" y={ROW_Y + 58} textAnchor="middle">
        {lang === "en" ? "has" : "hat"}
      </text>
      <text className="diagram-small" x="110" y={ROW_Y + 58} textAnchor="middle">
        {lang === "en" ? "wants" : "will"}
      </text>
    </g>
  );
}

function nextAction(phase: Phase): Text | null {
  if (phase === "barter") return T("Try giving Finn's fish to Bea. Can she give him bread?", "Gib Finns Fisch Bea. Kann sie ihm Brot geben?");
  if (phase === "coins") return T("Barter did not work. Bring coins to Ripple Town.", "Tauschhandel hat nicht geklappt. Bring Münzen nach Ripple Town.");
  if (phase === "sell") return T("Now Sam can buy Finn's fish with coins.", "Jetzt kann Sam Finns Fisch mit Münzen kaufen.");
  if (phase === "bread") return T("Finn has two coins. Bea can now sell him bread.", "Finn hat zwei Münzen. Bea kann ihm jetzt Brot verkaufen.");
  return null;
}

function ActionButton({ phase, lang, onClick }: { phase: Exclude<Phase, "done">; lang: Lang; onClick: () => void }) {
  const label =
    phase === "barter"
      ? T("Give fish to Bea", "Fisch Bea geben")
      : phase === "coins"
        ? T("Bring coins to town", "Münzen in die Stadt bringen")
        : phase === "sell"
          ? T("Sell fish to Sam", "Fisch an Sam verkaufen")
          : T("Buy bread from Bea", "Brot bei Bea kaufen");
  return <ToyButton onClick={onClick}>{label[lang]}</ToyButton>;
}

/** Finn gets bread in one guided action at a time. */
export function TradeBoard({ lang, onBread, mode = "toy" }: { lang: Lang; onBread?: () => void; mode?: "toy" | "quiz" }) {
  const [b, setB] = useState<Board>(START);
  const prompt = nextAction(b.phase);

  const advance = () => {
    const n = (b.talk?.n ?? 0) + 1;
    if (b.phase === "barter") {
      setB({
        ...b,
        phase: "coins",
        talk: { n, who: "Bea", kind: "no" },
        say: T("Bea needs shoes, not fish. Finn cannot get bread by swapping today.", "Bea braucht Schuhe, keinen Fisch. Finn bekommt heute durch Tauschen kein Brot."),
      });
      return;
    }
    if (b.phase === "coins") {
      setB({
        ...b,
        phase: "sell",
        say: T("Coins are now available in Ripple Town.", "Jetzt gibt es Münzen in Ripple Town."),
      });
      return;
    }
    if (b.phase === "sell") {
      setB({
        ...b,
        phase: "bread",
        fish: false,
        coins: 2,
        talk: { n, who: "Sam", kind: "coins" },
        say: T("Sam buys the fish. Finn gets 2 coins.", "Sam kauft den Fisch. Finn bekommt 2 Münzen."),
      });
      return;
    }
    if (b.phase === "bread") {
      setB({
        ...b,
        phase: "done",
        coins: 0,
        bread: true,
        talk: { n, who: "Bea", kind: "bread" },
        say: T("Bea takes the 2 coins and gives Finn bread. He did it!", "Bea nimmt die 2 Münzen und gibt Finn Brot. Geschafft!"),
      });
      onBread?.();
    }
  };

  const finnMood: Mood = b.bread ? "happy" : b.phase === "coins" ? "sad" : b.coins > 0 ? "happy" : "think";
  const held: ReactElement[] = [];
  if (b.fish) held.push(<Fish key="fish" size={44} />);
  for (let i = 0; i < b.coins; i++) held.push(<Coin key={`c${i}`} size={44} />);
  if (b.bread) held.push(<Bread key="bread" size={44} />);
  const talkX = b.talk ? (b.talk.who === "Bea" ? BEA_X : SAM_X) + 27 : 0;

  return (
    <Stage label={lang === "en" ? "Finn, Bea and Sam" : "Finn, Bea und Sam"}>
      <div className="trade">
        <DiagramCanvas
          label={
            lang === "en"
              ? "Finn has a fish. Bea has bread and wants shoes. Sam has shoes and wants apples."
              : "Finn hat einen Fisch. Bea hat Brot und will Schuhe. Sam hat Schuhe und will Äpfel."
          }
        >
          <Villager x={FINN_X} mood={finnMood} {...CAST.Finn} name="Finn" />
          <Villager x={BEA_X} mood="happy" {...CAST.Bea} name="Bea" />
          <Villager x={SAM_X} mood="happy" {...CAST.Sam} name="Sam" />
          {held.map((icon, i) => (
            <g key={i} transform={`translate(${FINN_X + 2 + i * 50} ${ROW_Y})`}>
              {icon}
            </g>
          ))}
          <HasWants x={BEA_X} lang={lang} has={<Bread size={40} />} wants={<Shoe size={40} />} />
          <HasWants x={SAM_X} lang={lang} has={<Shoe size={40} />} wants={<Apple size={40} />} />
          {b.talk && (
            <Bubble key={b.talk.n} x={talkX} y={2} w={118} h={54} tail="bottom-left">
              {b.talk.kind === "no" && (
                <>
                  <Fish x={10} y={7} size={40} />
                  <NoSign x={10} y={7} size={40} />
                  <Shoe x={62} y={6} size={42} />
                </>
              )}
              {b.talk.kind === "coins" && (
                <>
                  <Coin x={16} y={7} size={40} />
                  <Coin x={60} y={7} size={40} />
                </>
              )}
              {b.talk.kind === "bread" && <Bread x={36} y={5} size={44} />}
            </Bubble>
          )}
        </DiagramCanvas>
        <p className="trade-say" role="status">
          {b.say[lang]}
        </p>
        {b.phase !== "done" && prompt ? (
          <div className="guided-action">
            <ActionPrompt lang={lang}>{prompt[lang]}</ActionPrompt>
            <ActionButton phase={b.phase} lang={lang} onClick={advance} />
          </div>
        ) : (
          <div className="guided-done">
            <span>{mode === "toy" ? (lang === "en" ? "Finn has bread." : "Finn hat Brot.") : lang === "en" ? "Finn has bread. Now press Next." : "Finn hat Brot. Drücke jetzt Weiter."}</span>
            {mode === "toy" && <button type="button" className="restart-link" onClick={() => setB(START)}>{lang === "en" ? "Try again" : "Noch einmal"}</button>}
          </div>
        )}
      </div>
    </Stage>
  );
}
