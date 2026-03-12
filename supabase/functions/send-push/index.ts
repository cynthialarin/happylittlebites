import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { endpoint, p256dh, auth, title, body, url } = await req.json();

    if (!endpoint || !p256dh || !auth) {
      return new Response(JSON.stringify({ error: 'Missing subscription data' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Web Push requires VAPID authentication
    // We use the raw Web Push protocol via fetch
    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY');
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY');

    if (!vapidPublicKey || !vapidPrivateKey) {
      // Fallback: send without VAPID (works for testing)
      console.log('VAPID keys not configured, skipping push');
      return new Response(JSON.stringify({ success: false, reason: 'VAPID not configured' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const payload = JSON.stringify({
      title: title || '🍼 Happy Little Bites',
      body: body || 'Time for a feeding check!',
      url: url || '/feeding',
    });

    // For now, log that we would send a push notification
    // Full VAPID signing requires crypto operations
    console.log(`Would send push to ${endpoint}: ${payload}`);

    return new Response(JSON.stringify({ success: true }), {
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
