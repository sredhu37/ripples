// PROTOTYPE, throwaway. Shared map, pin, cloud and decade pieces for the three variants.
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { resolveText } from "../lesson/types";
import type { Lang } from "../progress";
import { speak } from "../speech";
import { sfx } from "../sound";
import { SpeakerIcon } from "../components/SpeechBubble";
import { BORDERS } from "./borders";
import { DECADES, MAP_H, MAP_W, type Pin } from "./pins";
import { LESSONS } from "../lessons";

export const S = {
  tapPin: { en: "Tap a pin.", de: "Tippe auf eine Nadel.", pl: "Dotknij pinezki." },
  tapPinLong: {
    en: "Tap a pin to see what was happening there.",
    de: "Tippe auf eine Nadel und sieh, was dort los war.",
    pl: "Dotknij pinezki i zobacz, co się tam działo.",
  },
  readMore: { en: "Read more", de: "Mehr lesen", pl: "Czytaj dalej" },
  close: { en: "Close", de: "Schließen", pl: "Zamknij" },
  borders: { en: "Borders as in", de: "Grenzen wie", pl: "Granice jak w" },
  found: { en: "found", de: "entdeckt", pl: "odkryte" },
  of: { en: "of", de: "von", pl: "z" },
  noPins: {
    en: "No pins for these years yet.",
    de: "Für diese Jahre gibt es noch keine Nadeln.",
    pl: "Na te lata nie ma jeszcze pinezek.",
  },
  wholeWorld: { en: "Whole world", de: "Ganze Welt", pl: "Cały świat" },
  opens: {
    en: "Prototype: this would open the lesson",
    de: "Prototyp: Das würde die Lektion öffnen",
    pl: "Prototyp: to otworzyłoby lekcję",
  },
  decade: { en: "Years", de: "Jahre", pl: "Lata" },
} satisfies Record<string, Record<Lang, string>>;

export const decadeLabel = (start: number, lang: Lang) =>
  lang === "pl" ? `lata ${String(start).slice(2)}.` : lang === "de" ? `${start}er` : `${start}s`;

// Flat pastel per ruling power, so empires read as one colour.
const PALETTE = [
  "#f2d48f",
  "#b7d7a8",
  "#f1b3a0",
  "#a8cde6",
  "#f5c99b",
  "#a9dccf",
  "#e6d3b3",
  "#e9b8b8",
  "#d3d79a",
  "#c9d9e3",
];
const OWNER_FIXED: Record<string, string> = {
  "United Kingdom": "#f1b3a0",
  France: "#a8cde6",
  USSR: "#e9b8b8",
  "Russian Empire": "#e9b8b8",
  Germany: "#d3d79a",
  India: "#f5c99b",
  China: "#f2d48f",
};
function ownerColor(owner: string): string {
  const key = owner.replace(/ of Great Britain.*$/, "");
  if (OWNER_FIXED[key]) return OWNER_FIXED[key];
  let h = 0;
  for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

export type ViewBox = [number, number, number, number];
export const WORLD: ViewBox = [0, 0, MAP_W, MAP_H];

interface MapProps {
  snapshot: string;
  pins: Pin[];
  openId: string | null;
  visited: Set<string>;
  lang: Lang;
  view?: ViewBox;
  /** Rendered width in CSS px, so pins keep one finger size on every screen. */
  pxWidth?: number;
  onPin: (id: string) => void;
  onBackground: () => void;
  children?: ReactNode;
}

export function WorldMap({
  snapshot,
  pins,
  openId,
  visited,
  lang,
  view = WORLD,
  pxWidth = 0,
  onPin,
  onBackground,
  children,
}: MapProps) {
  const k = view[2] / (pxWidth || MAP_W); // pins keep their screen size when zoomed or small
  return (
    <svg
      className="tm-map"
      viewBox={view.join(" ")}
      role="img"
      aria-label="World map"
      onClick={(e) => {
        if (e.target === e.currentTarget || (e.target as Element).classList.contains("tm-land"))
          onBackground();
      }}
    >
      <rect x={-50} y={-50} width={MAP_W + 100} height={MAP_H + 100} fill="#cfe8ec" />
      {BORDERS[snapshot].map((s, i) => (
        <path
          key={`${snapshot}-${i}`}
          className="tm-land"
          d={s.d}
          fill={ownerColor(s.o)}
          stroke="#ffffff"
          strokeWidth={0.8}
          vectorEffect="non-scaling-stroke"
        >
          <title>{s.n}</title>
        </path>
      ))}
      {pins.map((p) => (
        <PinMark
          key={p.id}
          pin={p}
          k={k}
          lang={lang}
          open={p.id === openId}
          seen={visited.has(p.id)}
          onClick={() => onPin(p.id)}
        />
      ))}
      {children}
    </svg>
  );
}

function PinMark({
  pin,
  k,
  lang,
  open,
  seen,
  onClick,
}: {
  pin: Pin;
  k: number;
  lang: Lang;
  open: boolean;
  seen: boolean;
  onClick: () => void;
}) {
  const s = k * (open ? 1.35 : 1);
  return (
    <g
      className="tm-pin"
      role="button"
      tabIndex={0}
      aria-label={`${resolveText(pin.place, lang)}: ${resolveText(pin.event.title, lang)}`}
      transform={`translate(${pin.x} ${pin.y}) scale(${s})`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      <circle cx={0} cy={-16} r={22} fill="transparent" />
      <path
        d="M0,0 C-5,-7 -11,-12 -11,-19 A11,11 0 1 1 11,-19 C11,-12 5,-7 0,0Z"
        fill={seen ? "#1b8a9a" : "#f08a2e"}
        stroke="#23383f"
        strokeWidth={open ? 2.5 : 1.8}
      />
      {seen ? (
        <path
          d="M-5,-19 L-1.5,-15.5 L5,-23"
          stroke="#fff"
          strokeWidth={2.6}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <circle cx={0} cy={-19} r={4.2} fill="#fff" />
      )}
    </g>
  );
}

/** Scalloped cloud outline for a w x h box. */
function cloudPath(w: number, h: number): string {
  const b = 9; // bump depth
  const x0 = b,
    y0 = b,
    x1 = w - b,
    y1 = h - b;
  const pts: [number, number][] = [];
  const edge = (ax: number, ay: number, bx: number, by: number) => {
    const len = Math.hypot(bx - ax, by - ay);
    const n = Math.max(1, Math.round(len / 30));
    for (let i = 0; i < n; i++) pts.push([ax + ((bx - ax) * i) / n, ay + ((by - ay) * i) / n]);
  };
  edge(x0, y0, x1, y0);
  edge(x1, y0, x1, y1);
  edge(x1, y1, x0, y1);
  edge(x0, y1, x0, y0);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i <= pts.length; i++) {
    const [x, y] = pts[i % pts.length];
    const [px, py] = pts[i - 1];
    const r = Math.hypot(x - px, y - py) * 0.62;
    d += ` A${r.toFixed(1)},${r.toFixed(1)} 0 0 1 ${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d + "Z";
}

interface CloudProps {
  pin: Pin;
  lang: Lang;
  onClose: () => void;
  onReadMore: (lessonId: string) => void;
  style?: React.CSSProperties;
  cloudRef?: React.Ref<HTMLDivElement>;
}

/** White scalloped cloud that sizes itself to its content. */
export function CloudShell({
  children,
  style,
  cloudRef,
  className = "",
}: {
  children: ReactNode;
  style?: React.CSSProperties;
  cloudRef?: React.Ref<HTMLDivElement>;
  className?: string;
}) {
  const inner = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<[number, number]>([0, 0]);
  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize([el.offsetWidth, el.offsetHeight]));
    ro.observe(el);
    setSize([el.offsetWidth, el.offsetHeight]);
    return () => ro.disconnect();
  }, []);
  return (
    <div className={`tm-cloud ${className}`} style={style} ref={cloudRef}>
      <div className="tm-cloud-inner" ref={inner}>
        {size[0] > 0 && (
          <svg
            className="tm-cloud-bg"
            width={size[0]}
            height={size[1]}
            viewBox={`0 0 ${size[0]} ${size[1]}`}
            aria-hidden="true"
          >
            <path d={cloudPath(size[0], size[1])} fill="#fff" stroke="#23383f" strokeWidth={2.5} />
          </svg>
        )}
        {children}
      </div>
    </div>
  );
}

export function ThoughtCloud({ pin, lang, onClose, onReadMore, style, cloudRef }: CloudProps) {
  const line = resolveText(pin.event.summary, lang);
  const lessonId = pin.event.lessonId;
  return (
    <CloudShell style={style} cloudRef={cloudRef} key={pin.id}>
        <div className="tm-cloud-head">
          <span>
            {resolveText(pin.place, lang)}, {resolveText(pin.event.year, lang)}
          </span>
          <button
            type="button"
            className="tm-x"
            aria-label={S.close[lang]}
            onClick={() => {
              sfx.tap();
              onClose();
            }}
          >
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <p className="tm-cloud-line">{line}</p>
        <div className="tm-cloud-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label="Read aloud"
            onClick={() => speak(line, lang)}
          >
            <SpeakerIcon />
          </button>
          {lessonId && (
            <button
              type="button"
              className="btn tm-read"
              onClick={() => {
                sfx.tap();
                onReadMore(lessonId);
              }}
            >
              {S.readMore[lang]} <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
    </CloudShell>
  );
}

export function lessonTitle(id: string, lang: Lang): string {
  const l = LESSONS.find((x) => x.id === id);
  return l ? resolveText(l.title, lang) : id;
}

/** Decade heading, snapshot note and the found counter, shared by all variants. */
export function DecadeHead({
  index,
  lang,
  found,
  total,
}: {
  index: number;
  lang: Lang;
  found: number;
  total: number;
}) {
  const d = DECADES[index];
  return (
    <div className="tm-head">
      <h2>{decadeLabel(d.start, lang)}</h2>
      <span className="tm-note">
        {total > 0 ? `${found} ${S.of[lang]} ${total} ${S.found[lang]}` : S.noPins[lang]}
      </span>
      <span className="tm-note tm-snap">
        {S.borders[lang]} {d.snapshot}
      </span>
    </div>
  );
}

export function useStageSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize([el.clientWidth, el.clientHeight]));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
}
