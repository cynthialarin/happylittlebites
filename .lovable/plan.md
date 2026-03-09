

# Responsive Design Review — All Device Sizes

## Findings

I tested the Auth page visually at four viewports (iPhone 390x844, Samsung 360x740, iPad 768x1024, Desktop 1440x900) and reviewed the code for all major pages. Here is the assessment:

### Auth Page — All Good
- Centered card with `max-w-md`, works perfectly at all sizes. No issues found.

### Layout / Navigation — Minor Issue on Desktop
- The bottom nav bar uses `max-w-lg` (32rem / 512px), which is fine for mobile but looks narrow and awkward on desktop/tablet where users expect a sidebar or top nav.
- **Not a bug** — this is a mobile-first app — but on desktop the content area is narrow (max-w-lg = 512px) and the bottom nav stretches full width while its inner content is capped. This is acceptable for the app's mobile-first design.

### Dashboard — Fine
- Uses `max-w-lg mx-auto`. All grids (3-col stats, 6-col rainbow, 2-col quick actions) scale well. No overflow issues.

### Food Library — Fine
- 2-col grid with horizontal filter pills that scroll. Works on all sizes.

### Tracker (Food Diary) — Minor Issue
- The delete button uses `opacity-0 group-hover:opacity-100` — this means on **mobile/touch devices**, the delete button is invisible and inaccessible since there's no hover state. Users on phones/tablets can't delete diary entries.

### Meal Planner — Fine
- Uses `ScrollArea` with horizontal scroll for the 7-day grid (`minWidth: 700px`). Works on all sizes with the scroll bar.

### Picky Recipes — Fine  
- 3-col food grid, horizontal scrolling food group tabs. All good.

### Dialogs — Fine
- All dialogs use `max-w-md mx-4`, which works across viewports.

## Issues to Fix

1. **Tracker delete button invisible on mobile** — The trash icon on diary entries uses hover-only visibility (`opacity-0 group-hover:opacity-100`). On touch devices, there is no hover, so users cannot access the delete button. Fix: make the delete button always visible (or use a swipe gesture / long-press pattern).

## Optional Improvements (Not Bugs)

2. **Desktop layout enhancement** — On screens wider than ~768px, the app could benefit from a wider content area or sidebar nav instead of bottom tab bar. However, this is a design decision and the current mobile-first approach is consistent and functional.

## Plan

Only one fix is needed:

**File: `src/pages/Tracker.tsx` (line 135)**
- Change the delete button from `opacity-0 group-hover:opacity-100` to always visible with reduced emphasis (e.g., `opacity-40 hover:opacity-100` or just always show at lower visual weight).

