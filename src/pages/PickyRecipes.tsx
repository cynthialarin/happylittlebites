import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, X, Minus, Sparkles, ChefHat, Lightbulb } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { foods } from '@/data/foods';
import { recipes } from '@/data/recipes';
import { FoodGroup } from '@/types';

const FOOD_GROUP_LABELS: Record<FoodGroup, { label: string; emoji: string }> = {
  fruits: { label: 'Fruits', emoji: '🍎' },
  vegetables: { label: 'Vegetables', emoji: '🥦' },
  grains: { label: 'Grains', emoji: '🌾' },
  protein: { label: 'Protein', emoji: '🍗' },
  dairy: { label: 'Dairy', emoji: '🧀' },
  legumes: { label: 'Legumes', emoji: '🫘' },
  'nuts-seeds': { label: 'Nuts & Seeds', emoji: '🥜' },
  other: { label: 'Other', emoji: '🍯' },
};

const FOOD_GROUP_ORDER: FoodGroup[] = ['fruits', 'vegetables', 'protein', 'dairy', 'grains', 'legumes', 'nuts-seeds', 'other'];

function extractKeywords(ingredient: string): string[] {
  const cleaned = ingredient
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/[0-9\/]+\s*(cup|tbsp|tsp|oz|can|lb|clove|pinch|splash|squeeze|handful)s?\b/gi, '')
    .replace(/,/g, ' ')
    .trim();
  
  const stopWords = new Set(['of', 'or', 'and', 'a', 'the', 'to', 'for', 'with', 'in', 'on', 'fresh', 'frozen', 'dried', 'chopped', 'diced', 'sliced', 'mashed', 'cooked', 'raw', 'ripe', 'small', 'large', 'medium', 'optional', 'peeled', 'rinsed', 'drained', 'grated', 'shredded', 'low', 'sodium', 'unsalted', 'whole', 'ground', 'mild', 'soft', 'plain', 'full', 'fat', 'little']);
  
  return cleaned.split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
}

function matchFoodToIngredient(foodName: string, ingredientKeywords: string[]): boolean {
  const fn = foodName.toLowerCase();
  return ingredientKeywords.some(kw => fn.includes(kw) || kw.includes(fn));
}

interface RecipeMatch {
  recipeId: string;
  lovedCount: number;
  refusedCount: number;
  lovedFoods: string[];
  refusedFoods: string[];
  category: 'perfect' | 'bridge' | 'new' | 'hidden';
}

export default function PickyRecipes() {
  const navigate = useNavigate();
  const { activeChild, foodPreferences, setFoodPreference, clearFoodPreferences } = useApp();
  const [activeGroup, setActiveGroup] = useState<FoodGroup>('fruits');

  const childId = activeChild?.id || '';
  const prefs = foodPreferences[childId] || {};

  const lovedCount = Object.values(prefs).filter(v => v === 'loves').length;
  const mehCount = Object.values(prefs).filter(v => v === 'meh').length;
  const refusedCount = Object.values(prefs).filter(v => v === 'refuses').length;

  const foodsByGroup = useMemo(() => {
    const grouped: Record<FoodGroup, typeof foods> = {} as any;
    FOOD_GROUP_ORDER.forEach(g => { grouped[g] = []; });
    foods.forEach(f => { grouped[f.foodGroup]?.push(f); });
    return grouped;
  }, []);

  const recipeMatches = useMemo<RecipeMatch[]>(() => {
    if (lovedCount === 0 && refusedCount === 0) return [];

    return recipes.map(recipe => {
      const lovedFoods: string[] = [];
      const refusedFoods: string[] = [];

      recipe.ingredients.forEach(ingredient => {
        const keywords = extractKeywords(ingredient);
        foods.forEach(food => {
          const pref = prefs[food.name];
          if (!pref) return;
          if (matchFoodToIngredient(food.name, keywords)) {
            if (pref === 'loves') lovedFoods.push(food.name);
            if (pref === 'refuses') refusedFoods.push(food.name);
          }
        });
      });

      const uniqueLoved = [...new Set(lovedFoods)];
      const uniqueRefused = [...new Set(refusedFoods)];

      let category: RecipeMatch['category'] = 'hidden';
      if (uniqueRefused.length === 0 && uniqueLoved.length >= 2) category = 'perfect';
      else if (uniqueRefused.length === 1 && uniqueLoved.length >= 2) category = 'bridge';
      else if (uniqueRefused.length === 0 && uniqueLoved.length === 0) category = 'new';
      else if (uniqueRefused.length <= 1) category = 'new';

      return {
        recipeId: recipe.id,
        lovedCount: uniqueLoved.length,
        refusedCount: uniqueRefused.length,
        lovedFoods: uniqueLoved,
        refusedFoods: uniqueRefused,
        category,
      };
    }).filter(m => m.category !== 'hidden');
  }, [prefs, lovedCount, refusedCount]);

  const perfectMatches = recipeMatches.filter(m => m.category === 'perfect').sort((a, b) => b.lovedCount - a.lovedCount);
  const bridgeRecipes = recipeMatches.filter(m => m.category === 'bridge').sort((a, b) => b.lovedCount - a.lovedCount);
  const tryNew = recipeMatches.filter(m => m.category === 'new');

  const getPref = (foodName: string) => prefs[foodName] || null;

  const cyclePref = (foodName: string) => {
    const current = getPref(foodName);
    if (current === null) setFoodPreference(childId, foodName, 'loves');
    else if (current === 'loves') setFoodPreference(childId, foodName, 'meh');
    else if (current === 'meh') setFoodPreference(childId, foodName, 'refuses');
    else setFoodPreference(childId, foodName, null);
  };

  if (!activeChild) {
    return (
      <div className="px-4 pt-4 pb-6 max-w-lg mx-auto text-center">
        <p className="text-muted-foreground">Please add a child profile first.</p>
        <Button onClick={() => navigate('/more/profiles')} className="mt-4">Add Child</Button>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 pb-6 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="mb-5">
        <h1 className="text-xl font-black">Picky Eater Recipes 🍽️</h1>
        <p className="text-sm text-muted-foreground">
          Tell us what {activeChild.name} likes and we'll find recipes that work
        </p>
      </div>

      <Tabs defaultValue="preferences" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="preferences" className="flex-1 text-xs">
            🏷️ Preferences
          </TabsTrigger>
          <TabsTrigger value="recipes" className="flex-1 text-xs">
            <Sparkles className="h-3 w-3 mr-1" />
            Recipes ({perfectMatches.length + bridgeRecipes.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preferences">
          {/* Summary */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1 rounded-lg bg-secondary/30 p-3 text-center">
              <p className="text-lg font-bold text-secondary-foreground">{lovedCount}</p>
              <p className="text-[10px] text-muted-foreground">😋 Yummy</p>
            </div>
            <div className="flex-1 rounded-lg bg-accent/30 p-3 text-center">
              <p className="text-lg font-bold text-accent-foreground">{mehCount}</p>
              <p className="text-[10px] text-muted-foreground">😐 Meh</p>
            </div>
            <div className="flex-1 rounded-lg bg-destructive/10 p-3 text-center">
              <p className="text-lg font-bold text-destructive">{refusedCount}</p>
              <p className="text-[10px] text-muted-foreground">🤢 Yucky</p>
            </div>
          </div>

          {lovedCount + refusedCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground mb-3"
              onClick={() => clearFoodPreferences(childId)}
            >
              Reset all preferences
            </Button>
          )}

          <p className="text-xs text-muted-foreground mb-3">
            Tap: <span className="text-secondary-foreground font-semibold">😋 Yummy</span> → 
            <span className="text-accent-foreground font-semibold">😐 Meh</span> → 
            <span className="text-destructive font-semibold">🤢 Yucky</span> → reset
          </p>

          {/* Food group tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 no-scrollbar">
            {FOOD_GROUP_ORDER.map(group => (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeGroup === group
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {FOOD_GROUP_LABELS[group].emoji} {FOOD_GROUP_LABELS[group].label}
              </button>
            ))}
          </div>

          {/* Food grid */}
          <div className="grid grid-cols-3 gap-2">
            {foodsByGroup[activeGroup]?.map(food => {
              const pref = getPref(food.name);
              return (
                <button
                  key={food.id}
                  onClick={() => cyclePref(food.name)}
                  className={`relative flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                    pref === 'loves'
                      ? 'border-secondary bg-secondary/15'
                      : pref === 'meh'
                      ? 'border-accent bg-accent/15'
                      : pref === 'refuses'
                      ? 'border-destructive bg-destructive/10'
                      : 'border-border bg-card hover:border-muted-foreground/30'
                  }`}
                >
                  <span className="text-2xl">{food.emoji}</span>
                  <span className="text-[10px] font-medium leading-tight text-center">{food.name}</span>
                  {pref === 'loves' && (
                    <span className="absolute top-0.5 right-1 text-sm">😋</span>
                  )}
                  {pref === 'meh' && (
                    <span className="absolute top-0.5 right-1 text-sm">😐</span>
                  )}
                  {pref === 'refuses' && (
                    <span className="absolute top-0.5 right-1 text-sm">🤢</span>
                  )}
                </button>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="recipes">
          {lovedCount === 0 && refusedCount === 0 ? (
            <Card className="bg-muted/50">
              <CardContent className="p-6 text-center">
                <p className="text-3xl mb-2">🏷️</p>
                <p className="text-sm font-medium">No preferences set yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Go to the Preferences tab and tag what {activeChild.name} loves and won't eat
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-5">
              {/* Perfect matches */}
              {perfectMatches.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ChefHat className="h-4 w-4 text-secondary-foreground" />
                    <h2 className="font-bold text-sm">Perfect Matches</h2>
                    <Badge variant="secondary" className="text-[10px]">{perfectMatches.length}</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground mb-2">
                    Only ingredients {activeChild.name} already loves
                  </p>
                  <div className="space-y-2">
                    {perfectMatches.map(match => {
                      const recipe = recipes.find(r => r.id === match.recipeId)!;
                      return (
                        <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
                          <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-3 flex items-center gap-3">
                              <span className="text-2xl">{recipe.emoji}</span>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm truncate">{recipe.title}</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {match.lovedFoods.map(f => (
                                    <span key={f} className="text-[9px] bg-secondary/20 text-secondary-foreground px-1.5 py-0.5 rounded-full">
                                      ❤️ {f}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Bridge recipes */}
              {bridgeRecipes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-accent-foreground" />
                    <h2 className="font-bold text-sm">Bridge Recipes</h2>
                    <Badge className="text-[10px] bg-accent/20 text-accent-foreground border-none">{bridgeRecipes.length}</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground mb-2">
                    Mostly loved ingredients + 1 new food to try — great for exposure!
                  </p>
                  <div className="space-y-2">
                    {bridgeRecipes.map(match => {
                      const recipe = recipes.find(r => r.id === match.recipeId)!;
                      return (
                        <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
                          <Card className="hover:shadow-md transition-shadow border-accent/20">
                            <CardContent className="p-3 flex items-center gap-3">
                              <span className="text-2xl">{recipe.emoji}</span>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm truncate">{recipe.title}</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {match.lovedFoods.map(f => (
                                    <span key={f} className="text-[9px] bg-secondary/20 text-secondary-foreground px-1.5 py-0.5 rounded-full">
                                      ❤️ {f}
                                    </span>
                                  ))}
                                  {match.refusedFoods.map(f => (
                                    <span key={f} className="text-[9px] bg-destructive/15 text-destructive px-1.5 py-0.5 rounded-full">
                                      🌱 {f}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Try something new */}
              {tryNew.length > 0 && perfectMatches.length + bridgeRecipes.length < 5 && (
                <div>
                  <h2 className="font-bold text-sm mb-2">🆕 Try Something New</h2>
                  <p className="text-[10px] text-muted-foreground mb-2">
                    No refused ingredients — worth a try!
                  </p>
                  <div className="space-y-2">
                    {tryNew.slice(0, 5).map(match => {
                      const recipe = recipes.find(r => r.id === match.recipeId)!;
                      return (
                        <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
                          <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="p-3 flex items-center gap-3">
                              <span className="text-2xl">{recipe.emoji}</span>
                              <p className="font-semibold text-sm truncate">{recipe.title}</p>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {perfectMatches.length === 0 && bridgeRecipes.length === 0 && tryNew.length === 0 && (
                <Card className="bg-muted/50">
                  <CardContent className="p-6 text-center">
                    <p className="text-3xl mb-2">🤔</p>
                    <p className="text-sm font-medium">No matches yet</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Try marking more foods as "Loves" to unlock recipe recommendations
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
