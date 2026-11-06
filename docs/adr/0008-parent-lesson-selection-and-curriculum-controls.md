# ADR 0008: Parent Lesson Selection and Curriculum Controls

## Status

Accepted

## Context

Certain educational topics within the curriculum may not align with what parents want their children to explore at a given time or cultural setting. Examples include sensitive historical conflicts (e.g. World Wars) or region-specific historical narratives.

Previously, Ripples followed an unskippable linear path across all 52 lessons. A parent had no mechanism to hide specific lessons without either blocking all subsequent progress or exposing sensitive content.

## Decision

We introduce parent-controlled lesson selection within `ParentPanel`, protected by the existing mathematical challenge gate:

1. **Default State**:
   - All lessons remain enabled by default.
   - We store only explicitly turned-off lesson IDs in `progress.disabledLessons?: string[]`.
   - New lessons added in app updates appear automatically unless explicitly toggled off by parents.

2. **Child Trail and Shelf Filtering**:
   - Disabled lessons are completely hidden from the child's Trail screen.
   - Disabled lessons are hidden from the Badge shelf.
   - Trail stops re-number consecutively (1, 2, 3...) based only on visible lessons, providing a seamless journey with no skipped numbers or locked gaps.

3. **Progression and Badges**:
   - `nextLessonId` and `lessonState` skip disabled lessons.
   - Badges already earned for a lesson that gets disabled are retained in progress storage. If re-enabled later, the lesson immediately returns to its earned state.

4. **Curriculum Grouping in Parent Area**:
   - Toggles are organized into collapsible curriculum group accordions matching the 6 curriculum groups (Money & Work, Business, Markets, Government, History, Technology).
   - Designed for mobile touch interaction with standard pill switches and 48px minimum touch targets.

5. **Backup Save Code Compatibility**:
   - Save codes carry disabled lessons in the payload (`d?: string[]`).
   - Legacy save codes without the field import with all lessons enabled.

## Consequences

- Parents have full autonomy over lesson exposure without child awareness.
- Linear unlock logic adapts dynamically to any subset of active lessons.
- Save code remains compact and fully backward compatible.
