import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { t } from "../i18n";
import { resolveText } from "../lesson/types";
import type { Lang } from "../progress";
import { sfx } from "../sound";
import { speak, useCanSpeak } from "../speech";
import {
  CLUSTER_PX,
  MAP_H,
  MAP_W,
  SELECTED_SCALE,
  clampView,
  cloudPlacement,
  clusterPins,
  clusterTarget,
  project,
  startView,
  worldView,
  zoomAt,
  type Cluster,
  type ViewBox,
} from "../timeline/mapView";
import type { Pin } from "../timeline/types";
import { useBorders } from "../timeline/useBorders";
import { Otto } from "./Otto";
import { SpeakerIcon } from "./SpeechBubble";

interface Props {
  lang: Lang;
  pins: Pin[];
  /** Map year drawn while no pin is open (the stop's start year). An open pin draws its own map year. */
  defaultYear: number;
  onReadMore: (lessonId: string) => void;
}

interface PlacedPin {
  id: string;
  x: number;
  y: number;
  pin: Pin;
}

const ZOOM_STEP = 1.8;
const DRAG_PX = 6;
const NEUTRAL = "#e9e4d4";
const SEA = "#cfe8ec";

/** Stage height: the map's own shape on wide screens, taller in portrait so the cloud fits. */
function stageHeight(W: number): number {
  const natural = (W * MAP_H) / MAP_W;
  const portrait = window.innerHeight >= window.innerWidth;
  return Math.round(
    Math.max(300, portrait ? Math.min(W * 1.15, window.innerHeight * 0.62) : natural),
  );
}

function useStageWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setW(el.clientWidth);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, W] as const;
}

/** The view, with direct updates for gestures. `a` is stage height over width. */
function useMapView(a: number, ready: boolean) {
  const [view, setViewState] = useState<ViewBox>([0, 0, MAP_W, MAP_H]);
  const cur = useRef(view);
  const aspect = useRef(a);
  const measured = useRef(false);
  const set = useCallback((v: ViewBox) => {
    cur.current = clampView(v, aspect.current);
    setViewState(cur.current);
  }, []);
  // First measure: pick the start view. Stage shape changed (rotation): keep the centre, refit the height.
  useEffect(() => {
    if (!ready) return;
    const old = cur.current;
    const first = !measured.current;
    measured.current = true;
    const wasWorld = old[2] >= MAP_W - 1;
    aspect.current = a;
    if (first) set(startView(a));
    else if (wasWorld) set(worldView(a));
    else set([old[0], old[1] + old[3] / 2 - (old[2] * a) / 2, old[2], old[2] * a]);
  }, [a, ready, set]);
  return { view, cur, set };
}

export function TimelineMap({ lang, pins, defaultYear, onReadMore }: Props) {
  const [stageRef, W] = useStageWidth();
  const H = W ? stageHeight(W) : 0;
  const a = W ? H / W : MAP_H / MAP_W;
  const { view, cur, set } = useMapView(a, W > 0);
  const [openId, setOpenId] = useState<string | null>(null);

  const placed: PlacedPin[] = useMemo(
    () =>
      pins.map((pin) => {
        const [x, y] = project([pin.lon, pin.lat]);
        return { id: pin.id, x, y, pin };
      }),
    [pins],
  );
  const open = placed.find((p) => p.id === openId) ?? null;
  useEffect(() => {
    if (openId && !open) setOpenId(null);
  }, [openId, open]);

  const { land, shapes } = useBorders(open ? open.pin.mapYear : defaultYear);

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({ moved: false, startX: 0, startY: 0 });
  const suppressClick = useRef(false);

  const pxPerUnit = W ? W / view[2] : 1;
  const zoomed = view[2] < MAP_W - 1;
  const k = 1 / pxPerUnit;

  // Pins closer than 44 px on screen at this zoom group into a bubble.
  const clusters = useMemo(() => clusterPins(placed, CLUSTER_PX / pxPerUnit), [placed, pxPerUnit]);
  const singles = clusters.filter((c) => c.pins.length === 1).map((c) => c.pins[0]);
  // The open pin stays a pin even if a bubble would take it, so its cloud has something to point at.
  const shown = open && !singles.includes(open) ? [...singles, open] : singles;
  const groups = clusters.filter((c) => c.pins.length > 1);

  const toScreen = (p: { x: number; y: number }): [number, number] => [
    ((p.x - view[0]) / view[2]) * W,
    ((p.y - view[1]) / view[3]) * H,
  ];

  // Wheel and trackpad zoom need a listener that may call preventDefault.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      const f = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0025));
      set(zoomAt(cur.current, f, e.clientX - r.left, e.clientY - r.top, r.width, r.height));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [stageRef, set, cur]);

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as Element).closest(".tm-cloud, .tm-zoom, .tm-world")) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1)
      gesture.current = { moved: false, startX: e.clientX, startY: e.clientY };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const ps = pointers.current;
    const prev = ps.get(e.pointerId);
    if (!prev) return;
    const el = stageRef.current!;
    const r = el.getBoundingClientRect();
    if (ps.size === 1) {
      const dist = Math.hypot(
        e.clientX - gesture.current.startX,
        e.clientY - gesture.current.startY,
      );
      if (!gesture.current.moved && dist < DRAG_PX) return;
      if (!gesture.current.moved) {
        gesture.current.moved = true;
        el.setPointerCapture?.(e.pointerId);
      }
      const v = cur.current;
      set([
        v[0] - ((e.clientX - prev.x) / r.width) * v[2],
        v[1] - ((e.clientY - prev.y) / r.height) * v[3],
        v[2],
        v[3],
      ]);
    } else if (ps.size === 2) {
      gesture.current.moved = true;
      const other = [...ps.entries()].find(([id]) => id !== e.pointerId)![1];
      const before = Math.hypot(prev.x - other.x, prev.y - other.y);
      const after = Math.hypot(e.clientX - other.x, e.clientY - other.y);
      const mx = (e.clientX + other.x) / 2 - r.left;
      const my = (e.clientY + other.y) / 2 - r.top;
      if (before > 0) set(zoomAt(cur.current, after / before, mx, my, r.width, r.height));
    }
    ps.set(e.pointerId, { x: e.clientX, y: e.clientY });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (gesture.current.moved && pointers.current.size === 0) {
      // The click that ends a drag must not open a pin.
      suppressClick.current = true;
      setTimeout(() => (suppressClick.current = false), 0);
    }
  };

  const zoomButton = (f: number) => {
    sfx.tap();
    set(zoomAt(cur.current, f, W / 2, H / 2, W, H));
  };

  const tapPin = (id: string) => {
    if (suppressClick.current) return;
    sfx.pop();
    setOpenId((now) => (now === id ? null : id));
  };

  const tapGroup = (c: Cluster) => {
    if (suppressClick.current) return;
    sfx.tap();
    setOpenId(null);
    set(clusterTarget(c, W, a));
  };

  const pinScreen = open ? toScreen(open) : null;
  const pinVisible =
    pinScreen && pinScreen[0] >= 0 && pinScreen[0] <= W && pinScreen[1] >= 0 && pinScreen[1] <= H;
  const place = pinScreen && pinVisible ? cloudPlacement(pinScreen[0], pinScreen[1], W, H) : null;

  return (
    <section className="tm" aria-label={t(lang, "mapLabel")}>
      <div
        className="tm-stage"
        ref={stageRef}
        style={H ? { height: H } : undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpenId(null);
        }}
      >
        <svg
          className="tm-map"
          viewBox={view.join(" ")}
          aria-label={t(lang, "mapLabel")}
          onClick={(e) => {
            if (!suppressClick.current && !(e.target as Element).closest(".tm-pin"))
              setOpenId(null);
          }}
        >
          <rect x={-2000} y={-2000} width={MAP_W + 4000} height={MAP_H + 4000} fill={SEA} />
          {land && <path className="tm-land" d={land} fill={NEUTRAL} fillRule="evenodd" />}
          {shapes.map((s) => (
            <path
              key={s.country}
              className="tm-shape"
              d={s.d}
              fill={s.colour}
              fillRule="evenodd"
              stroke="#ffffff"
              strokeWidth={0.8}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {/* The open pin is drawn last, on top. */}
          {[...shown.filter((p) => p.id !== openId), ...shown.filter((p) => p.id === openId)].map(
            (p) => (
              <PinMark
                key={p.id}
                pin={p.pin}
                x={p.x}
                y={p.y}
                scale={k * (p.id === openId ? SELECTED_SCALE : 1)}
                lang={lang}
                selected={p.id === openId}
                onTap={() => tapPin(p.id)}
              />
            ),
          )}
          {groups.map((c) => (
            <g
              key={c.pins.map((p) => p.id).join()}
              className="tm-pin tm-group"
              role="button"
              tabIndex={0}
              aria-label={t(lang, "mapPinGroup", { n: c.pins.length })}
              transform={`translate(${c.x} ${c.y}) scale(${k})`}
              onClick={(e) => {
                e.stopPropagation();
                tapGroup(c);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  tapGroup(c);
                }
              }}
            >
              <circle r={22} fill="#f08a2e" stroke="#23383f" strokeWidth={2} />
              <text y={6} textAnchor="middle" fontSize={18} fontWeight={800} fill="#fff">
                {c.pins.length}
              </text>
            </g>
          ))}
        </svg>

        <div className="tm-zoom" role="group" aria-label={t(lang, "mapLabel")}>
          <button
            type="button"
            className="tm-zoom-btn"
            aria-label={t(lang, "mapZoomIn")}
            onClick={() => zoomButton(ZOOM_STEP)}
          >
            +
          </button>
          <button
            type="button"
            className="tm-zoom-btn"
            aria-label={t(lang, "mapZoomOut")}
            disabled={!zoomed}
            onClick={() => zoomButton(1 / ZOOM_STEP)}
          >
            -
          </button>
        </div>
        {zoomed && (
          <button
            type="button"
            className="btn btn-quiet tm-world"
            onClick={() => {
              sfx.tap();
              setOpenId(null);
              set(worldView(a));
            }}
          >
            {t(lang, "mapWholeWorld")}
          </button>
        )}

        {open && place && (
          <>
            {place.dots.map((d, i) => (
              <span
                key={i}
                className="tm-dot"
                style={{ left: d.x - d.r, top: d.y - d.r, width: d.r * 2, height: d.r * 2 }}
              />
            ))}
            <ThoughtCloud
              pin={open.pin}
              lang={lang}
              style={place.style}
              onClose={() => setOpenId(null)}
              onReadMore={onReadMore}
            />
          </>
        )}
      </div>
      <p className="tm-note">{t(lang, "mapHint")}</p>
      <p className="tm-credit">{t(lang, "mapCredit")}</p>
    </section>
  );
}

interface PinMarkProps {
  pin: Pin;
  x: number;
  y: number;
  scale: number;
  lang: Lang;
  selected: boolean;
  onTap: () => void;
}

function PinMark({ pin, x, y, scale, lang, selected, onTap }: PinMarkProps) {
  return (
    <g
      className="tm-pin"
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${pin.country}, ${resolveText(pin.year, lang)}: ${resolveText(pin.title, lang)}`}
      transform={`translate(${x} ${y}) scale(${scale})`}
      onClick={(e) => {
        e.stopPropagation();
        onTap();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onTap();
        }
      }}
    >
      {/* 44 px touch target */}
      <circle cx={0} cy={-16} r={22} fill="transparent" />
      <path
        d="M0,0 C-5,-7 -11,-12 -11,-19 A11,11 0 1 1 11,-19 C11,-12 5,-7 0,0Z"
        fill="#f08a2e"
        stroke="#23383f"
        strokeWidth={selected ? 2.5 : 1.8}
      />
      <circle cx={0} cy={-19} r={4.2} fill="#fff" />
    </g>
  );
}

interface CloudProps {
  pin: Pin;
  lang: Lang;
  style: React.CSSProperties;
  onClose: () => void;
  onReadMore: (lessonId: string) => void;
}

/** The thought cloud: Otto tells the pin's one line. Read more shows only where a lesson exists. */
function ThoughtCloud({ pin, lang, style, onClose, onReadMore }: CloudProps) {
  const line = resolveText(pin.line, lang);
  const canSpeak = useCanSpeak(line, lang);
  return (
    <div className="tm-cloud" style={style} role="group" aria-label={resolveText(pin.title, lang)}>
      <div className="tm-cloud-face" aria-hidden="true">
        <Otto size={64} mood="think" />
      </div>
      <div className="tm-cloud-body">
        <div className="tm-cloud-head">
          <span>
            {pin.country}, {resolveText(pin.year, lang)}
          </span>
          <button
            type="button"
            className="tm-x"
            aria-label={t(lang, "mapCloseCloud")}
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
        <strong className="tm-cloud-title">{resolveText(pin.title, lang)}</strong>
        <p className="tm-cloud-line">{line}</p>
        <div className="tm-cloud-actions">
          {canSpeak && (
            <button
              type="button"
              className="icon-btn"
              aria-label={t(lang, "readAloud")}
              onClick={() => {
                sfx.tap();
                speak(line, lang);
              }}
            >
              <SpeakerIcon />
            </button>
          )}
          {pin.lessonId && (
            <button
              type="button"
              className="btn tm-read"
              onClick={() => {
                sfx.tap();
                onReadMore(pin.lessonId!);
              }}
            >
              {t(lang, "mapReadMore")} <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
