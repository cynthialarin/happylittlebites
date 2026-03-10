import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, CalendarIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { milestoneCategories } from '@/data/milestones';
import { toast } from 'sonner';

interface Achievement {
  milestone_key: string;
  achieved_date: string;
  notes: string;
}

export default function Milestones() {
  const navigate = useNavigate();
  const { activeChild, getChildAge } = useApp();
  const { user } = useAuth();
  const age = activeChild ? getChildAge(activeChild) : null;

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !activeChild) return;
    setLoading(true);
    supabase
      .from('milestone_achievements')
      .select('milestone_key, achieved_date, notes')
      .eq('user_id', user.id)
      .eq('child_id', activeChild.id)
      .then(({ data }) => {
        setAchievements((data as Achievement[]) || []);
        setLoading(false);
      });
  }, [user, activeChild]);

  const isAchieved = useCallback((key: string) => achievements.some(a => a.milestone_key === key), [achievements]);
  const getAchievement = useCallback((key: string) => achievements.find(a => a.milestone_key === key), [achievements]);

  const toggleMilestone = async (key: string) => {
    if (!user || !activeChild) return;

    if (isAchieved(key)) {
      await supabase.from('milestone_achievements').delete().eq('user_id', user.id).eq('child_id', activeChild.id).eq('milestone_key', key);
      setAchievements(prev => prev.filter(a => a.milestone_key !== key));
      toast.success('Milestone unmarked');
    } else {
      const today = new Date().toISOString().split('T')[0];
      const { error } = await supabase.from('milestone_achievements').insert({
        user_id: user.id,
        child_id: activeChild.id,
        milestone_key: key,
        achieved_date: today,
        notes: '',
      });
      if (!error) {
        setAchievements(prev => [...prev, { milestone_key: key, achieved_date: today, notes: '' }]);
        toast.success('Milestone achieved! 🎉');
      }
    }
  };

  const updateDate = async (key: string, date: Date) => {
    if (!user || !activeChild) return;
    const dateStr = date.toISOString().split('T')[0];
    await supabase.from('milestone_achievements').update({ achieved_date: dateStr }).eq('user_id', user.id).eq('child_id', activeChild.id).eq('milestone_key', key);
    setAchievements(prev => prev.map(a => a.milestone_key === key ? { ...a, achieved_date: dateStr } : a));
  };

  const updateNotes = async (key: string, notes: string) => {
    if (!user || !activeChild) return;
    await supabase.from('milestone_achievements').update({ notes }).eq('user_id', user.id).eq('child_id', activeChild.id).eq('milestone_key', key);
    setAchievements(prev => prev.map(a => a.milestone_key === key ? { ...a, notes } : a));
  };

  if (!activeChild) {
    return (
      <div className="px-4 pt-6 pb-4 max-w-lg mx-auto">
        <p className="text-muted-foreground text-center mt-20">Add a child profile first</p>
      </div>
    );
  }

  const totalAchieved = achievements.length;
  const totalMilestones = milestoneCategories.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <div className="px-4 pt-4 pb-24 max-w-lg mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="text-xl font-black mb-1">Developmental Milestones 📈</h1>
      <p className="text-sm text-muted-foreground mb-2">
        {activeChild.name} · {age?.label} · {totalAchieved}/{totalMilestones} achieved
      </p>
      <Progress value={(totalAchieved / totalMilestones) * 100} className="h-2 mb-5" />

      <Tabs defaultValue="feeding">
        <TabsList className="w-full mb-4">
          {milestoneCategories.map(cat => (
            <TabsTrigger key={cat.id} value={cat.id} className="flex-1 text-xs">
              {cat.emoji} {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {milestoneCategories.map(cat => {
          const catAchieved = cat.items.filter(i => isAchieved(i.key)).length;
          const catPercent = Math.round((catAchieved / cat.items.length) * 100);

          return (
            <TabsContent key={cat.id} value={cat.id}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold">{cat.emoji} {cat.label}</span>
                <span className="text-xs text-muted-foreground">{catAchieved}/{cat.items.length} ({catPercent}%)</span>
              </div>
              <Progress value={catPercent} className="h-1.5 mb-4" />

              <div className="space-y-2">
                {cat.items.map(item => {
                  const achieved = isAchieved(item.key);
                  const achievement = getAchievement(item.key);
                  const isExpanded = expandedKey === item.key && achieved;

                  return (
                    <Card key={item.key} className={achieved ? 'border-primary/30 bg-primary/5' : ''}>
                      <CardContent className="p-3">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={achieved}
                            onCheckedChange={() => toggleMilestone(item.key)}
                            className="mt-0.5"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className={`text-sm font-semibold ${achieved ? 'line-through text-muted-foreground' : ''}`}>
                                {item.label}
                              </span>
                              {achieved && (
                                <button onClick={() => setExpandedKey(isExpanded ? null : item.key)} className="p-1">
                                  {isExpanded ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
                                </button>
                              )}
                            </div>
                            <span className="text-[10px] text-muted-foreground font-semibold">{item.ageRange}</span>
                            {achieved && achievement && (
                              <span className="text-[10px] text-primary font-semibold ml-2">
                                ✓ {format(new Date(achievement.achieved_date + 'T00:00:00'), 'MMM d, yyyy')}
                              </span>
                            )}
                          </div>
                        </div>

                        {isExpanded && achievement && (
                          <div className="mt-3 ml-7 space-y-2">
                            <div>
                              <label className="text-xs font-semibold text-muted-foreground">Date achieved</label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" size="sm" className="w-full justify-start text-left text-xs mt-1">
                                    <CalendarIcon className="h-3 w-3 mr-2" />
                                    {format(new Date(achievement.achieved_date + 'T00:00:00'), 'PPP')}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={new Date(achievement.achieved_date + 'T00:00:00')}
                                    onSelect={(d) => d && updateDate(item.key, d)}
                                    disabled={(d) => d > new Date()}
                                    className={cn("p-3 pointer-events-auto")}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-muted-foreground">Notes</label>
                              <Input
                                value={achievement.notes}
                                onChange={(e) => updateNotes(item.key, e.target.value)}
                                placeholder="Add a memory or note..."
                                className="text-xs mt-1 h-8"
                              />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
