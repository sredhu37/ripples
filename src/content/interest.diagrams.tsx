import type { ReactNode } from "react";
import { Villager } from "../components/cast";
import { Arrow, Bubble, DiagramCanvas, Pop, TermChip } from "../components/diagram";
import { Clock, Coin, Person, Tag } from "../components/icons";
import type { DiagramProps } from "../lesson/types";
import type { Lang } from "../progress";
import { Bank, Boat } from "./interest.icons";

/** Animated diagrams for the Interest lesson, one per story beat. `step` is how many taps so far. */

const alt = (en: string, de: string, lang: Lang) => (lang === "en" ? en : de);
const pct = (n: number, lang: Lang) => (lang === "en" ? `${n}%` : `${n} %`);

/** Bea on the left, the bank in the middle, Finn on the right: the same places in every beat. */
const LEFT = 10;
const MID = 260;
const RIGHT = 510;
const PY = 70;
const PS = 120;

const who = { y: PY, size: PS } as const;

function BankPlace({ x = MID, y = PY }: { x?: number; y?: number }) {
  return (
    <Pop x={x} y={y}>
      <Bank size={PS} />
      <text className="diagram-name" x={PS / 2} y={PS + 30} textAnchor="middle">
        Bank
      </text>
    </Pop>
  );
}

/** n coins side by side, popping in together. */
function CoinRow({ x, y, n, size = 26, gap = 3 }: { x: number; y: number; n: number; size?: number; gap?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <Pop key={i} x={x + i * (size + gap)} y={y}>
          <Coin size={size} />
        </Pop>
      ))}
    </>
  );
}

/** A big readable number. */
function Num({ x, y, children, size = 30, fill = "#23383f", anchor = "middle" }: { x: number; y: number; children: ReactNode; size?: number; fill?: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <Pop>
      <text x={x} y={y} textAnchor={anchor} style={{ font: `800 ${size}px ui-rounded, "SF Pro Rounded", "Nunito", system-ui, sans-serif`, fill }}>
        {children}
      </text>
    </Pop>
  );
}

/** A rounded teal pill that holds a percent value. */
function PercentPill({ x, y, w = 92, h = 48, children }: { x: number; y: number; w?: number; h?: number; children: ReactNode }) {
  return (
    <Pop x={x} y={y}>
      <rect width={w} height={h} rx={h / 2} fill="#1b8a9a" />
      <text x={w / 2} y={h / 2 + 9} textAnchor="middle" style={{ font: '800 26px ui-rounded, "SF Pro Rounded", "Nunito", system-ui, sans-serif', fill: "#fff" }}>
        {children}
      </text>
    </Pop>
  );
}

/** Beat 1: Bea's coins sit in the bank, the bank lends them to Finn for a boat. */
export function BankLoanDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Bea keeps 100 coins in the bank. Finn wants a boat. The bank lends Bea's coins to Finn.",
        "Bea hat 100 Münzen in der Bank. Finn will ein Boot. Die Bank leiht Beas Münzen an Finn.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Bea" x={LEFT} {...who} />
          <BankPlace />
          <Arrow from={[142, 128]} to={[246, 128]} />
          <CoinRow x={170} y={76} n={1} size={50} />
          <Num x={195} y={176}>100</Num>
        </>
      )}
      {step >= 2 && (
        <>
          <Villager who="Finn" x={RIGHT} {...who} mood="think" />
          <Bubble x={480} y={8} w={120} h={64} thought tail="bottom-left">
            <Boat x={32} y={4} size={56} />
          </Bubble>
        </>
      )}
      {step >= 3 && (
        <>
          <Arrow from={[392, 128]} to={[496, 128]} />
          <CoinRow x={420} y={76} n={1} size={50} />
          <Num x={445} y={176}>100</Num>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 2: Finn pays back 105, not 100. The 5 extra coins are interest. */
export function InterestDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Finn pays the bank 105 coins for a loan of 100. The 5 extra coins are called interest.",
        "Finn zahlt der Bank 105 Münzen für ein Darlehen von 100. Die 5 Extra-Münzen heißen Zinsen.",
        lang,
      )}
    >
      <Villager who="Finn" x={LEFT} {...who} />
      <BankPlace x={RIGHT} />
      {step >= 1 && (
        <>
          <Arrow from={[150, 140]} to={[494, 140]} />
          <Pop x={162} y={66}>
            <Coin size={46} />
          </Pop>
          <Num x={218} y={100} anchor="start">100</Num>
          <Num x={306} y={100} size={34}>+</Num>
          <CoinRow x={328} y={70} n={5} size={32} gap={4} />
        </>
      )}
      {step >= 2 && (
        <Pop x={190} y={158}>
          <Tag size={104} />
          <text x="60" y="63" textAnchor="middle" style={{ font: '800 26px ui-rounded, "SF Pro Rounded", "Nunito", system-ui, sans-serif', fill: "#c0392b" }}>
            +5
          </text>
        </Pop>
      )}
      {step >= 3 && <TermChip x={310} y={190} w={190}>{alt("interest", "Zinsen", lang)}</TermChip>}
    </DiagramCanvas>
  );
}

/** Beat 3: 5 out of every 100 is 5 percent. */
export function PercentDiagram({ lang, step }: DiagramProps) {
  const cells = Array.from({ length: 100 }, (_, i) => ({ c: i % 10, r: Math.floor(i / 10) }));
  const cell = 22;
  return (
    <DiagramCanvas
      label={alt(
        "Out of 100 coins, 5 are extra. That is 5 percent.",
        "Von 100 Münzen sind 5 extra. Das sind 5 Prozent.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Pop x={30} y={14}>
            {cells.map(({ c, r }) => (
              <rect key={`${c}-${r}`} x={c * cell} y={r * cell} width={cell - 3} height={cell - 3} rx="4" fill="#1b8a9a" />
            ))}
          </Pop>
          <Num x={140} y={266} size={24}>100</Num>
          <Arrow from={[262, 120]} to={[330, 120]} />
          <CoinRow x={346} y={96} n={5} size={44} gap={8} />
          <Num x={486} y={172} size={30}>+5</Num>
        </>
      )}
      {step >= 2 && (
        <>
          <Pop x={30} y={14}>
            {[0, 1, 2, 3, 4].map((c) => (
              <rect key={c} x={c * cell} y={0} width={cell - 3} height={cell - 3} rx="4" fill="#f08a2e" />
            ))}
          </Pop>
          <TermChip x={350} y={8} w={240}>{alt("percent", "Prozent", lang)}</TermChip>
        </>
      )}
      {step >= 3 && <Num x={470} y={254} size={64} fill="#146a77">{pct(5, lang)}</Num>}
    </DiagramCanvas>
  );
}

/** Beat 4: the bank pays Bea 3 percent, Finn pays 5 percent. */
export function SaverDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "The bank pays Bea 3 extra coins for her 100, which is 3 percent. Finn pays 5 percent.",
        "Die Bank zahlt Bea 3 Extra-Münzen für ihre 100, das sind 3 Prozent. Finn zahlt 5 Prozent.",
        lang,
      )}
    >
      <Villager who="Bea" x={LEFT} {...who} />
      <BankPlace />
      {step >= 1 && (
        <>
          <Arrow from={[246, 128]} to={[146, 128]} />
        </>
      )}
      {step >= 2 && (
        <>
          <CoinRow x={152} y={90} n={3} size={30} />
          <PercentPill x={153} y={148} w={92}>{pct(3, lang)}</PercentPill>
        </>
      )}
      {step >= 3 && (
        <>
          <Villager who="Finn" x={RIGHT} {...who} />
          <Arrow from={[496, 128]} to={[396, 128]} />
          <CoinRow x={394} y={90} n={5} size={24} gap={2} />
          <PercentPill x={403} y={148} w={92}>{pct(5, lang)}</PercentPill>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 5: where the 5 coins of interest go. */
export function SplitDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Finn pays 5 coins. The bank gives 3 to Bea and keeps 2 for its work and for loans that are not paid back.",
        "Finn zahlt 5 Münzen. Die Bank gibt 3 an Bea und behält 2 für ihre Arbeit und für Geld, das nicht zurückkommt.",
        lang,
      )}
    >
      <BankPlace />
      {step >= 1 && (
        <>
          <Villager who="Finn" x={RIGHT} {...who} />
          <Arrow from={[496, 128]} to={[396, 128]} />
          <CoinRow x={394} y={90} n={5} size={24} gap={2} />
        </>
      )}
      {step >= 2 && (
        <>
          <Villager who="Bea" x={LEFT} {...who} />
          <Arrow from={[246, 128]} to={[146, 128]} />
          <CoinRow x={152} y={90} n={3} size={30} />
        </>
      )}
      {step >= 3 && <CoinRow x={290} y={14} n={2} size={44} gap={8} />}
      {step >= 4 && (
        <>
          <Arrow from={[280, 36]} to={[232, 36]} width={5} head={13} />
          <Pop x={36} y={6}>
            <rect width="190" height="64" rx="22" fill="#fff" stroke="#23383f" strokeWidth="4" />
            <Person hat="hardhat" shirt="#6f858c" x={59} y={0} size={72} />
          </Pop>
          <Arrow from={[386, 36]} to={[434, 36]} width={5} head={13} />
          <Pop x={440} y={6}>
            <rect width="190" height="64" rx="22" fill="#fff" stroke="#23383f" strokeWidth="4" />
            <Coin x={64} y={4} size={56} />
            <g transform="translate(64 4) scale(0.56)">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#d6403a" strokeWidth="9" />
              <path d="M22 22 L78 78" stroke="#d6403a" strokeWidth="9" strokeLinecap="round" />
            </g>
          </Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: interest on interest. Bars for year 0, 1 and 2 with a pretend 10 percent. */
export function CompoundDiagram({ lang, step }: DiagramProps) {
  const base = 70;
  const unit = 3;
  const floorY = 236;
  const bar = (x: number, parts: { h: number; fill: string; label?: string }[], total: string) => {
    let top = floorY;
    const rects = parts.map((p, i) => {
      top -= p.h;
      return (
        <g key={i}>
          <rect x={x} y={top} width={130} height={p.h} fill={p.fill} stroke="#23383f" strokeWidth="2.5" />
          {p.label && (
            <text x={x + 65} y={top + p.h / 2 + 8} textAnchor="middle" style={{ font: '800 22px ui-rounded, system-ui, sans-serif', fill: "#23383f" }}>
              {p.label}
            </text>
          )}
        </g>
      );
    });
    return (
      <Pop>
        {rects}
        <text x={x + 65} y={top - 10} textAnchor="middle" style={{ font: '800 30px ui-rounded, system-ui, sans-serif', fill: "#146a77" }}>
          {total}
        </text>
      </Pop>
    );
  };
  const year = (x: number, n: number) => (
    <Pop>
      <text x={x + 65} y={266} textAnchor="middle" className="diagram-small">
        {alt(`Year ${n}`, `Jahr ${n}`, lang)}
      </text>
    </Pop>
  );
  return (
    <DiagramCanvas
      label={alt(
        "With 10 percent, Bea has 100 coins, then 110, then 121. The second year's interest is 11 coins, because it is paid on 110.",
        "Bei 10 Prozent hat Bea 100 Münzen, dann 110, dann 121. Die Zinsen im zweiten Jahr sind 11 Münzen, weil sie auf 110 gezahlt werden.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          {bar(40, [{ h: base, fill: "#1b8a9a", label: "100" }], "100")}
          {year(40, 0)}
        </>
      )}
      {step >= 2 && (
        <>
          {bar(255, [{ h: base, fill: "#1b8a9a", label: "100" }, { h: 10 * unit, fill: "#4fa75a", label: "+10" }], "110")}
          {year(255, 1)}
        </>
      )}
      {step >= 3 && (
        <>
          {bar(470, [{ h: base, fill: "#1b8a9a", label: "100" }, { h: 10 * unit, fill: "#4fa75a", label: "+10" }, { h: 11 * unit, fill: "#e3a91a", label: "+11" }], "121")}
          {year(470, 2)}
        </>
      )}
      {step >= 4 && <TermChip x={140} y={4} w={360}>{alt("compound interest", "Zinseszins", lang)}</TermChip>}
    </DiagramCanvas>
  );
}

/** Beat 7: a higher rate or more years costs Finn more. */
export function LoanCostDiagram({ lang, step }: DiagramProps) {
  const row = (y: number, left: ReactNode, total: string) => (
    <>
      {left}
      <Arrow from={[386, y + 24]} to={[480, y + 24]} width={5} head={14} />
      <Pop x={494} y={y}>
        <Coin size={48} />
      </Pop>
      <Num x={552} y={y + 36} anchor="start" size={28}>{total}</Num>
    </>
  );
  return (
    <DiagramCanvas
      label={alt(
        "A loan of 100 coins costs 105 at 5 percent and 110 at 10 percent. After 10 years at 10 percent it costs 259.",
        "Ein Darlehen von 100 Münzen kostet bei 5 Prozent 105 und bei 10 Prozent 110. Nach 10 Jahren bei 10 Prozent sind es 259.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Finn" x={LEFT} {...who} />
          <Pop x={140} y={84}>
            <Boat size={96} />
          </Pop>
        </>
      )}
      {step >= 2 && (
        <>
          {row(40, <PercentPill x={256} y={40} w={110}>{pct(5, lang)}</PercentPill>, "105")}
          {row(108, <PercentPill x={256} y={108} w={110}>{pct(10, lang)}</PercentPill>, "110")}
        </>
      )}
      {step >= 3 &&
        row(
          176,
          <>
            <PercentPill x={256} y={176} w={110}>{pct(10, lang)}</PercentPill>
            <Pop x={260} y={232}>
              <Clock size={40} />
            </Pop>
            <text x={306} y={261} className="diagram-small" style={{ fontSize: 20 }}>
              {alt("10 years", "10 Jahre", lang)}
            </text>
          </>,
          "259",
        )}
    </DiagramCanvas>
  );
}
