import { useState } from "react";
import type { ReactElement } from "react";
import { CAST } from "../components/cast";
import { Arrow, Bubble, DiagramCanvas } from "../components/diagram";
import { Apple, Bread, Coin, Fish, InlineIcon, NoSign, Person, Shoe } from "../components/icons";
import type { Mood } from "../components/icons";
import { Stage, ToyButton } from "../lesson/toolkit";
import { sfx } from "../sound";
import type { Text } from "../lesson/types";
import type { Lang } from "../progress";

const T = (en: string, de: string): Text => ({ en, de });

type Who = "Bea" | "Sam";
type Talk = { n: number; who: Who; kind: "no" | "coins" | "bread" } | null;

interface Board {
  /** true once somebody refused the fish: the child has seen why barter fails */
  refused: boolean;
  coinsOn: boolean;
  fish: boolean;
  coins: number;
  bread: boolean;
  say: Text;
  talk: Talk;
}

const START: Board = {
  refused: false,
  coinsOn: false,
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

/** Same cast, colours and icons as the story diagrams. */
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

/** "has" thing, arrow, "wants" thing, under a villager. */
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

type GuideId = "offer" | "coins" | "sell" | "bread";

/** The numbered "what to do" list. Done steps get a tick, the next one is highlighted. */
function Guide({ lang, steps }: { lang: Lang; steps: { id: GuideId; done: boolean; now: boolean; text: Text }[] }) {
  return (
    <ol className="guide" aria-label={lang === "en" ? "What to do" : "Was zu tun ist"}>
      {steps.map((st, i) => (
        <li key={st.id} className={st.done ? "guide-step done" : st.now ? "guide-step now" : "guide-step"}>
          <span className="guide-num" aria-hidden="true">
            {st.done ? (
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M5 12.5 L10 17.5 L19 7" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              i + 1
            )}
          </span>
          {st.text[lang]}
          <span className="sr-only">{st.done ? (lang === "en" ? " (done)" : " (erledigt)") : ""}</span>
        </li>
      ))}
    </ol>
  );
}

/** A real on/off switch. The word says what it controls, the switch shows the state. */
function CoinSwitch({ lang, on, hint, onClick }: { lang: Lang; on: boolean; hint: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={`btn btn-toy coin-switch${on ? " is-on" : ""}${hint ? " btn-hint" : ""}`}
      onClick={() => {
        sfx.tap();
        onClick();
      }}
    >
      <span className="btn-icons">
        <InlineIcon size={30}>
          <Coin />
        </InlineIcon>
        {lang === "en" ? "Coins" : "Münzen"}
        <span className="switch-track" aria-hidden="true">
          <span className="switch-knob" />
          <span className="switch-word">{on ? (lang === "en" ? "ON" : "AN") : lang === "en" ? "OFF" : "AUS"}</span>
        </span>
      </span>
    </button>
  );
}

/** Finn tries to get bread. Without coins nobody wants his fish. With coins it works. */
export function TradeBoard({ lang, onBread, mode = "toy" }: { lang: Lang; onBread?: () => void; mode?: "toy" | "quiz" }) {
  const [b, setB] = useState<Board>(START);

  const offer = (who: Who) => {
    const n = (b.talk?.n ?? 0) + 1;
    if (!b.coinsOn) {
      setB({
        ...b,
        refused: true,
        talk: { n, who, kind: "no" },
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
      talk: { n, who, kind: "coins" },
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
      talk: { n: (b.talk?.n ?? 0) + 1, who: "Bea", kind: "bread" },
      say: T("Bea: Thank you for 2 coins! Here is your bread.", "Bea: Danke für 2 Münzen! Hier ist dein Brot."),
    });
    onBread?.();
  };

  const finnMood: Mood = b.bread ? "happy" : b.talk?.kind === "no" ? "sad" : b.coins > 0 ? "happy" : "think";

  // what Finn holds, left to right
  const held: ReactElement[] = [];
  if (b.fish) held.push(<Fish key="fish" size={44} />);
  for (let i = 0; i < b.coins; i++) held.push(<Coin key={`c${i}`} size={44} />);
  if (b.bread) held.push(<Bread key="bread" size={44} />);

  // The guide: what to do, in order. The first undone step is the one to do now.
  const all: { id: GuideId; done: boolean; text: Text }[] = [
    ...(mode === "toy"
      ? [{ id: "offer" as const, done: b.refused || !b.fish, text: T("Offer the fish", "Fisch anbieten") }]
      : []),
    { id: "coins", done: b.coinsOn || !b.fish, text: T("Turn coins on", "Münzen anschalten") },
    { id: "sell", done: !b.fish, text: T("Sell the fish", "Fisch verkaufen") },
    { id: "bread", done: b.bread, text: T("Buy bread", "Brot kaufen") },
  ];
  const now = all.find((st) => !st.done)?.id;
  const steps = all.map((st) => ({ ...st, now: st.id === now }));

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

          {/* what Finn holds */}
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
                  {b.talk.who === "Bea" ? <Shoe x={62} y={6} size={42} /> : <Apple x={62} y={6} size={42} />}
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

        <Guide lang={lang} steps={steps} />

        <p className="trade-say" role="status">
          {b.say[lang]}
        </p>

        <div className="row wrap">
          <CoinSwitch lang={lang} on={b.coinsOn} hint={now === "coins"} onClick={() => setB({ ...b, coinsOn: !b.coinsOn })} />
          <ToyButton disabled={!b.fish} hint={now === "offer" || now === "sell"} onClick={() => offer("Bea")}>
            <span className="btn-icons">
              <InlineIcon size={30}>
                <Fish />
              </InlineIcon>
              <span aria-hidden="true">→</span>
              <InlineIcon size={30}>
                <Person {...CAST.Bea} />
              </InlineIcon>
              {lang === "en" ? "Fish to Bea" : "Fisch an Bea"}
            </span>
          </ToyButton>
          <ToyButton disabled={!b.fish} hint={now === "offer" || now === "sell"} onClick={() => offer("Sam")}>
            <span className="btn-icons">
              <InlineIcon size={30}>
                <Fish />
              </InlineIcon>
              <span aria-hidden="true">→</span>
              <InlineIcon size={30}>
                <Person {...CAST.Sam} />
              </InlineIcon>
              {lang === "en" ? "Fish to Sam" : "Fisch an Sam"}
            </span>
          </ToyButton>
          <ToyButton disabled={!b.coinsOn || b.coins < 2 || b.bread} hint={now === "bread"} onClick={buy}>
            <span className="btn-icons">
              <InlineIcon size={30}>
                <Coin />
              </InlineIcon>
              <span aria-hidden="true">→</span>
              <InlineIcon size={30}>
                <Bread />
              </InlineIcon>
              {lang === "en" ? "Buy bread" : "Brot kaufen"}
            </span>
          </ToyButton>
          <ToyButton onClick={() => setB(START)}>
            <span className="btn-icons">
              <span aria-hidden="true">↺</span>
              {lang === "en" ? "Start again" : "Von vorn"}
            </span>
          </ToyButton>
        </div>
      </div>
    </Stage>
  );
}
