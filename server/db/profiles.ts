import type { Profile, ProfileLang } from "../apiTypes.js";
import { ensureFamily } from "./family.js";

/** A family has at most this many Kid profiles. */
export const MAX_PROFILES = 6;
export const MAX_NICKNAME = 20;
export const MAX_AVATAR = 32;
export const MAX_LESSON_ID = 64;
export const MAX_LESSON_IDS = 200;
const LANGS: readonly string[] = ["en", "de", "pl"];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export interface Row {
  rows: Record<string, unknown>[];
}

export interface Executor {
  query(text: string, values?: unknown[]): Promise<Row>;
}

/** A pool: runs single queries and hands out a connection for a transaction. */
export interface Transactional extends Executor {
  connect(): Promise<Executor & { release(): void }>;
}

/** Same cleaning as `cleanName` in web/src/progress.ts. A test pins the same cases. */
export function cleanNickname(raw: string): string {
  return raw.trim().replace(/\s+/g, " ").slice(0, MAX_NICKNAME);
}

export const isUuid = (value: string): boolean => UUID.test(value);

/** Input checks. Each returns the clean value, or undefined when the input is bad. */
export function parseNickname(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  return cleanNickname(value) || undefined;
}

export function parseAvatar(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const avatar = value.trim();
  return avatar.length >= 1 && avatar.length <= MAX_AVATAR ? avatar : undefined;
}

export function parseLang(value: unknown): ProfileLang | undefined {
  return typeof value === "string" && LANGS.includes(value) ? (value as ProfileLang) : undefined;
}

export function parseLessonId(value: unknown): string | undefined {
  return typeof value === "string" && value.length >= 1 && value.length <= MAX_LESSON_ID
    ? value
    : undefined;
}

export function parseLessonIds(value: unknown): string[] | undefined {
  if (!Array.isArray(value) || value.length > MAX_LESSON_IDS) return undefined;
  const ids = value.map(parseLessonId);
  return ids.every((id) => id !== undefined) ? [...new Set(ids as string[])] : undefined;
}

const COLUMNS = "id, nickname, avatar, lang, muted, badges, disabled_lessons";

function toProfile(row: Record<string, unknown>): Profile {
  return {
    id: row.id as string,
    nickname: row.nickname as string,
    avatar: row.avatar as string,
    lang: row.lang as ProfileLang,
    muted: row.muted as boolean,
    badges: row.badges as string[],
    disabledLessons: row.disabled_lessons as string[],
  };
}

export async function listProfiles(db: Executor, familyId: string): Promise<Profile[]> {
  const { rows } = await db.query(
    `SELECT ${COLUMNS} FROM kid_profile WHERE family_id = $1 ORDER BY created_at, id`,
    [familyId],
  );
  return rows.map(toProfile);
}

/** Adds a profile. Returns undefined when the family already has MAX_PROFILES. */
export async function addProfile(
  db: Transactional,
  familyId: string,
  nickname: string,
  avatar: string,
): Promise<Profile | undefined> {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    // Locking the family row makes two simultaneous adds take turns, so the limit holds.
    await client.query("SELECT 1 FROM family WHERE id = $1 FOR UPDATE", [familyId]);
    const count = await client.query(
      "SELECT count(*)::int AS n FROM kid_profile WHERE family_id = $1",
      [familyId],
    );
    if ((count.rows[0].n as number) >= MAX_PROFILES) {
      await client.query("ROLLBACK");
      return undefined;
    }
    const { rows } = await client.query(
      `INSERT INTO kid_profile (family_id, nickname, avatar) VALUES ($1, $2, $3) RETURNING ${COLUMNS}`,
      [familyId, nickname, avatar],
    );
    await client.query("COMMIT");
    return toProfile(rows[0]);
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}

export interface ProfileChanges {
  nickname?: string;
  avatar?: string;
  lang?: ProfileLang;
  muted?: boolean;
  disabledLessons?: string[];
}

const COLUMN_OF: Record<keyof ProfileChanges, string> = {
  nickname: "nickname",
  avatar: "avatar",
  lang: "lang",
  muted: "muted",
  disabledLessons: "disabled_lessons",
};

/** Replaces the given values. Returns undefined when the profile is not in the family. */
export async function changeProfile(
  db: Executor,
  familyId: string,
  id: string,
  changes: ProfileChanges,
): Promise<Profile | undefined> {
  const keys = Object.keys(changes) as (keyof ProfileChanges)[];
  const sets = keys.map((key, i) => `${COLUMN_OF[key]} = $${i + 3}`);
  const { rows } = await db.query(
    `UPDATE kid_profile SET ${sets.join(", ")} WHERE id = $1 AND family_id = $2 RETURNING ${COLUMNS}`,
    [id, familyId, ...keys.map((key) => changes[key])],
  );
  return rows[0] ? toProfile(rows[0]) : undefined;
}

/** One statement, so two simultaneous badges both stay. Adding a badge twice changes nothing. */
export async function addBadge(
  db: Executor,
  familyId: string,
  id: string,
  lessonId: string,
): Promise<Profile | undefined> {
  const { rows } = await db.query(
    `UPDATE kid_profile
     SET badges = CASE WHEN $3 = ANY(badges) THEN badges ELSE array_append(badges, $3::text) END
     WHERE id = $1 AND family_id = $2 RETURNING ${COLUMNS}`,
    [id, familyId, lessonId],
  );
  return rows[0] ? toProfile(rows[0]) : undefined;
}

export async function deleteProfile(db: Executor, familyId: string, id: string): Promise<boolean> {
  const { rows } = await db.query(
    "DELETE FROM kid_profile WHERE id = $1 AND family_id = $2 RETURNING id",
    [id, familyId],
  );
  return rows.length > 0;
}

/** The id of the family of a Parent account, created if the first-login hook failed. */
export async function familyIdOf(db: Executor, parentUserId: string): Promise<string> {
  await ensureFamily(db, parentUserId);
  const { rows } = await db.query("SELECT id FROM family WHERE parent_user_id = $1", [
    parentUserId,
  ]);
  return rows[0].id as string;
}
