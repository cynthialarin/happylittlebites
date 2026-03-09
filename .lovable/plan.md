

# Plan: AI Meal Suggestions + Recipe Expansion

## 1. AI-Powered "What Should My Baby Eat Today?"

### Edge Function: `suggest-meals`
Create `supabase/functions/suggest-meals/index.ts` that:
- Accepts child age, recent diary entries (last 7 days), known allergies, foods tried, and feeding approach
- Calls Lovable AI (gemini-3-flash-preview) with a pediatric nutrition system prompt
- Returns 3 meal suggestions (breakfast, lunch, dinner) with food names, recipes, and reasoning
- Uses tool calling for structured JSON output (meal name, recipe id if matching, why it's suggested)

### Frontend: Dashboard Widget
- Add a new card on `Dashboard.tsx` below "Try Today" section
- "What should we eat today?" card with a sparkle icon and "Get Suggestions" button
- On click, calls the edge function with the child's context
- Shows loading state, then renders 3 meal cards with recipe links where applicable
- Suggestions are personalized: avoids known allergens, prioritizes untried foods, considers age-appropriate textures

### Frontend: Standalone Page (optional quick access)
- Add `/suggestions` route with the same AI meal suggestion UI but full-page
- Accessible from Dashboard card and from the "More" menu

## 2. Expand Recipe Database to 100+

### File: `src/data/recipes.ts`
Expand from current 32 recipes to **100+ recipes** organized across all categories:

| Category | Current | Target | New Additions |
|----------|---------|--------|---------------|
| Breakfast | 7 | 16 | Egg cups, smoothie bowls, porridge variations, mini crêpes, shakshuka |
| Lunch | 6 | 18 | Wraps, rice bowls, pasta bakes, soup varieties, stuffed peppers, mini pizzas |
| Dinner | 6 | 20 | Curries (dal, Thai), fish pies, risotto, pasta dishes, slow cooker meals, sheet pan dinners |
| Snacks | 5 | 18 | Crackers, fruit leather, yogurt bark, oat bars, veggie chips, cheese bites |
| Smoothies | 3 | 10 | Berry blast, tropical, iron-booster, green varieties, oat smoothies |
| Batch Cooking | 5 | 18 | Freezer burritos, soup cubes, sauce bases, grain bowls, casseroles |

Focus areas for new recipes:
- **Cultural diversity**: Indian dal, Japanese miso soup, Mexican beans, Mediterranean, Thai
- **Quick weeknight** (under 15 min): many new 5-10 min recipes
- **Daycare lunchbox**: portable, no-reheat options
- **Common allergen introduction**: recipes designed to introduce each of the top 9
- Each recipe follows the existing `Recipe` type exactly

## Files to Create/Edit

| File | Action |
|------|--------|
| `supabase/functions/suggest-meals/index.ts` | Create — AI meal suggestion edge function |
| `src/pages/MealSuggestions.tsx` | Create — full-page AI suggestions view |
| `src/pages/Dashboard.tsx` | Edit — add AI suggestion card |
| `src/App.tsx` | Edit — add `/suggestions` route |
| `src/pages/MoreMenu.tsx` | Edit — add link to suggestions |
| `src/data/recipes.ts` | Edit — expand to 100+ recipes |

## Technical Notes

- Uses `LOVABLE_API_KEY` (already configured) via the Lovable AI Gateway
- Structured output via tool calling to ensure consistent response format
- Edge function is non-streaming (invoke pattern) since we just need a JSON response
- No new database tables needed — suggestions are ephemeral
- Recipe expansion is purely static data, no migration needed

