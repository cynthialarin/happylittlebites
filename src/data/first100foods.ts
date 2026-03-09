import { FoodGroup } from '@/types';

export interface First100Food {
  id: string;
  name: string;
  emoji: string;
  foodGroup: FoodGroup;
  category: string;
  ageRecommended: string;
  tip: string;
  foodId?: string; // links to foods.ts entry if exists
}

export interface First100Milestone {
  count: number;
  title: string;
  emoji: string;
  description: string;
  xpBonus: number;
}

export const FIRST_100_MILESTONES: First100Milestone[] = [
  { count: 1, title: 'First Bite!', emoji: '🥄', description: 'You introduced your first food!', xpBonus: 50 },
  { count: 5, title: 'Getting Started', emoji: '🌱', description: '5 foods down — great start!', xpBonus: 75 },
  { count: 10, title: 'Double Digits', emoji: '⭐', description: '10 foods explored!', xpBonus: 100 },
  { count: 25, title: 'Quarter Century', emoji: '🎯', description: '25 foods — amazing variety!', xpBonus: 150 },
  { count: 50, title: 'Halfway Hero', emoji: '🏅', description: 'Halfway to 100!', xpBonus: 250 },
  { count: 75, title: 'Food Champion', emoji: '🏆', description: '75 foods — nearly there!', xpBonus: 300 },
  { count: 100, title: 'Century Club!', emoji: '🎉', description: 'ALL 100 foods introduced!', xpBonus: 500 },
];

export const FIRST_100_FOODS: First100Food[] = [
  // === FRUITS (15) ===
  { id: 'f100-avocado', name: 'Avocado', emoji: '🥑', foodGroup: 'fruits', category: 'Fruits', ageRecommended: '6+ months', tip: 'Perfect first food — soft, nutrient-dense, mild flavor', foodId: 'avocado' },
  { id: 'f100-banana', name: 'Banana', emoji: '🍌', foodGroup: 'fruits', category: 'Fruits', ageRecommended: '6+ months', tip: 'Roll in crushed cereal for easier grip', foodId: 'banana' },
  { id: 'f100-strawberry', name: 'Strawberry', emoji: '🍓', foodGroup: 'fruits', category: 'Fruits', ageRecommended: '6+ months', tip: 'Contact rash is common and NOT a true allergy', foodId: 'strawberry' },
  { id: 'f100-blueberry', name: 'Blueberry', emoji: '🫐', foodGroup: 'fruits', category: 'Fruits', ageRecommended: '6+ months', tip: 'Squish or halve to reduce choking risk', foodId: 'blueberry' },
  { id: 'f100-mango', name: 'Mango', emoji: '🥭', foodGroup: 'fruits', category: 'Fruits', ageRecommended: '6+ months', tip: 'Slice into spears with skin left on for grip', foodId: 'mango' },
  { id: 'f100-peach', name: 'Peach', emoji: '🍑', foodGroup: 'fruits', category: 'Fruits', ageRecommended: '6+ months', tip: 'Choose ripe, soft peaches for easy mashing', foodId: 'peach' },
  { id: 'f100-pear', name: 'Pear', emoji: '🍐', foodGroup: 'fruits', category: 'Fruits', ageRecommended: '6+ months', tip: 'Great for constipation — gentle on tummies', foodId: 'pear' },
  { id: 'f100-apple', name: 'Apple', emoji: '🍎', foodGroup: 'fruits', category: 'Fruits', ageRecommended: '6+ months', tip: 'Steam or bake until soft for young babies', foodId: 'apple' },
  { id: 'f100-watermelon', name: 'Watermelon', emoji: '🍉', foodGroup: 'fruits', category: 'Fruits', ageRecommended: '6+ months', tip: 'Remove seeds, serve as sticks', foodId: 'watermelon' },
  { id: 'f100-kiwi', name: 'Kiwi', emoji: '🥝', foodGroup: 'fruits', category: 'Fruits', ageRecommended: '6+ months', tip: 'Rich in vitamin C — may cause mouth tingling', foodId: 'kiwi' },
  { id: 'f100-plum', name: 'Plum', emoji: '🟣', foodGroup: 'fruits', category: 'Fruits', ageRecommended: '6+ months', tip: 'Great source of fiber, helps digestion' },
  { id: 'f100-melon', name: 'Cantaloupe', emoji: '🍈', foodGroup: 'fruits', category: 'Fruits', ageRecommended: '6+ months', tip: 'Soft and sweet, cut into thin strips' },
  { id: 'f100-papaya', name: 'Papaya', emoji: '🧡', foodGroup: 'fruits', category: 'Fruits', ageRecommended: '6+ months', tip: 'Very soft when ripe, contains digestive enzymes' },
  { id: 'f100-grape', name: 'Grapes', emoji: '🍇', foodGroup: 'fruits', category: 'Fruits', ageRecommended: '6+ months', tip: 'ALWAYS quarter lengthwise — #1 choking hazard. Never serve whole or in rounds until age 4+', foodId: 'grapes' },
  { id: 'f100-cherry', name: 'Cherries', emoji: '🍒', foodGroup: 'fruits', category: 'Fruits', ageRecommended: '9+ months', tip: 'Remove pits, cut in halves or quarters' },

  // === VEGETABLES (20) ===
  { id: 'f100-sweet-potato', name: 'Sweet Potato', emoji: '🍠', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Classic starter food — roast into wedges or mash', foodId: 'sweet-potato' },
  { id: 'f100-butternut-squash', name: 'Butternut Squash', emoji: '🎃', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Roast until very soft, naturally sweet', foodId: 'butternut-squash' },
  { id: 'f100-broccoli', name: 'Broccoli', emoji: '🥦', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Steam florets — the "tree" shape is great for gripping', foodId: 'broccoli' },
  { id: 'f100-carrot', name: 'Carrot', emoji: '🥕', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Cook until very soft — raw carrot is a choking hazard', foodId: 'carrot' },
  { id: 'f100-peas', name: 'Peas', emoji: '🟢', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Smash slightly for young babies to prevent choking', foodId: 'peas' },
  { id: 'f100-zucchini', name: 'Zucchini', emoji: '🥒', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Steam or sauté — very mild and easy to digest', foodId: 'zucchini' },
  { id: 'f100-green-beans', name: 'Green Beans', emoji: '🫛', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Steam until very soft, great finger food shape', foodId: 'green-beans' },
  { id: 'f100-spinach', name: 'Spinach', emoji: '🥬', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Blend into purees, sauces or scrambled eggs', foodId: 'spinach' },
  { id: 'f100-cauliflower', name: 'Cauliflower', emoji: '🤍', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Steam florets, great mild flavor' },
  { id: 'f100-bell-pepper', name: 'Bell Pepper', emoji: '🫑', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Roast or steam to soften, remove skin for babies', foodId: 'bell-pepper' },
  { id: 'f100-tomato', name: 'Tomato', emoji: '🍅', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Cook to reduce acidity for young babies' },
  { id: 'f100-corn', name: 'Corn', emoji: '🌽', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Serve on the cob for gnawing or as a puree' },
  { id: 'f100-beet', name: 'Beet', emoji: '🟤', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Roast until tender — may stain, use a bib!' },
  { id: 'f100-asparagus', name: 'Asparagus', emoji: '🌿', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Great spear shape for BLW, steam well' },
  { id: 'f100-cucumber', name: 'Cucumber', emoji: '🥒', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '9+ months', tip: 'Peel and cut into thin sticks, can be slippery' },
  { id: 'f100-eggplant', name: 'Eggplant', emoji: '🍆', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Roast until very soft, great in baba ganoush' },
  { id: 'f100-kale', name: 'Kale', emoji: '🥗', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Blend into smoothies or bake into crispy chips' },
  { id: 'f100-mushroom', name: 'Mushrooms', emoji: '🍄', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Cook thoroughly, dice small for younger babies' },
  { id: 'f100-parsnip', name: 'Parsnip', emoji: '🥕', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Sweet when roasted, great mashed' },
  { id: 'f100-turnip', name: 'Turnip', emoji: '⬜', foodGroup: 'vegetables', category: 'Vegetables', ageRecommended: '6+ months', tip: 'Mild flavor, boil or roast until tender' },

  // === GRAINS & STARCHES (15) ===
  { id: 'f100-oats', name: 'Oats', emoji: '🥣', foodGroup: 'grains', category: 'Grains & Starches', ageRecommended: '6+ months', tip: 'Iron-fortified oatmeal is a great first food', foodId: 'oats' },
  { id: 'f100-rice', name: 'Rice', emoji: '🍚', foodGroup: 'grains', category: 'Grains & Starches', ageRecommended: '6+ months', tip: 'Offer variety — limit to avoid arsenic concerns', foodId: 'rice' },
  { id: 'f100-pasta', name: 'Pasta', emoji: '🍝', foodGroup: 'grains', category: 'Grains & Starches', ageRecommended: '6+ months', tip: 'Fusilli is great for little hands to grip', foodId: 'pasta' },
  { id: 'f100-bread', name: 'Bread', emoji: '🍞', foodGroup: 'grains', category: 'Grains & Starches', ageRecommended: '6+ months', tip: 'Toast lightly for easier gripping, avoid honey before 1', foodId: 'bread' },
  { id: 'f100-quinoa', name: 'Quinoa', emoji: '🌾', foodGroup: 'grains', category: 'Grains & Starches', ageRecommended: '6+ months', tip: 'Complete protein — rinse well before cooking', foodId: 'quinoa' },
  { id: 'f100-barley', name: 'Barley', emoji: '🌾', foodGroup: 'grains', category: 'Grains & Starches', ageRecommended: '6+ months', tip: 'Good source of fiber, cook until very soft' },
  { id: 'f100-millet', name: 'Millet', emoji: '🟡', foodGroup: 'grains', category: 'Grains & Starches', ageRecommended: '6+ months', tip: 'Gluten-free grain, mild and easy to digest' },
  { id: 'f100-tortilla', name: 'Tortilla', emoji: '🫓', foodGroup: 'grains', category: 'Grains & Starches', ageRecommended: '6+ months', tip: 'Cut into strips — great vehicle for spreads' },
  { id: 'f100-couscous', name: 'Couscous', emoji: '🟨', foodGroup: 'grains', category: 'Grains & Starches', ageRecommended: '9+ months', tip: 'Tiny grains are great for pincer grasp practice' },
  { id: 'f100-pancake', name: 'Pancakes', emoji: '🥞', foodGroup: 'grains', category: 'Grains & Starches', ageRecommended: '6+ months', tip: 'Make with banana and egg for a nutritious version' },
  { id: 'f100-crackers', name: 'Crackers', emoji: '🍘', foodGroup: 'grains', category: 'Grains & Starches', ageRecommended: '9+ months', tip: 'Choose low-sodium, whole grain varieties' },
  { id: 'f100-polenta', name: 'Polenta', emoji: '🟡', foodGroup: 'grains', category: 'Grains & Starches', ageRecommended: '6+ months', tip: 'Soft and smooth, can be shaped into fingers' },
  { id: 'f100-potato', name: 'Potato', emoji: '🥔', foodGroup: 'grains', category: 'Grains & Starches', ageRecommended: '6+ months', tip: 'Bake, mash, or cut into wedges' },
  { id: 'f100-noodles', name: 'Rice Noodles', emoji: '🍜', foodGroup: 'grains', category: 'Grains & Starches', ageRecommended: '6+ months', tip: 'Gluten-free alternative, cut short for safety' },
  { id: 'f100-pita', name: 'Pita Bread', emoji: '🫓', foodGroup: 'grains', category: 'Grains & Starches', ageRecommended: '9+ months', tip: 'Toast and cut into strips for dipping' },

  // === PROTEIN (20) ===
  { id: 'f100-chicken', name: 'Chicken', emoji: '🍗', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Shred finely or serve drumstick for gnawing', foodId: 'chicken' },
  { id: 'f100-beef', name: 'Beef', emoji: '🥩', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Iron-rich! Slow cook for easy shredding', foodId: 'beef' },
  { id: 'f100-salmon', name: 'Salmon', emoji: '🐟', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Rich in omega-3s and DHA for brain development', foodId: 'salmon' },
  { id: 'f100-egg', name: 'Egg', emoji: '🥚', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Introduce early — both white and yolk. Top allergen.', foodId: 'egg' },
  { id: 'f100-tofu', name: 'Tofu', emoji: '🧈', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Use firm tofu, pan-fry for grip. Contains soy allergen.', foodId: 'tofu' },
  { id: 'f100-turkey', name: 'Turkey', emoji: '🦃', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Ground turkey is easy to mix into meals', foodId: 'turkey' },
  { id: 'f100-lamb', name: 'Lamb', emoji: '🐑', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Rich in iron and zinc, slow cook for tenderness' },
  { id: 'f100-sardines', name: 'Sardines', emoji: '🐟', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Canned in water — mash bones in for calcium' },
  { id: 'f100-shrimp', name: 'Shrimp', emoji: '🦐', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Top allergen — introduce early, chop finely', foodId: 'shrimp' },
  { id: 'f100-cod', name: 'Cod', emoji: '🐟', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Mild white fish, flakes easily, check for bones' },
  { id: 'f100-pork', name: 'Pork', emoji: '🥓', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Slow cook for tender, shreddable texture' },
  { id: 'f100-liver', name: 'Liver', emoji: '🫀', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Incredibly iron-rich — blend into meatballs. Limit to once per week due to high vitamin A content' },
  { id: 'f100-tempeh', name: 'Tempeh', emoji: '🫘', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Fermented soy — easier to digest than tofu' },
  { id: 'f100-ground-beef', name: 'Ground Meat', emoji: '🥩', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Shape into mini meatballs or flat patties' },
  { id: 'f100-tuna', name: 'Tuna', emoji: '🐟', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Choose light tuna, limit due to mercury' },
  { id: 'f100-duck', name: 'Duck', emoji: '🦆', foodGroup: 'protein', category: 'Protein', ageRecommended: '9+ months', tip: 'Rich flavor, shred finely' },
  { id: 'f100-bison', name: 'Bison', emoji: '🦬', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Leaner than beef, very high in iron' },
  { id: 'f100-white-fish', name: 'Tilapia', emoji: '🐟', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Mild, flaky — great starter fish' },
  { id: 'f100-crab', name: 'Crab', emoji: '🦀', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Shellfish allergen — introduce early, shred finely' },
  { id: 'f100-yogurt-protein', name: 'Greek Yogurt', emoji: '🥛', foodGroup: 'protein', category: 'Protein', ageRecommended: '6+ months', tip: 'Full-fat, plain — high in protein and probiotics' },

  // === DAIRY (10) ===
  { id: 'f100-yogurt', name: 'Yogurt', emoji: '🥛', foodGroup: 'dairy', category: 'Dairy', ageRecommended: '6+ months', tip: 'Choose full-fat, plain yogurt — no honey before 1', foodId: 'yogurt' },
  { id: 'f100-cheese', name: 'Cheese', emoji: '🧀', foodGroup: 'dairy', category: 'Dairy', ageRecommended: '6+ months', tip: 'Soft cheeses are easier — avoid high-sodium varieties', foodId: 'cheese' },
  { id: 'f100-ricotta', name: 'Ricotta', emoji: '🧀', foodGroup: 'dairy', category: 'Dairy', ageRecommended: '6+ months', tip: 'Creamy and mild, great mixed into purees' },
  { id: 'f100-cottage-cheese', name: 'Cottage Cheese', emoji: '🧀', foodGroup: 'dairy', category: 'Dairy', ageRecommended: '6+ months', tip: 'Full-fat, great source of protein' },
  { id: 'f100-cream-cheese', name: 'Cream Cheese', emoji: '🧀', foodGroup: 'dairy', category: 'Dairy', ageRecommended: '6+ months', tip: 'Spread on toast or mix into sauces' },
  { id: 'f100-butter', name: 'Butter', emoji: '🧈', foodGroup: 'dairy', category: 'Dairy', ageRecommended: '6+ months', tip: 'Use for cooking — adds healthy fats and calories' },
  { id: 'f100-mozzarella', name: 'Mozzarella', emoji: '🧀', foodGroup: 'dairy', category: 'Dairy', ageRecommended: '9+ months', tip: 'Shred or slice thinly, can be stringy' },
  { id: 'f100-parmesan', name: 'Parmesan', emoji: '🧀', foodGroup: 'dairy', category: 'Dairy', ageRecommended: '6+ months', tip: 'Grate over pasta or veggies for flavor boost' },
  { id: 'f100-goat-cheese', name: 'Goat Cheese', emoji: '🧀', foodGroup: 'dairy', category: 'Dairy', ageRecommended: '9+ months', tip: 'Tangy and soft, easier to digest than cow dairy for some' },
  { id: 'f100-kefir', name: 'Kefir', emoji: '🥛', foodGroup: 'dairy', category: 'Dairy', ageRecommended: '6+ months', tip: 'Probiotic-rich fermented milk drink' },

  // === LEGUMES (10) ===
  { id: 'f100-lentils', name: 'Lentils', emoji: '🫘', foodGroup: 'legumes', category: 'Legumes', ageRecommended: '6+ months', tip: 'Red lentils cook soft and smooth — great for purees', foodId: 'lentils' },
  { id: 'f100-chickpeas', name: 'Chickpeas', emoji: '🫘', foodGroup: 'legumes', category: 'Legumes', ageRecommended: '6+ months', tip: 'Smash or blend into hummus', foodId: 'chickpeas' },
  { id: 'f100-black-beans', name: 'Black Beans', emoji: '🫘', foodGroup: 'legumes', category: 'Legumes', ageRecommended: '6+ months', tip: 'Mash slightly for younger babies, high in iron', foodId: 'black-beans' },
  { id: 'f100-kidney-beans', name: 'Kidney Beans', emoji: '🫘', foodGroup: 'legumes', category: 'Legumes', ageRecommended: '6+ months', tip: 'Must be fully cooked — smash for young babies' },
  { id: 'f100-edamame', name: 'Edamame', emoji: '🫛', foodGroup: 'legumes', category: 'Legumes', ageRecommended: '6+ months', tip: 'Soy allergen — mash or halve beans, remove pods' },
  { id: 'f100-split-peas', name: 'Split Peas', emoji: '🟢', foodGroup: 'legumes', category: 'Legumes', ageRecommended: '6+ months', tip: 'Cook into thick soups, naturally creamy' },
  { id: 'f100-white-beans', name: 'White Beans', emoji: '⬜', foodGroup: 'legumes', category: 'Legumes', ageRecommended: '6+ months', tip: 'Creamy texture, great mashed on toast' },
  { id: 'f100-navy-beans', name: 'Navy Beans', emoji: '🫘', foodGroup: 'legumes', category: 'Legumes', ageRecommended: '6+ months', tip: 'Small and soft, easy to mash' },
  { id: 'f100-hummus', name: 'Hummus', emoji: '🫕', foodGroup: 'legumes', category: 'Legumes', ageRecommended: '6+ months', tip: 'Great dip for veggies and bread strips' },
  { id: 'f100-pinto-beans', name: 'Pinto Beans', emoji: '🫘', foodGroup: 'legumes', category: 'Legumes', ageRecommended: '6+ months', tip: 'Refried or mashed — great in burritos' },

  // === NUTS & SEEDS (10) ===
  { id: 'f100-peanut-butter', name: 'Peanut Butter', emoji: '🥜', foodGroup: 'nuts-seeds', category: 'Nuts & Seeds', ageRecommended: '6+ months', tip: 'Top allergen — thin with milk, never serve whole nuts', foodId: 'peanut-butter' },
  { id: 'f100-almond-butter', name: 'Almond Butter', emoji: '🌰', foodGroup: 'nuts-seeds', category: 'Nuts & Seeds', ageRecommended: '6+ months', tip: 'Tree nut allergen — spread thinly on toast' },
  { id: 'f100-tahini', name: 'Tahini', emoji: '🫘', foodGroup: 'nuts-seeds', category: 'Nuts & Seeds', ageRecommended: '6+ months', tip: 'Sesame allergen — mix into purees or hummus' },
  { id: 'f100-chia-seeds', name: 'Chia Seeds', emoji: '⚫', foodGroup: 'nuts-seeds', category: 'Nuts & Seeds', ageRecommended: '6+ months', tip: 'Always soak before serving — omega-3 powerhouse' },
  { id: 'f100-flax-seeds', name: 'Ground Flaxseed', emoji: '🟤', foodGroup: 'nuts-seeds', category: 'Nuts & Seeds', ageRecommended: '6+ months', tip: 'Grind before serving, add to oatmeal or smoothies' },
  { id: 'f100-hemp-seeds', name: 'Hemp Seeds', emoji: '🟢', foodGroup: 'nuts-seeds', category: 'Nuts & Seeds', ageRecommended: '6+ months', tip: 'Complete protein, sprinkle on anything' },
  { id: 'f100-sunflower-butter', name: 'Sunflower Butter', emoji: '🌻', foodGroup: 'nuts-seeds', category: 'Nuts & Seeds', ageRecommended: '6+ months', tip: 'Nut-free alternative, great for allergic families' },
  { id: 'f100-cashew-butter', name: 'Cashew Butter', emoji: '🥜', foodGroup: 'nuts-seeds', category: 'Nuts & Seeds', ageRecommended: '6+ months', tip: 'Tree nut allergen — creamy and mild' },
  { id: 'f100-pumpkin-seeds', name: 'Pumpkin Seeds', emoji: '🎃', foodGroup: 'nuts-seeds', category: 'Nuts & Seeds', ageRecommended: '6+ months', tip: 'Grind into powder for young babies, rich in zinc' },
  { id: 'f100-walnut-butter', name: 'Walnut Butter', emoji: '🌰', foodGroup: 'nuts-seeds', category: 'Nuts & Seeds', ageRecommended: '6+ months', tip: 'Tree nut allergen — omega-3 rich' },
];

export const FOOD_CATEGORIES = [...new Set(FIRST_100_FOODS.map(f => f.category))];
