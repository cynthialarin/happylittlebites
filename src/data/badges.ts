import { FoodGroup } from '@/types';

export interface BadgeDefinition {
  id: string;
  title: string;
  emoji: string;
  description: string;
  category: 'variety' | 'consistency' | 'nutrition' | 'allergens' | 'bravery';
}

export const BADGES: BadgeDefinition[] = [
  { id: 'first-bite', title: 'First Bite', emoji: '🥄', description: 'Log your first food', category: 'variety' },
  { id: 'rainbow-plate', title: 'Rainbow Plate', emoji: '🌈', description: 'Hit all 6 food groups in one day', category: 'nutrition' },
  { id: 'adventurous-25', title: 'Adventurous Eater', emoji: '🗺️', description: 'Try 25 unique foods', category: 'variety' },
  { id: 'super-taster-50', title: 'Super Taster', emoji: '👅', description: 'Try 50 unique foods', category: 'variety' },
  { id: 'food-explorer-100', title: 'Food Explorer', emoji: '🧭', description: 'Try 100 unique foods', category: 'variety' },
  { id: 'allergen-champion', title: 'Allergen Champion', emoji: '🛡️', description: 'Introduce all 9 top allergens', category: 'allergens' },
  { id: 'streak-7', title: 'Week Warrior', emoji: '🔥', description: '7-day logging streak', category: 'consistency' },
  { id: 'streak-30', title: 'Monthly Marvel', emoji: '⭐', description: '30-day logging streak', category: 'consistency' },
  { id: 'veggie-lover', title: 'Veggie Lover', emoji: '🥦', description: 'Try 10 different vegetables', category: 'nutrition' },
  { id: 'protein-pro', title: 'Protein Pro', emoji: '💪', description: 'Try 10 different proteins', category: 'nutrition' },
  { id: 'fruit-fan', title: 'Fruit Fan', emoji: '🍓', description: 'Try 10 different fruits', category: 'nutrition' },
  { id: 'texture-master', title: 'Texture Master', emoji: '🎨', description: 'Log all 5 texture stages', category: 'bravery' },
  { id: 'brave-taster', title: 'Brave Taster', emoji: '🦁', description: 'Re-try a previously refused food', category: 'bravery' },
];

export const FOOD_GROUP_COLORS: Record<FoodGroup, { bg: string; label: string; emoji: string }> = {
  fruits: { bg: 'bg-peach/40', label: 'Fruits', emoji: '🍎' },
  vegetables: { bg: 'bg-sage/40', label: 'Veggies', emoji: '🥦' },
  grains: { bg: 'bg-primary/20', label: 'Grains', emoji: '🌾' },
  protein: { bg: 'bg-destructive/15', label: 'Protein', emoji: '🍗' },
  dairy: { bg: 'bg-sky/40', label: 'Dairy', emoji: '🥛' },
  legumes: { bg: 'bg-lavender/30', label: 'Legumes', emoji: '🫘' },
  'nuts-seeds': { bg: 'bg-accent/20', label: 'Nuts/Seeds', emoji: '🥜' },
  other: { bg: 'bg-muted', label: 'Other', emoji: '🍽️' },
};

export interface LevelDefinition {
  level: number;
  title: string;
  emoji: string;
  minXp: number;
}

export const LEVELS: LevelDefinition[] = [
  { level: 1, title: 'Milk Monster', emoji: '🍼', minXp: 0 },
  { level: 2, title: 'First Taster', emoji: '🥄', minXp: 100 },
  { level: 3, title: 'Curious Nibbler', emoji: '🐭', minXp: 300 },
  { level: 4, title: 'Food Explorer', emoji: '🗺️', minXp: 600 },
  { level: 5, title: 'Adventurous Eater', emoji: '🌟', minXp: 1000 },
  { level: 6, title: 'Super Chef', emoji: '👨‍🍳', minXp: 1500 },
  { level: 7, title: 'Food Champion', emoji: '🏆', minXp: 2500 },
];
