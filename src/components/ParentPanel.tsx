import { useState } from "react";
import { CURRICULUM_GROUPS, LESSONS, LESSON_ORDER, getGroupTitle, getLessonTitle } from "../lessons";
import { t } from "../i18n";
import { exportCode, importCode, type Progress, type Lang } from "../progress";
import { LangSwitch } from "./LangSwitch";

interface Props {
  progress: Progress;
  onRestore: (p: Progress) => void;
  onReset: () => void;
  onFacts: () => void;
  onClose: () => void;
  onLang?: (l: Lang) => void;
  onToggleLesson: (lessonId: string, enabled: boolean) => void;
}

function makeGate() {
  return { a: 6 + Math.floor(Math.random() * 5), b: 6 + Math.floor(Math.random() * 5) };
}

/** Parent area. A small multiplication gate keeps a young child out of it. */
export function ParentPanel({ progress, onRestore, onReset, onFacts, onClose, onLang, onToggleLesson }: Props) {
  const lang = progress.lang;
  const [gate] = useState(makeGate);
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [gateWrong, setGateWrong] = useState(false);
  const [pasted, setPasted] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const code = exportCode(progress, LESSON_ORDER);

  if (!open) {
    return (
      <main className="screen center">
        <form
          className="panel"
          onSubmit={(e) => {
            e.preventDefault();
            if (Number(answer) === gate.a * gate.b) setOpen(true);
            else setGateWrong(true);
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>{t(lang, "parents")}</h2>
            {onLang && <LangSwitch lang={lang} onLang={onLang} />}
          </div>
          <p>{t(lang, "gateQuestion", gate)}</p>
          <input
            className="text-input"
            inputMode="numeric"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            aria-label={t(lang, "gateQuestion", gate)}
          />
          {gateWrong && <p role="alert">{t(lang, "gateWrong")}</p>}
          <div className="row">
            <button className="btn" type="submit">
              {t(lang, "gateGo")}
            </button>
            <button className="btn btn-quiet" type="button" onClick={onClose}>
              {t(lang, "back")}
            </button>
          </div>
        </form>
      </main>
    );
  }

  return (
    <main className="screen parent-screen">
      <div className="panel parent-panel">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>{t(lang, "parents")}</h2>
          {onLang && <LangSwitch lang={lang} onLang={onLang} />}
        </div>

        <h2>{t(lang, "lessonSelectionTitle")}</h2>
        <p>{t(lang, "lessonSelectionHelp")}</p>
        <div className="curriculum-groups">
          {CURRICULUM_GROUPS.map((group) => {
            const groupLessons = LESSONS.filter((l) => group.lessonIds.includes(l.id));
            const disabledCount = groupLessons.filter((l) => progress.disabledLessons?.includes(l.id)).length;
            return (
              <details key={group.id} className="lesson-group-accordion">
                <summary className="lesson-group-summary">
                  <span className="lesson-group-title">{getGroupTitle(group, lang)}</span>
                  <span className="lesson-group-count">
                    {groupLessons.length - disabledCount} / {groupLessons.length}
                  </span>
                </summary>
                <div className="lesson-toggle-list">
                  {groupLessons.map((l) => {
                    const isOff = progress.disabledLessons?.includes(l.id) ?? false;
                    const title = getLessonTitle(l, lang);
                    return (
                      <label key={l.id} className={`lesson-toggle-row ${isOff ? "lesson-toggle-row-off" : ""}`}>
                        <span className="lesson-toggle-info">
                          <span className="lesson-toggle-title">{title}</span>
                          <span className="lesson-toggle-status">
                            {t(lang, isOff ? "lessonDisabled" : "lessonEnabled")}
                          </span>
                        </span>
                        <span className="toggle-switch">
                          <input
                            type="checkbox"
                            className="toggle-input"
                            checked={!isOff}
                            onChange={(e) => onToggleLesson(l.id, e.target.checked)}
                            aria-label={`${title}: ${t(lang, isOff ? "lessonDisabled" : "lessonEnabled")}`}
                          />
                          <span className="toggle-slider" aria-hidden="true" />
                        </span>
                      </label>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </div>

        <h2>{t(lang, "factCards")}</h2>
        <p>{t(lang, "factCardsHelp")}</p>
        <button className="btn" type="button" onClick={onFacts}>
          {t(lang, "factCards")}
        </button>

        <h2>{t(lang, "saveTitle")}</h2>
        <p>{t(lang, "saveHelp")}</p>
        <textarea className="text-input code" readOnly value={code} rows={3} aria-label={t(lang, "saveTitle")} />
        <button
          className="btn"
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
        >
          {copied ? t(lang, "copied") : t(lang, "copy")}
        </button>

        <h2>{t(lang, "restoreTitle")}</h2>
        <p>{t(lang, "restoreHelp")}</p>
        <textarea
          className="text-input code"
          rows={3}
          value={pasted}
          onChange={(e) => setPasted(e.target.value)}
          aria-label={t(lang, "restoreTitle")}
        />
        <button
          className="btn"
          type="button"
          onClick={() => {
            const restored = importCode(pasted, LESSON_ORDER);
            if (restored) {
              onRestore({ ...restored, muted: progress.muted });
              setMessage(t(restored.lang, "restoreOk"));
            } else {
              setMessage(t(lang, "restoreBad"));
            }
          }}
        >
          {t(lang, "restoreGo")}
        </button>
        {message && <p role="status">{message}</p>}

        <h2>{t(lang, "resetTitle")}</h2>
        <p>{t(lang, "resetHelp")}</p>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => {
            if (window.confirm(t(lang, "resetSure"))) onReset();
          }}
        >
          {t(lang, "resetGo")}
        </button>

        <button className="btn btn-quiet" type="button" onClick={onClose}>
          {t(lang, "close")}
        </button>
      </div>
    </main>
  );
}
