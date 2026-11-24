import { plain } from "../components/Marked";
import { getLesson } from "../content/index";
import { t, type UiKey } from "../i18n";
import { resolveText, type Text } from "../lesson/types";
import { LESSONS } from "../lessons";
import type { Lang } from "../progress";
import spokenDe from "./spoken.de.json";
import spokenEn from "./spoken.en.json";
import spokenPl from "./spoken.pl.json";
import voices from "./voices.json";
import { hash53, lineKey, withoutName } from "./key";

/**
 * Every line Otto can say, the spoken version of each, and the voice file it plays.
 * Used by `npm run voices` (web/scripts/voices-export.ts) and by voice.test.ts, never by the app:
 * the app only reads the generated manifest.<lang>.json.
 */

export const LANGS: Lang[] = ["en", "de", "pl"];

/** Speech-bubble texts that are not lesson content. Greetings with the kid's name lose the name. */
const UI_LINES: UiKey[] = ["askName", "allDone", "lessonBuilding", "rightLine"];
const GREETINGS: UiKey[] = ["welcome", "welcomeBack"];

/** The text on screen, as the speaker button passes it to `speak` (stars removed). */
export function ottoLines(lang: Lang): string[] {
  const lines = new Set<string>();
  const add = (text: string) => lines.add(plain(text));
  const addText = (text: Text) => add(resolveText(text, lang));
  for (const key of UI_LINES) add(t(lang, key));
  for (const key of GREETINGS) add(withoutName(t(lang, key, { name: "{name}" })));
  for (const meta of LESSONS) {
    const lesson = getLesson(meta.id);
    if (!lesson) continue;
    for (const beat of lesson.story) {
      if (beat.lines && beat.lines.length > 0) beat.lines.forEach(addText);
      else addText(beat.text);
    }
    addText(lesson.toyIntro);
    for (const q of lesson.questions) {
      addText(q.prompt);
      addText(q.hint);
    }
  }
  return [...lines];
}

/** Spoken versions: how a line with numbers is said aloud. Keys are screen lines. */
export const SPOKEN: Record<Lang, Record<string, string>> = {
  en: spokenEn,
  de: spokenDe,
  pl: spokenPl,
};

/** A line needs a spoken version when it has a digit or a Roman numeral (XIX). */
export function needsSpoken(line: string): boolean {
  return /\d/.test(line) || /\b[IVXLC]{2,}\b/.test(line);
}

/** The file name (without .m4a) for a spoken text: changes with the voice, its speed and the text. */
export function fileId(lang: Lang, spoken: string): string {
  const payload = JSON.stringify([voices.format, voices[lang], spoken]);
  return hash53(payload, 1) + hash53(payload, 2);
}

export interface VoiceJob {
  /** manifest key: hash of the screen line */
  key: string;
  /** file name without .m4a */
  id: string;
  /** what the voice says */
  text: string;
}

export function voiceJobs(lang: Lang): VoiceJob[] {
  return ottoLines(lang).map((line) => {
    const text = SPOKEN[lang][line] ?? line;
    return { key: lineKey(line), id: fileId(lang, text), text };
  });
}
