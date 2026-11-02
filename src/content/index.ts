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
import { lesson as profit } from "./profit";
import { lesson as sales } from "./sales";
import { lesson as ticketsize } from "./ticketsize";
import { lesson as marketshare } from "./marketshare";
import { lesson as competition } from "./competition";
import { lesson as marketing } from "./marketing";
import { lesson as hiring } from "./hiring";
import { lesson as scale } from "./scale";
import { lesson as whygovernment } from "./whygovernment";
import { lesson as elections } from "./elections";
import { lesson as democracy } from "./democracy";
import { lesson as monarchy } from "./monarchy";
import { lesson as dictatorship } from "./dictatorship";
import { lesson as capitalism } from "./capitalism";
import { lesson as communism } from "./communism";
import { lesson as powertriangle } from "./powertriangle";
import type { Lesson } from "../lesson/types";

const ALL: Record<string, Lesson | undefined> = {
  money,
  work,
  savings,
  loans,
  banks,
  interest,
  taxes,
  inflation,
  printing,
  rates,
  profit,
  sales,
  ticketsize,
  marketshare,
  competition,
  marketing,
  hiring,
  scale,
  whygovernment,
  elections,
  democracy,
  monarchy,
  dictatorship,
  capitalism,
  communism,
  powertriangle,
};

export function getLesson(id: string): Lesson | undefined {
  return ALL[id];
}

export function hasLesson(id: string): boolean {
  return ALL[id] !== undefined;
}
