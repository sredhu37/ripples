import { Villager } from "../components/cast";
import { Arrow, DiagramCanvas, Label, Pop, TermChip } from "../components/diagram";
import { Clock, Coin, NoSign, Swap, Tag } from "../components/icons";
import type { DiagramProps } from "../lesson/types";
import { TRIPS, swapCoins, type Rate } from "./fx.logic";

/** Animated diagrams for the Exchange rates lesson, one per story beat. `step` is how many taps so far. */

type Lang = DiagramProps["lang"];

const alt = (en: string, de: string, pl: string, lang: Lang) =>
  lang === "pl" ? pl : lang === "de" ? de : en;

/** Money codes: INR rupee, EUR euro, PLN zloty. Same in every language, so the numbers carry the meaning. */
const CODES: Record<Lang, { home: string; away: string }> = {
  en: { home: "INR", away: "EUR" },
  de: { home: "EUR", away: "INR" },
  pl: { home: "PLN", away: "INR" },
};

const NAMES: Record<Lang, string> = { en: "Aarav", de: "Lena", pl: "Zofia" };

const COUNTRIES: Record<Lang, { home: [string, string, string]; away: [string, string, string] }> =
  {
    en: { home: ["India", "Indien", "Indie"], away: ["Germany", "Deutschland", "Niemcy"] },
    de: { home: ["Germany", "Deutschland", "Niemcy"], away: ["India", "Indien", "Indie"] },
    pl: { home: ["Poland", "Polen", "Polska"], away: ["India", "Indien", "Indie"] },
  };

function country(lang: Lang, side: "home" | "away"): string {
  const [en, de, pl] = COUNTRIES[lang][side];
  return alt(en, de, pl, lang);
}

/** Rate on a given day (0, 1 or 2) for the language's trip. */
const rateOf = (lang: Lang, day: 0 | 1 | 2): Rate => TRIPS[lang].rates[day];

/** A small toy car, flat. (x, y) is the top left corner. */
function ToyCar({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        y="24"
        width="100"
        height="34"
        rx="10"
        fill="#e8863a"
        stroke="#23383f"
        strokeWidth="4"
      />
      <rect x="22" width="52" height="30" rx="8" fill="#e8863a" stroke="#23383f" strokeWidth="4" />
      <circle cx="26" cy="62" r="13" fill="#6b7a80" stroke="#23383f" strokeWidth="4" />
      <circle cx="76" cy="62" r="13" fill="#6b7a80" stroke="#23383f" strokeWidth="4" />
    </g>
  );
}

/** An amount of money: a coin and a number with its code. (x, y) is the coin's top left corner. */
function Amount({ x, y, n, code }: { x: number; y: number; n: number; code: string }) {
  return (
    <g>
      <Coin x={x} y={y} size={50} />
      <text className="diagram-name" x={x + 25} y={y + 78} textAnchor="middle">
        {`${n} ${code}`}
      </text>
    </g>
  );
}

/** The swap desk: a counter with a swap icon on it. */
function Desk({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        y="40"
        width="150"
        height="70"
        rx="10"
        fill="#a86f3c"
        stroke="#23383f"
        strokeWidth="4"
      />
      <Swap x={45} y={0} size={60} />
    </g>
  );
}

/** A rate as two amounts with a swap icon between. */
function RateRow({ x, y, lang, rate }: { x: number; y: number; lang: Lang; rate: Rate }) {
  const c = CODES[lang];
  return (
    <Pop x={x} y={y}>
      <Amount x={0} y={0} n={rate.home} code={c.home} />
      <Swap x={85} y={5} size={44} />
      <Amount x={150} y={0} n={rate.away} code={c.away} />
    </Pop>
  );
}

function PriceTag({ x, y, lang }: { x: number; y: number; lang: Lang }) {
  const t = TRIPS[lang];
  return (
    <Pop x={x} y={y}>
      <Tag x={0} y={0} size={70} />
      <text className="diagram-name" x={35} y={95} textAnchor="middle">
        {`${t.price} ${CODES[lang].away}`}
      </text>
    </Pop>
  );
}

/** Beat 1: the child flies to another country and sees a toy. */
export function TripDiagram({ lang, step }: DiagramProps) {
  const t = TRIPS[lang];
  return (
    <DiagramCanvas
      label={alt(
        "Aarav travels from India to Germany and sees a toy car with a price tag in euros.",
        "Lena reist von Deutschland nach Indien und sieht ein Spielzeugauto mit Preisschild in Rupien.",
        "Zofia jedzie z Polski do Indii i widzi samochodzik z ceną w rupiach.",
        lang,
      )}
    >
      {step >= 1 && (
        <>
          <Villager who="Pim" x={40} y={30} size={120} name={NAMES[lang]} />
          <Label x={100} y={225}>
            {country(lang, "home")}
          </Label>
        </>
      )}
      {step >= 2 && (
        <>
          <Pop x={20} y={170}>
            <Coin x={0} y={0} size={40} />
            <text className="diagram-name" x={110} y={32}>
              {`${t.homeCoins} ${CODES[lang].home}`}
            </text>
          </Pop>
          <Arrow from={[190, 110]} to={[300, 110]} />
          <Label x={440} y={225}>
            {country(lang, "away")}
          </Label>
        </>
      )}
      {step >= 3 && (
        <>
          <Pop x={340} y={90}>
            <ToyCar x={0} y={0} />
          </Pop>
          <PriceTag x={500} y={60} lang={lang} />
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 2: home coins do not work in the away shop, so go to the swap desk. */
export function NoHomeCoinsDiagram({ lang, step }: DiagramProps) {
  const t = TRIPS[lang];
  return (
    <DiagramCanvas
      label={alt(
        "Rupees do not work in a German shop, so Aarav goes to a swap desk.",
        "Euro-Münzen gehen in einem indischen Laden nicht, also geht Lena zum Tauschschalter.",
        "Złotówki nie działają w indyjskim sklepie, więc Zofia idzie do kantoru.",
        lang,
      )}
    >
      {step >= 1 && (
        <Pop x={40} y={60}>
          <Coin x={0} y={0} size={70} />
          <text className="diagram-name" x={35} y={105} textAnchor="middle">
            {`${t.homeCoins} ${CODES[lang].home}`}
          </text>
        </Pop>
      )}
      {step >= 2 && (
        <Pop x={190} y={50}>
          <ToyCar x={0} y={0} />
          <NoSign x={10} y={20} size={80} />
        </Pop>
      )}
      {step >= 3 && (
        <>
          <Arrow from={[330, 120]} to={[400, 120]} />
          <Pop x={430} y={60}>
            <Desk x={0} y={0} />
          </Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 3: day 1. The desk shows the exchange rate, the child swaps and buys the toy. */
export function DayOneDiagram({ lang, step }: DiagramProps) {
  const t = TRIPS[lang];
  const rate = rateOf(lang, 0);
  const c = CODES[lang];
  return (
    <DiagramCanvas
      label={alt(
        "At the desk 100 rupees give 1 euro. Aarav swaps 600 rupees for 6 euros and buys the toy.",
        "Am Schalter geben 1 Euro 100 Rupien. Lena tauscht 6 Euro gegen 600 Rupien und kauft das Spielzeug.",
        "W kantorze 1 złoty daje 20 rupii. Zofia wymienia 30 złotych na 600 rupii i kupuje zabawkę.",
        lang,
      )}
    >
      {step >= 1 && <RateRow x={190} y={20} lang={lang} rate={rate} />}
      {step >= 2 && (
        <TermChip x={190} y={130} w={260}>
          {alt("exchange rate", "Wechselkurs", "kurs walutowy", lang)}
        </TermChip>
      )}
      {step >= 3 && (
        <>
          <Amount x={60} y={190} n={t.homeCoins} code={c.home} />
          <Arrow from={[150, 215]} to={[220, 215]} />
          <Amount x={260} y={190} n={swapCoins(t.homeCoins, rate)} code={c.away} />
        </>
      )}
      {step >= 4 && (
        <>
          <Arrow from={[350, 215]} to={[420, 215]} />
          <Pop x={450} y={175}>
            <ToyCar x={0} y={0} />
          </Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 4: a later day. The rate moved, the same coins now come up short. */
export function DayTwoDiagram({ lang, step }: DiagramProps) {
  const t = TRIPS[lang];
  const rate = rateOf(lang, 1);
  const c = CODES[lang];
  const got = swapCoins(t.homeCoins, rate);
  return (
    <DiagramCanvas
      label={alt(
        "A week later 120 rupees give 1 euro. 600 rupees give only 5 euros, one short.",
        "Eine Woche später geben 1 Euro nur 80 Rupien. 6 Euro geben nur 480 Rupien, zu wenig.",
        "Tydzień później 1 złoty daje 16 rupii. 30 złotych daje tylko 480 rupii, za mało.",
        lang,
      )}
    >
      {step >= 1 && (
        <Pop x={30} y={20}>
          <Clock x={0} y={0} size={70} />
        </Pop>
      )}
      {step >= 2 && <RateRow x={190} y={20} lang={lang} rate={rate} />}
      {step >= 3 && (
        <>
          <Amount x={60} y={150} n={t.homeCoins} code={c.home} />
          <Arrow from={[150, 175]} to={[220, 175]} />
          <Amount x={260} y={150} n={got} code={c.away} />
        </>
      )}
      {step >= 4 && (
        <>
          <PriceTag x={440} y={130} lang={lang} />
          <Pop x={530} y={140}>
            <NoSign x={0} y={0} size={70} />
          </Pop>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 5: nothing else changed, only the exchange rate moved. */
export function OnlyRateMovedDiagram({ lang, step }: DiagramProps) {
  const t = TRIPS[lang];
  const c = CODES[lang];
  return (
    <DiagramCanvas
      label={alt(
        "The same rupees, the same toy and the same price tag. Only the exchange rate moved.",
        "Dieselben Euro, dasselbe Spielzeug, dasselbe Preisschild. Nur der Wechselkurs hat sich bewegt.",
        "Te same złote, ta sama zabawka, ta sama cena. Zmienił się tylko kurs walutowy.",
        lang,
      )}
    >
      {step >= 1 && (
        <Pop x={50} y={50}>
          <Coin x={0} y={0} size={60} />
          <text className="diagram-name" x={30} y={95} textAnchor="middle">
            {`${t.homeCoins} ${c.home}`}
          </text>
        </Pop>
      )}
      {step >= 2 && (
        <>
          <Pop x={190} y={60}>
            <ToyCar x={0} y={0} />
          </Pop>
          <PriceTag x={320} y={40} lang={lang} />
        </>
      )}
      {step >= 3 && (
        <>
          <Pop x={470} y={40}>
            <Swap x={0} y={0} size={70} />
          </Pop>
          <Arrow from={[505, 130]} to={[505, 90]} color="#2e8b57" />
          <Arrow from={[535, 100]} to={[535, 150]} color="#c0392b" />
          <TermChip x={380} y={190} w={240}>
            {alt("exchange rate", "Wechselkurs", "kurs walutowy", lang)}
          </TermChip>
        </>
      )}
    </DiagramCanvas>
  );
}

/** Beat 6: the rate moves the other way, and the same coins buy the toy with some left over. */
export function DayThreeDiagram({ lang, step }: DiagramProps) {
  const t = TRIPS[lang];
  const rate = rateOf(lang, 2);
  const c = CODES[lang];
  const got = swapCoins(t.homeCoins, rate);
  return (
    <DiagramCanvas
      label={alt(
        "Later 80 rupees give 1 euro. 600 rupees give 7 euros, enough for the toy with one left over.",
        "Später geben 1 Euro 120 Rupien. 6 Euro geben 720 Rupien, genug für das Spielzeug mit Rest.",
        "Później 1 złoty daje 24 rupie. 30 złotych daje 720 rupii, starczy na zabawkę z resztą.",
        lang,
      )}
    >
      {step >= 1 && (
        <Pop x={30} y={20}>
          <Clock x={0} y={0} size={70} />
        </Pop>
      )}
      {step >= 2 && <RateRow x={190} y={20} lang={lang} rate={rate} />}
      {step >= 3 && (
        <>
          <Amount x={60} y={150} n={t.homeCoins} code={c.home} />
          <Arrow from={[150, 175]} to={[220, 175]} />
          <Amount x={260} y={150} n={got} code={c.away} />
        </>
      )}
      {step >= 4 && (
        <>
          <Arrow from={[350, 175]} to={[420, 175]} />
          <Pop x={450} y={135}>
            <ToyCar x={0} y={0} />
          </Pop>
        </>
      )}
    </DiagramCanvas>
  );
}
