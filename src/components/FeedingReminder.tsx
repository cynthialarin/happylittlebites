import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, BellOff, Clock, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function FeedingReminder() {
  const { user } = useAuth();
  const { activeChild } = useApp();
  const { toast } = useToast();
  const [enabled, setEnabled] = useState(false);
  const [customInterval, setCustomInterval] = useState<number | null>(null);
  const [avgInterval, setAvgInterval] = useState<number | null>(null);
  const [nextFeedTime, setNextFeedTime] = useState<string | null>(null);
  const [pushSupported, setPushSupported] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check push support
  useEffect(() => {
    setPushSupported('serviceWorker' in navigator && 'PushManager' in window);
  }, []);

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw-push.js').catch(err => {
        console.log('SW registration failed:', err);
      });
    }
  }, []);

  // Load existing subscription state from DB
  useEffect(() => {
    if (!user) return;
    supabase
      .from('push_subscriptions')
      .select('reminder_enabled, reminder_interval_hours')
      .eq('user_id', user.id)
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setEnabled(data[0].reminder_enabled);
          setCustomInterval(data[0].reminder_interval_hours);
        }
      });
  }, [user]);

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

    if (!data || data.length < 2) { setAvgInterval(null); return; }

    const timestamps = data.map((d: any) => {
      const [h, m] = d.time.split(':').map(Number);
      const dt = new Date(d.date);
      dt.setHours(h, m, 0, 0);
      return dt.getTime();
    });

    let totalGap = 0, gapCount = 0;
    for (let i = 1; i < timestamps.length; i++) {
      const gap = timestamps[i] - timestamps[i - 1];
      if (gap > 0 && gap < 12 * 60 * 60 * 1000) { totalGap += gap; gapCount++; }
    }
    if (gapCount > 0) setAvgInterval(totalGap / gapCount / (60 * 60 * 1000));
  }, [user, activeChild]);

  useEffect(() => { calcAvgInterval(); }, [calcAvgInterval]);

  // Calculate next feed time display
  useEffect(() => {
    if (!enabled || !user || !activeChild) { setNextFeedTime(null); return; }
    const intervalHours = customInterval || avgInterval || 2.5;

    supabase
      .from('feeding_entries')
      .select('date, time')
      .eq('user_id', user.id)
      .eq('child_id', activeChild.id)
      .order('date', { ascending: false })
      .order('time', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) {
          const [h, m] = data[0].time.split(':').map(Number);
          const lastFeed = new Date(data[0].date);
          lastFeed.setHours(h, m, 0, 0);
          const nextFeed = new Date(lastFeed.getTime() + intervalHours * 60 * 60 * 1000);
          setNextFeedTime(nextFeed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      });
  }, [enabled, customInterval, avgInterval, user, activeChild]);

  const subscribeToPush = async (): Promise<PushSubscription | null> => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: undefined, // VAPID key would go here
      });
      return subscription;
    } catch (err) {
      console.error('Push subscription failed:', err);
      return null;
    }
  };

  const toggleEnabled = async (newEnabled: boolean) => {
    if (!user) return;
    setLoading(true);

    if (newEnabled) {
      // Request notification permission
      if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
        const perm = await Notification.requestPermission();
        if (perm !== 'granted') {
          toast({ title: 'Permission denied', description: 'Enable notifications in browser settings', variant: 'destructive' });
          setLoading(false);
          return;
        }
      }

      // Subscribe to push
      let endpoint = 'browser-notification-fallback';
      let p256dh = 'none';
      let authKey = 'none';

      if (pushSupported) {
        const sub = await subscribeToPush();
        if (sub) {
          endpoint = sub.endpoint;
          const keys = sub.toJSON().keys;
          p256dh = keys?.p256dh || 'none';
          authKey = keys?.auth || 'none';
        }
      }

      // Upsert subscription to DB
      await supabase.from('push_subscriptions').upsert({
        user_id: user.id,
        endpoint,
        p256dh,
        auth: authKey,
        reminder_enabled: true,
        reminder_interval_hours: customInterval,
      }, { onConflict: 'user_id,endpoint' });

      setEnabled(true);
      toast({ title: '🔔 Reminders enabled', description: 'You\'ll get notified when it\'s feeding time' });
    } else {
      // Disable
      await supabase
        .from('push_subscriptions')
        .update({ reminder_enabled: false })
        .eq('user_id', user.id);
      setEnabled(false);
    }

    setLoading(false);
  };

  const updateInterval = async (val: string) => {
    const num = val ? parseFloat(val) : null;
    const interval = num && num > 0 ? num : null;
    setCustomInterval(interval);

    if (user && enabled) {
      await supabase
        .from('push_subscriptions')
        .update({ reminder_interval_hours: interval })
        .eq('user_id', user.id);
    }
  };

  const effectiveInterval = customInterval || avgInterval;

  return (
    <Card className="mb-5 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {enabled ? <Bell className="h-4 w-4 text-primary" /> : <BellOff className="h-4 w-4 text-muted-foreground" />}
            <span className="text-sm font-bold">Feeding Reminders</span>
            {pushSupported && <Smartphone className="h-3 w-3 text-muted-foreground" title="Push notifications supported" />}
          </div>
          <Switch checked={enabled} onCheckedChange={toggleEnabled} disabled={loading} />
        </div>

        {enabled && (
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
                value={customInterval ?? ''}
                onChange={e => updateInterval(e.target.value)}
                className="h-7 text-xs w-24"
              />
            </div>
            {!pushSupported && (
              <p className="text-[10px] text-muted-foreground">
                ⚠️ Push notifications not supported in this browser. Reminders work while the tab is open.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
