import { useState } from "react";
import { Bread, Coin, InlineIcon, Person } from "../components/icons";
import { CAST } from "../components/cast";
import { CheckButton, Stage, ToyButton } from "../lesson/toolkit";
import type { Text } from "../lesson/types";
import type { Lang } from "../progress";
import { CoinPress, CoinStack } from "./printing.icons";
import "./printing.css";

const T = (en: string, de: string): Text => ({ en, de });

/** Ripple Town starts with 20 coins and 10 loaves a day, so one loaf costs 2 coins. */
export const START_COINS = 20;
export const START_LOAVES = 10;
export const START_PRICE = 2;
export const MAX_PRINTED = 80;
export const MAX_LOAVES = 40;

export function fmt(n: number, lang: Lang): string {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(1);
  return lang === "de" ? s.replace(".", ",") : s;
}

/** The price of one loaf is simply: coins in town divided by loaves baked. */
export function loafPrice(printed: number, loaves: number): number {
  return (START_COINS + printed) / loaves;
}

/** True when the price is still exactly the starting price (integer maths, no rounding). */
export function priceUnchanged(printed: number, loaves: number): boolean {
  return START_COINS + printed === START_PRICE * loaves;
}

export function say(printed: number, loaves: number): Text {
  const total = START_COINS + printed;
  if (total === START_PRICE * loaves) {
    return printed === 0
      ? T("Nothing printed yet. A loaf costs 2 coins.", "Noch nichts gedruckt. Ein Brot kostet 2 Münzen.")
      : T(
          "More coins AND more bread. The price stays at 2 coins!",
          "Mehr Münzen UND mehr Brot. Der Preis bleibt bei 2 Münzen!",
        );
  }
  if (total > START_PRICE * loaves) {
    return T(
      "More coins want the same bread, so each coin buys less. Prices go up!",
      "Mehr Münzen wollen das gleiche Brot, also kauft jede Münze weniger. Die Preise steigen!",
    );
  }
  return T(
    "Lots of bread and not so many coins. Bread gets cheaper.",
    "Viel Brot und nicht so viele Münzen. Das Brot wird billiger.",
  );
}

/** The picture: coin stacks (one stack is 10 coins) on the left, loaves on the right. */
function Picture({ lang, printed, loaves }: { lang: Lang; printed: number; loaves: number }) {
  const total = START_COINS + printed;
  const stacks = total / 10;
  const newFrom = START_COINS / 10;
  return (
    <svg
      className="diagram pr-canvas"
      viewBox="0 0 640 188"
      role="img"
      aria-label={
        lang === "en"
          ? `Ripple Town has ${total} coins and ${loaves} loaves of bread.`
          : `Ripple Town hat ${total} Münzen und ${loaves} Brote.`
      }
    >
      <g>
        <Coin x={10} y={2} size={44} />
        <text className="diagram-name" x={64} y={36} style={{ fontSize: 30, fontWeight: 800 }}>
          {total}
        </text>
      </g>
      <g transform="translate(150 6)">
        <CoinStack size={36} />
        <text className="diagram-small" x={40} y={24}>
          = {lang === "en" ? "10 coins" : "10 Münzen"}
        </text>
      </g>
      <g>
        <Bread x={346} y={2} size={44} />
        <text className="diagram-name" x={400} y={36} style={{ fontSize: 30, fontWeight: 800 }}>
          {loaves}
        </text>
      </g>
      <path d="M322 8 V180" stroke="#c9b98f" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
      {Array.from({ length: stacks }, (_, i) => (
        <g key={i} className={i >= newFrom ? "pop" : undefined}>
          <CoinStack x={8 + (i % 5) * 60} y={58 + Math.floor(i / 5) * 62} size={58} />
        </g>
      ))}
      {Array.from({ length: loaves }, (_, i) => (
        <Bread key={i} x={342 + (i % 10) * 29} y={58 + Math.floor(i / 10) * 31} size={28} />
      ))}
    </svg>
  );
}

function PriceTag({ lang, printed, loaves }: { lang: Lang; printed: number; loaves: number }) {
  const total = START_COINS + printed;
  const price = loafPrice(printed, loaves);
  const cls = priceUnchanged(printed, loaves) ? "same" : total > START_PRICE * loaves ? "up" : "down";
  return (
    <div className={`pr-tag ${cls}`} role="status">
      <InlineIcon size={34}>
        <Bread />
      </InlineIcon>
      <span aria-hidden="true">= {fmt(price, lang)}</span>
      <InlineIcon size={34}>
        <Coin />
      </InlineIcon>
      <span className="sr-only">{lang === "en"
          ? `1 loaf = ${fmt(price, lang)} ${price === 1 ? "coin" : "coins"}`
          : `1 Brot = ${fmt(price, lang)} ${price === 1 ? "Münze" : "Münzen"}`}</span>
    </div>
  );
}

/**
 * The coin press toy. Press the coin press to print 10 new coins, ask Bea to bake more loaves.
 * With `onCheck` it shows the Check button for the widget question.
 */
export function PrintToy({
  lang,
  onCheck,
  onInteract,
}: {
  lang: Lang;
  onCheck?: (correct: boolean) => void;
  onInteract?: () => void;
}) {
  const [printed, setPrinted] = useState(0);
  const [loaves, setLoaves] = useState(START_LOAVES);
  const t = (en: string, de: string) => (lang === "en" ? en : de);
  return (
    <div className="stage-wrap">
      <Stage label={t("Ripple Town coins and bread", "Münzen und Brot in Ripple Town")}>
        <div className="pr">
          <Picture lang={lang} printed={printed} loaves={loaves} />
          <PriceTag lang={lang} printed={printed} loaves={loaves} />
          <p className="pr-say">{say(printed, loaves)[lang]}</p>
        </div>
      </Stage>
      <div className="row wrap pr-btns">
        <ToyButton
          disabled={printed >= MAX_PRINTED}
          onClick={() => {
            setPrinted(printed + 10);
            onInteract?.();
          }}
        >
          <span className="btn-icons">
            <InlineIcon size={30}>
              <CoinPress />
            </InlineIcon>
            <span aria-hidden="true">→</span>
            <InlineIcon size={30}>
              <CoinStack />
            </InlineIcon>
            <span aria-hidden="true">+10</span>
            <span className="sr-only">{t("Print 10 new coins", "10 neue Münzen drucken")}</span>
          </span>
        </ToyButton>
        <ToyButton
          disabled={printed <= 0}
          onClick={() => {
            setPrinted(printed - 10);
            onInteract?.();
          }}
        >
          <span className="btn-icons">
            <InlineIcon size={30}>
              <CoinStack />
            </InlineIcon>
            <span aria-hidden="true">-10</span>
            <span className="sr-only">{t("Take 10 printed coins away", "10 gedruckte Münzen wegnehmen")}</span>
          </span>
        </ToyButton>
        <ToyButton
          disabled={loaves >= MAX_LOAVES}
          onClick={() => {
            setLoaves(loaves + 5);
            onInteract?.();
          }}
        >
          <span className="btn-icons">
            <InlineIcon size={30}>
              <Person {...CAST.Bea} />
            </InlineIcon>
            <span aria-hidden="true">→</span>
            <InlineIcon size={30}>
              <Bread />
            </InlineIcon>
            <span aria-hidden="true">+5</span>
            <span className="sr-only">{t("Bea bakes 5 more loaves", "Bea backt 5 Brote mehr")}</span>
          </span>
        </ToyButton>
        <ToyButton
          disabled={loaves <= START_LOAVES}
          onClick={() => {
            setLoaves(loaves - 5);
            onInteract?.();
          }}
        >
          <span className="btn-icons">
            <InlineIcon size={30}>
              <Bread />
            </InlineIcon>
            <span aria-hidden="true">-5</span>
            <span className="sr-only">{t("Bea bakes 5 fewer loaves", "Bea backt 5 Brote weniger")}</span>
          </span>
        </ToyButton>
        <ToyButton
          onClick={() => {
            setPrinted(0);
            setLoaves(START_LOAVES);
          }}
        >
          <span className="sr-only">{t("Start again", "Von vorn")}</span>
          <span aria-hidden="true">↺</span>
        </ToyButton>
        {onCheck && <CheckButton lang={lang} onClick={() => onCheck(printed > 0 && priceUnchanged(printed, loaves))} />}
      </div>
    </div>
  );
}
