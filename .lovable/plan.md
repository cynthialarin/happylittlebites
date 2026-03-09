

# Gamification System for Happy Little Bites

## Concept
Turn daily feeding into an engaging game with **daily nutrition goals**, **achievements/badges**, **XP & levels**, and a **visual "plate" tracker** — all computed from existing diary entries. No new data entry burden on parents.

## Features

### 1. Daily Nutrition Rainbow (Dashboard Widget)
A visual plate/rainbow showing today's food group coverage. Each food group (fruits, vegetables, grains, protein, dairy, legumes) is a colored segment. Segments fill as diary entries are logged. Shows "5 of 6 groups today!" with celebratory animation when all groups are hit.

### 2. Achievement Badges
Unlockable badges stored in context state, computed from diary data:
- **First Bite** — Log first food ever
- **Rainbow Plate** — Hit all 6 food groups in one day
- **Adventurous Eater** — Try 25 unique foods
- **Super Taster** — Try 50 unique foods
- **Food Explorer** — Try 100 unique foods
- **Allergen Champion** — Introduce all 9 allergens
- **7-Day Streak** / **30-Day Streak** — Consecutive logging days
- **Veggie Lover** — Try 10 different vegetables
- **Protein Pro** — Try 10 different proteins
- **Fruit Fan** — Try 10 different fruits
- **Texture Master** — Log foods at all 5 texture stages
- **Brave Taster** — Re-try a previously refused food

### 3. XP & Level System
- Earn XP for: logging food (+10), new food tried (+25), rainbow plate day (+50), badge unlocked (+100)
- Levels with fun titles: Milk Monster → First Taster → Food Explorer → Adventurous Eater → Super Chef → Food Champion
- Level progress bar on Dashboard

### 4. Weekly Challenges
Rotating weekly goals like "Try 2 new vegetables this week" or "Log every meal for 5 days." Shown as a card on Dashboard with progress indicator.

### 5. Food Group Streaks
Track consecutive days each food group was eaten. "Veggie streak: 4 days!" Encourages balanced nutrition without being preachy.

## Technical Approach

### New Types (`src/types/index.ts`)
- `Badge` interface (id, title, emoji, description, unlocked, unlockedDate)
- `WeeklyChallenge` interface
- Add `xp` and `unlockedBadges` to `AppState`

### New Files
- **`src/data/badges.ts`** — Badge definitions with unlock conditions
- **`src/data/challenges.ts`** — Weekly challenge pool
- **`src/hooks/useGamification.ts`** — Hook that computes badges, XP, daily food group coverage, streaks, and active challenge progress from diary data
- **`src/pages/Achievements.tsx`** — Full achievements page with badge grid (locked badges shown greyed out), XP/level display, and stats

### Modified Files
- **Dashboard.tsx** — Add nutrition rainbow widget, XP bar, latest badge earned, active challenge card
- **AppContext.tsx** — Add `unlockedBadges` and `xp` to persisted state; add `unlockBadge` action
- **Tracker.tsx** — Show "+25 XP" toast animation when logging a new food
- **Layout.tsx / MoreMenu.tsx** — Add navigation to Achievements page
- **App.tsx** — Add `/achievements` route

### UX Details
- Badge unlock triggers a celebratory `sonner` toast with confetti-style emoji
- Nutrition rainbow uses the existing warm color palette (sage for veggies, peach for grains, sky for dairy, etc.)
- All gamification is computed from existing `diary` entries + `foods` data — zero extra input from parents
- Weekly challenges auto-rotate based on the current week number

