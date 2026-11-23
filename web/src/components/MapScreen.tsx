import { hasLesson } from "../content";
import { NO_LESSONS } from "../features";
import {
  LESSONS,
  getGroupTitle,
  getLessonTitle,
  CURRICULUM_ORDER,
  type LessonMeta,
} from "../lessons";
import { t } from "../i18n";
import { nextLessonId, type Lang, type Progress } from "../progress";
import { buildTrail } from "../trailView";
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

/** Kid side: "Group 1: Money and Work" reads as "Money and Work". Parents keep the full title. */
function groupHeading(title: string): string {
  return title.replace(/^[^:]+:\s*/, "");
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
  const earnedLessons = visibleLessons.filter((l) => progress.badges.includes(l.id));
  const total = visibleLessons.length;
  const sections = buildTrail(progress, order);
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
        <h2>
          {t(lang, "badges")}:{" "}
          <span className="shelf-count">
            {t(lang, "badgeCount", { earned: String(earnedLessons.length), total: String(total) })}
          </span>
        </h2>
        <div className="shelf-row">
          {earnedLessons.length === 0 ? (
            <p className="shelf-empty">{t(lang, "badgesEmpty")}</p>
          ) : (
            <ul className="shelf-medals">
              {earnedLessons.map((l) => {
                const title = getLessonTitle(l, lang);
                return (
                  <li key={l.id} className="medal medal-on" title={title}>
                    <span aria-hidden="true">
                      <LessonIcon id={l.id} size={34} />
                    </span>
                    <span className="sr-only">
                      {title}: {t(lang, "lessonDone")}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <div className="trail">
        {sections.map((section) => {
          const heading = groupHeading(getGroupTitle(section.group, lang));
          return (
            <section
              key={section.group.id}
              className={section.muted ? "trail-group trail-group-muted" : "trail-group"}
              aria-label={heading}
            >
              <h2 className="trail-heading">{heading}</h2>
              {section.muted ? (
                <p className="trail-more">
                  {t(lang, "groupLessons", { n: String(section.total) })}
                </p>
              ) : (
                <ol className="trail-list">
                  {section.stops.map((s) => {
                    const { lesson: l, state } = s;
                    const open = state !== "locked";
                    const title = getLessonTitle(l, lang);
                    return (
                      <li
                        key={l.id}
                        className={`stop stop-${state} ${s.number % 2 ? "left" : "right"}`}
                      >
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
                              {s.number}. {title}
                            </span>
                            <span className="place-tag">
                              {state === "done" ? (
                                <UiIcon name="medal" size={22} label={t(lang, "badges")} />
                              ) : state === "next" ? (
                                t(lang, "nextUp")
                              ) : (
                                t(lang, "locked")
                              )}
                              {state !== "locked" && !hasLesson(l.id)
                                ? ` · ${t(lang, "comingSoon")}`
                                : ""}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                  {section.moreLocked > 0 && (
                    <li className="trail-more">
                      {t(lang, "moreLessons", { n: String(section.moreLocked) })}
                    </li>
                  )}
                </ol>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
