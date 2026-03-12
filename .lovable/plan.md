

# Fix "Mark as Tried" — Add Quick-Log Dialog

## Problem
The "Mark as Tried" button silently logs the food with hardcoded defaults (`acceptance: 'okay'`, `reactionSeverity: 'none'`, `textureStage: 'purees'`). No UI lets the parent select how the baby reacted — acceptance emoji, reaction severity, meal type, or notes.

## Solution
Replace the silent one-click log with a **bottom sheet / dialog** that appears when tapping "Mark as Tried". It collects:

1. **Acceptance level** — 5 emoji buttons: 😍 Loved, 😊 Liked, 😐 Okay, 😕 Disliked, 😤 Refused
2. **Reaction check** — "Any reaction?" toggle → if yes, severity selector (Mild / Moderate / Severe) + optional symptom notes
3. **Meal type** — Quick pills: Breakfast, Lunch, Dinner, Snack (default: Snack)
4. **Save button** — Logs the entry with selected values

### Changes
- **`src/pages/FoodDetail.tsx`** — Replace `handleMarkAsTried` with state to open a dialog. Add a `Dialog` (or `Drawer` for mobile feel) component inline with the emoji/reaction selectors. On save, call `addDiaryEntry` with user-selected values.

### UI Layout (inside dialog)
```text
┌─────────────────────────────┐
│  How did [Baby] like [Food]? │
│                              │
│  😍  😊  😐  😕  😤         │
│                              │
│  Meal: [Bkfst] [Lunch] ...  │
│                              │
│  ☐ Had a reaction            │
│  [if checked: severity pills]│
│  [notes textarea]            │
│                              │
│  [ Save ]                    │
└─────────────────────────────┘
```

No new files needed. Uses existing `Dialog` and `RadioGroup` components. ~60 lines of added JSX.

