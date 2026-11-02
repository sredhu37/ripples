import { describe, expect, it } from "vitest";
import { calcMarketing } from "./marketing.toy";

describe("marketing calculations", () => {
  it("calculates 0 cost and profit when no channels active", () => {
    const stats = calcMarketing({ poster: false, coral: false, crier: false });
    expect(stats.cost).toBe(0);
    expect(stats.alerted).toBe(0);
    expect(stats.revenue).toBe(0);
    expect(stats.profit).toBe(0);
  });

  it("calculates single channel metrics", () => {
    const stats = calcMarketing({ poster: true, coral: false, crier: false });
    expect(stats.cost).toBe(2);
    expect(stats.alerted).toBe(4);
    expect(stats.revenue).toBe(8);
    expect(stats.profit).toBe(6);
  });

  it("calculates multiple channels metrics", () => {
    const stats = calcMarketing({ poster: true, coral: true, crier: false });
    expect(stats.cost).toBe(5);
    expect(stats.alerted).toBe(8);
    expect(stats.revenue).toBe(16);
    expect(stats.profit).toBe(11);
  });
});
