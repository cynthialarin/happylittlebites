

# Fix: Onboarding → 404 Redirect Bug + Phase 2 Plan

## Root Cause

After signup, the browser URL remains `/signup`. When onboarding completes and `AppRoutes` switches from `<Onboarding />` to the `<Routes>` block, there is no `/signup` route defined in the authenticated routes. The catch-all `path="*"` matches, rendering `<NotFound />` (404).

## Fix

**`src/pages/Onboarding.tsx`** — After `completeOnboarding()`, use `useNavigate` to explicitly navigate to `/`.

```tsx
const navigate = useNavigate();

const handleComplete = () => {
  // ... existing addChild + completeOnboarding
  navigate('/', { replace: true });
};
```

**`src/App.tsx`** — As a safety net, replace the `<NotFound />` catch-all inside authenticated routes with `<Navigate to="/" replace />`. This ensures any stale/unknown URL redirects to the dashboard instead of a 404.

## Phase 2 Items (after this fix)

Items 1–4 (high priority) will be implemented next:
1. **Sleep Tracker** — already exists at `/sleep` (SleepTracker.tsx)
2. **Diaper Log** — already exists at `/diapers` (DiaperTracker.tsx)
3. **XP/Level visibility** — surface gamification data in Achievements or dashboard
4. **FAB tooltip persistence** — reduce tooltip auto-hide duration

Items 5–8 (medium) and 9–11 (lower) remain in the backlog.

