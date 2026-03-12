import { Allergen, AgeGroup, FoodGroup } from '@/types';

export interface JarFood {
  id: string;
  brand: string;
  name: string;
  emoji: string;
  stage: 1 | 2 | 3;
  ageGroup: AgeGroup;
  ingredients: string;
  allergens: Allergen[];
  foodGroup: FoodGroup;
  nutritionNotes: string;
  chokingHazard?: boolean;
}

export const JAR_BRANDS = [
  { id: 'gerber', name: 'Gerber', emoji: '🟢' },
  { id: 'beechnut', name: 'Beech-Nut', emoji: '🟡' },
  { id: 'happybaby', name: 'Happy Baby', emoji: '🟣' },
  { id: 'earthsbest', name: "Earth's Best", emoji: '🌎' },
  { id: 'plum', name: 'Plum Organics', emoji: '🟤' },
  { id: 'sprout', name: 'Sprout Organic', emoji: '🌱' },
  { id: 'ellanurture', name: 'Ella\'s Kitchen', emoji: '🔴' },
  { id: 'parent-choice', name: "Parent's Choice", emoji: '🔵' },
] as const;

export const jarFoods: JarFood[] = [
  // ── Gerber Stage 1 (6mo) ──
  { id: 'g1-banana', brand: 'Gerber', name: '1st Foods Banana', emoji: '🍌', stage: 1, ageGroup: '6mo', ingredients: 'Bananas', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Good source of potassium. Single-ingredient, great first food.' },
  { id: 'g1-apple', brand: 'Gerber', name: '1st Foods Apple', emoji: '🍎', stage: 1, ageGroup: '6mo', ingredients: 'Apples', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Naturally sweet, high in fiber. Gentle on digestion.' },
  { id: 'g1-pear', brand: 'Gerber', name: '1st Foods Pear', emoji: '🍐', stage: 1, ageGroup: '6mo', ingredients: 'Pears', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Very gentle on tummy, low allergen risk.' },
  { id: 'g1-peach', brand: 'Gerber', name: '1st Foods Peach', emoji: '🍑', stage: 1, ageGroup: '6mo', ingredients: 'Peaches', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Rich in vitamins A and C.' },
  { id: 'g1-prune', brand: 'Gerber', name: '1st Foods Prune', emoji: '🫐', stage: 1, ageGroup: '6mo', ingredients: 'Prunes, water', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Natural laxative, great for constipation relief.' },
  { id: 'g1-sweetpotato', brand: 'Gerber', name: '1st Foods Sweet Potato', emoji: '🍠', stage: 1, ageGroup: '6mo', ingredients: 'Sweet potatoes', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Excellent source of vitamin A and beta-carotene.' },
  { id: 'g1-pea', brand: 'Gerber', name: '1st Foods Pea', emoji: '🟢', stage: 1, ageGroup: '6mo', ingredients: 'Peas', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Good plant protein source. Iron and fiber.' },
  { id: 'g1-carrot', brand: 'Gerber', name: '1st Foods Carrot', emoji: '🥕', stage: 1, ageGroup: '6mo', ingredients: 'Carrots', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'High in beta-carotene for eye health.' },
  { id: 'g1-greenbeans', brand: 'Gerber', name: '1st Foods Green Bean', emoji: '🫛', stage: 1, ageGroup: '6mo', ingredients: 'Green beans', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Good source of iron and vitamin K.' },
  { id: 'g1-squash', brand: 'Gerber', name: '1st Foods Butternut Squash', emoji: '🎃', stage: 1, ageGroup: '6mo', ingredients: 'Butternut squash', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Naturally sweet, rich in vitamins A and C.' },

  // ── Gerber Stage 2 (9mo) ──
  { id: 'g2-banana-strawberry', brand: 'Gerber', name: '2nd Foods Banana Strawberry', emoji: '🍓', stage: 2, ageGroup: '9mo', ingredients: 'Bananas, strawberries', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Vitamin C from strawberries aids iron absorption.' },
  { id: 'g2-apple-mango', brand: 'Gerber', name: '2nd Foods Apple Mango', emoji: '🥭', stage: 2, ageGroup: '9mo', ingredients: 'Apples, mangos', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Tropical blend, rich in vitamins A and C.' },
  { id: 'g2-chicken-rice', brand: 'Gerber', name: '2nd Foods Chicken & Rice', emoji: '🍗', stage: 2, ageGroup: '9mo', ingredients: 'Water, chicken, rice flour, cornstarch', allergens: [], foodGroup: 'protein', nutritionNotes: 'Great protein source. Iron for brain development.' },
  { id: 'g2-turkey-rice', brand: 'Gerber', name: '2nd Foods Turkey & Rice', emoji: '🦃', stage: 2, ageGroup: '9mo', ingredients: 'Water, turkey, rice flour, cornstarch', allergens: [], foodGroup: 'protein', nutritionNotes: 'Lean protein, zinc for immune health.' },
  { id: 'g2-mac-cheese', brand: 'Gerber', name: '2nd Foods Mac & Cheese', emoji: '🧀', stage: 2, ageGroup: '9mo', ingredients: 'Water, cheddar cheese, macaroni, butter', allergens: ['milk', 'wheat'], foodGroup: 'grains', nutritionNotes: 'Contains dairy calcium. Check for milk/wheat allergens.' },
  { id: 'g2-garden-veggies', brand: 'Gerber', name: '2nd Foods Garden Veggies', emoji: '🥗', stage: 2, ageGroup: '9mo', ingredients: 'Carrots, peas, green beans, spinach', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Multi-veggie blend with iron from spinach.' },
  { id: 'g2-mixed-berries', brand: 'Gerber', name: '2nd Foods Mixed Berries', emoji: '🫐', stage: 2, ageGroup: '9mo', ingredients: 'Blueberries, raspberries, apples', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Antioxidant-rich berry blend.' },

  // ── Gerber Stage 3 (12mo) ──
  { id: 'g3-pasta-marinara', brand: 'Gerber', name: 'Lil\' Bits Pasta Marinara', emoji: '🍝', stage: 3, ageGroup: '12mo', ingredients: 'Tomatoes, pasta, olive oil, garlic', allergens: ['wheat'], foodGroup: 'grains', nutritionNotes: 'Textured for chewing practice. Contains wheat.' },
  { id: 'g3-chicken-italiannoodle', brand: 'Gerber', name: 'Lil\' Bits Chicken Noodle', emoji: '🍜', stage: 3, ageGroup: '12mo', ingredients: 'Water, chicken, noodles, carrots, peas', allergens: ['wheat', 'eggs'], foodGroup: 'protein', nutritionNotes: 'Chunky texture helps oral motor skills.' },
  { id: 'g3-banana-kiwi', brand: 'Gerber', name: 'Lil\' Bits Banana Kiwi', emoji: '🥝', stage: 3, ageGroup: '12mo', ingredients: 'Bananas, kiwi, oat flour', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Kiwi is an excellent vitamin C source.' },

  // ── Gerber Puffs/Snacks ──
  { id: 'g-puffs-strawberry', brand: 'Gerber', name: 'Puffs Strawberry Apple', emoji: '🫧', stage: 2, ageGroup: '9mo', ingredients: 'Rice flour, wheat flour, strawberry, apple', allergens: ['wheat'], foodGroup: 'grains', nutritionNotes: 'Dissolves easily. Great for pincer grasp practice.', chokingHazard: false },
  { id: 'g-puffs-banana', brand: 'Gerber', name: 'Puffs Banana', emoji: '🫧', stage: 2, ageGroup: '9mo', ingredients: 'Rice flour, wheat flour, banana', allergens: ['wheat'], foodGroup: 'grains', nutritionNotes: 'Melt-in-mouth texture. Fortified with iron and zinc.' },
  { id: 'g-yogurt-melts', brand: 'Gerber', name: 'Yogurt Melts Mixed Berry', emoji: '🫠', stage: 3, ageGroup: '12mo', ingredients: 'Yogurt, strawberries, blueberries', allergens: ['milk'], foodGroup: 'dairy', nutritionNotes: 'Freeze-dried yogurt snack. Contains live cultures.' },
  { id: 'g-lil-crunchies', brand: 'Gerber', name: 'Lil\' Crunchies Veggie Dip', emoji: '🥨', stage: 3, ageGroup: '12mo', ingredients: 'Corn, tomato, spinach, onion', allergens: [], foodGroup: 'grains', nutritionNotes: 'Baked corn snack. Easy to hold and self-feed.' },

  // ── Beech-Nut Stage 1 ──
  { id: 'bn1-banana', brand: 'Beech-Nut', name: 'Stage 1 Bananas', emoji: '🍌', stage: 1, ageGroup: '6mo', ingredients: 'Bananas', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Just bananas — nothing else added. Clean label.' },
  { id: 'bn1-sweetpotato', brand: 'Beech-Nut', name: 'Stage 1 Sweet Potatoes', emoji: '🍠', stage: 1, ageGroup: '6mo', ingredients: 'Sweet potatoes', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Real sweet potatoes only. High vitamin A.' },
  { id: 'bn1-pear', brand: 'Beech-Nut', name: 'Stage 1 Pears', emoji: '🍐', stage: 1, ageGroup: '6mo', ingredients: 'Pears', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Single ingredient, gentle first fruit.' },
  { id: 'bn1-butternut', brand: 'Beech-Nut', name: 'Stage 1 Butternut Squash', emoji: '🎃', stage: 1, ageGroup: '6mo', ingredients: 'Butternut squash', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Naturally sweet, beta-carotene rich.' },
  { id: 'bn1-peas', brand: 'Beech-Nut', name: 'Stage 1 Just Peas', emoji: '🟢', stage: 1, ageGroup: '6mo', ingredients: 'Peas', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Plant protein and iron. Clean label product.' },
  { id: 'bn1-apple', brand: 'Beech-Nut', name: 'Stage 1 Apples', emoji: '🍎', stage: 1, ageGroup: '6mo', ingredients: 'Apples', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Simple apple puree, no additives.' },

  // ── Beech-Nut Stage 2 ──
  { id: 'bn2-apple-pumpkin', brand: 'Beech-Nut', name: 'Stage 2 Apple & Pumpkin', emoji: '🎃', stage: 2, ageGroup: '9mo', ingredients: 'Apples, pumpkin', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Beta-carotene and fiber blend.' },
  { id: 'bn2-mango-carrot', brand: 'Beech-Nut', name: 'Stage 2 Mango & Carrot', emoji: '🥭', stage: 2, ageGroup: '9mo', ingredients: 'Mangoes, carrots', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Tropical flavor with vitamin A boost.' },
  { id: 'bn2-chicken-broth', brand: 'Beech-Nut', name: 'Stage 2 Chicken & Broth', emoji: '🍗', stage: 2, ageGroup: '9mo', ingredients: 'Chicken, chicken broth', allergens: [], foodGroup: 'protein', nutritionNotes: 'High-quality protein for growth. Iron and B12.' },
  { id: 'bn2-banana-blueberry', brand: 'Beech-Nut', name: 'Stage 2 Banana Blueberry', emoji: '🫐', stage: 2, ageGroup: '9mo', ingredients: 'Bananas, blueberries', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Antioxidant-rich blend.' },

  // ── Beech-Nut Stage 3 ──
  { id: 'bn3-veggie-chicken', brand: 'Beech-Nut', name: 'Stage 3 Veggie Chicken Soup', emoji: '🍲', stage: 3, ageGroup: '12mo', ingredients: 'Carrots, chicken, peas, rice, broth', allergens: [], foodGroup: 'protein', nutritionNotes: 'Hearty chunky meal for older babies.' },
  { id: 'bn3-mac-cheese', brand: 'Beech-Nut', name: 'Stage 3 Mac & Cheese', emoji: '🧀', stage: 3, ageGroup: '12mo', ingredients: 'Macaroni, cheddar cheese, butter, cream', allergens: ['milk', 'wheat'], foodGroup: 'grains', nutritionNotes: 'Calcium from dairy. Contains milk and wheat.' },

  // ── Happy Baby Stage 1 ──
  { id: 'hb1-pear', brand: 'Happy Baby', name: 'Clearly Crafted Pears', emoji: '🍐', stage: 1, ageGroup: '6mo', ingredients: 'Organic pears', allergens: [], foodGroup: 'fruits', nutritionNotes: 'USDA Organic. Transparent pouch shows real food.' },
  { id: 'hb1-prune', brand: 'Happy Baby', name: 'Clearly Crafted Prunes', emoji: '🫐', stage: 1, ageGroup: '6mo', ingredients: 'Organic prunes', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Organic. Helps with regularity.' },
  { id: 'hb1-sweetpotato', brand: 'Happy Baby', name: 'Clearly Crafted Sweet Potatoes', emoji: '🍠', stage: 1, ageGroup: '6mo', ingredients: 'Organic sweet potatoes', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Organic sweet potatoes, rich in vitamin A.' },
  { id: 'hb1-avocado', brand: 'Happy Baby', name: 'Clearly Crafted Avocados', emoji: '🥑', stage: 1, ageGroup: '6mo', ingredients: 'Organic avocados', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Healthy fats critical for brain development.' },
  { id: 'hb1-banana', brand: 'Happy Baby', name: 'Clearly Crafted Bananas', emoji: '🍌', stage: 1, ageGroup: '6mo', ingredients: 'Organic bananas', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Organic bananas, good potassium source.' },

  // ── Happy Baby Stage 2 ──
  { id: 'hb2-pear-kale-spinach', brand: 'Happy Baby', name: 'Clearly Crafted Pear Kale Spinach', emoji: '🥬', stage: 2, ageGroup: '9mo', ingredients: 'Organic pears, kale, spinach', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Sneaky greens! Iron from spinach and kale.' },
  { id: 'hb2-apple-pumpkin-carrot', brand: 'Happy Baby', name: 'Clearly Crafted Apple Pumpkin Carrot', emoji: '🎃', stage: 2, ageGroup: '9mo', ingredients: 'Organic apples, pumpkin, carrots', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Fall harvest blend with vitamin A.' },
  { id: 'hb2-banana-beet-blueberry', brand: 'Happy Baby', name: 'Clearly Crafted Banana Beet Blueberry', emoji: '🫐', stage: 2, ageGroup: '9mo', ingredients: 'Organic bananas, beets, blueberries', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Beets provide iron and folate.' },
  { id: 'hb2-pear-squash-pea', brand: 'Happy Baby', name: 'Clearly Crafted Pear Squash Pea', emoji: '🟢', stage: 2, ageGroup: '9mo', ingredients: 'Organic pears, squash, peas', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Balanced veggie-fruit combo with plant protein.' },

  // ── Happy Baby Puffs/Snacks ──
  { id: 'hb-puffs-banana-pumpkin', brand: 'Happy Baby', name: 'Superfood Puffs Banana Pumpkin', emoji: '🫧', stage: 2, ageGroup: '9mo', ingredients: 'Organic rice, banana, pumpkin', allergens: [], foodGroup: 'grains', nutritionNotes: 'Organic puffs with choline for brain development.' },
  { id: 'hb-teethers-blueberry', brand: 'Happy Baby', name: 'Teethers Blueberry & Purple Carrot', emoji: '🦷', stage: 1, ageGroup: '6mo', ingredients: 'Organic rice, blueberry, purple carrot', allergens: [], foodGroup: 'grains', nutritionNotes: 'Gentle wafers that dissolve easily for teething babies.' },
  { id: 'hb-yogis-strawberry', brand: 'Happy Baby', name: 'Yogis Strawberry', emoji: '🍓', stage: 3, ageGroup: '12mo', ingredients: 'Organic yogurt, strawberries', allergens: ['milk'], foodGroup: 'dairy', nutritionNotes: 'Freeze-dried yogurt bites with probiotics.' },

  // ── Earth's Best Stage 1 ──
  { id: 'eb1-banana', brand: "Earth's Best", name: 'Stage 1 Bananas', emoji: '🍌', stage: 1, ageGroup: '6mo', ingredients: 'Organic bananas', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Organic, non-GMO verified.' },
  { id: 'eb1-sweetpotato', brand: "Earth's Best", name: 'Stage 1 Sweet Potatoes', emoji: '🍠', stage: 1, ageGroup: '6mo', ingredients: 'Organic sweet potatoes', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'USDA Organic, rich in beta-carotene.' },
  { id: 'eb1-peas', brand: "Earth's Best", name: 'Stage 1 Peas', emoji: '🟢', stage: 1, ageGroup: '6mo', ingredients: 'Organic peas', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Organic green peas with iron.' },
  { id: 'eb1-carrots', brand: "Earth's Best", name: 'Stage 1 Carrots', emoji: '🥕', stage: 1, ageGroup: '6mo', ingredients: 'Organic carrots', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Organic carrots, vitamin A powerhouse.' },

  // ── Earth's Best Stage 2 ──
  { id: 'eb2-chicken-rice', brand: "Earth's Best", name: 'Stage 2 Chicken & Rice', emoji: '🍗', stage: 2, ageGroup: '9mo', ingredients: 'Organic chicken, rice, broth', allergens: [], foodGroup: 'protein', nutritionNotes: 'Organic protein with iron and zinc.' },
  { id: 'eb2-turkey-veggie', brand: "Earth's Best", name: 'Stage 2 Turkey & Vegetables', emoji: '🦃', stage: 2, ageGroup: '9mo', ingredients: 'Organic turkey, carrots, peas, rice', allergens: [], foodGroup: 'protein', nutritionNotes: 'Complete meal with protein and veggies.' },
  { id: 'eb2-banana-blueberry', brand: "Earth's Best", name: 'Stage 2 Banana Blueberry', emoji: '🫐', stage: 2, ageGroup: '9mo', ingredients: 'Organic bananas, blueberries', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Antioxidant combo, organic certified.' },
  { id: 'eb2-pear-mango', brand: "Earth's Best", name: 'Stage 2 Pear Mango', emoji: '🥭', stage: 2, ageGroup: '9mo', ingredients: 'Organic pears, mangoes', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Tropical fruit blend rich in vitamin C.' },

  // ── Earth's Best Stage 3 ──
  { id: 'eb3-veggie-beef-barley', brand: "Earth's Best", name: 'Stage 3 Veggie Beef Barley', emoji: '🥩', stage: 3, ageGroup: '12mo', ingredients: 'Organic beef, barley, carrots, peas, broth', allergens: [], foodGroup: 'protein', nutritionNotes: 'Iron-rich beef with whole grain barley.' },
  { id: 'eb3-pasta-veggies', brand: "Earth's Best", name: 'Stage 3 Pasta & Veggies', emoji: '🍝', stage: 3, ageGroup: '12mo', ingredients: 'Organic pasta, tomatoes, zucchini, carrots', allergens: ['wheat'], foodGroup: 'grains', nutritionNotes: 'Chunky texture for chewing skills. Contains wheat.' },

  // ── Plum Organics Stage 1 ──
  { id: 'po1-prune', brand: 'Plum Organics', name: 'Just Prunes', emoji: '🫐', stage: 1, ageGroup: '6mo', ingredients: 'Organic prunes', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Organic prunes for digestive health.' },
  { id: 'po1-peach', brand: 'Plum Organics', name: 'Just Peaches', emoji: '🍑', stage: 1, ageGroup: '6mo', ingredients: 'Organic peaches', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Sweet and gentle, rich in vitamin C.' },
  { id: 'po1-mango', brand: 'Plum Organics', name: 'Just Mangos', emoji: '🥭', stage: 1, ageGroup: '6mo', ingredients: 'Organic mangos', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Tropical flavor with vitamins A and C.' },
  { id: 'po1-sweetpotato', brand: 'Plum Organics', name: 'Just Sweet Potato', emoji: '🍠', stage: 1, ageGroup: '6mo', ingredients: 'Organic sweet potato', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Single-ingredient organic puree.' },

  // ── Plum Organics Stage 2 ──
  { id: 'po2-apple-spinach', brand: 'Plum Organics', name: 'Apple & Spinach', emoji: '🥬', stage: 2, ageGroup: '9mo', ingredients: 'Organic apples, spinach', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Hidden greens! Iron from spinach.' },
  { id: 'po2-banana-pumpkin', brand: 'Plum Organics', name: 'Banana & Pumpkin', emoji: '🎃', stage: 2, ageGroup: '9mo', ingredients: 'Organic bananas, pumpkin', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Vitamin A and potassium combo.' },
  { id: 'po2-pear-spinach-pea', brand: 'Plum Organics', name: 'Pear, Spinach & Pea', emoji: '🟢', stage: 2, ageGroup: '9mo', ingredients: 'Organic pears, spinach, peas', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Triple-green power with plant protein.' },
  { id: 'po2-cherry-berry-oat', brand: 'Plum Organics', name: 'Cherry Berry & Oat', emoji: '🍒', stage: 2, ageGroup: '9mo', ingredients: 'Organic cherries, blueberries, oats', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Whole grain oats with antioxidant berries.' },

  // ── Sprout Organic ──
  { id: 'sp1-sweetpotato', brand: 'Sprout Organic', name: 'Stage 1 Sweet Potato', emoji: '🍠', stage: 1, ageGroup: '6mo', ingredients: 'Organic sweet potato', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Non-GMO, USDA Organic.' },
  { id: 'sp2-carrot-chickpea', brand: 'Sprout Organic', name: 'Stage 2 Carrot Chickpeas Zucchini', emoji: '🥕', stage: 2, ageGroup: '9mo', ingredients: 'Organic carrots, chickpeas, zucchini', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Plant protein from chickpeas. Unique combo.' },
  { id: 'sp2-banana-butternut', brand: 'Sprout Organic', name: 'Stage 2 Banana Butternut', emoji: '🍌', stage: 2, ageGroup: '9mo', ingredients: 'Organic bananas, butternut squash', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Creamy blend with vitamins A and B6.' },
  { id: 'sp3-pasta-lentil', brand: 'Sprout Organic', name: 'Stage 3 Pasta Lentil Bolognese', emoji: '🍝', stage: 3, ageGroup: '12mo', ingredients: 'Organic pasta, lentils, tomatoes, olive oil', allergens: ['wheat'], foodGroup: 'grains', nutritionNotes: 'Plant-based protein from lentils. Contains wheat.' },

  // ── Ella's Kitchen ──
  { id: 'ek1-banana', brand: "Ella's Kitchen", name: 'First Taste Bananas', emoji: '🍌', stage: 1, ageGroup: '6mo', ingredients: 'Organic bananas', allergens: [], foodGroup: 'fruits', nutritionNotes: 'UK-origin brand, popular worldwide. 100% organic.' },
  { id: 'ek1-sweetpotato-pumpkin', brand: "Ella's Kitchen", name: 'First Taste Sweet Potato Pumpkin', emoji: '🎃', stage: 1, ageGroup: '6mo', ingredients: 'Organic sweet potato, pumpkin', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Organic duo with beta-carotene.' },
  { id: 'ek2-chicken-sweetcorn', brand: "Ella's Kitchen", name: 'Stage 2 Chicken & Sweetcorn', emoji: '🌽', stage: 2, ageGroup: '9mo', ingredients: 'Organic chicken, sweet corn, potato, onion', allergens: [], foodGroup: 'protein', nutritionNotes: 'Complete meal pouch with organic protein.' },
  { id: 'ek2-salmon-veg', brand: "Ella's Kitchen", name: 'Stage 2 Salmon & Veggies', emoji: '🐟', stage: 2, ageGroup: '9mo', ingredients: 'Organic sweet potato, salmon, peas, broccoli', allergens: ['fish'], foodGroup: 'protein', nutritionNotes: 'Omega-3 from salmon for brain development. Contains fish.' },
  { id: 'ek2-banana-baby-rice', brand: "Ella's Kitchen", name: 'Stage 2 Banana Baby Rice', emoji: '🍚', stage: 2, ageGroup: '9mo', ingredients: 'Organic banana, rice', allergens: [], foodGroup: 'grains', nutritionNotes: 'Gentle grain introduction with banana sweetness.' },

  // ── Parent's Choice ──
  { id: 'pc1-apple', brand: "Parent's Choice", name: 'Stage 1 Applesauce', emoji: '🍎', stage: 1, ageGroup: '6mo', ingredients: 'Apples', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Budget-friendly option. Simple ingredients.' },
  { id: 'pc1-banana', brand: "Parent's Choice", name: 'Stage 1 Bananas', emoji: '🍌', stage: 1, ageGroup: '6mo', ingredients: 'Bananas', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Affordable single-ingredient puree.' },
  { id: 'pc1-sweetpotato', brand: "Parent's Choice", name: 'Stage 1 Sweet Potato', emoji: '🍠', stage: 1, ageGroup: '6mo', ingredients: 'Sweet potatoes', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Budget option with same nutrition as premium brands.' },
  { id: 'pc2-apple-strawberry', brand: "Parent's Choice", name: 'Stage 2 Apple Strawberry', emoji: '🍓', stage: 2, ageGroup: '9mo', ingredients: 'Apples, strawberries', allergens: [], foodGroup: 'fruits', nutritionNotes: 'Vitamin C-rich fruit blend at a great price.' },
  { id: 'pc2-mixed-veggies', brand: "Parent's Choice", name: 'Stage 2 Mixed Vegetables', emoji: '🥗', stage: 2, ageGroup: '9mo', ingredients: 'Carrots, peas, corn, green beans', allergens: [], foodGroup: 'vegetables', nutritionNotes: 'Affordable multi-veggie blend.' },

  // ── Allergen Introduction Products ──
  { id: 'g-peanut-puffs', brand: 'Gerber', name: 'Lil\' Crunchies Peanut', emoji: '🥜', stage: 2, ageGroup: '9mo', ingredients: 'Corn, peanut flour', allergens: ['peanuts'], foodGroup: 'grains', nutritionNotes: 'Designed for early peanut introduction per AAP guidelines.', chokingHazard: false },
  { id: 'hb-oat-peanut-banana', brand: 'Happy Baby', name: 'Clearly Crafted Oat Peanut Butter Banana', emoji: '🥜', stage: 2, ageGroup: '9mo', ingredients: 'Organic oats, peanut butter, bananas', allergens: ['peanuts'], foodGroup: 'grains', nutritionNotes: 'Early allergen introduction in a convenient pouch.' },
  { id: 'g-probiotic-oatmeal', brand: 'Gerber', name: 'Probiotic Oatmeal Cereal', emoji: '🥣', stage: 1, ageGroup: '6mo', ingredients: 'Oat flour, probiotics (B. lactis)', allergens: [], foodGroup: 'grains', nutritionNotes: 'Iron-fortified with probiotics for gut health.' },
  { id: 'eb-oatmeal-cereal', brand: "Earth's Best", name: 'Organic Oatmeal Cereal', emoji: '🥣', stage: 1, ageGroup: '6mo', ingredients: 'Organic oat flour', allergens: [], foodGroup: 'grains', nutritionNotes: 'Organic whole grain oats, iron fortified.' },
];
