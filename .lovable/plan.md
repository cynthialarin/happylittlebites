

## Plan: Sleep Tracker + Feeding Reminder Notifications

### 1. Sleep Tracker

#### Database Migration
Create a new `sleep_entries` table:
- `id` (uuid, PK, default gen_random_uuid)
- `child_id` (text, not null)
- `user_id` (uuid, not null)
- `date` (text, not null)
- `start_time` (text, not null) — e.g. "21:00"
- `end_time` (text, not null) — e.g. "06:30"
- `sleep_type` (text, not null) — 'nap' | 'nighttime'
- `quality` (text, not null, default 'good') — 'poor' | 'fair' | 'good' | 'great'
- `notes` (text, default '')
- `created_at` (timestamptz, default now())

RLS: standard per-user CRUD on `user_id = auth.uid()`.

#### New Page: `src/pages/SleepTracker.tsx`
Follows the same layout pattern as FeedingTracker:
- Date selector with left/right arrows
- Quick-log buttons: "😴 Nap" and "🌙 Nighttime"
- Log form: start time, end time (auto-calculates duration), quality picker (4 color-coded buttons), notes
- Daily summary card: total sleep hours, number of naps, nighttime hours
- Scrollable list of today's sleep entries with delete
- Weekly overview bar chart (total hours per day)

#### Types
Add `SleepType`, `SleepQuality`, and `SleepEntry` to `src/types/index.ts`.

#### Routing & Navigation
- Add `/sleep` route in `src/App.tsx`
- Add "Sleep" quick-action card on Dashboard (Moon icon)
- Add sleep data to CaregiverShare summary

### 2. Feeding Reminder Notifications

Uses the browser Notification API (no server-side push infrastructure needed — works for PWA):

#### New Component: `src/components/FeedingReminder.tsx`
- Calculates average feeding interval from the last 7 days of feeding entries
- After each feed is logged, sets a browser notification timer for the predicted next feed
- Uses `Notification.requestPermission()` on first use
- Stores reminder preferences in localStorage: enabled/disabled, custom interval override
- Shows a small settings section on the FeedingTracker page: toggle on/off, custom interval (e.g. "every 2.5 hours")

#### Integration in FeedingTracker
- Import and render `FeedingReminder` at the top of the feeding tracker page
- After saving a new feed, trigger the reminder scheduling
- Show a small bell icon indicator when reminders are active

### Files to Create/Modify
- `src/types/index.ts` — add sleep types
- `src/pages/SleepTracker.tsx` — new page
- `src/components/FeedingReminder.tsx` — new component
- `src/pages/FeedingTracker.tsx` — integrate reminder component
- `src/pages/Dashboard.tsx` — add Sleep quick-action
- `src/pages/CaregiverShare.tsx` — add sleep summary section
- `src/App.tsx` — add `/sleep` route
- Database migration — new `sleep_entries` table

### Technical Notes
- Browser Notification API is used instead of server-side push notifications, which keeps things simple and works well for PWA-installed apps. No additional API keys or infrastructure needed.
- Sleep duration is auto-calculated from start/end times, handling overnight spans (e.g. 9pm to 6am = 9 hours).
- The feeding interval prediction uses a simple average of gaps between consecutive feeds over the past week.

