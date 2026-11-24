// PROTOTYPE, throwaway. Variant D: Sunny's mix of A, B and C.
// Cloud on top of the map with Otto inside, big selected pin, clickable decade slider,
// and a map you can pinch, scroll-zoom and drag. Pins that crowd at the current zoom group into a bubble.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Lang } from "../progress";
import { sfx } from "../sound";
import { DECADES, MAP_H, MAP_W, type Pin } from "./pins";
import { DecadeHead, ThoughtCloud, WORLD, WorldMap, decadeLabel, useStageSize, type ViewBox } from "./shared";
import { TrailDots, cloudPlacement, clusterPins, useExplore, type Cluster, type VariantProps } from "./variants";

const D = {
  pickTime: { en: "Pick a time", de: "Wähle eine Zeit", pl: "Wybierz czas" },
  sliderHint: {
    en: "Drag the orange button, or tap a year.",
    de: "Zieh den orangen Knopf oder tippe auf ein Jahr.",
    pl: "Przeciągnij pomarańczowy przycisk albo dotknij roku.",
  },
  mapHint: {
    en: "Pinch or use + and − to zoom. Drag to move the map.",
    de: "Mit zwei Fingern oder + und − zoomen. Ziehen verschiebt die Karte.",
    pl: "Rozsuń palce albo użyj + i −, by powiększyć. Przeciągnij, by przesunąć mapę.",
  },
  zoomIn: { en: "Zoom in", de: "Vergrößern", pl: "Powiększ" },
  zoomOut: { en: "Zoom out", de: "Verkleinern", pl: "Pomniejsz" },
  world: { en: "Whole world", de: "Ganze Welt", pl: "Cały świat" },
  earlier: { en: "Earlier", de: "Früher", pl: "Wcześniej" },
  later: { en: "Later", de: "Später", pl: "Później" },
  pins: { en: "pins here, tap to zoom in", de: "Nadeln hier, tippen zum Vergrößern", pl: "pinezki, dotknij, by powiększyć" },
} satisfies Record<string, Record<Lang, string>>;

const MIN_W = MAP_W / 12;
/** Stage height: the map's own shape on wide screens, taller on portrait and phones so the cloud fits. */
function stageHeight(W: number, top: number): number {
  const natural = (W * MAP_H) / MAP_W;
  const vh = typeof window === "undefined" ? 800 : window.innerHeight;
  // Fit what is left of the screen under the slider, at least 300px, at most a bit taller than wide.
  const room = Math.max(300, vh - top - 64);
  return Math.round(Math.max(natural, Math.min(room, W * 1.15)));
}

/** First view: on tall stages (phones, portrait) fill the height and start on Europe to Asia. */
function startView(a: number): ViewBox {
  const w = MAP_H / a;
  if (w >= MAP_W) return worldView(a);
  const cx = 620; // about 50 degrees east
  return [cx - w / 2, 0, w, MAP_H];
}

/** The whole world, full width, centred vertically for a stage of height/width ratio a. */
function worldView(a: number): ViewBox {
  const h = MAP_W * a;
  return [0, (MAP_H - h) / 2, MAP_W, h];
}

function clampView([x, y, w]: ViewBox, a: number): ViewBox {
  const vw = Math.max(MIN_W, Math.min(MAP_W, w));
  const vh = vw * a;
  const cy = vh >= MAP_H ? (MAP_H - vh) / 2 : Math.max(0, Math.min(MAP_H - vh, y));
  return [Math.max(0, Math.min(MAP_W - vw, x)), cy, vw, vh];
}

/** View state with direct updates for gestures and a short ease-out for buttons. */
function useMapView(a: number, ready: boolean) {
  const [view, setViewState] = useState<ViewBox>(WORLD);
  const cur = useRef<ViewBox>(WORLD);
  const aspect = useRef(a);
  const measured = useRef(false);
  const raf = useRef(0);
  const set = useCallback((v: ViewBox) => {
    cancelAnimationFrame(raf.current);
    cur.current = clampView(v, aspect.current);
    setViewState(cur.current);
  }, []);
  // Stage shape changed (first measure, rotation): keep the centre, refit the height.
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
  const animateTo = useCallback((v: ViewBox) => {
    cancelAnimationFrame(raf.current);
    const from = cur.current;
    const to = clampView(v, aspect.current);
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 380);
      const e = 1 - Math.pow(1 - t, 3);
      cur.current = from.map((a, i) => a + (to[i] - a) * e) as ViewBox;
      setViewState(cur.current);
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, []);
  return { view, cur, set, animateTo };
}

/** Zoom by factor f keeping the map point under screen point (sx, sy) in place. */
function zoomAt(v: ViewBox, f: number, sx: number, sy: number, W: number, H: number): ViewBox {
  const mx = v[0] + (sx / W) * v[2];
  const my = v[1] + (sy / H) * v[3];
  const nw = Math.max(MIN_W, Math.min(MAP_W, v[2] / f));
  const nh = nw * (v[3] / v[2]);
  return [mx - (sx / W) * nw, my - (sy / H) * nh, nw, nh];
}

function clusterTarget(c: Cluster, W: number, a: number): ViewBox {
  let minD = Infinity;
  for (const a of c.pins)
    for (const b of c.pins) if (a !== b) minD = Math.min(minD, Math.hypot(a.x - b.x, a.y - b.y));
  // Wide enough that the closest two pins end up about 80px apart on screen.
  const w = Math.max(MIN_W, Math.min(MAP_W * 0.6, (minD * W) / 80));
  return [c.x - w / 2, c.y - (w * a) / 2, w, w * a];
}

export function VariantD({ lang, onReadMore }: VariantProps) {
  const x = useExplore();
  const [stageRef, [W]] = useStageSize<HTMLDivElement>();
  const top = useMemo(
    () => (W && stageRef.current ? stageRef.current.getBoundingClientRect().top + window.scrollY : 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [W],
  );
  const H = W ? stageHeight(W, top) : 0;
  const a = W ? H / W : MAP_H / MAP_W;
  const { view, cur, set, animateTo } = useMapView(a, W > 0);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef({ moved: false, startX: 0, startY: 0 });
  const suppressClick = useRef(false);

  const pxPerUnit = W ? W / view[2] : 1;
  const zoomed = view[2] < MAP_W - 1;

  // Group pins closer than 44px on screen at the current zoom.
  const clusters = useMemo(() => clusterPins(x.pins, 44 / pxPerUnit), [x.pins, pxPerUnit]);
  const singles = clusters.filter((c) => c.pins.length === 1).map((c) => c.pins[0]);
  const openInGroup = x.open && !singles.includes(x.open);
  const shownPins = openInGroup && x.open ? [...singles, x.open] : singles;
  const groups = clusters.filter((c) => c.pins.length > 1);

  const toScreen = (p: { x: number; y: number }): [number, number] => [
    ((p.x - view[0]) / view[2]) * W,
    ((p.y - view[1]) / view[3]) * H,
  ];

  // Wheel and trackpad zoom need a non-passive listener.
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
      const dist = Math.hypot(e.clientX - gesture.current.startX, e.clientY - gesture.current.startY);
      if (!gesture.current.moved && dist < 6) return;
      if (!gesture.current.moved) {
        gesture.current.moved = true;
        el.setPointerCapture(e.pointerId);
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
      suppressClick.current = true;
      setTimeout(() => (suppressClick.current = false), 0);
    }
  };

  const zoomButton = (f: number) => {
    sfx.tap();
    animateTo(zoomAt(cur.current, f, W / 2, H / 2, W, H));
  };

  const pickDecade = (i: number) => {
    x.pick(i);
  };

  const pinScreen = x.open ? toScreen(x.open) : null;
  const pinVisible = pinScreen && pinScreen[0] >= 0 && pinScreen[0] <= W && pinScreen[1] >= 0 && pinScreen[1] <= H;
  const place = pinScreen && pinVisible ? cloudPlacement(pinScreen[0], pinScreen[1], W, H, 340) : null;

  return (
    <section className="tm-d">
      <DecadeSlider index={x.index} lang={lang} onPick={pickDecade} />
      <DecadeHead index={x.index} lang={lang} found={x.found} total={x.pins.length} />
      <div
        className="tm-stage tm-d-stage"
        ref={stageRef}
        style={H ? { height: H } : undefined}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <WorldMap
          snapshot={DECADES[x.index].snapshot}
          pins={shownPins}
          openId={x.openId}
          visited={x.visited}
          lang={lang}
          view={view}
          pxWidth={W}
          openScale={1.7}
          onPin={(id) => !suppressClick.current && x.tapPin(id)}
          onBackground={() => !suppressClick.current && x.setOpenId(null)}
        >
          {groups.map((c) => {
            const seen = c.pins.filter((p) => x.visited.has(p.id)).length;
            const k = 1 / pxPerUnit;
            return (
              <g
                key={c.pins.map((p) => p.id).join()}
                className="tm-pin"
                role="button"
                tabIndex={0}
                aria-label={`${c.pins.length} ${D.pins[lang]}`}
                transform={`translate(${c.x} ${c.y}) scale(${k})`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (suppressClick.current) return;
                  sfx.tap();
                  x.setOpenId(null);
                  animateTo(clusterTarget(c, W, a));
                }}
              >
                <circle r={20} fill={seen === c.pins.length ? "#1b8a9a" : "#f08a2e"} stroke="#23383f" strokeWidth={2} />
                <circle r={26} fill="none" stroke="#23383f" strokeWidth={1.5} strokeDasharray="3 4" />
                <text y={6} textAnchor="middle" fontSize={18} fontWeight={800} fill="#fff">
                  {c.pins.length}
                </text>
              </g>
            );
          })}
        </WorldMap>

        <div className="tm-zoom" role="group" aria-label="Zoom">
          <button type="button" className="tm-zoom-btn" aria-label={D.zoomIn[lang]} onClick={() => zoomButton(1.8)}>
            <svg viewBox="0 0 20 20" width="22" height="22" aria-hidden="true">
              <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            className="tm-zoom-btn"
            aria-label={D.zoomOut[lang]}
            disabled={!zoomed}
            onClick={() => zoomButton(1 / 1.8)}
          >
            <svg viewBox="0 0 20 20" width="22" height="22" aria-hidden="true">
              <path d="M4 10h12" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {zoomed && (
          <button
            type="button"
            className="btn btn-quiet tm-world"
            onClick={() => {
              sfx.tap();
              x.setOpenId(null);
              animateTo(worldView(a));
            }}
          >
            <GlobeIcon /> {D.world[lang]}
          </button>
        )}

        {x.open && place && (
          <>
            <TrailDots dots={place.dots} />
            <ThoughtCloud
              pin={x.open}
              lang={lang}
              otto
              style={place.style}
              onClose={() => x.setOpenId(null)}
              onReadMore={onReadMore}
            />
          </>
        )}
      </div>
      <p className="tm-note">{D.mapHint[lang]}</p>
    </section>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" style={{ verticalAlign: "-4px" }}>
      <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="10" cy="10" rx="3.4" ry="7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M2.5 10h15" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

/** A slider that looks clickable: labelled stops, a big grippy thumb, and Earlier/Later buttons. */
function DecadeSlider({ index, lang, onPick }: { index: number; lang: Lang; onPick: (i: number) => void }) {
  const track = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const n = DECADES.length;
  const pct = (i: number) => `${(i / (n - 1)) * 100}%`;

  const indexAt = (clientX: number) => {
    const r = track.current!.getBoundingClientRect();
    const t = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    return Math.round(t * (n - 1));
  };
  const go = (i: number) => {
    if (i !== index && i >= 0 && i < n) onPick(i);
  };

  return (
    <div className="tm-ds">
      <div className="tm-ds-top">
        <strong>{D.pickTime[lang]}</strong>
        <span className="tm-note">{D.sliderHint[lang]}</span>
      </div>
      <div className="tm-ds-row">
        <button
          type="button"
          className="tm-ds-arrow"
          aria-label={D.earlier[lang]}
          disabled={index === 0}
          onClick={() => go(index - 1)}
        >
          <svg viewBox="0 0 20 20" width="22" height="22" aria-hidden="true">
            <path d="M12.5 4.5L7 10l5.5 5.5" stroke="currentColor" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div
          className="tm-ds-track"
          ref={track}
          role="slider"
          tabIndex={0}
          aria-label={D.pickTime[lang]}
          aria-valuemin={DECADES[0].start}
          aria-valuemax={DECADES[n - 1].start}
          aria-valuenow={DECADES[index].start}
          aria-valuetext={decadeLabel(DECADES[index].start, lang)}
          onPointerDown={(e) => {
            dragging.current = true;
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            go(indexAt(e.clientX));
          }}
          onPointerMove={(e) => dragging.current && go(indexAt(e.clientX))}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(index - 1);
            }
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go(index + 1);
            }
          }}
        >
          <div className="tm-ds-line" />
          <div className="tm-ds-fill" style={{ width: pct(index) }} />
          {DECADES.map((d, i) => (
            <div key={d.start} className={`tm-ds-stop${i === index ? " on" : ""}`} style={{ left: pct(i) }}>
              <span className="tm-ds-dot" />
              <span className="tm-ds-label">{decadeLabel(d.start, lang)}</span>
            </div>
          ))}
          <div className="tm-ds-thumb" style={{ left: pct(index) }} aria-hidden="true">
            <svg viewBox="0 0 20 20" width="18" height="18">
              <path d="M7 5v10M10 5v10M13 5v10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <button
          type="button"
          className="tm-ds-arrow"
          aria-label={D.later[lang]}
          disabled={index === n - 1}
          onClick={() => go(index + 1)}
        >
          <svg viewBox="0 0 20 20" width="22" height="22" aria-hidden="true">
            <path d="M7.5 4.5L13 10l-5.5 5.5" stroke="currentColor" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export type { Pin };
