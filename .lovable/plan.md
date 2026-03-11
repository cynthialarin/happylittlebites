

# Phase 4.5: Editable Diary Entries + Expanded Acceptance Emojis + Serving Tips Research

## What the User Asked For

1. **Edit diary entries** — currently entries can only be deleted, not edited. Add full edit capability (food name, meal type, acceptance, texture, reaction, photo).
2. **More acceptance emojis** — currently only 3 (`loved: 😍`, `okay: 😐`, `refused: 😤`). Expand to 5-6 options for more nuanced feedback.
3. **Deep-researched serving tips** — ensure all 150+ foods in the library have thorough, guideline-compliant serving tips (AAP, Health Canada, FDA, CDC 2024-2025).

---

## Implementation Plan

### 1. Add `updateDiaryEntry` to AppContext

- Add `updateDiaryEntry: (entry: DiaryEntry) => void` to `AppContextType` interface
- Implement it in AppContext: update state + persist to database (matching the pattern of `addDiaryEntry` / `removeDiaryEntry`)

### 2. Expand AcceptanceLevel to 5 options

- Update `src/types/index.ts`: change `AcceptanceLevel` from `'loved' | 'okay' | 'refused'` to `'loved' | 'liked' | 'okay' | 'disliked' | 'refused'`
- Update `ACCEPTANCE_EMOJI` in `Tracker.tsx`:
  - `loved: '😍'` (loves it)
  - `liked: '😊'` (happy with it)
  - `okay: '😐'` (neutral)
  - `disliked: '😕'` (not a fan)
  - `refused: '😤'` (refused)
- Update the form acceptance picker and diary entry display to use all 5
- Update any other files referencing the old 3-option set (NutritionSummary, WeeklyReport, etc.)

### 3. Add Edit Dialog to Tracker

- Add an "edit" state (`editingEntry: DiaryEntry | null`) to Tracker.tsx
- When tapping an entry row (not the delete button), open the same Log dialog pre-filled with entry data
- On save, call `updateDiaryEntry` instead of `addDiaryEntry`
- Add a small pencil/edit icon to each entry row for discoverability
- Support changing: food name, meal type, acceptance, texture, reaction/severity, photo

### 4. Deep-Research Serving Tips for All Foods

Review and enhance `servingByAge` and `prepTips` across all entries in `src/data/foods.ts` and `src/data/culturalFoods.ts` based on:
- **AAP** (American Academy of Pediatrics) 2024 guidelines
- **Health Canada** complementary feeding guidelines
- **FDA** allergen and mercury advisories
- **CDC** developmental feeding milestones
- **WHO** complementary feeding recommendations

Focus areas by food group:
- **Fruits**: Choking hazard modifications (grapes quartered lengthwise, raw apple cooked/grated for under 3), contact rash vs allergy distinction
- **Vegetables**: Iron absorption pairing tips (vitamin C + iron-rich veggies), nitrate considerations for under 6 months (spinach, beets)
- **Meats**: Iron-rich first foods emphasis, texture progression from puree → shredded → diced, safe internal temperatures
- **Fish**: Mercury levels (FDA Best Choices / Good Choices), Health Canada monthly limits for high-mercury fish
- **Dairy**: Cow milk as drink timing (12mo US, 9-12mo CA), yogurt/cheese OK from 6mo
- **Nuts/Seeds**: Smooth butter thinned into purees, never whole/chunked for under 4, early introduction for allergy prevention
- **Grains**: Iron-fortified cereal emphasis, whole grain introduction, gluten introduction timing

### Summary of File Changes

| File | Change |
|------|--------|
| `src/types/index.ts` | Expand `AcceptanceLevel` to 5 options |
| `src/contexts/AppContext.tsx` | Add `updateDiaryEntry` method |
| `src/pages/Tracker.tsx` | Add edit flow, expand emoji picker to 5, add edit icon on rows |
| `src/data/foods.ts` | Enhance serving tips with deep-researched guidelines |
| `src/data/culturalFoods.ts` | Enhance serving tips with deep-researched guidelines |
| Other files referencing `AcceptanceLevel` | Update to handle 5 options |

