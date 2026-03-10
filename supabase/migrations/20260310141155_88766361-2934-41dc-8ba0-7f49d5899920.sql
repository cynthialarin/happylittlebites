
CREATE TABLE public.diaper_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id text NOT NULL,
  user_id uuid NOT NULL,
  date text NOT NULL,
  time text NOT NULL,
  diaper_type text NOT NULL DEFAULT 'wet',
  color text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.diaper_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own diaper entries" ON public.diaper_entries FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own diaper entries" ON public.diaper_entries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own diaper entries" ON public.diaper_entries FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own diaper entries" ON public.diaper_entries FOR DELETE TO authenticated USING (auth.uid() = user_id);
