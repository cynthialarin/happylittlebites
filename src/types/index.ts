export type FeedingApproach = 'blw' | 'purees' | 'combo';
export type TextureStage = 'purees' | 'mashed' | 'soft-chunks' | 'finger-foods' | 'regular';
export type AcceptanceLevel = 'loved' | 'okay' | 'refused';
export type AgeGroup = '6mo' | '9mo' | '12mo' | '2yr' | '3yr+';
export type FoodGroup = 'fruits' | 'vegetables' | 'grains' | 'protein' | 'dairy' | 'legumes' | 'nuts-seeds' | 'other';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type RecipeCategory = 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'smoothies' | 'batch-cooking';
export type ReactionSeverity = 'none' | 'mild' | 'moderate' | 'severe';

export const TOP_9_ALLERGENS = [
  'milk', 'eggs', 'peanuts', 'tree-nuts', 'wheat', 'soy', 'fish', 'shellfish', 'sesame'
] as const;
export type Allergen = typeof TOP_9_ALLERGENS[number];

export interface ChildProfile {
  id: string;
  name: string;
  birthdate: string;
  knownAllergies: string[];
  feedingApproach: FeedingApproach;
  avatar: string;
}

export interface FoodEntry {
  id: string;
  name: string;
  emoji: string;
  foodGroup: FoodGroup;
  allergens: Allergen[];
  chokingHazard: boolean;
  chokingNotes: string;
  servingByAge: Record<AgeGroup, string>;
  nutritionHighlights: string[];
  commonReactions: string[];
  prepTips: string;
  safeFromAge: AgeGroup;
}

export interface DiaryEntry {
  id: string;
  childId: string;
  date: string;
  foodId: string;
  foodName: string;
  mealType: MealType;
  textureStage: TextureStage;
  acceptance: AcceptanceLevel;
  reaction: string;
  reactionSeverity: ReactionSeverity;
  notes: string;
}

export interface AllergenRecord {
  id: string;
  childId: string;
  allergen: Allergen;
  dateIntroduced: string;
  food: string;
  reactionSeverity: ReactionSeverity;
  symptoms: string[];
  onsetTime: string;
  notes: string;
}

export interface Recipe {
  id: string;
  title: string;
  emoji: string;
  description: string;
  category: RecipeCategory;
  ageGroup: AgeGroup;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  allergens: Allergen[];
  freezerFriendly: boolean;
  familyFriendly: boolean;
  nutritionNotes: string;
  ageTips: Record<string, string>;
}

export interface MealPlanEntry {
  id: string;
  childId: string;
  date: string;
  mealType: MealType;
  recipeId?: string;
  customMeal?: string;
}

export interface ExposureRecord {
  id: string;
  childId: string;
  foodName: string;
  exposures: { date: string; accepted: boolean }[];
}

export interface AppSettings {
  onboardingComplete: boolean;
  activeChildId: string | null;
  theme: 'light' | 'dark' | 'system';
}
