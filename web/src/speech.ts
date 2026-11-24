import { useEffect, useState } from "react";
import { SPEECH_LANG } from "./i18n";
import type { Lang } from "./progress";
import { audioContext, isMuted } from "./sound";
import { lineKey } from "./voice/key";

// Otto's voice: a pre-made voice file per line (web/public/audio/<lang>/, made by `npm run voices`),
// played with Web Audio. When a line has no file, or the file cannot load (offline before its
// first play), the device voice reads it instead.

type Manifest = Record<string, string>;

/** One lazy chunk per language: line key to file name. */
const MANIFESTS: Record<Lang, () => Promise<{ default: Manifest }>> = {
  en: () => import("./voice/manifest.en.json"),
  de: () => import("./voice/manifest.de.json"),
  pl: () => import("./voice/manifest.pl.json"),
};

const manifests: Partial<Record<Lang, Promise<Manifest>>> = {};

function manifest(lang: Lang): Promise<Manifest> {
  manifests[lang] ??= MANIFESTS[lang]()
    .then((m) => m.default)
    .catch(() => {
      delete manifests[lang];
      return {};
    });
  return manifests[lang];
}

/** URL of the voice file for a line (stars already removed), or null when it has none. */
export async function voiceFile(text: string, lang: Lang): Promise<string | null> {
  const id = (await manifest(lang))[lineKey(text)];
  return id ? `${import.meta.env.BASE_URL}audio/${lang}/${id}.m4a` : null;
}

export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

let playing: AudioBufferSourceNode | null = null;
/** Goes up on every speak and stop, so a file that loads late never plays over a newer line. */
let turn = 0;

/**
 * Read a line aloud. Stops anything already playing.
 * `fileText` picks the voice file when it differs from the text on screen
 * (a greeting with the kid's name plays the file without the name).
 */
export function speak(text: string, lang: Lang, fileText = text): void {
  if (isMuted()) return;
  stopSpeaking();
  const mine = turn;
  // Created or resumed inside the tap, so iPads allow the sound that follows.
  const ctx = audioContext();
  void playFile(ctx, fileText, lang, mine).then((played) => {
    if (!played && mine === turn) speakWithDevice(text, lang);
  });
}

/** true when the file played, or when a newer line or Sound off made it unwanted */
async function playFile(
  ctx: AudioContext | null,
  text: string,
  lang: Lang,
  mine: number,
): Promise<boolean> {
  if (!ctx) return false;
  try {
    const url = await voiceFile(text, lang);
    if (!url) return false;
    // A plain fetch gets the whole file (no Range request), so the service worker can keep it.
    const res = await fetch(url);
    if (!res.ok) return false;
    const buffer = await ctx.decodeAudioData(await res.arrayBuffer());
    if (mine !== turn || isMuted()) return true;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start();
    playing = source;
    return true;
  } catch {
    return false;
  }
}

function speakWithDevice(text: string, lang: Lang): void {
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

  const voice =
    voices.find((v) => normalized(v.lang) === targetCode) ??
    voices.find((v) => normalized(v.lang).startsWith(langPrefix));

  if (voice) u.voice = voice;
  u.rate = 0.92;
  synth.speak(u);
}

export function stopSpeaking(): void {
  turn += 1;
  try {
    playing?.stop();
  } catch {
    // already stopped
  }
  playing = null;
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

/** true when the line has a voice file or the device has a voice for the language */
export function useCanSpeak(fileText: string, lang: Lang): boolean {
  const device = useHasVoice(lang);
  const key = `${lang}:${fileText}`;
  const [file, setFile] = useState<{ key: string; ok: boolean } | null>(null);
  useEffect(() => {
    let live = true;
    void voiceFile(fileText, lang).then((url) => {
      if (live) setFile({ key, ok: url !== null });
    });
    return () => {
      live = false;
    };
  }, [key, fileText, lang]);
  return device || (file?.key === key && file.ok);
}
