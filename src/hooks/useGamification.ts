import { useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { foods } from '@/data/foods';
import { BADGES, LEVELS } from '@/data/badges';
import { getWeeklyChallenge } from '@/data/challenges';
import { FoodGroup, TOP_9_ALLERGENS } from '@/types';

const FOOD_GROUPS_CORE: FoodGroup[] = ['fruits', 'vegetables', 'grains', 'protein', 'dairy', 'legumes'];

export function useGamification() {
  const { activeChild, diary, allergenRecords } = useApp();

  return useMemo(() => {
    if (!activeChild) {
      return {
        xp: 0, level: LEVELS[0], levelProgress: 0, nextLevel: LEVELS[1],
        unlockedBadges: [], todayGroups: new Set<FoodGroup>(),
        streak: 0, weeklyChallenge: getWeeklyChallenge(), challengeProgress: 0,
        foodGroupStreaks: {} as Record<string, number>,
      };
    }

    const childDiary = diary.filter(d => d.childId === activeChild.id);
    const childAllergens = allergenRecords.filter(a => a.childId === activeChild.id);
    const uniqueFoodIds = new Set(childDiary.map(d => d.foodId));
    const uniqueAllergens = new Set(childAllergens.map(a => a.allergen));

    // === XP Calculation ===
    let xp = 0;
    const seenFoods = new Set<string>();
    const dayFoodGroups: Record<string, Set<FoodGroup>> = {};

    childDiary.forEach(entry => {
      xp += 10; // log food
      if (!seenFoods.has(entry.foodId)) {
        xp += 25; // new food
        seenFoods.add(entry.foodId);
      }
      if (!dayFoodGroups[entry.date]) dayFoodGroups[entry.date] = new Set();
      const food = foods.find(f => f.id === entry.foodId);
      if (food) dayFoodGroups[entry.date].add(food.foodGroup);
    });

    // Rainbow plate bonus
    Object.values(dayFoodGroups).forEach(groups => {
      if (FOOD_GROUPS_CORE.every(g => groups.has(g))) xp += 50;
    });

    // === Today's food groups ===
    const today = new Date().toISOString().split('T')[0];
    const todayGroups = dayFoodGroups[today] || new Set<FoodGroup>();

    // === Streak ===
    let streak = 0;
    const now = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      if (childDiary.some(e => e.date === dateStr)) streak++;
      else break;
    }

    // === Food group streaks ===
    const foodGroupStreaks: Record<string, number> = {};
    FOOD_GROUPS_CORE.forEach(group => {
      let s = 0;
      for (let i = 0; i < 365; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        if (dayFoodGroups[dateStr]?.has(group)) s++;
        else break;
      }
      foodGroupStreaks[group] = s;
    });

    // === Badges ===
    const unlockedBadges: string[] = [];

    if (childDiary.length >= 1) unlockedBadges.push('first-bite');

    const hasRainbow = Object.values(dayFoodGroups).some(groups =>
      FOOD_GROUPS_CORE.every(g => groups.has(g))
    );
    if (hasRainbow) unlockedBadges.push('rainbow-plate');

    if (uniqueFoodIds.size >= 25) unlockedBadges.push('adventurous-25');
    if (uniqueFoodIds.size >= 50) unlockedBadges.push('super-taster-50');
    if (uniqueFoodIds.size >= 100) unlockedBadges.push('food-explorer-100');
    if (uniqueAllergens.size >= TOP_9_ALLERGENS.length) unlockedBadges.push('allergen-champion');
    if (streak >= 7) unlockedBadges.push('streak-7');
    if (streak >= 30) unlockedBadges.push('streak-30');

    // Food group variety badges
    const foodsByGroup: Record<string, Set<string>> = {};
    childDiary.forEach(entry => {
      const food = foods.find(f => f.id === entry.foodId);
      if (food) {
        if (!foodsByGroup[food.foodGroup]) foodsByGroup[food.foodGroup] = new Set();
        foodsByGroup[food.foodGroup].add(entry.foodId);
      }
    });
    if ((foodsByGroup['vegetables']?.size || 0) >= 10) unlockedBadges.push('veggie-lover');
    if ((foodsByGroup['protein']?.size || 0) >= 10) unlockedBadges.push('protein-pro');
    if ((foodsByGroup['fruits']?.size || 0) >= 10) unlockedBadges.push('fruit-fan');

    // Texture master
    const textures = new Set(childDiary.map(d => d.textureStage));
    if (['purees', 'mashed', 'soft-chunks', 'finger-foods', 'regular'].every(t => textures.has(t as any))) {
      unlockedBadges.push('texture-master');
    }

    // Brave taster
    const refusedFoods = new Set(childDiary.filter(d => d.acceptance === 'refused').map(d => d.foodId));
    const retriedRefused = childDiary.some(d => refusedFoods.has(d.foodId) && d.acceptance !== 'refused');
    if (retriedRefused) unlockedBadges.push('brave-taster');

    // Badge XP
    xp += unlockedBadges.length * 100;

    // === Level ===
    const level = [...LEVELS].reverse().find(l => xp >= l.minXp) || LEVELS[0];
    const nextLevel = LEVELS[LEVELS.indexOf(level) + 1] || null;
    const levelProgress = nextLevel
      ? ((xp - level.minXp) / (nextLevel.minXp - level.minXp)) * 100
      : 100;

    // === Weekly Challenge ===
    const challenge = getWeeklyChallenge();
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    const weekStartStr = weekStart.toISOString().split('T')[0];
    const thisWeekDiary = childDiary.filter(d => d.date >= weekStartStr);

    let challengeProgress = 0;
    if (challenge.type === 'new_foods') {
      const priorFoods = new Set(childDiary.filter(d => d.date < weekStartStr).map(d => d.foodId));
      const newThisWeek = new Set(thisWeekDiary.filter(d => !priorFoods.has(d.foodId)).map(d => d.foodId));
      challengeProgress = Math.min(newThisWeek.size / challenge.target, 1) * 100;
    } else if (challenge.type === 'food_group') {
      const priorFoods = new Set(childDiary.filter(d => d.date < weekStartStr).map(d => d.foodId));
      const newInGroup = new Set(
        thisWeekDiary
          .filter(d => !priorFoods.has(d.foodId))
          .filter(d => {
            const f = foods.find(food => food.id === d.foodId);
            return f?.foodGroup === challenge.foodGroup;
          })
          .map(d => d.foodId)
      );
      challengeProgress = Math.min(newInGroup.size / challenge.target, 1) * 100;
    } else if (challenge.type === 'streak') {
      const daysLogged = new Set(thisWeekDiary.map(d => d.date)).size;
      challengeProgress = Math.min(daysLogged / challenge.target, 1) * 100;
    }

    return {
      xp, level, levelProgress, nextLevel,
      unlockedBadges, todayGroups, streak,
      weeklyChallenge: challenge, challengeProgress,
      foodGroupStreaks,
    };
  }, [activeChild, diary, allergenRecords]);
}
