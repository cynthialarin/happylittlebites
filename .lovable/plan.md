

## Plan: Add Edit Child Profile Functionality

### Current State
The ChildProfiles page only supports **adding**, **deleting**, and **setting active** child profiles. There is no way to edit an existing child's name, birthdate, gender, feeding approach, avatar, or known allergies. The `updateChild` function already exists in AppContext, and is currently only used for photo uploads.

### Changes

#### `src/pages/ChildProfiles.tsx`
1. **Add an "Edit" button** (pencil icon) to each child card, next to the existing Set Active / Delete buttons.
2. **Add an Edit Dialog** that pre-fills with the selected child's current data:
   - **Name** — text input
   - **Date of birth** — date input
   - **Gender** — boy/girl/neutral selector (reuse existing `GENDER_OPTIONS`)
   - **Avatar** — emoji picker (reuse existing `AVATARS` grid)
   - **Feeding approach** — BLW / Purees / Combo selector
   - **Known allergies** — multi-select checkboxes for top allergens (from `TOP_9_ALLERGENS`)
3. **Save handler** calls `updateChild()` with the modified profile, shows a success toast.
4. Reuse the same form field components already used in the Add dialog to keep UI consistent.

### No other files need changes
- `updateChild` in AppContext already handles syncing to the database.
- No schema changes needed — all fields already exist on the `children` table.

