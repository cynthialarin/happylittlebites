

# Generate 3 Logo Options for Happy Little Bites

## Approach
Use the **Gemini 3.1 Flash Image** model (Nano Banana 2) via a temporary edge function to generate 3 distinct logo concepts. Each will be saved to storage and displayed for you to choose from.

## 3 Logo Concepts

1. **Playful Veggie Character** — A smiling broccoli floret wearing a baby bib, with "Happy Little Bites" in rounded, friendly typography. Green and warm yellow palette.

2. **Baby Spoon + Leaf** — A minimalist baby spoon with a small leaf sprouting from the handle, forming a subtle smile shape. Clean, modern mark with soft sage and coral tones.

3. **Bite Mark Circle** — A circular badge with a cute bite taken out of it, filled with tiny illustrated fruits and veggies. Whimsical hand-drawn feel with pastel colors.

## Implementation
- Create a one-time edge function `generate-logo` that calls Gemini 3.1 Flash Image with each prompt
- Build a simple `/choose-logo` page showing all 3 options side-by-side with "Use This" buttons
- Selected logo gets copied to `public/logo.png` and referenced in the header + favicon

## Files
- **New**: `supabase/functions/generate-logo/index.ts` — image generation endpoint
- **New**: `src/pages/ChooseLogo.tsx` — temporary selection page
- **Edit**: `src/App.tsx` — add route
- **Edit**: `index.html` — update favicon after selection

