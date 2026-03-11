import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodImage from '@/components/FoodImage';
import { foods } from '@/data/foods';
import { culturalFoods } from '@/data/culturalFoods';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { FoodGroup, AgeGroup } from '@/types';

const allFoods = [...foods, ...culturalFoods];

const FOOD_GROUPS: { value: FoodGroup | 'all' | 'cultural'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '🍽️' },
  { value: 'cultural', label: 'Cultural', emoji: '🌍' },
  { value: 'fruits', label: 'Fruits', emoji: '🍎' },
  { value: 'vegetables', label: 'Veggies', emoji: '🥦' },
  { value: 'protein', label: 'Protein', emoji: '🍗' },
  { value: 'grains', label: 'Grains', emoji: '🌾' },
  { value: 'dairy', label: 'Dairy', emoji: '🥛' },
  { value: 'legumes', label: 'Legumes', emoji: '🫘' },
  { value: 'nuts-seeds', label: 'Nuts/Seeds', emoji: '🥜' },
  { value: 'other', label: 'Other', emoji: '🧂' },
];

export default function FoodLibrary() {
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState<FoodGroup | 'all' | 'cultural'>('all');
  const navigate = useNavigate();

  const culturalFoodIds = useMemo(() => new Set(culturalFoods.map(f => f.id)), []);

  const filtered = useMemo(() => {
    return allFoods.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
      const matchesGroup = group === 'all' 
        || (group === 'cultural' && culturalFoodIds.has(f.id))
        || (group !== 'cultural' && f.foodGroup === group);
      return matchesSearch && matchesGroup;
    });
  }, [search, group, culturalFoodIds]);

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <h1 className="text-xl font-black mb-1">Food Library</h1>
      <p className="text-sm text-muted-foreground mb-4">{allFoods.length} foods with safety & serving guides</p>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder='Search foods... (e.g., "is avocado safe?")'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 rounded-full"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-3 mb-3 -mx-1 px-1">
        {FOOD_GROUPS.map(g => (
          <button
            key={g.value}
            onClick={() => setGroup(g.value)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              group === g.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {g.emoji} {g.label}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-2 gap-2">
        {filtered.map(food => (
          <button
            key={food.id}
            onClick={() => navigate(`/foods/${food.id}`)}
            className="p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-sm transition-all text-left"
          >
            <div className="mb-2">
              <FoodImage
                type="food"
                id={food.id}
                name={food.name}
                fallbackEmoji={food.emoji}
                className="w-full h-20 rounded-lg"
                cacheOnly
              />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-sm">{food.name}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {food.chokingHazard && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-destructive/10 text-destructive font-semibold">
                  ⚠️ Choking risk
                </span>
              )}
              {food.allergens.length > 0 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/30 text-accent-foreground font-semibold">
                  🛡️ Allergen
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <div className="text-3xl mb-2">🔍</div>
          <p className="font-semibold">No foods found</p>
          <p className="text-sm">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
