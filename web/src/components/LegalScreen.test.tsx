import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LegalScreen } from "./LegalScreen";

// @ts-expect-error test flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
});

async function mount(page: "impressum" | "privacy", lang: "en" | "de" = "en") {
  const container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    createRoot(container).render(
      <LegalScreen
        lang={lang}
        page={page}
        onLang={() => {}}
        onPage={() => {}}
        onClose={() => {}}
      />,
    );
  });
  return container;
}

describe("LegalScreen", () => {
  it("shows the Impressum details the API returns", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json({
          name: "Test Person",
          address: ["Test Street 1", "00000 Testtown"],
          email: "legal@example.com",
          phone: null,
          vatId: null,
        }),
      ),
    );
    const text = (await mount("impressum")).textContent;
    expect(text).toContain("Test Person");
    expect(text).toContain("Test Street 1");
    expect(text).toContain("legal@example.com");
    expect(text).not.toContain("VAT ID");
  });

  it("says the details are missing when the API is down", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("offline");
      }),
    );
    expect((await mount("impressum")).textContent).toContain("not available");
  });

  it("shows the privacy policy in German without calling the API", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const text = (await mount("privacy", "de")).textContent;
    expect(text).toContain("Datenschutzerklärung");
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
