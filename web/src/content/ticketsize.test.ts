import { describe, expect, it } from "vitest";
import { calcRequiredVolume, calcTicketRevenue } from "./ticketsize.toy";

describe("ticketsize calculations", () => {
  it("calculates total revenue from price and volume", () => {
    expect(calcTicketRevenue(1, 30)).toBe(30);
    expect(calcTicketRevenue(30, 1)).toBe(30);
    expect(calcTicketRevenue(6, 4)).toBe(24);
  });

  it("calculates required customer volume for a target revenue", () => {
    expect(calcRequiredVolume(24, 1)).toBe(24);
    expect(calcRequiredVolume(24, 6)).toBe(4);
    expect(calcRequiredVolume(24, 12)).toBe(2);
  });
});
