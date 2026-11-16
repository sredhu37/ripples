import { Villager } from "../components/cast";
import { Arrow, DiagramCanvas, Pop, TermChip } from "../components/diagram";
import { Bread, Coin, NoSign } from "../components/icons";
import type { DiagramProps } from "../lesson/types";

/** Animated diagrams for the Currencies lesson, one per story beat. `step` is how many taps so far. */

const alt = (en: string, de: string, pl: string, lang: DiagramProps["lang"]) =>
  lang === "pl" ? pl : lang === "de" ? de : en;

/** A paper note, drawn flat. (x, y) is the top left corner. */
function Note({ x, y, w = 90 }: { x: number; y: number; w?: number }) {
  const h = w * 0.55;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx="6" fill="#bfe3b4" stroke="#23383f" strokeWidth="4" />
      <circle cx={w / 2} cy={h / 2} r={h * 0.28} fill="none" stroke="#23383f" strokeWidth="4" />
    </g>
  );
}

/** A vault: a strong box with a round door. (x, y) is the top left corner. */
function Vault({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="150" height="130" rx="14" fill="#9aa7ad" stroke="#23383f" strokeWidth="5" />
      <circle cx="75" cy="65" r="38" fill="#6b7a80" stroke="#23383f" strokeWidth="5" />
      <circle cx="75" cy="65" r="8" fill="#23383f" />
      <rect x="20" y="130" width="22" height="12" fill="#23383f" />
      <rect x="108" y="130" width="22" height="12" fill="#23383f" />
    </g>
  );
}

/** Beat 1: gold coins are heavy and risky to carry. */
export function HeavyGoldDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Finn carries a heavy bag of gold coins. A currency is the money of a place.",
        "Finn trägt einen schweren Beutel Goldmünzen. Eine Währung ist das Geld eines Ortes.",
        "Finn niesie ciężki worek złotych monet. Waluta to pieniądze danego miejsca.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Finn" x={60} y={60} size={130} />
          <Pop x={210} y={150}>
            <Coin x={0} y={0} size={46} />
            <Coin x={40} y={14} size={46} />
            <Coin x={80} y={0} size={46} />
          </Pop>
        </>
      )}
      {step >= 2 && (
        <Pop x={330} y={50}>
          <rect width="100" height="90" rx="10" fill="#6b7a80" stroke="#23383f" strokeWidth="4" />
          <path d="M20 90 L80 90 L70 60 L30 60 Z" fill="#23383f" />
        </Pop>
      )}
      {step >= 3 && (
        <Pop x={470} y={60}>
          <Coin x={0} y={0} size={70} />
          <Arrow from={[35, 100]} to={[35, 130]} color="#c0392b" />
        </Pop>
      )}
      {step >= 4 && (
        <TermChip x={200} y={215} w={240}>
          {alt("currency", "Währung", "waluta", lang)}
        </TermChip>
      )}
    </DiagramCanvas>
  );
}

/** Beat 2: the vault keeps the gold and hands out a paper note. */
export function VaultNoteDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Gold goes into the vault. The vault hands out a paper note.",
        "Das Gold geht in den Tresor. Der Tresor gibt einen Geldschein heraus.",
        "Złoto trafia do skarbca. Skarbiec wydaje papierowy banknot.",
        lang,
      )}
    >
      {step >= 1 && (
        <Pop>
          <Coin x={40} y={60} size={60} />
          <Coin x={90} y={90} size={60} />
        </Pop>
      )}
      {step >= 2 && (
        <>
          <Arrow from={[160, 120]} to={[240, 120]} />
          <Pop>
            <Vault x={250} y={40} />
          </Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Arrow from={[410, 120]} to={[470, 120]} />
          <Pop>
            <Note x={480} y={95} />
          </Pop>
        </>
      )}
      {step >= 4 && (
        <TermChip x={200} y={215} w={240}>
          {alt("banknote", "Geldschein", "banknot", lang)}
        </TermChip>
      )}
    </DiagramCanvas>
  );
}

/** Beat 3: Finn buys bread with the light note. */
export function NoteBuysBreadDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Finn gives Bea a light note. Bea gives Finn bread.",
        "Finn gibt Bea einen leichten Schein. Bea gibt Finn Brot.",
        "Finn daje Bei lekki banknot. Bea daje Finnowi chleb.",
        lang,
      )}
    >
      {step >= 1 && <Villager who="Finn" x={30} y={70} size={130} />}
      {step >= 2 && (
        <>
          <Villager who="Bea" x={480} y={70} size={130} />
          <Arrow from={[170, 110]} to={[470, 110]} />
          <Pop>
            <Note x={285} y={50} w={80} />
          </Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Arrow from={[470, 175]} to={[170, 175]} />
          <Pop>
            <Bread x={285} y={170} size={70} />
          </Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 4: a note is a promise to swap back for gold. */
export function GoldStandardDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "A note and a gold coin are linked. The note can always be swapped for gold.",
        "Ein Schein und eine Goldmünze gehören zusammen. Man kann den Schein immer in Gold tauschen.",
        "Banknot i złota moneta są powiązane. Banknot zawsze można wymienić na złoto.",
        lang,
      )}
    >
      {step >= 1 && (
        <Pop>
          <Vault x={245} y={20} />
        </Pop>
      )}
      {step >= 2 && (
        <>
          <Pop>
            <Note x={50} y={90} />
          </Pop>
          <Arrow from={[150, 110]} to={[240, 110]} />
          <Arrow from={[400, 120]} to={[490, 120]} />
          <Pop>
            <Coin x={500} y={85} size={70} />
          </Pop>
        </>
      )}
      {step >= 3 && (
        <TermChip x={170} y={205} w={300}>
          {alt("gold standard", "Goldstandard", "standard złota", lang)}
        </TermChip>
      )}
    </DiagramCanvas>
  );
}

/** Beat 5: in 1971 the swap for gold ends. */
export function PromiseEndsDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "In 1971 the swap from note to gold stops.",
        "1971 hört der Tausch von Schein gegen Gold auf.",
        "W 1971 roku wymiana banknotu na złoto się kończy.",
        lang,
      )}
    >
      {step >= 1 && (
        <Pop x={240} y={10}>
          <text className="diagram-term" x="80" y="40" textAnchor="middle">
            1971
          </text>
        </Pop>
      )}
      {step >= 2 && (
        <>
          <Pop>
            <Note x={60} y={110} />
          </Pop>
          <Arrow from={[160, 130]} to={[470, 130]} />
          <Pop>
            <Coin x={490} y={95} size={70} />
          </Pop>
        </>
      )}
      {step >= 3 && (
        <Pop x={285} y={70}>
          <NoSign x={0} y={0} size={80} />
        </Pop>
      )}
      {step >= 4 && (
        <>
          <Pop>
            <Note x={130} y={205} w={70} />
          </Pop>
          <Arrow from={[220, 225]} to={[400, 225]} />
          <Pop>
            <Bread x={410} y={195} size={60} />
          </Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: trust, not gold, gives the note its worth. */
export function TrustDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Everyone in town accepts the note. That is why it is worth something.",
        "Alle in der Stadt nehmen den Schein an. Darum ist er etwas wert.",
        "Wszyscy w mieście przyjmują banknot. Dlatego coś jest wart.",
        lang,
      )}
    >
      {step >= 1 && (
        <Pop>
          <Note x={275} y={30} w={90} />
        </Pop>
      )}
      {step >= 2 && (
        <>
          <Villager who="Finn" x={20} y={90} size={110} />
          <Villager who="Bea" x={150} y={90} size={110} />
          <Villager who="Sam" x={400} y={90} size={110} />
          <Villager who="Pim" x={520} y={90} size={110} />
          <Arrow from={[130, 120]} to={[265, 70]} />
          <Arrow from={[510, 120]} to={[375, 70]} />
        </>
      )}
      {step >= 3 && (
        <TermChip x={170} y={215} w={300}>
          {alt("fiat money", "Fiatgeld", "pieniądz fiducjarny", lang)}
        </TermChip>
      )}
    </DiagramCanvas>
  );
}
