import { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { DiaperEntry, DiaperType } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Trash2, ChevronLeft, ChevronRight, Clock, Droplets } from 'lucide-react';
import { format, subDays, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function DiaperTracker() {
  const { activeChild, getChildAge } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [entries, setEntries] = useState<DiaperEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formType, setFormType] = useState<DiaperType>('wet');
  const [formTime, setFormTime] = useState(format(new Date(), 'HH:mm'));
  const [formColor, setFormColor] = useState('');
  const [formNotes, setFormNotes] = useState('');

  const age = activeChild ? getChildAge(activeChild) : null;

  const loadEntries = useCallback(async () => {
    if (!user || !activeChild) return;
    setLoading(true);
    const { data } = await supabase
      .from('diaper_entries')
      .select('*')
      .eq('user_id', user.id)
      .eq('child_id', activeChild.id)
      .order('date', { ascending: false })
      .order('time', { ascending: false });

    setEntries(
      (data || []).map((d: any) => ({
        id: d.id,
        childId: d.child_id,
        date: d.date,
        time: d.time,
        diaperType: d.diaper_type as DiaperType,
        color: d.color,
        notes: d.notes,
      }))
    );
    setLoading(false);
  }, [user, activeChild]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const todayEntries = useMemo(
    () => entries.filter(e => e.date === selectedDate).sort((a, b) => b.time.localeCompare(a.time)),
    [entries, selectedDate]
  );

  const dailySummary = useMemo(() => {
    const total = todayEntries.length;
    const wet = todayEntries.filter(e => e.diaperType === 'wet' || e.diaperType === 'both').length;
    const dirty = todayEntries.filter(e => e.diaperType === 'dirty' || e.diaperType === 'both').length;
    return { total, wet, dirty };
  }, [todayEntries]);

  const weeklyData = useMemo(() => {
    const weekStart = startOfWeek(new Date(selectedDate), { weekStartsOn: 0 });
    const weekEnd = endOfWeek(new Date(selectedDate), { weekStartsOn: 0 });
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
    return days.map(day => {
      const dateStr = day.toISOString().split('T')[0];
      const dayEntries = entries.filter(e => e.date === dateStr);
      return {
        day: format(day, 'EEE'),
        wet: dayEntries.filter(e => e.diaperType === 'wet' || e.diaperType === 'both').length,
        dirty: dayEntries.filter(e => e.diaperType === 'dirty' || e.diaperType === 'both').length,
      };
    });
  }, [entries, selectedDate]);

  const openFormForType = (type: DiaperType) => {
    setFormType(type);
    setFormTime(format(new Date(), 'HH:mm'));
    setFormColor('');
    setFormNotes('');
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!user || !activeChild) return;
    const entry = {
      child_id: activeChild.id,
      user_id: user.id,
      date: selectedDate,
      time: formTime,
      diaper_type: formType,
      color: formColor,
      notes: formNotes,
    };

    const { error } = await supabase.from('diaper_entries').insert(entry);
    if (error) {
      toast({ title: 'Error saving', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: '✅ Diaper change logged!' });
    setShowForm(false);
    loadEntries();
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    await supabase.from('diaper_entries').delete().eq('id', id).eq('user_id', user.id);
    setEntries(prev => prev.filter(e => e.id !== id));
    toast({ title: 'Entry removed' });
  };

  const diaperEmoji = (type: DiaperType) => {
    if (type === 'wet') return '💧';
    if (type === 'dirty') return '💩';
    if (type === 'both') return '💧💩';
    return '✨';
  };

  if (!activeChild) {
    return (
      <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
        <p className="text-muted-foreground text-center mt-20">Add a child profile first</p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-black">Diaper Tracker</h1>
          <p className="text-xs text-muted-foreground">{activeChild.name} · {age?.label}</p>
        </div>
      </div>

      {/* Date Selector */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setSelectedDate(subDays(new Date(selectedDate), 1).toISOString().split('T')[0])} className="p-2 rounded-lg hover:bg-muted">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-bold">
          {selectedDate === new Date().toISOString().split('T')[0] ? 'Today' : format(new Date(selectedDate), 'MMM d, yyyy')}
        </span>
        <button
          onClick={() => setSelectedDate(addDays(new Date(selectedDate), 1).toISOString().split('T')[0])}
          disabled={selectedDate >= new Date().toISOString().split('T')[0]}
          className="p-2 rounded-lg hover:bg-muted disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Quick Log Buttons */}
      {!showForm && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-2 mb-5">
          {([
            { type: 'wet' as DiaperType, label: '💧 Wet', color: 'bg-sky/20 hover:bg-sky/30' },
            { type: 'dirty' as DiaperType, label: '💩 Dirty', color: 'bg-peach/20 hover:bg-peach/30' },
            { type: 'both' as DiaperType, label: '💧💩 Both', color: 'bg-lavender/20 hover:bg-lavender/30' },
          ]).map(btn => (
            <button
              key={btn.type}
              onClick={() => openFormForType(btn.type)}
              className={`${btn.color} p-4 rounded-xl text-center transition-all`}
            >
              <div className="text-2xl mb-1">{btn.label.split(' ')[0]}</div>
              <span className="text-xs font-bold">{btn.label.split(' ').slice(1).join(' ')}</span>
            </button>
          ))}
        </motion.div>
      )}

      {/* Log Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="mb-5 border-primary/20">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold">{diaperEmoji(formType)} {formType.charAt(0).toUpperCase() + formType.slice(1)} Diaper</h3>
                <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>

              <div>
                <Label className="text-xs font-semibold">Time</Label>
                <Input type="time" value={formTime} onChange={e => setFormTime(e.target.value)} className="mt-1" />
              </div>

              <div>
                <Label className="text-xs font-semibold">Diaper Type</Label>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {(['wet', 'dirty', 'both', 'dry'] as DiaperType[]).map(t => (
                    <button
                      key={t}
                      onClick={() => setFormType(t)}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                        formType === t ? 'bg-primary/20 border-primary/40 text-primary' : 'border-border hover:bg-muted'
                      }`}
                    >
                      <div className="text-lg">{diaperEmoji(t)}</div>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {(formType === 'dirty' || formType === 'both') && (
                <div>
                  <Label className="text-xs font-semibold">Color / Consistency (optional)</Label>
                  <Input placeholder="e.g. yellow, green, soft" value={formColor} onChange={e => setFormColor(e.target.value)} className="mt-1" />
                </div>
              )}

              <div>
                <Label className="text-xs font-semibold">Notes</Label>
                <Textarea placeholder="Any observations..." value={formNotes} onChange={e => setFormNotes(e.target.value)} className="mt-1" rows={2} />
              </div>

              <Button onClick={handleSave} className="w-full gap-2">
                <Plus className="h-4 w-4" /> Log Change
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Daily Summary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="mb-5 bg-sky/10 border-sky/20">
          <CardContent className="p-4">
            <h3 className="text-sm font-bold mb-3">Daily Summary</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xl font-black">{dailySummary.total}</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Total Changes</div>
              </div>
              <div>
                <div className="text-xl font-black">{dailySummary.wet}</div>
                <div className="text-[10px] text-muted-foreground font-semibold">💧 Wet</div>
              </div>
              <div>
                <div className="text-xl font-black">{dailySummary.dirty}</div>
                <div className="text-[10px] text-muted-foreground font-semibold">💩 Dirty</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Entry List */}
      <div className="mb-5">
        <h3 className="text-sm font-bold mb-2">
          {selectedDate === new Date().toISOString().split('T')[0] ? "Today's" : format(new Date(selectedDate), 'MMM d')} Changes
        </h3>
        {loading ? (
          <p className="text-xs text-muted-foreground">Loading...</p>
        ) : todayEntries.length === 0 ? (
          <Card><CardContent className="p-4 text-center text-xs text-muted-foreground">No changes logged. Tap a button above to start!</CardContent></Card>
        ) : (
          <div className="space-y-2">
            {todayEntries.map(entry => (
              <Card key={entry.id}>
                <CardContent className="p-3 flex items-center gap-3">
                  <div className="text-2xl">{diaperEmoji(entry.diaperType)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold capitalize">{entry.diaperType}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {entry.time}
                      </span>
                    </div>
                    {entry.color && <p className="text-xs text-muted-foreground mt-0.5">Color: {entry.color}</p>}
                    {entry.notes && <p className="text-xs text-muted-foreground mt-0.5">{entry.notes}</p>}
                  </div>
                  <button onClick={() => handleDelete(entry.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Weekly Chart */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="mb-5">
          <CardContent className="p-4">
            <h3 className="text-sm font-bold mb-3">Weekly Overview</h3>
            <ChartContainer config={{ wet: { label: 'Wet', color: 'hsl(var(--sky))' }, dirty: { label: 'Dirty', color: 'hsl(var(--peach))' } }} className="h-40">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="wet" fill="var(--color-wet)" radius={[4, 4, 0, 0]} stackId="diaper" />
                <Bar dataKey="dirty" fill="var(--color-dirty)" radius={[4, 4, 0, 0]} stackId="diaper" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
