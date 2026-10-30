import { t } from "../i18n";
import type { Lang } from "../progress";
import { speak, useHasVoice } from "../speech";
import { sfx } from "../sound";
import { Marked, plain } from "./Marked";

interface Props {
  text: string;
  lang: Lang;
}

/** Otto's speech bubble with a read-aloud button. */
export function SpeechBubble({ text, lang }: Props) {
  const voice = useHasVoice(lang);
  return (
    <div className="bubble">
      <p>
        <Marked text={text} />
      </p>
      {voice && (
        <button
          type="button"
          className="icon-btn"
          aria-label={t(lang, "readAloud")}
          onClick={() => {
            sfx.tap();
            speak(plain(text), lang);
          }}
        >
          <SpeakerIcon />
        </button>
      )}
    </div>
  );
}

export function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
      <path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
