import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
import { BackButton } from "./BackButton";

// @ts-expect-error test flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("BackButton", () => {
  it("shows an arrow and the destination, and calls onClick", async () => {
    const onClick = vi.fn();
    const container = document.createElement("div");
    await act(async () => {
      createRoot(container).render(<BackButton label="All lessons" onClick={onClick} />);
    });
    const button = container.querySelector("button")!;
    expect(button.textContent).toBe("← All lessons");
    await act(async () => button.click());
    expect(onClick).toHaveBeenCalledOnce();
  });
});
