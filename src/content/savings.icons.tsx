import { Box, Coin, Piggy } from "../components/icons";
import type { IconProps } from "../components/icons";

/** Flat SVG icons that only the savings lesson needs. Same 100x100 box as the shared icons. */

const INK = "#23383f";

export function Bike(pos: IconProps) {
  return (
    <Box {...pos}>
      {/* wheels */}
      <circle cx="22" cy="68" r="17" fill="#ffffff" fillOpacity="0.55" stroke={INK} strokeWidth="5" />
      <circle cx="78" cy="68" r="17" fill="#ffffff" fillOpacity="0.55" stroke={INK} strokeWidth="5" />
      <circle cx="22" cy="68" r="3.5" fill={INK} />
      <circle cx="78" cy="68" r="3.5" fill={INK} />
      {/* frame */}
      <path d="M22 68 L40 40 L66 40 L48 68 Z" fill="none" stroke="#d6403a" strokeWidth="6" strokeLinejoin="round" />
      <path d="M66 40 L78 68" stroke="#d6403a" strokeWidth="6" strokeLinecap="round" />
      {/* seat and handlebar */}
      <path d="M31 33 H49" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      <path d="M40 40 V34" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path d="M66 40 L61 26 H73" stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* pedal */}
      <circle cx="48" cy="68" r="5" fill="#e3a91a" />
    </Box>
  );
}

/** A wrapped sweet. */
export function Candy(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M32 50 L8 34 L8 66 Z" fill="#f9a8bd" />
      <path d="M68 50 L92 34 L92 66 Z" fill="#f9a8bd" />
      <circle cx="50" cy="50" r="23" fill="#ef5f86" />
      <path d="M38 36 L51 66" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <path d="M53 32 L64 56" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <path d="M33 40 C38 30 46 28 52 28" stroke="#f7a1b8" strokeWidth="4" strokeLinecap="round" fill="none" />
    </Box>
  );
}

export function RainCloud(pos: IconProps) {
  return (
    <Box {...pos}>
      <path
        d="M26 62 C12 62 8 44 24 40 C24 24 46 18 54 32 C64 22 84 30 80 46 C94 48 92 62 78 62 Z"
        fill="#9db4c1"
      />
      <path d="M28 40 C32 30 42 26 50 30" stroke="#c4d4dd" strokeWidth="4" strokeLinecap="round" fill="none" />
      <g stroke="#3b9ad9" strokeWidth="5.5" strokeLinecap="round">
        <path d="M30 72 L25 86" />
        <path d="M50 72 L45 86" />
        <path d="M70 72 L65 86" />
      </g>
    </Box>
  );
}

export function Calendar(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="12" y="20" width="76" height="68" rx="9" fill="#ffffff" stroke={INK} strokeWidth="5" />
      <path d="M12 29 A9 9 0 0 1 21 20 H79 A9 9 0 0 1 88 29 V42 H12 Z" fill="#d6403a" />
      <rect x="29" y="10" width="8" height="18" rx="4" fill={INK} />
      <rect x="63" y="10" width="8" height="18" rx="4" fill={INK} />
      <g fill="#b7c8cf">
        <rect x="24" y="52" width="11" height="10" rx="2" />
        <rect x="44" y="52" width="11" height="10" rx="2" />
        <rect x="64" y="52" width="11" height="10" rx="2" />
        <rect x="24" y="69" width="11" height="10" rx="2" />
        <rect x="44" y="69" width="11" height="10" rx="2" />
      </g>
    </Box>
  );
}

/** A glass jar with coins at the bottom and a rain cloud on the front: the rainy-day jar. */
export function RainyJar(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M26 28 H74 V80 Q74 90 64 90 H36 Q26 90 26 80 Z" fill="#e3f3f8" stroke={INK} strokeWidth="4.5" strokeLinejoin="round" />
      <rect x="22" y="12" width="56" height="16" rx="5" fill="#8a5a36" stroke={INK} strokeWidth="4" />
      <Coin x={31} y={68} size={22} />
      <Coin x={47} y={64} size={22} />
      <RainCloud x={32} y={30} size={36} />
    </Box>
  );
}

/** The piggy bank with a small bike on it: the bike savings. */
export function BikePiggy(pos: IconProps) {
  return (
    <Box {...pos}>
      <Piggy x={0} y={0} size={100} />
      <circle cx="68" cy="68" r="28" fill="#ffffff" stroke={INK} strokeWidth="4" />
      <Bike x={46} y={46} size={44} />
    </Box>
  );
}

function bootShape() {
  return (
    <>
      <path d="M30 14 H58 V50 C58 58 72 60 84 64 C92 67 94 78 86 80 H30 Z" fill="#8a5a36" />
      <rect x="30" y="14" width="28" height="12" fill="#6f4627" />
      <rect x="26" y="76" width="68" height="10" rx="5" fill="#3a2412" />
      <g stroke="#fff3d6" strokeWidth="3" strokeLinecap="round">
        <path d="M58 54 L68 58" />
        <path d="M58 63 L70 67" />
      </g>
    </>
  );
}

export function Boot(pos: IconProps) {
  return <Box {...pos}>{bootShape()}</Box>;
}

/** A boot with a jagged tear in it. */
export function BrokenBoot(pos: IconProps) {
  return (
    <Box {...pos}>
      {bootShape()}
      <path d="M30 34 L42 40 L37 48 L50 54 L45 62 L58 68" stroke="#fff3d6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <g stroke="#d6403a" strokeWidth="4" strokeLinecap="round">
        <path d="M70 22 L80 12" />
        <path d="M76 34 L90 32" />
        <path d="M64 14 L64 4" />
      </g>
    </Box>
  );
}

/** Green circle with a check mark: done, goal reached. */
export function CheckMark(pos: IconProps) {
  return (
    <Box {...pos}>
      <circle cx="50" cy="50" r="42" fill="#4fa75a" />
      <path d="M28 52 L44 68 L72 34" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Box>
  );
}
