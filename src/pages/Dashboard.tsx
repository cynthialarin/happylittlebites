import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { foods } from '@/data/foods';
import FoodImage from '@/components/FoodImage';
import NutritionSummary from '@/components/NutritionSummary';
import NutritionScorecard from '@/components/NutritionScorecard';
import ReintroductionTracker from '@/components/ReintroductionTracker';
import TextureProgression from '@/components/TextureProgression';
import { FOOD_GROUP_COLORS } from '@/data/badges';
import { TOP_9_ALLERGENS, CA_EXTRA_ALLERGENS, FoodGroup } from '@/types';
import { UtensilsCrossed, ShieldCheck, TrendingUp, Lightbulb, BookOpen, ChevronRight, Trophy, Flame, Sparkles, ListChecks, ShoppingCart } from 'lucide-react';

const CORE_GROUPS: FoodGroup[] = ['fruits', 'vegetables', 'grains', 'protein', 'dairy', 'legumes'];

export default function Dashboard() {
  const { activeChild, diary, allergenRecords, getChildAge, settings } = useApp();
  const navigate = useNavigate();
  const gamification = useGamification();

  const age = activeChild ? getChildAge(activeChild) : null;

  const stats = useMemo(() => {
    if (!activeChild) return { foodsTried: 0, allergensIntro: 0, streak: 0 };
    const childDiary = diary.filter(d => d.childId === activeChild.id);
    const uniqueFoods = new Set(childDiary.map(d => d.foodId));
    const childAllergens = allergenRecords.filter(a => a.childId === activeChild.id);
    const uniqueAllergens = new Set(childAllergens.map(a => a.allergen));

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

  const totalAllergens = settings.country === 'CA' ? TOP_9_ALLERGENS.length + CA_EXTRA_ALLERGENS.length : TOP_9_ALLERGENS.length;
  const allergenProgress = (stats.allergensIntro / totalAllergens) * 100;

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

  const todayGroupCount = gamification.todayGroups.size;
  const { level, levelProgress, nextLevel, xp, weeklyChallenge, challengeProgress, unlockedBadges } = gamification;

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="text-4xl">{activeChild.avatar}</div>
          <div className="flex-1">
            <h1 className="text-xl font-black">{activeChild.name}'s Dashboard</h1>
            <p className="text-sm text-muted-foreground">{age?.label} • {feedingStage}</p>
          </div>
        </div>
      </motion.div>

      {/* XP & Level Bar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <button onClick={() => navigate('/achievements')} className="w-full mb-4">
          <Card className="bg-primary/10 border-primary/20 hover:ring-2 ring-primary/30 transition-all">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xl">{level.emoji}</span>
                <span className="text-sm font-black">{level.title}</span>
                <span className="text-xs text-muted-foreground ml-auto font-bold">{xp} XP</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              {nextLevel && <Progress value={levelProgress} className="h-1.5" />}
            </CardContent>
          </Card>
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {[
          { label: 'Foods Tried', value: stats.foodsTried, icon: '🥕', color: 'bg-sage/30' },
          { label: 'Allergens', value: `${stats.allergensIntro}/${totalAllergens}`, icon: '🛡️', color: 'bg-sky/30' },
          { label: 'Day Streak', value: stats.streak, icon: '🔥', color: 'bg-peach/30' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.1 }}
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

      {/* Daily Nutrition Rainbow */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="mb-5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-base">🌈</span>
                <span className="text-sm font-bold">Today's Rainbow</span>
              </div>
              <span className={`text-xs font-bold ${todayGroupCount >= 6 ? 'text-primary' : 'text-muted-foreground'}`}>
                {todayGroupCount} of 6 groups
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {CORE_GROUPS.map(group => {
                const info = FOOD_GROUP_COLORS[group];
                const hit = gamification.todayGroups.has(group);
                return (
                  <div key={group} className="text-center">
                    <div
                      className={`w-full aspect-square rounded-xl flex items-center justify-center text-lg transition-all ${
                        hit ? info.bg + ' scale-100' : 'bg-muted/50 scale-90 grayscale opacity-50'
                      }`}
                    >
                      {info.emoji}
                    </div>
                    <p className="text-[8px] font-semibold mt-1 text-muted-foreground">{info.label}</p>
                  </div>
                );
              })}
            </div>
            {todayGroupCount >= 6 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-center font-bold text-primary mt-2"
              >
                🎉 Rainbow Plate Complete! +50 XP
              </motion.p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Weekly Challenge */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <Card className="mb-5 bg-lavender/10 border-lavender/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-4 w-4 text-accent" />
              <span className="text-sm font-bold">Weekly Challenge</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{weeklyChallenge.emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-bold">{weeklyChallenge.title}</p>
                <p className="text-xs text-muted-foreground">{weeklyChallenge.description}</p>
                <Progress value={challengeProgress} className="h-1.5 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Allergen Progress */}
      <Card className="mb-5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold">Allergen Introduction</span>
            </div>
            <span className="text-xs text-muted-foreground">{stats.allergensIntro} of {totalAllergens}</span>
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

      {/* Nutrition Scorecard */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }} className="mb-5">
        <NutritionScorecard childId={activeChild.id} days={7} compact />
      </motion.div>

      {/* Nutrition Summary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mb-5">
        <NutritionSummary childId={activeChild.id} days={7} />
      </motion.div>

      {/* Texture Progression */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.47 }} className="mb-5">
        <TextureProgression />
      </motion.div>

      {/* Reintroduction Tracker */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.49 }} className="mb-5">
        <ReintroductionTracker />
      </motion.div>

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
              className="flex-shrink-0 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors min-w-[100px] text-center overflow-hidden"
            >
              <FoodImage
                type="food"
                id={food.id}
                name={food.name}
                fallbackEmoji={food.emoji}
                className="w-full h-16 rounded-t-xl"
                cacheOnly
              />
              <div className="p-2">
                <div className="text-xs font-semibold">{food.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Suggestion CTA */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-5">
        <button onClick={() => navigate('/suggestions')} className="w-full">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 hover:ring-2 ring-primary/30 transition-all">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center text-lg">✨</div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold">What should {activeChild.name} eat today?</p>
                <p className="text-xs text-muted-foreground">AI-powered meal ideas personalized for {age?.label}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </button>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Food Library', icon: UtensilsCrossed, path: '/foods', color: 'bg-sage/20' },
          { label: 'Recipes', icon: BookOpen, path: '/recipes', color: 'bg-peach/20' },
          { label: 'Food Diary', icon: TrendingUp, path: '/tracker', color: 'bg-sky/20' },
          { label: 'First 100 Foods', icon: ListChecks, path: '/first-100-foods', color: 'bg-lavender/20' },
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
