import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { ChildProfile, DiaryEntry, AllergenRecord, MealPlanEntry, ExposureRecord, AppSettings, MealType, Country, Gender } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AppState {
  children: ChildProfile[];
  diary: DiaryEntry[];
  allergenRecords: AllergenRecord[];
  mealPlan: MealPlanEntry[];
  exposures: ExposureRecord[];
  favoriteRecipes: string[];
  triedRecipes: string[];
  foodPreferences: Record<string, Record<string, 'loves' | 'meh' | 'refuses'>>;
  settings: AppSettings;
}

interface AppContextType extends AppState {
  addChild: (child: ChildProfile) => void;
  updateChild: (child: ChildProfile) => void;
  removeChild: (id: string) => void;
  setActiveChild: (id: string) => void;
  activeChild: ChildProfile | null;
  addDiaryEntry: (entry: DiaryEntry) => void;
  updateDiaryEntry: (entry: DiaryEntry) => void;
  removeDiaryEntry: (id: string) => void;
  addAllergenRecord: (record: AllergenRecord) => void;
  toggleFavoriteRecipe: (id: string) => void;
  toggleTriedRecipe: (id: string) => void;
  addExposure: (foodName: string, childId: string, accepted: boolean) => void;
  addMealPlanEntry: (entry: MealPlanEntry) => void;
  removeMealPlanEntry: (id: string) => void;
  clearWeekPlan: (childId: string, dates: string[]) => void;
  setFoodPreference: (childId: string, foodName: string, pref: 'loves' | 'meh' | 'refuses' | null) => void;
  clearFoodPreferences: (childId: string) => void;
  setCountry: (country: Country) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  completeOnboarding: () => void;
  getChildAge: (child: ChildProfile) => { months: number; label: string };
  loading: boolean;
}

const defaultSettings: AppSettings = {
  onboardingComplete: false,
  activeChildId: null,
  theme: 'system',
  country: 'US',
};

const defaultState: AppState = {
  children: [],
  diary: [],
  allergenRecords: [],
  mealPlan: [],
  exposures: [],
  favoriteRecipes: [],
  triedRecipes: [],
  foodPreferences: {},
  settings: defaultSettings,
};

const STORAGE_KEY = 'happy-little-bites';

function applyTheme(theme: 'light' | 'dark' | 'system') {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else if (theme === 'light') {
    root.classList.remove('dark');
  } else {
    // system
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(function AppProvider({ children: reactChildren }, _ref) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [state, setState] = useState<AppState>(defaultState);
  const [loading, setLoading] = useState(true);
  const migrationDone = useRef(false);

  // Apply theme on mount and when system preference changes
  useEffect(() => {
    const saved = localStorage.getItem('hlb-theme') as 'light' | 'dark' | 'system' | null;
    const theme = saved || 'system';
    if (saved) {
      setState(prev => ({ ...prev, settings: { ...prev.settings, theme } }));
    }
    applyTheme(theme);

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      const current = localStorage.getItem('hlb-theme') || 'system';
      if (current === 'system') applyTheme('system');
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Load all data from database when user is available
  useEffect(() => {
    if (!user) {
      setState(defaultState);
      setLoading(false);
      return;
    }

    const loadData = async () => {
      setLoading(true);

      // Safety timeout: never let loading hang longer than 15s
      const timeoutPromise = new Promise<'timeout'>((resolve) =>
        setTimeout(() => resolve('timeout'), 15000)
      );

      try {
        // Check for localStorage migration first
        await migrateLocalStorage(user.id);

        const dataPromise = Promise.all([
          supabase.from('profiles').select('*').eq('user_id', user.id).single(),
          supabase.from('children').select('*').eq('user_id', user.id),
          supabase.from('diary_entries').select('*').eq('user_id', user.id),
          supabase.from('allergen_records').select('*').eq('user_id', user.id),
          supabase.from('meal_plan_entries').select('*').eq('user_id', user.id),
          supabase.from('exposures').select('*').eq('user_id', user.id),
          supabase.from('user_preferences').select('*').eq('user_id', user.id).single(),
        ]);

        const result = await Promise.race([dataPromise, timeoutPromise]);

        if (result === 'timeout') {
          console.error('Data loading timed out after 15s');
          toast({ title: 'Loading took too long', description: 'Some data may not have loaded. Pull down to refresh.', variant: 'destructive' });
          setLoading(false);
          return;
        }

        const [profileRes, childrenRes, diaryRes, allergenRes, mealPlanRes, exposuresRes, prefsRes] = result;

        const profile = profileRes.data;
        const prefs = prefsRes.data;

        setState({
          children: (childrenRes.data || []).map((c: any) => ({
            id: c.id,
            name: c.name,
            birthdate: c.birthdate,
            knownAllergies: c.known_allergies || [],
            feedingApproach: c.feeding_approach as any,
            avatar: c.avatar,
            gender: (c.gender as Gender) || 'neutral',
            fussyFoods: c.fussy_foods || [],
            photoUrl: c.photo_url || undefined,
          })),
          diary: (diaryRes.data || []).map((d: any) => ({
            id: d.id,
            childId: d.child_id,
            date: d.date,
            foodId: d.food_id,
            foodName: d.food_name,
            mealType: d.meal_type as MealType,
            textureStage: d.texture_stage as any,
            acceptance: d.acceptance as any,
            reaction: d.reaction,
            reactionSeverity: d.reaction_severity as any,
            notes: d.notes,
            photoUrl: d.photo_url || undefined,
          })),
          allergenRecords: (allergenRes.data || []).map((a: any) => ({
            id: a.id,
            childId: a.child_id,
            allergen: a.allergen as any,
            dateIntroduced: a.date_introduced,
            food: a.food,
            reactionSeverity: a.reaction_severity as any,
            symptoms: a.symptoms || [],
            onsetTime: a.onset_time,
            notes: a.notes,
          })),
          mealPlan: (mealPlanRes.data || []).map((m: any) => ({
            id: m.id,
            childId: m.child_id,
            date: m.date,
            mealType: m.meal_type as MealType,
            recipeId: m.recipe_id,
            customMeal: m.custom_meal,
          })),
          exposures: (exposuresRes.data || []).map((e: any) => ({
            id: e.id,
            childId: e.child_id,
            foodName: e.food_name,
            exposures: (e.exposure_data as any[]) || [],
          })),
          favoriteRecipes: prefs?.favorite_recipes || [],
          triedRecipes: prefs?.tried_recipes || [],
          foodPreferences: (prefs?.food_preferences as any) || {},
          settings: {
            onboardingComplete: profile?.onboarding_complete || false,
            activeChildId: profile?.active_child_id || null,
            theme: 'system',
            country: (localStorage.getItem('hlb-country') as Country) || 'US',
          },
        });
      } catch (e) {
        console.error('Failed to load data:', e);
      }
      setLoading(false);
    };

    loadData();
  }, [user]);

  const migrateLocalStorage = async (userId: string) => {
    if (migrationDone.current) return;
    migrationDone.current = true;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const localData: AppState = { ...defaultState, ...JSON.parse(saved) };

      // Check if DB is empty
      const { data: existingChildren } = await supabase.from('children').select('id').eq('user_id', userId).limit(1);
      if (existingChildren && existingChildren.length > 0) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }

      // Migrate children
      if (localData.children.length > 0) {
        await supabase.from('children').insert(
          localData.children.map(c => ({
            id: c.id, user_id: userId, name: c.name, birthdate: c.birthdate,
            known_allergies: c.knownAllergies, feeding_approach: c.feedingApproach, avatar: c.avatar,
            gender: c.gender || 'neutral',
          } as any))
        );
      }

      // Migrate diary
      if (localData.diary.length > 0) {
        await supabase.from('diary_entries').insert(
          localData.diary.map(d => ({
            id: d.id, user_id: userId, child_id: d.childId, date: d.date,
            food_id: d.foodId, food_name: d.foodName, meal_type: d.mealType,
            texture_stage: d.textureStage, acceptance: d.acceptance,
            reaction: d.reaction, reaction_severity: d.reactionSeverity, notes: d.notes,
          }))
        );
      }

      // Migrate allergen records
      if (localData.allergenRecords.length > 0) {
        await supabase.from('allergen_records').insert(
          localData.allergenRecords.map(a => ({
            id: a.id, user_id: userId, child_id: a.childId, allergen: a.allergen,
            date_introduced: a.dateIntroduced, food: a.food,
            reaction_severity: a.reactionSeverity, symptoms: a.symptoms,
            onset_time: a.onsetTime, notes: a.notes,
          }))
        );
      }

      // Migrate meal plan
      if (localData.mealPlan.length > 0) {
        await supabase.from('meal_plan_entries').insert(
          localData.mealPlan.map(m => ({
            id: m.id, user_id: userId, child_id: m.childId, date: m.date,
            meal_type: m.mealType, recipe_id: m.recipeId, custom_meal: m.customMeal,
          }))
        );
      }

      // Migrate exposures
      if (localData.exposures.length > 0) {
        await supabase.from('exposures').insert(
          localData.exposures.map(e => ({
            id: e.id, user_id: userId, child_id: e.childId,
            food_name: e.foodName, exposure_data: e.exposures,
          }))
        );
      }

      // Migrate preferences
      await supabase.from('user_preferences').update({
        favorite_recipes: localData.favoriteRecipes,
        tried_recipes: localData.triedRecipes,
        food_preferences: localData.foodPreferences,
      }).eq('user_id', userId);

      // Migrate profile settings
      await supabase.from('profiles').update({
        onboarding_complete: localData.settings.onboardingComplete,
        active_child_id: localData.settings.activeChildId,
      }).eq('user_id', userId);

      localStorage.removeItem(STORAGE_KEY);
      toast({ title: '✨ Data synced!', description: 'Your existing data has been saved to the cloud.' });
    } catch (e) {
      console.error('Migration failed:', e);
    }
  };

  const activeChild = state.children.find(c => c.id === state.settings.activeChildId) || state.children[0] || null;

  const getChildAge = useCallback((child: ChildProfile) => {
    const birth = new Date(child.birthdate);
    const now = new Date();
    const diffMs = now.getTime() - birth.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    if (now.getDate() < birth.getDate()) {
      months -= 1;
    }
    if (months < 0) months = 0;

    let label = '';
    if (diffDays < 91) {
      const weeks = Math.floor(diffDays / 7);
      label = `${weeks} week${weeks !== 1 ? 's' : ''} old`;
    } else if (months < 12) {
      label = `${months} month${months !== 1 ? 's' : ''} old`;
    } else {
      const years = Math.floor(months / 12);
      const rem = months % 12;
      label = `${years} year${years !== 1 ? 's' : ''}${rem > 0 ? ` ${rem}mo` : ''} old`;
    }
    return { months, label };
  }, []);

  const value: AppContextType = {
    ...state,
    activeChild,
    loading,
    getChildAge,

    addChild: async (child) => {
      setState(prev => ({
        ...prev,
        children: [...prev.children, child],
        settings: { ...prev.settings, activeChildId: child.id },
      }));
      if (user) {
        await supabase.from('children').insert({
          id: child.id, user_id: user.id, name: child.name, birthdate: child.birthdate,
          known_allergies: child.knownAllergies, feeding_approach: child.feedingApproach, avatar: child.avatar,
          gender: child.gender || 'neutral', photo_url: child.photoUrl || null,
          fussy_foods: child.fussyFoods || [],
        } as any);
        await supabase.from('profiles').update({ active_child_id: child.id }).eq('user_id', user.id);
      }
    },

    updateChild: async (child) => {
      setState(prev => ({ ...prev, children: prev.children.map(c => c.id === child.id ? child : c) }));
      if (user) {
        await supabase.from('children').update({
          name: child.name, birthdate: child.birthdate, known_allergies: child.knownAllergies,
          feeding_approach: child.feedingApproach, avatar: child.avatar,
          gender: child.gender || 'neutral', photo_url: child.photoUrl || null,
          fussy_foods: child.fussyFoods || [],
        } as any).eq('id', child.id).eq('user_id', user.id);
      }
    },

    removeChild: async (id) => {
      setState(prev => ({
        ...prev,
        children: prev.children.filter(c => c.id !== id),
        settings: { ...prev.settings, activeChildId: prev.settings.activeChildId === id ? null : prev.settings.activeChildId },
      }));
      if (user) {
        await supabase.from('children').delete().eq('id', id).eq('user_id', user.id);
      }
    },

    setActiveChild: async (id) => {
      setState(prev => ({ ...prev, settings: { ...prev.settings, activeChildId: id } }));
      if (user) {
        await supabase.from('profiles').update({ active_child_id: id }).eq('user_id', user.id);
      }
    },

    addDiaryEntry: async (entry) => {
      setState(prev => ({ ...prev, diary: [entry, ...prev.diary] }));
      if (user) {
        await supabase.from('diary_entries').insert({
          id: entry.id, user_id: user.id, child_id: entry.childId, date: entry.date,
          food_id: entry.foodId, food_name: entry.foodName, meal_type: entry.mealType,
          texture_stage: entry.textureStage, acceptance: entry.acceptance,
          reaction: entry.reaction, reaction_severity: entry.reactionSeverity, notes: entry.notes,
          photo_url: entry.photoUrl || null,
        } as any);
      }
    },

    updateDiaryEntry: async (entry) => {
      setState(prev => ({ ...prev, diary: prev.diary.map(e => e.id === entry.id ? entry : e) }));
      if (user) {
        await supabase.from('diary_entries').update({
          food_id: entry.foodId, food_name: entry.foodName, meal_type: entry.mealType,
          texture_stage: entry.textureStage, acceptance: entry.acceptance,
          reaction: entry.reaction, reaction_severity: entry.reactionSeverity, notes: entry.notes,
          photo_url: entry.photoUrl || null,
        } as any).eq('id', entry.id).eq('user_id', user.id);
      }
    },

    removeDiaryEntry: async (id) => {
      setState(prev => ({ ...prev, diary: prev.diary.filter(e => e.id !== id) }));
      if (user) {
        await supabase.from('diary_entries').delete().eq('id', id).eq('user_id', user.id);
      }
    },

    addAllergenRecord: async (record) => {
      setState(prev => ({ ...prev, allergenRecords: [...prev.allergenRecords, record] }));
      if (user) {
        await supabase.from('allergen_records').insert({
          id: record.id, user_id: user.id, child_id: record.childId, allergen: record.allergen,
          date_introduced: record.dateIntroduced, food: record.food,
          reaction_severity: record.reactionSeverity, symptoms: record.symptoms,
          onset_time: record.onsetTime, notes: record.notes,
        });
      }
    },

    toggleFavoriteRecipe: async (id) => {
      setState(prev => {
        const newFavs = prev.favoriteRecipes.includes(id)
          ? prev.favoriteRecipes.filter(r => r !== id)
          : [...prev.favoriteRecipes, id];
        if (user) {
          supabase.from('user_preferences').update({ favorite_recipes: newFavs }).eq('user_id', user.id);
        }
        return { ...prev, favoriteRecipes: newFavs };
      });
    },

    toggleTriedRecipe: async (id) => {
      setState(prev => {
        const newTried = prev.triedRecipes.includes(id)
          ? prev.triedRecipes.filter(r => r !== id)
          : [...prev.triedRecipes, id];
        if (user) {
          supabase.from('user_preferences').update({ tried_recipes: newTried }).eq('user_id', user.id);
        }
        return { ...prev, triedRecipes: newTried };
      });
    },

    addExposure: async (foodName, childId, accepted) => {
      setState(prev => {
        const existing = prev.exposures.find(e => e.foodName === foodName && e.childId === childId);
        if (existing) {
          const updated = prev.exposures.map(e =>
            e.id === existing.id
              ? { ...e, exposures: [...e.exposures, { date: new Date().toISOString(), accepted }] }
              : e
          );
          if (user) {
            const updatedExp = updated.find(e => e.id === existing.id)!;
            supabase.from('exposures').update({ exposure_data: updatedExp.exposures }).eq('id', existing.id).eq('user_id', user.id);
          }
          return { ...prev, exposures: updated };
        } else {
          const newExp = {
            id: crypto.randomUUID(),
            childId,
            foodName,
            exposures: [{ date: new Date().toISOString(), accepted }],
          };
          if (user) {
            supabase.from('exposures').insert({
              id: newExp.id, user_id: user.id, child_id: childId,
              food_name: foodName, exposure_data: newExp.exposures,
            });
          }
          return { ...prev, exposures: [...prev.exposures, newExp] };
        }
      });
    },

    addMealPlanEntry: async (entry) => {
      setState(prev => ({ ...prev, mealPlan: [...prev.mealPlan, entry] }));
      if (user) {
        await supabase.from('meal_plan_entries').insert({
          id: entry.id, user_id: user.id, child_id: entry.childId, date: entry.date,
          meal_type: entry.mealType, recipe_id: entry.recipeId, custom_meal: entry.customMeal,
        });
      }
    },

    removeMealPlanEntry: async (id) => {
      setState(prev => ({ ...prev, mealPlan: prev.mealPlan.filter(e => e.id !== id) }));
      if (user) {
        await supabase.from('meal_plan_entries').delete().eq('id', id).eq('user_id', user.id);
      }
    },

    clearWeekPlan: async (childId, dates) => {
      setState(prev => ({
        ...prev,
        mealPlan: prev.mealPlan.filter(e => !(e.childId === childId && dates.includes(e.date))),
      }));
      if (user) {
        await supabase.from('meal_plan_entries').delete()
          .eq('user_id', user.id).eq('child_id', childId).in('date', dates);
      }
    },

    setFoodPreference: async (childId, foodName, pref) => {
      setState(prev => {
        const childPrefs = { ...(prev.foodPreferences[childId] || {}) };
        if (pref === null) delete childPrefs[foodName];
        else childPrefs[foodName] = pref;
        const newFoodPrefs = { ...prev.foodPreferences, [childId]: childPrefs };
        if (user) {
          supabase.from('user_preferences').update({ food_preferences: newFoodPrefs }).eq('user_id', user.id);
        }
        return { ...prev, foodPreferences: newFoodPrefs };
      });
    },

    clearFoodPreferences: async (childId) => {
      setState(prev => {
        const updated = { ...prev.foodPreferences };
        delete updated[childId];
        if (user) {
          supabase.from('user_preferences').update({ food_preferences: updated }).eq('user_id', user.id);
        }
        return { ...prev, foodPreferences: updated };
      });
    },

    completeOnboarding: async () => {
      setState(prev => ({ ...prev, settings: { ...prev.settings, onboardingComplete: true } }));
      if (user) {
        await supabase.from('profiles').update({ onboarding_complete: true }).eq('user_id', user.id);
      }
    },

    setCountry: (country: Country) => {
      setState(prev => ({ ...prev, settings: { ...prev.settings, country } }));
      localStorage.setItem('hlb-country', country);
    },

    setTheme: (theme: 'light' | 'dark' | 'system') => {
      setState(prev => ({ ...prev, settings: { ...prev.settings, theme } }));
      localStorage.setItem('hlb-theme', theme);
      applyTheme(theme);
    },
  };

  return <AppContext.Provider value={value}>{reactChildren}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
