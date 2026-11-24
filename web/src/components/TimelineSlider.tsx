import { t } from "../i18n";
import { resolveText } from "../lesson/types";
import type { Lang } from "../progress";
import { TIMELINE_ERAS } from "../timeline/data";
import { TIMELINE_STOPS } from "../timeline/pins";

interface Props {
  lang: Lang;
  /** Index into TIMELINE_STOPS. */
  index: number;
  onChange: (index: number) => void;
}

const LAST = TIMELINE_STOPS.length - 1;

/** The 22-stop slider with the era band above it. */
export function TimelineSlider({ lang, index, onChange }: Props) {
  const current = TIMELINE_STOPS[index];
  const fill = (index / LAST) * 100;

  const eras = TIMELINE_ERAS.map((era) => {
    const first = TIMELINE_STOPS.findIndex((s) => s.era === era.id);
    const count = TIMELINE_STOPS.filter((s) => s.era === era.id).length;
    return { era, first, count };
  });

  return (
    <section className="time-slider" aria-label={t(lang, "pickTime")}>
      <h2 className="time-slider-title">{t(lang, "pickTime")}</h2>
      <p className="time-slider-hint">{t(lang, "pickTimeHint")}</p>

      <div className="era-band" role="group" aria-label={t(lang, "timelineEra")}>
        {eras.map(({ era, first, count }) => (
          <button
            key={era.id}
            type="button"
            className={`era-seg${era.id === current.era ? " era-seg-on" : ""}`}
            style={{ flexGrow: count }}
            aria-current={era.id === current.era ? "true" : undefined}
            onClick={() => onChange(first)}
          >
            {resolveText(era.label, lang)}
          </button>
        ))}
      </div>

      <div className="time-track" style={{ ["--fill" as string]: `${fill}%` }}>
        <input
          type="range"
          className="time-range"
          min={0}
          max={LAST}
          step={1}
          value={index}
          aria-label={t(lang, "pickTime")}
          aria-valuetext={`${resolveText(current.label, lang)}, ${resolveText(
            TIMELINE_ERAS.find((e) => e.id === current.era)!.label,
            lang,
          )}`}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <div className="time-stops" role="group" aria-label={t(lang, "timeStops")}>
          {TIMELINE_STOPS.map((s, i) => (
            <button
              key={s.year}
              type="button"
              className={`time-stop${i === index ? " time-stop-on" : ""}${i <= index ? " time-stop-past" : ""}`}
              aria-pressed={i === index}
              onClick={() => onChange(i)}
            >
              <span className="time-stop-label">{resolveText(s.label, lang)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="time-steps">
        <button
          type="button"
          className="chip"
          disabled={index === 0}
          onClick={() => onChange(index - 1)}
        >
          ◄ {t(lang, "timeEarlier")}
        </button>
        <button
          type="button"
          className="chip"
          disabled={index === LAST}
          onClick={() => onChange(index + 1)}
        >
          {t(lang, "timeLater")} ►
        </button>
      </div>
    </section>
  );
}
