import { useState, useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { allergenInfo, introductionOrder, introductionOrderCA } from '@/data/allergens';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Allergen, AllergenCA, ReactionSeverity } from '@/types';
import { ArrowLeft, Check, AlertTriangle, Info, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AllergenExport from '@/components/AllergenExport';

const SEVERITY_COLORS: Record<ReactionSeverity, string> = {
  none: 'bg-sage/20 text-sage-foreground',
  mild: 'bg-primary/20 text-primary-foreground',
  moderate: 'bg-accent/20 text-accent-foreground',
  severe: 'bg-destructive/20 text-destructive',
};

export default function AllergenTracker() {
  const { activeChild, allergenRecords, addAllergenRecord, settings } = useApp();
  const navigate = useNavigate();
  const [selectedAllergen, setSelectedAllergen] = useState<string | null>(null);
  const [showLog, setShowLog] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [logFood, setLogFood] = useState('');
  const [logSeverity, setLogSeverity] = useState<ReactionSeverity>('none');
  const [logSymptoms, setLogSymptoms] = useState('');

  const isCanada = settings.country === 'CA';
  const order = isCanada ? introductionOrderCA : introductionOrder;
  const visibleAllergens = allergenInfo.filter(a => !a.countryOnly || a.countryOnly === settings.country);
  const totalAllergens = order.length;

  const introduced = useMemo(() => {
    if (!activeChild) return new Set<string>();
    return new Set(allergenRecords.filter(a => a.childId === activeChild.id).map(a => a.allergen));
  }, [activeChild, allergenRecords]);

  const info = selectedAllergen ? visibleAllergens.find(a => a.id === selectedAllergen) : null;

  const handleLog = () => {
    if (!activeChild || !selectedAllergen) return;
    addAllergenRecord({
      id: crypto.randomUUID(),
      childId: activeChild.id,
      allergen: selectedAllergen as Allergen,
      dateIntroduced: new Date().toISOString().split('T')[0],
      food: logFood,
      reactionSeverity: logSeverity,
      symptoms: logSymptoms.split(',').map(s => s.trim()).filter(Boolean),
      onsetTime: '',
      notes: '',
    });
    setShowLog(false);
    setLogFood('');
    setLogSeverity('none');
    setLogSymptoms('');
  };

  if (!activeChild) {
    return <div className="flex items-center justify-center min-h-screen text-muted-foreground">Add a child profile first</div>;
  }

  return (
    <div className="px-4 pt-4 pb-6 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="text-xl font-black mb-1">Allergen Tracker</h1>
      <p className="text-sm text-muted-foreground mb-1">
        {introduced.size} of {totalAllergens} allergens introduced • Recommended order shown below
      </p>
      <p className="text-xs text-muted-foreground mb-4 flex items-center gap-1">
        {isCanada ? '🇨🇦 Health Canada priority allergens' : '🇺🇸 FDA Top 9 allergens'}
      </p>

      {/* Allergen Checklist */}
      <div className="space-y-2 mb-6">
        {order.map((allergenId, i) => {
          const aInfo = visibleAllergens.find(a => a.id === allergenId)!;
          if (!aInfo) return null;
          const isDone = introduced.has(allergenId);
          const childRecords = allergenRecords.filter(r => r.childId === activeChild.id && r.allergen === allergenId);

          return (
            <button
              key={allergenId}
              onClick={() => { setSelectedAllergen(allergenId); }}
              className={`w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                isDone ? 'bg-sage/10 border-sage/30' : 'bg-card border-border hover:border-primary/40'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                isDone ? 'bg-sage text-sage-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {isDone ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{aInfo.emoji}</span>
                  <span className="font-bold text-sm">{aInfo.name}</span>
                  {aInfo.countryOnly === 'CA' && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 font-semibold">🇨🇦 CA</span>
                  )}
                </div>
                {isDone && childRecords.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold mt-0.5 inline-block ${SEVERITY_COLORS[childRecords[childRecords.length - 1].reactionSeverity as ReactionSeverity]}`}>
                    {childRecords[childRecords.length - 1].reactionSeverity === 'none' ? '✅ No reaction' : `⚠️ ${childRecords[childRecords.length - 1].reactionSeverity} reaction`}
                  </span>
                )}
              </div>
              <Info className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </button>
          );
        })}
      </div>

      {/* Allergen Info Dialog */}
      <Dialog open={!!selectedAllergen && !showLog} onOpenChange={(open) => { if (!open) setSelectedAllergen(null); }}>
        <DialogContent className="max-w-md mx-4 max-h-[80vh] overflow-y-auto">
          {info && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="text-2xl">{info.emoji}</span> {info.name}
                </DialogTitle>
                <DialogDescription>{info.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-sm mb-1">🍽️ Common Foods</h3>
                  <div className="flex flex-wrap gap-1">
                    {info.commonFoods.map(f => (
                      <span key={f} className="text-xs px-2 py-0.5 rounded-full bg-muted">{f}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-sm mb-1">💡 Introduction Tips</h3>
                  <ul className="space-y-1">
                    {info.introductionTips.map((tip, i) => (
                      <li key={i} className="text-sm flex gap-2"><span>•</span>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-sm mb-1 flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5 text-destructive" /> Signs of Reaction
                  </h3>
                  <ul className="space-y-1">
                    {info.signsOfReaction.map((sign, i) => (
                      <li key={i} className="text-sm flex gap-2"><span>•</span>{sign}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-primary/10">
                  <p className="text-sm"><strong>Recommended first food:</strong> {info.recommendedFirstFood}</p>
                  <p className="text-xs text-muted-foreground mt-1">{info.waitTime}</p>
                </div>

                <Button className="w-full rounded-full" onClick={() => setShowLog(true)}>
                  {introduced.has(selectedAllergen!) ? 'Log Another Introduction' : 'Log First Introduction'}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <p className="text-[10px] text-muted-foreground text-center px-4 -mt-2 mb-4">
        For informational purposes only. Not a substitute for professional medical advice. Always consult your pediatrician.
      </p>

      {/* Log Introduction Dialog */}
      <Dialog open={showLog} onOpenChange={setShowLog}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Log {info?.name} Introduction</DialogTitle>
            <DialogDescription>Record the introduction for {activeChild.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="font-semibold">Food given</Label>
              <Input placeholder={info?.recommendedFirstFood} value={logFood} onChange={e => setLogFood(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="font-semibold">Reaction severity</Label>
              <div className="grid grid-cols-4 gap-1.5 mt-1">
                {(['none', 'mild', 'moderate', 'severe'] as ReactionSeverity[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setLogSeverity(s)}
                    className={`p-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                      logSeverity === s ? 'ring-2 ring-primary ' + SEVERITY_COLORS[s] : 'bg-muted'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            {logSeverity !== 'none' && (
              <div>
                <Label className="font-semibold">Symptoms (comma separated)</Label>
                <Input placeholder="e.g., hives, vomiting" value={logSymptoms} onChange={e => setLogSymptoms(e.target.value)} className="mt-1" />
              </div>
            )}
            <Button className="w-full rounded-full" onClick={handleLog}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
