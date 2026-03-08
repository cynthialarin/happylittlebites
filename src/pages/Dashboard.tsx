import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { foods } from '@/data/foods';
import { TOP_9_ALLERGENS } from '@/types';
import { UtensilsCrossed, ShieldCheck, TrendingUp, Lightbulb, BookOpen, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const { activeChild, diary, allergenRecords, getChildAge } = useApp();
  const navigate = useNavigate();

  const age = activeChild ? getChildAge(activeChild) : null;

  const stats = useMemo(() => {
    if (!activeChild) return { foodsTried: 0, allergensIntro: 0, streak: 0 };
    const childDiary = diary.filter(d => d.childId === activeChild.id);
    const uniqueFoods = new Set(childDiary.map(d => d.foodId));
    const childAllergens = allergenRecords.filter(a => a.childId === activeChild.id);
    const uniqueAllergens = new Set(childAllergens.map(a => a.allergen));

    // Calculate streak
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      if (childDiary.some(e => e.date === dateStr)) streak++;
      else break;
    }
    return { foodsTried: uniqueFoods.size, allergensIntro: uniqueAllergens.size, streak };
  }, [activeChild, diary, allergenRecords]);

  const allergenProgress = (stats.allergensIntro / TOP_9_ALLERGENS.length) * 100;

  // Get age-appropriate suggestions
  const suggestions = useMemo(() => {
    if (!age) return [];
    const triedIds = new Set(diary.filter(d => d.childId === activeChild?.id).map(d => d.foodId));
    return foods
      .filter(f => !triedIds.has(f.id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }, [age, diary, activeChild]);

  const feedingStage = useMemo(() => {
    if (!age) return '';
    if (age.months < 6) return 'Getting ready for solids!';
    if (age.months < 9) return 'Starting solids — purees & first tastes';
    if (age.months < 12) return 'Exploring textures & finger foods';
    if (age.months < 18) return 'Self-feeding & expanding variety';
    if (age.months < 24) return 'Toddler meals & independence';
    if (age.months < 36) return 'Family meals & adventurous eating';
    return 'Independent eater & food explorer';
  }, [age]);

  if (!activeChild) {
    return (
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center">
          <div className="text-5xl mb-4">🍽️</div>
          <h1 className="text-2xl font-black mb-2">Happy Little Bites</h1>
          <p className="text-muted-foreground">Add a child profile to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="text-4xl">{activeChild.avatar}</div>
          <div>
            <h1 className="text-xl font-black">{activeChild.name}'s Dashboard</h1>
            <p className="text-sm text-muted-foreground">{age?.label} • {feedingStage}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {[
          { label: 'Foods Tried', value: stats.foodsTried, icon: '🥕', color: 'bg-sage/30' },
          { label: 'Allergens', value: `${stats.allergensIntro}/9`, icon: '🛡️', color: 'bg-sky/30' },
          { label: 'Day Streak', value: stats.streak, icon: '🔥', color: 'bg-peach/30' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`${stat.color} border-none`}>
              <CardContent className="p-3 text-center">
                <div className="text-lg">{stat.icon}</div>
                <div className="text-xl font-black">{stat.value}</div>
                <div className="text-[10px] font-semibold text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Allergen Progress */}
      <Card className="mb-5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold">Allergen Introduction</span>
            </div>
            <span className="text-xs text-muted-foreground">{stats.allergensIntro} of 9</span>
          </div>
          <Progress value={allergenProgress} className="h-2.5" />
          <button
            onClick={() => navigate('/tracker/allergens')}
            className="text-xs text-primary font-semibold mt-2 flex items-center gap-1 hover:underline"
          >
            View tracker <ChevronRight className="h-3 w-3" />
          </button>
        </CardContent>
      </Card>

      {/* Today's Suggestions */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold">Try Today</h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {suggestions.map(food => (
            <button
              key={food.id}
              onClick={() => navigate(`/foods/${food.id}`)}
              className="flex-shrink-0 p-3 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors min-w-[100px] text-center"
            >
              <div className="text-2xl mb-1">{food.emoji}</div>
              <div className="text-xs font-semibold">{food.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Food Library', icon: UtensilsCrossed, path: '/foods', color: 'bg-sage/20' },
          { label: 'Recipes', icon: BookOpen, path: '/recipes', color: 'bg-peach/20' },
          { label: 'Food Diary', icon: TrendingUp, path: '/tracker', color: 'bg-sky/20' },
          { label: 'Picky Eater Tips', icon: Lightbulb, path: '/more/picky-eater', color: 'bg-lavender/20' },
        ].map(action => (
          <button
            key={action.path}
            onClick={() => navigate(action.path)}
            className={`${action.color} p-4 rounded-xl text-left hover:ring-2 ring-primary/30 transition-all`}
          >
            <action.icon className="h-5 w-5 mb-2 text-foreground" />
            <span className="text-sm font-bold">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
