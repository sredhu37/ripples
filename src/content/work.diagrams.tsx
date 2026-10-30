import { Villager } from "../components/cast";
import { Arrow, Bubble, DiagramCanvas, Pop, TermChip } from "../components/diagram";
import { Bread, Clock, Coin, Fish, Person, Piggy, Shoe } from "../components/icons";
import type { DiagramProps } from "../lesson/types";
import { ArrowIcon, Boat, Calendar, FIXER, GradCap } from "./work.icons";

/** Animated diagrams for the Work and pay lesson, one per story beat. `step` is how many taps so far. */

const alt = (en: string, de: string, lang: DiagramProps["lang"]) => (lang === "en" ? en : de);

/** Coins stacked downwards from (x, y). Each coin pops in. */
function CoinStack({ x, y, n, size = 38, gap = 36 }: { x: number; y: number; n: number; size?: number; gap?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <Pop key={i}>
          <Coin x={x} y={y + i * gap} size={size} />
        </Pop>
      ))}
    </>
  );
}

/** A small cluster of coins: rows of 3 then the rest, starting at (x, y). */
function CoinCluster({ x, y, n, size = 32 }: { x: number; y: number; n: number; size?: number }) {
  const step = size + 2;
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const row = Math.floor(i / 3);
        const inRow = Math.min(3, n - row * 3);
        const col = i % 3;
        const off = ((3 - inRow) * step) / 2;
        return (
          <Pop key={i}>
            <Coin x={x + off + col * step} y={y + row * step} size={size} />
          </Pop>
        );
      })}
    </>
  );
}

/** Beat 1: Finn, Bea and Sam each have a job. */
export function JobsDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Finn catches fish, Bea bakes bread, Sam makes shoes. The work a person does is called a job.",
        "Finn fängt Fische, Bea backt Brot, Sam macht Schuhe. Die Arbeit eines Menschen heißt Beruf.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Finn" x={20} />
          <Pop><Fish x={152} y={150} size={66} /></Pop>
        </>
      )}
      {step >= 2 && (
        <>
          <Villager who="Bea" x={230} />
          <Pop><Bread x={362} y={150} size={66} /></Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Villager who="Sam" x={440} />
          <Pop><Shoe x={572} y={150} size={62} /></Pop>
        </>
      )}
      {step >= 4 && <TermChip x={200} y={8} w={240}>{alt("job", "Beruf", lang)}</TermChip>}
    </DiagramCanvas>
  );
}

/** Beat 2: Pip pays Bea coins for bread. Those coins are pay. */
export function PayDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Pip gives Bea 3 coins and gets bread. The coins Bea earns for her work are called pay.",
        "Pip gibt Bea 3 Münzen und bekommt Brot. Die Münzen, die Bea für ihre Arbeit bekommt, heißen Lohn.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Bea" x={490} />
          <Pop x={440} y={0}>
            <rect x="0" y="214" width="190" height="16" rx="8" fill="#a86f3c" />
            {[0, 1, 2, 3].map((i) => (
              <Bread key={i} x={8 + i * 46} y={164} size={54} />
            ))}
          </Pop>
        </>
      )}
      {step >= 2 && (
        <>
          <Villager who="Pip" x={20} />
          <Pop><Coin x={228} y={64} size={44} /></Pop>
          <Pop><Coin x={290} y={64} size={44} /></Pop>
          <Pop><Coin x={352} y={64} size={44} /></Pop>
          <Arrow from={[170, 128]} to={[420, 128]} />
        </>
      )}
      {step >= 3 && <TermChip x={200} y={4} w={240}>{alt("pay", "Lohn", lang)}</TermChip>}
      {step >= 4 && (
        <>
          <Pop><Bread x={290} y={156} size={58} /></Pop>
          <Arrow from={[430, 214]} to={[165, 214]} />
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 3: Bea gets 3 coins per hour and works 4 hours: 12 coins. */
export function HoursDiagram({ lang, step }: DiagramProps) {
  const cx = (i: number) => 190 + i * 85;
  return (
    <DiagramCanvas
      label={alt(
        "Bea works 4 hours and gets 3 coins for each hour. That makes 12 coins.",
        "Bea arbeitet 4 Stunden und bekommt 3 Münzen pro Stunde. Das sind 12 Münzen.",
        lang,
      )}
    >
      <Villager who="Bea" x={20} />
      {step >= 1 && (
        <>
          <Pop><Clock x={cx(0)} y={14} size={60} /></Pop>
          <CoinStack x={cx(0) + 10} y={84} n={3} size={40} gap={42} />
        </>
      )}
      {step >= 2 &&
        [1, 2, 3].map((i) => (
          <Pop key={i}><Clock x={cx(i)} y={14} size={60} /></Pop>
        ))}
      {step >= 3 && [1, 2, 3].map((i) => <CoinStack key={i} x={cx(i) + 10} y={84} n={3} size={40} gap={42} />)}
      {step >= 4 && (
        <Pop x={535} y={100}>
          <rect width="95" height="64" rx="32" fill="#f08a2e" />
          <text className="chip-text" x="47.5" y="42" textAnchor="middle">= 12</text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 4: Bea 3 coins an hour, Sam 5 coins an hour. Why? */
export function WhyDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Bea gets 3 coins for each hour, Sam gets 5. Why does one job pay more than another?",
        "Bea bekommt 3 Münzen pro Stunde, Sam 5. Warum zahlt ein Beruf mehr als ein anderer?",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Bea" x={40} size={120} mood={step >= 3 ? "think" : "happy"} />
          <Pop><Clock x={200} y={16} size={44} /></Pop>
          <CoinStack x={203} y={70} n={3} />
        </>
      )}
      {step >= 2 && (
        <>
          <Villager who="Sam" x={380} size={120} />
          <Pop><Clock x={560} y={16} size={44} /></Pop>
          <CoinStack x={563} y={70} n={5} />
        </>
      )}
      {step >= 3 && (
        <Bubble x={366} y={4} w={110} h={64} thought tail="bottom-left">
          <text x="55" y="48" textAnchor="middle" className="chip-text" style={{ fill: "#23383f", fontSize: 40 }}>?</text>
        </Bubble>
      )}
    </DiagramCanvas>
  );
}

/** Beat 5: reason one, learning time. */
export function LearnDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Sam practiced for three years to make good shoes. The longer a job takes to learn, the more it usually pays.",
        "Sam hat drei Jahre geübt, um gute Schuhe zu machen. Je länger man einen Beruf lernt, desto mehr zahlt er meistens.",
        lang,
      )}
    >
      <Villager who="Sam" x={20} />
      {step >= 1 && (
        <Bubble x={30} y={4} w={112} h={66} thought tail="bottom-left">
          <GradCap x={27} y={4} size={58} />
        </Bubble>
      )}
      {step >= 2 && (
        <>
          {[1, 2, 3].map((n) => (
            <Pop key={n}><Calendar n={n} x={150 + (n - 1) * 78} y={112} size={70} /></Pop>
          ))}
          <Pop><Shoe x={392} y={112} size={70} /></Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Pop><ArrowIcon dir="up" x={478} y={118} size={48} /></Pop>
          <CoinCluster x={532} y={104} n={5} />
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: reason two, how many people can do the job. */
export function FewManyDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "One boat fixer can earn a lot of coins. When many people fix boats, each one gets fewer coins.",
        "Ein Bootsreparierer kann viele Münzen verdienen. Wenn viele Leute Boote reparieren, bekommt jeder weniger Münzen.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Pop><Person {...FIXER} x={30} y={110} size={120} /></Pop>
          <Pop><Boat x={166} y={140} size={110} /></Pop>
        </>
      )}
      {step >= 2 && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <Pop key={i}><Coin x={30 + i * 38} y={22} size={34} /></Pop>
          ))}
          <Pop><ArrowIcon dir="up" x={232} y={16} size={44} /></Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Pop>
            <path d="M320 20 V260" stroke="#23383f" strokeWidth="3" strokeDasharray="8 8" opacity="0.4" />
          </Pop>
          {[0, 1, 2, 3, 4].map((i) => (
            <Pop key={i}><Person {...FIXER} x={340 + i * 58} y={160} size={56} /></Pop>
          ))}
          <Pop><Coin x={360} y={72} size={34} /></Pop>
          <Pop><ArrowIcon dir="down" x={410} y={66} size={44} /></Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 7: reason three, demand. */
export function DemandDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "When lots of boats need fixing, the demand is high and the boat fixer earns more coins.",
        "Wenn viele Boote repariert werden müssen, ist die Nachfrage hoch und der Bootsreparierer verdient mehr Münzen.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Pop><Person {...FIXER} x={20} y={110} size={120} /></Pop>
          <Pop><Boat x={150} y={150} size={80} /></Pop>
        </>
      )}
      {step >= 2 && <TermChip x={200} y={4} w={240}>{alt("demand", "Nachfrage", lang)}</TermChip>}
      {step >= 3 &&
        [1, 2, 3].map((i) => (
          <Pop key={i}><Boat x={150 + i * 85} y={150} size={80} /></Pop>
        ))}
      {step >= 4 && (
        <>
          <Pop><ArrowIcon dir="up" x={505} y={62} size={46} /></Pop>
          <CoinCluster x={494} y={122} n={5} />
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 8: the coins you earn are yours: spend them or keep some. */
export function KeepDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "The coins you earn are yours. You can spend them on bread or keep some in a piggy bank.",
        "Die Münzen, die du verdienst, gehören dir. Du kannst Brot davon kaufen oder etwas im Sparschwein aufheben.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Pip" x={20} />
          {[0, 1, 2, 3].map((i) => (
            <Pop key={i}><Coin x={20 + i * 38} y={34} size={36} /></Pop>
          ))}
        </>
      )}
      {step >= 2 && (
        <>
          <Arrow from={[170, 130]} to={[330, 130]} />
          <Pop><Bread x={344} y={96} size={80} /></Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Arrow from={[170, 214]} to={[450, 214]} />
          <Pop><Piggy x={470} y={110} size={120} /></Pop>
          <Pop><Coin x={508} y={60} size={40} /></Pop>
        </>
      )}
    </DiagramCanvas>
  );
}
