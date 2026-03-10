

## Plan: Weeks Display for Young Babies + Feeding/Bottle Tracker

### 1. Weeks Display for Babies Under 3 Months

**File: `src/contexts/AppContext.tsx`** — Update `getChildAge` function:
- Calculate the difference in days between birth and now
- If the baby is under ~13 weeks (91 days), compute weeks = `Math.floor(days / 7)` and return label like "8 weeks old"
- Keep `months` field accurate for code that depends on it (set to 0 for < 1 month, etc.)
- Over 3 months continues to use the existing month/year logic

### 2. Feeding Log (Breast/Bottle Tracking)

#### Database Migration
Create a new `feeding_entries` table:
- `id` (uuid, PK, default gen_random_uuid)
- `child_id` (text, not null)
- `user_id` (uuid, not null)
- `date` (text, not null) — ISO date
- `time` (text, not null) — e.g. "14:30"
- `feeding_type` (text, not null) — 'breast' | 'bottle-breastmilk' | 'bottle-formula'
- `amount_oz` (numeric, nullable) — oz consumed (null for breastfeeding where amount unknown)
- `duration_minutes` (integer, nullable) — duration in minutes (mainly for breastfeeding)
- `side` (text, nullable) — 'left' | 'right' | 'both' (breastfeeding only)
- `notes` (text, default '')
- `created_at` (timestamptz, default now())

RLS policies: standard per-user CRUD on `user_id = auth.uid()`.

#### New Page: `src/pages/FeedingTracker.tsx`
- Header with date selector (today by default)
- Quick-log buttons: "🤱 Breast", "🍼 Bottle (Breast Milk)", "🍼 Bottle (Formula)"
- Log form fields:
  - **Breast**: side (left/right/both), duration (minutes), time, notes
  - **Bottle**: amount in oz, time, notes
- Daily summary card: total oz, total feeds, total breastfeeding minutes
- Scrollable list of today's feeds with edit/delete
- Weekly summary chart showing daily totals (using recharts)

#### Integration with Caregiver Share
**File: `src/pages/CaregiverShare.tsx`** — Add a "Feeding Schedule" section to the shareable summary:
- Pull today's feeding entries and display type, times, and amounts
- Include in the copy-to-clipboard and download text

#### Routing
**File: `src/App.tsx`** — Add route `/feeding` for the new page.

#### Navigation
**File: `src/pages/Dashboard.tsx`** or **Layout** — Add a quick-access button/card to the feeding tracker from the dashboard.

#### Types
**File: `src/types/index.ts`** — Add `FeedingType` and `FeedingEntry` interface.

### Files to Create/Modify
- `src/contexts/AppContext.tsx` — age calculation update
- `src/types/index.ts` — new types
- `src/pages/FeedingTracker.tsx` — new page
- `src/pages/CaregiverShare.tsx` — add feeding section
- `src/App.tsx` — new route
- `src/pages/Dashboard.tsx` — add navigation card
- Database migration — new `feeding_entries` table

