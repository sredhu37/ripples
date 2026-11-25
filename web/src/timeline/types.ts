import type { Text } from "../lesson/types";

export type TimelineEraId =
  | "ancient"
  | "middle_ages"
  | "trade_empires"
  | "scientific_rev"
  | "industrial"
  | "twentieth"
  | "digital";

export type TimelineRegion =
  | "india"
  | "europe"
  | "americas"
  | "east_asia"
  | "mideast_africa"
  | "science";

export interface TimelineEra {
  id: TimelineEraId;
  label: Text;
  shortLabel?: Text;
  dateRange: Text;
  /** First year of the era. BCE is negative. */
  from: number;
  /** Last year of the era, or null when the era runs to today. */
  to: number | null;
  description: Text;
}

export interface TimelineEvent {
  id: string;
  era: TimelineEraId;
  year: Text;
  region: TimelineRegion;
  title: Text;
  summary: Text;
  lessonId?: string;
  keyFigure?: string;
}

/** One slider stop. A pin belongs to the last stop at or before its map year. */
export interface TimelineStop {
  /** First year of the stop. BCE is negative. */
  year: number;
  label: Text;
  era: TimelineEraId;
}

/** One event at one place on the world map. */
export interface Pin {
  id: string;
  /** Displayed year text. */
  year: Text;
  /** Start year of the event. BCE is negative. */
  mapYear: number;
  title: Text;
  /** The one sentence Otto tells. */
  line: Text;
  /** Present-day country, used for the label. */
  country: string;
  lon: number;
  lat: number;
  /** https URL. */
  source: string;
  /** War, genocide, partition and famine pins: the source may not be Wikipedia. */
  sensitive: boolean;
  lessonId?: string;
}
