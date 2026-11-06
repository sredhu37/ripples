import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { MeanwhileCard } from "./MeanwhileCard";
import { LessonRunner } from "../lesson/LessonRunner";
import { getLesson } from "../content";
import { LESSONS } from "../lessons";
import { MEANWHILE } from "../timeline/meanwhile";

// @ts-expect-error test flag
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

async function mount(node: React.ReactElement) {
  const c = document.createElement("div");
  document.body.appendChild(c);
  const root = createRoot(c);
  await act(async () => root.render(node));
  return c;
}

async function setYear(c: HTMLElement, year: number) {
  const input = c.querySelector<HTMLInputElement>("input[type=range]")!;
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
  await act(async () => {
    setter?.call(input, String(year));
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

describe("MeanwhileCard", () => {
  it("starts empty and fills as the slider moves", async () => {
    const c = await mount(<MeanwhileCard meanwhile={MEANWHILE.ww2} lang="en" ageGroup="junior" />);
    expect(c.textContent).toContain("Meanwhile around the world");
    expect(c.querySelectorAll(".timeline-card")).toHaveLength(0);
    await setYear(c, 1943);
    expect(c.textContent).toContain("The Bengal famine");
    await setYear(c, 1950);
    expect(c.textContent).toContain("India becomes independent");
  });

  it("shows senior text for the senior tier and German when asked", async () => {
    const c = await mount(<MeanwhileCard meanwhile={MEANWHILE.ww2} lang="de" ageGroup="senior" />);
    expect(c.textContent).toContain("Waehrenddessen in der Welt");
    expect(c.textContent).toContain("Quit-India-Bewegung");
  });

  it("appears in the lesson runner after the real life card", async () => {
    const meta = LESSONS.find((l) => l.id === "ww2")!;
    const base = getLesson("ww2")!;
    const text = { en: "a", de: "b", pl: "c" };
    const choice = {
      kind: "choice" as const,
      prompt: text,
      options: [{ text, correct: true }, { text: { en: "x", de: "y", pl: "z" } }],
      hint: text,
    };
    const lesson = {
      ...base,
      story: [{ text, scene: "x" }],
      Toy: ({ onDone }: { onDone?: () => void }) => <button type="button" className="toy-done" onClick={onDone}>go</button>,
      questions: [choice, choice, choice],
    };
    const c = await mount(
      <LessonRunner lesson={lesson} meta={meta} lang="en" alreadyDone={false} onBadge={() => {}} onExit={() => {}} />,
    );
    let toyClicked = false;
    for (let i = 0; i < 40 && !c.querySelector(".meanwhile"); i++) {
      const toy = c.querySelector<HTMLButtonElement>(".toy-done");
      if (toy && !toyClicked) {
        toyClicked = true;
        await act(async () => toy.click());
        continue;
      }
      const pick =
        c.querySelector<HTMLButtonElement>(".choice:not([disabled])") ??
        Array.from(c.querySelectorAll<HTMLButtonElement>("button.btn:not(.btn-quiet)")).find((b) => !b.disabled);
      if (!pick) break;
      await act(async () => pick.click());
    }
    expect(c.querySelector(".meanwhile")).not.toBeNull();
    expect(c.textContent).toContain("Meanwhile around the world");
  });
});
