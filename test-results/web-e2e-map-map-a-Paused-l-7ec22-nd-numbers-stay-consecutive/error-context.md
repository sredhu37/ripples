# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web/e2e/map.spec.ts >> map: a Paused lesson is not on the trail and numbers stay consecutive
- Location: web/e2e/map.spec.ts:4:1

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "./", waiting until "load"

```

# Test source

```ts
  81  |   "Leo",
  82  |   "Maya",
  83  |   "Mira",
  84  | ];
  85  | 
  86  | /**
  87  |  * Answers /api/auth/*, /api/family and /api/profiles from memory, like the real API
  88  |  * (shapes from server/apiTypes.ts). The preview server has no API. Starts logged in
  89  |  * with one kid, Ava, unless told otherwise. The real flow is tested in server/*.test.ts.
  90  |  */
  91  | export async function fakeFamily(
  92  |   page: Page,
  93  |   options: { loggedIn?: boolean; kids?: FakeKid[] } = {},
  94  | ): Promise<FakeFamily> {
  95  |   const state: FakeFamily = {
  96  |     loggedIn: options.loggedIn ?? true,
  97  |     profiles: [],
  98  |     writes: [],
  99  |     failWrites: false,
  100 |     sessionExpired: false,
  101 |   };
  102 |   let nextId = 1;
  103 |   const addKid = (kid: FakeKid) => {
  104 |     const used = state.profiles.map((p) => p.avatar);
  105 |     state.profiles.push({
  106 |       id: `00000000-0000-4000-8000-${String(nextId++).padStart(12, "0")}`,
  107 |       nickname: kid.nickname ?? "Ava",
  108 |       avatar: kid.avatar ?? VILLAGERS.find((v) => !used.includes(v)) ?? VILLAGERS[0],
  109 |       lang: kid.lang ?? "en",
  110 |       muted: kid.muted ?? true,
  111 |       badges: kid.badges ?? [],
  112 |       disabledLessons: kid.disabledLessons ?? [],
  113 |     });
  114 |   };
  115 |   for (const kid of options.kids ?? [{}]) addKid(kid);
  116 | 
  117 |   await page.route("**/api/auth/**", async (route) => {
  118 |     const url = route.request().url();
  119 |     const json = (status: number, body: unknown) =>
  120 |       route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
  121 |     if (url.endsWith("/get-session")) {
  122 |       return json(200, state.loggedIn ? { user: { email: "mum@example.com" } } : null);
  123 |     }
  124 |     if (url.endsWith("/send-verification-otp")) return json(200, { success: true });
  125 |     if (url.endsWith("/sign-in/email-otp")) {
  126 |       const { otp } = route.request().postDataJSON() as { otp: string };
  127 |       if (otp !== GOOD_CODE) return json(400, { code: "INVALID_OTP", message: "Invalid OTP" });
  128 |       state.loggedIn = true;
  129 |       return json(200, { token: "t", user: { email: "mum@example.com" } });
  130 |     }
  131 |     if (url.endsWith("/sign-out")) {
  132 |       state.loggedIn = false;
  133 |       return json(200, { success: true });
  134 |     }
  135 |     return json(404, {});
  136 |   });
  137 | 
  138 |   await page.route(/\/api\/(family|profiles)/, async (route) => {
  139 |     const request = route.request();
  140 |     const method = request.method();
  141 |     const path = new URL(request.url()).pathname;
  142 |     const json = (status: number, body: unknown) =>
  143 |       route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
  144 |     if (!state.loggedIn || state.sessionExpired) return json(401, { error: "unauthorized" });
  145 |     if (method === "GET" && path === "/api/family") return json(200, { profiles: state.profiles });
  146 | 
  147 |     const body: unknown = request.postDataJSON();
  148 |     state.writes.push({ method, path, body });
  149 |     if (state.failWrites) return json(500, { error: "failed" });
  150 |     const b = (body ?? {}) as Record<string, unknown>;
  151 | 
  152 |     if (method === "POST" && path === "/api/profiles") {
  153 |       if (state.profiles.length >= 6) return json(409, { error: "profile_limit" });
  154 |       addKid({ nickname: b.nickname as string, avatar: b.avatar as string, muted: false });
  155 |       return json(201, state.profiles[state.profiles.length - 1]);
  156 |     }
  157 |     const [, , , id, rest] = path.split("/");
  158 |     const profile = state.profiles.find((p) => p.id === id);
  159 |     if (!profile) return json(404, { error: "not_found" });
  160 |     if (method === "POST" && rest === "badges") {
  161 |       const lessonId = b.lessonId as string;
  162 |       if (!profile.badges.includes(lessonId)) profile.badges.push(lessonId);
  163 |       return json(200, profile);
  164 |     }
  165 |     if (method === "PATCH") {
  166 |       Object.assign(profile, b);
  167 |       return json(200, profile);
  168 |     }
  169 |     if (method === "DELETE") {
  170 |       state.profiles = state.profiles.filter((p) => p !== profile);
  171 |       return route.fulfill({ status: 204 });
  172 |     }
  173 |     return json(404, { error: "not_found" });
  174 |   });
  175 | 
  176 |   return state;
  177 | }
  178 | 
  179 | /** Opens the app and taps a kid on the picker. */
  180 | export async function openTrail(page: Page, nickname = "Ava") {
> 181 |   await page.goto("./");
      |              ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  182 |   await page.getByRole("button", { name: nickname, exact: true }).click();
  183 | }
  184 | 
  185 | /** Labels from src/i18n.ts that the specs click or check. */
  186 | export const LABEL = {
  187 |   parents: { en: "For parents", de: "Fuer Eltern", pl: "Strefa rodzica" },
  188 |   gateGo: { en: "Open", de: "Oeffnen", pl: "Otwórz" },
  189 |   next: { en: "Next", de: "Weiter", pl: "Dalej" },
  190 |   factCards: { en: "Fact cards", de: "Fakten-Karten", pl: "Karty faktów" },
  191 |   worldTimeline: { en: "World Timeline", de: "Weltzeitleiste", pl: "Oś czasu świata" },
  192 | } as const;
  193 | 
  194 | /** Opens the parent gate from the map and answers the maths question. */
  195 | export async function passParentGate(page: Page, step: () => Promise<void>, lang: Lang = "en") {
  196 |   await page.getByRole("button", { name: LABEL.parents[lang] }).click();
  197 |   const question = page.locator("form.panel p").first();
  198 |   await expect(question).toContainText("×");
  199 |   const [a, b] = ((await question.textContent()) ?? "").match(/\d+/g)!.map(Number);
  200 |   const input = page.getByRole("textbox");
  201 |   await input.fill(String(a * b + 1));
  202 |   await page.getByRole("button", { name: LABEL.gateGo[lang] }).click();
  203 |   await expect(page.getByRole("alert")).toBeVisible();
  204 |   await step();
  205 |   await input.fill(String(a * b));
  206 |   await step();
  207 |   await page.getByRole("button", { name: LABEL.gateGo[lang] }).click();
  208 | }
  209 | 
```