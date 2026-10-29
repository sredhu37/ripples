import type { Lang } from "./progress";

export interface LessonMeta {
  /** Stable id, saved in progress and in the save code. Only ever append new ids at the end of a group. */
  id: string;
  icon: string;
  title: Record<Lang, string>;
  /** false until the lesson content exists */
  built: boolean;
}

/** Group 1: Money & Work. Order matters: each lesson builds on the one before. */
export const LESSONS: LessonMeta[] = [
  { id: "money", icon: "🪙", built: false, title: { en: "What is money?", de: "Was ist Geld?" } },
  { id: "work", icon: "🧑‍🍳", built: false, title: { en: "Work and pay", de: "Arbeit und Lohn" } },
  { id: "savings", icon: "🐷", built: false, title: { en: "Savings", de: "Sparen" } },
  { id: "loans", icon: "🤝", built: false, title: { en: "Loans", de: "Geld leihen" } },
  { id: "banks", icon: "🏦", built: false, title: { en: "Banks", de: "Banken" } },
  { id: "interest", icon: "🌱", built: false, title: { en: "Interest", de: "Zinsen" } },
  { id: "taxes", icon: "🏛️", built: false, title: { en: "Taxes", de: "Steuern" } },
  { id: "inflation", icon: "🍦", built: false, title: { en: "Prices and inflation", de: "Preise und Inflation" } },
  { id: "printing", icon: "🖨️", built: false, title: { en: "Why not print money?", de: "Warum nicht einfach Geld drucken?" } },
  { id: "rates", icon: "🎚️", built: false, title: { en: "Interest rates up and down", de: "Zinsen rauf und runter" } },
];

export const LESSON_ORDER = LESSONS.map((l) => l.id);
