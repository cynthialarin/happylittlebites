import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppProvider, useApp } from "@/contexts/AppContext";
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
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
      </Route>
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
        <Route path="*" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthenticatedApp />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
