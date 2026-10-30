import { Box } from "../components/icons";
import type { IconProps } from "../components/icons";

/** Lesson-specific flat SVG icons for the loans lesson. */

const INK = "#23383f";

/** A clay bread oven with a fire inside. */
export function Oven(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="66" y="6" width="14" height="26" rx="3" fill="#8a4d37" />
      <path d="M8 94 V60 C8 32 28 18 50 18 C72 18 92 32 92 60 V94 Z" fill="#c9795a" />
      <path d="M20 40 C26 30 34 25 42 23" stroke="#e6a389" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M30 94 V68 C30 56 39 49 50 49 C61 49 70 56 70 68 V94 Z" fill="#3a2a26" />
      <path d="M50 92 C38 86 40 72 50 60 C60 72 62 86 50 92 Z" fill="#f08a2e" />
      <path d="M50 92 C45 88 46 80 50 74 C54 80 55 88 50 92 Z" fill="#f6c23e" />
    </Box>
  );
}

/** A glass jar with coins in it. */
export function Jar(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="26" y="8" width="48" height="14" rx="5" fill="#a86f3c" />
      <rect x="18" y="20" width="64" height="72" rx="16" fill="#dff1f6" fillOpacity="0.75" stroke={INK} strokeWidth="4" />
      <circle cx="38" cy="76" r="12" fill="#e3a91a" />
      <circle cx="62" cy="76" r="12" fill="#e3a91a" />
      <circle cx="50" cy="58" r="12" fill="#e3a91a" />
      <circle cx="38" cy="76" r="7" fill="none" stroke="#c98d0e" strokeWidth="3" />
      <circle cx="62" cy="76" r="7" fill="none" stroke="#c98d0e" strokeWidth="3" />
      <circle cx="50" cy="58" r="7" fill="none" stroke="#c98d0e" strokeWidth="3" />
    </Box>
  );
}

/** A warm blue coat. */
export function Coat(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M36 12 L14 24 L6 76 L26 80 L28 94 H72 L74 80 L94 76 L86 24 L64 12 L50 30 Z" fill="#3b86c4" />
      <path d="M36 12 L50 32 L64 12 L58 10 L50 20 L42 10 Z" fill="#2b6aa3" />
      <path d="M50 32 V94" stroke="#dff1f6" strokeWidth="4" />
      <circle cx="43" cy="52" r="3" fill="#dff1f6" />
      <circle cx="43" cy="68" r="3" fill="#dff1f6" />
    </Box>
  );
}

/** A yellow warning triangle. */
export function Warning(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M50 10 L92 86 H8 Z" fill="#f2b632" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      <rect x="46" y="34" width="8" height="28" rx="4" fill={INK} />
      <circle cx="50" cy="73" r="5" fill={INK} />
    </Box>
  );
}

/** A green circle with a check mark. */
export function Tick(pos: IconProps) {
  return (
    <Box {...pos}>
      <circle cx="50" cy="50" r="42" fill="#4fa75a" />
      <path d="M28 52 L44 68 L74 34" stroke="#fff" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Box>
  );
}

/** A plain plus sign. */
export function Plus(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M50 18 V82 M18 50 H82" stroke={INK} strokeWidth="14" strokeLinecap="round" />
    </Box>
  );
}

/** A coin with an orange ring: the extra coins Bea pays. */
export function ExtraRing(pos: IconProps) {
  return (
    <Box {...pos}>
      <circle cx="50" cy="50" r="47" fill="none" stroke="#f08a2e" strokeWidth="7" strokeDasharray="12 8" />
    </Box>
  );
}

/** A little downward trend arrow in red. */
export function DownTrend(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M12 22 L40 52 L56 38 L88 74" stroke="#d6403a" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M90 50 V78 H62" stroke="#d6403a" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Box>
  );
}
