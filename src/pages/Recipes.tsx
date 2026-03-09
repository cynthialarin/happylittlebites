import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { recipes } from '@/data/recipes';
import { useApp } from '@/contexts/AppContext';
import { Input } from '@/components/ui/input';
import { Search, Heart, Clock, Snowflake, Users } from 'lucide-react';
import { RecipeCategory } from '@/types';
import FoodImage from '@/components/FoodImage';

const CATEGORIES: { value: RecipeCategory | 'all' | 'favorites'; label: string }[] = [
  { value: 'all', label: '🍽️ All' },
  { value: 'favorites', label: '❤️ Favorites' },
  { value: 'breakfast', label: '🌅 Breakfast' },
  { value: 'lunch', label: '☀️ Lunch' },
  { value: 'dinner', label: '🌙 Dinner' },
  { value: 'snacks', label: '🍪 Snacks' },
  { value: 'smoothies', label: '🥤 Smoothies' },
  { value: 'batch-cooking', label: '📦 Batch' },
];

export default function Recipes() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<RecipeCategory | 'all' | 'favorites'>('all');
  const { favoriteRecipes, toggleFavoriteRecipe } = useApp();
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return recipes.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
      const matchesCat = category === 'all' || (category === 'favorites' ? favoriteRecipes.includes(r.id) : r.category === category);
      return matchesSearch && matchesCat;
    });
  }, [search, category, favoriteRecipes]);

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <h1 className="text-xl font-black mb-1">Recipes</h1>
      <p className="text-sm text-muted-foreground mb-4">{recipes.length} family-friendly recipes</p>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search recipes..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 rounded-full" />
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-3 mb-3 -mx-1 px-1">
        {CATEGORIES.map(c => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              category === c.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(recipe => (
          <div
            key={recipe.id}
            className="p-3 rounded-xl bg-card border border-border hover:border-primary/40 transition-all"
          >
            <div className="flex items-start justify-between">
              <button onClick={() => navigate(`/recipes/${recipe.id}`)} className="text-left flex-1">
                <div className="flex gap-3 mb-2">
                  <FoodImage
                    type="recipe"
                    id={recipe.id}
                    name={recipe.title}
                    description={recipe.description}
                    fallbackEmoji={recipe.emoji}
                    className="w-16 h-16 rounded-lg flex-shrink-0"
                    cacheOnly
                  />
                  <div className="min-w-0">
                    <span className="font-bold text-sm">{recipe.title}</span>
                    <p className="text-xs text-muted-foreground line-clamp-1">{recipe.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted font-medium flex items-center gap-0.5">
                    <Clock className="h-2.5 w-2.5" /> {recipe.prepTime + recipe.cookTime}min
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">
                    {recipe.ageGroup}+
                  </span>
                  {recipe.freezerFriendly && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-sky/20 font-medium flex items-center gap-0.5">
                      <Snowflake className="h-2.5 w-2.5" /> Freezer
                    </span>
                  )}
                  {recipe.familyFriendly && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-sage/20 font-medium flex items-center gap-0.5">
                      <Users className="h-2.5 w-2.5" /> Family
                    </span>
                  )}
                </div>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); toggleFavoriteRecipe(recipe.id); }}
                className="p-2"
              >
                <Heart className={`h-4 w-4 ${favoriteRecipes.includes(recipe.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <div className="text-3xl mb-2">{category === 'favorites' ? '💛' : '🔍'}</div>
          <p className="font-semibold">{category === 'favorites' ? 'No favorites yet' : 'No recipes found'}</p>
          <p className="text-sm">{category === 'favorites' ? 'Tap the heart on any recipe to save it' : 'Try a different search'}</p>
        </div>
      )}
    </div>
  );
}
