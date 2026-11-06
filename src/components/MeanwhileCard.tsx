import { useState } from "react";
import { t } from "../i18n";
import { resolveText } from "../lesson/types";
import type { AgeGroup, Lang } from "../progress";
import { REGION_KEY } from "./TimelineScreen";
import { eventYear } from "../timeline/data";
import { snapshotAt, type Meanwhile } from "../timeline/meanwhile";

interface Props {
  meanwhile: Meanwhile;
  lang: Lang;
  ageGroup: AgeGroup;
}

/** "Meanwhile around the world": a year slider showing the latest event on each track. */
export function MeanwhileCard({ meanwhile, lang, ageGroup }: Props) {
  const [year, setYear] = useState(meanwhile.from);
  const shown = snapshotAt(meanwhile, year);
  const summary = ageGroup === "senior" ? meanwhile.senior : meanwhile.junior;

  return (
    <div className="card meanwhile">
      <h3>{t(lang, "meanwhileTitle")}</h3>
      <p>{resolveText(summary, lang)}</p>
      <label className="meanwhile-slider">
        <span>
          {t(lang, "meanwhileYear")}: <strong>{year}</strong>
        </span>
        <input
          type="range"
          min={meanwhile.from}
          max={meanwhile.to}
          value={year}
          aria-label={t(lang, "meanwhileYear")}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </label>
      {shown.length === 0 && <p className="timeline-empty">{t(lang, "meanwhileNone")}</p>}
      <ul className="meanwhile-list">
        {shown.map((e) => (
          <li key={e.id} className="timeline-card">
            <span className="timeline-year">
              {t(lang, REGION_KEY[e.region])} · {resolveText(e.year, lang)}
            </span>
            <strong>{resolveText(e.title, lang)}</strong>
            <p>{resolveText(ageGroup === "senior" ? e.summary.senior : e.summary.junior, lang)}</p>
            <span hidden>{eventYear(e)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
