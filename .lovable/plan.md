

## Landing Page Refresh — Full App Scope

The landing page currently positions the app as a "baby feeding tracker." This update will rewrite all copy to reflect the full platform: feeding + sleep + diapers + AI scanners + chatbot + achievements + growth + caregiver sharing + picky eater tools.

---

### File 1: `src/components/landing/LandingHero.tsx`

**Headline change:**
- From: "Track every bite. Stress less. Raise a happy eater."
- To: "Your baby's first year — tracked, planned & celebrated."

**Subtitle change:**
- From: "The all-in-one app to track weaning, spot allergies early, plan meals with AI..."
- To: "The all-in-one app for feeding, sleep, diapers, growth, allergens, and AI-powered meal planning — from first purée to toddler plate, backed by pediatric guidelines."

---

### File 2: `src/components/landing/LandingFeatures.tsx`

**Header change:**
- From: "Everything You Need — All in One App"
- To: "One App. Every Milestone."
- New subtitle: "Feeding, sleep, diapers, growth, allergens, AI meal planning, and more..."

**Expand from 9 to 12 feature cards** — keep existing 9 (with refreshed descriptions) and add:
1. **AI Fridge & Plate Scanner** (Camera icon) — "Snap your fridge for instant meal ideas, or photograph a plate to auto-log meals in seconds."
2. **Achievements & Badges** (Trophy icon) — "Earn XP, unlock badges, and build streaks as you track your baby's journey."
3. **AI Support Chatbot** (MessageCircle icon) — "Get instant answers about any feature, feeding tips, or troubleshooting — 24/7."

Update existing card descriptions to mention 150+ foods, Daily Timeline, Insights charts, US & Canada guidelines.

---

### File 3: `src/components/landing/LandingStats.tsx`

**Stats updates:**
- "100+ Foods" → "150+ Foods & Cultural Dishes"
- Add or replace a stat: "6 Trackers" (food, feeding, sleep, diapers, growth, milestones)

**Testimonials refresh** — update quotes to reference AI scanner, sleep tracking, and chatbot:
1. "The AI scanned my fridge and suggested three perfect meals — I was blown away!"
2. "Sleep + diaper tracking alongside food logging saved me from using three different apps."
3. "My pediatrician loved the weekly report — it had everything she needed in one page!"

---

### File 4: `src/components/landing/LandingDifferentiators.tsx`

- Update "All-in-One" desc to list sleep, diapers, growth, achievements alongside food
- Update "AI-Powered" to mention fridge scanner, plate scanner, and chatbot
- Replace or update one item with "AI Camera Scanners" — fridge + plate scanning

---

### File 5: `src/components/landing/AppWalkthrough.tsx`

Add a **7th screen** — "AI Scanner" with a simulated fridge scan animation:
- Show emoji food items appearing as "detected" with check marks
- Add to the tab navigation as `{ label: 'Scanner', emoji: '📸' }`

---

### File 6: `src/pages/LandingPage.tsx`

**How It Works steps update:**
- Step 2: "Log First Food" → "Start Tracking" / "Log meals, sleep, diapers, and milestones — all in one place."
- Step 3: "Watch Progress" → "Get AI Insights" / "See trends, earn achievements, and share reports with your pediatrician."

---

### File 7: `src/components/landing/LandingBetaOffer.tsx`

- Change "best baby feeding app" → "best baby tracking app"
- Update description to mention full feature set beyond just feeding

---

### Files to modify (7 total)
1. `src/components/landing/LandingHero.tsx`
2. `src/components/landing/LandingFeatures.tsx`
3. `src/components/landing/LandingStats.tsx`
4. `src/components/landing/LandingDifferentiators.tsx`
5. `src/components/landing/AppWalkthrough.tsx`
6. `src/pages/LandingPage.tsx`
7. `src/components/landing/LandingBetaOffer.tsx`

