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
  business: (
    <g>
      {/* Wooden ice cream cart body */}
      <rect
        x="20"
        y="44"
        width="60"
        height="30"
        rx="3"
        fill="#6baed6"
        stroke={INK}
        strokeWidth="2.5"
      />
      {/* Striped canopy awning */}
      <path
        d="M16 28 L84 28 L82 42 L72 38 L62 42 L52 38 L42 42 L32 38 L22 42 L16 38 Z"
        fill="#e65c5c"
        stroke={INK}
        strokeWidth="2"
      />
      <path
        d="M26 28 L24 40 M46 28 L44 40 M66 28 L64 40"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Handle and pole */}
      <path
        d="M20 30 V44 M80 30 V44 M12 50 H20"
        stroke={INK}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Big wheel */}
      <circle cx="48" cy="74" r="14" fill="#e0a860" stroke={INK} strokeWidth="3" />
      <circle cx="48" cy="74" r="4" fill="#fff" stroke={INK} strokeWidth="2" />
      {/* Ice cream cone emblem */}
      <path d="M72 16 L67 26 H77 Z" fill="#d9953e" />
      <circle cx="72" cy="13" r="6" fill="#f472b6" />
    </g>
  ),
  equity: (
    <g>
      {/* Shared ownership pie: 50% Finn (blue) and 50% Mira (pink) */}
      <circle cx="50" cy="50" r="36" fill="#f8fafc" stroke={INK} strokeWidth="3" />
      <path d="M50 50 L50 14 A36 36 0 0 0 50 86 Z" fill="#38bdf8" stroke={INK} strokeWidth="2" />
      <path d="M50 50 L50 14 A36 36 0 0 1 50 86 Z" fill="#ec4899" stroke={INK} strokeWidth="2" />
      {/* Golden coin center hub */}
      <circle cx="50" cy="50" r="16" fill="#e3a91a" stroke={INK} strokeWidth="2.5" />
      <circle cx="50" cy="50" r="10" fill="none" stroke="#c98d0e" strokeWidth="2" />
      <text x="50" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill={INK}>
        %
      </text>
    </g>
  ),
  loans: (
    <g>
      <path d="M2 40 H22 V74 H2 Z" fill="#2f7fb8" />
      <path d="M98 40 H78 V74 H98 Z" fill="#e68aa0" />
      <path
        d="M22 44 C34 40 44 40 54 46 L66 56 C70 60 66 66 60 64 L52 60 L64 70 C68 74 62 80 58 76 L46 66 L54 76 C58 80 52 86 48 82 L36 70 L30 74 L22 72 Z"
        fill="#f3cfa6"
      />
      <path
        d="M78 44 C68 40 60 40 52 44 L40 52 C36 56 40 62 44 60"
        fill="none"
        stroke="#e8b98c"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="50" cy="26" r="13" fill="#e3a91a" />
      <circle cx="50" cy="26" r="8" fill="none" stroke="#c98d0e" strokeWidth="3" />
    </g>
  ),
  banks: (
    <g>
      <path d="M50 8 L94 32 H6 Z" fill="#3b5b7a" />
      <rect x="6" y="32" width="88" height="8" fill="#2a435c" />
      {[16, 34, 52, 70].map((x) => (
        <rect
          key={x}
          x={x}
          y="44"
          width="14"
          height="32"
          rx="2"
          fill="#f4f1e8"
          stroke="#cfc6ad"
          strokeWidth="2"
        />
      ))}
      <rect x="4" y="78" width="92" height="8" rx="2" fill="#a9b6bd" />
      <rect x="0" y="86" width="100" height="8" rx="2" fill="#7e8d95" />
      <circle cx="50" cy="22" r="6" fill="#f7cb44" />
    </g>
  ),
  interest: (
    <g>
      <path
        d="M50 90 C50 62 50 48 50 34"
        stroke="#3f8a47"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
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
      <rect
        x="34"
        y="18"
        width="32"
        height="26"
        rx="3"
        fill="#f4f1e8"
        stroke="#cfc6ad"
        strokeWidth="2"
      />
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
      <path
        d="M34 60 L66 60 M40 72 L60 72"
        stroke="#c98a3f"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="38" cy="44" r="16" fill="#f4a3ba" />
      <circle cx="62" cy="44" r="16" fill="#8fd0e0" />
      <circle cx="50" cy="30" r="17" fill="#fbe6a6" />
      <circle cx="50" cy="16" r="6" fill="#d6403a" />
    </g>
  ),
  printing: (
    <g>
      <rect
        x="24"
        y="6"
        width="52"
        height="34"
        rx="3"
        fill="#fff"
        stroke="#cfc6ad"
        strokeWidth="3"
      />
      <rect x="6" y="36" width="88" height="40" rx="10" fill="#6b8896" />
      <rect x="6" y="36" width="88" height="12" rx="6" fill="#587684" />
      <circle cx="82" cy="58" r="4" fill="#4fa75a" />
      <rect
        x="22"
        y="68"
        width="56"
        height="28"
        rx="3"
        fill="#fff"
        stroke="#cfc6ad"
        strokeWidth="3"
      />
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
  profit: (
    <g>
      <path
        d="M16 64 C12 44 30 30 50 30 C70 30 88 44 84 64 C84 74 77 78 70 78 H30 C23 78 16 74 16 64 Z"
        fill="#d9953e"
      />
      <path d="M24 56 C26 44 36 38 50 38 C64 38 74 44 76 56 Z" fill="#ecb766" />
      <circle cx="68" cy="32" r="18" fill="#e3a91a" />
      <circle cx="68" cy="32" r="13" fill="none" stroke="#c98d0e" strokeWidth="2.5" />
      <path d="M68 24 V40 M60 32 H76" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
    </g>
  ),
  sales: (
    <g>
      <rect x="12" y="56" width="76" height="34" rx="3" fill="#2f7fb8" />
      <path d="M8 56 L50 20 L92 56 Z" fill="#d6403a" />
      <rect x="22" y="66" width="24" height="16" rx="2" fill="#fff" />
      <circle cx="66" cy="74" r="12" fill="#e3a91a" />
      <circle cx="66" cy="74" r="8" fill="none" stroke="#c98d0e" strokeWidth="2" />
    </g>
  ),
  ticketsize: (
    <g>
      <path d="M50 16 V82 M20 82 H80" stroke="#23383f" strokeWidth="5" strokeLinecap="round" />
      <path d="M18 36 L82 36" stroke="#23383f" strokeWidth="5" strokeLinecap="round" />
      <path d="M18 36 L10 60 H26 Z" fill="#e0a860" />
      <path d="M82 36 L70 60 H94 Z" fill="#e0a860" />
      <circle cx="18" cy="52" r="5" fill="#d9953e" />
      <rect x="76" y="46" width="12" height="10" rx="2" fill="#5aa05f" />
    </g>
  ),
  marketshare: (
    <g>
      <circle cx="50" cy="50" r="38" fill="#df4a3f" />
      <path d="M50 50 L50 12 A38 38 0 1 1 14 62 Z" fill="#4fa75a" />
      <circle cx="50" cy="50" r="14" fill="#fff" stroke="#23383f" strokeWidth="3" />
    </g>
  ),
  competition: (
    <g>
      <rect x="10" y="38" width="34" height="48" rx="2" fill="#e68aa0" />
      <path d="M8 38 L27 18 L46 38 Z" fill="#d6403a" />
      <rect x="18" y="56" width="18" height="30" fill="#fff" />
      <rect x="56" y="38" width="34" height="48" rx="2" fill="#4a90e2" />
      <path d="M54 38 L73 18 L92 38 Z" fill="#2f7fb8" />
      <rect x="64" y="56" width="18" height="30" fill="#fff" />
    </g>
  ),
  marketing: (
    <g>
      <path d="M16 42 H32 L60 22 V78 L32 58 H16 Z" fill="#1b8a9a" />
      <path d="M26 58 L22 80 H34 L38 58" fill="#156470" />
      <path
        d="M68 36 C76 42 76 58 68 64 M78 26 C90 38 90 62 78 74"
        stroke="#e3a91a"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  ),
  hiring: (
    <g>
      <path d="M8 94 C8 70 24 60 40 60 C56 60 72 70 72 94 Z" fill="#e68aa0" />
      <circle cx="40" cy="40" r="18" fill="#f3cfa6" />
      <rect
        x="26"
        y="22"
        width="28"
        height="12"
        rx="3"
        fill="#fff"
        stroke="#cfc6ad"
        strokeWidth="2"
      />
      <path d="M48 94 C48 76 60 68 74 68 C88 68 100 76 100 94 Z" fill="#f5a623" />
      <circle cx="74" cy="50" r="14" fill="#e8b98c" />
      <rect
        x="62"
        y="36"
        width="24"
        height="10"
        rx="3"
        fill="#fff"
        stroke="#cfc6ad"
        strokeWidth="2"
      />
    </g>
  ),
  scale: (
    <g>
      <path d="M12 52 H34 V68 C34 74 42 76 50 78 C58 80 58 88 52 90 H12 Z" fill="#c0603a" />
      <path d="M52 32 L64 32 L64 48 L76 36 L88 36 L88 88 H52 Z" fill="#587684" />
      <rect x="58" y="16" width="10" height="16" fill="#3b5b7a" />
      <rect x="76" y="20" width="10" height="16" fill="#3b5b7a" />
      <circle cx="68" cy="8" r="4" fill="#a9b6bd" />
      <circle cx="78" cy="10" r="3" fill="#a9b6bd" />
    </g>
  ),
  tools: (
    <g>
      <rect x="25" y="55" width="50" height="30" rx="4" fill="#64748b" />
      <polygon points="25,55 15,70 25,85" fill="#475569" />
      <rect x="42" y="25" width="16" height="35" rx="3" fill="#cbd5e1" />
      <circle cx="50" cy="25" r="10" fill="#f59e0b" />
    </g>
  ),
  massproduction: (
    <g>
      <rect x="15" y="60" width="70" height="15" rx="3" fill="#334155" />
      <circle cx="28" cy="67" r="5" fill="#94a3b8" />
      <circle cx="50" cy="67" r="5" fill="#94a3b8" />
      <circle cx="72" cy="67" r="5" fill="#94a3b8" />
      <rect x="22" y="38" width="16" height="18" rx="2" fill="#3b82f6" />
      <rect x="44" y="38" width="16" height="18" rx="2" fill="#3b82f6" />
      <rect x="66" y="38" width="16" height="18" rx="2" fill="#3b82f6" />
    </g>
  ),
  computers: (
    <g>
      <rect
        x="25"
        y="25"
        width="50"
        height="50"
        rx="8"
        fill="#0f172a"
        stroke="#0284c7"
        strokeWidth="4"
      />
      <rect x="36" y="36" width="28" height="28" rx="3" fill="#0284c7" />
      <line x1="25" y1="40" x2="15" y2="40" stroke="#0284c7" strokeWidth="3" />
      <line x1="25" y1="60" x2="15" y2="60" stroke="#0284c7" strokeWidth="3" />
      <line x1="75" y1="40" x2="85" y2="40" stroke="#0284c7" strokeWidth="3" />
      <line x1="75" y1="60" x2="85" y2="60" stroke="#0284c7" strokeWidth="3" />
      <circle cx="50" cy="50" r="6" fill="#f8fafc" />
    </g>
  ),
  internet: (
    <g>
      <circle cx="50" cy="50" r="30" fill="none" stroke="#0284c7" strokeWidth="4" />
      <ellipse cx="50" cy="50" rx="14" ry="30" fill="none" stroke="#38bdf8" strokeWidth="3" />
      <line x1="20" y1="50" x2="80" y2="50" stroke="#0284c7" strokeWidth="3" />
      <circle cx="50" cy="20" r="5" fill="#10b981" />
      <circle cx="50" cy="80" r="5" fill="#10b981" />
      <circle cx="20" cy="50" r="5" fill="#10b981" />
      <circle cx="80" cy="50" r="5" fill="#10b981" />
    </g>
  ),
  automation: (
    <g>
      <rect x="30" y="75" width="40" height="15" rx="3" fill="#334155" />
      <circle cx="40" cy="75" r="8" fill="#0284c7" />
      <line
        x1="40"
        y1="75"
        x2="60"
        y2="45"
        stroke="#0284c7"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="60" cy="45" r="7" fill="#0369a1" />
      <line
        x1="60"
        y1="45"
        x2="75"
        y2="25"
        stroke="#0284c7"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="75" cy="25" r="4" fill="#38bdf8" />
    </g>
  ),
  ai: (
    <g>
      <circle cx="35" cy="35" r="8" fill="#8b5cf6" />
      <circle cx="65" cy="35" r="8" fill="#8b5cf6" />
      <circle cx="50" cy="65" r="8" fill="#ec4899" />
      <line x1="35" y1="35" x2="65" y2="35" stroke="#c084fc" strokeWidth="3" />
      <line x1="35" y1="35" x2="50" y2="65" stroke="#c084fc" strokeWidth="3" />
      <line x1="65" y1="35" x2="50" y2="65" stroke="#c084fc" strokeWidth="3" />
      <circle cx="50" cy="45" r="4" fill="#fef08a" />
    </g>
  ),
  jobs: (
    <g>
      <line x1="50" y1="40" x2="50" y2="85" stroke="#64748b" strokeWidth="4" />
      <circle cx="50" cy="40" r="7" fill="#334155" />
      <line x1="50" y1="40" x2="50" y2="15" stroke="#10b981" strokeWidth="3" />
      <line x1="50" y1="40" x2="72" y2="52" stroke="#10b981" strokeWidth="3" />
      <line x1="50" y1="40" x2="28" y2="52" stroke="#10b981" strokeWidth="3" />
    </g>
  ),
  humanedge: (
    <g>
      <path d="M50 35 C40 22 25 30 35 45 L50 62 L65 45 C75 30 60 22 50 35 Z" fill="#e11d48" />
      <circle cx="50" cy="72" r="14" fill="#38bdf8" opacity="0.7" />
      <path
        d="M30 80 C35 70 45 68 50 74 C55 68 65 70 70 80"
        stroke="#f59e0b"
        strokeWidth="3"
        fill="none"
      />
    </g>
  ),
  supply_demand: (
    <g>
      {/* Price tag */}
      <path d="M25 30 L55 15 L85 45 L55 75 Z" fill="#f59e0b" stroke={INK} strokeWidth="2.5" />
      <circle cx="45" cy="30" r="4" fill="#fff" stroke={INK} strokeWidth="1.5" />
      {/* Sparkling diamond */}
      <polygon
        points="58,40 68,40 73,48 58,62 43,48 48,40"
        fill="#38bdf8"
        stroke={INK}
        strokeWidth="2"
      />
    </g>
  ),
  scarcity_prices: (
    <g>
      {/* Golden bar base */}
      <polygon
        points="20,68 35,50 75,50 90,68 80,78 30,78"
        fill="#eab308"
        stroke={INK}
        strokeWidth="2.5"
      />
      <polygon points="35,50 75,50 70,68 28,68" fill="#facc15" stroke={INK} strokeWidth="2" />
      {/* Skill graduation cap / star */}
      <polygon points="50,14 74,24 50,34 26,24" fill="#3b82f6" stroke={INK} strokeWidth="2" />
      <path d="M74 24 V38" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <polygon
        points="50,22 53,28 60,29 55,34 56,40 50,37 44,40 45,34 40,29 47,28"
        fill="#fbbf24"
        stroke={INK}
        strokeWidth="1"
      />
    </g>
  ),
};

/** Picture for a lesson on the trail, on its badge and in headings. */
export function LessonIcon({
  id,
  size = 48,
  label,
}: {
  id: string;
  size?: number;
  label?: string;
}) {
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
      <path
        d="M64 34 C72 42 72 58 64 66 M76 22 C90 36 90 64 76 78"
        stroke="currentColor"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  ),
  speakerOff: (
    <g>
      <path d="M8 38 H28 L50 18 V82 L28 62 H8 Z" fill="currentColor" />
      <path
        d="M64 38 L90 64 M90 38 L64 64"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
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
      <path
        d="M28 44 V30 C28 16 72 16 72 30 V44"
        stroke="currentColor"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
      />
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
      <polygon
        points="50,50 55,61 67,62 58,70 61,82 50,75 39,82 42,70 33,62 45,61"
        fill="#c98d0e"
      />
    </g>
  ),
  globe: (
    <g>
      <circle cx="50" cy="50" r="40" fill="#3b9ad9" />
      <path
        d="M26 24 C38 22 44 30 40 38 C36 46 24 44 22 54 C20 62 28 68 34 66 C38 76 34 84 30 84 C16 74 10 58 12 44 C14 36 18 30 26 24 Z"
        fill="#4fa75a"
      />
      <path
        d="M62 16 C74 16 86 28 86 40 C78 40 74 46 78 54 C82 62 74 70 66 66 C60 62 64 54 58 50 C52 46 54 38 60 36 C66 34 58 24 62 16 Z"
        fill="#4fa75a"
      />
      <circle cx="50" cy="50" r="40" fill="none" stroke={INK} strokeWidth="4" />
    </g>
  ),
  chat: (
    <g>
      <path
        d="M12 14 H88 C94 14 96 18 96 24 V62 C96 68 92 72 86 72 H52 L30 92 V72 H14 C8 72 4 68 4 62 V24 C4 18 6 14 12 14 Z"
        fill="#1b8a9a"
      />
      <circle cx="30" cy="43" r="6" fill="#fff" />
      <circle cx="50" cy="43" r="6" fill="#fff" />
      <circle cx="70" cy="43" r="6" fill="#fff" />
    </g>
  ),
};

/** Small interface icons. They take their colour from the text colour (currentColor) where flat. */
export function UiIcon({
  name,
  size = 28,
  label,
}: {
  name: UiIconName;
  size?: number;
  label?: string;
}) {
  return (
    <Svg size={size} label={label}>
      {UI_ART[name]}
    </Svg>
  );
}

export { InlineIcon };
