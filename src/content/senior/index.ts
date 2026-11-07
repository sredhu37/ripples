import { lesson as moneySenior } from "./group1/money.senior";
import { lesson as workSenior } from "./group1/work.senior";
import { lesson as savingsSenior } from "./group1/savings.senior";
import { lesson as businessSenior } from "./group1/business.senior";
import { lesson as equitySenior } from "./group1/equity.senior";
import { lesson as loansSenior } from "./group1/loans.senior";
import { lesson as banksSenior } from "./group1/banks.senior";
import { lesson as interestSenior } from "./group1/interest.senior";
import { lesson as taxesSenior } from "./group1/taxes.senior";
import { lesson as inflationSenior } from "./group1/inflation.senior";
import { lesson as printingSenior } from "./group1/printing.senior";
import { lesson as ratesSenior } from "./group1/rates.senior";
import { GROUP_2_SENIOR_LESSONS } from "./group2";
import { GROUP_3_SENIOR_LESSONS } from "./group3";
import { group4Lessons } from "./group4";
import { GROUP_5_SENIOR_LESSONS, group5Lessons } from "./group5";
import { GROUP_6_SENIOR_LESSONS, group6Lessons } from "./group6";
import type { Lesson } from "../../lesson/types";

export const GROUP_4_SENIOR_LESSONS: Lesson[] = Object.values(group4Lessons);

export const GROUP_1_SENIOR_LESSONS: Lesson[] = [
  moneySenior,
  workSenior,
  savingsSenior,
  businessSenior,
  equitySenior,
  loansSenior,
  banksSenior,
  interestSenior,
  taxesSenior,
  inflationSenior,
  printingSenior,
  ratesSenior,
];

export { GROUP_2_SENIOR_LESSONS, GROUP_3_SENIOR_LESSONS, GROUP_5_SENIOR_LESSONS, group5Lessons, GROUP_6_SENIOR_LESSONS, group6Lessons };

export const ALL_SENIOR_LESSONS: Lesson[] = [
  ...GROUP_1_SENIOR_LESSONS,
  ...GROUP_2_SENIOR_LESSONS,
  ...GROUP_3_SENIOR_LESSONS,
  ...GROUP_4_SENIOR_LESSONS,
  ...GROUP_5_SENIOR_LESSONS,
  ...group6Lessons,
];

export const SENIOR_LESSONS: Record<string, Lesson> = {};
for (const l of ALL_SENIOR_LESSONS) {
  SENIOR_LESSONS[l.id] = l;
}
