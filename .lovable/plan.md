

# What's Already Built vs. What Needs Building

## Already Done
| Feature | Status |
|---|---|
| "What should my baby eat today?" button on Dashboard | **Done** — navigates to `/suggestions` with AI-powered Gemini suggestions |
| AI Meal Suggestions (age, allergies, feeding approach, recent foods, preferences) | **Done** — `suggest-meals` edge function |
| AI Meal Scanner ("Log My Baby's Plate") | **Done** — `MealScanner.tsx` + `scan-plate` edge function |
| Allergen Introduction Coach (track exposure, log reactions, avoid repeats) | **Done** — `AllergenTracker.tsx` with guided protocol |
| Nutrition Balancer (food group tracking, iron-rich prioritization) | **Done** — `NutritionGoals.tsx`, `NutritionScorecard.tsx` |
| Save meal button | **Done** — saves to `saved_recipes` table |
| Mark baby reaction (love/neutral/dislike) | **Done** — just added in FoodDetail "Mark as Tried" dialog |
| First 100 Foods tracker | **Done** |
| Food safety / choking risk / allergen info per food | **Done** — full food library with age-gated details |

## What Needs Building

### 1. Upgrade the "What should my baby eat?" button (Dashboard prominence + richer output)
The button exists but is a small card buried in the dashboard. The request wants a **large prominent button**. Also, the current AI output only returns a title + short description — it lacks **preparation instructions, choking risk, allergen info, nutrition highlights, prep time, and serving size**.

**Changes:**
- **Dashboard.tsx** — Make the AI CTA much larger and more prominent (hero-style gradient button)
- **`suggest-meals` edge function** — Expand the tool schema to return: `prepInstructions`, `chokingRisk`, `allergenInfo`, `nutritionHighlights`, `prepTime`, `servingSize` per suggestion. Also change categories to: quick snack, balanced meal, iron-rich option.
- **MealSuggestions.tsx** — Redesign suggestion cards to display the expanded fields (collapsible detail sections)

### 2. Fridge Scanner (new feature)
A new "Scan My Fridge" button that uses the existing `scan-plate` vision AI pattern but with a different prompt — detect raw ingredients instead of prepared foods, store them temporarily, and feed them into the meal suggestion engine.

**Changes:**
- **New edge function: `supabase/functions/scan-fridge/index.ts`** — Uses Gemini 2.5 Flash vision to identify raw ingredients from a photo
- **New component: `src/components/FridgeScanner.tsx`** — Camera capture dialog, shows detected ingredients as editable chips
- **`MealSuggestions.tsx`** — Add "Scan My Fridge" button; pass detected ingredients to the `suggest-meals` function
- **`suggest-meals` edge function** — Accept optional `availableIngredients` parameter and prioritize meals using those ingredients
- **`supabase/config.toml`** — Add `scan-fridge` function entry

### 3. Fun Loading Experience
Current loading is basic skeleton cards. The request wants sub-5-second generation with fun progress.

**Changes:**
- **MealSuggestions.tsx** — Replace skeleton loading with animated progress steps: "🔍 Checking food diary...", "🧠 Analyzing nutrition gaps...", "👨‍🍳 Creating perfect meals...", "✨ Almost ready!" with a progress bar

## Files to Change
- `src/pages/Dashboard.tsx` — Enlarge AI CTA button
- `src/pages/MealSuggestions.tsx` — Richer cards, fridge scanner integration, fun loading
- `supabase/functions/suggest-meals/index.ts` — Expanded output schema + `availableIngredients` param
- `supabase/functions/scan-fridge/index.ts` — **New** edge function for ingredient detection
- `src/components/FridgeScanner.tsx` — **New** camera + ingredient review component
- `supabase/config.toml` — Add `scan-fridge` entry

## Technical Details

**Expanded suggest-meals tool schema** adds per-suggestion fields:
```
prepInstructions (string), chokingRisk (low/medium/high), 
allergenInfo (string), nutritionHighlights (string[]),
prepTimeMinutes (number), servingSize (string)
```
Categories change from breakfast/lunch/dinner/snack to: `quick-snack`, `balanced-meal`, `iron-rich`.

**Fridge scanner** reuses the `scan-plate` pattern (camera → compress → base64 → Gemini vision) with a different prompt asking for raw ingredient identification. Ingredients stored in component state (not DB) and passed to `suggest-meals`.

