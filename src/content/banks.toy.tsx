import { CAST } from "../components/cast";
import type { CastName } from "../components/cast";
import { Arrow, Pop } from "../components/diagram";
import { Coin, InlineIcon, Person } from "../components/icons";
import { Slider, Stage, ToyButton } from "../lesson/toolkit";
import type { Text } from "../lesson/types";
import type { Lang } from "../progress";
import { BankBuilding, Crowd, Oven } from "./banks.icons";
import "./banks.css";

const T = (en: string, de: string): Text => ({ en, de });

/** Bea needs this many coins for her oven. */
export const OVEN_NEED = 4;
export const MAX_SAVED = 16;

export interface Board {
  /** Coins the savers have put into the bank. */
  saved: number;
  /** Coins the bank has lent to Bea. */
  lent: number;
  /** Is it a bank run day (many savers come at once)? */
  rush: boolean;
}

export const START: Board = { saved: 10, lent: 0, rush: false };

/** How many coins the savers ask for today. A normal day: about one fifth. A rush day: half. */
export function coinsAsked(saved: number, rush: boolean): number {
  return rush ? Math.ceil(saved / 2) : Math.ceil(saved / 5);
}

/** The widget question is solved when Bea can build her oven AND a rush day is still fine. */
export function bankIsBalanced(b: Board): boolean {
  const ready = b.saved - b.lent;
  return b.lent >= OVEN_NEED && ready >= coinsAsked(b.saved, true);
}

const ASKERS: CastName[] = ["Pim", "Pip", "Sam", "Finn"];

/** A grid of coins that pop in as they are added. */
function CoinGrid({ n, x, y, size, perRow }: { n: number; x: number; y: number; size: number; perRow: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <Pop key={i}>
          <Coin x={x + (i % perRow) * (size + 3)} y={y + Math.floor(i / perRow) * (size + 3)} size={size} />
        </Pop>
      ))}
    </>
  );
}

const small = { font: "700 16px ui-rounded, 'SF Pro Rounded', Nunito, system-ui, sans-serif" } as const;
const big = { font: "800 26px ui-rounded, 'SF Pro Rounded', Nunito, system-ui, sans-serif" } as const;

export function BankBoard({ lang, s }: { lang: Lang; s: Board }) {
  const ready = s.saved - s.lent;
  const asks = coinsAsked(s.saved, s.rush);
  const missing = Math.max(0, asks - ready);
  const trouble = s.saved > 0 && missing > 0;
  const en = lang === "en";

  let saverSay: Text;
  if (s.saved === 0) {
    saverSay = T(
      "The bank is empty. Slide the first slider to bring in coins.",
      "Die Bank ist leer. Schiebe den ersten Regler, um Münzen zu bringen.",
    );
  } else if (trouble) {
    saverSay = T(
      `Uh-oh! Savers want ${asks} coins, but only ${ready} are ready. ${missing} must wait.`,
      `Oje! Die Sparer wollen ${asks} Münzen, aber nur ${ready} sind bereit. ${missing} müssen warten.`,
    );
  } else if (s.rush) {
    saverSay = T(
      `Bank run! Savers want ${asks} coins back. The bank has them ready.`,
      `Ansturm! Die Sparer wollen ${asks} Münzen zurück. Die Bank hat sie bereit.`,
    );
  } else {
    saverSay = T(
      `A normal day: savers want ${asks} coins back. The bank hands them over.`,
      `Ein normaler Tag: Die Sparer wollen ${asks} Münzen zurück. Die Bank gibt sie her.`,
    );
  }

  let beaSay: Text;
  if (s.lent === 0) {
    beaSay = T("Bea gets no coins, so no new oven.", "Bea bekommt keine Münzen, also keinen neuen Ofen.");
  } else if (s.lent < OVEN_NEED) {
    beaSay = T(
      `Bea has ${s.lent} coins. She needs ${OVEN_NEED} for her oven.`,
      `Bea hat ${s.lent} Münzen. Für ihren Ofen braucht sie ${OVEN_NEED}.`,
    );
  } else {
    beaSay = T("Bea has enough for her oven. She bakes more bread!", "Bea hat genug für ihren Ofen. Sie backt mehr Brot!");
  }

  const bankStroke = trouble ? "#c0392b" : s.rush ? "#f08a2e" : "#4fa75a";
  const bankFill = trouble ? "#fdeaea" : s.rush ? "#fff4e4" : "#ffffff";
  const askGap = Math.min(34, 200 / Math.max(asks, 1));
  const askStart = 320 - (asks * askGap) / 2;

  return (
    <Stage label={en ? "Savers, the bank and Bea" : "Sparer, die Bank und Bea"}>
      <div className="bk">
        <svg
          className="diagram bk-svg"
          viewBox="0 0 640 224"
          role="img"
          aria-label={
            en
              ? `${s.saved} coins saved, ${ready} ready in the bank, ${s.lent} lent to Bea. Savers ask for ${asks} coins.`
              : `${s.saved} Münzen gespart, ${ready} bereit in der Bank, ${s.lent} an Bea verliehen. Die Sparer wollen ${asks} Münzen.`
          }
        >
          {/* savers */}
          <rect x="4" y="4" width="170" height="216" rx="18" fill="#fff" stroke="#23383f" strokeWidth="3" />
          <Person {...CAST.Finn} x={44} y={10} size={86} />
          <text x="89" y="138" textAnchor="middle" className="diagram-name">{en ? "Savers" : "Sparer"}</text>
          <Coin x={28} y={152} size={38} />
          <text x="76" y="182" fill="#23383f" style={big}>{s.saved}</text>
          <text x="89" y="208" textAnchor="middle" fill="#5b7078" style={small}>{en ? "coins saved" : "Münzen gespart"}</text>

          {/* arrows */}
          <Arrow from={[178, 80]} to={[212, 80]} width={4} head={10} />
          <Arrow from={[428, 80]} to={[462, 80]} width={4} head={10} />

          {/* bank */}
          <rect x="216" y="4" width="208" height="216" rx="18" fill={bankFill} stroke={bankStroke} strokeWidth="5" />
          <BankBuilding x={226} y={8} size={84} />
          <text x="316" y="46" fill="#23383f" style={big}>{ready}</text>
          <text x="316" y="68" fill="#5b7078" style={small}>{en ? "ready" : "bereit"}</text>
          <text x="320" y="110" textAnchor="middle" className="diagram-name">Bank</text>
          <CoinGrid n={ready} x={224} y={120} size={21} perRow={8} />
          {Array.from({ length: asks }, (_, i) => (
            <Pop key={i} x={askStart + i * askGap} y={176}>
              <Person {...CAST[ASKERS[i % ASKERS.length]]} mood={i < ready ? "happy" : "sad"} size={36} />
            </Pop>
          ))}

          {/* Bea */}
          <rect x="466" y="4" width="170" height="216" rx="18" fill="#fff" stroke="#23383f" strokeWidth="3" />
          <Person {...CAST.Bea} x={474} y={14} size={72} />
          <Oven x={554} y={20} size={66} lit={s.lent >= OVEN_NEED} />
          <text x="551" y="106" textAnchor="middle" className="diagram-name">Bea</text>
          <CoinGrid n={s.lent} x={472} y={116} size={20} perRow={7} />
          <text x="551" y="208" textAnchor="middle" fill="#5b7078" style={small}>
            {en ? `${s.lent} coins lent` : `${s.lent} Münzen geliehen`}
          </text>
        </svg>
        <div className="bk-says" role="status">
          <p className={`bk-say${trouble ? " bk-say-bad" : ""}`}>{saverSay[lang]}</p>
          <p className="bk-say">{beaSay[lang]}</p>
        </div>
      </div>
    </Stage>
  );
}

export function Controls({ lang, s, set }: { lang: Lang; s: Board; set: (b: Board) => void }) {
  const en = lang === "en";
  return (
    <div className="bk-controls">
      <Slider
        label={en ? "Coins saved" : "Gespart"}
        value={s.saved}
        min={0}
        max={MAX_SAVED}
        onChange={(v) => set({ ...s, saved: v, lent: Math.min(s.lent, v) })}
      />
      <Slider
        label={en ? "Lent to Bea" : "An Bea verliehen"}
        value={s.lent}
        min={0}
        max={s.saved}
        onChange={(v) => set({ ...s, lent: v })}
      />
      <div className="row wrap bk-buttons">
        <ToyButton pressed={s.rush} onClick={() => set({ ...s, rush: !s.rush })}>
          <span className="btn-icons">
            <InlineIcon size={30}>
              <Crowd />
            </InlineIcon>
            {en ? "Bank run" : "Ansturm"}
          </span>
        </ToyButton>
        <ToyButton onClick={() => set(START)}>
          <span className="sr-only">{en ? "Start again" : "Von vorn"}</span>
          <span aria-hidden="true">↺</span>
        </ToyButton>
      </div>
    </div>
  );
}
