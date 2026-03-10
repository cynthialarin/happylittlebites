

## Plan: Replace Video Placeholder with Animated App Walkthrough

Since there's no actual video file, replace the static placeholder with an auto-cycling animated mockup that simulates the app experience using framer-motion's `AnimatePresence`.

### What to Build

**Animated phone-frame carousel** showing 4 mock screens that auto-rotate every 3 seconds with crossfade transitions:

1. **First 100 Foods** — Grid of food emoji circles with a progress bar (e.g. "32/100 foods tried")
2. **Daily Tracker** — Mini feeding/sleep/diaper log entries with icons and times
3. **Allergen Timeline** — Color-coded allergen badges with check/alert icons
4. **Weekly Report** — Mini bar chart with summary stats

Each screen is a styled div inside a phone-shaped frame (rounded rectangle with notch). Dot indicators below show current slide. Uses `useState` + `useEffect` interval for auto-advance, `AnimatePresence` for crossfade.

### Changes

- **`src/pages/LandingPage.tsx`** — Replace lines 98-105 (the placeholder div) with the animated walkthrough component. Add the screen data array and cycling logic at the top of the component. No new files needed — keeps it self-contained.

### Design Details
- Phone frame: `w-64 h-[480px]` centered, rounded-3xl border, dark header bar with fake status icons
- Each mock screen uses existing color tokens (sage, peach, sky, lavender)
- Dot indicators use `bg-primary` for active, `bg-muted` for inactive
- Entire section remains within the existing `aspect-video` container

