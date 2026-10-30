import { Box, Person } from "../components/icons";
import type { IconProps } from "../components/icons";

/** Lesson-specific flat icons for the Banks lesson. Each sits in a 100x100 box. */

const INK = "#23383f";

/** The town bank: roof with a coin, four columns, steps. */
export function BankBuilding(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="6" y="84" width="88" height="8" rx="2" fill="#8f8a7b" />
      <rect x="12" y="76" width="76" height="9" rx="2" fill="#b8b2a0" />
      {[20, 38, 56, 74].map((x) => (
        <rect key={x} x={x} y="40" width="10" height="36" rx="2" fill="#e4d9b8" />
      ))}
      <rect x="10" y="33" width="80" height="9" rx="2" fill="#cdbf98" />
      <path d="M6 35 L50 7 L94 35 Z" fill="#4a7a8c" />
      <circle cx="50" cy="25" r="8" fill="#e3a91a" />
      <circle cx="50" cy="25" r="4.5" fill="none" stroke="#c98d0e" strokeWidth="2" />
    </Box>
  );
}

/** The bank's safe: a heavy box with a round dial. */
export function Safe(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="20" y="86" width="12" height="8" rx="2" fill="#4d5a61" />
      <rect x="68" y="86" width="12" height="8" rx="2" fill="#4d5a61" />
      <rect x="10" y="10" width="80" height="78" rx="10" fill="#7b8a93" />
      <rect x="19" y="19" width="62" height="60" rx="6" fill="#a3b1b8" />
      <circle cx="50" cy="49" r="17" fill="#5f6d75" />
      <circle cx="50" cy="49" r="8" fill="#e3a91a" />
      <path d="M50 49 L50 38" stroke="#c98d0e" strokeWidth="3" strokeLinecap="round" />
      <rect x="9" y="30" width="5" height="12" rx="2" fill="#4d5a61" />
      <rect x="9" y="58" width="5" height="12" rx="2" fill="#4d5a61" />
    </Box>
  );
}

/** Bea's oven. `lit` shows a fire inside. */
export function Oven({ lit, ...pos }: IconProps & { lit?: boolean }) {
  return (
    <Box {...pos}>
      <rect x="66" y="4" width="14" height="24" rx="3" fill="#7b5a45" />
      <rect x="10" y="22" width="80" height="68" rx="10" fill="#b5503c" />
      <g stroke="#97402f" strokeWidth="3" strokeLinecap="round">
        <path d="M10 40 H90" />
        <path d="M30 22 V40 M52 22 V40 M72 22 V40" />
      </g>
      <path d="M26 90 V64 C26 46 74 46 74 64 V90 Z" fill="#3b2a25" />
      {lit && (
        <g>
          <path d="M50 86 C34 82 34 66 46 56 C46 66 54 66 52 52 C66 62 68 80 50 86 Z" fill="#f08a2e" />
          <path d="M50 86 C42 83 42 74 49 68 C49 74 56 75 54 70 C60 76 58 84 50 86 Z" fill="#f7cd4a" />
        </g>
      )}
    </Box>
  );
}

/** A ginger cat that sits and watches. */
export function Cat(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M72 82 C94 82 96 56 84 48" stroke="#e8863a" strokeWidth="9" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="72" rx="26" ry="22" fill="#e8863a" />
      <ellipse cx="50" cy="78" rx="14" ry="14" fill="#f6c28d" />
      <path d="M32 28 L35 8 L48 20 Z" fill="#e8863a" />
      <path d="M68 28 L65 8 L52 20 Z" fill="#e8863a" />
      <path d="M36 24 L37 14 L44 20 Z" fill="#f4a79a" />
      <path d="M64 24 L63 14 L56 20 Z" fill="#f4a79a" />
      <circle cx="50" cy="40" r="21" fill="#e8863a" />
      <g stroke="#c96c22" strokeWidth="3" strokeLinecap="round">
        <path d="M44 22 V28 M50 20 V27 M56 22 V28" />
      </g>
      <ellipse cx="42" cy="40" rx="3" ry="4" fill={INK} />
      <ellipse cx="58" cy="40" rx="3" ry="4" fill={INK} />
      <path d="M46 47 H54 L50 52 Z" fill="#d6403a" />
      <g stroke={INK} strokeWidth="1.8" strokeLinecap="round">
        <path d="M34 48 L22 46 M34 51 L22 54 M66 48 L78 46 M66 51 L78 54" />
      </g>
    </Box>
  );
}

/** A bed with space under it, so coins can be hidden there. */
export function Bed(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="5" y="20" width="9" height="66" rx="3" fill="#8a5a36" />
      <rect x="86" y="42" width="9" height="44" rx="3" fill="#8a5a36" />
      <rect x="14" y="46" width="72" height="16" rx="4" fill="#fff" stroke="#d9d2c0" strokeWidth="2" />
      <path d="M34 46 C34 36 40 34 50 34 H80 C84 34 86 38 86 46 Z" fill="#5aa0d6" />
      <ellipse cx="25" cy="42" rx="11" ry="7" fill="#f4f1e8" stroke="#d9d2c0" strokeWidth="2" />
      <rect x="5" y="62" width="90" height="8" rx="3" fill="#8a5a36" />
    </Box>
  );
}

/** A town door. */
export function Door(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="22" y="8" width="56" height="86" rx="8" fill="#a86f3c" />
      <rect x="30" y="16" width="40" height="30" rx="4" fill="#8a5a36" />
      <rect x="30" y="52" width="40" height="34" rx="4" fill="#8a5a36" />
      <circle cx="66" cy="58" r="4.5" fill="#e3a91a" />
    </Box>
  );
}

/** A shield with a tick drawn as a path (not a glyph). */
export function Shield(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M50 5 L88 18 V48 C88 72 70 88 50 95 C30 88 12 72 12 48 V18 Z" fill="#1b8a9a" />
      <path d="M50 12 L80 22 V48 C80 67 66 80 50 87 Z" fill="#2fa7b8" />
      <path d="M31 50 L45 64 L71 35" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Box>
  );
}

/** A payment card. */
export function Card(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="6" y="22" width="88" height="56" rx="9" fill="#3b78b8" />
      <rect x="6" y="34" width="88" height="11" fill={INK} />
      <rect x="16" y="54" width="18" height="13" rx="3" fill="#e3a91a" />
      <rect x="44" y="58" width="36" height="5" rx="2.5" fill="#a9c8e8" />
    </Box>
  );
}

/** The bank's notebook where it writes who owns which coins. */
export function Ledger(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="14" y="8" width="72" height="84" rx="7" fill="#fff" stroke={INK} strokeWidth="5" />
      <rect x="14" y="8" width="16" height="84" rx="7" fill="#1b8a9a" />
      <g stroke="#9fb3ba" strokeWidth="4" strokeLinecap="round">
        <path d="M40 28 H76 M40 44 H76 M40 60 H76 M40 76 H66" />
      </g>
    </Box>
  );
}

/** A question mark, drawn as text so it works in any language. */
export function Question({ x = 0, y = 0, size = 100, color = INK }: IconProps & { color?: string }) {
  return (
    <Box x={x} y={y} size={size}>
      <text x="50" y="80" textAnchor="middle" style={{ font: "800 88px ui-rounded, 'SF Pro Rounded', Nunito, system-ui, sans-serif" }} fill={color}>
        ?
      </text>
    </Box>
  );
}

/** Three little villagers side by side, for the "bank run" button. */
export function Crowd(pos: IconProps) {
  return (
    <Box {...pos}>
      <Person hat="beanie" shirt="#8e6bbf" x={-6} y={26} size={58} />
      <Person hat="cap" shirt="#5aa05f" x={48} y={26} size={58} />
      <Person hat="fisher" shirt="#2f7fb8" x={21} y={6} size={58} />
    </Box>
  );
}
