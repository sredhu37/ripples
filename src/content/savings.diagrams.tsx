import { Villager } from "../components/cast";
import { Arrow, Bubble, DiagramCanvas, Pop, TermChip } from "../components/diagram";
import { Clock, Coin, NoSign, Person, Piggy, Swap, Tag } from "../components/icons";
import type { DiagramProps } from "../lesson/types";
import { Bike, BikePiggy, BrokenBoot, Calendar, Candy, CheckMark, RainCloud, RainyJar } from "./savings.icons";

/** Animated diagrams for the Savings lesson, one per story beat. `step` is how many taps so far. */

const alt = (en: string, de: string, lang: DiagramProps["lang"]) => (lang === "en" ? en : de);

const NUM_STYLE = { font: '800 34px ui-rounded, "SF Pro Rounded", "Nunito", system-ui, sans-serif', fill: "#23383f" } as const;
const SMALL_STYLE = { font: '700 17px ui-rounded, "SF Pro Rounded", "Nunito", system-ui, sans-serif', fill: "#ffffff" } as const;

/** Pip's dad: a fresh look, he only appears in this lesson. */
function Dad({ x, lang }: { x: number; lang: DiagramProps["lang"] }) {
  return (
    <Pop x={x} y={90}>
      <Person hat="none" shirt="#4a6fa5" skin="#d9a679" size={130} />
      <text className="diagram-name" x={65} y={160} textAnchor="middle">
        {alt("Dad", "Papa", lang)}
      </text>
    </Pop>
  );
}

/** A big question mark for a thought bubble. */
function Question({ x, y }: { x: number; y: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" style={{ font: '800 46px ui-rounded, "SF Pro Rounded", "Nunito", system-ui, sans-serif', fill: "#23383f" }}>
      ?
    </text>
  );
}

/** Beat 1: Pip gets pocket money from Dad every week. */
export function PocketMoneyDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Pip gets 4 coins from Dad every week. This is called pocket money.",
        "Pip bekommt jede Woche 4 Münzen von Papa. Das heißt Taschengeld.",
        lang,
      )}
    >
      {step >= 1 && <Villager who="Pip" x={20} />}
      {step >= 2 && (
        <>
          <Dad x={490} lang={lang} />
          <Pop><Calendar x={278} y={4} size={84} /></Pop>
          <Arrow from={[470, 120]} to={[180, 120]} />
          {[0, 1, 2, 3].map((i) => (
            <Pop key={i}><Coin x={206 + i * 60} y={140} size={52} /></Pop>
          ))}
        </>
      )}
      {step >= 3 && <TermChip x={200} y={222} w={240}>{alt("pocket money", "Taschengeld", lang)}</TermChip>}
      {step >= 4 && (
        <Bubble x={44} y={8} w={180} h={66} thought tail="bottom-left">
          <Candy x={8} y={10} size={46} />
          <Question x={98} y={50} />
          <Bike x={122} y={6} size={54} />
        </Bubble>
      )}
    </DiagramCanvas>
  );
}

/** Beat 2: the bike in the shop window costs 12 coins. That is the savings goal. */
export function BikeGoalDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "A red bike costs 12 coins. Pip has 4. The bike is Pip's savings goal.",
        "Ein rotes Fahrrad kostet 12 Münzen. Pip hat 4. Das Fahrrad ist Pips Sparziel.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Pip" x={20} mood={step >= 3 ? "sad" : "happy"} />
          <Pop>
            <rect x="330" y="40" width="280" height="196" rx="10" fill="#eaf4f7" stroke="#23383f" strokeWidth="6" />
            <path d="M322 40 L338 8 H602 L618 40 Z" fill="#d6403a" stroke="#23383f" strokeWidth="5" strokeLinejoin="round" />
            <g fill="#fff">
              <path d="M382 8 H426 L420 40 H376 Z" />
              <path d="M470 8 H514 L510 40 H464 Z" />
              <path d="M558 8 H602 L610 40 H552 Z" />
            </g>
            <Bike x={346} y={80} size={140} />
          </Pop>
        </>
      )}
      {step >= 2 && (
        <Pop x={490} y={116}>
          <Tag size={118}>
            <text x="62" y="60" textAnchor="middle" style={{ font: '800 26px ui-rounded, "SF Pro Rounded", "Nunito", system-ui, sans-serif', fill: "#23383f" }}>
              12
            </text>
          </Tag>
        </Pop>
      )}
      {step >= 3 && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <Pop key={i}><Coin x={196 + (i % 2) * 52} y={96 + Math.floor(i / 2) * 52} size={46} /></Pop>
          ))}
          <Pop>
            <rect x="176" y="206" width="136" height="46" rx="23" fill="#fff" stroke="#23383f" strokeWidth="4" />
            <text x="244" y="239" textAnchor="middle" style={NUM_STYLE}>
              4 {"<"} 12
            </text>
          </Pop>
        </>
      )}
      {step >= 4 && (
        <>
          <Pop>
            <rect x="322" y="2" width="296" height="240" rx="18" fill="none" stroke="#f08a2e" strokeWidth="5" strokeDasharray="12 9" />
          </Pop>
          <TermChip x={60} y={4} w={250}>{alt("savings goal", "Sparziel", lang)}</TermChip>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 3: spending all 4 coins on sweets means no bike. */
export function SweetsDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "If Pip spends all 4 coins on sweets, the coins are gone and the bike is no closer.",
        "Wenn Pip alle 4 Münzen für Süßes ausgibt, sind sie weg und das Fahrrad ist nicht näher.",
        lang,
      )}
    >
      <Villager who="Pip" x={20} mood={step >= 3 ? "sad" : "happy"} />
      {step === 1 && (
        <Bubble x={44} y={8} w={190} h={66} thought tail="bottom-left">
          {[0, 1, 2, 3].map((i) => (
            <Candy key={i} x={8 + i * 44} y={12} size={42} />
          ))}
        </Bubble>
      )}
      {step >= 2 && (
        <>
          {step === 2 && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <Pop key={i}><Coin x={180 + i * 52} y={150} size={46} /></Pop>
              ))}
              <Arrow from={[396, 174]} to={[470, 174]} />
            </>
          )}
          {[0, 1, 2, 3].map((i) => (
            <Pop key={i}><Candy x={476 + (i % 2) * 60} y={120 + Math.floor(i / 2) * 60} size={56} /></Pop>
          ))}
        </>
      )}
      {step >= 3 && (
        <Pop>
          <rect x="190" y="150" width="160" height="62" rx="31" fill="#fff" stroke="#23383f" strokeWidth="4" />
          <Coin x={202} y={158} size={46} />
          <text x="290" y="196" textAnchor="middle" style={NUM_STYLE}>
            0
          </text>
        </Pop>
      )}
      {step >= 4 && (
        <>
          <Pop x={200} y={20} ><g opacity="0.7"><Bike size={110} /></g></Pop>
          <Pop><NoSign x={200} y={20} size={110} /></Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 4: saving. 3 coins to the piggy bank, 1 coin for a sweet. */
export function SaveDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Pip puts 3 coins a week into the piggy bank and spends 1 coin on a sweet.",
        "Pip legt jede Woche 3 Münzen ins Sparschwein und gibt 1 Münze für Süßes aus.",
        lang,
      )}
    >
      <Villager who="Pip" x={20} mood={step === 2 ? "think" : "happy"} />
      {step >= 1 && <Pop><Piggy x={420} y={100} size={150} /></Pop>}
      {step === 2 && (
        <Bubble x={44} y={8} w={190} h={66} thought tail="bottom-left">
          <Candy x={8} y={12} size={46} />
          <Swap x={72} y={15} size={36} />
          <Bike x={118} y={8} size={56} />
        </Bubble>
      )}
      {step >= 3 && (
        <>
          {[0, 1, 2].map((i) => (
            <Pop key={i}><Coin x={190 + i * 56} y={90} size={48} /></Pop>
          ))}
          <Arrow from={[362, 114]} to={[420, 114]} />
          <Pop><Coin x={190} y={178} size={48} /></Pop>
          <Arrow from={[250, 202]} to={[318, 202]} />
          <Pop><Candy x={326} y={176} size={56} /></Pop>
        </>
      )}
      {step >= 4 && (
        <>
          <Pop><Clock x={546} y={18} size={72} /></Pop>
          {[0, 1].map((i) => (
            <Pop key={i}><Coin x={440 + i * 46} y={24} size={38} /></Pop>
          ))}
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 5: week by week the piggy bank fills up to 12 coins, and Pip buys the bike. */
export function WeeksDiagram({ lang, step }: DiagramProps) {
  const total = Math.min(step, 4) * 3;
  const week = alt("Week", "Woche", lang);
  return (
    <DiagramCanvas
      label={alt(
        "Week by week the piggy bank grows: 3, 6, 9, 12 coins. Then Pip can buy the bike.",
        "Woche für Woche wächst das Sparschwein: 3, 6, 9, 12 Münzen. Dann kann Pip das Fahrrad kaufen.",
        lang,
      )}
    >
      <Pop><Piggy x={20} y={20} size={150} /></Pop>
      <Pop key={total} x={20} y={186}>
        <rect width="150" height="64" rx="32" fill="#fff" stroke="#23383f" strokeWidth="4" />
        <Coin x={12} y={9} size={46} />
        <text x="100" y="45" textAnchor="middle" style={NUM_STYLE}>
          {total}
        </text>
      </Pop>
      {[0, 1, 2, 3].map(
        (i) =>
          step >= i + 1 && (
            <Pop key={i} x={192 + i * 84} y={36}>
              <rect width="76" height="196" rx="14" fill="#fff" stroke="#23383f" strokeWidth="4" />
              <rect x="4" y="8" width="68" height="28" rx="14" fill="#1b8a9a" />
              <text x="38" y="28" textAnchor="middle" style={SMALL_STYLE}>
                {week} {i + 1}
              </text>
              {[0, 1, 2].map((j) => (
                <Coin key={j} x={20} y={46 + j * 48} size={38} />
              ))}
            </Pop>
          ),
      )}
      {step >= 5 && (
        <>
          <Pop><Bike x={524} y={70} size={112} /></Pop>
          <Pop><CheckMark x={590} y={30} size={44} /></Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: rain, the boot breaks, 3 coins to fix it, the bike comes later. */
export function BootDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "It rains and Pip's boot breaks. Fixing it costs 3 coins. If they come from the bike savings, the bike comes later.",
        "Es regnet und Pips Stiefel geht kaputt. Die Reparatur kostet 3 Münzen. Kommen sie aus dem Fahrrad-Sparschwein, kommt das Fahrrad später.",
        lang,
      )}
    >
      <Villager who="Pip" x={20} mood={step >= 2 ? "sad" : "happy"} />
      {step >= 1 && <Pop><RainCloud x={150} y={2} size={130} /></Pop>}
      {step >= 2 && <Pop><BrokenBoot x={236} y={96} size={110} /></Pop>}
      {step >= 3 && (
        <>
          {[0, 1, 2].map((i) => (
            <Pop key={i}><Coin x={240 + i * 40} y={216} size={40} /></Pop>
          ))}
        </>
      )}
      {step >= 4 && (
        <>
          <Pop><Piggy x={440} y={108} size={140} /></Pop>
          <Arrow from={[446, 170]} to={[360, 170]} />
          <Pop><Bike x={470} y={2} size={84} /></Pop>
          <Pop><Clock x={560} y={8} size={72} /></Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 7: a second jar, only for surprises: the rainy-day jar. */
export function RainyJarDiagram({ lang, step }: DiagramProps) {
  const badge = (x: number, n: number) => (
    <Pop x={x} y={10}>
      <circle cx="0" cy="22" r="22" fill="#1b8a9a" />
      <text x="0" y="31" textAnchor="middle" className="chip-text">{n}</text>
    </Pop>
  );
  return (
    <DiagramCanvas
      label={alt(
        "Pip has two jars: a piggy bank for the bike and a rainy-day jar for surprises.",
        "Pip hat zwei Gläser: ein Sparschwein fürs Fahrrad und ein Regentag-Glas für Überraschungen.",
        lang,
      )}
    >
      {step >= 1 && <Pop><BikePiggy x={70} y={46} size={170} /></Pop>}
      {step >= 2 && <Pop><RainyJar x={400} y={46} size={170} /></Pop>}
      {step >= 3 && <TermChip x={350} y={226} w={270}>{alt("rainy-day jar", "Regentag-Glas", lang)}</TermChip>}
      {step >= 4 && (
        <>
          <Pop><Coin x={462} y={0} size={44} /></Pop>
          <Arrow from={[484, 50]} to={[484, 96]} width={5} head={14} />
        </>
      )}
      {step >= 5 && (
        <>
          {badge(84, 1)}
          {badge(420, 2)}
        </>
      )}
    </DiagramCanvas>
  );
}
