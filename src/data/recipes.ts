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
];
