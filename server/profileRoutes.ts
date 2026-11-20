import { Hono, type Context, type MiddlewareHandler } from "hono";
import type { FamilyResponse, Profile } from "./apiTypes.js";
import type { Auth } from "./auth.js";
import {
  addBadge,
  addProfile,
  changeProfile,
  deleteProfile,
  familyIdOf,
  isUuid,
  listProfiles,
  parseAvatar,
  parseLang,
  parseLessonId,
  parseLessonIds,
  parseNickname,
  type ProfileChanges,
  type Transactional,
} from "./db/profiles.js";

type Env = { Variables: { familyId: string } };

const unauthorized = (c: Context) => c.json({ error: "unauthorized" }, 401);
const notFound = (c: Context) => c.json({ error: "not_found" }, 404);
const invalid = (c: Context) => c.json({ error: "invalid" }, 400);

async function readBody(c: Context): Promise<Record<string, unknown> | undefined> {
  try {
    const body: unknown = await c.req.json();
    return typeof body === "object" && body !== null && !Array.isArray(body)
      ? (body as Record<string, unknown>)
      : undefined;
  } catch {
    return undefined;
  }
}

/** Returns the changes of a PATCH body, or undefined when a value is bad or nothing is set. */
function parseChanges(body: Record<string, unknown>): ProfileChanges | undefined {
  const changes: ProfileChanges = {};
  if ("nickname" in body) changes.nickname = parseNickname(body.nickname);
  if ("avatar" in body) changes.avatar = parseAvatar(body.avatar);
  if ("lang" in body) changes.lang = parseLang(body.lang);
  if ("muted" in body) changes.muted = typeof body.muted === "boolean" ? body.muted : undefined;
  if ("disabledLessons" in body) changes.disabledLessons = parseLessonIds(body.disabledLessons);
  const keys = Object.keys(changes) as (keyof ProfileChanges)[];
  if (keys.length === 0 || keys.some((key) => changes[key] === undefined)) return undefined;
  return changes;
}

/** Routes for the Kid profiles of the logged-in parent's family. */
export function profileRoutes(auth: Auth, db: Transactional): Hono<Env> {
  const routes = new Hono<Env>();

  // Only these paths, so an unknown /api/* path keeps its JSON 404.
  const requireFamily: MiddlewareHandler<Env> = async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) return unauthorized(c);
    c.set("familyId", await familyIdOf(db, session.user.id));
    await next();
  };
  for (const path of ["/family", "/profiles", "/profiles/*"]) routes.use(path, requireFamily);

  routes.get("/family", async (c) => {
    const profiles = await listProfiles(db, c.get("familyId"));
    return c.json<FamilyResponse>({ profiles });
  });

  routes.post("/profiles", async (c) => {
    const body = await readBody(c);
    const nickname = parseNickname(body?.nickname);
    const avatar = parseAvatar(body?.avatar);
    if (nickname === undefined || avatar === undefined) return invalid(c);
    const profile = await addProfile(db, c.get("familyId"), nickname, avatar);
    if (!profile) return c.json({ error: "profile_limit" }, 409);
    return c.json<Profile>(profile, 201);
  });

  routes.patch("/profiles/:id", async (c) => {
    const id = c.req.param("id");
    if (!isUuid(id)) return notFound(c);
    const body = await readBody(c);
    const changes = body && parseChanges(body);
    if (!changes) return invalid(c);
    const profile = await changeProfile(db, c.get("familyId"), id, changes);
    return profile ? c.json<Profile>(profile) : notFound(c);
  });

  routes.post("/profiles/:id/badges", async (c) => {
    const id = c.req.param("id");
    if (!isUuid(id)) return notFound(c);
    const lessonId = parseLessonId((await readBody(c))?.lessonId);
    if (lessonId === undefined) return invalid(c);
    const profile = await addBadge(db, c.get("familyId"), id, lessonId);
    return profile ? c.json<Profile>(profile) : notFound(c);
  });

  routes.delete("/profiles/:id", async (c) => {
    const id = c.req.param("id");
    if (!isUuid(id) || !(await deleteProfile(db, c.get("familyId"), id))) return notFound(c);
    return c.body(null, 204);
  });

  return routes;
}
