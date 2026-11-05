import { LessonIcon } from "./appIcons";
import { hasLesson, getLesson } from "../content";
import { t } from "../i18n";
import { LESSONS, getLessonTitle } from "../lessons";
import { resolveFactText } from "../lesson/types";
import type { Lang } from "../progress";
import { LangSwitch } from "./LangSwitch";

interface Props {
  lang: Lang;
  onLang?: (l: Lang) => void;
  onClose: () => void;
}

/** Parent view: what each lesson claims, with sources in EN, DE, and PL. */
export function FactCards({ lang, onLang, onClose }: Props) {
  const built = LESSONS.filter((l) => hasLesson(l.id));
  return (
    <main className="screen">
      <header className="topbar">
        <h1 className="logo">{t(lang, "factCards")}</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {onLang && <LangSwitch lang={lang} onLang={onLang} />}
          <button type="button" className="btn btn-quiet btn-small" onClick={onClose}>
            {t(lang, "back")}
          </button>
        </div>
      </header>
      {built.length === 0 && <p>{t(lang, "noLessons")}</p>}
      {built.map((meta) => {
        const card = getLesson(meta.id)!.factCard;
        return (
          <article key={meta.id} className="panel fact-card">
            <h2>
              <LessonIcon id={meta.id} size={32} /> {getLessonTitle(meta, lang)}
            </h2>
            <h3>{t(lang, "claims")}</h3>
            <ol>
              {card.claims.map((c, i) => (
                <li key={i}>
                  {resolveFactText(c.text, lang)}{" "}
                  <a href={c.source} target="_blank" rel="noreferrer">
                    source
                  </a>
                </li>
              ))}
            </ol>
            <h3>{t(lang, "simplified")}</h3>
            <ul>
              {card.simplified.map((s, i) => (
                <li key={i}>{resolveFactText(s, lang)}</li>
              ))}
            </ul>
          </article>
        );
      })}
    </main>
  );
}
