
CREATE TABLE public.milestone_achievements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id text NOT NULL,
  user_id uuid NOT NULL,
  milestone_key text NOT NULL,
  achieved_date text NOT NULL,
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (child_id, milestone_key)
);

ALTER TABLE public.milestone_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own milestone achievements" ON public.milestone_achievements FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own milestone achievements" ON public.milestone_achievements FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own milestone achievements" ON public.milestone_achievements FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own milestone achievements" ON public.milestone_achievements FOR DELETE TO authenticated USING (auth.uid() = user_id);
