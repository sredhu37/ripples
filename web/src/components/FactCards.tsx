import { LessonIcon } from "./appIcons";
import { hasLesson, getLesson } from "../content";
import { NO_LESSONS } from "../features";
import { t } from "../i18n";
import { CURRICULUM_GROUPS, LESSONS, getGroupTitle, getLessonTitle } from "../lessons";
import { resolveFactText } from "../lesson/types";
import type { Lang } from "../progress";
import { BackButton } from "./BackButton";
import { LangSwitch } from "./LangSwitch";

interface Props {
  lang: Lang;
  onLang?: (l: Lang) => void;
  onClose: () => void;
  /** Paused lessons (see `features.ts`). Default: none. */
  paused?: ReadonlySet<string>;
}

/** Host of a source URL without "www.", for the muted text next to the link. */
function sourceDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Parent view: the facts behind each lesson, by curriculum group, with sources. */
export function FactCards({ lang, onLang, onClose, paused = NO_LESSONS }: Props) {
  const built = LESSONS.filter((l) => hasLesson(l.id) && !paused.has(l.id));
  return (
    <main className="screen">
      <BackButton label={t(lang, "familyTitle")} onClick={onClose} />
      <header className="topbar fact-topbar">
        <h1 className="logo">{t(lang, "factCards")}</h1>
        {onLang && <LangSwitch lang={lang} onLang={onLang} />}
      </header>
      <p>{t(lang, "factCardsHelp")}</p>
      {built.length === 0 && <p>{t(lang, "noLessons")}</p>}
      {CURRICULUM_GROUPS.map((group) => {
        const groupLessons = built.filter((l) => group.lessonIds.includes(l.id));
        if (groupLessons.length === 0) return null;
        return (
          <section key={group.id} className="fact-group">
            <h2 className="fact-group-title">{getGroupTitle(group, lang)}</h2>
            {groupLessons.map((meta) => {
              const card = getLesson(meta.id)!.factCard;
              return (
                <article key={meta.id} className="panel fact-card">
                  <h3 className="fact-card-title">
                    <LessonIcon id={meta.id} size={32} /> {getLessonTitle(meta, lang)}
                  </h3>
                  <h4>{t(lang, "claims")}</h4>
                  <ol>
                    {card.claims.map((c, i) => (
                      <li key={i}>
                        {resolveFactText(c.text, lang)}{" "}
                        <a className="fact-link" href={c.source} target="_blank" rel="noreferrer">
                          {t(lang, "factSource")}
                          <span className="fact-domain">: {sourceDomain(c.source)}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                  <h4>{t(lang, "simplified")}</h4>
                  <ul>
                    {card.simplified.map((s, i) => (
                      <li key={i}>{resolveFactText(s, lang)}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </section>
        );
      })}
    </main>
  );
}
