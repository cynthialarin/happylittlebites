import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, BarChart3, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/contexts/AppContext';
import { foods } from '@/data/foods';
import { format, subDays, eachDayOfInterval, startOfWeek, endOfWeek, subWeeks } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { FoodGroup } from '@/types';

const GROUP_EMOJI: Record<string, string> = {
  fruits: '🍎', vegetables: '🥦', grains: '🌾', protein: '🥩',
  dairy: '🧀', legumes: '🫘', 'nuts-seeds': '🥜', other: '🍽️',
};

export default function Insights() {
  const navigate = useNavigate();
  const { activeChild, diary } = useApp();
  const [timeRange, setTimeRange] = useState<7 | 14 | 30>(14);

  const childDiary = useMemo(() => {
    if (!activeChild) return [];
    return diary.filter(d => d.childId === activeChild.id);
  }, [activeChild, diary]);

  // Daily food count over time
  const dailyCounts = useMemo(() => {
    const today = new Date();
    const days = eachDayOfInterval({ start: subDays(today, timeRange - 1), end: today });
    return days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const count = childDiary.filter(d => d.date === dateStr).length;
      return { date: format(day, 'MMM d'), count };
    });
  }, [childDiary, timeRange]);

  // New foods per week (variety trend)
  const weeklyNewFoods = useMemo(() => {
    const today = new Date();
    const weeks: { label: string; newFoods: number }[] = [];
    const seenFoods = new Set<string>();

    // Sort diary chronologically
    const sorted = [...childDiary].sort((a, b) => a.date.localeCompare(b.date));

    for (let i = 3; i >= 0; i--) {
      const weekStart = startOfWeek(subWeeks(today, i));
      const weekEnd = endOfWeek(subWeeks(today, i));
      const label = format(weekStart, 'MMM d');

      let newCount = 0;
      sorted.forEach(entry => {
        const entryDate = new Date(entry.date);
        if (entryDate >= weekStart && entryDate <= weekEnd) {
          const key = entry.foodName.toLowerCase();
          if (!seenFoods.has(key)) {
            seenFoods.add(key);
            newCount++;
          }
        }
      });
      weeks.push({ label, newFoods: newCount });
    }
    return weeks;
  }, [childDiary]);

  // Food group distribution
  const groupDistribution = useMemo(() => {
    const cutoff = format(subDays(new Date(), timeRange), 'yyyy-MM-dd');
    const recent = childDiary.filter(d => d.date >= cutoff);
    const foodMap = new Map(foods.map(f => [f.id, f]));
    const counts: Record<string, number> = {};

    recent.forEach(entry => {
      const food = foodMap.get(entry.foodId);
      const group = food?.foodGroup || 'other';
      counts[group] = (counts[group] || 0) + 1;
    });

    const total = Object.values(counts).reduce((s, c) => s + c, 0) || 1;
    return Object.entries(counts)
      .map(([group, count]) => ({
        group,
        emoji: GROUP_EMOJI[group] || '🍽️',
        count,
        pct: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }, [childDiary, timeRange]);

  // Acceptance trends
  const acceptanceTrend = useMemo(() => {
    const cutoff = format(subDays(new Date(), timeRange), 'yyyy-MM-dd');
    const recent = childDiary.filter(d => d.date >= cutoff);
    const counts = { loved: 0, liked: 0, okay: 0, disliked: 0, refused: 0 };
    recent.forEach(d => {
      if (counts[d.acceptance as keyof typeof counts] !== undefined) {
        counts[d.acceptance as keyof typeof counts]++;
      }
    });
    const total = Object.values(counts).reduce((s, c) => s + c, 0) || 1;
    return Object.entries(counts).map(([level, count]) => ({
      level,
      count,
      pct: Math.round((count / total) * 100),
    }));
  }, [childDiary, timeRange]);

  const ACCEPTANCE_EMOJI: Record<string, string> = {
    loved: '😍', liked: '😊', okay: '😐', disliked: '😕', refused: '🚫',
  };

  // Picky eater score (% refused/disliked over last period)
  const pickyScore = useMemo(() => {
    const cutoff = format(subDays(new Date(), timeRange), 'yyyy-MM-dd');
    const recent = childDiary.filter(d => d.date >= cutoff);
    if (recent.length === 0) return null;
    const negative = recent.filter(d => d.acceptance === 'refused' || d.acceptance === 'disliked').length;
    return Math.round((negative / recent.length) * 100);
  }, [childDiary, timeRange]);

  // Most refused foods
  const topRefused = useMemo(() => {
    const counts: Record<string, number> = {};
    childDiary.filter(d => d.acceptance === 'refused' || d.acceptance === 'disliked').forEach(d => {
      counts[d.foodName] = (counts[d.foodName] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  }, [childDiary]);

  if (!activeChild) {
    return (
      <div className="flex items-center justify-center min-h-screen px-6">
        <p className="text-muted-foreground">Add a child profile first</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 pt-6 pb-4 space-y-5">
      <div className="flex items-center gap-2">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-black">Insights</h1>
          <p className="text-xs text-muted-foreground">{activeChild.name}'s feeding analytics</p>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-1.5">
        {([7, 14, 30] as const).map(d => (
          <button
            key={d}
            onClick={() => setTimeRange(d)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              timeRange === d ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}
          >
            {d}d
          </button>
        ))}
      </div>

      {/* Daily Meals Chart */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold">Daily Meals Logged</span>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyCounts}>
                <XAxis dataKey="date" tick={{ fontSize: 9 }} interval="preserveStartEnd" />
                <YAxis tick={{ fontSize: 10 }} allowDecimals={false} width={20} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* New Foods Variety Trend */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold">New Foods per Week</span>
          </div>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyNewFoods}>
                <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} allowDecimals={false} width={20} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Line type="monotone" dataKey="newFoods" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Food Group Distribution */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-bold mb-3">🥗 Food Group Balance</h3>
          <div className="space-y-2">
            {groupDistribution.map(g => (
              <div key={g.group} className="flex items-center gap-2">
                <span className="text-base w-6 text-center">{g.emoji}</span>
                <span className="text-xs font-bold capitalize w-20 truncate">{g.group}</span>
                <div className="flex-1">
                  <Progress value={g.pct} className="h-2" />
                </div>
                <span className="text-xs font-bold text-muted-foreground w-10 text-right">{g.pct}%</span>
              </div>
            ))}
            {groupDistribution.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">No data yet for this period</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Acceptance Breakdown */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-bold mb-3">😋 Acceptance Breakdown</h3>
          <div className="flex gap-2 flex-wrap">
            {acceptanceTrend.map(a => (
              <div key={a.level} className="flex items-center gap-1.5 bg-muted rounded-full px-3 py-1.5">
                <span className="text-sm">{ACCEPTANCE_EMOJI[a.level]}</span>
                <span className="text-xs font-bold capitalize">{a.level}</span>
                <span className="text-xs text-muted-foreground">{a.pct}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Picky Eater Index */}
      {pickyScore !== null && (
        <Card className={pickyScore > 40 ? 'border-accent/30 bg-accent/5' : 'border-primary/20 bg-primary/5'}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{pickyScore > 40 ? '😬' : pickyScore > 20 ? '🤔' : '😊'}</span>
              <span className="text-sm font-bold">Picky Eater Index</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black">{pickyScore}%</span>
              <p className="text-xs text-muted-foreground flex-1">
                {pickyScore > 40
                  ? 'Higher refusal rate — try the Picky Eater section for strategies!'
                  : pickyScore > 20
                  ? 'Some selective eating — totally normal at this age.'
                  : 'Great acceptance rate! Keep offering variety.'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Most Refused Foods */}
      {topRefused.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-bold mb-3">🚫 Most Refused Foods</h3>
            <div className="space-y-1.5">
              {topRefused.map((f, i) => (
                <div key={f.name} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}.</span>
                  <span className="text-xs font-bold flex-1">{f.name}</span>
                  <span className="text-xs text-muted-foreground">{f.count}x refused</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/more/picky-eater')}
              className="text-xs text-primary font-semibold mt-3 hover:underline"
            >
              Get picky eater tips →
            </button>
          </CardContent>
        </Card>
      )}

      <p className="text-[10px] text-muted-foreground text-center px-4">
        For informational purposes only. Consult your pediatrician for personalized nutrition advice.
      </p>
    </div>
  );
}
