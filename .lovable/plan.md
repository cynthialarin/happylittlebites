

# Plan: Easy Child Switching + Gender-Based Theming

## Current State
- Child switching requires navigating to ChildProfiles page (buried in More menu)
- No indication of which child is active on most pages
- No gender field on ChildProfile type or database
- Layout.tsx has no child context awareness

## Changes

### 1. Add `gender` field to ChildProfile

**`src/types/index.ts`** — Add `gender: 'boy' | 'girl' | 'neutral'` to `ChildProfile`

**Database migration** — Add `gender` column to `children` table (default `'neutral'`, not null)

**`src/contexts/AppContext.tsx`** — Map `gender` in load/save/migrate for children

### 2. Global Child Switcher in Layout

**`src/components/Layout.tsx`** — Add a top bar showing the active child's avatar + name + age. If multiple children exist, tapping it opens a dropdown/popover to switch instantly. Include a "+" button to add a child quickly. This appears on every page.

### 3. Update Onboarding & ChildProfiles for gender

**`src/pages/Onboarding.tsx`** — Add gender picker (Boy 👦 / Girl 👧 / Neutral 🌟) at profile step

**`src/pages/ChildProfiles.tsx`** — Add gender picker to Add Child dialog and show gender on each card. Add "Twins/Triplets" quick-add button that pre-fills 2-3 children.

### 4. Gender-Based Color Theming

**`src/index.css`** — Add two new CSS theme classes alongside existing `:root`:
- `.theme-boy` — soft blue pastel palette (primary: sky blue, accent: soft navy, secondary: light blue-green)
- `.theme-girl` — soft pink/rose pastel palette (primary: soft pink, accent: lavender, secondary: peach-rose)
- Default/neutral keeps the current warm yellow/sage palette

**`src/components/Layout.tsx`** — Apply `theme-boy` or `theme-girl` class to the root `<div>` based on `activeChild.gender`. When switching children, the entire app color scheme shifts instantly.

### 5. Files Changed Summary

| File | Change |
|------|--------|
| `src/types/index.ts` | Add `gender` to ChildProfile |
| `supabase/migrations/...` | Add `gender` column to children table |
| `src/contexts/AppContext.tsx` | Map gender field in load/save |
| `src/components/Layout.tsx` | Top bar with child switcher + gender theme class |
| `src/pages/Onboarding.tsx` | Gender picker step |
| `src/pages/ChildProfiles.tsx` | Gender picker + twins/triplets quick-add |
| `src/index.css` | `.theme-boy` and `.theme-girl` CSS variable overrides |

### Technical Notes
- Gender theming uses CSS custom property overrides via a class on the layout wrapper, so every component automatically inherits the palette
- The child switcher popover uses existing Radix Popover component
- "Add Twins" button creates 2 empty child forms; "Add Triplets" creates 3
- All existing pages automatically show the active child context via the persistent top bar

