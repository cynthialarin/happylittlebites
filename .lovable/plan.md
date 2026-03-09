

# End-to-End Site Review — Findings & Fix Plan

I've now reviewed every page, component, data file, edge function, and configuration in the project. Here's what I found.

---

## Issues Found

### Critical

1. **`supabase/config.toml` still missing edge function config**
   - Only contains `project_id`. The `[functions.generate-food-image]` block with `verify_jwt = false` was identified in the last audit but never added. This means the edge function may reject unauthenticated requests from the frontend.

### Moderate

2. **`Index.tsx` is a dead placeholder page**
   - Contains generic "Welcome to Your Blank App" text. It's imported in `App.tsx` but never routed to (Dashboard is at `/`). Harmless but messy — should be removed or replaced.

3. **Tracker doesn't expose texture stage selector**
   - The "Log Food" dialog sets `formTexture` to `'purees'` as default but never renders a UI control to change it. Every diary entry is logged as "purees" regardless of the child's actual stage. This breaks the "Texture Master" badge which requires all 5 texture stages.

4. **No confirmation before destructive actions**
   - "Clear Week" in Meal Planner and "Delete" child profile have no confirmation dialog. One tap deletes everything.

5. **Meal Planner auto-fill doesn't respect child's age group**
   - `handleAutoFill` picks random recipes regardless of the child's age. A 6-month-old could get a 2yr recipe (e.g., cheese-spinach-pinwheels with complex textures).

### Minor

6. **Shopping list checkbox is non-functional**
   - The shopping list renders a `<div>` styled as a checkbox but it doesn't toggle — it's purely decorative.

7. **`NotFound` page not reviewed but is minimal** — standard 404, fine as-is.

8. **Diary entries can't be deleted from the UI**
   - `removeDiaryEntry` exists in context but is never called from any component. Users can't undo a mistakenly logged food.

---

## Fix Plan

### 1. Fix config.toml (edge function config)
Add the `[functions.generate-food-image]` block with `verify_jwt = false`.

### 2. Add texture stage selector to Tracker
Add a row of texture buttons (purees, mashed, soft-chunks, finger-foods, regular) in the "Log Food" dialog so the data is accurate and the Texture Master badge is achievable.

### 3. Age-aware meal planner auto-fill
Filter recipes by the active child's age group before randomly selecting. A 6mo child should only get 6mo recipes; a 12mo child can get 6mo, 9mo, and 12mo recipes.

### 4. Add confirmation dialogs for destructive actions
- "Clear Week" → confirm dialog
- "Delete child profile" → confirm dialog

### 5. Add swipe-to-delete or delete button on diary entries
Allow removing diary entries from the Tracker page.

### 6. Make shopping list checkboxes functional
Add local state to track checked items so parents can mark off items while shopping.

### 7. Remove dead `Index.tsx`
Delete the file since it's unused (Dashboard handles `/`).

