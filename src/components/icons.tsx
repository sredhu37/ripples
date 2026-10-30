import type { ReactNode } from "react";

/**
 * Flat SVG icons, drawn in code like Otto. Each one sits in a 100x100 box and
 * is placed with x, y and size, so it can be dropped straight into a diagram.
 */
export interface IconProps {
  x?: number;
  y?: number;
  size?: number;
}

const INK = "#23383f";

export function Box({ x = 0, y = 0, size = 100, children }: IconProps & { children: ReactNode }) {
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="0 0 100 100" overflow="visible" aria-hidden="true">
      {children}
    </svg>
  );
}

export type Mood = "happy" | "sad" | "think";
export type Hat = "fisher" | "baker" | "cap" | "mayor" | "beanie" | "hardhat" | "none";

interface PersonProps extends IconProps {
  hat: Hat;
  shirt: string;
  mood?: Mood;
  /** Skin tone of the head. Default is a light peach. */
  skin?: string;
}

/** A villager: round head, simple face, a hat that shows the job. */
export function Person({ hat, shirt, mood = "happy", skin = "#f3cfa6", ...pos }: PersonProps) {
  return (
    <Box {...pos}>
      {/* body */}
      <path d="M14 100 C14 70 32 60 50 60 C68 60 86 70 86 100 Z" fill={shirt} />
      {hat === "baker" && <path d="M34 68 H66 V100 H34 Z" fill="#ffffff" opacity="0.92" />}
      {hat === "cap" && <path d="M30 72 H70 V100 H30 Z" fill="#3a6b3c" />}
      {/* neck and head */}
      <rect x="43" y="54" width="14" height="12" rx="5" fill="#e8b98c" />
      <circle cx="50" cy="38" r="21" fill={skin} />
      <circle cx="37" cy="45" r="4" fill="#f4a79a" opacity="0.55" />
      <circle cx="63" cy="45" r="4" fill="#f4a79a" opacity="0.55" />
      {/* eyes */}
      <circle cx="42" cy="38" r="2.8" fill={INK} />
      <circle cx="58" cy="38" r="2.8" fill={INK} />
      {mood === "sad" && (
        <g stroke={INK} strokeWidth="2" strokeLinecap="round">
          <path d="M37 31 L46 33" />
          <path d="M63 31 L54 33" />
        </g>
      )}
      {mood === "think" && <path d="M54 31 L63 30" stroke={INK} strokeWidth="2" strokeLinecap="round" />}
      {/* mouth */}
      {mood === "happy" && <path d="M42 47 Q50 55 58 47" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />}
      {mood === "sad" && <path d="M43 52 Q50 45 57 52" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />}
      {mood === "think" && <path d="M44 50 H56" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />}
      {/* hats */}
      {hat === "fisher" && (
        <g>
          <path d="M27 33 C27 10 73 10 73 33 Z" fill="#f2b632" />
          <rect x="21" y="30" width="58" height="7" rx="3.5" fill="#e0a21f" />
        </g>
      )}
      {hat === "baker" && (
        <g fill="#ffffff" stroke="#e3d8bd" strokeWidth="1.5">
          <circle cx="37" cy="14" r="11" />
          <circle cx="50" cy="9" r="12" />
          <circle cx="63" cy="14" r="11" />
          <rect x="33" y="14" width="34" height="14" rx="3" />
        </g>
      )}
      {hat === "none" && <path d="M29 36 C27 12 73 12 71 36 C66 24 56 20 50 20 C42 20 34 24 29 36 Z" fill="#6f4627" />}
      {hat === "mayor" && (
        <g>
          <rect x="30" y="31" width="40" height="6" rx="3" fill="#23383f" />
          <rect x="35" y="3" width="30" height="31" rx="4" fill="#23383f" />
          <rect x="35" y="22" width="30" height="6" fill="#c0392b" />
        </g>
      )}
      {hat === "beanie" && (
        <g>
          <path d="M28 34 C28 12 72 12 72 34 Z" fill="#d6403a" />
          <rect x="25" y="30" width="50" height="8" rx="4" fill="#f4f1e8" />
          <circle cx="50" cy="9" r="6" fill="#f4f1e8" />
        </g>
      )}
      {hat === "hardhat" && (
        <g>
          <path d="M27 34 C27 12 73 12 73 34 Z" fill="#f2b632" />
          <rect x="22" y="30" width="56" height="7" rx="3.5" fill="#e0a21f" />
          <rect x="45" y="12" width="10" height="20" rx="3" fill="#e0a21f" />
        </g>
      )}
      {hat === "cap" && (
        <g fill="#8a5a36">
          <path d="M28 30 C28 12 72 12 72 30 Z" />
          <rect x="24" y="28" width="52" height="6" rx="3" fill="#6f4627" />
        </g>
      )}
    </Box>
  );
}

export function Fish({ flip, ...pos }: IconProps & { flip?: boolean }) {
  return (
    <Box {...pos}>
      <g transform={flip ? "translate(100 0) scale(-1 1)" : undefined}>
        <path d="M70 50 L96 30 L96 70 Z" fill="#2e86c1" />
        <ellipse cx="42" cy="50" rx="31" ry="21" fill="#3b9ad9" />
        <path d="M18 54 C32 66 56 66 68 54 C58 70 30 72 18 54 Z" fill="#a9d8f5" />
        <path d="M34 31 C42 20 54 22 58 32 Z" fill="#2e86c1" />
        <path d="M58 38 C62 46 62 54 58 62" stroke="#2e86c1" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="26" cy="45" r="5" fill="#fff" />
        <circle cx="25" cy="45" r="2.4" fill={INK} />
      </g>
    </Box>
  );
}

export function Bread(pos: IconProps) {
  return (
    <Box {...pos}>
      <path
        d="M12 62 C8 40 28 26 50 26 C72 26 92 40 88 62 C88 73 81 78 74 78 H26 C19 78 12 73 12 62 Z"
        fill="#d9953e"
      />
      <path d="M20 54 C22 40 34 33 50 33 C66 33 78 40 80 54 C70 46 30 46 20 54 Z" fill="#ecb766" />
      <g stroke="#b6772a" strokeWidth="4" strokeLinecap="round">
        <path d="M33 42 L40 56" />
        <path d="M49 38 L56 54" />
        <path d="M65 42 L71 56" />
      </g>
    </Box>
  );
}

export function Shoe({ flip, ...pos }: IconProps & { flip?: boolean }) {
  return (
    <Box {...pos}>
      <g transform={flip ? "translate(100 0) scale(-1 1)" : undefined}>
        <path d="M18 22 H44 V48 C44 56 58 58 74 62 C90 66 92 78 84 80 H18 Z" fill="#c0603a" />
        <path d="M18 22 H44 V32 H18 Z" fill="#9c4727" />
        <rect x="14" y="76" width="76" height="10" rx="5" fill="#5a2f1a" />
        <g stroke="#fff3d6" strokeWidth="3" strokeLinecap="round">
          <path d="M44 40 L56 44" />
          <path d="M44 50 L58 54" />
        </g>
      </g>
    </Box>
  );
}

/** Five-point star for the coin face. */
const STAR = Array.from({ length: 10 }, (_, i) => {
  const r = i % 2 === 0 ? 19 : 8;
  const a = (-90 + i * 36) * (Math.PI / 180);
  return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`;
}).join(" ");

export function Coin(pos: IconProps) {
  return (
    <Box {...pos}>
      <circle cx="50" cy="50" r="42" fill="#e3a91a" />
      <path d="M14 42 A38 38 0 0 1 58 12 A44 44 0 0 0 14 42 Z" fill="#fbe08a" />
      <circle cx="50" cy="50" r="31" fill="none" stroke="#c98d0e" strokeWidth="4" />
      <polygon points={STAR} fill="#c98d0e" />
    </Box>
  );
}

export function Apple(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M50 30 C34 20 12 32 14 56 C16 78 34 90 50 84 C66 90 84 78 86 56 C88 32 66 20 50 30 Z" fill="#df4a3f" />
      <path d="M24 46 C26 38 32 34 38 34" stroke="#f08a80" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M50 30 C50 20 52 14 58 8" stroke="#6b4423" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M56 22 C62 10 76 12 78 16 C72 26 62 26 56 22 Z" fill="#4fa75a" />
    </Box>
  );
}

export function Magnifier(pos: IconProps) {
  return (
    <Box {...pos}>
      <circle cx="42" cy="42" r="26" fill="#dff1f6" fillOpacity="0.8" stroke={INK} strokeWidth="7" />
      <path d="M62 62 L88 88" stroke={INK} strokeWidth="10" strokeLinecap="round" />
    </Box>
  );
}

/** Red circle with a bar: drawn on top of something to say "no". */
export function NoSign(pos: IconProps) {
  return (
    <Box {...pos}>
      <circle cx="50" cy="50" r="40" fill="none" stroke="#d6403a" strokeWidth="9" />
      <path d="M22 22 L78 78" stroke="#d6403a" strokeWidth="9" strokeLinecap="round" />
    </Box>
  );
}

export function Piggy(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="24" y="68" width="12" height="18" rx="5" fill="#e58aa3" />
      <rect x="60" y="68" width="12" height="18" rx="5" fill="#e58aa3" />
      <path d="M78 46 C90 44 94 52 88 58" stroke="#e58aa3" strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx="48" cy="54" rx="36" ry="28" fill="#f4a3ba" />
      <path d="M32 30 L40 16 L50 30 Z" fill="#e58aa3" />
      <ellipse cx="20" cy="56" rx="11" ry="9" fill="#e58aa3" />
      <circle cx="17" cy="56" r="2" fill="#a24a63" />
      <circle cx="24" cy="56" r="2" fill="#a24a63" />
      <circle cx="32" cy="44" r="3.2" fill={INK} />
      <rect x="40" y="28" width="22" height="5" rx="2.5" fill="#a24a63" />
    </Box>
  );
}

export function Clock(pos: IconProps) {
  return (
    <Box {...pos}>
      <circle cx="50" cy="50" r="40" fill="#fff" stroke={INK} strokeWidth="6" />
      <path d="M50 24 V50 L68 60" stroke={INK} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Box>
  );
}

/** Two arrows in a loop: "swap". */
export function Swap({ rotate, ...pos }: IconProps & { rotate?: boolean }) {
  return (
    <Box {...pos}>
      <g transform={rotate ? "rotate(90 50 50)" : undefined} stroke={INK} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M18 38 H78 M62 22 L80 38 L62 54" />
        <path d="M82 66 H22 M38 50 L20 66 L38 82" />
      </g>
    </Box>
  );
}

export function Tag({ children, ...pos }: IconProps & { children?: ReactNode }) {
  return (
    <Box {...pos}>
      <path d="M8 50 L30 20 H90 V80 H30 Z" fill="#fff" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <circle cx="28" cy="50" r="6" fill="#dff1f6" stroke={INK} strokeWidth="4" />
      {children}
    </Box>
  );
}

/** An icon inside normal HTML, for example on a button. Pass one icon as the child. */
export function InlineIcon({ children, size = 34 }: { children: ReactNode; size?: number }) {
  return (
    <svg className="inline-icon" viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      {children}
    </svg>
  );
}
