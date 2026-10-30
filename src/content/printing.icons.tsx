import { Box } from "../components/icons";
import type { IconProps } from "../components/icons";

/** Flat SVG icons that only the printing lesson needs. Same style and 100x100 box as components/icons. */

const INK = "#23383f";

/** The coin press: a frame, a piston, and a new coin on the base. */
export function CoinPress(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="10" y="78" width="80" height="16" rx="4" fill="#4d5f66" />
      <rect x="16" y="14" width="12" height="66" rx="3" fill="#8a9aa1" />
      <rect x="72" y="14" width="12" height="66" rx="3" fill="#8a9aa1" />
      <rect x="10" y="6" width="80" height="16" rx="5" fill="#5b7078" />
      <rect x="44" y="22" width="12" height="22" fill="#c7d1d6" />
      <rect x="30" y="42" width="40" height="10" rx="3" fill="#a9b6bc" />
      <ellipse cx="50" cy="73" rx="20" ry="6" fill="#e3a91a" />
      <ellipse cx="50" cy="70" rx="20" ry="6" fill="#fbe08a" />
      <circle cx="35" cy="14" r="2.5" fill="#fff" opacity="0.6" />
    </Box>
  );
}

/** A little stack of coins. In this lesson one stack stands for 10 coins. */
export function CoinStack(pos: IconProps) {
  return (
    <Box {...pos}>
      {[0, 1, 2, 3].map((i) => {
        const y = 74 - i * 17;
        return (
          <g key={i}>
            <path d={`M20 ${y} V${y + 14} C20 ${y + 24} 80 ${y + 24} 80 ${y + 14} V${y} Z`} fill="#c98d0e" />
            <ellipse cx="50" cy={y} rx="30" ry="11" fill="#e3a91a" />
            <ellipse cx="50" cy={y - 1.5} rx="22" ry="7" fill="none" stroke="#fbe08a" strokeWidth="3" />
          </g>
        );
      })}
    </Box>
  );
}

/** The town chest, open and empty: you can see the dark inside. */
export function Chest(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M22 6 H78 L84 34 H16 Z" fill="#8a5a36" />
      <path d="M29 12 H71 L75 30 H25 Z" fill="#a86f3c" />
      <path d="M12 36 H88 L92 56 H8 Z" fill="#3b2a1a" />
      <path d="M16 40 H84 L86 52 H14 Z" fill="#59402a" />
      <rect x="8" y="54" width="84" height="38" rx="5" fill="#a86f3c" />
      <rect x="8" y="54" width="84" height="9" fill="#8a5a36" />
      <rect x="8" y="54" width="10" height="38" fill="#7a4d2c" />
      <rect x="82" y="54" width="10" height="38" fill="#7a4d2c" />
      <rect x="40" y="62" width="20" height="18" rx="4" fill="#e3a91a" />
      <circle cx="50" cy="71" r="3.2" fill={INK} />
    </Box>
  );
}

/** A river with a bank on each side. `ghost` draws the new bridge as a dashed plan, `built` as a real bridge. */
export function River({ bridge = "none", ...pos }: IconProps & { bridge?: "none" | "ghost" | "built" }) {
  return (
    <Box {...pos}>
      <rect x="22" y="48" width="56" height="44" fill="#8ccbe6" />
      <path d="M30 66 q6 -5 12 0 t12 0 M44 82 q6 -5 12 0 t12 0" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85" />
      <rect x="0" y="42" width="26" height="50" rx="6" fill="#6bb26f" />
      <rect x="74" y="42" width="26" height="50" rx="6" fill="#6bb26f" />
      {bridge === "ghost" && (
        <g opacity="0.55">
          <rect x="16" y="36" width="68" height="10" rx="2" fill="#a86f3c" stroke={INK} strokeWidth="3" strokeDasharray="6 5" />
          <path d="M20 22 H80 M24 22 V36 M50 22 V36 M76 22 V36" stroke="#8a5a36" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
      )}
      {bridge === "built" && (
        <g>
          <rect x="16" y="38" width="68" height="8" rx="2" fill="#a86f3c" />
          <path d="M20 22 H80 M24 22 V38 M42 22 V38 M58 22 V38 M76 22 V38" stroke="#8a5a36" strokeWidth="4" strokeLinecap="round" fill="none" />
        </g>
      )}
    </Box>
  );
}

/** A bank building with columns: the central bank. */
export function BankBuilding(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M8 38 L50 12 L92 38 Z" fill="#5b7078" />
      <circle cx="50" cy="30" r="5" fill="#dff1f6" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={16 + i * 20} y="42" width="10" height="34" rx="2" fill="#f4f1e8" stroke="#c9c1a9" strokeWidth="1.5" />
      ))}
      <rect x="10" y="78" width="80" height="8" rx="2" fill="#8a9aa1" />
      <rect x="4" y="86" width="92" height="8" rx="2" fill="#5b7078" />
    </Box>
  );
}

/** A green tick drawn as a shape (not a text glyph). */
export function Tick(pos: IconProps) {
  return (
    <Box {...pos}>
      <circle cx="50" cy="50" r="40" fill="#4fa75a" />
      <path d="M28 52 L44 68 L74 34" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Box>
  );
}

/** A flat up arrow for "going up". */
export function UpArrow({ color = "#d6403a", ...pos }: IconProps & { color?: string }) {
  return (
    <Box {...pos}>
      <path d="M50 8 L86 46 H64 V92 H36 V46 H14 Z" fill={color} stroke={color} strokeWidth="4" strokeLinejoin="round" />
    </Box>
  );
}

/** A coin that has lost its shine: only grey metal. */
export function MetalDisc(pos: IconProps) {
  return (
    <Box {...pos}>
      <circle cx="50" cy="50" r="42" fill="#8f9ba0" />
      <circle cx="50" cy="50" r="31" fill="none" stroke="#6f7c82" strokeWidth="4" />
      <path d="M16 42 A38 38 0 0 1 56 13 A44 44 0 0 0 16 42 Z" fill="#c3cbcf" />
    </Box>
  );
}
