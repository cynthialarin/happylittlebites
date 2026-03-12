import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { foods } from '@/data/foods';
import { recipes } from '@/data/recipes';
import { useApp } from '@/contexts/AppContext';
import { useGroceryList } from '@/hooks/useGroceryList';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, AlertTriangle, ShieldCheck, Apple, ChefHat, BookOpen, ShoppingCart, ClipboardCheck, NotebookPen } from 'lucide-react';
import FoodImage from '@/components/FoodImage';
import { toast } from '@/components/ui/sonner';
import { AcceptanceLevel, MealType, ReactionSeverity } from '@/types';

const AGE_LABELS = { '6mo': '6 months', '9mo': '9 months', '12mo': '12 months', '2yr': '2 years', '3yr+': '3+ years' };

const ACCEPTANCE_EMOJI: Record<AcceptanceLevel, string> = {
  loved: '😍', liked: '😊', okay: '😐', disliked: '😕', refused: '😤',
};

const COUNTRY_SAFETY_NOTES: Record<string, { US: string; CA: string }> = {
  yogurt: {
    US: 'Cow milk as a drink: wait until 12 months (AAP). Yogurt and cheese are OK from 6 months.',
    CA: 'Cow milk as a drink can be introduced at 9–12 months (Health Canada). Use pasteurized, homogenized 3.25% M.F.',
  },
  cheese: {
    US: 'Cow milk as a drink: 12 months+ (AAP). Cheese in cooking or on foods is OK from 6 months.',
    CA: 'Pasteurized cow milk as a drink is OK from 9–12 months per Health Canada.',
  },
  kefir: {
    US: 'Cow milk as a drink: wait until 12 months (AAP). Kefir is OK from 6 months.',
    CA: 'Cow milk as a drink can be introduced at 9–12 months (Health Canada). Use pasteurized, homogenized 3.25% M.F.',
  },
  beef: {
    US: 'Iron-rich foods are encouraged as early foods alongside iron-fortified cereals (AAP).',
    CA: 'Iron-rich meat is recommended as one of the very first complementary foods at 6 months (Health Canada). Prioritize alongside iron-fortified cereal.',
  },
  chicken: {
    US: 'Iron-rich foods are encouraged as early foods alongside iron-fortified cereals (AAP).',
    CA: 'Iron-rich meat is recommended as one of the very first complementary foods at 6 months (Health Canada). Prioritize alongside iron-fortified cereal.',
  },
  tuna: {
    US: 'Choose "light" tuna (skipjack). FDA Best Choices: 2–3 servings/week for children. Avoid king mackerel, swordfish, shark, and tilefish.',
    CA: 'Choose light tuna. Health Canada limits fresh/frozen tuna, shark, swordfish, and marlin to max 75 g per month for young children.',
  },
  salmon: {
    US: 'FDA "Best Choice" fish — 2–3 servings/week recommended. Low mercury.',
    CA: 'Health Canada recommends fish 2× per week. Salmon is low-mercury — no monthly limit.',
  },
  liver: {
    US: 'Limit to 1–2 servings per week due to high vitamin A (AAP).',
    CA: 'Health Canada advises limiting liver due to vitamin A. Max 75 g per week for young children.',
  },
  eggs: {
    US: 'Introduce early and often — early egg introduction (around 6 months) may reduce egg allergy risk (AAP). Serve well-cooked; no runny yolks until 12 months+.',
    CA: 'Health Canada recommends introducing cooked egg as one of the first complementary foods at 6 months. Offer frequently (2–3× per week) to maintain tolerance.',
  },
  'peanut-butter': {
    US: 'AAP/NIAID: Introduce peanut-containing foods around 4–6 months for high-risk infants (severe eczema or egg allergy). Thin smooth peanut butter mixed into purees — never whole peanuts or chunks.',
    CA: 'Health Canada recommends offering peanut butter (smooth, thinned) at 6 months as a priority allergen. Do not delay introduction. Never give whole or chopped peanuts to young children.',
  },
  peanuts: {
    US: 'AAP/NIAID: Introduce peanut-containing foods around 4–6 months for high-risk infants (severe eczema or egg allergy). Thin smooth peanut butter mixed into purees — never whole peanuts or chunks.',
    CA: 'Health Canada recommends offering peanut butter (smooth, thinned) at 6 months as a priority allergen. Do not delay introduction. Never give whole or chopped peanuts to young children.',
  },
  shrimp: {
    US: 'Shellfish is a top-9 allergen (FDA). Introduce well-cooked, finely minced shrimp from 6 months. Watch for allergic reactions for 2–3 days.',
    CA: 'Crustaceans and molluscs are priority allergens (Health Canada). Offer well-cooked, finely chopped shellfish from 6 months. Introduce separately from other new allergens.',
  },
  shellfish: {
    US: 'Shellfish is a top-9 allergen (FDA). Introduce well-cooked, finely minced from 6 months. Watch for allergic reactions for 2–3 days.',
    CA: 'Crustaceans and molluscs are priority allergens (Health Canada). Offer well-cooked, finely chopped shellfish from 6 months. Introduce separately from other new allergens.',
  },
};

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { settings, activeChild, diary, addDiaryEntry } = useApp();
  const { addItems } = useGroceryList();
  const isCanada = settings.country === 'CA';
  const food = foods.find(f => f.id === id);

  // Tried history for active child
  const triedHistory = useMemo(() => {
    if (!activeChild || !food) return [];
    return diary.filter(
      d => d.childId === activeChild.id &&
        (d.foodId === food.id || d.foodName.toLowerCase().includes(food.name.toLowerCase()))
    );
  }, [activeChild, food, diary]);

  // Matching recipes
  const matchingRecipes = useMemo(() => {
    if (!food) return [];
    const nameLower = food.name.toLowerCase();
    return recipes.filter(r =>
      r.ingredients.some(ing => ing.toLowerCase().includes(nameLower))
    ).slice(0, 5);
  }, [food]);

  // Related foods from same food group
  const relatedFoods = useMemo(() => {
    if (!food) return [];
    return foods
      .filter(f => f.foodGroup === food.foodGroup && f.id !== food.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  }, [food]);

  // Acceptance breakdown
  const acceptanceBreakdown = useMemo(() => {
    const counts: Partial<Record<AcceptanceLevel, number>> = {};
    triedHistory.forEach(entry => {
      const a = entry.acceptance as AcceptanceLevel;
      counts[a] = (counts[a] || 0) + 1;
    });
    return counts;
  }, [triedHistory]);

  // Quick-log dialog state (must be before early return)
  const [showTriedDialog, setShowTriedDialog] = useState(false);
  const [triedAcceptance, setTriedAcceptance] = useState<AcceptanceLevel>('okay');
  const [triedMealType, setTriedMealType] = useState<MealType>('snack');
  const [triedHasReaction, setTriedHasReaction] = useState(false);
  const [triedReactionSeverity, setTriedReactionSeverity] = useState<ReactionSeverity>('mild');
  const [triedNotes, setTriedNotes] = useState('');

  if (!food) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-2xl mb-2">🤷</p>
          <p className="font-semibold">Food not found</p>
          <Button variant="outline" onClick={() => navigate('/foods')} className="mt-4">Back to library</Button>
        </div>
      </div>
    );
  }

  const handleLogToDiary = () => {
    navigate('/tracker', { state: { prefillFood: food.name, prefillFoodId: food.id } });
  };




  const handleMarkAsTried = () => {
    if (!activeChild) {
      toast('No child selected', { description: 'Please select a child profile first.' });
      return;
    }
    setShowTriedDialog(true);
  };

  const handleSaveTried = () => {
    if (!activeChild) return;
    const today = new Date().toISOString().split('T')[0];
    addDiaryEntry({
      id: crypto.randomUUID(),
      childId: activeChild.id,
      date: today,
      foodId: food.id,
      foodName: food.name,
      mealType: triedMealType,
      textureStage: 'purees',
      acceptance: triedAcceptance,
      reaction: triedHasReaction ? triedNotes : '',
      reactionSeverity: triedHasReaction ? triedReactionSeverity : 'none',
      notes: triedNotes || 'Quick-logged from food detail',
    });
    toast('✅ Marked as tried!', { description: `${food.name} logged for ${activeChild.name} today.` });
    setShowTriedDialog(false);
    setTriedAcceptance('okay');
    setTriedMealType('snack');
    setTriedHasReaction(false);
    setTriedReactionSeverity('mild');
    setTriedNotes('');
  };

  const handleAddToGrocery = () => {
    addItems.mutate([{ name: food.name, source: 'Food Library' }], {
      onSuccess: () => toast('🛒 Added to grocery list!', { description: food.name }),
      onError: () => toast('Failed to add', { description: 'Please try again.' }),
    });
  };

  const handleViewRecipes = () => {
    navigate('/recipes', { state: { searchQuery: food.name } });
  };


  return (
    <div className="px-4 pt-4 pb-6 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="text-center mb-3">
        <div className="mx-auto w-40 h-40 mb-3">
          <FoodImage type="food" id={food.id} name={food.name} fallbackEmoji={food.emoji} className="w-full h-full rounded-2xl" />
        </div>
        <h1 className="text-2xl font-black">{food.name}</h1>
        <p className="text-sm text-muted-foreground capitalize">Safe from {AGE_LABELS[food.safeFromAge]}</p>
      </div>

      {/* Tried History Badge */}
      {triedHistory.length > 0 && (
        <div className="mb-4 p-3 rounded-xl bg-sage/20 border border-sage/30">
          <div className="flex items-center gap-2 mb-1">
            <ClipboardCheck className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-primary">
              ✓ Tried {triedHistory.length} time{triedHistory.length > 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(acceptanceBreakdown).map(([level, count]) => (
              <span key={level} className="text-xs bg-background/60 px-2 py-0.5 rounded-full">
                {ACCEPTANCE_EMOJI[level as AcceptanceLevel]} {count}×
              </span>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">
            Last: {new Date(triedHistory[0].date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 flex-wrap mb-5">
        <Button size="sm" className="rounded-full text-xs gap-1.5" onClick={handleLogToDiary}>
          <NotebookPen className="h-3.5 w-3.5" /> Log to Diary
        </Button>
        {triedHistory.length === 0 && (
          <Button size="sm" variant="outline" className="rounded-full text-xs gap-1.5" onClick={handleMarkAsTried}>
            <ClipboardCheck className="h-3.5 w-3.5" /> Mark as Tried
          </Button>
        )}
        {matchingRecipes.length > 0 && (
          <Button size="sm" variant="outline" className="rounded-full text-xs gap-1.5" onClick={handleViewRecipes}>
            <BookOpen className="h-3.5 w-3.5" /> Recipes ({matchingRecipes.length})
          </Button>
        )}
        <Button size="sm" variant="outline" className="rounded-full text-xs gap-1.5" onClick={handleAddToGrocery}>
          <ShoppingCart className="h-3.5 w-3.5" /> Add to Grocery
        </Button>
      </div>

      {/* Honey / Botulism Warning */}
      {food.id === 'honey' && (
        <Card className="mb-4 bg-destructive/10 border-destructive/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span className="font-black text-sm text-destructive">⚠️ NEVER Give to Babies Under 12 Months</span>
            </div>
            <p className="text-sm font-medium">Honey can contain <strong>Clostridium botulinum</strong> spores that cause <strong>infant botulism</strong> — a rare but potentially life-threatening illness. A baby's immature digestive system cannot fight these spores. This includes raw honey, cooked honey, and foods containing honey.</p>
          </CardContent>
        </Card>
      )}

      {/* Country-Specific Guideline */}
      {COUNTRY_SAFETY_NOTES[food.id] && (
        <Card className={`mb-4 ${isCanada ? 'bg-destructive/5 border-destructive/20' : 'bg-sky-50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800'}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">{isCanada ? '🇨🇦' : '🇺🇸'}</span>
              <span className="font-bold text-sm">{isCanada ? 'Health Canada Guideline' : 'AAP / FDA Guideline'}</span>
            </div>
            <p className="text-sm">{COUNTRY_SAFETY_NOTES[food.id][isCanada ? 'CA' : 'US']}</p>
          </CardContent>
        </Card>
      )}

      {/* Safety Alert */}
      {food.chokingHazard && (
        <Card className="mb-4 bg-destructive/5 border-destructive/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="font-bold text-sm text-destructive">Choking Hazard</span>
            </div>
            <p className="text-sm">{food.chokingNotes}</p>
          </CardContent>
        </Card>
      )}

      {/* Allergen Info */}
      {food.allergens.length > 0 && (
        <Card className="mb-4 bg-accent/10 border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span className="font-bold text-sm">Contains Allergens</span>
            </div>
            <div className="flex gap-1 flex-wrap">
              {food.allergens.map(a => (
                <span key={a} className="text-xs px-2 py-1 rounded-full bg-accent/20 font-semibold capitalize">{a.replace('-', ' ')}</span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* How to Serve by Age */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <h2 className="font-bold text-sm mb-3 flex items-center gap-2">
            <ChefHat className="h-4 w-4 text-primary" /> How to Serve by Age
          </h2>
          <div className="space-y-2.5">
            {Object.entries(food.servingByAge).map(([age, tip]) => (
              <div key={age} className="flex gap-3">
                <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-full whitespace-nowrap h-fit">
                  {AGE_LABELS[age as keyof typeof AGE_LABELS]}
                </span>
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nutrition */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <h2 className="font-bold text-sm mb-2 flex items-center gap-2">
            <Apple className="h-4 w-4 text-sage" /> Nutrition Highlights
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {food.nutritionHighlights.map(n => (
              <span key={n} className="text-xs px-2 py-1 rounded-full bg-sage/20 font-medium">{n}</span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reactions */}
      {food.commonReactions.length > 0 && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <h2 className="font-bold text-sm mb-2">Common Reactions</h2>
            <ul className="space-y-1">
              {food.commonReactions.map(r => (
                <li key={r} className="text-sm flex items-start gap-2">
                  <span className="text-muted-foreground">•</span> {r}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Prep Tips */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <h2 className="font-bold text-sm mb-2">💡 Prep Tips</h2>
          <p className="text-sm">{food.prepTips}</p>
        </CardContent>
      </Card>

      {/* Related Foods */}
      {relatedFoods.length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-sm mb-3">Also Try...</h2>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {relatedFoods.map(rf => (
              <button
                key={rf.id}
                onClick={() => navigate(`/foods/${rf.id}`)}
                className="flex-shrink-0 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors min-w-[90px] text-center overflow-hidden"
              >
                <FoodImage type="food" id={rf.id} name={rf.name} fallbackEmoji={rf.emoji} className="w-full h-14 rounded-t-xl" cacheOnly />
                <div className="p-1.5">
                  <span className="text-[11px] font-semibold">{rf.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="text-[10px] text-muted-foreground text-center mt-5 px-4">
        For informational purposes only. Not a substitute for professional medical advice. Always consult your pediatrician.
      </p>
    </div>
  );
}
