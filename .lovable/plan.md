

# Expand Recipe Library to 30+ Recipes

## Current State
12 recipes across 6 categories. Distribution: 3 breakfast, 2 lunch, 3 dinner, 2 snacks, 1 smoothie, 1 batch-cooking. Age groups skew toward 6mo and 9mo.

## Plan
Add 20 new recipes to `src/data/recipes.ts`, bringing the total to 32. Each follows the existing `Recipe` interface with proper allergen tags, age-appropriate `ageTips`, and pediatric nutrition guidelines.

### New Recipes by Category

**Breakfast (4 new → 7 total)**
- `iron-fortified-cereal` — 6mo — Iron-fortified baby cereal with fruit puree (first iron source)
- `french-toast-sticks` — 9mo — Egg-dipped soft bread sticks (eggs, wheat, milk)
- `sweet-potato-waffles` — 12mo — Mashed sweet potato batter waffles (eggs, wheat, milk)
- `chia-pudding` — 12mo — Chia seed coconut milk pudding with mango

**Lunch (4 new → 6 total)**
- `turkey-veggie-meatballs` — 9mo — Soft baked turkey meatballs with hidden zucchini (eggs, wheat)
- `cheese-quesadilla-strips` — 9mo — Whole wheat tortilla with melted cheese and beans (wheat, milk)
- `egg-fried-rice` — 12mo — Soft veggie fried rice with scrambled egg (eggs, soy, sesame)
- `tuna-pasta-salad` — 12mo — Soft pasta with tuna and veggies (fish, wheat)

**Dinner (4 new → 7 total)**
- `beef-sweet-potato-stew` — 6mo — Slow-cooked iron-rich beef stew, pureed or chunky
- `tofu-veggie-stir-fry` — 9mo — Soft tofu with steamed vegetables (soy)
- `mild-chicken-curry` — 12mo — Gentle coconut curry with chicken and veggies
- `fish-finger-strips` — 9mo — Baked homemade fish fingers (fish, wheat, eggs)

**Snacks (4 new → 6 total)**
- `banana-teething-biscuits` — 6mo — Soft dissolving biscuits for early teethers (wheat)
- `hummus-veggie-dippers` — 9mo — Smooth hummus with soft veggie sticks (sesame)
- `apple-cinnamon-muffins` — 12mo — Mini muffins sweetened only with applesauce (wheat, eggs, milk)
- `cheese-spinach-pinwheels` — 2yr — Puff pastry pinwheels with cheese and spinach (wheat, milk, eggs)

**Smoothies (2 new → 3 total)**
- `green-monster-smoothie` — 9mo — Spinach, banana, avocado smoothie (milk)
- `mango-coconut-lassi` — 12mo — Mango yogurt drink with coconut (milk)

**Batch Cooking (2 new → 3 total)**
- `veggie-bolognese-sauce` — 6mo — Hidden veggie tomato sauce with beef, freezable
- `mini-shepherd-pies` — 12mo — Individual portions with mashed potato topping (milk)

### Age-Appropriateness Guidelines Followed
- **6mo**: No honey, no added salt/sugar, no whole nuts, soft/mashable textures, allergen introduction via smooth forms
- **9mo**: Soft finger foods, small pieces, continued allergen exposure, no honey
- **12mo**: Honey now safe, wider textures, self-feeding encouraged, mild spices OK
- **2yr+**: More complex flavors, participation in prep, regular family portions

### Implementation
Single file edit: `src/data/recipes.ts` — append 20 new recipe objects after the existing 12. Also update `src/pages/Onboarding.tsx` to reflect the new count if it references recipe numbers.

