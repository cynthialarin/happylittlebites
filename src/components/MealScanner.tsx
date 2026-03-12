import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Camera, Loader2, AlertTriangle, ImagePlus, Check } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { AcceptanceLevel, MealType, TextureStage } from '@/types';
import { foods } from '@/data/foods';

interface DetectedFood {
  name: string;
  texture: TextureStage;
  confidence: 'high' | 'medium' | 'low';
  isAllergen: boolean;
  checked: boolean;
  acceptance: AcceptanceLevel;
}

type ScanStep = 'capture' | 'scanning' | 'review';

const TEXTURE_LABELS: Record<TextureStage, string> = {
  purees: '🥣 Purees',
  mashed: '🥄 Mashed',
  'soft-chunks': '🧊 Soft Chunks',
  'finger-foods': '🤏 Finger Foods',
  regular: '🍽️ Regular',
};

const CONFIDENCE_BADGE: Record<string, string> = {
  high: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-red-100 text-red-800',
};

interface MealScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mealType: MealType;
}

async function compressImage(file: File, maxSizeKB = 1024): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        const MAX_DIM = 1200;
        if (width > MAX_DIM || height > MAX_DIM) {
          const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);

        let quality = 0.8;
        let dataUrl = canvas.toDataURL('image/jpeg', quality);
        while (dataUrl.length > maxSizeKB * 1024 * 1.37 && quality > 0.3) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }
        const base64 = dataUrl.split(',')[1];
        resolve(base64);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function MealScanner({ open, onOpenChange, mealType }: MealScannerProps) {
  const { activeChild, addDiaryEntry, getChildAge } = useApp();
  const { user } = useAuth();
  const [step, setStep] = useState<ScanStep>('capture');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [detectedFoods, setDetectedFoods] = useState<DetectedFood[]>([]);
  const [logging, setLogging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setStep('capture');
    setPhotoPreview(null);
    setPhotoFile(null);
    setImageBase64(null);
    setDetectedFoods([]);
    setLogging(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClose = (val: boolean) => {
    if (!val) reset();
    onOpenChange(val);
  };

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast('Photo too large', { description: 'Please choose an image under 10MB' });
      return;
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    try {
      const b64 = await compressImage(file);
      setImageBase64(b64);
    } catch {
      toast('Failed to process image');
    }
  };

  const handleScan = async () => {
    if (!imageBase64 || !activeChild) return;
    setStep('scanning');

    try {
      const age = getChildAge(activeChild);
      const { data, error } = await supabase.functions.invoke('scan-plate', {
        body: {
          imageBase64,
          childAge: age.label,
          knownAllergies: activeChild.knownAllergies || [],
          mealType,
        },
      });

      if (error) throw error;

      if (data?.error) {
        toast('Scan failed', { description: data.error });
        setStep('capture');
        return;
      }

      const foodList: DetectedFood[] = (data?.foods || []).map((f: any) => ({
        name: f.name,
        texture: f.texture || 'purees',
        confidence: f.confidence || 'medium',
        isAllergen: f.isAllergen || false,
        checked: true,
        acceptance: 'okay' as AcceptanceLevel,
      }));

      if (foodList.length === 0) {
        toast('No foods detected', { description: 'Try a clearer photo of the plate' });
        setStep('capture');
        return;
      }

      setDetectedFoods(foodList);
      setStep('review');
    } catch (err: any) {
      console.error('Scan error:', err);
      toast('Scan failed', { description: err?.message || 'Please try again' });
      setStep('capture');
    }
  };

  const toggleFood = (idx: number) => {
    setDetectedFoods(prev =>
      prev.map((f, i) => (i === idx ? { ...f, checked: !f.checked } : f))
    );
  };

  const updateFoodTexture = (idx: number, texture: TextureStage) => {
    setDetectedFoods(prev =>
      prev.map((f, i) => (i === idx ? { ...f, texture } : f))
    );
  };

  const updateFoodAcceptance = (idx: number, acceptance: AcceptanceLevel) => {
    setDetectedFoods(prev =>
      prev.map((f, i) => (i === idx ? { ...f, acceptance } : f))
    );
  };

  const handleLogAll = async () => {
    if (!activeChild || !user) return;
    const checkedFoods = detectedFoods.filter(f => f.checked);
    if (checkedFoods.length === 0) {
      toast('No foods selected');
      return;
    }

    setLogging(true);
    const today = new Date().toISOString().split('T')[0];

    // Upload photo for first entry
    let photoUrl: string | undefined;
    if (photoFile) {
      const firstId = crypto.randomUUID();
      const ext = photoFile.name.split('.').pop() || 'jpg';
      const path = `${user.id}/${firstId}.${ext}`;
      const { error } = await supabase.storage
        .from('diary-photos')
        .upload(path, photoFile, { contentType: photoFile.type, upsert: true });
      if (!error) {
        const { data: urlData } = supabase.storage.from('diary-photos').getPublicUrl(path);
        photoUrl = urlData.publicUrl;
      }
    }

    checkedFoods.forEach((food, i) => {
      const entryId = crypto.randomUUID();
      const matchedFood = foods.find(f => f.name.toLowerCase() === food.name.toLowerCase());
      addDiaryEntry({
        id: entryId,
        childId: activeChild.id,
        date: today,
        foodId: matchedFood?.id || food.name.toLowerCase().replace(/\s+/g, '-'),
        foodName: food.name,
        mealType,
        textureStage: food.texture,
        acceptance: food.acceptance,
        reaction: '',
        reactionSeverity: 'none',
        notes: 'Logged via plate scan',
        photoUrl: i === 0 ? photoUrl : undefined,
      });
    });

    toast(`📸 ${checkedFoods.length} food${checkedFoods.length > 1 ? 's' : ''} logged!`, {
      description: checkedFoods.map(f => f.name).join(', '),
    });

    handleClose(false);
  };

  const checkedCount = detectedFoods.filter(f => f.checked).length;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" /> Scan Plate
          </DialogTitle>
          <DialogDescription>
            {step === 'capture' && 'Take a photo of your baby\'s plate to auto-log foods'}
            {step === 'scanning' && 'Analyzing plate...'}
            {step === 'review' && 'Review detected foods before logging'}
          </DialogDescription>
        </DialogHeader>

        {step === 'capture' && (
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhotoSelect}
              className="hidden"
            />

            {photoPreview ? (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden border border-border">
                  <img src={photoPreview} alt="Plate preview" className="w-full aspect-[4/3] object-cover" />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => fileInputRef.current?.click()}>
                    Retake
                  </Button>
                  <Button className="flex-1 gap-2" onClick={handleScan} disabled={!imageBase64}>
                    <Camera className="h-4 w-4" /> Scan Foods
                  </Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <ImagePlus className="h-12 w-12 text-muted-foreground/50" />
                <span className="text-sm text-muted-foreground font-medium">
                  Tap to take a photo of the plate
                </span>
              </button>
            )}
          </div>
        )}

        {step === 'scanning' && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground font-medium">Identifying foods...</p>
            {photoPreview && (
              <div className="rounded-xl overflow-hidden border border-border w-48 opacity-60">
                <img src={photoPreview} alt="Scanning..." className="w-full aspect-[4/3] object-cover" />
              </div>
            )}
          </div>
        )}

        {step === 'review' && (
          <div className="space-y-4">
            {photoPreview && (
              <div className="rounded-xl overflow-hidden border border-border">
                <img src={photoPreview} alt="Scanned plate" className="w-full aspect-[4/3] object-cover" />
              </div>
            )}

            <div className="space-y-2">
              {detectedFoods.map((food, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border transition-colors ${
                    food.checked ? 'bg-card border-border' : 'bg-muted/30 border-transparent opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={food.checked}
                      onCheckedChange={() => toggleFood(idx)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold capitalize">{food.name}</span>
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${CONFIDENCE_BADGE[food.confidence]}`}>
                          {food.confidence}
                        </Badge>
                        {food.isAllergen && (
                          <AlertTriangle className="h-3.5 w-3.5 text-destructive shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>

                  {food.checked && (
                    <div className="mt-2 pl-7 flex gap-2">
                      <Select
                        value={food.texture}
                        onValueChange={(v) => updateFoodTexture(idx, v as TextureStage)}
                      >
                        <SelectTrigger className="h-7 text-xs flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(TEXTURE_LABELS).map(([k, v]) => (
                            <SelectItem key={k} value={k} className="text-xs">{v}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={food.acceptance}
                        onValueChange={(v) => updateFoodAcceptance(idx, v as AcceptanceLevel)}
                      >
                        <SelectTrigger className="h-7 text-xs w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="loved" className="text-xs">😍 Loved</SelectItem>
                          <SelectItem value="liked" className="text-xs">😊 Liked</SelectItem>
                          <SelectItem value="okay" className="text-xs">😐 Okay</SelectItem>
                          <SelectItem value="disliked" className="text-xs">😕 Meh</SelectItem>
                          <SelectItem value="refused" className="text-xs">😤 Refused</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button
              className="w-full gap-2 h-11 font-bold"
              onClick={handleLogAll}
              disabled={checkedCount === 0 || logging}
            >
              {logging ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              Log {checkedCount} Food{checkedCount !== 1 ? 's' : ''}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
