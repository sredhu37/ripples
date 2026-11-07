import type { Lesson } from "../../../lesson/types";
import { lesson as supplydemand } from "./supplydemand.senior";
import { lesson as commodities } from "./commodities.senior";
import { lesson as gold } from "./gold.senior";
import { lesson as stocks } from "./stocks.senior";
import { lesson as bonds } from "./bonds.senior";
import { lesson as stocksvsbonds } from "./stocksvsbonds.senior";
import { lesson as derivatives } from "./derivatives.senior";
import { lesson as philanthropy } from "./philanthropy.senior";
import { lesson as supplyDemand } from "./supply_demand.senior";
import { lesson as scarcityPrices } from "./scarcity_prices.senior";

export const GROUP_3_SENIOR_LESSONS: readonly Lesson[] = [
  supplydemand,
  commodities,
  gold,
  stocks,
  bonds,
  stocksvsbonds,
  derivatives,
  philanthropy,
  supplyDemand,
  scarcityPrices,
] as const;
