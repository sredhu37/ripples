import { CAST } from "../components/cast";
import { Box, Person } from "../components/icons";
import type { IconProps, Mood } from "../components/icons";

/** Lesson-specific flat SVG icons for the "Interest rates up and down" lesson. */

const INK = "#23383f";

export type TownZone = "hot" | "right" | "cold";

export const ZONE_COLOR: Record<TownZone, string> = { hot: "#e4572e", right: "#5aa05f", cold: "#4a90d9" };
export const UP_COLOR = "#e4572e";
export const DOWN_COLOR = "#4a90d9";

/** Fat arrow pointing up or down: a value that goes up or down. */
export function RateArrow({ dir, color, ...pos }: IconProps & { dir: "up" | "down"; color?: string }) {
  const c = color ?? (dir === "up" ? UP_COLOR : DOWN_COLOR);
  return (
    <Box {...pos}>
      <g transform={dir === "down" ? "rotate(180 50 50)" : undefined}>
        <path d="M50 10 L84 48 H63 V90 H37 V48 H16 Z" fill={c} stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
      </g>
    </Box>
  );
}

const dialPoint = (f: number, r: number): [number, number] => {
  const a = Math.PI * (1 - f);
  return [50 + r * Math.cos(a), 62 - r * Math.sin(a)];
};

const dialArc = (f0: number, f1: number, r: number) => {
  const [x0, y0] = dialPoint(f0, r);
  const [x1, y1] = dialPoint(f1, r);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
};

const needleStyle = (f: number) => ({
  transform: `rotate(${((f - 0.5) * 180).toFixed(1)}deg)`,
  transformOrigin: "50px 62px",
  transition: "transform 0.9s ease-out",
});

/**
 * The key rate dial: blue (low) to red (high). `value` is 0 to `max`.
 * `ghost` draws a second, thin needle (the rate people feel).
 */
export function Dial({ value, max = 8, ghost, ...pos }: IconProps & { value: number; max?: number; ghost?: number }) {
  const f = Math.min(1, Math.max(0, value / max));
  return (
    <Box {...pos}>
      <path d="M8 66 A42 42 0 0 1 92 66 Z" fill="#fff" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <path d={dialArc(0.02, 0.33, 31)} stroke={DOWN_COLOR} strokeWidth="9" fill="none" />
      <path d={dialArc(0.35, 0.65, 31)} stroke="#5aa05f" strokeWidth="9" fill="none" />
      <path d={dialArc(0.67, 0.98, 31)} stroke={UP_COLOR} strokeWidth="9" fill="none" />
      {ghost !== undefined && (
        <g style={needleStyle(Math.min(1, Math.max(0, ghost / max)))}>
          <path d="M50 62 L50 30" stroke="#1b8a9a" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 5" />
          <circle cx="50" cy="28" r="4.5" fill="#1b8a9a" />
        </g>
      )}
      <g style={needleStyle(f)}>
        <path d="M50 62 L50 26" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      </g>
      <circle cx="50" cy="62" r="7" fill={INK} />
      <rect x="6" y="66" width="88" height="20" rx="8" fill="#a9b6bd" stroke={INK} strokeWidth="4" />
      <circle cx="26" cy="76" r="3" fill={INK} />
      <circle cx="74" cy="76" r="3" fill={INK} />
    </Box>
  );
}

/** A thermometer. `level` 0 to 1. The mercury slides when the level changes. */
export function Thermometer({ level, color, band, ...pos }: IconProps & { level: number; color: string; band?: boolean }) {
  return (
    <Box {...pos}>
      <rect x="36" y="4" width="28" height="74" rx="14" fill="#fff" stroke={INK} strokeWidth="5" />
      {band && <rect x="36" y="37" width="28" height="15" fill="#5aa05f" opacity="0.3" />}
      <g style={{ transform: `scaleY(${Math.min(1, Math.max(0.04, level))})`, transformOrigin: "50px 80px", transition: "transform 1s ease-out" }}>
        <rect x="44" y="12" width="12" height="68" rx="6" fill={color} style={{ transition: "fill 1s" }} />
      </g>
      <circle cx="50" cy="80" r="17" fill={color} stroke={INK} strokeWidth="5" style={{ transition: "fill 1s" }} />
      <rect x="43" y="66" width="14" height="14" fill={color} style={{ transition: "fill 1s" }} />
      <g stroke={INK} strokeWidth="3.5" strokeLinecap="round">
        <path d="M70 20 H78" />
        <path d="M70 34 H78" />
        <path d="M70 48 H78" />
        <path d="M70 62 H78" />
      </g>
    </Box>
  );
}

export function Flame(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M50 6 C58 28 80 38 80 62 C80 80 67 94 50 94 C33 94 20 80 20 62 C20 48 28 42 33 30 C40 38 42 42 45 46 C49 34 47 20 50 6 Z" fill="#e4572e" />
      <path d="M50 48 C56 58 66 64 66 76 C66 85 59 91 50 91 C41 91 34 85 34 76 C34 66 45 58 50 48 Z" fill="#f7b733" />
    </Box>
  );
}

export function Snowflake(pos: IconProps) {
  return (
    <Box {...pos}>
      <g stroke={DOWN_COLOR} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {[0, 60, 120].map((a) => (
          <path key={a} d="M50 8 V92" transform={`rotate(${a} 50 50)`} />
        ))}
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <path key={a} d="M40 20 L50 30 L60 20" strokeWidth="5" transform={`rotate(${a} 50 50)`} />
        ))}
      </g>
    </Box>
  );
}

export function Sun(pos: IconProps) {
  return (
    <Box {...pos}>
      <g stroke="#f2b632" strokeWidth="7" strokeLinecap="round">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <path key={a} d="M50 8 V20" transform={`rotate(${a} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="22" fill="#f7cb44" />
    </Box>
  );
}

export function Shop({ open = true, awning = "#d6403a", ...pos }: IconProps & { open?: boolean; awning?: string }) {
  return (
    <Box {...pos}>
      <rect x="14" y="38" width="72" height="52" fill="#f4e3c1" />
      <rect x="22" y="52" width="30" height="24" rx="3" fill={open ? "#ffe9a8" : "#5b7078"} style={{ transition: "fill 0.8s" }} />
      <rect x="60" y="52" width="16" height="38" rx="3" fill="#a86f3c" />
      <path d="M8 40 L16 16 H84 L92 40 Z" fill={awning} />
      <g fill="#fff" opacity="0.9">
        <path d="M30 16 H40 L36 40 H24 Z" />
        <path d="M54 16 H64 L66 40 H52 Z" />
      </g>
      <rect x="8" y="88" width="84" height="6" rx="3" fill="#7e8d95" />
    </Box>
  );
}

export function House({ color = "#e68aa0", ...pos }: IconProps & { color?: string }) {
  return (
    <Box {...pos}>
      <rect x="18" y="46" width="64" height="44" fill={color} />
      <path d="M8 50 L50 14 L92 50 Z" fill="#a8553a" />
      <rect x="42" y="62" width="16" height="28" rx="3" fill="#fff3d6" />
      <rect x="24" y="58" width="13" height="13" rx="2" fill="#ffe9a8" />
      <rect x="63" y="58" width="13" height="13" rx="2" fill="#ffe9a8" />
      <rect x="8" y="88" width="84" height="6" rx="3" fill="#7e8d95" />
    </Box>
  );
}

export function Crane(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="18" y="86" width="40" height="8" rx="3" fill="#7e8d95" />
      <path d="M32 86 V14 H46 V86" fill="#f2b632" stroke="#e0a21f" strokeWidth="3" />
      <path d="M32 30 L46 44 M46 30 L32 44 M32 50 L46 64 M46 50 L32 64 M32 70 L46 84 M46 70 L32 84" stroke="#e0a21f" strokeWidth="3" />
      <rect x="8" y="8" width="86" height="10" rx="3" fill="#f2b632" />
      <rect x="10" y="18" width="16" height="14" fill="#7e8d95" />
      <path d="M82 18 V56" stroke={INK} strokeWidth="3" />
      <rect x="72" y="54" width="20" height="14" rx="3" fill="#c0603a" />
    </Box>
  );
}

export function Cart(pos: IconProps) {
  return (
    <Box {...pos}>
      <path d="M6 20 H22 L30 36" stroke={INK} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M24 34 H94 L84 68 H34 Z" fill="#f0b33e" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <path d="M44 38 L48 66 M62 38 L62 66 M80 38 L76 66" stroke="#c98d0e" strokeWidth="3" />
      <circle cx="42" cy="82" r="8" fill={INK} />
      <circle cx="76" cy="82" r="8" fill={INK} />
    </Box>
  );
}

export function Calendar(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="12" y="16" width="76" height="72" rx="10" fill="#fff" stroke={INK} strokeWidth="5" />
      <path d="M12 26 A10 10 0 0 1 22 16 H78 A10 10 0 0 1 88 26 V36 H12 Z" fill="#d6403a" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <g stroke={INK} strokeWidth="5" strokeLinecap="round">
        <path d="M32 8 V22" />
        <path d="M68 8 V22" />
      </g>
      <g fill="#cfd8dc">
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={24 + c * 20} y={46 + r * 13} width="12" height="8" rx="2" />)
        )}
      </g>
    </Box>
  );
}

export function Banknote(pos: IconProps) {
  return (
    <Box {...pos}>
      <rect x="6" y="26" width="88" height="48" rx="6" fill="#8fd19e" stroke="#3f8a47" strokeWidth="4" />
      <circle cx="50" cy="50" r="13" fill="#bfe8c7" stroke="#3f8a47" strokeWidth="3.5" />
      <circle cx="50" cy="50" r="5" fill="#3f8a47" />
      <circle cx="19" cy="38" r="4" fill="#3f8a47" />
      <circle cx="81" cy="62" r="4" fill="#3f8a47" />
    </Box>
  );
}

/** A bank building. `central` makes it the big dark-blue central bank with a gold emblem. */
export function BankBuilding({ central, ...pos }: IconProps & { central?: boolean }) {
  const roof = central ? "#3b5b7a" : "#1b8a9a";
  const roofDark = central ? "#2a435c" : "#14707d";
  return (
    <Box {...pos}>
      <path d="M50 6 L94 32 H6 Z" fill={roof} />
      <rect x="6" y="32" width="88" height="8" fill={roofDark} />
      {[16, 34, 52, 70].map((x) => (
        <rect key={x} x={x} y="44" width="14" height="32" rx="2" fill="#f4f1e8" stroke="#cfc6ad" strokeWidth="2" />
      ))}
      <rect x="4" y="78" width="92" height="8" rx="2" fill="#a9b6bd" />
      <rect x="0" y="86" width="100" height="8" rx="2" fill="#7e8d95" />
      <circle cx="50" cy="22" r={central ? 8 : 5.5} fill="#f7cb44" stroke={central ? "#e3a91a" : "none"} strokeWidth="2.5" />
    </Box>
  );
}

/* ---------- The town, drawn in code. Local size 320 x 140. ---------- */

const PANEL: Record<TownZone, string> = { hot: "#fde3d0", right: "#e4f4fa", cold: "#d9e8f5" };
const GROUND: Record<TownZone, string> = { hot: "#dcc07a", right: "#9fd08c", cold: "#f4f8fb" };

/**
 * Ripple Town: four buildings, weather and (optionally) people.
 * hot = flames and open shops, right = sun, cold = snow and dark empty shops.
 */
export function TownScene({
  zone,
  people,
  crane,
  scale = 1,
  x = 0,
  y = 0,
}: {
  zone: TownZone;
  people?: boolean;
  crane?: boolean;
  scale?: number;
  x?: number;
  y?: number;
}) {
  const open = zone !== "cold";
  const moods: Record<TownZone, Mood> = { hot: "think", right: "happy", cold: "sad" };
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect width="320" height="140" rx="18" fill={PANEL[zone]} stroke={INK} strokeWidth="3.5" style={{ transition: "fill 0.8s" }} />
      <rect x="6" y="116" width="308" height="18" rx="8" fill={GROUND[zone]} style={{ transition: "fill 0.8s" }} />
      <Shop x={10} y={40} size={72} open={open} awning="#d6403a" />
      <House x={88} y={40} size={72} color="#e68aa0" />
      <Shop x={166} y={40} size={72} open={open} awning="#2f7fb8" />
      {crane ? <Crane x={246} y={40} size={72} /> : <House x={244} y={40} size={72} color="#8fb8d9" />}
      <g key={zone}>
        {zone === "hot" && (
          <g className="pop">
            <Flame x={30} y={4} size={34} />
            <Flame x={146} y={0} size={40} />
            <Flame x={258} y={4} size={34} />
          </g>
        )}
        {zone === "right" && (
          <g className="pop">
            <Sun x={134} y={0} size={46} />
          </g>
        )}
        {zone === "cold" && (
          <g className="pop">
            <Snowflake x={26} y={4} size={30} />
            <Snowflake x={140} y={0} size={36} />
            <Snowflake x={262} y={6} size={30} />
          </g>
        )}
      </g>
      {people && (
        <g>
          <Person {...CAST.Finn} mood={moods[zone]} x={74} y={78} size={50} />
          <Person {...CAST.Bea} mood={moods[zone]} x={196} y={78} size={50} />
        </g>
      )}
    </g>
  );
}
