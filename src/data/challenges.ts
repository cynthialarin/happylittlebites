export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  type: 'new_foods' | 'food_group' | 'streak' | 'texture';
  target: number;
  foodGroup?: string;
  textureStage?: string;
}

export const CHALLENGE_POOL: WeeklyChallenge[] = [
  { id: 'new-veggies-2', title: 'Veggie Adventure', description: 'Try 2 new vegetables this week', emoji: '🥬', type: 'food_group', target: 2, foodGroup: 'vegetables' },
  { id: 'new-fruits-2', title: 'Fruit Discovery', description: 'Try 2 new fruits this week', emoji: '🍇', type: 'food_group', target: 2, foodGroup: 'fruits' },
  { id: 'new-foods-3', title: 'Taste Explorer', description: 'Try 3 new foods this week', emoji: '🔍', type: 'new_foods', target: 3 },
  { id: 'log-5-days', title: 'Consistent Logger', description: 'Log meals for 5 days this week', emoji: '📝', type: 'streak', target: 5 },
  { id: 'new-protein-2', title: 'Protein Power', description: 'Try 2 new proteins this week', emoji: '💪', type: 'food_group', target: 2, foodGroup: 'protein' },
  { id: 'new-foods-5', title: 'Fearless Foodie', description: 'Try 5 new foods this week', emoji: '🦸', type: 'new_foods', target: 5 },
  { id: 'log-7-days', title: 'Perfect Week', description: 'Log every day this week', emoji: '🏅', type: 'streak', target: 7 },
  { id: 'new-grains-2', title: 'Grain Train', description: 'Try 2 new grains this week', emoji: '🌾', type: 'food_group', target: 2, foodGroup: 'grains' },
];

export function getWeeklyChallenge(): WeeklyChallenge {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.floor((now.getTime() - startOfYear.getTime()) / (7 * 24 * 60 * 60 * 1000));
  return CHALLENGE_POOL[weekNum % CHALLENGE_POOL.length];
}
