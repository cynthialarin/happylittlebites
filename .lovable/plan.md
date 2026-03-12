

# Feature Check & SOS Button Improvements

## Feature Status — All 4 Exist

1. **AI meal recommendations** — `MealSuggestions.tsx` uses Gemini to generate personalized breakfast/lunch/dinner ideas based on child age, feeding history, and allergens.
2. **Automated grocery lists** — `GroceryList.tsx` + `useGroceryList.ts` with full CRUD, grouping by source, and recipe-driven item generation.
3. **Picky eater coaching** — `PickyEater.tsx` with evidence-based strategies (Division of Responsibility, 15-20 exposure rule, etc.) plus `PickyRecipes.tsx` for targeted recipes.
4. **Choking hazard alerts** — Built into `foods.ts` data (per-food `chokingHazard` + `chokingNotes`), shown on `FoodDetail.tsx`, `Safety.tsx`, and `CaregiverShare.tsx`.

All four are fully implemented.

---

## SOS Button Improvements

### Current Issues
- Small 12×12 red circle with just a shield icon — easy to miss
- No text label like "SOS" or "911"
- `tel:` links work but could be more robust

### Plan

**Update `SafetyButton.tsx`:**
- Make the FAB larger (w-14 h-14) with bold "SOS" text label instead of just an icon
- Add a subtle pulse animation to draw attention
- Keep the emergency dialog but improve the Call 911 and Poison Control buttons

**Regarding `tel:` links on desktop/web:**
- `tel:911` and `tel:1-800-222-1222` work natively on mobile browsers (iOS Safari, Android Chrome) — they open the phone dialer
- On desktop, `tel:` links attempt to open a registered handler (Skype, FaceTime, etc.). If none exists, they may silently fail
- **Solution**: Detect if the user is on a non-mobile device. On desktop, instead of `window.open('tel:...')`, show the phone number prominently with a "copy to clipboard" button so users can call from their phone. On mobile, keep the direct `tel:` link behavior
- Use `navigator.userAgent` or the existing `useIsMobile` hook to detect device type

**Files to change:** `src/components/SafetyButton.tsx`

