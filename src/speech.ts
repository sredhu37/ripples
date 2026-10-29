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
  const voice = synth.getVoices().find((v) => v.lang.replace("_", "-").startsWith(code.slice(0, 2)));
  if (voice) u.voice = voice;
  u.rate = 0.92;
  synth.speak(u);
}

export function stopSpeaking(): void {
  if (canSpeak()) window.speechSynthesis.cancel();
}
