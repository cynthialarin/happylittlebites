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
  // ========== EXPANDED RECIPES ==========
  // BREAKFAST — Additional
  {
    id: 'mini-egg-cups', title: 'Mini Veggie Egg Cups', emoji: '🥚',
    description: 'Baked in a muffin tin for perfect portion control. Great for meal prep and lunchboxes.',
    category: 'breakfast', ageGroup: '9mo', prepTime: 10, cookTime: 15, servings: 12,
    ingredients: ['6 eggs', '1/4 cup diced spinach', '1/4 cup diced red pepper', '2 tbsp shredded cheese', '1 tbsp milk'],
    instructions: ['Preheat oven to 350°F (175°C)', 'Whisk eggs with milk', 'Divide veggies into greased mini muffin tin', 'Pour egg mixture over veggies', 'Top with cheese', 'Bake 12-15 minutes until set'],
    allergens: ['eggs', 'milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Complete protein, iron, vitamin C. Perfect grab-and-go breakfast.',
    ageTips: { '9mo': 'Cut in half for easy gripping', '12mo': 'Whole mini cups', '2yr': 'Pack in lunchbox' }
  },
  {
    id: 'berry-smoothie-bowl', title: 'Berry Smoothie Bowl', emoji: '🫐',
    description: 'A thick, spoonable smoothie topped with soft fruits. Instagram-worthy and nutritious.',
    category: 'breakfast', ageGroup: '9mo', prepTime: 5, cookTime: 0, servings: 1,
    ingredients: ['1/2 cup frozen mixed berries', '1/2 banana', '1/4 cup yogurt', '1 tbsp oats', 'Soft fruit for topping'],
    instructions: ['Blend berries, banana, yogurt, and oats until thick', 'Pour into bowl', 'Top with soft diced fruit', 'Serve immediately'],
    allergens: ['milk'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Antioxidants, fiber, probiotics, and potassium in one bowl.',
    ageTips: { '9mo': 'Serve as thick puree on preloaded spoon', '12mo': 'Let them self-feed with spoon', '2yr': 'Add fun toppings' }
  },
  {
    id: 'porridge-variations', title: 'Apple Pie Porridge', emoji: '🍎',
    description: 'Warm, comforting oat porridge with stewed apple and warming spices. Like apple pie for breakfast!',
    category: 'breakfast', ageGroup: '6mo', prepTime: 5, cookTime: 10, servings: 2,
    ingredients: ['1/2 cup rolled oats', '1 cup milk or water', '1/2 apple, grated', '1/4 tsp cinnamon', '1 tsp butter'],
    instructions: ['Cook oats with liquid on medium heat', 'Add grated apple and cinnamon', 'Stir until apple is soft and porridge thickens', 'Stir in butter', 'Cool before serving'],
    allergens: ['milk'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Soluble fiber, iron from oats, vitamin C from apple. Warming and filling.',
    ageTips: { '6mo': 'Blend smooth', '9mo': 'Leave slightly textured', '12mo': 'Chunky with apple pieces' }
  },
  {
    id: 'mini-crepes', title: 'Mini Crêpes with Fruit', emoji: '🥞',
    description: 'Thin, soft French-style pancakes that melt in baby\'s mouth. Roll with fruit puree for fun!',
    category: 'breakfast', ageGroup: '9mo', prepTime: 5, cookTime: 10, servings: 8,
    ingredients: ['1/2 cup flour', '1 egg', '1/2 cup milk', '1 tbsp melted butter', 'Fruit puree for filling'],
    instructions: ['Whisk flour, egg, milk, and butter until smooth', 'Rest batter 10 minutes', 'Cook thin pancakes in buttered pan', 'Fill with fruit puree and roll up', 'Cut into strips'],
    allergens: ['eggs', 'wheat', 'milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Versatile base for any fruit or nut butter filling.',
    ageTips: { '9mo': 'Cut into strips for gripping', '12mo': 'Rolled with soft filling', '2yr': 'Let them spread their own filling' }
  },
  {
    id: 'baby-shakshuka', title: 'Baby-Friendly Shakshuka', emoji: '🍅',
    description: 'Middle Eastern spiced tomato and egg dish — mild version for little ones. Iron and protein in one pot.',
    category: 'breakfast', ageGroup: '12mo', prepTime: 5, cookTime: 15, servings: 4,
    ingredients: ['1 can crushed tomatoes', '2 eggs', '1/2 tsp cumin', '1/4 tsp paprika', '1 tbsp olive oil', 'Bread for dipping'],
    instructions: ['Heat olive oil, add cumin and paprika briefly', 'Add crushed tomatoes, simmer 5 minutes', 'Make wells and crack eggs into sauce', 'Cover and cook until eggs are set', 'Serve with soft bread strips'],
    allergens: ['eggs', 'wheat'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Iron from eggs and tomatoes, lycopene, protein. Spices aid digestion.',
    ageTips: { '12mo': 'Mash egg into sauce, serve with toast strips', '2yr': 'Scoop with bread', '3yr+': 'Full portions' }
  },
  // LUNCH — Additional
  {
    id: 'veggie-wraps', title: 'Soft Veggie & Hummus Wraps', emoji: '🌯',
    description: 'Soft tortilla filled with hummus and steamed veggies. Easy to hold and eat.',
    category: 'lunch', ageGroup: '12mo', prepTime: 10, cookTime: 5, servings: 4,
    ingredients: ['2 soft flour tortillas', '4 tbsp hummus', '1/2 avocado, sliced', 'Steamed carrot sticks', 'Steamed broccoli, chopped'],
    instructions: ['Spread hummus on tortillas', 'Layer avocado and veggies', 'Roll tightly and cut into pinwheels or strips', 'Serve immediately'],
    allergens: ['wheat', 'sesame'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Plant protein from hummus, healthy fats from avocado, fiber and vitamins from veggies.',
    ageTips: { '12mo': 'Cut into thin strips for gripping', '2yr': 'Pinwheel rounds', '3yr+': 'Half wrap portions' }
  },
  {
    id: 'rice-bowl-teriyaki', title: 'Toddler Teriyaki Rice Bowl', emoji: '🍚',
    description: 'A mild teriyaki-style rice bowl with soft chicken and veggies. Japanese-inspired family meal.',
    category: 'lunch', ageGroup: '12mo', prepTime: 10, cookTime: 15, servings: 4,
    ingredients: ['1 cup cooked rice', '1 chicken breast, diced small', '1/2 cup steamed edamame', '1/2 carrot, diced and steamed', '1 tbsp low-sodium soy sauce', '1 tsp honey (12mo+)', '1 tsp sesame oil'],
    instructions: ['Cook chicken in a pan until done', 'Mix soy sauce, honey, and sesame oil', 'Toss chicken with sauce', 'Assemble bowls: rice, chicken, edamame, carrots', 'Serve warm'],
    allergens: ['soy', 'sesame'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Complete protein, plant protein from edamame, vitamin A from carrots.',
    ageTips: { '12mo': 'Rice sticks together for self-feeding', '2yr': 'Use a spoon or fork', '3yr+': 'Full bowl portions' }
  },
  {
    id: 'pasta-bake-veggie', title: 'One-Pot Veggie Pasta Bake', emoji: '🍝',
    description: 'Cheesy baked pasta loaded with vegetables. Prep ahead and freeze for busy nights.',
    category: 'lunch', ageGroup: '12mo', prepTime: 10, cookTime: 25, servings: 8,
    ingredients: ['2 cups pasta', '1 cup marinara sauce', '1 cup ricotta', '1/2 cup shredded mozzarella', '1 cup mixed veggies (spinach, zucchini, peas)'],
    instructions: ['Cook pasta until just done, drain', 'Mix pasta with marinara and ricotta', 'Stir in veggies', 'Pour into baking dish, top with mozzarella', 'Bake at 375°F for 20 minutes until bubbly'],
    allergens: ['wheat', 'milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Calcium from cheese, protein, vitamins from veggies. A complete one-dish meal.',
    ageTips: { '12mo': 'Use large tube pasta', '2yr': 'Any pasta shape', '3yr+': 'Regular portions' }
  },
  {
    id: 'broccoli-cheddar-soup', title: 'Broccoli Cheddar Soup', emoji: '🥦',
    description: 'Creamy, cheesy, and packed with iron-boosting broccoli. A comfort food classic for all ages.',
    category: 'lunch', ageGroup: '6mo', prepTime: 10, cookTime: 20, servings: 6,
    ingredients: ['2 cups broccoli florets', '1 potato, diced', '2 cups broth', '1/2 cup shredded cheddar', '1/4 cup cream or milk'],
    instructions: ['Simmer broccoli and potato in broth until very soft', 'Blend until smooth', 'Stir in cheese until melted', 'Add cream for richness', 'Serve warm'],
    allergens: ['milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Vitamin C, iron, calcium, fiber. Blending makes nutrients highly available.',
    ageTips: { '6mo': 'Smooth puree', '9mo': 'Slightly chunky', '12mo': 'With bread for dipping', '3yr+': 'In a bread bowl!' }
  },
  {
    id: 'stuffed-sweet-peppers', title: 'Mini Stuffed Peppers', emoji: '🫑',
    description: 'Colorful bell pepper halves stuffed with rice and meat. Fun boat shape for toddlers.',
    category: 'lunch', ageGroup: '12mo', prepTime: 15, cookTime: 25, servings: 6,
    ingredients: ['3 mini bell peppers, halved and seeded', '1/2 cup cooked rice', '1/4 lb ground beef or turkey', '1/4 cup marinara', '2 tbsp shredded cheese'],
    instructions: ['Preheat oven to 375°F', 'Brown meat, mix with rice and marinara', 'Fill pepper halves with mixture', 'Top with cheese', 'Bake 20-25 minutes until peppers are soft'],
    allergens: ['milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Vitamin C from peppers, iron from meat, complex carbs from rice.',
    ageTips: { '12mo': 'Scoop filling out for self-feeding', '2yr': 'Eat pepper boat and all', '3yr+': 'Full stuffed pepper' }
  },
  {
    id: 'mini-pizzas', title: 'English Muffin Mini Pizzas', emoji: '🍕',
    description: 'Quick, toddler-controlled pizzas. Let them choose their own toppings for independence!',
    category: 'lunch', ageGroup: '12mo', prepTime: 5, cookTime: 10, servings: 4,
    ingredients: ['2 English muffins, split', '4 tbsp marinara sauce', '1/2 cup shredded mozzarella', 'Toppings: diced veggies, shredded chicken, olives'],
    instructions: ['Preheat oven to 400°F', 'Spread sauce on muffin halves', 'Add cheese and chosen toppings', 'Bake 8-10 minutes until cheese melts', 'Cool and cut into strips or wedges'],
    allergens: ['wheat', 'milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Customizable nutrition based on toppings. Great for picky eaters — they\'re more likely to eat what they build.',
    ageTips: { '12mo': 'Cut into thin strips', '2yr': 'Wedges they can hold', '3yr+': 'Whole muffin half — let them top it themselves!' }
  },
  {
    id: 'japanese-miso-soup', title: 'Gentle Miso Soup with Tofu', emoji: '🍜',
    description: 'A soothing Japanese staple with soft tofu cubes. Introduces soy in a traditional, gentle way.',
    category: 'lunch', ageGroup: '9mo', prepTime: 5, cookTime: 10, servings: 4,
    ingredients: ['4 cups water', '2 tbsp white miso paste', '1/2 block silken tofu, cubed', '1 green onion, thinly sliced', '1 sheet nori, cut into strips (optional)'],
    instructions: ['Bring water to a gentle simmer', 'Add tofu cubes and cook 2 minutes', 'Remove from heat', 'Dissolve miso paste in a ladle of broth, then stir back in', 'Garnish with green onion and nori'],
    allergens: ['soy'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Probiotics from miso, plant protein from tofu, iodine from nori. Soothing and hydrating.',
    ageTips: { '9mo': 'Offer tofu cubes as finger food, spoon-feed broth', '12mo': 'Sip from open cup', '2yr': 'Full bowl with spoon' }
  },
  {
    id: 'mexican-bean-bowl', title: 'Mexican Black Bean Bowl', emoji: '🫘',
    description: 'Mildly spiced beans with rice, avocado, and cheese. Inspired by Mexican cuisine.',
    category: 'lunch', ageGroup: '9mo', prepTime: 5, cookTime: 10, servings: 4,
    ingredients: ['1 can black beans, rinsed', '1 cup cooked rice', '1/2 avocado, diced', '1/4 cup shredded cheese', '1/2 tsp cumin', '1/4 tsp mild chili powder', 'Squeeze of lime'],
    instructions: ['Heat beans with cumin and chili powder', 'Mash half the beans for texture variety', 'Assemble bowls: rice, beans, avocado, cheese', 'Squeeze lime on top', 'Serve warm'],
    allergens: ['milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Plant protein and iron from beans, healthy fats from avocado, calcium from cheese.',
    ageTips: { '9mo': 'Mash beans well, serve with rice', '12mo': 'Chunky beans as finger food', '2yr': 'Full bowl with fork', '3yr+': 'Add salsa for more flavor' }
  },
  // DINNER — Additional
  {
    id: 'creamy-dal', title: 'Creamy Indian Dal', emoji: '🍛',
    description: 'A mild, protein-rich lentil dish inspired by Indian cooking. Turmeric and cumin are gentle on tummies.',
    category: 'dinner', ageGroup: '6mo', prepTime: 5, cookTime: 25, servings: 8,
    ingredients: ['1 cup red or yellow lentils', '3 cups water', '1 tsp turmeric', '1 tsp cumin', '1 tbsp ghee or butter', '1 tomato, diced', '1 clove garlic, minced'],
    instructions: ['Rinse lentils well', 'Simmer lentils with water and turmeric until soft', 'In a separate pan, heat ghee and sauté garlic and cumin', 'Add tomato and cook until soft', 'Stir the tempering into the dal', 'Serve over rice or with naan'],
    allergens: ['milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Excellent plant protein, iron, turmeric is anti-inflammatory. A staple in millions of homes worldwide.',
    ageTips: { '6mo': 'Smooth puree — perfect first food', '9mo': 'Chunky with rice', '12mo': 'With soft naan for dipping', '3yr+': 'Full portions with rice' }
  },
  {
    id: 'thai-peanut-noodles', title: 'Thai Peanut Noodles', emoji: '🥜',
    description: 'Mild peanut sauce over soft noodles with veggies. Great for introducing peanut allergen in a meal.',
    category: 'dinner', ageGroup: '12mo', prepTime: 10, cookTime: 10, servings: 4,
    ingredients: ['200g rice noodles', '2 tbsp peanut butter', '1 tbsp soy sauce', '1 tbsp lime juice', '1 tsp sesame oil', '1/2 cup shredded carrot', '1/2 cup diced cucumber'],
    instructions: ['Cook noodles according to package', 'Whisk peanut butter, soy sauce, lime, and sesame oil', 'Toss noodles with sauce', 'Top with carrot and cucumber', 'Serve at room temperature'],
    allergens: ['peanuts', 'soy', 'sesame'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Allergen introduction meal — covers peanut, soy, and sesame. Healthy fats and protein.',
    ageTips: { '12mo': 'Cut noodles short, serve as finger food', '2yr': 'Use a fork', '3yr+': 'Full noodle bowl' }
  },
  {
    id: 'fish-pie', title: 'Creamy Fish Pie', emoji: '🐟',
    description: 'British comfort classic with flaky white fish under creamy mashed potato. Great for batch freezing.',
    category: 'dinner', ageGroup: '9mo', prepTime: 15, cookTime: 30, servings: 6,
    ingredients: ['2 white fish fillets, deboned', '2 large potatoes', '1/2 cup frozen peas', '1/2 cup milk', '1 tbsp butter', '1 tbsp flour', 'Pinch of dill'],
    instructions: ['Poach fish in milk for 8 minutes, reserve milk', 'Boil and mash potatoes with butter', 'Make white sauce: melt butter, add flour, stir in reserved milk', 'Flake fish into sauce with peas', 'Top with mash in a baking dish', 'Bake at 375°F for 20 minutes until golden'],
    allergens: ['fish', 'milk', 'wheat'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Omega-3s, lean protein, vitamin D from fish. Calcium from milk sauce.',
    ageTips: { '9mo': 'Mash fish into potato', '12mo': 'Chunky pieces', '2yr': 'Individual ramekin', '3yr+': 'Full pie portion' }
  },
  {
    id: 'mushroom-risotto', title: 'Creamy Mushroom Risotto', emoji: '🍄',
    description: 'Soft, creamy Italian rice dish with earthy mushrooms. The stirring technique makes it perfectly smooth.',
    category: 'dinner', ageGroup: '12mo', prepTime: 5, cookTime: 25, servings: 4,
    ingredients: ['1 cup arborio rice', '2 cups mushrooms, finely diced', '3 cups warm broth', '1/4 cup parmesan', '1 tbsp butter', '1 tbsp olive oil', '1 small onion, diced'],
    instructions: ['Sauté onion and mushrooms in olive oil', 'Add rice, stir 1 minute', 'Add broth 1/2 cup at a time, stirring after each addition', 'Continue until rice is creamy and tender (~20 min)', 'Stir in butter and parmesan', 'Serve warm'],
    allergens: ['milk'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'B vitamins and vitamin D from mushrooms, calcium from parmesan. Comforting and easily digestible.',
    ageTips: { '12mo': 'Naturally soft and scoopable', '2yr': 'With a spoon', '3yr+': 'Full risotto portions' }
  },
  {
    id: 'baked-pasta-pesto', title: 'Pesto Pasta with Peas', emoji: '🌿',
    description: 'Quick, vibrant green pasta with hidden spinach in the pesto. Ready in under 15 minutes.',
    category: 'dinner', ageGroup: '9mo', prepTime: 5, cookTime: 10, servings: 4,
    ingredients: ['2 cups pasta', '1/4 cup basil pesto (low-salt)', '1/2 cup frozen peas', '2 tbsp cream cheese', '1 tbsp olive oil'],
    instructions: ['Cook pasta until soft, adding peas in last 2 minutes', 'Drain, reserving 1/4 cup pasta water', 'Toss with pesto, cream cheese, and olive oil', 'Add pasta water if needed for creaminess', 'Serve warm'],
    allergens: ['wheat', 'milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Iron from pesto and peas, healthy fats from olive oil, protein from cream cheese.',
    ageTips: { '9mo': 'Large tube pasta with sauce', '12mo': 'Any shape', '2yr': 'Self-feeding with fork' }
  },
  {
    id: 'sheet-pan-chicken-veggies', title: 'Sheet Pan Chicken & Veggies', emoji: '🍗',
    description: 'Throw everything on one pan, roast, done. The easiest weeknight dinner that feeds the whole family.',
    category: 'dinner', ageGroup: '9mo', prepTime: 10, cookTime: 25, servings: 4,
    ingredients: ['4 chicken thighs', '2 cups cubed sweet potato', '1 cup broccoli florets', '1 tbsp olive oil', '1 tsp paprika', '1/2 tsp garlic powder'],
    instructions: ['Preheat oven to 425°F', 'Toss veggies and chicken with olive oil and spices', 'Spread on a sheet pan in a single layer', 'Roast 22-25 minutes until chicken is 165°F', 'Rest 5 minutes, then cut to age-appropriate sizes'],
    allergens: [], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Iron and zinc from dark meat chicken, vitamin A from sweet potato, vitamin C from broccoli.',
    ageTips: { '9mo': 'Shred chicken finely, serve very soft veggies', '12mo': 'Small pieces', '2yr': 'Cubed chicken and veggies', '3yr+': 'Full portions' }
  },
  {
    id: 'lamb-kofta', title: 'Mini Lamb Kofta', emoji: '🥙',
    description: 'Middle Eastern spiced lamb patties — iron-rich and full of flavor. Pair with hummus and pita.',
    category: 'dinner', ageGroup: '12mo', prepTime: 15, cookTime: 12, servings: 12,
    ingredients: ['1/2 lb ground lamb', '1/4 cup breadcrumbs', '1 tsp cumin', '1/2 tsp coriander', '1/4 tsp cinnamon', '1 tbsp fresh parsley, minced', '1 clove garlic, minced'],
    instructions: ['Mix all ingredients thoroughly', 'Form into small oval shapes', 'Grill or pan-fry 5-6 minutes per side', 'Rest 2 minutes before serving', 'Serve with hummus, yogurt, or pita'],
    allergens: ['wheat'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Heme iron from lamb (most absorbable form), zinc, B12. Spices are anti-inflammatory.',
    ageTips: { '12mo': 'Flatten and crumble for easy eating', '2yr': 'Whole mini kofta with dip', '3yr+': 'In a pita pocket' }
  },
  {
    id: 'slow-cooker-beef-stew', title: 'Slow Cooker Beef Stew', emoji: '🫕',
    description: 'Set it and forget it. Tender beef and vegetables that fall apart — perfect for all ages.',
    category: 'dinner', ageGroup: '6mo', prepTime: 15, cookTime: 360, servings: 8,
    ingredients: ['1 lb stewing beef, cubed', '2 potatoes, diced', '2 carrots, diced', '1 onion, diced', '2 cups broth', '1 tbsp tomato paste', '1 tsp thyme'],
    instructions: ['Add all ingredients to slow cooker', 'Cook on low 6-8 hours or high 4 hours', 'Beef should be fall-apart tender', 'Puree or mash to age-appropriate texture', 'Season parent portions with salt and pepper'],
    allergens: [], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Iron and zinc from beef, vitamin A from carrots. Slow cooking makes everything ultra-soft.',
    ageTips: { '6mo': 'Puree smooth', '9mo': 'Mash with fork', '12mo': 'Soft chunks', '3yr+': 'Regular stew' }
  },
  {
    id: 'mediterranean-baked-fish', title: 'Mediterranean Baked Fish', emoji: '🫒',
    description: 'White fish baked with tomatoes, olives, and herbs. Simple, elegant, and nutrient-dense.',
    category: 'dinner', ageGroup: '9mo', prepTime: 5, cookTime: 15, servings: 4,
    ingredients: ['2 white fish fillets', '1 cup cherry tomatoes, halved', '8 olives, sliced', '1 tbsp olive oil', '1 tsp dried oregano', 'Juice of 1/2 lemon'],
    instructions: ['Preheat oven to 400°F', 'Place fish in baking dish', 'Surround with tomatoes and olives', 'Drizzle with oil, oregano, and lemon', 'Bake 12-15 minutes until fish flakes', 'Debone carefully before serving'],
    allergens: ['fish'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Omega-3s, vitamin D, lycopene from tomatoes, healthy fats from olives.',
    ageTips: { '9mo': 'Flake fish finely, serve with mashed tomato', '12mo': 'Larger flakes', '2yr': 'Full pieces with veggies', '3yr+': 'Whole fillet' }
  },
  {
    id: 'veggie-lasagna', title: 'Veggie Lasagna Cups', emoji: '🧀',
    description: 'Individual lasagna portions made in a muffin tin. Layers of pasta, ricotta, and hidden veggies.',
    category: 'dinner', ageGroup: '12mo', prepTime: 15, cookTime: 20, servings: 12,
    ingredients: ['6 lasagna sheets, cooked', '1 cup ricotta', '1/2 cup spinach, wilted and chopped', '1/2 cup marinara sauce', '1/4 cup mozzarella'],
    instructions: ['Preheat oven to 375°F', 'Cut lasagna sheets to fit muffin tin', 'Layer: pasta, ricotta-spinach mix, marinara', 'Repeat layers, top with mozzarella', 'Bake 18-20 minutes until bubbly', 'Cool before removing from tin'],
    allergens: ['wheat', 'milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Calcium from ricotta, iron from spinach, protein. Individual portions reduce waste.',
    ageTips: { '12mo': 'Break apart for self-feeding', '2yr': 'Eat whole cup with fork', '3yr+': 'Multiple cups as a meal' }
  },
  // SNACKS — Additional
  {
    id: 'yogurt-bark', title: 'Frozen Yogurt Bark', emoji: '🍫',
    description: 'Spread yogurt on a sheet, add toppings, freeze, and break into bark pieces. So simple, so fun.',
    category: 'snacks', ageGroup: '12mo', prepTime: 5, cookTime: 0, servings: 12,
    ingredients: ['1 cup full-fat Greek yogurt', '1 tbsp honey (12mo+)', '1/4 cup mixed berries', '1 tbsp mini chocolate chips (optional)', '1 tbsp granola (crushed)'],
    instructions: ['Spread yogurt on parchment-lined tray', 'Drizzle honey and scatter toppings', 'Freeze at least 2 hours', 'Break into pieces', 'Store in freezer bag'],
    allergens: ['milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Calcium, probiotics, antioxidants from berries. A healthy alternative to ice cream.',
    ageTips: { '12mo': 'Small, thin pieces that dissolve quickly', '2yr': 'Larger bark pieces', '3yr+': 'Let them design their own bark!' }
  },
  {
    id: 'oat-bars', title: 'Chewy Oat & Date Bars', emoji: '🍯',
    description: 'Sweetened naturally with dates — no sugar needed. Chewy, satisfying, and lunchbox-ready.',
    category: 'snacks', ageGroup: '12mo', prepTime: 10, cookTime: 20, servings: 12,
    ingredients: ['1.5 cups rolled oats', '1/2 cup pitted dates, chopped', '1/4 cup almond butter', '2 tbsp coconut oil, melted', '1/4 cup mashed banana'],
    instructions: ['Preheat oven to 350°F', 'Mix all ingredients until combined', 'Press into lined 8x8 pan', 'Bake 18-20 minutes until golden edges', 'Cool completely before cutting into bars'],
    allergens: ['tree-nuts'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Natural sugars from dates, fiber, healthy fats from almond butter. No refined sugar.',
    ageTips: { '12mo': 'Crumble into pieces', '2yr': 'Cut into thin bars', '3yr+': 'Full bars for lunchbox' }
  },
  {
    id: 'veggie-chips-baked', title: 'Baked Veggie Chips', emoji: '🥕',
    description: 'Thin, crispy vegetable chips baked until crunchy. Way healthier than store-bought!',
    category: 'snacks', ageGroup: '2yr', prepTime: 10, cookTime: 20, servings: 4,
    ingredients: ['1 sweet potato, thinly sliced', '1 beet, thinly sliced', '1 tbsp olive oil', '1/2 tsp paprika'],
    instructions: ['Preheat oven to 375°F', 'Slice veggies very thin (mandoline recommended)', 'Toss with olive oil and paprika', 'Arrange in single layer on lined trays', 'Bake 15-20 minutes until crispy', 'Cool — they crisp up more as they cool'],
    allergens: [], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Vitamin A from sweet potato, iron and folate from beets. No preservatives or excess salt.',
    ageTips: { '2yr': 'Crunchy texture — supervise carefully', '3yr+': 'Great independent snack with dip' }
  },
  {
    id: 'cheese-crackers', title: 'Homemade Cheese Crackers', emoji: '🧀',
    description: 'Like Goldfish but homemade. Cheddar crackers with zero weird ingredients.',
    category: 'snacks', ageGroup: '12mo', prepTime: 15, cookTime: 12, servings: 40,
    ingredients: ['1 cup shredded cheddar', '1/2 cup flour', '2 tbsp cold butter', '1 tbsp water', 'Pinch of paprika'],
    instructions: ['Pulse cheese, flour, butter, and paprika in food processor', 'Add water until dough comes together', 'Roll thin and cut into small shapes', 'Bake at 375°F for 10-12 minutes until crispy', 'Cool completely — they crisp as they cool'],
    allergens: ['milk', 'wheat'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Calcium and protein from cheese. You control the ingredients — no preservatives.',
    ageTips: { '12mo': 'They dissolve easily — safe for new eaters', '2yr': 'Fun shapes!', '3yr+': 'Pack in lunchbox' }
  },
  {
    id: 'fruit-leather', title: 'Homemade Fruit Leather', emoji: '🍓',
    description: 'Pure fruit rolled up — no added sugar. Like a fruit roll-up but actually healthy.',
    category: 'snacks', ageGroup: '2yr', prepTime: 5, cookTime: 180, servings: 12,
    ingredients: ['2 cups strawberries', '1 tbsp lemon juice', '1 tbsp honey (optional, 12mo+)'],
    instructions: ['Blend strawberries and lemon until smooth', 'Strain seeds if desired', 'Spread very thin on parchment-lined tray', 'Bake at 170°F for 3 hours until dry and peelable', 'Cut into strips and roll up', 'Store in airtight container'],
    allergens: [], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Vitamin C, fiber, antioxidants. A naturally sweet treat with no additives.',
    ageTips: { '2yr': 'Cut into small strips — can be sticky', '3yr+': 'Fun rolled strips for lunchbox' }
  },
  {
    id: 'cheese-bites-herb', title: 'Herb & Cheese Bites', emoji: '🧈',
    description: 'Savory, herby cheese bites that are soft inside and golden outside. Protein-packed snacking.',
    category: 'snacks', ageGroup: '12mo', prepTime: 10, cookTime: 15, servings: 20,
    ingredients: ['1 cup shredded cheddar', '1/4 cup flour', '1 egg', '1 tbsp fresh herbs (parsley, chives)', '1/4 tsp garlic powder'],
    instructions: ['Mix all ingredients into a thick batter', 'Drop spoonfuls onto lined baking sheet', 'Bake at 375°F for 12-15 minutes until golden', 'Cool before serving', 'Store in fridge up to 3 days'],
    allergens: ['milk', 'wheat', 'eggs'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Calcium and protein from cheese and egg. Herbs provide trace minerals.',
    ageTips: { '12mo': 'Flatten into discs for gripping', '2yr': 'Whole bites', '3yr+': 'With dipping sauce' }
  },
  {
    id: 'ants-on-a-log', title: 'Ants on a Log', emoji: '🐜',
    description: 'Classic celery with peanut butter and raisins. Fun to assemble and great for fine motor skills!',
    category: 'snacks', ageGroup: '2yr', prepTime: 5, cookTime: 0, servings: 4,
    ingredients: ['4 celery stalks', '4 tbsp peanut butter or sunflower seed butter', 'Raisins for topping'],
    instructions: ['Wash and trim celery into sticks', 'Fill channel with peanut butter', 'Press raisins on top as "ants"', 'Serve immediately'],
    allergens: ['peanuts'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Healthy fats, fiber, iron from raisins. Fun food encourages adventurous eating.',
    ageTips: { '2yr': 'Use soft celery from the inner stalks', '3yr+': 'Let them assemble their own!' }
  },
  {
    id: 'sweet-potato-fries', title: 'Baked Sweet Potato Fries', emoji: '🍠',
    description: 'Crispy-edged, soft-centered fries that are easy to grip. A universal toddler favorite.',
    category: 'snacks', ageGroup: '6mo', prepTime: 5, cookTime: 25, servings: 4,
    ingredients: ['2 medium sweet potatoes', '1 tbsp olive oil', '1/2 tsp paprika', '1/4 tsp garlic powder'],
    instructions: ['Preheat oven to 425°F', 'Cut into thick wedges for babies, thin fries for toddlers', 'Toss with oil and spices', 'Spread in single layer on lined tray', 'Bake 20-25 minutes, flipping halfway'],
    allergens: [], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Vitamin A, fiber, complex carbs. The shape makes them perfect for BLW.',
    ageTips: { '6mo': 'Thick wedges for palmar grasp', '9mo': 'Thinner sticks', '12mo': 'Regular fry shape', '3yr+': 'With ketchup for dipping' }
  },
  // SMOOTHIES — Additional
  {
    id: 'berry-blast-smoothie', title: 'Triple Berry Blast', emoji: '🍓',
    description: 'Three kinds of berries make this a vitamin C powerhouse. Naturally vibrant pink color!',
    category: 'smoothies', ageGroup: '9mo', prepTime: 3, cookTime: 0, servings: 2,
    ingredients: ['1/4 cup strawberries', '1/4 cup blueberries', '1/4 cup raspberries', '1/2 banana', '1/2 cup yogurt', '1/4 cup milk'],
    instructions: ['Add all ingredients to blender', 'Blend until completely smooth', 'Strain seeds if desired for young babies', 'Serve in open cup or on preloaded spoon'],
    allergens: ['milk'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Massive vitamin C boost, antioxidants, probiotics, potassium.',
    ageTips: { '9mo': 'Strain seeds, serve on spoon', '12mo': 'Open cup practice', '2yr': 'With a straw' }
  },
  {
    id: 'tropical-smoothie', title: 'Tropical Paradise Smoothie', emoji: '🥭',
    description: 'Mango, pineapple, and coconut transport taste buds to the tropics. Dairy-free option!',
    category: 'smoothies', ageGroup: '9mo', prepTime: 3, cookTime: 0, servings: 2,
    ingredients: ['1/2 cup frozen mango', '1/4 cup frozen pineapple', '1/4 cup coconut milk', '1/2 banana', '1/4 cup water'],
    instructions: ['Add all ingredients to blender', 'Blend until smooth', 'Add more water if too thick', 'Serve immediately'],
    allergens: [], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Vitamin C, vitamin A, bromelain from pineapple. Dairy-free and naturally sweet.',
    ageTips: { '9mo': 'Thick, on preloaded spoon', '12mo': 'In open cup', '2yr': 'With straw' }
  },
  {
    id: 'iron-booster-smoothie', title: 'Iron Booster Smoothie', emoji: '💪',
    description: 'Designed to maximize iron absorption. Spinach for iron, berries for vitamin C to absorb it.',
    category: 'smoothies', ageGroup: '6mo', prepTime: 3, cookTime: 0, servings: 2,
    ingredients: ['1 handful spinach', '1/2 cup strawberries', '1/2 banana', '1 tbsp ground flaxseed', '1/2 cup milk or formula', '1 tbsp blackstrap molasses (optional, 12mo+)'],
    instructions: ['Blend spinach with liquid first', 'Add remaining ingredients', 'Blend until completely smooth', 'Serve immediately — iron-rich and delicious'],
    allergens: ['milk'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Specifically designed: spinach provides iron, strawberry vitamin C boosts absorption by 67%. Flaxseed adds omega-3s.',
    ageTips: { '6mo': 'On preloaded spoon, skip molasses', '12mo': 'Open cup, add molasses for extra iron', '2yr': 'Full glass' }
  },
  {
    id: 'oat-smoothie', title: 'Banana Oat Cookie Smoothie', emoji: '🍪',
    description: 'Tastes like a cookie but it\'s a nutritious smoothie! Oats make it thick and filling.',
    category: 'smoothies', ageGroup: '9mo', prepTime: 3, cookTime: 0, servings: 2,
    ingredients: ['1 banana', '1/4 cup rolled oats', '1/2 cup milk', '1/4 cup yogurt', '1/2 tsp cinnamon', '1/4 tsp vanilla'],
    instructions: ['Add all ingredients to blender', 'Blend until smooth and thick', 'Let sit 2 minutes for oats to thicken more', 'Serve cold'],
    allergens: ['milk'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Sustained energy from oats, potassium, probiotics, calcium. Filling enough for a mini meal.',
    ageTips: { '9mo': 'Very thick, serve on spoon', '12mo': 'In open cup', '2yr': 'With a straw', '3yr+': 'As a breakfast drink' }
  },
  {
    id: 'avocado-cacao-smoothie', title: 'Chocolate Avocado Smoothie', emoji: '🍫',
    description: 'Chocolatey but healthy! Avocado makes it incredibly creamy. Kids don\'t know it\'s full of veggies.',
    category: 'smoothies', ageGroup: '12mo', prepTime: 3, cookTime: 0, servings: 2,
    ingredients: ['1/2 avocado', '1 banana', '1 tbsp raw cacao powder', '1/2 cup milk', '1/4 cup yogurt', '1 tsp honey (12mo+)'],
    instructions: ['Add all ingredients to blender', 'Blend until ultra smooth', 'Serve immediately'],
    allergens: ['milk'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Healthy fats from avocado, magnesium from cacao, potassium, probiotics. Feels like a treat!',
    ageTips: { '12mo': 'Open cup or spoon', '2yr': 'With a straw', '3yr+': 'Frozen into popsicles too!' }
  },
  {
    id: 'spinach-pear-smoothie', title: 'Spinach Pear Smoothie', emoji: '🍐',
    description: 'The mildest green smoothie — pear completely masks the spinach. Perfect for picky toddlers.',
    category: 'smoothies', ageGroup: '6mo', prepTime: 3, cookTime: 0, servings: 2,
    ingredients: ['1 ripe pear, peeled', '1 handful baby spinach', '1/2 banana', '1/4 cup yogurt', '1/4 cup water'],
    instructions: ['Blend spinach with water first', 'Add pear, banana, and yogurt', 'Blend until silky smooth', 'Serve immediately'],
    allergens: ['milk'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Iron from spinach, fiber from pear, probiotics. The gentlest green smoothie for beginners.',
    ageTips: { '6mo': 'On preloaded spoon', '9mo': 'Thick in open cup', '12mo': 'Regular smoothie' }
  },
  {
    id: 'golden-turmeric-smoothie', title: 'Golden Milk Smoothie', emoji: '✨',
    description: 'Anti-inflammatory golden milk in smoothie form. Warming spices with natural sweetness.',
    category: 'smoothies', ageGroup: '12mo', prepTime: 3, cookTime: 0, servings: 2,
    ingredients: ['1 banana', '1/2 cup milk', '1/4 tsp turmeric', 'Pinch of cinnamon', 'Pinch of ginger', '1/4 cup yogurt', '1 tsp honey (12mo+)'],
    instructions: ['Add all ingredients to blender', 'Blend until smooth', 'Serve immediately — beautiful golden color'],
    allergens: ['milk'], freezerFriendly: false, familyFriendly: true,
    nutritionNotes: 'Turmeric is anti-inflammatory, ginger aids digestion, calcium from dairy.',
    ageTips: { '12mo': 'In open cup', '2yr': 'With a straw', '3yr+': 'Warm version as a drink' }
  },
  // BATCH COOKING — Additional
  {
    id: 'freezer-burritos', title: 'Mini Freezer Burritos', emoji: '🌯',
    description: 'Batch-make a dozen burritos, freeze, and microwave on busy mornings. Lifesaver for working parents.',
    category: 'batch-cooking', ageGroup: '12mo', prepTime: 20, cookTime: 10, servings: 12,
    ingredients: ['6 small flour tortillas', '1 cup cooked rice', '1 can black beans, mashed', '1/2 cup shredded cheese', '1/2 cup diced veggies (peppers, corn)', '1/2 tsp cumin'],
    instructions: ['Mix rice, beans, cheese, veggies, and cumin', 'Divide filling among tortilla halves', 'Roll up tightly, tucking in sides', 'Wrap individually in foil', 'Freeze up to 3 months', 'Reheat from frozen: microwave 1-2 min, let cool'],
    allergens: ['wheat', 'milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Complete protein from rice + beans combo, calcium, fiber. A complete meal in your hand.',
    ageTips: { '12mo': 'Unwrap and cut into strips', '2yr': 'Half burrito', '3yr+': 'Whole mini burrito' }
  },
  {
    id: 'soup-cubes', title: 'Immune-Boost Soup Cubes', emoji: '🧊',
    description: 'Concentrated vegetable soup frozen into cubes. Pop one into hot water for instant nourishing soup.',
    category: 'batch-cooking', ageGroup: '6mo', prepTime: 15, cookTime: 30, servings: 24,
    ingredients: ['2 carrots', '2 celery stalks', '1 sweet potato', '1 zucchini', '1 onion', '2 cloves garlic', '4 cups broth', '1 tsp turmeric'],
    instructions: ['Dice all vegetables', 'Sauté onion and garlic in olive oil', 'Add remaining vegetables and broth', 'Simmer 25-30 minutes until all veggies are very soft', 'Blend until smooth', 'Pour into ice cube trays and freeze', 'Pop cubes into hot water or add to rice/pasta for instant nutrition'],
    allergens: [], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Concentrated vitamins and minerals. Turmeric is anti-inflammatory. Perfect when baby is sick.',
    ageTips: { '6mo': 'Dilute 1 cube in water as smooth soup', '9mo': 'Stir cube into mashed food', '12mo': 'Add to pasta for sauce', '3yr+': 'Quick soup base' }
  },
  {
    id: 'tomato-sauce-base', title: 'Veggie-Packed Tomato Sauce', emoji: '🍅',
    description: 'The ultimate hidden-veggie sauce. Blend vegetables into tomato sauce — nobody will ever know.',
    category: 'batch-cooking', ageGroup: '6mo', prepTime: 10, cookTime: 30, servings: 16,
    ingredients: ['2 cans crushed tomatoes', '1 carrot, grated', '1 zucchini, grated', '1/2 cup butternut squash, diced', '1 onion, diced', '2 cloves garlic', '1 tsp basil', '1 tsp oregano', '1 tbsp olive oil'],
    instructions: ['Sauté onion and garlic in olive oil', 'Add grated veggies and squash, cook 5 min', 'Add tomatoes and herbs', 'Simmer 25 minutes', 'Blend until smooth', 'Freeze in portions — use as pasta sauce, pizza base, or dipping sauce'],
    allergens: [], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Lycopene, vitamin A, vitamin C, fiber. The hidden veggies add nutrition without changing taste.',
    ageTips: { '6mo': 'Smooth puree over baby rice', '9mo': 'Over soft pasta', '12mo': 'As pizza or dipping sauce', '3yr+': 'Spaghetti sauce!' }
  },
  {
    id: 'grain-bowl-prep', title: 'Mix & Match Grain Bowls', emoji: '🥗',
    description: 'Prep grains, proteins, and veggies separately. Mix and match throughout the week for variety.',
    category: 'batch-cooking', ageGroup: '12mo', prepTime: 30, cookTime: 30, servings: 10,
    ingredients: ['2 cups quinoa or brown rice, cooked', '1 lb chicken breast, baked and diced', '2 cups roasted vegetables (sweet potato, broccoli, peppers)', '1 can chickpeas, roasted', '1/2 cup hummus', 'Lemon-tahini dressing: 2 tbsp tahini, 1 lemon, 1 tbsp olive oil'],
    instructions: ['Cook grain of choice', 'Bake chicken at 400°F until done, dice', 'Roast vegetables until tender', 'Store each component in separate containers', 'Assemble bowls daily: grain + protein + veggies + sauce', 'Mix and match for 4-5 different meals'],
    allergens: ['sesame'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Meal prep strategy! Different combinations every day from one batch cook session.',
    ageTips: { '12mo': 'Soft pieces as finger foods', '2yr': 'Mixed bowl with fork', '3yr+': 'Let them build their own bowl!' }
  },
  {
    id: 'chicken-veggie-muffins', title: 'Savory Chicken Veggie Muffins', emoji: '🧁',
    description: 'Muffin-shaped chicken and veggie bites. Perfect for lunchboxes and on-the-go meals.',
    category: 'batch-cooking', ageGroup: '9mo', prepTime: 15, cookTime: 20, servings: 12,
    ingredients: ['1/2 lb ground chicken', '1/2 cup grated zucchini', '1/4 cup grated carrot', '1/4 cup breadcrumbs', '1 egg', '2 tbsp shredded cheese'],
    instructions: ['Preheat oven to 375°F', 'Mix all ingredients thoroughly', 'Divide into greased mini muffin tin', 'Bake 18-20 minutes until cooked through', 'Cool before removing from tin', 'Freeze in bags for up to 3 months'],
    allergens: ['eggs', 'wheat', 'milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Protein, hidden veggies, calcium. Muffin shape is fun and portable.',
    ageTips: { '9mo': 'Crumble or cut in half', '12mo': 'Whole mini muffin', '2yr': 'With dipping sauce', '3yr+': 'Pack in lunchbox' }
  },
  {
    id: 'lentil-bolognese-batch', title: 'Lentil Bolognese Batch', emoji: '🍝',
    description: 'Plant-based bolognese that\'s just as rich as the meat version. Iron-packed and freezer-friendly.',
    category: 'batch-cooking', ageGroup: '6mo', prepTime: 10, cookTime: 30, servings: 12,
    ingredients: ['1.5 cups brown or green lentils', '1 can crushed tomatoes', '1 carrot, finely diced', '1 celery stalk, finely diced', '1 onion, diced', '2 cloves garlic', '1 tsp Italian seasoning', '1 tbsp olive oil'],
    instructions: ['Sauté onion, garlic, carrot, and celery', 'Add lentils, tomatoes, and 2 cups water', 'Stir in Italian seasoning', 'Simmer 25-30 minutes until lentils are very soft', 'Mash or blend to desired consistency', 'Freeze in portions'],
    allergens: [], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Iron, plant protein, fiber, folate. Lentils are one of the most nutritious foods for babies.',
    ageTips: { '6mo': 'Blend smooth', '9mo': 'Mashed', '12mo': 'Chunky over pasta', '3yr+': 'Regular bolognese' }
  },
  {
    id: 'sweet-potato-black-bean-bake', title: 'Sweet Potato & Black Bean Bake', emoji: '🫘',
    description: 'A Mexican-inspired casserole that freezes beautifully. Cut into squares for easy portioning.',
    category: 'batch-cooking', ageGroup: '12mo', prepTime: 15, cookTime: 30, servings: 8,
    ingredients: ['2 large sweet potatoes, cubed', '1 can black beans, rinsed', '1 cup corn', '1/2 cup salsa (mild)', '1 cup shredded cheese', '1 tsp cumin'],
    instructions: ['Preheat oven to 375°F', 'Roast sweet potato cubes for 15 minutes', 'Mix with beans, corn, salsa, and cumin', 'Transfer to baking dish', 'Top with cheese', 'Bake 15 minutes until cheese is bubbly', 'Cool and cut into squares'],
    allergens: ['milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Plant protein from beans, vitamin A from sweet potato, calcium from cheese.',
    ageTips: { '12mo': 'Mash portions together', '2yr': 'Cut squares for self-feeding', '3yr+': 'Regular portions with sour cream' }
  },
  {
    id: 'turkey-spinach-pasta-bake', title: 'Turkey Spinach Pasta Bake', emoji: '🍝',
    description: 'A complete meal in one dish — protein, veggies, grains, and dairy all baked together.',
    category: 'batch-cooking', ageGroup: '12mo', prepTime: 15, cookTime: 25, servings: 8,
    ingredients: ['2 cups pasta', '1/2 lb ground turkey', '2 cups fresh spinach', '1 cup marinara', '1/2 cup ricotta', '1/2 cup mozzarella'],
    instructions: ['Cook pasta until just done', 'Brown turkey, add spinach until wilted', 'Mix pasta, turkey-spinach, marinara, and ricotta', 'Transfer to baking dish, top with mozzarella', 'Bake at 375°F for 20-25 minutes', 'Cool, portion, and freeze extras'],
    allergens: ['wheat', 'milk'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Lean protein, iron from turkey and spinach, calcium from cheese. All food groups in one dish.',
    ageTips: { '12mo': 'Use large tube pasta', '2yr': 'Any shape with a fork', '3yr+': 'Regular portions' }
  },
  {
    id: 'banana-oat-cookies', title: 'Two-Ingredient Baby Cookies', emoji: '🍪',
    description: 'Just banana and oats — that\'s it! Soft, naturally sweet cookies that are perfect first finger foods.',
    category: 'batch-cooking', ageGroup: '6mo', prepTime: 5, cookTime: 15, servings: 12,
    ingredients: ['2 ripe bananas', '1 cup rolled oats'],
    instructions: ['Mash bananas thoroughly', 'Mix in oats', 'Drop spoonfuls onto parchment-lined tray', 'Flatten slightly', 'Bake at 350°F for 12-15 minutes', 'Cool — they\'re soft and dissolve easily'],
    allergens: [], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Just two whole food ingredients! Potassium, fiber, iron from oats. No sugar needed.',
    ageTips: { '6mo': 'Soft enough to gum — dissolves safely', '9mo': 'Perfect self-feeding', '12mo': 'Add mix-ins like blueberries' }
  },
  {
    id: 'salmon-pea-cakes', title: 'Salmon & Pea Fishcakes', emoji: '🐟',
    description: 'Omega-3 packed fishcakes with green peas for color and fiber. Batch-freeze for quick protein.',
    category: 'batch-cooking', ageGroup: '9mo', prepTime: 15, cookTime: 12, servings: 12,
    ingredients: ['1 can salmon, drained', '1 cup mashed potato', '1/2 cup peas, mashed', '1 egg', '1/4 cup breadcrumbs', '1 tbsp fresh dill'],
    instructions: ['Mix all ingredients until combined', 'Form into small patties', 'Pan-fry in olive oil 3-4 minutes per side', 'Or bake at 400°F for 12 minutes', 'Freeze in a single layer, then bag'],
    allergens: ['fish', 'eggs', 'wheat'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Omega-3 DHA for brain development, protein, fiber from peas.',
    ageTips: { '9mo': 'Crumble or flatten for easy gripping', '12mo': 'Whole small patties', '2yr': 'With lemon yogurt dip', '3yr+': 'Full fishcake portions' }
  },
  {
    id: 'chicken-fried-rice-batch', title: 'Batch Chicken Fried Rice', emoji: '🍚',
    description: 'Make a huge batch, freeze in portions. Reheat for a complete meal in 2 minutes.',
    category: 'batch-cooking', ageGroup: '12mo', prepTime: 10, cookTime: 15, servings: 8,
    ingredients: ['3 cups cooked rice', '2 chicken breasts, diced', '2 eggs, scrambled', '1 cup mixed frozen veggies', '2 tbsp soy sauce', '1 tbsp sesame oil'],
    instructions: ['Cook chicken in a large wok or pan', 'Push aside, scramble eggs', 'Add rice and veggies, toss everything together', 'Drizzle with soy sauce and sesame oil', 'Cook until heated through', 'Cool, portion into containers, freeze'],
    allergens: ['eggs', 'soy', 'sesame'], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Complete meal: protein from chicken and eggs, carbs from rice, vitamins from veggies.',
    ageTips: { '12mo': 'Rice clumps together for easy self-feeding', '2yr': 'With spoon or fork', '3yr+': 'Regular portions' }
  },
  {
    id: 'beef-veggie-casserole', title: 'Hearty Beef & Veggie Casserole', emoji: '🥘',
    description: 'A one-pot casserole with tender beef and root vegetables. Comfort food for the whole family.',
    category: 'batch-cooking', ageGroup: '9mo', prepTime: 15, cookTime: 45, servings: 8,
    ingredients: ['1 lb stewing beef', '2 potatoes, diced', '2 carrots, diced', '1 parsnip, diced', '1 can diced tomatoes', '2 cups broth', '1 tsp mixed herbs'],
    instructions: ['Brown beef in batches in a large oven-safe pot', 'Add all vegetables, tomatoes, and broth', 'Stir in herbs', 'Cover and bake at 325°F for 2 hours', 'Or simmer on stovetop for 1.5 hours', 'Portion and freeze'],
    allergens: [], freezerFriendly: true, familyFriendly: true,
    nutritionNotes: 'Heme iron from beef, vitamin A from carrots, fiber from root vegetables.',
    ageTips: { '9mo': 'Mash everything together', '12mo': 'Soft chunks', '2yr': 'Scooped with spoon', '3yr+': 'Full portions' }
  },
];

