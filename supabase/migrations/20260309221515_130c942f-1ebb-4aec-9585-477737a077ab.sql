-- Grocery list items table
CREATE TABLE public.grocery_list_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  amount text,
  unit text,
  checked boolean NOT NULL DEFAULT false,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.grocery_list_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own grocery items" ON public.grocery_list_items
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own grocery items" ON public.grocery_list_items
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own grocery items" ON public.grocery_list_items
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own grocery items" ON public.grocery_list_items
  FOR DELETE TO authenticated USING (auth.uid() = user_id);