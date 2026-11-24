import { villagerOf } from "../avatar";
import { hasLesson } from "../content";
import { NO_LESSONS } from "../features";
import { LESSONS, getLessonTitle, CURRICULUM_ORDER, type LessonMeta } from "../lessons";
import { t } from "../i18n";
import { lessonState, nextLessonId, type Lang, type Progress } from "../progress";
import { sfx } from "../sound";
import { LessonIcon, UiIcon } from "./appIcons";
import { CAST } from "./cast";
import { Person } from "./icons";
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
  onSwitchProfile: () => void;
  /** Stored avatar of the active kid. One the app cannot draw shows the first villager. */
  avatar: string;
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
  onSwitchProfile,
  avatar,
}: Props) {
  const { lang, name, muted } = progress;
  const who = villagerOf(avatar);
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
      <header className="topbar trail-bar">
        <button
          type="button"
          className="profile-btn"
          aria-label={`${t(lang, "switchProfile")}: ${name}`}
          title={t(lang, "switchProfile")}
          onClick={onSwitchProfile}
        >
          <svg className="profile-face" data-avatar={who} viewBox="0 0 100 100" aria-hidden="true">
            <Person {...CAST[who]} />
          </svg>
          <span className="profile-name">{name}</span>
        </button>
        <h1 className="logo">{t(lang, "appName")}</h1>
        <div className="topbar-actions">
          <button
            type="button"
            className="labeled-btn"
            aria-label={t(lang, muted ? "unmute" : "mute")}
            aria-pressed={muted}
            onClick={onToggleMute}
          >
            <UiIcon name={muted ? "speakerOff" : "speakerOn"} />
            <span aria-hidden="true">{t(lang, "soundLabel")}</span>
          </button>
          <button
            type="button"
            className="labeled-btn"
            aria-label={t(lang, "worldTimeline")}
            onClick={onTimeline}
          >
            <UiIcon name="globe" />
            <span aria-hidden="true">{t(lang, "timelineLabel")}</span>
          </button>
          <button
            type="button"
            className="labeled-btn"
            aria-label={t(lang, "parents")}
            onClick={onParents}
          >
            <UiIcon name="gear" />
            <span aria-hidden="true">{t(lang, "parentsLabel")}</span>
          </button>
        </div>
        <LangSwitch lang={lang} onLang={onLang} />
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
                  {title}: {earned ? t(lang, "lessonDone") : "-"}
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
