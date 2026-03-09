

# Production Readiness Audit — Happy Little Bites

I've reviewed every page, component, data file, edge function, and configuration in the app as a pediatric nutrition expert, food safety specialist, UX designer, and software engineer. Here's what I found and what needs fixing.

---

## Critical Issues

### 1. Edge Function Not Configured in config.toml
The `supabase/config.toml` only has `project_id`. The `generate-food-image` edge function is missing its `[functions.generate-food-image]` block with `verify_jwt = false`. This means the function may reject requests or behave unpredictably.

**Fix:** Add function config to `supabase/config.toml`.

### 2. FoodImage Component — Thundering Herd Problem
When a user opens the Food Library, **all 104 food cards** simultaneously trigger `fetchFoodImage`, each making a HEAD request + potentially invoking the edge function. This will:
- Hammer the storage bucket with 104 HEAD requests
- Trigger dozens of AI image generation calls simultaneously
- Hit rate limits (429) almost immediately
- Create a terrible UX with skeleton loaders everywhere

**Fix:** Add a `staleTime` guard and limit concurrent generation. Only generate images when a user navigates to a specific food detail page or explicitly requests it. On grid views, show emojis by default and only show cached images (skip generation).

### 3. FoodImage HEAD Check Returns 200 for Non-Existent Objects
Supabase public bucket URLs return **200 with an error XML body** for non-existent files, not 404. The `checkResponse.ok` check on line 24 of `FoodImage.tsx` will always be true, meaning it returns a broken URL and never triggers generation.

**Fix:** Check Content-Type header (should be `image/png`, not `application/xml`) or use the Supabase `list` API to verify existence.

### 4. Avocado Classified as Fruit
In `foods.ts`, avocado has `foodGroup: 'fruits'`. While botanically a fruit, in pediatric nutrition it's typically classified alongside healthy fats/other. This affects the "Rainbow Plate" gamification since it counts toward the wrong food group.

**Minor** — could reclassify or leave as-is with a note.

### 5. Onboarding Claims "500+ Foods" — Actually 104
The onboarding screen (line 21) says "500+ Foods" but the library has 104 entries. This is misleading.

**Fix:** Change to "100+ Foods" or expand the library.

---

## Moderate Issues

### 6. No Data Persistence Beyond localStorage
All diary entries, allergen records, meal plans, and child profiles are stored **only in localStorage**. Clearing browser data or switching devices loses everything. For a production app tracking a child's medical/allergy history, this is a significant data loss risk.

**Recommendation:** Migrate to database storage (tables for children, diary entries, allergen records, meal plans). This requires authentication.

### 7. No Authentication
The app has no login/signup. Combined with localStorage-only storage, there's no way to:
- Sync across devices
- Share between parents/caregivers
- Recover lost data
- Protect sensitive health data

### 8. Honey Safety Warning Missing
Honey (`id: 'honey'`) should have a prominent, unmissable warning that it must NEVER be given to babies under 12 months due to botulism risk. Currently it just has `safeFromAge: '12mo'` but no special visual treatment for this critical safety item.

**Fix:** Add a special danger flag for honey and render it with extra prominence on the detail page.

### 9. Recipe Library Too Small for Meal Planner
Only 12 recipes for 104 foods. Auto-fill reuses the same recipes constantly. The meal planner will feel repetitive.

### 10. Shopping List Doesn't Deduplicate Quantities
The shopping list collects raw ingredient strings. If two recipes both need "1 egg", it shows "1 egg" twice rather than "2 eggs".

### 11. Missing Error Toasts for FoodImage Failures
When the edge function returns 429 (rate limited) or 402 (credits exhausted), the user sees no feedback — just a silent fallback to emoji. Users should be informed.

---

## Minor Issues

### 12. Accessibility
- Many interactive elements use `<button>` without proper aria labels
- Color contrast on some badge text (e.g., `text-[9px]` at muted opacity) may fail WCAG AA
- The emergency "Call 911" button should have `role="link"` since it opens a phone URL

### 13. Missing 'other' Food Group Filter
The `FoodLibrary` filter bar doesn't include the "other" food group, so spices, oils, and honey are unfilterable.

### 14. Meal Planner Mobile UX
The weekly grid has `minWidth: '700px'` which forces horizontal scrolling on mobile. The scroll hint is subtle — users might not realize they can scroll.

### 15. No Offline Support
No service worker or PWA manifest. Parents often use feeding apps in situations with poor connectivity.

---

## Recommended Implementation Plan

### Phase 1 — Fix Critical Bugs (do now)
1. **Fix config.toml** — add `[functions.generate-food-image]` with `verify_jwt = false`
2. **Fix FoodImage HEAD check** — check Content-Type or use signed URL approach already in edge function
3. **Add lazy generation** — only trigger AI generation on detail pages, use emoji on grid/list views. Show cached images on grids only if they already exist.
4. **Fix onboarding copy** — change "500+ Foods" to "100+ Foods"
5. **Add honey botulism warning** — special danger banner on honey's detail page
6. **Add error toasts** for rate limits and credit exhaustion in FoodImage

### Phase 2 — Important Improvements (next)
7. **Expand recipe library** to 30+ recipes
8. **Add authentication** — email signup/login for data persistence
9. **Migrate data to database** — children, diary, allergen records, meal plans
10. **Improve shopping list** deduplication

### Phase 3 — Polish
11. Add PWA manifest + offline support
12. Accessibility audit pass
13. Add "other" food group filter
14. Improve mobile meal planner UX

---

## AI Image Prompt Improvements

The current food prompt is good but can be improved for consistency and baby-food appropriateness. Recommended rewrite:

**Food prompt:**
> "Overhead professional food photography of {name} prepared for a baby or toddler, served in age-appropriate portions on a clean white ceramic plate. The food is freshly prepared with visible texture appropriate for infant feeding. Soft, warm natural lighting, shallow depth of field, clean light wooden table surface. No text, no watermarks, no hands, no utensils, no branding. Photorealistic, appetizing, warm color palette."

**Recipe prompt:**
> "Professional overhead food photography of homemade {title} — {description}. Served family-style on a clean white plate, home-cooked and inviting. Warm natural lighting, clean light wooden table, shallow depth of field. Show the complete dish with visible ingredients and textures. No text, no watermarks, no hands, no branding. Photorealistic, appetizing."

These prompts add: consistent camera angle (overhead), surface material (wooden table), depth of field, and explicit "photorealistic" instruction for higher quality output. Consider also upgrading the model to `google/gemini-3-pro-image-preview` for better quality.

---

Shall I proceed with Phase 1 fixes (critical bugs + prompt improvements)?

