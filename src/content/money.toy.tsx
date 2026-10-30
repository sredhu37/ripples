import { useState } from "react";
import type { ReactElement } from "react";
import { CAST } from "../components/cast";
import { Arrow, Bubble, DiagramCanvas } from "../components/diagram";
import { Apple, Bread, Coin, Fish, InlineIcon, NoSign, Person, Shoe } from "../components/icons";
import type { Mood } from "../components/icons";
import { Stage, ToyButton } from "../lesson/toolkit";
import type { Text } from "../lesson/types";
import type { Lang } from "../progress";

const T = (en: string, de: string): Text => ({ en, de });

type Who = "Bea" | "Sam";
type Talk = { n: number; who: Who; kind: "no" | "coins" | "bread" } | null;

interface Board {
  coinsOn: boolean;
  fish: boolean;
  coins: number;
  bread: boolean;
  say: Text;
  talk: Talk;
}

const START: Board = {
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

/** Finn tries to get bread. Without coins nobody wants his fish. With coins it works. */
export function TradeBoard({ lang, onBread }: { lang: Lang; onBread?: () => void }) {
  const [b, setB] = useState<Board>(START);

  const offer = (who: Who) => {
    const n = (b.talk?.n ?? 0) + 1;
    if (!b.coinsOn) {
      setB({
        ...b,
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

        <p className="trade-say" role="status">
          {b.say[lang]}
        </p>

        <div className="row wrap">
          <ToyButton pressed={b.coinsOn} onClick={() => setB({ ...b, coinsOn: !b.coinsOn })}>
            <span className="btn-icons">
              <InlineIcon size={30}>
                <Coin />
              </InlineIcon>
              {lang === "en" ? (b.coinsOn ? "Coins: ON" : "Coins: OFF") : b.coinsOn ? "Münzen: AN" : "Münzen: AUS"}
            </span>
          </ToyButton>
          <ToyButton disabled={!b.fish} onClick={() => offer("Bea")}>
            <span className="btn-icons">
              <InlineIcon size={30}>
                <Fish />
              </InlineIcon>
              <span aria-hidden="true">→</span>
              <InlineIcon size={30}>
                <Person {...CAST.Bea} />
              </InlineIcon>
              <span className="sr-only">{lang === "en" ? "Offer fish to Bea" : "Fisch Bea anbieten"}</span>
            </span>
          </ToyButton>
          <ToyButton disabled={!b.fish} onClick={() => offer("Sam")}>
            <span className="btn-icons">
              <InlineIcon size={30}>
                <Fish />
              </InlineIcon>
              <span aria-hidden="true">→</span>
              <InlineIcon size={30}>
                <Person {...CAST.Sam} />
              </InlineIcon>
              <span className="sr-only">{lang === "en" ? "Offer fish to Sam" : "Fisch Sam anbieten"}</span>
            </span>
          </ToyButton>
          <ToyButton disabled={!b.coinsOn || b.coins < 2 || b.bread} onClick={buy}>
            <span className="btn-icons">
              <InlineIcon size={30}>
                <Coin />
              </InlineIcon>
              <InlineIcon size={30}>
                <Coin />
              </InlineIcon>
              <span aria-hidden="true">→</span>
              <InlineIcon size={30}>
                <Bread />
              </InlineIcon>
              <span className="sr-only">{lang === "en" ? "Buy bread with 2 coins" : "Brot mit 2 Münzen kaufen"}</span>
            </span>
          </ToyButton>
          <ToyButton onClick={() => setB(START)}>
            <span className="sr-only">{lang === "en" ? "Start again" : "Von vorn"}</span>
            <span aria-hidden="true">↺</span>
          </ToyButton>
        </div>
      </div>
    </Stage>
  );
}
