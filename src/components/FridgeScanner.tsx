import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Refrigerator, ImagePlus, Loader2, X } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { supabase } from '@/integrations/supabase/client';

export interface DetectedIngredient {
  name: string;
  category: string;
  confidence: string;
}

interface FridgeScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIngredientsDetected: (ingredients: DetectedIngredient[]) => void;
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
        resolve(dataUrl.split(',')[1]);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const CATEGORY_EMOJI: Record<string, string> = {
  fruit: '🍎', vegetable: '🥦', protein: '🥩', dairy: '🥛', grain: '🌾', legume: '🫘', other: '🍽️',
};

export default function FridgeScanner({ open, onOpenChange, onIngredientsDetected }: FridgeScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<DetectedIngredient[]>([]);
  const [step, setStep] = useState<'capture' | 'scanning' | 'review'>('capture');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setStep('capture');
    setPhotoPreview(null);
    setIngredients([]);
    setScanning(false);
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
    setPhotoPreview(URL.createObjectURL(file));
    setStep('scanning');
    setScanning(true);

    try {
      const base64 = await compressImage(file);
      const { data, error } = await supabase.functions.invoke('scan-fridge', {
        body: { imageBase64: base64 },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      const detected: DetectedIngredient[] = data?.ingredients || [];
      if (detected.length === 0) {
        toast('No ingredients detected', { description: 'Try a clearer photo' });
        setStep('capture');
        return;
      }
      setIngredients(detected);
      setStep('review');
    } catch (err: any) {
      console.error('Fridge scan error:', err);
      toast('Scan failed', { description: err?.message || 'Please try again' });
      setStep('capture');
    } finally {
      setScanning(false);
    }
  };

  const removeIngredient = (idx: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== idx));
  };

  const handleUseIngredients = () => {
    onIngredientsDetected(ingredients);
    handleClose(false);
    toast(`🧊 ${ingredients.length} ingredients loaded!`, { description: 'Generating meals from your fridge...' });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Refrigerator className="h-5 w-5" /> Scan My Fridge
          </DialogTitle>
          <DialogDescription>
            {step === 'capture' && 'Take a photo of your fridge or pantry to find ingredients'}
            {step === 'scanning' && 'Detecting ingredients...'}
            {step === 'review' && 'Review detected ingredients — remove any that are wrong'}
          </DialogDescription>
        </DialogHeader>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handlePhotoSelect}
          className="hidden"
        />

        {step === 'capture' && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <ImagePlus className="h-12 w-12 text-muted-foreground/50" />
            <span className="text-sm text-muted-foreground font-medium">Tap to photograph your fridge</span>
          </button>
        )}

        {step === 'scanning' && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground font-medium">Identifying ingredients...</p>
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
                <img src={photoPreview} alt="Fridge" className="w-full aspect-[4/3] object-cover" />
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {ingredients.map((ing, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="text-sm py-1.5 px-3 gap-1.5 cursor-default"
                >
                  <span>{CATEGORY_EMOJI[ing.category] || '🍽️'}</span>
                  <span className="capitalize">{ing.name}</span>
                  <button onClick={() => removeIngredient(idx)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            {ingredients.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => { reset(); fileInputRef.current?.click(); }}>
                  Rescan
                </Button>
                <Button className="flex-1 gap-2" onClick={handleUseIngredients}>
                  Use {ingredients.length} Ingredients
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
