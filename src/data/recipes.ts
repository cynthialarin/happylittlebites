import { Recipe } from '@/types';

export const recipes: Recipe[] = [
  {
    id: 'banana-oat-pancakes', title: 'Banana Oat Pancakes', emoji: '🥞',
    description: 'Fluffy, naturally sweet pancakes with just 3 ingredients. Perfect for baby-led weaning and toddler breakfasts.',
    category: 'breakfast', ageGroup: '6mo', prepTime: 5, cookTime: 10, servings: 8,
    ingredients: ['1 ripe banana', '1 egg', '1/3 cup rolled oats'],
    instructions: ['Blend banana, egg, and oats until smooth', 'Heat non-stick pan on medium', 'Pour small circles of batter', 'Cook 2 minutes per side until golden', 'Cool slightly before serving'],
    allergens: ['eggs'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Great source of potassium, protein, and fiber',
    ageTips: { '6mo': 'Serve as strips for gripping', '12mo': 'Cut into small pieces', '2yr': 'Serve whole with toppings' }
  },
  {
    id: 'sweet-potato-lentil-puree', title: 'Sweet Potato Lentil Puree', emoji: '🍠',
    description: 'Iron-rich and creamy, this is one of the best first foods for babies starting solids.',
    category: 'lunch', ageGroup: '6mo', prepTime: 5, cookTime: 20, servings: 6,
    ingredients: ['1 sweet potato, peeled and diced', '1/4 cup red lentils, rinsed', '1 cup water or low-sodium broth', 'Pinch of cumin (optional)'],
    instructions: ['Combine sweet potato, lentils, and liquid in a pot', 'Bring to boil, then simmer 15-20 min until very soft', 'Blend or mash to desired consistency', 'Add cumin if using', 'Store portions in ice cube tray for easy meals'],
    allergens: [], freezerFriendly: true, familyFriendly: false,
    nutritionNotes: 'Excellent source of iron, vitamin A, plant protein, and fiber',
    ageTips: { '6mo': 'Smooth puree or serve on preloaded spoon', '9mo': 'Leave slightly chunky', '12mo': 'Serve as thick mash alongside finger foods' }
  },
  {
    id: 'avocado-egg-mash', title: 'Avocado Egg Smash', emoji: '🥑',
    description: 'A quick, nutrient-dense combo that introduces egg allergen in a delicious way.',
    category: 'breakfast', ageGroup: '6mo', prepTime: 5, cookTime: 5, servings: 1,
    ingredients: ['1/2 ripe avocado', '1 egg, scrambled', 'Squeeze of lemon'],
    instructions: ['Scramble egg until fully cooked', 'Mash avocado with lemon', 'Mix together or serve side by side', 'Serve on preloaded spoon or with toast strips'],
    allergens: ['eggs'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Healthy fats + complete protein. Great for brain development.',
    ageTips: { '6mo': 'Mash together, serve on spoon or toast strip', '12mo': 'On toast or as a bowl' }
  },
  {
    id: 'salmon-veggie-patties', title: 'Salmon & Veggie Patties', emoji: '🐟',
    description: 'Omega-3 packed patties that the whole family will love. Great for batch cooking and freezing.',
    category: 'dinner', ageGroup: '9mo', prepTime: 10, cookTime: 10, servings: 10,
    ingredients: ['1 can (6oz) wild salmon, drained', '1/2 cup mashed sweet potato', '1/4 cup breadcrumbs', '1 egg', '1 tbsp fresh dill or parsley', 'Pinch of garlic powder'],
    instructions: ['Mix all ingredients in a bowl', 'Form into small patties (baby-sized)', 'Pan-fry in a little olive oil, 3-4 min per side', 'Cool slightly before serving', 'Freeze extras on parchment-lined tray'],
    allergens: ['fish', 'eggs', 'wheat'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Rich in omega-3 DHA, protein, vitamin D, and vitamin A',
    ageTips: { '9mo': 'Crumble or serve as strips', '12mo': 'Whole small patties', '2yr': 'Regular sized patties with dipping sauce' }
  },
  {
    id: 'veggie-mac-cheese', title: 'Hidden Veggie Mac & Cheese', emoji: '🧀',
    description: 'Classic comfort food packed with hidden butternut squash. Freezer-friendly for busy weeknights.',
    category: 'dinner', ageGroup: '9mo', prepTime: 10, cookTime: 15, servings: 6,
    ingredients: ['2 cups pasta (any shape)', '1 cup butternut squash puree', '1/2 cup shredded cheddar', '1/4 cup milk', '1 tbsp butter', 'Pinch of nutmeg'],
    instructions: ['Cook pasta according to package, slightly overcook for babies', 'In a pot, melt butter and add squash puree', 'Stir in milk and cheese until melted', 'Add nutmeg', 'Toss with drained pasta'],
    allergens: ['wheat', 'milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Vitamin A from squash, calcium and protein from cheese',
    ageTips: { '9mo': 'Use large tube pasta baby can grip', '12mo': 'Any small pasta shape', '2yr': 'Serve as a full bowl' }
  },
  {
    id: 'berry-yogurt-bites', title: 'Frozen Berry Yogurt Bites', emoji: '🫐',
    description: 'Soothing frozen treats perfect for teething babies and healthy snacking.',
    category: 'snacks', ageGroup: '9mo', prepTime: 5, cookTime: 0, servings: 20,
    ingredients: ['1 cup full-fat Greek yogurt', '1/2 cup mixed berries (fresh or frozen)', '1 tsp vanilla (optional)'],
    instructions: ['Blend yogurt and berries until smooth', 'Add vanilla if using', 'Pipe or spoon small dots onto parchment-lined tray', 'Freeze 2+ hours', 'Store in freezer bag'],
    allergens: ['milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Calcium, probiotics, antioxidants — great for teething relief',
    ageTips: { '9mo': 'Supervise closely — can be slippery', '12mo': 'Self-serve as finger food', '2yr': 'Great independent snack' }
  },
  {
    id: 'peanut-butter-banana-smoothie', title: 'PB Banana Smoothie', emoji: '🥤',
    description: 'A nutrient-dense smoothie that doubles as allergen introduction for peanuts.',
    category: 'smoothies', ageGroup: '6mo', prepTime: 3, cookTime: 0, servings: 2,
    ingredients: ['1 banana', '1 tbsp smooth peanut butter', '1/2 cup full-fat yogurt', '1/4 cup breast milk, formula, or whole milk (12mo+)'],
    instructions: ['Add all ingredients to blender', 'Blend until smooth', 'Serve in open cup or on preloaded spoon for babies', 'Can be offered slightly frozen as a slushy'],
    allergens: ['peanuts', 'milk'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Protein, healthy fats, potassium, probiotics',
    ageTips: { '6mo': 'Offer on preloaded spoon', '12mo': 'Practice with open cup', '2yr': 'In a regular cup with straw' }
  },
  {
    id: 'chicken-broccoli-bites', title: 'Chicken Broccoli Bites', emoji: '🥦',
    description: 'Soft, savory bites packed with protein and veggies. A toddler favorite!',
    category: 'batch-cooking', ageGroup: '9mo', prepTime: 15, cookTime: 20, servings: 24,
    ingredients: ['1 lb ground chicken', '1 cup finely chopped broccoli', '1/4 cup breadcrumbs', '1 egg', '1/4 cup shredded cheese', 'Pinch of garlic powder and onion powder'],
    instructions: ['Preheat oven to 375°F (190°C)', 'Mix all ingredients thoroughly', 'Roll into small balls', 'Place on lined baking sheet', 'Bake 18-20 minutes until cooked through', 'Cool and freeze extras'],
    allergens: ['wheat', 'eggs', 'milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'High in protein, iron, vitamin C, and calcium',
    ageTips: { '9mo': 'Flatten slightly for easier gripping', '12mo': 'Whole bite-sized balls', '2yr': 'With dipping sauce', '3yr+': 'In wraps or with pasta' }
  },
  {
    id: 'overnight-oats', title: 'Baby-Friendly Overnight Oats', emoji: '🥣',
    description: 'No-cook, make-ahead breakfast that\'s perfect for busy mornings.',
    category: 'breakfast', ageGroup: '6mo', prepTime: 5, cookTime: 0, servings: 1,
    ingredients: ['1/4 cup rolled oats', '1/4 cup full-fat yogurt', '1/4 cup milk', '1 tbsp mashed fruit (banana, berries, mango)'],
    instructions: ['Combine oats, yogurt, and milk in a jar', 'Stir in mashed fruit', 'Cover and refrigerate overnight (or at least 4 hours)', 'In the morning, stir and add more fruit if desired', 'Microwave briefly if you prefer warm oats'],
    allergens: ['milk'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Fiber, probiotics, calcium, and iron',
    ageTips: { '6mo': 'Blend smoother for spoon feeding', '12mo': 'Leave chunky for texture', '2yr': 'Let them add their own toppings' }
  },
  {
    id: 'veggie-frittata', title: 'Rainbow Veggie Frittata', emoji: '🌈',
    description: 'A colorful, veggie-loaded egg dish that\'s great for any meal and introduces eggs early.',
    category: 'lunch', ageGroup: '6mo', prepTime: 10, cookTime: 20, servings: 8,
    ingredients: ['6 eggs', '1/4 cup diced bell pepper', '1/4 cup diced zucchini', '1/4 cup diced tomato', '1/4 cup shredded cheese', '1 tbsp olive oil'],
    instructions: ['Preheat oven to 375°F (190°C)', 'Sauté veggies in olive oil until soft', 'Whisk eggs and pour over veggies in oven-safe pan', 'Top with cheese', 'Bake 15-18 minutes until set', 'Cool and cut into strips or wedges'],
    allergens: ['eggs', 'milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Complete protein, vitamin C, calcium, choline',
    ageTips: { '6mo': 'Cut into thick strips', '12mo': 'Wedges or cubes', '2yr': 'Slice like pizza', '3yr+': 'Regular portions' }
  },
  {
    id: 'lentil-soup', title: 'Creamy Red Lentil Soup', emoji: '🍲',
    description: 'A warming, iron-rich soup that\'s naturally smooth — perfect from first foods to family dinner.',
    category: 'dinner', ageGroup: '6mo', prepTime: 5, cookTime: 25, servings: 8,
    ingredients: ['1 cup red lentils', '1 carrot, diced', '1 celery stalk, diced', '1 small onion, diced', '2 cloves garlic', '4 cups broth', '1 tsp cumin', 'Juice of 1 lemon'],
    instructions: ['Sauté onion, carrot, celery, and garlic in olive oil', 'Add lentils, broth, and cumin', 'Bring to boil, simmer 20 minutes', 'Blend until smooth', 'Stir in lemon juice', 'Season parent portions with salt'],
    allergens: [], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Iron, plant protein, fiber, vitamin A — one of the most nutrient-dense first foods',
    ageTips: { '6mo': 'Serve as smooth puree', '9mo': 'Leave slightly chunky', '12mo': 'Serve with bread for dipping', '3yr+': 'Regular soup with crusty bread' }
  },
  {
    id: 'energy-balls', title: 'No-Bake Energy Balls', emoji: '⚡',
    description: 'Nut-free option available. Packed with healthy fats and natural sweetness.',
    category: 'snacks', ageGroup: '12mo', prepTime: 10, cookTime: 0, servings: 20,
    ingredients: ['1 cup rolled oats', '1/2 cup peanut or sunflower seed butter', '1/4 cup honey (12mo+ only)', '1/4 cup mini chocolate chips or raisins', '2 tbsp ground flaxseed'],
    instructions: ['Mix all ingredients in a bowl', 'Refrigerate 30 minutes', 'Roll into small balls', 'Store in fridge up to 1 week or freeze'],
    allergens: ['peanuts'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Healthy fats, fiber, protein — sustained energy for active toddlers',
    ageTips: { '12mo': 'Make smaller, flatten slightly', '2yr': 'Regular small balls', '3yr+': 'Let them help roll!' }
  },
  // === NEW RECIPES ===
  // BREAKFAST
  {
    id: 'iron-fortified-cereal', title: 'Iron-Fortified Cereal with Fruit', emoji: '🥣',
    description: 'The classic first food — iron-fortified baby cereal mixed with fruit puree for extra flavor and nutrition.',
    category: 'breakfast', ageGroup: '6mo', prepTime: 3, cookTime: 0, servings: 1,
    ingredients: ['2 tbsp iron-fortified baby cereal', '3-4 tbsp breast milk, formula, or water', '1 tbsp fruit puree (banana, pear, or apple)'],
    instructions: ['Mix cereal with liquid to desired consistency', 'Stir in fruit puree', 'Serve immediately on a preloaded spoon', 'Adjust thickness as baby progresses'],
    allergens: [], freezerFriendly: false, familyFriendly: false,
    nutritionNotes: 'Critical source of iron for babies 6mo+. Iron stores from birth deplete around 6 months.',
    ageTips: { '6mo': 'Very thin, runny consistency on preloaded spoon', '9mo': 'Thicker consistency, let baby self-feed with spoon' }
  },
  {
    id: 'french-toast-sticks', title: 'Soft French Toast Sticks', emoji: '🍞',
    description: 'Egg-soaked bread strips that are soft enough for gums but firm enough to grip. Great for introducing eggs and wheat together.',
    category: 'breakfast', ageGroup: '9mo', prepTime: 5, cookTime: 8, servings: 4,
    ingredients: ['2 slices soft whole wheat bread', '1 egg', '2 tbsp whole milk', 'Pinch of cinnamon', '1 tsp butter for cooking'],
    instructions: ['Whisk egg, milk, and cinnamon together', 'Cut bread into thick strips', 'Dip strips in egg mixture, coating well', 'Cook in buttered pan on medium-low, 2-3 min per side', 'Cool slightly — they should be soft throughout'],
    allergens: ['eggs', 'wheat', 'milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Protein from eggs, whole grain carbs, calcium from milk. Great allergen introduction vehicle.',
    ageTips: { '9mo': 'Cut into thick strips for palmar grasp', '12mo': 'Thinner sticks for pincer grasp', '2yr': 'Serve whole with fruit on the side' }
  },
  {
    id: 'sweet-potato-waffles', title: 'Sweet Potato Waffles', emoji: '🧇',
    description: 'Naturally sweet, veggie-packed waffles that freeze beautifully for quick weekday breakfasts.',
    category: 'breakfast', ageGroup: '12mo', prepTime: 10, cookTime: 10, servings: 6,
    ingredients: ['1 cup whole wheat flour', '1/2 cup mashed sweet potato', '1 egg', '3/4 cup whole milk', '2 tbsp melted butter', '1 tsp baking powder', '1/2 tsp cinnamon'],
    instructions: ['Mix dry ingredients in one bowl', 'Whisk wet ingredients including sweet potato in another', 'Combine wet and dry — don\'t overmix', 'Cook in preheated waffle iron until golden', 'Cool on rack, then cut into strips or quarters', 'Freeze extras in a single layer'],
    allergens: ['eggs', 'wheat', 'milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Vitamin A from sweet potato, whole grain fiber, protein from egg. No added sugar needed.',
    ageTips: { '12mo': 'Cut into strips for self-feeding', '2yr': 'Quarter pieces with nut butter', '3yr+': 'Whole waffle with toppings' }
  },
  {
    id: 'chia-pudding', title: 'Mango Chia Pudding', emoji: '🥭',
    description: 'A no-cook, make-ahead pudding packed with omega-3s and fiber. Naturally sweet from mango.',
    category: 'breakfast', ageGroup: '12mo', prepTime: 5, cookTime: 0, servings: 2,
    ingredients: ['3 tbsp chia seeds', '1 cup full-fat coconut milk or whole milk', '1/2 cup mango puree', '1/2 tsp vanilla extract'],
    instructions: ['Mix chia seeds with milk and vanilla', 'Stir well to prevent clumping', 'Refrigerate at least 4 hours or overnight', 'Stir in mango puree before serving', 'Top with fresh fruit if desired'],
    allergens: [], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Omega-3 fatty acids, fiber, calcium, vitamin C from mango. Dairy-free option with coconut milk.',
    ageTips: { '12mo': 'Serve as-is — the gel texture is easy to eat', '2yr': 'Layer with fruit in a clear cup for fun', '3yr+': 'Let them add their own toppings' }
  },
  // LUNCH
  {
    id: 'turkey-veggie-meatballs', title: 'Turkey & Zucchini Meatballs', emoji: '🧆',
    description: 'Soft, juicy meatballs with hidden zucchini for extra moisture and veggies. Perfect batch-cook protein.',
    category: 'lunch', ageGroup: '9mo', prepTime: 15, cookTime: 18, servings: 20,
    ingredients: ['1 lb ground turkey', '1 small zucchini, finely grated and squeezed dry', '1/4 cup breadcrumbs', '1 egg', '1 tsp dried oregano', '1/4 tsp garlic powder'],
    instructions: ['Preheat oven to 375°F (190°C)', 'Mix all ingredients until just combined', 'Roll into small, baby-sized balls', 'Place on lined baking sheet', 'Bake 15-18 minutes until cooked through (165°F internal)', 'Cool completely before serving or freezing'],
    allergens: ['eggs', 'wheat'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Lean protein, iron, zinc from turkey. Hidden veggies add vitamins and moisture.',
    ageTips: { '9mo': 'Flatten into discs or crumble', '12mo': 'Whole small meatballs', '2yr': 'With pasta or in a wrap', '3yr+': 'With marinara dipping sauce' }
  },
  {
    id: 'cheese-quesadilla-strips', title: 'Bean & Cheese Quesadilla', emoji: '🫓',
    description: 'Crispy outside, melty inside. Mashed beans add protein and fiber to this toddler staple.',
    category: 'lunch', ageGroup: '9mo', prepTime: 5, cookTime: 6, servings: 4,
    ingredients: ['2 whole wheat tortillas', '1/2 cup shredded cheddar or mozzarella', '1/4 cup canned black beans, rinsed and mashed', '1 tbsp butter'],
    instructions: ['Spread mashed beans on one tortilla', 'Top with cheese and second tortilla', 'Cook in buttered pan on medium, 2-3 min per side', 'Let cool slightly, then cut into thin strips', 'Serve with mashed avocado for dipping'],
    allergens: ['wheat', 'milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Plant protein from beans, calcium from cheese, whole grain carbs. Complete amino acid profile.',
    ageTips: { '9mo': 'Cut into thin strips for gripping', '12mo': 'Triangles or strips', '2yr': 'Wedges with dip', '3yr+': 'Full quesadilla portions' }
  },
  {
    id: 'egg-fried-rice', title: 'Veggie Egg Fried Rice', emoji: '🍚',
    description: 'A one-pan meal using leftover rice. Introduces soy and sesame in a delicious, balanced dish.',
    category: 'lunch', ageGroup: '12mo', prepTime: 5, cookTime: 10, servings: 4,
    ingredients: ['1 cup cooked rice (cooled)', '1 egg, beaten', '1/4 cup frozen peas and carrots', '1 tsp sesame oil', '1 tsp low-sodium soy sauce', '1 tsp vegetable oil'],
    instructions: ['Heat vegetable oil in a non-stick pan', 'Sauté peas and carrots until tender', 'Push veggies aside, scramble egg in the pan', 'Add rice and toss everything together', 'Drizzle with soy sauce and sesame oil', 'Cool to safe temperature before serving'],
    allergens: ['eggs', 'soy', 'sesame'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Balanced meal with protein, carbs, and veggies. Sesame provides healthy fats and calcium.',
    ageTips: { '12mo': 'Serve as finger food — rice sticks together nicely', '2yr': 'With a spoon or fork', '3yr+': 'Let them help stir!' }
  },
  {
    id: 'tuna-pasta-salad', title: 'Tuna Pasta Salad', emoji: '🐟',
    description: 'A cold or warm pasta dish introducing fish in an approachable, family-friendly way.',
    category: 'lunch', ageGroup: '12mo', prepTime: 5, cookTime: 10, servings: 4,
    ingredients: ['1 cup small pasta (fusilli or penne)', '1 can (5oz) light tuna in water, drained', '1/4 cup diced cucumber', '1/4 cup diced tomato', '1 tbsp olive oil', '1 tsp lemon juice'],
    instructions: ['Cook pasta until soft (slightly overcook for younger toddlers)', 'Drain and cool slightly', 'Flake tuna and mix with pasta', 'Add cucumber, tomato, olive oil, and lemon', 'Toss gently and serve warm or cold'],
    allergens: ['fish', 'wheat'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Omega-3s and lean protein from tuna, carbs from pasta, vitamins from veggies. Use light tuna for lower mercury.',
    ageTips: { '12mo': 'Use large tube pasta for gripping', '2yr': 'Any pasta shape with a fork', '3yr+': 'Regular pasta salad portions' }
  },
  // DINNER
  {
    id: 'beef-sweet-potato-stew', title: 'Beef & Sweet Potato Stew', emoji: '🥩',
    description: 'Slow-simmered, iron-rich stew that can be pureed smooth for beginners or left chunky for older babies.',
    category: 'dinner', ageGroup: '6mo', prepTime: 10, cookTime: 45, servings: 8,
    ingredients: ['1/2 lb stewing beef, diced small', '1 large sweet potato, peeled and diced', '1 carrot, diced', '1 cup low-sodium beef broth', '1 cup water', '1/2 tsp thyme'],
    instructions: ['Brown beef in a pot with a little oil', 'Add sweet potato, carrot, broth, water, and thyme', 'Bring to boil, then reduce to low simmer', 'Cook 40-45 minutes until beef is very tender', 'Puree to desired consistency for baby\'s age', 'Freeze in portions for quick meals'],
    allergens: [], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Heme iron from beef (most absorbable form), vitamin A from sweet potato, zinc for immune health.',
    ageTips: { '6mo': 'Puree until smooth', '9mo': 'Mash with soft lumps', '12mo': 'Chunky with soft pieces', '3yr+': 'Regular stew consistency' }
  },
  {
    id: 'tofu-veggie-stir-fry', title: 'Tofu & Veggie Stir-Fry', emoji: '🥬',
    description: 'A plant-based protein powerhouse. Soft tofu is perfect texture for babies learning to chew.',
    category: 'dinner', ageGroup: '9mo', prepTime: 10, cookTime: 10, servings: 4,
    ingredients: ['1 block firm tofu, pressed and cubed', '1 cup broccoli florets, steamed soft', '1/2 red bell pepper, diced', '1 tsp sesame oil', '1 tsp low-sodium soy sauce', '1 tsp cornstarch'],
    instructions: ['Press tofu and cut into age-appropriate pieces', 'Toss tofu in cornstarch and pan-fry until lightly golden', 'Steam broccoli until very soft', 'Sauté bell pepper until tender', 'Toss everything with sesame oil and soy sauce', 'Cool before serving'],
    allergens: ['soy'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Complete plant protein, calcium (if calcium-set tofu), iron, vitamin C from peppers aids iron absorption.',
    ageTips: { '9mo': 'Large strips of tofu for gripping, steamed broccoli trees', '12mo': 'Bite-sized cubes', '2yr': 'With rice or noodles', '3yr+': 'Full stir-fry portions' }
  },
  {
    id: 'mild-chicken-curry', title: 'Mild Coconut Chicken Curry', emoji: '🍛',
    description: 'A gentle, aromatic curry that introduces warm spices safely. Coconut milk makes it creamy without dairy.',
    category: 'dinner', ageGroup: '12mo', prepTime: 10, cookTime: 20, servings: 6,
    ingredients: ['1 lb chicken thigh, diced', '1 can coconut milk', '1 small potato, diced', '1/2 cup frozen peas', '1 tsp mild curry powder', '1/2 tsp turmeric', '1 tsp coconut oil'],
    instructions: ['Sauté chicken in coconut oil until cooked through', 'Add curry powder and turmeric, stir 30 seconds', 'Pour in coconut milk and add diced potato', 'Simmer 15 minutes until potato is very soft', 'Add peas in last 3 minutes', 'Serve over soft rice'],
    allergens: [], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Protein and iron from chicken, healthy fats from coconut, turmeric is anti-inflammatory. Spice exposure helps prevent picky eating.',
    ageTips: { '12mo': 'Shred chicken finely, serve with rice', '2yr': 'Small pieces with rice', '3yr+': 'Regular curry portions — adjust spice to taste' }
  },
  {
    id: 'fish-finger-strips', title: 'Homemade Fish Fingers', emoji: '🐠',
    description: 'Baked, not fried — much healthier than store-bought. Great way to introduce fish allergen.',
    category: 'dinner', ageGroup: '9mo', prepTime: 10, cookTime: 15, servings: 8,
    ingredients: ['1 white fish fillet (cod or haddock), deboned', '1/4 cup breadcrumbs', '1 egg, beaten', '2 tbsp flour', '1 tsp paprika', '1 tbsp olive oil'],
    instructions: ['Preheat oven to 400°F (200°C)', 'Cut fish into thick strips', 'Set up breading station: flour, egg, breadcrumbs with paprika', 'Coat each strip: flour → egg → breadcrumbs', 'Place on oiled baking sheet', 'Bake 12-15 minutes until golden and flaky'],
    allergens: ['fish', 'wheat', 'eggs'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Lean protein, omega-3s, vitamin D. Baking instead of frying cuts unhealthy fats.',
    ageTips: { '9mo': 'Large strips for gripping — they\'ll suck and gnaw', '12mo': 'Bite-sized pieces', '2yr': 'Whole fish fingers with ketchup or yogurt dip', '3yr+': 'As part of a full meal' }
  },
  // SNACKS
  {
    id: 'banana-teething-biscuits', title: 'Banana Teething Biscuits', emoji: '🍌',
    description: 'Soft, dissolving biscuits that soothe sore gums. Only 3 ingredients and no added sugar.',
    category: 'snacks', ageGroup: '6mo', prepTime: 10, cookTime: 15, servings: 12,
    ingredients: ['1 ripe banana', '1 cup baby oat cereal or finely ground oats', '1 tbsp coconut oil, melted'],
    instructions: ['Preheat oven to 350°F (175°C)', 'Mash banana thoroughly', 'Mix in oat cereal and coconut oil until a dough forms', 'Roll out and cut into long, thin stick shapes', 'Place on parchment-lined baking sheet', 'Bake 12-15 minutes until firm but not hard', 'They should dissolve easily when gummed'],
    allergens: [], freezerFriendly: true, familyFriendly: false,
    nutritionNotes: 'Iron from fortified cereal, potassium from banana, healthy fats from coconut. Designed to dissolve safely.',
    ageTips: { '6mo': 'Long sticks that baby can hold and gnaw', '9mo': 'Same shape — great for teething relief' }
  },
  {
    id: 'hummus-veggie-dippers', title: 'Smooth Hummus & Veggie Dippers', emoji: '🫘',
    description: 'Protein-rich hummus with soft-cooked veggie sticks. Introduces sesame allergen early.',
    category: 'snacks', ageGroup: '9mo', prepTime: 10, cookTime: 5, servings: 4,
    ingredients: ['1 can chickpeas, drained and rinsed', '2 tbsp tahini', '1 tbsp olive oil', '1 tbsp lemon juice', '1 small clove garlic', '2 carrots, cut into sticks and steamed', '1 zucchini, cut into sticks and steamed'],
    instructions: ['Blend chickpeas, tahini, olive oil, lemon, and garlic until very smooth', 'Add water 1 tbsp at a time for desired consistency', 'Steam veggie sticks until very soft (fork-tender)', 'Serve hummus in a bowl with veggie dippers alongside', 'Store hummus in fridge up to 5 days'],
    allergens: ['sesame'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Plant protein, iron, healthy fats from tahini, fiber. Sesame introduction via tahini is recommended by pediatric allergists.',
    ageTips: { '9mo': 'Preload hummus on a spoon or spread on soft toast', '12mo': 'Dip soft veggies into hummus', '2yr': 'Self-serve dipping', '3yr+': 'With raw veggies and pita' }
  },
  {
    id: 'apple-cinnamon-muffins', title: 'Apple Cinnamon Mini Muffins', emoji: '🧁',
    description: 'Sweetened only with applesauce — no added sugar. Perfect snack size for little hands.',
    category: 'snacks', ageGroup: '12mo', prepTime: 10, cookTime: 18, servings: 24,
    ingredients: ['1 cup whole wheat flour', '1/2 cup unsweetened applesauce', '1 egg', '1/4 cup whole milk', '2 tbsp melted butter', '1 tsp baking powder', '1 tsp cinnamon', '1/4 cup finely diced apple'],
    instructions: ['Preheat oven to 350°F (175°C)', 'Mix dry ingredients in one bowl', 'Whisk wet ingredients in another', 'Combine — don\'t overmix', 'Fold in diced apple pieces', 'Spoon into greased mini muffin tin', 'Bake 15-18 minutes until golden'],
    allergens: ['wheat', 'eggs', 'milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Whole grain fiber, vitamin C from apples, no refined sugar. Cinnamon adds flavor without sweetness.',
    ageTips: { '12mo': 'Break into pieces for self-feeding', '2yr': 'Whole mini muffins', '3yr+': 'Let them help bake!' }
  },
  {
    id: 'cheese-spinach-pinwheels', title: 'Cheese & Spinach Pinwheels', emoji: '🌀',
    description: 'Fun spiral shapes with hidden spinach. Great for lunchboxes and picky eaters.',
    category: 'snacks', ageGroup: '2yr', prepTime: 15, cookTime: 20, servings: 16,
    ingredients: ['1 sheet puff pastry, thawed', '1 cup fresh spinach, wilted and chopped', '1/2 cup ricotta cheese', '1/4 cup grated parmesan', '1 egg yolk for brushing'],
    instructions: ['Preheat oven to 400°F (200°C)', 'Mix spinach, ricotta, and parmesan', 'Unroll puff pastry and spread filling evenly', 'Roll up tightly into a log', 'Slice into 1/2 inch rounds', 'Place on lined tray, brush with egg yolk', 'Bake 18-20 minutes until golden and puffed'],
    allergens: ['wheat', 'milk', 'eggs'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Calcium from cheese, iron and folate from spinach, protein. The fun shape encourages adventurous eating.',
    ageTips: { '2yr': 'Cut in half if needed', '3yr+': 'Whole pinwheels — great for lunchboxes' }
  },
  // SMOOTHIES
  {
    id: 'green-monster-smoothie', title: 'Green Monster Smoothie', emoji: '🥬',
    description: 'Don\'t let the color fool you — this tastes like banana! A sneaky way to get greens into any baby.',
    category: 'smoothies', ageGroup: '9mo', prepTime: 3, cookTime: 0, servings: 2,
    ingredients: ['1 handful baby spinach', '1 ripe banana', '1/2 avocado', '1/2 cup full-fat yogurt', '1/4 cup water or milk'],
    instructions: ['Add spinach and liquid to blender first', 'Blend until spinach is fully broken down', 'Add banana, avocado, and yogurt', 'Blend until completely smooth', 'Serve in open cup or on preloaded spoon'],
    allergens: ['milk'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Iron and folate from spinach, healthy fats from avocado, potassium from banana, probiotics from yogurt.',
    ageTips: { '9mo': 'Offer on preloaded spoon or in open cup with help', '12mo': 'Open cup practice', '2yr': 'In a cup with straw — call it "monster juice"!' }
  },
  {
    id: 'mango-coconut-lassi', title: 'Mango Coconut Lassi', emoji: '🥥',
    description: 'A tropical, probiotic-rich drink inspired by Indian lassi. Naturally sweet and creamy.',
    category: 'smoothies', ageGroup: '12mo', prepTime: 3, cookTime: 0, servings: 2,
    ingredients: ['1 cup frozen mango chunks', '1/2 cup full-fat yogurt', '1/4 cup coconut milk', '1/4 tsp cardamom (optional)'],
    instructions: ['Add all ingredients to blender', 'Blend until smooth and creamy', 'Add a splash more coconut milk if too thick', 'Serve chilled in an open cup'],
    allergens: ['milk'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Vitamin C and A from mango, probiotics from yogurt, healthy fats from coconut. Cardamom is a gentle digestive spice.',
    ageTips: { '12mo': 'Serve in open cup for practice', '2yr': 'With a straw', '3yr+': 'Full glass — great after-school drink' }
  },
  // BATCH COOKING
  {
    id: 'veggie-bolognese-sauce', title: 'Hidden Veggie Bolognese', emoji: '🍝',
    description: 'A nutrient-dense meat sauce packed with finely grated vegetables. Makes a huge batch for the freezer.',
    category: 'batch-cooking', ageGroup: '6mo', prepTime: 15, cookTime: 30, servings: 12,
    ingredients: ['1 lb ground beef', '1 carrot, finely grated', '1 zucchini, finely grated', '1 can (14oz) crushed tomatoes', '1 small onion, finely diced', '2 cloves garlic, minced', '1 tsp dried basil', '1 tbsp olive oil'],
    instructions: ['Sauté onion and garlic in olive oil until soft', 'Add beef and cook until browned', 'Stir in grated carrot and zucchini', 'Add crushed tomatoes and basil', 'Simmer on low for 25-30 minutes', 'Blend to desired consistency for baby\'s age', 'Freeze in ice cube trays or portions'],
    allergens: [], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Iron and zinc from beef, vitamin A from carrots, vitamin C from tomatoes. The hidden veggies are undetectable.',
    ageTips: { '6mo': 'Blend until smooth puree', '9mo': 'Mash lightly — leave some texture', '12mo': 'Over soft pasta', '3yr+': 'Regular spaghetti bolognese' }
  },
  {
    id: 'mini-shepherd-pies', title: 'Mini Shepherd\'s Pies', emoji: '🥧',
    description: 'Individual portions of this British classic. Creamy mashed potato over savory lamb and veggie filling.',
    category: 'batch-cooking', ageGroup: '12mo', prepTime: 20, cookTime: 25, servings: 6,
    ingredients: ['1/2 lb ground lamb or beef', '1 carrot, finely diced', '1/2 cup frozen peas', '1/2 cup low-sodium broth', '1 tsp tomato paste', '2 large potatoes, peeled and cubed', '2 tbsp butter', '2 tbsp milk'],
    instructions: ['Boil potatoes until tender, mash with butter and milk', 'Brown meat in a pan, drain excess fat', 'Add carrot, peas, broth, and tomato paste to meat', 'Simmer 10 minutes until veggies are soft', 'Divide filling into greased muffin tin cups', 'Top with mashed potato', 'Bake at 375°F for 20-25 minutes until golden', 'Cool completely before freezing extras'],
    allergens: ['milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Iron and zinc from red meat, vitamin A from carrots, potassium from potatoes. A complete balanced meal in one cup.',
    ageTips: { '12mo': 'Mash filling and potato together for easy eating', '2yr': 'Serve in ramekin with a spoon', '3yr+': 'Individual pie portions — let them eat independently' }
  },
];
