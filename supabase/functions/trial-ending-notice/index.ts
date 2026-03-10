import { corsHeaders } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, trial_end_date, price_per_month } = await req.json();

    if (!email || !trial_end_date) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: email, trial_end_date" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const formattedDate = new Date(trial_end_date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const priceDisplay = price_per_month ? `$${price_per_month}/mo` : "the standard rate";

    // For now, log the notification. When email sending is configured,
    // this will send an actual email via the transactional email system.
    console.log(`Trial ending notice for ${email}: trial ends ${formattedDate}`);

    const emailBody = {
      to: email,
      subject: "Your Happy Little Bites free trial is ending soon",
      html: `
        <div style="font-family: 'Nunito', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #ffffff;">
          <div style="text-align: center; margin-bottom: 24px;">
            <span style="font-size: 32px;">🍌</span>
          </div>
          <h1 style="font-size: 22px; font-weight: 800; text-align: center; margin-bottom: 16px; color: #3d2e14;">
            Your free trial ends on ${formattedDate}
          </h1>
          <p style="font-size: 15px; color: #6b5c3e; line-height: 1.6; text-align: center; margin-bottom: 24px;">
            Hi there! Just a friendly heads-up that your 1-month free trial of Happy Little Bites is coming to an end.
          </p>
          <div style="background: #fdf8ef; border: 1px solid #f0e6d0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <p style="font-size: 14px; color: #3d2e14; margin: 0 0 8px 0;">
              <strong>What happens next:</strong>
            </p>
            <p style="font-size: 14px; color: #6b5c3e; margin: 0; line-height: 1.6;">
              If you'd like to continue using Happy Little Bites, your subscription will begin at <strong>${priceDisplay}</strong> after your trial ends. 
              If you'd rather not continue, simply cancel from your account settings — no questions asked.
            </p>
          </div>
          <p style="font-size: 13px; color: #9b8d70; text-align: center; line-height: 1.5;">
            Thank you for being part of our Beta community! Your feedback helps us build a better app for all families. 💛
          </p>
        </div>
      `,
    };

    // Store the notification intent - actual email sending will be wired
    // when a transactional email provider is configured
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Trial ending notice prepared for ${email}`,
        trial_end_date: formattedDate,
        email_body: emailBody
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in trial-ending-notice:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
