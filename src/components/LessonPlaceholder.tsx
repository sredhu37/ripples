import { LessonIcon } from "./appIcons";
import { LESSONS } from "../lessons";
import { t } from "../i18n";
import type { Progress } from "../progress";
import { Otto } from "./Otto";
import { SpeechBubble } from "./SpeechBubble";

interface Props {
  lessonId: string;
  progress: Progress;
  onBack: () => void;
}

/** Stand-in until a lesson's content exists. Real lessons replace this per id. */
export function LessonPlaceholder({ lessonId, progress, onBack }: Props) {
  const lang = progress.lang;
  const lesson = LESSONS.find((l) => l.id === lessonId);

  return (
    <main className="screen center">
      <h2 className="lesson-title">
        {lesson && <LessonIcon id={lesson.id} size={36} />} 
        {lesson?.title[lang]}
      </h2>
      <Otto size={170} mood="think" />
      <SpeechBubble text={t(lang, "lessonBuilding")} lang={lang} />
      <button className="btn" type="button" onClick={onBack}>
        {t(lang, "back")}
      </button>
    </main>
  );
}
