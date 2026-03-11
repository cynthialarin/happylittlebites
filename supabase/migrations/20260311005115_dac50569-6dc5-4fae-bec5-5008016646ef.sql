
CREATE TABLE public.growth_measurements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  child_id text NOT NULL,
  date text NOT NULL,
  weight_kg numeric NULL,
  height_cm numeric NULL,
  head_cm numeric NULL,
  notes text NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.growth_measurements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own growth measurements"
ON public.growth_measurements FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own growth measurements"
ON public.growth_measurements FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own growth measurements"
ON public.growth_measurements FOR UPDATE TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own growth measurements"
ON public.growth_measurements FOR DELETE TO authenticated
USING (auth.uid() = user_id);
