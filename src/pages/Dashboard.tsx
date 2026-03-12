import { useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, PanInfo } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { foods } from '@/data/foods';
import FoodImage from '@/components/FoodImage';
import NutritionSummary from '@/components/NutritionSummary';
import NutritionScorecard from '@/components/NutritionScorecard';
import NutritionGoals from '@/components/NutritionGoals';
import ReintroductionTracker from '@/components/ReintroductionTracker';
import TextureProgression from '@/components/TextureProgression';
import ProductTour from '@/components/ProductTour';
import ChildAvatar from '@/components/ChildAvatar';
import { TOP_9_ALLERGENS, CA_EXTRA_ALLERGENS } from '@/types';
import { UtensilsCrossed, ShieldCheck, TrendingUp, Lightbulb, BookOpen, ChevronRight, ChevronDown, Flame, ListChecks, ShoppingCart, BarChart3, Baby, Moon, Droplets, Clock, Star, FileText, ShieldAlert, Users, MessageCircle, PieChart } from 'lucide-react';

export default function Dashboard() {
  const { activeChild, children, diary, allergenRecords, getChildAge, settings, setActiveChild } = useApp();
  const navigate = useNavigate();
  const gamification = useGamification();
  const [insightsOpen, setInsightsOpen] = useState(false);

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

  // Per-child stats for multi-child cards
  const childStats = useMemo(() => {
    if (children.length <= 1) return [];
    return children.map(child => {
      const childDiary = diary.filter(d => d.childId === child.id);
      const uniqueFoods = new Set(childDiary.map(d => d.foodId));
      let streak = 0;
      const today = new Date();
      for (let i = 0; i < 365; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        if (childDiary.some(e => e.date === dateStr)) streak++;
        else break;
      }
      const lastEntry = childDiary.sort((a, b) => b.date.localeCompare(a.date))[0];
      return {
        child,
        foodsTried: uniqueFoods.size,
        streak,
        lastMeal: lastEntry?.foodName || 'No meals yet',
      };
    });
  }, [children, diary]);

  const totalAllergens = settings.country === 'CA' ? TOP_9_ALLERGENS.length + CA_EXTRA_ALLERGENS.length : TOP_9_ALLERGENS.length;
  const allergenProgress = (stats.allergensIntro / totalAllergens) * 100;

  const isNewUser = useMemo(() => {
    if (!activeChild) return true;
    return diary.filter(d => d.childId === activeChild.id).length === 0;
  }, [activeChild, diary]);

  const suggestions = useMemo(() => {
    if (!age) return [];
    const childDiary = diary.filter(d => d.childId === activeChild?.id);
    const triedIds = new Set(childDiary.map(d => d.foodId));
    const triedNames = new Set(childDiary.map(d => d.foodName.toLowerCase()));
    const parseAgeMonths = (ageStr: string): number => {
      const match = ageStr.match(/^(\d+)mo$/);
      return match ? parseInt(match[1], 10) : 0;
    };
    return foods
      .filter(f => {
        if (triedIds.has(f.id) || triedNames.has(f.name.toLowerCase())) return false;
        const safeFrom = parseAgeMonths(f.safeFromAge);
        if (safeFrom > age.months) return false;
        return true;
      })
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }, [age, diary, activeChild]);

  // Swipe to switch children
  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    if (children.length <= 1 || !activeChild) return;
    const threshold = 80;
    const currentIdx = children.findIndex(c => c.id === activeChild.id);
    if (info.offset.x < -threshold && currentIdx < children.length - 1) {
      setActiveChild(children[currentIdx + 1].id);
    } else if (info.offset.x > threshold && currentIdx > 0) {
      setActiveChild(children[currentIdx - 1].id);
    }
  }, [children, activeChild, setActiveChild]);

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

  const { level, levelProgress, nextLevel, xp, weeklyChallenge, challengeProgress } = gamification;

  const XpBar = () => (
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
  );

  // Multi-child summary section
  const ChildrenCards = () => {
    if (childStats.length <= 1) return null;
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold">Your Children</h2>
          <span className="text-[10px] text-muted-foreground ml-auto">Swipe to switch ←→</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {childStats.map(({ child, foodsTried, streak, lastMeal }) => {
            const isActive = child.id === activeChild.id;
            const childAge = getChildAge(child);
            return (
              <button
                key={child.id}
                onClick={() => setActiveChild(child.id)}
                className={`flex-shrink-0 w-40 rounded-xl border p-3 text-left transition-all ${
                  isActive
                    ? 'bg-primary/10 border-primary/30 ring-2 ring-primary/20'
                    : 'bg-card border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <ChildAvatar photoUrl={child.photoUrl} emoji={child.avatar} name={child.name} size="sm" />
                  <div>
                    <p className="text-xs font-bold truncate">{child.name}</p>
                    <p className="text-[9px] text-muted-foreground">{childAge.label}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Foods</span>
                    <span className="font-bold">{foodsTried}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Streak</span>
                    <span className="font-bold">{streak}🔥</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground truncate mt-1">Last: {lastMeal}</p>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    );
  };

  if (isNewUser) {
    return (
      <motion.div
        className="px-4 pt-6 pb-4 max-w-lg mx-auto"
        drag={children.length > 1 ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
      >
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <h1 className="text-xl font-black">Welcome! 🎉</h1>
          <p className="text-sm text-muted-foreground">Let's get {activeChild.name} started on their food journey</p>
        </motion.div>

        <XpBar />
        <ChildrenCards />

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="mb-5 border-primary/20 bg-primary/5">
            <CardContent className="p-5">
              <h2 className="text-sm font-black mb-4">Getting Started — 3 Easy Steps</h2>
              <div className="space-y-4">
                {[
                  { step: 1, emoji: '📝', title: 'Log your first meal', desc: 'Record what your baby ate today', action: () => navigate('/tracker'), btn: 'Log a Meal' },
                  { step: 2, emoji: '📚', title: 'Explore the Food Library', desc: 'Discover age-appropriate foods & prep tips', action: () => navigate('/foods'), btn: 'Browse Foods' },
                  { step: 3, emoji: '🛡️', title: 'Start introducing allergens', desc: 'Follow a safe, guided allergen plan', action: () => navigate('/tracker/allergens'), btn: 'View Allergens' },
                ].map(item => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-black text-primary shrink-0">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">{item.emoji} {item.title}</p>
                      <p className="text-xs text-muted-foreground mb-1.5">{item.desc}</p>
                      <Button size="sm" variant={item.step === 1 ? 'default' : 'outline'} className="rounded-full text-xs h-7 px-3" onClick={item.action}>
                        {item.btn}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="mb-5">
          <button onClick={() => navigate('/suggestions')} className="w-full">
            <Card className="bg-gradient-to-br from-primary/15 via-accent/10 to-primary/5 border-primary/25 hover:ring-2 ring-primary/40 transition-all shadow-lg shadow-primary/10">
              <CardContent className="p-5 text-center">
                <div className="text-4xl mb-2">✨</div>
                <p className="text-base font-black">What should {activeChild.name} eat right now?</p>
                <p className="text-xs text-muted-foreground mt-1 mb-3">AI-powered • Personalized for {age?.label}</p>
                <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-2 text-sm font-bold">
                  Get Meal Ideas <ChevronRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'Food Library', icon: UtensilsCrossed, path: '/foods', color: 'bg-sage/20' },
              { label: 'Recipes', icon: BookOpen, path: '/recipes', color: 'bg-peach/20' },
              { label: 'Food Diary', icon: TrendingUp, path: '/tracker', color: 'bg-sky/20' },
              { label: 'Feeding', icon: Baby, path: '/feeding', color: 'bg-peach/10' },
              { label: 'Sleep', icon: Moon, path: '/sleep', color: 'bg-lavender/20' },
              { label: 'Diapers', icon: Droplets, path: '/diapers', color: 'bg-sky/10' },
              { label: 'Timeline', icon: Clock, path: '/timeline', color: 'bg-sage/10' },
              { label: 'First 100', icon: ListChecks, path: '/first-100-foods', color: 'bg-lavender/20' },
              { label: 'Growth', icon: TrendingUp, path: '/growth', color: 'bg-primary/10' },
              { label: 'Milestones', icon: Star, path: '/more/milestones', color: 'bg-peach/20' },
              { label: 'Insights', icon: PieChart, path: '/insights', color: 'bg-sage/30' },
              { label: 'Community', icon: MessageCircle, path: '/community', color: 'bg-lavender/30' },
              { label: 'Report', icon: FileText, path: '/weekly-report', color: 'bg-primary/5' },
              { label: 'Emergency', icon: ShieldAlert, path: '/more/safety', color: 'bg-destructive/10' },
              { label: 'Share', icon: Users, path: '/caregiver-share', color: 'bg-accent/10' },
            ].map(action => (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                className={`${action.color} p-4 rounded-xl text-left hover:ring-2 ring-primary/30 transition-all`}
              >
                <action.icon className="h-5 w-5 mb-2 text-foreground" />
                <span className="text-xs font-bold">{action.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Returning user dashboard
  return (
    <motion.div
      className="px-4 pt-6 pb-4 max-w-lg mx-auto"
      drag={children.length > 1 ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.3}
      onDragEnd={handleDragEnd}
    >
      <ProductTour />
      <XpBar />

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

      {/* Multi-child cards */}
      <ChildrenCards />

      {/* Nutrition Goals */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-5">
        <NutritionGoals />
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

      {/* Try Today */}
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

      {/* Emergency SOS + Caregiver Share */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <button onClick={() => navigate('/more/safety')} className="w-full h-full">
            <Card className="bg-destructive/10 border-destructive/20 hover:ring-2 ring-destructive/30 transition-all h-full">
              <CardContent className="p-3.5 flex items-start gap-2.5">
                <ShieldAlert className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-xs font-bold">Emergency SOS</p>
                  <p className="text-[10px] text-muted-foreground">Choking & allergy first aid</p>
                </div>
              </CardContent>
            </Card>
          </button>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <button onClick={() => navigate('/caregiver-share')} className="w-full h-full">
            <Card className="bg-accent/10 border-accent/20 hover:ring-2 ring-accent/30 transition-all h-full">
              <CardContent className="p-3.5 flex items-start gap-2.5">
                <Users className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="text-xs font-bold">Share Report</p>
                  <p className="text-[10px] text-muted-foreground">Send to a caregiver</p>
                </div>
              </CardContent>
            </Card>
          </button>
        </motion.div>
      </div>

      {/* Detailed Insights — Collapsible */}
      <Collapsible open={insightsOpen} onOpenChange={setInsightsOpen} className="mb-5">
        <CollapsibleTrigger className="w-full">
          <Card className="hover:ring-2 ring-primary/30 transition-all">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold">Detailed Insights</span>
              </div>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${insightsOpen ? 'rotate-180' : ''}`} />
            </CardContent>
          </Card>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4 mt-4">
          <NutritionScorecard childId={activeChild.id} days={7} compact />
          <NutritionSummary childId={activeChild.id} days={7} />
          <TextureProgression />
          <ReintroductionTracker />
        </CollapsibleContent>
      </Collapsible>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Food Library', icon: UtensilsCrossed, path: '/foods', color: 'bg-sage/20' },
          { label: 'Recipes', icon: BookOpen, path: '/recipes', color: 'bg-peach/20' },
          { label: 'Food Diary', icon: TrendingUp, path: '/tracker', color: 'bg-sky/20' },
          { label: 'Feeding', icon: Baby, path: '/feeding', color: 'bg-peach/10' },
          { label: 'Sleep', icon: Moon, path: '/sleep', color: 'bg-lavender/20' },
          { label: 'Diapers', icon: Droplets, path: '/diapers', color: 'bg-sky/10' },
          { label: 'Timeline', icon: Clock, path: '/timeline', color: 'bg-sage/10' },
          { label: 'First 100', icon: ListChecks, path: '/first-100-foods', color: 'bg-lavender/20' },
          { label: 'Growth', icon: TrendingUp, path: '/growth', color: 'bg-primary/10' },
          { label: 'Milestones', icon: Star, path: '/more/milestones', color: 'bg-peach/20' },
          { label: 'Insights', icon: PieChart, path: '/insights', color: 'bg-sage/30' },
          { label: 'Community', icon: MessageCircle, path: '/community', color: 'bg-lavender/30' },
          { label: 'Report', icon: FileText, path: '/weekly-report', color: 'bg-primary/5' },
          { label: 'Emergency', icon: ShieldAlert, path: '/more/safety', color: 'bg-destructive/10' },
          { label: 'Share', icon: Users, path: '/caregiver-share', color: 'bg-accent/10' },
        ].map(action => (
          <button
            key={action.path}
            onClick={() => navigate(action.path)}
            className={`${action.color} p-4 rounded-xl text-left hover:ring-2 ring-primary/30 transition-all`}
          >
            <action.icon className="h-5 w-5 mb-2 text-foreground" />
            <span className="text-xs font-bold">{action.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
