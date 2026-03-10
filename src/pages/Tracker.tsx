import { useState, useMemo, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { foods } from '@/data/foods';
import { AcceptanceLevel, MealType, TextureStage, ReactionSeverity } from '@/types';
import { Plus, Calendar, Trash2, Camera, X, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import PhotoLightbox from '@/components/PhotoLightbox';

const ACCEPTANCE_EMOJI: Record<AcceptanceLevel, string> = { loved: '😍', okay: '😐', refused: '😤' };
const MEAL_EMOJI: Record<MealType, string> = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snack: '🍪' };
const TEXTURE_LABELS: Record<TextureStage, string> = {
  purees: '🥣 Purees',
  mashed: '🥄 Mashed',
  'soft-chunks': '🧊 Soft Chunks',
  'finger-foods': '🤏 Finger Foods',
  regular: '🍽️ Regular',
};

const SEVERITY_CONFIG: Record<string, { label: string; color: string; bgClass: string }> = {
  mild: { label: '🟡 Mild', color: 'text-yellow-700', bgClass: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  moderate: { label: '🟠 Moderate', color: 'text-orange-700', bgClass: 'bg-orange-100 text-orange-800 border-orange-300' },
  severe: { label: '🔴 Severe', color: 'text-red-700', bgClass: 'bg-red-100 text-red-800 border-red-300' },
};

export default function Tracker() {
  const { activeChild, diary, addDiaryEntry, removeDiaryEntry, updateChild } = useApp();
  const { user } = useAuth();
  const [showAdd, setShowAdd] = useState(false);
  const [formFood, setFormFood] = useState('');
  const [formMeal, setFormMeal] = useState<MealType>('lunch');
  const [formAcceptance, setFormAcceptance] = useState<AcceptanceLevel>('okay');
  const [formTexture, setFormTexture] = useState<TextureStage>('purees');
  const [formReaction, setFormReaction] = useState('');
  const [formSeverity, setFormSeverity] = useState<ReactionSeverity>('none');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Allergy prompt state
  const [allergyPromptOpen, setAllergyPromptOpen] = useState(false);
  const [allergyPromptFood, setAllergyPromptFood] = useState('');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

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

  // Check if current food has previous reactions or is a known allergen
  const foodWarning = useMemo(() => {
    if (!activeChild || !formFood.trim()) return null;
    const foodLower = formFood.trim().toLowerCase();

    // Check known allergies
    if (activeChild.knownAllergies?.some(a => a.toLowerCase() === foodLower)) {
      return { type: 'allergy' as const, message: `⚠️ ${formFood} is listed in ${activeChild.name}'s known allergies!` };
    }

    // Check past reactions
    const pastReaction = childDiary.find(
      d => d.foodName.toLowerCase() === foodLower && d.reactionSeverity && d.reactionSeverity !== 'none'
    );
    if (pastReaction) {
      const date = new Date(pastReaction.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return {
        type: 'reaction' as const,
        message: `⚠️ ${activeChild.name} had a ${pastReaction.reactionSeverity} reaction to this food on ${date}: "${pastReaction.reaction}"`,
      };
    }
    return null;
  }, [activeChild, formFood, childDiary]);

  // Collect all photos for the lightbox
  const allPhotos = useMemo(() => {
    return childDiary
      .filter(e => e.photoUrl)
      .map(e => ({ url: e.photoUrl!, alt: `${e.foodName} — ${new Date(e.date + 'T12:00:00').toLocaleDateString()}` }));
  }, [childDiary]);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast('Photo too large', { description: 'Please choose an image under 5MB' });
      return;
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const clearPhoto = () => {
    setPhotoFile(null);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const uploadPhoto = async (entryId: string): Promise<string | null> => {
    if (!photoFile || !user) return null;
    const ext = photoFile.name.split('.').pop() || 'jpg';
    const path = `${user.id}/${entryId}.${ext}`;
    const { error } = await supabase.storage
      .from('diary-photos')
      .upload(path, photoFile, { contentType: photoFile.type, upsert: true });
    if (error) {
      console.error('Photo upload failed:', error);
      return null;
    }
    const { data: urlData } = supabase.storage.from('diary-photos').getPublicUrl(path);
    return urlData.publicUrl;
  };

  const handleAdd = async () => {
    if (!activeChild || !formFood.trim()) return;
    setUploading(true);

    const entryId = crypto.randomUUID();
    const matchedFood = foods.find(f => f.name.toLowerCase() === formFood.toLowerCase());
    const savedFoodName = formFood;

    let photoUrl: string | undefined;
    if (photoFile) {
      const url = await uploadPhoto(entryId);
      if (url) photoUrl = url;
    }

    addDiaryEntry({
      id: entryId,
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
      photoUrl,
    });

    const isNew = !childDiary.some(d => d.foodId === (matchedFood?.id || formFood.toLowerCase().replace(/\s+/g, '-')));
    setFormFood('');
    setFormReaction('');
    setFormSeverity('none');
    clearPhoto();
    setShowAdd(false);
    setUploading(false);

    if (isNew) {
      toast('🎉 New food! +25 XP', { description: `${savedFoodName} added to the diary` });
    } else {
      toast('📝 Food logged! +10 XP');
    }

    // Prompt to add to known allergies if reaction was logged
    if (formSeverity !== 'none' && formReaction.trim()) {
      const alreadyKnown = activeChild.knownAllergies?.some(
        a => a.toLowerCase() === savedFoodName.toLowerCase()
      );
      if (!alreadyKnown) {
        setAllergyPromptFood(savedFoodName);
        setAllergyPromptOpen(true);
      }
    }
  };

  const handleAddToAllergies = () => {
    if (!activeChild || !allergyPromptFood) return;
    const updated = {
      ...activeChild,
      knownAllergies: [...(activeChild.knownAllergies || []), allergyPromptFood],
    };
    updateChild(updated);
    toast('🛡️ Allergy saved', { description: `${allergyPromptFood} added to ${activeChild.name}'s known allergies` });
    setAllergyPromptOpen(false);
    setAllergyPromptFood('');
  };

  const handleDelete = (id: string) => {
    removeDiaryEntry(id);
    toast('🗑️ Entry removed');
  };

  const openLightboxForEntry = (entry: typeof childDiary[0]) => {
    if (!entry.photoUrl) return;
    const idx = allPhotos.findIndex(p => p.url === entry.photoUrl);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };

  if (!activeChild) {
    return <div className="flex items-center justify-center min-h-screen text-muted-foreground">Add a child profile first</div>;
  }

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <div className="mb-5">
        <h1 className="text-xl font-black mb-1">Food Diary</h1>
        <p className="text-sm text-muted-foreground mb-3">{activeChild.name}'s eating log</p>
        <Button className="w-full rounded-full gap-2 h-12 text-base font-bold" onClick={() => setShowAdd(true)}>
          <Plus className="h-5 w-5" /> Log a Meal
        </Button>
        {childDiary.length === 0 && (
          <p className="text-xs text-muted-foreground text-center mt-2">Tap above to record your baby's first food!</p>
        )}
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
        <div className="text-center py-12">
          <div className="text-5xl mb-3">📝</div>
          <p className="font-bold text-foreground mb-1">No entries yet</p>
          <p className="text-sm text-muted-foreground">Every food journey starts with the first bite. Log what your baby ate to start building their food diary!</p>
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
                  <div key={entry.id} className="p-2.5 rounded-lg bg-card border border-border flex items-center gap-2 group">
                    {entry.photoUrl ? (
                      <button
                        onClick={() => openLightboxForEntry(entry)}
                        className="w-10 h-10 rounded-lg overflow-hidden shrink-0 ring-1 ring-border hover:ring-primary transition-all"
                      >
                        <img src={entry.photoUrl} alt={entry.foodName} className="w-full h-full object-cover" />
                      </button>
                    ) : (
                      <span className="text-lg">{MEAL_EMOJI[entry.mealType]}</span>
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold">{entry.foodName}</span>
                      {entry.reaction && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <p className="text-[10px] text-destructive font-medium">{entry.reaction}</p>
                          {entry.reactionSeverity && entry.reactionSeverity !== 'none' && SEVERITY_CONFIG[entry.reactionSeverity] && (
                            <Badge variant="outline" className={`text-[9px] px-1 py-0 h-4 ${SEVERITY_CONFIG[entry.reactionSeverity].bgClass}`}>
                              {entry.reactionSeverity}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-lg">{ACCEPTANCE_EMOJI[entry.acceptance]}</span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="opacity-40 hover:opacity-100 transition-opacity p-1 rounded hover:bg-destructive/10">
                          <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete entry?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Remove "{entry.foodName}" from the diary. This can't be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(entry.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <PhotoLightbox
        images={allPhotos}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      {/* Allergy Prompt Dialog */}
      <AlertDialog open={allergyPromptOpen} onOpenChange={setAllergyPromptOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Add to known allergies?
            </AlertDialogTitle>
            <AlertDialogDescription>
              It looks like {activeChild.name} had a reaction to <strong>{allergyPromptFood}</strong>. Would you like to add it to their known allergies so you'll be warned in the future?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => { setAllergyPromptOpen(false); setAllergyPromptFood(''); }}>
              No, skip
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleAddToAllergies} className="bg-orange-600 hover:bg-orange-700 text-white">
              Yes, save allergy
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={(open) => { setShowAdd(open); if (!open) { clearPhoto(); setFormSeverity('none'); } }}>
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
              {/* Warning banner for known reactive foods */}
              {foodWarning && (
                <div className={`mt-2 p-2.5 rounded-lg border flex items-start gap-2 text-xs font-medium ${
                  foodWarning.type === 'allergy'
                    ? 'bg-red-50 border-red-200 text-red-700'
                    : 'bg-yellow-50 border-yellow-200 text-yellow-800'
                }`}>
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{foodWarning.message}</span>
                </div>
              )}
            </div>

            {/* Photo upload */}
            <div>
              <Label className="font-semibold">Photo (optional)</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoSelect}
                className="hidden"
              />
              {photoPreview ? (
                <div className="mt-1.5 relative inline-block">
                  <img src={photoPreview} alt="Preview" className="w-24 h-24 object-cover rounded-xl border border-border" />
                  <button
                    onClick={clearPhoto}
                    className="absolute -top-1.5 -right-1.5 p-0.5 rounded-full bg-destructive text-destructive-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 mt-1.5">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full gap-1"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4" /> Take Photo
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full gap-1"
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.removeAttribute('capture');
                        fileInputRef.current.click();
                        fileInputRef.current.setAttribute('capture', 'environment');
                      }
                    }}
                  >
                    <ImageIcon className="h-4 w-4" /> Choose
                  </Button>
                </div>
              )}
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
              <Label className="font-semibold">Texture</Label>
              <div className="flex gap-1 mt-1 flex-wrap">
                {(Object.keys(TEXTURE_LABELS) as TextureStage[]).map(stage => (
                  <button
                    key={stage}
                    onClick={() => setFormTexture(stage)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${formTexture === stage ? 'bg-primary/10 ring-2 ring-primary' : 'bg-muted'}`}
                  >
                    {TEXTURE_LABELS[stage]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="font-semibold">Any reaction?</Label>
              <Input placeholder="e.g., mild rash around mouth" value={formReaction} onChange={e => setFormReaction(e.target.value)} className="mt-1" />
              {/* Severity picker — shown when reaction text is entered */}
              {formReaction.trim() && (
                <div className="mt-2">
                  <Label className="text-xs text-muted-foreground">Reaction severity</Label>
                  <div className="flex gap-1.5 mt-1">
                    {(['none', 'mild', 'moderate', 'severe'] as ReactionSeverity[]).map(sev => {
                      const isActive = formSeverity === sev;
                      const config = SEVERITY_CONFIG[sev];
                      return (
                        <button
                          key={sev}
                          onClick={() => setFormSeverity(sev)}
                          className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                            isActive
                              ? sev === 'none'
                                ? 'bg-muted ring-2 ring-primary border-primary'
                                : `${config?.bgClass} ring-2 ring-offset-1`
                              : 'bg-muted border-transparent hover:bg-muted/80'
                          }`}
                        >
                          {sev === 'none' ? '✅ None' : config?.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <Button className="w-full rounded-full" onClick={handleAdd} disabled={!formFood.trim() || uploading}>
              {uploading ? 'Uploading…' : 'Save Entry'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
