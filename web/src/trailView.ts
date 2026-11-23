import { CURRICULUM_GROUPS, LESSONS, type LessonGroup, type LessonMeta } from "./lessons";
import { lessonState, type LessonState, type Progress } from "./progress";

/** Locked stops shown in full after the next stop. The rest collapse into "+N more". */
export const LOCKED_SHOWN = 2;

export interface TrailStop {
  lesson: LessonMeta;
  /** Continuous across groups, starting at 1. */
  number: number;
  state: LessonState;
}

export interface TrailSection {
  group: LessonGroup;
  /** Number of visible lessons in the group. */
  total: number;
  /** Every lesson in the group is locked: show the heading and the count only. */
  muted: boolean;
  stops: TrailStop[];
  /** Locked lessons of this group that are not shown in full. */
  moreLocked: number;
}

/**
 * Group sections for the trail. `order` is the kid's visible lesson order (Paused lessons
 * already removed). Disabled lessons are left out; a group with no lesson left is dropped.
 */
export function buildTrail(progress: Progress, order: string[]): TrailSection[] {
  const visible = new Set(order.filter((id) => !progress.disabledLessons?.includes(id)));
  let number = 0;
  let lockedShown = 0;
  const sections: TrailSection[] = [];
  for (const group of CURRICULUM_GROUPS) {
    const all: TrailStop[] = [];
    for (const id of group.lessonIds) {
      const lesson = LESSONS.find((l) => l.id === id);
      if (!lesson || !visible.has(id)) continue;
      number += 1;
      all.push({ lesson, number, state: lessonState(progress, order, id) });
    }
    if (all.length === 0) continue;
    if (all.every((s) => s.state === "locked")) {
      sections.push({ group, total: all.length, muted: true, stops: [], moreLocked: all.length });
      continue;
    }
    const stops = all.filter((s) => {
      if (s.state !== "locked") return true;
      if (lockedShown >= LOCKED_SHOWN) return false;
      lockedShown += 1;
      return true;
    });
    sections.push({
      group,
      total: all.length,
      muted: false,
      stops,
      moreLocked: all.length - stops.length,
    });
  }
  return sections;
}
