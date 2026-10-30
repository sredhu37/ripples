import type { ReactNode } from "react";
import { Counter, Villager } from "../components/cast";
import { Arrow, Bubble, DiagramCanvas, Pop, TermChip } from "../components/diagram";
import { Bread, Clock, Coin, Shoe, Tag } from "../components/icons";
import type { DiagramProps } from "../lesson/types";
import { Door, IceCream, Jar, Milk, Seller, Sugar, Trend, FALL, RISE } from "./inflation.icons";

/** Animated diagrams for the Inflation lesson, one per story beat. `step` is how many taps so far. */

const alt = (en: string, de: string, lang: DiagramProps["lang"]) => (lang === "en" ? en : de);

/** A price tag with 1 or 2 coins on it, or an arrow (a price that rises or falls). */
function PriceTag({ x, y, size = 100, coins, trend }: { x: number; y: number; size?: number; coins?: 1 | 2; trend?: ReactNode }) {
  return (
    <Pop x={x} y={y}>
      <Tag size={size}>
        {coins === 1 && <Coin x={46} y={33} size={34} />}
        {coins === 2 && (
          <>
            <Coin x={33} y={37} size={27} />
            <Coin x={62} y={37} size={27} />
          </>
        )}
        {trend}
      </Tag>
    </Pop>
  );
}

const upInTag = <Trend x={44} y={30} size={40} />;

/** Beat 1: Finn, the ice cream seller, last summer's price. */
export function LastSummerDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas label={alt("Finn loves ice cream. Last summer one scoop cost 1 coin.", "Finn liebt Eis. Letzten Sommer kostete eine Kugel 1 Münze.", lang)}>
      {step >= 1 && <Villager who="Finn" x={20} />}
      {step === 1 && (
        <Bubble x={60} y={8} w={110} h={66} thought tail="bottom-left">
          <IceCream x={26} y={4} size={58} />
        </Bubble>
      )}
      {step >= 2 && (
        <>
          <Seller x={490} />
          <Counter x={440} goods={[0, 1, 2].map((i) => <IceCream key={i} x={10 + i * 58} y={160} size={56} />)} />
        </>
      )}
      {step >= 3 && <PriceTag x={296} y={6} size={100} coins={1} />}
      {step >= 4 && (
        <>
          <Arrow from={[165, 156]} to={[420, 156]} />
          <Pop><Coin x={282} y={112} size={36} /></Pop>
          <Arrow from={[420, 232]} to={[165, 232]} />
          <Pop><IceCream x={274} y={178} size={46} /></Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 2: this summer a scoop costs 2 coins, so Finn's 1 coin buys half a scoop. */
export function TwoCoinsDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas label={alt("A scoop now costs 2 coins. Finn's 1 coin buys only half a scoop.", "Eine Kugel kostet jetzt 2 Münzen. Finns 1 Münze reicht nur für eine halbe Kugel.", lang)}>
      {step >= 1 && (
        <>
          <Seller x={490} />
          <Counter x={440} goods={[0, 1, 2].map((i) => <IceCream key={i} x={10 + i * 58} y={160} size={56} />)} />
          <PriceTag x={350} y={20} size={100} coins={2} />
        </>
      )}
      {step >= 2 && (
        <>
          <Villager who="Finn" x={20} mood={step >= 3 ? "sad" : "think"} />
          <Pop><Coin x={150} y={100} size={46} /></Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Arrow from={[205, 126]} to={[250, 126]} />
          <Pop><IceCream half x={258} y={84} size={84} /></Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 3: reason one, lots of people want ice cream but there is only so much. */
export function ManyWantDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas label={alt("Everybody wants ice cream, but the seller can only make so much, so the price rises.", "Alle wollen Eis, aber der Verkäufer kann nur so viel machen, also steigt der Preis.", lang)}>
      {step >= 1 && (
        <>
          <Bubble x={20} y={8} w={250} h={68} thought tail="bottom-left">
            {[0, 1, 2].map((i) => <IceCream key={i} x={28 + i * 72} y={6} size={56} />)}
          </Bubble>
          <Villager who="Finn" x={0} y={116} size={96} name="" />
          <Villager who="Bea" x={100} y={116} size={96} name="" />
          <Villager who="Sam" x={200} y={116} size={96} name="" />
        </>
      )}
      {step >= 2 && (
        <>
          <Seller x={500} y={114} size={100} />
          <Counter x={420} goods={[0, 1].map((i) => <IceCream key={i} x={10 + i * 58} y={160} size={56} />)} />
        </>
      )}
      {step >= 3 && (
        <>
          <PriceTag x={316} y={96} size={100} coins={2} />
          <Pop><Trend x={332} y={20} size={66} /></Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 4: reason two, milk and sugar cost the seller more. */
export function CostsDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas label={alt("Milk and sugar cost the seller more, so a scoop costs more too.", "Milch und Zucker kosten den Verkäufer mehr, also kostet auch eine Kugel mehr.", lang)}>
      {step >= 1 && (
        <>
          <Pop><Milk x={50} y={30} size={100} /></Pop>
          <Pop><Sugar x={170} y={30} size={100} /></Pop>
          <Arrow from={[290, 82]} to={[372, 82]} />
          <Pop><IceCream x={390} y={14} size={120} /></Pop>
        </>
      )}
      {step >= 2 && (
        <>
          <PriceTag x={50} y={156} size={100} trend={upInTag} />
          <PriceTag x={170} y={156} size={100} trend={upInTag} />
        </>
      )}
      {step >= 3 && (
        <>
          <PriceTag x={390} y={156} size={100} coins={2} />
          <Pop><Trend x={506} y={170} size={64} /></Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 5: more prices rise, this is inflation. */
export function InflationDiagram({ lang, step }: DiagramProps) {
  const word = alt("inflation", "Inflation", lang);
  return (
    <DiagramCanvas label={alt("Ice cream, bread and shoes all cost more. This is called inflation: the same coin buys less.", "Eis, Brot und Schuhe kosten alle mehr. Das heißt Inflation: Dieselbe Münze kauft weniger.", lang)}>
      {step >= 1 && (
        <>
          <Pop><IceCream x={100} y={26} size={96} /></Pop>
          <Pop><Bread x={272} y={28} size={96} /></Pop>
          <Pop><Shoe x={444} y={28} size={96} /></Pop>
          <PriceTag x={160} y={72} size={64} trend={<Trend x={42} y={26} size={48} />} />
          <PriceTag x={332} y={72} size={64} trend={<Trend x={42} y={26} size={48} />} />
          <PriceTag x={504} y={72} size={64} trend={<Trend x={42} y={26} size={48} />} />
        </>
      )}
      {step >= 2 && <TermChip x={200} y={140} w={240}>{word}</TermChip>}
      {step >= 3 && (
        <>
          <Pop><Coin x={186} y={204} size={60} /></Pop>
          <Arrow from={[262, 234]} to={[330, 234]} />
          <Pop><IceCream half x={346} y={194} size={76} /></Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

const fading = (list: number[], x0: number, y: number, size: number, gap: number, key: string) =>
  list.map((o, i) => (
    <Pop key={`${key}${i}`}><IceCream opacity={o} x={x0 + i * gap} y={y} size={size} /></Pop>
  ));

/** Beat 6: Sam still gets 10 coins; a little inflation is normal, a lot is hard. */
export function SamDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas label={alt("Sam gets 10 coins a day. With a little inflation they buy a bit less, with a lot they buy much less.", "Sam bekommt 10 Münzen am Tag. Bei ein bisschen Inflation kaufen sie etwas weniger, bei viel deutlich weniger.", lang)}>
      {step >= 1 && (
        <>
          <Villager who="Sam" x={10} y={70} size={110} />
          <Pop><Shoe x={124} y={140} size={52} /></Pop>
          {[0, 1].map((r) =>
            [0, 1, 2, 3, 4].map((c) => (
              <Pop key={`${r}${c}`}><Coin x={196 + c * 38} y={64 + r * 42} size={36} /></Pop>
            )),
          )}
        </>
      )}
      {step >= 2 && (
        <>
          <Arrow from={[390, 106]} to={[436, 106]} />
          {step === 2 && fading([1, 1, 1, 0.5], 446, 80, 42, 46, "a")}
          {step === 2 && <PriceTag x={496} y={150} size={72} trend={<Trend x={42} y={26} size={48} />} />}
        </>
      )}
      {step >= 3 && (
        <>
          {fading([1, 0.55, 0.28, 0.1], 446, 80, 42, 46, "b")}
          {[0, 1, 2].map((i) => (
            <PriceTag key={i} x={452 + i * 62} y={150} size={62} trend={<Trend x={42} y={26} size={48} />} />
          ))}
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 7: coins in a jar buy fewer scoops next year; interest must keep up with prices. */
export function JarDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas label={alt("Finn keeps 10 coins in a jar. If prices rise, next year they buy fewer scoops. Interest only helps if it is as big as the price rise.", "Finn hebt 10 Münzen in einem Glas auf. Steigen die Preise, kaufen sie nächstes Jahr weniger Kugeln. Zinsen helfen nur, wenn sie so groß sind wie der Preisanstieg.", lang)}>
      {step >= 1 && (
        <>
          <Villager who="Finn" x={10} y={100} size={110} />
          <Pop><Jar x={140} y={130} size={100} /></Pop>
          <Pop x={190} y={254}>
            <text className="diagram-name" textAnchor="middle">10</text>
          </Pop>
        </>
      )}
      {step >= 2 && (
        <>
          <Pop><Clock x={262} y={112} size={56} /></Pop>
          <Arrow from={[250, 196]} to={[330, 196]} />
          {[0, 1].map((r) =>
            [0, 1, 2, 3, 4].map((c) => (
              <Pop key={`${r}${c}`}>
                <IceCream opacity={r * 5 + c >= 7 ? 0.18 : 1} x={346 + c * 54} y={96 + r * 62} size={50} />
              </Pop>
            )),
          )}
        </>
      )}
      {step >= 3 && (
        <Bubble x={150} y={6} w={280} h={70} thought tail="bottom-left">
          <Coin x={16} y={14} size={42} />
          <Trend down={false} color={FALL} x={62} y={10} size={50} />
          <text x="140" y="46" textAnchor="middle" className="diagram-name">=</text>
          <Tag x={168} y={6} size={56} />
          <Trend x={222} y={10} size={50} color={RISE} />
        </Bubble>
      )}
    </DiagramCanvas>
  );
}

/** Beat 8: deflation, prices fall, shops earn less, workers may be let go. */
export function DeflationDiagram({ lang, step }: DiagramProps) {
  const word = alt("deflation", "Deflation", lang);
  return (
    <DiagramCanvas label={alt("Deflation: prices fall. Shops earn less and may let workers go.", "Deflation: Die Preise sinken. Läden verdienen weniger und müssen vielleicht Leute entlassen.", lang)}>
      {step >= 1 && (
        <>
          <TermChip x={200} y={4} w={240}>{word}</TermChip>
          <Pop><IceCream x={110} y={70} size={66} /></Pop>
          <Pop><Bread x={287} y={70} size={66} /></Pop>
          <Pop><Shoe x={464} y={70} size={66} /></Pop>
          <PriceTag x={160} y={100} size={52} trend={<Trend down x={42} y={26} size={48} />} />
          <PriceTag x={337} y={100} size={52} trend={<Trend down x={42} y={26} size={48} />} />
          <PriceTag x={514} y={100} size={52} trend={<Trend down x={42} y={26} size={48} />} />
        </>
      )}
      {step >= 2 && (
        <>
          <Seller x={20} y={152} size={100} mood="sad" />
          <Counter x={140} goods={<Coin x={20} y={168} size={44} />} />
        </>
      )}
      {step >= 3 && (
        <>
          <Villager who="Pip" x={380} y={152} size={100} mood="sad" name="" />
          <Arrow from={[490, 206]} to={[548, 206]} />
          <Pop><Door x={556} y={150} size={90} /></Pop>
        </>
      )}
    </DiagramCanvas>
  );
}
