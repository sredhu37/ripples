import { useEffect, useRef, useState } from "react";
import { LessonIcon, UiIcon } from "../components/appIcons";
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
  | { k: "story"; i: number; back?: boolean }
  | { k: "toy" }
  | { k: "quiz"; i: number }
  | { k: "badge" }
  | { k: "real" }
  | { k: "dad" };

export function LessonRunner({ lesson, meta, lang, alreadyDone, onBadge, onExit }: Props) {
  const [phase, setPhase] = useState<Phase>({ k: "story", i: 0 });
  const [toyCompleted, setToyCompleted] = useState(false);
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

  const handleRestart = () => {
    setPhase({ k: "story", i: 0 });
  };

  return (
    <main className="screen lesson">
      <header className="lesson-head">
        <div className="lesson-head-actions">
          <button type="button" className="btn btn-quiet btn-small" onClick={onExit} aria-label={t(lang, "allLessons")}>
            ← {t(lang, "allLessons")}
          </button>
          {(phase.k !== "story" || phase.i > 0) && (
            <button type="button" className="btn btn-quiet btn-small btn-restart" onClick={handleRestart}>
              {t(lang, "restartLesson")}
            </button>
          )}
        </div>
        <h2 className="lesson-title">
          <LessonIcon id={meta.id} size={34} /> {meta.title[lang]}
        </h2>
        <Dots total={total} position={position} lang={lang} />
      </header>

      {phase.k === "story" && (
        <StoryView
          key={`${phase.i}-${phase.back ? "end" : "start"}`}
          lesson={lesson}
          index={phase.i}
          fromEnd={phase.back}
          lang={lang}
          onPrev={() => setPhase(phase.i === 0 ? phase : { k: "story", i: phase.i - 1, back: true })}
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
            <lesson.Toy lang={lang} onDone={() => setToyCompleted(true)} />
          </div>
          <div className="row nav">
            <button
              type="button"
              className="btn"
              disabled={!toyCompleted}
              onClick={() => setPhase({ k: "quiz", i: 0 })}
            >
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
            <h3>
              <UiIcon name="globe" size={30} /> {lesson.realLife.title[lang]}
            </h3>
            <p>{lesson.realLife.body[lang]}</p>
          </div>
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
            <h3>
              <UiIcon name="chat" size={30} /> {t(lang, "askDad")}
            </h3>
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
  fromEnd,
  lang,
  onPrev,
  onNext,
}: {
  lesson: Lesson;
  index: number;
  fromEnd?: boolean;
  lang: Lang;
  onPrev: () => void;
  onNext: () => void;
}) {
  const beat = lesson.story[index];
  const count = beat.lines?.length ?? 0;
  // step = how many lines of an animated beat are showing (unused for old emoji beats)
  const [step, setStep] = useState(count > 0 && fromEnd ? count : 1);
  const Diagram = beat.Diagram;
  const line = count > 0 ? beat.lines![step - 1] : beat.text;

  const advance = () => {
    sfx.tap();
    if (count > 0 && step < count) setStep(step + 1);
    else onNext();
  };
  const goBack = () => {
    if (count > 0 && step > 1) setStep(step - 1);
    else onPrev();
  };

  return (
    <section className="lesson-body">
      <div
        className={`stage${Diagram ? " stage-diagram" : ""}`}
        key={index}
        onClick={Diagram && step < count ? advance : undefined}
      >
        {Diagram && <Diagram lang={lang} step={step} />}
        {!Diagram && beat.scene && (
          <div className="scene" aria-hidden="true">
            {beat.scene}
          </div>
        )}
        {count > 1 && (
          <div className="steps" aria-hidden="true">
            {beat.lines!.map((_, i) => (
              <span key={i} className={i < step ? "step on" : "step"} />
            ))}
          </div>
        )}
      </div>
      <div className="hello">
        <Otto size={96} mood={beat.mood ?? "happy"} />
        <SpeechBubble key={step} text={line[lang]} lang={lang} />
      </div>
      <div className="row nav">
        {(index > 0 || step > 1) && (
          <button type="button" className="btn btn-quiet" onClick={goBack}>
            {t(lang, "prev")}
          </button>
        )}
        <button type="button" className="btn" onClick={advance}>
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
        <LessonIcon id={meta.id} size={96} />
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
