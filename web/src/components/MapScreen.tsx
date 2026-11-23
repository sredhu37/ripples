import { hasLesson } from "../content";
import { NO_LESSONS } from "../features";
import { LESSONS, getLessonTitle, CURRICULUM_ORDER, type LessonMeta } from "../lessons";
import { t } from "../i18n";
import { lessonState, nextLessonId, type Lang, type Progress } from "../progress";
import { sfx } from "../sound";
import { LessonIcon, UiIcon } from "./appIcons";
import { LangSwitch } from "./LangSwitch";
import { Otto } from "./Otto";
import { SpeechBubble } from "./SpeechBubble";

interface Props {
  progress: Progress;
  returning: boolean;
  /** Paused lessons (see `features.ts`). Default: none. */
  paused?: ReadonlySet<string>;
  onLang: (l: Lang) => void;
  onToggleMute: () => void;
  onOpenLesson: (id: string) => void;
  onParents: () => void;
  onTimeline: () => void;
  onChangeKid: () => void;
}

export function MapScreen({
  progress,
  returning,
  paused = NO_LESSONS,
  onLang,
  onToggleMute,
  onOpenLesson,
  onParents,
  onTimeline,
  onChangeKid,
}: Props) {
  const { lang, name, muted } = progress;
  // A Paused lesson is left out like a Disabled one; its badge stays in `progress`.
  const order = CURRICULUM_ORDER.filter((id) => !paused.has(id));
  const visibleLessons = order
    .filter((id) => !progress.disabledLessons?.includes(id))
    .map((id) => LESSONS.find((l) => l.id === id))
    .filter((l): l is LessonMeta => l !== undefined);
  const next = nextLessonId(progress, order);
  const greeting =
    next === null ? t(lang, "allDone") : t(lang, returning ? "welcomeBack" : "welcome", { name });
  const nextLesson = LESSONS.find((l) => l.id === next);

  return (
    <main className="screen">
      <header className="topbar">
        <h1 className="logo">{t(lang, "appName")}</h1>
        <div className="topbar-actions">
          <button type="button" className="btn btn-quiet" onClick={onChangeKid}>
            {t(lang, "changeKid")}
          </button>
          <LangSwitch lang={lang} onLang={onLang} />
          <button
            type="button"
            className="icon-btn"
            aria-label={t(lang, muted ? "unmute" : "mute")}
            aria-pressed={muted}
            onClick={onToggleMute}
          >
            <UiIcon name={muted ? "speakerOff" : "speakerOn"} />
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label={t(lang, "worldTimeline")}
            onClick={onTimeline}
          >
            <UiIcon name="globe" />
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label={t(lang, "parents")}
            onClick={onParents}
          >
            <UiIcon name="gear" />
          </button>
        </div>
      </header>

      <section className="hello">
        <Otto size={120} />
        <SpeechBubble text={greeting} lang={lang} />
      </section>

      {next && (
        <button
          type="button"
          className="btn continue"
          onClick={() => {
            sfx.tap();
            onOpenLesson(next);
          }}
        >
          {t(lang, "continue")}: {nextLesson ? getLessonTitle(nextLesson, lang) : ""}
        </button>
      )}

      <section aria-label={t(lang, "badges")} className="shelf">
        <h2>{t(lang, "badges")}</h2>
        <ul className="shelf-row">
          {visibleLessons.map((l) => {
            const earned = progress.badges.includes(l.id);
            const title = getLessonTitle(l, lang);
            return (
              <li key={l.id} className={earned ? "medal medal-on" : "medal"} title={title}>
                <span aria-hidden="true">{earned ? <LessonIcon id={l.id} size={34} /> : null}</span>
                <span className="sr-only">
                  {title}:{" "}
                  {earned ? (lang === "en" ? "done" : lang === "de" ? "fertig" : "zrobione") : "-"}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <ol className="trail">
        {visibleLessons.map((l, i) => {
          const state = lessonState(progress, order, l.id);
          const open = state !== "locked";
          const title = getLessonTitle(l, lang);
          return (
            <li key={l.id} className={`stop stop-${state} ${i % 2 ? "right" : "left"}`}>
              <button
                type="button"
                className="place"
                disabled={!open}
                onClick={() => {
                  sfx.tap();
                  onOpenLesson(l.id);
                }}
              >
                <span className="place-icon" aria-hidden="true">
                  {state === "locked" ? (
                    <UiIcon name="lock" size={40} />
                  ) : (
                    <LessonIcon id={l.id} size={48} />
                  )}
                </span>
                <span className="place-text">
                  <span className="place-title">
                    {i + 1}. {title}
                  </span>
                  <span className="place-tag">
                    {state === "done" ? (
                      <UiIcon name="medal" size={22} label={t(lang, "badges")} />
                    ) : state === "next" ? (
                      t(lang, "nextUp")
                    ) : (
                      t(lang, "locked")
                    )}
                    {state !== "locked" && !hasLesson(l.id) ? ` · ${t(lang, "comingSoon")}` : ""}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
