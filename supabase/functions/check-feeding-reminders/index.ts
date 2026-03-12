import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Get all users with reminders enabled
    const { data: subscriptions, error: subError } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('reminder_enabled', true);

    if (subError || !subscriptions?.length) {
      return new Response(JSON.stringify({ checked: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let sentCount = 0;

    for (const sub of subscriptions) {
      const intervalHours = sub.reminder_interval_hours || 2.5;

      // Get the user's most recent feeding entry
      const { data: feeds } = await supabase
        .from('feeding_entries')
        .select('date, time')
        .eq('user_id', sub.user_id)
        .order('date', { ascending: false })
        .order('time', { ascending: false })
        .limit(1);

      if (!feeds?.length) continue;

      const [h, m] = feeds[0].time.split(':').map(Number);
      const lastFeed = new Date(feeds[0].date);
      lastFeed.setHours(h, m, 0, 0);

      const hoursSince = (Date.now() - lastFeed.getTime()) / (60 * 60 * 1000);

      if (hoursSince >= intervalHours) {
        // Send push notification via send-push function
        try {
          const pushResponse = await fetch(`${supabaseUrl}/functions/v1/send-push`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${serviceRoleKey}`,
            },
            body: JSON.stringify({
              endpoint: sub.endpoint,
              p256dh: sub.p256dh,
              auth: sub.auth,
              title: '🍼 Feeding Reminder',
              body: `It's been ${hoursSince.toFixed(1)} hours since the last feed.`,
              url: '/feeding',
            }),
          });
          if (pushResponse.ok) sentCount++;
        } catch (e) {
          console.error('Failed to send push:', e);
        }
      }
    }

    return new Response(JSON.stringify({ checked: subscriptions.length, sent: sentCount }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
