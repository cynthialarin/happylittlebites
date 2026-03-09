import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useGamification } from '@/hooks/useGamification';
import { FOOD_GROUP_COLORS } from '@/data/badges';
import { NUTRITION_GROUPS } from '@/data/nutritionGoals';
import { FoodGroup } from '@/types';

function CircularRing({ current, target, emoji, label, delay }: {
  current: number; target: number; emoji: string; label: string; delay: number;
}) {
  if (target === 0) return null;
  const pct = Math.min(current / target, 1);
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - pct);

  const ringColor = pct >= 1
    ? 'hsl(var(--primary))'
    : pct >= 0.5
      ? 'hsl(35, 90%, 55%)'
      : 'hsl(var(--muted-foreground) / 0.3)';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="flex flex-col items-center gap-0.5"
    >
      <div className="relative w-12 h-12">
        <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90">
          <circle cx="24" cy="24" r={radius} fill="none" stroke="hsl(var(--muted) / 0.5)" strokeWidth="4" />
          <motion.circle
            cx="24" cy="24" r={radius} fill="none"
            stroke={ringColor} strokeWidth="4" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ delay: delay + 0.2, duration: 0.6 }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm">
          {emoji}
        </span>
      </div>
      <span className="text-[9px] font-bold text-muted-foreground">{label}</span>
      <span className="text-[10px] font-black">
        {current}/{target}
      </span>
    </motion.div>
  );
}

export default function NutritionGoals() {
  const {
    dailyGoals, balancedDaysThisWeek, weeklyBalanceScore,
    weeklyBalancedDays, todayGroups
  } = useGamification();

  if (!dailyGoals) return null;

  const todayBalancedCount = NUTRITION_GROUPS.filter(g =>
    dailyGoals.targets[g] > 0 && dailyGoals.counts[g] >= dailyGoals.targets[g]
  ).length;
  const isBalanced = todayBalancedCount >= 4;

  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🎯</span>
            <span className="text-sm font-bold">Daily Nutrition Goals</span>
          </div>
          <span className={`text-xs font-bold ${isBalanced ? 'text-primary' : 'text-muted-foreground'}`}>
            {todayBalancedCount}/6 targets met
          </span>
        </div>

        {/* Circular progress rings */}
        <div className="grid grid-cols-6 gap-1 mb-4">
          {NUTRITION_GROUPS.map((group, i) => {
            const info = FOOD_GROUP_COLORS[group];
            return (
              <CircularRing
                key={group}
                current={dailyGoals.counts[group] || 0}
                target={dailyGoals.targets[group] || 0}
                emoji={info.emoji}
                label={info.label}
                delay={i * 0.06}
              />
            );
          })}
        </div>

        {/* Balanced Day badge */}
        {isBalanced && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-3 py-1.5 rounded-lg bg-primary/10"
          >
            <span className="text-xs font-bold text-primary">⭐ Balanced Day! +100 XP</span>
          </motion.div>
        )}

        {/* Weekly balance row */}
        <div className="mb-3">
          <p className="text-xs font-semibold text-muted-foreground mb-1.5">This Week</p>
          <div className="flex items-center gap-2 justify-between">
            {dayLabels.map((label, i) => {
              const balanced = weeklyBalancedDays?.[i] ?? false;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                    balanced ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {balanced ? '✓' : label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly balance score */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-muted-foreground">Weekly Balance</span>
            <span className="text-xs font-black">{Math.round(weeklyBalanceScore)}%</span>
          </div>
          <Progress value={weeklyBalanceScore} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
