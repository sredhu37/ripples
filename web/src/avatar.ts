import { CAST, type CastName } from "./components/cast";

export const VILLAGERS = Object.keys(CAST) as CastName[];

/** The villager to draw for a stored avatar. A value the app cannot draw shows the first villager. */
export function villagerOf(avatar: string): CastName {
  return VILLAGERS.find((name) => name === avatar) ?? VILLAGERS[0];
}

/** The first villager, in cast order, that no profile of the family uses. */
export function defaultAvatar(profiles: { avatar: string }[]): CastName {
  const used = new Set(profiles.map((p) => p.avatar));
  return VILLAGERS.find((name) => !used.has(name)) ?? VILLAGERS[0];
}
