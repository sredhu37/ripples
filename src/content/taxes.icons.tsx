import { Box } from "../components/icons";
import type { IconProps } from "../components/icons";

/** Flat SVG icons for the Taxes lesson, drawn in code. Each one sits in a 100x100 box like the shared icons. */

const INK = "#23383f";

/** A stretch of road on grass. With `holes` it is full of potholes. */
export function Road({ holes, ...pos }: IconProps & { holes?: boolean }) {
  return (
    <Box {...pos}>
      <rect x="8" y="12" width="84" height="78" rx="12" fill="#8cc474" />
      <path d="M28 90 L43 12 H57 L72 90 Z" fill="#5f6c75" />
      <g stroke="#f4f1e8" strokeWidth="4" strokeLinecap="round">
        <path d="M50 20 V30" />
        <path d="M50 44 V56" />
        <path d="M50 70 V82" />
      </g>
      {holes && (
        <g fill="#2a3238">
          <ellipse cx="44" cy="36" rx="8" ry="4.5" />
          <ellipse cx="57" cy="62" rx="9" ry="5" />
          <ellipse cx="42" cy="80" rx="7" ry="4" />
        </g>
      )}
    </Box>
  );
}

export function School(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="12" y="46" width="76" height="42" rx="3" fill="#e0a05a" />
      <path d="M5 48 L50 20 L95 48 Z" fill="#b8452f" />
      <path d="M50 20 V6" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M50 6 L66 11 L50 16 Z" fill="#2f7fb8" />
      <circle cx="50" cy="37" r="6.5" fill="#fff" stroke={INK} strokeWidth="2.5" />
      <path d="M50 33 V37 H54" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="42" y="62" width="16" height="26" rx="2" fill="#7a4a24" />
      <rect x="19" y="58" width="15" height="15" rx="2" fill="#dff1f6" stroke={INK} strokeWidth="2.5" />
      <rect x="66" y="58" width="15" height="15" rx="2" fill="#dff1f6" stroke={INK} strokeWidth="2.5" />
    </Box>
  );
}

export function FireTruck(pos: IconProps) {
  return (
    <Box {...pos}>
      {/* ladder */}
      <g stroke="#b5bcc0" strokeWidth="3" strokeLinecap="round">
        <path d="M14 36 L62 20" />
        <path d="M14 44 L62 28" />
        <path d="M24 33 L26 41" />
        <path d="M36 29 L38 37" />
        <path d="M48 25 L50 33" />
      </g>
      {/* body and cab */}
      <rect x="8" y="46" width="52" height="30" rx="4" fill="#d6403a" />
      <path d="M60 46 H78 L92 60 V76 H60 Z" fill="#c0392b" />
      <path d="M68 51 H77 L86 61 H68 Z" fill="#dff1f6" />
      <rect x="8" y="58" width="52" height="4" fill="#f4f1e8" />
      <rect x="64" y="40" width="10" height="6" rx="2" fill="#f2b632" />
      {/* wheels */}
      <circle cx="28" cy="78" r="11" fill={INK} />
      <circle cx="28" cy="78" r="4.5" fill="#b5bcc0" />
      <circle cx="74" cy="78" r="11" fill={INK} />
      <circle cx="74" cy="78" r="4.5" fill="#b5bcc0" />
    </Box>
  );
}

/** Two trees on a patch of grass. */
export function Park(pos: IconProps) {
  return (
    <Box {...pos}>
      <ellipse cx="50" cy="86" rx="44" ry="9" fill="#8cc474" />
      <rect x="27" y="52" width="9" height="34" rx="3" fill="#7a4a24" />
      <circle cx="31" cy="38" r="21" fill="#4fa75a" />
      <circle cx="19" cy="48" r="13" fill="#5cb866" />
      <circle cx="43" cy="46" r="13" fill="#3f9b4a" />
      <rect x="68" y="58" width="8" height="28" rx="3" fill="#7a4a24" />
      <circle cx="72" cy="46" r="16" fill="#5cb866" />
      <circle cx="80" cy="54" r="9" fill="#3f9b4a" />
      <circle cx="56" cy="82" r="2.5" fill="#f2b632" />
      <circle cx="90" cy="80" r="2.5" fill="#df4a3f" />
    </Box>
  );
}

/** The shared pot. `heap` is how many coins show on top (0 to 3). */
export function Pot({ heap = 0, ...pos }: IconProps & { heap?: 0 | 1 | 2 | 3 }) {
  return (
    <Box {...pos}>
      {/* handles */}
      <g stroke="#157684" strokeWidth="6" fill="none" strokeLinecap="round">
        <path d="M22 50 C8 50 8 68 24 68" />
        <path d="M78 50 C92 50 92 68 76 68" />
      </g>
      {heap >= 1 && (
        <g fill="#e3a91a" stroke="#c98d0e" strokeWidth="2">
          <circle cx="50" cy="34" r="10" />
          {heap >= 2 && <circle cx="34" cy="38" r="9" />}
          {heap >= 2 && <circle cx="66" cy="38" r="9" />}
          {heap >= 3 && <circle cx="42" cy="24" r="9" />}
          {heap >= 3 && <circle cx="60" cy="24" r="9" />}
        </g>
      )}
      <path d="M20 42 C12 66 22 90 50 90 C78 90 88 66 80 42 Z" fill="#1b8a9a" />
      <ellipse cx="50" cy="42" rx="31" ry="9" fill="#157684" />
      <ellipse cx="50" cy="43" rx="24" ry="5.5" fill="#0f5560" />
      <path d="M26 58 C24 68 28 78 36 82" stroke="#6cc3d0" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="56" cy="66" r="10" fill="#e3a91a" stroke="#c98d0e" strokeWidth="2.5" />
      <path d="M56 61 V71 M52 66 H60" stroke="#c98d0e" strokeWidth="2.5" strokeLinecap="round" />
    </Box>
  );
}

/** A balance scale, level. */
export function Scale(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="32" y="86" width="36" height="8" rx="4" fill={INK} />
      <rect x="46" y="22" width="8" height="66" rx="3" fill={INK} />
      <rect x="10" y="18" width="80" height="7" rx="3.5" fill={INK} />
      <circle cx="50" cy="16" r="6" fill="#f2b632" stroke={INK} strokeWidth="2.5" />
      <g stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M14 25 L4 56 M14 25 L26 56" />
        <path d="M86 25 L74 56 M86 25 L96 56" />
      </g>
      <path d="M0 56 H30 C30 68 22 72 15 72 C8 72 0 68 0 56 Z" fill="#1b8a9a" />
      <path d="M70 56 H100 C100 68 92 72 85 72 C78 72 70 68 70 56 Z" fill="#1b8a9a" />
    </Box>
  );
}

/** A ballot box with a paper going into the slot. */
export function BallotBox(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="30" y="2" width="40" height="46" rx="3" fill="#fff" stroke={INK} strokeWidth="3" transform="rotate(-6 50 25)" />
      <g stroke="#9db4bb" strokeWidth="3" strokeLinecap="round" transform="rotate(-6 50 25)">
        <path d="M38 14 H62" />
        <path d="M38 24 H62" />
      </g>
      <rect x="14" y="44" width="72" height="46" rx="6" fill="#2f7fb8" />
      <rect x="28" y="44" width="44" height="7" rx="3.5" fill={INK} />
      <path d="M44 66 L50 72 L62 58" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Box>
  );
}

/** A little handcart. */
export function Cart(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M72 44 L96 26" stroke="#7a4a24" strokeWidth="5" strokeLinecap="round" />
      <path d="M12 38 H76 L68 70 H20 Z" fill="#a86f3c" />
      <g stroke="#7a4a24" strokeWidth="3" strokeLinecap="round">
        <path d="M16 52 H73" />
        <path d="M26 38 L30 70" />
        <path d="M46 38 V70" />
        <path d="M64 38 L60 70" />
      </g>
      <circle cx="28" cy="76" r="12" fill={INK} />
      <circle cx="28" cy="76" r="5" fill="#b5bcc0" />
      <circle cx="62" cy="76" r="12" fill={INK} />
      <circle cx="62" cy="76" r="5" fill="#b5bcc0" />
    </Box>
  );
}

export function Hammer(pos: IconProps) {
  return (
    <Box {...pos}>
      <g transform="rotate(35 50 50)">
        <rect x="45" y="30" width="10" height="66" rx="4" fill="#a86f3c" />
        <rect x="24" y="14" width="52" height="22" rx="5" fill="#8d979c" />
        <rect x="24" y="14" width="14" height="22" rx="5" fill="#6f7a80" />
      </g>
    </Box>
  );
}

/** Green circle with a check mark. */
export function Tick(pos: IconProps) {
  return (
    <Box {...pos}>
      <circle cx="50" cy="50" r="44" fill="#3f9b4a" />
      <path d="M27 52 L43 68 L74 34" stroke="#fff" strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Box>
  );
}

/** Red circle with a cross. */
export function Cross(pos: IconProps) {
  return (
    <Box {...pos}>
      <circle cx="50" cy="50" r="44" fill="#d6403a" />
      <path d="M32 32 L68 68 M68 32 L32 68" stroke="#fff" strokeWidth="11" fill="none" strokeLinecap="round" />
    </Box>
  );
}
