import { useState } from "react";
import { CheckButton, Slider, Stage, ToyButton } from "../lesson/toolkit";
import type { Lang } from "../progress";
import {
  BANK_DOMINOES,
  DOMINO_COUNT,
  MAX_BUFFER,
  fallenCount,
  shopsAreSafe,
} from "./bailouts.logic";
import "./bailouts.css";

const L = (lang: Lang, en: string, de: string, pl: string) =>
  lang === "de" ? de : lang === "pl" ? pl : en;

interface Props {
  lang: Lang;
  /** "toy": push the bank domino yourself. "quiz": the fall is shown and you press Check. */
  mode?: "toy" | "quiz";
  onDone?: () => void;
  onAnswer?: (correct: boolean) => void;
}

export function BailoutsToy({ lang, mode = "toy", onDone, onAnswer }: Props) {
  const [buffer, setBuffer] = useState(0);
  const [pushed, setPushed] = useState(mode === "quiz");

  const fallen = pushed ? fallenCount(buffer) : 0;
  const safe = shopsAreSafe(buffer);

  const change = (v: number) => {
    setBuffer(v);
    if (mode === "toy") setPushed(false);
  };

  const push = () => {
    setPushed(true);
    if (shopsAreSafe(buffer)) onDone?.();
  };

  const status = !pushed
    ? L(
        lang,
        "Set the buffer. Then push the bank domino.",
        "Stelle den Puffer ein. Dann schubse den Bank-Stein.",
        "Ustaw bufor. Potem pchnij kostkę banku.",
      )
    : safe
      ? L(
          lang,
          "The wall holds. The shops stay open.",
          "Die Wand hält. Die Läden bleiben offen.",
          "Ściana trzyma. Sklepy zostają otwarte.",
        )
      : L(
          lang,
          "The shops fall too. Add more buffer.",
          "Die Läden fallen auch um. Mehr Puffer!",
          "Sklepy też się przewracają. Dodaj bufor.",
        );

  const dominoes = Array.from({ length: DOMINO_COUNT }, (_, i) => {
    const kind = i < BANK_DOMINOES ? "bo-domino-bank" : "bo-domino-shop";
    const down = i < fallen ? " bo-fallen" : "";
    const wall = pushed && i === fallen;
    return (
      <span key={i} style={{ display: "contents" }}>
        {wall && <span className="bo-wall" aria-hidden="true" />}
        <span className={`bo-domino ${kind}${down}`} aria-hidden="true" />
      </span>
    );
  });

  return (
    <div className="bo">
      <Stage label={L(lang, "A row of dominoes", "Eine Reihe Dominosteine", "Rząd kostek domina")}>
        <div className="bo-row">{dominoes}</div>
        <div className="bo-legend">
          <span>{L(lang, "Banks", "Banken", "Banki")}</span>
          <span>{L(lang, "Shops", "Läden", "Sklepy")}</span>
        </div>
      </Stage>
      <Slider
        label={L(lang, "Buffer", "Puffer", "Bufor")}
        value={buffer}
        min={0}
        max={MAX_BUFFER}
        onChange={change}
        left={L(lang, "none", "keiner", "brak")}
        right={L(lang, "big", "groß", "duży")}
      />
      <p className="bo-status" role="status">
        {status}
      </p>
      <div className="bo-actions">
        {mode === "toy" ? (
          <ToyButton onClick={push} hint={!pushed}>
            {L(lang, "Push the bank domino", "Bank-Stein schubsen", "Pchnij kostkę banku")}
          </ToyButton>
        ) : (
          <CheckButton lang={lang} onClick={() => onAnswer?.(safe)} />
        )}
      </div>
    </div>
  );
}
