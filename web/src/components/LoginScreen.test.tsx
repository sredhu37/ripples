import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LoginScreen, RESEND_COOLDOWN_S } from "./LoginScreen";

// @ts-expect-error test flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
});

function stubApi(verifyStatus: number) {
  const fetchMock = vi.fn(async (url: string, _init?: RequestInit) =>
    String(url).includes("send-verification-otp")
      ? new Response("{}", { status: 200 })
      : new Response("{}", { status: verifyStatus }),
  );
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

async function type(input: HTMLInputElement, value: string) {
  await act(async () => {
    const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
    set.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

async function mount(onLoggedIn = (_email: string) => {}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    createRoot(container).render(
      <LoginScreen
        lang="en"
        onLang={() => {}}
        onLoggedIn={onLoggedIn}
        onClose={() => {}}
        onLegal={() => {}}
      />,
    );
  });
  return container;
}

async function click(button: Element | null | undefined) {
  await act(async () => {
    (button as HTMLButtonElement).click();
  });
}

const button = (c: HTMLElement, text: string) =>
  [...c.querySelectorAll("button")].find((b) => b.textContent?.startsWith(text));

async function toCodeStep(c: HTMLElement) {
  await type(c.querySelector("#login-email")!, "mum@example.com");
  await click(button(c, "Send my code"));
}

describe("LoginScreen", () => {
  it("asks for the code after the email, with the spam hint and a resend cooldown", async () => {
    vi.useFakeTimers();
    const fetchMock = stubApi(200);
    const c = await mount();
    await toCodeStep(c);
    expect(JSON.parse(fetchMock.mock.calls[0][1]!.body as string)).toEqual({
      email: "mum@example.com",
      type: "sign-in",
    });
    expect(c.textContent).toContain("mum@example.com");
    expect(c.textContent).toContain("spam folder");
    expect(button(c, "Send a new code in")?.disabled).toBe(true);

    // One tick per second: each tick re-renders and sets the next timer.
    for (let s = 0; s < RESEND_COOLDOWN_S; s++) {
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1000);
      });
    }
    expect(button(c, "Send a new code")?.disabled).toBe(false);
  });

  it("logs in with the right code", async () => {
    stubApi(200);
    const onLoggedIn = vi.fn();
    const c = await mount(onLoggedIn);
    await toCodeStep(c);
    await type(c.querySelector("#login-code")!, "123456");
    await click(button(c, "Log in"));
    expect(onLoggedIn).toHaveBeenCalledWith("mum@example.com");
  });

  it("shows an error for a wrong code and for too many tries", async () => {
    stubApi(400);
    const c = await mount();
    await toCodeStep(c);
    await type(c.querySelector("#login-code")!, "000000");
    await click(button(c, "Log in"));
    expect(c.querySelector("[role=alert]")?.textContent).toContain("not right");

    stubApi(403);
    await click(button(c, "Log in"));
    expect(c.querySelector("[role=alert]")?.textContent).toContain("Too many tries");
  });

  it("keeps only digits and needs 6 of them", async () => {
    stubApi(200);
    const c = await mount();
    await toCodeStep(c);
    await type(c.querySelector("#login-code")!, "12a3");
    expect((c.querySelector("#login-code") as HTMLInputElement).value).toBe("123");
    expect(button(c, "Log in")?.disabled).toBe(true);
  });
});
