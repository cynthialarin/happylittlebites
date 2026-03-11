import { FoodEntry } from '@/types';

export const culturalFoods: FoodEntry[] = [
  // ===== LATIN AMERICAN =====
  {
    id: 'plantain', name: 'Plantain', emoji: '🍌', foodGroup: 'fruits', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked, low risk',
    servingByAge: { '6mo': 'Mashed ripe plantain or steamed spears', '9mo': 'Soft cooked pieces', '12mo': 'Pan-fried slices', '2yr': 'Tostones or maduros', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Potassium', 'Vitamin A', 'Vitamin C', 'Fiber'],
    commonReactions: ['Well tolerated'], prepTips: 'Ripe (black) plantains are sweet and soft. Green plantains are starchy — cook thoroughly.',
    safeFromAge: '6mo'
  },
  {
    id: 'black-beans', name: 'Black Beans', emoji: '🫘', foodGroup: 'legumes', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked, mash for young babies',
    servingByAge: { '6mo': 'Mashed or pureed', '9mo': 'Lightly mashed', '12mo': 'Whole soft beans', '2yr': 'In burritos, rice bowls', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Iron', 'Fiber', 'Folate'],
    commonReactions: ['May cause gas'], prepTips: 'Canned beans work great — rinse to reduce sodium. Mash with lime for extra flavor.',
    safeFromAge: '6mo'
  },
  {
    id: 'jicama', name: 'Jicama', emoji: '🥔', foodGroup: 'vegetables', allergens: [],
    chokingHazard: true, chokingNotes: 'Raw is crunchy — grate or cook for babies',
    servingByAge: { '6mo': 'Steamed soft sticks or grated', '9mo': 'Steamed sticks', '12mo': 'Thin raw sticks if well supervised', '2yr': 'Raw sticks with lime', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C', 'Fiber', 'Potassium', 'Low calorie'],
    commonReactions: ['Well tolerated'], prepTips: 'Peel completely. Steam for babies, serve raw with lime and chili for older kids.',
    safeFromAge: '6mo'
  },
  {
    id: 'chayote', name: 'Chayote', emoji: '🥒', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked',
    servingByAge: { '6mo': 'Steamed and mashed', '9mo': 'Soft cooked pieces', '12mo': 'Cubed in soups', '2yr': 'In stews, stir-fries', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C', 'Folate', 'Fiber', 'Manganese'],
    commonReactions: ['Very well tolerated'], prepTips: 'Peel, remove seed, and steam until fork-tender. Mild flavor pairs well with anything.',
    safeFromAge: '6mo'
  },
  {
    id: 'dulce-de-leche', name: 'Dulce de Leche', emoji: '🥛', foodGroup: 'dairy', allergens: ['milk'],
    chokingHazard: false, chokingNotes: 'Sticky but no choking risk',
    servingByAge: { '6mo': 'Not recommended — high sugar', '9mo': 'Tiny taste on fruit', '12mo': 'Small amount as spread', '2yr': 'On toast, with fruit', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Calcium', 'Protein', 'Energy dense'],
    commonReactions: ['Contains milk — allergen'], prepTips: 'Use sparingly due to high sugar content. Great for adding calories if needed.',
    safeFromAge: '9mo'
  },
  {
    id: 'yuca', name: 'Yuca (Cassava)', emoji: '🥔', foodGroup: 'vegetables', allergens: [],
    chokingHazard: true, chokingNotes: '⚠️ Must be peeled and cooked thoroughly — NEVER serve raw. Contains cyanogenic compounds.',
    servingByAge: { '6mo': 'Boiled until very soft and mashed', '9mo': 'Soft boiled sticks', '12mo': 'Boiled or baked pieces', '2yr': 'Yuca fries (baked preferred)', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C', 'Manganese', 'Carbohydrates', 'Potassium'],
    commonReactions: ['Well tolerated when properly cooked'], prepTips: '⚠️ Per WHO/FDA: yuca MUST be peeled and cooked thoroughly. Raw cassava contains naturally occurring cyanogenic glycosides that are toxic. Boil in water for at least 20 minutes. Sweet cassava varieties are safer than bitter. Discard cooking water.',
    safeFromAge: '6mo'
  },

  // ===== SOUTH ASIAN =====
  {
    id: 'dal', name: 'Dal (Lentils)', emoji: '🍲', foodGroup: 'legumes', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft and soupy, very safe',
    servingByAge: { '6mo': 'Thin dal puree — excellent iron-rich first food', '9mo': 'Thicker dal with soft rice', '12mo': 'Dal with rice, roti pieces', '2yr': 'Regular dal with any accompaniment', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Iron (non-heme)', 'Folate', 'Fiber'],
    commonReactions: ['May cause gas initially — introduce gradually'], prepTips: 'Red/yellow lentils cook fastest and puree smoothest — ideal for first foods. Add turmeric for anti-inflammatory benefits and a pinch of cumin for digestion. Per AAP: pair with vitamin C (lemon squeeze, tomato) to boost iron absorption from plant sources.',
    safeFromAge: '6mo'
  },
  {
    id: 'ghee', name: 'Ghee', emoji: '🧈', foodGroup: 'dairy', allergens: ['milk'],
    chokingHazard: false, chokingNotes: 'Liquid fat, no choking risk',
    servingByAge: { '6mo': 'Small amount in cooking', '9mo': 'In dal, rice, vegetables', '12mo': 'Regular use in cooking', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Healthy fats', 'Vitamin A', 'Vitamin E', 'Butyric acid'],
    commonReactions: ['Usually tolerated even by milk-sensitive babies (casein removed)'], prepTips: 'Ghee is clarified butter with milk solids removed. Most lactose-intolerant people tolerate it well.',
    safeFromAge: '6mo'
  },
  {
    id: 'paneer', name: 'Paneer', emoji: '🧀', foodGroup: 'dairy', allergens: ['milk'],
    chokingHazard: true, chokingNotes: 'Firm texture — cut into small pieces',
    servingByAge: { '6mo': 'Crumbled soft paneer', '9mo': 'Small diced pieces', '12mo': 'Cubed in curries', '2yr': 'Pan-fried cubes', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Calcium', 'Phosphorus', 'Vitamin B12'],
    commonReactions: ['Contains milk'], prepTips: 'Homemade paneer is softer and fresher. Cook in sauce to soften for young babies.',
    safeFromAge: '6mo'
  },
  {
    id: 'ragi', name: 'Ragi (Finger Millet)', emoji: '🌾', foodGroup: 'grains', allergens: [],
    chokingHazard: false, chokingNotes: 'Porridge form, no risk',
    servingByAge: { '6mo': 'Thin ragi porridge', '9mo': 'Thicker porridge with fruit', '12mo': 'Ragi dosa, porridge', '2yr': 'Ragi cookies, dosa', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Calcium', 'Iron', 'Protein', 'Fiber'],
    commonReactions: ['Well tolerated — excellent first food'], prepTips: 'Ragi is one of the best first grains for babies — extremely high in calcium and iron.',
    safeFromAge: '6mo'
  },
  {
    id: 'idli', name: 'Idli', emoji: '🫓', foodGroup: 'grains', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft and spongy, very safe',
    servingByAge: { '6mo': 'Mashed idli', '9mo': 'Small pieces', '12mo': 'Whole mini idlis', '2yr': 'Regular idlis', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Probiotics (fermented)', 'B Vitamins', 'Iron'],
    commonReactions: ['Well tolerated — fermentation aids digestion'], prepTips: 'Fermented batter makes idli easy to digest. Great finger food — soft and spongy.',
    safeFromAge: '6mo'
  },
  {
    id: 'khichdi', name: 'Khichdi', emoji: '🍚', foodGroup: 'grains', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft porridge, very safe',
    servingByAge: { '6mo': 'Thin moong dal khichdi', '9mo': 'Regular khichdi with veggies', '12mo': 'Khichdi with ghee', '2yr': 'Any variation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Complete protein (rice + lentil)', 'Iron', 'Fiber', 'Easy to digest'],
    commonReactions: ['Excellent comfort food — very well tolerated'], prepTips: 'The original baby food in many Indian households. Rice + moong dal = complete protein.',
    safeFromAge: '6mo'
  },
  {
    id: 'coconut-chutney', name: 'Coconut Chutney', emoji: '🥥', foodGroup: 'other', allergens: ['tree-nuts'],
    chokingHazard: false, chokingNotes: 'Blended smooth, no risk',
    servingByAge: { '6mo': 'Small amount as dip', '9mo': 'With idli or dosa', '12mo': 'Regular use as condiment', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Healthy fats', 'Manganese', 'Fiber'],
    commonReactions: ['Coconut classified as tree nut by FDA'], prepTips: 'Blend fresh coconut with green chili (omit for babies), salt, and curry leaves.',
    safeFromAge: '6mo'
  },

  // ===== EAST ASIAN =====
  {
    id: 'tofu', name: 'Tofu', emoji: '🧊', foodGroup: 'protein', allergens: ['soy'],
    chokingHazard: false, chokingNotes: 'Soft tofu is very safe — firm tofu cut small',
    servingByAge: { '6mo': 'Silken tofu mashed or as strips', '9mo': 'Soft cubes', '12mo': 'Pan-fried cubes', '2yr': 'In stir-fries, soups', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Calcium', 'Iron', 'Manganese'],
    commonReactions: ['Contains soy — top allergen'], prepTips: 'Silken tofu is perfect for babies — incredibly soft. Firm tofu is better for older babies who can chew.',
    safeFromAge: '6mo'
  },
  {
    id: 'congee', name: 'Congee (Rice Porridge)', emoji: '🍚', foodGroup: 'grains', allergens: [],
    chokingHazard: false, chokingNotes: 'Porridge consistency, very safe',
    servingByAge: { '6mo': 'Plain thin congee', '9mo': 'Congee with pureed fish or egg', '12mo': 'Congee with toppings', '2yr': 'Regular congee', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Easy to digest', 'Hydrating', 'Comforting', 'Versatile base'],
    commonReactions: ['Very well tolerated — traditional first food in East Asia'], prepTips: 'Cook rice in lots of water until it breaks down. Add meat, fish, or egg for protein.',
    safeFromAge: '6mo'
  },
  {
    id: 'edamame', name: 'Edamame', emoji: '🫛', foodGroup: 'legumes', allergens: ['soy'],
    chokingHazard: true, chokingNotes: 'Small and firm — mash or halve for babies',
    servingByAge: { '6mo': 'Mashed or pureed', '9mo': 'Halved or flattened', '12mo': 'Whole shelled beans', '2yr': 'In pods for fun', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Fiber', 'Iron', 'Vitamin K'],
    commonReactions: ['Contains soy — top allergen'], prepTips: 'Always shell for young children. Squish each bean for babies under 12 months.',
    safeFromAge: '6mo'
  },
  {
    id: 'nori', name: 'Nori (Seaweed)', emoji: '🟢', foodGroup: 'vegetables', allergens: [],
    chokingHazard: true, chokingNotes: 'Can stick to palate — crumble for babies',
    servingByAge: { '6mo': 'Crumbled on food as seasoning', '9mo': 'Thin strips to hold', '12mo': 'Small sheets to gnaw', '2yr': 'Snack sheets, in rice balls', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Iodine', 'Iron', 'Vitamin B12', 'Omega-3'],
    commonReactions: ['Generally well tolerated'], prepTips: 'Excellent source of iodine for babies. Crumble over food as a natural seasoning.',
    safeFromAge: '6mo'
  },
  {
    id: 'miso', name: 'Miso', emoji: '🍜', foodGroup: 'protein', allergens: ['soy'],
    chokingHazard: false, chokingNotes: 'Paste/soup form, no risk',
    servingByAge: { '6mo': 'Tiny amount in cooking for flavor', '9mo': 'Dilute miso soup', '12mo': 'Miso soup, in marinades', '2yr': 'Regular miso soup', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Probiotics', 'Protein', 'B Vitamins', 'Manganese'],
    commonReactions: ['Contains soy — use sparingly due to sodium'], prepTips: 'Use white (shiro) miso for babies — mildest flavor. High in sodium so use sparingly.',
    safeFromAge: '6mo'
  },
  {
    id: 'bok-choy', name: 'Bok Choy', emoji: '🥬', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Wilts down when cooked, low risk',
    servingByAge: { '6mo': 'Steamed and finely chopped', '9mo': 'Soft cooked stems and leaves', '12mo': 'In stir-fries, soups', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Calcium', 'Vitamin A', 'Vitamin C', 'Vitamin K'],
    commonReactions: ['Well tolerated'], prepTips: 'Baby bok choy is perfect for little ones — tender stems and mild flavor.',
    safeFromAge: '6mo'
  },
  {
    id: 'sweet-potato-japanese', name: 'Japanese Sweet Potato', emoji: '🍠', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked',
    servingByAge: { '6mo': 'Steamed and mashed', '9mo': 'Soft cubes or wedges', '12mo': 'Baked slices', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin A', 'Vitamin C', 'Manganese', 'Potassium'],
    commonReactions: ['Well tolerated — naturally sweet'], prepTips: 'Purple skin with white/yellow flesh. Sweeter and drier than regular sweet potatoes.',
    safeFromAge: '6mo'
  },

  // ===== AFRICAN =====
  {
    id: 'injera', name: 'Injera', emoji: '🫓', foodGroup: 'grains', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft and spongy, very safe',
    servingByAge: { '6mo': 'Small torn pieces', '9mo': 'Strips to hold', '12mo': 'With stews', '2yr': 'Regular serving', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Iron (from teff)', 'Protein', 'Calcium', 'Probiotics (fermented)'],
    commonReactions: ['Well tolerated — naturally gluten-free if made with 100% teff'], prepTips: 'Made from teff flour — incredibly high in iron and calcium. Fermentation aids digestion.',
    safeFromAge: '6mo'
  },
  {
    id: 'okra', name: 'Okra', emoji: '🫛', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked',
    servingByAge: { '6mo': 'Steamed and mashed', '9mo': 'Soft cooked pieces', '12mo': 'In stews, roasted', '2yr': 'Fried, in gumbo', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C', 'Vitamin K', 'Folate', 'Fiber'],
    commonReactions: ['Well tolerated'], prepTips: 'Roasting reduces the slimy texture. Cut into rounds for a fun shape.',
    safeFromAge: '6mo'
  },
  {
    id: 'fufu', name: 'Fufu', emoji: '🍚', foodGroup: 'grains', allergens: [],
    chokingHazard: true, chokingNotes: 'Sticky and dense — serve small amounts',
    servingByAge: { '6mo': 'Very small, soft pieces', '9mo': 'Small balls in soup', '12mo': 'With stew', '2yr': 'Regular portions', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Carbohydrates', 'Potassium', 'Resistant starch'],
    commonReactions: ['Well tolerated'], prepTips: 'Made from cassava, plantain, or yam. Serve small pieces — can be sticky and dense.',
    safeFromAge: '9mo'
  },
  {
    id: 'moringa', name: 'Moringa', emoji: '🌿', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Powder or cooked leaves, no risk',
    servingByAge: { '6mo': 'Small pinch of powder in food', '9mo': 'In soups, porridge', '12mo': 'In cooking', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Iron', 'Calcium', 'Vitamin A', 'Protein'],
    commonReactions: ['Well tolerated in small amounts'], prepTips: 'Called the "miracle tree" — incredibly nutrient-dense. Start with tiny amounts.',
    safeFromAge: '6mo'
  },
  {
    id: 'groundnut-soup', name: 'Groundnut (Peanut) Soup', emoji: '🥜', foodGroup: 'legumes', allergens: ['peanuts'],
    chokingHazard: false, chokingNotes: 'Soup form, no choking risk — ideal texture for early allergen introduction',
    servingByAge: { '6mo': 'Thin soup — excellent for early peanut allergen introduction per AAP guidelines', '9mo': 'Thicker soup with soft vegetables', '12mo': 'With rice or fufu', '2yr': 'Regular portion', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Healthy fats', 'Niacin', 'Manganese'],
    commonReactions: ['Contains peanuts — top allergen. Per LEAP study: early introduction in soup form is one of the safest methods.'], prepTips: 'Groundnut soup is one of the best ways to introduce peanut allergen early — smooth consistency eliminates choking risk. Per AAP/LEAP study: early peanut introduction (around 6 months) can reduce peanut allergy risk by up to 81%. Start with small amounts. For high-risk babies (severe eczema/egg allergy), discuss with pediatrician first.',
    safeFromAge: '6mo'
  },

  // ===== MIDDLE EASTERN =====
  {
    id: 'hummus', name: 'Hummus', emoji: '🫘', foodGroup: 'legumes', allergens: ['sesame'],
    chokingHazard: false, chokingNotes: 'Smooth paste, very safe',
    servingByAge: { '6mo': 'Thin hummus on a spoon or veggie stick', '9mo': 'As dip with soft foods', '12mo': 'Regular hummus', '2yr': 'With pita, veggies', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Iron', 'Fiber', 'Healthy fats (tahini)'],
    commonReactions: ['Contains sesame (tahini) — top allergen'], prepTips: 'Excellent way to introduce sesame allergen. Make at home for less salt. Thin with water for young babies.',
    safeFromAge: '6mo'
  },
  {
    id: 'tahini', name: 'Tahini', emoji: '🫙', foodGroup: 'nuts-seeds', allergens: ['sesame'],
    chokingHazard: false, chokingNotes: 'Paste form, no choking risk — thin with water to avoid thick texture',
    servingByAge: { '6mo': 'Thinned with water, drizzled on food', '9mo': 'In sauces, dressings', '12mo': 'On toast, in cooking', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Calcium', 'Iron', 'Protein', 'Healthy fats'],
    commonReactions: ['Contains sesame — top allergen'], prepTips: 'One of the best ways to introduce sesame. Always thin with water — straight tahini can be too thick.',
    safeFromAge: '6mo'
  },
  {
    id: 'labneh', name: 'Labneh', emoji: '🥛', foodGroup: 'dairy', allergens: ['milk'],
    chokingHazard: false, chokingNotes: 'Creamy, no choking risk',
    servingByAge: { '6mo': 'Plain labneh as dip', '9mo': 'On bread, with fruit', '12mo': 'Regular use', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Calcium', 'Probiotics', 'Vitamin B12'],
    commonReactions: ['Contains milk — generally well tolerated as fermented dairy'], prepTips: 'Strained yogurt — higher protein than regular yogurt. Full fat is best for babies.',
    safeFromAge: '6mo'
  },
  {
    id: 'za-atar', name: "Za'atar", emoji: '🌿', foodGroup: 'other', allergens: ['sesame'],
    chokingHazard: false, chokingNotes: 'Herb/spice blend, no risk',
    servingByAge: { '6mo': 'Tiny pinch on food', '9mo': 'In cooking, on bread', '12mo': 'Regular use as seasoning', '2yr': 'On flatbread with olive oil', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Antioxidants', 'Iron', 'Calcium (from sesame)', 'Thymol'],
    commonReactions: ['Contains sesame — check ingredients'], prepTips: 'Traditional blend of thyme, sesame, and sumac. Great way to add flavor without salt.',
    safeFromAge: '6mo'
  },
  {
    id: 'falafel', name: 'Falafel', emoji: '🧆', foodGroup: 'legumes', allergens: [],
    chokingHazard: true, chokingNotes: 'Dense and round — break apart for babies',
    servingByAge: { '6mo': 'Crumbled falafel (baked, not fried)', '9mo': 'Small broken pieces', '12mo': 'Half falafel balls', '2yr': 'Whole falafel', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Fiber', 'Iron', 'Folate'],
    commonReactions: ['Well tolerated'], prepTips: 'Bake instead of fry for babies. Break apart to check for any hard bits before serving.',
    safeFromAge: '9mo'
  },
  {
    id: 'couscous', name: 'Couscous', emoji: '🌾', foodGroup: 'grains', allergens: ['wheat'],
    chokingHazard: false, chokingNotes: 'Small and soft, low risk',
    servingByAge: { '6mo': 'Well-cooked, slightly mashed', '9mo': 'Regular cooked couscous', '12mo': 'In salads, with stews', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Selenium', 'B Vitamins', 'Fiber'],
    commonReactions: ['Contains wheat/gluten'], prepTips: 'Israeli/pearl couscous is easier for babies to pick up than regular couscous.',
    safeFromAge: '6mo'
  },

  // ===== ADDITIONAL DIVERSE FOODS =====
  {
    id: 'kimchi', name: 'Kimchi', emoji: '🥬', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Finely chopped fermented vegetables',
    servingByAge: { '6mo': 'Not recommended — too salty/spicy', '9mo': 'Tiny taste, rinsed', '12mo': 'Small amount, mild kimchi', '2yr': 'Regular mild kimchi', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Probiotics', 'Vitamin K', 'Vitamin C', 'Fiber'],
    commonReactions: ['Spicy — start with mild varieties'], prepTips: 'Rinse to reduce salt and spice for young children. Excellent probiotic food.',
    safeFromAge: '12mo'
  },
  {
    id: 'chapati', name: 'Chapati / Roti', emoji: '🫓', foodGroup: 'grains', allergens: ['wheat'],
    chokingHazard: true, chokingNotes: 'Can be tough — tear into small pieces for babies',
    servingByAge: { '6mo': 'Small soft torn pieces dipped in dal', '9mo': 'Thin strips', '12mo': 'Torn pieces with curry', '2yr': 'Regular chapati', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Fiber', 'Iron', 'B Vitamins', 'Protein'],
    commonReactions: ['Contains wheat/gluten'], prepTips: 'Whole wheat chapati is more nutritious. Soften in dal or curry for young babies.',
    safeFromAge: '6mo'
  },
  {
    id: 'taro', name: 'Taro', emoji: '🟣', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked, similar to potato',
    servingByAge: { '6mo': 'Boiled and mashed', '9mo': 'Soft cubes', '12mo': 'In soups, mashed', '2yr': 'Taro fries, in desserts', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Fiber', 'Potassium', 'Manganese', 'Vitamin E'],
    commonReactions: ['Must be cooked — raw taro causes irritation'], prepTips: '⚠️ Always cook thoroughly. Raw taro contains calcium oxalate which causes irritation.',
    safeFromAge: '6mo'
  },
  {
    id: 'tempeh', name: 'Tempeh', emoji: '🫘', foodGroup: 'protein', allergens: ['soy'],
    chokingHazard: true, chokingNotes: 'Firm texture — crumble or dice small for babies',
    servingByAge: { '6mo': 'Crumbled steamed tempeh', '9mo': 'Small diced pieces', '12mo': 'Sliced and pan-fried', '2yr': 'In stir-fries', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Probiotics', 'Iron', 'Calcium'],
    commonReactions: ['Contains soy — fermented so easier to digest'], prepTips: 'Fermented soy — easier to digest than tofu. Steam before other cooking to reduce bitterness.',
    safeFromAge: '6mo'
  },
  {
    id: 'coconut-milk', name: 'Coconut Milk', emoji: '🥥', foodGroup: 'other', allergens: ['tree-nuts'],
    chokingHazard: false, chokingNotes: 'Liquid, no risk',
    servingByAge: { '6mo': 'In cooking (curries, porridge)', '9mo': 'In smoothies, cooking', '12mo': 'Regular use in recipes', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Healthy fats (MCTs)', 'Manganese', 'Iron'],
    commonReactions: ['FDA classifies coconut as tree nut'], prepTips: 'Full-fat coconut milk adds healthy calories. Not a substitute for breast milk or formula.',
    safeFromAge: '6mo'
  },
  {
    id: 'plantain-chips', name: 'Baked Plantain Chips', emoji: '🍌', foodGroup: 'fruits', allergens: [],
    chokingHazard: true, chokingNotes: 'Can be hard — choose soft-baked for babies',
    servingByAge: { '6mo': 'Not recommended — too hard', '9mo': 'Soft-baked only, supervised', '12mo': 'Soft-baked chips', '2yr': 'Regular baked chips', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Potassium', 'Vitamin A', 'Fiber'],
    commonReactions: ['Well tolerated'], prepTips: 'Bake thin slices at low temp for softer chips. Store-bought may be too hard for babies.',
    safeFromAge: '9mo'
  },
  {
    id: 'sardines', name: 'Sardines', emoji: '🐟', foodGroup: 'protein', allergens: ['fish'],
    chokingHazard: true, chokingNotes: 'Remove bones or use boneless — mash for babies',
    servingByAge: { '6mo': 'Mashed boneless sardines', '9mo': 'Flaked pieces', '12mo': 'On toast, in pasta', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Omega-3 DHA', 'Calcium (with bones)', 'Vitamin D', 'Protein'],
    commonReactions: ['Contains fish — top allergen'], prepTips: 'One of the best fish for babies — high in omega-3, low in mercury. Canned in water is most convenient.',
    safeFromAge: '6mo'
  },
  {
    id: 'amaranth', name: 'Amaranth', emoji: '🌾', foodGroup: 'grains', allergens: [],
    chokingHazard: false, chokingNotes: 'Porridge form, no risk',
    servingByAge: { '6mo': 'Amaranth porridge', '9mo': 'In porridge, mixed with fruit', '12mo': 'Popped amaranth, in baking', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Iron', 'Calcium', 'Manganese'],
    commonReactions: ['Well tolerated — naturally gluten-free'], prepTips: 'Ancient grain used across Latin America and Africa. Cooks into a porridge consistency, perfect for babies.',
    safeFromAge: '6mo'
  },
  {
    id: 'jackfruit', name: 'Jackfruit', emoji: '🍈', foodGroup: 'fruits', allergens: [],
    chokingHazard: true, chokingNotes: 'Fibrous — shred finely for babies',
    servingByAge: { '6mo': 'Ripe jackfruit mashed', '9mo': 'Shredded ripe pieces', '12mo': 'In curries (young jackfruit)', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C', 'Potassium', 'Fiber', 'Vitamin A'],
    commonReactions: ['Related to birch pollen — rare cross-reactivity'], prepTips: 'Ripe jackfruit is sweet for snacking. Young green jackfruit is used as a meat substitute in curries.',
    safeFromAge: '6mo'
  },
  {
    id: 'dosa', name: 'Dosa', emoji: '🫓', foodGroup: 'grains', allergens: [],
    chokingHazard: true, chokingNotes: 'Crispy edges can be hard — tear into pieces',
    servingByAge: { '6mo': 'Soft torn pieces dipped in chutney', '9mo': 'Small strips', '12mo': 'With sambar or chutney', '2yr': 'Regular dosa', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Probiotics (fermented)', 'Iron', 'B Vitamins'],
    commonReactions: ['Well tolerated — fermented for easy digestion'], prepTips: 'Made from fermented rice and urad dal batter. Soft-cook for babies — avoid very crispy dosa.',
    safeFromAge: '6mo'
  },
  {
    id: 'ugali', name: 'Ugali', emoji: '🍚', foodGroup: 'grains', allergens: [],
    chokingHazard: true, chokingNotes: 'Dense and stiff — serve small soft pieces',
    servingByAge: { '6mo': 'Very soft, thin porridge version', '9mo': 'Small soft pieces with stew', '12mo': 'Regular pieces with sauce', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Carbohydrates', 'Iron (from maize)', 'B Vitamins'],
    commonReactions: ['Well tolerated — staple across East Africa'], prepTips: 'Made from maize flour and water. Make softer for babies by adding more water. Always serve with a saucy stew.',
    safeFromAge: '6mo'
  },
  {
    id: 'baobab', name: 'Baobab Powder', emoji: '🌳', foodGroup: 'fruits', allergens: [],
    chokingHazard: false, chokingNotes: 'Powder form, no risk',
    servingByAge: { '6mo': 'Small amount mixed into porridge', '9mo': 'In smoothies, porridge', '12mo': 'In baking, drinks', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C (6x more than oranges)', 'Calcium', 'Fiber', 'Iron'],
    commonReactions: ['Well tolerated'], prepTips: 'African superfood — mix into porridge or smoothies. Tangy flavor pairs well with fruit.',
    safeFromAge: '6mo'
  },
];
