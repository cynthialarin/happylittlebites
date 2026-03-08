import { FoodEntry } from '@/types';

export const foods: FoodEntry[] = [
  {
    id: 'avocado', name: 'Avocado', emoji: '🥑', foodGroup: 'fruits', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft texture, low risk when ripe',
    servingByAge: { '6mo': 'Mash or serve as thick spears', '9mo': 'Diced or sliced strips', '12mo': 'Sliced or cubed', '2yr': 'Sliced, on toast, in guacamole', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Healthy fats', 'Potassium', 'Fiber', 'Vitamin K'],
    commonReactions: ['Rarely allergenic'], prepTips: 'Choose ripe avocados that yield to gentle pressure. Toss with lemon to prevent browning.',
    safeFromAge: '6mo'
  },
  {
    id: 'banana', name: 'Banana', emoji: '🍌', foodGroup: 'fruits', allergens: [],
    chokingHazard: true, chokingNotes: 'Can be slippery — roll in crushed cereal for grip',
    servingByAge: { '6mo': 'Halved lengthwise with skin partially on for grip', '9mo': 'Sliced into rounds or mashed', '12mo': 'Bite-sized pieces', '2yr': 'Peeled whole or sliced', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Potassium', 'Vitamin B6', 'Fiber', 'Natural energy'],
    commonReactions: ['May cause constipation in some babies'], prepTips: 'Slightly underripe bananas are less slippery and easier to grip.',
    safeFromAge: '6mo'
  },
  {
    id: 'sweet-potato', name: 'Sweet Potato', emoji: '🍠', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Safe when cooked soft',
    servingByAge: { '6mo': 'Steamed spears or mashed puree', '9mo': 'Soft cubes or wedges', '12mo': 'Cubed, mashed, or as fries', '2yr': 'Baked, mashed, or as fries', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin A', 'Fiber', 'Vitamin C', 'Iron'],
    commonReactions: ['Very rarely allergenic'], prepTips: 'Roasting brings out natural sweetness. Steam for softer texture for younger babies.',
    safeFromAge: '6mo'
  },
  {
    id: 'eggs', name: 'Eggs', emoji: '🥚', foodGroup: 'protein', allergens: ['eggs'],
    chokingHazard: false, chokingNotes: 'Soft when cooked, low risk',
    servingByAge: { '6mo': 'Scrambled or as thin omelet strips', '9mo': 'Scrambled or hard-boiled in wedges', '12mo': 'Any style — scrambled, boiled, fried', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Complete protein', 'Choline', 'Iron', 'Vitamin D'],
    commonReactions: ['One of top 9 allergens', 'Watch for hives, vomiting, swelling'], prepTips: 'Introduce early (around 6mo) — early exposure may reduce allergy risk. Cook fully.',
    safeFromAge: '6mo'
  },
  {
    id: 'peanut-butter', name: 'Peanut Butter', emoji: '🥜', foodGroup: 'nuts-seeds', allergens: ['peanuts'],
    chokingHazard: true, chokingNotes: 'Never serve whole nuts or thick globs — thin spread or mix into purees',
    servingByAge: { '6mo': 'Thin layer on toast strip or mixed into puree', '9mo': 'Thin spread on soft foods', '12mo': 'Spread on toast, mixed into oatmeal', '2yr': 'Spread on crackers, in smoothies', '3yr+': 'Any preparation — still avoid whole nuts until 4+' },
    nutritionHighlights: ['Protein', 'Healthy fats', 'Vitamin E', 'Niacin'],
    commonReactions: ['Top allergen — watch for hives, swelling, breathing difficulty', 'Introduce early per AAP guidelines'], prepTips: 'Use smooth, natural peanut butter. Mix with breast milk or water for thinner consistency for first intro.',
    safeFromAge: '6mo'
  },
  {
    id: 'yogurt', name: 'Yogurt', emoji: '🥛', foodGroup: 'dairy', allergens: ['milk'],
    chokingHazard: false, chokingNotes: 'Smooth texture, no choking risk',
    servingByAge: { '6mo': 'Full-fat plain yogurt, spoon-fed or on preloaded spoon', '9mo': 'Serve as dip or mixed with fruit puree', '12mo': 'In bowls, as dip, mixed with granola', '2yr': 'Any style', '3yr+': 'Any style' },
    nutritionHighlights: ['Calcium', 'Protein', 'Probiotics', 'Vitamin B12'],
    commonReactions: ['Dairy allergen — watch for rash, digestive issues'], prepTips: 'Choose plain, full-fat, unsweetened yogurt. Greek yogurt has more protein.',
    safeFromAge: '6mo'
  },
  {
    id: 'salmon', name: 'Salmon', emoji: '🐟', foodGroup: 'protein', allergens: ['fish'],
    chokingHazard: false, chokingNotes: 'Flakes easily, low risk when deboned',
    servingByAge: { '6mo': 'Flaked and mashed, or as large fillet strip', '9mo': 'Flaked into soft pieces', '12mo': 'Small flaked pieces or salmon cakes', '2yr': 'Salmon cakes, flaked on pasta', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Omega-3 DHA', 'Protein', 'Vitamin D', 'Selenium'],
    commonReactions: ['Fish allergen — introduce carefully'], prepTips: 'Remove ALL bones carefully. Wild-caught has fewer contaminants. Bake or steam for easy flaking.',
    safeFromAge: '6mo'
  },
  {
    id: 'chicken', name: 'Chicken', emoji: '🍗', foodGroup: 'protein', allergens: [],
    chokingHazard: true, chokingNotes: 'Can be tough — serve as strips or shredded',
    servingByAge: { '6mo': 'Drumstick with cartilage removed, or pureed', '9mo': 'Shredded or minced', '12mo': 'Small shredded pieces or strips', '2yr': 'Cut into pieces', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Iron', 'Zinc', 'B vitamins'],
    commonReactions: ['Rarely allergenic'], prepTips: 'Dark meat is more tender and iron-rich. Slow cook or braise for softer texture.',
    safeFromAge: '6mo'
  },
  {
    id: 'broccoli', name: 'Broccoli', emoji: '🥦', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Florets are natural handles — cook until very soft',
    servingByAge: { '6mo': 'Steamed whole florets (natural handle)', '9mo': 'Steamed florets, soft enough to squish', '12mo': 'Steamed or roasted florets', '2yr': 'Roasted, in stir-fry, raw with dip', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C', 'Vitamin K', 'Fiber', 'Iron'],
    commonReactions: ['May cause gas'], prepTips: 'Steam until very tender for young babies. The "tree" shape makes it fun and easy to grip.',
    safeFromAge: '6mo'
  },
  {
    id: 'oatmeal', name: 'Oatmeal', emoji: '🥣', foodGroup: 'grains', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft texture, very safe',
    servingByAge: { '6mo': 'Thin porridge consistency', '9mo': 'Thicker porridge, can add mix-ins', '12mo': 'Regular oatmeal with toppings', '2yr': 'Any preparation — overnight oats, baked oats', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Fiber', 'Iron', 'Magnesium', 'B vitamins'],
    commonReactions: ['Generally very well tolerated'], prepTips: 'Start with baby oat cereal or finely ground oats. Increase texture over time.',
    safeFromAge: '6mo'
  },
  {
    id: 'strawberry', name: 'Strawberry', emoji: '🍓', foodGroup: 'fruits', allergens: [],
    chokingHazard: true, chokingNotes: 'Cut large ones in half or quarters — can be slippery',
    servingByAge: { '6mo': 'Halved large berries or mashed', '9mo': 'Quartered or thinly sliced', '12mo': 'Halved or quartered', '2yr': 'Whole if small, halved if large', '3yr+': 'Whole' },
    nutritionHighlights: ['Vitamin C', 'Manganese', 'Antioxidants', 'Fiber'],
    commonReactions: ['May cause contact rash (not true allergy)', 'Acidic — may irritate skin around mouth'], prepTips: 'A contact rash from strawberries is very common and NOT an allergy. Wipe face with damp cloth after eating.',
    safeFromAge: '6mo'
  },
  {
    id: 'toast', name: 'Toast / Bread', emoji: '🍞', foodGroup: 'grains', allergens: ['wheat'],
    chokingHazard: true, chokingNotes: 'Toast lightly — soft bread can be gummy and stick to palate',
    servingByAge: { '6mo': 'Lightly toasted strips with thin spread', '9mo': 'Toast strips or soldiers', '12mo': 'Toast with toppings, small sandwiches', '2yr': 'Sandwiches, toast any style', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Carbohydrates', 'B vitamins', 'Fiber (whole grain)'],
    commonReactions: ['Wheat is a top allergen — watch for digestive issues, rash'], prepTips: 'Choose whole grain when possible. Toast lightly to reduce gumminess. Avoid honey before 12 months.',
    safeFromAge: '6mo'
  },
  {
    id: 'tofu', name: 'Tofu', emoji: '🫘', foodGroup: 'protein', allergens: ['soy'],
    chokingHazard: false, chokingNotes: 'Soft texture, very safe',
    servingByAge: { '6mo': 'Strips of firm tofu, pan-fried for grip', '9mo': 'Cubed or crumbled', '12mo': 'Cubed, in stir-fry, scrambled', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Plant protein', 'Calcium', 'Iron', 'Isoflavones'],
    commonReactions: ['Soy is a top allergen — watch for rash, digestive issues'], prepTips: 'Use firm or extra-firm for finger food. Pan-fry for a crispy exterior that\'s easier to grip.',
    safeFromAge: '6mo'
  },
  {
    id: 'cheese', name: 'Cheese', emoji: '🧀', foodGroup: 'dairy', allergens: ['milk'],
    chokingHazard: true, chokingNotes: 'Shred or serve as thin strips — avoid cubes for young babies',
    servingByAge: { '6mo': 'Thin shreds or melted on toast', '9mo': 'Shredded or thin slices', '12mo': 'Sliced, cubed (soft cheeses), grated', '2yr': 'Any safe cheese preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Calcium', 'Protein', 'Vitamin A', 'Phosphorus'],
    commonReactions: ['Dairy allergen', 'May cause constipation'], prepTips: 'Start with mild, pasteurized cheeses. Avoid unpasteurized cheeses for young children.',
    safeFromAge: '6mo'
  },
  {
    id: 'lentils', name: 'Lentils', emoji: '🫘', foodGroup: 'legumes', allergens: [],
    chokingHazard: false, chokingNotes: 'Small and soft, very safe',
    servingByAge: { '6mo': 'Well-cooked and mashed into puree', '9mo': 'Mashed or in thick soup', '12mo': 'Whole lentils in soups, dals', '2yr': 'In soups, curries, salads', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Iron', 'Plant protein', 'Fiber', 'Folate'],
    commonReactions: ['May cause gas — introduce gradually'], prepTips: 'Red lentils cook fastest and break down easily for purees. Great iron source for plant-based families.',
    safeFromAge: '6mo'
  },
  {
    id: 'apple', name: 'Apple', emoji: '🍎', foodGroup: 'fruits', allergens: [],
    chokingHazard: true, chokingNotes: 'Raw apple is a top choking hazard — always cook for under 3',
    servingByAge: { '6mo': 'Steamed/baked until very soft, as spears', '9mo': 'Grated raw or cooked soft pieces', '12mo': 'Very thinly sliced raw or cooked', '2yr': 'Thin slices, grated raw', '3yr+': 'Regular slices — supervise until 4' },
    nutritionHighlights: ['Fiber', 'Vitamin C', 'Quercetin', 'Potassium'],
    commonReactions: ['Rarely allergenic'], prepTips: '⚠️ RAW APPLE is a leading choking hazard. Always cook, grate, or slice paper-thin for babies and toddlers.',
    safeFromAge: '6mo'
  },
  {
    id: 'carrot', name: 'Carrot', emoji: '🥕', foodGroup: 'vegetables', allergens: [],
    chokingHazard: true, chokingNotes: 'Raw carrots are a choking hazard — always cook soft for babies',
    servingByAge: { '6mo': 'Steamed sticks, very soft', '9mo': 'Soft cooked sticks or grated raw', '12mo': 'Cooked pieces, grated raw', '2yr': 'Cooked sticks, thin raw sticks with supervision', '3yr+': 'Raw sticks with supervision' },
    nutritionHighlights: ['Vitamin A (beta-carotene)', 'Fiber', 'Vitamin K', 'Potassium'],
    commonReactions: ['Very rarely allergenic'], prepTips: 'Steam or roast until easily mashable with a fork. Raw carrots are too hard for babies.',
    safeFromAge: '6mo'
  },
  {
    id: 'rice', name: 'Rice', emoji: '🍚', foodGroup: 'grains', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked, safe',
    servingByAge: { '6mo': 'Well-cooked and mashed/pureed', '9mo': 'Sticky rice balls or porridge', '12mo': 'Regular cooked rice', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Carbohydrates', 'B vitamins', 'Manganese'],
    commonReactions: ['Contains low levels of arsenic — vary grains'], prepTips: 'Limit rice to 1-2 servings per week due to arsenic content. Rinse well before cooking.',
    safeFromAge: '6mo'
  },
  {
    id: 'blueberry', name: 'Blueberries', emoji: '🫐', foodGroup: 'fruits', allergens: [],
    chokingHazard: true, chokingNotes: 'Small and round — squish or halve for babies',
    servingByAge: { '6mo': 'Mashed or flattened', '9mo': 'Squished or halved', '12mo': 'Halved', '2yr': 'Whole for most toddlers', '3yr+': 'Whole' },
    nutritionHighlights: ['Antioxidants', 'Vitamin C', 'Vitamin K', 'Fiber'],
    commonReactions: ['May stain everything purple!'], prepTips: 'Flatten each berry with the back of a fork for young babies. Frozen blueberries are great for teething.',
    safeFromAge: '6mo'
  },
  {
    id: 'pasta', name: 'Pasta', emoji: '🍝', foodGroup: 'grains', allergens: ['wheat'],
    chokingHazard: false, chokingNotes: 'Cook well, choose appropriate shapes',
    servingByAge: { '6mo': 'Large fusilli or penne for gripping', '9mo': 'Any well-cooked pasta shape', '12mo': 'Any pasta with sauce', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Carbohydrates', 'B vitamins', 'Iron (enriched)'],
    commonReactions: ['Wheat allergen'], prepTips: 'Fusilli and penne are great starter shapes — easy to grip. Overcook slightly for younger babies.',
    safeFromAge: '6mo'
  },
  {
    id: 'beef', name: 'Beef', emoji: '🥩', foodGroup: 'protein', allergens: [],
    chokingHazard: true, chokingNotes: 'Serve ground or as very tender strips',
    servingByAge: { '6mo': 'Pureed or as a large strip to suck/gnaw on', '9mo': 'Ground beef or very tender shreds', '12mo': 'Ground in patties, shredded', '2yr': 'Diced tender pieces, meatballs', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Iron (heme)', 'Zinc', 'Protein', 'B12'],
    commonReactions: ['Very rarely allergenic'], prepTips: 'One of the best iron sources for babies. Slow-cook for tenderness. Pair with vitamin C for iron absorption.',
    safeFromAge: '6mo'
  },
  {
    id: 'mango', name: 'Mango', emoji: '🥭', foodGroup: 'fruits', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when ripe, low risk',
    servingByAge: { '6mo': 'Ripe mango spears or mashed', '9mo': 'Diced or sliced', '12mo': 'Cubed or sliced', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin A', 'Vitamin C', 'Folate', 'Fiber'],
    commonReactions: ['May cause contact dermatitis around mouth'], prepTips: 'Score the pit side, push inside out, cut cubes off the skin. Frozen mango strips are great teethers.',
    safeFromAge: '6mo'
  },
  {
    id: 'peas', name: 'Peas', emoji: '🫛', foodGroup: 'vegetables', allergens: [],
    chokingHazard: true, chokingNotes: 'Small and round — squish for young babies',
    servingByAge: { '6mo': 'Mashed or flattened', '9mo': 'Squished or whole if pincer grasp developing', '12mo': 'Whole peas', '2yr': 'Whole peas', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Fiber', 'Vitamin K', 'Iron'],
    commonReactions: ['Well tolerated'], prepTips: 'Frozen peas are nutritious and convenient. Squish each one for babies under 9 months.',
    safeFromAge: '6mo'
  },
  {
    id: 'tahini', name: 'Tahini (Sesame)', emoji: '🫙', foodGroup: 'nuts-seeds', allergens: ['sesame'],
    chokingHazard: false, chokingNotes: 'Paste form, safe',
    servingByAge: { '6mo': 'Mixed into purees or thinned and drizzled', '9mo': 'Spread thin on toast or mixed into food', '12mo': 'As dressing, in hummus, spread', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Calcium', 'Iron', 'Healthy fats', 'Protein'],
    commonReactions: ['Sesame is the newest top 9 allergen — watch for hives, swelling'], prepTips: 'Tahini is the easiest way to introduce sesame. Mix a small amount into familiar food for first exposure.',
    safeFromAge: '6mo'
  },
];
