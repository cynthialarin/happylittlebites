import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone } from 'lucide-react';

export default function Safety() {
  const navigate = useNavigate();

  return (
    <div className="px-4 pt-4 pb-6 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="text-xl font-black mb-4">Safety & First Aid 🚨</h1>

      {/* Emergency Banner */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        <Button variant="destructive" className="gap-2" onClick={() => window.open('tel:911')}>
          <Phone className="h-4 w-4" /> Call 911
        </Button>
        <Button variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary/10" onClick={() => window.open('tel:1-800-222-1222')}>
          <Phone className="h-4 w-4" /> Poison Control
        </Button>
      </div>

      {/* Choking vs Gagging */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <h2 className="font-bold mb-3">Choking vs. Gagging</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-sage/10">
              <h3 className="font-bold text-sm text-sage-foreground mb-2">✅ Gagging (Normal)</h3>
              <ul className="text-xs space-y-1">
                <li>• Noisy, coughing sounds</li>
                <li>• Red face</li>
                <li>• Eyes watering</li>
                <li>• Tongue pushing forward</li>
                <li>• Can still breathe</li>
              </ul>
              <p className="text-xs font-semibold mt-2 text-sage-foreground">DO: Stay calm. Don't intervene. Let baby work it out.</p>
            </div>
            <div className="p-3 rounded-lg bg-destructive/10">
              <h3 className="font-bold text-sm text-destructive mb-2">🚨 Choking (Emergency)</h3>
              <ul className="text-xs space-y-1">
                <li>• Silent — no sound</li>
                <li>• Can't cry or cough</li>
                <li>• Turning blue</li>
                <li>• Panicked look</li>
                <li>• Can't breathe</li>
              </ul>
              <p className="text-xs font-semibold mt-2 text-destructive">DO: Act immediately! See steps below.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Choking Steps */}
      <Card className="mb-4 bg-destructive/5 border-destructive/20">
        <CardContent className="p-4">
          <h2 className="font-bold mb-3">If Baby is Choking (Under 1 year)</h2>
          <ol className="space-y-3">
            {[
              { step: 'Check', desc: 'If baby can cough/cry, encourage them to cough. Only intervene if SILENT.' },
              { step: '5 Back Blows', desc: 'Lay baby face-down on your forearm. Give 5 firm back blows between shoulder blades with heel of hand.' },
              { step: '5 Chest Thrusts', desc: 'Turn baby face-up. Place 2 fingers on center of chest (just below nipple line). Give 5 firm thrusts.' },
              { step: 'Repeat', desc: 'Alternate 5 back blows and 5 chest thrusts until object comes out or baby starts breathing.' },
              { step: 'Call 911', desc: 'If not resolved quickly, call 911. If baby becomes unconscious, begin infant CPR.' },
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                <div>
                  <span className="font-bold text-sm">{s.step}</span>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Toddler Choking */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <h2 className="font-bold mb-3">If Toddler is Choking (Over 1 year)</h2>
          <ol className="space-y-2 text-sm">
            <li className="flex gap-2"><span className="font-bold">1.</span> Stand behind child, wrap arms around waist</li>
            <li className="flex gap-2"><span className="font-bold">2.</span> Make a fist with one hand, place it above the belly button</li>
            <li className="flex gap-2"><span className="font-bold">3.</span> Grasp fist with other hand</li>
            <li className="flex gap-2"><span className="font-bold">4.</span> Give quick upward thrusts (Heimlich maneuver)</li>
            <li className="flex gap-2"><span className="font-bold">5.</span> Repeat until object comes out or call 911</li>
          </ol>
        </CardContent>
      </Card>

      {/* Top Choking Hazards */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <h2 className="font-bold mb-2">⚠️ Top Choking Hazards</h2>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              'Whole grapes', 'Hot dogs (whole/round)', 'Raw carrots', 'Raw apple slices',
              'Popcorn', 'Whole nuts', 'Hard candy', 'Chunks of cheese',
              'Cherry tomatoes (whole)', 'Thick nut butter globs', 'Marshmallows', 'Sausage rounds'
            ].map(item => (
              <span key={item} className="text-xs px-2 py-1.5 rounded-lg bg-destructive/5 text-sm">{item}</span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Allergic Reaction */}
      <Card>
        <CardContent className="p-4">
          <h2 className="font-bold mb-3">🤧 Allergic Reaction Severity Guide</h2>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-sage/10">
              <h3 className="font-bold text-xs mb-1">MILD — Monitor at home</h3>
              <p className="text-xs">Hives (a few), runny nose, mild rash, slight lip swelling, minor stomach discomfort</p>
            </div>
            <div className="p-3 rounded-lg bg-primary/10">
              <h3 className="font-bold text-xs mb-1">MODERATE — Call pediatrician</h3>
              <p className="text-xs">Widespread hives, vomiting, significant swelling, persistent stomach pain, eczema flare</p>
            </div>
            <div className="p-3 rounded-lg bg-destructive/10">
              <h3 className="font-bold text-xs mb-1">SEVERE — Call 911 immediately</h3>
              <p className="text-xs">Difficulty breathing, throat tightness, drooling, turning blue, dizziness, limpness, swollen tongue, multiple body systems affected</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-[10px] text-muted-foreground text-center mt-5 px-4">
        For informational purposes only. Not a substitute for professional medical advice. Always consult your pediatrician.
      </p>
    </div>
  );
}
