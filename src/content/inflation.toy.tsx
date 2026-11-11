import { Coin, InlineIcon, Tag } from "../components/icons";
import { Slider, Stage } from "../lesson/toolkit";
import type { Text } from "../lesson/types";
import type { Lang } from "../progress";
import { IceCream } from "./inflation.icons";
import "./inflation.css";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

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
  return lang === "de" || lang === "pl" ? s.replace(".", ",") : s;
};

function sayFor(s: Setting, tenths: number, scoops: number): Text {
  if (scoops === 0) {
    return T(
      "Now 10 coins do not even buy one scoop!",
      "Jetzt reichen 10 Münzen nicht mal für eine Kugel!",
      "Teraz 10 monet nie wystarcza nawet na jedną gałkę!",
    );
  }
  if (tenths === 10) {
    return T(
      "The price has not moved. 10 coins still buy 10 scoops. Try more years or a bigger rise.",
      "Der Preis hat sich nicht bewegt. 10 Münzen kaufen noch 10 Kugeln. Probier mehr Jahre oder einen größeren Anstieg.",
      "Cena się nie zmieniła. 10 monet nadal kupuje 10 gałek. Spróbuj zwiększyć lata lub podnieść wzrost cen.",
    );
  }
  return T(
    `At the start, 10 coins bought 10 scoops. After ${s.years} ${s.years === 1 ? "year" : "years"}, they buy ${scoops}.`,
    `Am Anfang kauften 10 Münzen 10 Kugeln. Nach ${s.years} ${s.years === 1 ? "Jahr" : "Jahren"} kaufen sie ${scoops}.`,
    `Na początku 10 monet kupowało 10 gałek. Po ${s.years} ${s.years === 1 ? "roku" : "latach"} kupują ${scoops}.`,
  );
}

/** Ice cream time machine: jump ahead some years, set how fast prices rise, see what 10 coins buy. */
export function TimeMachine({
  lang,
  value,
  onChange,
}: {
  lang: Lang;
  value: Setting;
  onChange: (s: Setting) => void;
}) {
  const tenths = priceTenths(value.years, value.percent);
  const scoops = scoopsFor(value.years, value.percent);
  const say = sayFor(value, tenths, scoops);

  const stageLabel =
    lang === "pl"
      ? "Maszyna czasu lodów"
      : lang === "de"
        ? "Eis-Zeitmaschine"
        : "Ice cream time machine";

  const yearsLabel =
    lang === "pl" ? "Lata później" : lang === "de" ? "Jahre später" : "Years later";
  const yearsLeft = lang === "pl" ? "teraz" : lang === "de" ? "jetzt" : "now";
  const yearsRight = lang === "pl" ? "10 lat" : lang === "de" ? "10 Jahre" : "10 years";

  const rateLabel =
    lang === "pl"
      ? "Wzrost cen co roku (%)"
      : lang === "de"
        ? "Preisanstieg pro Jahr (%)"
        : "Price rise each year (%)";
  const rateLeft = lang === "pl" ? "brak" : lang === "de" ? "keiner" : "none";
  const rateRight = lang === "pl" ? "20 na 100" : lang === "de" ? "20 von 100" : "20 out of 100";

  const oneScoopText =
    lang === "pl"
      ? "Jedna gałka kosztuje"
      : lang === "de"
        ? "Eine Kugel kostet"
        : "One scoop costs";

  const scoopsAria =
    lang === "pl" ? `${scoops} gałek` : lang === "de" ? `${scoops} Kugeln` : `${scoops} scoops`;

  const srSummary =
    lang === "pl"
      ? `10 monet kupuje ${scoops} gałek`
      : lang === "de"
        ? `10 Münzen kaufen ${scoops} ${scoops === 1 ? "Kugel" : "Kugeln"}`
        : `10 coins buy ${scoops} ${scoops === 1 ? "scoop" : "scoops"}`;

  return (
    <Stage label={stageLabel}>
      <div className="inf">
        <div className="inf-sliders">
          <Slider
            label={yearsLabel}
            value={value.years}
            min={0}
            max={10}
            onChange={(years) => onChange({ ...value, years })}
            left={yearsLeft}
            right={yearsRight}
          />
          <Slider
            label={rateLabel}
            value={value.percent}
            min={0}
            max={20}
            onChange={(percent) => onChange({ ...value, percent })}
            left={rateLeft}
            right={rateRight}
          />
        </div>
        <div className="inf-board">
          <div className="inf-tag">
            <span className="inf-tag-label">
              <InlineIcon size={30}>
                <IceCream />
              </InlineIcon>
              {oneScoopText}
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
            <div className="inf-scoops" role="img" aria-label={scoopsAria}>
              {Array.from({ length: POCKET }, (_, i) => (
                <span
                  key={i}
                  className={i < scoops ? "inf-scoop" : "inf-scoop gone"}
                  aria-hidden="true"
                >
                  <InlineIcon size={42}>
                    <IceCream />
                  </InlineIcon>
                </span>
              ))}
            </div>
            <div className="inf-count">
              <span className="sr-only">{srSummary}</span>
              <span className="btn-icons" aria-hidden="true">
                10
                <InlineIcon size={30}>
                  <Coin />
                </InlineIcon>
                →{scoops}
                <InlineIcon size={30}>
                  <IceCream />
                </InlineIcon>
              </span>
            </div>
          </div>
        </div>
        <p className="trade-say" role="status">
          {say[lang] || say.en}
        </p>
      </div>
    </Stage>
  );
}
