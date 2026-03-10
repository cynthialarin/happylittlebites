

## Plan: Redesign Landing Page — Beta Messaging, Premium Positioning, Feature-Rich Layout

### Context from Competitor Research
- **Solid Starts**: 7-day free trial, ~$5-6/mo subscription, annual discounts (40% off sales)
- **Huckleberry**: Free basic tier, Plus at $9.99/mo, Premium at $14.99/mo
- **Baby Connect**: $4.99 one-time purchase

### Key Messaging Changes

**Remove all "100% Free / No Paywalls" messaging.** Replace with:
- **Beta badge** in hero: "Currently in Beta — Free for Early Access"
- **Beta reward**: "Sign up during Beta and get 50% off your first 3 months when we launch"
- **Trial CTA**: "Start Your Free 1-Month Trial — No Card Required — Cancel Anytime"
- Update trust bar: replace "100% Free / No Paywalls" with "No Card Required", "Cancel Anytime", "Beta Early Access", "No Data Selling"
- Update FAQs to reflect Beta/pricing model honestly
- Update differentiators section — remove "100% Free, Forever", replace with "Early Access Savings"

### Landing Page Redesign — Structure

The page will be restructured for more impact and stronger CTAs:

1. **Hero** — Punchier headline, beta badge, sub-headline with value prop, TWO CTAs (Start Free Trial + See Features), trust indicators inline
2. **Trust Bar** — "No Card Required | Cancel Anytime | Beta Early Access | Privacy First"
3. **Feature Showcase** (moved UP, immediately visible) — Full 9-feature grid with icons, bold titles, descriptions. Each card slightly larger with more visual weight
4. **App Walkthrough** — Kept but repositioned after features
5. **Stats/Social Proof Section** — New section: "100+ Recipes | 100+ Foods | US & Canada Guidelines | AI-Powered"
6. **How It Works** — 3 steps, kept
7. **Beta Offer CTA** — New prominent section: "Join the Beta — Get 50% Off When We Launch" with urgency
8. **Differentiators** — Updated (remove free messaging)
9. **Testimonial** — Kept
10. **FAQ** — Updated to reflect pricing/beta model
11. **Final CTA** — "Start Your Free Month — No Card Needed"
12. **Footer** — Kept

### Charge Reminder Email

Add a backend function to notify users before charging begins. This will be an edge function (`supabase/functions/trial-ending-notice/index.ts`) that:
- Accepts a user email and trial end date
- Sends an email warning 3 days before trial ends
- Message: "Your free trial ends on [date]. If you don't cancel, your subscription will begin at [price]/mo. Cancel anytime in Settings."

This function will be ready to invoke when payment is integrated later. For now it's the infrastructure.

### Files Modified
- `src/pages/LandingPage.tsx` — Full redesign with new sections, messaging, CTAs
- `src/pages/TermsOfService.tsx` — Update Section 1 and pricing references to reflect Beta/trial model
- `src/pages/PrivacyPolicy.tsx` — Minor update to remove "free forever" language
- `supabase/functions/trial-ending-notice/index.ts` — New edge function for pre-charge email notification

