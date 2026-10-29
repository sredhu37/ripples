// Small synthesized sound effects. No audio files, so nothing to download.
// iPads keep audio locked until the first tap, so the context is created lazily
// inside a user gesture.

let ctx: AudioContext | null = null;
let muted = false;

export function setMuted(value: boolean): void {
  muted = value;
}

function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  ctx ??= new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(freq: number, start: number, length: number, type: OscillatorType = "sine", volume = 0.15) {
  const c = context();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  const t0 = c.currentTime + start;
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + length);
  osc.connect(gain).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + length + 0.05);
}

export const sfx = {
  /** soft tap on any button */
  tap: () => !muted && tone(520, 0, 0.08, "triangle", 0.1),
  /** correct answer */
  pop: () => {
    if (muted) return;
    tone(660, 0, 0.1);
    tone(880, 0.09, 0.14);
  },
  /** wrong answer: gentle, never harsh */
  hint: () => !muted && tone(330, 0, 0.18, "sine", 0.1),
  /** badge earned */
  badge: () => {
    if (muted) return;
    [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.22, "triangle", 0.14));
  },
};
