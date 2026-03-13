import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { recipes } from '@/data/recipes';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ChevronRight, ChevronDown, RefreshCw, Lightbulb, Star, Bookmark, Check, ArrowLeft, Clock, AlertTriangle, Shield, Refrigerator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FridgeScanner, { DetectedIngredient } from '@/components/FridgeScanner';
import { usePantryItems } from '@/hooks/usePantryItems';

interface MealSuggestion {
  mealType: string;
  title: string;
  description: string;
  prepInstructions: string;
  chokingRisk: string;
  allergenInfo: string;
  nutritionHighlights: string[];
  prepTimeMinutes: number;
  servingSize: string;
  recipeId: string;
  emoji: string;
  newFood: boolean;
}

interface SuggestionsResponse {
  suggestions: MealSuggestion[];
  dailyTip: string;
}

const MEAL_COLORS: Record<string, string> = {
  'quick-snack': 'bg-peach/20 border-peach/30',
  'balanced-meal': 'bg-sage/20 border-sage/30',
  'iron-rich': 'bg-lavender/20 border-lavender/30',
};

const MEAL_LABELS: Record<string, string> = {
  'quick-snack': '⚡ Quick Snack',
  'balanced-meal': '🥗 Balanced Meal',
  'iron-rich': '💪 Iron-Rich',
};

const CHOKING_COLORS: Record<string, string> = {
  low: 'text-green-700 bg-green-100',
  medium: 'text-yellow-700 bg-yellow-100',
  high: 'text-red-700 bg-red-100',
};

const LOADING_STEPS = [
  { emoji: '🔍', text: 'Checking food diary...' },
  { emoji: '🧠', text: 'Analyzing nutrition gaps...' },
  { emoji: '👨‍🍳', text: 'Creating perfect meals...' },
  { emoji: '✨', text: 'Almost ready!' },
];

export default function MealSuggestions() {
  const { activeChild, diary, getChildAge, settings } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SuggestionsResponse | null>(null);
  const [savedMeals, setSavedMeals] = useState<Set<string>>(new Set());
  const [savingMeal, setSavingMeal] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [fridgeScannerOpen, setFridgeScannerOpen] = useState(false);
  const [fridgeIngredients, setFridgeIngredients] = useState<DetectedIngredient[]>([]);

  // Animate loading steps
  useEffect(() => {
    if (!loading) { setLoadingStep(0); return; }
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(interval);
  }, [loading]);

  const fetchSuggestions = async (ingredients?: DetectedIngredient[]) => {
    if (!activeChild) return;
    setLoading(true);
    setResult(null);
    setSavedMeals(new Set());
    setExpandedCard(null);

    try {
      const age = getChildAge(activeChild);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const dateStr = sevenDaysAgo.toISOString().split('T')[0];
      const childDiary = diary.filter(d => d.childId === activeChild.id);
      const recentFoods = [...new Set(childDiary.filter(d => d.date >= dateStr).map(d => d.foodName))];
      const triedFoods = [...new Set(childDiary.map(d => d.foodName))];
      const ingredientList = ingredients || fridgeIngredients;

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
          availableIngredients: ingredientList.length > 0 ? ingredientList.map(i => i.name) : undefined,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data as SuggestionsResponse);
    } catch (e: any) {
      console.error('Suggestion error:', e);
      toast({ title: 'Oops!', description: e.message || 'Could not generate suggestions.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleFridgeIngredients = (ingredients: DetectedIngredient[]) => {
    setFridgeIngredients(ingredients);
    fetchSuggestions(ingredients);
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
        instructions: meal.prepInstructions ? [meal.prepInstructions] : [],
        source: 'ai',
      });
      if (error) throw error;
      setSavedMeals(prev => new Set([...prev, meal.title]));
      toast({ title: '📌 Recipe saved!', description: `"${meal.title}" added to your saved recipes.` });
    } catch (e: any) {
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
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-black">AI Meal Ideas</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Personalized suggestions for {activeChild.name} based on their age, diary, and preferences
        </p>
      </motion.div>

      {/* Fridge ingredients banner */}
      {fridgeIngredients.length > 0 && !loading && (
        <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <div className="flex items-center gap-2 flex-wrap bg-muted/50 rounded-lg p-3 border">
            <Refrigerator className="h-4 w-4 text-primary shrink-0" />
            <span className="text-xs font-bold">From your fridge:</span>
            {fridgeIngredients.slice(0, 5).map((ing, i) => (
              <Badge key={i} variant="secondary" className="text-[10px] capitalize">{ing.name}</Badge>
            ))}
            {fridgeIngredients.length > 5 && (
              <Badge variant="outline" className="text-[10px]">+{fridgeIngredients.length - 5} more</Badge>
            )}
            <button onClick={() => { setFridgeIngredients([]); }} className="text-[10px] text-muted-foreground hover:text-foreground ml-auto">Clear</button>
          </div>
        </motion.div>
      )}

      {/* Initial state — CTA */}
      {!result && !loading && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-3">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <div className="text-5xl mb-3">✨</div>
              <h2 className="text-lg font-bold mb-2">What should {activeChild.name} eat today?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                AI considers age, food history, allergens, and nutrition goals
              </p>
              <Button onClick={() => fetchSuggestions()} size="lg" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Get Today's Meal Plan
              </Button>
            </CardContent>
          </Card>
          <Button variant="outline" className="w-full gap-2" onClick={() => setFridgeScannerOpen(true)}>
            <Refrigerator className="h-4 w-4" />
            Scan My Fridge First
          </Button>
        </motion.div>
      )}

      {/* Fun Loading */}
      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 space-y-6">
          <div className="text-center">
            <motion.div
              key={loadingStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl mb-3"
            >
              {LOADING_STEPS[loadingStep].emoji}
            </motion.div>
            <motion.p
              key={`text-${loadingStep}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm font-bold"
            >
              {LOADING_STEPS[loadingStep].text}
            </motion.p>
          </div>
          <Progress value={((loadingStep + 1) / LOADING_STEPS.length) * 100} className="h-2 max-w-xs mx-auto" />
          <div className="space-y-2">
            {LOADING_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.3 }}
                animate={{ opacity: i <= loadingStep ? 1 : 0.3 }}
                className={`flex items-center gap-2 text-xs px-4 ${i <= loadingStep ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                <span>{i < loadingStep ? '✅' : i === loadingStep ? '⏳' : '⬜'}</span>
                <span>{step.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            {result.suggestions.map((meal, i) => {
              const matchingRecipe = meal.recipeId ? recipes.find(r => r.id === meal.recipeId) : null;
              const isSaved = savedMeals.has(meal.title);
              const isSaving = savingMeal === meal.title;
              const isExpanded = expandedCard === meal.mealType;

              return (
                <motion.div
                  key={meal.mealType}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Collapsible open={isExpanded} onOpenChange={() => setExpandedCard(isExpanded ? null : meal.mealType)}>
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

                            {/* Quick info row */}
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                                <Clock className="h-2.5 w-2.5" /> {meal.prepTimeMinutes}min
                              </span>
                              <span className={`inline-flex items-center gap-1 text-[10px] font-bold rounded-full px-2 py-0.5 ${CHOKING_COLORS[meal.chokingRisk] || ''}`}>
                                <AlertTriangle className="h-2.5 w-2.5" /> {meal.chokingRisk} risk
                              </span>
                              {meal.newFood && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                                  <Star className="h-2.5 w-2.5" /> New food!
                                </span>
                              )}
                            </div>

                            {/* Expand / action row */}
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <CollapsibleTrigger asChild>
                                <button className="inline-flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 rounded-full px-2 py-0.5 hover:bg-primary/20 transition-colors">
                                  {isExpanded ? 'Less' : 'Details'} <ChevronDown className={`h-2.5 w-2.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                </button>
                              </CollapsibleTrigger>
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
                                  isSaved ? 'text-primary bg-primary/10' : 'text-muted-foreground bg-muted hover:bg-muted/80'
                                }`}
                              >
                                {isSaved ? <><Check className="h-2.5 w-2.5" /> Saved</> : isSaving ? 'Saving...' : <><Bookmark className="h-2.5 w-2.5" /> Save</>}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Expanded details */}
                        <CollapsibleContent>
                          <div className="mt-3 pt-3 border-t border-border/50 space-y-3 pl-[3.25rem]">
                            {/* Prep instructions */}
                            <div>
                              <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">How to prepare</p>
                              <p className="text-xs leading-relaxed">{meal.prepInstructions}</p>
                            </div>

                            {/* Serving size */}
                            <div>
                              <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Serving size</p>
                              <p className="text-xs">{meal.servingSize}</p>
                            </div>

                            {/* Nutrition */}
                            {meal.nutritionHighlights?.length > 0 && (
                              <div>
                                <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Nutrition</p>
                                <div className="flex flex-wrap gap-1">
                                  {meal.nutritionHighlights.map((n, idx) => (
                                    <Badge key={idx} variant="outline" className="text-[10px] bg-background">{n}</Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Allergen info */}
                            <div className="flex items-start gap-1.5">
                              <Shield className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
                              <p className="text-[10px] text-muted-foreground"><span className="font-bold">Allergens:</span> {meal.allergenInfo}</p>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </CardContent>
                    </Card>
                  </Collapsible>
                </motion.div>
              );
            })}

            {/* Daily tip */}
            {result.dailyTip && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
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

            {/* Action buttons */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="pt-2 space-y-2">
              <Button variant="outline" onClick={() => fetchSuggestions()} className="w-full gap-2" disabled={loading}>
                <RefreshCw className="h-4 w-4" /> Get New Suggestions
              </Button>
              <Button variant="ghost" onClick={() => setFridgeScannerOpen(true)} className="w-full gap-2 text-muted-foreground">
                <Refrigerator className="h-4 w-4" /> Scan My Fridge
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 px-2">
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          ⚕️ AI suggestions are for inspiration only and do not constitute medical advice. Always consult your pediatrician.
        </p>
      </div>

      <FridgeScanner
        open={fridgeScannerOpen}
        onOpenChange={setFridgeScannerOpen}
        onIngredientsDetected={handleFridgeIngredients}
      />
    </div>
  );
}
