import { useState } from "react";
import { ActionPrompt, CheckButton, Stage, ToyButton } from "../lesson/toolkit";
import type { Lang } from "../progress";
import { isFinished, nextStep, type VaultStep } from "./currencies.logic";
import "./currencies.css";

type Tri = [string, string, string];

const L = (lang: Lang, [en, de, pl]: Tri) => (lang === "de" ? de : lang === "pl" ? pl : en);

const PROMPTS: Record<VaultStep, Tri> = {
  swap: [
    "Swap your gold for a paper note at the vault.",
    "Tausche dein Gold im Tresor gegen einen Geldschein.",
    "Wymień swoje złoto w skarbcu na papierowy banknot.",
  ],
  buy: [
    "Use the note to buy bread from Bea.",
    "Kaufe mit dem Schein Brot bei Bea.",
    "Kup banknotem chleb od Bei.",
  ],
  stop: [
    "Now the vault stops swapping notes for gold.",
    "Jetzt tauscht der Tresor keine Scheine mehr gegen Gold.",
    "Teraz skarbiec przestaje wymieniać banknoty na złoto.",
  ],
  check: [
    "Check: does the note still buy bread?",
    "Prüfe: Kauft der Schein noch Brot?",
    "Sprawdź: czy banknot nadal kupuje chleb?",
  ],
};

const LABELS: Record<VaultStep, Tri> = {
  swap: ["Swap gold for a note", "Gold gegen Schein tauschen", "Wymień złoto na banknot"],
  buy: ["Buy bread", "Brot kaufen", "Kup chleb"],
  stop: ["Stop the gold swap", "Gold-Tausch stoppen", "Zatrzymaj wymianę na złoto"],
  check: ["Buy bread again", "Noch einmal Brot kaufen", "Kup chleb jeszcze raz"],
};

const DONE: Tri = [
  "Yes! Bea still takes the note. Everyone in town accepts it.",
  "Ja! Bea nimmt den Schein noch. Alle in der Stadt nehmen ihn an.",
  "Tak! Bea nadal bierze banknot. Wszyscy w mieście go przyjmują.",
];

interface Props {
  lang: Lang;
  /** "toy": onDone fires after the last step. "quiz": Check appears after the last step. */
  mode?: "toy" | "quiz";
  onDone?: () => void;
  onAnswer?: (correct: boolean) => void;
}

export function VaultSwapToy({ lang, mode = "toy", onDone, onAnswer }: Props) {
  const [done, setDone] = useState(0);
  const step = nextStep(done);

  const press = () => {
    const next = done + 1;
    setDone(next);
    if (isFinished(next)) onDone?.();
  };

  // What the scene shows after `done` steps. Steps: 1 swapped, 2 bought, 3 vault stopped, 4 checked.
  const hasGold = done < 1;
  const hasNote = done >= 1 && done !== 2;
  const hasBread = done >= 2;
  const vaultOpen = done < 3;

  return (
    <div className="currencies-toy">
      <Stage
        label={L(lang, [
          "The Ripple Town vault",
          "Der Tresor von Ripple Town",
          "Skarbiec Ripple Town",
        ])}
      >
        <div className="currencies-scene">
          <div className="currencies-slot">
            <div
              className={
                vaultOpen ? "currencies-vault" : "currencies-vault currencies-vault-closed"
              }
            >
              {hasGold && <span className="currencies-gold" aria-hidden="true" />}
            </div>
            <span>{L(lang, ["Vault", "Tresor", "Skarbiec"])}</span>
          </div>
          <div className="currencies-slot">
            {hasNote && <span className="currencies-note" aria-hidden="true" />}
            <span>{L(lang, ["Note", "Schein", "Banknot"])}</span>
          </div>
          <div className="currencies-slot">
            {hasBread && <span className="currencies-bread" aria-hidden="true" />}
            <span>{L(lang, ["Bread", "Brot", "Chleb"])}</span>
          </div>
        </div>
      </Stage>
      <ActionPrompt lang={lang}>
        {step === null ? L(lang, DONE) : L(lang, PROMPTS[step])}
      </ActionPrompt>
      <div className="currencies-actions">
        {step !== null ? (
          <ToyButton onClick={press} hint>
            {L(lang, LABELS[step])}
          </ToyButton>
        ) : mode === "quiz" ? (
          <CheckButton lang={lang} onClick={() => onAnswer?.(true)} />
        ) : null}
      </div>
    </div>
  );
}
