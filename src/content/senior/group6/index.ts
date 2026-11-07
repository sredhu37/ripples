import type { Lesson } from "../../../lesson/types";
import { lesson as tools } from "./tools.senior";
import { lesson as massproduction } from "./massproduction.senior";
import { lesson as computers } from "./computers.senior";
import { lesson as internet } from "./internet.senior";
import { lesson as automation } from "./automation.senior";
import { lesson as ai } from "./ai.senior";
import { lesson as jobs } from "./jobs.senior";
import { lesson as humanedge } from "./humanedge.senior";

export const group6Lessons: Lesson[] = [
  tools,
  massproduction,
  computers,
  internet,
  automation,
  ai,
  jobs,
  humanedge,
];

export const GROUP_6_SENIOR_LESSONS: Record<string, Lesson> = {
  tools,
  massproduction,
  computers,
  internet,
  automation,
  ai,
  jobs,
  humanedge,
};
