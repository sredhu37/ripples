import type { ReactNode } from "react";
import { Arrow, Bubble, DiagramCanvas, Pop, TermChip } from "../components/diagram";
import { Apple, Bread, Clock, Coin, Fish, Magnifier, NoSign, Person, Piggy, Shoe, Swap, Tag } from "../components/icons";
import type { Mood } from "../components/icons";
import type { DiagramProps } from "../lesson/types";

/** Animated diagrams for the Money lesson, one per story beat. `step` is how many taps so far. */

const FINN = "#2f7fb8";
const BEA = "#e68aa0";
const SAM = "#5aa05f";

type Who = "Finn" | "Bea" | "Sam";

const LOOK: Record<Who, { hat: "fisher" | "baker" | "cap"; shirt: string }> = {
  Finn: { hat: "fisher", shirt: FINN },
  Bea: { hat: "baker", shirt: BEA },
  Sam: { hat: "cap", shirt: SAM },
};

/** A villager with a name under them. */
function Villager({
  who,
  x,
  y = 90,
  size = 130,
  mood = "happy",
}: {
  who: Who;
  x: number;
  y?: number;
  size?: number;
  mood?: Mood;
}) {
  return (
    <Pop x={x} y={y}>
      <Person {...LOOK[who]} mood={mood} size={size} />
      <text className="diagram-name" x={size / 2} y={size + 30} textAnchor="middle">
        {who}
      </text>
    </Pop>
  );
}

/** A plank with goods on it, in front of Bea or Sam. */
function Counter({ x, goods }: { x: number; goods: ReactNode }) {
  return (
    <Pop x={x} y={0}>
      <rect x="0" y="214" width="190" height="16" rx="8" fill="#a86f3c" />
      {goods}
    </Pop>
  );
}

const alt = (en: string, de: string, lang: DiagramProps["lang"]) => (lang === "en" ? en : de);

/** Beat 1: meet Finn, his fish, Bea and her bread. */
export function MeetDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas label={alt("Finn has three fish and wants bread. Bea the baker has bread.", "Finn hat drei Fische und will Brot. Bäckerin Bea hat Brot.", lang)}>
      {step >= 1 && <Villager who="Finn" x={20} />}
      {step >= 2 && (
        <Pop>
          <path d="M120 176 L205 44" stroke="#8a5a36" strokeWidth="6" strokeLinecap="round" />
          <path d="M205 44 L214 190" stroke="#23383f" strokeWidth="2.5" fill="none" />
          <Fish x={186} y={178} size={64} />
        </Pop>
      )}
      {step >= 3 && (
        <>
          <Pop><Fish x={256} y={178} size={64} /></Pop>
          <Pop><Fish x={326} y={178} size={64} /></Pop>
        </>
      )}
      {step >= 4 && (
        <Bubble x={44} y={8} w={112} h={66} thought tail="bottom-left">
          <Bread x={28} y={6} size={58} />
        </Bubble>
      )}
      {step >= 5 && (
        <>
          <Villager who="Bea" x={490} />
          <Counter
            x={440}
            goods={[0, 1, 2, 3].map((i) => (
              <Bread key={i} x={8 + i * 46} y={164} size={54} />
            ))}
          />
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 2: Finn wants to swap fish for bread. This is barter. Bea says no. */
export function BarterDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas label={alt("Finn offers a fish for bread. This is called barter. Bea wants shoes.", "Finn bietet einen Fisch für Brot an. Das heißt Tauschhandel. Bea will Schuhe.", lang)}>
      <Villager who="Finn" x={20} mood={step >= 3 ? "sad" : "happy"} />
      <Villager who="Bea" x={490} />
      {step >= 1 && (
        <>
          <Pop><Fish x={178} y={40} size={62} /></Pop>
          <Arrow from={[170, 112]} to={[420, 112]} />
          <Pop><Bread x={410} y={150} size={62} /></Pop>
          <Arrow from={[400, 200]} to={[160, 200]} />
        </>
      )}
      {step >= 2 && <TermChip x={200} y={222} w={240}>{alt("barter", "Tauschhandel", lang)}</TermChip>}
      {step >= 3 && (
        <Bubble x={380} y={8} w={200} h={72} tail="bottom-right">
          <Fish x={22} y={12} size={56} />
          <NoSign x={22} y={12} size={56} />
          <Shoe x={108} y={10} size={62} />
        </Bubble>
      )}
    </DiagramCanvas>
  );
}

/** Beat 3: nobody wants fish, so Finn has to search. */
export function SearchDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas label={alt("Sam has shoes but wants apples, not fish. Finn could search all day.", "Sam hat Schuhe, will aber Äpfel und keinen Fisch. Finn könnte den ganzen Tag suchen.", lang)}>
      <Villager who="Finn" x={20} mood={step >= 3 ? "sad" : "think"} />
      <Pop><Fish x={150} y={170} size={60} /></Pop>
      {step === 1 && (
        <Bubble x={44} y={8} w={150} h={66} thought tail="bottom-left">
          <Shoe x={14} y={6} size={58} />
          <Magnifier x={76} y={4} size={60} />
        </Bubble>
      )}
      {step >= 2 && (
        <>
          <Villager who="Sam" x={490} />
          <Counter
            x={440}
            goods={[0, 1, 2].map((i) => (
              <Shoe key={i} x={14 + i * 58} y={166} size={56} />
            ))}
          />
        </>
      )}
      {step >= 3 && (
        <Bubble x={380} y={8} w={200} h={72} tail="bottom-right">
          <Fish x={22} y={12} size={56} />
          <NoSign x={22} y={12} size={56} />
          <Apple x={116} y={12} size={56} />
        </Bubble>
      )}
      {step >= 4 && (
        <Pop>
          <Clock x={262} y={96} size={96} />
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 4: people invented money. */
export function MoneyDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas label={alt("Money is something everybody accepts. In Ripple Town it is coins.", "Geld nimmt jeder an. In Ripple Town sind es Münzen.", lang)}>
      {step >= 1 && (
        <>
          <TermChip x={200} y={4} w={240}>{alt("money", "Geld", lang)}</TermChip>
          {[0, 1, 2].map((i) => (
            <Pop key={i}><Coin x={196 + i * 82} y={60} size={76} /></Pop>
          ))}
        </>
      )}
      {step >= 2 && (
        <>
          <Villager who="Finn" x={20} y={140} size={100} />
          <Villager who="Sam" x={270} y={140} size={100} />
          <Villager who="Bea" x={520} y={140} size={100} />
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 5: sell the fish for coins, buy the bread with the coins. */
export function SwapWithCoinsDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas label={alt("Finn sells a fish to Sam for 2 coins, then buys bread from Bea.", "Finn verkauft Sam einen Fisch für 2 Münzen und kauft dann bei Bea Brot.", lang)}>
      <Villager who="Finn" x={20} />
      {step === 1 && (
        <>
          <Villager who="Sam" x={490} />
          <Pop><Fish x={290} y={26} size={58} /></Pop>
          <Arrow from={[165, 104]} to={[470, 104]} />
          <Pop><Coin x={262} y={132} size={46} /></Pop>
          <Pop><Coin x={320} y={132} size={46} /></Pop>
          <Arrow from={[470, 200]} to={[165, 200]} />
        </>
      )}
      {step >= 2 && (
        <>
          <Villager who="Bea" x={490} />
          <Counter x={440} goods={[0, 1, 2, 3].map((i) => <Bread key={i} x={8 + i * 46} y={164} size={54} />)} />
        </>
      )}
      {step === 2 && (
        <>
          <Pop><Coin x={46} y={34} size={42} /></Pop>
          <Pop><Coin x={92} y={34} size={42} /></Pop>
          <Arrow from={[170, 150]} to={[420, 150]} />
        </>
      )}
      {step >= 3 && (
        <>
          <Pop><Coin x={262} y={30} size={46} /></Pop>
          <Pop><Coin x={320} y={30} size={46} /></Pop>
          <Arrow from={[165, 104]} to={[430, 104]} />
          <Pop><Bread x={290} y={134} size={58} /></Pop>
          <Pop><Bread x={146} y={172} size={58} /></Pop>
          <Arrow from={[430, 200]} to={[165, 200]} />
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: three jobs of money. */
export function JobsDiagram({ lang, step }: DiagramProps) {
  const badge = (x: number, n: number) => (
    <Pop x={x} y={14}>
      <circle cx="0" cy="22" r="22" fill="#1b8a9a" />
      <text x="0" y="31" textAnchor="middle" className="chip-text">{n}</text>
    </Pop>
  );
  return (
    <DiagramCanvas label={alt("Money does three jobs: helps us swap, shows the price, lets us save.", "Geld hat drei Aufgaben: Tauschen helfen, den Preis zeigen, Sparen möglich machen.", lang)}>
      {step >= 1 && (
        <>
          {badge(107, 1)}
          <Pop><Fish x={85} y={72} size={44} /></Pop>
          <Pop><Swap x={90} y={118} size={34} rotate /></Pop>
          <Pop><Coin x={85} y={150} size={44} /></Pop>
          <Pop><Swap x={90} y={196} size={34} rotate /></Pop>
          <Pop><Bread x={85} y={228} size={44} /></Pop>
        </>
      )}
      {step >= 2 && (
        <>
          {badge(320, 2)}
          <Pop x={265} y={80}>
            <Tag size={110}>
              <Bread x={40} y={30} size={46} />
            </Tag>
          </Pop>
          <Pop><Coin x={276} y={200} size={44} /></Pop>
          <Pop><Coin x={326} y={200} size={44} /></Pop>
        </>
      )}
      {step >= 3 && (
        <>
          {badge(533, 3)}
          <Pop><Piggy x={473} y={116} size={120} /></Pop>
          <Pop><Coin x={508} y={70} size={44} /></Pop>
        </>
      )}
    </DiagramCanvas>
  );
}
