
-- Drop all RESTRICTIVE policies and recreate as PERMISSIVE

-- allergen_records
DROP POLICY IF EXISTS "Users can insert own allergen records" ON public.allergen_records;
DROP POLICY IF EXISTS "Users can view own allergen records" ON public.allergen_records;

CREATE POLICY "Users can insert own allergen records" ON public.allergen_records FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own allergen records" ON public.allergen_records FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own allergen records" ON public.allergen_records FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own allergen records" ON public.allergen_records FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- children
DROP POLICY IF EXISTS "Users can delete own children" ON public.children;
DROP POLICY IF EXISTS "Users can insert own children" ON public.children;
DROP POLICY IF EXISTS "Users can update own children" ON public.children;
DROP POLICY IF EXISTS "Users can view own children" ON public.children;

CREATE POLICY "Users can insert own children" ON public.children FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own children" ON public.children FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own children" ON public.children FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own children" ON public.children FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- diary_entries
DROP POLICY IF EXISTS "Users can delete own diary" ON public.diary_entries;
DROP POLICY IF EXISTS "Users can insert own diary" ON public.diary_entries;
DROP POLICY IF EXISTS "Users can view own diary" ON public.diary_entries;

CREATE POLICY "Users can insert own diary" ON public.diary_entries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own diary" ON public.diary_entries FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own diary" ON public.diary_entries FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own diary" ON public.diary_entries FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- exposures
DROP POLICY IF EXISTS "Users can insert own exposures" ON public.exposures;
DROP POLICY IF EXISTS "Users can update own exposures" ON public.exposures;
DROP POLICY IF EXISTS "Users can view own exposures" ON public.exposures;

CREATE POLICY "Users can insert own exposures" ON public.exposures FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own exposures" ON public.exposures FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own exposures" ON public.exposures FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own exposures" ON public.exposures FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- meal_plan_entries
DROP POLICY IF EXISTS "Users can delete own meal plan" ON public.meal_plan_entries;
DROP POLICY IF EXISTS "Users can insert own meal plan" ON public.meal_plan_entries;
DROP POLICY IF EXISTS "Users can view own meal plan" ON public.meal_plan_entries;

CREATE POLICY "Users can insert own meal plan" ON public.meal_plan_entries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own meal plan" ON public.meal_plan_entries FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own meal plan" ON public.meal_plan_entries FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own meal plan" ON public.meal_plan_entries FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- profiles
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- user_preferences
DROP POLICY IF EXISTS "Users can insert own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can update own preferences" ON public.user_preferences;
DROP POLICY IF EXISTS "Users can view own preferences" ON public.user_preferences;

CREATE POLICY "Users can insert own preferences" ON public.user_preferences FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own preferences" ON public.user_preferences FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own preferences" ON public.user_preferences FOR UPDATE TO authenticated USING (auth.uid() = user_id);
