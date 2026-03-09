

# Plan: Country-Specific Guidelines (US / Canada)

## Research Summary

After reviewing Health Canada (CPS/Dietitians of Canada joint statement), AAP/CDC guidelines, and FDA advisories, here are the meaningful differences that affect our app:

| Topic | US (AAP/CDC) | Canada (Health Canada/CPS) |
|-------|-------------|---------------------------|
| Cow milk as drink | 12+ months only | 9-12 months OK |
| Priority allergens | Top 9 | Top 11 (adds mustard, sulphites) |
| First foods priority | Flexible order, iron-rich encouraged | Iron-rich meat/alternatives FIRST |
| Milk fat type | "Whole milk" | "Homogenized 3.25% M.F." |
| Fish mercury | FDA Best/Good Choices list | Limit tuna/shark/swordfish to 75g/month |
| Texture by 9mo | General guidance | Explicitly required |
| Vitamin D supplement | 400 IU for breastfed | 400 IU (10 µg) for all breastfed — more emphasized |

## Implementation Approach

### 1. Add Country Setting

- Add `country: 'US' | 'CA'` to `AppSettings` type in `src/types/index.ts`
- Add country selector to Onboarding (step 1, before child profile) with US/Canada flags
- Add country toggle in a Settings/More page for later changes
- Default: `'US'`

### 2. Country-Aware First 100 Foods Tips

Update `src/data/first100foods.ts`:
- Add optional `tipCA` field to `First100Food` interface
- For foods where guidance differs, provide Canada-specific tips
- Key differences to encode:
  - **Yogurt/Cheese/Dairy**: CA tip mentions cow milk drink OK from 9-12mo; US says 12mo+
  - **Tuna/Fish**: CA mentions 75g/month limit for certain fish; US uses FDA Best Choices
  - **Meat entries**: CA tip emphasizes "recommended as FIRST complementary food"; US is more flexible
  - **Iron-fortified cereal**: CA strongly recommends as one of the first foods alongside meat

### 3. Country-Aware Allergen Tracker

- Add mustard and sulphites to the allergen system for Canadian users
- In `src/types/index.ts`, expand `TOP_9_ALLERGENS` concept to support `TOP_11_ALLERGENS_CA`
- In `src/data/allergens.ts`, add `AllergenInfo` entries for mustard and sulphites
- Conditionally show 9 allergens (US) or 11 allergens (CA) based on country setting
- Update `AllergenTracker.tsx` to filter allergens by country

### 4. Country-Specific Safety Notes

In `src/data/foods.ts`, add an optional `safetyNotesCA` field to `FoodEntry` for entries where Canadian guidance differs (primarily cow milk introduction age and fish/mercury advice).

### 5. Display Logic

- `First100Foods.tsx`: Show `tipCA` when country is `'CA'`, otherwise show `tip`
- `FoodDetail.tsx`: Show country-specific safety notes
- `AllergenTracker.tsx`: Show 9 or 11 allergens based on country
- `CaregiverShare.tsx`: Include country-appropriate allergen list
- `MealSuggestions.tsx`: Pass country to edge function for context

## Files to Create/Edit

| File | Action |
|------|--------|
| `src/types/index.ts` | Add `country` to `AppSettings`, add CA allergen types |
| `src/data/first100foods.ts` | Add `tipCA` field with Canada-specific tips |
| `src/data/allergens.ts` | Add mustard + sulphites entries |
| `src/data/foods.ts` | Add `safetyNotesCA` to key entries |
| `src/contexts/AppContext.tsx` | Persist country setting |
| `src/pages/Onboarding.tsx` | Add country selector step |
| `src/pages/First100Foods.tsx` | Show country-specific tips |
| `src/pages/AllergenTracker.tsx` | Filter allergens by country |
| `src/pages/FoodDetail.tsx` | Show country-specific notes |
| `src/pages/MoreMenu.tsx` | Add country toggle option |
| `supabase/functions/suggest-meals/index.ts` | Accept country param for context |

## Key Country-Specific Tips (Examples)

**Tuna (CA):** "Choose light tuna. Health Canada recommends limiting fresh/frozen tuna, shark, swordfish, and marlin to max 75g per month for young children."

**Beef/Chicken/Meat (CA):** "Iron-rich meat is recommended by Health Canada as one of the very first complementary foods at 6 months — prioritize alongside iron-fortified cereal."

**Yogurt (CA):** "Full-fat plain yogurt from 6 months. Cow milk as a drink can be introduced from 9-12 months per Health Canada (use pasteurized, homogenized 3.25% M.F.)."

**Yogurt (US):** "Full-fat plain yogurt from 6 months. Cow milk as a drink should wait until 12 months per AAP."

No database migrations needed — all changes are frontend data and settings.

