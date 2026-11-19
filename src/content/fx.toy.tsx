import { useState } from "react";
import { Coin } from "../components/icons";
import { ActionPrompt, CheckButton, Stage, ToyButton } from "../lesson/toolkit";
import type { Lang } from "../progress";
import { TRIPS, canAfford, swapCoins } from "./fx.logic";
import "./fx.css";

type Tri = [string, string, string];

const L = (lang: Lang, [en, de, pl]: Tri) => (lang === "de" ? de : lang === "pl" ? pl : en);

/** Money codes: INR rupee, EUR euro, PLN zloty. */
const CODES: Record<Lang, { home: string; away: string }> = {
  en: { home: "INR", away: "EUR" },
  de: { home: "EUR", away: "INR" },
  pl: { home: "PLN", away: "INR" },
};

const DAYS: Tri[] = [
  ["Day 1", "Tag 1", "Dzień 1"],
  ["Day 2", "Tag 2", "Dzień 2"],
  ["Day 3", "Tag 3", "Dzień 3"],
];

type Phase = "pick" | "swapped" | "done";

interface Props {
  lang: Lang;
  /** "toy": onDone fires after the first swap-then-buy round. "quiz": Check appears after a round. */
  mode?: "toy" | "quiz";
  onDone?: () => void;
  onAnswer?: (correct: boolean) => void;
}

export function ShoppingTripToy({ lang, mode = "toy", onDone, onAnswer }: Props) {
  const trip = TRIPS[lang];
  const code = CODES[lang];
  const [day, setDay] = useState(0);
  const [phase, setPhase] = useState<Phase>("pick");
  const rate = trip.rates[day];
  const got = swapCoins(trip.homeCoins, rate);
  const affords = canAfford(trip.homeCoins, rate, trip.price);

  const chooseDay = (d: number) => {
    setDay(d);
    setPhase("pick");
  };

  const buy = () => {
    setPhase("done");
    onDone?.();
  };

  const prompt =
    phase === "pick"
      ? L(lang, [
          "Pick a day. Then swap your coins at that day's rate.",
          "Wähle einen Tag. Tausche dann deine Münzen zum Kurs des Tages.",
          "Wybierz dzień. Potem wymień monety po kursie z tego dnia.",
        ])
      : phase === "swapped"
        ? L(lang, [
            "Now try to buy the toy with your new coins.",
            "Versuche jetzt, das Spielzeug mit deinen neuen Münzen zu kaufen.",
            "Spróbuj teraz kupić zabawkę nowymi monetami.",
          ])
        : affords
          ? L(lang, [
              "You bought the toy! Try another day to see the rate move.",
              "Du hast das Spielzeug gekauft! Probiere einen anderen Tag aus.",
              "Zabawka kupiona! Spróbuj innego dnia, żeby zobaczyć zmianę kursu.",
            ])
          : L(lang, [
              "Not enough coins. Same coins, same toy, new rate. Try another day.",
              "Zu wenig Münzen. Gleiche Münzen, gleiches Spielzeug, neuer Kurs. Probiere einen anderen Tag.",
              "Za mało monet. Te same monety, ta sama zabawka, nowy kurs. Spróbuj innego dnia.",
            ]);

  return (
    <div className="fx-toy">
      <div className="fx-days" role="group" aria-label={L(lang, ["Day", "Tag", "Dzień"])}>
        {DAYS.map((d, i) => (
          <ToyButton key={i} onClick={() => chooseDay(i)} pressed={day === i}>
            {L(lang, d)}
          </ToyButton>
        ))}
      </div>
      <Stage label={L(lang, ["The swap desk", "Der Tauschschalter", "Kantor"])}>
        <div className="fx-scene">
          <div className="fx-slot">
            <Coin size={50} />
            <span className="fx-num">{`${trip.homeCoins} ${code.home}`}</span>
          </div>
          <div className="fx-rate">
            <span className="fx-rate-label">{L(lang, ["Rate", "Kurs", "Kurs"])}</span>
            <span className="fx-num">{`${rate.home} ${code.home}`}</span>
            <span aria-hidden="true">=</span>
            <span className="fx-num">{`${rate.away} ${code.away}`}</span>
          </div>
          <div className="fx-slot">
            <Coin size={50} />
            <span className="fx-num">{phase === "pick" ? "?" : `${got} ${code.away}`}</span>
          </div>
          <div className={affords && phase === "done" ? "fx-slot fx-bought" : "fx-slot"}>
            <span className="fx-toy-car" aria-hidden="true" />
            <span className="fx-num">{`${trip.price} ${code.away}`}</span>
          </div>
        </div>
      </Stage>
      <ActionPrompt lang={lang}>{prompt}</ActionPrompt>
      <div className="fx-actions">
        {phase === "pick" && (
          <ToyButton onClick={() => setPhase("swapped")} hint>
            {L(lang, ["Swap my coins", "Münzen tauschen", "Wymień monety"])}
          </ToyButton>
        )}
        {phase === "swapped" && (
          <ToyButton onClick={buy} hint>
            {L(lang, ["Buy the toy", "Spielzeug kaufen", "Kup zabawkę"])}
          </ToyButton>
        )}
        {phase === "done" && mode === "quiz" && (
          <CheckButton lang={lang} onClick={() => onAnswer?.(!affords)} />
        )}
      </div>
    </div>
  );
}
