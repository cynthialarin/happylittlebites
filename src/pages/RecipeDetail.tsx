import { useParams, useNavigate } from 'react-router-dom';
import { recipes } from '@/data/recipes';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Heart, Clock, Snowflake, Users, ShieldCheck } from 'lucide-react';
import FoodImage from '@/components/FoodImage';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favoriteRecipes, toggleFavoriteRecipe, triedRecipes, toggleTriedRecipe } = useApp();
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-2xl mb-2">🤷</p>
          <p className="font-semibold">Recipe not found</p>
          <Button variant="outline" onClick={() => navigate('/recipes')} className="mt-4">Back to recipes</Button>
        </div>
      </div>
    );
  }

  const isFav = favoriteRecipes.includes(recipe.id);
  const isTried = triedRecipes.includes(recipe.id);

  return (
    <div className="px-4 pt-4 pb-6 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="text-center mb-5">
        <div className="mx-auto w-48 h-48 mb-3">
          <FoodImage
            type="recipe"
            id={recipe.id}
            name={recipe.title}
            description={recipe.description}
            fallbackEmoji={recipe.emoji}
            className="w-full h-full rounded-2xl"
          />
        </div>
        <h1 className="text-2xl font-black">{recipe.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{recipe.description}</p>
      </div>

      {/* Meta tags */}
      <div className="flex gap-2 flex-wrap justify-center mb-5">
        <span className="text-xs px-2.5 py-1 rounded-full bg-muted font-medium flex items-center gap-1">
          <Clock className="h-3 w-3" /> {recipe.prepTime + recipe.cookTime} min
        </span>
        <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">{recipe.ageGroup}+</span>
        <span className="text-xs px-2.5 py-1 rounded-full bg-muted font-medium">Serves {recipe.servings}</span>
        {recipe.freezerFriendly && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-sky/20 font-medium flex items-center gap-1">
            <Snowflake className="h-3 w-3" /> Freezer
          </span>
        )}
        {recipe.familyFriendly && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-sage/20 font-medium flex items-center gap-1">
            <Users className="h-3 w-3" /> Family
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mb-5">
        <Button variant={isFav ? 'default' : 'outline'} className="flex-1 rounded-full gap-1.5" onClick={() => toggleFavoriteRecipe(recipe.id)}>
          <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} /> {isFav ? 'Saved' : 'Save'}
        </Button>
        <Button variant={isTried ? 'secondary' : 'outline'} className="flex-1 rounded-full gap-1.5" onClick={() => toggleTriedRecipe(recipe.id)}>
          {isTried ? '✅ Tried it!' : '🍴 Mark as tried'}
        </Button>
      </div>

      {/* Allergens */}
      {recipe.allergens.length > 0 && (
        <Card className="mb-4 bg-accent/10 border-accent/20">
          <CardContent className="p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-bold">Contains:</span>
            </div>
            <div className="flex gap-1 flex-wrap">
              {recipe.allergens.map(a => (
                <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 font-semibold capitalize">{a.replace('-', ' ')}</span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ingredients */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <h2 className="font-bold text-sm mb-3">📝 Ingredients</h2>
          <ul className="space-y-1.5">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0 mt-0.5">{i + 1}</span>
                {ing}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <h2 className="font-bold text-sm mb-3">👩‍🍳 Instructions</h2>
          <ol className="space-y-3">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Age Tips */}
      {Object.keys(recipe.ageTips).length > 0 && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <h2 className="font-bold text-sm mb-3">👶 Serving Tips by Age</h2>
            <div className="space-y-2">
              {Object.entries(recipe.ageTips).map(([age, tip]) => (
                <div key={age} className="flex gap-2">
                  <span className="text-xs font-bold bg-sage/20 px-2 py-1 rounded-full whitespace-nowrap h-fit">{age}</span>
                  <p className="text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Nutrition */}
      <Card>
        <CardContent className="p-4">
          <h2 className="font-bold text-sm mb-2">🥗 Nutrition Notes</h2>
          <p className="text-sm text-muted-foreground">{recipe.nutritionNotes}</p>
        </CardContent>
      </Card>
    </div>
  );
}
