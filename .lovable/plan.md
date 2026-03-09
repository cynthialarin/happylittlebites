

# Plan: Nutrition Goals Gamification System

## Status
Not yet implemented. Proceeding with the previously approved plan.

## Files to Create

### `src/data/nutritionGoals.ts`
- Age-tier lookup function using child birthdate → age group (6-8mo, 9-11mo, 12-23mo, 24mo+)
- Daily serving targets per group per tier
- Helper: `getTargetsForChild(birthdate: string)` returns `Record<FoodGroup, number>`

### `src/components/NutritionGoals.tsx`
- 6 circular SVG progress rings (one per food group) with emoji + "current/target" label
- Ring colors: grey → amber → green as progress fills
- Animated "Balanced Day" badge when ≥4 groups hit target
- Weekly row: 7 dots (Mon–Sun) colored by balanced-day status
- Weekly balance score progress bar with percentage

## Files to Edit

### `src/data/badges.ts`
Add 6 badges: `balanced-day-1`, `balanced-week`, `balanced-month`, `veggie-streak-7`, `protein-streak-7`, `perfect-day`

### `src/hooks/useGamification.ts`
- Import targets, compute `dailyGoals` (count vs target per group for today)
- Compute `balancedDaysThisWeek`, `weeklyBalanceScore`, `balancedDaysThisMonth`, `groupStreaks`
- Add unlock logic for the 6 new badges (+100 XP each)
- Return all new values

### `src/pages/Dashboard.tsx`
- Replace the "Today's Rainbow" card with `<NutritionGoals />` component
- Add weekly balance score card below it

### `src/pages/Achievements.tsx`
No changes needed — new badges auto-render from the `BADGES` array.

## Technical Notes
- All computed from existing `diary` entries in AppContext — no database changes
- Child age derived from `activeChild.birthdate` using `differenceInMonths` from date-fns
- Weekly window: current week Mon–Sun

