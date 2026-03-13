

# Beta Feedback System + Admin Dashboard — Phased Plan

This is a large feature set. I recommend breaking it into **3 phases** to keep things manageable and shippable.

---

## Phase 1: Beta Branding + User Feedback System

### App-Wide Beta Badge
- Update `Layout.tsx` header: next to the logo + "Happy Little Bites", add a small **"BETA"** badge and a button labeled **"Feedback"** (using a `MessageCircle` icon)
- Clicking "Feedback" navigates to `/feedback`

### Feedback Page (`/feedback`)
A well-organized form page (not a chatbot — simpler, more structured, and easier to process) with:
- **Category selector**: Report a Bug, Request a Feature, General Feedback, Support
- **Text description** (required)
- **Screenshot upload** (optional, up to 3 images stored in a new `feedback-attachments` storage bucket)
- **Priority** (for bugs): Low / Medium / High
- **Contact preference**: "I'd like a response" checkbox
- Submit saves to a new `feedback_tickets` database table

### Database: `feedback_tickets` table
| Column | Type |
|---|---|
| id | uuid (PK) |
| user_id | uuid (FK auth.users) |
| user_email | text |
| category | text (bug/feature/feedback/support) |
| description | text |
| priority | text |
| screenshots | text[] (storage URLs) |
| wants_response | boolean |
| status | text (new/reviewed/in-progress/resolved) |
| admin_notes | text |
| created_at | timestamptz |

RLS: Users can INSERT and SELECT their own tickets. Admin can SELECT/UPDATE all.

### Database: `user_roles` table (security-first admin access)
Following the required pattern:
- `user_roles` table with `app_role` enum (`admin`, `user`)
- `has_role()` security definer function
- Seed your account (`cynthialarin76@gmail.com`) as `admin`

### Storage: `feedback-attachments` bucket
Public bucket for screenshot uploads with RLS policies.

---

## Phase 2: Admin Dashboard (for your account only)

### Admin Route Guard
- Create `AdminRoute` wrapper component that checks `has_role(auth.uid(), 'admin')` via an RPC call
- Only your account gets access; all others see a 404

### Admin Dashboard Pages

**`/admin`** — Overview with:
- Total users count (from `profiles` table)
- New signups (last 7/30 days)
- Active users (users with diary entries in last 7 days)
- Total feedback tickets by status (new/reviewed/resolved)
- Quick stats cards

**`/admin/feedback`** — Feedback Management:
- Table of all feedback tickets with filters (category, status, date)
- Click into a ticket to see full details + screenshots
- Status update dropdown (new → reviewed → in-progress → resolved)
- **Admin reply** text field — saves to a new `feedback_replies` table and the user can see the reply on their feedback page
- **AI Prompt Generator** button: sends the ticket description to Lovable AI and generates a well-structured Lovable prompt you can copy-paste. Uses an edge function with Gemini Flash.

**`/admin/users`** — User Management:
- List of all users (from `profiles` + `children` count)
- When they signed up, last active date
- Number of children, diary entries, feedback tickets
- Trial status (trial_start_date from profiles)

**`/admin/analytics`** — App Analytics:
- Most logged foods (from `diary_entries`)
- Most common allergens tracked
- Feature usage breakdown (which pages/features are most used based on data counts)
- Growth trends (new users over time)

### Database additions for Phase 2
- `feedback_replies` table (admin_id, ticket_id, message, created_at)
- RLS: admin can INSERT, users can SELECT replies on their own tickets
- View `admin_user_stats` or query joining profiles + children + diary counts

### Edge Function: `generate-lovable-prompt`
- Takes a feedback ticket's description + category
- Calls Lovable AI (Gemini Flash) with a system prompt that formats it as an actionable Lovable prompt
- Returns the formatted prompt for copy-paste

---

## Phase 3: Future Enhancements (not built now)
- Purchase/subscription tracking (when payments are added)
- Push notification management from admin
- Email users directly from admin panel
- Feedback ticket email notifications
- Analytics charts with trends over time

---

## Files Changed (Phase 1 + 2)

| File | Change |
|---|---|
| **New** `src/pages/Feedback.tsx` | User feedback form |
| **New** `src/pages/admin/AdminDashboard.tsx` | Admin overview |
| **New** `src/pages/admin/AdminFeedback.tsx` | Feedback management |
| **New** `src/pages/admin/AdminUsers.tsx` | User list |
| **New** `src/pages/admin/AdminAnalytics.tsx` | App analytics |
| **New** `src/components/AdminRoute.tsx` | Admin route guard |
| **New** `src/hooks/useAdmin.ts` | Admin role check hook |
| **New** `supabase/functions/generate-lovable-prompt/index.ts` | AI prompt generator |
| **Edit** `src/components/Layout.tsx` | Add BETA badge + Feedback button |
| **Edit** `src/App.tsx` | Add /feedback and /admin/* routes |
| **Migration** | Create `user_roles`, `feedback_tickets`, `feedback_replies` tables, `has_role()` function, storage bucket, seed admin role |

---

## Implementation Order
1. Database migration (tables, roles, seed admin)
2. Beta badge + Feedback page (user-facing)
3. Admin route guard + dashboard
4. Admin feedback view with AI prompt generator
5. Admin users + analytics pages

This is a substantial build. Shall I proceed with all of Phase 1 + Phase 2, or start with Phase 1 only?

