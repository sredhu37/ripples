import { lesson as money } from "./money";
import { lesson as work } from "./work";
import { lesson as savings } from "./savings";
import { lesson as business } from "./business";
import { lesson as equity } from "./equity";
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
import { lesson as supplydemand } from "./supplydemand";
import { lesson as commodities } from "./commodities";
import { lesson as gold } from "./gold";
import { lesson as stocks } from "./stocks";
import { lesson as bonds } from "./bonds";
import { lesson as stocksvsbonds } from "./stocksvsbonds";
import { lesson as derivatives } from "./derivatives";
import { lesson as philanthropy } from "./philanthropy";
import { lesson as whygovernment } from "./whygovernment";
import { lesson as elections } from "./elections";
import { lesson as democracy } from "./democracy";
import { lesson as monarchy } from "./monarchy";
import { lesson as dictatorship } from "./dictatorship";
import { lesson as capitalism } from "./capitalism";
import { lesson as communism } from "./communism";
import { lesson as powertriangle } from "./powertriangle";
import { lesson as mughals } from "./mughals";
import { lesson as spicetrade } from "./spicetrade";
import { lesson as britishinindia } from "./britishinindia";
import { lesson as independence } from "./independence";
import { lesson as ww1 } from "./ww1";
import { lesson as ww2 } from "./ww2";
import { lesson as rebuilding } from "./rebuilding";
import { lesson as whyhistory } from "./whyhistory";
import { lesson as tools } from "./tools";
import { lesson as massproduction } from "./massproduction";
import { lesson as computers } from "./computers";
import { lesson as internet } from "./internet";
import { lesson as automation } from "./automation";
import { lesson as ai } from "./ai";
import { lesson as jobs } from "./jobs";
import { lesson as humanedge } from "./humanedge";
import { lesson as supply_demand } from "./supply_demand";
import { lesson as scarcity_prices } from "./scarcity_prices";
import type { Lesson } from "../lesson/types";

const ALL: Record<string, Lesson | undefined> = {
  money,
  work,
  savings,
  business,
  equity,
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
  supplydemand,
  commodities,
  gold,
  stocks,
  bonds,
  stocksvsbonds,
  derivatives,
  philanthropy,
  whygovernment,
  elections,
  democracy,
  monarchy,
  dictatorship,
  capitalism,
  communism,
  powertriangle,
  mughals,
  spicetrade,
  britishinindia,
  independence,
  ww1,
  ww2,
  rebuilding,
  whyhistory,
  tools,
  massproduction,
  computers,
  internet,
  automation,
  ai,
  jobs,
  humanedge,
  supply_demand,
  scarcity_prices,
};

import type { AgeGroup } from "../progress";
import { SENIOR_LESSONS } from "./senior";

const SENIOR: Record<string, Lesson> = { ...SENIOR_LESSONS };

export function registerSeniorLesson(id: string, lesson: Lesson): void {
  SENIOR[id] = lesson;
}

export function getLesson(id: string, ageGroup?: AgeGroup): Lesson | undefined {
  if (ageGroup === "senior" && SENIOR[id]) {
    return SENIOR[id];
  }
  return ALL[id];
}

export function hasLesson(id: string, ageGroup?: AgeGroup): boolean {
  if (ageGroup === "senior" && SENIOR[id]) {
    return true;
  }
  return ALL[id] !== undefined;
}
