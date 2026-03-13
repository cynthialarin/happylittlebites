
CREATE TABLE public.pantry_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  emoji text NOT NULL DEFAULT '🍽️',
  category text NOT NULL DEFAULT 'other',
  location text NOT NULL DEFAULT 'pantry',
  quantity text,
  food_id text,
  upc_code text,
  brand text,
  in_stock boolean NOT NULL DEFAULT true,
  added_via text NOT NULL DEFAULT 'manual',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.pantry_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pantry items" ON public.pantry_items
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pantry items" ON public.pantry_items
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pantry items" ON public.pantry_items
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own pantry items" ON public.pantry_items
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
