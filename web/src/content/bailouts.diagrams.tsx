import { Villager } from "../components/cast";
import { Arrow, Bubble, DiagramCanvas, Pop, TermChip } from "../components/diagram";
import { Coin, NoSign } from "../components/icons";
import type { DiagramProps } from "../lesson/types";
import { BankBuilding } from "./banks.icons";

/** Animated diagrams for the Bailouts lesson, one per story beat. `step` is how many taps so far. */

const alt = (en: string, de: string, pl: string, lang: DiagramProps["lang"]) =>
  lang === "pl" ? pl : lang === "de" ? de : en;

const COLORS = { bank: "#e3a91a", shop: "#7fb8d6" } as const;

/** A domino standing on the floor at x, or lying flat when `down`. */
function Domino({ x, down, color }: { x: number; down?: boolean; color: string }) {
  return (
    <g transform={down ? `translate(${x + 56} 238) rotate(80)` : `translate(${x} 158)`}>
      <rect width="34" height="80" rx="7" fill={color} stroke="#23383f" strokeWidth="4" />
    </g>
  );
}

/** A row of `count` dominoes. The first `fallen` lie down. The first `banks` are bank coloured. */
function Row({
  count,
  fallen,
  banks,
  from = 40,
  gap = 80,
}: {
  count: number;
  fallen: number;
  banks: number;
  from?: number;
  gap?: number;
}) {
  return (
    <>
      <rect x="20" y="238" width="600" height="10" rx="5" fill="#a86f3c" />
      {Array.from({ length: count }, (_, i) => (
        <Domino
          key={i}
          x={from + i * gap}
          down={i < fallen}
          color={i < banks ? COLORS.bank : COLORS.shop}
        />
      ))}
    </>
  );
}

/** Beat 1: a row of dominoes, one push, all fall. */
export function DominoRowDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "A row of dominoes. The first one falls and knocks over all the others.",
        "Eine Reihe Dominosteine. Der erste fällt und stößt alle anderen um.",
        "Rząd kostek domina. Pierwsza upada i przewraca wszystkie pozostałe.",
        lang,
      )}
    >
      <Row count={7} fallen={step >= 3 ? 7 : step >= 2 ? 1 : 0} banks={0} />
      {step >= 2 && <Arrow from={[20, 120]} to={[110, 160]} color="#c0392b" width={8} head={20} />}
    </DiagramCanvas>
  );
}

/** Beat 2: one big bank, Bea's coins, shops and workers. */
export function BigBankDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Ripple Town has one big bank. Bea keeps coins there. The bank lends coins to shops.",
        "Ripple Town hat eine große Bank. Bea bewahrt dort Münzen auf. Die Bank leiht Läden Münzen.",
        "Ripple Town ma jeden duży bank. Bea trzyma tam monety. Bank pożycza monety sklepom.",
        lang,
      )}
    >
      {step >= 1 && (
        <Pop>
          <BankBuilding x={250} y={50} size={150} />
        </Pop>
      )}
      {step >= 2 && (
        <>
          <Villager who="Bea" x={30} y={70} size={110} />
          <Arrow from={[150, 125]} to={[250, 125]} />
          <Pop>
            <Coin x={175} y={70} size={38} />
          </Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Arrow from={[410, 125]} to={[480, 125]} />
          <Pop x={490} y={80}>
            <rect
              width="110"
              height="90"
              rx="10"
              fill={COLORS.shop}
              stroke="#23383f"
              strokeWidth="4"
            />
            <rect
              x="12"
              y="-14"
              width="86"
              height="22"
              rx="6"
              fill="#e68aa0"
              stroke="#23383f"
              strokeWidth="4"
            />
            <rect
              x="38"
              y="36"
              width="34"
              height="54"
              fill="#fff"
              stroke="#23383f"
              strokeWidth="4"
            />
          </Pop>
        </>
      )}
      {step >= 4 && <Row count={3} fallen={0} banks={1} from={250} gap={60} />}
    </DiagramCanvas>
  );
}

/** Beat 3: the bank fails and the dominoes fall. */
export function BankFailsDiagram({ lang, step }: DiagramProps) {
  const fallen = step >= 4 ? 8 : step >= 3 ? 3 : step >= 2 ? 1 : 0;
  return (
    <DiagramCanvas
      label={alt(
        "The bank fails. Its domino falls and the shop dominoes fall after it.",
        "Die Bank scheitert. Ihr Stein fällt und die Laden-Steine fallen hinterher.",
        "Bank upada. Jej kostka przewraca się, a za nią kostki sklepów.",
        lang,
      )}
    >
      <Row count={8} fallen={fallen} banks={1} from={20} gap={74} />
      {step >= 1 && (
        <Pop>
          <BankBuilding x={10} y={30} size={110} />
        </Pop>
      )}
      {step >= 2 && (
        <Pop>
          <NoSign x={140} y={50} size={80} />
        </Pop>
      )}
      {step >= 4 && (
        <Pop>
          <Coin x={440} y={60} size={46} />
          <NoSign x={430} y={50} size={66} />
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 4: Moss pays from the town box. This is a bailout. */
export function BailoutDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Mayor Moss gives coins from the town box to the bank. This is a bailout.",
        "Bürgermeister Moss gibt der Bank Münzen aus der Stadtkasse. Das ist eine Rettung.",
        "Burmistrz Moss daje bankowi monety ze wspólnej kasy. To jest ratunek.",
        lang,
      )}
    >
      {step >= 1 && <Villager who="Moss" x={20} y={60} size={120} />}
      {step >= 1 && (
        <>
          <Arrow from={[150, 120]} to={[260, 120]} />
          <Pop>
            <Coin x={185} y={60} size={40} />
          </Pop>
          <Pop>
            <BankBuilding x={270} y={50} size={140} />
          </Pop>
        </>
      )}
      {step >= 2 && (
        <TermChip x={400} y={70} w={230}>
          {alt("Bailout", "Bankenrettung", "Ratowanie banku", lang)}
        </TermChip>
      )}
      {step >= 3 && <Row count={3} fallen={0} banks={1} from={430} gap={60} />}
      {step >= 4 && (
        <Pop>
          <rect
            x="30"
            y="200"
            width="150"
            height="40"
            rx="10"
            fill="#a86f3c"
            stroke="#23383f"
            strokeWidth="4"
          />
          <text className="diagram-name" x="105" y="228" textAnchor="middle">
            {alt("Taxes", "Steuern", "Podatki", lang)}
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 5: the bank takes bigger risks because Moss will help. */
export function MoralHazardDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "The bank thinks Moss will help again, so it takes bigger risks.",
        "Die Bank denkt, Moss hilft wieder, und geht größere Risiken ein.",
        "Bank myśli, że Moss znów pomoże, więc ryzykuje więcej.",
        lang,
      )}
    >
      {step >= 1 && (
        <Pop>
          <BankBuilding x={60} y={110} size={150} />
        </Pop>
      )}
      {step >= 1 && (
        <Bubble x={190} y={10} w={150} h={90} thought tail="bottom-left">
          <Villager who="Moss" x={20} y={-10} size={64} name="" />
          <Coin x={90} y={22} size={44} />
        </Bubble>
      )}
      {step >= 2 && (
        <>
          <Arrow from={[230, 190]} to={[360, 190]} color="#c0392b" />
          <Pop>
            <Coin x={380} y={150} size={44} />
            <Coin x={430} y={150} size={44} />
            <Coin x={480} y={150} size={44} />
          </Pop>
        </>
      )}
      {step >= 3 && (
        <TermChip x={380} y={60} w={230}>
          {alt("Moral hazard", "Leichtsinn", "Pokusa ryzyka", lang)}
        </TermChip>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: a buffer wall stops the fall, and the owners lose coins first. */
export function BufferDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "A buffer wall stops the falling dominoes. If the bank still fails, its owners lose coins first.",
        "Eine Pufferwand stoppt die fallenden Steine. Scheitert die Bank doch, verlieren zuerst ihre Besitzer Münzen.",
        "Ściana buforu zatrzymuje spadające kostki. Gdy bank upadnie, najpierw tracą jego właściciele.",
        lang,
      )}
    >
      <Row count={8} fallen={step >= 2 ? 3 : 0} banks={3} from={20} gap={74} />
      {step >= 2 && (
        <Pop>
          <rect
            x="280"
            y="130"
            width="16"
            height="112"
            rx="5"
            fill="#4a7a8c"
            stroke="#23383f"
            strokeWidth="4"
          />
        </Pop>
      )}
      {step >= 1 && (
        <TermChip x={200} y={20} w={170}>
          {alt("Buffer", "Puffer", "Bufor", lang)}
        </TermChip>
      )}
      {step >= 3 && (
        <TermChip x={410} y={20} w={200}>
          Bail-in
        </TermChip>
      )}
      {step >= 4 && (
        <Pop>
          <Coin x={480} y={90} size={44} />
          <NoSign x={470} y={80} size={64} />
        </Pop>
      )}
    </DiagramCanvas>
  );
}
