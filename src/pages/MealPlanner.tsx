import { useState, useMemo, useCallback } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import MealSlot from '@/components/MealSlot';
import { recipes } from '@/data/recipes';
import { MealType, MealPlanEntry, AgeGroup } from '@/types';
import { Sparkles, Trash2, ShoppingCart, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

const AGE_GROUP_ORDER: AgeGroup[] = ['6mo', '9mo', '12mo', '2yr', '3yr+'];

function getAgeGroupsForChild(ageMonths: number): AgeGroup[] {
  if (ageMonths < 9) return ['6mo'];
  if (ageMonths < 12) return ['6mo', '9mo'];
  if (ageMonths < 24) return ['6mo', '9mo', '12mo'];
  if (ageMonths < 36) return ['6mo', '9mo', '12mo', '2yr'];
  return AGE_GROUP_ORDER;
}

function getWeekDates(offset: number): { date: string; label: string; dayName: string }[] {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay() + (offset * 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    return {
      date: dateStr,
      label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
    };
  });
}

export default function MealPlanner() {
  const navigate = useNavigate();
  const { activeChild, mealPlan, addMealPlanEntry, removeMealPlanEntry, clearWeekPlan, getChildAge } = useApp();
  const [weekOffset, setWeekOffset] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [addTarget, setAddTarget] = useState<{ date: string; mealType: MealType } | null>(null);
  const [customMeal, setCustomMeal] = useState('');
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);
  const today = new Date().toISOString().split('T')[0];

  const childAgeGroups = useMemo(() => {
    if (!activeChild) return AGE_GROUP_ORDER;
    const { months } = getChildAge(activeChild);
    return getAgeGroupsForChild(months);
  }, [activeChild, getChildAge]);

  const getEntry = useCallback(
    (date: string, mealType: MealType): MealPlanEntry | undefined => {
      if (!activeChild) return undefined;
      return mealPlan.find(
        (e) => e.date === date && e.mealType === mealType && e.childId === activeChild.id
      );
    },
    [activeChild, mealPlan]
  );

  const handleAddSlot = (date: string, mealType: MealType) => {
    setAddTarget({ date, mealType });
    setCustomMeal('');
    setShowAdd(true);
  };

  const handleSelectRecipe = (recipeId: string) => {
    if (!activeChild || !addTarget) return;
    const recipe = recipes.find((r) => r.id === recipeId);
    addMealPlanEntry({
      id: crypto.randomUUID(),
      childId: activeChild.id,
      date: addTarget.date,
      mealType: addTarget.mealType,
      recipeId,
      customMeal: recipe?.title,
    });
    setShowAdd(false);
    toast('📅 Meal planned!');
  };

  const handleAddCustom = () => {
    if (!activeChild || !addTarget || !customMeal.trim()) return;
    addMealPlanEntry({
      id: crypto.randomUUID(),
      childId: activeChild.id,
      date: addTarget.date,
      mealType: addTarget.mealType,
      customMeal: customMeal.trim(),
    });
    setShowAdd(false);
    toast('📅 Meal planned!');
  };

  const handleAutoFill = () => {
    if (!activeChild) return;
    const mealCategoryMap: Record<MealType, string[]> = {
      breakfast: ['breakfast', 'smoothies'],
      lunch: ['lunch', 'batch-cooking'],
      dinner: ['dinner', 'batch-cooking'],
      snack: ['snacks', 'smoothies'],
    };
    let added = 0;
    weekDates.forEach(({ date }) => {
      MEAL_TYPES.forEach((mealType) => {
        if (getEntry(date, mealType)) return;
        const categories = mealCategoryMap[mealType];
        const options = recipes.filter(
          (r) => categories.includes(r.category) && childAgeGroups.includes(r.ageGroup)
        );
        if (options.length === 0) return;
        const recipe = options[Math.floor(Math.random() * options.length)];
        addMealPlanEntry({
          id: crypto.randomUUID(),
          childId: activeChild.id,
          date,
          mealType,
          recipeId: recipe.id,
          customMeal: recipe.title,
        });
        added++;
      });
    });
    toast(`✨ Auto-filled ${added} meal slots!`);
  };

  const shoppingList = useMemo(() => {
    if (!activeChild) return [];
    const weekEntries = mealPlan.filter(
      (e) =>
        e.childId === activeChild.id &&
        weekDates.some((d) => d.date === e.date) &&
        e.recipeId
    );
    const ingredientSet = new Map<string, boolean>();
    weekEntries.forEach((entry) => {
      const recipe = recipes.find((r) => r.id === entry.recipeId);
      recipe?.ingredients.forEach((ing) => {
        ingredientSet.set(ing, true);
      });
    });
    return Array.from(ingredientSet.keys()).sort();
  }, [activeChild, mealPlan, weekDates]);

  const toggleChecked = (item: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(item)) next.delete(item);
      else next.add(item);
      return next;
    });
  };

  const handleClearWeek = () => {
    if (!activeChild) return;
    const weekDateStrs = weekDates.map((d) => d.date);
    clearWeekPlan(activeChild.id, weekDateStrs);
    toast('🗑️ Week cleared');
  };

  if (!activeChild) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted-foreground">
        Add a child profile first
      </div>
    );
  }

  const filteredRecipes = addTarget
    ? recipes.filter((r) => {
        const categoryMatch = (() => {
          if (addTarget.mealType === 'breakfast') return ['breakfast', 'smoothies'].includes(r.category);
          if (addTarget.mealType === 'lunch') return ['lunch', 'batch-cooking'].includes(r.category);
          if (addTarget.mealType === 'dinner') return ['dinner', 'batch-cooking'].includes(r.category);
          return ['snacks', 'smoothies'].includes(r.category);
        })();
        return categoryMatch && childAgeGroups.includes(r.ageGroup);
      })
    : [];

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-black">Meal Planner</h1>
          <p className="text-sm text-muted-foreground">{activeChild.name}'s weekly plan</p>
        </div>
        <div className="flex gap-1.5">
          <Button size="sm" variant="outline" className="rounded-full gap-1 text-xs" onClick={handleAutoFill}>
            <Sparkles className="h-3.5 w-3.5" /> Auto-fill
          </Button>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setWeekOffset((o) => o - 1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <button onClick={() => setWeekOffset(0)} className="text-sm font-bold hover:text-primary transition-colors">
          {weekOffset === 0 ? 'This Week' : weekOffset === 1 ? 'Next Week' : weekOffset === -1 ? 'Last Week' : `Week ${weekOffset > 0 ? '+' : ''}${weekOffset}`}
        </button>
        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setWeekOffset((o) => o + 1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Weekly Grid */}
      <ScrollArea className="w-full mb-4">
        <div className="flex gap-2 pb-2" style={{ minWidth: '700px' }}>
          {weekDates.map(({ date, label, dayName }) => (
            <div key={date} className={`flex-1 min-w-[90px] ${date === today ? 'ring-2 ring-primary/30 rounded-xl' : ''}`}>
              <div className={`text-center py-1.5 rounded-t-xl ${date === today ? 'bg-primary/10' : 'bg-muted/30'}`}>
                <p className="text-[10px] font-bold text-muted-foreground">{dayName}</p>
                <p className="text-xs font-black">{label}</p>
              </div>
              <div className="space-y-1 p-1">
                {MEAL_TYPES.map((mealType) => {
                  const entry = getEntry(date, mealType);
                  const recipe = entry?.recipeId ? recipes.find((r) => r.id === entry.recipeId) : undefined;
                    return (
                      <MealSlot
                        key={mealType}
                        mealType={mealType}
                        mealName={entry?.customMeal}
                        mealEmoji={recipe?.emoji}
                        recipeId={entry?.recipeId}
                        onAdd={() => handleAddSlot(date, mealType)}
                        onRemove={entry ? () => removeMealPlanEntry(entry.id) : undefined}
                      />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-4">
        <Button variant="outline" size="sm" className="rounded-full gap-1 text-xs flex-1" onClick={() => { setCheckedItems(new Set()); setShowShoppingList(true); }}>
          <ShoppingCart className="h-3.5 w-3.5" /> Shopping List
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-full gap-1 text-xs text-destructive hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" /> Clear Week
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear this week?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove all planned meals for this week. This can't be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearWeek} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Clear Week
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Add Meal Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Add a Meal</DialogTitle>
            <DialogDescription>
              Choose a recipe or type a custom meal
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Type a custom meal..."
                value={customMeal}
                onChange={(e) => setCustomMeal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
              />
              {customMeal.trim() && (
                <Button size="sm" className="rounded-full mt-2 w-full" onClick={handleAddCustom}>
                  Add "{customMeal.trim()}"
                </Button>
              )}
            </div>
            {filteredRecipes.length > 0 && (
              <>
                <p className="text-xs font-bold text-muted-foreground">Or pick a recipe:</p>
                <div className="space-y-1.5 max-h-60 overflow-y-auto">
                  {filteredRecipes.map((recipe) => (
                    <button
                      key={recipe.id}
                      onClick={() => handleSelectRecipe(recipe.id)}
                      className="w-full p-2.5 rounded-lg bg-muted/30 hover:bg-primary/10 text-left flex items-center gap-2 transition-colors"
                    >
                      <span className="text-lg">{recipe.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{recipe.title}</p>
                        <p className="text-[10px] text-muted-foreground">{recipe.prepTime + recipe.cookTime} min</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Shopping List Dialog */}
      <Dialog open={showShoppingList} onOpenChange={setShowShoppingList}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>🛒 Shopping List</DialogTitle>
            <DialogDescription>Ingredients for this week's planned recipes</DialogDescription>
          </DialogHeader>
          {shoppingList.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No recipes planned yet — add some meals first!
            </p>
          ) : (
            <div className="space-y-1.5 max-h-80 overflow-y-auto">
              {shoppingList.map((ingredient, i) => (
                <label key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 cursor-pointer">
                  <Checkbox
                    checked={checkedItems.has(ingredient)}
                    onCheckedChange={() => toggleChecked(ingredient)}
                  />
                  <span className={`text-sm ${checkedItems.has(ingredient) ? 'line-through text-muted-foreground' : ''}`}>
                    {ingredient}
                  </span>
                </label>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
