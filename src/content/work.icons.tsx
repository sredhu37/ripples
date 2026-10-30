import { Box } from "../components/icons";
import type { IconProps } from "../components/icons";

/** Flat SVG icons that only the work lesson needs. Same 100x100 box as the shared icons. */

const INK = "#23383f";

/** The boat fixer: a hard hat, a fresh shirt colour. Not part of the shared cast. */
export const FIXER = { hat: "hardhat", shirt: "#2c8f8a" } as const;

export function Boat(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M50 10 V62" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M55 14 L86 56 H55 Z" fill="#ffffff" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M45 26 L20 56 H45 Z" fill="#f2b632" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M8 60 H92 L78 82 H22 Z" fill="#a86f3c" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M6 90 Q18 82 30 90 T54 90 T78 90 T94 90" stroke="#3b9ad9" strokeWidth="5" fill="none" strokeLinecap="round" />
    </Box>
  );
}

export function Wrench(pos: IconProps) {
  return (
    <Box {...pos}>
      <g transform="rotate(40 50 50)" fill="#8f9ea5" stroke={INK} strokeWidth="3.5" strokeLinejoin="round">
        <rect x="42" y="38" width="16" height="56" rx="8" />
        <path d="M30 8 H43 V24 H57 V8 H70 V30 A20 20 0 0 1 30 30 Z" />
      </g>
    </Box>
  );
}

/** Graduation cap: stands for learning. */
export function GradCap(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M26 50 V68 C26 80 74 80 74 68 V50 L50 62 Z" fill="#3a525a" />
      <path d="M50 20 L94 40 L50 60 L6 40 Z" fill={INK} />
      <path d="M86 43 V70" stroke="#f2b632" strokeWidth="4" strokeLinecap="round" />
      <circle cx="86" cy="73" r="5" fill="#f2b632" />
    </Box>
  );
}

/** A calendar page, optionally with a number, for "years". */
export function Calendar({ n, ...pos }: IconProps & { n?: number }) {
  return (
    <Box {...pos}>
      <rect x="12" y="16" width="76" height="72" rx="10" fill="#ffffff" stroke={INK} strokeWidth="5" />
      <path d="M14 36 V28 A10 10 0 0 1 24 18 H76 A10 10 0 0 1 86 28 V36 Z" fill="#d6403a" />
      <path d="M32 8 V24 M68 8 V24" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      {n !== undefined && (
        <text x="50" y="76" textAnchor="middle" fontSize="38" fontWeight="800" fill={INK} fontFamily="ui-rounded, system-ui, sans-serif">
          {n}
        </text>
      )}
    </Box>
  );
}

export type Dir = "up" | "same" | "down";

const DIR_COLOR: Record<Dir, string> = { up: "#3f9b4c", same: "#8a979c", down: "#d6403a" };

/** A round arrow badge: green up, grey sideways, red down. Replaces the old emoji arrows. */
export function ArrowIcon({ dir, ...pos }: IconProps & { dir: Dir }) {
  const d =
    dir === "up"
      ? "M50 74 V28 M30 46 L50 26 L70 46"
      : dir === "down"
        ? "M50 26 V72 M30 54 L50 74 L70 54"
        : "M26 50 H72 M54 30 L74 50 L54 70";
  return (
    <Box {...pos}>
      <circle cx="50" cy="50" r="44" fill={DIR_COLOR[dir]} />
      <path d={d} stroke="#ffffff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Box>
  );
}
