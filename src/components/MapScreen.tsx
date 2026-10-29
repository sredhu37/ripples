import { LESSONS } from "../lessons";
import { t } from "../i18n";
import { LESSON_ORDER } from "../lessons";
import { lessonState, nextLessonId, type Lang, type Progress } from "../progress";
import { sfx } from "../sound";
import { LangSwitch } from "./NameScreen";
import { Otto } from "./Otto";
import { SpeechBubble } from "./SpeechBubble";

interface Props {
  progress: Progress;
  returning: boolean;
  onLang: (l: Lang) => void;
  onToggleMute: () => void;
  onOpenLesson: (id: string) => void;
  onParents: () => void;
}

export function MapScreen({ progress, returning, onLang, onToggleMute, onOpenLesson, onParents }: Props) {
  const { lang, name, muted } = progress;
  const next = nextLessonId(progress, LESSON_ORDER);
  const greeting = next === null ? t(lang, "allDone") : t(lang, returning ? "welcomeBack" : "welcome", { name });

  return (
    <main className="screen">
      <header className="topbar">
        <h1 className="logo">{t(lang, "appName")}</h1>
        <div className="topbar-actions">
          <LangSwitch lang={lang} onLang={onLang} />
          <button
            type="button"
            className="icon-btn"
            aria-label={t(lang, muted ? "unmute" : "mute")}
            aria-pressed={muted}
            onClick={onToggleMute}
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <button type="button" className="icon-btn" aria-label={t(lang, "parents")} onClick={onParents}>
            ⚙️
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
          {t(lang, "continue")}: {LESSONS.find((l) => l.id === next)?.title[lang]}
        </button>
      )}

      <section aria-label={t(lang, "badges")} className="shelf">
        <h2>{t(lang, "badges")}</h2>
        <ul className="shelf-row">
          {LESSONS.map((l) => {
            const earned = progress.badges.includes(l.id);
            return (
              <li key={l.id} className={earned ? "medal medal-on" : "medal"} title={l.title[lang]}>
                <span aria-hidden="true">{earned ? l.icon : ""}</span>
                <span className="sr-only">
                  {l.title[lang]}: {earned ? "✓" : "–"}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <ol className="trail">
        {LESSONS.map((l, i) => {
          const state = lessonState(progress, LESSON_ORDER, l.id);
          const open = state !== "locked";
          return (
            <li key={l.id} className={`stop stop-${state} ${i % 2 ? "right" : "left"}`}>
              <button
                type="button"
                className="place"
                disabled={!open}
                aria-label={`${i + 1}. ${l.title[lang]}`}
                onClick={() => {
                  sfx.tap();
                  onOpenLesson(l.id);
                }}
              >
                <span className="place-icon" aria-hidden="true">
                  {state === "locked" ? "🔒" : l.icon}
                </span>
                <span className="place-text">
                  <span className="place-title">
                    {i + 1}. {l.title[lang]}
                  </span>
                  <span className="place-tag">
                    {state === "done" ? "🏅" : state === "next" ? t(lang, "nextUp") : t(lang, "locked")}
                    {state !== "locked" && !l.built ? ` · ${t(lang, "comingSoon")}` : ""}
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
