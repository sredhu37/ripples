import { useState } from "react";
import { t, type UiKey } from "../i18n";
import { resolveText } from "../lesson/types";
import type { Lang } from "../progress";
import { sfx } from "../sound";
import { eventsFor, TIMELINE_ERAS, TIMELINE_REGIONS } from "../timeline/data";
import type { TimelineRegion } from "../timeline/types";
import { LangSwitch } from "./LangSwitch";

interface Props {
  lang: Lang;
  onLang: (l: Lang) => void;
  onClose: () => void;
}

export const REGION_KEY: Record<TimelineRegion, UiKey> = {
  india: "regionIndia",
  europe: "regionEurope",
  americas: "regionAmericas",
  east_asia: "regionEastAsia",
  mideast_africa: "regionMideastAfrica",
  science: "regionScience",
};

const REGION_COLOR: Record<TimelineRegion, string> = {
  india: "#e8863a",
  europe: "#3b82f6",
  americas: "#10b981",
  east_asia: "#ef4444",
  mideast_africa: "#a855f7",
  science: "#eab308",
};

export function TimelineScreen({ lang, onLang, onClose }: Props) {
  const [eraIndex, setEraIndex] = useState(0);
  const [region, setRegion] = useState<TimelineRegion | "all">("all");
  const era = TIMELINE_ERAS[eraIndex];
  const events = eventsFor(era.id, region);
  const lanes = (region === "all" ? TIMELINE_REGIONS : [region]).filter((r) =>
    events.some((e) => e.region === r),
  );

  const pickEra = (i: number) => {
    sfx.tap();
    setEraIndex(i);
  };

  return (
    <main className="screen timeline-screen">
      <header className="topbar">
        <h1 className="logo">{t(lang, "worldTimeline")}</h1>
        <div className="topbar-actions">
          <LangSwitch lang={lang} onLang={onLang} />
          <button type="button" className="btn btn-quiet" onClick={onClose}>
            {t(lang, "back")}
          </button>
        </div>
      </header>

      <p className="timeline-help">{t(lang, "timelineHelp")}</p>

      <svg
        className="timeline-scrubber"
        viewBox="0 0 700 60"
        role="group"
        aria-label={t(lang, "timelineEra")}
      >
        <line
          x1="30"
          y1="30"
          x2="670"
          y2="30"
          stroke="#1d3f47"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {TIMELINE_ERAS.map((e, i) => {
          const x = 30 + (i * 640) / (TIMELINE_ERAS.length - 1);
          return (
            <g
              key={e.id}
              role="button"
              tabIndex={0}
              aria-label={resolveText(e.label, lang)}
              aria-pressed={i === eraIndex}
              onClick={() => pickEra(i)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter" || ev.key === " ") pickEra(i);
              }}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={x}
                cy="30"
                r={i === eraIndex ? 14 : 9}
                fill={i === eraIndex ? "#f08a2e" : "#fff"}
                stroke="#1d3f47"
                strokeWidth="3"
              />
            </g>
          );
        })}
      </svg>

      <div className="timeline-eras" role="tablist" aria-label={t(lang, "timelineEra")}>
        {TIMELINE_ERAS.map((e, i) => (
          <button
            key={e.id}
            type="button"
            role="tab"
            aria-selected={i === eraIndex}
            className={`chip${i === eraIndex ? " chip-on" : ""}`}
            onClick={() => pickEra(i)}
          >
            {resolveText(e.label, lang)}
          </button>
        ))}
      </div>

      <section className="timeline-era-head">
        <h2>{resolveText(era.label, lang)}</h2>
        <p>
          {resolveText(era.dateRange, lang)}. {resolveText(era.description, lang)}
        </p>
      </section>

      <div className="timeline-regions" role="group">
        <button
          type="button"
          className={`chip${region === "all" ? " chip-on" : ""}`}
          aria-pressed={region === "all"}
          onClick={() => setRegion("all")}
        >
          {t(lang, "timelineAll")}
        </button>
        {TIMELINE_REGIONS.map((r) => (
          <button
            key={r}
            type="button"
            className={`chip${region === r ? " chip-on" : ""}`}
            aria-pressed={region === r}
            onClick={() => setRegion(r)}
          >
            <span className="dot" style={{ background: REGION_COLOR[r] }} aria-hidden="true" />
            {t(lang, REGION_KEY[r])}
          </button>
        ))}
      </div>

      {events.length === 0 && <p className="timeline-empty">{t(lang, "timelineEmpty")}</p>}

      {lanes.map((r) => (
        <section key={r} className="timeline-lane" aria-label={t(lang, REGION_KEY[r])}>
          <h3 style={{ borderColor: REGION_COLOR[r] }}>{t(lang, REGION_KEY[r])}</h3>
          <ul>
            {events
              .filter((e) => e.region === r)
              .map((e) => (
                <li
                  key={e.id}
                  className="timeline-card"
                  style={{ borderLeftColor: REGION_COLOR[r] }}
                >
                  <span className="timeline-year">{resolveText(e.year, lang)}</span>
                  <strong>{resolveText(e.title, lang)}</strong>
                  <p>{resolveText(e.summary, lang)}</p>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
