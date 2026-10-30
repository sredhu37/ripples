import { useState, useRef } from "react";
import type { ReactElement } from "react";
import { CAST } from "../components/cast";
import { Arrow, Bubble, DiagramCanvas } from "../components/diagram";
import { Apple, Bread, Coin, Fish, NoSign, Person, Shoe } from "../components/icons";
import type { Mood } from "../components/icons";
import { ActionPrompt, Stage, ToyButton } from "../lesson/toolkit";
import type { Text } from "../lesson/types";
import type { Lang } from "../progress";
import { sfx } from "../sound";

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

// Triangle Coordinates (viewBox 640 x 280)
// Finn: bottom-left
const FINN_X = 50;
const FINN_Y = 125;

// Bea: top-center
const BEA_X = 275;
const BEA_Y = 12;

// Sam: bottom-right
const SAM_X = 495;
const SAM_Y = 125;

const PERSON = 92;

function Villager({
  x,
  y,
  mood,
  hat,
  shirt,
  name,
  isTarget,
  targetLabel,
  onClick,
}: {
  x: number;
  y: number;
  mood: Mood;
  hat: "fisher" | "baker" | "cap";
  shirt: string;
  name: string;
  isTarget?: boolean;
  targetLabel?: string;
  onClick?: () => void;
}) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      className={isTarget ? "drop-target active-target" : "drop-target"}
      onClick={onClick}
      style={{ cursor: isTarget ? "pointer" : "default" }}
    >
      {isTarget && (
        <rect
          x={-8}
          y={-6}
          width={PERSON + 16}
          height={PERSON + 42}
          rx={16}
          className="target-glow"
        />
      )}
      <Person hat={hat} shirt={shirt} mood={mood} y={0} size={PERSON} />
      <text className="diagram-name" x={PERSON / 2} y={PERSON + 20} textAnchor="middle">
        {name}
      </text>
      {isTarget && targetLabel && (
        <text className="target-badge-text" x={PERSON / 2} y={PERSON + 34} textAnchor="middle">
          {targetLabel}
        </text>
      )}
    </g>
  );
}

function MiniHasWants({
  x,
  y,
  has,
  wants,
  lang,
}: {
  x: number;
  y: number;
  has: ReactElement;
  wants: ReactElement;
  lang: Lang;
}) {
  return (
    <g transform={`translate(${x} ${y})`} className="has-wants-tag">
      <rect x={0} y={0} width={92} height={52} rx={12} fill="#ffffff" stroke="#cbd5e1" strokeWidth={2} />
      <g transform="translate(6 6)">{has}</g>
      <Arrow from={[42, 22]} to={[54, 22]} width={2.5} head={6} />
      <g transform="translate(56 6)">{wants}</g>
      <text className="diagram-tiny" x={21} y={44} textAnchor="middle">
        {lang === "en" ? "has" : "hat"}
      </text>
      <text className="diagram-tiny" x={71} y={44} textAnchor="middle">
        {lang === "en" ? "wants" : "will"}
      </text>
    </g>
  );
}

function nextAction(phase: Phase): Text | null {
  if (phase === "barter") {
    return T(
      "Drag Finn's fish to Bea to offer a barter trade.",
      "Ziehe Finns Fisch zu Bea, um zu tauschen."
    );
  }
  if (phase === "coins") {
    return T(
      "Barter did not work! Bring coins to Ripple Town.",
      "Tauschhandel hat nicht geklappt! Bring Münzen nach Ripple Town."
    );
  }
  if (phase === "sell") {
    return T(
      "Drag Finn's fish to Sam to sell it for coins.",
      "Ziehe Finns Fisch zu Sam, um ihn für Münzen zu verkaufen."
    );
  }
  if (phase === "bread") {
    return T(
      "Drag Finn's coins to Bea to buy fresh bread.",
      "Ziehe Finns Münzen zu Bea, um Brot zu kaufen."
    );
  }
  return null;
}

/** Interactive drag-and-drop triangle trade toy where kids experience circular exchange. */
export function TradeBoard({
  lang,
  onBread,
  mode = "toy",
}: {
  lang: Lang;
  onBread?: () => void;
  mode?: "toy" | "quiz";
}) {
  const [b, setB] = useState<Board>(START);
  const [dragging, setDragging] = useState<"fish" | "coins" | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const prompt = nextAction(b.phase);

  const doBarterBea = () => {
    sfx.hint();
    const n = (b.talk?.n ?? 0) + 1;
    setB({
      ...b,
      phase: "coins",
      talk: { n, who: "Bea", kind: "no" },
      say: T(
        "Bea needs shoes, not fish. Finn cannot get bread by swapping today.",
        "Bea braucht Schuhe, keinen Fisch. Finn bekommt heute durch Tauschen kein Brot."
      ),
    });
  };

  const doBringCoins = () => {
    sfx.pop();
    setB({
      ...b,
      phase: "sell",
      say: T(
        "Coins are now in Ripple Town! Sam wants to buy fish with his coins.",
        "Münzen sind jetzt in Ripple Town! Sam möchte Fisch mit seinen Münzen kaufen."
      ),
    });
  };

  const doSellSam = () => {
    sfx.pop();
    const n = (b.talk?.n ?? 0) + 1;
    setB({
      ...b,
      phase: "bread",
      fish: false,
      coins: 2,
      talk: { n, who: "Sam", kind: "coins" },
      say: T(
        "Sam buys the fish! He gives Finn 2 shiny coins.",
        "Sam kauft den Fisch! Er gibt Finn 2 glänzende Münzen."
      ),
    });
  };

  const doBuyBea = () => {
    sfx.badge();
    const n = (b.talk?.n ?? 0) + 1;
    setB({
      ...b,
      phase: "done",
      coins: 0,
      bread: true,
      talk: { n, who: "Bea", kind: "bread" },
      say: T(
        "Bea takes the 2 coins and gives Finn bread. He did it!",
        "Bea nimmt die 2 Münzen und gibt Finn Brot. Geschafft!"
      ),
    });
    onBread?.();
  };

  const handlePointerDown = (item: "fish" | "coins", e: React.PointerEvent) => {
    if (b.phase === "coins" || b.phase === "done") return;
    if (item === "fish" && (b.phase !== "barter" && b.phase !== "sell")) return;
    if (item === "coins" && b.phase !== "bread") return;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(item);
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    const currentItem = dragging;
    setDragging(null);
    setDragPos(null);

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * 640;
    const relY = ((e.clientY - rect.top) / rect.height) * 280;

    // Hit tests for Bea (top-center) and Sam (bottom-right)
    const hitBea = relX >= BEA_X - 25 && relX <= BEA_X + PERSON + 25 && relY >= BEA_Y - 20 && relY <= BEA_Y + PERSON + 50;
    const hitSam = relX >= SAM_X - 25 && relX <= SAM_X + PERSON + 25 && relY >= SAM_Y - 20 && relY <= SAM_Y + PERSON + 50;

    if (currentItem === "fish") {
      if (b.phase === "barter" && hitBea) {
        doBarterBea();
      } else if (b.phase === "sell" && hitSam) {
        doSellSam();
      } else if (b.phase === "barter" && hitSam) {
        sfx.hint();
        const n = (b.talk?.n ?? 0) + 1;
        setB({
          ...b,
          talk: { n, who: "Sam", kind: "no" },
          say: T(
            "Sam wants apples. He cannot trade shoes for fish without coins.",
            "Sam will Äpfel. Er kann ohne Münzen keine Schuhe gegen Fisch tauschen."
          ),
        });
      }
    } else if (currentItem === "coins") {
      if (b.phase === "bread" && hitBea) {
        doBuyBea();
      }
    }
  };

  const finnMood: Mood = b.bread ? "happy" : b.phase === "coins" ? "sad" : b.coins > 0 ? "happy" : "think";
  const targetBea = (b.phase === "barter" && b.fish) || (b.phase === "bread" && b.coins > 0);
  const targetSam = b.phase === "sell" && b.fish;

  return (
    <Stage label={lang === "en" ? "Finn, Bea and Sam in Ripple Town" : "Finn, Bea und Sam in Ripple Town"}>
      <div
        className="trade trade-interactive"
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          setDragging(null);
          setDragPos(null);
        }}
      >
        <DiagramCanvas
          label={
            lang === "en"
              ? "Finn at bottom left has fish. Bea at top center has bread and wants shoes. Sam at bottom right has shoes and wants apples."
              : "Finn unten links hat Fisch. Bea oben in der Mitte hat Brot und will Schuhe. Sam unten rechts hat Schuhe und will Äpfel."
          }
        >
          {/* Subtle triangle guide path in background */}
          <polygon
            points={`${FINN_X + PERSON / 2},${FINN_Y + PERSON / 2} ${BEA_X + PERSON / 2},${BEA_Y + PERSON / 2} ${SAM_X + PERSON / 2},${SAM_Y + PERSON / 2}`}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={3}
            strokeDasharray="6 6"
          />

          {/* Three Villagers in Triangle Form */}
          <Villager x={FINN_X} y={FINN_Y} mood={finnMood} {...CAST.Finn} name="Finn" />

          <Villager
            x={BEA_X}
            y={BEA_Y}
            mood="happy"
            {...CAST.Bea}
            name="Bea"
            isTarget={targetBea}
            targetLabel={lang === "en" ? "Drop here" : "Hier ablegen"}
          />

          <Villager
            x={SAM_X}
            y={SAM_Y}
            mood="happy"
            {...CAST.Sam}
            name="Sam"
            isTarget={targetSam}
            targetLabel={lang === "en" ? "Drop here" : "Hier ablegen"}
          />

          {/* Has / Wants Cards for Bea and Sam */}
          <MiniHasWants
            x={BEA_X + PERSON + 14}
            y={BEA_Y + 12}
            lang={lang}
            has={<Bread size={32} />}
            wants={<Shoe size={32} />}
          />

          <MiniHasWants
            x={SAM_X - 104}
            y={SAM_Y + 14}
            lang={lang}
            has={<Shoe size={32} />}
            wants={<Apple size={32} />}
          />

          {/* Finn's Inventory at Bottom-Left */}
          {b.fish && (
            <g
              transform={`translate(${FINN_X - 4} ${FINN_Y + PERSON + 26})`}
              className="draggable-source"
              onPointerDown={(e) => handlePointerDown("fish", e)}
              style={{ cursor: "grab" }}
            >
              <rect x={0} y={0} width={96} height={44} rx={12} className="drag-item-glow" />
              <g transform="translate(4 2)">
                <Fish size={38} />
              </g>
              <text className="diagram-tiny-bold" x={54} y={26} textAnchor="middle">
                {lang === "en" ? "Fish" : "Fisch"}
              </text>
            </g>
          )}

          {b.coins > 0 && (
            <g
              transform={`translate(${FINN_X - 4} ${FINN_Y + PERSON + 26})`}
              className="draggable-source"
              onPointerDown={(e) => handlePointerDown("coins", e)}
              style={{ cursor: "grab" }}
            >
              <rect x={0} y={0} width={100} height={44} rx={12} className="drag-item-glow" />
              <g transform="translate(6 3)">
                <Coin size={36} />
              </g>
              <g transform="translate(32 3)">
                <Coin size={36} />
              </g>
              <text className="diagram-tiny-bold" x={76} y={26} textAnchor="middle">
                2
              </text>
            </g>
          )}

          {b.bread && (
            <g transform={`translate(${FINN_X + 6} ${FINN_Y + PERSON + 26})`}>
              <rect x={0} y={0} width={80} height={44} rx={12} fill="#eef8ef" stroke="#38a169" strokeWidth={2} />
              <g transform="translate(4 3)">
                <Bread size={38} />
              </g>
              <text className="diagram-tiny-bold" x={52} y={26} textAnchor="middle">
                {lang === "en" ? "Bread" : "Brot"}
              </text>
            </g>
          )}

          {/* Villager Speech Bubbles */}
          {b.talk && (
            <Bubble
              key={b.talk.n}
              x={b.talk.who === "Bea" ? BEA_X - 110 : SAM_X - 30}
              y={b.talk.who === "Bea" ? BEA_Y + 10 : SAM_Y - 50}
              w={108}
              h={50}
              tail={b.talk.who === "Bea" ? "bottom-right" : "bottom-left"}
            >
              {b.talk.kind === "no" && (
                <>
                  <Fish x={8} y={6} size={36} />
                  <NoSign x={8} y={6} size={36} />
                  <Shoe x={56} y={5} size={38} />
                </>
              )}
              {b.talk.kind === "coins" && (
                <>
                  <Coin x={12} y={6} size={36} />
                  <Coin x={52} y={6} size={36} />
                </>
              )}
              {b.talk.kind === "bread" && <Bread x={32} y={5} size={38} />}
            </Bubble>
          )}
        </DiagramCanvas>

        {/* Floating preview while dragging */}
        {dragging && dragPos && (
          <div
            className="drag-floating-preview"
            style={{
              position: "fixed",
              left: dragPos.x - 28,
              top: dragPos.y - 28,
              pointerEvents: "none",
              zIndex: 9999,
            }}
          >
            {dragging === "fish" && <Fish size={56} />}
            {dragging === "coins" && <Coin size={56} />}
          </div>
        )}

        <p className="trade-say" role="status">
          {b.say[lang]}
        </p>

        {b.phase !== "done" && prompt ? (
          <div className="guided-action">
            <ActionPrompt lang={lang}>{prompt[lang]}</ActionPrompt>
            {b.phase === "coins" && (
              <ToyButton onClick={doBringCoins}>
                {lang === "en" ? "Bring coins to town" : "Münzen in die Stadt bringen"}
              </ToyButton>
            )}
          </div>
        ) : (
          <div className="guided-done">
            <span>
              {lang === "en" ? "Finn has bread!" : "Finn hat Brot!"}
            </span>
            {mode === "toy" && (
              <button
                type="button"
                className="restart-link"
                onClick={() => setB(START)}
              >
                {lang === "en" ? "Try again" : "Noch einmal"}
              </button>
            )}
          </div>
        )}
      </div>
    </Stage>
  );
}
