

## UX Audit & Simplification Plan

### Problems Identified

1. **Dashboard is overwhelming** — 10+ vertically stacked widgets (XP bar, stats, nutrition goals, weekly challenge, allergen progress, nutrition scorecard, nutrition summary, texture progression, reintroduction tracker, try today, AI CTA, quick actions). A new parent lands here and sees walls of empty/zero data with no clear next step.

2. **Duplicate child header** — The child name + avatar already shows in the persistent top bar (Layout), but the Dashboard repeats it as a large header block, wasting prime screen space.

3. **Redundant nutrition data** — Three separate widgets (NutritionGoals, NutritionScorecard, NutritionSummary) all display food group breakdowns on the same page.

4. **No empty-state guidance** — When a parent first arrives with zero diary entries, every widget shows "0/0" with no call-to-action explaining *what to do first*.

5. **More menu is a flat list of 14 items** — No grouping or visual hierarchy. Hard to scan and find what you need.

6. **Key action buried** — "Log a Meal" (the core daily action) requires navigating to Tracker, then tapping "+". There's no prominent shortcut from the Dashboard.

---

### Changes

#### 1. Dashboard — New User Welcome State
When `diary` has 0 entries for the active child, replace the data-heavy dashboard with a friendly "Getting Started" card showing 3 numbered steps:
- Step 1: Log your first meal (button → opens Tracker)
- Step 2: Check the Food Library for ideas
- Step 3: Start introducing allergens

Below that, keep only the AI Suggestion CTA and Quick Actions grid.

#### 2. Dashboard — Remove Duplicate Header
Remove the child avatar + name block at lines 87-99 since the Layout top bar already shows this persistently.

#### 3. Dashboard — Collapse Advanced Widgets
Group NutritionScorecard, NutritionSummary, TextureProgression, and ReintroductionTracker under a collapsible "Detailed Insights" section (using Collapsible). This keeps the main dashboard focused on: Stats → Nutrition Goals → Weekly Challenge → Allergen Progress → Try Today → AI CTA → Quick Actions.

#### 4. Dashboard — Add Floating "Log Meal" FAB
Add a prominent floating action button (bottom-right, above the nav bar) with a "+" icon that navigates directly to the Tracker with the add dialog pre-opened (via URL param or state).

#### 5. More Menu — Group Items with Section Headers
Organize the 14 items into 4 labeled groups:
- **Daily Tools**: First 100 Foods, AI Meal Ideas, Meal Planner, Grocery List
- **Tracking**: Growth Tracker, Achievements, Allergen Tracker, Saved Recipes
- **Learning**: Picky Eater Toolkit, Safety Reference, Milestones
- **Account**: Caregiver Share, Child Profiles, Data & Privacy

#### 6. Tracker — Surface "Add" Button More Prominently
Ensure the Tracker page has a large, obvious "Log a Meal" button at the top (not just a small "+" icon), with helper text for first-time users.

---

### Files to Modify
- `src/pages/Dashboard.tsx` — Empty state, remove duplicate header, collapsible insights, FAB
- `src/pages/MoreMenu.tsx` — Grouped sections with headers
- `src/pages/Tracker.tsx` — More prominent add button with helper text
- `src/components/Layout.tsx` — Add floating action button in the nav area

