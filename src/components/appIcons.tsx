import type { ReactNode } from "react";
import { Coin, InlineIcon, Person, Piggy } from "./icons";

/** SVG icons for the app chrome and for each lesson (replaces the old emoji). */

const INK = "#23383f";

function Svg({ size, label, children }: { size: number; label?: string; children: ReactNode }) {
  return (
    <svg
      className="app-icon"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </svg>
  );
}

/** Every lesson id has one picture. Keep this in step with src/lessons.ts. */
const LESSON_ART: Record<string, ReactNode> = {
  money: <Coin />,
  work: <Person hat="baker" shirt="#e68aa0" />,
  savings: <Piggy />,
  loans: (
    <g>
      <path d="M2 40 H22 V74 H2 Z" fill="#2f7fb8" />
      <path d="M98 40 H78 V74 H98 Z" fill="#e68aa0" />
      <path d="M22 44 C34 40 44 40 54 46 L66 56 C70 60 66 66 60 64 L52 60 L64 70 C68 74 62 80 58 76 L46 66 L54 76 C58 80 52 86 48 82 L36 70 L30 74 L22 72 Z" fill="#f3cfa6" />
      <path d="M78 44 C68 40 60 40 52 44 L40 52 C36 56 40 62 44 60" fill="none" stroke="#e8b98c" strokeWidth="8" strokeLinecap="round" />
      <circle cx="50" cy="26" r="13" fill="#e3a91a" />
      <circle cx="50" cy="26" r="8" fill="none" stroke="#c98d0e" strokeWidth="3" />
    </g>
  ),
  banks: (
    <g>
      <path d="M50 8 L94 32 H6 Z" fill="#3b5b7a" />
      <rect x="6" y="32" width="88" height="8" fill="#2a435c" />
      {[16, 34, 52, 70].map((x) => (
        <rect key={x} x={x} y="44" width="14" height="32" rx="2" fill="#f4f1e8" stroke="#cfc6ad" strokeWidth="2" />
      ))}
      <rect x="4" y="78" width="92" height="8" rx="2" fill="#a9b6bd" />
      <rect x="0" y="86" width="100" height="8" rx="2" fill="#7e8d95" />
      <circle cx="50" cy="22" r="6" fill="#f7cb44" />
    </g>
  ),
  interest: (
    <g>
      <path d="M50 90 C50 62 50 48 50 34" stroke="#3f8a47" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M50 52 C30 54 18 42 16 26 C34 24 48 34 50 52 Z" fill="#4fa75a" />
      <path d="M50 42 C68 44 82 32 84 16 C66 14 52 24 50 42 Z" fill="#6cc274" />
      <circle cx="50" cy="86" r="12" fill="#e3a91a" />
      <circle cx="50" cy="86" r="7" fill="none" stroke="#c98d0e" strokeWidth="3" />
    </g>
  ),
  taxes: (
    <g>
      <rect x="46" y="2" width="4" height="16" fill="#6f4627" />
      <path d="M50 3 L68 9 L50 15 Z" fill="#d6403a" />
      <rect x="34" y="18" width="32" height="26" rx="3" fill="#f4f1e8" stroke="#cfc6ad" strokeWidth="2" />
      <circle cx="50" cy="31" r="9" fill="#fff" stroke={INK} strokeWidth="3" />
      <path d="M50 25 V31 L55 34" stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M8 56 L50 40 L92 56 Z" fill="#b5572f" />
      <rect x="12" y="56" width="76" height="34" fill="#f1e2c4" />
      {[20, 42, 64].map((x) => (
        <rect key={x} x={x} y="62" width="14" height="28" rx="2" fill="#8fc1d6" />
      ))}
      <rect x="6" y="90" width="88" height="8" rx="2" fill="#a9b6bd" />
    </g>
  ),
  inflation: (
    <g>
      <path d="M26 52 L50 96 L74 52 Z" fill="#e0a860" />
      <path d="M34 60 L66 60 M40 72 L60 72" stroke="#c98a3f" strokeWidth="3" strokeLinecap="round" />
      <circle cx="38" cy="44" r="16" fill="#f4a3ba" />
      <circle cx="62" cy="44" r="16" fill="#8fd0e0" />
      <circle cx="50" cy="30" r="17" fill="#fbe6a6" />
      <circle cx="50" cy="16" r="6" fill="#d6403a" />
    </g>
  ),
  printing: (
    <g>
      <rect x="24" y="6" width="52" height="34" rx="3" fill="#fff" stroke="#cfc6ad" strokeWidth="3" />
      <rect x="6" y="36" width="88" height="40" rx="10" fill="#6b8896" />
      <rect x="6" y="36" width="88" height="12" rx="6" fill="#587684" />
      <circle cx="82" cy="58" r="4" fill="#4fa75a" />
      <rect x="22" y="68" width="56" height="28" rx="3" fill="#fff" stroke="#cfc6ad" strokeWidth="3" />
      <circle cx="50" cy="82" r="9" fill="#e3a91a" />
      <circle cx="50" cy="82" r="5" fill="none" stroke="#c98d0e" strokeWidth="2.5" />
    </g>
  ),
  rates: (
    <g>
      {[22, 50, 78].map((y, i) => (
        <g key={y}>
          <rect x="8" y={y - 4} width="84" height="8" rx="4" fill="#c6d2d5" />
          <rect x="8" y={y - 4} width={[50, 28, 64][i]} height="8" rx="4" fill="#1b8a9a" />
          <circle cx={[58, 36, 72][i]} cy={y} r="11" fill="#fff" stroke={INK} strokeWidth="4" />
        </g>
      ))}
    </g>
  ),
};

/** Picture for a lesson on the trail, on its badge and in headings. */
export function LessonIcon({ id, size = 48, label }: { id: string; size?: number; label?: string }) {
  return (
    <Svg size={size} label={label}>
      {LESSON_ART[id] ?? <Coin />}
    </Svg>
  );
}

export type UiIconName = "speakerOn" | "speakerOff" | "gear" | "lock" | "medal" | "globe" | "chat";

const UI_ART: Record<UiIconName, ReactNode> = {
  speakerOn: (
    <g>
      <path d="M10 38 H30 L52 18 V82 L30 62 H10 Z" fill="currentColor" />
      <path d="M64 34 C72 42 72 58 64 66 M76 22 C90 36 90 64 76 78" stroke="currentColor" strokeWidth="7" fill="none" strokeLinecap="round" />
    </g>
  ),
  speakerOff: (
    <g>
      <path d="M8 38 H28 L50 18 V82 L28 62 H8 Z" fill="currentColor" />
      <path d="M64 38 L90 64 M90 38 L64 64" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
    </g>
  ),
  gear: (
    <g>
      <path
        d="M42 6 H58 L61 18 L70 22 L80 15 L91 26 L84 36 L88 45 L100 48 V62 L88 65 L84 74 L91 84 L80 95 L70 88 L61 92 L58 100 H42 L39 92 L30 88 L20 95 L9 84 L16 74 L12 65 L0 62 V48 L12 45 L16 36 L9 26 L20 15 L30 22 L39 18 Z"
        fill="currentColor"
        transform="translate(0 -3) scale(1 1)"
      />
      <circle cx="50" cy="52" r="15" fill="#fff" />
    </g>
  ),
  lock: (
    <g>
      <path d="M28 44 V30 C28 16 72 16 72 30 V44" stroke="currentColor" strokeWidth="9" fill="none" strokeLinecap="round" />
      <rect x="16" y="42" width="68" height="48" rx="10" fill="currentColor" />
      <circle cx="50" cy="62" r="6" fill="#fff" />
      <rect x="47" y="64" width="6" height="14" rx="3" fill="#fff" />
    </g>
  ),
  medal: (
    <g>
      <path d="M26 4 L44 40 L56 40 L74 4 H62 L50 28 L38 4 Z" fill="#d6403a" />
      <circle cx="50" cy="66" r="28" fill="#e3a91a" />
      <circle cx="50" cy="66" r="21" fill="#f7cb44" />
      <polygon points="50,50 55,61 67,62 58,70 61,82 50,75 39,82 42,70 33,62 45,61" fill="#c98d0e" />
    </g>
  ),
  globe: (
    <g>
      <circle cx="50" cy="50" r="40" fill="#3b9ad9" />
      <path d="M26 24 C38 22 44 30 40 38 C36 46 24 44 22 54 C20 62 28 68 34 66 C38 76 34 84 30 84 C16 74 10 58 12 44 C14 36 18 30 26 24 Z" fill="#4fa75a" />
      <path d="M62 16 C74 16 86 28 86 40 C78 40 74 46 78 54 C82 62 74 70 66 66 C60 62 64 54 58 50 C52 46 54 38 60 36 C66 34 58 24 62 16 Z" fill="#4fa75a" />
      <circle cx="50" cy="50" r="40" fill="none" stroke={INK} strokeWidth="4" />
    </g>
  ),
  chat: (
    <g>
      <path d="M12 14 H88 C94 14 96 18 96 24 V62 C96 68 92 72 86 72 H52 L30 92 V72 H14 C8 72 4 68 4 62 V24 C4 18 6 14 12 14 Z" fill="#1b8a9a" />
      <circle cx="30" cy="43" r="6" fill="#fff" />
      <circle cx="50" cy="43" r="6" fill="#fff" />
      <circle cx="70" cy="43" r="6" fill="#fff" />
    </g>
  ),
};

/** Small interface icons. They take their colour from the text colour (currentColor) where flat. */
export function UiIcon({ name, size = 28, label }: { name: UiIconName; size?: number; label?: string }) {
  return (
    <Svg size={size} label={label}>
      {UI_ART[name]}
    </Svg>
  );
}

export { InlineIcon };
