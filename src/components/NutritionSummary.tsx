import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/contexts/AppContext';
import { foods } from '@/data/foods';
import { FOOD_GROUP_COLORS } from '@/data/badges';
import { FoodGroup } from '@/types';
import { Apple, Beef, Wheat, Milk, Leaf, Nut } from 'lucide-react';

const CORE_GROUPS: { group: FoodGroup; label: string; emoji: string }[] = [
  { group: 'fruits', label: 'Fruits', emoji: '🍎' },
  { group: 'vegetables', label: 'Veggies', emoji: '🥦' },
  { group: 'grains', label: 'Grains', emoji: '🌾' },
  { group: 'protein', label: 'Protein', emoji: '🥩' },
  { group: 'dairy', label: 'Dairy', emoji: '🧀' },
  { group: 'legumes', label: 'Legumes', emoji: '🫘' },
];

// Map nutrition keywords to macro categories
const MACRO_MAP: Record<string, string> = {
  'Healthy fats': 'Fats',
  'Omega-3': 'Fats',
  'Omega-3 fatty acids': 'Fats',
  'Protein': 'Protein',
  'Plant protein': 'Protein',
  'Complete protein': 'Protein',
  'Fiber': 'Fiber',
  'Natural energy': 'Carbs',
  'Complex carbs': 'Carbs',
  'Iron': 'Iron',
  'Heme iron': 'Iron',
  'Non-heme iron': 'Iron',
  'Calcium': 'Calcium',
  'Vitamin C': 'Vitamin C',
  'Vitamin A': 'Vitamin A',
  'Vitamin K': 'Vitamin K',
  'Vitamin B6': 'B Vitamins',
  'Vitamin B12': 'B Vitamins',
  'B Vitamins': 'B Vitamins',
  'Folate': 'B Vitamins',
  'Zinc': 'Zinc',
  'Potassium': 'Potassium',
};

const MACRO_COLORS: Record<string, string> = {
  Protein: 'bg-destructive/20 text-destructive',
  Fats: 'bg-primary/20 text-primary-foreground',
  Fiber: 'bg-sage/30 text-sage-foreground',
  Iron: 'bg-accent/20 text-accent-foreground',
  Calcium: 'bg-sky/30 text-sky-foreground',
  'Vitamin C': 'bg-peach/30 text-peach-foreground',
  'Vitamin A': 'bg-primary/15 text-primary-foreground',
  Carbs: 'bg-lavender/30 text-lavender-foreground',
  Zinc: 'bg-muted text-muted-foreground',
  'B Vitamins': 'bg-sage/20 text-sage-foreground',
  Potassium: 'bg-sky/20 text-sky-foreground',
  'Vitamin K': 'bg-sage/40 text-sage-foreground',
};

interface NutritionSummaryProps {
  childId: string;
  days?: number;
}

export default function NutritionSummary({ childId, days = 7 }: NutritionSummaryProps) {
  const { diary } = useApp();

  const analysis = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffStr = cutoff.toISOString().split('T')[0];

    const recentDiary = diary.filter(
      d => d.childId === childId && d.date >= cutoffStr
    );

    // Food group coverage
    const foodMap = new Map(foods.map(f => [f.id, f]));
    const groupCounts: Record<string, number> = {};
    const nutrientCounts: Record<string, number> = {};
    const uniqueFoodsPerGroup: Record<string, Set<string>> = {};

    CORE_GROUPS.forEach(g => {
      groupCounts[g.group] = 0;
      uniqueFoodsPerGroup[g.group] = new Set();
    });

    recentDiary.forEach(entry => {
      const food = foodMap.get(entry.foodId);
      if (!food) return;

      // Count food group servings
      if (groupCounts[food.foodGroup] !== undefined) {
        groupCounts[food.foodGroup]++;
        uniqueFoodsPerGroup[food.foodGroup].add(food.id);
      }

      // Count nutrition highlights
      food.nutritionHighlights.forEach(nh => {
        const macro = MACRO_MAP[nh] || nh;
        nutrientCounts[macro] = (nutrientCounts[macro] || 0) + 1;
      });
    });

    // Sort nutrients by frequency
    const topNutrients = Object.entries(nutrientCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    const totalEntries = recentDiary.length;
    const groupsHit = Object.values(groupCounts).filter(c => c > 0).length;

    return { groupCounts, uniqueFoodsPerGroup, topNutrients, totalEntries, groupsHit };
  }, [diary, childId, days]);

  if (analysis.totalEntries === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <span className="text-2xl">📊</span>
          <p className="text-sm font-bold mt-1">Nutrition Summary</p>
          <p className="text-xs text-muted-foreground mt-1">
            Log meals in the Food Diary to see nutrition insights here
          </p>
        </CardContent>
      </Card>
    );
  }

  const maxGroupCount = Math.max(...Object.values(analysis.groupCounts), 1);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">📊</span>
            <span className="text-sm font-bold">Nutrition Summary</span>
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground">
            Last {days} days • {analysis.totalEntries} entries
          </span>
        </div>

        {/* Food Group Bars */}
        <div className="space-y-2 mb-4">
          <p className="text-xs font-semibold text-muted-foreground">Food Group Coverage</p>
          {CORE_GROUPS.map((g, i) => {
            const count = analysis.groupCounts[g.group];
            const variety = analysis.uniqueFoodsPerGroup[g.group].size;
            const pct = (count / maxGroupCount) * 100;
            return (
              <motion.div
                key={g.group}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2"
              >
                <span className="text-sm w-5 text-center">{g.emoji}</span>
                <span className="text-[10px] font-semibold w-14 truncate">{g.label}</span>
                <div className="flex-1 h-3 bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(pct, count > 0 ? 8 : 0)}%` }}
                    transition={{ delay: i * 0.05 + 0.2, duration: 0.4 }}
                    className="h-full rounded-full bg-primary/60"
                  />
                </div>
                <span className="text-[10px] font-bold w-12 text-right text-muted-foreground">
                  {count > 0 ? `${count}× (${variety})` : '—'}
                </span>
              </motion.div>
            );
          })}
          <p className="text-[9px] text-muted-foreground text-right">
            {analysis.groupsHit}/6 groups covered
          </p>
        </div>

        {/* Top Nutrients */}
        {analysis.topNutrients.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">Top Nutrients</p>
            <div className="flex flex-wrap gap-1.5">
              {analysis.topNutrients.map(([name, count], i) => (
                <motion.span
                  key={name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 + 0.3 }}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    MACRO_COLORS[name] || 'bg-muted text-muted-foreground'
                  }`}
                >
                  {name} ×{count}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
