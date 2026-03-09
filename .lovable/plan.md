

# Launch Readiness Audit & Fix Plan — Happy Little Bites

## Critical Issues Found

### 1. SECURITY: All RLS Policies Are RESTRICTIVE (Blocking All Access)
**Severity: Critical — app is broken for all authenticated users**

The security scan found that all 21 RLS policies across all 7 tables are set to `RESTRICTIVE` type. In PostgreSQL, RESTRICTIVE policies only *narrow* access granted by PERMISSIVE policies. With zero PERMISSIVE policies, **all data access is denied**. The app currently works only because Supabase may be falling back, but this is a ticking time bomb.

**Fix:** Run a migration to change all 21 policies from RESTRICTIVE to PERMISSIVE. Same conditions (`auth.uid() = user_id`), just correct policy type.

### 2. Missing Country Toggle in More Menu
The plan specified adding a country toggle to MoreMenu.tsx so users can switch between US/CA guidelines after onboarding. This was **not implemented** — the MoreMenu has no country switching option.

**Fix:** Add a US/CA toggle button to the MoreMenu page that calls `setCountry()`.

### 3. HTML Meta Tags Still Default "Lovable App"
`index.html` has placeholder title, description, and OG tags. For marketing launch this needs to be branded.

**Fix:** Update `index.html`:
- Title: "Happy Little Bites — Baby & Toddler Feeding Guide"
- Description: "Free guide to baby & toddler feeding. 100+ foods with safety guides, allergen tracking, meal planning, and AI-powered suggestions."
- OG tags to match
- Remove Lovable OG image reference (or keep until custom one is made)

### 4. Dashboard Allergen Count Hardcoded to "9"
Dashboard shows `{stats.allergensIntro}/9` and `allergenProgress` is calculated with `TOP_9_ALLERGENS.length` (always 9). Canadian users should see `/11`.

**Fix:** Make the allergen denominator country-aware using `settings.country`.

### 5. CaregiverShare Uses Hardcoded `TOP_9_ALLERGENS`
The import uses `TOP_9_ALLERGENS` directly — Canadian users with mustard/sulphites allergen records won't see them reflected.

**Fix:** Use the country-aware allergen list.

### 6. No Medical Disclaimer
A nutrition/health app needs a visible disclaimer to limit liability. Currently missing.

**Fix:** Add a small disclaimer footer to key pages (First 100 Foods, Food Detail, Safety, Allergen Tracker): "For informational purposes only. Not a substitute for professional medical advice. Always consult your pediatrician."

### 7. PWA / Mobile App Feel Missing
No manifest.json, no apple-touch-icon, no theme-color meta tag. For a mobile-first parenting app, these are important for "Add to Home Screen" experience.

**Fix:** Add `manifest.json` with app name, icons, theme color, and display: standalone. Add meta tags to index.html.

---

## Implementation Order

| Step | Task | Files |
|------|------|-------|
| 1 | **Fix RLS policies** — change all 21 from RESTRICTIVE to PERMISSIVE | DB migration |
| 2 | **Update index.html** — branding, meta tags, PWA manifest link | `index.html` |
| 3 | **Create manifest.json** | `public/manifest.json` |
| 4 | **Add country toggle to MoreMenu** | `src/pages/MoreMenu.tsx` |
| 5 | **Fix Dashboard allergen count** for CA users | `src/pages/Dashboard.tsx` |
| 6 | **Fix CaregiverShare** allergen list for CA | `src/pages/CaregiverShare.tsx` |
| 7 | **Add medical disclaimer** to First100Foods, FoodDetail, Safety, AllergenTracker | 4 page files |

### What's Already Good (No Changes Needed)
- Auth flow (email/password with verification) — solid
- Onboarding with country selection — working
- First 100 Foods with country-aware tips — working
- AllergenTracker with 9 vs 11 — working
- Safety page with choking/allergy guides — comprehensive
- AI meal suggestions with country context — working
- Confetti celebrations — working
- Food diary with delete confirmations — working
- Gamification system (XP, badges, challenges) — working
- Edge function error handling (429, 402) — working
- localStorage migration to cloud — working

