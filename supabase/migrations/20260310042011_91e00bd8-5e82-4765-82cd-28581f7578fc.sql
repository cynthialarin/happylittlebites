
CREATE TABLE public.sleep_entries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id text NOT NULL,
  user_id uuid NOT NULL,
  date text NOT NULL,
  start_time text NOT NULL,
  end_time text NOT NULL,
  sleep_type text NOT NULL DEFAULT 'nap',
  quality text NOT NULL DEFAULT 'good',
  notes text NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.sleep_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sleep entries" ON public.sleep_entries FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sleep entries" ON public.sleep_entries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sleep entries" ON public.sleep_entries FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own sleep entries" ON public.sleep_entries FOR DELETE TO authenticated USING (auth.uid() = user_id);
