# 17. River Trail Design C Redesign

Date: 2026-11-25

## Context

The earlier UI used heavy 3px cartoon borders, a saturated cyan background, and generic stacked cards. The app needed a cohesive, premium visual language tailored for 8 to 12 year old children and their parents.

The chosen direction is Design C ("Illustrated River Stepping-Stone Map"), complemented by tactile micro-interactions from Design B.

## Decision

1. **Color and Tokens**:
   - Canvas: Warm natural parchment (`#F4EFE2`).
   - Surfaces: Crisp white cards (`#FFFFFF`) with subtle warm tinting (`#FAF6ED`).
   - Palette: Deep river teal (`#1C5D67`), warm terracotta (`#D05D3D`), golden amber (`#EDB243`), and meadow green (`#4A7C59`).
   - Borders: Refined 1px solid borders (`rgba(24, 26, 46, 0.12)`) replacing 3px black cartoon strokes.
   - Tactile depth: 3px solid bevel shadow (`box-shadow: 0 3px 0 ...`) with 2px translateY active press states.

2. **Typography**:
   - Headings: Plus Jakarta Sans with weights 700 and 800.
   - Body and controls: Nunito Sans for high legibility on touchscreens.

3. **Mascot (Otto)**:
   - Otto wears a signature terracotta neckerchief (`#D05D3D`) tied with a darker knot (`#B04326`).
   - Rich natural otter tones with smooth ear wiggles, blinking eyes, and breathing animations.

4. **River Trail Map**:
   - Organic winding river backdrop rendered in responsive SVG with bank sand layers, water current marks, pine woods, and coastal village markers.
   - Lesson stops rendered as tactile stepping stones alternating across the stream.
   - Next-up lesson features an active pulse highlight and continue callout.

5. **Panels, Controls, and Lesson Player**:
   - Family settings, adult gate, and progress indicators updated with card surfaces and smooth toggles.
   - Lesson player progress dots use smooth linear fills and terracotta active progress.
   - World map timeline modal styled with refined card surfaces and soft teal water backdrop.

## Consequences

- Visual clarity and brand identity significantly elevated while retaining 100% test compatibility.
- Zero external image assets or heavy dependencies added. All graphics are pure inline vector code.
