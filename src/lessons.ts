import type { Lang } from "./progress";

export interface LessonMeta {
  /** Stable id, saved in progress and in the save code. Only ever append new ids at the end of a group. */
  id: string;
  title: { en: string; de: string; pl?: string };
}

export function getLessonTitle(meta: LessonMeta, lang: Lang): string {
  return meta.title[lang] ?? meta.title.en;
}

/** Complete Curriculum: Group 1, Group 2, Group 3, Group 4, and Group 5. */
export const LESSONS: LessonMeta[] = [
  // Group 1: Money & Work (1-10)
  { id: "money", title: { en: "What is money?", de: "Was ist Geld?", pl: "Czym są pieniądze?" } },
  { id: "work", title: { en: "Work and pay", de: "Arbeit und Lohn", pl: "Praca i zarobek" } },
  { id: "savings", title: { en: "Savings", de: "Sparen", pl: "Oszczędzanie" } },
  { id: "loans", title: { en: "Loans", de: "Geld leihen", pl: "Pożyczanie pieniędzy" } },
  { id: "banks", title: { en: "Banks", de: "Banken", pl: "Banki" } },
  { id: "interest", title: { en: "Interest", de: "Zinsen", pl: "Odsetki" } },
  { id: "taxes", title: { en: "Taxes", de: "Steuern", pl: "Podatki" } },
  { id: "inflation", title: { en: "Prices and inflation", de: "Preise und Inflation", pl: "Ceny i inflacja" } },
  { id: "printing", title: { en: "Why not print money?", de: "Warum nicht einfach Geld drucken?", pl: "Dlaczego nie dodrukować pieniędzy?" } },
  { id: "rates", title: { en: "Interest rates up and down", de: "Zinsen rauf und runter", pl: "Stopy procentowe w górę i w dół" } },

  // Group 2: Business (11-18)
  { id: "profit", title: { en: "Costs and profit", de: "Kosten und Gewinn" } },
  { id: "sales", title: { en: "Making sales", de: "Verkauf und Kundschaft" } },
  { id: "ticketsize", title: { en: "Small and big prices", de: "Kleine und grosse Preise" } },
  { id: "marketshare", title: { en: "Market share", de: "Der Marktanteil" } },
  { id: "competition", title: { en: "Friendly competition", de: "Wettbewerb" } },
  { id: "marketing", title: { en: "Spreading the word", de: "Bekanntheit" } },
  { id: "hiring", title: { en: "Hiring and risk", de: "Mitarbeiter einstellen" } },
  { id: "scale", title: { en: "Big and small business", de: "Wachsen und Grosswerden" } },

  // Group 3: Markets (19-26)
  { id: "supplydemand", title: { en: "Supply and demand", de: "Angebot und Nachfrage" } },
  { id: "commodities", title: { en: "Raw commodities", de: "Rohstoffe und Ernte" } },
  { id: "gold", title: { en: "Gold and safe harbors", de: "Gold und sichere Haefen" } },
  { id: "stocks", title: { en: "Shares and dividends", de: "Aktien und Dividenden" } },
  { id: "bonds", title: { en: "Bonds and debt", de: "Anleihen und Schulden" } },
  { id: "stocksvsbonds", title: { en: "Stocks vs bonds", de: "Aktien gegen Anleihen" } },
  { id: "derivatives", title: { en: "Contracts and risk hedging", de: "Vertraege und Risikoabsicherung" } },
  { id: "philanthropy", title: { en: "Giving back forever", de: "Gemeinwohl und Stiftungen" } },

  // Group 4: Governments (27-34)
  { id: "whygovernment", title: { en: "Why Government?", de: "Warum gibt es eine Regierung?" } },
  { id: "elections", title: { en: "How Leaders are Chosen", de: "Wie Anfuehrer gewaehlt werden" } },
  { id: "democracy", title: { en: "Democracy", de: "Demokratie" } },
  { id: "monarchy", title: { en: "Monarchy", de: "Monarchie" } },
  { id: "dictatorship", title: { en: "Dictatorship", de: "Diktatur" } },
  { id: "capitalism", title: { en: "Capitalism", de: "Kapitalismus" } },
  { id: "communism", title: { en: "Communism", de: "Planwirtschaft" } },
  { id: "powertriangle", title: { en: "The Power Triangle", de: "Das Macht-Dreieck" } },

  // Group 5: History (35-42)
  { id: "mughals", title: { en: "The Mughals", de: "Das Mogulreich" } },
  { id: "spicetrade", title: { en: "The Spice Trade", de: "Der Gewuerzhandel" } },
  { id: "britishinindia", title: { en: "The British in India", de: "Die Briten in Indien" } },
  { id: "independence", title: { en: "The Independence Movement", de: "Die Unabhaengigkeitsbewegung" } },
  { id: "ww1", title: { en: "World War 1", de: "Der Erste Weltkrieg" } },
  { id: "ww2", title: { en: "World War 2 and Human Rights", de: "Der Zweite Weltkrieg und Menschenrechte" } },
  { id: "rebuilding", title: { en: "Rebuilding Europe", de: "Europas Wiederaufbau" } },
  { id: "whyhistory", title: { en: "Why History Matters", de: "Warum Geschichte wichtig ist" } },

  // Group 6: Technology (43-50)
  { id: "tools", title: { en: "Tools to Steam", de: "Von Werkzeugen zum Dampf" } },
  { id: "massproduction", title: { en: "Mass Production", de: "Die Massenfertigung" } },
  { id: "computers", title: { en: "Computers", de: "Computer und Rechenmaschinen" } },
  { id: "internet", title: { en: "The Internet", de: "Das weltweite Netz" } },
  { id: "automation", title: { en: "Robots and Automation", de: "Roboter und Automation" } },
  { id: "ai", title: { en: "Artificial Intelligence", de: "Kuenstliche Intelligenz" } },
  { id: "jobs", title: { en: "Changing Jobs", de: "Wandel der Berufe" } },
  { id: "humanedge", title: { en: "The Human Edge", de: "Der menschliche Vorteil" } },
];

export const LESSON_ORDER = LESSONS.map((l) => l.id);
