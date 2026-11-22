/** Calls to the profile routes of the API. The session cookie is httpOnly: the app never sees it. */
import type { Lang } from "./progress";

/** A Kid profile with its progress, as the API sends it. */
export interface Profile {
  id: string;
  nickname: string;
  /** Name of one of the app's villagers (see `CAST`). */
  avatar: string;
  lang: Lang;
  muted: boolean;
  badges: string[];
  disabledLessons: string[];
}

/** The parts of a profile that a PATCH can change. */
export type ProfileChanges = Partial<
  Pick<Profile, "nickname" | "avatar" | "lang" | "muted" | "disabledLessons">
>;

/** A call the API answered with an error status, or did not answer (status 0). */
export class ApiError extends Error {
  constructor(readonly status: number) {
    super(`API error ${status}`);
  }
}

async function call(method: string, path: string, body?: unknown): Promise<Response> {
  let res: Response;
  try {
    res = await fetch(`/api${path}`, {
      method,
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0);
  }
  if (!res.ok) throw new ApiError(res.status);
  return res;
}

async function readProfile(res: Response): Promise<Profile> {
  try {
    return (await res.json()) as Profile;
  } catch {
    throw new ApiError(0);
  }
}

export async function fetchFamily(): Promise<Profile[]> {
  const res = await call("GET", "/family");
  try {
    return ((await res.json()) as { profiles: Profile[] }).profiles;
  } catch {
    throw new ApiError(0);
  }
}

export async function createProfile(nickname: string, avatar: string): Promise<Profile> {
  return readProfile(await call("POST", "/profiles", { nickname, avatar }));
}

export async function changeProfile(id: string, changes: ProfileChanges): Promise<void> {
  await call("PATCH", `/profiles/${id}`, changes);
}

export async function saveBadge(id: string, lessonId: string): Promise<void> {
  await call("POST", `/profiles/${id}/badges`, { lessonId });
}

export async function removeProfile(id: string): Promise<void> {
  await call("DELETE", `/profiles/${id}`);
}

/** The API allows at most this many profiles in a family. */
export const MAX_PROFILES = 6;
