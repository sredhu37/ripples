import { Villager } from "../components/cast";
import { Arrow, Bubble, DiagramCanvas, Pop, TermChip } from "../components/diagram";
import { Bread, Clock, Coin, Magnifier, Person, Piggy, Shoe, Tag } from "../components/icons";
import type { DiagramProps } from "../lesson/types";
import {
  Banknote,
  BankBuilding,
  Calendar,
  Cart,
  Dial,
  DOWN_COLOR,
  Flame,
  House,
  RateArrow,
  Snowflake,
  Thermometer,
  TownScene,
  UP_COLOR,
  ZONE_COLOR,
} from "./rates.icons";

/** Animated diagrams for the Interest rates lesson, one per story beat. `step` is how many taps so far. */

const alt = (en: string, de: string, lang: DiagramProps["lang"]) => (lang === "en" ? en : de);

const SAVE_COLOR = "#5aa05f";

/** Beat 1: a busy town where prices rise, so the town is too hot. */
export function BusyTownDiagram({ lang, step }: DiagramProps) {
  const hot = step >= 4;
  return (
    <DiagramCanvas
      label={alt(
        "A busy town where everybody shops and bread and shoes cost more. The town is too hot.",
        "Eine belebte Stadt, in der alle einkaufen und Brot und Schuhe mehr kosten. Die Stadt ist zu heiß.",
        lang,
      )}
    >
      {step >= 1 && (
        <Pop>
          <TownScene zone={hot ? "hot" : "right"} scale={1.3} x={112} y={96} />
        </Pop>
      )}
      {step >= 2 && (
        <>
          <Villager who="Finn" x={168} y={150} size={88} name="" />
          <Pop x={254} y={190}>
            <Cart size={44} />
          </Pop>
          <Villager who="Pim" x={348} y={150} size={88} name="" />
          <Pop x={434} y={190}>
            <Cart size={44} />
          </Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Pop x={170} y={0}>
            <Tag size={96}>
              <Bread x={40} y={28} size={44} />
            </Tag>
          </Pop>
          <Pop x={262} y={14}>
            <RateArrow dir="up" size={52} />
          </Pop>
          <Pop x={350} y={0}>
            <Tag size={96}>
              <Shoe x={38} y={28} size={46} />
            </Tag>
          </Pop>
          <Pop x={442} y={14}>
            <RateArrow dir="up" size={52} />
          </Pop>
        </>
      )}
      {step >= 4 && (
        <Pop x={-14} y={90}>
          <Thermometer level={0.9} color={ZONE_COLOR.hot} size={140} />
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 2: banks have a bank of their own, the central bank. */
export function CentralBankDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "People use banks. Banks use the central bank, which also looks after the notes.",
        "Menschen nutzen Banken. Banken nutzen die Zentralbank, die sich auch um die Scheine kümmert.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Finn" x={10} y={120} size={100} name="" />
          <Pop x={112} y={128}>
            <Coin size={40} />
          </Pop>
          <Arrow from={[118, 195]} to={[172, 195]} />
          <Pop x={178} y={130}>
            <BankBuilding size={110} />
          </Pop>
        </>
      )}
      {step >= 2 && (
        <>
          <Pop x={178} y={8}>
            <BankBuilding size={100} />
          </Pop>
          <Pop x={390} y={36}>
            <BankBuilding central size={170} />
          </Pop>
          <Arrow from={[292, 180]} to={[386, 150]} />
          <Arrow from={[284, 60]} to={[386, 100]} />
        </>
      )}
      {step >= 3 && <TermChip x={350} y={224} w={240}>{alt("central bank", "Zentralbank", lang)}</TermChip>}
      {step >= 4 && (
        <>
          <Pop x={552} y={40}>
            <Banknote size={78} />
          </Pop>
          <Pop x={558} y={112}>
            <Banknote size={78} />
          </Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 3: the key rate dial, other banks watch it and follow. */
export function KeyRateDiagram({ lang, step }: DiagramProps) {
  const bankY = [6, 94, 182];
  return (
    <DiagramCanvas
      label={alt(
        "The central bank sets the key rate. Other banks watch it and their rates move the same way.",
        "Die Zentralbank legt den Leitzins fest. Andere Banken schauen darauf und ihre Zinsen ziehen mit.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Pop x={16} y={44}>
            <BankBuilding central size={170} />
          </Pop>
          <Pop x={210} y={52}>
            <Dial value={step >= 4 ? 6 : 3} size={160} />
          </Pop>
        </>
      )}
      {step >= 2 && <TermChip x={120} y={218} w={250}>{alt("key rate", "Leitzins", lang)}</TermChip>}
      {step >= 3 &&
        bankY.map((y) => (
          <g key={y}>
            <Pop x={500} y={y}>
              <BankBuilding size={84} />
            </Pop>
            <Pop x={438} y={y + 12}>
              <Magnifier size={56} />
            </Pop>
          </g>
        ))}
      {step >= 4 &&
        bankY.map((y) => (
          <Pop key={y} x={588} y={y + 18}>
            <RateArrow dir="up" size={44} />
          </Pop>
        ))}
    </DiagramCanvas>
  );
}

/** Beat 4: a hot town, the central bank raises the key rate, the town cools down. */
export function RaiseDiagram({ lang, step }: DiagramProps) {
  const calm = step >= 5;
  return (
    <DiagramCanvas
      label={alt(
        "The central bank raises the key rate. Loans cost more, people spend less, saving pays more, and the town cools down.",
        "Die Zentralbank erhöht den Leitzins. Kredite kosten mehr, die Leute kaufen weniger, Sparen bringt mehr und die Stadt kühlt ab.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Pop x={-4} y={60}>
            <Thermometer level={calm ? 0.55 : 0.9} color={calm ? ZONE_COLOR.right : ZONE_COLOR.hot} size={150} />
          </Pop>
          {!calm && (
            <Pop x={92} y={50}>
              <Flame size={52} />
            </Pop>
          )}
        </>
      )}
      {step >= 2 && (
        <>
          <Pop x={150} y={2}>
            <BankBuilding central size={100} />
          </Pop>
          <Pop x={250} y={0}>
            <Dial value={7} size={120} />
          </Pop>
          <Pop x={362} y={14}>
            <RateArrow dir="up" size={50} />
          </Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Arrow from={[200, 108]} to={[200, 150]} />
          <Pop x={152} y={150}>
            <Tag size={100}>
              <Coin x={38} y={30} size={44} />
            </Tag>
          </Pop>
          <Pop x={252} y={160}>
            <RateArrow dir="up" size={46} />
          </Pop>
          <Arrow from={[312, 204]} to={[372, 204]} />
          <Pop x={380} y={158}>
            <Cart size={90} />
          </Pop>
          <Pop x={472} y={160}>
            <RateArrow dir="down" size={46} />
          </Pop>
        </>
      )}
      {step >= 4 && (
        <>
          <Pop x={470} y={8}>
            <Piggy size={104} />
          </Pop>
          <Pop x={574} y={8}>
            <RateArrow dir="up" size={44} color={SAVE_COLOR} />
          </Pop>
        </>
      )}
      {step >= 5 && <Arrow from={[540, 262]} to={[110, 262]} color={SAVE_COLOR} />}
    </DiagramCanvas>
  );
}

/** Beat 5: a cold town, the central bank lowers the key rate, the town warms up. */
export function LowerDiagram({ lang, step }: DiagramProps) {
  const warm = step >= 4;
  const mood = warm ? "happy" : "sad";
  return (
    <DiagramCanvas
      label={alt(
        "A cold town with empty shops and no jobs. The central bank lowers the key rate, loans get cheaper, and the town warms up.",
        "Eine kalte Stadt mit leeren Läden und ohne Arbeit. Die Zentralbank senkt den Leitzins, Kredite werden billiger und die Stadt wird wärmer.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Pop x={-4} y={64}>
            <Thermometer level={warm ? 0.55 : 0.12} color={warm ? ZONE_COLOR.right : ZONE_COLOR.cold} size={150} />
          </Pop>
          {!warm && (
            <Pop x={88} y={40}>
              <Snowflake size={40} />
            </Pop>
          )}
          <Pop>
            <TownScene zone={warm ? "right" : "cold"} crane={warm} scale={0.95} x={150} y={14} />
          </Pop>
        </>
      )}
      {step >= 2 && (
        <>
          <Villager who="Finn" x={160} y={152} size={80} name="" mood={mood} />
          <Villager who="Bea" x={240} y={152} size={80} name="" mood={mood} />
          <Villager who="Sam" x={320} y={152} size={80} name="" mood={mood} />
        </>
      )}
      {step >= 3 && (
        <>
          <Pop x={490} y={6}>
            <BankBuilding central size={104} />
          </Pop>
          <Pop x={484} y={124}>
            <Dial value={1} size={124} />
          </Pop>
          <Pop x={598} y={26}>
            <RateArrow dir="down" size={40} />
          </Pop>
        </>
      )}
      {step >= 4 && (
        <Pop x={402} y={152}>
          <Person hat="hardhat" shirt="#e8863a" size={80} />
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: it takes many months, and the central bank is never exactly right. */
export function SlowDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "The key rate works slowly. It takes many months to reach the town. The town is never exactly just right.",
        "Der Leitzins wirkt langsam. Es dauert viele Monate, bis er in der Stadt ankommt. Die Stadt ist nie ganz genau richtig.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Pop x={10} y={0}>
            <Dial value={step >= 2 ? 6 : 3} size={130} />
          </Pop>
          {step === 1 && (
            <Pop x={160} y={14}>
              <Clock size={86} />
            </Pop>
          )}
        </>
      )}
      {step >= 2 && (
        <>
          {[0, 1, 2].map((i) => (
            <Pop key={i} x={176 + i * 70} y={0}>
              <Calendar size={58} />
            </Pop>
          ))}
          <Arrow from={[150, 88]} to={[400, 88]} />
          <Pop x={430} y={0}>
            <TownScene zone="hot" scale={0.56} />
          </Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Pop x={10} y={156}>
            <Dial value={6} size={100} />
          </Pop>
          <Arrow from={[116, 214]} to={[176, 214]} />
          <Pop x={186} y={146}>
            <House size={120} />
          </Pop>
          <Pop x={296} y={146}>
            <Thermometer level={0.4} color="#f2b632" band size={120} />
          </Pop>
        </>
      )}
      {step >= 4 && (
        <Pop x={408} y={146}>
          <Thermometer level={0.74} color={UP_COLOR} band size={120} />
        </Pop>
      )}
      {step >= 5 && (
        <Pop x={510} y={146}>
          <Thermometer level={0.28} color={DOWN_COLOR} band size={120} />
        </Pop>
      )}
    </DiagramCanvas>
  );
}

/** Beat 7: families. High rates make a new house loan cost more and saving pay more. */
export function FamilyDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "A family wants a loan for a house. With a high key rate the loan costs more and saving pays more. With a low one the loan costs less.",
        "Eine Familie will einen Kredit für ein Haus. Bei hohem Leitzins kostet der Kredit mehr und Sparen bringt mehr. Bei niedrigem kostet er weniger.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Bubble x={14} y={14} w={140} h={84} thought tail="bottom-left">
            <House x={30} y={2} size={80} />
          </Bubble>
          <Villager who="Pim" x={4} y={140} size={100} name="" />
          <Villager who="Pip" x={104} y={160} size={80} name="" />
        </>
      )}
      {step >= 2 && (
        <>
          <Pop x={208} y={8}>
            <Dial value={7} size={110} />
          </Pop>
          <Arrow from={[326, 76]} to={[374, 76]} />
          <Pop x={382} y={8}>
            <Tag size={110}>
              <Coin x={38} y={30} size={44} />
            </Tag>
          </Pop>
          <Pop x={490} y={22}>
            <RateArrow dir="up" size={56} />
          </Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Pop x={208} y={150}>
            <Dial value={1} size={110} />
          </Pop>
          <Arrow from={[326, 218]} to={[374, 218]} />
          <Pop x={382} y={150}>
            <Tag size={110}>
              <Coin x={38} y={30} size={44} />
            </Tag>
          </Pop>
          <Pop x={490} y={164}>
            <RateArrow dir="down" size={56} />
          </Pop>
        </>
      )}
      {step >= 4 && (
        <>
          <Pop x={558} y={22}>
            <Piggy size={80} />
          </Pop>
          <Pop x={600} y={0}>
            <RateArrow dir="up" size={36} color={SAVE_COLOR} />
          </Pop>
        </>
      )}
    </DiagramCanvas>
  );
}
