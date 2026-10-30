import { Box } from "../components/icons";
import type { IconProps } from "../components/icons";

/** Lesson-specific flat icons for the Interest lesson. Same 100x100 box as the shared icons. */

const INK = "#23383f";

/** The town bank: a roof with a coin, four columns and steps. */
export function Bank(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M6 40 L50 10 L94 40 Z" fill="#146a77" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="50" cy="28" r="7" fill="#e3a91a" stroke="#c98d0e" strokeWidth="2" />
      <g fill="#f4f1e8" stroke={INK} strokeWidth="2.5">
        <rect x="16" y="46" width="12" height="30" rx="2" />
        <rect x="35" y="46" width="12" height="30" rx="2" />
        <rect x="54" y="46" width="12" height="30" rx="2" />
        <rect x="73" y="46" width="12" height="30" rx="2" />
      </g>
      <rect x="10" y="78" width="80" height="8" rx="2" fill="#8aa0a6" stroke={INK} strokeWidth="2.5" />
      <rect x="4" y="86" width="92" height="8" rx="2" fill="#6f858c" stroke={INK} strokeWidth="2.5" />
    </Box>
  );
}

/** A small sailing boat: Finn's new boat. */
export function Boat(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M50 12 V66" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M54 16 L54 60 L86 60 Z" fill="#ffffff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M46 24 L46 60 L20 60 Z" fill="#f2b632" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M10 66 H90 L78 86 H22 Z" fill="#c0603a" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M2 92 C14 86 24 98 36 92 C48 86 58 98 70 92 C80 87 90 96 98 92" stroke="#2e86c1" strokeWidth="4" fill="none" strokeLinecap="round" />
    </Box>
  );
}
