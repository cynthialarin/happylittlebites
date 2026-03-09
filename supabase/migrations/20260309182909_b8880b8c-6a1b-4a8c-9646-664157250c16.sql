
-- 1. Profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  onboarding_complete boolean NOT NULL DEFAULT false,
  active_child_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- 2. Children table
CREATE TABLE public.children (
  id text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  birthdate text NOT NULL,
  known_allergies text[] NOT NULL DEFAULT '{}',
  feeding_approach text NOT NULL DEFAULT 'combo',
  avatar text NOT NULL DEFAULT '',
  PRIMARY KEY (id, user_id)
);
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own children" ON public.children FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own children" ON public.children FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own children" ON public.children FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own children" ON public.children FOR DELETE USING (auth.uid() = user_id);

-- 3. Diary entries table
CREATE TABLE public.diary_entries (
  id text PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  child_id text NOT NULL,
  date text NOT NULL,
  food_id text NOT NULL DEFAULT '',
  food_name text NOT NULL DEFAULT '',
  meal_type text NOT NULL DEFAULT 'lunch',
  texture_stage text NOT NULL DEFAULT 'purees',
  acceptance text NOT NULL DEFAULT 'okay',
  reaction text NOT NULL DEFAULT '',
  reaction_severity text NOT NULL DEFAULT 'none',
  notes text NOT NULL DEFAULT ''
);
ALTER TABLE public.diary_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own diary" ON public.diary_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own diary" ON public.diary_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own diary" ON public.diary_entries FOR DELETE USING (auth.uid() = user_id);

-- 4. Allergen records table
CREATE TABLE public.allergen_records (
  id text PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  child_id text NOT NULL,
  allergen text NOT NULL,
  date_introduced text NOT NULL,
  food text NOT NULL DEFAULT '',
  reaction_severity text NOT NULL DEFAULT 'none',
  symptoms text[] NOT NULL DEFAULT '{}',
  onset_time text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT ''
);
ALTER TABLE public.allergen_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own allergen records" ON public.allergen_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own allergen records" ON public.allergen_records FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Meal plan entries table
CREATE TABLE public.meal_plan_entries (
  id text PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  child_id text NOT NULL,
  date text NOT NULL,
  meal_type text NOT NULL,
  recipe_id text,
  custom_meal text
);
ALTER TABLE public.meal_plan_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own meal plan" ON public.meal_plan_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own meal plan" ON public.meal_plan_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own meal plan" ON public.meal_plan_entries FOR DELETE USING (auth.uid() = user_id);

-- 6. Exposures table
CREATE TABLE public.exposures (
  id text PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  child_id text NOT NULL,
  food_name text NOT NULL,
  exposure_data jsonb NOT NULL DEFAULT '[]'
);
ALTER TABLE public.exposures ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own exposures" ON public.exposures FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own exposures" ON public.exposures FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own exposures" ON public.exposures FOR UPDATE USING (auth.uid() = user_id);

-- 7. User preferences table
CREATE TABLE public.user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  favorite_recipes text[] NOT NULL DEFAULT '{}',
  tried_recipes text[] NOT NULL DEFAULT '{}',
  food_preferences jsonb NOT NULL DEFAULT '{}'
);
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own preferences" ON public.user_preferences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own preferences" ON public.user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences" ON public.user_preferences FOR UPDATE USING (auth.uid() = user_id);

-- 8. Auto-create profile and preferences on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id) VALUES (NEW.id);
  INSERT INTO public.user_preferences (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
