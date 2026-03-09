

# Plan: Country-Specific Safety Notes on FoodDetail Page

## Approach
Rather than adding a field to the `FoodEntry` type and modifying all 100+ food entries in `foods.ts`, use a **lookup map** defined directly in `FoodDetail.tsx` that maps food IDs to country-specific safety notes. This is cleaner since only ~8-10 foods have meaningful differences.

## Changes

### `src/pages/FoodDetail.tsx`
Add a `COUNTRY_SAFETY_NOTES` map keyed by food ID, with `US` and `CA` entries. Display a styled card (flag + guideline source) after the choking hazard section when a note exists for the current food + country.

**Foods to include:**

| Food ID | US Note | CA Note |
|---------|---------|---------|
| `yogurt` | Cow milk as a drink: wait until 12 months (AAP). Yogurt/cheese OK from 6mo. | Cow milk as a drink can be introduced 9–12 months (Health Canada). Use pasteurized, homogenized 3.25% M.F. |
| `cheese` | Cow milk drink: 12mo+. Cheese in cooking/on foods OK from 6mo. | Pasteurized cow milk drink OK from 9–12mo per Health Canada. |
| `beef` | Iron-rich foods encouraged as early foods alongside iron-fortified cereals (AAP). | Iron-rich meat is recommended as one of the very first complementary foods at 6 months (Health Canada). Prioritize alongside iron-fortified cereal. |
| `chicken` | Same as beef (US) | Same as beef (CA) |
| `tuna` | Choose "light" tuna (skipjack). FDA Best Choices: 2–3 servings/week for children. Avoid king mackerel, swordfish, shark, tilefish. | Choose light tuna. Health Canada limits fresh/frozen tuna, shark, swordfish, and marlin to max 75g per month for young children. |
| `salmon` | FDA "Best Choice" fish — 2–3 servings/week recommended. Low mercury. | Health Canada recommends fish 2x/week. Salmon is low-mercury — no monthly limit. |
| `liver` | Limit to 1–2 servings/week due to high vitamin A (AAP). | Health Canada also advises limiting liver due to vitamin A. Max 75g per week for young children. |
| `kefir` | Same cow milk note as yogurt (US) | Same cow milk note as yogurt (CA) |

**UI**: A card with country flag, guideline source badge, and the note text. Styled with `bg-sky/10` for US, `bg-destructive/5` for CA to match existing country theming.

### No other files need changes
- Types unchanged (no new field on `FoodEntry`)
- `foods.ts` unchanged
- Country setting already available via `useApp()`

