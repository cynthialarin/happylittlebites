

# Picky Toddler Recipe Recommender

## What Exists
The current Picky Eater page is educational only — strategies, sensory play ideas, and age expectations. There's no interactive food preference selector or recipe recommendation engine. The app does have an `ExposureRecord` type tracking food exposures with accepted/refused status, but it's not used for recipe suggestions.

## What to Build

### New Page: "Picky Toddler Recipes" (`/more/picky-recipes`)

**Step 1 — Food Preference Selector**
A visual grid of common ingredients (pulled from the 104-item food library), grouped by food group. Each food shows its emoji and can be tapped to toggle between three states:
- **Loves** (green) — child currently likes this
- **Won't eat** (red) — child refuses this
- **Untried/neutral** (gray, default) — hasn't tried or no strong opinion

Preferences are stored in AppContext (new `foodPreferences` map in state, persisted to localStorage).

**Step 2 — Smart Recipe Matching**
Filter the 32 recipes based on the child's preferences:
- **Safe picks**: Recipes where ALL ingredients match foods the child loves — guaranteed wins
- **Bridge recipes**: Recipes with mostly loved ingredients + 1 refused ingredient hidden in (e.g., spinach blended into a smoothie they'd otherwise love) — follows the "Serve Familiar + New Together" strategy
- Each recipe card shows a match score and highlights which liked/disliked ingredients it contains

**Step 3 — UI Flow**
- Add a new card/button on the existing Picky Eater page linking to the new tool
- The new page has two tabs: "My Child's Preferences" (the selector) and "Recommended Recipes" (the filtered results)
- Recipe cards link to existing RecipeDetail pages

### Data Changes
- Add `foodPreferences: Record<string, Record<string, 'loves' | 'refuses'>>` to `AppState` (keyed by childId, then foodName)
- Add `setFoodPreference` and `clearFoodPreferences` to context
- No database migration needed — localStorage only for now

### Files to Create/Edit
1. **Create** `src/pages/PickyRecipes.tsx` — new page with preference selector + recipe recommender
2. **Edit** `src/contexts/AppContext.tsx` — add foodPreferences state + setter
3. **Edit** `src/types/index.ts` — no new types needed (inline)
4. **Edit** `src/pages/PickyEater.tsx` — add CTA card linking to the new tool
5. **Edit** `src/App.tsx` — add route `/more/picky-recipes`

### Recipe Matching Logic
```text
For each recipe:
  1. Extract ingredient keywords (simple word matching against food names)
  2. Count: loved matches, refused matches, neutral matches
  3. Categories:
     - "Perfect Match" = 0 refused, 2+ loved
     - "Bridge Recipe" = exactly 1 refused, 2+ loved (great for exposure)
     - "Try Something New" = 0 refused, 0 loved (all neutral)
     - Hidden if 2+ refused ingredients
```

