import { describe, expect, it } from "vitest";
import { OVEN_COST, plan, SALES_PER_WEEK } from "./loans";

describe("loans toy maths", () => {
  it("adds 1 extra coin per 10 coins per 4 weeks", () => {
    expect(plan(40, 4).extra).toBe(4);
    expect(plan(40, 8).extra).toBe(8);
    expect(plan(80, 20).extra).toBe(40);
  });

  it("rounds the weekly payment up to whole coins", () => {
    expect(plan(40, 12)).toMatchObject({ total: 52, weekly: 5 });
  });

  it("40 coins over 4 weeks is too much each week, over 8 weeks it works", () => {
    expect(plan(40, 4).covered).toBe(false);
    expect(plan(40, 4).shortBy).toBe(11 - SALES_PER_WEEK);
    expect(plan(40, 8).covered).toBe(true);
  });

  it("less than the oven price does not buy the oven", () => {
    expect(plan(OVEN_COST - 10, 8).ovenBought).toBe(false);
    expect(plan(OVEN_COST, 8).ovenBought).toBe(true);
    expect(plan(60, 8).leftOver).toBe(20);
  });
});
