import { useParams, useNavigate } from 'react-router-dom';
import { foods } from '@/data/foods';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, AlertTriangle, ShieldCheck, Apple, ChefHat } from 'lucide-react';
import FoodImage from '@/components/FoodImage';

const AGE_LABELS = { '6mo': '6 months', '9mo': '9 months', '12mo': '12 months', '2yr': '2 years', '3yr+': '3+ years' };

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const food = foods.find(f => f.id === id);

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

  return (
    <div className="px-4 pt-4 pb-6 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="text-center mb-5">
        <div className="text-6xl mb-2">{food.emoji}</div>
        <h1 className="text-2xl font-black">{food.name}</h1>
        <p className="text-sm text-muted-foreground capitalize">Safe from {AGE_LABELS[food.safeFromAge]}</p>
      </div>

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
                <span key={a} className="text-xs px-2 py-1 rounded-full bg-accent/20 font-semibold capitalize">
                  {a.replace('-', ' ')}
                </span>
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
      <Card>
        <CardContent className="p-4">
          <h2 className="font-bold text-sm mb-2">💡 Prep Tips</h2>
          <p className="text-sm">{food.prepTips}</p>
        </CardContent>
      </Card>
    </div>
  );
}
