import type { Lang } from "./progress";
import type { Text } from "./lesson/types";

export interface LessonMeta {
  /** Stable id, saved in progress and in the save code. Only ever append new ids at the end of a group. */
  id: string;
  title: Text;
}

export function getLessonTitle(meta: LessonMeta, lang: Lang): string {
  return meta.title[lang];
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
  { id: "profit", title: { en: "Costs and profit", de: "Kosten und Gewinn", pl: "Koszty i zysk" } },
  { id: "sales", title: { en: "Making sales", de: "Verkauf und Kundschaft", pl: "Sprzedaż i klienci" } },
  { id: "ticketsize", title: { en: "Small and big prices", de: "Kleine und grosse Preise", pl: "Małe i duże ceny" } },
  { id: "marketshare", title: { en: "Market share", de: "Der Marktanteil", pl: "Udział w rynku" } },
  { id: "competition", title: { en: "Friendly competition", de: "Wettbewerb", pl: "Uczciwa konkurencja" } },
  { id: "marketing", title: { en: "Spreading the word", de: "Bekanntheit", pl: "Reklama i rozgłos" } },
  { id: "hiring", title: { en: "Hiring and risk", de: "Mitarbeiter einstellen", pl: "Zatrudnianie i ryzyko" } },
  { id: "scale", title: { en: "Big and small business", de: "Wachsen und Grosswerden", pl: "Mały i duży biznes" } },

  // Group 3: Markets (19-26)
  { id: "supplydemand", title: { en: "Supply and demand", de: "Angebot und Nachfrage", pl: "Podaż i popyt" } },
  { id: "commodities", title: { en: "Raw commodities", de: "Rohstoffe und Ernte", pl: "Surowce naturalne" } },
  { id: "gold", title: { en: "Gold and safe harbors", de: "Gold und sichere Haefen", pl: "Złoto i bezpieczne przystanie" } },
  { id: "stocks", title: { en: "Shares and dividends", de: "Aktien und Dividenden", pl: "Akcje i dywidendy" } },
  { id: "bonds", title: { en: "Bonds and debt", de: "Anleihen und Schulden", pl: "Obligacje i dług" } },
  { id: "stocksvsbonds", title: { en: "Stocks vs bonds", de: "Aktien gegen Anleihen", pl: "Akcje a obligacje" } },
  { id: "derivatives", title: { en: "Contracts and risk hedging", de: "Vertraege und Risikoabsicherung", pl: "Kontrakty i zabezpieczanie ryzyka" } },
  { id: "philanthropy", title: { en: "Giving back forever", de: "Gemeinwohl und Stiftungen", pl: "Filantropia i fundacje" } },

  // Group 4: Governments (27-34)
  { id: "whygovernment", title: { en: "Why Government?", de: "Warum gibt es eine Regierung?", pl: "Dlaczego potrzebujemy rządu?" } },
  { id: "elections", title: { en: "How Leaders are Chosen", de: "Wie Anfuehrer gewaehlt werden", pl: "Jak wybieramy przywódców" } },
  { id: "democracy", title: { en: "Democracy", de: "Demokratie", pl: "Demokracja" } },
  { id: "monarchy", title: { en: "Monarchy", de: "Monarchie", pl: "Monarchia" } },
  { id: "dictatorship", title: { en: "Dictatorship", de: "Diktatur", pl: "Dyktatura" } },
  { id: "capitalism", title: { en: "Capitalism", de: "Kapitalismus", pl: "Kapitalizm" } },
  { id: "communism", title: { en: "Communism", de: "Planwirtschaft", pl: "Gospodarka centralnie planowana" } },
  { id: "powertriangle", title: { en: "The Power Triangle", de: "Das Macht-Dreieck", pl: "Trójpodział władzy" } },

  // Group 5: History (35-42)
  { id: "mughals", title: { en: "The Mughals", de: "Das Mogulreich", pl: "Imperium Mogołów" } },
  { id: "spicetrade", title: { en: "The Spice Trade", de: "Der Gewuerzhandel", pl: "Handel przyprawami" } },
  { id: "britishinindia", title: { en: "The British in India", de: "Die Briten in Indien", pl: "Brytyjczycy w Indiach" } },
  { id: "independence", title: { en: "The Independence Movement", de: "Die Unabhaengigkeitsbewegung", pl: "Ruch niepodległościowy" } },
  { id: "ww1", title: { en: "World War 1", de: "Der Erste Weltkrieg", pl: "Pierwsza wojna światowa" } },
  { id: "ww2", title: { en: "World War 2 and Human Rights", de: "Der Zweite Weltkrieg und Menschenrechte", pl: "Druga wojna światowa i prawa człowieka" } },
  { id: "rebuilding", title: { en: "Rebuilding Europe", de: "Europas Wiederaufbau", pl: "Odbudowa powojenna" } },
  { id: "whyhistory", title: { en: "Why History Matters", de: "Warum Geschichte wichtig ist", pl: "Dlaczego historia ma znaczenie" } },

  // Group 6: Technology (43-50)
  { id: "tools", title: { en: "Tools to Steam", de: "Von Werkzeugen zum Dampf", pl: "Od narzędzi do pary" } },
  { id: "massproduction", title: { en: "Mass Production", de: "Die Massenfertigung", pl: "Produkcja masowa" } },
  { id: "computers", title: { en: "Computers", de: "Computer und Rechenmaschinen", pl: "Komputery i maszyny cyfrowe" } },
  { id: "internet", title: { en: "The Internet", de: "Das weltweite Netz", pl: "Internet i globalna sieć" } },
  { id: "automation", title: { en: "Robots and Automation", de: "Roboter und Automation", pl: "Roboty i automatyzacja" } },
  { id: "ai", title: { en: "Artificial Intelligence", de: "Kuenstliche Intelligenz", pl: "Sztuczna inteligencja" } },
  { id: "jobs", title: { en: "Changing Jobs", de: "Wandel der Berufe", pl: "Zawody w zmieniającym się świecie" } },
  { id: "humanedge", title: { en: "The Human Edge", de: "Der menschliche Vorteil", pl: "Ludzka przewaga" } },
];

export const LESSON_ORDER = LESSONS.map((l) => l.id);
