

# Complete All Remaining Items — Phased Plan

## What's Already Done
Phase 1 (Beta Feedback) and Phase 2 (Admin Dashboard) are fully built: feedback form, admin dashboard, feedback management, AI prompt generator, user management, analytics, admin route guard, and database tables.

## What Remains (in execution order)

### Step 1: Add "My Feedback" to More Menu + User Ticket History Page
- Add a "My Feedback" item to the Account section in `src/pages/MoreMenu.tsx` pointing to `/my-feedback`
- Create `src/pages/MyFeedback.tsx` — lists the user's submitted tickets with status badges, admin replies visible under each ticket
- Add route in `src/App.tsx`

### Step 2: Fix forwardRef Console Warnings
- The `Badge` component wraps in `motion.div` on landing page and may trigger React 19 ref warnings
- Review `src/components/ui/badge.tsx` — if using `React.forwardRef`, ensure refs pass through correctly
- Check `LandingPricing.tsx` Badge usage — likely a non-issue since no console errors are appearing now

### Step 3: Polish Landing Page
- Minor refinements: ensure consistent spacing, add subtle loading animations, verify mobile responsiveness at 428px viewport
- Ensure all CTA buttons are prominent and well-spaced on mobile

### Step 4: Email Notification for New Feedback (Edge Function)
- Create `supabase/functions/notify-feedback/index.ts` — triggered by the Feedback page after successful insert
- Uses Lovable AI to format a summary notification, then calls admin (you) via a simple approach: insert a notification record into a new `admin_notifications` table that shows on the Admin Dashboard
- Alternative: Add a "new tickets since last visit" badge counter on the admin dashboard (simpler, no email domain needed)
- **Recommendation**: Go with the in-app notification counter approach since no email domain is configured yet. This avoids blocking on email setup.

### Step 5: End-to-End Testing
- Test feedback submission flow (category, description, screenshot, submit)
- Test admin dashboard loads with stats
- Test admin feedback management (view, status update, reply, AI prompt generation)
- Test user can see their tickets and admin replies on My Feedback page
- Test admin route guard (non-admin redirected)

## Files Changed

| File | Change |
|---|---|
| **New** `src/pages/MyFeedback.tsx` | User's ticket history with admin replies |
| **Edit** `src/pages/MoreMenu.tsx` | Add "My Feedback" menu item |
| **Edit** `src/App.tsx` | Add `/my-feedback` route |
| **Edit** `src/pages/admin/AdminDashboard.tsx` | Add "new since last visit" counter |
| **Edit** `src/components/ui/badge.tsx` | Fix forwardRef if needed |

## Implementation Order
1. My Feedback page + routing
2. Badge/forwardRef fix check
3. Landing page polish pass
4. Admin dashboard new-ticket indicator
5. End-to-end testing and report

