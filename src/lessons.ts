import type { Lang } from "./progress";

export interface LessonMeta {
  /** Stable id, saved in progress and in the save code. Only ever append new ids at the end of a group. */
  id: string;
  icon: string;
  title: Record<Lang, string>;
}

/** Group 1: Money & Work. Order matters: each lesson builds on the one before. */
export const LESSONS: LessonMeta[] = [
  { id: "money", icon: "🪙", title: { en: "What is money?", de: "Was ist Geld?" } },
  { id: "work", icon: "🧑‍🍳", title: { en: "Work and pay", de: "Arbeit und Lohn" } },
  { id: "savings", icon: "🐷", title: { en: "Savings", de: "Sparen" } },
  { id: "loans", icon: "🤝", title: { en: "Loans", de: "Geld leihen" } },
  { id: "banks", icon: "🏦", title: { en: "Banks", de: "Banken" } },
  { id: "interest", icon: "🌱", title: { en: "Interest", de: "Zinsen" } },
  { id: "taxes", icon: "🏛️", title: { en: "Taxes", de: "Steuern" } },
  { id: "inflation", icon: "🍦", title: { en: "Prices and inflation", de: "Preise und Inflation" } },
  { id: "printing", icon: "🖨️", title: { en: "Why not print money?", de: "Warum nicht einfach Geld drucken?" } },
  { id: "rates", icon: "🎚️", title: { en: "Interest rates up and down", de: "Zinsen rauf und runter" } },
];

export const LESSON_ORDER = LESSONS.map((l) => l.id);
