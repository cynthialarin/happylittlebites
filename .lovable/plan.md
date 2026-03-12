

# Enhance FoodDetail Page with Action Buttons & Fix "Try Today" Logic

## Issues Found

1. **FoodDetail page is read-only** — clicking a food from "Try Today" shows safety/serving info but no actions to actually *do* anything with that food (log it, find recipes, add to grocery list)
2. **"Try Today" filtering is correct** — the `suggestions` memo already filters out `triedIds` (foods in the diary). If foods that have been tried still appear, it's likely because the `foodId` in diary entries doesn't match the food's `id` (e.g., free-text entries from the meal scanner). Worth verifying but the logic itself is sound.

## Plan

### 1. Add Quick Action Buttons to FoodDetail Page

Add a sticky action bar below the food header with:

- **Log to Diary** — navigates to `/tracker` with `prefillFood` state (food name + id pre-filled)
- **View Recipes** — navigates to `/recipes` filtered by this food (match recipes whose ingredients mention this food name)
- **Add to Grocery List** — adds the food directly to the grocery list via `useGroceryList().addItems`
- **Mark as Tried** — quick-log this food to the diary with minimal info (today's date, active child) if they just want to check it off without full details

### 2. Additional Features for This Page

- **"Already Tried" badge** — if the active child has diary entries for this food, show a green "✓ Tried on [date]" badge at the top with acceptance history (e.g., "😍 Loved 3 times, 😐 Okay 1 time")
- **Related Foods** — show 3-4 similar foods from the same food group at the bottom ("Also try...")

### 3. Fix "Try Today" Matching

In `Dashboard.tsx`, the suggestions filter uses `d.foodId` to match against `f.id`. Verify that diary entries logged via the meal scanner and free-text also populate `foodId` correctly. If not, also match against `d.foodName.toLowerCase()` containing `f.name.toLowerCase()`.

### Files to Change

- **`src/pages/FoodDetail.tsx`** — Add action buttons bar, tried-history badge, related foods section
- **`src/pages/Dashboard.tsx`** — Improve "Try Today" filter to also match by food name (not just foodId)

### Technical Details

**Action bar (FoodDetail.tsx):**
- Import `useApp` (already imported), `useGroceryList`, `useNavigate`, `useAuth`
- Sticky bar with 3-4 pill buttons below the food name
- "View Recipes" filters by matching `food.name.toLowerCase()` against recipe ingredient strings
- "Add to Grocery" calls `addItems.mutate([{ name: food.name, source: 'Food Library' }])`

**Tried history:**
- Filter `diary` entries where `foodId === food.id` OR `foodName` contains `food.name`
- Show count and last date with acceptance breakdown

**Related foods:**
- Filter `foods` by same `foodGroup`, exclude current, take 3 random

