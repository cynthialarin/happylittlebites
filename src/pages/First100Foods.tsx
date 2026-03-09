import { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { FIRST_100_FOODS, FIRST_100_MILESTONES, FOOD_CATEGORIES } from '@/data/first100foods';
import { foods } from '@/data/foods';
import { ChevronLeft, Trophy, Filter, ChevronRight, Sparkles, Info } from 'lucide-react';
import Confetti from '@/components/Confetti';

export default function First100Foods() {
  const navigate = useNavigate();
  const { activeChild, diary, settings } = useApp();
  const isCanada = settings.country === 'CA';
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const [celebratingMilestone, setCelebratingMilestone] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevCountRef = useRef<number | null>(null);

  const triedFoodNames = useMemo(() => {
    if (!activeChild) return new Set<string>();
    const childDiary = diary.filter(d => d.childId === activeChild.id);
    const names = new Set<string>();
    childDiary.forEach(entry => {
      names.add(entry.foodName.toLowerCase());
      const food = foods.find(f => f.id === entry.foodId);
      if (food) names.add(food.name.toLowerCase());
    });
    return names;
  }, [activeChild, diary]);

  const checkedFoods = useMemo(() => {
    return new Set(
      FIRST_100_FOODS
        .filter(f => triedFoodNames.has(f.name.toLowerCase()))
        .map(f => f.id)
    );
  }, [triedFoodNames]);

  const completedCount = checkedFoods.size;
  const progressPercent = (completedCount / 100) * 100;

  const currentMilestone = useMemo(() => {
    return [...FIRST_100_MILESTONES].reverse().find(m => completedCount >= m.count) || null;
  }, [completedCount]);

  const nextMilestone = useMemo(() => {
    return FIRST_100_MILESTONES.find(m => completedCount < m.count) || null;
  }, [completedCount]);

  // Auto-trigger confetti when a new milestone is reached
  useEffect(() => {
    if (prevCountRef.current !== null && prevCountRef.current < completedCount) {
      const justCrossed = FIRST_100_MILESTONES.find(
        m => prevCountRef.current! < m.count && completedCount >= m.count
      );
      if (justCrossed) {
        setCelebratingMilestone(justCrossed.title);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
    prevCountRef.current = completedCount;
  }, [completedCount]);

  const filteredFoods = useMemo(() => {
    let result = FIRST_100_FOODS;
    if (selectedCategory) result = result.filter(f => f.category === selectedCategory);
    if (!showCompleted) result = result.filter(f => !checkedFoods.has(f.id));
    return result;
  }, [selectedCategory, showCompleted, checkedFoods]);

  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; done: number }> = {};
    FOOD_CATEGORIES.forEach(cat => {
      const catFoods = FIRST_100_FOODS.filter(f => f.category === cat);
      stats[cat] = {
        total: catFoods.length,
        done: catFoods.filter(f => checkedFoods.has(f.id)).length,
      };
    });
    return stats;
  }, [checkedFoods]);

  if (!activeChild) {
    return (
      <div className="flex items-center justify-center min-h-screen px-6">
        <p className="text-muted-foreground">Add a child profile to start the journey</p>
      </div>
    );
  }

  const handleMilestoneClick = (milestone: typeof FIRST_100_MILESTONES[0], unlocked: boolean) => {
    if (!unlocked) return;
    setCelebratingMilestone(milestone.title);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <Confetti active={showConfetti} />
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-black">First 100 Foods</h1>
          <p className="text-xs text-muted-foreground">{activeChild.name}'s food journey</p>
        </div>
        <div className="text-3xl">{currentMilestone?.emoji || '🥄'}</div>
      </div>

      {/* Country Guidelines Banner */}
      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl mb-4 text-xs font-semibold ${
        isCanada ? 'bg-destructive/5 text-destructive' : 'bg-sky/20 text-foreground'
      }`}>
        <span>{isCanada ? '🇨🇦' : '🇺🇸'}</span>
        <span>Showing {isCanada ? 'Health Canada (CPS)' : 'AAP / CDC'} guidelines</span>
      </div>

      {/* Progress Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="mb-5 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold">Progress</span>
              <span className="text-2xl font-black text-primary">{completedCount}/100</span>
            </div>
            <Progress value={progressPercent} className="h-3 mb-3" />
            {nextMilestone && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3" />
                <span>Next milestone: <strong>{nextMilestone.title}</strong> at {nextMilestone.count} foods</span>
              </div>
            )}
            {completedCount >= 100 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center mt-2"
              >
                <span className="text-2xl">🎉</span>
                <p className="text-sm font-bold text-primary">Century Club Complete!</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Milestones Timeline */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="mb-5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold">Milestones</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {FIRST_100_MILESTONES.map(milestone => {
                const unlocked = completedCount >= milestone.count;
                return (
                  <button
                    key={milestone.count}
                    onClick={() => handleMilestoneClick(milestone, unlocked)}
                    className={`flex-shrink-0 rounded-xl p-2.5 min-w-[80px] text-center transition-all ${
                      unlocked
                        ? 'bg-primary/15 border border-primary/30'
                        : 'bg-muted/50 border border-transparent opacity-50'
                    }`}
                  >
                    <div className={`text-xl ${unlocked ? '' : 'grayscale'}`}>{milestone.emoji}</div>
                    <div className="text-[10px] font-bold mt-1">{milestone.count}</div>
                    <div className="text-[9px] text-muted-foreground">{milestone.title}</div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Milestone Celebration Modal */}
      <AnimatePresence>
        {celebratingMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-6"
            onClick={() => setCelebratingMilestone(null)}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="bg-card rounded-2xl p-6 text-center shadow-lg max-w-sm"
            >
              {(() => {
                const m = FIRST_100_MILESTONES.find(mi => mi.title === celebratingMilestone);
                if (!m) return null;
                return (
                  <>
                    <div className="text-5xl mb-3">{m.emoji}</div>
                    <h2 className="text-xl font-black mb-1">{m.title}</h2>
                    <p className="text-sm text-muted-foreground mb-3">{m.description}</p>
                    <Badge className="bg-primary/20 text-primary border-primary/30">+{m.xpBonus} XP</Badge>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-3">
        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              !selectedCategory ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            All ({completedCount}/100)
          </button>
          {FOOD_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat} ({categoryStats[cat]?.done}/{categoryStats[cat]?.total})
            </button>
          ))}
        </div>
      </div>

      {/* Show/Hide Completed */}
      <div className="flex items-center gap-2 mb-4">
        <Checkbox
          checked={showCompleted}
          onCheckedChange={(checked) => setShowCompleted(!!checked)}
          id="show-completed"
        />
        <label htmlFor="show-completed" className="text-xs text-muted-foreground cursor-pointer">
          Show completed foods
        </label>
      </div>

      {/* Food List */}
      <div className="space-y-2">
        {filteredFoods.map((food, i) => {
          const isChecked = checkedFoods.has(food.id);
          return (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.5) }}
            >
              <div
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  isChecked
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-card border border-border hover:border-primary/30'
                }`}
              >
                <span className="text-xl">{food.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${isChecked ? 'line-through text-muted-foreground' : ''}`}>
                      {food.name}
                    </span>
                    {isChecked && <span className="text-xs text-primary">✓</span>}
                  </div>
                  <p className="text-[10px] text-muted-foreground truncate">{isCanada && food.tipCA ? food.tipCA : food.tip}</p>
                  <div className="flex gap-1 mt-0.5">
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4">{food.ageRecommended}</Badge>
                  </div>
                </div>
                {food.foodId && (
                  <button
                    onClick={() => navigate(`/foods/${food.foodId}`)}
                    className="p-1.5 rounded-lg hover:bg-muted"
                  >
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredFoods.length === 0 && (
        <div className="text-center py-10">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-sm font-bold">All done in this category!</p>
          <p className="text-xs text-muted-foreground">Great job introducing these foods</p>
        </div>
      )}

      {/* Info Note */}
      <Card className="mt-5 bg-muted/50 border-none">
        <CardContent className="p-3 flex items-start gap-2">
          <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-muted-foreground">
            Foods are automatically checked off when logged in your food diary. Keep logging meals to track your journey!
          </p>
        </CardContent>
      </Card>

      <p className="text-[10px] text-muted-foreground text-center mt-4 px-4">
        For informational purposes only. Not a substitute for professional medical advice. Always consult your pediatrician.
      </p>
    </div>
  );
}
