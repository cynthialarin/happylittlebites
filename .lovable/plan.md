

## Plan: Weekly Pediatrician Report

No weekly report feature exists yet. This will be a new page that aggregates the past 7 days of feeding, sleep, diaper, and milestone data into a shareable summary.

### New Page: `src/pages/WeeklyReport.tsx`

**Layout:**
- Week selector (arrows to navigate weeks)
- Child name, age, date range header
- Sections with summary cards:

**Feeding Summary:**
- Total feeds, average per day, breakdown by type (breast/bottle-formula/bottle-breastmilk)
- Average oz per day (bottle feeds)

**Sleep Summary:**
- Average total sleep hours/day, average naps/day
- Best/worst sleep days

**Diaper Summary:**
- Average changes/day, wet vs dirty breakdown
- Daily trend mini-chart

**Milestones Achieved:**
- List of milestones achieved during the week with dates

**Nutrition/Food Diary:**
- Count of unique foods tried, new foods introduced
- Any reactions logged

**Share/Export:**
- "Copy to clipboard" button generating a clean text summary
- "Download PDF" via browser print

### Integration

- **Route**: `/weekly-report` in `App.tsx`
- **Dashboard**: Add "Weekly Report" quick-action card (FileText icon)
- **MoreMenu**: Add under Tracking section

### Data Fetching
Query all 4 tables (feeding_entries, sleep_entries, diaper_entries, milestone_achievements) plus diary_entries and allergen_records for the selected 7-day range, filtered by user_id and child_id. All queries use existing tables — no database changes needed.

### Files to Create/Modify
- `src/pages/WeeklyReport.tsx` — new page
- `src/App.tsx` — add route
- `src/pages/Dashboard.tsx` — add quick-action card
- `src/pages/MoreMenu.tsx` — add menu item

