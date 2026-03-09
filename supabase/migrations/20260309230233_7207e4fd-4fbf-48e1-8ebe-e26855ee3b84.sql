
-- Caregiver invites table
CREATE TABLE public.caregiver_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inviter_id uuid NOT NULL,
  invitee_email text NOT NULL,
  child_name text NOT NULL,
  message text NOT NULL DEFAULT '',
  share_token text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.caregiver_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own invites" ON public.caregiver_invites
  FOR SELECT TO authenticated USING (auth.uid() = inviter_id);

CREATE POLICY "Users can insert own invites" ON public.caregiver_invites
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = inviter_id);

CREATE POLICY "Users can delete own invites" ON public.caregiver_invites
  FOR DELETE TO authenticated USING (auth.uid() = inviter_id);

-- Saved AI recipes table
CREATE TABLE public.saved_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  meal_type text NOT NULL DEFAULT 'lunch',
  emoji text NOT NULL DEFAULT '🍽️',
  ingredients text[] NOT NULL DEFAULT '{}',
  instructions text[] NOT NULL DEFAULT '{}',
  source text NOT NULL DEFAULT 'ai',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved recipes" ON public.saved_recipes
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved recipes" ON public.saved_recipes
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved recipes" ON public.saved_recipes
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can update own saved recipes" ON public.saved_recipes
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
