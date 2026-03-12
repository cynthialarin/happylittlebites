

# Integrate Logo Option 3 (Bite Mark Circle) Across the App

## Overview
Replace the 🥦 emoji branding with the actual Option 3 logo image (`logo-option-3.png`) paired with "Happy Little Bites" text across all pages. The landing page gets the largest treatment.

## Key Locations to Update

### Landing Page (largest logo)
- **`src/pages/LandingPage.tsx`** — Header: replace `🥦 Happy Little Bites` text with logo image (h-8) + text. Footer: add logo.
- **`src/components/landing/LandingHero.tsx`** — Replace the bouncing emoji row with a large centered logo image (w-20/h-20) above the headline.

### App Shell
- **`src/components/Layout.tsx`** — Replace the `🥦` icon in the sticky top bar with a small logo image (h-6).

### Auth & Onboarding
- **`src/pages/Auth.tsx`** — Replace the `🥦` emoji with logo image above "Happy Little Bites" title.
- **`src/pages/Onboarding.tsx`** — Replace `🥦 Happy Little Bites` header text and the `🍽️` emoji on the welcome step with logo.

### Dashboard
- **`src/pages/Dashboard.tsx`** — Replace the `🍽️` emoji in the empty state with logo image.

### Loading States
- **`src/App.tsx`** — Replace both `🥦` loading spinners with logo image.

### Favicon
- **`index.html`** — Add `<link rel="icon" href="/logo-option-3.png">` and copy `src/assets/logo-option-3.png` to `public/logo-option-3.png`.
- **`public/manifest.json`** — Update icon entry to reference the new logo.

## Approach
- Import `logoOption3` from `@/assets/logo-option-3.png` in each component
- Use `<img>` tags with appropriate sizing per context:
  - Landing header: `h-8`
  - Landing hero: `w-20 h-20`
  - Layout top bar: `h-6`
  - Auth/Onboarding: `w-16 h-16`
  - Loading states: `w-12 h-12`
- Keep "Happy Little Bites" text next to or below the logo in all branded locations

## Files Changed
| File | Change |
|---|---|
| `src/pages/LandingPage.tsx` | Logo in header + footer |
| `src/components/landing/LandingHero.tsx` | Large logo replacing emoji row |
| `src/components/Layout.tsx` | Small logo in top bar |
| `src/pages/Auth.tsx` | Logo on login/signup |
| `src/pages/Onboarding.tsx` | Logo in header + welcome |
| `src/pages/Dashboard.tsx` | Logo in empty state |
| `src/App.tsx` | Logo in loading states |
| `index.html` | Favicon reference |
| `public/manifest.json` | PWA icon |

Note: Contextual emoji usage (food groups, recipes, etc.) stays unchanged — only branding spots are updated.

