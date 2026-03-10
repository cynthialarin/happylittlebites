

## Plan: Additional Legal Safeguards

After reviewing the codebase, the Terms of Service, Privacy Policy, consent banner, and disclaimers are comprehensive. Here are the remaining gaps:

### Gap 1: No ToS/Privacy Agreement at Signup
Users can create accounts without explicitly agreeing to the Terms of Service or Privacy Policy. This is a significant legal gap — without affirmative consent, the ToS may not be enforceable.

**Fix**: Add a checkbox to the signup form in `src/pages/Auth.tsx` that says "I agree to the Terms of Service and Privacy Policy" with links. The Sign Up button should be disabled until checked.

### Gap 2: No Medical Disclaimer on AI Meal Suggestions Page
The AI Meal Suggestions page (`src/pages/MealSuggestions.tsx`) generates food recommendations but has no visible disclaimer. The allergen tracker has one, but this page doesn't.

**Fix**: Add a small disclaimer footer to `src/pages/MealSuggestions.tsx`: "AI suggestions are for inspiration only. Not medical advice. Always consult your pediatrician."

### Gap 3: No Disclaimer on Growth Tracker
Growth charts and percentile data could be misinterpreted as medical assessment. No disclaimer present.

**Fix**: Add a small disclaimer to `src/pages/GrowthTracker.tsx`: "For informational tracking only. Not a diagnostic tool. Consult your pediatrician for growth concerns."

### Gap 4: No Age Verification / Minimum Age Gate
COPPA requires operators to obtain verifiable parental consent. While the app doesn't collect data from children directly, adding a simple age confirmation ("I confirm I am 18 or older") at signup strengthens the COPPA defense.

**Fix**: Add to the signup checkbox: "I confirm I am 18 years or older" — can be combined with the ToS checkbox or a second one.

### Gap 5: ConsentBanner Only Shows After Login
The consent banner in `App.tsx` is inside `AppProvider` which only renders for authenticated users. Pre-login pages (landing, auth) have no consent mechanism — if any analytics run there, that's a gap.

**Fix**: Move `<ConsentBanner />` to render for unauthenticated users too (before the auth routes), or confirm no tracking occurs pre-login and document that.

---

### Files Modified
- `src/pages/Auth.tsx` — Add ToS/Privacy agreement checkbox + age confirmation on signup
- `src/pages/MealSuggestions.tsx` — Add medical disclaimer footer
- `src/pages/GrowthTracker.tsx` — Add tracking disclaimer footer
- `src/App.tsx` — Move ConsentBanner to render for all users (or add comment documenting no pre-auth tracking)

