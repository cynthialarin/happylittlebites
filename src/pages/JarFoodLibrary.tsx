import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { jarFoods, JAR_BRANDS, JarFood } from '@/data/jarFoods';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Search, ArrowLeft, ShieldAlert, Baby, BookOpen } from 'lucide-react';

const STAGE_CONFIG = [
  { value: 0, label: 'All Stages', emoji: '🍽️' },
  { value: 1, label: 'Stage 1', emoji: '🥣', desc: '4-6 months' },
  { value: 2, label: 'Stage 2', emoji: '🥄', desc: '6-9 months' },
  { value: 3, label: 'Stage 3', emoji: '🍲', desc: '9-12+ months' },
] as const;

export default function JarFoodLibrary() {
  const [search, setSearch] = useState('');
  const [stage, setStage] = useState<number>(0);
  const [brand, setBrand] = useState<string>('all');
  const [selected, setSelected] = useState<JarFood | null>(null);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return jarFoods.filter(f => {
      const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.brand.toLowerCase().includes(search.toLowerCase()) ||
        f.ingredients.toLowerCase().includes(search.toLowerCase());
      const matchStage = stage === 0 || f.stage === stage;
      const matchBrand = brand === 'all' || f.brand === brand;
      return matchSearch && matchStage && matchBrand;
    });
  }, [search, stage, brand]);

  const handleLogToDiary = (food: JarFood) => {
    // Navigate to tracker with pre-filled food name
    navigate('/tracker', { state: { prefillFood: `${food.brand} ${food.name}` } });
  };

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground mb-3 hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="text-xl font-black mb-1">🍼 Store-Bought Baby Foods</h1>
      <p className="text-sm text-muted-foreground mb-4">
        {jarFoods.length} products from {JAR_BRANDS.length} brands with allergen & nutrition info
      </p>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder='Search products, brands, ingredients...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 rounded-full"
        />
      </div>

      {/* Stage Filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-3 mb-2 -mx-1 px-1">
        {STAGE_CONFIG.map(s => (
          <button
            key={s.value}
            onClick={() => setStage(s.value)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              stage === s.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      {/* Brand Filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-3 mb-3 -mx-1 px-1">
        <button
          onClick={() => setBrand('all')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            brand === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          All Brands
        </button>
        {JAR_BRANDS.map(b => (
          <button
            key={b.id}
            onClick={() => setBrand(b.name)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              brand === b.name
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {b.emoji} {b.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="space-y-2">
        {filtered.map(food => (
          <button
            key={food.id}
            onClick={() => setSelected(food)}
            className="w-full text-left p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{food.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{food.name}</p>
                <p className="text-xs text-muted-foreground">{food.brand}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant="secondary" className="text-[10px] px-1.5">
                  Stage {food.stage}
                </Badge>
                {food.allergens.length > 0 && (
                  <Badge variant="destructive" className="text-[10px] px-1.5">
                    🛡️ {food.allergens.length} allergen{food.allergens.length > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <div className="text-3xl mb-2">🔍</div>
          <p className="font-semibold">No products found</p>
          <p className="text-sm">Try a different search or filter</p>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-md">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="text-2xl">{selected.emoji}</span>
                  <div>
                    <p className="text-lg">{selected.name}</p>
                    <p className="text-sm font-normal text-muted-foreground">{selected.brand}</p>
                  </div>
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Details for {selected.brand} {selected.name}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-2">
                {/* Quick Info */}
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary">Stage {selected.stage}</Badge>
                  <Badge variant="outline" className="capitalize">{selected.foodGroup}</Badge>
                  <Badge variant="outline">{selected.ageGroup === '6mo' ? '4-6 mo+' : selected.ageGroup === '9mo' ? '6-9 mo+' : '9-12 mo+'}</Badge>
                </div>

                {/* Ingredients */}
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    <BookOpen className="h-3 w-3 inline mr-1" />
                    Ingredients
                  </p>
                  <p className="text-sm bg-muted/50 p-2 rounded-lg">{selected.ingredients}</p>
                </div>

                {/* Allergens */}
                {selected.allergens.length > 0 && (
                  <div className="bg-destructive/10 p-3 rounded-lg">
                    <p className="text-xs font-bold text-destructive uppercase tracking-wider mb-1 flex items-center gap-1">
                      <ShieldAlert className="h-3 w-3" />
                      Allergens
                    </p>
                    <div className="flex gap-1 flex-wrap">
                      {selected.allergens.map(a => (
                        <Badge key={a} variant="destructive" className="text-xs capitalize">{a}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nutrition Notes */}
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                    <Baby className="h-3 w-3 inline mr-1" />
                    Nutrition Notes
                  </p>
                  <p className="text-sm">{selected.nutritionNotes}</p>
                </div>

                {/* Actions */}
                <Button onClick={() => handleLogToDiary(selected)} className="w-full">
                  📝 Log to Food Diary
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
