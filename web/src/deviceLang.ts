import type { Lang } from "./progress";

/** Device key: the language of the login and picker screens, before a profile is chosen. */
const KEY = "ripples.lang";

export function loadDeviceLang(storage: Pick<Storage, "getItem">): Lang {
  try {
    const v = storage.getItem(KEY);
    return v === "de" || v === "pl" ? v : "en";
  } catch {
    return "en";
  }
}

export function saveDeviceLang(storage: Pick<Storage, "setItem">, lang: Lang): void {
  try {
    storage.setItem(KEY, lang);
  } catch {
    // storage blocked: the screen language is still right for this session
  }
}
