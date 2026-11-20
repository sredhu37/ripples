import { Villager } from "../components/cast";
import { DiagramCanvas, Pop, TermChip } from "../components/diagram";
import { Bread, Coin, Fish, NoSign, Person, Shoe } from "../components/icons";
import type { DiagramProps } from "../lesson/types";

/** Animated diagrams for the GDP lesson, one per story beat. `step` is how many taps so far. */

const alt = (en: string, de: string, pl: string, lang: DiagramProps["lang"]) =>
  lang === "pl" ? pl : lang === "de" ? de : en;

const INK = "#23383f";

/** A short text, placed and popped in. */
function Txt({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <Pop x={x} y={y}>
      <text className="diagram-name" textAnchor="middle">
        {children}
      </text>
    </Pop>
  );
}

/** Beat 1: Finn sells 3 fish for 2 coins each. */
export function FishSumDiagram({ lang, step }: DiagramProps) {
  const coins = alt("coins", "Münzen", "monet", lang);
  return (
    <DiagramCanvas
      label={alt(
        "Finn sells 3 fish for 2 coins each. The fish are worth 6 coins.",
        "Finn verkauft 3 Fische für je 2 Münzen. Die Fische sind 6 Münzen wert.",
        "Finn sprzedaje 3 ryby po 2 monety. Ryby są warte 6 monet.",
        lang,
      )}
    >
      {step >= 1 && <Villager who="Finn" x={40} y={50} size={120} />}
      {step >= 2 && (
        <>
          <Fish x={230} y={70} size={80} />
          <Fish x={320} y={70} size={80} />
          <Fish x={410} y={70} size={80} />
          <Txt x={320} y={190}>{`2 ${coins}`}</Txt>
        </>
      )}
      {step >= 3 && (
        <>
          <Coin x={510} y={60} size={70} />
          <Txt x={545} y={170}>{`6 ${coins}`}</Txt>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 2: Bea and Sam each sell 8 coins of goods. Finn made 6. */
export function ThreeMakersDiagram({ lang, step }: DiagramProps) {
  const coins = alt("coins", "Münzen", "monet", lang);
  return (
    <DiagramCanvas
      label={alt(
        "Finn made 6 coins, Bea 8 coins and Sam 8 coins.",
        "Finn hat 6 Münzen gemacht, Bea 8 und Sam 8.",
        "Finn zrobił 6 monet, Bea 8 i Sam 8.",
        lang,
      )}
    >
      {step >= 3 && (
        <>
          <Villager who="Finn" x={30} y={40} size={90} />
          <Txt x={75} y={200}>{`6 ${coins}`}</Txt>
        </>
      )}
      {step >= 1 && (
        <>
          <Villager who="Bea" x={250} y={40} size={90} />
          <Bread x={355} y={60} size={60} />
          <Txt x={295} y={200}>{`8 ${coins}`}</Txt>
        </>
      )}
      {step >= 2 && (
        <>
          <Villager who="Sam" x={470} y={40} size={90} />
          <Shoe x={565} y={60} size={60} />
          <Txt x={515} y={200}>{`8 ${coins}`}</Txt>
        </>
      )}
    </DiagramCanvas>
  );
}

/** A big number on the stage. */
function Big({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <Pop x={x} y={y}>
      <text
        x="0"
        y="0"
        textAnchor="middle"
        fontSize="56"
        fontWeight="800"
        fill={INK}
        fontFamily="inherit"
      >
        {children}
      </text>
    </Pop>
  );
}

/** Beat 3: add it all up. The total is the town's GDP. */
export function AddUpDiagram({ lang, step }: DiagramProps) {
  const gdp = alt("GDP", "BIP", "PKB", lang);
  return (
    <DiagramCanvas
      label={alt(
        "6 plus 8 plus 8 is 22 coins. That is the GDP of the town.",
        "6 plus 8 plus 8 sind 22 Münzen. Das ist das BIP der Stadt.",
        "6 plus 8 plus 8 to 22 monety. To jest PKB miasteczka.",
        lang,
      )}
    >
      {step >= 1 && (
        <Big x={320} y={80}>
          {"6 + 8 + 8"}
        </Big>
      )}
      {step >= 2 && (
        <Big x={320} y={150}>
          {"= 22"}
        </Big>
      )}
      {step >= 3 && (
        <TermChip x={220} y={180} w={200}>
          {gdp}
        </TermChip>
      )}
      {step >= 4 && (
        <>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Person
              key={i}
              hat="none"
              shirt={["#2f7fb8", "#e68aa0", "#5aa05f", "#8e6bbf"][i % 4]}
              x={40 + i * 70}
              y={236}
              size={40}
            />
          ))}
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 4: only what is made to be sold counts. */
export function SoldOnlyDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Bea's bread for her family is not counted. Bread made to sell is counted.",
        "Beas Brot für ihre Familie zählt nicht. Brot zum Verkaufen zählt.",
        "Chleb Bei dla rodziny się nie liczy. Chleb na sprzedaż się liczy.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Bread x={90} y={50} size={100} />
          <Txt x={140} y={190}>
            {alt("At home", "Zu Hause", "W domu", lang)}
          </Txt>
        </>
      )}
      {step >= 2 && (
        <>
          <Bread x={430} y={50} size={100} />
          <Txt x={480} y={190}>
            {alt("To sell", "Zum Verkaufen", "Na sprzedaż", lang)}
          </Txt>
        </>
      )}
      {step >= 3 && (
        <>
          <NoSign x={90} y={50} size={100} />
          <Txt x={140} y={230}>
            {alt("Not counted", "Zählt nicht", "Nie liczy się", lang)}
          </Txt>
          <Coin x={535} y={40} size={50} />
          <Txt x={480} y={230}>
            {alt("Counted", "Zählt", "Liczy się", lang)}
          </Txt>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 5: free help and clean air are not counted. */
export function MissedDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "A neighbour who helps for free and a clean river are not counted in GDP.",
        "Ein Nachbar, der gratis hilft, und ein sauberer Fluss zählen nicht im BIP.",
        "Sąsiad, który pomaga za darmo, i czysta rzeka nie liczą się w PKB.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Person hat="beanie" shirt="#8e6bbf" x={90} y={40} size={110} />
          <Txt x={145} y={190}>
            {alt("Help for free", "Gratis helfen", "Pomoc za darmo", lang)}
          </Txt>
        </>
      )}
      {step >= 2 && (
        <>
          <Pop x={400} y={60}>
            <rect width="170" height="90" rx="12" fill="#dff1f6" stroke={INK} strokeWidth="4" />
            <path
              d="M15 45 Q42 25 70 45 T125 45 T160 45 M15 68 Q42 48 70 68 T125 68 T160 68"
              fill="none"
              stroke="#2f7fb8"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </Pop>
          <Txt x={485} y={190}>
            {alt("Clean river", "Sauberer Fluss", "Czysta rzeka", lang)}
          </Txt>
        </>
      )}
      {step >= 3 && (
        <>
          <NoSign x={90} y={50} size={110} />
          <NoSign x={430} y={50} size={110} />
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: the same GDP, different lives. */
export function SameNumberDiagram({ lang, step }: DiagramProps) {
  const gdp = alt("GDP", "BIP", "PKB", lang);
  return (
    <DiagramCanvas
      label={alt(
        "Two towns with the same GDP. In one, people are happy. In the other, they are not.",
        "Zwei Städte mit demselben BIP. In einer sind die Menschen glücklich, in der anderen nicht.",
        "Dwa miasteczka z tym samym PKB. W jednym ludzie są szczęśliwi, w drugim nie.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Pop x={250} y={30}>
            <rect width="140" height="60" rx="12" fill="#a9d18e" stroke={INK} strokeWidth="4" />
            <text className="diagram-name" x="70" y="40" textAnchor="middle">
              {gdp}
            </text>
          </Pop>
        </>
      )}
      {step >= 2 && (
        <>
          <Person hat="none" shirt="#5aa05f" mood="happy" x={110} y={110} size={110} />
          <Person hat="none" shirt="#e06343" mood="sad" x={420} y={110} size={110} />
          <Txt x={165} y={250}>
            {alt("Time to play", "Zeit zum Spielen", "Czas na zabawę", lang)}
          </Txt>
          <Txt x={475} y={250}>
            {alt("Always rushing", "Immer in Eile", "Ciągły pośpiech", lang)}
          </Txt>
        </>
      )}
      {step >= 3 && (
        <Txt x={320} y={170}>
          {alt("Just one number", "Nur eine Zahl", "Tylko jedna liczba", lang)}
        </Txt>
      )}
    </DiagramCanvas>
  );
}
