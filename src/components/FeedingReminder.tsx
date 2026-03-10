import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, BellOff, Clock } from 'lucide-react';

const STORAGE_KEY = 'feeding-reminder-prefs';

interface ReminderPrefs {
  enabled: boolean;
  customIntervalHours: number | null;
}

function getPrefs(): ReminderPrefs {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { enabled: false, customIntervalHours: null };
}

function savePrefs(prefs: ReminderPrefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

let reminderTimeout: ReturnType<typeof setTimeout> | null = null;

export default function FeedingReminder() {
  const { user } = useAuth();
  const { activeChild } = useApp();
  const [prefs, setPrefs] = useState<ReminderPrefs>(getPrefs);
  const [avgInterval, setAvgInterval] = useState<number | null>(null);
  const [nextFeedTime, setNextFeedTime] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(
    typeof Notification !== 'undefined' && Notification.permission === 'granted'
  );

  // Calculate average interval from last 7 days
  const calcAvgInterval = useCallback(async () => {
    if (!user || !activeChild) return;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const dateStr = sevenDaysAgo.toISOString().split('T')[0];

    const { data } = await supabase
      .from('feeding_entries')
      .select('date, time')
      .eq('user_id', user.id)
      .eq('child_id', activeChild.id)
      .gte('date', dateStr)
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (!data || data.length < 2) {
      setAvgInterval(null);
      return;
    }

    const timestamps = data.map((d: any) => {
      const [h, m] = d.time.split(':').map(Number);
      const dt = new Date(d.date);
      dt.setHours(h, m, 0, 0);
      return dt.getTime();
    });

    let totalGap = 0;
    let gapCount = 0;
    for (let i = 1; i < timestamps.length; i++) {
      const gap = timestamps[i] - timestamps[i - 1];
      if (gap > 0 && gap < 12 * 60 * 60 * 1000) {
        totalGap += gap;
        gapCount++;
      }
    }

    if (gapCount > 0) {
      setAvgInterval(totalGap / gapCount / (60 * 60 * 1000));
    }
  }, [user, activeChild]);

  useEffect(() => {
    calcAvgInterval();
  }, [calcAvgInterval]);

  // Schedule next reminder
  const scheduleReminder = useCallback(async () => {
    if (reminderTimeout) clearTimeout(reminderTimeout);
    if (!prefs.enabled || !permissionGranted) return;

    const intervalHours = prefs.customIntervalHours || avgInterval || 2.5;

    // Get last feed time
    if (!user || !activeChild) return;
    const { data } = await supabase
      .from('feeding_entries')
      .select('date, time')
      .eq('user_id', user.id)
      .eq('child_id', activeChild.id)
      .order('date', { ascending: false })
      .order('time', { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
      const [h, m] = data[0].time.split(':').map(Number);
      const lastFeed = new Date(data[0].date);
      lastFeed.setHours(h, m, 0, 0);
      const nextFeed = new Date(lastFeed.getTime() + intervalHours * 60 * 60 * 1000);
      const now = Date.now();
      const delay = nextFeed.getTime() - now;

      setNextFeedTime(nextFeed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

      if (delay > 0) {
        reminderTimeout = setTimeout(() => {
          new Notification('🍼 Feeding Reminder', {
            body: `It's been about ${intervalHours.toFixed(1)} hours since ${activeChild.name}'s last feed.`,
            icon: '/favicon.ico',
          });
        }, delay);
      }
    }
  }, [prefs, avgInterval, permissionGranted, user, activeChild]);

  useEffect(() => {
    scheduleReminder();
    return () => {
      if (reminderTimeout) clearTimeout(reminderTimeout);
    };
  }, [scheduleReminder]);

  const toggleEnabled = async (enabled: boolean) => {
    if (enabled && typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
      const perm = await Notification.requestPermission();
      setPermissionGranted(perm === 'granted');
      if (perm !== 'granted') return;
    }
    const newPrefs = { ...prefs, enabled };
    setPrefs(newPrefs);
    savePrefs(newPrefs);
  };

  const setCustomInterval = (val: string) => {
    const num = val ? parseFloat(val) : null;
    const newPrefs = { ...prefs, customIntervalHours: num && num > 0 ? num : null };
    setPrefs(newPrefs);
    savePrefs(newPrefs);
  };

  const effectiveInterval = prefs.customIntervalHours || avgInterval;

  return (
    <Card className="mb-5 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {prefs.enabled ? <Bell className="h-4 w-4 text-primary" /> : <BellOff className="h-4 w-4 text-muted-foreground" />}
            <span className="text-sm font-bold">Feeding Reminders</span>
          </div>
          <Switch checked={prefs.enabled} onCheckedChange={toggleEnabled} />
        </div>

        {prefs.enabled && (
          <div className="space-y-2 mt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {effectiveInterval ? (
                <span>Avg interval: {effectiveInterval.toFixed(1)}h</span>
              ) : (
                <span>Log a few feeds to auto-detect interval</span>
              )}
            </div>
            {nextFeedTime && (
              <p className="text-xs font-semibold text-primary">Next reminder at ~{nextFeedTime}</p>
            )}
            <div className="flex items-center gap-2">
              <Label className="text-xs font-semibold whitespace-nowrap">Custom interval (hours)</Label>
              <Input
                type="number"
                min="0.5"
                step="0.5"
                placeholder={effectiveInterval ? effectiveInterval.toFixed(1) : '2.5'}
                value={prefs.customIntervalHours ?? ''}
                onChange={e => setCustomInterval(e.target.value)}
                className="h-7 text-xs w-24"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
