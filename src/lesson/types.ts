import type { ComponentType } from "react";
import type { Lang } from "../progress";

/** A text in all languages. English and German required; Polish optional during phased rollout. */
export type Text = {
  en: string;
  de: string;
  pl: string;
};

export function resolveText(t: Text, lang: Lang): string {
  return t[lang] ?? t.en;
}

/** What an animated diagram receives: how many lines have been tapped so far. */
export interface DiagramProps {
  lang: Lang;
  /** 1 on the first tap, up to lines.length. Show a part with `step >= n`. */
  step: number;
}

/**
 * One screen of the story: Otto says `text`, the stage shows `scene`.
 * An animated beat (build it with `animatedBeat`) has `lines` and a `Diagram`
 * instead: each tap shows the next line and the next part of the diagram.
 */
export interface Beat {
  text: Text;
  /** Old style: a row of emoji shown big on the stage. Still works, but use an animated beat instead. */
  scene?: string;
  mood?: "happy" | "think";
  /** One Otto line per tap. `text` is these lines joined, so tests and old code still work. */
  lines?: Text[];
  Diagram?: ComponentType<DiagramProps>;
}

/** The free-play toy. No score, the child just tries things. */
export interface ToyProps {
  lang: Lang;
  onDone?: () => void;
}

/**
 * A quiz question answered by doing something in the toy.
 * The widget must render its own "Check" button (use CheckButton) and call
 * onAnswer(true) or onAnswer(false) only when the child presses it.
 */
export interface WidgetProps {
  lang: Lang;
  onAnswer: (correct: boolean) => void;
}

export type Question =
  | {
      kind: "choice";
      prompt: Text;
      /** 2 to 4 options, exactly one with correct: true */
      options: { text: Text; correct?: boolean }[];
      /** Shown after a wrong tap. A mini-explanation, never "wrong". */
      hint: Text;
    }
  | {
      kind: "widget";
      prompt: Text;
      Widget: ComponentType<WidgetProps>;
      hint: Text;
    };

export function resolveFactText(t: Text, lang: Lang): string {
  return t[lang];
}

/** Parent area fact cards: claims, sources, and simplifications in EN, DE, and PL. */
export interface FactCard {
  /** At least 5. Each claim the lesson makes, with a primary or authoritative source URL. */
  claims: { text: Text; source: string }[];
  /** What was simplified for an 8-year-old, and why that is fair. */
  simplified: Text[];
}

export interface Lesson {
  /** Must match the id in src/lessons.ts */
  id: string;
  /** 5 to 8 beats */
  story: Beat[];
  /** Otto line shown above the toy */
  toyIntro: Text;
  Toy: ComponentType<ToyProps>;
  /** Exactly 3, at least one of kind "widget" */
  questions: Question[];
  /** One conversation question for the parent */
  askDad: Text;
  /** The Germany/India/Poland card shown after the badge */
  realLife: { title: Text; body: Text };
  factCard: FactCard;
}
