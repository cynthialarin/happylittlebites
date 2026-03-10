import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ChevronLeft, ChevronRight, Baby, Moon, Sun, Droplets, Clock } from 'lucide-react';
import { format, subDays, addDays } from 'date-fns';

interface TimelineItem {
  id: string;
  time: string;
  type: 'feeding' | 'sleep' | 'diaper';
  emoji: string;
  label: string;
  details: string;
  color: string;
}

function calcDurationHours(start: string, end: string): number {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let startMin = sh * 60 + sm;
  let endMin = eh * 60 + em;
  if (endMin <= startMin) endMin += 24 * 60;
  return Math.round(((endMin - startMin) / 60) * 10) / 10;
}

export default function DailyTimeline() {
  const { activeChild, getChildAge } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [feedingEntries, setFeedingEntries] = useState<any[]>([]);
  const [sleepEntries, setSleepEntries] = useState<any[]>([]);
  const [diaperEntries, setDiaperEntries] = useState<any[]>([]);
  const [milestoneEntries, setMilestoneEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const age = activeChild ? getChildAge(activeChild) : null;

  useEffect(() => {
    if (!user || !activeChild) return;
    setLoading(true);
    Promise.all([
      supabase.from('feeding_entries').select('*').eq('user_id', user.id).eq('child_id', activeChild.id).eq('date', selectedDate),
      supabase.from('sleep_entries').select('*').eq('user_id', user.id).eq('child_id', activeChild.id).eq('date', selectedDate),
      supabase.from('diaper_entries').select('*').eq('user_id', user.id).eq('child_id', activeChild.id).eq('date', selectedDate),
      supabase.from('milestone_achievements').select('*').eq('user_id', user.id).eq('child_id', activeChild.id).eq('achieved_date', selectedDate),
    ]).then(([f, s, d, m]) => {
      setFeedingEntries(f.data || []);
      setSleepEntries(s.data || []);
      setDiaperEntries(d.data || []);
      setMilestoneEntries(m.data || []);
      setLoading(false);
    });
  }, [user, activeChild, selectedDate]);

  const timelineItems = useMemo<TimelineItem[]>(() => {
    const items: TimelineItem[] = [];

    feedingEntries.forEach(f => {
      const typeLabel = f.feeding_type === 'breast' ? 'Breast' : f.feeding_type === 'bottle-breastmilk' ? 'Bottle (BM)' : 'Bottle (Formula)';
      const details = [f.amount_oz ? `${f.amount_oz}oz` : null, f.duration_minutes ? `${f.duration_minutes}min` : null, f.side ? `${f.side} side` : null].filter(Boolean).join(' · ');
      items.push({
        id: `feed-${f.id}`,
        time: f.time,
        type: 'feeding',
        emoji: f.feeding_type === 'breast' ? '🤱' : '🍼',
        label: typeLabel,
        details,
        color: 'bg-peach/20 border-peach/30',
      });
    });

    sleepEntries.forEach(s => {
      const duration = calcDurationHours(s.start_time, s.end_time);
      items.push({
        id: `sleep-${s.id}`,
        time: s.start_time,
        type: 'sleep',
        emoji: s.sleep_type === 'nap' ? '😴' : '🌙',
        label: s.sleep_type === 'nap' ? 'Nap' : 'Nighttime Sleep',
        details: `${s.start_time}–${s.end_time} (${duration}h) · ${s.quality}`,
        color: 'bg-lavender/20 border-lavender/30',
      });
    });

    diaperEntries.forEach(d => {
      const emoji = d.diaper_type === 'wet' ? '💧' : d.diaper_type === 'dirty' ? '💩' : d.diaper_type === 'both' ? '💧💩' : '✨';
      items.push({
        id: `diaper-${d.id}`,
        time: d.time,
        type: 'diaper',
        emoji,
        label: `${d.diaper_type.charAt(0).toUpperCase() + d.diaper_type.slice(1)} Diaper`,
        details: d.color ? `Color: ${d.color}` : '',
        color: 'bg-sky/20 border-sky/30',
      });
    });

    return items.sort((a, b) => a.time.localeCompare(b.time));
  }, [feedingEntries, sleepEntries, diaperEntries]);

  const totals = useMemo(() => {
    const totalFeeds = feedingEntries.length;
    const totalSleepHours = sleepEntries.reduce((sum: number, s: any) => sum + calcDurationHours(s.start_time, s.end_time), 0);
    const totalDiapers = diaperEntries.length;
    return { totalFeeds, totalSleepHours: Math.round(totalSleepHours * 10) / 10, totalDiapers };
  }, [feedingEntries, sleepEntries, diaperEntries]);

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
          <h1 className="text-xl font-black">Daily Timeline</h1>
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

      {/* Daily Totals */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="mb-5 bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <h3 className="text-sm font-bold mb-3">Day at a Glance</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Baby className="h-3.5 w-3.5" />
                </div>
                <div className="text-xl font-black">{totals.totalFeeds}</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Feeds</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Moon className="h-3.5 w-3.5" />
                </div>
                <div className="text-xl font-black">{totals.totalSleepHours > 0 ? `${totals.totalSleepHours}h` : '—'}</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Sleep</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Droplets className="h-3.5 w-3.5" />
                </div>
                <div className="text-xl font-black">{totals.totalDiapers}</div>
                <div className="text-[10px] text-muted-foreground font-semibold">Diapers</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Timeline */}
      <div className="mb-5">
        <h3 className="text-sm font-bold mb-3">Timeline</h3>
        {loading ? (
          <p className="text-xs text-muted-foreground">Loading...</p>
        ) : timelineItems.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">📋</div>
              <p className="text-sm text-muted-foreground">No entries for this day yet.</p>
              <p className="text-xs text-muted-foreground mt-1">Log feeds, sleep, or diaper changes to see them here.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-border" />

            <div className="space-y-3">
              {timelineItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative flex items-start gap-3 pl-2"
                >
                  {/* Dot */}
                  <div className="relative z-10 w-7 h-7 rounded-full bg-background border-2 border-border flex items-center justify-center text-sm shrink-0">
                    {item.emoji}
                  </div>

                  {/* Content */}
                  <Card className={`flex-1 border ${item.color}`}>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {item.time}
                        </span>
                        <span className="text-sm font-bold">{item.label}</span>
                      </div>
                      {item.details && (
                        <p className="text-xs text-muted-foreground mt-0.5">{item.details}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
