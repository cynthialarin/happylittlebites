

## Plan: Auto-Save Reactions to Child's Known Allergies + Warnings

### Current State
- The Tracker already captures `reaction` (text) and `reactionSeverity` when logging a meal, and saves it to `diary_entries`.
- However, **nothing happens with that data** — it doesn't warn parents when they try to log the same food again, and it doesn't auto-add the food to the child's `knownAllergies` list.
- The severity selector (`formSeverity`) exists in state but is **never shown in the UI** — the parent can only type free-text in the "Any reaction?" field.

### Changes

#### 1. Tracker — Add Severity Selector UI
When the parent types anything in the "Any reaction?" field, reveal a severity picker (none / mild / moderate / severe) with color-coded buttons so the reaction is properly categorized.

#### 2. Tracker — Auto-add to Known Allergies on Reaction
After saving an entry with a non-"none" severity:
- Show a confirmation dialog: "It looks like {child} had a reaction to {food}. Would you like to add it to their known allergies?"
- If confirmed, call `updateChild()` to append the food to `knownAllergies` array, persisting to the database.

#### 3. Tracker — Warn When Logging a Known Reactive Food
When the parent types a food name in the "Log a Meal" form:
- Check if that food appears in any previous diary entry with a non-"none" reaction severity for this child.
- Also check `activeChild.knownAllergies`.
- If found, show a yellow/orange warning banner: "⚠️ {child} had a reaction to this food on {date}. Severity: {level}."
- The parent can still proceed (not blocked), but they're informed.

#### 4. Diary Entry Display — Show Severity Badge
In the diary list, when an entry has a non-"none" severity, show a small colored badge (yellow for mild, orange for moderate, red for severe) next to the reaction text.

### Files to Modify
- `src/pages/Tracker.tsx` — Severity picker UI, warning banner, auto-add prompt, severity badge in list

### No database changes needed
All fields (`reaction`, `reaction_severity`, `known_allergies`) already exist.

