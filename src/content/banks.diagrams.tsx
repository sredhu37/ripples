import { CAST, Villager } from "../components/cast";
import { Arrow, Bubble, DiagramCanvas, Pop, TermChip } from "../components/diagram";
import { Coin, NoSign, Person, Tag } from "../components/icons";
import type { DiagramProps } from "../lesson/types";
import { BankBuilding, Bed, Card, Cat, Door, Ledger, Oven, Question, Safe, Shield } from "./banks.icons";

/** Animated diagrams for the Banks lesson, one per story beat. `step` is how many taps so far. */

const alt = (en: string, de: string, lang: DiagramProps["lang"]) => (lang === "en" ? en : de);

const numStyle = { font: "800 30px ui-rounded, 'SF Pro Rounded', Nunito, system-ui, sans-serif" } as const;

/** Beat 1: Finn hides coins under his bed. Is that safe? */
export function BedDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Finn hides spare coins under his bed. A cat sits nearby. A bed is not a safe place.",
        "Finn versteckt übrige Münzen unter seinem Bett. Eine Katze sitzt in der Nähe. Ein Bett ist kein sicherer Ort.",
        lang,
      )}
    >
      {step >= 1 && <Villager who="Finn" x={20} mood={step >= 3 ? "think" : "happy"} />}
      {step === 1 && (
        <>
          <Pop><Coin x={170} y={168} size={46} /></Pop>
          <Pop><Coin x={224} y={168} size={46} /></Pop>
          <Pop><Coin x={278} y={168} size={46} /></Pop>
        </>
      )}
      {step >= 2 && (
        <>
          <Pop x={360} y={70}><Bed size={200} /></Pop>
          <Pop><Coin x={412} y={216} size={34} /></Pop>
          <Pop><Coin x={448} y={216} size={34} /></Pop>
          <Pop><Coin x={484} y={216} size={34} /></Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Pop><Cat x={552} y={150} size={84} /></Pop>
          <Bubble x={44} y={8} w={112} h={66} thought tail="bottom-left">
            <Question x={26} y={0} size={66} />
          </Bubble>
        </>
      )}
      {step >= 4 && <Pop><NoSign x={420} y={120} size={100} /></Pop>}
    </DiagramCanvas>
  );
}

/** Beat 2: Bea wants an oven that costs 4 coins and has to borrow them. */
export function OvenDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Bea wants a new oven that costs 4 coins. She has to borrow them, but who has coins to spare?",
        "Bea möchte einen neuen Ofen, der 4 Münzen kostet. Sie muss sie sich leihen, aber wer hat Münzen übrig?",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Bea" x={20} mood="think" />
          <Bubble x={44} y={8} w={112} h={66} thought tail="bottom-left">
            <Oven x={28} y={4} size={58} lit />
          </Bubble>
        </>
      )}
      {step >= 2 && (
        <>
          <Pop x={196} y={92}>
            <Tag size={130}>
              <text x="60" y="62" textAnchor="middle" fill="#23383f" style={{ font: "800 30px ui-rounded, 'SF Pro Rounded', Nunito, system-ui, sans-serif" }}>
                4
              </text>
            </Tag>
          </Pop>
          <Pop><Coin x={336} y={114} size={66} /></Pop>
        </>
      )}
      {step >= 3 && (
        <>
          {[410, 480, 550].map((x) => (
            <Pop key={x} x={x} y={90}>
              <Door size={90} />
              <Question x={21} y={37} size={48} color="#fff" />
            </Pop>
          ))}
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 3: the bank, the deposit, and the notebook of whose coins are whose. */
export function DepositDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Finn makes a deposit: he brings his coins to the bank, and the bank writes down that they are Finn's.",
        "Finn macht eine Einzahlung: Er bringt seine Münzen zur Bank, und die Bank schreibt auf, dass sie Finn gehören.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Pop x={430} y={54}><BankBuilding size={190} /></Pop>
          <TermChip x={430} y={0} w={190}>{alt("bank", "Bank", lang)}</TermChip>
        </>
      )}
      {step >= 2 && (
        <>
          <Villager who="Finn" x={10} />
          <Pop><Coin x={205} y={112} size={44} /></Pop>
          <Pop><Coin x={255} y={112} size={44} /></Pop>
          <Pop><Coin x={305} y={112} size={44} /></Pop>
          <Arrow from={[155, 170]} to={[415, 170]} />
        </>
      )}
      {step >= 3 && <TermChip x={165} y={196} w={250}>{alt("deposit", "Einzahlung", lang)}</TermChip>}
      {step >= 4 && (
        <Bubble x={215} y={2} w={190} h={78} tail="bottom-right">
          <Ledger x={20} y={8} size={62} />
          <Person {...CAST.Finn} x={112} y={6} size={64} />
        </Bubble>
      )}
    </DiagramCanvas>
  );
}

/** Beat 4: Bea borrows saved coins from the bank, buys the oven, pays back later. */
export function LendDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Bea asks the bank for 4 coins. The bank lends her some of the saved coins. She buys her oven and pays the coins back later.",
        "Bea bittet die Bank um 4 Münzen. Die Bank leiht ihr einige der gesparten Münzen. Sie kauft ihren Ofen und zahlt die Münzen später zurück.",
        lang,
      )}
    >
      <Pop x={16} y={26}><BankBuilding size={190} /></Pop>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Pop key={i}><Coin x={22 + i * 32} y={226} size={30} /></Pop>
      ))}
      {step >= 1 && (
        <>
          <Villager who="Bea" x={490} y={100} size={120} />
          {step < 3 && (
            <Bubble x={420} y={4} w={200} h={74} tail="bottom-right">
              {[0, 1, 2, 3].map((i) => (
                <Coin key={i} x={14 + i * 42} y={18} size={38} />
              ))}
            </Bubble>
          )}
        </>
      )}
      {step >= 2 && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <Pop key={i}><Coin x={254 + i * 46} y={90} size={40} /></Pop>
          ))}
          <Arrow from={[222, 150]} to={[470, 150]} />
        </>
      )}
      {step >= 3 && <Pop><Oven x={500} y={0} size={96} lit /></Pop>}
      {step >= 4 && (
        <>
          <Arrow from={[470, 204]} to={[222, 204]} color="#1b8a9a" />
          {[0, 1, 2, 3].map((i) => (
            <Pop key={i}><Coin x={254 + i * 46} y={218} size={40} /></Pop>
          ))}
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 5: savers may ask any day, so the bank keeps coins ready in its safe. */
export function ReadyDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Finn may ask for his coins on any day. The bank keeps some coins ready in its safe, so it can hand them back.",
        "Finn kann an jedem Tag nach seinen Münzen fragen. Die Bank hält einige Münzen im Tresor bereit und kann sie zurückgeben.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Finn" x={10} mood={step >= 3 ? "happy" : "think"} />
          <Bubble x={44} y={4} w={112} h={66} tail="bottom-left">
            <Coin x={34} y={10} size={44} />
          </Bubble>
        </>
      )}
      {step >= 2 && (
        <>
          <Pop x={300} y={46}><BankBuilding size={190} /></Pop>
          <Pop x={500} y={110}><Safe size={124} /></Pop>
          <Pop><Coin x={506} y={70} size={36} /></Pop>
          <Pop><Coin x={546} y={70} size={36} /></Pop>
          <Pop><Coin x={586} y={70} size={36} /></Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Arrow from={[290, 196]} to={[165, 196]} />
          <Pop><Coin x={196} y={140} size={46} /></Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: many savers come at once. That is a bank run. */
export function RunDiagram({ lang, step }: DiagramProps) {
  const queue: Array<keyof typeof CAST> = ["Pim", "Pip", "Sam", "Finn"];
  return (
    <DiagramCanvas
      label={alt(
        "Many savers come to the bank on the same day, but some coins are with Bea. This is called a bank run.",
        "Viele Sparer kommen am selben Tag zur Bank, aber ein Teil der Münzen ist bei Bea. Das heißt Ansturm auf die Bank.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Pop x={330} y={70}><BankBuilding size={170} /></Pop>
          {queue.map((who, i) => (
            <Pop key={who} x={4 + i * 80} y={120}>
              <Person {...CAST[who]} mood={step >= 2 ? "sad" : "think"} size={84} />
            </Pop>
          ))}
        </>
      )}
      {step >= 2 && (
        <>
          <Villager who="Bea" x={530} y={110} size={100} name="" />
          <Pop><Coin x={518} y={218} size={34} /></Pop>
          <Pop><Coin x={554} y={218} size={34} /></Pop>
          <Pop><Coin x={590} y={218} size={34} /></Pop>
        </>
      )}
      {step >= 3 && <TermChip x={130} y={4} w={380}>{alt("bank run", "Ansturm auf die Bank", lang)}</TermChip>}
    </DiagramCanvas>
  );
}

/** Beat 7: the law protects savers' money. */
export function ProtectDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "In real life the law protects the money savers keep in a bank. This is called deposit protection.",
        "In echt schützt das Gesetz das Geld, das Sparer auf der Bank haben. Das heißt Einlagensicherung.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Finn" x={10} mood={step >= 3 ? "happy" : "think"} />
          <Pop x={430} y={54}><BankBuilding size={190} /></Pop>
          <Pop><Coin x={205} y={122} size={44} /></Pop>
          <Pop><Coin x={255} y={122} size={44} /></Pop>
          <Pop><Coin x={305} y={122} size={44} /></Pop>
          <Arrow from={[155, 182]} to={[415, 182]} />
        </>
      )}
      {step >= 2 && (
        <>
          <Pop x={276} y={4}><Shield size={104} /></Pop>
          <TermChip x={135} y={208} w={290}>{alt("deposit protection", "Einlagensicherung", lang)}</TermChip>
        </>
      )}
      {step >= 3 && (
        <Bubble x={44} y={4} w={118} h={70} thought tail="bottom-left">
          <Shield x={12} y={10} size={50} />
          <Coin x={68} y={14} size={42} />
        </Bubble>
      )}
    </DiagramCanvas>
  );
}

/** One small number tile: a person's head and a number that changes. */
function NumberTile({ x, who, from, to, step }: { x: number; who: keyof typeof CAST; from: number; to: number; step: number }) {
  return (
    <Pop x={x} y={198}>
      <rect width="170" height="64" rx="16" fill="#fff" stroke="#23383f" strokeWidth="4" />
      <Person {...CAST[who]} x={6} y={8} size={48} />
      {step >= 3 ? (
        <>
          <text x="84" y="42" textAnchor="middle" fill="#8a97a0" style={{ ...numStyle, textDecoration: "line-through" }}>{from}</text>
          <text x="118" y="42" textAnchor="middle" fill="#23383f" style={numStyle}>{"\u2192"}</text>
          <text x="152" y="42" textAnchor="middle" fill="#1b8a9a" style={numStyle}>{to}</text>
        </>
      ) : (
        <text x="118" y="42" textAnchor="middle" fill="#23383f" style={numStyle}>{from}</text>
      )}
    </Pop>
  );
}

/** Beat 8: Sam pays Bea with a card; the bank only changes numbers. */
export function CardDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Sam pays Bea with a card. No coins move. The bank changes numbers: Sam's goes down, Bea's goes up.",
        "Sam bezahlt Bea mit einer Karte. Es wandern keine Münzen. Die Bank ändert Zahlen: Sams wird kleiner, Beas wird größer.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Sam" x={10} y={60} size={110} />
          <Villager who="Bea" x={520} y={60} size={110} />
          <Arrow from={[135, 150]} to={[510, 150]} width={5} />
          <Pop><Card x={282} y={100} size={76} /></Pop>
        </>
      )}
      {step >= 2 && (
        <>
          <Pop x={265} y={0}><BankBuilding size={110} /></Pop>
          <Pop><Coin x={410} y={22} size={54} /></Pop>
          <Pop><NoSign x={410} y={22} size={54} /></Pop>
          <NumberTile x={145} who="Sam" from={10} to={8} step={step} />
          <NumberTile x={325} who="Bea" from={5} to={7} step={step} />
        </>
      )}
    </DiagramCanvas>
  );
}
