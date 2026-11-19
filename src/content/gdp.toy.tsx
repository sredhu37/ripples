import { useRef, useState } from "react";
import { CheckButton, Slider, Stage, ToyButton } from "../lesson/toolkit";
import type { Lang } from "../progress";
import { BREAD_PRICE, FISH_PRICE, MAX_GDP, MAX_ITEMS, townGdp } from "./gdp.logic";
import "./gdp.css";

const L = (lang: Lang, en: string, de: string, pl: string) =>
  lang === "de" ? de : lang === "pl" ? pl : en;

interface Props {
  lang: Lang;
  /** "toy": free play. "quiz": set the bar to 8 with Bea giving bread away, then press Check. */
  mode?: "toy" | "quiz";
  onDone?: () => void;
  onAnswer?: (correct: boolean) => void;
}

export function GdpToy({ lang, mode = "toy", onDone, onAnswer }: Props) {
  const quiz = mode === "quiz";
  const [fish, setFish] = useState(quiz ? 1 : 2);
  const [bread, setBread] = useState(quiz ? 3 : 2);
  const [give, setGive] = useState(false);
  // The child has moved the bar by selling.
  const moved = useRef(false);
  const done = useRef(false);

  const gdp = townGdp({ fish, bread, breadSold: !give });

  const finish = () => {
    if (done.current) return;
    done.current = true;
    onDone?.();
  };

  const changeFish = (v: number) => {
    if (v !== fish && !give) moved.current = true;
    setFish(v);
  };

  const changeBread = (v: number) => {
    if (v !== bread) {
      if (!give) moved.current = true;
      // Bread given away leaves the bar where it was.
      else if (moved.current) finish();
    }
    setBread(v);
  };

  const fishValue = fish * FISH_PRICE;
  const breadValue = give ? 0 : bread * BREAD_PRICE;

  return (
    <div className="gdp">
      <Stage label={L(lang, "Town year", "Stadtjahr", "Rok miasteczka")}>
        <p className="gdp-total">
          {L(
            lang,
            `GDP of the town: ${gdp} coins`,
            `BIP der Stadt: ${gdp} Münzen`,
            `PKB miasteczka: ${gdp} monet`,
          )}
        </p>
        <div className="gdp-row">
          <span className="gdp-row-name">{L(lang, "GDP", "BIP", "PKB")}</span>
          <span className="gdp-track">
            <span className="gdp-fill" style={{ width: `${(gdp / MAX_GDP) * 100}%` }}>
              {gdp > 0 ? gdp : ""}
            </span>
          </span>
        </div>
        <p className="gdp-lines">
          <span>
            {L(lang, "Fish", "Fisch", "Ryby")}: {fish} × {FISH_PRICE} = {fishValue}
          </span>
          <span>
            {L(lang, "Bread", "Brot", "Chleb")}: {bread} × {BREAD_PRICE} = {breadValue}
          </span>
        </p>
      </Stage>
      <div className="gdp-controls">
        <Slider
          label={L(
            lang,
            `Finn's fish (${FISH_PRICE} coins each)`,
            `Finns Fische (je ${FISH_PRICE} Münzen)`,
            `Ryby Finna (po ${FISH_PRICE} monety)`,
          )}
          value={fish}
          min={0}
          max={MAX_ITEMS}
          onChange={changeFish}
        />
        <Slider
          label={L(
            lang,
            `Bea's bread (${BREAD_PRICE} coins each)`,
            `Beas Brot (je ${BREAD_PRICE} Münzen)`,
            `Chleb Bei (po ${BREAD_PRICE} monety)`,
          )}
          value={bread}
          min={0}
          max={MAX_ITEMS}
          onChange={changeBread}
        />
        <ToyButton pressed={give} onClick={() => setGive(!give)}>
          {give
            ? L(lang, "Sell the bread again", "Brot wieder verkaufen", "Sprzedaj chleb znowu")
            : L(lang, "Give the bread away", "Brot verschenken", "Rozdaj chleb")}
        </ToyButton>
        <p className="gdp-status" role="status">
          {give
            ? L(
                lang,
                "Bread given away: nobody pays, so the bar skips it.",
                "Brot verschenkt: Niemand zahlt, also zählt der Balken es nicht.",
                "Chleb rozdany: nikt nie płaci, więc słupek go pomija.",
              )
            : L(
                lang,
                "Bread sold: the bar counts it.",
                "Brot verkauft: Der Balken zählt es.",
                "Chleb sprzedany: słupek go liczy.",
              )}
        </p>
      </div>
      {quiz && (
        <div className="gdp-actions">
          <CheckButton lang={lang} onClick={() => onAnswer?.(give && bread >= 1 && gdp === 8)} />
        </div>
      )}
    </div>
  );
}
