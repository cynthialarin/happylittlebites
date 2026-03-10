import { useState } from 'react';
import { ShieldAlert, X, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function SafetyButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-50 w-12 h-12 rounded-full bg-destructive text-destructive-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Safety & First Aid"
      >
        <ShieldAlert className="h-5 w-5" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" /> Emergency Quick Reference
            </DialogTitle>
            <DialogDescription>
              Quick access to choking and allergy emergency info
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <h3 className="font-bold text-destructive mb-2">🚨 If baby is choking:</h3>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Stay calm — check if they can cough or cry</li>
                <li>If silent/can't breathe: 5 back blows between shoulder blades</li>
                <li>5 chest thrusts (2 fingers, center of chest)</li>
                <li>Alternate back blows and chest thrusts</li>
                <li><strong>Call 911 if not resolved</strong></li>
              </ol>
            </div>

            <div className="p-4 rounded-lg bg-accent/30 border border-accent/40">
              <h3 className="font-bold text-accent-foreground mb-2">⚠️ Choking vs Gagging:</h3>
              <div className="text-sm space-y-2">
                <p><strong>Gagging</strong> (NORMAL): Noisy, coughing, red face, eyes watering. Baby is protecting themselves. Don't intervene.</p>
                <p><strong>Choking</strong> (EMERGENCY): Silent, can't cry/cough, turning blue. ACT IMMEDIATELY.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h3 className="font-bold mb-2">🤧 Allergic Reaction Signs:</h3>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li><strong>Mild:</strong> Hives, rash, runny nose, mild swelling</li>
                <li><strong>Severe (call 911):</strong> Difficulty breathing, throat tightness, vomiting, limpness, swollen tongue</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="destructive"
                className="gap-2"
                onClick={() => window.open('tel:911')}
              >
                <Phone className="h-4 w-4" /> Call 911
              </Button>
              <Button
                variant="outline"
                className="gap-2 border-primary/30 text-primary hover:bg-primary/10"
                onClick={() => window.open('tel:1-800-222-1222')}
              >
                <Phone className="h-4 w-4" /> Poison Control
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
