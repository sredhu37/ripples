import { Villager } from "../components/cast";
import { Arrow, Bubble, DiagramCanvas, Label, Pop, TermChip } from "../components/diagram";
import { Bread, Box, Coin, NoSign, Tag } from "../components/icons";
import type { IconProps } from "../components/icons";
import type { DiagramProps } from "../lesson/types";
import { BankBuilding, House, RateArrow, Thermometer, ZONE_COLOR } from "./rates.icons";

/** Animated diagrams for the Central banks lesson, one per story beat. `step` is how many taps so far. */

const alt = (en: string, de: string, pl: string, lang: DiagramProps["lang"]) =>
  lang === "pl" ? pl : lang === "de" ? de : en;

/** A flat shield: the central bank is protected from pressure. */
export function Shield(pos: IconProps) {
  return (
    <Box {...pos}>
      <path
        d="M50 6 L88 20 V50 C88 74 70 88 50 96 C30 88 12 74 12 50 V20 Z"
        fill="#3b5b7a"
        stroke="#23383f"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M30 52 L45 67 L72 36"
        fill="none"
        stroke="#fff"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Box>
  );
}

/** Beat 1: Bea uses a bank, and the banks use the central bank. */
export function BankForBanksDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Bea brings coins to a bank. The bank brings coins to the central bank, the bank for banks.",
        "Bea bringt Münzen zu einer Bank. Die Bank bringt Münzen zur Zentralbank, der Bank für Banken.",
        "Bea niesie monety do banku. Bank niesie monety do banku centralnego, czyli banku dla banków.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Bea" x={30} y={110} size={100} name="" />
          <Pop x={160} y={100}>
            <Coin size={40} />
          </Pop>
          <Arrow from={[150, 180]} to={[225, 180]} />
          <Pop x={235} y={110}>
            <BankBuilding size={100} />
          </Pop>
        </>
      )}
      {step >= 2 && (
        <>
          <Pop x={355} y={100}>
            <Coin size={40} />
          </Pop>
          <Arrow from={[345, 180]} to={[420, 180]} />
          <Pop x={430} y={90}>
            <BankBuilding central size={130} />
          </Pop>
        </>
      )}
      {step >= 3 && (
        <TermChip x={380} y={14} w={240}>
          {alt("Central bank", "Zentralbank", "Bank centralny", lang)}
        </TermChip>
      )}
    </DiagramCanvas>
  );
}

/** Beat 2: prices rise only a little each year. */
export function SteadyPricesDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "A loaf of bread costs 100 coins. A year later it costs 102 coins. The central bank watches over this.",
        "Ein Brot kostet 100 Münzen. Ein Jahr später kostet es 102 Münzen. Die Zentralbank wacht darüber.",
        "Chleb kosztuje 100 monet. Rok później kosztuje 102 monety. Bank centralny tego pilnuje.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Pop x={60} y={50}>
            <Tag size={130}>
              <Bread x={36} y={30} size={56} />
            </Tag>
          </Pop>
          <Label x={125} y={216}>
            100
          </Label>
        </>
      )}
      {step >= 2 && (
        <>
          <Arrow from={[210, 120]} to={[300, 120]} />
          <Pop x={310} y={50}>
            <Tag size={130}>
              <Bread x={36} y={30} size={56} />
            </Tag>
          </Pop>
          <Label x={375} y={216}>
            102
          </Label>
        </>
      )}
      {step >= 3 && (
        <>
          <Pop x={490} y={80}>
            <BankBuilding central size={120} />
          </Pop>
          <Label x={550} y={240} term>
            {alt("2 in 100", "2 von 100", "2 na 100", lang)}
          </Label>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 3: the mayor wants coins printed before the vote, and the central bank says no. */
export function PressureDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Mayor Moss asks to print many coins for gifts before the vote. Prices would rise. The independent central bank says no.",
        "Bürgermeister Moss will vor der Wahl viele Münzen für Geschenke drucken. Die Preise würden steigen. Die unabhängige Zentralbank sagt nein.",
        "Burmistrz Moss chce przed wyborami wydrukować dużo monet na prezenty. Ceny by wzrosły. Niezależny bank centralny mówi nie.",
        lang,
      )}
    >
      {step >= 1 && <Villager who="Moss" x={30} y={110} size={100} name="" />}
      {step >= 2 && (
        <Bubble x={150} y={16} w={170} h={90}>
          <Coin x={22} y={20} size={50} />
          <Coin x={98} y={20} size={50} />
        </Bubble>
      )}
      {step >= 3 && (
        <>
          <Pop x={170} y={150}>
            <Coin size={50} />
          </Pop>
          <Pop x={220} y={165}>
            <Coin size={50} />
          </Pop>
          <Pop x={270} y={150}>
            <Coin size={50} />
          </Pop>
          <Pop x={350} y={130}>
            <Tag size={90}>
              <Bread x={32} y={24} size={40} />
            </Tag>
          </Pop>
          <Pop x={448} y={140}>
            <RateArrow dir="up" size={50} />
          </Pop>
        </>
      )}
      {step >= 4 && (
        <>
          <Pop x={205} y={130}>
            <NoSign size={110} />
          </Pop>
          <Pop x={530} y={110}>
            <BankBuilding central size={100} />
          </Pop>
          <TermChip x={370} y={14} w={250}>
            {alt("Independent", "Unabhängig", "Niezależny", lang)}
          </TermChip>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 4: no orders from the government, no loans to the government. */
export function RulesDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "The central bank takes no orders from the government and lends it no coins.",
        "Die Zentralbank nimmt keine Befehle von der Regierung an und leiht ihr keine Münzen.",
        "Bank centralny nie przyjmuje poleceń od rządu i nie pożycza mu monet.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Pop x={30} y={90}>
            <BankBuilding central size={130} />
          </Pop>
          <Villager who="Moss" x={490} y={110} size={100} name="" />
        </>
      )}
      {step >= 2 && (
        <>
          <Arrow from={[460, 110]} to={[190, 110]} />
          <Pop x={280} y={55}>
            <NoSign size={90} />
          </Pop>
        </>
      )}
      {step >= 3 && (
        <>
          <Arrow from={[190, 230]} to={[460, 230]} />
          <Pop x={310} y={186}>
            <Coin size={40} />
          </Pop>
          <Pop x={297} y={170}>
            <NoSign size={66} />
          </Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 5: a rumor makes everybody run to the bank. */
export function PanicDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Pim hears a rumor that the bank has no coins. Many people rush to the bank. The bank has no coins left to give.",
        "Pim hört ein Gerücht, dass die Bank keine Münzen hat. Viele Leute rennen zur Bank. Die Bank hat keine Münzen mehr.",
        "Pim słyszy plotkę, że bank nie ma monet. Wielu ludzi biegnie do banku. W banku brakuje monet.",
        lang,
      )}
    >
      <Pop x={40} y={100}>
        <BankBuilding size={110} />
      </Pop>
      {step >= 1 && (
        <>
          <Villager who="Pim" x={470} y={110} size={90} mood="think" name="" />
          <Bubble x={400} y={10} w={150} h={80} tail="bottom-right">
            <Coin x={20} y={16} size={46} />
            <NoSign x={84} y={14} size={50} />
          </Bubble>
        </>
      )}
      {step >= 2 && (
        <>
          <Villager who="Finn" x={370} y={120} size={80} name="" />
          <Villager who="Bea" x={270} y={120} size={80} name="" />
          <Arrow from={[260, 235]} to={[170, 235]} />
        </>
      )}
      {step >= 3 && (
        <>
          <Label x={95} y={78}>
            0
          </Label>
          <Pop x={70} y={20}>
            <NoSign size={50} />
          </Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: the emergency loan against collateral. */
export function WindowDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "The central bank lends coins to a bank in trouble. In return it keeps a valuable house safe as collateral.",
        "Die Zentralbank leiht einer Bank in Not Münzen. Dafür hält sie ein wertvolles Haus als Pfand sicher.",
        "Bank centralny pożycza monety bankowi w kłopocie. W zamian trzyma w bezpiecznym miejscu cenny dom jako zastaw.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Pop x={30} y={100}>
            <BankBuilding central size={130} />
          </Pop>
          <Pop x={500} y={110}>
            <BankBuilding size={110} />
          </Pop>
          <Arrow from={[190, 160]} to={[480, 160]} />
          <Pop x={300} y={100}>
            <Coin size={46} />
          </Pop>
        </>
      )}
      {step >= 2 && (
        <>
          <Arrow from={[480, 235]} to={[190, 235]} />
          <Pop x={310} y={170}>
            <House size={60} />
          </Pop>
        </>
      )}
      {step >= 3 && (
        <TermChip x={20} y={10} w={230}>
          {alt("Collateral", "Pfand", "Zastaw", lang)}
        </TermChip>
      )}
      {step >= 4 && (
        <TermChip x={280} y={10} w={340}>
          {alt("Last-resort lender", "Letzte Instanz", "Ostatnia instancja", lang)}
        </TermChip>
      )}
    </DiagramCanvas>
  );
}

/** Beat 7: three different tools, three different jobs. */
export function RecapDiagram({ lang, step }: DiagramProps) {
  return (
    <DiagramCanvas
      label={alt(
        "Three jobs of the central bank: the rate dial steers prices, independence stops printing for votes, the emergency loan stops a panic.",
        "Drei Aufgaben der Zentralbank: Der Zinsregler steuert die Preise, Unabhängigkeit stoppt das Drucken für Stimmen, der Notkredit stoppt die Panik.",
        "Trzy zadania banku centralnego: pokrętło stóp steruje cenami, niezależność zatrzymuje druk dla głosów, pożyczka awaryjna zatrzymuje panikę.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Pop x={60} y={50}>
            <Thermometer level={0.5} color={ZONE_COLOR.right} size={130} />
          </Pop>
          <Label x={125} y={230} term>
            {alt("Rate dial", "Zinsregler", "Stopy", lang)}
          </Label>
        </>
      )}
      {step >= 2 && (
        <>
          <Pop x={255} y={50}>
            <Shield size={130} />
          </Pop>
          <Label x={320} y={230} term>
            {alt("Independent", "Unabhängig", "Niezależny", lang)}
          </Label>
        </>
      )}
      {step >= 3 && (
        <>
          <Pop x={450} y={50}>
            <House size={100} />
          </Pop>
          <Pop x={520} y={100}>
            <Coin size={60} />
          </Pop>
          <Label x={515} y={230} term>
            {alt("Emergency loan", "Notkredit", "Pożyczka", lang)}
          </Label>
        </>
      )}
    </DiagramCanvas>
  );
}
