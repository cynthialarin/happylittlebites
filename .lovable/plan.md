

## Plan: Add Back Button to All Pages Missing One

Several pages that are not main nav tabs lack a back button, making it impossible to navigate away without using the bottom nav. The following 6 pages need a back button added:

1. **GrowthTracker** — No back button at all (this is the one from your screenshot)
2. **MealPlanner** — No back button
3. **GroceryList** — No back button
4. **Achievements** — No back button
5. **WeeklyReport** — No back button
6. **MealSuggestions** — No back button

### Changes

For each page, add a back arrow button before the title, matching the existing pattern used in pages like FeedingTracker and SavedRecipes:

```
<button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-muted">
  <ArrowLeft className="h-5 w-5" />
</button>
```

The title and subtitle will be wrapped in a flex row with the back button, consistent with the existing design language.

### Files Modified
- `src/pages/GrowthTracker.tsx` — Add ArrowLeft import, wrap header in flex with back button
- `src/pages/MealPlanner.tsx` — Same pattern
- `src/pages/GroceryList.tsx` — Add useNavigate + ArrowLeft, add back button
- `src/pages/Achievements.tsx` — Add useNavigate + ArrowLeft, add back button
- `src/pages/WeeklyReport.tsx` — Add back button to header
- `src/pages/MealSuggestions.tsx` — Add ArrowLeft import, add back button

