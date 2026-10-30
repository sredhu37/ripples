import type { Lang } from "./progress";

export interface LessonMeta {
  /** Stable id, saved in progress and in the save code. Only ever append new ids at the end of a group. */
  id: string;
  title: Record<Lang, string>;
}

/** Group 1: Money & Work. Order matters: each lesson builds on the one before. */
export const LESSONS: LessonMeta[] = [
  { id: "money", title: { en: "What is money?", de: "Was ist Geld?" } },
  { id: "work", title: { en: "Work and pay", de: "Arbeit und Lohn" } },
  { id: "savings", title: { en: "Savings", de: "Sparen" } },
  { id: "loans", title: { en: "Loans", de: "Geld leihen" } },
  { id: "banks", title: { en: "Banks", de: "Banken" } },
  { id: "interest", title: { en: "Interest", de: "Zinsen" } },
  { id: "taxes", title: { en: "Taxes", de: "Steuern" } },
  { id: "inflation", title: { en: "Prices and inflation", de: "Preise und Inflation" } },
  { id: "printing", title: { en: "Why not print money?", de: "Warum nicht einfach Geld drucken?" } },
  { id: "rates", title: { en: "Interest rates up and down", de: "Zinsen rauf und runter" } },
  { id: "profit", title: { en: "Costs and profit", de: "Kosten und Gewinn" } },
  { id: "sales", title: { en: "Making sales", de: "Verkauf und Kundschaft" } },
  { id: "ticketsize", title: { en: "Small and big prices", de: "Kleine und grosse Preise" } },
  { id: "marketshare", title: { en: "Market share", de: "Der Marktanteil" } },
  { id: "competition", title: { en: "Friendly competition", de: "Wettbewerb" } },
  { id: "marketing", title: { en: "Spreading the word", de: "Bekanntheit" } },
  { id: "hiring", title: { en: "Hiring and risk", de: "Mitarbeiter einstellen" } },
  { id: "scale", title: { en: "Big and small business", de: "Wachsen und Grosswerden" } },
  // Group 3: Community lessons 19-26 would go here
  // Group 4: Governments lessons 27-34
  { id: "whygovernment", title: { en: "Why Government?", de: "Warum gibt es eine Regierung?" } },
  { id: "elections", title: { en: "How Leaders are Chosen", de: "Wie Anfuehrer gewaehlt werden" } },
  { id: "democracy", title: { en: "Democracy", de: "Demokratie" } },
  { id: "monarchy", title: { en: "Monarchy", de: "Monarchie" } },
  { id: "dictatorship", title: { en: "Dictatorship", de: "Diktatur" } },
  { id: "capitalism", title: { en: "Capitalism", de: "Kapitalismus" } },
  { id: "communism", title: { en: "Communism", de: "Planwirtschaft" } },
  { id: "powertriangle", title: { en: "The Power Triangle", de: "Das Macht-Dreieck" } },
];

export const LESSON_ORDER = LESSONS.map((l) => l.id);
