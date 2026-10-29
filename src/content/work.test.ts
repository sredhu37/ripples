import { describe, expect, it } from "vitest";
import { LOW_PAY, NORMAL_PEOPLE, payPerHour, pushes } from "./work";

describe("work toy pay", () => {
  it("is 5 coins for a normal job", () => {
    expect(payPerHour({ years: 2, people: NORMAL_PEOPLE, need: 2 })).toBe(5);
  });

  it("goes up when the job is harder to learn, rarer or more needed", () => {
    const base = { years: 2, people: NORMAL_PEOPLE, need: 2 };
    expect(payPerHour({ ...base, years: 3 })).toBeGreaterThan(payPerHour(base));
    expect(payPerHour({ ...base, people: 2 })).toBeGreaterThan(payPerHour(base));
    expect(payPerHour({ ...base, need: 3 })).toBeGreaterThan(payPerHour(base));
  });

  it("goes down with more people and never below 1 coin", () => {
    expect(payPerHour({ years: 2, people: 7, need: 2 })).toBeLessThan(5);
    expect(payPerHour({ years: 1, people: 7, need: 1 })).toBe(1);
  });

  it("starts the question toy at 1 coin, and a rarer skill pays more", () => {
    expect(payPerHour(LOW_PAY)).toBe(1);
    expect(payPerHour({ ...LOW_PAY, people: 3 })).toBeGreaterThan(1);
  });

  it("shows the direction of each reason", () => {
    expect(pushes({ years: 3, people: 2, need: 1 })).toEqual({ years: "up", people: "up", need: "down" });
    expect(pushes({ years: 2, people: 4, need: 2 })).toEqual({ years: "same", people: "same", need: "same" });
  });
});
