import { useState, useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { foods } from '@/data/foods';
import { AcceptanceLevel, MealType, TextureStage, ReactionSeverity } from '@/types';
import { Plus, Calendar } from 'lucide-react';

const ACCEPTANCE_EMOJI: Record<AcceptanceLevel, string> = { loved: '😍', okay: '😐', refused: '😤' };
const MEAL_EMOJI: Record<MealType, string> = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🍪' };

export default function Tracker() {
  const { activeChild, diary, addDiaryEntry } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [formFood, setFormFood] = useState('');
  const [formMeal, setFormMeal] = useState<MealType>('lunch');
  const [formAcceptance, setFormAcceptance] = useState<AcceptanceLevel>('okay');
  const [formTexture, setFormTexture] = useState<TextureStage>('purees');
  const [formReaction, setFormReaction] = useState('');
  const [formSeverity, setFormSeverity] = useState<ReactionSeverity>('none');

  const childDiary = useMemo(() => {
    if (!activeChild) return [];
    return diary.filter(d => d.childId === activeChild.id).slice(0, 50);
  }, [activeChild, diary]);

  const groupedByDate = useMemo(() => {
    const groups: Record<string, typeof childDiary> = {};
    childDiary.forEach(entry => {
      if (!groups[entry.date]) groups[entry.date] = [];
      groups[entry.date].push(entry);
    });
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  }, [childDiary]);

  const handleAdd = () => {
    if (!activeChild || !formFood.trim()) return;
    const matchedFood = foods.find(f => f.name.toLowerCase() === formFood.toLowerCase());
    addDiaryEntry({
      id: crypto.randomUUID(),
      childId: activeChild.id,
      date: new Date().toISOString().split('T')[0],
      foodId: matchedFood?.id || formFood.toLowerCase().replace(/\s+/g, '-'),
      foodName: formFood,
      mealType: formMeal,
      textureStage: formTexture,
      acceptance: formAcceptance,
      reaction: formReaction,
      reactionSeverity: formSeverity,
      notes: '',
    });
    setFormFood('');
    setFormReaction('');
    setShowAdd(false);
  };

  if (!activeChild) {
    return <div className="flex items-center justify-center min-h-screen text-muted-foreground">Add a child profile first</div>;
  }

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-black">Food Diary</h1>
          <p className="text-sm text-muted-foreground">{activeChild.name}'s eating log</p>
        </div>
        <Button size="sm" className="rounded-full gap-1" onClick={() => setShowAdd(true)}>
          <Plus className="h-4 w-4" /> Log Food
        </Button>
      </div>

      {/* Unique Foods Count */}
      <Card className="mb-4 bg-sage/10 border-none">
        <CardContent className="p-3 flex items-center justify-between">
          <span className="text-sm font-semibold">Unique foods tried</span>
          <span className="text-lg font-black text-primary">{new Set(childDiary.map(d => d.foodId)).size}</span>
        </CardContent>
      </Card>

      {/* Diary Entries */}
      {groupedByDate.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <div className="text-4xl mb-2">📝</div>
          <p className="font-semibold">No entries yet</p>
          <p className="text-sm">Log your first food to start tracking!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {groupedByDate.map(([date, entries]) => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-bold text-muted-foreground">
                  {new Date(date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
              </div>
              <div className="space-y-1.5">
                {entries.map(entry => (
                  <div key={entry.id} className="p-2.5 rounded-lg bg-card border border-border flex items-center gap-2">
                    <span className="text-lg">{MEAL_EMOJI[entry.mealType]}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold">{entry.foodName}</span>
                      {entry.reaction && (
                        <p className="text-[10px] text-destructive font-medium">{entry.reaction}</p>
                      )}
                    </div>
                    <span className="text-lg">{ACCEPTANCE_EMOJI[entry.acceptance]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Log a Food</DialogTitle>
            <DialogDescription>Record what {activeChild.name} ate</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="font-semibold">Food name</Label>
              <Input placeholder="e.g., Avocado" value={formFood} onChange={e => setFormFood(e.target.value)} className="mt-1" list="food-suggestions" />
              <datalist id="food-suggestions">
                {foods.map(f => <option key={f.id} value={f.name} />)}
              </datalist>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="font-semibold">Meal</Label>
                <Select value={formMeal} onValueChange={(v) => setFormMeal(v as MealType)}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(MEAL_EMOJI).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v} {k}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-semibold">Acceptance</Label>
                <div className="flex gap-1 mt-1">
                  {(['loved', 'okay', 'refused'] as AcceptanceLevel[]).map(level => (
                    <button
                      key={level}
                      onClick={() => setFormAcceptance(level)}
                      className={`flex-1 p-2 rounded-lg text-center transition-all ${formAcceptance === level ? 'bg-primary/10 ring-2 ring-primary' : 'bg-muted'}`}
                    >
                      <span className="text-lg">{ACCEPTANCE_EMOJI[level]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Label className="font-semibold">Any reaction?</Label>
              <Input placeholder="e.g., mild rash around mouth" value={formReaction} onChange={e => setFormReaction(e.target.value)} className="mt-1" />
            </div>
            <Button className="w-full rounded-full" onClick={handleAdd} disabled={!formFood.trim()}>
              Save Entry
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
