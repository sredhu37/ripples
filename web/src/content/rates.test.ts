import { describe, expect, it } from "vitest";
import { START_SIM, jobsOf, stepSim, zoneOf, type Sim } from "./rates";

function run(s: Sim, ticks: number): Sim {
  let cur = s;
  for (let i = 0; i < ticks; i++) cur = stepSim(cur);
  return cur;
}

describe("rates town thermostat", () => {
  it("starts too hot", () => {
    expect(zoneOf(START_SIM.heat)).toBe("hot");
  });

  it("stays hot if the rate is left low", () => {
    expect(zoneOf(run(START_SIM, 200).heat)).toBe("hot");
  });

  it("takes time: raising the rate does not cool the town at once", () => {
    const s = run({ ...START_SIM, rate: 3 }, 2);
    expect(zoneOf(s.heat)).toBe("hot");
    expect(s.felt).toBeLessThan(3);
  });

  it("settles just right at a middle rate", () => {
    const s = run({ ...START_SIM, rate: 3 }, 200);
    expect(zoneOf(s.heat)).toBe("right");
    expect(zoneOf(run({ ...START_SIM, rate: 3 }, 25).heat)).toBe("right");
  });

  it("gets too cold at a very high rate, and jobs drop", () => {
    const s = run({ ...START_SIM, rate: 8 }, 200);
    expect(zoneOf(s.heat)).toBe("cold");
    expect(jobsOf(s.heat)).toBeLessThan(jobsOf(50));
  });
});
