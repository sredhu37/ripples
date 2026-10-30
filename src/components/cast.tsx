import type { ReactNode } from "react";
import { Pop } from "./diagram";
import { Person } from "./icons";
import type { Hat, Mood } from "./icons";

/** The recurring Ripple Town cast. Use these so a person looks the same in every lesson. */
export const CAST = {
  Finn: { hat: "fisher", shirt: "#2f7fb8" },
  Bea: { hat: "baker", shirt: "#e68aa0" },
  Sam: { hat: "cap", shirt: "#5aa05f" },
  Pim: { hat: "beanie", shirt: "#8e6bbf" },
  Moss: { hat: "mayor", shirt: "#3b5b7a" },
  Pip: { hat: "none", shirt: "#e8863a" },
} as const satisfies Record<string, { hat: Hat; shirt: string }>;

export type CastName = keyof typeof CAST;

/** A villager with their name under them, popping in. Not for a person that never changes: use Person directly. */
export function Villager({
  who,
  x,
  y = 90,
  size = 130,
  mood = "happy",
  name,
}: {
  who: CastName;
  x: number;
  y?: number;
  size?: number;
  mood?: Mood;
  /** Label under the person. Defaults to the cast name; pass "" for none. */
  name?: string;
}) {
  const label = name ?? who;
  return (
    <Pop x={x} y={y}>
      <Person {...CAST[who]} mood={mood} size={size} />
      {label && (
        <text className="diagram-name" x={size / 2} y={size + 30} textAnchor="middle">
          {label}
        </text>
      )}
    </Pop>
  );
}

/** A plank with goods on it, in front of a shopkeeper. `x` is the left end of the 190 wide plank. */
export function Counter({ x, y = 214, goods }: { x: number; y?: number; goods?: ReactNode }) {
  return (
    <Pop x={x} y={0}>
      <rect x="0" y={y} width="190" height="16" rx="8" fill="#a86f3c" />
      {goods}
    </Pop>
  );
}
