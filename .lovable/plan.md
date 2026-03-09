

# Expand Food Library + Add Meal Planner

## Answer to your question

The 24-food library is **way too limited** — it's not a dietary restriction, it's just incomplete. Babies and toddlers can eat most foods from 6 months onward (with age-appropriate preparation). We should expand to **100+ foods** covering every common food a family might encounter.

## Part 1: Expand Food Library to 100+ Foods

Add ~80 new entries across all food groups, following the existing `FoodEntry` interface (emoji, foodGroup, allergens, chokingHazard, servingByAge, nutritionHighlights, etc.):

- **Fruits (15+ new)**: watermelon, peach, pear, plum, kiwi, cantaloupe, grapes, orange, papaya, raspberry, cherries, fig, dates, coconut, dragonfruit
- **Vegetables (15+ new)**: spinach, zucchini, cauliflower, bell pepper, cucumber, corn, asparagus, green beans, beets, squash, eggplant, mushrooms, kale, tomato, celery, turnip
- **Protein (12+ new)**: turkey, pork, lamb, shrimp, tuna, sardines, liver, duck, bison, cod, crab, lobster
- **Grains (8+ new)**: quinoa, barley, millet, couscous, corn tortilla, polenta, buckwheat, amaranth
- **Dairy (5+ new)**: cottage cheese, cream cheese, butter, kefir, ricotta
- **Legumes (6+ new)**: chickpeas, black beans, kidney beans, edamame, hummus, split peas
- **Nuts/Seeds (6+ new)**: almond butter, cashew butter, sunflower seed butter, chia seeds, flax seeds, hemp seeds
- **Other**: herbs/spices (cinnamon, turmeric, garlic, ginger), avocado oil, olive oil, honey (12mo+)

Each entry includes accurate choking hazard data, age-specific serving guidance, allergen flags, and nutrition highlights.

## Part 2: Build Meal Planner Page

The `MealPlanEntry` type and `mealPlan` state already exist in context. Need to:

**New file: `src/pages/MealPlanner.tsx`**
- Weekly view with 7 day columns (horizontally scrollable on mobile)
- Each day has 4 meal slots: breakfast, lunch, dinner, snack
- Tap a slot to add a meal — pick from recipe library or type a custom meal
- Filled slots show emoji + meal name, tap to edit/remove
- "Auto-fill" button that suggests age-appropriate meals for empty slots using recipes from the library
- Shopping list generator — collects ingredients from all planned recipes for the week

**New file: `src/components/MealSlot.tsx`**
- Reusable slot component showing meal or empty state

**Modifications:**
- **AppContext.tsx**: Add `addMealPlanEntry`, `removeMealPlanEntry`, `clearWeekPlan` actions
- **App.tsx**: Add `/meal-planner` route
- **Layout.tsx**: Add meal planner to bottom nav or replace one icon
- **MoreMenu.tsx**: Add meal planner link

