import type { Lesson } from "../../../lesson/types";
import { lesson as whygovernment } from "./whygovernment.senior";
import { lesson as elections } from "./elections.senior";
import { lesson as democracy } from "./democracy.senior";
import { lesson as monarchy } from "./monarchy.senior";
import { lesson as dictatorship } from "./dictatorship.senior";
import { lesson as capitalism } from "./capitalism.senior";
import { lesson as communism } from "./communism.senior";
import { lesson as powertriangle } from "./powertriangle.senior";

export const group4Lessons: Record<string, Lesson> = {
  whygovernment,
  elections,
  democracy,
  monarchy,
  dictatorship,
  capitalism,
  communism,
  powertriangle,
};
