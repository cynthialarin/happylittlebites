

## Plan: Developmental Milestones Tracker

### Overview
Transform the existing static Milestones page into an interactive developmental tracker where parents can check off milestones as their child achieves them, with date logging. Add broader developmental categories beyond just feeding (motor, language, social, cognitive). Persist milestone achievements in the database.

### 1. Database Migration
Create `milestone_achievements` table:
- `id` (uuid, PK, default gen_random_uuid)
- `child_id` (text, not null)
- `user_id` (uuid, not null)
- `milestone_key` (text, not null) — unique key like "motor-rolling-over"
- `achieved_date` (text, not null) — ISO date when achieved
- `notes` (text, default '')
- `created_at` (timestamptz, default now())
- Unique constraint on (child_id, milestone_key)

RLS: standard per-user CRUD on `user_id = auth.uid()`.

### 2. Expand Milestones Page (`src/pages/Milestones.tsx`)
Complete rewrite with tabs for milestone categories:

**Categories (tabs):**
- **Feeding** — keep existing feeding milestones
- **Motor** — rolling over, sitting up, crawling, pulling to stand, walking, running
- **Language** — cooing, babbling, first words, two-word phrases, sentences
- **Social** — social smile, stranger anxiety, parallel play, sharing, pretend play

Each milestone item becomes interactive:
- Checkbox to mark as achieved
- Date picker (defaults to today) when checked
- Optional notes field
- Persisted to `milestone_achievements` table
- Shows completion percentage per category

**Age-based stages** with milestone items, similar structure to current but with checkboxes. Current stage highlighted based on child's age.

### 3. Dashboard Integration
Add a "Milestones" quick-action card to the Dashboard grid (Star icon, path `/more/milestones`).

### 4. Daily Timeline Integration
Show newly achieved milestones on the DailyTimeline page as special celebration entries (🎉 icon).

### Files to Create/Modify
- `src/pages/Milestones.tsx` — full rewrite with tabs, checkboxes, DB persistence
- `src/pages/DailyTimeline.tsx` — add milestone achievements to timeline
- `src/pages/Dashboard.tsx` — add Milestones quick-action
- `src/App.tsx` — no route change needed (already at `/more/milestones`)
- Database migration — `milestone_achievements` table

