// PROTOTYPE, throwaway. Three structurally different takes on the world-map timeline.
import { useEffect, useMemo, useRef, useState } from "react";
import { Otto } from "../components/Otto";
import type { Lang } from "../progress";
import { sfx } from "../sound";
import { DECADES, MAP_H, MAP_W, pinsFor, type Pin } from "./pins";
import {
  CloudShell,
  DecadeHead,
  S,
  ThoughtCloud,
  WORLD,
  WorldMap,
  decadeLabel,
  useStageSize,
  type ViewBox,
} from "./shared";

export interface VariantProps {
  lang: Lang;
  onReadMore: (lessonId: string) => void;
}

export function useExplore(startIndex = 4) {
  const [index, setIndex] = useState(startIndex);
  const [openId, setOpenId] = useState<string | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const pins = pinsFor(DECADES[index].start);
  const open = pins.find((p) => p.id === openId) ?? null;
  const pick = (i: number) => {
    if (i < 0 || i >= DECADES.length) return;
    sfx.tap();
    setIndex(i);
    setOpenId(null);
  };
  const tapPin = (id: string) => {
    sfx.pop();
    setOpenId((cur) => (cur === id ? null : id));
    setVisited((v) => new Set(v).add(id));
  };
  const found = pins.filter((p) => visited.has(p.id)).length;
  return { index, pick, pins, open, openId, setOpenId, visited, tapPin, found };
}

const CLOUD_W = 300;

/** Where a cloud goes for a pin at screen point (px, py) on a W x H stage, plus its trail dots. */
export function cloudPlacement(px: number, py: number, W: number, H: number, maxW = CLOUD_W) {
  const cw = Math.min(maxW, W - 16);
  const left = Math.max(8, Math.min(W - cw - 8, px - cw / 2));
  const roomAbove = py - 58;
  const roomBelow = H - py - 34;
  const above = roomAbove >= 175 || (roomBelow < 175 && roomAbove > roomBelow);
  const style: React.CSSProperties = above
    ? { left, bottom: H - py + 58, width: cw }
    : { left, top: py + 34, width: cw };
  const dots = above
    ? [
        { x: px + 6, y: py - 42, r: 5 },
        { x: px + 12, y: py - 54, r: 7 },
      ]
    : [
        { x: px + 6, y: py + 10, r: 5 },
        { x: px + 12, y: py + 22, r: 7 },
      ];
  return { style, dots };
}

export function TrailDots({ dots }: { dots: { x: number; y: number; r: number }[] }) {
  return (
    <>
      {dots.map((d, i) => (
        <span
          key={i}
          className="tm-dot"
          style={{ left: d.x - d.r, top: d.y - d.r, width: d.r * 2, height: d.r * 2 }}
        />
      ))}
    </>
  );
}

/* ---------- A: cloud pops at the pin, big stepper under the map ---------- */

export function VariantA({ lang, onReadMore }: VariantProps) {
  const x = useExplore();
  const [stageRef, [W, H]] = useStageSize<HTMLDivElement>();
  const place = x.open ? cloudPlacement((x.open.x / MAP_W) * W, (x.open.y / MAP_H) * H, W, H) : null;
  return (
    <section className="tm-a">
      <DecadeHead index={x.index} lang={lang} found={x.found} total={x.pins.length} />
      <div className="tm-stage" ref={stageRef}>
        <WorldMap
          snapshot={DECADES[x.index].snapshot}
          pins={x.pins}
          openId={x.openId}
          visited={x.visited}
          lang={lang}
          pxWidth={W}
          onPin={x.tapPin}
          onBackground={() => x.setOpenId(null)}
        />
        {x.open && place && (
          <>
            <TrailDots dots={place.dots} />
            <ThoughtCloud
              pin={x.open}
              lang={lang}
              style={place.style}
              onClose={() => x.setOpenId(null)}
              onReadMore={onReadMore}
            />
          </>
        )}
      </div>
      <div className="tm-stepper">
        <button
          type="button"
          className="btn tm-step"
          disabled={x.index === 0}
          onClick={() => x.pick(x.index - 1)}
        >
          <span aria-hidden="true">←</span>{" "}
          <span className="tm-step-label">
            {x.index > 0 && decadeLabel(DECADES[x.index - 1].start, lang)}
          </span>
        </button>
        <div className="tm-step-dots" aria-hidden="true">
          {DECADES.map((d, i) => (
            <span key={d.start} className={i === x.index ? "on" : ""} />
          ))}
        </div>
        <button
          type="button"
          className="btn tm-step"
          disabled={x.index === DECADES.length - 1}
          onClick={() => x.pick(x.index + 1)}
        >
          <span className="tm-step-label">
            {x.index < DECADES.length - 1 && decadeLabel(DECADES[x.index + 1].start, lang)}
          </span>{" "}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

/* ---------- B: Otto beside the map thinks the cloud, slider on top ---------- */

export function VariantB({ lang, onReadMore }: VariantProps) {
  const x = useExplore();
  const [stageRef, [W]] = useStageSize<HTMLDivElement>();
  return (
    <section className="tm-b">
      <div className="tm-slider">
        <input
          type="range"
          min={0}
          max={DECADES.length - 1}
          step={1}
          value={x.index}
          aria-label={S.decade[lang]}
          onChange={(e) => x.pick(Number(e.target.value))}
        />
        <div className="tm-slider-ticks" aria-hidden="true">
          {DECADES.map((d, i) => (
            <span key={d.start} className={i === x.index ? "on" : ""}>
              {d.start}
            </span>
          ))}
        </div>
      </div>
      <DecadeHead index={x.index} lang={lang} found={x.found} total={x.pins.length} />
      <div className="tm-b-body">
        <div className="tm-stage" ref={stageRef}>
          <WorldMap
            snapshot={DECADES[x.index].snapshot}
            pins={x.pins}
            openId={x.openId}
            visited={x.visited}
            lang={lang}
            pxWidth={W}
            onPin={x.tapPin}
            onBackground={() => x.setOpenId(null)}
          >
            {x.open && <PlaceTag pin={x.open} lang={lang} k={W ? MAP_W / W : 1} />}
          </WorldMap>
        </div>
        <aside className="tm-otto">
          {x.open ? (
            <ThoughtCloud
              pin={x.open}
              lang={lang}
              onClose={() => x.setOpenId(null)}
              onReadMore={onReadMore}
            />
          ) : (
            <CloudShell className="tm-prompt" key={`prompt-${x.index}`}>
              <p className="tm-cloud-line">
                {x.pins.length > 0 ? S.tapPinLong[lang] : S.noPins[lang]}
              </p>
            </CloudShell>
          )}
          <div className="tm-otto-trail" aria-hidden="true">
            <span />
            <span />
          </div>
          <Otto size={110} mood="think" />
        </aside>
      </div>
    </section>
  );
}

function PlaceTag({ pin, lang, k }: { pin: Pin; lang: Lang; k: number }) {
  const label = pin.place[lang];
  const w = label.length * 8.4 + 18;
  const left = pin.x + (w + 30) * k > MAP_W;
  const tx = left ? -20 - w : 20;
  return (
    <g pointerEvents="none" transform={`translate(${pin.x} ${pin.y}) scale(${k})`}>
      <rect x={tx} y={-40} width={w} height={26} rx={7} fill="#23383f" />
      <text x={tx + 9} y={-22} fill="#fff" fontSize={15} fontWeight={700}>
        {label}
      </text>
    </g>
  );
}

/* ---------- C: close pins group into a bubble; tap to zoom into the region ---------- */

export interface Cluster {
  pins: Pin[];
  x: number;
  y: number;
}

export function clusterPins(pins: Pin[], radius = 48): Cluster[] {
  const out: Cluster[] = [];
  for (const p of pins) {
    const c = out.find((k) => Math.hypot(k.x - p.x, k.y - p.y) < radius);
    if (c) {
      c.pins.push(p);
      c.x = c.pins.reduce((s, q) => s + q.x, 0) / c.pins.length;
      c.y = c.pins.reduce((s, q) => s + q.y, 0) / c.pins.length;
    } else out.push({ pins: [p], x: p.x, y: p.y });
  }
  return out;
}

function zoomTo(c: Cluster, stageW: number): ViewBox {
  const xs = c.pins.map((p) => p.x);
  const ys = c.pins.map((p) => p.y);
  const minW = 170 * Math.min(1, (stageW || 1000) / 700);
  let w = Math.max(minW, (Math.max(...xs) - Math.min(...xs)) * 2.6);
  let h = (w * MAP_H) / MAP_W;
  const need = (Math.max(...ys) - Math.min(...ys)) * 2.6 + 40;
  if (h < need) {
    h = need;
    w = (h * MAP_W) / MAP_H;
  }
  const cx = (Math.max(...xs) + Math.min(...xs)) / 2;
  const cy = (Math.max(...ys) + Math.min(...ys)) / 2 - 8;
  const x0 = Math.max(0, Math.min(MAP_W - w, cx - w / 2));
  const y0 = Math.max(0, Math.min(MAP_H - h, cy - h / 2));
  return [x0, y0, w, h];
}

function useTween(target: ViewBox): ViewBox {
  const [view, setView] = useState<ViewBox>(target);
  const from = useRef<ViewBox>(target);
  const cur = useRef<ViewBox>(target);
  useEffect(() => {
    from.current = cur.current;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 450);
      const e = 1 - Math.pow(1 - t, 3);
      const v = from.current.map((a, i) => a + (target[i] - a) * e) as ViewBox;
      cur.current = v;
      setView(v);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.join(",")]);
  return view;
}

export function VariantC({ lang, onReadMore }: VariantProps) {
  const x = useExplore();
  const [zoom, setZoom] = useState<ViewBox>(WORLD);
  const view = useTween(zoom);
  const zoomed = zoom !== WORLD;
  const [stageRef, [W, H]] = useStageSize<HTMLDivElement>();
  const clusters = useMemo(
    () => clusterPins(x.pins, Math.max(48, (36 * MAP_W) / (W || MAP_W))),
    [x.pins, W],
  );
  const singles = zoomed ? x.pins : clusters.filter((c) => c.pins.length === 1).map((c) => c.pins[0]);
  const groups = zoomed ? [] : clusters.filter((c) => c.pins.length > 1);
  const k = view[2] / (W || MAP_W);
  const toScreen = (p: Pin): [number, number] => [
    ((p.x - view[0]) / view[2]) * W,
    ((p.y - view[1]) / view[3]) * H,
  ];
  const settled = view.every((v, i) => Math.abs(v - zoom[i]) < 0.5);
  const place = x.open && settled ? cloudPlacement(...toScreen(x.open), W, H) : null;

  const pickDecade = (i: number) => {
    setZoom(WORLD);
    x.pick(i);
  };

  return (
    <section className="tm-c">
      <div className="tm-chips" role="tablist">
        {DECADES.map((d, i) => (
          <button
            key={d.start}
            type="button"
            role="tab"
            aria-selected={i === x.index}
            className={`chip${i === x.index ? " chip-on" : ""}`}
            onClick={() => pickDecade(i)}
          >
            {decadeLabel(d.start, lang)}
          </button>
        ))}
      </div>
      <DecadeHead index={x.index} lang={lang} found={x.found} total={x.pins.length} />
      <div className="tm-stage" ref={stageRef}>
        <WorldMap
          snapshot={DECADES[x.index].snapshot}
          pins={singles}
          openId={x.openId}
          visited={x.visited}
          lang={lang}
          view={view}
          pxWidth={W}
          onPin={x.tapPin}
          onBackground={() => x.setOpenId(null)}
        >
          {groups.map((c) => {
            const seen = c.pins.filter((p) => x.visited.has(p.id)).length;
            return (
              <g
                key={c.pins[0].id}
                className="tm-pin"
                role="button"
                tabIndex={0}
                aria-label={`${c.pins.length} pins`}
                transform={`translate(${c.x} ${c.y}) scale(${k})`}
                onClick={(e) => {
                  e.stopPropagation();
                  sfx.tap();
                  x.setOpenId(null);
                  setZoom(zoomTo(c, W));
                }}
              >
                <circle r={19} fill={seen === c.pins.length ? "#1b8a9a" : "#f08a2e"} stroke="#23383f" strokeWidth={2} />
                <circle r={25} fill="none" stroke="#23383f" strokeWidth={1.5} strokeDasharray="3 4" />
                <text y={6} textAnchor="middle" fontSize={17} fontWeight={800} fill="#fff">
                  {c.pins.length}
                </text>
              </g>
            );
          })}
        </WorldMap>
        {zoomed && (
          <button
            type="button"
            className="btn btn-quiet tm-world"
            onClick={() => {
              sfx.tap();
              x.setOpenId(null);
              setZoom(WORLD);
            }}
          >
            {S.wholeWorld[lang]}
          </button>
        )}
        {x.open && place && (
          <>
            <TrailDots dots={place.dots} />
            <ThoughtCloud
              pin={x.open}
              lang={lang}
              style={place.style}
              onClose={() => x.setOpenId(null)}
              onReadMore={onReadMore}
            />
          </>
        )}
      </div>
    </section>
  );
}
