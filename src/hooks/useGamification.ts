import { useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { foods } from '@/data/foods';
import { BADGES, LEVELS } from '@/data/badges';
import { getWeeklyChallenge } from '@/data/challenges';
import { FoodGroup, TOP_9_ALLERGENS } from '@/types';
import { getTargetsForChild, isBalancedDay, isPerfectDay, NUTRITION_GROUPS } from '@/data/nutritionGoals';

const FOOD_GROUPS_CORE: FoodGroup[] = ['fruits', 'vegetables', 'grains', 'protein', 'dairy', 'legumes'];

export function useGamification() {
  const { activeChild, diary, allergenRecords } = useApp();

  return useMemo(() => {
    const emptyGoals = {
      dailyGoals: null as null | { counts: Record<string, number>; targets: Record<string, number> },
      balancedDaysThisWeek: 0,
      weeklyBalanceScore: 0,
      balancedDaysThisMonth: 0,
      weeklyBalancedDays: [false, false, false, false, false, false, false] as boolean[],
      groupTargetStreaks: {} as Record<string, number>,
    };

    if (!activeChild) {
      return {
        xp: 0, level: LEVELS[0], levelProgress: 0, nextLevel: LEVELS[1],
        unlockedBadges: [], todayGroups: new Set<FoodGroup>(),
        streak: 0, weeklyChallenge: getWeeklyChallenge(), challengeProgress: 0,
        foodGroupStreaks: {} as Record<string, number>,
        ...emptyGoals,
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
    const dayGroupCounts: Record<string, Record<string, number>> = {};

    childDiary.forEach(entry => {
      xp += 10;
      if (!seenFoods.has(entry.foodId)) {
        xp += 25;
        seenFoods.add(entry.foodId);
      }
      if (!dayFoodGroups[entry.date]) dayFoodGroups[entry.date] = new Set();
      if (!dayGroupCounts[entry.date]) dayGroupCounts[entry.date] = {};
      const food = foods.find(f => f.id === entry.foodId);
      if (food) {
        dayFoodGroups[entry.date].add(food.foodGroup);
        dayGroupCounts[entry.date][food.foodGroup] = (dayGroupCounts[entry.date][food.foodGroup] || 0) + 1;
      }
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

    // === Nutrition Goals ===
    const targets = getTargetsForChild(activeChild.birthdate);
    const todayCounts: Record<string, number> = dayGroupCounts[today] || {};
    const dailyGoals = { counts: todayCounts, targets };

    // Weekly balanced days (Mon-Sun of current week)
    const weekStart = new Date(now);
    const dayOfWeek = weekStart.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    weekStart.setDate(weekStart.getDate() + mondayOffset);
    weekStart.setHours(0, 0, 0, 0);

    const weeklyBalancedDays: boolean[] = [];
    let balancedDaysThisWeek = 0;
    let weeklyTargetSlots = 0;
    let weeklyMetSlots = 0;

    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const counts = dayGroupCounts[dateStr] || {};
      const balanced = isBalancedDay(counts, targets);
      weeklyBalancedDays.push(balanced);
      if (balanced) balancedDaysThisWeek++;

      // Weekly balance score: count target slots met
      NUTRITION_GROUPS.forEach(g => {
        if (targets[g] > 0) {
          weeklyTargetSlots++;
          if ((counts[g] || 0) >= targets[g]) weeklyMetSlots++;
        }
      });
    }
    const weeklyBalanceScore = weeklyTargetSlots > 0 ? (weeklyMetSlots / weeklyTargetSlots) * 100 : 0;

    // Monthly balanced days
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    let balancedDaysThisMonth = 0;
    for (let d = new Date(monthStart); d <= now; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const counts = dayGroupCounts[dateStr] || {};
      if (isBalancedDay(counts, targets)) balancedDaysThisMonth++;
    }

    // Group target streaks (consecutive days each group target was met)
    const groupTargetStreaks: Record<string, number> = {};
    NUTRITION_GROUPS.forEach(group => {
      if (targets[group] === 0) { groupTargetStreaks[group] = 0; return; }
      let s = 0;
      for (let i = 0; i < 365; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        if ((dayGroupCounts[dateStr]?.[group] || 0) >= targets[group]) s++;
        else break;
      }
      groupTargetStreaks[group] = s;
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

    // === Nutrition Goal Badges ===
    // Check if any day ever was balanced
    const anyBalancedDay = Object.entries(dayGroupCounts).some(([, counts]) => isBalancedDay(counts, targets));
    if (anyBalancedDay) unlockedBadges.push('balanced-day-1');

    if (balancedDaysThisWeek >= 5) unlockedBadges.push('balanced-week');
    if (balancedDaysThisMonth >= 20) unlockedBadges.push('balanced-month');
    if (groupTargetStreaks['vegetables'] >= 7) unlockedBadges.push('veggie-streak-7');
    if (groupTargetStreaks['protein'] >= 7) unlockedBadges.push('protein-streak-7');

    const anyPerfectDay = Object.entries(dayGroupCounts).some(([, counts]) => isPerfectDay(counts, targets));
    if (anyPerfectDay) unlockedBadges.push('perfect-day');

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
      dailyGoals, balancedDaysThisWeek, weeklyBalanceScore,
      balancedDaysThisMonth, weeklyBalancedDays, groupTargetStreaks,
    };
  }, [activeChild, diary, allergenRecords]);
}
