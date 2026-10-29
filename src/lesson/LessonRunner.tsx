import { useEffect, useRef, useState } from "react";
import { Otto } from "../components/Otto";
import { SpeechBubble } from "../components/SpeechBubble";
import { t } from "../i18n";
import type { LessonMeta } from "../lessons";
import type { Lang } from "../progress";
import { sfx } from "../sound";
import type { Lesson, Question } from "./types";

interface Props {
  lesson: Lesson;
  meta: LessonMeta;
  lang: Lang;
  /** true when the badge was already earned before this run */
  alreadyDone: boolean;
  onBadge: () => void;
  onExit: () => void;
}

type Phase =
  | { k: "story"; i: number }
  | { k: "toy" }
  | { k: "quiz"; i: number }
  | { k: "badge" }
  | { k: "real" }
  | { k: "dad" };

export function LessonRunner({ lesson, meta, lang, alreadyDone, onBadge, onExit }: Props) {
  const [phase, setPhase] = useState<Phase>({ k: "story", i: 0 });
  const wasDone = useRef(alreadyDone);
  const total = lesson.story.length + 1 + lesson.questions.length;

  const position =
    phase.k === "story"
      ? phase.i
      : phase.k === "toy"
        ? lesson.story.length
        : phase.k === "quiz"
          ? lesson.story.length + 1 + phase.i
          : total;

  const title = `${meta.icon} ${meta.title[lang]}`;

  return (
    <main className="screen lesson">
      <header className="lesson-head">
        <button type="button" className="btn btn-quiet btn-small" onClick={onExit}>
          ← {t(lang, "back")}
        </button>
        <h2 className="lesson-title">{title}</h2>
        <Dots total={total} position={position} lang={lang} />
      </header>

      {phase.k === "story" && (
        <StoryView
          lesson={lesson}
          index={phase.i}
          lang={lang}
          onPrev={() => setPhase(phase.i === 0 ? phase : { k: "story", i: phase.i - 1 })}
          onNext={() =>
            setPhase(phase.i + 1 < lesson.story.length ? { k: "story", i: phase.i + 1 } : { k: "toy" })
          }
        />
      )}

      {phase.k === "toy" && (
        <section className="lesson-body">
          <div className="hello">
            <Otto size={96} />
            <SpeechBubble text={lesson.toyIntro[lang]} lang={lang} />
          </div>
          <div className="stage-wrap">
            <lesson.Toy lang={lang} />
          </div>
          <div className="row nav">
            <button type="button" className="btn" onClick={() => setPhase({ k: "quiz", i: 0 })}>
              {t(lang, "ready")}
            </button>
          </div>
        </section>
      )}

      {phase.k === "quiz" && (
        <QuestionView
          key={phase.i}
          q={lesson.questions[phase.i]}
          lang={lang}
          last={phase.i + 1 === lesson.questions.length}
          onDone={() => setPhase(phase.i + 1 < lesson.questions.length ? { k: "quiz", i: phase.i + 1 } : { k: "badge" })}
        />
      )}

      {phase.k === "badge" && (
        <BadgeView
          meta={meta}
          lang={lang}
          again={wasDone.current}
          onBadge={onBadge}
          onNext={() => setPhase({ k: "real" })}
        />
      )}

      {phase.k === "real" && (
        <section className="lesson-body">
          <div className="card real">
            <h3>🌍 {lesson.realLife.title[lang]}</h3>
            <p>{lesson.realLife.body[lang]}</p>
          </div>
          <SpeechBubble text={lesson.realLife.body[lang]} lang={lang} />
          <div className="row nav">
            <button type="button" className="btn" onClick={() => setPhase({ k: "dad" })}>
              {t(lang, "next")}
            </button>
          </div>
        </section>
      )}

      {phase.k === "dad" && (
        <section className="lesson-body">
          <div className="card dad">
            <h3>🗣 {t(lang, "askDad")}</h3>
            <p>{lesson.askDad[lang]}</p>
          </div>
          <div className="row nav">
            <button type="button" className="btn" onClick={onExit}>
              {t(lang, "toTrail")}
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

function Dots({ total, position, lang }: { total: number; position: number; lang: Lang }) {
  return (
    <div className="dots" role="img" aria-label={`${Math.min(position + 1, total)} / ${total}`} data-lang={lang}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={i < position ? "dot dot-done" : i === position ? "dot dot-now" : "dot"} />
      ))}
    </div>
  );
}

function StoryView({
  lesson,
  index,
  lang,
  onPrev,
  onNext,
}: {
  lesson: Lesson;
  index: number;
  lang: Lang;
  onPrev: () => void;
  onNext: () => void;
}) {
  const beat = lesson.story[index];
  return (
    <section className="lesson-body">
      <div className="stage" key={index}>
        {beat.scene && (
          <div className="scene" aria-hidden="true">
            {beat.scene}
          </div>
        )}
      </div>
      <div className="hello">
        <Otto size={96} mood={beat.mood ?? "happy"} />
        <SpeechBubble text={beat.text[lang]} lang={lang} />
      </div>
      <div className="row nav">
        {index > 0 && (
          <button type="button" className="btn btn-quiet" onClick={onPrev}>
            {t(lang, "prev")}
          </button>
        )}
        <button
          type="button"
          className="btn"
          onClick={() => {
            sfx.tap();
            onNext();
          }}
        >
          {t(lang, "next")}
        </button>
      </div>
    </section>
  );
}

type AnswerState = "ask" | "wrong" | "right";

function QuestionView({
  q,
  lang,
  last,
  onDone,
}: {
  q: Question;
  lang: Lang;
  last: boolean;
  onDone: () => void;
}) {
  const [state, setState] = useState<AnswerState>("ask");
  const [tried, setTried] = useState<number[]>([]);

  const say =
    state === "right" ? t(lang, "rightLine") : state === "wrong" ? q.hint[lang] : q.prompt[lang];

  const answer = (ok: boolean) => {
    if (ok) {
      sfx.pop();
      setState("right");
    } else {
      sfx.hint();
      setState("wrong");
    }
  };

  return (
    <section className="lesson-body">
      <div className="hello">
        <Otto size={96} mood={state === "wrong" ? "think" : "happy"} />
        <SpeechBubble text={say} lang={lang} />
      </div>

      {state === "wrong" && <p className="try-again">{t(lang, "tryAgain")}</p>}

      {q.kind === "choice" ? (
        <ul className="choices">
          {q.options.map((o, i) => {
            const isTried = tried.includes(i);
            const shown = state === "right" && o.correct;
            return (
              <li key={i}>
                <button
                  type="button"
                  className={`choice${isTried ? " choice-tried" : ""}${shown ? " choice-right" : ""}`}
                  disabled={state === "right" || isTried}
                  onClick={() => {
                    if (o.correct) answer(true);
                    else {
                      setTried((x) => [...x, i]);
                      answer(false);
                    }
                  }}
                >
                  {o.text[lang]}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="stage-wrap">
          <q.Widget lang={lang} onAnswer={answer} />
        </div>
      )}

      {state === "right" && (
        <div className="row nav">
          <button type="button" className="btn" onClick={onDone}>
            {last ? t(lang, "getBadge") : t(lang, "next")}
          </button>
        </div>
      )}
    </section>
  );
}

function BadgeView({
  meta,
  lang,
  again,
  onBadge,
  onNext,
}: {
  meta: LessonMeta;
  lang: Lang;
  again: boolean;
  onBadge: () => void;
  onNext: () => void;
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    onBadge();
    sfx.badge();
  }, [onBadge]);

  return (
    <section className="lesson-body center-text">
      <div className="big-medal" aria-hidden="true">
        {meta.icon}
      </div>
      <h3>{again ? t(lang, "badgeAgain") : t(lang, "badgeEarned")}</h3>
      <p>{meta.title[lang]}</p>
      <div className="row nav">
        <button type="button" className="btn" onClick={onNext}>
          {t(lang, "next")}
        </button>
      </div>
    </section>
  );
}
