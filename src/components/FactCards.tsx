import { hasLesson, getLesson } from "../content";
import { t } from "../i18n";
import { LESSONS } from "../lessons";
import type { Lang } from "../progress";

/** Parent view: what each lesson claims, with sources. English only. */
export function FactCards({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const built = LESSONS.filter((l) => hasLesson(l.id));
  return (
    <main className="screen">
      <header className="topbar">
        <h1 className="logo">{t(lang, "factCards")}</h1>
        <button type="button" className="btn btn-quiet btn-small" onClick={onClose}>
          {t(lang, "back")}
        </button>
      </header>
      {built.length === 0 && <p>{t(lang, "noLessons")}</p>}
      {built.map((meta) => {
        const card = getLesson(meta.id)!.factCard;
        return (
          <article key={meta.id} className="panel fact-card">
            <h2>
              {meta.icon} {meta.title.en}
            </h2>
            <h3>{t(lang, "claims")}</h3>
            <ol>
              {card.claims.map((c, i) => (
                <li key={i}>
                  {c.text}{" "}
                  <a href={c.source} target="_blank" rel="noreferrer">
                    source
                  </a>
                </li>
              ))}
            </ol>
            <h3>{t(lang, "simplified")}</h3>
            <ul>
              {card.simplified.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </article>
        );
      })}
    </main>
  );
}
