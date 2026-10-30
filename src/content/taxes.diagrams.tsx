import type { CSSProperties } from "react";
import { CAST, Villager } from "../components/cast";
import { Arrow, Bubble, DiagramCanvas, Label, Pop, TermChip } from "../components/diagram";
import { Bread, Coin, NoSign, Person, Shoe } from "../components/icons";
import type { DiagramProps } from "../lesson/types";
import { BallotBox, Cart, FireTruck, Hammer, Park, Pot, Road, Scale, School } from "./taxes.icons";

/** Animated diagrams for the Taxes lesson, one per story beat. `step` is how many taps so far. */

const alt = (en: string, de: string, lang: DiagramProps["lang"]) => (lang === "en" ? en : de);

const BIG: CSSProperties = { fontSize: 34 };

/** A road across the picture. `holes` marks potholes at the given x positions. */
function RoadStrip({ y, holes = [] }: { y: number; holes?: number[] }) {
  return (
    <Pop>
      <rect x="0" y={y} width="640" height="54" rx="10" fill="#5f6c75" />
      <path d={`M16 ${y + 27} H624`} stroke="#f4f1e8" strokeWidth="4" strokeDasharray="26 22" strokeLinecap="round" />
      {holes.map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={y + 30} rx="27" ry="12" fill="#434d54" />
          <ellipse cx={x} cy={y + 33} rx="23" ry="9" fill="#2a3238" />
        </g>
      ))}
    </Pop>
  );
}

/** Beat 1: the road is full of holes, Finn cannot fix it alone. */
export function RoadDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "The road is full of holes and a cart is stuck. Finn cannot fix it alone. Bea and Sam use the road too.",
        "Die Straße ist voller Löcher und ein Karren steckt fest. Finn kann sie nicht allein reparieren. Bea und Sam benutzen die Straße auch.",
        lang,
      )}
    >
      {step >= 1 && <RoadStrip y={196} holes={[80, 222, 400, 560]} />}
      {step >= 2 && (
        <Pop>
          <Cart x={178} y={128} size={90} />
        </Pop>
      )}
      {step >= 3 && <Villager who="Finn" x={26} y={34} size={110} mood={step >= 4 ? "sad" : "think"} />}
      {step >= 3 && (
        <Pop>
          <Hammer x={118} y={70} size={56} />
        </Pop>
      )}
      {step >= 4 && (
        <>
          <Arrow from={[320, 270]} to={[24, 270]} width={5} head={13} />
          <Arrow from={[320, 270]} to={[616, 270]} width={5} head={13} />
        </>
      )}
      {step >= 5 && (
        <>
          <Villager who="Bea" x={300} y={34} size={110} />
          <Villager who="Sam" x={500} y={34} size={110} />
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 2: a school, a fire brigade and a park. Nobody can build them alone. */
export function NeedsDiagram({ lang, step }: DiagramProps) {
  const cast = ["Finn", "Bea", "Sam", "Pim", "Pip"] as const;
  return (
    <DiagramCanvas
      label={alt(
        "A town needs a school, a fire brigade and a park. The whole town needs them.",
        "Eine Stadt braucht eine Schule, eine Feuerwehr und einen Park. Die ganze Stadt braucht sie.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Pop><School x={50} y={6} size={120} /></Pop>
          <Label x={110} y={150}>{alt("School", "Schule", lang)}</Label>
        </>
      )}
      {step >= 2 && (
        <>
          <Pop><FireTruck x={260} y={6} size={120} /></Pop>
          <Label x={320} y={150}>{alt("Fire brigade", "Feuerwehr", lang)}</Label>
        </>
      )}
      {step >= 3 && (
        <>
          <Pop><Park x={470} y={6} size={120} /></Pop>
          <Label x={530} y={150}>{alt("Park", "Park", lang)}</Label>
        </>
      )}
      {step >= 4 &&
        cast.map((who, i) => <Villager key={who} who={who} x={52 + i * 118} y={176} size={86} name="" />)}
    </DiagramCanvas>
  );
}

/** Beat 3: Moss is the mayor, everybody pays into the pot, the coins are taxes. */
export function PotDiagram({ lang, step }: DiagramProps) {
  const payers = ["Finn", "Bea", "Sam"] as const;
  const items = [Road, School, FireTruck, Park];
  return (
    <DiagramCanvas
      label={alt(
        "Mayor Moss. Everybody puts coins into one pot. These coins are called taxes. Moss pays for the road, the school, the fire brigade and the park.",
        "Bürgermeister Moss. Alle legen Münzen in einen Topf. Diese Münzen heißen Steuern. Moss bezahlt die Straße, die Schule, die Feuerwehr und den Park.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Moss" x={20} y={14} size={110} />
          <TermChip x={152} y={34} w={210}>{alt("mayor", "Bürgermeister", lang)}</TermChip>
        </>
      )}
      {step >= 2 && (
        <>
          {payers.map((who, i) => (
            <Pop key={who} x={396 + i * 80} y={8}>
              <Person {...CAST[who]} size={72} />
            </Pop>
          ))}
          <Pop><Pot x={470} y={120} size={118} heap={2} /></Pop>
          {payers.map((who, i) => {
            const from: [number, number] = [432 + i * 80, 86];
            const to: [number, number] = [500 + i * 30, 146];
            return (
              <g key={`a${who}`}>
                <Arrow from={from} to={to} width={5} head={12} />
                <Pop><Coin x={(from[0] + to[0]) / 2 - 13} y={(from[1] + to[1]) / 2 - 13} size={26} /></Pop>
              </g>
            );
          })}
        </>
      )}
      {step >= 3 && <TermChip x={196} y={112} w={190}>{alt("taxes", "Steuern", lang)}</TermChip>}
      {step >= 4 && (
        <>
          <Arrow from={[460, 232]} to={[366, 232]} width={5} head={13} />
          {items.map((Icon, i) => (
            <Pop key={i}><Icon x={14 + i * 84} y={196} size={68} /></Pop>
          ))}
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 4: taxes are not a price per use; everybody shares the cost. */
export function ShareDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Nobody pays coins each time they use the road. Everybody shares the cost through the pot.",
        "Niemand zahlt jedes Mal Münzen für die Straße. Alle teilen sich die Kosten durch den Topf.",
        lang,
      )}
    >
      <Pop>
        <rect x="0" y="196" width="640" height="54" rx="10" fill="#5f6c75" />
        <path d="M16 223 H624" stroke="#f4f1e8" strokeWidth="4" strokeDasharray="26 22" strokeLinecap="round" />
      </Pop>
      {step >= 1 && (
        <>
          <Villager who="Finn" x={30} y={104} size={90} name="" />
          <Bubble x={64} y={4} w={140} h={68} tail="bottom-left">
            <Coin x={38} y={9} size={50} />
            <NoSign x={38} y={9} size={50} />
          </Bubble>
        </>
      )}
      {step >= 2 && (
        <>
          <Pop><Pot x={300} y={2} size={100} heap={2} /></Pop>
          <Arrow from={[350, 106]} to={[350, 188]} width={6} />
          <Villager who="Bea" x={170} y={104} size={90} name="" />
          <Villager who="Sam" x={420} y={104} size={90} name="" />
          <Villager who="Pim" x={530} y={104} size={90} name="" />
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 5: Finn earns 10 and puts in 2, Bea earns 20 and puts in 4. */
export function EarnDiagram({ lang, step }: DiagramProps) {
  const row = (who: "Finn" | "Bea", y: number, earn: number) => (
    <>
      <Villager who={who} x={8} y={y} size={80} name={who} />
      <Pop><Coin x={116} y={y + 12} size={54} /></Pop>
      <Pop><text className="diagram-name" x="178" y={y + 52} style={BIG}>{earn}</text></Pop>
    </>
  );
  const coins = (y: number, n: number) =>
    Array.from({ length: n }, (_, i) => (
      <Pop key={i}><Coin x={314 + i * 42} y={y + 17} size={38} /></Pop>
    ));
  return (
    <DiagramCanvas
      label={alt(
        "Finn earns 10 coins and puts in 2. Bea earns 20 coins and puts in 4. Whoever earns more puts in more.",
        "Finn verdient 10 Münzen und zahlt 2 ein. Bea verdient 20 Münzen und zahlt 4 ein. Wer mehr verdient, zahlt mehr.",
        lang,
      )}
    >
      {step >= 1 && row("Finn", 8, 10)}
      {step >= 2 && (
        <>
          <Arrow from={[232, 56]} to={[302, 56]} width={5} head={13} />
          {coins(36, 2)}
          <Arrow from={[410, 66]} to={[548, 116]} width={5} head={13} />
        </>
      )}
      {step >= 3 && (
        <>
          {row("Bea", 148, 20)}
          <Arrow from={[232, 196]} to={[302, 196]} width={5} head={13} />
          {coins(176, 4)}
          <Arrow from={[490, 196]} to={[552, 170]} width={5} head={13} />
        </>
      )}
      {(step >= 2) && (
        <Pop><Pot x={540} y={104} size={96} heap={step >= 3 ? 3 : 1} /></Pop>
      )}
      {step >= 4 && (
        <Pop x={230} y={104}>
          <rect width="150" height="46" rx="23" fill="#1b8a9a" />
          <text className="chip-text" x="75" y="33" textAnchor="middle">4 &gt; 2</text>
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: a pot that is too small, a pot that is too big, and the right amount in the middle. */
export function BalanceDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Too small a pot cannot pay for the road and the school. Too big a pot leaves people too few coins for bread and shoes. Moss looks for the right amount.",
        "Ein zu kleiner Topf reicht nicht für Straße und Schule. Ein zu großer Topf lässt den Leuten zu wenige Münzen für Brot und Schuhe. Moss sucht die richtige Menge.",
        lang,
      )}
    >
      {step >= 1 && (
        <Villager who="Moss" x={268} y={142} size={96} mood={step >= 4 ? "happy" : "think"} name="Moss" />
      )}
      {step >= 2 && (
        <>
          <Pop><Pot x={80} y={36} size={84} heap={1} /></Pop>
          <Pop><Road x={26} y={150} size={80} holes /></Pop>
          <Pop><School x={126} y={150} size={80} /></Pop>
          <Pop><NoSign x={26} y={150} size={80} /></Pop>
          <Pop><NoSign x={126} y={150} size={80} /></Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Pop><Pot x={452} y={0} size={140} heap={3} /></Pop>
          <Pop><Bread x={414} y={150} size={80} /></Pop>
          <Pop><Shoe x={514} y={150} size={80} /></Pop>
          <Pop><NoSign x={414} y={150} size={80} /></Pop>
          <Pop><NoSign x={514} y={150} size={80} /></Pop>
        </>
      )}
      {step >= 4 && <Pop><Scale x={268} y={12} size={104} /></Pop>}
    </DiagramCanvas>
  );
}

/** Beat 7: the town votes for the mayor and the council; now try the board. */
export function VoteDiagram({ lang, step }: DiagramProps) {
  const crowd = ["Finn", "Bea", "Sam", "Pim", "Pip"] as const;
  return (
    <DiagramCanvas
      label={alt(
        "The people of the town vote for the mayor and the council. Now it is your turn to try the tax board.",
        "Die Leute der Stadt wählen den Bürgermeister und den Rat. Jetzt bist du dran, die Steuer-Tafel auszuprobieren.",
        lang,
      )}
    >
      {step < 4 && (
        <>
          {step >= 1 && (
            <>
              <Villager who="Moss" x={262} y={16} size={100} />
              {crowd.map((who, i) => (
                <Villager key={who} who={who} x={52 + i * 118} y={190} size={70} name="" />
              ))}
            </>
          )}
          {step >= 2 && (
            <>
              <TermChip x={8} y={4} w={176}>{alt("vote", "wählen", lang)}</TermChip>
              <Pop><BallotBox x={40} y={60} size={110} /></Pop>
              <Arrow from={[87, 188]} to={[87, 152]} width={5} head={12} />
            </>
          )}
          {step >= 3 && (
            <>
              <Arrow from={[158, 108]} to={[250, 80]} width={5} head={13} />
              <Villager who="Pim" x={404} y={16} size={100} name="" />
              <Villager who="Pip" x={504} y={16} size={100} name="" />
              <Label x={504} y={148}>{alt("council", "Rat", lang)}</Label>
            </>
          )}
        </>
      )}
      {step >= 4 && (
        <>
          <Villager who="Moss" x={50} y={64} size={130} />
          <Pop>
            <rect x="244" y="22" width="372" height="236" rx="22" fill="#fff" stroke="#23383f" strokeWidth="5" />
            {[Road, School, FireTruck, Park].map((Icon, i) => (
              <Icon key={i} x={262 + i * 88} y={40} size={72} />
            ))}
            <rect x="268" y="176" width="324" height="12" rx="6" fill="#d9e2e4" />
            <rect x="268" y="176" width="150" height="12" rx="6" fill="#f08a2e" />
            <circle cx="418" cy="182" r="20" fill="#f08a2e" stroke="#23383f" strokeWidth="4" />
            <Pot x={268} y={196} size={50} heap={2} />
            <Coin x={340} y={206} size={32} />
            <Coin x={376} y={206} size={32} />
            <Coin x={412} y={206} size={32} />
          </Pop>
        </>
      )}
    </DiagramCanvas>
  );
}
