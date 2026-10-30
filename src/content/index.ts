import { lesson as money } from "./money";
import { lesson as work } from "./work";
import { lesson as savings } from "./savings";
import { lesson as loans } from "./loans";
import { lesson as banks } from "./banks";
import { lesson as interest } from "./interest";
import { lesson as taxes } from "./taxes";
import { lesson as inflation } from "./inflation";
import { lesson as printing } from "./printing";
import { lesson as rates } from "./rates";
import { lesson as whygovernment } from "./whygovernment";
import type { Lesson } from "../lesson/types";

const ALL: Record<string, Lesson | undefined> = {
  money, work, savings, loans, banks, interest, taxes, inflation, printing, rates,
  whygovernment,
};

export function getLesson(id: string): Lesson | undefined {
  return ALL[id];
}

export function hasLesson(id: string): boolean {
  return ALL[id] !== undefined;
}
