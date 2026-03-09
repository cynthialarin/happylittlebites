import { differenceInMonths } from 'date-fns';
import { FoodGroup } from '@/types';

export type AgeTier = '6-8mo' | '9-11mo' | '12-23mo' | '24mo+';

export const DAILY_TARGETS: Record<AgeTier, Record<string, number>> = {
  '6-8mo':  { fruits: 2, vegetables: 2, grains: 1, protein: 1, dairy: 1, legumes: 0 },
  '9-11mo': { fruits: 2, vegetables: 2, grains: 2, protein: 2, dairy: 1, legumes: 1 },
  '12-23mo': { fruits: 2, vegetables: 3, grains: 3, protein: 2, dairy: 2, legumes: 1 },
  '24mo+':  { fruits: 2, vegetables: 3, grains: 3, protein: 2, dairy: 2, legumes: 1 },
};

const NUTRITION_GROUPS: FoodGroup[] = ['fruits', 'vegetables', 'grains', 'protein', 'dairy', 'legumes'];

export function getAgeTier(birthdate: string): AgeTier {
  const months = differenceInMonths(new Date(), new Date(birthdate));
  if (months < 9) return '6-8mo';
  if (months < 12) return '9-11mo';
  if (months < 24) return '12-23mo';
  return '24mo+';
}

export function getTargetsForChild(birthdate: string): Record<string, number> {
  return DAILY_TARGETS[getAgeTier(birthdate)];
}

export function isBalancedDay(counts: Record<string, number>, targets: Record<string, number>): boolean {
  let groupsHit = 0;
  NUTRITION_GROUPS.forEach(g => {
    if (targets[g] > 0 && counts[g] >= targets[g]) groupsHit++;
  });
  return groupsHit >= 4;
}

export function isPerfectDay(counts: Record<string, number>, targets: Record<string, number>): boolean {
  return NUTRITION_GROUPS.every(g => targets[g] === 0 || counts[g] >= targets[g]);
}

export { NUTRITION_GROUPS };
