import { FoodEntry } from '@/types';

export const foods: FoodEntry[] = [
  // ===== FRUITS =====
  {
    id: 'avocado', name: 'Avocado', emoji: '🥑', foodGroup: 'fruits', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft texture, low risk when ripe. Roll in hemp seeds or crushed cereal for grip.',
    servingByAge: { '6mo': 'Mash or serve as thick spears (finger-width). Roll in ground flax for grip.', '9mo': 'Diced or thin sliced strips, self-feeding encouraged', '12mo': 'Sliced, cubed, or on toast strips', '2yr': 'Sliced, on toast, guacamole, in smoothies', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Healthy fats', 'Potassium', 'Fiber', 'Vitamin K'],
    commonReactions: ['Rarely allergenic — cross-reactivity with latex possible but very rare'], prepTips: 'Choose ripe avocados that yield to gentle pressure. Toss with lemon to prevent browning. Per AAP, healthy fats are critical for brain development — avocado is an ideal first food.',
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
    id: 'strawberry', name: 'Strawberry', emoji: '🍓', foodGroup: 'fruits', allergens: [],
    chokingHazard: true, chokingNotes: 'Cut large ones in half or quarters — can be slippery',
    servingByAge: { '6mo': 'Halved large berries or mashed', '9mo': 'Quartered or thinly sliced', '12mo': 'Halved or quartered', '2yr': 'Whole if small, halved if large', '3yr+': 'Whole' },
    nutritionHighlights: ['Vitamin C', 'Manganese', 'Antioxidants', 'Fiber'],
    commonReactions: ['May cause contact rash (not true allergy)', 'Acidic — may irritate skin around mouth'], prepTips: 'A contact rash from strawberries is very common and NOT an allergy. Wipe face with damp cloth after eating.',
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
    id: 'apple', name: 'Apple', emoji: '🍎', foodGroup: 'fruits', allergens: [],
    chokingHazard: true, chokingNotes: '⚠️ RAW APPLE is a top choking hazard per AAP/CDC — always cook for under 3. Grate if raw.',
    servingByAge: { '6mo': 'Steamed/baked until fork-tender, serve as thick spears. Never raw.', '9mo': 'Grated raw or very soft cooked pieces', '12mo': 'Paper-thin raw slices or cooked. Test: should squish between fingers.', '2yr': 'Thin slices, grated raw, cooked in any form', '3yr+': 'Regular slices — continue to supervise until 4' },
    nutritionHighlights: ['Fiber', 'Vitamin C', 'Quercetin', 'Potassium'],
    commonReactions: ['Rarely allergenic. Oral allergy syndrome possible with birch pollen allergy.'], prepTips: '⚠️ RAW APPLE is a leading choking cause per CDC data. Always cook, microwave until soft, grate, or slice paper-thin for babies and toddlers under 3. Pair with iron-rich foods — vitamin C boosts iron absorption.',
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
    id: 'watermelon', name: 'Watermelon', emoji: '🍉', foodGroup: 'fruits', allergens: [],
    chokingHazard: true, chokingNotes: 'Remove all seeds — slippery texture',
    servingByAge: { '6mo': 'Large wedge to suck on (remove seeds)', '9mo': 'Small diced pieces, seedless', '12mo': 'Cubed or wedges', '2yr': 'Slices or cubes', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C', 'Lycopene', 'Hydration', 'Vitamin A'],
    commonReactions: ['Well tolerated'], prepTips: 'Choose seedless varieties or remove all seeds. Great for hydration in summer.',
    safeFromAge: '6mo'
  },
  {
    id: 'peach', name: 'Peach', emoji: '🍑', foodGroup: 'fruits', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when ripe, low risk',
    servingByAge: { '6mo': 'Ripe slices or mashed', '9mo': 'Diced or sliced', '12mo': 'Sliced with skin on', '2yr': 'Whole or sliced', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C', 'Vitamin A', 'Potassium', 'Fiber'],
    commonReactions: ['May cause contact rash'], prepTips: 'Choose ripe, soft peaches. Skin is fine to eat and adds fiber.',
    safeFromAge: '6mo'
  },
  {
    id: 'pear', name: 'Pear', emoji: '🍐', foodGroup: 'fruits', allergens: [],
    chokingHazard: true, chokingNotes: 'Firm pears can be hard — cook or choose very ripe',
    servingByAge: { '6mo': 'Steamed soft spears or very ripe mashed', '9mo': 'Ripe diced pieces', '12mo': 'Thin slices', '2yr': 'Sliced', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Fiber', 'Vitamin C', 'Copper', 'Potassium'],
    commonReactions: ['Well tolerated — good for constipation relief'], prepTips: 'Pears are great for relieving constipation. Cook firm pears until soft for young babies.',
    safeFromAge: '6mo'
  },
  {
    id: 'plum', name: 'Plum', emoji: '🟣', foodGroup: 'fruits', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when ripe, remove pit',
    servingByAge: { '6mo': 'Ripe halved or mashed (remove skin if preferred)', '9mo': 'Diced pieces', '12mo': 'Sliced', '2yr': 'Whole with pit removed', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C', 'Vitamin K', 'Fiber', 'Antioxidants'],
    commonReactions: ['Natural laxative effect — can help with constipation'], prepTips: 'Prunes (dried plums) are excellent for constipation. Fresh plums should be very ripe and soft.',
    safeFromAge: '6mo'
  },
  {
    id: 'kiwi', name: 'Kiwi', emoji: '🥝', foodGroup: 'fruits', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft, low risk when ripe',
    servingByAge: { '6mo': 'Mashed or as thick slices', '9mo': 'Diced or sliced', '12mo': 'Sliced with skin removed', '2yr': 'Halved and scooped', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C (more than oranges!)', 'Vitamin K', 'Fiber', 'Folate'],
    commonReactions: ['May cause mouth tingling or contact rash'], prepTips: 'Kiwi has more vitamin C than oranges. Skin is edible but remove for babies.',
    safeFromAge: '6mo'
  },
  {
    id: 'cantaloupe', name: 'Cantaloupe', emoji: '🍈', foodGroup: 'fruits', allergens: [],
    chokingHazard: true, chokingNotes: 'Slippery — cut into manageable pieces',
    servingByAge: { '6mo': 'Large wedge to gnaw on or mashed', '9mo': 'Small diced pieces', '12mo': 'Cubed', '2yr': 'Sliced or cubed', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin A', 'Vitamin C', 'Potassium', 'Hydration'],
    commonReactions: ['Well tolerated'], prepTips: 'Wash rind well before cutting. Very hydrating and naturally sweet.',
    safeFromAge: '6mo'
  },
  {
    id: 'grapes', name: 'Grapes', emoji: '🍇', foodGroup: 'fruits', allergens: [],
    chokingHazard: true, chokingNotes: '⚠️ #1 CHOKING HAZARD per AAP — ALWAYS cut lengthwise into quarters. Never serve whole to children under 5.',
    servingByAge: { '6mo': 'Quartered lengthwise and squished flat', '9mo': 'Quartered lengthwise', '12mo': 'Quartered lengthwise', '2yr': 'Halved lengthwise minimum', '3yr+': 'Quartered until age 5 per AAP guidelines' },
    nutritionHighlights: ['Vitamin K', 'Vitamin C', 'Potassium', 'Antioxidants'],
    commonReactions: ['Well tolerated'], prepTips: '⚠️ ALWAYS cut grapes lengthwise into quarters — never across. Whole grapes are the #1 food choking hazard for children per AAP. This applies to ALL grape varieties including small ones. Continue quartering until age 5.',
    safeFromAge: '6mo'
  },
  {
    id: 'orange', name: 'Orange', emoji: '🍊', foodGroup: 'fruits', allergens: [],
    chokingHazard: true, chokingNotes: 'Remove membrane and seeds — segments can be slippery',
    servingByAge: { '6mo': 'Supremed segments or juice squeezed on food', '9mo': 'Small pieces of membrane-free segments', '12mo': 'Segments with membrane removed', '2yr': 'Peeled segments', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C', 'Folate', 'Potassium', 'Fiber'],
    commonReactions: ['Acidic — may cause diaper rash or mouth irritation'], prepTips: 'Remove the white membrane for easier eating. Mandarin oranges are easier for small hands.',
    safeFromAge: '6mo'
  },
  {
    id: 'papaya', name: 'Papaya', emoji: '🍈', foodGroup: 'fruits', allergens: [],
    chokingHazard: false, chokingNotes: 'Very soft when ripe, low risk',
    servingByAge: { '6mo': 'Mashed or as soft spears', '9mo': 'Diced', '12mo': 'Cubed', '2yr': 'Sliced', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C', 'Vitamin A', 'Folate', 'Digestive enzymes'],
    commonReactions: ['Contains papain enzyme — may cause mouth irritation'], prepTips: 'Ripe papaya is very soft and easy to mash. Contains natural digestive enzymes.',
    safeFromAge: '6mo'
  },
  {
    id: 'raspberry', name: 'Raspberry', emoji: '🔴', foodGroup: 'fruits', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft and easily squished, low risk',
    servingByAge: { '6mo': 'Lightly mashed or whole (they dissolve easily)', '9mo': 'Whole raspberries', '12mo': 'Whole', '2yr': 'Whole', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Fiber', 'Vitamin C', 'Manganese', 'Antioxidants'],
    commonReactions: ['Well tolerated'], prepTips: 'Raspberries are one of the safest berries — they dissolve easily in the mouth. Great finger food.',
    safeFromAge: '6mo'
  },
  {
    id: 'cherries', name: 'Cherries', emoji: '🍒', foodGroup: 'fruits', allergens: [],
    chokingHazard: true, chokingNotes: '⚠️ Remove pits! Cut in half or quarters',
    servingByAge: { '6mo': 'Pitted and quartered or mashed', '9mo': 'Pitted and halved', '12mo': 'Pitted and halved', '2yr': 'Pitted, whole or halved', '3yr+': 'Pitted whole' },
    nutritionHighlights: ['Vitamin C', 'Potassium', 'Melatonin', 'Antioxidants'],
    commonReactions: ['Well tolerated — may improve sleep due to melatonin'], prepTips: 'Always remove pits. A cherry pitter tool is a worthwhile investment for parents.',
    safeFromAge: '6mo'
  },
  {
    id: 'fig', name: 'Fig', emoji: '🟤', foodGroup: 'fruits', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when ripe, low risk',
    servingByAge: { '6mo': 'Mashed or quartered ripe fig', '9mo': 'Diced or quartered', '12mo': 'Halved or whole ripe', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Calcium', 'Fiber', 'Potassium', 'Iron'],
    commonReactions: ['Well tolerated'], prepTips: 'Fresh figs are very nutrient-dense. Dried figs are great but can be sticky — cut small for babies.',
    safeFromAge: '6mo'
  },
  {
    id: 'dates', name: 'Dates', emoji: '🫘', foodGroup: 'fruits', allergens: [],
    chokingHazard: true, chokingNotes: 'Sticky and dense — cut into small pieces, remove pit',
    servingByAge: { '6mo': 'Pureed or very finely minced', '9mo': 'Finely diced, pit removed', '12mo': 'Small pieces', '2yr': 'Halved, pit removed', '3yr+': 'Whole pitted' },
    nutritionHighlights: ['Iron', 'Fiber', 'Potassium', 'Natural sweetness'],
    commonReactions: ['Well tolerated — natural sweetener alternative'], prepTips: 'Dates are a great natural sweetener for baby food. Soak dried dates to soften before pureeing.',
    safeFromAge: '6mo'
  },
  {
    id: 'coconut', name: 'Coconut', emoji: '🥥', foodGroup: 'fruits', allergens: ['tree-nuts'],
    chokingHazard: true, chokingNotes: 'Shredded coconut can clump — use coconut cream or finely grated',
    servingByAge: { '6mo': 'Coconut cream or milk in cooking', '9mo': 'Finely grated or coconut cream', '12mo': 'Finely grated in foods', '2yr': 'Shredded in cooking', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Healthy fats (MCTs)', 'Manganese', 'Iron', 'Fiber'],
    commonReactions: ['Classified as tree nut by FDA — technically a fruit'], prepTips: 'Coconut is classified as a tree nut allergen by FDA. Introduce carefully if nut allergy is a concern.',
    safeFromAge: '6mo'
  },

  // ===== VEGETABLES =====
  {
    id: 'sweet-potato', name: 'Sweet Potato', emoji: '🍠', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Safe when cooked soft',
    servingByAge: { '6mo': 'Steamed spears or mashed puree', '9mo': 'Soft cubes or wedges', '12mo': 'Cubed, mashed, or as fries', '2yr': 'Baked, mashed, or as fries', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin A', 'Fiber', 'Vitamin C', 'Iron'],
    commonReactions: ['Very rarely allergenic'], prepTips: 'Roasting brings out natural sweetness. Steam for softer texture for younger babies.',
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
    id: 'carrot', name: 'Carrot', emoji: '🥕', foodGroup: 'vegetables', allergens: [],
    chokingHazard: true, chokingNotes: 'Raw carrots are a choking hazard — always cook soft for babies',
    servingByAge: { '6mo': 'Steamed sticks, very soft', '9mo': 'Soft cooked sticks or grated raw', '12mo': 'Cooked pieces, grated raw', '2yr': 'Cooked sticks, thin raw sticks with supervision', '3yr+': 'Raw sticks with supervision' },
    nutritionHighlights: ['Vitamin A (beta-carotene)', 'Fiber', 'Vitamin K', 'Potassium'],
    commonReactions: ['Very rarely allergenic'], prepTips: 'Steam or roast until easily mashable with a fork. Raw carrots are too hard for babies.',
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
    id: 'spinach', name: 'Spinach', emoji: '🥬', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Wilts down, low risk when cooked. Chop finely for babies.',
    servingByAge: { '6mo': 'Pureed or finely chopped cooked, mixed into foods', '9mo': 'Finely chopped cooked spinach', '12mo': 'Chopped in omelets, pasta, smoothies', '2yr': 'In smoothies, cooked dishes, pesto', '3yr+': 'Any preparation including salads' },
    nutritionHighlights: ['Iron (non-heme)', 'Vitamin K', 'Folate', 'Calcium'],
    commonReactions: ['High in nitrates — FDA advises limiting before 6 months. Safe after 6 months in normal amounts.'], prepTips: 'Cook spinach to reduce nitrate and oxalate levels. Pair with vitamin C foods (citrus, bell pepper) to boost non-heme iron absorption by up to 6x per AAP. Avoid as sole source of iron.',
    safeFromAge: '6mo'
  },
  {
    id: 'zucchini', name: 'Zucchini', emoji: '🫛', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked, low risk',
    servingByAge: { '6mo': 'Steamed spears', '9mo': 'Soft cooked sticks or diced', '12mo': 'Roasted sticks, in fritters', '2yr': 'Spiralized, in baked goods', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C', 'Potassium', 'Manganese', 'Low calorie'],
    commonReactions: ['Very well tolerated'], prepTips: 'Great first veggie — mild flavor. Leave skin on for nutrients. Steam or roast until fork-tender.',
    safeFromAge: '6mo'
  },
  {
    id: 'cauliflower', name: 'Cauliflower', emoji: '🤍', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Cook until very soft — raw is too hard',
    servingByAge: { '6mo': 'Steamed soft florets', '9mo': 'Soft cooked pieces', '12mo': 'Roasted florets, cauliflower mash', '2yr': 'Roasted, in mac and cheese', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C', 'Vitamin K', 'Folate', 'Fiber'],
    commonReactions: ['May cause gas'], prepTips: 'Cauliflower mash is a great nutrient-dense alternative to potatoes. Steam until very soft.',
    safeFromAge: '6mo'
  },
  {
    id: 'bell-pepper', name: 'Bell Pepper', emoji: '🫑', foodGroup: 'vegetables', allergens: [],
    chokingHazard: true, chokingNotes: 'Skin can be tough — cook or remove skin for young babies',
    servingByAge: { '6mo': 'Roasted and peeled strips', '9mo': 'Roasted soft strips', '12mo': 'Cooked diced or strips', '2yr': 'Raw strips with dip', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C (more than oranges!)', 'Vitamin A', 'Vitamin B6', 'Folate'],
    commonReactions: ['Well tolerated'], prepTips: 'Red bell peppers have the most vitamin C and sweetest flavor. Roast to soften skin.',
    safeFromAge: '6mo'
  },
  {
    id: 'cucumber', name: 'Cucumber', emoji: '🥒', foodGroup: 'vegetables', allergens: [],
    chokingHazard: true, chokingNotes: 'Remove seeds and peel for young babies — can be slippery',
    servingByAge: { '6mo': 'Grated or as a large spear to gnaw (seeds removed)', '9mo': 'Thin sticks or grated', '12mo': 'Thin sticks or diced', '2yr': 'Sticks with dip', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Hydration', 'Vitamin K', 'Potassium', 'Low calorie'],
    commonReactions: ['Well tolerated'], prepTips: 'Cool cucumber sticks feel great on teething gums. Remove seeds for young babies.',
    safeFromAge: '6mo'
  },
  {
    id: 'corn', name: 'Corn', emoji: '🌽', foodGroup: 'vegetables', allergens: [],
    chokingHazard: true, chokingNotes: 'Individual kernels can be hard to chew — mash or cut',
    servingByAge: { '6mo': 'Pureed corn or corn on the cob to gnaw', '9mo': 'Mashed corn kernels', '12mo': 'Whole kernels', '2yr': 'Corn on the cob', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Fiber', 'Vitamin C', 'B vitamins', 'Magnesium'],
    commonReactions: ['May appear undigested in diaper — this is normal'], prepTips: 'Corn kernels pass through undigested — totally normal. Corn on the cob is great for teething.',
    safeFromAge: '6mo'
  },
  {
    id: 'asparagus', name: 'Asparagus', emoji: '🌿', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Natural spear shape is great for gripping — cook soft',
    servingByAge: { '6mo': 'Steamed whole spears (tips are softest)', '9mo': 'Steamed spears', '12mo': 'Roasted spears', '2yr': 'Any cooked preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Folate', 'Vitamin K', 'Vitamin C', 'Fiber'],
    commonReactions: ['May cause smelly urine — harmless'], prepTips: 'The natural spear shape makes asparagus a perfect BLW food. Snap off woody ends.',
    safeFromAge: '6mo'
  },
  {
    id: 'green-beans', name: 'Green Beans', emoji: '🫘', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Cook until very soft — the whole bean shape is easy to grip',
    servingByAge: { '6mo': 'Steamed until very soft, whole or halved', '9mo': 'Steamed whole beans', '12mo': 'Roasted or steamed', '2yr': 'Any cooked preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C', 'Vitamin K', 'Fiber', 'Folate'],
    commonReactions: ['Well tolerated'], prepTips: 'Steam until easily bent. The whole bean shape is perfect for baby-led weaning.',
    safeFromAge: '6mo'
  },
  {
    id: 'beets', name: 'Beets', emoji: '🟥', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked, low risk',
    servingByAge: { '6mo': 'Steamed until very soft and mashed, or as soft sticks', '9mo': 'Soft cooked cubes', '12mo': 'Roasted cubes or sticks', '2yr': 'Any cooked preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Folate', 'Manganese', 'Iron', 'Fiber'],
    commonReactions: ['May turn stool and urine pink/red — harmless (beeturia). NOT blood.'], prepTips: 'Will stain everything! Use a bib. Expect red stool — this is beeturia, completely normal. Like spinach, beets are higher in nitrates — safe after 6 months in normal portions per FDA. Pair with vitamin C foods for iron absorption.',
    safeFromAge: '6mo'
  },
  {
    id: 'squash', name: 'Butternut Squash', emoji: '🎃', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Very soft when cooked, low risk',
    servingByAge: { '6mo': 'Pureed or as soft steamed sticks', '9mo': 'Soft cubes', '12mo': 'Roasted cubes, mashed', '2yr': 'In soups, roasted', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin A', 'Vitamin C', 'Potassium', 'Fiber'],
    commonReactions: ['Very rarely allergenic'], prepTips: 'Natural sweetness makes it a baby favorite. Roast for deeper flavor.',
    safeFromAge: '6mo'
  },
  {
    id: 'eggplant', name: 'Eggplant', emoji: '🍆', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked, low risk',
    servingByAge: { '6mo': 'Roasted and mashed or as soft strips', '9mo': 'Soft cooked strips', '12mo': 'Roasted pieces, in baba ganoush', '2yr': 'Any cooked preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Fiber', 'Manganese', 'Folate', 'Antioxidants'],
    commonReactions: ['Well tolerated'], prepTips: 'Roast until very soft and creamy. Baba ganoush is a great way to introduce eggplant.',
    safeFromAge: '6mo'
  },
  {
    id: 'mushrooms', name: 'Mushrooms', emoji: '🍄', foodGroup: 'vegetables', allergens: [],
    chokingHazard: true, chokingNotes: 'Can be rubbery — cook very soft and dice small',
    servingByAge: { '6mo': 'Finely minced and sautéed until very soft', '9mo': 'Finely diced sautéed', '12mo': 'Sliced and cooked', '2yr': 'Any cooked preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin D', 'B vitamins', 'Selenium', 'Potassium'],
    commonReactions: ['Rarely allergenic'], prepTips: 'One of the few plant sources of vitamin D. Cook thoroughly — never serve raw to babies.',
    safeFromAge: '6mo'
  },
  {
    id: 'kale', name: 'Kale', emoji: '🥬', foodGroup: 'vegetables', allergens: [],
    chokingHazard: true, chokingNotes: 'Tough leaves can be stringy — cook very well or blend',
    servingByAge: { '6mo': 'Pureed or finely chopped into other foods', '9mo': 'Finely chopped and cooked', '12mo': 'Baked kale chips, in smoothies', '2yr': 'Kale chips, in soups', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin K', 'Vitamin C', 'Calcium', 'Iron'],
    commonReactions: ['Well tolerated'], prepTips: 'Massage raw kale to soften, or cook thoroughly. Kale chips are a toddler favorite.',
    safeFromAge: '6mo'
  },
  {
    id: 'tomato', name: 'Tomato', emoji: '🍅', foodGroup: 'vegetables', allergens: [],
    chokingHazard: true, chokingNotes: 'Cherry tomatoes must be quartered — slippery skin',
    servingByAge: { '6mo': 'Cooked and pureed (remove skin/seeds)', '9mo': 'Diced soft cooked tomato', '12mo': 'Quartered cherry tomatoes', '2yr': 'In sauces, salads', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C', 'Lycopene', 'Vitamin A', 'Potassium'],
    commonReactions: ['Acidic — may cause diaper rash or contact rash around mouth'], prepTips: 'Cherry tomatoes are a choking hazard — always quarter. Cooking reduces acidity.',
    safeFromAge: '6mo'
  },
  {
    id: 'celery', name: 'Celery', emoji: '🥬', foodGroup: 'vegetables', allergens: [],
    chokingHazard: true, chokingNotes: '⚠️ Raw celery is fibrous and hard — cook for young children',
    servingByAge: { '6mo': 'Cooked very soft and pureed', '9mo': 'Cooked very soft sticks', '12mo': 'Well-cooked pieces', '2yr': 'Cooked or thin raw sticks with close supervision', '3yr+': 'Raw with dip, supervised' },
    nutritionHighlights: ['Vitamin K', 'Potassium', 'Folate', 'Low calorie'],
    commonReactions: ['Celery allergy exists but is rare'], prepTips: 'Raw celery is too fibrous for babies. Cook until very soft or use in soups/stews.',
    safeFromAge: '6mo'
  },
  {
    id: 'turnip', name: 'Turnip', emoji: '🥔', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked, low risk',
    servingByAge: { '6mo': 'Steamed and mashed', '9mo': 'Soft cooked cubes', '12mo': 'Roasted or mashed', '2yr': 'Any cooked preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin C', 'Fiber', 'Potassium', 'Manganese'],
    commonReactions: ['Well tolerated'], prepTips: 'Mild, slightly sweet flavor when roasted. Great mashed with butter as a potato alternative.',
    safeFromAge: '6mo'
  },
  {
    id: 'potato', name: 'Potato', emoji: '🥔', foodGroup: 'vegetables', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked, low risk',
    servingByAge: { '6mo': 'Mashed or steamed wedges', '9mo': 'Soft cubes or wedges', '12mo': 'Roasted, mashed, baked', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Potassium', 'Vitamin C', 'Vitamin B6', 'Fiber (with skin)'],
    commonReactions: ['Very well tolerated'], prepTips: 'Leave skin on for extra fiber and nutrients. Cook until fork-tender.',
    safeFromAge: '6mo'
  },

  // ===== PROTEIN =====
  {
    id: 'eggs', name: 'Eggs', emoji: '🥚', foodGroup: 'protein', allergens: ['eggs'],
    chokingHazard: false, chokingNotes: 'Soft when cooked, low risk. Hard-boiled eggs can be crumbly — cut into wedges.',
    servingByAge: { '6mo': 'Scrambled, thin omelet strips, or hard-boiled in wedges. Introduce whole egg (yolk + white) early.', '9mo': 'Scrambled, hard-boiled wedges, egg muffins', '12mo': 'Any style — scrambled, boiled, fried, in baking', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Complete protein', 'Choline (brain development)', 'Iron', 'Vitamin D'],
    commonReactions: ['One of top 9 allergens — watch for hives, vomiting, swelling within 2 hours', 'Most children outgrow egg allergy by age 5'], prepTips: 'Per AAP 2024 and LEAP study findings: introduce whole egg (yolk + white) early around 6 months — early introduction may reduce allergy risk by up to 40%. Cook fully — raw or undercooked eggs increase salmonella risk. Egg yolk is one of the best sources of choline for brain development.',
    safeFromAge: '6mo'
  },
  {
    id: 'chicken', name: 'Chicken', emoji: '🍗', foodGroup: 'protein', allergens: [],
    chokingHazard: true, chokingNotes: 'Can be tough and stringy — serve as large strips for gnawing or shredded. Never cubed for young babies.',
    servingByAge: { '6mo': 'Drumstick with cartilage/loose bits removed (baby gnaws), or pureed dark meat', '9mo': 'Shredded, very finely minced, or ground', '12mo': 'Small shredded pieces, strips, or meatballs', '2yr': 'Cut into small pieces, any tender preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Iron (heme — best absorbed)', 'Zinc', 'B vitamins'],
    commonReactions: ['Rarely allergenic'], prepTips: 'Per AAP: meat is recommended as one of the first complementary foods due to high bioavailable iron and zinc. Dark meat (thighs) is more tender, juicy, and iron-rich than breast. Slow cook or braise for softest texture. Internal temp: 165°F/74°C.',
    safeFromAge: '6mo'
  },
  {
    id: 'salmon', name: 'Salmon', emoji: '🐟', foodGroup: 'protein', allergens: ['fish'],
    chokingHazard: false, chokingNotes: 'Flakes easily, low risk when deboned. Check every bite for small bones.',
    servingByAge: { '6mo': 'Flaked and mashed, or serve a large fillet strip to suck on (debone carefully)', '9mo': 'Flaked into soft pieces, in fish cakes', '12mo': 'Salmon cakes, flaked on pasta or rice', '2yr': 'Salmon cakes, flaked, baked fillets', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Omega-3 DHA (brain & eye development)', 'Protein', 'Vitamin D', 'Selenium'],
    commonReactions: ['Fish allergen — introduce carefully. Watch for hives, vomiting within 2 hours.'], prepTips: 'Per FDA "Best Choices" list: salmon is low in mercury and high in omega-3 DHA critical for brain development. Wild-caught has fewer contaminants. Serve 2-3 times per week. Remove ALL bones — run finger along fillet. Bake at 400°F until internal temp reaches 145°F.',
    safeFromAge: '6mo'
  },
  {
    id: 'beef', name: 'Beef', emoji: '🥩', foodGroup: 'protein', allergens: [],
    chokingHazard: true, chokingNotes: 'Serve ground, pureed, or as very tender slow-cooked strips. Never serve tough cubes.',
    servingByAge: { '6mo': 'Pureed or as a large slow-cooked strip to suck/gnaw (too large to bite off)', '9mo': 'Ground beef, very tender shreds, mini meatballs', '12mo': 'Ground in patties, meatballs, shredded slow-cooked', '2yr': 'Diced tender pieces, meatballs, ground', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Iron (heme — 2-3x better absorbed than plant iron)', 'Zinc', 'Protein', 'B12'],
    commonReactions: ['Very rarely allergenic'], prepTips: 'Per AAP 2024: iron-rich foods like beef should be among the first complementary foods. Babies\' iron stores from birth begin depleting around 6 months. Heme iron from meat is absorbed 2-3x better than plant iron. Slow-cook for tenderness. Pair with vitamin C foods. Internal temp: 160°F/71°C for ground.',
    safeFromAge: '6mo'
  },
  {
    id: 'tofu', name: 'Tofu', emoji: '🧊', foodGroup: 'protein', allergens: ['soy'],
    chokingHazard: false, chokingNotes: 'Soft texture, very safe',
    servingByAge: { '6mo': 'Strips of firm tofu, pan-fried for grip', '9mo': 'Cubed or crumbled', '12mo': 'Cubed, in stir-fry, scrambled', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Plant protein', 'Calcium', 'Iron', 'Isoflavones'],
    commonReactions: ['Soy is a top allergen — watch for rash, digestive issues'], prepTips: 'Use firm or extra-firm for finger food. Pan-fry for a crispy exterior that\'s easier to grip.',
    safeFromAge: '6mo'
  },
  {
    id: 'turkey', name: 'Turkey', emoji: '🦃', foodGroup: 'protein', allergens: [],
    chokingHazard: true, chokingNotes: 'Can be dry — serve moist shredded or ground',
    servingByAge: { '6mo': 'Pureed or as a large drumstick to gnaw', '9mo': 'Ground or shredded', '12mo': 'Shredded, in meatballs', '2yr': 'Sliced or in meatballs', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Iron', 'Zinc', 'B vitamins'],
    commonReactions: ['Rarely allergenic'], prepTips: 'Ground turkey is great for meatballs. Dark meat is more moist and iron-rich.',
    safeFromAge: '6mo'
  },
  {
    id: 'pork', name: 'Pork', emoji: '🐷', foodGroup: 'protein', allergens: [],
    chokingHazard: true, chokingNotes: 'Can be tough — slow cook or serve ground',
    servingByAge: { '6mo': 'Slow-cooked and shredded, or pureed', '9mo': 'Shredded or ground', '12mo': 'Shredded, ground, in meatballs', '2yr': 'Diced tender pieces', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Thiamine', 'Zinc', 'B12'],
    commonReactions: ['Rarely allergenic'], prepTips: 'Slow-cooked pulled pork is perfect for babies. Avoid processed pork (bacon, sausage) due to sodium.',
    safeFromAge: '6mo'
  },
  {
    id: 'lamb', name: 'Lamb', emoji: '🍖', foodGroup: 'protein', allergens: [],
    chokingHazard: true, chokingNotes: 'Serve ground or slow-cooked until very tender',
    servingByAge: { '6mo': 'Pureed or large slow-cooked strip', '9mo': 'Ground or shredded', '12mo': 'Ground, in meatballs', '2yr': 'Diced tender pieces', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Iron (heme)', 'Zinc', 'Protein', 'B12'],
    commonReactions: ['Rarely allergenic'], prepTips: 'Lamb is very iron-rich. Ground lamb makes great mini meatballs.',
    safeFromAge: '6mo'
  },
  {
    id: 'shrimp', name: 'Shrimp', emoji: '🦐', foodGroup: 'protein', allergens: ['shellfish'],
    chokingHazard: true, chokingNotes: 'Can be rubbery — chop finely for babies',
    servingByAge: { '6mo': 'Finely minced or pureed', '9mo': 'Finely chopped', '12mo': 'Small pieces', '2yr': 'Chopped or whole small shrimp', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Selenium', 'Vitamin B12', 'Omega-3'],
    commonReactions: ['Shellfish is a top 9 allergen — watch for hives, swelling'], prepTips: 'Cook thoroughly. Start with a small amount for allergen introduction. Chop well — shrimp can be rubbery.',
    safeFromAge: '6mo'
  },
  {
    id: 'tuna', name: 'Tuna', emoji: '🐠', foodGroup: 'protein', allergens: ['fish'],
    chokingHazard: false, chokingNotes: 'Canned tuna is soft, low risk',
    servingByAge: { '6mo': 'Mashed canned light tuna (not albacore)', '9mo': 'Flaked light tuna', '12mo': 'In tuna salad, patties, on pasta', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Omega-3', 'Vitamin D', 'Selenium'],
    commonReactions: ['Fish allergen'], prepTips: 'Per FDA mercury advisory: choose "light" tuna (skipjack) — it has 3x less mercury than albacore/white. Limit to 2-3 oz servings, 2x per week for babies. Health Canada recommends no more than 75g of albacore per week for children. Check FDA\'s Best Choices fish list.',
    safeFromAge: '6mo'
  },
  {
    id: 'sardines', name: 'Sardines', emoji: '🐡', foodGroup: 'protein', allergens: ['fish'],
    chokingHazard: false, chokingNotes: 'Very soft, low risk',
    servingByAge: { '6mo': 'Mashed sardines (boneless)', '9mo': 'Flaked or mashed', '12mo': 'Whole small sardines', '2yr': 'On toast, in pasta', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Omega-3', 'Calcium (with bones)', 'Vitamin D', 'B12'],
    commonReactions: ['Fish allergen'], prepTips: 'Sardines are a superfood — low mercury, high omega-3, bones provide calcium. Choose ones packed in water.',
    safeFromAge: '6mo'
  },
  {
    id: 'liver', name: 'Liver', emoji: '🥩', foodGroup: 'protein', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked, low risk',
    servingByAge: { '6mo': 'Pureed chicken liver', '9mo': 'Finely minced or in pâté', '12mo': 'Small pieces in dishes', '2yr': 'In pâté, liver bites', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Iron (extremely high)', 'Vitamin A', 'B12', 'Folate'],
    commonReactions: ['Strong flavor — mix with familiar foods'], prepTips: 'Liver is the most iron-dense food. Serve 1-2x per week max (high vitamin A). Chicken liver is mildest.',
    safeFromAge: '6mo'
  },
  {
    id: 'cod', name: 'Cod', emoji: '🎏', foodGroup: 'protein', allergens: ['fish'],
    chokingHazard: false, chokingNotes: 'Flakes easily, low risk when deboned',
    servingByAge: { '6mo': 'Flaked and mashed', '9mo': 'Soft flaked pieces', '12mo': 'Fish cakes, flaked', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'B12', 'Phosphorus', 'Selenium'],
    commonReactions: ['Fish allergen'], prepTips: 'Very mild white fish — great for introducing fish allergen. Bake and flake, check for bones carefully.',
    safeFromAge: '6mo'
  },
  {
    id: 'crab', name: 'Crab', emoji: '🦀', foodGroup: 'protein', allergens: ['shellfish'],
    chokingHazard: true, chokingNotes: 'Check for shell fragments carefully',
    servingByAge: { '6mo': 'Finely shredded crab meat', '9mo': 'Shredded in small pieces', '12mo': 'In crab cakes, shredded', '2yr': 'Crab cakes, shredded', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Zinc', 'B12', 'Selenium'],
    commonReactions: ['Shellfish is a top 9 allergen'], prepTips: 'Check for shell fragments very carefully. Start with a tiny amount for allergen intro.',
    safeFromAge: '6mo'
  },

  // ===== GRAINS =====
  {
    id: 'oatmeal', name: 'Oatmeal', emoji: '🥣', foodGroup: 'grains', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft texture, very safe',
    servingByAge: { '6mo': 'Thin porridge consistency (iron-fortified infant cereal preferred as first grain)', '9mo': 'Thicker porridge, add mashed fruit or nut butter', '12mo': 'Regular oatmeal with toppings', '2yr': 'Overnight oats, baked oats, any style', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Fiber (beta-glucan)', 'Iron (fortified)', 'Magnesium', 'B vitamins'],
    commonReactions: ['Generally very well tolerated. Not a gluten grain but may be cross-contaminated — choose certified GF if celiac concern.'], prepTips: 'Per AAP: iron-fortified infant cereal is recommended as one of the first complementary foods. As baby progresses, regular oats work well. Steel-cut oats have lowest glycemic index. Add ground flax or hemp seeds for omega-3.',
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
    id: 'rice', name: 'Rice', emoji: '🍚', foodGroup: 'grains', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked, safe',
    servingByAge: { '6mo': 'Well-cooked and mashed or as thick porridge', '9mo': 'Sticky rice balls or porridge', '12mo': 'Regular cooked rice', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Carbohydrates', 'B vitamins', 'Manganese'],
    commonReactions: ['Contains low levels of inorganic arsenic — FDA advises varying grains'], prepTips: 'Per FDA advisory: limit rice/rice cereal to 1-2 servings per week due to arsenic content. Rinse rice thoroughly and cook in excess water (6:1 ratio) then drain — reduces arsenic by up to 60%. Vary with oats, barley, quinoa, millet. Brown rice has more arsenic than white.',
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
    id: 'quinoa', name: 'Quinoa', emoji: '🌾', foodGroup: 'grains', allergens: [],
    chokingHazard: false, chokingNotes: 'Small and soft, very safe',
    servingByAge: { '6mo': 'Well-cooked quinoa porridge', '9mo': 'Cooked quinoa mixed into foods', '12mo': 'As a side grain', '2yr': 'In salads, bowls', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Complete protein', 'Iron', 'Fiber', 'Magnesium'],
    commonReactions: ['Well tolerated — gluten-free'], prepTips: 'Rinse quinoa before cooking to remove bitter coating. A complete protein — great for plant-based diets.',
    safeFromAge: '6mo'
  },
  {
    id: 'barley', name: 'Barley', emoji: '🌾', foodGroup: 'grains', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked, safe',
    servingByAge: { '6mo': 'Well-cooked barley porridge', '9mo': 'Cooked barley in soups', '12mo': 'As a side grain', '2yr': 'In soups, stews', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Fiber', 'Selenium', 'Manganese', 'B vitamins'],
    commonReactions: ['Contains gluten'], prepTips: 'Pearl barley cooks faster. Hulled barley is more nutritious but takes longer.',
    safeFromAge: '6mo'
  },
  {
    id: 'millet', name: 'Millet', emoji: '🌾', foodGroup: 'grains', allergens: [],
    chokingHazard: false, chokingNotes: 'Small and soft, very safe',
    servingByAge: { '6mo': 'Cooked millet porridge', '9mo': 'Cooked millet mixed in foods', '12mo': 'As a side grain', '2yr': 'In pilafs, porridge', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Magnesium', 'Phosphorus', 'Manganese', 'Iron'],
    commonReactions: ['Gluten-free, well tolerated'], prepTips: 'Toast millet before cooking for nuttier flavor. Naturally gluten-free.',
    safeFromAge: '6mo'
  },
  {
    id: 'couscous', name: 'Couscous', emoji: '🌾', foodGroup: 'grains', allergens: ['wheat'],
    chokingHazard: false, chokingNotes: 'Very small grains, soft when cooked',
    servingByAge: { '6mo': 'Well-cooked and slightly mashed', '9mo': 'Regular cooked couscous', '12mo': 'Mixed with vegetables and sauce', '2yr': 'In salads, as a side', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Carbohydrates', 'Selenium', 'B vitamins', 'Protein'],
    commonReactions: ['Contains wheat/gluten'], prepTips: 'Israeli/pearl couscous is larger and more fun for toddlers to pick up. Regular is fine mixed into sauces.',
    safeFromAge: '6mo'
  },
  {
    id: 'polenta', name: 'Polenta', emoji: '🌽', foodGroup: 'grains', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft, low risk',
    servingByAge: { '6mo': 'Soft polenta spears or mashed', '9mo': 'Soft polenta sticks', '12mo': 'Polenta fries, baked slices', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Iron (fortified)', 'Vitamin A', 'Carbohydrates', 'Gluten-free'],
    commonReactions: ['Gluten-free, well tolerated'], prepTips: 'Cook polenta thick, chill, and cut into sticks for great finger food. Naturally gluten-free.',
    safeFromAge: '6mo'
  },
  {
    id: 'buckwheat', name: 'Buckwheat', emoji: '🌾', foodGroup: 'grains', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked, safe',
    servingByAge: { '6mo': 'Buckwheat porridge', '9mo': 'Cooked groats in food', '12mo': 'Buckwheat pancakes', '2yr': 'Soba noodles, pancakes', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Fiber', 'Magnesium', 'Manganese'],
    commonReactions: ['Despite the name, NOT related to wheat — gluten-free'], prepTips: 'Not actually wheat — it\'s a seed. Gluten-free and very nutritious.',
    safeFromAge: '6mo'
  },
  {
    id: 'amaranth', name: 'Amaranth', emoji: '🌾', foodGroup: 'grains', allergens: [],
    chokingHazard: false, chokingNotes: 'Tiny grain, soft when cooked',
    servingByAge: { '6mo': 'Cooked amaranth porridge', '9mo': 'Mixed into foods', '12mo': 'As a porridge or mixed into baked goods', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Iron', 'Calcium', 'Magnesium'],
    commonReactions: ['Gluten-free, well tolerated'], prepTips: 'Very high in protein and iron. Cooks into a porridge-like consistency — great mixed into baby cereals.',
    safeFromAge: '6mo'
  },
  {
    id: 'corn-tortilla', name: 'Corn Tortilla', emoji: '🫓', foodGroup: 'grains', allergens: [],
    chokingHazard: true, chokingNotes: 'Can be chewy — toast for easier breaking, cut into strips',
    servingByAge: { '6mo': 'Lightly toasted strips', '9mo': 'Strips with soft toppings', '12mo': 'Quesadilla strips, soft tacos', '2yr': 'Mini tacos, quesadillas', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Carbohydrates', 'Fiber', 'Calcium (nixtamalized)', 'Gluten-free'],
    commonReactions: ['Gluten-free, well tolerated'], prepTips: 'Toast lightly for easier handling. Great vehicle for spreading peanut butter or avocado.',
    safeFromAge: '6mo'
  },

  // ===== DAIRY =====
  {
    id: 'yogurt', name: 'Yogurt', emoji: '🥛', foodGroup: 'dairy', allergens: ['milk'],
    chokingHazard: false, chokingNotes: 'Smooth texture, no choking risk',
    servingByAge: { '6mo': 'Full-fat plain yogurt on preloaded spoon. Small amounts OK from 6 months.', '9mo': 'As dip, mixed with fruit puree, self-spoon practice', '12mo': 'In bowls, as dip, mixed with granola', '2yr': 'Any style', '3yr+': 'Any style' },
    nutritionHighlights: ['Calcium', 'Protein', 'Probiotics', 'Vitamin B12'],
    commonReactions: ['Dairy allergen — watch for rash, digestive issues, eczema flare'], prepTips: 'Per AAP: yogurt and cheese are safe from 6 months — only cow\'s MILK as a primary drink should wait until 12 months (US) or 9-12 months (Health Canada). Choose plain, full-fat, unsweetened. Greek yogurt has 2x protein. Avoid honey-flavored varieties before 12 months.',
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
    id: 'cottage-cheese', name: 'Cottage Cheese', emoji: '🧀', foodGroup: 'dairy', allergens: ['milk'],
    chokingHazard: false, chokingNotes: 'Soft curds, very safe',
    servingByAge: { '6mo': 'Full-fat cottage cheese, serve on preloaded spoon', '9mo': 'As a dip or mixed with fruit', '12mo': 'On toast, with fruit, as a dip', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein (very high)', 'Calcium', 'B12', 'Phosphorus'],
    commonReactions: ['Dairy allergen'], prepTips: 'Full-fat, low-sodium varieties are best. Excellent protein source for babies.',
    safeFromAge: '6mo'
  },
  {
    id: 'cream-cheese', name: 'Cream Cheese', emoji: '🧀', foodGroup: 'dairy', allergens: ['milk'],
    chokingHazard: false, chokingNotes: 'Soft spread, very safe',
    servingByAge: { '6mo': 'Thin spread on toast strips', '9mo': 'Spread on crackers or toast', '12mo': 'On bagels, in cooking', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Calcium', 'Vitamin A', 'Fat', 'Protein'],
    commonReactions: ['Dairy allergen'], prepTips: 'Choose full-fat, plain varieties. Great for spreading on toast for BLW.',
    safeFromAge: '6mo'
  },
  {
    id: 'butter', name: 'Butter', emoji: '🧈', foodGroup: 'dairy', allergens: ['milk'],
    chokingHazard: false, chokingNotes: 'Used in cooking, no choking risk',
    servingByAge: { '6mo': 'Small amounts in cooking or on foods', '9mo': 'In cooking, on vegetables', '12mo': 'On toast, in cooking', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin A', 'Vitamin D', 'Healthy fats', 'Vitamin K2'],
    commonReactions: ['Dairy allergen — contains very small amount of milk protein'], prepTips: 'A small amount adds flavor and healthy fats. Ghee (clarified butter) has less milk protein.',
    safeFromAge: '6mo'
  },
  {
    id: 'kefir', name: 'Kefir', emoji: '🥛', foodGroup: 'dairy', allergens: ['milk'],
    chokingHazard: false, chokingNotes: 'Liquid/smooth, no choking risk',
    servingByAge: { '6mo': 'Small amounts in cooking or on cereal', '9mo': 'Offered in open cup', '12mo': 'In smoothies, with cereal', '2yr': 'As a drink', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Probiotics (more than yogurt)', 'Calcium', 'Protein', 'B12'],
    commonReactions: ['Dairy allergen — many lactose intolerant people tolerate kefir'], prepTips: 'Contains more probiotic strains than yogurt. Choose plain, full-fat varieties.',
    safeFromAge: '6mo'
  },
  {
    id: 'ricotta', name: 'Ricotta', emoji: '🧀', foodGroup: 'dairy', allergens: ['milk'],
    chokingHazard: false, chokingNotes: 'Soft, creamy texture, very safe',
    servingByAge: { '6mo': 'On preloaded spoon or spread on toast', '9mo': 'As a spread or mixed into food', '12mo': 'In pasta, on toast, in pancakes', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Calcium', 'Protein', 'Vitamin A', 'Phosphorus'],
    commonReactions: ['Dairy allergen'], prepTips: 'Mild, creamy flavor that most babies love. Great mixed into pasta or spread on toast.',
    safeFromAge: '6mo'
  },

  // ===== LEGUMES =====
  {
    id: 'lentils', name: 'Lentils', emoji: '🫘', foodGroup: 'legumes', allergens: [],
    chokingHazard: false, chokingNotes: 'Small and soft, very safe',
    servingByAge: { '6mo': 'Well-cooked and mashed into puree', '9mo': 'Mashed or in thick soup', '12mo': 'Whole lentils in soups, dals', '2yr': 'In soups, curries, salads', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Iron', 'Plant protein', 'Fiber', 'Folate'],
    commonReactions: ['May cause gas — introduce gradually'], prepTips: 'Red lentils cook fastest and break down easily for purees. Great iron source for plant-based families.',
    safeFromAge: '6mo'
  },
  {
    id: 'chickpeas', name: 'Chickpeas', emoji: '🫘', foodGroup: 'legumes', allergens: [],
    chokingHazard: true, chokingNotes: 'Round and firm — squish or mash for young babies',
    servingByAge: { '6mo': 'Well-cooked and mashed, or as hummus', '9mo': 'Squished chickpeas', '12mo': 'Whole cooked or in patties', '2yr': 'In salads, curries, roasted', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Fiber', 'Iron', 'Folate'],
    commonReactions: ['May cause gas'], prepTips: 'Canned chickpeas are convenient — rinse well to reduce sodium. Squish each one for young babies.',
    safeFromAge: '6mo'
  },
  {
    id: 'black-beans', name: 'Black Beans', emoji: '🫘', foodGroup: 'legumes', allergens: [],
    chokingHazard: false, chokingNotes: 'Soft when cooked, low risk',
    servingByAge: { '6mo': 'Mashed or pureed', '9mo': 'Lightly mashed', '12mo': 'Whole in burritos, soups', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Fiber', 'Iron', 'Folate'],
    commonReactions: ['May cause gas'], prepTips: 'Rinse canned beans well. Mash with a fork for easy baby food.',
    safeFromAge: '6mo'
  },
  {
    id: 'kidney-beans', name: 'Kidney Beans', emoji: '🫘', foodGroup: 'legumes', allergens: [],
    chokingHazard: true, chokingNotes: 'Firm exterior — squish or mash for young babies',
    servingByAge: { '6mo': 'Mashed or pureed', '9mo': 'Squished or mashed', '12mo': 'Whole in chili, soups', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Fiber', 'Iron', 'Folate'],
    commonReactions: ['May cause gas — must be fully cooked'], prepTips: 'NEVER serve raw or undercooked kidney beans. Use canned (pre-cooked) for safety and convenience.',
    safeFromAge: '6mo'
  },
  {
    id: 'edamame', name: 'Edamame', emoji: '🫛', foodGroup: 'legumes', allergens: ['soy'],
    chokingHazard: true, chokingNotes: 'Small and round — squish or halve for young babies',
    servingByAge: { '6mo': 'Mashed or pureed', '9mo': 'Squished individual beans', '12mo': 'Whole shelled edamame', '2yr': 'Shelled or in pods for fun', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Complete protein', 'Fiber', 'Iron', 'Vitamin K'],
    commonReactions: ['Soy allergen'], prepTips: 'Always shell edamame for young children. Frozen shelled edamame is convenient.',
    safeFromAge: '6mo'
  },
  {
    id: 'hummus', name: 'Hummus', emoji: '🥣', foodGroup: 'legumes', allergens: ['sesame'],
    chokingHazard: false, chokingNotes: 'Smooth paste, very safe',
    servingByAge: { '6mo': 'Spread thin on toast or on preloaded spoon', '9mo': 'As a dip with soft veggies', '12mo': 'As a spread or dip', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Iron', 'Fiber', 'Healthy fats'],
    commonReactions: ['Contains sesame (tahini) — a top 9 allergen'], prepTips: 'Hummus introduces both chickpeas and sesame at once. Choose varieties without excess salt.',
    safeFromAge: '6mo'
  },
  {
    id: 'split-peas', name: 'Split Peas', emoji: '🫛', foodGroup: 'legumes', allergens: [],
    chokingHazard: false, chokingNotes: 'Break down when cooked, very safe',
    servingByAge: { '6mo': 'Split pea soup/puree', '9mo': 'Thick split pea soup', '12mo': 'Split pea soup with bread', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Protein', 'Fiber', 'Iron', 'Potassium'],
    commonReactions: ['May cause gas'], prepTips: 'Split peas dissolve when cooked — perfect for naturally thick baby purees.',
    safeFromAge: '6mo'
  },

  // ===== NUTS & SEEDS =====
  {
    id: 'peanut-butter', name: 'Peanut Butter', emoji: '🥜', foodGroup: 'nuts-seeds', allergens: ['peanuts'],
    chokingHazard: true, chokingNotes: '⚠️ NEVER serve whole peanuts or thick globs. Thin spread only, or dilute into purees. No whole nuts until 4+.',
    servingByAge: { '6mo': 'Thin smear on toast strip or mixed into puree/yogurt (dilute with breastmilk/water)', '9mo': 'Thin spread on soft foods, mixed into oatmeal', '12mo': 'Spread on toast, stirred into oatmeal or yogurt', '2yr': 'Spread on crackers, in smoothies, sauces', '3yr+': 'Any preparation — NO whole peanuts until age 4+' },
    nutritionHighlights: ['Protein', 'Healthy fats', 'Vitamin E', 'Niacin'],
    commonReactions: ['Top allergen — watch for hives, swelling, breathing difficulty within 2 hours', 'Per LEAP study: early introduction reduces allergy risk by up to 81%'], prepTips: 'Per AAP 2024 & LEAP/EAT study data: introduce peanut early (around 6 months) especially for high-risk babies (eczema/egg allergy). For high-risk: consult pediatrician first, consider skin prick test. Mix smooth PB with warm water to thin consistency for first exposure. Never serve whole/chunked nuts to children under 4.',
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
  {
    id: 'almond-butter', name: 'Almond Butter', emoji: '🌰', foodGroup: 'nuts-seeds', allergens: ['tree-nuts'],
    chokingHazard: true, chokingNotes: 'Never serve whole almonds — thin spread or mix into food',
    servingByAge: { '6mo': 'Thinned with milk/water and mixed into puree', '9mo': 'Thin spread on toast', '12mo': 'Spread on toast, in oatmeal', '2yr': 'In smoothies, on crackers', '3yr+': 'Any preparation — no whole almonds until 4+' },
    nutritionHighlights: ['Vitamin E', 'Calcium', 'Healthy fats', 'Protein'],
    commonReactions: ['Tree nut allergen — watch for hives, swelling'], prepTips: 'Use smooth almond butter only. Great way to introduce tree nut allergen early.',
    safeFromAge: '6mo'
  },
  {
    id: 'cashew-butter', name: 'Cashew Butter', emoji: '🌰', foodGroup: 'nuts-seeds', allergens: ['tree-nuts'],
    chokingHazard: true, chokingNotes: 'Never serve whole cashews — thin spread only',
    servingByAge: { '6mo': 'Thinned and mixed into puree', '9mo': 'Thin spread on soft foods', '12mo': 'Spread on toast, in cooking', '2yr': 'In smoothies, sauces', '3yr+': 'Any preparation — no whole cashews until 4+' },
    nutritionHighlights: ['Iron', 'Zinc', 'Magnesium', 'Healthy fats'],
    commonReactions: ['Tree nut allergen'], prepTips: 'Cashew butter is naturally creamy and mild-flavored. Use smooth variety only.',
    safeFromAge: '6mo'
  },
  {
    id: 'sunflower-seed-butter', name: 'Sunflower Seed Butter', emoji: '🌻', foodGroup: 'nuts-seeds', allergens: [],
    chokingHazard: true, chokingNotes: 'Thick paste — thin spread only, never serve whole seeds',
    servingByAge: { '6mo': 'Thinned and mixed into puree', '9mo': 'Thin spread on toast', '12mo': 'Spread on toast, in oatmeal', '2yr': 'In smoothies, on crackers', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Vitamin E', 'Magnesium', 'Selenium', 'Healthy fats'],
    commonReactions: ['Nut-free alternative — good for allergy households'], prepTips: 'Great nut-free alternative to peanut butter. May turn green due to chlorogenic acid — harmless.',
    safeFromAge: '6mo'
  },
  {
    id: 'chia-seeds', name: 'Chia Seeds', emoji: '🌱', foodGroup: 'nuts-seeds', allergens: [],
    chokingHazard: false, chokingNotes: 'Form gel when soaked, very safe',
    servingByAge: { '6mo': 'Mixed into purees or yogurt (soak first)', '9mo': 'In chia pudding', '12mo': 'In pudding, baked goods', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Omega-3 (ALA)', 'Fiber', 'Calcium', 'Protein'],
    commonReactions: ['Well tolerated'], prepTips: 'Always soak chia seeds before serving — dry seeds can be a choking hazard. Chia pudding is perfect.',
    safeFromAge: '6mo'
  },
  {
    id: 'flax-seeds', name: 'Flax Seeds (Ground)', emoji: '🌱', foodGroup: 'nuts-seeds', allergens: [],
    chokingHazard: false, chokingNotes: 'Use ground flax only — whole seeds pass through undigested',
    servingByAge: { '6mo': 'Ground flax mixed into purees', '9mo': 'Ground flax in oatmeal, yogurt', '12mo': 'In baked goods, smoothies', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Omega-3 (ALA)', 'Fiber', 'Lignans', 'Protein'],
    commonReactions: ['Well tolerated'], prepTips: 'Must be ground to absorb nutrients — whole seeds pass through. Store ground flax in fridge.',
    safeFromAge: '6mo'
  },
  {
    id: 'hemp-seeds', name: 'Hemp Seeds', emoji: '🌱', foodGroup: 'nuts-seeds', allergens: [],
    chokingHazard: false, chokingNotes: 'Small and soft, very safe',
    servingByAge: { '6mo': 'Sprinkled into purees', '9mo': 'On yogurt, in oatmeal', '12mo': 'As topping, in smoothies', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Complete protein', 'Omega-3', 'Iron', 'Zinc'],
    commonReactions: ['Well tolerated'], prepTips: 'Hemp hearts are a nutritional powerhouse. Soft enough for babies, no soaking needed.',
    safeFromAge: '6mo'
  },

  // ===== OTHER =====
  {
    id: 'cinnamon', name: 'Cinnamon', emoji: '🫙', foodGroup: 'other', allergens: [],
    chokingHazard: false, chokingNotes: 'Used as spice, no choking risk',
    servingByAge: { '6mo': 'Small pinch in foods', '9mo': 'In oatmeal, on fruit', '12mo': 'In baking, on toast', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Antioxidants', 'Anti-inflammatory', 'Manganese'],
    commonReactions: ['Well tolerated in small amounts'], prepTips: 'Ceylon cinnamon is preferred over cassia for lower coumarin content. A little goes a long way.',
    safeFromAge: '6mo'
  },
  {
    id: 'turmeric', name: 'Turmeric', emoji: '🫙', foodGroup: 'other', allergens: [],
    chokingHazard: false, chokingNotes: 'Used as spice, no choking risk',
    servingByAge: { '6mo': 'Tiny pinch in cooking', '9mo': 'In soups, curries', '12mo': 'In golden milk, cooking', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Curcumin (anti-inflammatory)', 'Manganese', 'Iron'],
    commonReactions: ['Will stain clothes and surfaces yellow'], prepTips: 'Pair with black pepper for better absorption. Will stain everything — be warned!',
    safeFromAge: '6mo'
  },
  {
    id: 'garlic', name: 'Garlic', emoji: '🧄', foodGroup: 'other', allergens: [],
    chokingHazard: false, chokingNotes: 'Used minced in cooking, no choking risk',
    servingByAge: { '6mo': 'Small amount cooked into foods', '9mo': 'In sauces and cooking', '12mo': 'Regular use in cooking', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Allicin (antimicrobial)', 'Vitamin C', 'Manganese', 'Vitamin B6'],
    commonReactions: ['May flavor breast milk — babies may actually prefer it'], prepTips: 'Babies who are exposed to garlic through breast milk often accept it more easily. Cook to mellow flavor.',
    safeFromAge: '6mo'
  },
  {
    id: 'ginger', name: 'Ginger', emoji: '🫚', foodGroup: 'other', allergens: [],
    chokingHazard: false, chokingNotes: 'Used grated/minced in cooking, no choking risk',
    servingByAge: { '6mo': 'Tiny amount grated into food', '9mo': 'In cooking, smoothies', '12mo': 'In baked goods, cooking', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Gingerol (anti-inflammatory)', 'Manganese', 'Aids digestion'],
    commonReactions: ['Well tolerated in small amounts'], prepTips: 'Fresh ginger is more potent than dried. Can help with nausea and digestion.',
    safeFromAge: '6mo'
  },
  {
    id: 'olive-oil', name: 'Olive Oil', emoji: '🫒', foodGroup: 'other', allergens: [],
    chokingHazard: false, chokingNotes: 'Liquid, no choking risk',
    servingByAge: { '6mo': 'Drizzle on vegetables or mix into purees', '9mo': 'In cooking, drizzled on food', '12mo': 'Regular use', '2yr': 'Any preparation', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Healthy monounsaturated fats', 'Vitamin E', 'Vitamin K', 'Antioxidants'],
    commonReactions: ['Very well tolerated'], prepTips: 'Extra virgin olive oil is most nutritious. Great for adding healthy calories to baby food.',
    safeFromAge: '6mo'
  },
  {
    id: 'honey', name: 'Honey', emoji: '🍯', foodGroup: 'other', allergens: [],
    chokingHazard: false, chokingNotes: 'Liquid/sticky, no choking risk',
    servingByAge: { '6mo': '⚠️ NEVER before 12 months — botulism risk', '9mo': '⚠️ NEVER before 12 months — botulism risk', '12mo': 'Small amounts as natural sweetener', '2yr': 'In cooking, on toast, in baking', '3yr+': 'Any preparation' },
    nutritionHighlights: ['Natural sugars', 'Antioxidants', 'Antimicrobial properties'],
    commonReactions: ['⚠️ Can cause infant botulism under 12 months — potentially fatal'], prepTips: '⚠️ PER AAP/CDC/WHO: NEVER give honey to babies under 12 months. Clostridium botulinum spores in honey can cause infant botulism — a potentially life-threatening condition. This includes honey in baked goods, on pacifiers, or in any form. Safe after first birthday when gut flora is mature enough to handle spores.',
    safeFromAge: '12mo'
  },
];
