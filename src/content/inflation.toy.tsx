import { Coin, InlineIcon, Tag } from "../components/icons";
import { Slider, Stage } from "../lesson/toolkit";
import type { Text } from "../lesson/types";
import type { Lang } from "../progress";
import { IceCream } from "./inflation.icons";
import "./inflation.css";

const T = (en: string, de: string): Text => ({ en, de });

/** Coins in Finn's pocket. At the start one scoop costs 1 coin, so they buy 10 scoops. */
export const POCKET = 10;

/** The scoop price in tenths of a coin after some years of price rises (the seller rounds to 0.1). */
export function priceTenths(years: number, percent: number): number {
  return Math.round(10 * Math.pow(1 + percent / 100, years));
}

/** How many whole scoops the pocket buys. Works in tenths so there is no rounding surprise. */
export function scoopsFor(years: number, percent: number): number {
  return Math.floor((POCKET * 10) / priceTenths(years, percent));
}

export interface Setting {
  years: number;
  percent: number;
}

export const START: Setting = { years: 3, percent: 5 };

const fmt = (tenths: number, lang: Lang) => {
  const s = (tenths / 10).toFixed(1);
  return lang === "de" ? s.replace(".", ",") : s;
};

function sayFor(s: Setting, tenths: number, scoops: number): Text {
  if (scoops === 0) {
    return T("Now 10 coins do not even buy one scoop!", "Jetzt reichen 10 Münzen nicht mal für eine Kugel!");
  }
  if (tenths === 10) {
    return T(
      "The price has not moved. 10 coins still buy 10 scoops. Try more years or a bigger rise.",
      "Der Preis hat sich nicht bewegt. 10 Münzen kaufen noch 10 Kugeln. Probier mehr Jahre oder einen größeren Anstieg.",
    );
  }
  return T(
    `At the start, 10 coins bought 10 scoops. After ${s.years} ${s.years === 1 ? "year" : "years"}, they buy ${scoops}.`,
    `Am Anfang kauften 10 Münzen 10 Kugeln. Nach ${s.years} ${s.years === 1 ? "Jahr" : "Jahren"} kaufen sie ${scoops}.`,
  );
}

/** Ice cream time machine: jump ahead some years, set how fast prices rise, see what 10 coins buy. */
export function TimeMachine({ lang, value, onChange }: { lang: Lang; value: Setting; onChange: (s: Setting) => void }) {
  const tenths = priceTenths(value.years, value.percent);
  const scoops = scoopsFor(value.years, value.percent);
  const say = sayFor(value, tenths, scoops);
  const en = lang === "en";
  return (
    <Stage label={en ? "Ice cream time machine" : "Eis-Zeitmaschine"}>
      <div className="inf">
        <div className="inf-sliders">
          <Slider
            label={en ? "Years later" : "Jahre später"}
            value={value.years}
            min={0}
            max={10}
            onChange={(years) => onChange({ ...value, years })}
            left={en ? "now" : "jetzt"}
            right={en ? "10 years" : "10 Jahre"}
          />
          <Slider
            label={en ? "Price rise each year (%)" : "Preisanstieg pro Jahr (%)"}
            value={value.percent}
            min={0}
            max={20}
            onChange={(percent) => onChange({ ...value, percent })}
            left={en ? "none" : "keiner"}
            right={en ? "20 out of 100" : "20 von 100"}
          />
        </div>
        <div className="inf-board">
          <div className="inf-tag">
            <span className="inf-tag-label">
              <InlineIcon size={30}>
                <IceCream />
              </InlineIcon>
              {en ? "One scoop costs" : "Eine Kugel kostet"}
            </span>
            <strong className="inf-price">
              <InlineIcon size={36}>
                <Tag />
              </InlineIcon>
              {fmt(tenths, lang)}
              <InlineIcon size={36}>
                <Coin />
              </InlineIcon>
            </strong>
          </div>
          <div>
            <div className="inf-scoops" role="img" aria-label={en ? `${scoops} scoops` : `${scoops} Kugeln`}>
              {Array.from({ length: POCKET }, (_, i) => (
                <span key={i} className={i < scoops ? "inf-scoop" : "inf-scoop gone"} aria-hidden="true">
                  <InlineIcon size={42}>
                    <IceCream />
                  </InlineIcon>
                </span>
              ))}
            </div>
            <div className="inf-count">
              <span className="sr-only">
                {en ? `10 coins buy ${scoops} ${scoops === 1 ? "scoop" : "scoops"}` : `10 Münzen kaufen ${scoops} ${scoops === 1 ? "Kugel" : "Kugeln"}`}
              </span>
              <span className="btn-icons" aria-hidden="true">
                10
                <InlineIcon size={30}>
                  <Coin />
                </InlineIcon>
                →
                {scoops}
                <InlineIcon size={30}>
                  <IceCream />
                </InlineIcon>
              </span>
            </div>
          </div>
        </div>
        <p className="trade-say" role="status">
          {say[lang]}
        </p>
      </div>
    </Stage>
  );
}
