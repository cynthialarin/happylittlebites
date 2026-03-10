
CREATE TABLE public.feeding_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id text NOT NULL,
  user_id uuid NOT NULL,
  date text NOT NULL,
  time text NOT NULL,
  feeding_type text NOT NULL,
  amount_oz numeric,
  duration_minutes integer,
  side text,
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.feeding_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own feeding entries"
  ON public.feeding_entries FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own feeding entries"
  ON public.feeding_entries FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own feeding entries"
  ON public.feeding_entries FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own feeding entries"
  ON public.feeding_entries FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
