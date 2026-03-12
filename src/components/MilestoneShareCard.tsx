import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Download, X } from 'lucide-react';
import { toast } from 'sonner';

interface MilestoneShareCardProps {
  childName: string;
  foodName: string;
  foodEmoji: string;
  foodNumber: number;
  totalFoods?: number;
  onClose: () => void;
}

export default function MilestoneShareCard({
  childName,
  foodName,
  foodEmoji,
  foodNumber,
  totalFoods = 100,
  onClose,
}: MilestoneShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCard = async (): Promise<Blob | null> => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const w = 1080;
    const h = 1080;
    canvas.width = w;
    canvas.height = h;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#E8F5E9');
    grad.addColorStop(0.5, '#FFF8E1');
    grad.addColorStop(1, '#FCE4EC');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Decorative circles
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.arc(150, 150, 200, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FF9800';
    ctx.beginPath();
    ctx.arc(930, 880, 180, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // Food emoji (large)
    ctx.font = '180px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(foodEmoji, w / 2, 340);

    // Child name tried...
    ctx.fillStyle = '#333';
    ctx.font = 'bold 52px system-ui, -apple-system, sans-serif';
    ctx.fillText(`${childName} tried`, w / 2, 460);

    // Food name (big, bold)
    ctx.fillStyle = '#2E7D32';
    ctx.font = 'bold 72px system-ui, -apple-system, sans-serif';
    ctx.fillText(foodName.toUpperCase(), w / 2, 560);

    // "today!" text
    ctx.fillStyle = '#333';
    ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
    ctx.fillText('today!', w / 2, 630);

    // Progress badge
    const badgeY = 730;
    ctx.fillStyle = '#4CAF50';
    const badgeW = 380;
    const badgeH = 80;
    const badgeX = (w - badgeW) / 2;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 40);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    ctx.fillText(`Food #${foodNumber} of ${totalFoods}`, w / 2, badgeY + 52);

    // Progress bar
    const barY = 850;
    const barW = 600;
    const barH = 24;
    const barX = (w - barW) / 2;
    ctx.fillStyle = '#E0E0E0';
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, barH, 12);
    ctx.fill();

    const progress = (foodNumber / totalFoods) * barW;
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.roundRect(barX, barY, progress, barH, 12);
    ctx.fill();

    // Percentage text
    ctx.fillStyle = '#666';
    ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
    ctx.fillText(`${Math.round((foodNumber / totalFoods) * 100)}% complete`, w / 2, barY + 65);

    // Branding
    ctx.fillStyle = '#999';
    ctx.font = '24px system-ui, -apple-system, sans-serif';
    ctx.fillText('🥦 Happy Little Bites', w / 2, h - 50);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png');
    });
  };

  const handleShare = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateCard();
      if (!blob) throw new Error('Failed to generate card');

      const file = new File([blob], `${childName}-tried-${foodName}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `${childName} tried ${foodName}!`,
          text: `${childName} just tried ${foodName}! Food #${foodNumber} of ${totalFoods} 🎉`,
          files: [file],
        });
      } else {
        // Fallback: download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${childName}-tried-${foodName}.png`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Card downloaded! Share it on social media 📱');
      }
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        toast.error('Failed to share');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateCard();
      if (!blob) throw new Error('Failed to generate card');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${childName}-tried-${foodName}.png`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Card saved!');
    } catch {
      toast.error('Failed to save card');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-card rounded-2xl shadow-xl max-w-sm w-full p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black">Share this milestone! 🎉</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Preview */}
        <div className="rounded-xl overflow-hidden bg-gradient-to-br from-sage/30 via-peach/20 to-lavender/30 p-6 text-center">
          <div className="text-6xl mb-3">{foodEmoji}</div>
          <p className="text-sm font-bold text-foreground">{childName} tried</p>
          <p className="text-xl font-black text-primary">{foodName.toUpperCase()}</p>
          <p className="text-sm font-bold text-foreground mb-3">today!</p>
          <div className="inline-block bg-primary text-primary-foreground rounded-full px-4 py-1.5 text-sm font-bold">
            Food #{foodNumber} of {totalFoods}
          </div>
          <div className="mt-3 mx-auto max-w-[200px]">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${(foodNumber / totalFoods) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              {Math.round((foodNumber / totalFoods) * 100)}% complete
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleShare}
            disabled={isGenerating}
            className="flex-1 rounded-full"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            onClick={handleDownload}
            disabled={isGenerating}
            variant="outline"
            className="rounded-full"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
