

# Add Authentication & Migrate Data to Database

## Scope
Add email signup/login, create database tables mirroring the current localStorage schema, and update AppContext to read/write from the database instead of localStorage.

## Database Schema (Single Migration)

**7 tables**, all with `user_id uuid references auth.users(id) on delete cascade not null` and RLS policies restricting access to own data.

1. **profiles** — `id uuid PK`, `user_id`, `onboarding_complete boolean default false`, `active_child_id text`, `created_at`
2. **children** — `id text`, `user_id`, `name text`, `birthdate text`, `known_allergies text[]`, `feeding_approach text`, `avatar text`
3. **diary_entries** — `id text`, `user_id`, `child_id text`, `date text`, `food_id text`, `food_name text`, `meal_type text`, `texture_stage text`, `acceptance text`, `reaction text`, `reaction_severity text`, `notes text`
4. **allergen_records** — `id text`, `user_id`, `child_id text`, `allergen text`, `date_introduced text`, `food text`, `reaction_severity text`, `symptoms text[]`, `onset_time text`, `notes text`
5. **meal_plan_entries** — `id text`, `user_id`, `child_id text`, `date text`, `meal_type text`, `recipe_id text`, `custom_meal text`
6. **exposures** — `id text`, `user_id`, `child_id text`, `food_name text`, `exposure_data jsonb` (the exposures array)
7. **user_preferences** — `id uuid PK`, `user_id`, `favorite_recipes text[] default '{}'`, `tried_recipes text[] default '{}'`, `food_preferences jsonb default '{}'`

**RLS**: Each table gets `select/insert/update/delete` policies using `auth.uid() = user_id`.

**Trigger**: Auto-create `profiles` and `user_preferences` rows on signup via a trigger on `auth.users`.

## Auth Pages

- **Create** `src/pages/Auth.tsx` — email/password login + signup form with toggle, using `supabase.auth.signUp` and `supabase.auth.signInWithPassword`
- **Create** `src/pages/ResetPassword.tsx` — password reset form at `/reset-password`
- **Create** `src/contexts/AuthContext.tsx` — auth state provider wrapping the app, exposing `user`, `loading`, `signOut`

## App Flow Changes

- **`App.tsx`**: Wrap with `AuthProvider`. If not authenticated, show `Auth` page. If authenticated but not onboarded, show `Onboarding`. Otherwise show normal routes. Add `/reset-password` as public route.
- **`AppContext.tsx`**: Replace localStorage read/write with database queries:
  - On mount (when user is set), fetch all data from the 7 tables
  - Each mutation (addChild, addDiaryEntry, etc.) writes to the database and updates local state
  - Remove `STORAGE_KEY` localStorage logic entirely
  - Add a one-time migration: on first login, check if localStorage has data and if the database is empty — if so, bulk-insert the localStorage data into the database, then clear localStorage

## Files to Create/Edit

| File | Action |
|------|--------|
| `src/contexts/AuthContext.tsx` | Create — auth state provider |
| `src/pages/Auth.tsx` | Create — login/signup page |
| `src/pages/ResetPassword.tsx` | Create — password reset page |
| `src/contexts/AppContext.tsx` | Edit — replace localStorage with DB queries |
| `src/App.tsx` | Edit — add AuthProvider, auth routing |

## localStorage Migration Strategy

When a user logs in for the first time:
1. Check if `happy-little-bites` key exists in localStorage
2. Check if the user's database tables are empty
3. If both true, bulk-insert all localStorage data with the new `user_id`
4. Clear the localStorage key
5. Show a toast: "Your data has been synced to the cloud"

