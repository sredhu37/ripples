import type { ComponentType, ReactNode } from "react";
import { t } from "../i18n";
import type { Lang } from "../progress";
import { sfx } from "../sound";
import type { Beat, DiagramProps, Text } from "./types";

/**
 * A story beat that builds up tap by tap. `lines` are what Otto says, one per tap;
 * the Diagram shows one more part for each tap. Put new words between *stars*.
 */
export function animatedBeat(lines: Text[], Diagram: ComponentType<DiagramProps>, mood?: Beat["mood"]): Beat {
  return {
    lines,
    Diagram,
    mood,
    text: { en: lines.map((l) => l.en).join(" "), de: lines.map((l) => l.de).join(" ") },
  };
}

/** Big picture area of a lesson. Put emoji, numbers and small toy parts inside. */
export function Stage({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="stage" role={label ? "group" : undefined} aria-label={label}>
      {children}
    </div>
  );
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  /** Words under the left and right end, for example "few" and "many" */
  left?: string;
  right?: string;
}

/** Large native range input: works with mouse, trackpad, touch and arrow keys. */
export function Slider({ label, value, min, max, step = 1, onChange, left, right }: SliderProps) {
  return (
    <label className="slider">
      <span className="slider-label">
        {label}: <strong>{value}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {(left || right) && (
        <span className="slider-ends">
          <span>{left}</span>
          <span>{right}</span>
        </span>
      )}
    </label>
  );
}

/** The Check button every widget question needs. */
export function CheckButton({ lang, onClick }: { lang: Lang; onClick: () => void }) {
  return (
    <button
      type="button"
      className="btn"
      onClick={() => {
        sfx.tap();
        onClick();
      }}
    >
      {t(lang, "check")}
    </button>
  );
}

/** A plain button for toy actions (flip, offer, print ...). */
export function ToyButton({
  children,
  onClick,
  disabled,
  pressed,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      className="btn btn-toy"
      disabled={disabled}
      aria-pressed={pressed}
      onClick={() => {
        sfx.tap();
        onClick();
      }}
    >
      {children}
    </button>
  );
}
