import { useState } from "react";
import { CheckButton, Stage, ToyButton } from "../lesson/toolkit";
import type { Lang } from "../progress";
import {
  ITEMS,
  MAX_UNITS,
  YEARS,
  budgetYear,
  costOf,
  type ItemId,
  type Year,
} from "./deficit.logic";
import "./deficit.css";

const L = (lang: Lang, en: string, de: string, pl: string) =>
  lang === "de" ? de : lang === "pl" ? pl : en;

const NAMES: Record<ItemId, [string, string, string]> = {
  school: ["School", "Schule", "Szkoła"],
  road: ["Road", "Straße", "Droga"],
  park: ["Park", "Park", "Park"],
  wall: ["Harbour wall", "Hafenmauer", "Mur w porcie"],
};

/** The debt the town already owes in the quiz question. */
const QUIZ_DEBT = 8;

interface Props {
  lang: Lang;
  /** "toy": play 3 years. "quiz": one year with a debt of 8, then press Check. */
  mode?: "toy" | "quiz";
  onDone?: () => void;
  onAnswer?: (correct: boolean) => void;
}

function Seg({ units, kind, label }: { units: number; kind: string; label?: string }) {
  if (units <= 0) return null;
  return (
    <span
      className={`deficit-seg deficit-seg-${kind}`}
      style={{ width: `${(units / MAX_UNITS) * 100}%` }}
    >
      {label ?? units}
    </span>
  );
}

function Bars({
  lang,
  debt,
  year,
  spend,
}: {
  lang: Lang;
  debt: number;
  year: Year;
  spend: number;
}) {
  return (
    <div className="deficit-bars">
      <div className="deficit-row">
        <span className="deficit-row-name">{L(lang, "Pot", "Topf", "Garnek")}</span>
        <span className="deficit-track">
          <Seg units={year.available} kind="pot" />
          <Seg units={year.interest} kind="interest" />
        </span>
      </div>
      <div className="deficit-row">
        <span className="deficit-row-name">{L(lang, "Spending", "Ausgaben", "Wydatki")}</span>
        <span className="deficit-track">
          <Seg units={year.covered} kind="spend" />
          <Seg units={year.gap} kind="gap" />
          {spend === 0 && <span className="deficit-empty">0</span>}
        </span>
      </div>
      <div className="deficit-row">
        <span className="deficit-row-name">{L(lang, "Debt", "Schulden", "Dług")}</span>
        <span className="deficit-track">
          <Seg units={debt} kind="debt" />
          {debt === 0 && <span className="deficit-empty">0</span>}
        </span>
      </div>
    </div>
  );
}

export function DeficitToy({ lang, mode = "toy", onDone, onAnswer }: Props) {
  const quiz = mode === "quiz";
  const [year, setYear] = useState(1);
  const [debt, setDebt] = useState(quiz ? QUIZ_DEBT : 0);
  const [picked, setPicked] = useState<ItemId[]>([]);

  const finished = year > YEARS;
  const spend = costOf(picked);
  const result = budgetYear(debt, spend);

  const toggle = (id: ItemId) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const closeYear = () => {
    setDebt(result.debtAfter);
    setYear(year + 1);
    setPicked([]);
    if (result.balanced) onDone?.();
  };

  const playAgain = () => {
    setYear(1);
    setDebt(0);
    setPicked([]);
  };

  const status = result.balanced
    ? L(
        lang,
        "The year balances. No new gap.",
        "Das Jahr geht auf. Keine neue Lücke.",
        "Rok się bilansuje. Nie ma nowej luki.",
      )
    : L(
        lang,
        `Spending is ${result.gap} above the pot. The town borrows ${result.gap}.`,
        `Die Ausgaben liegen ${result.gap} über dem Topf. Die Stadt leiht ${result.gap}.`,
        `Wydatki są o ${result.gap} wyższe niż garnek. Miasteczko pożycza ${result.gap}.`,
      );

  return (
    <div className="deficit">
      <Stage
        label={L(lang, "Town budget years", "Haushaltsjahre der Stadt", "Lata budżetu miasta")}
      >
        <p className="deficit-year">
          {finished
            ? L(
                lang,
                `After ${YEARS} years the town owes ${debt}.`,
                `Nach ${YEARS} Jahren schuldet die Stadt ${debt}.`,
                `Po ${YEARS} latach miasteczko jest winne ${debt}.`,
              )
            : quiz
              ? L(lang, "This year", "Dieses Jahr", "Ten rok")
              : L(
                  lang,
                  `Year ${year} of ${YEARS}`,
                  `Jahr ${year} von ${YEARS}`,
                  `Rok ${year} z ${YEARS}`,
                )}
        </p>
        <Bars lang={lang} debt={debt} year={result} spend={spend} />
        {result.interest > 0 && !finished && (
          <p className="deficit-note">
            {L(
              lang,
              `Interest takes ${result.interest} from the pot.`,
              `Zinsen nehmen ${result.interest} aus dem Topf.`,
              `Odsetki zabierają ${result.interest} z garnka.`,
            )}
          </p>
        )}
      </Stage>
      {!finished && (
        <div
          className="deficit-items"
          role="group"
          aria-label={L(lang, "What to build", "Was bauen", "Co zbudować")}
        >
          {ITEMS.map((item) => {
            const [en, de, pl] = NAMES[item.id];
            return (
              <ToyButton
                key={item.id}
                pressed={picked.includes(item.id)}
                onClick={() => toggle(item.id)}
              >
                {L(lang, en, de, pl)} ({item.cost})
              </ToyButton>
            );
          })}
        </div>
      )}
      {!finished && (
        <p className="deficit-status" role="status">
          {status}
        </p>
      )}
      <div className="deficit-actions">
        {quiz ? (
          <CheckButton
            lang={lang}
            onClick={() =>
              onAnswer?.(picked.includes("school") && picked.includes("road") && result.balanced)
            }
          />
        ) : finished ? (
          <ToyButton onClick={playAgain} hint>
            {L(lang, "Play again", "Nochmal spielen", "Zagraj jeszcze raz")}
          </ToyButton>
        ) : (
          <ToyButton onClick={closeYear} hint={picked.length > 0}>
            {L(lang, "Close the year", "Jahr abschließen", "Zamknij rok")}
          </ToyButton>
        )}
      </div>
    </div>
  );
}
