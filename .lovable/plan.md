

## Plan: Diaper Tracker + Combined Daily Timeline

### 1. Diaper Change Tracker

#### Database Migration
Create `diaper_entries` table:
- `id` (uuid, PK, default gen_random_uuid)
- `child_id` (text, not null)
- `user_id` (uuid, not null)
- `date` (text, not null)
- `time` (text, not null)
- `diaper_type` (text, not null) — 'wet' | 'dirty' | 'both' | 'dry'
- `color` (text, default '') — stool color notes
- `notes` (text, default '')
- `created_at` (timestamptz, default now())

RLS: standard per-user CRUD on `user_id = auth.uid()`.

#### New Page: `src/pages/DiaperTracker.tsx`
Same layout pattern as FeedingTracker/SleepTracker:
- Date selector with arrows
- Quick-log buttons: "💧 Wet", "💩 Dirty", "💧💩 Both"
- Log form: time, diaper type, optional color/consistency note, notes
- Daily summary: total changes, wet count, dirty count
- Weekly bar chart of daily totals

#### Types
Add `DiaperType` and `DiaperEntry` to `src/types/index.ts`.

### 2. Combined Daily Timeline

#### New Page: `src/pages/DailyTimeline.tsx`
- Date selector at top
- Fetches all feeding, sleep, and diaper entries for the selected date
- Merges and sorts all entries by time into a single chronological list
- Each entry rendered as a timeline item with:
  - Color-coded icon (bottle/breast for feeding, moon/sun for sleep, droplet for diaper)
  - Time, type label, and key details (oz, duration, diaper type, etc.)
- Daily totals summary card at top: total feeds, total sleep hours, total diaper changes

### 3. Integration

#### Routing (`src/App.tsx`)
- Add `/diapers` and `/timeline` routes

#### Dashboard (`src/pages/Dashboard.tsx`)
- Add "Diapers" quick-action card (Droplets icon)
- Add "Timeline" quick-action card (Clock icon)

#### Caregiver Share (`src/pages/CaregiverShare.tsx`)
- Add today's diaper entries to the shareable summary

### Files to Create/Modify
- `src/types/index.ts` — add diaper types
- `src/pages/DiaperTracker.tsx` — new page
- `src/pages/DailyTimeline.tsx` — new page
- `src/App.tsx` — add routes
- `src/pages/Dashboard.tsx` — add quick-action cards
- `src/pages/CaregiverShare.tsx` — add diaper data
- Database migration — `diaper_entries` table

