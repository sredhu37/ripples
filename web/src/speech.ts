import { useEffect, useState } from "react";
import { SPEECH_LANG } from "./i18n";
import type { Lang } from "./progress";

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** Read text aloud with the device voice. Stops anything already playing. */
export function speak(text: string, lang: Lang): void {
  if (!canSpeak()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const code = SPEECH_LANG[lang];
  u.lang = code;
  const voices = synth.getVoices();
  const normalized = (vCode: string) => vCode.replace("_", "-").toLowerCase();
  const targetCode = normalized(code);
  const langPrefix = targetCode.slice(0, 2);

  let voice =
    voices.find((v) => normalized(v.lang) === targetCode) ??
    voices.find((v) => normalized(v.lang).startsWith(langPrefix));

  if (voice) u.voice = voice;
  u.rate = 0.92;
  synth.speak(u);
}

export function stopSpeaking(): void {
  if (canSpeak()) window.speechSynthesis.cancel();
}

/** true when the browser has a voice for this language */
export function hasVoice(lang: Lang): boolean {
  if (!canSpeak()) return false;
  const langPrefix = SPEECH_LANG[lang].slice(0, 2).toLowerCase();
  return window.speechSynthesis
    .getVoices()
    .some((v) => v.lang.replace("_", "-").toLowerCase().startsWith(langPrefix));
}

/** Voices load late in Chrome, so listen for the change. */
export function useHasVoice(lang: Lang): boolean {
  const [ok, setOk] = useState(() => hasVoice(lang));
  useEffect(() => {
    if (!canSpeak()) return;
    const synth = window.speechSynthesis;
    const update = () => setOk(hasVoice(lang));
    update();
    synth.addEventListener("voiceschanged", update);
    return () => synth.removeEventListener("voiceschanged", update);
  }, [lang]);
  return ok;
}
