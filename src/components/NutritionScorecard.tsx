import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/contexts/AppContext';
import { foods } from '@/data/foods';
import { FoodGroup } from '@/types';
import { Link } from 'react-router-dom';

interface NutrientScore {
  group: FoodGroup;
  label: string;
  emoji: string;
  count: number;
  target: number;
  pct: number;
  status: 'good' | 'moderate' | 'low';
}

const DAILY_TARGETS: Record<FoodGroup, number> = {
  fruits: 2,
  vegetables: 3,
  grains: 3,
  protein: 2,
  dairy: 2,
  legumes: 1,
  'nuts-seeds': 0,
  other: 0,
};

const GROUP_INFO: { group: FoodGroup; label: string; emoji: string }[] = [
  { group: 'fruits', label: 'Fruits', emoji: '🍎' },
  { group: 'vegetables', label: 'Veggies', emoji: '🥦' },
  { group: 'grains', label: 'Grains', emoji: '🌾' },
  { group: 'protein', label: 'Protein', emoji: '🥩' },
  { group: 'dairy', label: 'Dairy', emoji: '🧀' },
  { group: 'legumes', label: 'Legumes', emoji: '🫘' },
];

const STATUS_COLORS: Record<string, string> = {
  good: 'text-secondary-foreground',
  moderate: 'text-accent',
  low: 'text-destructive',
};

interface Props {
  childId: string;
  days?: number;
  compact?: boolean;
}

export default function NutritionScorecard({ childId, days = 7, compact = false }: Props) {
  const { diary } = useApp();

  const scores: NutrientScore[] = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString().split('T')[0];

    const recentDiary = diary.filter(d => d.childId === childId && d.date >= cutoffStr);
    const foodMap = new Map(foods.map(f => [f.id, f]));

    const groupCounts: Record<string, number> = {};
    GROUP_INFO.forEach(g => { groupCounts[g.group] = 0; });

    recentDiary.forEach(entry => {
      const food = foodMap.get(entry.foodId);
      if (food && groupCounts[food.foodGroup] !== undefined) {
        groupCounts[food.foodGroup]++;
      }
    });

    const daysCount = Math.max(1, days);

    return GROUP_INFO.map(g => {
      const count = groupCounts[g.group] || 0;
      const dailyAvg = count / daysCount;
      const target = DAILY_TARGETS[g.group];
      const pct = target > 0 ? Math.round((dailyAvg / target) * 100) : 100;
      const status: 'good' | 'moderate' | 'low' = pct >= 70 ? 'good' : pct >= 40 ? 'moderate' : 'low';
      return { ...g, count, target, pct, status };
    });
  }, [diary, childId, days]);

  const gapGroups = scores.filter(s => s.status === 'low');

  const suggestedFoods = useMemo(() => {
    if (gapGroups.length === 0) return [];
    const triedFoodIds = new Set(diary.filter(d => d.childId === childId).map(d => d.foodId));
    return gapGroups.map(gap => {
      const suggestions = foods
        .filter(f => f.foodGroup === gap.group && !triedFoodIds.has(f.id))
        .slice(0, 3);
      return { group: gap.label, emoji: gap.emoji, foods: suggestions };
    }).filter(g => g.foods.length > 0);
  }, [gapGroups, diary, childId]);

  if (compact) {
    const allGood = scores.every(s => s.status === 'good');
    const worstScore = scores.reduce((min, s) => (s.pct < min.pct ? s : min), scores[0]);

    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">🧪</span>
            <h3 className="font-bold text-sm">Nutrition</h3>
          </div>
          <div className="flex gap-2">
            {scores.map(s => (
              <div key={s.group} className="flex-1 text-center">
                <div className="text-base mb-0.5">{s.emoji}</div>
                <div className={`text-xs font-extrabold ${STATUS_COLORS[s.status]}`}>
                  {s.pct}%
                </div>
                <div className="text-[8px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
          {!allGood && (
            <p className="text-[10px] text-muted-foreground mt-2">
              ⚠️ {worstScore?.label} is at {worstScore?.pct}% of daily target
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">🧪</span>
          <span className="text-sm font-bold">Weekly Nutrition Scorecard</span>
          <span className="text-[10px] text-muted-foreground ml-auto">Last {days} days</span>
        </div>

        <div className="space-y-3 mb-4">
          {scores.map(s => (
            <div key={s.group}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{s.emoji}</span>
                  <span className="text-xs font-bold">{s.label}</span>
                </div>
                <span className={`text-xs font-extrabold ${STATUS_COLORS[s.status]}`}>
                  {Math.round(s.count / Math.max(1, days) * 10) / 10}/day (target: {s.target})
                </span>
              </div>
              <Progress value={Math.min(s.pct, 100)} className="h-2" />
            </div>
          ))}
        </div>

        {suggestedFoods.length > 0 && (
          <div>
            <p className="text-xs font-bold mb-2">💡 Boost these groups:</p>
            {suggestedFoods.map(gap => (
              <div key={gap.group} className="mb-2">
                <p className="text-[10px] font-semibold text-muted-foreground mb-1">
                  For more {gap.emoji} {gap.group}:
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  {gap.foods.map(f => (
                    <Link
                      key={f.id}
                      to={`/foods/${f.id}`}
                      className="text-[10px] bg-muted rounded-full px-2.5 py-1 font-semibold hover:bg-muted/80 transition-colors"
                    >
                      {f.emoji} {f.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
