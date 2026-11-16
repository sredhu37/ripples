import { useState } from "react";
import { InlineIcon, Bread, Coin, Shoe } from "../components/icons";
import { Stage, ToyButton } from "../lesson/toolkit";
import type { Lang } from "../progress";
import "./centralbanks.css";

const alt = (en: string, de: string, pl: string, lang: Lang) =>
  lang === "pl" ? pl : lang === "de" ? de : en;

/* ---------- Round 1: the independence shield ---------- */

export const START_PRICE = 10;
export const PRINT_RAISE = 3;
export const ROUNDS = 3;

/** Each coin batch printed for a gift raises the bread price. Saying no keeps it. */
export function priceAfter(printed: number): number {
  return START_PRICE + printed * PRINT_RAISE;
}

function ShieldRound({ lang, onDone }: { lang: Lang; onDone: () => void }) {
  const [asked, setAsked] = useState(0);
  const [printed, setPrinted] = useState(0);
  const price = priceAfter(printed);
  const answer = (print: boolean) => {
    if (print) setPrinted(printed + 1);
    setAsked(asked + 1);
  };
  return (
    <Stage
      label={alt("Independence shield", "Unabhängigkeits-Schild", "Tarcza niezależności", lang)}
    >
      <p className="cb-line">
        {alt(
          "Mayor Moss wants votes. He asks you to print coins for gifts.",
          "Bürgermeister Moss will Stimmen. Er bittet dich, Münzen für Geschenke zu drucken.",
          "Burmistrz Moss chce głosów. Prosi cię o druk monet na prezenty.",
          lang,
        )}
      </p>
      <div className="cb-price" aria-live="polite">
        <InlineIcon size={40}>
          <Bread />
        </InlineIcon>
        <strong>
          {alt("Bread", "Brot", "Chleb", lang)}: {price}
        </strong>
        <InlineIcon size={34}>
          <Coin />
        </InlineIcon>
      </div>
      {asked < ROUNDS ? (
        <div className="row wrap">
          <ToyButton onClick={() => answer(true)}>
            {alt("Print coins", "Münzen drucken", "Drukuj monety", lang)}
          </ToyButton>
          <ToyButton onClick={() => answer(false)} hint>
            {alt("Say no", "Nein sagen", "Powiedz nie", lang)}
          </ToyButton>
        </div>
      ) : (
        <p className="cb-line" role="status">
          {printed === 0
            ? alt(
                "The shield held. Bread costs the same.",
                "Das Schild hat gehalten. Das Brot kostet gleich viel.",
                "Tarcza wytrzymała. Chleb kosztuje tyle samo.",
                lang,
              )
            : alt(
                "Printed coins made bread cost more.",
                "Gedruckte Münzen machen das Brot teurer.",
                "Wydrukowane monety podniosły cenę chleba.",
                lang,
              )}
        </p>
      )}
      {asked >= ROUNDS && (
        <ToyButton onClick={onDone} hint>
          {alt(
            "Next: the loan window",
            "Weiter: der Kredit-Schalter",
            "Dalej: okienko pożyczek",
            lang,
          )}
        </ToyButton>
      )}
    </Stage>
  );
}

/* ---------- Round 2: the emergency loan window ---------- */

export type Who = "bea" | "sam" | "pim";
export type Choice = "lend" | "refuse";

/** Bea and Sam have collateral that is worth something. Pim only has a drawing. */
export const SOUND: Record<Who, boolean> = { bea: true, sam: true, pim: false };
const WHO: Who[] = ["bea", "sam", "pim"];

/** The child did the right thing when every sound bank got coins and the drawing got none. */
export function allRight(choices: Partial<Record<Who, Choice>>): boolean {
  return WHO.every((w) => choices[w] === (SOUND[w] ? "lend" : "refuse"));
}

function Collateral({ who }: { who: Who }) {
  if (who === "bea")
    return (
      <InlineIcon size={40}>
        <Bread />
      </InlineIcon>
    );
  if (who === "sam")
    return (
      <InlineIcon size={40}>
        <Shoe />
      </InlineIcon>
    );
  return (
    <InlineIcon size={40}>
      <path
        d="M14 70 C24 20 36 90 48 40 C58 10 70 80 86 30"
        fill="none"
        stroke="#7e8d95"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </InlineIcon>
  );
}

function name(who: Who, lang: Lang): string {
  return who === "bea"
    ? alt("Bea's bakery", "Beas Bäckerei", "Piekarnia Bei", lang)
    : who === "sam"
      ? alt("Sam's shoe shop", "Sams Schuhladen", "Sklep Sama z butami", lang)
      : alt("A drawing", "Eine Zeichnung", "Rysunek", lang);
}

function outcome(who: Who, c: Choice, lang: Lang): string {
  if (SOUND[who] && c === "lend")
    return alt(
      "Paid back later. The bank stays open.",
      "Wird später zurückgezahlt. Die Bank bleibt offen.",
      "Zwrot później. Bank zostaje otwarty.",
      lang,
    );
  if (SOUND[who])
    return alt(
      "No coins. A good bank closes.",
      "Keine Münzen. Eine gute Bank macht zu.",
      "Brak monet. Dobry bank się zamyka.",
      lang,
    );
  if (c === "lend")
    return alt(
      "A drawing is worth nothing. Coins lost.",
      "Eine Zeichnung ist nichts wert. Münzen weg.",
      "Rysunek nic nie jest wart. Monety przepadły.",
      lang,
    );
  return alt(
    "Good. A drawing is not collateral.",
    "Gut. Eine Zeichnung ist kein Pfand.",
    "Dobrze. Rysunek to nie zastaw.",
    lang,
  );
}

/** Three banks ask for emergency coins. The child lends or refuses for each. */
export function WindowRound({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (choices: Partial<Record<Who, Choice>>) => void;
}) {
  const [choices, setChoices] = useState<Partial<Record<Who, Choice>>>({});
  const pick = (who: Who, c: Choice) => {
    const next = { ...choices, [who]: c };
    setChoices(next);
    onChange(next);
  };
  return (
    <Stage label={alt("Liquidity window", "Notkredit-Schalter", "Okienko pożyczek", lang)}>
      <p className="cb-line">
        {alt(
          "A rumor scares people. Three banks ask for coins. Look at what each one offers.",
          "Ein Gerücht macht Angst. Drei Banken bitten um Münzen. Schau, was jede anbietet.",
          "Plotka straszy ludzi. Trzy banki proszą o monety. Zobacz, co każdy oferuje.",
          lang,
        )}
      </p>
      {WHO.map((w) => {
        const c = choices[w];
        return (
          <div className="cb-ask" key={w}>
            <Collateral who={w} />
            <span className="cb-name">{name(w, lang)}</span>
            <ToyButton pressed={c === "lend"} onClick={() => pick(w, "lend")}>
              {alt("Lend coins", "Münzen leihen", "Pożycz monety", lang)}
            </ToyButton>
            <ToyButton pressed={c === "refuse"} onClick={() => pick(w, "refuse")}>
              {alt("Refuse", "Ablehnen", "Odmów", lang)}
            </ToyButton>
            {c && (
              <span className="cb-result" role="status">
                {outcome(w, c, lang)}
              </span>
            )}
          </div>
        );
      })}
    </Stage>
  );
}

/** Free play: first the shield round, then the window round. Done when every bank has an answer. */
export function CentralBanksToy({ lang, onDone }: { lang: Lang; onDone?: () => void }) {
  const [shieldDone, setShieldDone] = useState(false);
  if (!shieldDone) return <ShieldRound lang={lang} onDone={() => setShieldDone(true)} />;
  return (
    <WindowRound
      lang={lang}
      onChange={(c) => {
        if (WHO.every((w) => c[w])) onDone?.();
      }}
    />
  );
}
