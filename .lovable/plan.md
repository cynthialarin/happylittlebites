

# End-to-End Testing Plan

I'm currently in plan mode (read-only), so I cannot run browser tests yet. Once approved, I'll switch to default mode and execute the full test suite using your credentials.

## Test Sequence

1. **Login** — Navigate to the app, sign in with `cynthialarin76@gmail.com` / `Pa$$word5696`
2. **Submit Feedback** — Go to `/feedback`, select a category (bug), write a description, attach a screenshot if possible, check "I'd like a response", submit
3. **My Feedback** — Navigate to `/my-feedback`, verify the submitted ticket appears with correct status
4. **Admin Dashboard** — Go to `/admin`, verify stats load (user count, ticket counts, "new since last visit" counter)
5. **Admin Feedback Triage** — Go to `/admin/feedback`, expand the ticket, update status, send a reply, test the AI Prompt Generator
6. **Verify Reply Visible** — Return to `/my-feedback`, confirm admin reply appears under the ticket
7. **Admin Users** — Go to `/admin/users`, verify user list loads with stats
8. **Admin Analytics** — Go to `/admin/analytics`, verify food/allergen/feature data renders
9. **Admin Route Guard** — Confirm non-admin users get redirected (logic check via code)
10. **Report** — Summarize all results with pass/fail for each step

## What I'll Report
- Screenshot evidence at key steps
- Any errors from console logs or network failures
- Pass/fail status for each feature tested

