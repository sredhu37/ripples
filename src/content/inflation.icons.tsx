import { Pop } from "../components/diagram";
import { Box, Person } from "../components/icons";
import type { IconProps, Mood } from "../components/icons";

/** Flat SVG icons for the Inflation lesson. Each sits in a 100x100 box, like the shared icons. */

const INK = "#23383f";
export const RISE = "#d6403a";
export const FALL = "#4fa75a";
const SCOOP = "#f4a3ba";

/** A cone with a pink scoop. `half` shows half a scoop (the other half dashed). `opacity` fades it out. */
export function IceCream({ half, opacity = 1, ...pos }: IconProps & { half?: boolean; opacity?: number }) {
  return (
    <Box {...pos}>
      <g opacity={opacity}>
        <path d="M30 54 L70 54 L50 96 Z" fill="#d9a35b" stroke="#b97f3a" strokeWidth="3" strokeLinejoin="round" />
        <path d="M40 64 H60 M44 76 H56" stroke="#b97f3a" strokeWidth="3" strokeLinecap="round" />
        {half ? (
          <>
            <path d="M50 10 A26 26 0 0 0 50 62 Z" fill={SCOOP} />
            <circle cx="50" cy="36" r="26" fill="none" stroke={INK} strokeWidth="3" strokeDasharray="6 5" />
            <path d="M30 28 C32 22 36 18 41 16" stroke="#fbd0dd" strokeWidth="5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <circle cx="50" cy="36" r="26" fill={SCOOP} />
            <path d="M30 28 C32 22 36 18 41 16" stroke="#fbd0dd" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M26 50 C30 60 38 56 42 52 Z" fill={SCOOP} />
          </>
        )}
      </g>
    </Box>
  );
}

/** A milk carton. */
export function Milk(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M28 34 L50 10 L72 34 Z" fill="#dff1f6" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <rect x="28" y="34" width="44" height="58" rx="3" fill="#fff" stroke={INK} strokeWidth="4" />
      <path d="M50 48 C42 60 42 70 50 74 C58 70 58 60 50 48 Z" fill="#2f7fb8" />
    </Box>
  );
}

/** Three sugar cubes. */
export function Sugar(pos: IconProps) {
  const cube = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="36" height="30" rx="5" fill="#fff" stroke="#8aa3ad" strokeWidth="3" />
      <path d={`M${x + 6} ${y + 8} H${x + 18}`} stroke="#dbe6ea" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
  return (
    <Box {...pos}>
      {cube(12, 62)}
      {cube(52, 62)}
      {cube(32, 30)}
    </Box>
  );
}

/** A glass jar with coins in it. */
export function Jar(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="26" y="8" width="48" height="14" rx="5" fill="#a86f3c" />
      <path d="M30 22 H70 V82 Q70 92 60 92 H40 Q30 92 30 82 Z" fill="#dff1f6" fillOpacity="0.75" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <g fill="#e3a91a" stroke="#c98d0e" strokeWidth="3">
        <circle cx="42" cy="80" r="9" />
        <circle cx="58" cy="80" r="9" />
        <circle cx="50" cy="64" r="9" />
        <circle cx="42" cy="48" r="9" />
        <circle cx="58" cy="48" r="9" />
      </g>
    </Box>
  );
}

/** A thick arrow pointing up (price rises, or interest) or down (price falls). */
export function Trend({ down, color, ...pos }: IconProps & { down?: boolean; color?: string }) {
  const c = color ?? (down ? FALL : RISE);
  return (
    <Box {...pos}>
      <g transform={down ? "rotate(180 50 50)" : undefined}>
        <polygon points="50,10 86,50 64,50 64,90 36,90 36,50 14,50" fill={c} stroke={c} strokeWidth="4" strokeLinejoin="round" />
      </g>
    </Box>
  );
}

/** A door with a handle. */
export function Door(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="22" y="8" width="56" height="86" rx="4" fill="#a86f3c" stroke={INK} strokeWidth="4" />
      <rect x="32" y="20" width="36" height="30" rx="3" fill="#c28a52" />
      <circle cx="66" cy="60" r="4.5" fill="#e3a91a" />
    </Box>
  );
}

/** The ice cream seller: a cook's cap over the shared Person look, so nobody from the cast is confused with them. */
export function SellerFace({ mood = "happy", ...pos }: IconProps & { mood?: Mood }) {
  return (
    <>
      <Person hat="none" shirt="#1b8a9a" mood={mood} {...pos} />
      <Box {...pos}>
        <path d="M30 24 C28 6 44 4 50 10 C56 4 72 6 70 24 Z" fill="#fff" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <rect x="30" y="20" width="40" height="7" rx="3" fill="#f4a3ba" stroke={INK} strokeWidth="3" />
      </Box>
    </>
  );
}

/** The seller, popping in at (x, y). */
export function Seller({ x, y = 90, size = 130, mood = "happy" }: { x: number; y?: number; size?: number; mood?: Mood }) {
  return (
    <Pop x={x} y={y}>
      <SellerFace size={size} mood={mood} />
    </Pop>
  );
}
