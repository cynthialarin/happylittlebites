import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { recipes } from '@/data/recipes';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, ChevronRight, RefreshCw, Lightbulb, Star, Bookmark, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MealSuggestion {
  mealType: string;
  title: string;
  description: string;
  recipeId: string;
  emoji: string;
  newFood: boolean;
}

interface SuggestionsResponse {
  suggestions: MealSuggestion[];
  dailyTip: string;
}

const MEAL_COLORS: Record<string, string> = {
  breakfast: 'bg-peach/20 border-peach/30',
  lunch: 'bg-sage/20 border-sage/30',
  dinner: 'bg-lavender/20 border-lavender/30',
  snack: 'bg-sky/20 border-sky/30',
};

const MEAL_LABELS: Record<string, string> = {
  breakfast: '🌅 Breakfast',
  lunch: '☀️ Lunch',
  dinner: '🌙 Dinner',
  snack: '🍎 Snack',
};

export default function MealSuggestions() {
  const { activeChild, diary, getChildAge, settings } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SuggestionsResponse | null>(null);
  const [savedMeals, setSavedMeals] = useState<Set<string>>(new Set());
  const [savingMeal, setSavingMeal] = useState<string | null>(null);

  const fetchSuggestions = async () => {
    if (!activeChild) return;

    setLoading(true);
    setResult(null);
    setSavedMeals(new Set());

    try {
      const age = getChildAge(activeChild);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const dateStr = sevenDaysAgo.toISOString().split('T')[0];

      const childDiary = diary.filter(d => d.childId === activeChild.id);
      const recentFoods = [...new Set(
        childDiary.filter(d => d.date >= dateStr).map(d => d.foodName)
      )];
      const triedFoods = [...new Set(childDiary.map(d => d.foodName))];

      const { data, error } = await supabase.functions.invoke('suggest-meals', {
        body: {
          childAge: age.months,
          childName: activeChild.name,
          feedingApproach: activeChild.feedingApproach,
          knownAllergies: activeChild.knownAllergies,
          recentFoods,
          triedFoods,
          availableRecipes: recipes.map(r => r.id),
          country: settings.country,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setResult(data as SuggestionsResponse);
    } catch (e: any) {
      console.error('Suggestion error:', e);
      toast({
        title: 'Oops!',
        description: e.message || 'Could not generate suggestions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async (meal: MealSuggestion) => {
    if (!user || savedMeals.has(meal.title)) return;
    setSavingMeal(meal.title);

    try {
      const { error } = await supabase.from('saved_recipes').insert({
        user_id: user.id,
        title: meal.title,
        description: meal.description,
        meal_type: meal.mealType,
        emoji: meal.emoji,
        source: 'ai',
      });

      if (error) throw error;

      setSavedMeals(prev => new Set([...prev, meal.title]));
      toast({ title: '📌 Recipe saved!', description: `"${meal.title}" added to your saved recipes.` });
    } catch (e: any) {
      console.error('Save error:', e);
      toast({ title: 'Could not save', description: e.message, variant: 'destructive' });
    } finally {
      setSavingMeal(null);
    }
  };

  if (!activeChild) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-6">
        <div className="text-center">
          <div className="text-5xl mb-4">👶</div>
          <p className="text-muted-foreground">Add a child profile first</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-black">AI Meal Ideas</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Personalized suggestions for {activeChild.name} based on their age, diary, and preferences
        </p>
      </motion.div>

      {!result && !loading && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-3">✨</div>
              <h2 className="text-lg font-bold mb-2">What should {activeChild.name} eat today?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Our AI considers {activeChild.name}'s age, food history, allergens, and nutrition goals
              </p>
              <Button onClick={fetchSuggestions} size="lg" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Get Today's Meal Plan
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="text-center py-2">
            <p className="text-xs text-muted-foreground animate-pulse">
              🧠 Analyzing {activeChild.name}'s food journey...
            </p>
          </div>
        </div>
      )}

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {result.suggestions.map((meal, i) => {
              const matchingRecipe = meal.recipeId ? recipes.find(r => r.id === meal.recipeId) : null;
              const isSaved = savedMeals.has(meal.title);
              const isSaving = savingMeal === meal.title;

              return (
                <motion.div
                  key={meal.mealType}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={`${MEAL_COLORS[meal.mealType] || 'bg-muted/20'} border`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{meal.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                            {MEAL_LABELS[meal.mealType] || meal.mealType}
                          </p>
                          <p className="text-sm font-bold mt-0.5">{meal.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{meal.description}</p>

                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            {meal.newFood && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                                <Star className="h-2.5 w-2.5" /> New food!
                              </span>
                            )}
                            {matchingRecipe && (
                              <button
                                onClick={() => navigate(`/recipes/${matchingRecipe.id}`)}
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-accent-foreground bg-accent/20 rounded-full px-2 py-0.5 hover:bg-accent/30 transition-colors"
                              >
                                View Recipe <ChevronRight className="h-2.5 w-2.5" />
                              </button>
                            )}
                            <button
                              onClick={() => handleSaveRecipe(meal)}
                              disabled={isSaved || isSaving}
                              className={`inline-flex items-center gap-1 text-[10px] font-bold rounded-full px-2 py-0.5 transition-colors ${
                                isSaved
                                  ? 'text-primary bg-primary/10'
                                  : 'text-muted-foreground bg-muted hover:bg-muted/80'
                              }`}
                            >
                              {isSaved ? (
                                <><Check className="h-2.5 w-2.5" /> Saved</>
                              ) : isSaving ? (
                                'Saving...'
                              ) : (
                                <><Bookmark className="h-2.5 w-2.5" /> Save</>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            {result.dailyTip && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="bg-primary/5 border-primary/15">
                  <CardContent className="p-4 flex items-start gap-3">
                    <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-primary mb-0.5">Today's Tip</p>
                      <p className="text-xs text-muted-foreground">{result.dailyTip}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-2"
            >
              <Button
                variant="outline"
                onClick={fetchSuggestions}
                className="w-full gap-2"
                disabled={loading}
              >
                <RefreshCw className="h-4 w-4" />
                Get New Suggestions
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
