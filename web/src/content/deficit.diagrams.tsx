import { Villager } from "../components/cast";
import { Arrow, DiagramCanvas, Pop, TermChip } from "../components/diagram";
import { Coin, NoSign } from "../components/icons";
import type { DiagramProps } from "../lesson/types";

/** Animated diagrams for the Deficit lesson, one per story beat. `step` is how many taps so far. */

const alt = (en: string, de: string, pl: string, lang: DiagramProps["lang"]) =>
  lang === "pl" ? pl : lang === "de" ? de : en;

const INK = "#23383f";
const RED = "#e06343";

/** The tax pot: a brown pot with a number on it. */
function Pot({ x, y, value }: { x: number; y: number; value: string }) {
  return (
    <Pop x={x} y={y}>
      <rect width="110" height="80" rx="16" fill="#a86f3c" stroke={INK} strokeWidth="4" />
      <rect
        x="-8"
        y="-8"
        width="126"
        height="20"
        rx="8"
        fill="#c98d4d"
        stroke={INK}
        strokeWidth="4"
      />
      <text className="diagram-name" x="55" y="52" textAnchor="middle" fill="#fff">
        {value}
      </text>
    </Pop>
  );
}

/** A flat block, for a coin gap or a pile of debt. */
function Block({
  x,
  y,
  w = 70,
  h = 40,
  color = RED,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  color?: string;
}) {
  return (
    <Pop x={x} y={y}>
      <rect width={w} height={h} rx="8" fill={color} stroke={INK} strokeWidth="4" />
    </Pop>
  );
}

/** Small flat pictures of what the town wants to build. */
function Wish({ kind, x, y }: { kind: "school" | "road" | "park" | "wall"; x: number; y: number }) {
  return (
    <Pop x={x} y={y}>
      {kind === "school" && (
        <>
          <rect y="16" width="56" height="40" fill="#e3a91a" stroke={INK} strokeWidth="4" />
          <polygon
            points="-4,16 28,-6 60,16"
            fill="#c0392b"
            stroke={INK}
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </>
      )}
      {kind === "road" && (
        <>
          <rect y="14" width="56" height="34" rx="6" fill="#8d979b" stroke={INK} strokeWidth="4" />
          <path d="M8 31 H48" stroke="#fff" strokeWidth="4" strokeDasharray="8 6" />
        </>
      )}
      {kind === "park" && (
        <>
          <rect x="24" y="30" width="8" height="26" fill="#a86f3c" />
          <circle cx="28" cy="22" r="22" fill="#5aa05f" stroke={INK} strokeWidth="4" />
        </>
      )}
      {kind === "wall" && (
        <>
          <rect y="10" width="56" height="44" rx="4" fill="#9aa6ab" stroke={INK} strokeWidth="4" />
          <path d="M0 32 H56 M28 10 V32 M14 32 V54 M42 32 V54" stroke={INK} strokeWidth="3" />
        </>
      )}
    </Pop>
  );
}

/** Beat 1: the pot holds 10, the wishes cost 12. The gap is a deficit. */
export function GapDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Mayor Moss has a pot of 10 coins. The wishes cost 12. The gap of 2 is a deficit.",
        "Bürgermeister Moss hat einen Topf mit 10 Münzen. Die Wünsche kosten 12. Die Lücke von 2 ist ein Defizit.",
        "Burmistrz Moss ma garnek z 10 monetami. Życzenia kosztują 12. Luka 2 to deficyt.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Moss" x={10} y={20} size={100} />
          <Pot x={140} y={40} value="10" />
        </>
      )}
      {step >= 2 && (
        <>
          <Wish kind="school" x={300} y={20} />
          <Wish kind="road" x={380} y={20} />
          <Wish kind="park" x={460} y={20} />
          <Wish kind="wall" x={540} y={20} />
        </>
      )}
      {step >= 3 && (
        <>
          <text className="diagram-name" x="150" y="196" textAnchor="end">
            10
          </text>
          <text className="diagram-name" x="150" y="241" textAnchor="end">
            12
          </text>
          <Block x={165} y={170} w={300} color="#a9d18e" />
          <Block x={165} y={215} w={360} color="#7fb8d6" />
          <Pop>
            <rect
              x="465"
              y="215"
              width="60"
              height="40"
              rx="8"
              fill={RED}
              stroke={INK}
              strokeWidth="4"
            />
          </Pop>
        </>
      )}
      {step >= 4 && (
        <TermChip x={380} y={105} w={230}>
          {alt("Deficit", "Defizit", "Deficyt", lang)}
        </TermChip>
      )}
    </DiagramCanvas>
  );
}

/** Beat 2: Bea and others lend 2 coins. The town owes 2. */
export function BorrowDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Bea and other lenders give the town 2 coins for bonds. The town now owes 2 coins.",
        "Bea und andere Geldgeber geben der Stadt 2 Münzen für Anleihen. Die Stadt schuldet jetzt 2 Münzen.",
        "Bea i inni pożyczkodawcy dają miasteczku 2 monety za obligacje. Miasteczko jest winne 2 monety.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Moss" x={500} y={50} size={110} />
          <Pot x={330} y={90} value="10" />
        </>
      )}
      {step >= 2 && (
        <>
          <Villager who="Bea" x={20} y={50} size={110} />
          <Arrow from={[150, 120]} to={[310, 130]} />
          <Pop>
            <Coin x={190} y={60} size={40} />
            <Coin x={235} y={60} size={40} />
          </Pop>
          <Pop x={150} y={150}>
            <rect width="60" height="70" rx="6" fill="#fff" stroke={INK} strokeWidth="4" />
            <path d="M12 20 H48 M12 36 H48 M12 52 H34" stroke={INK} strokeWidth="4" />
          </Pop>
        </>
      )}
      {step >= 3 && (
        <Pop>
          <path
            d="M360 40 L378 60 L410 20"
            stroke="#2e7d32"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Pop>
      )}
      {step >= 4 && (
        <Pop x={330} y={205}>
          <rect width="110" height="50" rx="12" fill={RED} stroke={INK} strokeWidth="4" />
          <text className="diagram-name" x="55" y="35" textAnchor="middle" fill="#fff">
            2
          </text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 3: gaps pile up into the national debt. */
export function DebtGrowsDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Each year's gap is added to a tower. The tower is the national debt.",
        "Die Lücke jedes Jahres kommt auf einen Turm. Der Turm sind die Staatsschulden.",
        "Luka każdego roku trafia na wieżę. Wieża to dług publiczny.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Block x={40} y={200} />
          <Block x={130} y={200} />
          <text className="diagram-name" x="75" y="270" textAnchor="middle">
            1
          </text>
          <text className="diagram-name" x="165" y="270" textAnchor="middle">
            2
          </text>
        </>
      )}
      {step >= 2 && (
        <>
          <Arrow from={[220, 215]} to={[390, 215]} />
          <Block x={410} y={200} color="#8e6bbf" />
          <Block x={410} y={160} color="#8e6bbf" />
          <text className="diagram-name" x="520" y="195" textAnchor="start">
            4
          </text>
        </>
      )}
      {step >= 3 && (
        <>
          <Block x={220} y={200} />
          <text className="diagram-name" x="255" y="270" textAnchor="middle">
            3
          </text>
          <Block x={410} y={120} color="#8e6bbf" />
          <TermChip x={330} y={30} w={290}>
            {alt("National debt", "Staatsschulden", "Dług publiczny", lang)}
          </TermChip>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 4: interest takes a slice from the pot. */
export function InterestDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "The town pays 1 coin of interest to the lender. Only 9 coins stay in the pot for the school.",
        "Die Stadt zahlt 1 Münze Zinsen an den Geldgeber. Nur 9 Münzen bleiben im Topf für die Schule.",
        "Miasteczko płaci pożyczkodawcy 1 monetę odsetek. W garnku zostaje 9 monet na szkołę.",
        lang,
      )}
    >
      {step >= 1 && <Villager who="Bea" x={500} y={40} size={110} />}
      {step >= 1 && <Pot x={60} y={60} value={step >= 3 ? "9" : "10"} />}
      {step >= 2 && (
        <>
          <Arrow from={[190, 80]} to={[480, 90]} color="#c0392b" />
          <Pop>
            <Coin x={310} y={30} size={44} />
          </Pop>
        </>
      )}
      {step >= 3 && (
        <Pop x={60} y={170}>
          <rect width="110" height="26" rx="8" fill="#f08a2e" stroke={INK} strokeWidth="4" />
          <text className="diagram-name" x="55" y="21" textAnchor="middle">
            -1
          </text>
        </Pop>
      )}
      {step >= 4 && <Wish kind="school" x={300} y={170} />}
      {step >= 4 && (
        <Pop>
          <Arrow from={[330, 150]} to={[330, 165]} color="#c0392b" />
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** A small lamp, for everyday spending. */
function Lamp({ x, y }: { x: number; y: number }) {
  return (
    <Pop x={x} y={y}>
      <rect x="22" y="40" width="10" height="50" fill="#8d979b" stroke={INK} strokeWidth="3" />
      <circle cx="27" cy="26" r="24" fill="#f6d65a" stroke={INK} strokeWidth="4" />
    </Pop>
  );
}

/** Beat 5: borrowing for a wall that pays back, against lamp oil that is used up. */
export function WallVsLampDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "A harbour wall helps Finn earn more for years. Lamp oil is used up and nothing is left.",
        "Eine Hafenmauer hilft Finn viele Jahre, mehr zu verdienen. Lampenöl ist aufgebraucht und nichts bleibt.",
        "Mur w porcie pomaga Finnowi zarabiać więcej przez lata. Olej do lamp się zużywa i nic nie zostaje.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <rect
            x="20"
            y="20"
            width="290"
            height="240"
            rx="20"
            fill="none"
            stroke={INK}
            strokeWidth="4"
          />
          <rect
            x="330"
            y="20"
            width="290"
            height="240"
            rx="20"
            fill="none"
            stroke={INK}
            strokeWidth="4"
            strokeDasharray="10 8"
          />
        </>
      )}
      {step >= 2 && (
        <>
          <Wish kind="wall" x={50} y={140} />
          <Villager who="Finn" x={150} y={50} size={90} />
        </>
      )}
      {step >= 3 && (
        <>
          <Arrow from={[240, 200]} to={[240, 150]} color="#2e7d32" />
          <Coin x={260} y={190} size={40} />
        </>
      )}
      {step >= 4 && (
        <>
          <Lamp x={420} y={60} />
          <Pop>
            <Coin x={520} y={90} size={44} />
            <NoSign x={510} y={80} size={64} />
          </Pop>
        </>
      )}
      {step >= 5 && (
        <>
          <Pop>
            <path
              d="M60 235 L85 255 L130 215"
              stroke="#2e7d32"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Pop>
          <Pop>
            <path
              d="M430 215 L470 255 M470 215 L430 255"
              stroke={RED}
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
          </Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: a limit line stops the debt. The flood exception. */
export function BrakeDiagram({ lang, step }: DiagramProps) {
  const heights = [40, 70, 100, 130, 160];
  return (
    <DiagramCanvas
      label={alt(
        "A limit line stops the debt from growing. In a flood the town may borrow more, with a plan to pay back.",
        "Eine Grenzlinie stoppt das Wachsen der Schulden. Bei einer Flut darf die Stadt mehr leihen, mit einem Plan zum Zurückzahlen.",
        "Linia limitu zatrzymuje wzrost długu. Przy powodzi miasteczko może pożyczyć więcej, z planem spłaty.",
        lang,
      )}
    >
      {step >= 1 &&
        heights.map((h, i) => (
          <Block key={i} x={30 + i * 75} y={250 - h} w={60} h={h} color="#8e6bbf" />
        ))}
      {step >= 2 && (
        <Pop>
          <path d="M10 120 H430" stroke={RED} strokeWidth="6" strokeDasharray="14 8" />
        </Pop>
      )}
      {step >= 3 && (
        <TermChip x={400} y={40} w={230}>
          {alt("Debt brake", "Schuldenbremse", "Hamulec zadłużenia", lang)}
        </TermChip>
      )}
      {step >= 4 && (
        <Pop>
          <path
            d="M450 215 q20 -22 40 0 t40 0 t40 0 M450 240 q20 -22 40 0 t40 0 t40 0"
            stroke="#2f7fb8"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
          />
        </Pop>
      )}
      {step >= 5 && (
        <Pop x={470} y={110}>
          <rect width="60" height="80" rx="6" fill="#fff" stroke={INK} strokeWidth="4" />
          <path d="M12 24 H48 M12 42 H48 M12 60 H34" stroke={INK} strokeWidth="4" />
        </Pop>
      )}
    </DiagramCanvas>
  );
}
