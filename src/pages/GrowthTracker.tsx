import { useState, useMemo, useEffect, useCallback } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Plus, TrendingUp, Ruler, Weight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GrowthMeasurement {
  id: string;
  date: string;
  weightKg: number | null;
  heightCm: number | null;
  headCm: number | null;
  notes: string;
}

// WHO weight-for-age percentile reference (simplified, boys, 0-24 months)
const WHO_WEIGHT_P50 = [
  { month: 0, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.3 },
  { month: 3, p3: 5.0, p15: 5.6, p50: 6.4, p85: 7.2, p97: 7.9 },
  { month: 6, p3: 6.4, p15: 7.1, p50: 7.9, p85: 8.8, p97: 9.5 },
  { month: 9, p3: 7.2, p15: 8.0, p50: 8.9, p85: 9.9, p97: 10.7 },
  { month: 12, p3: 7.8, p15: 8.6, p50: 9.6, p85: 10.8, p97: 11.8 },
  { month: 18, p3: 8.8, p15: 9.7, p50: 10.9, p85: 12.2, p97: 13.5 },
  { month: 24, p3: 9.7, p15: 10.8, p50: 12.2, p85: 13.6, p97: 15.0 },
];

export default function GrowthTracker() {
  const navigate = useNavigate();
  const { activeChild, getChildAge } = useApp();
  const { user } = useAuth();
  const [showAdd, setShowAdd] = useState(false);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [head, setHead] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [measurements, setMeasurements] = useState<GrowthMeasurement[]>([]);
  const [loading, setLoading] = useState(true);

  const age = activeChild ? getChildAge(activeChild) : null;

  const loadMeasurements = useCallback(async () => {
    if (!user || !activeChild) return;
    setLoading(true);
    const { data } = await supabase
      .from('growth_measurements')
      .select('*')
      .eq('user_id', user.id)
      .eq('child_id', activeChild.id)
      .order('date', { ascending: true });

    setMeasurements(
      (data || []).map((d: any) => ({
        id: d.id,
        date: d.date,
        weightKg: d.weight_kg ? Number(d.weight_kg) : null,
        heightCm: d.height_cm ? Number(d.height_cm) : null,
        headCm: d.head_cm ? Number(d.head_cm) : null,
        notes: d.notes || '',
      }))
    );
    setLoading(false);

    // Migrate localStorage data if any
    try {
      const lsKey = `hlb-growth-${activeChild.id}`;
      const stored = localStorage.getItem(lsKey);
      if (stored) {
        const lsData: any[] = JSON.parse(stored);
        if (lsData.length > 0 && (!data || data.length === 0)) {
          const rows = lsData.map((m: any) => ({
            user_id: user.id,
            child_id: activeChild.id,
            date: m.date,
            weight_kg: m.weightKg ?? null,
            height_cm: m.heightCm ?? null,
            head_cm: m.headCm ?? null,
            notes: m.notes || '',
          }));
          await supabase.from('growth_measurements').insert(rows);
          // Reload after migration
          const { data: newData } = await supabase
            .from('growth_measurements')
            .select('*')
            .eq('user_id', user.id)
            .eq('child_id', activeChild.id)
            .order('date', { ascending: true });
          setMeasurements(
            (newData || []).map((d: any) => ({
              id: d.id,
              date: d.date,
              weightKg: d.weight_kg ? Number(d.weight_kg) : null,
              heightCm: d.height_cm ? Number(d.height_cm) : null,
              headCm: d.head_cm ? Number(d.head_cm) : null,
              notes: d.notes || '',
            }))
          );
        }
        localStorage.removeItem(lsKey);
      }
    } catch {}
  }, [user, activeChild]);

  useEffect(() => {
    loadMeasurements();
  }, [loadMeasurements]);

  const sorted = useMemo(() =>
    [...measurements].sort((a, b) => a.date.localeCompare(b.date)),
    [measurements]
  );

  const weightData = useMemo(() => {
    return sorted
      .filter(m => m.weightKg !== null)
      .map(m => ({
        date: new Date(m.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        weight: m.weightKg,
      }));
  }, [sorted]);

  const heightData = useMemo(() => {
    return sorted
      .filter(m => m.heightCm !== null)
      .map(m => ({
        date: new Date(m.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        height: m.heightCm,
      }));
  }, [sorted]);

  const latestWeight = [...sorted].reverse().find(m => m.weightKg !== null);
  const latestHeight = [...sorted].reverse().find(m => m.heightCm !== null);

  const percentile = useMemo(() => {
    if (!age || !latestWeight?.weightKg) return null;
    const months = age.months;
    const ref = WHO_WEIGHT_P50.reduce((prev, curr) =>
      Math.abs(curr.month - months) < Math.abs(prev.month - months) ? curr : prev
    );
    const w = latestWeight.weightKg;
    if (w >= ref.p97) return '>97th';
    if (w >= ref.p85) return '85th-97th';
    if (w >= ref.p50) return '50th-85th';
    if (w >= ref.p15) return '15th-50th';
    if (w >= ref.p3) return '3rd-15th';
    return '<3rd';
  }, [age, latestWeight]);

  const handleAdd = async () => {
    if (!activeChild || !user) return;
    const w = weight ? parseFloat(weight) : null;
    const h = height ? parseFloat(height) : null;
    const hd = head ? parseFloat(head) : null;
    if (w === null && h === null && hd === null) return;

    const { error } = await supabase.from('growth_measurements').insert({
      user_id: user.id,
      child_id: activeChild.id,
      date,
      weight_kg: w,
      height_cm: h,
      head_cm: hd,
      notes: '',
    });

    if (error) {
      toast('❌ Failed to save measurement');
      return;
    }

    setWeight('');
    setHeight('');
    setHead('');
    setShowAdd(false);
    toast('📏 Measurement saved!');
    loadMeasurements();
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    await supabase.from('growth_measurements').delete().eq('id', id).eq('user_id', user.id);
    setMeasurements(prev => prev.filter(m => m.id !== id));
    toast('🗑️ Measurement removed');
  };

  if (!activeChild) {
    return <div className="flex items-center justify-center min-h-screen text-muted-foreground">Add a child profile first</div>;
  }

  return (
    <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-black">Growth Tracker</h1>
            <p className="text-sm text-muted-foreground">{activeChild.name} • {age?.label}</p>
          </div>
        </div>
        <Button size="sm" className="rounded-full gap-1 h-10 px-4" onClick={() => setShowAdd(true)}>
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <Card className="bg-sky/20 border-none">
          <CardContent className="p-3 text-center">
            <Weight className="h-4 w-4 mx-auto mb-1 text-foreground/70" />
            <div className="text-lg font-black">{latestWeight?.weightKg ? `${latestWeight.weightKg}kg` : '—'}</div>
            <div className="text-[10px] text-muted-foreground font-semibold">Weight</div>
          </CardContent>
        </Card>
        <Card className="bg-sage/20 border-none">
          <CardContent className="p-3 text-center">
            <Ruler className="h-4 w-4 mx-auto mb-1 text-foreground/70" />
            <div className="text-lg font-black">{latestHeight?.heightCm ? `${latestHeight.heightCm}cm` : '—'}</div>
            <div className="text-[10px] text-muted-foreground font-semibold">Height</div>
          </CardContent>
        </Card>
        <Card className="bg-peach/20 border-none">
          <CardContent className="p-3 text-center">
            <TrendingUp className="h-4 w-4 mx-auto mb-1 text-foreground/70" />
            <div className="text-lg font-black">{percentile || '—'}</div>
            <div className="text-[10px] text-muted-foreground font-semibold">Percentile</div>
          </CardContent>
        </Card>
      </div>

      {/* Weight Chart */}
      {weightData.length >= 2 && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <p className="text-sm font-bold mb-3">⚖️ Weight Over Time</p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} unit="kg" />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Height Chart */}
      {heightData.length >= 2 && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <p className="text-sm font-bold mb-3">📏 Height Over Time</p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={heightData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} unit="cm" />
                <Tooltip />
                <Line type="monotone" dataKey="height" stroke="hsl(var(--sage))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Measurement History */}
      {loading ? (
        <p className="text-center text-muted-foreground py-8">Loading...</p>
      ) : sorted.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">📊</div>
          <p className="font-bold text-foreground mb-1">No measurements yet</p>
          <p className="text-sm text-muted-foreground mb-4">Track your baby's growth by logging weight, height, or head circumference after each checkup.</p>
          <Button className="rounded-full gap-2 h-11" onClick={() => setShowAdd(true)}>
            <Plus className="h-4 w-4" /> Add First Measurement
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">History</p>
          {[...sorted].reverse().map(m => (
            <Card key={m.id} className="border-0 shadow-sm">
              <CardContent className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-muted-foreground">
                    {new Date(m.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <div className="flex gap-3 mt-0.5">
                    {m.weightKg && <span className="text-sm font-semibold">{m.weightKg} kg</span>}
                    {m.heightCm && <span className="text-sm font-semibold">{m.heightCm} cm</span>}
                    {m.headCm && <span className="text-sm font-semibold">Head: {m.headCm} cm</span>}
                  </div>
                </div>
                <button onClick={() => handleDelete(m.id)} className="text-muted-foreground hover:text-destructive p-2 rounded-lg hover:bg-destructive/10 transition-colors">
                  <span className="text-sm">✕</span>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Log Measurement</DialogTitle>
            <DialogDescription>Record {activeChild.name}'s growth</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="font-semibold">Date</Label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="font-semibold text-xs">Weight (kg)</Label>
                <Input type="number" step="0.1" placeholder="e.g. 7.5" value={weight} onChange={e => setWeight(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="font-semibold text-xs">Height (cm)</Label>
                <Input type="number" step="0.1" placeholder="e.g. 68" value={height} onChange={e => setHeight(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="font-semibold text-xs">Head (cm)</Label>
                <Input type="number" step="0.1" placeholder="e.g. 44" value={head} onChange={e => setHead(e.target.value)} className="mt-1" />
              </div>
            </div>
            <Button className="w-full rounded-full" onClick={handleAdd} disabled={!weight && !height && !head}>
              Save Measurement
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-6 px-2">
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          📊 Growth data is for informational tracking only and is not a diagnostic tool. Consult your pediatrician for any concerns about your child's growth or development.
        </p>
      </div>
    </div>
  );
}
