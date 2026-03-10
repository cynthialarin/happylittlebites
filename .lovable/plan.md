

## Plan: Update Beta Messaging & Add Trial Tracking in Database

### 1. Update Hero Beta Callout (`src/components/landing/LandingHero.tsx`)

Change line 64 from:
> "🎉 Sign up during Beta → Get 50% off your first 3 months when we launch"

To:
> "🎉 Sign up during Beta — Your first month is FREE!"

### 2. Add `trial_start_date` to Profiles Table

Run a migration to add a `trial_start_date` column to the `profiles` table:
```sql
ALTER TABLE public.profiles ADD COLUMN trial_start_date timestamp with time zone DEFAULT now();
```

This automatically records when each user signed up. The existing `handle_new_user` trigger already creates a profile row on signup, so the default `now()` will capture the trial start automatically.

### 3. Update Signup Flow (`src/contexts/AuthContext.tsx`)

No changes needed — the `handle_new_user` trigger + the new default column handles trial date automatically.

### 4. Update Auth Page Messaging (`src/pages/Auth.tsx`)

Update the signup description from "Create an account to get started" to "Start your free month — no credit card needed" to reinforce the free trial messaging.

### 5. Update Beta Offer Section (`src/components/landing/LandingBetaOffer.tsx`)

Update the messaging to emphasize "First Month FREE" more prominently instead of leading with "50% off first 3 months."

### Files Modified
- `src/components/landing/LandingHero.tsx` — Update beta callout text
- `src/components/landing/LandingBetaOffer.tsx` — Update messaging emphasis
- `src/pages/Auth.tsx` — Update signup description
- Database migration — Add `trial_start_date` column to `profiles`

