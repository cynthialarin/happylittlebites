

# Phase 5: Landing Demo, Push Notifications, Multi-Child Dashboard

Three features to implement in one pass.

---

## 1. Interactive Landing Page Demo (replace static walkthrough)

**Current state**: `AppWalkthrough.tsx` shows 4 static mock screens auto-cycling in a phone frame.

**Plan**: Upgrade the walkthrough to be a richer, more polished "interactive demo" experience:
- Add 2 more screens: a **Meal Planner** screen and a **Growth Chart** screen (6 total)
- Add animated micro-interactions within each screen (e.g., food items appearing one by one, progress bars animating up, chart lines drawing in)
- Add labeled tab navigation below the phone frame (replacing dots) so visitors can jump to any screen
- Add a subtle hand-cursor animation pointing at interactive elements to simulate a "tap" demo feel
- Add a pulsing "Try it yourself" CTA below the phone that links to `/signup`

**Files**: `src/components/landing/AppWalkthrough.tsx`

---

## 2. Push Notification Reminders

**Current state**: `FeedingReminder.tsx` uses browser `Notification` API with `setTimeout` — only works while the tab is open.

**Plan**: Upgrade to proper push notifications using the Push API + Service Worker:
- Create a service worker file `public/sw-push.js` that listens for `push` events and shows notifications
- Add a `PushNotificationManager` component that handles:
  - Requesting notification permission
  - Subscribing to push via `PushManager.subscribe()` with VAPID keys
  - Storing the push subscription endpoint in a new `push_subscriptions` database table
- Create an edge function `supabase/functions/send-push/index.ts` that:
  - Accepts `{ user_id, title, body }` 
  - Reads the user's push subscription from the DB
  - Sends a web push notification using the `web-push` library pattern (fetch to push endpoint)
- Create a scheduled edge function `supabase/functions/check-feeding-reminders/index.ts` that:
  - Runs periodically (via pg_cron every 15 min)
  - For users with reminders enabled, checks last feeding time vs their interval
  - Calls `send-push` for overdue reminders
- **Database migration**: Create `push_subscriptions` table (`id`, `user_id`, `endpoint`, `p256dh`, `auth`, `created_at`) with RLS
- Generate VAPID keys and store as secrets
- Update `FeedingReminder.tsx` to save subscription to DB and persist reminder preferences to DB instead of just localStorage

**Files**: `public/sw-push.js`, `src/components/FeedingReminder.tsx`, `supabase/functions/send-push/index.ts`, `supabase/functions/check-feeding-reminders/index.ts`, DB migration

---

## 3. Multi-Child Dashboard Switcher Improvements

**Current state**: Header has a `Popover` dropdown for switching children. Dashboard shows stats for active child only with no comparison view.

**Plan**:
- **Horizontal swipeable child pills** in the header: Replace the popover with a row of avatar pills (scrollable if 3+ children). Active child has a ring/highlight. Tap to switch instantly. Still show "Add" button at the end.
- **Per-child summary cards on Dashboard**: Below the stats grid, add a "Your Children" section showing mini stat cards for each child (foods tried, streak, last meal) — tappable to switch active child.
- **Swipe gesture**: On Dashboard, add left/right swipe to cycle through children (using framer-motion drag gestures).

**Files**: `src/components/Layout.tsx`, `src/pages/Dashboard.tsx`

---

## Summary of All Changes

| Area | Files | What |
|------|-------|------|
| Landing Demo | `AppWalkthrough.tsx` | 6 animated screens, tab nav, micro-interactions, CTA |
| Push Notifications | `FeedingReminder.tsx`, `public/sw-push.js`, 2 edge functions, DB migration | Real push notifications via service worker |
| Multi-Child | `Layout.tsx`, `Dashboard.tsx` | Swipeable avatar pills, per-child cards, swipe gesture |

