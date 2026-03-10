# Phase 3 — What's Already Done vs. What Remains

## Already Implemented (Phase 2 / earlier)

- **Social Proof on Landing Page** —Were New in Town! Please help us Make this App Awesome by testing it our for Free for 1 Month!  "Join 50+ Families" banner, 3 testimonials, stats grid, star rating (LandingStats.tsx)
- **Emergency SOS on Dashboard** — Red SOS card linking to `/more/safety`, plus floating SafetyButton FAB on all pages
- **Safety page** — Full choking/allergy/911 content exists (Safety.tsx)
- **"Share with Caregiver" CTA** — Dashboard card linking to `/caregiver-share`, full caregiver share page exists
- **Pricing section** — Simplified "Free during Beta" messaging with no tiers (LandingPricing.tsx)

## Remaining Phase 3 Items (excluding payment/pricing tiers)

### High Priority

1. **Enhanced SOS: Add Poison Control call + improve Safety page**
  - Add one-tap "Call Poison Control (1-800-222-1222)" button to Safety page and SafetyButton dialog
  - Add a "Recommended by" / "Pediatrician-approved" badge to landing page social proof section
2. **Caregiver Share: Expiration options + public link**
  - Add expiration selector (24h, 7 days, 30 days) to the caregiver share page
  - Currently shares via copy/email — verify no-login-required viewing works

### Medium Priority

3. **Demo Video / Interactive Tour**
  - The "See It in Action" section + AppWalkthrough already exist on the landing page
  - Add a 3-5 step interactive product tour for first-time dashboard users using tooltip highlights (log meal, check allergens, view diary)
4. **Expanded Food Library**
  - Expand food data to 100+ items organized by category
  - Add "Suggested for [baby's age]" filtering
  - Add search/filter to FoodLibrary page
  - Per-food: allergen flag, nutritional highlights

### Low Priority (Phase 4 backlog — not implementing now)

- FAB quick-action menu, push notifications, data export, multi-child support

## Implementation Plan

### 1. Poison Control button (Safety.tsx + SafetyButton.tsx)

Add a "Call Poison Control" button (`tel:1-800-222-1222`) to both the Safety page (next to the 911 button) and the SafetyButton dialog.

### 2. Landing "Recommended by" badge (LandingStats.tsx)

Add a small "Recommended by pediatricians" trust badge with a stethoscope icon below the star rating in the social proof banner.

### 3. Caregiver share expiration (CaregiverShare.tsx)

Add a Select dropdown for link expiration (24h / 7 days / 30 days). Store expiration in the shared link metadata.

### 4. Interactive product tour (new: src/components/ProductTour.tsx + Dashboard.tsx)

Create a lightweight tooltip-based tour component that highlights 4 key areas on first dashboard visit: log a meal, check allergens, view weekly report, share with caregiver. Use localStorage to track completion.

### 6. Expanded Food Library (src/data/foods.ts + FoodLibrary.tsx + First100Foods.tsx)

Expand food entries with categories, allergen flags, and nutrition highlights. Add search bar and age-based filtering to the library pages.