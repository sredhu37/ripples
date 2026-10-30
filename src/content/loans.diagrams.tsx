import { CAST, Villager } from "../components/cast";
import { Arrow, Bubble, DiagramCanvas, Pop, TermChip } from "../components/diagram";
import { Bread, Clock, Coin, NoSign, Person, Tag } from "../components/icons";
import type { DiagramProps } from "../lesson/types";
import { Coat, DownTrend, Jar, Oven, Plus, Tick, Warning } from "./loans.icons";

/** Animated diagrams for the Loans lesson, one per story beat. `step` is how many taps so far. */

const alt = (en: string, de: string, lang: DiagramProps["lang"]) => (lang === "en" ? en : de);

/** A number written next to an icon. */
function Num({ x, y, children, anchor = "start" }: { x: number; y: number; children: string | number; anchor?: "start" | "middle" | "end" }) {
  return (
    <text className="diagram-name" x={x} y={y} textAnchor={anchor} style={{ fontSize: 28 }}>
      {children}
    </text>
  );
}

/** Beat 1: Bea, her tiny oven, a few loaves, and people who want more bread. */
export function TinyOvenDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Bea the baker has a tiny oven that bakes only a few loaves. Finn and Sam want more bread.",
        "Bäckerin Bea hat einen winzigen Ofen, der nur ein paar Brote backt. Finn und Sam wollen mehr Brot.",
        lang,
      )}
    >
      {step >= 1 && <Villager who="Bea" x={20} />}
      {step >= 2 && (
        <Pop>
          <Oven x={190} y={150} size={84} />
        </Pop>
      )}
      {step >= 3 && (
        <>
          <Pop><Bread x={290} y={170} size={52} /></Pop>
          <Pop><Bread x={340} y={170} size={52} /></Pop>
        </>
      )}
      {step >= 4 && (
        <>
          <Villager who="Finn" x={440} y={110} size={90} />
          <Villager who="Sam" x={540} y={110} size={90} />
          <Bubble x={430} y={10} w={92} h={62} thought tail="bottom-left">
            <Bread x={18} y={4} size={54} />
          </Bubble>
          <Bubble x={530} y={10} w={92} h={62} thought tail="bottom-left">
            <Bread x={18} y={4} size={54} />
          </Bubble>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 2: Bea dreams of a big oven. It costs 40 coins. She has 5. */
export function BigOvenDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Bea dreams of a big oven that bakes lots of bread. It costs 40 coins, but Bea has only 5.",
        "Bea träumt von einem großen Ofen, der viel Brot backt. Er kostet 40 Münzen, aber Bea hat nur 5.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Bea" x={20} mood={step >= 4 ? "sad" : "think"} />
          {step < 2 && (
            <Bubble x={90} y={2} w={110} h={72} thought tail="bottom-left">
              <Oven x={18} y={4} size={64} />
            </Bubble>
          )}
        </>
      )}
      {step >= 2 && (
        <>
          <Pop><Oven x={250} y={40} size={150} /></Pop>
          {[0, 1, 2, 3].map((i) => (
            <Pop key={i}><Bread x={232 + i * 46} y={204} size={46} /></Pop>
          ))}
        </>
      )}
      {step >= 3 && (
        <Pop x={450} y={60}>
          <Tag size={150}>
            <Coin x={44} y={18} size={38} />
            <text x="62" y="73" textAnchor="middle" fontSize="26" fontWeight="800" fill="#23383f">40</text>
          </Tag>
        </Pop>
      )}
      {step >= 4 && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <Pop key={i}><Coin x={146 + (i % 3) * 30} y={176 - Math.floor(i / 3) * 30} size={34} /></Pop>
          ))}
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 3: Pim lends 40 coins. Borrowing and the loan. */
export function LoanDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Pim has a jar of coins and lends 40 coins to Bea. This is called borrowing, and what Bea gets is a loan.",
        "Pim hat ein Glas mit Münzen und leiht Bea 40 Münzen. Das nennt man leihen, und was Bea bekommt, ist ein Darlehen.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Pim" x={20} y={80} size={120} />
          <Pop><Jar x={160} y={150} size={84} /></Pop>
        </>
      )}
      {step >= 2 && (
        <>
          <Villager who="Bea" x={500} y={80} size={120} />
          <Bubble x={30} y={0} w={140} h={64} tail="bottom-left">
            <Coin x={14} y={6} size={50} />
            <text x="82" y="44" fontSize="30" fontWeight="800" fill="#23383f">40</text>
          </Bubble>
        </>
      )}
      {step >= 3 && (
        <>
          <Arrow from={[170, 130]} to={[490, 130]} />
          {[0, 1, 2].map((i) => (
            <Pop key={i}><Coin x={254 + i * 52} y={66} size={46} /></Pop>
          ))}
          <TermChip x={230} y={8} w={190}>{alt("borrow", "leihen", lang)}</TermChip>
        </>
      )}
      {step >= 4 && <TermChip x={265} y={200} w={200}>{alt("loan", "Darlehen", lang)}</TermChip>}
    </DiagramCanvas>
  );
}

/** Beat 4: Bea buys the big oven and sells lots of bread. */
export function BuyOvenDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Bea pays 40 coins for the big oven, bakes lots of bread and sells it for coins.",
        "Bea bezahlt 40 Münzen für den großen Ofen, backt viel Brot und verkauft es für Münzen.",
        lang,
      )}
    >
      <Villager who="Bea" x={10} y={90} size={110} mood="happy" />
      {step >= 1 && (
        <>
          <Pop><Coin x={126} y={54} size={46} /></Pop>
          <Num x={178} y={88}>40</Num>
          <Arrow from={[128, 124]} to={[212, 124]} />
          <Pop><Oven x={218} y={70} size={130} /></Pop>
        </>
      )}
      {step >= 2 && (
        <>
          {[0, 1].map((r) =>
            [0, 1].map((c) => (
              <Pop key={`${r}${c}`}><Bread x={346 + c * 52} y={92 + r * 56} size={50} /></Pop>
            )),
          )}
        </>
      )}
      {step >= 3 && (
        <>
          <Villager who="Finn" x={540} y={110} size={90} />
          <Arrow from={[456, 140]} to={[526, 140]} color="#1b8a9a" />
          <Bubble x={500} y={10} w={116} h={60} tail="bottom-right">
            <Coin x={12} y={8} size={42} />
            <Coin x={60} y={8} size={42} />
          </Bubble>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 5: Bea pays coins back to Pim every week. */
export function PayBackDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Every week Bea pays some coins from her bread money back to Pim, little by little.",
        "Jede Woche zahlt Bea ein paar Münzen von ihrem Brotgeld an Pim zurück, nach und nach.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Bea" x={20} y={80} size={120} />
          <Villager who="Pim" x={500} y={80} size={120} />
          <Arrow from={[160, 130]} to={[490, 130]} />
          <Pop><Coin x={258} y={70} size={42} /></Pop>
          <Pop><Coin x={314} y={70} size={42} /></Pop>
          <Pop><Clock x={392} y={62} size={54} /></Pop>
        </>
      )}
      {step >= 2 && (
        <Bubble x={40} y={0} w={150} h={52} thought tail="bottom-left">
          <Bread x={14} y={2} size={46} />
          <Arrow from={[68, 26]} to={[92, 26]} width={4} head={9} />
          <Coin x={98} y={4} size={44} />
        </Bubble>
      )}
      {step >= 3 && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <Pop key={i} x={190 + i * 58} y={196}>
              <rect width="50" height="62" rx="10" fill="#fff" stroke="#23383f" strokeWidth="3.5" />
              <rect width="50" height="16" rx="8" fill="#1b8a9a" />
              <Coin x={7} y={20} size={36} />
            </Pop>
          ))}
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: three reasons why Pim wants a bit more back. */
export function ReasonsDiagram({ lang, step }: DiagramProps) {
  const badge = (x: number, n: number) => (
    <g>
      <circle cx={x} cy={44} r={20} fill="#1b8a9a" />
      <text x={x} y={53} textAnchor="middle" className="chip-text" style={{ fontSize: 24 }}>{n}</text>
    </g>
  );
  const panel = (x: number) => <rect x={x} y={20} width={140} height={244} rx={22} fill="#fff" stroke="#23383f" strokeWidth="3.5" />;
  return (
    <DiagramCanvas
      label={alt(
        "Three reasons for the extra: Pim has to wait, Bea might not be able to pay, and Pim could have used the coins herself.",
        "Drei Gründe für das Extra: Pim muss warten, Bea kann vielleicht nicht zahlen, und Pim hätte die Münzen selbst nutzen können.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Pim" x={14} y={80} size={120} mood="think" />
          <Bubble x={24} y={0} w={126} h={58} thought tail="bottom-left">
            <Coin x={10} y={6} size={46} />
            <text x="60" y="42" fontSize="28" fontWeight="800" fill="#23383f">40+</text>
          </Bubble>
        </>
      )}
      {step >= 2 && (
        <Pop>
          {panel(170)}
          {badge(240, 1)}
          <Clock x={196} y={84} size={88} />
          <Coin x={186} y={190} size={40} />
          <Coin x={236} y={190} size={40} />
        </Pop>
      )}
      {step >= 3 && (
        <Pop>
          {panel(325)}
          {badge(395, 2)}
          <Person {...CAST.Bea} mood="sad" x={336} y={84} size={70} />
          <Coin x={412} y={104} size={44} />
          <NoSign x={406} y={98} size={56} />
          <TermChip x={335} y={196} w={120}>{alt("risk", "Risiko", lang)}</TermChip>
        </Pop>
      )}
      {step >= 4 && (
        <Pop>
          {panel(480)}
          {badge(550, 3)}
          <Coat x={506} y={84} size={88} />
          <Coin x={526} y={190} size={44} />
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 7: Bea pays back the 40 coins plus a little extra. */
export function ExtraDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Bea pays back the 40 coins she borrowed plus a few extra coins. The extra is the price of the loan.",
        "Bea zahlt die 40 geliehenen Münzen plus ein paar Extra-Münzen zurück. Das Extra ist der Preis für das Darlehen.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Pim" x={500} y={80} size={120} />
          <Villager who="Bea" x={20} y={80} size={120} />
          {step === 1 && (
          <Bubble x={400} y={0} w={92} h={56} tail="bottom-right">
            <Plus x={8} y={10} size={34} />
            <Coin x={44} y={7} size={40} />
          </Bubble>
          )}
        </>
      )}
      {step >= 2 && (
        <>
          <Arrow from={[160, 150]} to={[490, 150]} />
          <Pop><Coin x={200} y={44} size={52} /></Pop>
          <Num x={262} y={82}>40</Num>
          <Pop><Plus x={300} y={54} size={34} /></Pop>
          <Pop><Coin x={346} y={48} size={44} /></Pop>
          <Pop><Coin x={394} y={48} size={44} /></Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Pop>
            <rect x="334" y="34" width="116" height="74" rx="37" fill="none" stroke="#f08a2e" strokeWidth="5" strokeDasharray="12 8" />
          </Pop>
          <Pop x={316} y={160}>
            <Tag size={130}>
              <Plus x={34} y={32} size={22} />
              <Coin x={58} y={30} size={28} />
            </Tag>
          </Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 8: careful, bread can sell badly but the payments stay the same. */
export function CarefulDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Careful: when bread sells badly Bea still has to pay. Big weekly payments are too much for small bread sales. Borrow only what you can pay back.",
        "Vorsicht: Wenn sich das Brot schlecht verkauft, muss Bea trotzdem zahlen. Große Zahlungen pro Woche sind zu viel für kleinen Brotverkauf. Leih dir nur, was du zurückzahlen kannst.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Bea" x={20} y={80} size={120} mood="sad" />
          <Pop><Warning x={170} y={40} size={84} /></Pop>
          <Pop><Bread x={170} y={150} size={60} /></Pop>
          <Pop><DownTrend x={236} y={154} size={52} /></Pop>
        </>
      )}
      {step >= 2 && (
        <Pop>
          <Coin x={290} y={6} size={50} />
          <rect x="290" y="62" width="60" height="170" rx="10" fill="#f08a2e" />
          <Bread x={360} y={116} size={50} />
          <rect x="360" y="172" width="60" height="60" rx="10" fill="#4fa75a" />
        </Pop>
      )}
      {step >= 3 && (
        <Pop>
          <Tick x={494} y={40} size={64} />
          <Coin x={470} y={134} size={50} />
          <rect x="470" y="190" width="60" height="42" rx="10" fill="#f08a2e" />
          <Bread x={540} y={116} size={50} />
          <rect x="540" y="172" width="60" height="60" rx="10" fill="#4fa75a" />
        </Pop>
      )}
    </DiagramCanvas>
  );
}
