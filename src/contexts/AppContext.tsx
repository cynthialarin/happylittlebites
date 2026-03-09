import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ChildProfile, DiaryEntry, AllergenRecord, MealPlanEntry, ExposureRecord, AppSettings, MealType } from '@/types';

interface AppState {
  children: ChildProfile[];
  diary: DiaryEntry[];
  allergenRecords: AllergenRecord[];
  mealPlan: MealPlanEntry[];
  exposures: ExposureRecord[];
  favoriteRecipes: string[];
  triedRecipes: string[];
  settings: AppSettings;
}

interface AppContextType extends AppState {
  addChild: (child: ChildProfile) => void;
  updateChild: (child: ChildProfile) => void;
  removeChild: (id: string) => void;
  setActiveChild: (id: string) => void;
  activeChild: ChildProfile | null;
  addDiaryEntry: (entry: DiaryEntry) => void;
  removeDiaryEntry: (id: string) => void;
  addAllergenRecord: (record: AllergenRecord) => void;
  toggleFavoriteRecipe: (id: string) => void;
  toggleTriedRecipe: (id: string) => void;
  addExposure: (foodName: string, childId: string, accepted: boolean) => void;
  addMealPlanEntry: (entry: MealPlanEntry) => void;
  removeMealPlanEntry: (id: string) => void;
  clearWeekPlan: (childId: string, dates: string[]) => void;
  completeOnboarding: () => void;
  getChildAge: (child: ChildProfile) => { months: number; label: string };
}

const defaultSettings: AppSettings = {
  onboardingComplete: false,
  activeChildId: null,
  theme: 'system',
};

const defaultState: AppState = {
  children: [],
  diary: [],
  allergenRecords: [],
  mealPlan: [],
  exposures: [],
  favoriteRecipes: [],
  triedRecipes: [],
  settings: defaultSettings,
};

const STORAGE_KEY = 'happy-little-bites';

function loadState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultState, ...JSON.parse(saved) };
  } catch (e) { /* ignore */ }
  return defaultState;
}

function saveState(state: AppState) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children: reactChildren }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => { saveState(state); }, [state]);

  const update = useCallback((partial: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...partial }));
  }, []);

  const activeChild = state.children.find(c => c.id === state.settings.activeChildId) || state.children[0] || null;

  const getChildAge = useCallback((child: ChildProfile) => {
    const birth = new Date(child.birthdate);
    const now = new Date();
    const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
    let label = '';
    if (months < 12) label = `${months} month${months !== 1 ? 's' : ''} old`;
    else {
      const years = Math.floor(months / 12);
      const rem = months % 12;
      label = `${years} year${years !== 1 ? 's' : ''}${rem > 0 ? ` ${rem}mo` : ''} old`;
    }
    return { months, label };
  }, []);

  const value: AppContextType = {
    ...state,
    activeChild,
    addChild: (child) => {
      const newChildren = [...state.children, child];
      update({
        children: newChildren,
        settings: { ...state.settings, activeChildId: child.id }
      });
    },
    updateChild: (child) => update({ children: state.children.map(c => c.id === child.id ? child : c) }),
    removeChild: (id) => update({
      children: state.children.filter(c => c.id !== id),
      settings: { ...state.settings, activeChildId: state.settings.activeChildId === id ? null : state.settings.activeChildId }
    }),
    setActiveChild: (id) => update({ settings: { ...state.settings, activeChildId: id } }),
    addDiaryEntry: (entry) => update({ diary: [entry, ...state.diary] }),
    removeDiaryEntry: (id) => update({ diary: state.diary.filter(e => e.id !== id) }),
    addAllergenRecord: (record) => update({ allergenRecords: [...state.allergenRecords, record] }),
    toggleFavoriteRecipe: (id) => update({
      favoriteRecipes: state.favoriteRecipes.includes(id)
        ? state.favoriteRecipes.filter(r => r !== id)
        : [...state.favoriteRecipes, id]
    }),
    toggleTriedRecipe: (id) => update({
      triedRecipes: state.triedRecipes.includes(id)
        ? state.triedRecipes.filter(r => r !== id)
        : [...state.triedRecipes, id]
    }),
    addExposure: (foodName, childId, accepted) => {
      const existing = state.exposures.find(e => e.foodName === foodName && e.childId === childId);
      if (existing) {
        update({
          exposures: state.exposures.map(e =>
            e.id === existing.id
              ? { ...e, exposures: [...e.exposures, { date: new Date().toISOString(), accepted }] }
              : e
          )
        });
      } else {
        update({
          exposures: [...state.exposures, {
            id: crypto.randomUUID(),
            childId,
            foodName,
            exposures: [{ date: new Date().toISOString(), accepted }]
          }]
        });
      }
    },
    completeOnboarding: () => update({ settings: { ...state.settings, onboardingComplete: true } }),
    getChildAge,
  };

  return <AppContext.Provider value={value}>{reactChildren}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
