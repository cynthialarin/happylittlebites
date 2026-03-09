import { Allergen, AllergenCA } from '@/types';

export interface AllergenInfo {
  id: Allergen;
  name: string;
  emoji: string;
  description: string;
  commonFoods: string[];
  introductionTips: string[];
  signsOfReaction: string[];
  recommendedFirstFood: string;
  waitTime: string;
}

export const allergenInfo: AllergenInfo[] = [
  {
    id: 'milk', name: 'Milk (Dairy)', emoji: '🥛',
    description: 'One of the most common childhood allergies. Many children outgrow it by age 5.',
    commonFoods: ['Yogurt', 'Cheese', 'Butter', 'Ice cream', 'Baked goods'],
    introductionTips: ['Start with plain full-fat yogurt — easier to digest than straight milk', 'Baked milk (in muffins) is often tolerated even when fresh milk is not', 'Breast milk does not count as an introduction'],
    signsOfReaction: ['Hives or rash', 'Vomiting', 'Diarrhea', 'Eczema flare-up', 'Fussiness after eating'],
    recommendedFirstFood: 'Plain full-fat yogurt',
    waitTime: '3-5 days before introducing next new allergen'
  },
  {
    id: 'eggs', name: 'Eggs', emoji: '🥚',
    description: 'Second most common childhood food allergy. Early introduction (4-6 months) may reduce risk.',
    commonFoods: ['Scrambled eggs', 'Baked goods', 'Pasta', 'Mayonnaise', 'Some vaccines'],
    introductionTips: ['Start with well-cooked egg (scrambled)', 'Some babies tolerate baked egg but not scrambled', 'Offer both yolk and white — allergy is usually to the white'],
    signsOfReaction: ['Hives around mouth or body', 'Facial swelling', 'Vomiting', 'Runny nose', 'Stomach pain'],
    recommendedFirstFood: 'Scrambled egg (well-cooked)',
    waitTime: '3-5 days before introducing next new allergen'
  },
  {
    id: 'peanuts', name: 'Peanuts', emoji: '🥜',
    description: 'LEAP study showed early introduction (4-11 months) reduces peanut allergy risk by 80%.',
    commonFoods: ['Peanut butter', 'Peanut oil', 'Some Asian dishes', 'Candy bars', 'Baked goods'],
    introductionTips: ['Never give whole peanuts — always as butter or powder', 'Mix peanut butter powder into puree for first introduction', 'Start with a tiny amount (1/4 tsp) and wait 10 minutes', 'If high-risk (severe eczema/egg allergy), discuss with pediatrician first'],
    signsOfReaction: ['Hives', 'Swelling of face/lips/tongue', 'Vomiting', 'Coughing/wheezing', 'In severe cases: difficulty breathing (call 911)'],
    recommendedFirstFood: 'Smooth peanut butter thinned with warm water',
    waitTime: '3-5 days before introducing next new allergen'
  },
  {
    id: 'tree-nuts', name: 'Tree Nuts', emoji: '🌰',
    description: 'Includes almonds, cashews, walnuts, pecans, pistachios, and more. Allergy is often lifelong.',
    commonFoods: ['Almond butter', 'Cashew milk', 'Walnut pieces in baked goods', 'Pesto', 'Marzipan'],
    introductionTips: ['Introduce as smooth nut butter or finely ground powder', 'Introduce one type of tree nut at a time', 'Tree nut allergy is separate from peanut allergy (but can co-occur)'],
    signsOfReaction: ['Hives', 'Swelling', 'Vomiting', 'Tingling in mouth', 'Breathing difficulty'],
    recommendedFirstFood: 'Smooth almond butter mixed into oatmeal',
    waitTime: '3-5 days between different tree nut types'
  },
  {
    id: 'wheat', name: 'Wheat', emoji: '🌾',
    description: 'Different from celiac disease (gluten intolerance). Most children outgrow wheat allergy.',
    commonFoods: ['Bread', 'Pasta', 'Crackers', 'Cereals', 'Many sauces and soups'],
    introductionTips: ['Start with small amount of toast strip or baby cereal', 'Wheat allergy is different from celiac disease', 'Most children outgrow it by age 3-5'],
    signsOfReaction: ['Hives', 'Nausea/vomiting', 'Nasal congestion', 'Stomach cramps', 'Eczema flare'],
    recommendedFirstFood: 'Lightly toasted bread strip',
    waitTime: '3-5 days before introducing next new allergen'
  },
  {
    id: 'soy', name: 'Soy', emoji: '🫘',
    description: 'Very common in processed foods. Most children outgrow soy allergy by age 10.',
    commonFoods: ['Tofu', 'Soy sauce', 'Edamame', 'Soy milk', 'Many processed foods'],
    introductionTips: ['Tofu is a great first soy food — easy texture for babies', 'Soy is in MANY processed foods — read labels carefully', 'Soy allergy is usually milder than other top allergens'],
    signsOfReaction: ['Hives', 'Tingling in mouth', 'Stomach pain', 'Diarrhea', 'Vomiting'],
    recommendedFirstFood: 'Soft strips of firm tofu',
    waitTime: '3-5 days before introducing next new allergen'
  },
  {
    id: 'fish', name: 'Fish (Finned)', emoji: '🐟',
    description: 'Important source of omega-3s for brain development. Allergy can develop at any age.',
    commonFoods: ['Salmon', 'Cod', 'Tuna', 'Fish sticks', 'Fish sauce'],
    introductionTips: ['Start with mild fish like salmon or cod', 'Cook thoroughly and remove ALL bones', 'Fish allergy is different from shellfish allergy', 'Wild-caught tends to have fewer contaminants'],
    signsOfReaction: ['Hives', 'Swelling', 'Vomiting', 'Diarrhea', 'Tingling lips or tongue'],
    recommendedFirstFood: 'Flaked baked salmon',
    waitTime: '3-5 days before introducing next new allergen'
  },
  {
    id: 'shellfish', name: 'Shellfish', emoji: '🦐',
    description: 'Includes shrimp, crab, lobster, and mollusks. Usually a lifelong allergy.',
    commonFoods: ['Shrimp', 'Crab', 'Lobster', 'Clams', 'Oysters'],
    introductionTips: ['Can introduce around 6-9 months if no family history', 'Cook thoroughly', 'Start with a tiny taste', 'Separate from finned fish allergy — can have one without the other'],
    signsOfReaction: ['Hives', 'Swelling', 'Vomiting', 'Dizziness', 'Anaphylaxis (rare but possible)'],
    recommendedFirstFood: 'Small piece of well-cooked shrimp, finely chopped',
    waitTime: '3-5 days before introducing next new allergen'
  },
  {
    id: 'sesame', name: 'Sesame', emoji: '🫙',
    description: 'Added to the top allergen list in 2023. Prevalence is rising, especially in young children.',
    commonFoods: ['Tahini', 'Hummus', 'Sesame oil', 'Sesame seeds on buns', 'Many Middle Eastern/Asian dishes'],
    introductionTips: ['Tahini is the easiest and safest way to introduce sesame', 'Mix a small amount into familiar food', 'Now required to be labeled on US food packaging (as of 2023)'],
    signsOfReaction: ['Hives', 'Facial swelling', 'Vomiting', 'Coughing', 'Abdominal pain'],
    recommendedFirstFood: 'Tahini mixed into oatmeal or yogurt',
    waitTime: '3-5 days before introducing next new allergen'
  }
];

export const introductionOrder: Allergen[] = [
  'peanuts', 'eggs', 'milk', 'sesame', 'tree-nuts', 'soy', 'wheat', 'fish', 'shellfish'
];
