import type { Lesson } from "../../../lesson/types";
import { lesson as mughals } from "./mughals.senior";
import { lesson as spicetrade } from "./spicetrade.senior";
import { lesson as britishinindia } from "./britishinindia.senior";
import { lesson as independence } from "./independence.senior";
import { lesson as ww1 } from "./ww1.senior";
import { lesson as ww2 } from "./ww2.senior";
import { lesson as rebuilding } from "./rebuilding.senior";
import { lesson as whyhistory } from "./whyhistory.senior";

export const group5Lessons: Record<string, Lesson> = {
  mughals,
  spicetrade,
  britishinindia,
  independence,
  ww1,
  ww2,
  rebuilding,
  whyhistory,
};

export const GROUP_5_SENIOR_LESSONS: Lesson[] = Object.values(group5Lessons);
