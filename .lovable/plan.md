

## Plan: Update Legal Pages, Audit Food/Recipe Safety, Add Recipe Ingredient Warning

This plan covers three workstreams: (1) rewriting Terms of Service and Privacy Policy to reflect all built features, (2) auditing food & recipe data for guideline compliance, and (3) adding a dynamic safety warning on Recipe Detail when a child hasn't individually tried all ingredients.

---

### 1. Rewrite Terms of Service (`src/pages/TermsOfService.tsx`)

Current ToS is generic. Rewrite to comprehensively cover all features:

- **Section 2 (Description of Service)**: Expand to list all features — First 100 Foods checklist, AI meal suggestions, allergen tracker (Top 9 US / Top 11 Canada), feeding/sleep/diaper tracking, growth charts, milestones, picky eater toolkit, weekly reports, meal planner, grocery list, caregiver sharing, recipe library (104+ recipes), gamification/achievements, multi-child profiles, food library (100+ foods with safety guides)
- **Section 3 (Medical Liability)**: Add explicit disclaimers for AI-generated content, food safety data, allergen tracking, growth percentiles
- **Section 4 (AI Features)**: New section covering AI meal suggestions — not medical advice, uses child data locally, may not account for all allergies
- **Section 5 (Country-Specific Guidelines)**: Note that the app follows AAP/CDC (US) and Health Canada/CPS (Canada) guidelines but is not a replacement for professional guidance
- **Section 6 (User Responsibilities)**: Expand to include verifying AI suggestions with pediatrician, accurately logging allergens, monitoring reactions
- Add sections for **Caregiver Sharing** (data shared at user's discretion), **Data Export/Deletion**, **PWA/Offline Usage**

### 2. Rewrite Privacy Policy (`src/pages/PrivacyPolicy.tsx`)

Update to reflect actual data collected and features:

- **Section 2 (Data Collected)**: Add sleep entries, diaper entries, growth measurements, feeding entries, meal plans, grocery lists, milestone achievements, allergen records, exposure records, saved AI recipes, food preferences, caregiver invites, child photos
- **Section 4 (How We Use Data)**: Add AI meal suggestions (child age, food history, allergens sent to AI model), weekly report generation, achievement/gamification tracking
- **Section 5 (AI Data Processing)**: New section — explain that child data is sent to AI models for meal suggestions, not stored by AI providers, processed per-request
- **Section 6 (Caregiver Sharing)**: Explain invite system, what data is shared, how to revoke
- Update COPPA and GDPR sections with specifics about the data tables above

### 3. Add FAQ Section to Landing Page (`src/pages/LandingPage.tsx`)

Add an accordion-based FAQ section before the Final CTA with questions like:
- "Is it really free?" — Yes, no paywalls, no ads, no premium tiers
- "Is my data safe?" — Encrypted, never sold, GDPR/COPPA compliant
- "Which food guidelines do you follow?" — AAP/CDC for US, Health Canada/CPS for Canada
- "Do I need to download an app?" — No, it's a PWA that works on any device
- "Can I share with my partner or daycare?" — Yes, via caregiver sharing
- "Is the AI safe to rely on?" — It's a suggestion tool, always consult your pediatrician

Uses the existing `Accordion` component from `@radix-ui/react-accordion`.

### 4. Audit Food & Recipe Data for Compliance

**Honey check**: Recipes already correctly mark honey as "12mo+ only" in ingredients text. All honey-containing recipes have `ageGroup: '12mo'` or `'2yr'`. This is correct per AAP and Health Canada (no honey before 12 months due to botulism risk). No changes needed.

**Cow's milk**: Recipes using whole milk as ingredient (not main beverage) from 6mo+ is acceptable per both AAP and Health Canada — milk in cooking is fine. Recipes correctly use "formula, breast milk, or whole milk (12mo+)" for beverages. No changes needed.

**Allergens**: All recipes correctly list allergens in their `allergens` array (eggs, milk, wheat, peanuts, fish, soy, sesame, shellfish, tree-nuts). The data is consistent with Top 9 US allergens. For Canada's Top 11 (mustard, sulphites), none of the current recipes contain mustard or sulphites as primary ingredients, so no missing flags.

**No compliance issues found in existing data.**

### 5. Recipe Ingredient Safety Warning (`src/pages/RecipeDetail.tsx`)

Add a dynamic warning card that appears when a recipe contains allergens the active child hasn't individually tried yet. Logic:

1. Get `activeChild` and `diary` from `useApp()`
2. Extract unique food names the child has tried from diary entries
3. For each allergen in `recipe.allergens`, check if the child has a diary entry for a food containing that allergen individually
4. If any allergen hasn't been tried individually, show a warning:

```
⚠️ Allergy Safety Notice
This recipe contains [eggs, milk] which [child name] hasn't tried individually yet.
We recommend introducing each new allergen one at a time (waiting 2-3 days between)
so you can identify the source of any reaction.
```

- Warning uses `bg-destructive/10 border-destructive/20` styling
- Placed between the allergen badge section and the ingredients section
- Only shows when there's an active child AND untried allergens exist
- Links to the allergen tracker for guided introduction

### Files Modified
- `src/pages/TermsOfService.tsx` — Full rewrite with comprehensive feature coverage
- `src/pages/PrivacyPolicy.tsx` — Full rewrite with actual data/feature details
- `src/pages/LandingPage.tsx` — Add FAQ accordion section
- `src/pages/RecipeDetail.tsx` — Add dynamic allergen safety warning based on child's diary

