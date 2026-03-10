import { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { SleepEntry, SleepType, SleepQuality } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Trash2, ChevronLeft, ChevronRight, Moon, Sun, Clock, Bed } from 'lucide-react';
import { format, subDays, addDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

function calcDurationHours(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let startMin = sh * 60 + sm;
  let endMin = eh * 60 + em;
  if (endMin <= startMin) endMin += 24 * 60; // overnight
  return Math.round(((endMin - startMin) / 60) * 10) / 10;
}

const qualityOptions: { value: SleepQuality; label: string; emoji: string; color: string }[] = [
  { value: 'poor', label: 'Poor', emoji: '😫', color: 'bg-destructive/20 border-destructive/40 text-destructive' },
  { value: 'fair', label: 'Fair', emoji: '😐', color: 'bg-accent/20 border-accent/40 text-accent-foreground' },
  { value: 'good', label: 'Good', emoji: '😊', color: 'bg-sage/20 border-sage/40 text-sage-foreground' },
  { value: 'great', label: 'Great', emoji: '😴', color: 'bg-primary/20 border-primary/40 text-primary-foreground' },
];

export default function SleepTracker() {
  const { activeChild, getChildAge } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formType, setFormType] = useState<SleepType>('nap');
  const [formStartTime, setFormStartTime] = useState('');
  const [formEndTime, setFormEndTime] = useState('');
  const [formQuality, setFormQuality] = useState<SleepQuality>('good');
  const [formNotes, setFormNotes] = useState('');

  const age = activeChild ? getChildAge(activeChild) : null;

  const loadEntries = useCallback(async () => {
    if (!user || !activeChild) return;
    setLoading(true);
    const { data } = await supabase
      .from('sleep_entries')
      .select('*')
      .eq('user_id', user.id)
      .eq('child_id', activeChild.id)
      .order('date', { ascending: false })
      .order('start_time', { ascending: false });

    setEntries(
      (data || []).map((d: any) => ({
        id: d.id,
        childId: d.child_id,
        date: d.date,
        startTime: d.start_time,
        endTime: d.end_time,
        sleepType: d.sleep_type as SleepType,
        quality: d.quality as SleepQuality,
        notes: d.notes,
      }))
    );
    setLoading(false);
  }, [user, activeChild]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const todayEntries = useMemo(
    () => entries.filter(e => e.date === selectedDate).sort((a, b) => b.startTime.localeCompare(a.startTime)),
    [entries, selectedDate]
  );

  const dailySummary = useMemo(() => {
    const totalHours = todayEntries.reduce((sum, e) => sum + calcDurationHours(e.startTime, e.endTime), 0);
    const naps = todayEntries.filter(e => e.sleepType === 'nap');
    const nighttime = todayEntries.filter(e => e.sleepType === 'nighttime');
    const napHours = naps.reduce((sum, e) => sum + calcDurationHours(e.startTime, e.endTime), 0);
    const nightHours = nighttime.reduce((sum, e) => sum + calcDurationHours(e.startTime, e.endTime), 0);
    return { totalHours: Math.round(totalHours * 10) / 10, napCount: naps.length, napHours: Math.round(napHours * 10) / 10, nightHours: Math.round(nightHours * 10) / 10 };
  }, [todayEntries]);

  const weeklyData = useMemo(() => {
    const weekStart = startOfWeek(new Date(selectedDate), { weekStartsOn: 0 });
    const weekEnd = endOfWeek(new Date(selectedDate), { weekStartsOn: 0 });
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
    return days.map(day => {
      const dateStr = day.toISOString().split('T')[0];
      const dayEntries = entries.filter(e => e.date === dateStr);
      const naps = dayEntries.filter(e => e.sleepType === 'nap').reduce((s, e) => s + calcDurationHours(e.startTime, e.endTime), 0);
      const night = dayEntries.filter(e => e.sleepType === 'nighttime').reduce((s, e) => s + calcDurationHours(e.startTime, e.endTime), 0);
      return { day: format(day, 'EEE'), naps: Math.round(naps * 10) / 10, night: Math.round(night * 10) / 10 };
    });
  }, [entries, selectedDate]);

  const openFormForType = (type: SleepType) => {
    setFormType(type);
    setFormStartTime(type === 'nighttime' ? '20:00' : format(new Date(), 'HH:mm'));
    setFormEndTime(type === 'nighttime' ? '06:00' : '');
    setFormQuality('good');
    setFormNotes('');
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!user || !activeChild || !formStartTime || !formEndTime) return;
    const entry = {
      child_id: activeChild.id,
      user_id: user.id,
      date: selectedDate,
      start_time: formStartTime,
      end_time: formEndTime,
      sleep_type: formType,
      quality: formQuality,
      notes: formNotes,
    };

    const { error } = await supabase.from('sleep_entries').insert(entry);
    if (error) {
      toast({ title: 'Error saving', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: '✅ Sleep logged!' });
    setShowForm(false);
    loadEntries();
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    await supabase.from('sleep_entries').delete().eq('id', id).eq('user_id', user.id);
    setEntries(prev => prev.filter(e => e.id !== id));
    toast({ title: 'Sleep entry removed' });
  };

  const formDuration = formStartTime && formEndTime ? calcDurationHours(formStartTime, formEndTime) : null;

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
          <h1 className="text-xl font-black">Sleep Tracker</h1>
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
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-3 mb-5">
          <button
            onClick={() => openFormForType('nap')}
            className="bg-sky/20 hover:bg-sky/30 p-5 rounded-xl text-center transition-all"
          >
            <Sun className="h-6 w-6 mx-auto mb-1 text-foreground" />
            <span className="text-sm font-bold">😴 Nap</span>
          </button>
          <button
            onClick={() => openFormForType('nighttime')}
            className="bg-lavender/20 hover:bg-lavender/30 p-5 rounded-xl text-center transition-all"
          >
            <Moon className="h-6 w-6 mx-auto mb-1 text-foreground" />
            <span className="text-sm font-bold">🌙 Nighttime</span>
          </button>
        </motion.div>
      )}

      {/* Log Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="mb-5 border-primary/20">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold">{formType === 'nap' ? '😴 Nap' : '🌙 Nighttime Sleep'}</h3>
                <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold">Start Time</Label>
                  <Input type="time" value={formStartTime} onChange={e => setFormStartTime(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs font-semibold">End Time</Label>
                  <Input type="time" value={formEndTime} onChange={e => setFormEndTime(e.target.value)} className="mt-1" />
                </div>
              </div>

              {formDuration !== null && (
                <div className="text-center text-xs font-bold text-primary">
                  Duration: {formDuration} hours
                </div>
              )}

              <div>
                <Label className="text-xs font-semibold">Quality</Label>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {qualityOptions.map(q => (
                    <button
                      key={q.value}
                      onClick={() => setFormQuality(q.value)}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                        formQuality === q.value ? q.color : 'border-border hover:bg-muted'
                      }`}
                    >
                      <div className="text-lg">{q.emoji}</div>
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold">Notes</Label>
                <Textarea placeholder="Any observations..." value={formNotes} onChange={e => setFormNotes(e.target.value)} className="mt-1" rows={2} />
              </div>

              <Button onClick={handleSave} className="w-full gap-2" disabled={!formStartTime || !formEndTime}>
                <Plus className="h-4 w-4" /> Log Sleep
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Daily Summary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="mb-5 bg-lavender/10 border-lavender/20">
          <CardContent className="p-4">
            <h3 className="text-sm font-bold mb-3">Daily Summary</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Bed className="h-3.5 w-3.5" />
                </div>
                <div className="text-xl font-black">{dailySummary.totalHours > 0 ? dailySummary.totalHours : '—'}</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Total Hours</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Sun className="h-3.5 w-3.5" />
                </div>
                <div className="text-xl font-black">{dailySummary.napCount}</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Naps ({dailySummary.napHours}h)</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Moon className="h-3.5 w-3.5" />
                </div>
                <div className="text-xl font-black">{dailySummary.nightHours > 0 ? dailySummary.nightHours : '—'}</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Night Hours</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Entry List */}
      <div className="mb-5">
        <h3 className="text-sm font-bold mb-2">
          {selectedDate === new Date().toISOString().split('T')[0] ? "Today's" : format(new Date(selectedDate), 'MMM d')} Sleep
        </h3>
        {loading ? (
          <p className="text-xs text-muted-foreground">Loading...</p>
        ) : todayEntries.length === 0 ? (
          <Card><CardContent className="p-4 text-center text-xs text-muted-foreground">No sleep logged. Tap a button above to start!</CardContent></Card>
        ) : (
          <div className="space-y-2">
            {todayEntries.map(entry => {
              const duration = calcDurationHours(entry.startTime, entry.endTime);
              const qOpt = qualityOptions.find(q => q.value === entry.quality);
              return (
                <Card key={entry.id}>
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="text-2xl">{entry.sleepType === 'nap' ? '😴' : '🌙'}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold capitalize">{entry.sleepType}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {entry.startTime} – {entry.endTime}
                        </span>
                      </div>
                      <div className="flex gap-3 text-xs text-muted-foreground mt-0.5">
                        <span>{duration}h</span>
                        <span>{qOpt?.emoji} {entry.quality}</span>
                      </div>
                      {entry.notes && <p className="text-xs text-muted-foreground mt-1">{entry.notes}</p>}
                    </div>
                    <button onClick={() => handleDelete(entry.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Weekly Chart */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="mb-5">
          <CardContent className="p-4">
            <h3 className="text-sm font-bold mb-3">Weekly Overview</h3>
            <ChartContainer config={{ naps: { label: 'Nap Hours', color: 'hsl(var(--sky))' }, night: { label: 'Night Hours', color: 'hsl(var(--lavender))' } }} className="h-40">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="naps" fill="var(--color-naps)" radius={[4, 4, 0, 0]} stackId="sleep" />
                <Bar dataKey="night" fill="var(--color-night)" radius={[4, 4, 0, 0]} stackId="sleep" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
