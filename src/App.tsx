import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppProvider, useApp } from "@/contexts/AppContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import OfflineFallback from "@/components/OfflineFallback";
import ConsentBanner from "@/components/ConsentBanner";
import Layout from "@/components/Layout";
import Auth from "@/pages/Auth";
import ResetPassword from "@/pages/ResetPassword";
import Onboarding from "@/pages/Onboarding";
import Dashboard from "@/pages/Dashboard";
import FoodLibrary from "@/pages/FoodLibrary";
import FoodDetail from "@/pages/FoodDetail";
import Recipes from "@/pages/Recipes";
import RecipeDetail from "@/pages/RecipeDetail";
import Tracker from "@/pages/Tracker";
import AllergenTracker from "@/pages/AllergenTracker";
import MoreMenu from "@/pages/MoreMenu";
import PickyEater from "@/pages/PickyEater";
import PickyRecipes from "@/pages/PickyRecipes";
import Safety from "@/pages/Safety";
import Milestones from "@/pages/Milestones";
import ChildProfiles from "@/pages/ChildProfiles";
import Achievements from "@/pages/Achievements";
import MealPlanner from "@/pages/MealPlanner";
import MealSuggestions from "@/pages/MealSuggestions";
import CaregiverShare from "@/pages/CaregiverShare";
import First100Foods from "@/pages/First100Foods";
import GroceryList from "@/pages/GroceryList";
import GrowthTracker from "@/pages/GrowthTracker";
import FeedingTracker from "@/pages/FeedingTracker";
import SleepTracker from "@/pages/SleepTracker";
import DiaperTracker from "@/pages/DiaperTracker";
import DailyTimeline from "@/pages/DailyTimeline";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import DataManagementPage from "@/pages/DataManagementPage";
import SavedRecipes from "@/pages/SavedRecipes";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { settings, loading } = useApp();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-4xl mb-2">🥦</div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!settings.onboardingComplete) {
    return <Onboarding />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/foods" element={<FoodLibrary />} />
        <Route path="/foods/:id" element={<FoodDetail />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/tracker/allergens" element={<AllergenTracker />} />
        <Route path="/more" element={<MoreMenu />} />
        <Route path="/more/picky-eater" element={<PickyEater />} />
        <Route path="/more/picky-recipes" element={<PickyRecipes />} />
        <Route path="/more/safety" element={<Safety />} />
        <Route path="/more/milestones" element={<Milestones />} />
        <Route path="/more/profiles" element={<ChildProfiles />} />
        <Route path="/more/data" element={<DataManagementPage />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
        <Route path="/suggestions" element={<MealSuggestions />} />
        <Route path="/caregiver-share" element={<CaregiverShare />} />
        <Route path="/first-100-foods" element={<First100Foods />} />
        <Route path="/grocery-list" element={<GroceryList />} />
        <Route path="/growth" element={<GrowthTracker />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
        <Route path="/feeding" element={<FeedingTracker />} />
        <Route path="/sleep" element={<SleepTracker />} />
      </Route>
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function AuthenticatedApp() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-4xl mb-2">🥦</div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="*" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <AppProvider>
      <ConsentBanner />
      <AppRoutes />
    </AppProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <ErrorBoundary>
            <Toaster />
            <Sonner />
            <OfflineFallback />
            <BrowserRouter>
              <AuthenticatedApp />
            </BrowserRouter>
          </ErrorBoundary>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
