import type { ReactNode } from "react";
import { CAST, Villager } from "../components/cast";
import { Arrow, Bubble, DiagramCanvas, Pop, TermChip } from "../components/diagram";
import { Bread, Coin, NoSign, Person } from "../components/icons";
import type { Mood } from "../components/icons";
import type { DiagramProps } from "../lesson/types";
import { BankBuilding, Chest, CoinPress, CoinStack, MetalDisc, River, Tick, UpArrow } from "./printing.icons";

/** Animated diagrams for the printing lesson, one per story beat. `step` is how many taps so far. */

const alt = (en: string, de: string, lang: DiagramProps["lang"]) => (lang === "en" ? en : de);

const INK = "#23383f";
const ORANGE = "#d9701b";
const GREEN = "#2f8a3f";

/** A big number in the diagram. */
function Num({
  x,
  y,
  children,
  size = 30,
  fill = INK,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text className="diagram-name" x={x} y={y} textAnchor={anchor} style={{ fontSize: size, fontWeight: 800, fill }}>
      {children}
    </text>
  );
}

/** A coin icon with a number next to it. */
function CoinNum({ x, y, n, size = 44, fill = INK }: { x: number; y: number; n: number | string; size?: number; fill?: string }) {
  return (
    <>
      <Coin x={x} y={y} size={size} />
      <Num x={x + size + 6} y={y + size * 0.74} size={size * 0.7} fill={fill}>
        {n}
      </Num>
    </>
  );
}

/** A loaf icon with a number next to it. */
function BreadNum({ x, y, n, size = 44, fill = INK }: { x: number; y: number; n: number | string; size?: number; fill?: string }) {
  return (
    <>
      <Bread x={x} y={y} size={size} />
      <Num x={x + size + 6} y={y + size * 0.74} size={size * 0.7} fill={fill}>
        {n}
      </Num>
    </>
  );
}

/** "1 loaf = n coins": a loaf, an equals sign, a coin and the number. */
function PriceRow({ x, y, n, size = 44, fill = INK }: { x: number; y: number; n: number | string; size?: number; fill?: string }) {
  return (
    <Pop x={x} y={y}>
      <Bread x={0} y={0} size={size} />
      <Num x={size + 20} y={size * 0.74} size={size * 0.7} anchor="middle">
        =
      </Num>
      <Coin x={size + 40} y={0} size={size} />
      <Num x={size * 2 + 48} y={size * 0.74} size={size * 0.75} fill={fill}>
        {n}
      </Num>
    </Pop>
  );
}

/** A block of coins in rows. */
function CoinGrid({ x, y, n, cols, size, gap }: { x: number; y: number; n: number; cols: number; size: number; gap: number }) {
  return (
    <Pop x={x} y={y}>
      {Array.from({ length: n }, (_, i) => (
        <Coin key={i} x={(i % cols) * gap} y={Math.floor(i / cols) * gap} size={size} />
      ))}
    </Pop>
  );
}

/** Loaves on a shelf, `cols` per row. */
function Shelf({ x, y, n, cols, size, gap }: { x: number; y: number; n: number; cols: number; size: number; gap: number }) {
  const rows = Math.ceil(n / cols);
  const w = (cols - 1) * gap + size + 16;
  return (
    <Pop x={x} y={y}>
      <rect x="-8" y={(rows - 1) * gap + size - 6} width={w} height="12" rx="6" fill="#a86f3c" />
      {Array.from({ length: n }, (_, i) => (
        <Bread key={i} x={(i % cols) * gap} y={Math.floor(i / cols) * gap} size={size} />
      ))}
    </Pop>
  );
}

/** A person with no name label (for crowds). */
function Crowd({ who, x, y, size, mood = "happy" }: { who: keyof typeof CAST; x: number; y: number; size: number; mood?: Mood }) {
  return (
    <Pop x={x} y={y}>
      <Person {...CAST[who]} mood={mood} size={size} />
    </Pop>
  );
}

/** Beat 1: Moss, the new bridge, and the empty town chest. */
export function ProblemDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Mayor Moss wants a new bridge over the river, but the town chest is empty.",
        "Bürgermeister Moss will eine neue Brücke über den Fluss, aber die Stadtkasse ist leer.",
        lang,
      )}
    >
      {step >= 1 && <Villager who="Moss" x={20} mood={step >= 3 ? "sad" : "happy"} />}
      {step >= 2 && (
        <Pop>
          <River x={190} y={30} size={220} bridge="ghost" />
        </Pop>
      )}
      {step >= 3 && (
        <>
          <Pop>
            <Chest x={470} y={116} size={140} />
          </Pop>
          <Bubble x={450} y={14} w={160} h={74} tail="bottom-right">
            <Coin x={22} y={11} size={52} />
            <NoSign x={22} y={11} size={52} />
            <Num x={110} y={52} size={34}>
              0
            </Num>
          </Bubble>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 2: the coin press, the big idea, and the new term "printing money". */
export function IdeaDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Moss has a coin press. He thinks lots of new coins will make the town rich. This is called printing money.",
        "Moss hat eine Münzpresse. Er denkt, dass viele neue Münzen die Stadt reich machen. Das heißt Geld drucken.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Moss" x={20} mood="happy" />
          <Pop>
            <CoinPress x={250} y={84} size={190} />
          </Pop>
        </>
      )}
      {step >= 2 && (
        <Bubble x={44} y={6} w={190} h={68} thought tail="bottom-left">
          <CoinStack x={14} y={4} size={58} />
          <CoinStack x={64} y={4} size={58} />
          <CoinStack x={114} y={4} size={58} />
        </Bubble>
      )}
      {step >= 3 && (
        <>
          <Pop>
            <Coin x={450} y={186} size={56} />
            <Coin x={510} y={186} size={56} />
            <Coin x={570} y={186} size={56} />
          </Pop>
          <TermChip x={330} y={34} w={290}>
            {alt("printing money", "Geld drucken", lang)}
          </TermChip>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 3: Bea's 10 loaves, the town's 20 coins, and the price of 2 coins. */
export function BreadPriceDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Bea bakes 10 loaves a day. The town has 20 coins. So one loaf costs 2 coins.",
        "Bea backt am Tag 10 Brote. Die Stadt hat 20 Münzen. Also kostet ein Brot 2 Münzen.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Bea" x={486} y={26} size={120} />
          <Shelf x={214} y={30} n={10} cols={5} size={46} gap={48} />
          <Pop>
            <BreadNum x={286} y={164} n={10} size={36} />
          </Pop>
        </>
      )}
      {step >= 2 && (
        <>
          <CoinGrid x={14} y={22} n={20} cols={5} size={32} gap={34} />
          <Pop>
            <CoinNum x={56} y={164} n={20} size={36} />
          </Pop>
        </>
      )}
      {step >= 3 && <PriceRow x={186} y={214} n={2} size={52} fill={GREEN} />}
    </DiagramCanvas>
  );
}

/** Beat 4: Moss prints 20 new coins, the town has 40, everyone runs to Bea. */
export function PrintDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Moss prints 20 new coins. The town now has 40 coins. Everybody runs to Bea to buy bread.",
        "Moss druckt 20 neue Münzen. Die Stadt hat jetzt 40 Münzen. Alle rennen zu Bea, um Brot zu kaufen.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Moss" x={8} y={96} size={110} name="" />
          <Pop>
            <CoinPress x={118} y={106} size={110} />
          </Pop>
          <Pop>
            <CoinStack x={236} y={140} size={72} />
            <CoinStack x={286} y={140} size={72} />
            <Num x={290} y={134} size={30} anchor="middle" fill={ORANGE}>
              +20
            </Num>
          </Pop>
        </>
      )}
      {step >= 2 && (
        <Pop>
          <CoinNum x={14} y={8} n={20} size={42} />
          <Num x={134} y={42} size={32} anchor="middle">
            +
          </Num>
          <CoinNum x={156} y={8} n={20} size={42} fill={ORANGE} />
          <Num x={276} y={42} size={32} anchor="middle">
            =
          </Num>
          <CoinNum x={298} y={4} n={40} size={50} />
        </Pop>
      )}
      {step >= 3 && (
        <>
          <Crowd who="Finn" x={372} y={128} size={68} />
          <Crowd who="Sam" x={424} y={128} size={68} />
          <Crowd who="Pim" x={476} y={128} size={68} />
          <Arrow from={[376, 224]} to={[536, 224]} width={5} head={14} />
          <Villager who="Bea" x={540} y={110} size={88} name="" />
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 5: still 10 loaves, 40 coins chase them, a loaf costs 4 coins. */
export function PriceUpDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Bea still bakes only 10 loaves. 40 coins want the same bread, so one loaf now costs 4 coins.",
        "Bea backt immer noch nur 10 Brote. 40 Münzen wollen das gleiche Brot, also kostet ein Brot jetzt 4 Münzen.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Bea" x={14} y={98} size={110} mood="think" />
          <Bubble x={36} y={4} w={200} h={72} thought tail="bottom-left">
            <Coin x={14} y={10} size={52} />
            <Arrow from={[72, 36]} to={[124, 36]} width={4} head={10} />
            <Bread x={132} y={9} size={54} />
            <NoSign x={72} y={9} size={54} />
          </Bubble>
          <Shelf x={250} y={108} n={10} cols={5} size={38} gap={40} />
        </>
      )}
      {step >= 2 && (
        <>
          <Pop>
            <CoinStack x={516} y={98} size={52} />
            <CoinStack x={570} y={98} size={52} />
            <CoinStack x={516} y={146} size={52} />
            <CoinStack x={570} y={146} size={52} />
            <Num x={572} y={236} size={32} anchor="middle">
              40
            </Num>
          </Pop>
          <Arrow from={[508, 160]} to={[466, 160]} width={5} head={14} />
        </>
      )}
      {step >= 3 && (
        <>
          <PriceRow x={272} y={14} n={2} size={34} fill="#8a9aa1" />
          <Arrow from={[416, 32]} to={[452, 32]} width={4} head={11} />
          <PriceRow x={466} y={8} n={4} size={44} fill={ORANGE} />
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: this is inflation. More coins, same bread, nobody richer. */
export function InflationDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Prices went up: this is inflation. The town has more coins but the same bread, so nobody got richer.",
        "Die Preise sind gestiegen: das ist Inflation. Die Stadt hat mehr Münzen, aber gleich viel Brot, also ist niemand reicher geworden.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <PriceRow x={60} y={8} n={2} size={40} fill="#8a9aa1" />
          <Pop x={102} y={58}>
            <UpArrow size={50} />
          </Pop>
          <PriceRow x={60} y={116} n={4} size={44} fill={ORANGE} />
          <TermChip x={330} y={56} w={280}>
            {alt("inflation", "Inflation", lang)}
          </TermChip>
        </>
      )}
      {step >= 2 && (
        <Pop>
          <CoinNum x={20} y={206} n={20} size={44} />
          <Arrow from={[150, 228]} to={[196, 228]} width={5} head={13} />
          <CoinNum x={210} y={206} n={40} size={44} fill={ORANGE} />
          <BreadNum x={340} y={206} n={10} size={44} />
          <Num x={470} y={240} size={34} anchor="middle">
            =
          </Num>
          <BreadNum x={500} y={206} n={10} size={44} />
        </Pop>
      )}
      {step >= 3 && (
        <>
          <Crowd who="Finn" x={340} y={116} size={70} mood="think" />
          <Crowd who="Bea" x={430} y={116} size={70} mood="think" />
          <Crowd who="Sam" x={520} y={116} size={70} mood="think" />
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 7: Moss keeps printing, prices explode: hyperinflation. People stop trusting the coins. */
export function HyperDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "If Moss keeps printing, a loaf costs 10 coins, then 100. Prices rising this fast is called hyperinflation. People stop trusting the coins.",
        "Wenn Moss weiter druckt, kostet ein Brot 10 Münzen, dann 100. Preise, die so schnell steigen, heißen Hyperinflation. Die Leute vertrauen den Münzen nicht mehr.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Moss" x={6} y={104} size={104} mood={step >= 3 ? "sad" : "happy"} name="" />
          <Pop>
            <CoinPress x={110} y={134} size={96} />
          </Pop>
          <PriceRow x={250} y={196} n={4} size={38} />
          <Pop x={252} y={150}>
            <UpArrow size={36} />
          </Pop>
          <PriceRow x={250} y={106} n={10} size={44} fill={ORANGE} />
          <Pop x={252} y={62}>
            <UpArrow size={38} />
          </Pop>
          <PriceRow x={250} y={4} n={100} size={52} fill="#d6403a" />
        </>
      )}
      {step >= 2 && (
        <TermChip x={4} y={14} w={236}>
          {alt("hyperinflation", "Hyperinflation", lang)}
        </TermChip>
      )}
      {step >= 3 && (
        <>
          <Crowd who="Pim" x={526} y={150} size={96} mood="sad" />
          <Bubble x={466} y={64} w={150} h={70} thought tail="bottom-right">
            <Coin x={12} y={12} size={46} />
            <Arrow from={[62, 36]} to={[84, 36]} width={4} head={10} />
            <MetalDisc x={92} y={12} size={46} />
          </Bubble>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 8: a few new coins are fine if there is more to buy; the central bank looks after the money. */
export function FineDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "A few new coins are fine when the town also makes more bread. A loaf still costs 2 coins. The central bank looks after the money.",
        "Ein paar neue Münzen sind in Ordnung, wenn die Stadt auch mehr Brot herstellt. Ein Brot kostet weiter 2 Münzen. Die Zentralbank kümmert sich um das Geld.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Moss" x={10} y={62} size={104} name="" />
          <Pop>
            <CoinPress x={116} y={80} size={100} />
          </Pop>
          <Pop>
            <CoinNum x={270} y={14} n={20} size={46} />
            <Num x={400} y={52} size={34} anchor="middle">
              +
            </Num>
            <CoinNum x={424} y={14} n={4} size={46} fill={ORANGE} />
          </Pop>
        </>
      )}
      {step >= 2 && (
        <Pop>
          <BreadNum x={270} y={80} n={10} size={46} />
          <Num x={400} y={118} size={34} anchor="middle">
            +
          </Num>
          <BreadNum x={424} y={80} n={2} size={46} fill={GREEN} />
        </Pop>
      )}
      {step >= 3 && (
        <>
          <PriceRow x={270} y={146} n={2} size={46} fill={GREEN} />
          <Pop x={502} y={142}>
            <Tick size={52} />
          </Pop>
        </>
      )}
      {step >= 4 && (
        <>
          <Pop>
            <BankBuilding x={150} y={206} size={68} />
          </Pop>
          <TermChip x={240} y={216} w={330}>
            {alt("central bank", "Zentralbank", lang)}
          </TermChip>
        </>
      )}
      {step >= 5 && <Arrow from={[212, 206]} to={[258, 176]} width={5} head={13} color={GREEN} />}
    </DiagramCanvas>
  );
}
