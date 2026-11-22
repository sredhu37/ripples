/** Response shapes of the API. The app keeps its own copy of any shape it reads. */
export interface HealthResponse {
  status: "ok" | "error";
}

/** The Impressum details. A field is null or empty when the deploy did not set it. */
export interface LegalResponse {
  name: string | null;
  address: string[];
  email: string | null;
  phone: string | null;
  vatId: string | null;
}

/** The feature flags: named true/false values. Public. */
export type FeaturesResponse = Record<string, boolean>;

export type ProfileLang = "en" | "de" | "pl";

/** A Kid profile with its progress. */
export interface Profile {
  id: string;
  nickname: string;
  /** Name of one of the app's cartoon villagers, for example "Finn". */
  avatar: string;
  lang: ProfileLang;
  muted: boolean;
  /** Lesson ids, in the order they were earned. */
  badges: string[];
  disabledLessons: string[];
}

export interface FamilyResponse {
  profiles: Profile[];
}

export interface ErrorResponse {
  error: "unauthorized" | "not_found" | "invalid" | "profile_limit";
}
