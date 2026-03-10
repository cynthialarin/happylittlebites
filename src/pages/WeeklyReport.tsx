import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, eachDayOfInterval, differenceInMonths } from 'date-fns';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Baby, Moon, Droplets, UtensilsCrossed, Star, Copy, Printer, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function WeeklyReport() {
  const navigate = useNavigate();
  const { activeChild, getChildAge } = useApp();
  const { user } = useAuth();
  const { toast } = useToast();
  const [weekOffset, setWeekOffset] = useState(0);

  const currentWeekStart = useMemo(() => {
    const base = startOfWeek(new Date(), { weekStartsOn: 1 });
    return addWeeks(base, weekOffset);
  }, [weekOffset]);

  const currentWeekEnd = useMemo(() => endOfWeek(currentWeekStart, { weekStartsOn: 1 }), [currentWeekStart]);
  const weekDays = useMemo(() => eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd }), [currentWeekStart, currentWeekEnd]);
  const dateStrings = useMemo(() => weekDays.map(d => format(d, 'yyyy-MM-dd')), [weekDays]);

  const childId = activeChild?.id;
  const userId = user?.id;

  const { data: feedingData = [] } = useQuery({
    queryKey: ['weekly-feeding', userId, childId, dateStrings[0]],
    queryFn: async () => {
      if (!userId || !childId) return [];
      const { data } = await supabase.from('feeding_entries').select('*')
        .eq('user_id', userId).eq('child_id', childId)
        .gte('date', dateStrings[0]).lte('date', dateStrings[6]);
      return data || [];
    },
    enabled: !!userId && !!childId,
  });

  const { data: sleepData = [] } = useQuery({
    queryKey: ['weekly-sleep', userId, childId, dateStrings[0]],
    queryFn: async () => {
      if (!userId || !childId) return [];
      const { data } = await supabase.from('sleep_entries').select('*')
        .eq('user_id', userId).eq('child_id', childId)
        .gte('date', dateStrings[0]).lte('date', dateStrings[6]);
      return data || [];
    },
    enabled: !!userId && !!childId,
  });

  const { data: diaperData = [] } = useQuery({
    queryKey: ['weekly-diapers', userId, childId, dateStrings[0]],
    queryFn: async () => {
      if (!userId || !childId) return [];
      const { data } = await supabase.from('diaper_entries').select('*')
        .eq('user_id', userId).eq('child_id', childId)
        .gte('date', dateStrings[0]).lte('date', dateStrings[6]);
      return data || [];
    },
    enabled: !!userId && !!childId,
  });

  const { data: diaryData = [] } = useQuery({
    queryKey: ['weekly-diary', userId, childId, dateStrings[0]],
    queryFn: async () => {
      if (!userId || !childId) return [];
      const { data } = await supabase.from('diary_entries').select('*')
        .eq('user_id', userId).eq('child_id', childId)
        .gte('date', dateStrings[0]).lte('date', dateStrings[6]);
      return data || [];
    },
    enabled: !!userId && !!childId,
  });

  const { data: milestoneData = [] } = useQuery({
    queryKey: ['weekly-milestones', userId, childId, dateStrings[0]],
    queryFn: async () => {
      if (!userId || !childId) return [];
      const { data } = await supabase.from('milestone_achievements').select('*')
        .eq('user_id', userId).eq('child_id', childId)
        .gte('achieved_date', dateStrings[0]).lte('achieved_date', dateStrings[6]);
      return data || [];
    },
    enabled: !!userId && !!childId,
  });

  const { data: allergenData = [] } = useQuery({
    queryKey: ['weekly-allergens', userId, childId, dateStrings[0]],
    queryFn: async () => {
      if (!userId || !childId) return [];
      const { data } = await supabase.from('allergen_records').select('*')
        .eq('user_id', userId).eq('child_id', childId)
        .gte('date_introduced', dateStrings[0]).lte('date_introduced', dateStrings[6]);
      return data || [];
    },
    enabled: !!userId && !!childId,
  });

  // Computed stats
  const feedingStats = useMemo(() => {
    const total = feedingData.length;
    const daysWithData = new Set(feedingData.map(f => f.date)).size || 1;
    const avgPerDay = (total / daysWithData).toFixed(1);
    const byType: Record<string, number> = {};
    let totalOz = 0;
    let bottleCount = 0;
    feedingData.forEach(f => {
      byType[f.feeding_type] = (byType[f.feeding_type] || 0) + 1;
      if (f.amount_oz) { totalOz += Number(f.amount_oz); bottleCount++; }
    });
    const avgOz = bottleCount > 0 ? (totalOz / daysWithData).toFixed(1) : null;
    return { total, avgPerDay, byType, avgOz };
  }, [feedingData]);

  const sleepStats = useMemo(() => {
    const totalNaps = sleepData.filter(s => s.sleep_type === 'nap').length;
    const daysWithData = new Set(sleepData.map(s => s.date)).size || 1;
    let totalMinutes = 0;
    sleepData.forEach(s => {
      const [sh, sm] = s.start_time.split(':').map(Number);
      const [eh, em] = s.end_time.split(':').map(Number);
      let diff = (eh * 60 + em) - (sh * 60 + sm);
      if (diff < 0) diff += 24 * 60;
      totalMinutes += diff;
    });
    const avgHoursPerDay = (totalMinutes / 60 / daysWithData).toFixed(1);
    const avgNapsPerDay = (totalNaps / daysWithData).toFixed(1);
    return { totalEntries: sleepData.length, avgHoursPerDay, avgNapsPerDay };
  }, [sleepData]);

  const diaperStats = useMemo(() => {
    const total = diaperData.length;
    const daysWithData = new Set(diaperData.map(d => d.date)).size || 1;
    const avgPerDay = (total / daysWithData).toFixed(1);
    const wet = diaperData.filter(d => d.diaper_type === 'wet' || d.diaper_type === 'both').length;
    const dirty = diaperData.filter(d => d.diaper_type === 'dirty' || d.diaper_type === 'both').length;
    // Daily breakdown for mini chart
    const dailyCounts = dateStrings.map(ds => diaperData.filter(d => d.date === ds).length);
    return { total, avgPerDay, wet, dirty, dailyCounts };
  }, [diaperData, dateStrings]);

  const foodStats = useMemo(() => {
    const uniqueFoods = new Set(diaryData.map(d => d.food_name)).size;
    const reactions = diaryData.filter(d => d.reaction_severity !== 'none' && d.reaction_severity !== '');
    return { uniqueFoods, reactions: reactions.length, reactionDetails: reactions };
  }, [diaryData]);

  const age = activeChild ? getChildAge(activeChild) : null;

  const typeLabel = (t: string) => {
    switch (t) {
      case 'breast': return 'Breastfeed';
      case 'bottle-formula': return 'Formula';
      case 'bottle-breastmilk': return 'Bottle (BM)';
      default: return t;
    }
  };

  const generateTextSummary = useCallback(() => {
    if (!activeChild) return '';
    const lines = [
      `📋 Weekly Report for ${activeChild.name}`,
      `${age?.label || ''} • ${format(currentWeekStart, 'MMM d')} – ${format(currentWeekEnd, 'MMM d, yyyy')}`,
      '',
      `🍼 FEEDING`,
      `  Total feeds: ${feedingStats.total} (avg ${feedingStats.avgPerDay}/day)`,
      ...Object.entries(feedingStats.byType).map(([k, v]) => `  ${typeLabel(k)}: ${v}`),
      feedingStats.avgOz ? `  Avg bottle intake: ${feedingStats.avgOz} oz/day` : '',
      '',
      `😴 SLEEP`,
      `  Avg sleep: ${sleepStats.avgHoursPerDay} hrs/day`,
      `  Avg naps: ${sleepStats.avgNapsPerDay}/day`,
      '',
      `🧷 DIAPERS`,
      `  Total changes: ${diaperStats.total} (avg ${diaperStats.avgPerDay}/day)`,
      `  Wet: ${diaperStats.wet} | Dirty: ${diaperStats.dirty}`,
      '',
      `🥕 NUTRITION`,
      `  Unique foods: ${foodStats.uniqueFoods}`,
      `  Reactions logged: ${foodStats.reactions}`,
    ];
    if (allergenData.length > 0) {
      lines.push('', `🛡️ ALLERGENS INTRODUCED`);
      allergenData.forEach(a => lines.push(`  ${a.allergen} via ${a.food} (${a.reaction_severity})`));
    }
    if (milestoneData.length > 0) {
      lines.push('', `⭐ MILESTONES ACHIEVED`);
      milestoneData.forEach(m => lines.push(`  ${m.milestone_key} (${m.achieved_date})`));
    }
    lines.push('', '— Generated by Happy Little Bites');
    return lines.filter(l => l !== undefined).join('\n');
  }, [activeChild, age, currentWeekStart, currentWeekEnd, feedingStats, sleepStats, diaperStats, foodStats, allergenData, milestoneData]);

  const copyToClipboard = async () => {
    const text = generateTextSummary();
    await navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: 'Weekly report copied to clipboard' });
  };

  const printReport = () => window.print();

  if (!activeChild) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-6">
        <p className="text-muted-foreground">Select a child profile first</p>
      </div>
    );
  }

  const maxDiaper = Math.max(...diaperStats.dailyCounts, 1);

  return (
    <div className="px-4 pt-6 pb-24 max-w-lg mx-auto print:max-w-none print:px-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-black">📋 Weekly Report</h1>
        </div>
        <p className="text-sm text-muted-foreground ml-9">Share with your pediatrician</p>
      </motion.div>

      {/* Week Selector */}
      <Card className="mb-5">
        <CardContent className="p-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setWeekOffset(w => w - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-center">
            <p className="text-sm font-bold">
              {format(currentWeekStart, 'MMM d')} – {format(currentWeekEnd, 'MMM d, yyyy')}
            </p>
            <p className="text-xs text-muted-foreground">
              {activeChild.avatar} {activeChild.name} • {age?.label}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setWeekOffset(w => Math.min(w + 1, 0))} disabled={weekOffset >= 0}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Feeding Summary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card className="mb-4 bg-peach/10 border-peach/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Baby className="h-4 w-4 text-foreground" />
              <span className="text-sm font-black">Feeding</span>
              <span className="text-xs text-muted-foreground ml-auto">{feedingStats.total} total</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background/60 rounded-lg p-3 text-center">
                <p className="text-2xl font-black">{feedingStats.avgPerDay}</p>
                <p className="text-[10px] text-muted-foreground font-semibold">feeds/day</p>
              </div>
              {feedingStats.avgOz && (
                <div className="bg-background/60 rounded-lg p-3 text-center">
                  <p className="text-2xl font-black">{feedingStats.avgOz}</p>
                  <p className="text-[10px] text-muted-foreground font-semibold">oz/day (bottle)</p>
                </div>
              )}
            </div>
            {Object.keys(feedingStats.byType).length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {Object.entries(feedingStats.byType).map(([type, count]) => (
                  <span key={type} className="text-[10px] bg-background/80 rounded-full px-2 py-0.5 font-semibold">
                    {typeLabel(type)}: {count}
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Sleep Summary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="mb-4 bg-lavender/10 border-lavender/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Moon className="h-4 w-4 text-foreground" />
              <span className="text-sm font-black">Sleep</span>
              <span className="text-xs text-muted-foreground ml-auto">{sleepStats.totalEntries} entries</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background/60 rounded-lg p-3 text-center">
                <p className="text-2xl font-black">{sleepStats.avgHoursPerDay}</p>
                <p className="text-[10px] text-muted-foreground font-semibold">hrs/day avg</p>
              </div>
              <div className="bg-background/60 rounded-lg p-3 text-center">
                <p className="text-2xl font-black">{sleepStats.avgNapsPerDay}</p>
                <p className="text-[10px] text-muted-foreground font-semibold">naps/day avg</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Diaper Summary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card className="mb-4 bg-sky/10 border-sky/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Droplets className="h-4 w-4 text-foreground" />
              <span className="text-sm font-black">Diapers</span>
              <span className="text-xs text-muted-foreground ml-auto">{diaperStats.total} total</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-background/60 rounded-lg p-2 text-center">
                <p className="text-xl font-black">{diaperStats.avgPerDay}</p>
                <p className="text-[10px] text-muted-foreground font-semibold">avg/day</p>
              </div>
              <div className="bg-background/60 rounded-lg p-2 text-center">
                <p className="text-xl font-black">{diaperStats.wet}</p>
                <p className="text-[10px] text-muted-foreground font-semibold">wet</p>
              </div>
              <div className="bg-background/60 rounded-lg p-2 text-center">
                <p className="text-xl font-black">{diaperStats.dirty}</p>
                <p className="text-[10px] text-muted-foreground font-semibold">dirty</p>
              </div>
            </div>
            {/* Mini daily chart */}
            <div className="flex items-end gap-1 h-10">
              {diaperStats.dailyCounts.map((count, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                  <div
                    className="w-full bg-primary/40 rounded-t-sm transition-all"
                    style={{ height: `${(count / maxDiaper) * 32}px`, minHeight: count > 0 ? '4px' : '0px' }}
                  />
                  <span className="text-[8px] text-muted-foreground">{format(weekDays[i], 'EEE').charAt(0)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Nutrition / Food Diary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="mb-4 bg-sage/10 border-sage/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <UtensilsCrossed className="h-4 w-4 text-foreground" />
              <span className="text-sm font-black">Nutrition</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background/60 rounded-lg p-3 text-center">
                <p className="text-2xl font-black">{foodStats.uniqueFoods}</p>
                <p className="text-[10px] text-muted-foreground font-semibold">unique foods</p>
              </div>
              <div className="bg-background/60 rounded-lg p-3 text-center">
                <p className="text-2xl font-black">{foodStats.reactions}</p>
                <p className="text-[10px] text-muted-foreground font-semibold">reactions</p>
              </div>
            </div>
            {foodStats.reactionDetails.length > 0 && (
              <div className="mt-3 space-y-1">
                {foodStats.reactionDetails.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs bg-destructive/10 rounded-lg px-2 py-1.5">
                    <AlertTriangle className="h-3 w-3 text-destructive shrink-0" />
                    <span className="font-semibold">{r.food_name}</span>
                    <span className="text-muted-foreground">— {r.reaction_severity}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Allergens Introduced */}
      {allergenData.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card className="mb-4 bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm">🛡️</span>
                <span className="text-sm font-black">Allergens Introduced</span>
              </div>
              <div className="space-y-1.5">
                {allergenData.map((a, i) => (
                  <div key={i} className="flex items-center justify-between text-xs bg-background/60 rounded-lg px-3 py-2">
                    <span className="font-bold capitalize">{a.allergen}</span>
                    <span className="text-muted-foreground">via {a.food} • {a.reaction_severity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Milestones */}
      {milestoneData.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="mb-4 bg-peach/10 border-peach/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-foreground" />
                <span className="text-sm font-black">Milestones Achieved</span>
              </div>
              <div className="space-y-1.5">
                {milestoneData.map((m, i) => (
                  <div key={i} className="flex items-center justify-between text-xs bg-background/60 rounded-lg px-3 py-2">
                    <span className="font-bold">{m.milestone_key.replace(/-/g, ' ')}</span>
                    <span className="text-muted-foreground">{m.achieved_date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Share Actions */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <div className="flex gap-2 print:hidden">
          <Button className="flex-1" onClick={copyToClipboard}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Summary
          </Button>
          <Button variant="outline" className="flex-1" onClick={printReport}>
            <Printer className="h-4 w-4 mr-2" />
            Print / PDF
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
