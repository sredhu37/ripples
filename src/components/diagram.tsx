import type { ReactNode } from "react";

/**
 * Building blocks for animated story diagrams.
 * Everything that is mounted plays its entrance animation once, so a diagram
 * is a function of the step: `{step >= 2 && <Pop ...>}` shows a part on tap 2.
 */

export const DIAGRAM_W = 640;
export const DIAGRAM_H = 280;

export function DiagramCanvas({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg className="diagram" viewBox={`0 0 ${DIAGRAM_W} ${DIAGRAM_H}`} role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/** Places children at (x, y) and pops them in. */
export function Pop({ x = 0, y = 0, children }: { x?: number; y?: number; children: ReactNode }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="pop">{children}</g>
    </g>
  );
}

/** A straight arrow that draws itself from `from` to `to`. */
export function Arrow({
  from,
  to,
  color = "#23383f",
  width = 6,
  head = 16,
}: {
  from: [number, number];
  to: [number, number];
  color?: string;
  width?: number;
  head?: number;
}) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const a1 = angle + Math.PI - 0.5;
  const a2 = angle + Math.PI + 0.5;
  const p1 = `${x2 + head * Math.cos(a1)},${y2 + head * Math.sin(a1)}`;
  const p2 = `${x2 + head * Math.cos(a2)},${y2 + head * Math.sin(a2)}`;
  return (
    <g>
      <path
        className="arrow-line"
        d={`M${x1} ${y1} L${x2} ${y2}`}
        pathLength={1}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        fill="none"
      />
      <polygon className="arrow-head" points={`${x2},${y2} ${p1} ${p2}`} fill={color} stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </g>
  );
}

/** A speech bubble (or thought bubble) with a tail. Put icons inside as children, positioned from (0, 0). */
export function Bubble({
  x,
  y,
  w,
  h,
  tail = "bottom-left",
  thought,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  tail?: "bottom-left" | "bottom-right";
  thought?: boolean;
  children: ReactNode;
}) {
  const left = tail === "bottom-left";
  const tx = left ? 28 : w - 28;
  return (
    <Pop x={x} y={y}>
      <rect width={w} height={h} rx="26" fill="#fff" stroke="#23383f" strokeWidth="4" />
      {thought ? (
        <g fill="#fff" stroke="#23383f" strokeWidth="4">
          <circle cx={tx} cy={h + 12} r="9" />
          <circle cx={tx + (left ? -14 : 14)} cy={h + 30} r="5.5" />
        </g>
      ) : (
        <path
          d={`M${tx - 12} ${h - 2} L${tx + (left ? -10 : 10)} ${h + 22} L${tx + 12} ${h - 2}`}
          fill="#fff"
          stroke="#23383f"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      )}
      {/* hide the bubble outline where the tail joins it */}
      {!thought && <rect x={tx - 9} y={h - 5} width="18" height="7" fill="#fff" />}
      {children}
    </Pop>
  );
}

/** A name or word label, for example a person's name or a new term. */
export function Label({ x, y, children, term }: { x: number; y: number; children: ReactNode; term?: boolean }) {
  return (
    <Pop x={x} y={y}>
      <text className={term ? "diagram-term" : "diagram-name"} textAnchor="middle">
        {children}
      </text>
    </Pop>
  );
}

/** The pill that names a new word, such as "barter". */
export function TermChip({ x, y, w = 240, children }: { x: number; y: number; w?: number; children: ReactNode }) {
  return (
    <Pop x={x} y={y}>
      <rect width={w} height="52" rx="26" fill="#f08a2e" />
      <text className="chip-text" x={w / 2} y="35" textAnchor="middle">
        {children}
      </text>
    </Pop>
  );
}
